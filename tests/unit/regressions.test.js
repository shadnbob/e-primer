// tests/unit/regressions.test.js

/**
 * TESTING: Regression coverage for pipeline-level bugs
 *
 * These tests exercise components through the same call paths production
 * uses (real jsdom DOM, real dictionaries) rather than testing methods in
 * isolation. Each describe block pins a specific fixed bug:
 *
 * 1. Neutral contextual matches must suppress overlapping dictionary
 *    matches through processTextNode (they used to be filtered out before
 *    deduplication ever saw them).
 * 2. removeAllHighlights must unwrap custom-group and probability spans
 *    (the selector list used to omit both).
 * 3. characterData mutations must be recognized and their text nodes
 *    re-extracted (the observer subscribed but the handlers ignored them).
 * 4. Conflict resolution must not depend on array order when regular
 *    matches carry no confidence value.
 * 5. validateSettings must preserve custom-group setting keys.
 * 6. Hover-card HTML must escape page- and user-controlled strings.
 * 7. Custom-group hover data must round-trip through the DOM to PopupManager.
 * 8. Concurrent analyzeDocument calls must serialize instead of interleaving.
 */

import { BiasDetector } from '../../src/content/BiasDetector.js';
import { BiasConfig } from '../../src/config/BiasConfig.js';
import { DOMProcessor } from '../../src/utils/DOMProcessor.js';
import { ContextAwareDetector } from '../../src/utils/ContextAwareDetector.js';
import { HoverContentGenerator } from '../../src/utils/HoverContentGenerator.js';
import { getPopupManager, destroyPopupManager } from '../../src/utils/PopupManager.js';

describe('Regressions', () => {
  afterEach(() => {
    destroyPopupManager();
    document.body.innerHTML = '';
  });

  describe('neutral override through the real pipeline', () => {
    let detector;

    beforeEach(() => {
      detector = new BiasDetector();
      // Give the weasel detector a pattern that overlaps the contextual
      // phrase "it seems" so the suppression path has something to suppress
      detector.compiledDetectors.get('weasel').patterns.push({
        source: 'it seems',
        regex: /\bit seems\b/gi,
        type: 'weasel',
        isComplex: false
      });
    });

    afterEach(() => {
      detector.destroy();
    });

    function processSentence(sentence) {
      const p = document.createElement('p');
      const textNode = document.createTextNode(sentence);
      p.appendChild(textNode);
      document.body.appendChild(p);
      return detector.processTextNode(textNode);
    }

    test('neutral classification suppresses an overlapping dictionary match', async () => {
      // "reasonable to" after "it seems" classifies as neutral (0.6)
      await processSentence('It seems reasonable to conclude the results hold.');

      const weaselSpans = document.querySelectorAll('.bias-highlight-weasel');
      expect(weaselSpans.length).toBe(0);
    });

    test('weasel classification still highlights (control)', async () => {
      // "obvious that" after "it seems" classifies as weasel (0.9)
      await processSentence('It seems obvious that this policy works.');

      const weaselSpans = Array.from(document.querySelectorAll('.bias-highlight-weasel'));
      expect(weaselSpans.some(s => s.textContent.toLowerCase() === 'it seems')).toBe(true);
    });

    test('neutral matches never render as highlights', async () => {
      await processSentence('It seems reasonable to conclude the results hold.');

      expect(document.querySelectorAll('.bias-highlight-neutral').length).toBe(0);
    });
  });

  describe('highlight removal covers every highlight class', () => {
    test('removeAllHighlights unwraps custom and probability spans too', () => {
      document.body.innerHTML =
        '<p>' +
        '<span class="bias-highlight-custom-custom_jargon_1">synergy</span> and ' +
        '<span class="bias-highlight-probability">could possibly</span> and ' +
        '<span class="bias-highlight-opinion">obviously</span> and ' +
        '<span class="excellence-nuance">might</span>' +
        '</p>';

      const processor = new DOMProcessor();
      processor.removeAllHighlights();

      expect(document.querySelectorAll('span').length).toBe(0);
      expect(document.querySelector('p').textContent)
        .toBe('synergy and could possibly and obviously and might');
    });

    test('removeCustomHighlights targets a single group', () => {
      document.body.innerHTML =
        '<p>' +
        '<span class="bias-highlight-custom-custom_a_1">alpha</span> ' +
        '<span class="bias-highlight-custom-custom_b_2">beta</span>' +
        '</p>';

      const processor = new DOMProcessor();
      processor.removeCustomHighlights('bias-highlight-custom-custom_a_1');

      expect(document.querySelectorAll('.bias-highlight-custom-custom_a_1').length).toBe(0);
      expect(document.querySelectorAll('.bias-highlight-custom-custom_b_2').length).toBe(1);
    });

    test('getHighlightSelectors is generated from config', () => {
      const selectors = new DOMProcessor().getHighlightSelectors();

      expect(selectors.probability).toBe('.bias-highlight-probability');
      expect(selectors.custom).toContain('bias-highlight-custom-');
      // Every configured bias type must be represented
      for (const config of Object.values(BiasConfig.BIAS_TYPES)) {
        expect(selectors[config.id]).toBe(`.bias-highlight-${config.id}`);
      }
    });
  });

  describe('characterData mutation handling', () => {
    let detector;

    beforeEach(() => {
      detector = new BiasDetector();
    });

    afterEach(() => {
      detector.destroy();
    });

    test('shouldProcessMutations accepts significant in-place text edits', () => {
      const p = document.createElement('p');
      const textNode = document.createTextNode('This freshly updated sentence is clearly long enough.');
      p.appendChild(textNode);
      document.body.appendChild(p);

      const mutation = { type: 'characterData', target: textNode, addedNodes: [] };
      expect(detector.shouldProcessMutations([mutation])).toBe(true);
    });

    test('shouldProcessMutations ignores text edits inside our own highlights', () => {
      const span = document.createElement('span');
      span.className = 'bias-highlight-opinion';
      const textNode = document.createTextNode('this text lives inside one of our highlight spans');
      span.appendChild(textNode);
      document.body.appendChild(span);

      const mutation = { type: 'characterData', target: textNode, addedNodes: [] };
      expect(detector.shouldProcessMutations([mutation])).toBe(false);
    });

    test('extractChangedTextNodes returns mutated text nodes exactly once', () => {
      const p = document.createElement('p');
      const textNode = document.createTextNode('Some mutated page text worth re-analyzing.');
      p.appendChild(textNode);
      document.body.appendChild(p);

      const mutation = { type: 'characterData', target: textNode, addedNodes: [] };
      const changed = detector.domProcessor.extractChangedTextNodes([mutation, mutation]);

      expect(changed).toEqual([textNode]);
    });
  });

  describe('single-pass text collection', () => {
    test('collects shadow DOM text without a second element sweep', () => {
      const host = document.createElement('div');
      host.attachShadow({ mode: 'open' });
      host.shadowRoot.innerHTML = '<p>Shadow paragraph with obviously enough text.</p>';
      document.body.appendChild(host);

      const p = document.createElement('p');
      p.textContent = 'Light DOM paragraph text.';
      document.body.appendChild(p);

      const processor = new DOMProcessor();
      const texts = processor.collectTextNodes(document.body).map(n => n.textContent);

      expect(texts).toContain('Shadow paragraph with obviously enough text.');
      expect(texts).toContain('Light DOM paragraph text.');
    });

    test('prunes skipped subtrees wholesale', () => {
      document.body.innerHTML =
        '<div data-skip-analysis="true"><p>Text inside a skipped ancestor subtree.</p></div>' +
        '<script>var ignored = "script text should never surface";</script>' +
        '<span class="bias-highlight-opinion">our own highlight text</span>' +
        '<p>Regular collectable text.</p>';

      const processor = new DOMProcessor();
      const texts = processor.collectTextNodes(document.body).map(n => n.textContent);

      expect(texts).toContain('Regular collectable text.');
      expect(texts).not.toContain('Text inside a skipped ancestor subtree.');
      expect(texts.some(t => t.includes('script text'))).toBe(false);
      expect(texts).not.toContain('our own highlight text');
    });
  });

  describe('conflict resolution with missing confidence', () => {
    test('contextual match outranks a regular match regardless of order', () => {
      const cad = new ContextAwareDetector();
      const regular = { index: 0, length: 8, text: 'it seems', type: 'weasel' };
      const contextual = { index: 0, length: 8, text: 'it seems', confidence: 0.9, isContextual: true };

      expect(cad.chooseBestMatch([regular, contextual])).toBe(contextual);
      expect(cad.chooseBestMatch([contextual, regular])).toBe(contextual);
    });
  });

  describe('settings validation', () => {
    test('custom-group setting keys survive validateSettings', () => {
      const validated = BiasConfig.validateSettings({
        highlight_custom_jargon_1: false,
        highlightOpinion: false
      });

      expect(validated.highlight_custom_jargon_1).toBe(false);
      expect(validated.highlightOpinion).toBe(false);
    });

    test('unknown keys are still stripped', () => {
      const validated = BiasConfig.validateSettings({ arbitraryKey: true });
      expect(validated.arbitraryKey).toBeUndefined();
    });
  });

  describe('hover card escaping', () => {
    test('page-controlled matched text cannot inject markup', () => {
      const generator = new HoverContentGenerator();
      const html = generator.generateHoverContent({
        text: '<img src=x onerror=alert(1)>',
        type: 'opinion',
        intensity: 2
      });

      expect(html).not.toContain('<img');
      expect(html).toContain('&lt;img');
    });

    test('contextual page text cannot inject markup', () => {
      const generator = new HoverContentGenerator();
      const html = generator.generateHoverContent({
        text: 'it seems',
        type: 'weasel',
        intensity: 2,
        isContextual: true,
        contextReasoning: 'reason',
        confidence: 0.8,
        context: 'before <script>alert(1)</script> it seems after'
      });

      expect(html).not.toContain('<script>');
      // The matched phrase is still mark-highlighted inside the escaped context
      expect(html).toContain('<mark class="context-highlight">it seems</mark>');
    });

    test('custom group fields are escaped and colors sanitized', () => {
      const generator = new HoverContentGenerator();
      const html = generator.generateHoverContent({
        text: 'synergy',
        isCustom: true,
        customGroup: {
          id: 'custom_x_1',
          name: '<b>Evil</b>',
          color: 'red;} body{display:none',
          hoverContent: { basicTip: '<script>bad()</script>' }
        }
      });

      expect(html).not.toContain('<b>Evil</b>');
      expect(html).not.toContain('<script>');
      expect(html).not.toContain('display:none');
    });
  });

  describe('custom hover data round-trip', () => {
    test('PopupManager rebuilds the custom group from span data attributes', () => {
      const processor = new DOMProcessor();
      const span = document.createElement('span');
      span.className = 'bias-highlight-custom-custom_jargon_1';
      span.textContent = 'synergy';

      processor.addDataAttributes(span, {
        text: 'synergy',
        type: 'custom_jargon_1',
        isCustom: true,
        customGroup: {
          id: 'custom_jargon_1',
          name: 'Corporate Jargon',
          color: '#e67e22',
          hoverContent: { basicTip: 'Corporate speak' },
          className: 'bias-highlight-custom-custom_jargon_1'
        }
      });

      const matchData = getPopupManager().extractMatchData(span);

      expect(matchData.isCustom).toBe(true);
      expect(matchData.customGroup.name).toBe('Corporate Jargon');
      expect(matchData.customGroup.hoverContent.basicTip).toBe('Corporate speak');
    });
  });

  describe('analysis serialization', () => {
    test('concurrent analyzeDocument calls do not interleave', async () => {
      document.body.innerHTML = '<p>Obviously everyone knows this is clearly the best approach ever devised.</p>';

      const detector = new BiasDetector();
      const warnSpy = vi.spyOn(console, 'warn');

      const [a, b] = await Promise.all([
        detector.analyzeDocument(),
        detector.analyzeDocument()
      ]);

      expect(a).toBeDefined();
      expect(b).toBeDefined();
      const timerWarnings = warnSpy.mock.calls.filter(args =>
        String(args[0]).includes('was not started'));
      expect(timerWarnings).toEqual([]);

      warnSpy.mockRestore();
      detector.destroy();
    });
  });
});

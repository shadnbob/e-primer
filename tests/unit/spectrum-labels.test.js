// tests/unit/spectrum-labels.test.js

/**
 * TESTING: Political Spectrum Labels explainer dictionary
 *
 * The spectrum type is the first "explainer" — it annotates contested
 * political labels with context instead of flagging them as problems.
 * These tests pin:
 *  - dictionary/config structure and their agreement
 *  - detection with subcategory attribution, including regex entries
 *    (which rely on the pattern-source fallback in detectPatterns)
 *  - the sense guards that keep everyday uses ("the right to remain
 *    silent", "a conservative estimate", "liberal arts") unhighlighted
 *  - neutral "Context" framing in hover cards and tooltips
 */

import { spectrumWords, spectrumLabels } from '../../src/dictionaries/spectrum-labels.js';
import { BiasConfig } from '../../src/config/BiasConfig.js';
import { BiasPatterns } from '../../src/dictionaries/index.js';
import { BiasDetector } from '../../src/content/BiasDetector.js';
import { DOMProcessor } from '../../src/utils/DOMProcessor.js';
import { HoverContentGenerator } from '../../src/utils/HoverContentGenerator.js';

describe('Spectrum Labels explainer', () => {
  describe('dictionary structure', () => {
    test('has the three expected term families', () => {
      expect(Object.keys(spectrumWords).sort()).toEqual(['conservative', 'left_right', 'liberal']);
    });

    test('every subcategory carries full explainer content and words', () => {
      for (const [subId, entry] of Object.entries(spectrumWords)) {
        for (const field of ['icon', 'color', 'name', 'description', 'implication', 'suggestion', 'examples']) {
          expect(entry[field], `${subId}.${field}`).toBeTruthy();
        }
        expect(Array.isArray(entry.words)).toBe(true);
        expect(entry.words.length).toBeGreaterThan(0);
      }
    });

    test('flat export covers every subcategory word', () => {
      const total = Object.values(spectrumWords).reduce((n, e) => n + e.words.length, 0);
      expect(spectrumLabels.length).toBe(total);
    });
  });

  describe('BiasConfig agreement', () => {
    const config = BiasConfig.BIAS_TYPES.SPECTRUM;

    test('is registered as an explainer in its own category', () => {
      expect(config).toBeDefined();
      expect(config.isExplainer).toBe(true);
      expect(config.category).toBe('explainer');
      expect(BiasConfig.CATEGORIES.explainer).toBeDefined();
    });

    test('config subcategories match the dictionary families', () => {
      expect(Object.keys(config.subCategories).sort())
        .toEqual(Object.keys(spectrumWords).sort());
      for (const sub of Object.values(config.subCategories)) {
        expect(sub.settingKey).toMatch(/^highlightSpectrum/);
        expect(sub.statKey).toMatch(/Count$/);
      }
    });

    test('defaults include the type and subcategory settings', () => {
      const defaults = BiasConfig.getDefaultSettings();
      expect(defaults.highlightSpectrum).toBe(true);
      expect(defaults.highlightSpectrumLeftRight).toBe(true);
      expect(defaults.highlightSpectrumLiberal).toBe(true);
      expect(defaults.highlightSpectrumConservative).toBe(true);
    });
  });

  describe('detection and attribution', () => {
    let detector;
    let patterns;

    beforeEach(() => {
      detector = new BiasDetector();
      patterns = detector.compiledDetectors.get('spectrum').patterns;
    });

    afterEach(() => {
      detector.destroy();
    });

    const detect = text => detector.detectPatterns(text, patterns, 'spectrum');

    test('compiles all spectrum patterns', () => {
      expect(patterns.length).toBe(spectrumLabels.length);
    });

    test('plain-word entries attribute to their family', () => {
      const matches = detect('The left-wing coalition and many liberals backed it.');
      const types = matches.map(m => m.type);
      expect(types).toContain('spectrum_left_right');
      expect(types).toContain('spectrum_liberal');
    });

    test('regex entries attribute via the pattern-source fallback', () => {
      const matches = detect('The left has criticized the bill, and conservatives praised it.');
      const leftMatch = matches.find(m => m.text.toLowerCase() === 'the left');
      const consMatch = matches.find(m => m.text.toLowerCase() === 'conservatives');

      expect(leftMatch).toBeDefined();
      expect(leftMatch.subCategory.id).toBe('left_right');
      expect(consMatch).toBeDefined();
      expect(consMatch.subCategory.id).toBe('conservative');
    });

    test('sense guards keep everyday uses unmatched', () => {
      expect(detect('You have the right to remain silent.')).toEqual([]);
      expect(detect('A conservative estimate puts the cost at 5%.')).toEqual([]);
      expect(detect('She has a liberal arts degree.')).toEqual([]);
      expect(detect('Turn left at the right time.')).toEqual([]);
      expect(detect('Apply a liberal amount of sunscreen.')).toEqual([]);
    });

    test('political senses of guarded words still match', () => {
      expect(detect('The senator is liberal on trade.').length).toBeGreaterThan(0);
      expect(detect('Conservatives in three countries disagree about what to conserve.').length).toBeGreaterThan(0);
      expect(detect('Commentators call the proposal far right.').length).toBeGreaterThan(0);
    });
  });

  describe('overlap with the opinion dictionary', () => {
    test('explainer wins a same-span conflict with an opinion match', () => {
      const detector = new BiasDetector();
      const opinionMatch = { index: 10, length: 7, text: 'liberal', type: 'opinion_loaded_political', parentType: 'opinion' };
      const spectrumMatch = { index: 10, length: 7, text: 'liberal', type: 'spectrum_liberal', parentType: 'spectrum' };

      // Both insertion orders must resolve to the explainer
      expect(detector.deduplicateMatches([opinionMatch, spectrumMatch])).toEqual([spectrumMatch]);
      expect(detector.deduplicateMatches([spectrumMatch, opinionMatch])).toEqual([spectrumMatch]);

      detector.destroy();
    });
  });

  describe('neutral framing', () => {
    test('hover card shows a Context badge instead of a severity level', () => {
      const generator = new HoverContentGenerator();
      const subCategory = { id: 'left_right', ...BiasConfig.BIAS_TYPES.SPECTRUM.subCategories.left_right };
      const html = generator.generateHoverContent({
        text: 'left-wing',
        type: 'spectrum_left_right',
        parentType: 'spectrum',
        subCategory,
        intensity: 2
      });

      expect(html).toContain('intensity-context');
      expect(html).toContain('>Context<');
      expect(html).not.toContain('>Moderate<');
      // The history actually surfaces
      expect(html).toContain('1789');
    });

    test('tooltip avoids accusatory phrasing for explainer types', () => {
      const processor = new DOMProcessor();
      const tooltip = processor.getTooltipText('spectrum_left_right');
      expect(tooltip).toContain('contested label');
      expect(tooltip).not.toContain('Possible');
    });
  });
});

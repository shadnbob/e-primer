// tests/unit/site-density.test.js

/**
 * TESTING: Per-site controls, run mode, highlight density, and ignore list
 *
 * Settings-level: validateSettings must pass through and sanitize the new
 * keys (siteMode, highlightDensity, disabledSites, ignoredWords).
 *
 * Detector-level: the density quota limits how many times each unique
 * (type, term) pair highlights per page — across text nodes — and ignored
 * words never highlight. Changing either forces reanalysis.
 *
 * (Site gating lives in the content script's message handlers and is
 * exercised end-to-end in the browser; the settings contract is pinned here.)
 */

import { BiasConfig } from '../../src/config/BiasConfig.js';
import { BiasDetector } from '../../src/content/BiasDetector.js';

describe('Settings contract for site/density/ignore keys', () => {
  test('siteMode passes through and defaults invalid values to auto', () => {
    expect(BiasConfig.validateSettings({ siteMode: 'ondemand' }).siteMode).toBe('ondemand');
    expect(BiasConfig.validateSettings({ siteMode: 'auto' }).siteMode).toBe('auto');
    expect(BiasConfig.validateSettings({ siteMode: 'bogus' }).siteMode).toBe('auto');
    expect(BiasConfig.getDefaultSettings().siteMode).toBe('auto');
  });

  test('highlightDensity accepts only known presets', () => {
    expect(BiasConfig.validateSettings({ highlightDensity: 'focused' }).highlightDensity).toBe('focused');
    expect(BiasConfig.validateSettings({ highlightDensity: 'everything' }).highlightDensity).toBe('everything');
    expect(BiasConfig.validateSettings({ highlightDensity: 'maximal' }).highlightDensity).toBe('standard');
    expect(BiasConfig.getDefaultSettings().highlightDensity).toBe('standard');
  });

  test('disabledSites and ignoredWords are sanitized string arrays', () => {
    const validated = BiasConfig.validateSettings({
      disabledSites: ['Example.COM ', 42, null, '', 'news.site'],
      ignoredWords: ['  Obviously ', { evil: true }, 'The  Left']
    });
    expect(validated.disabledSites).toEqual(['example.com', 'news.site']);
    expect(validated.ignoredWords).toEqual(['obviously', 'the  left']);

    expect(BiasConfig.validateSettings({ disabledSites: 'not-an-array' }).disabledSites).toEqual([]);
  });
});

describe('Highlight density quota', () => {
  let detector;

  beforeEach(() => {
    document.body.innerHTML = '';
    detector = new BiasDetector();
  });

  afterEach(() => {
    detector.destroy();
    document.body.innerHTML = '';
  });

  function addNode(text) {
    const p = document.createElement('p');
    const node = document.createTextNode(text);
    p.appendChild(node);
    document.body.appendChild(p);
    return node;
  }

  const countOf = word =>
    Array.from(document.querySelectorAll('[class*="bias-highlight-"]'))
      .filter(s => s.textContent.toLowerCase() === word).length;

  test.each([
    ['focused', 1],
    ['standard', 3],
    ['everything', 4]
  ])('%s density keeps %i of 4 occurrences', async (density, expected) => {
    detector.settings.highlightDensity = density;
    const node = addNode('Obviously wrong, obviously late, obviously loud, and obviously done.');
    await detector.processTextNode(node);
    expect(countOf('obviously')).toBe(expected);
  });

  test('the quota spans text nodes, not just one node', async () => {
    detector.settings.highlightDensity = 'focused';
    const first = addNode('Obviously the first mention counts here.');
    const second = addNode('Obviously the second mention does not highlight.');
    await detector.processTextNode(first);
    await detector.processTextNode(second);
    expect(countOf('obviously')).toBe(1);
  });

  test('resetStats resets the quota', async () => {
    detector.settings.highlightDensity = 'focused';
    await detector.processTextNode(addNode('Obviously once here in this text.'));
    detector.resetStats();
    await detector.processTextNode(addNode('Obviously again after the reset happened.'));
    expect(countOf('obviously')).toBe(2);
  });

  test('ignored words never highlight, others still do', async () => {
    detector.settings.highlightDensity = 'everything';
    detector.settings.ignoredWords = ['obviously'];
    const node = addNode('Obviously this is clearly a test of the ignore list.');
    await detector.processTextNode(node);
    expect(countOf('obviously')).toBe(0);
    expect(countOf('clearly')).toBeGreaterThan(0);
  });

  test('density or ignore-list changes force reanalysis', async () => {
    const spy = vi.spyOn(detector, 'analyzeDocumentPreservingDisabled').mockResolvedValue();

    await detector.updateSettings({ ...detector.settings, highlightDensity: 'focused' });
    expect(spy).toHaveBeenCalledTimes(1);

    await detector.updateSettings({ ...detector.settings, ignoredWords: ['synergy'] });
    expect(spy).toHaveBeenCalledTimes(2);

    spy.mockRestore();
  });
});

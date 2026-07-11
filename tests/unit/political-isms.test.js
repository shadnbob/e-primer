// tests/unit/political-isms.test.js

/**
 * TESTING: Political -isms explainer dictionary
 *
 * Third explainer type: system-words (socialism, capitalism, fascism,
 * populism, nationalism/globalism) whose referents differ between speakers.
 * Pins structure/config agreement, detection with attribution, the
 * venture-capitalist guard, and neutral framing.
 */

import { politicalIsmsWords, politicalIsms } from '../../src/dictionaries/political-isms.js';
import { BiasConfig } from '../../src/config/BiasConfig.js';
import { BiasDetector } from '../../src/content/BiasDetector.js';
import { HoverContentGenerator } from '../../src/utils/HoverContentGenerator.js';

describe('Political -isms explainer', () => {
  describe('dictionary structure', () => {
    test('has the five expected families', () => {
      expect(Object.keys(politicalIsmsWords).sort()).toEqual([
        'capitalism', 'fascism', 'nationalism', 'populism', 'socialism'
      ]);
    });

    test('every family carries full explainer content and words', () => {
      for (const [subId, entry] of Object.entries(politicalIsmsWords)) {
        for (const field of ['icon', 'color', 'name', 'description', 'implication', 'suggestion', 'examples']) {
          expect(entry[field], `${subId}.${field}`).toBeTruthy();
        }
        expect(entry.words.length).toBeGreaterThan(0);
      }
    });

    test('flat export covers every family word', () => {
      const total = Object.values(politicalIsmsWords).reduce((n, e) => n + e.words.length, 0);
      expect(politicalIsms.length).toBe(total);
    });
  });

  describe('BiasConfig agreement', () => {
    const config = BiasConfig.BIAS_TYPES.ISMS;

    test('is registered as an explainer in the explainer category', () => {
      expect(config).toBeDefined();
      expect(config.isExplainer).toBe(true);
      expect(config.category).toBe('explainer');
    });

    test('config subcategories match the dictionary families', () => {
      expect(Object.keys(config.subCategories).sort())
        .toEqual(Object.keys(politicalIsmsWords).sort());
    });

    test('defaults include the type and family settings', () => {
      const defaults = BiasConfig.getDefaultSettings();
      expect(defaults.highlightIsms).toBe(true);
      expect(defaults.highlightIsmsSocialism).toBe(true);
      expect(defaults.highlightIsmsFascism).toBe(true);
    });
  });

  describe('detection and attribution', () => {
    let detector;
    let patterns;

    beforeEach(() => {
      detector = new BiasDetector();
      patterns = detector.compiledDetectors.get('isms').patterns;
    });

    afterEach(() => {
      detector.destroy();
    });

    const detect = text => detector.detectPatterns(text, patterns, 'isms');
    const subsOf = text => detect(text).map(m => m.subCategory && m.subCategory.id);

    test('compiles all -ism patterns', () => {
      expect(patterns.length).toBe(politicalIsms.length);
    });

    test('each family detects and attributes its words', () => {
      expect(subsOf('They call it socialism.')).toContain('socialism');
      expect(subsOf('Critics of late capitalism disagree.')).toContain('capitalism');
      expect(subsOf('He compared the law to fascism.')).toContain('fascism');
      expect(subsOf('A populist wave swept the region.')).toContain('populism');
      expect(subsOf('Nationalist and globalist factions clashed.')).toEqual(
        expect.arrayContaining(['nationalism'])
      );
    });

    test('variant forms attribute via the pattern-source fallback', () => {
      expect(subsOf('Social democrats and democratic socialists differ.')).toEqual(
        expect.arrayContaining(['socialism'])
      );
      expect(subsOf('The free market rewards this.')).toContain('capitalism');
      expect(subsOf('Neo-fascist groups were banned.')).toContain('fascism');
    });

    test('venture capitalists are a job title, not a system claim', () => {
      expect(detect('The venture capitalist funded three startups.')).toEqual([]);
      expect(detect('Venture capitalists poured money into AI.')).toEqual([]);
      // ...but bare "capitalists" still matches
      expect(subsOf('The capitalists and the workers disagreed.')).toContain('capitalism');
    });
  });

  describe('neutral framing', () => {
    test('fascism card anchors to history, with Context badge', () => {
      const generator = new HoverContentGenerator();
      const subCategory = { id: 'fascism', ...BiasConfig.BIAS_TYPES.ISMS.subCategories.fascism };
      const html = generator.generateHoverContent({
        text: 'fascist',
        type: 'isms_fascism',
        parentType: 'isms',
        subCategory,
        intensity: 2
      });

      expect(html).toContain('intensity-context');
      expect(html).toContain('>Context<');
      expect(html).toContain('Mussolini');
      expect(html).not.toContain('>Moderate<');
    });
  });
});

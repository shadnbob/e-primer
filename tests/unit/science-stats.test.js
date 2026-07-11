// tests/unit/science-stats.test.js

/**
 * TESTING: Science & Statistics explainer dictionary
 *
 * Second explainer type: annotates science/statistics phrases whose
 * technical meaning differs from how they read (significance, association
 * vs causation, relative risk, absence of evidence, purity marketing,
 * proof/"the science"). Pins structure/config agreement, detection with
 * subcategory attribution, the precision guards, and neutral framing.
 */

import { sciStatsWords, sciStatsTerms } from '../../src/dictionaries/science-stats.js';
import { BiasConfig } from '../../src/config/BiasConfig.js';
import { BiasDetector } from '../../src/content/BiasDetector.js';
import { DOMProcessor } from '../../src/utils/DOMProcessor.js';
import { HoverContentGenerator } from '../../src/utils/HoverContentGenerator.js';

describe('Science & Statistics explainer', () => {
  describe('dictionary structure', () => {
    test('has the six expected term families', () => {
      expect(Object.keys(sciStatsWords).sort()).toEqual([
        'causation', 'evidence_absence', 'purity', 'risk_scale', 'significance', 'theory_proof'
      ]);
    });

    test('every subcategory carries full explainer content and words', () => {
      for (const [subId, entry] of Object.entries(sciStatsWords)) {
        for (const field of ['icon', 'color', 'name', 'description', 'implication', 'suggestion', 'examples']) {
          expect(entry[field], `${subId}.${field}`).toBeTruthy();
        }
        expect(entry.words.length).toBeGreaterThan(0);
      }
    });

    test('flat export covers every subcategory word', () => {
      const total = Object.values(sciStatsWords).reduce((n, e) => n + e.words.length, 0);
      expect(sciStatsTerms.length).toBe(total);
    });
  });

  describe('BiasConfig agreement', () => {
    const config = BiasConfig.BIAS_TYPES.SCISTATS;

    test('is registered as an explainer in the explainer category', () => {
      expect(config).toBeDefined();
      expect(config.isExplainer).toBe(true);
      expect(config.category).toBe('explainer');
    });

    test('config subcategories match the dictionary families', () => {
      expect(Object.keys(config.subCategories).sort())
        .toEqual(Object.keys(sciStatsWords).sort());
      for (const sub of Object.values(config.subCategories)) {
        expect(sub.settingKey).toMatch(/^highlightSciStats/);
        expect(sub.statKey).toMatch(/Count$/);
      }
    });

    test('defaults include the type and subcategory settings', () => {
      const defaults = BiasConfig.getDefaultSettings();
      expect(defaults.highlightSciStats).toBe(true);
      expect(defaults.highlightSciStatsSignificance).toBe(true);
      expect(defaults.highlightSciStatsCausation).toBe(true);
      expect(defaults.highlightSciStatsPurity).toBe(true);
    });
  });

  describe('detection and attribution', () => {
    let detector;
    let patterns;

    beforeEach(() => {
      detector = new BiasDetector();
      patterns = detector.compiledDetectors.get('scistats').patterns;
    });

    afterEach(() => {
      detector.destroy();
    });

    const detect = text => detector.detectPatterns(text, patterns, 'scistats');
    const subsOf = text => detect(text).map(m => m.subCategory && m.subCategory.id);

    test('compiles all science-stats patterns', () => {
      expect(patterns.length).toBe(sciStatsTerms.length);
    });

    test('each family detects and attributes its phrases', () => {
      expect(subsOf('The vaccine link is just a theory, they said.')).toContain('theory_proof');
      expect(subsOf('Researchers found a significant increase in cases.')).toContain('significance');
      expect(subsOf('Coffee is linked to longer life.')).toContain('causation');
      expect(subsOf('Eating it doubles the risk of stroke.')).toContain('risk_scale');
      expect(subsOf('There is no evidence of side effects.')).toContain('evidence_absence');
      expect(subsOf('Try our chemical-free detox tea.')).toEqual(
        expect.arrayContaining(['purity'])
      );
    });

    test('composite types are produced for stats and settings', () => {
      const match = detect('That was a statistically significant result.')[0];
      expect(match.type).toBe('scistats_significance');
      expect(match.parentType).toBe('scistats');
    });

    test('precision guards keep everyday senses unmatched', () => {
      expect(detect('She brought her significant other to the party.')).toEqual([]);
      expect(detect('They made a significant investment last year.')).toEqual([]);
      expect(detect('In theory, this could work by Friday.')).toEqual([]);
      expect(detect('He studies music theory and game theory.')).toEqual([]);
      expect(detect('The toxin produced by the bacterium was isolated.')).toEqual([]);
    });

    test('marketing and reporting senses still match', () => {
      expect(detect('Clinically proven to reduce wrinkles.').length).toBeGreaterThan(0);
      expect(detect('Participants were 40% more likely to recover.').length).toBeGreaterThan(0);
      expect(detect('An association between screen time and anxiety emerged.').length).toBeGreaterThan(0);
      expect(detect('This superfood flushes out toxins.').length).toBeGreaterThan(1);
    });
  });

  describe('neutral framing', () => {
    test('hover card shows Context badge and the technical meaning', () => {
      const generator = new HoverContentGenerator();
      const subCategory = { id: 'significance', ...BiasConfig.BIAS_TYPES.SCISTATS.subCategories.significance };
      const html = generator.generateHoverContent({
        text: 'significant increase',
        type: 'scistats_significance',
        parentType: 'scistats',
        subCategory,
        intensity: 2
      });

      expect(html).toContain('intensity-context');
      expect(html).toContain('>Context<');
      expect(html).not.toContain('>Moderate<');
      // The description (technical meaning) leads the card
      expect(html).toContain('p < 0.05');
    });

    test('tooltip uses the neutral explainer phrasing', () => {
      const processor = new DOMProcessor();
      const tooltip = processor.getTooltipText('scistats_causation');
      expect(tooltip).toContain('Linked & Associated');
      expect(tooltip).toContain('click for context');
      expect(tooltip).not.toContain('Possible');
    });
  });
});

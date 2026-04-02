// tests/unit/ExcellenceDetector.test.js

/**
 * TESTING: ExcellenceDetector Class (Positive Pattern Detection)
 * 
 * Tests the excellence detection system that identifies good writing practices
 * and quality communication patterns in text.
 */

import { ExcellenceDetector } from '../../src/utils/ExcellenceDetector.js';

describe('ExcellenceDetector', () => {
  let detector;

  beforeEach(() => {
    detector = new ExcellenceDetector();
  });

  describe('Constructor and Initialization', () => {
    
    test('should initialize with excellence patterns', () => {
      expect(detector.excellencePatterns).toBeDefined();
      expect(typeof detector.excellencePatterns).toBe('object');
      
      // Should have expected excellence categories
      expect(detector.excellencePatterns).toHaveProperty('attribution');
      expect(detector.excellencePatterns).toHaveProperty('nuance');
      expect(detector.excellencePatterns).toHaveProperty('transparency');
      expect(detector.excellencePatterns).toHaveProperty('discourse');
      expect(detector.excellencePatterns).toHaveProperty('evidence');
    });

    test('should have properly structured patterns', () => {
      Object.values(detector.excellencePatterns).forEach(category => {
        expect(category).toHaveProperty('name');
        expect(category).toHaveProperty('patterns');
        expect(category).toHaveProperty('className');
        expect(category).toHaveProperty('tooltip');
        expect(category).toHaveProperty('color');
        
        expect(Array.isArray(category.patterns)).toBe(true);
        expect(category.patterns.length).toBeGreaterThan(0);
        
        // Each pattern should be a RegExp
        category.patterns.forEach(pattern => {
          expect(pattern).toBeInstanceOf(RegExp);
        });
      });
    });

    test('should have valid CSS class names and colors', () => {
      Object.values(detector.excellencePatterns).forEach(category => {
        expect(category.className).toMatch(/^excellence-/);
        expect(category.color).toMatch(/^#[0-9A-F]{6}$/i);
        expect(typeof category.tooltip).toBe('string');
        expect(category.tooltip.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Attribution Detection', () => {
    
    test('should detect academic citations', () => {
      const testTexts = [
        'Smith et al. (2023) found significant results.',
        'According to Dr. Johnson\'s 2024 research study',
        'The research published in Science shows promising outcomes',
        'Based on 10,000 data points collected over five years',
        'Dr. Sarah Chen from MIT concluded that'
      ];
      
      const attributionPatterns = detector.excellencePatterns.attribution.patterns;
      
      testTexts.forEach(text => {
        let foundMatch = false;
        attributionPatterns.forEach(pattern => {
          if (pattern.test(text)) {
            foundMatch = true;
          }
          pattern.lastIndex = 0; // Reset regex state
        });
        expect(foundMatch).toBe(true);
      });
    });

    test('should not detect vague attributions', () => {
      const vagueTexts = [
        'Studies show that this is effective',
        'Research indicates positive results',
        'Experts believe this approach works',
        'Some people say this is good'
      ];
      
      const attributionPatterns = detector.excellencePatterns.attribution.patterns;
      
      vagueTexts.forEach(text => {
        let foundMatch = false;
        attributionPatterns.forEach(pattern => {
          if (pattern.test(text)) {
            foundMatch = true;
          }
          pattern.lastIndex = 0;
        });
        // These should NOT be detected as good attribution
        expect(foundMatch).toBe(false);
      });
    });
  });

  describe('Nuanced Language Detection', () => {
    
    test('should detect epistemic modality', () => {
      const nuancedTexts = [
        'This might indicate a larger trend',
        'The results could suggest improvement',
        'This appears to be effective',
        'The data seems to support this hypothesis'
      ];
      
      const nuancePatterns = detector.excellencePatterns.nuance.patterns;
      
      nuancedTexts.forEach(text => {
        let foundMatch = false;
        nuancePatterns.forEach(pattern => {
          if (pattern.test(text)) {
            foundMatch = true;
          }
          pattern.lastIndex = 0;
        });
        expect(foundMatch).toBe(true);
      });
    });

    test('should detect acknowledgment of complexity', () => {
      const complexTexts = [
        'However, alternative explanations exist',
        'While the evidence is compelling, more research is needed',
        'On the other hand, different factors may be involved',
        'Multiple factors contribute to this outcome',
        'The results show mixed results for this approach'
      ];
      
      const nuancePatterns = detector.excellencePatterns.nuance.patterns;
      
      complexTexts.forEach(text => {
        let foundMatch = false;
        nuancePatterns.forEach(pattern => {
          if (pattern.test(text)) {
            foundMatch = true;
          }
          pattern.lastIndex = 0;
        });
        expect(foundMatch).toBe(true);
      });
    });

    test('should detect contextual qualifiers', () => {
      const contextualTexts = [
        'Depending on the specific circumstances',
        'In certain cases, this approach works well',
        'Under specific conditions, the effect is stronger',
        'This is context-dependent and varies by situation'
      ];
      
      const nuancePatterns = detector.excellencePatterns.nuance.patterns;
      
      contextualTexts.forEach(text => {
        let foundMatch = false;
        nuancePatterns.forEach(pattern => {
          if (pattern.test(text)) {
            foundMatch = true;
          }
          pattern.lastIndex = 0;
        });
        expect(foundMatch).toBe(true);
      });
    });
  });

  describe('Transparency Detection', () => {
    
    test('should detect opinion acknowledgment', () => {
      const transparentTexts = [
        'In my opinion, this approach is effective',
        'I believe this strategy will work',
        'From my perspective, the evidence is strong',
        'I think this represents a good solution',
        'In my view, this analysis is comprehensive'
      ];
      
      const transparencyPatterns = detector.excellencePatterns.transparency.patterns;
      
      transparentTexts.forEach(text => {
        let foundMatch = false;
        transparencyPatterns.forEach(pattern => {
          if (pattern.test(text)) {
            foundMatch = true;
          }
          pattern.lastIndex = 0;
        });
        expect(foundMatch).toBe(true);
      });
    });

    test('should detect limitation acknowledgment', () => {
      const limitationTexts = [
        'Important limitations include sample size',
        'These preliminary findings show promise',
        'The study has uncertain outcomes',
        'This requires more research to confirm',
        'This correlation does not imply causation'
      ];
      
      const transparencyPatterns = detector.excellencePatterns.transparency.patterns;
      
      limitationTexts.forEach(text => {
        let foundMatch = false;
        transparencyPatterns.forEach(pattern => {
          if (pattern.test(text)) {
            foundMatch = true;
          }
          pattern.lastIndex = 0;
        });
        expect(foundMatch).toBe(true);
      });
    });
  });

  describe('Pattern Integration', () => {
    
    test('should handle mixed excellence patterns in one text', () => {
      const complexText = `
        According to Dr. Smith's 2024 study published in Nature, 
        the results might indicate a significant trend. However, 
        important limitations include the small sample size. 
        In my opinion, while this appears promising, more research 
        is needed depending on the specific context.
      `;
      
      let totalMatches = 0;
      Object.values(detector.excellencePatterns).forEach(category => {
        category.patterns.forEach(pattern => {
          if (pattern.test(complexText)) {
            totalMatches++;
          }
          pattern.lastIndex = 0;
        });
      });
      
      expect(totalMatches).toBeGreaterThan(3);
    });

    test('should not detect excellence in biased text', () => {
      const biasedTexts = [
        'This is obviously the best solution available',
        'Everyone knows this approach is terrible',
        'It is clearly evident that this never works',
        'All experts agree this is absolutely perfect'
      ];
      
      biasedTexts.forEach(text => {
        let totalMatches = 0;
        Object.values(detector.excellencePatterns).forEach(category => {
          category.patterns.forEach(pattern => {
            if (pattern.test(text)) {
              totalMatches++;
            }
            pattern.lastIndex = 0;
          });
        });
        
        // Biased text should have minimal or no excellence patterns
        expect(totalMatches).toBeLessThan(2);
      });
    });
  });

  describe('Case Sensitivity', () => {
    
    test('should be case insensitive', () => {
      const testCases = [
        'according to dr. smith\'s 2024 research study',
        'ACCORDING TO DR. SMITH\'S 2024 RESEARCH STUDY',
        'According To Dr. Smith\'s 2024 Research Study'
      ];
      
      const attributionPatterns = detector.excellencePatterns.attribution.patterns;
      
      testCases.forEach(text => {
        let foundMatch = false;
        attributionPatterns.forEach(pattern => {
          if (pattern.test(text)) {
            foundMatch = true;
          }
          pattern.lastIndex = 0;
        });
        expect(foundMatch).toBe(true);
      });
    });
  });

  describe('Pattern Performance', () => {
    
    test('should process large text efficiently', () => {
      const largeText = `
        According to Dr. Johnson's 2024 study, the results might indicate 
        significant improvements. However, this appears to depend on context.
        In my opinion, while the evidence seems promising, more research is needed.
      `.repeat(500);
      
      const startTime = performance.now();
      
      let totalMatches = 0;
      Object.values(detector.excellencePatterns).forEach(category => {
        category.patterns.forEach(pattern => {
          const matches = largeText.match(pattern);
          if (matches) {
            totalMatches += matches.length;
          }
        });
      });
      
      const endTime = performance.now();
      const processingTime = endTime - startTime;
      
      expect(totalMatches).toBeGreaterThan(0);
      expect(processingTime).toBeLessThan(500); // Should process quickly
    });

    test('should handle empty and invalid inputs', () => {
      const invalidInputs = ['', null, undefined];
      
      invalidInputs.forEach(input => {
        expect(() => {
          Object.values(detector.excellencePatterns).forEach(category => {
            category.patterns.forEach(pattern => {
              pattern.test(input || '');
              pattern.lastIndex = 0;
            });
          });
        }).not.toThrow();
      });
    });
  });

  describe('Real-World Excellence Examples', () => {
    
    test('should detect excellence in good academic writing', () => {
      const academicText = `
        According to Johnson et al. (2023), the preliminary results 
        suggest a possible correlation between the variables. However, 
        important limitations include the small sample size and 
        geographic constraints. While these findings appear promising, 
        this requires further research to establish causation. In our opinion, 
        this represents an important first step. The data suggests that 
        multiple factors might be involved, and the results should be 
        interpreted carefully depending on the specific context.
      `;
      
      let excellenceScore = 0;
      Object.values(detector.excellencePatterns).forEach(category => {
        category.patterns.forEach(pattern => {
          if (pattern.test(academicText)) {
            excellenceScore++;
          }
          pattern.lastIndex = 0;
        });
      });
      
      expect(excellenceScore).toBeGreaterThan(4);
    });

    test('should detect excellence in transparent journalism', () => {
      const journalismText = `
        Based on interviews with 15 experts and analysis of public data, 
        the situation appears complex. While some indicators suggest 
        improvement, Dr. Maria Lopez from the Policy Institute noted 
        that "multiple factors could be influencing these trends." 
        This preliminary assessment may not reflect the full picture, 
        and more information is needed to draw definitive conclusions.
      `;
      
      let excellenceScore = 0;
      Object.values(detector.excellencePatterns).forEach(category => {
        category.patterns.forEach(pattern => {
          if (pattern.test(journalismText)) {
            excellenceScore++;
          }
          pattern.lastIndex = 0;
        });
      });
      
      expect(excellenceScore).toBeGreaterThan(3);
    });

    test('should not detect false excellence in hedge-heavy text', () => {
      const overHedgedText = `
        Maybe this might possibly work, though it seems like it could 
        perhaps be effective. It appears that it might potentially 
        show some possible results that could suggest improvement.
      `;
      
      let excellenceScore = 0;
      Object.values(detector.excellencePatterns).forEach(category => {
        category.patterns.forEach(pattern => {
          if (pattern.test(overHedgedText)) {
            excellenceScore++;
          }
          pattern.lastIndex = 0;
        });
      });
      
      // Should detect some nuance but not excessive excellence
      expect(excellenceScore).toBeLessThan(10);
    });
  });

  describe('Pattern Quality', () => {
    
    test('should have meaningful pattern coverage', () => {
      const categories = Object.keys(detector.excellencePatterns);
      expect(categories.length).toBeGreaterThan(2);
      
      categories.forEach(category => {
        const patterns = detector.excellencePatterns[category].patterns;
        expect(patterns.length).toBeGreaterThan(2);
        expect(patterns.length).toBeLessThan(50); // Not too many
      });
    });

    test('should have valid regex patterns', () => {
      Object.values(detector.excellencePatterns).forEach(category => {
        category.patterns.forEach(pattern => {
          expect(pattern).toBeInstanceOf(RegExp);
          expect(pattern.source).toBeTruthy();
          
          // Should have global and case-insensitive flags
          expect(pattern.flags).toContain('g');
          expect(pattern.flags).toContain('i');
        });
      });
    });

    test('should have distinct pattern categories', () => {
      const allPatterns = [];
      Object.values(detector.excellencePatterns).forEach(category => {
        category.patterns.forEach(pattern => {
          allPatterns.push(pattern.source);
        });
      });
      
      const uniquePatterns = new Set(allPatterns);
      expect(uniquePatterns.size).toBe(allPatterns.length);
    });
  });

  describe('Intensity Calculation', () => {

    test('should return default intensity for unknown type', () => {
      expect(detector.calculateIntensity('some text', 'unknownType')).toBe(2);
    });

    test('should return level 1 for mild absolute words', () => {
      expect(detector.calculateIntensity('mostly true', 'absolute')).toBe(1);
      expect(detector.calculateIntensity('often happens', 'absolute')).toBe(1);
    });

    test('should return level 2 for moderate absolute words', () => {
      expect(detector.calculateIntensity('always correct', 'absolute')).toBe(2);
      expect(detector.calculateIntensity('never wrong', 'absolute')).toBe(2);
    });

    test('should return level 3 for severe absolute words', () => {
      expect(detector.calculateIntensity('absolutely certain', 'absolute')).toBe(3);
      expect(detector.calculateIntensity('completely wrong', 'absolute')).toBe(3);
    });

    test('should return level 1 for mild opinion words', () => {
      expect(detector.calculateIntensity('seems right', 'opinion')).toBe(1);
      expect(detector.calculateIntensity('appears valid', 'opinion')).toBe(1);
    });

    test('should return level 2 for moderate opinion words', () => {
      expect(detector.calculateIntensity('obviously wrong', 'opinion')).toBe(2);
      expect(detector.calculateIntensity('clearly true', 'opinion')).toBe(2);
    });

    test('should return level 3 for severe opinion words', () => {
      expect(detector.calculateIntensity('undeniably correct', 'opinion')).toBe(3);
      expect(detector.calculateIntensity('unquestionably true', 'opinion')).toBe(3);
    });

    test('should handle emotional intensity levels', () => {
      expect(detector.calculateIntensity('concerning trend', 'emotional')).toBe(1);
      expect(detector.calculateIntensity('crisis situation', 'emotional')).toBe(2);
      expect(detector.calculateIntensity('evil forces', 'emotional')).toBe(3);
    });

    test('should handle weasel intensity levels', () => {
      expect(detector.calculateIntensity('some people think', 'weasel')).toBe(1);
      expect(detector.calculateIntensity('studies show it works', 'weasel')).toBe(2);
      expect(detector.calculateIntensity('everyone knows this', 'weasel')).toBe(3);
    });

    test('should handle gaslighting intensity levels', () => {
      expect(detector.calculateIntensity("perhaps you're mistaken", 'gaslighting')).toBe(1);
      expect(detector.calculateIntensity('concerns are overblown', 'gaslighting')).toBe(2);
      expect(detector.calculateIntensity('that never happened', 'gaslighting')).toBe(3);
    });

    test('should default to level 2 when no word matches', () => {
      expect(detector.calculateIntensity('random text', 'absolute')).toBe(2);
      expect(detector.calculateIntensity('random text', 'opinion')).toBe(2);
    });
  });

  describe('Portrayal Detection', () => {

    test('should detect positive hero portrayal', () => {
      const result = detector.detectPortrayal('He is a hero to many.');
      expect(result).not.toBeNull();
      expect(result.valence).toBe('positive');
      expect(result.type).toBe('hero');
    });

    test('should detect positive virtue portrayal', () => {
      const result = detector.detectPortrayal('A truly noble act.');
      expect(result).not.toBeNull();
      expect(result.valence).toBe('positive');
      expect(result.type).toBe('virtue');
    });

    test('should detect positive success portrayal', () => {
      const result = detector.detectPortrayal('A brilliant strategy.');
      expect(result).not.toBeNull();
      expect(result.valence).toBe('positive');
      expect(result.type).toBe('success');
    });

    test('should detect negative villain portrayal', () => {
      const result = detector.detectPortrayal('An evil regime.');
      expect(result).not.toBeNull();
      expect(result.valence).toBe('negative');
      expect(result.type).toBe('villain');
    });

    test('should detect negative failure portrayal', () => {
      const result = detector.detectPortrayal('A total disaster occurred.');
      expect(result).not.toBeNull();
      expect(result.valence).toBe('negative');
      expect(result.type).toBe('failure');
    });

    test('should detect negative moral portrayal', () => {
      const result = detector.detectPortrayal('Corrupt officials were exposed.');
      expect(result).not.toBeNull();
      expect(result.valence).toBe('negative');
      expect(result.type).toBe('moral');
    });

    test('should return null for neutral text', () => {
      const result = detector.detectPortrayal('The meeting was held on Tuesday.');
      expect(result).toBeNull();
    });
  });

  describe('findExcellence', () => {

    test('should return array of matches with proper structure', () => {
      const text = 'According to Smith et al. (2023), this might indicate improvement.';
      const matches = detector.findExcellence(text);

      expect(Array.isArray(matches)).toBe(true);
      expect(matches.length).toBeGreaterThan(0);

      matches.forEach(match => {
        expect(match).toHaveProperty('index');
        expect(match).toHaveProperty('length');
        expect(match).toHaveProperty('text');
        expect(match).toHaveProperty('type');
        expect(match).toHaveProperty('className');
        expect(match).toHaveProperty('tooltip');
        expect(match.isExcellence).toBe(true);
      });
    });

    test('should return empty array for text with no excellence', () => {
      const matches = detector.findExcellence('Bad terrible awful.');
      expect(matches).toEqual([]);
    });

    test('should detect multiple types in a single text', () => {
      const text = 'According to Smith et al. (2023), the data suggests improvement. However, limitations include sample size. In my opinion, more research is needed.';
      const matches = detector.findExcellence(text);
      const types = [...new Set(matches.map(m => m.type))];
      expect(types.length).toBeGreaterThan(1);
    });
  });

  describe('calculateHealthScore', () => {

    test('should return 50 when both counts are zero', () => {
      expect(detector.calculateHealthScore(0, 0)).toBe(50);
    });

    test('should return 100 when only excellence', () => {
      expect(detector.calculateHealthScore(10, 0)).toBe(100);
    });

    test('should return 0 when only problems', () => {
      expect(detector.calculateHealthScore(0, 10)).toBe(0);
    });

    test('should return 50 when equal counts', () => {
      expect(detector.calculateHealthScore(5, 5)).toBe(50);
    });

    test('should return rounded integer', () => {
      const score = detector.calculateHealthScore(1, 2);
      expect(score).toBe(Math.round(score));
    });
  });

  describe('getStatistics', () => {

    test('should return full statistics object', () => {
      const text = 'According to Smith et al. (2023), the data suggests improvement. However, limitations include sample size.';
      const problems = [
        { type: 'opinion', text: 'good', intensity: 1 },
        { type: 'absolute', text: 'always', intensity: 2 },
        { type: 'weasel', text: 'studies show', intensity: 3 }
      ];

      const stats = detector.getStatistics(text, problems);

      expect(stats).toHaveProperty('excellence');
      expect(stats).toHaveProperty('problems');
      expect(stats).toHaveProperty('healthScore');

      expect(stats.excellence).toHaveProperty('total');
      expect(stats.excellence).toHaveProperty('byType');
      expect(stats.excellence.total).toBeGreaterThanOrEqual(0);

      expect(stats.problems.total).toBe(3);
      expect(stats.problems.byIntensity[1]).toBe(1);
      expect(stats.problems.byIntensity[2]).toBe(1);
      expect(stats.problems.byIntensity[3]).toBe(1);
    });

    test('should handle empty problems array', () => {
      const text = 'According to Smith et al. (2023), this is nuanced.';
      const stats = detector.getStatistics(text, []);

      expect(stats.problems.total).toBe(0);
      expect(stats.problems.byIntensity[1]).toBe(0);
      expect(stats.problems.byIntensity[2]).toBe(0);
      expect(stats.problems.byIntensity[3]).toBe(0);
      expect(stats.healthScore).toBe(100);
    });

    test('should handle problems without intensity', () => {
      const text = 'Simple text.';
      const problems = [{ type: 'opinion', text: 'good' }];

      const stats = detector.getStatistics(text, problems);
      expect(stats.problems.total).toBe(1);
    });

    test('should count excellence by type', () => {
      const text = 'According to Smith et al. (2023), the evidence suggests improvement. However, in my opinion, limitations include sample size.';
      const stats = detector.getStatistics(text);

      expect(typeof stats.excellence.byType).toBe('object');
      const totalByType = Object.values(stats.excellence.byType).reduce((a, b) => a + b, 0);
      expect(totalByType).toBe(stats.excellence.total);
    });
  });
});
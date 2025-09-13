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
});
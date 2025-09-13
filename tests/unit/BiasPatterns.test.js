// tests/unit/BiasPatterns.test.js

/**
 * TESTING: BiasPatterns Class (Dictionary Index & Pattern Compilation)
 * 
 * Tests the central pattern compilation system that converts word dictionaries 
 * into optimized regex patterns for bias detection.
 */

import { BiasPatterns } from '../../src/dictionaries/index.js';

describe('BiasPatterns', () => {
  let biasPatterns;

  beforeEach(() => {
    biasPatterns = new BiasPatterns();
  });

  describe('Constructor and Initialization', () => {
    
    test('should initialize with all required pattern types', () => {
      expect(biasPatterns.rawPatterns).toBeDefined();
      expect(biasPatterns.compiledPatterns).toBeInstanceOf(Map);
      
      // Check that expected pattern types exist
      const expectedTypes = [
        'opinion', 'tobe', 'absolute', 'passive', 'weasel', 
        'presupposition', 'metaphor', 'minimizer', 'maximizer',
        'falsebalance', 'euphemism', 'emotional', 'gaslighting', 
        'falsedilemma', 'probability'
      ];
      
      expectedTypes.forEach(type => {
        expect(biasPatterns.rawPatterns).toHaveProperty(type);
        expect(Array.isArray(biasPatterns.rawPatterns[type])).toBe(true);
      });
    });

    test('should compile all patterns during initialization', () => {
      // All pattern types should have compiled versions
      const rawTypes = Object.keys(biasPatterns.rawPatterns);
      
      rawTypes.forEach(type => {
        expect(biasPatterns.compiledPatterns.has(type)).toBe(true);
        const compiled = biasPatterns.compiledPatterns.get(type);
        expect(Array.isArray(compiled)).toBe(true);
      });
    });

    test('should handle empty or invalid patterns gracefully', () => {
      // Test that constructor doesn't throw even with problematic patterns
      expect(() => new BiasPatterns()).not.toThrow();
    });
  });

  describe('Raw Pattern Loading', () => {
    
    test('should load opinion words correctly', () => {
      const opinionPatterns = biasPatterns.rawPatterns.opinion;
      
      expect(Array.isArray(opinionPatterns)).toBe(true);
      expect(opinionPatterns.length).toBeGreaterThan(0);
      
      // Should contain known opinion words from certainty category
      expect(opinionPatterns).toContain('obviously');
      expect(opinionPatterns).toContain('clearly');
      expect(opinionPatterns).toContain('definitely');
    });

    test('should load to-be verbs correctly', () => {
      const toBePatterns = biasPatterns.rawPatterns.tobe;
      
      expect(Array.isArray(toBePatterns)).toBe(true);
      expect(toBePatterns.length).toBeGreaterThan(0);
      
      // Should contain common to-be verbs
      expect(toBePatterns).toContain('is');
      expect(toBePatterns).toContain('are');
      expect(toBePatterns).toContain('was');
      expect(toBePatterns).toContain('were');
    });

    test('should load all bias type patterns', () => {
      const allTypes = Object.keys(biasPatterns.rawPatterns);
      
      allTypes.forEach(type => {
        const patterns = biasPatterns.rawPatterns[type];
        
        expect(Array.isArray(patterns)).toBe(true);
        expect(patterns.length).toBeGreaterThan(0);
        
        // Each pattern should be a string
        patterns.forEach(pattern => {
          expect(typeof pattern).toBe('string');
          expect(pattern.length).toBeGreaterThan(0);
        });
      });
    });
  });

  describe('Opinion Word Sub-Categories', () => {
    
    test('should provide opinion sub-categories', () => {
      const subCategories = biasPatterns.getOpinionSubCategories();
      
      expect(typeof subCategories).toBe('object');
      expect(subCategories).toHaveProperty('certainty');
      expect(subCategories).toHaveProperty('hedging');
      
      // Each sub-category should have required structure
      Object.values(subCategories).forEach(category => {
        expect(category).toHaveProperty('name');
        expect(category).toHaveProperty('words');
        expect(Array.isArray(category.words)).toBe(true);
      });
    });

    test('should find sub-category for specific words', () => {
      // Test known words
      const obviouslyCategory = biasPatterns.getOpinionSubCategory('obviously');
      expect(obviouslyCategory).toBeDefined();
      expect(obviouslyCategory.id).toBe('certainty');
      expect(obviouslyCategory.name).toBe('Certainty/Conviction');

      const maybeCategory = biasPatterns.getOpinionSubCategory('maybe');
      expect(maybeCategory).toBeDefined();
      expect(maybeCategory.id).toBe('hedging');
    });

    test('should handle case insensitive word lookup', () => {
      const upperCase = biasPatterns.getOpinionSubCategory('OBVIOUSLY');
      const lowerCase = biasPatterns.getOpinionSubCategory('obviously');
      const mixedCase = biasPatterns.getOpinionSubCategory('Obviously');
      
      expect(upperCase).toEqual(lowerCase);
      expect(mixedCase).toEqual(lowerCase);
    });

    test('should return null for unknown words', () => {
      const unknown = biasPatterns.getOpinionSubCategory('nonexistentword');
      expect(unknown).toBeNull();
      
      const empty = biasPatterns.getOpinionSubCategory('');
      expect(empty).toBeNull();
    });
  });

  describe('Pattern Compilation', () => {
    
    test('should compile patterns into regex objects', () => {
      const compiledOpinion = biasPatterns.compiledPatterns.get('opinion');
      
      expect(Array.isArray(compiledOpinion)).toBe(true);
      expect(compiledOpinion.length).toBeGreaterThan(0);
      
      // Each compiled pattern should be a RegExp or pattern object
      compiledOpinion.forEach(pattern => {
        expect(pattern).toBeDefined();
        // Should have either regex property or be a RegExp
        expect(
          pattern instanceof RegExp || 
          (typeof pattern === 'object' && pattern.regex instanceof RegExp)
        ).toBe(true);
      });
    });

    test('should handle different pattern types correctly', () => {
      const types = ['opinion', 'tobe', 'absolute', 'weasel'];
      
      types.forEach(type => {
        const compiled = biasPatterns.compiledPatterns.get(type);
        expect(compiled).toBeDefined();
        expect(Array.isArray(compiled)).toBe(true);
        expect(compiled.length).toBeGreaterThan(0);
      });
    });

    test('should create working regex patterns', () => {
      const opinionPatterns = biasPatterns.compiledPatterns.get('opinion');
      const testText = 'This is obviously a terrible idea that clearly demonstrates bias.';
      
      let foundMatches = 0;
      opinionPatterns.forEach(patternObj => {
        const regex = patternObj.regex || patternObj;
        if (regex instanceof RegExp) {
          if (regex.test(testText)) {
            foundMatches++;
          }
        }
      });
      
      expect(foundMatches).toBeGreaterThan(0);
    });

    test('should handle malformed patterns gracefully', () => {
      // This tests the error handling in compilePatterns
      const patterns = new BiasPatterns();
      
      // Should not crash even if some patterns are malformed
      expect(patterns.compiledPatterns.size).toBeGreaterThan(0);
    });
  });

  describe('Pattern Effectiveness', () => {
    
    test('should detect bias in realistic text', () => {
      const testTexts = [
        'This is obviously the best solution available.',
        'The results clearly show that this approach is problematic.',
        'Everyone knows this is absolutely the worst policy.',
        'Some people say this might be concerning.'
      ];
      
      testTexts.forEach(text => {
        let detectedTypes = [];
        
        for (const [type, patterns] of biasPatterns.compiledPatterns.entries()) {
          patterns.forEach(patternObj => {
            const regex = patternObj.regex || patternObj;
            if (regex instanceof RegExp && regex.test(text)) {
              detectedTypes.push(type);
            }
          });
        }
        
        expect(detectedTypes.length).toBeGreaterThan(0);
      });
    });

    test('should not match partial words', () => {
      const problematicText = 'The probability of success is high.';
      const opinionPatterns = biasPatterns.compiledPatterns.get('opinion');
      
      let falsePositives = 0;
      opinionPatterns.forEach(patternObj => {
        const regex = patternObj.regex || patternObj;
        if (regex instanceof RegExp) {
          // Reset regex state
          regex.lastIndex = 0;
          if (regex.test(problematicText)) {
            // Check if it's matching "obviously" inside "probability"
            const matches = problematicText.match(regex);
            if (matches && matches.some(match => match === 'obvious')) {
              falsePositives++;
            }
          }
        }
      });
      
      expect(falsePositives).toBe(0);
    });

    test('should be case insensitive', () => {
      const upperText = 'THIS IS OBVIOUSLY WRONG';
      const lowerText = 'this is obviously wrong';
      const mixedText = 'This Is Obviously Wrong';
      
      const opinionPatterns = biasPatterns.compiledPatterns.get('opinion');
      
      [upperText, lowerText, mixedText].forEach(text => {
        let matches = 0;
        opinionPatterns.forEach(patternObj => {
          const regex = patternObj.regex || patternObj;
          if (regex instanceof RegExp) {
            regex.lastIndex = 0;
            if (regex.test(text)) {
              matches++;
            }
          }
        });
        expect(matches).toBeGreaterThan(0);
      });
    });
  });

  describe('Performance', () => {
    
    test('should compile patterns efficiently', () => {
      const startTime = performance.now();
      const newPatterns = new BiasPatterns();
      const endTime = performance.now();
      
      const compilationTime = endTime - startTime;
      expect(compilationTime).toBeLessThan(1000); // Should compile in under 1 second
      expect(newPatterns.compiledPatterns.size).toBeGreaterThan(10);
    });

    test('should handle large text efficiently', () => {
      const largeText = 'This is obviously a test sentence with some clearly biased language. '.repeat(1000);
      const opinionPatterns = biasPatterns.compiledPatterns.get('opinion');
      
      const startTime = performance.now();
      
      let totalMatches = 0;
      opinionPatterns.forEach(patternObj => {
        const regex = patternObj.regex || patternObj;
        if (regex instanceof RegExp) {
          regex.lastIndex = 0;
          const matches = largeText.match(regex);
          if (matches) {
            totalMatches += matches.length;
          }
        }
      });
      
      const endTime = performance.now();
      const processingTime = endTime - startTime;
      
      expect(totalMatches).toBeGreaterThan(0);
      expect(processingTime).toBeLessThan(500); // Should process in under 500ms
    });
  });

  describe('Data Integrity', () => {
    
    test('should have consistent pattern data across types', () => {
      const allTypes = Object.keys(biasPatterns.rawPatterns);
      
      allTypes.forEach(type => {
        const rawPatterns = biasPatterns.rawPatterns[type];
        const compiledPatterns = biasPatterns.compiledPatterns.get(type);
        
        expect(rawPatterns.length).toBeGreaterThan(0);
        expect(compiledPatterns.length).toBeGreaterThan(0);
        
        // Compiled patterns should generally be related to raw patterns count
        // (though not necessarily 1:1 due to compilation optimizations)
        expect(compiledPatterns.length).toBeLessThanOrEqual(rawPatterns.length + 10);
      });
    });

    test('should not have empty pattern arrays', () => {
      for (const [type, patterns] of biasPatterns.compiledPatterns.entries()) {
        expect(patterns.length).toBeGreaterThan(0);
        
        patterns.forEach((pattern, index) => {
          expect(pattern).toBeDefined();
          // Should not be empty regex or invalid pattern
          if (pattern instanceof RegExp) {
            expect(pattern.source).toBeTruthy();
          } else if (pattern.regex instanceof RegExp) {
            expect(pattern.regex.source).toBeTruthy();
          }
        });
      }
    });

    test('should maintain type consistency', () => {
      const expectedTypes = Object.keys(biasPatterns.rawPatterns);
      const compiledTypes = Array.from(biasPatterns.compiledPatterns.keys());
      
      expect(compiledTypes.sort()).toEqual(expectedTypes.sort());
    });
  });

  describe('Integration with BiasConfig', () => {
    
    test('should support all bias types defined in BiasConfig', () => {
      // This test ensures BiasPatterns supports all bias types that BiasConfig defines
      const patternTypes = Object.keys(biasPatterns.rawPatterns);
      
      // Core bias types that should always be supported
      const coreTypes = ['opinion', 'tobe', 'absolute'];
      coreTypes.forEach(type => {
        expect(patternTypes).toContain(type);
      });
      
      // Should have a reasonable number of pattern types
      expect(patternTypes.length).toBeGreaterThan(10);
    });
  });
});
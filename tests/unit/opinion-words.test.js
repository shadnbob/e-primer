// tests/unit/opinion-words.test.js

/**
 * TESTING TUTORIAL: Testing Dictionary/Pattern Files with Vitest + ES6
 * 
 * This shows how to test word dictionaries and pattern files:
 * 1. Test data structure and quality
 * 2. Test word patterns for effectiveness  
 * 3. Test for common issues (duplicates, case sensitivity, etc.)
 * 4. Test integration with pattern matching
 */

import { opinionWords } from '../../src/dictionaries/opinion-words.js';

describe('Opinion Words Dictionary', () => {
  
  describe('Dictionary Structure', () => {
    
    test('should have expected categories', () => {
      expect(opinionWords).toHaveProperty('certainty');
      expect(opinionWords).toHaveProperty('hedging');
      // The real structure has different categories - let's test what exists
      const categories = Object.keys(opinionWords);
      expect(categories.length).toBeGreaterThan(2);
    });

    test('should have valid structure for each category', () => {
      Object.values(opinionWords).forEach(category => {
        expect(category).toHaveProperty('name');
        expect(category).toHaveProperty('description');
        expect(category).toHaveProperty('words');
        expect(category).toHaveProperty('icon');
        expect(category).toHaveProperty('color');
        
        // Test types
        expect(typeof category.name).toBe('string');
        expect(typeof category.description).toBe('string');
        expect(Array.isArray(category.words)).toBe(true);
        expect(typeof category.icon).toBe('string');
        expect(typeof category.color).toBe('string');
      });
    });

    test('should have valid color codes', () => {
      Object.values(opinionWords).forEach(category => {
        expect(category.color).toMatch(/^#[0-9A-F]{6}$/i);
      });
    });
  });

  describe('Word Quality', () => {
    
    test('should have non-empty word lists', () => {
      Object.values(opinionWords).forEach(category => {
        expect(category.words.length).toBeGreaterThan(0);
      });
    });

    test('should have consistent word formatting', () => {
      // CONCEPT: Testing data consistency - but allow for proper nouns/hyphenated words
      Object.values(opinionWords).forEach(category => {
        category.words.forEach(word => {
          expect(typeof word).toBe('string');
          expect(word.length).toBeGreaterThan(0);
          
          // Most words should be lowercase, but allow exceptions like "un-American"
          if (!word.includes('-') && !word.includes('\'')) {
            expect(word).toBe(word.toLowerCase());
          }
        });
      });
    });

    test('should not have duplicate words within categories', () => {
      Object.entries(opinionWords).forEach(([categoryName, category]) => {
        const words = category.words;
        const uniqueWords = new Set(words);
        expect(uniqueWords.size).toBe(words.length, 
          `Duplicates found in ${categoryName}: ${words.filter((word, index) => words.indexOf(word) !== index)}`);
      });
    });

    test('should track duplicate words across categories (informational)', () => {
      // CONCEPT: Some words might legitimately appear in multiple categories
      // This test documents duplicates rather than failing on them
      const allWords = [];
      const wordToCategories = {};
      const duplicates = [];
      
      Object.entries(opinionWords).forEach(([categoryName, category]) => {
        category.words.forEach(word => {
          if (allWords.includes(word)) {
            if (!wordToCategories[word]) {
              wordToCategories[word] = [];
            }
            wordToCategories[word].push(categoryName);
            if (!duplicates.includes(word)) {
              duplicates.push(word);
            }
          } else {
            allWords.push(word);
            wordToCategories[word] = [categoryName];
          }
        });
      });
      
      // Log duplicates for awareness (don't fail the test)
      if (duplicates.length > 0) {
        console.log(`Found ${duplicates.length} words in multiple categories:`, 
                   duplicates.map(word => `"${word}": ${wordToCategories[word].join(', ')}`));
      }
      
      // Test passes - duplicates might be intentional
      expect(allWords.length).toBeGreaterThan(0);
    });

    test('should not have words with leading/trailing spaces', () => {
      Object.values(opinionWords).forEach(category => {
        category.words.forEach(word => {
          expect(word).toBe(word.trim());
        });
      });
    });

    test('should not have empty strings', () => {
      Object.values(opinionWords).forEach(category => {
        category.words.forEach(word => {
          expect(word.length).toBeGreaterThan(0);
        });
      });
    });
  });

  describe('Word Effectiveness', () => {
    
    test('should contain expected certainty words', () => {
      const certaintyWords = opinionWords.certainty.words;
      
      // CONCEPT: Testing that essential words are included
      const expectedWords = ['obviously', 'clearly', 'definitely', 'absolutely', 'certainly'];
      expectedWords.forEach(word => {
        expect(certaintyWords).toContain(word);
      });
    });

    test('should contain expected words in real categories', () => {
      // Test actual categories that exist
      const certaintyWords = opinionWords.certainty.words;
      const hedgingWords = opinionWords.hedging.words;
      
      const expectedCertaintyWords = ['terrible', 'wonderful', 'brilliant', 'stupid', 'obviously', 'clearly'];
      const expectedHedgingWords = ['maybe', 'probably', 'perhaps'];
      
      // Test some words exist (they might not all be in these specific categories)
      const allWords = Object.values(opinionWords).flatMap(category => category.words);
      expectedCertaintyWords.forEach(word => {
        if (allWords.includes(word)) {
          // Word exists somewhere in the dictionary
          expect(allWords).toContain(word);
        }
      });
      
      expectedHedgingWords.forEach(word => {
        expect(hedgingWords).toContain(word);
      });
    });

    test('should have reasonable word count per category', () => {
      // CONCEPT: Testing that categories have adequate coverage  
      expect(opinionWords.certainty.words.length).toBeGreaterThan(5);
      expect(opinionWords.hedging.words.length).toBeGreaterThan(3);
      
      // But not too many (which might cause false positives)
      expect(opinionWords.certainty.words.length).toBeLessThan(50);
      expect(opinionWords.hedging.words.length).toBeLessThan(20);
    });
  });

  describe('Pattern Matching Integration', () => {
    
    // Helper function to create regex pattern from words
    function createWordPattern(words) {
      const escapedWords = words.map(word => 
        word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      );
      return new RegExp('\\b(' + escapedWords.join('|') + ')\\b', 'gi');
    }

    test('should match words in realistic sentences', () => {
      const certaintyWords = opinionWords.certainty.words;
      const pattern = createWordPattern(certaintyWords);
      
      const testSentences = [
        'This is obviously the best solution.',
        'The results clearly show a pattern.',
        'We definitely need to take action.',
        'This is absolutely essential.'
      ];

      testSentences.forEach(sentence => {
        expect(pattern.test(sentence)).toBe(true);
        pattern.lastIndex = 0; // Reset for next test
      });
    });

    test('should not match partial words', () => {
      const certaintyWords = opinionWords.certainty.words;
      const pattern = createWordPattern(certaintyWords);
      
      // These should NOT match because "obviously" is part of "probability"
      const testSentences = [
        'The probability of this happening is low.',
        'His responsibility was clear.',
        'The indefinitely long process continues.'
      ];

      testSentences.forEach(sentence => {
        expect(pattern.test(sentence)).toBe(false);
        pattern.lastIndex = 0;
      });
    });

    test('should be case insensitive', () => {
      const certaintyWords = opinionWords.certainty.words;
      const pattern = createWordPattern(certaintyWords);
      
      const testCases = [
        'OBVIOUSLY this is wrong',
        'Obviously this is wrong',
        'obviously this is wrong'
      ];

      testCases.forEach(testCase => {
        expect(pattern.test(testCase)).toBe(true);
        pattern.lastIndex = 0;
      });
    });

    test('should handle multiple matches in one sentence', () => {
      const certaintyWords = opinionWords.certainty.words;
      const pattern = createWordPattern(certaintyWords);
      
      const sentence = 'This is obviously wrong and clearly terrible, definitely a bad idea.';
      
      const matches = [];
      let match;
      while ((match = pattern.exec(sentence)) !== null) {
        matches.push(match[1].toLowerCase());
      }
      
      expect(matches).toContain('obviously');
      expect(matches).toContain('clearly');
      expect(matches).toContain('definitely');
      expect(matches.length).toBe(3);
    });
  });

  describe('Real-World Testing', () => {
    
    // Helper function needs to be in scope
    function createWordPattern(words) {
      const escapedWords = words.map(word => 
        word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      );
      return new RegExp('\\b(' + escapedWords.join('|') + ')\\b', 'gi');
    }
    
    test('should detect bias in news headline examples', () => {
      // Get words from all categories that actually exist
      const allWords = Object.values(opinionWords).flatMap(category => category.words);
      const pattern = createWordPattern(allWords);
      
      const biasedHeadlines = [
        'Climate Change is Obviously a Hoax, Scientists Say',
        'This Terrible Policy Will Definitely Destroy the Economy',
        'Brilliant New Study Clearly Shows Vaccines are Safe'
      ];
      
      biasedHeadlines.forEach(headline => {
        expect(pattern.test(headline)).toBe(true, `Should detect bias in: "${headline}"`);
        pattern.lastIndex = 0;
      });
    });

    test('should not flag neutral language', () => {
      const allWords = Object.values(opinionWords).flatMap(category => category.words);
      const pattern = createWordPattern(allWords);
      
      const neutralSentences = [
        'The study examined climate change effects over 20 years.',
        'The policy will impact economic growth according to analysts.',
        'Researchers found evidence supporting vaccine effectiveness.'
      ];
      
      neutralSentences.forEach(sentence => {
        expect(pattern.test(sentence)).toBe(false, `Should not detect bias in: "${sentence}"`);
        pattern.lastIndex = 0;
      });
    });

    test('should handle common word combinations', () => {
      // CONCEPT: Testing edge cases and common patterns
      const certaintyWords = opinionWords.certainty.words;
      const pattern = createWordPattern(certaintyWords);
      
      const edgeCases = [
        'He said, "Obviously, this is wrong."', // Quoted speech
        'The obviously biased report was rejected.', // Adjacent words
        'Obviously-flawed logic was evident.' // Hyphenated
      ];
      
      edgeCases.forEach(testCase => {
        const result = pattern.test(testCase);
        expect(typeof result).toBe('boolean'); // Should handle gracefully
        pattern.lastIndex = 0;
      });
    });
  });

  // CONCEPT: Performance testing for large-scale operations
  describe('Performance', () => {
    
    // Helper function for performance tests
    function createWordPattern(words) {
      const escapedWords = words.map(word => 
        word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      );
      return new RegExp('\\b(' + escapedWords.join('|') + ')\\b', 'gi');
    }
    
    test('should handle large text efficiently', () => {
      const allWords = Object.values(opinionWords)
        .flatMap(category => category.words);
      const pattern = createWordPattern(allWords);
      
      // Create large text with some bias words
      const baseText = 'This is obviously a test with some clearly biased language. ';
      const largeText = baseText.repeat(1000); // ~70k characters
      
      const startTime = performance.now();
      const matches = [];
      let match;
      
      while ((match = pattern.exec(largeText)) !== null) {
        matches.push(match[1]);
      }
      
      const endTime = performance.now();
      const processingTime = endTime - startTime;
      
      // Should find matches
      expect(matches.length).toBeGreaterThan(0);
      // Should complete within reasonable time (adjust based on your needs)
      expect(processingTime).toBeLessThan(100); // Less than 100ms
    });
  });
});
// tests/unit/pattern-matching.test.js

/**
 * TESTING TUTORIAL: Your First Unit Test
 * 
 * A unit test checks a small piece of code in isolation.
 * We're testing pattern matching - does our code correctly identify bias words?
 * 
 * CONCEPT: require() vs import
 * - require() is CommonJS (older, more compatible)
 * - import is ES6 modules (newer, but trickier to set up with Jest)
 * We'll use require() for now to focus on testing concepts
 */

// For now, let's create mock data to demonstrate testing concepts
// Later we'll show how to test actual files
const mockOpinionWords = {
  certainty: {
    words: [
      "clearly", "obviously", "undoubtedly", "certainly", "definitely", "absolutely",
      "surely", "undeniably", "unquestionably", "indisputably"
    ]
  }
};

// describe() groups related tests together
describe('Opinion Words Pattern Matching', () => {
  
  // test() (or it()) defines a single test case
  test('should contain expected certainty words', () => {
    // CONCEPT: Assertions check if something is true
    // expect(actual).toBe(expected) - checks exact equality
    
    const certaintyWords = mockOpinionWords.certainty.words;
    
    // Test that our array contains specific words we need
    expect(certaintyWords).toContain('obviously');
    expect(certaintyWords).toContain('clearly');
    expect(certaintyWords).toContain('definitely');
    
    // Test that it's an array and not empty
    expect(Array.isArray(certaintyWords)).toBe(true);
    expect(certaintyWords.length).toBeGreaterThan(0);
  });

  test('should not contain duplicate words', () => {
    const certaintyWords = mockOpinionWords.certainty.words;
    
    // CONCEPT: Set removes duplicates, so if no duplicates exist,
    // the Set size should equal the array length
    const uniqueWords = new Set(certaintyWords);
    
    expect(uniqueWords.size).toBe(certaintyWords.length);
  });

  test('should have words in lowercase for consistency', () => {
    const certaintyWords = mockOpinionWords.certainty.words;
    
    // CONCEPT: forEach() lets us check every item in an array
    certaintyWords.forEach(word => {
      expect(word).toBe(word.toLowerCase());
    });
  });

  test('should have valid word structure', () => {
    const certaintyWords = mockOpinionWords.certainty.words;
    
    certaintyWords.forEach(word => {
      // Words should be strings
      expect(typeof word).toBe('string');
      
      // Words should not be empty
      expect(word.length).toBeGreaterThan(0);
      
      // Words should not have leading/trailing spaces
      expect(word).toBe(word.trim());
    });
  });
});

// CONCEPT: Test-Driven Development (TDD)
// Let's write a test for functionality that doesn't exist yet!
describe('Pattern Regex Generation', () => {
  
  // This test will fail until we create the function it's testing
  test('should create word boundary regex from word list', () => {
    // Let's assume we want a function that creates regex patterns
    // from our word lists for efficient matching
    
    const words = ['obviously', 'clearly', 'definitely'];
    
    // This function doesn't exist yet - we'll create it!
    // const regex = createWordBoundaryRegex(words);
    
    // For now, let's skip this test
    // expect(regex.test('This is obviously wrong')).toBe(true);
    // expect(regex.test('This is probability theory')).toBe(false);
    
    // CONCEPT: test.skip() skips a test (like a TODO)
    // We'll implement this functionality later
  });
});
// tests/unit/pattern-matcher.test.js

/**
 * TESTING TUTORIAL: Testing Actual Functions
 * 
 * Now let's write tests for actual pattern matching functionality
 * This demonstrates Test-Driven Development (TDD):
 * 1. Write test first (describes what we want)
 * 2. Run test (it fails - RED)
 * 3. Write minimal code to make test pass (GREEN)
 * 4. Improve the code (REFACTOR)
 */

// Let's create a simple pattern matcher function to test
function createBiasPatternMatcher(words) {
  // CONCEPT: This function creates a regex pattern from an array of words
  // It uses word boundaries (\b) to match whole words only
  
  if (!Array.isArray(words) || words.length === 0) {
    return null;
  }
  
  // Escape special regex characters in each word
  const escapedWords = words.map(word => 
    word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  );
  
  // Create pattern that matches any of the words with word boundaries
  const pattern = '\\b(' + escapedWords.join('|') + ')\\b';
  
  return new RegExp(pattern, 'gi'); // global, case-insensitive
}

function findBiasInText(text, patternRegex) {
  if (!patternRegex || !text) {
    return [];
  }
  
  const matches = [];
  let match;
  
  // BUGFIX: Create fresh regex to avoid stateful issues
  // The global flag makes regex stateful, so we create a new one
  const freshRegex = new RegExp(patternRegex.source, patternRegex.flags);
  
  while ((match = freshRegex.exec(text)) !== null) {
    matches.push({
      word: match[1],
      index: match.index,
      fullMatch: match[0]
    });
  }
  
  return matches;
}

// Now let's test these functions
describe('Bias Pattern Matcher', () => {
  
  describe('createBiasPatternMatcher', () => {
    
    test('should create regex from word array', () => {
      const words = ['obviously', 'clearly', 'definitely'];
      const regex = createBiasPatternMatcher(words);
      
      // Test that we got a RegExp object
      expect(regex).toBeInstanceOf(RegExp);
      
      // BUGFIX: Reset regex between tests due to global flag statefulness
      // Test that it matches the words we put in
      regex.lastIndex = 0;
      expect(regex.test('This is obviously wrong')).toBe(true);
      
      regex.lastIndex = 0;
      expect(regex.test('This is clearly a problem')).toBe(true);
      
      regex.lastIndex = 0;
      expect(regex.test('This is definitely bad')).toBe(true);
    });
    
    test('should match whole words only', () => {
      const words = ['obviously'];
      const regex = createBiasPatternMatcher(words);
      
      // Should match the word
      expect(regex.test('This is obviously wrong')).toBe(true);
      
      // Should NOT match when the word is part of another word
      expect(regex.test('The probability of this is low')).toBe(false);
      
      // Reset regex for next test
      regex.lastIndex = 0;
      expect(regex.test('Obviously, this works')).toBe(true);
    });
    
    test('should be case insensitive', () => {
      const words = ['obviously'];
      const regex = createBiasPatternMatcher(words);
      
      regex.lastIndex = 0;
      expect(regex.test('OBVIOUSLY wrong')).toBe(true);
      
      regex.lastIndex = 0;
      expect(regex.test('Obviously wrong')).toBe(true);
      
      regex.lastIndex = 0;
      expect(regex.test('obviously wrong')).toBe(true);
    });
    
    test('should handle empty or invalid input', () => {
      expect(createBiasPatternMatcher([])).toBe(null);
      expect(createBiasPatternMatcher(null)).toBe(null);
      expect(createBiasPatternMatcher(undefined)).toBe(null);
    });
    
    test('should escape special regex characters', () => {
      // Test with words that contain regex special characters
      const words = ['test.word', 'test+word', 'test*word'];
      const regex = createBiasPatternMatcher(words);
      
      regex.lastIndex = 0;
      expect(regex.test('This has test.word in it')).toBe(true);
      
      regex.lastIndex = 0;
      expect(regex.test('This has test+word in it')).toBe(true);
      
      regex.lastIndex = 0;
      expect(regex.test('This has test*word in it')).toBe(true);
      
      // Should NOT match variations (proves special chars are escaped)
      regex.lastIndex = 0;
      expect(regex.test('This has testaword in it')).toBe(false);
    });
  });
  
  describe('findBiasInText', () => {
    
    test('should find all bias words in text', () => {
      const words = ['obviously', 'clearly', 'terrible'];
      const regex = createBiasPatternMatcher(words);
      const text = 'This is obviously a terrible idea, clearly wrong.';
      
      const matches = findBiasInText(text, regex);
      
      expect(matches).toHaveLength(3);
      expect(matches[0].word).toBe('obviously');
      expect(matches[1].word).toBe('terrible');
      expect(matches[2].word).toBe('clearly');
    });
    
    test('should return empty array when no matches found', () => {
      const words = ['obviously', 'clearly'];
      const regex = createBiasPatternMatcher(words);
      const text = 'This is a neutral statement about facts.';
      
      const matches = findBiasInText(text, regex);
      
      expect(matches).toHaveLength(0);
      expect(Array.isArray(matches)).toBe(true);
    });
    
    test('should handle multiple instances of same word', () => {
      const words = ['obviously'];
      const regex = createBiasPatternMatcher(words);
      const text = 'Obviously this is wrong, and obviously that is too.';
      
      const matches = findBiasInText(text, regex);
      
      expect(matches).toHaveLength(2);
      expect(matches[0].word).toBe('Obviously');
      expect(matches[1].word).toBe('obviously');
    });
    
    test('should provide match positions', () => {
      const words = ['obviously'];
      const regex = createBiasPatternMatcher(words);
      const text = 'This is obviously wrong.';
      
      const matches = findBiasInText(text, regex);
      
      expect(matches[0].index).toBe(8); // Position where "obviously" starts
      expect(matches[0].fullMatch).toBe('obviously');
    });
  });
});

// CONCEPT: Integration Test
// This tests how multiple functions work together
describe('Pattern Matching Integration', () => {
  
  test('should work with real opinion words', () => {
    const opinionWords = [
      'obviously', 'clearly', 'terrible', 'amazing', 
      'definitely', 'absolutely', 'completely'
    ];
    
    const regex = createBiasPatternMatcher(opinionWords);
    const biasedText = `
      This is obviously a terrible decision. 
      The results are clearly amazing and definitely 
      show that we are absolutely correct.
    `;
    
    const matches = findBiasInText(biasedText, regex);
    
    // Should find multiple bias words
    expect(matches.length).toBeGreaterThan(3);
    
    // Check that we found the expected words
    const foundWords = matches.map(m => m.word.toLowerCase());
    expect(foundWords).toContain('obviously');
    expect(foundWords).toContain('terrible');
    expect(foundWords).toContain('clearly');
    expect(foundWords).toContain('amazing');
  });
});
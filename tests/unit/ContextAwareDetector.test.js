import { ContextAwareDetector } from '../../src/utils/ContextAwareDetector.js';

describe('ContextAwareDetector', () => {
  let detector;

  beforeEach(() => {
    detector = new ContextAwareDetector();
  });

  describe('Constructor', () => {

    test('should initialize with contextual patterns', () => {
      expect(detector.contextualPatterns).toBeDefined();
      expect(detector.windowSize).toBe(100);
    });

    test('should have resolution hierarchy', () => {
      expect(detector.resolutionHierarchy).toBeDefined();
      expect(detector.resolutionHierarchy.priorities).toBeDefined();
    });
  });

  describe('analyzePhrase', () => {

    test('should extract context before and after', () => {
      const text = 'The data it seems that results are good.';
      const index = text.indexOf('it seems');
      const result = detector.analyzePhrase(text, index, 'it seems');

      expect(result.phrase).toBe('it seems');
      expect(result.before).toContain('data');
      expect(result.after).toContain('that');
      expect(result.startIndex).toBe(index);
      expect(result.endIndex).toBe(index + 'it seems'.length);
    });

    test('should handle phrase at start of text', () => {
      const text = 'it seems that data supports this.';
      const result = detector.analyzePhrase(text, 0, 'it seems');
      expect(result.before).toBe('');
      expect(result.phrase).toBe('it seems');
    });

    test('should handle phrase at end of text', () => {
      const text = 'The data it seems';
      const index = text.indexOf('it seems');
      const result = detector.analyzePhrase(text, index, 'it seems');
      expect(result.after).toBe('');
    });
  });

  describe('detectWithContext', () => {

    test('should return empty array for unknown phrases', () => {
      const result = detector.detectWithContext('some random text', 'unknown phrase');
      expect(result).toEqual([]);
    });

    test('should detect weasel usage of "studies show"', () => {
      const text = 'studies show that most people agree';
      const results = detector.detectWithContext(text, 'studies show');
      expect(results.length).toBeGreaterThan(0);
      const weaselMatch = results.find(r => r.classification === 'weasel');
      expect(weaselMatch).toBeDefined();
    });

    test('should classify phrase with context', () => {
      const text = 'it seems obvious that everyone agrees';
      const results = detector.detectWithContext(text, 'it seems');
      expect(results.length).toBeGreaterThan(0);
    });
  });

  describe('classifyByContext', () => {

    test('should return null when no patterns match', () => {
      const context = {
        before: 'random',
        after: 'random',
        fullContext: 'random test random'
      };
      const patterns = {
        excellence: [{ after: /specific_nonexistent_pattern/i, confidence: 0.9, reasoning: 'test' }]
      };
      expect(detector.classifyByContext(context, patterns)).toBeNull();
    });

    test('should select highest confidence match', () => {
      const context = {
        before: '',
        after: ' that the data shows improvement',
        fullContext: 'it seems that the data shows improvement'
      };
      const patterns = {
        excellence: [
          { after: /\s+that\s+the\s+data/i, confidence: 0.9, reasoning: 'high' },
          { after: /\s+that/i, confidence: 0.5, reasoning: 'low' }
        ]
      };
      const result = detector.classifyByContext(context, patterns);
      expect(result.confidence).toBe(0.9);
      expect(result.reasoning).toBe('high');
    });
  });

  describe('testPattern', () => {

    test('should match when only before is specified', () => {
      const pattern = { before: /data\s*$/i, confidence: 0.8, reasoning: 'test' };
      const context = { before: 'the data', after: ' something' };
      expect(detector.testPattern(pattern, context)).toBe(true);
    });

    test('should match when only after is specified', () => {
      const pattern = { after: /\s+shows/i, confidence: 0.8, reasoning: 'test' };
      const context = { before: 'some text', after: ' shows results' };
      expect(detector.testPattern(pattern, context)).toBe(true);
    });

    test('should require both before and after when both specified', () => {
      const pattern = {
        before: /data\s*$/i,
        after: /\s+shows/i,
        confidence: 0.8,
        reasoning: 'test'
      };
      expect(detector.testPattern(pattern, { before: 'the data', after: ' shows results' })).toBe(true);
      expect(detector.testPattern(pattern, { before: 'wrong', after: ' shows results' })).toBe(false);
      expect(detector.testPattern(pattern, { before: 'the data', after: ' wrong' })).toBe(false);
    });

    test('should return true when neither before nor after specified', () => {
      const pattern = { confidence: 0.8, reasoning: 'test' };
      expect(detector.testPattern(pattern, { before: 'anything', after: 'anything' })).toBe(true);
    });
  });

  describe('detectAll', () => {

    test('should detect patterns across entire text', () => {
      const text = 'it seems obvious that studies show results';
      const results = detector.detectAll(text);
      expect(Array.isArray(results)).toBe(true);
    });

    test('should sort results by position', () => {
      const text = 'studies show that it seems clear that appears based on evidence';
      const results = detector.detectAll(text);
      for (let i = 1; i < results.length; i++) {
        expect(results[i].index).toBeGreaterThanOrEqual(results[i - 1].index);
      }
    });

    test('should return empty array for text with no contextual patterns', () => {
      const results = detector.detectAll('The cat sat on the mat.');
      expect(results).toEqual([]);
    });
  });

  describe('resolveConflicts', () => {

    test('should keep non-overlapping matches', () => {
      const matches = [
        { index: 0, length: 5, text: 'hello', confidence: 0.8 },
        { index: 10, length: 5, text: 'world', confidence: 0.9 }
      ];
      const resolved = detector.resolveConflicts(matches);
      expect(resolved.length).toBe(2);
    });

    test('should resolve overlapping by choosing highest confidence', () => {
      const matches = [
        { index: 0, length: 10, text: 'hello worl', confidence: 0.6 },
        { index: 5, length: 10, text: 'world text', confidence: 0.9 }
      ];
      const resolved = detector.resolveConflicts(matches);
      expect(resolved.length).toBe(1);
      expect(resolved[0].confidence).toBe(0.9);
    });

    test('should handle empty matches', () => {
      expect(detector.resolveConflicts([])).toEqual([]);
    });
  });

  describe('findOverlapping', () => {

    test('should find overlapping matches', () => {
      const match = { index: 5, length: 10 };
      const all = [
        { index: 5, length: 10 },
        { index: 10, length: 5 },
        { index: 20, length: 5 }
      ];
      const result = detector.findOverlapping(match, all, 0);
      expect(result).toContain(1);
      expect(result).not.toContain(2);
    });

    test('should return empty for non-overlapping', () => {
      const match = { index: 0, length: 5 };
      const all = [
        { index: 0, length: 5 },
        { index: 10, length: 5 }
      ];
      const result = detector.findOverlapping(match, all, 0);
      expect(result).toEqual([1].filter(() => false));
    });
  });

  describe('chooseBestMatch', () => {

    test('should return match with highest confidence', () => {
      const matches = [
        { confidence: 0.5, text: 'low' },
        { confidence: 0.9, text: 'high' },
        { confidence: 0.7, text: 'mid' }
      ];
      const best = detector.chooseBestMatch(matches);
      expect(best.text).toBe('high');
    });

    test('should return first match if all equal confidence', () => {
      const matches = [
        { confidence: 0.5, text: 'first' },
        { confidence: 0.5, text: 'second' }
      ];
      const best = detector.chooseBestMatch(matches);
      expect(best.text).toBe('first');
    });
  });

  describe('explainClassification', () => {

    test('should return explanation object', () => {
      const match = {
        text: 'it seems',
        classification: 'weasel',
        confidence: 0.85,
        reasoning: 'Vague attribution',
        context: 'some context'
      };

      const explanation = detector.explainClassification(match);

      expect(explanation.phrase).toBe('it seems');
      expect(explanation.classification).toBe('weasel');
      expect(explanation.confidence).toBe('85%');
      expect(explanation.reasoning).toBe('Vague attribution');
      expect(explanation.context).toBe('some context');
    });

    test('should format confidence as percentage', () => {
      const match = {
        text: 'test',
        classification: 'excellence',
        confidence: 0.123,
        reasoning: 'reason',
        context: 'ctx'
      };
      const explanation = detector.explainClassification(match);
      expect(explanation.confidence).toBe('12%');
    });
  });
});

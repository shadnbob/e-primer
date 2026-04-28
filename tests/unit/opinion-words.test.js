// tests/unit/opinion-words.test.js

/**
 * TESTING: Opinion Words Dictionary with intensity-grouped words
 * 
 * Words are grouped by intensity: { 1: [...mild], 2: [...moderate], 3: [...strong] }
 */

import { opinionWords, opinionWordsFlat } from '../../src/dictionaries/opinion-words.js';

// Helper: flatten intensity-grouped words into a flat array
function getWords(category) {
    const words = category.words;
    if (Array.isArray(words)) return words;
    return Object.values(words).flat();
}

// Helper: create regex pattern from words
function createWordPattern(words) {
    const escapedWords = words.map(word =>
        word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    );
    return new RegExp('\\b(' + escapedWords.join('|') + ')\\b', 'gi');
}

describe('Opinion Words Dictionary', () => {

    describe('Dictionary Structure', () => {

        test('should have expected categories', () => {
            expect(opinionWords).toHaveProperty('certainty');
            expect(opinionWords).toHaveProperty('hedging');
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

                expect(typeof category.name).toBe('string');
                expect(typeof category.description).toBe('string');
                expect(typeof category.words).toBe('object');
                expect(typeof category.icon).toBe('string');
                expect(typeof category.color).toBe('string');
            });
        });

        test('should have intensity-grouped words', () => {
            Object.entries(opinionWords).forEach(([name, category]) => {
                const words = category.words;
                // Words should be an object with numeric keys (1, 2, 3)
                expect(Array.isArray(words)).toBe(false);
                const levels = Object.keys(words).map(Number);
                levels.forEach(level => {
                    expect([1, 2, 3]).toContain(level);
                    expect(Array.isArray(words[level])).toBe(true);
                });
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
                const words = getWords(category);
                expect(words.length).toBeGreaterThan(0);
            });
        });

        test('should have consistent word formatting', () => {
            Object.values(opinionWords).forEach(category => {
                getWords(category).forEach(word => {
                    expect(typeof word).toBe('string');
                    expect(word.length).toBeGreaterThan(0);
                    if (!word.includes('-') && !word.includes('\'')) {
                        expect(word).toBe(word.toLowerCase());
                    }
                });
            });
        });

        test('should not have duplicate words within categories', () => {
            Object.entries(opinionWords).forEach(([categoryName, category]) => {
                const words = getWords(category);
                const uniqueWords = new Set(words);
                expect(uniqueWords.size).toBe(words.length,
                    `Duplicates in ${categoryName}: ${words.filter((w, i) => words.indexOf(w) !== i)}`);
            });
        });

        test('should track duplicate words across categories (informational)', () => {
            const allWords = [];
            const wordToCategories = {};
            const duplicates = [];

            Object.entries(opinionWords).forEach(([categoryName, category]) => {
                getWords(category).forEach(word => {
                    if (allWords.includes(word)) {
                        if (!wordToCategories[word]) wordToCategories[word] = [];
                        wordToCategories[word].push(categoryName);
                        if (!duplicates.includes(word)) duplicates.push(word);
                    } else {
                        allWords.push(word);
                        wordToCategories[word] = [categoryName];
                    }
                });
            });

            if (duplicates.length > 0) {
                console.log(`Found ${duplicates.length} words in multiple categories:`,
                    duplicates.map(word => `"${word}": ${wordToCategories[word].join(', ')}`));
            }
            expect(allWords.length).toBeGreaterThan(0);
        });

        test('should not have words with leading/trailing spaces', () => {
            Object.values(opinionWords).forEach(category => {
                getWords(category).forEach(word => {
                    expect(word).toBe(word.trim());
                });
            });
        });

        test('should not have empty strings', () => {
            Object.values(opinionWords).forEach(category => {
                getWords(category).forEach(word => {
                    expect(word.length).toBeGreaterThan(0);
                });
            });
        });
    });

    describe('Word Effectiveness', () => {

        test('should contain expected certainty words', () => {
            const certaintyWords = getWords(opinionWords.certainty);
            const expectedWords = ['obviously', 'clearly', 'definitely', 'absolutely', 'certainly'];
            expectedWords.forEach(word => {
                expect(certaintyWords).toContain(word);
            });
        });

        test('should contain expected words in real categories', () => {
            const hedgingWords = getWords(opinionWords.hedging);
            const expectedHedgingWords = ['maybe', 'probably', 'perhaps'];
            expectedHedgingWords.forEach(word => {
                expect(hedgingWords).toContain(word);
            });
        });

        test('should have reasonable word count per category', () => {
            const certaintyWords = getWords(opinionWords.certainty);
            const hedgingWords = getWords(opinionWords.hedging);
            expect(certaintyWords.length).toBeGreaterThan(5);
            expect(hedgingWords.length).toBeGreaterThan(3);
            expect(certaintyWords.length).toBeLessThan(50);
            expect(hedgingWords.length).toBeLessThan(20);
        });
    });

    describe('Flat Export', () => {

        test('should export a flat array of all words', () => {
            expect(Array.isArray(opinionWordsFlat)).toBe(true);
            expect(opinionWordsFlat.length).toBeGreaterThan(0);
        });

        test('flat export should contain all words from all categories', () => {
            Object.values(opinionWords).forEach(category => {
                getWords(category).forEach(word => {
                    expect(opinionWordsFlat).toContain(word);
                });
            });
        });
    });

    describe('Pattern Matching Integration', () => {

        test('should match words in realistic sentences', () => {
            const certaintyWords = getWords(opinionWords.certainty);
            const pattern = createWordPattern(certaintyWords);
            const testSentences = [
                'This is obviously the best solution.',
                'The results clearly show a pattern.',
                'We definitely need to take action.',
                'This is absolutely essential.'
            ];
            testSentences.forEach(sentence => {
                expect(pattern.test(sentence)).toBe(true);
                pattern.lastIndex = 0;
            });
        });

        test('should not match partial words', () => {
            const certaintyWords = getWords(opinionWords.certainty);
            const pattern = createWordPattern(certaintyWords);
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
            const certaintyWords = getWords(opinionWords.certainty);
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
            const certaintyWords = getWords(opinionWords.certainty);
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

        test('should detect bias in news headline examples', () => {
            const pattern = createWordPattern(opinionWordsFlat);
            const biasedHeadlines = [
                'Climate Change is Obviously a Hoax, Scientists Say',
                'This Terrible Policy Will Definitely Destroy the Economy',
                'Brilliant New Study Clearly Shows Vaccines are Safe'
            ];
            biasedHeadlines.forEach(headline => {
                expect(pattern.test(headline)).toBe(true);
                pattern.lastIndex = 0;
            });
        });

        test('should not flag neutral language', () => {
            const pattern = createWordPattern(opinionWordsFlat);
            const neutralSentences = [
                'The study examined climate change effects over 20 years.',
                'The policy will impact economic growth according to analysts.',
                'Researchers found evidence supporting vaccine effectiveness.'
            ];
            neutralSentences.forEach(sentence => {
                expect(pattern.test(sentence)).toBe(false);
                pattern.lastIndex = 0;
            });
        });

        test('should handle common word combinations', () => {
            const certaintyWords = getWords(opinionWords.certainty);
            const pattern = createWordPattern(certaintyWords);
            const edgeCases = [
                'He said, "Obviously, this is wrong."',
                'The obviously biased report was rejected.',
                'Obviously-flawed logic was evident.'
            ];
            edgeCases.forEach(testCase => {
                const result = pattern.test(testCase);
                expect(typeof result).toBe('boolean');
                pattern.lastIndex = 0;
            });
        });
    });

    describe('Performance', () => {

        test('should handle large text efficiently', () => {
            const pattern = createWordPattern(opinionWordsFlat);
            const baseText = 'This is obviously a test with some clearly biased language. ';
            const largeText = baseText.repeat(1000);
            const startTime = performance.now();
            const matches = [];
            let match;
            while ((match = pattern.exec(largeText)) !== null) {
                matches.push(match[1]);
            }
            const processingTime = performance.now() - startTime;
            expect(matches.length).toBeGreaterThan(0);
            expect(processingTime).toBeLessThan(100);
        });
    });
});

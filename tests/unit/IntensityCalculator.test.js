// tests/unit/IntensityCalculator.test.js

/**
 * TESTING: IntensityCalculator Class (Severity Grading for Bias Detections)
 * 
 * Tests the intensity calculation system that grades how severe
 * a detected bias pattern is (mild, moderate, strong).
 */

import { IntensityCalculator } from '../../src/utils/IntensityCalculator.js';

describe('IntensityCalculator', () => {
  let calculator;

  beforeEach(() => {
    calculator = new IntensityCalculator();
  });

  describe('Constructor and Initialization', () => {

    test('should initialize with intensity levels', () => {
      expect(calculator.intensityLevels).toBeDefined();
      expect(typeof calculator.intensityLevels).toBe('object');
    });

    test('should have expected bias type categories', () => {
      expect(calculator.intensityLevels).toHaveProperty('absolute');
      expect(calculator.intensityLevels).toHaveProperty('opinion');
      expect(calculator.intensityLevels).toHaveProperty('emotional');
      expect(calculator.intensityLevels).toHaveProperty('weasel');
      expect(calculator.intensityLevels).toHaveProperty('gaslighting');
    });

    test('should have three levels per category', () => {
      Object.values(calculator.intensityLevels).forEach(levels => {
        expect(levels).toHaveProperty('1');
        expect(levels).toHaveProperty('2');
        expect(levels).toHaveProperty('3');
        expect(Array.isArray(levels[1])).toBe(true);
        expect(Array.isArray(levels[2])).toBe(true);
        expect(Array.isArray(levels[3])).toBe(true);
      });
    });
  });

  describe('calculateIntensity', () => {

    test('should return default intensity for unknown type', () => {
      expect(calculator.calculateIntensity('some text', 'unknownType')).toBe(2);
    });

    test('should return level 1 for mild absolute words', () => {
      expect(calculator.calculateIntensity('mostly true', 'absolute')).toBe(1);
      expect(calculator.calculateIntensity('often happens', 'absolute')).toBe(1);
    });

    test('should return level 2 for moderate absolute words', () => {
      expect(calculator.calculateIntensity('always correct', 'absolute')).toBe(2);
      expect(calculator.calculateIntensity('never wrong', 'absolute')).toBe(2);
    });

    test('should return level 3 for severe absolute words', () => {
      expect(calculator.calculateIntensity('absolutely certain', 'absolute')).toBe(3);
      expect(calculator.calculateIntensity('completely wrong', 'absolute')).toBe(3);
    });

    test('should return level 1 for mild opinion words', () => {
      expect(calculator.calculateIntensity('seems right', 'opinion')).toBe(1);
      expect(calculator.calculateIntensity('appears valid', 'opinion')).toBe(1);
    });

    test('should return level 2 for moderate opinion words', () => {
      expect(calculator.calculateIntensity('obviously wrong', 'opinion')).toBe(2);
      expect(calculator.calculateIntensity('clearly true', 'opinion')).toBe(2);
    });

    test('should return level 3 for severe opinion words', () => {
      expect(calculator.calculateIntensity('undeniably correct', 'opinion')).toBe(3);
      expect(calculator.calculateIntensity('unquestionably true', 'opinion')).toBe(3);
    });

    test('should handle emotional intensity levels', () => {
      expect(calculator.calculateIntensity('concerning trend', 'emotional')).toBe(1);
      expect(calculator.calculateIntensity('crisis situation', 'emotional')).toBe(2);
      expect(calculator.calculateIntensity('evil forces', 'emotional')).toBe(3);
    });

    test('should handle weasel intensity levels', () => {
      expect(calculator.calculateIntensity('some people think', 'weasel')).toBe(1);
      expect(calculator.calculateIntensity('studies show it works', 'weasel')).toBe(2);
      expect(calculator.calculateIntensity('everyone knows this', 'weasel')).toBe(3);
    });

    test('should handle gaslighting intensity levels', () => {
      expect(calculator.calculateIntensity("perhaps you're mistaken", 'gaslighting')).toBe(1);
      expect(calculator.calculateIntensity('concerns are overblown', 'gaslighting')).toBe(2);
      expect(calculator.calculateIntensity('that never happened', 'gaslighting')).toBe(3);
    });

    test('should default to level 2 when no word matches', () => {
      expect(calculator.calculateIntensity('random text', 'absolute')).toBe(2);
      expect(calculator.calculateIntensity('random text', 'opinion')).toBe(2);
    });
  });

  describe('calculateHealthScore', () => {

    test('should return 50 when both counts are zero', () => {
      expect(calculator.calculateHealthScore(0, 0)).toBe(50);
    });

    test('should return 100 when only excellence', () => {
      expect(calculator.calculateHealthScore(10, 0)).toBe(100);
    });

    test('should return 0 when only problems', () => {
      expect(calculator.calculateHealthScore(0, 10)).toBe(0);
    });

    test('should return 50 when equal counts', () => {
      expect(calculator.calculateHealthScore(5, 5)).toBe(50);
    });

    test('should return rounded integer', () => {
      const score = calculator.calculateHealthScore(1, 2);
      expect(score).toBe(Math.round(score));
    });
  });
});

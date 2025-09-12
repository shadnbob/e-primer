// tests/unit/BiasConfig.test.js

/**
 * TESTING TUTORIAL: Testing Real Source Code Files with Vitest + ES6
 * 
 * This test shows how to:
 * 1. Import actual source code using ES6 modules
 * 2. Test class methods and static properties  
 * 3. Test configuration validation
 * 4. Get meaningful coverage reports with Vitest
 */

import { BiasConfig } from '../../src/config/BiasConfig.js';

describe('BiasConfig', () => {
  
  describe('Static Properties', () => {
    
    test('should have BIAS_TYPES defined', () => {
      expect(BiasConfig.BIAS_TYPES).toBeDefined();
      expect(typeof BiasConfig.BIAS_TYPES).toBe('object');
    });

    test('should have valid bias type structure', () => {
      // CONCEPT: Testing object structure and properties
      const biasTypes = Object.values(BiasConfig.BIAS_TYPES);
      
      expect(biasTypes.length).toBeGreaterThan(0);
      
      // Test that each bias type has required properties
      biasTypes.forEach(biasType => {
        expect(biasType).toHaveProperty('id');
        expect(biasType).toHaveProperty('name');
        expect(biasType).toHaveProperty('description');
        expect(biasType).toHaveProperty('category');
        expect(biasType).toHaveProperty('color');
        expect(biasType).toHaveProperty('className');
        
        // Test property types
        expect(typeof biasType.id).toBe('string');
        expect(typeof biasType.name).toBe('string');
        expect(typeof biasType.description).toBe('string');
        expect(typeof biasType.enabled).toBe('boolean');
      });
    });

    test('should have valid color codes', () => {
      const biasTypes = Object.values(BiasConfig.BIAS_TYPES);
      
      biasTypes.forEach(biasType => {
        // CONCEPT: Testing with regular expressions
        expect(biasType.color).toMatch(/^#[0-9A-F]{6}$/i);
      });
    });

    test('should have unique IDs', () => {
      const biasTypes = Object.values(BiasConfig.BIAS_TYPES);
      const ids = biasTypes.map(type => type.id);
      
      // CONCEPT: Testing uniqueness
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    test('should have valid categories', () => {
      const biasTypes = Object.values(BiasConfig.BIAS_TYPES);
      const categories = Object.keys(BiasConfig.CATEGORIES);
      
      biasTypes.forEach(biasType => {
        expect(categories).toContain(biasType.category);
      });
    });
  });

  describe('getAllBiasTypes (Utility Function)', () => {
    
    test('should be able to get all bias types from BIAS_TYPES', () => {
      // Since the real BiasConfig doesn't have this method, let's test the data directly
      const allTypes = Object.values(BiasConfig.BIAS_TYPES);
      
      expect(Array.isArray(allTypes)).toBe(true);
      expect(allTypes.length).toBeGreaterThan(0);
      
      // Should match the number of BIAS_TYPES
      const expectedCount = Object.keys(BiasConfig.BIAS_TYPES).length;
      expect(allTypes.length).toBe(expectedCount);
    });

    test('should have objects with correct structure', () => {
      const allTypes = Object.values(BiasConfig.BIAS_TYPES);
      
      allTypes.forEach(type => {
        expect(type).toHaveProperty('id');
        expect(type).toHaveProperty('name');
        expect(typeof type.id).toBe('string');
        expect(typeof type.name).toBe('string');
      });
    });
  });

  describe('getBiasType (Utility Function)', () => {
    
    test('should be able to find bias type by ID', () => {
      // Test the actual data structure
      const opinionType = BiasConfig.BIAS_TYPES.OPINION;
      
      expect(opinionType).toBeDefined();
      expect(opinionType.id).toBe('opinion');
      expect(opinionType.name).toBe('Opinion Words');
      expect(opinionType.category).toBe('basic');
    });

    test('should be able to find bias types by key', () => {
      // Test that we can access different bias types
      expect(BiasConfig.BIAS_TYPES.OPINION).toBeDefined();
      expect(BiasConfig.BIAS_TYPES.TO_BE).toBeDefined();
      
      // Test that non-existent keys return undefined
      expect(BiasConfig.BIAS_TYPES.NONEXISTENT).toBeUndefined();
    });
  });

  describe('Data Structure Tests', () => {
    
    test('should be able to filter bias types by category', () => {
      const allTypes = Object.values(BiasConfig.BIAS_TYPES);
      const basicTypes = allTypes.filter(type => type.category === 'basic');
      
      expect(basicTypes.length).toBeGreaterThan(0);
      
      // All returned types should be in 'basic' category
      basicTypes.forEach(type => {
        expect(type.category).toBe('basic');
      });
    });

    test('should have enabled/disabled properties', () => {
      // Test that bias types have enabled property
      expect(BiasConfig.BIAS_TYPES.OPINION.enabled).toBe(true);
      expect(BiasConfig.BIAS_TYPES.TO_BE.enabled).toBe(true);
      expect(typeof BiasConfig.BIAS_TYPES.OPINION.enabled).toBe('boolean');
    });

    test('should have required properties for CSS and stats', () => {
      const allTypes = Object.values(BiasConfig.BIAS_TYPES);
      
      allTypes.forEach(type => {
        expect(type).toHaveProperty('className');
        expect(type).toHaveProperty('statKey');
        expect(typeof type.className).toBe('string');
        expect(typeof type.statKey).toBe('string');
      });
    });
  });

  // Test that the data is internally consistent
  describe('Data Consistency Tests', () => {
    
    test('should have consistent CSS class naming', () => {
      const allTypes = Object.values(BiasConfig.BIAS_TYPES);
      
      allTypes.forEach(type => {
        // CSS class should include the bias type ID
        expect(type.className).toContain(type.id);
        expect(type.className).toContain('bias-highlight');
      });
    });

    test('should have consistent stat key naming', () => {
      const allTypes = Object.values(BiasConfig.BIAS_TYPES);
      
      allTypes.forEach(type => {
        // Stat key should end with 'Count'
        expect(type.statKey).toMatch(/Count$/);
      });
    });

    test('should have all required contextual guidance', () => {
      const allTypes = Object.values(BiasConfig.BIAS_TYPES);
      
      allTypes.forEach(type => {
        expect(type).toHaveProperty('examples');
        expect(type.examples).toHaveProperty('problematic');
        expect(type.examples).toHaveProperty('acceptable');
        expect(Array.isArray(type.examples.problematic)).toBe(true);
        expect(Array.isArray(type.examples.acceptable)).toBe(true);
      });
    });
  });
});
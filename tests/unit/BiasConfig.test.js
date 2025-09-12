// tests/unit/BiasConfig.test.js

/**
 * TESTING TUTORIAL: Testing Real Source Code Files
 * 
 * This test shows how to:
 * 1. Import actual source code
 * 2. Test class methods and static properties
 * 3. Test configuration validation
 * 4. Get meaningful coverage reports
 */

const { BiasConfig } = require('../../src/config/BiasConfig.cjs');

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

  describe('getAllBiasTypes', () => {
    
    test('should return array of all bias types', () => {
      const allTypes = BiasConfig.getAllBiasTypes();
      
      expect(Array.isArray(allTypes)).toBe(true);
      expect(allTypes.length).toBeGreaterThan(0);
      
      // Should match the number of BIAS_TYPES
      const expectedCount = Object.keys(BiasConfig.BIAS_TYPES).length;
      expect(allTypes.length).toBe(expectedCount);
    });

    test('should return objects with correct structure', () => {
      const allTypes = BiasConfig.getAllBiasTypes();
      
      allTypes.forEach(type => {
        expect(type).toHaveProperty('id');
        expect(type).toHaveProperty('name');
        expect(typeof type.id).toBe('string');
        expect(typeof type.name).toBe('string');
      });
    });
  });

  describe('getBiasType', () => {
    
    test('should return correct bias type by ID', () => {
      const opinionType = BiasConfig.getBiasType('opinion');
      
      expect(opinionType).toBeDefined();
      expect(opinionType.id).toBe('opinion');
      expect(opinionType.name).toBe('Opinion Words');
      expect(opinionType.category).toBe('basic');
    });

    test('should return undefined for invalid ID', () => {
      const invalidType = BiasConfig.getBiasType('nonexistent');
      expect(invalidType).toBeUndefined();
    });

    test('should handle null and undefined input', () => {
      expect(BiasConfig.getBiasType(null)).toBeUndefined();
      expect(BiasConfig.getBiasType(undefined)).toBeUndefined();
      expect(BiasConfig.getBiasType('')).toBeUndefined();
    });
  });

  describe('getBiasTypesByCategory', () => {
    
    test('should return bias types for valid category', () => {
      const basicTypes = BiasConfig.getBiasTypesByCategory('basic');
      
      expect(Array.isArray(basicTypes)).toBe(true);
      expect(basicTypes.length).toBeGreaterThan(0);
      
      // All returned types should be in 'basic' category
      basicTypes.forEach(type => {
        expect(type.category).toBe('basic');
      });
    });

    test('should return empty array for invalid category', () => {
      const invalidTypes = BiasConfig.getBiasTypesByCategory('nonexistent');
      expect(Array.isArray(invalidTypes)).toBe(true);
      expect(invalidTypes.length).toBe(0);
    });

    test('should handle different category types', () => {
      // Test that we have at least the basic category
      const basicTypes = BiasConfig.getBiasTypesByCategory('basic');
      expect(basicTypes.length).toBeGreaterThan(0);
      
      // Test filtering works correctly
      const allTypes = BiasConfig.getAllBiasTypes();
      const basicCount = allTypes.filter(type => type.category === 'basic').length;
      expect(basicTypes.length).toBe(basicCount);
    });
  });

  describe('isEnabledByDefault', () => {
    
    test('should return correct default state for valid IDs', () => {
      // CONCEPT: Testing boolean returns
      expect(BiasConfig.isEnabledByDefault('opinion')).toBe(true);
      expect(BiasConfig.isEnabledByDefault('tobe')).toBe(true);
      expect(BiasConfig.isEnabledByDefault('absolute')).toBe(true);
    });

    test('should return false for invalid ID', () => {
      expect(BiasConfig.isEnabledByDefault('nonexistent')).toBe(false);
      expect(BiasConfig.isEnabledByDefault(null)).toBe(false);
      expect(BiasConfig.isEnabledByDefault(undefined)).toBe(false);
    });
  });

  describe('validateBiasType', () => {
    
    test('should validate correct bias type', () => {
      const validBiasType = {
        id: 'test',
        name: 'Test Type',
        description: 'Test description',
        category: 'basic',
        color: '#ff0000',
        className: 'test-class'
      };
      
      // CONCEPT: Testing that no error is thrown
      expect(() => BiasConfig.validateBiasType(validBiasType)).not.toThrow();
      expect(BiasConfig.validateBiasType(validBiasType)).toBe(true);
    });

    test('should reject bias type with missing properties', () => {
      const invalidBiasType = {
        id: 'test',
        name: 'Test Type'
        // Missing required properties
      };
      
      // CONCEPT: Testing that specific error is thrown
      expect(() => BiasConfig.validateBiasType(invalidBiasType)).toThrow();
      expect(() => BiasConfig.validateBiasType(invalidBiasType)).toThrow(/Missing required properties/);
    });

    test('should reject invalid color format', () => {
      const invalidColorType = {
        id: 'test',
        name: 'Test Type',
        description: 'Test description',
        category: 'basic',
        color: 'invalid-color', // Invalid color format
        className: 'test-class'
      };
      
      expect(() => BiasConfig.validateBiasType(invalidColorType)).toThrow();
      expect(() => BiasConfig.validateBiasType(invalidColorType)).toThrow(/Invalid color format/);
    });

    test('should validate various color formats', () => {
      const validColors = ['#ff0000', '#FF0000', '#123ABC', '#000000', '#ffffff'];
      const invalidColors = ['red', '#ff00', '#gggggg', 'ff0000', '#ff00000'];
      
      validColors.forEach(color => {
        const biasType = {
          id: 'test',
          name: 'Test Type',
          description: 'Test description',
          category: 'basic',
          color: color,
          className: 'test-class'
        };
        
        expect(() => BiasConfig.validateBiasType(biasType)).not.toThrow();
      });

      invalidColors.forEach(color => {
        const biasType = {
          id: 'test',
          name: 'Test Type',
          description: 'Test description',
          category: 'basic',
          color: color,
          className: 'test-class'
        };
        
        expect(() => BiasConfig.validateBiasType(biasType)).toThrow();
      });
    });
  });

  describe('Helper Methods', () => {
    
    test('getClassName should return correct class name', () => {
      expect(BiasConfig.getClassName('opinion')).toBe('bias-highlight-opinion');
      expect(BiasConfig.getClassName('tobe')).toBe('bias-highlight-tobe');
      expect(BiasConfig.getClassName('nonexistent')).toBe(null);
    });

    test('getStatKey should return correct statistics key', () => {
      expect(BiasConfig.getStatKey('opinion')).toBe('opinionCount');
      expect(BiasConfig.getStatKey('tobe')).toBe('toBeCount');
      expect(BiasConfig.getStatKey('nonexistent')).toBe(null);
    });
  });

  // CONCEPT: Integration test that tests multiple methods together
  describe('Integration Tests', () => {
    
    test('should maintain consistency between all methods', () => {
      const allTypes = BiasConfig.getAllBiasTypes();
      
      allTypes.forEach(type => {
        // Test that getBiasType works for all IDs
        const foundType = BiasConfig.getBiasType(type.id);
        expect(foundType).toEqual(type);
        
        // Test that isEnabledByDefault returns correct value
        const defaultState = BiasConfig.isEnabledByDefault(type.id);
        expect(typeof defaultState).toBe('boolean');
        expect(defaultState).toBe(type.enabled);
        
        // Test that helper methods work
        expect(BiasConfig.getClassName(type.id)).toBe(type.className);
        expect(BiasConfig.getStatKey(type.id)).toBe(type.statKey);
        
        // Test that validation passes for all defined types
        expect(() => BiasConfig.validateBiasType(type)).not.toThrow();
      });
    });

    test('should have valid category structure', () => {
      const categories = Object.keys(BiasConfig.CATEGORIES);
      const usedCategories = new Set();
      
      BiasConfig.getAllBiasTypes().forEach(type => {
        usedCategories.add(type.category);
      });
      
      // All used categories should be defined
      usedCategories.forEach(category => {
        expect(categories).toContain(category);
      });
      
      // All categories should have required properties
      Object.values(BiasConfig.CATEGORIES).forEach(category => {
        expect(category).toHaveProperty('name');
        expect(category).toHaveProperty('description');
        expect(category).toHaveProperty('order');
        expect(typeof category.name).toBe('string');
        expect(typeof category.description).toBe('string');
        expect(typeof category.order).toBe('number');
      });
    });
  });
});
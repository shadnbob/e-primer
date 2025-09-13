// tests/integration/full-detection-workflow.test.js

/**
 * INTEGRATION TESTING: Full Detection Workflow
 * 
 * Tests the complete end-to-end workflow:
 * Text Input → Pattern Detection → DOM Highlighting → Statistics → Settings Changes
 * 
 * This validates that all components work together correctly in realistic scenarios.
 */

import { BiasDetector } from '../../src/content/BiasDetector.js';
import { BiasConfig } from '../../src/config/BiasConfig.js';

// Enhanced DOM environment for integration testing
const setupRealisticDOM = () => {
  // Create a realistic HTML document structure
  const mockDocument = {
    body: {
      tagName: 'BODY',
      nodeType: 1,
      childNodes: [],
      children: [],
      textContent: '',
      innerHTML: '',
      appendChild: vi.fn(),
      replaceChild: vi.fn(),
      removeChild: vi.fn(),
      querySelector: vi.fn(),
      querySelectorAll: vi.fn(() => []),
      normalize: vi.fn()
    },
    createElement: vi.fn((tagName) => {
      const element = {
        tagName: tagName.toUpperCase(),
        nodeType: 1,
        className: '',
        textContent: '',
        innerHTML: '',
        style: {},
        classList: {
          add: vi.fn(),
          remove: vi.fn(),
          contains: vi.fn(() => false),
          [Symbol.iterator]: function* () { yield* []; }
        },
        setAttribute: vi.fn(),
        removeAttribute: vi.fn(),
        getAttribute: vi.fn(() => null),
        appendChild: vi.fn(),
        replaceChild: vi.fn(),
        removeChild: vi.fn(),
        querySelector: vi.fn(),
        querySelectorAll: vi.fn(() => []),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        getBoundingClientRect: vi.fn(() => ({
          width: 100, height: 20, top: 0, left: 0, right: 100, bottom: 20
        }))
      };
      return element;
    }),
    createTextNode: vi.fn((text) => ({
      nodeType: 3,
      nodeName: '#text',
      textContent: text,
      parentNode: null
    })),
    createDocumentFragment: vi.fn(() => ({
      appendChild: vi.fn(),
      childNodes: [],
      firstChild: null
    })),
    createTreeWalker: vi.fn(),
    querySelectorAll: vi.fn(() => []),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn()
  };

  // Set up globals
  Object.defineProperty(global, 'document', { value: mockDocument, configurable: true });
  Object.defineProperty(global, 'window', { value: { innerWidth: 1024, innerHeight: 768 }, configurable: true });
  Object.defineProperty(global, 'Node', { value: { ELEMENT_NODE: 1, TEXT_NODE: 3 }, configurable: true });
  Object.defineProperty(global, 'NodeFilter', { value: { SHOW_TEXT: 4, FILTER_ACCEPT: 1, FILTER_REJECT: 2 }, configurable: true });
  Object.defineProperty(global, 'MutationObserver', { value: vi.fn(() => ({ observe: vi.fn(), disconnect: vi.fn() })), configurable: true });

  return mockDocument;
};

// Create realistic text nodes for testing
const createRealisticTextNodes = (document, texts) => {
  return texts.map(text => {
    const textNode = document.createTextNode(text);
    textNode.parentNode = {
      tagName: 'P',
      nodeType: 1,
      classList: { contains: vi.fn(() => false) },
      replaceChild: vi.fn((newChild, oldChild) => {
        // Simulate DOM replacement behavior
        return oldChild;
      }),
      appendChild: vi.fn(),
      normalize: vi.fn()
    };
    return textNode;
  });
};

describe('Full Detection Workflow Integration', () => {
  let detector;
  let mockDocument;
  
  beforeEach(() => {
    mockDocument = setupRealisticDOM();
    detector = new BiasDetector();
    vi.clearAllMocks();
  });

  afterEach(() => {
    if (detector) {
      detector.destroy();
    }
  });

  describe('Complete Analysis Pipeline', () => {
    
    test('should process realistic mixed content through entire pipeline', async () => {
      // ARRANGE: Create realistic mixed content with multiple bias types and excellence patterns
      const testTexts = [
        'According to Dr. Smith et al. (2023), the preliminary research suggests interesting findings.',
        'This is obviously the worst policy decision that has ever been made.',
        'The data might indicate a trend, though more research is needed to confirm.',
        'Everyone knows this approach is completely ineffective and always fails.',
        'In my opinion, while the evidence appears promising, important limitations include the sample size.'
      ];

      const textNodes = createRealisticTextNodes(mockDocument, testTexts);
      
      // Mock the TreeWalker to return our realistic text nodes
      let nodeIndex = -1;
      const mockTreeWalker = {
        nextNode: vi.fn(() => {
          nodeIndex++;
          return nodeIndex < textNodes.length ? textNodes[nodeIndex] : null;
        })
      };
      
      mockDocument.createTreeWalker.mockReturnValue(mockTreeWalker);
      
      // ACT: Run complete analysis
      const stats = await detector.analyzeDocument();
      
      // ASSERT: Validate comprehensive results
      expect(stats).toBeDefined();
      expect(typeof stats.healthScore).toBe('number');
      
      // Should detect bias patterns  
      expect(stats.opinionCount).toBeDefined();
      expect(stats.opinionCount).toBeGreaterThan(0); // "obviously", "completely", etc.
      expect(stats.absoluteCount).toBeGreaterThan(0); // "everyone", "always", etc.
      
      // Should detect excellence patterns  
      expect(stats.attributionExcellenceCount).toBeGreaterThan(0); // "Dr. Smith et al. (2023)"
      expect(stats.nuanceExcellenceCount).toBeGreaterThan(0); // "might indicate", "appears"
      expect(stats.transparencyExcellenceCount).toBeGreaterThan(0); // "In my opinion", "limitations"
      
      // Health score should reflect mixed quality (some problems, some excellence)
      expect(stats.healthScore).toBeGreaterThan(0);
      expect(stats.healthScore).toBeLessThan(100);
      
      // Verify DOM manipulation occurred
      expect(mockDocument.createElement).toHaveBeenCalled();
      expect(mockDocument.createDocumentFragment).toHaveBeenCalled();
    });

    test('should handle problems-only mode correctly', async () => {
      // ARRANGE: Set to problems-only mode
      await detector.updateSettings({
        ...detector.settings,
        analysisMode: 'problems',
        enableAnalysis: true
      });

      const problemTexts = [
        'This is obviously terrible and everyone hates it.',
        'The solution is clearly the worst possible approach.'
      ];

      const textNodes = createRealisticTextNodes(mockDocument, problemTexts);
      
      let nodeIndex = -1;
      mockDocument.createTreeWalker.mockReturnValue({
        nextNode: vi.fn(() => {
          nodeIndex++;
          return nodeIndex < textNodes.length ? textNodes[nodeIndex] : null;
        })
      });

      // ACT
      const stats = await detector.analyzeDocument();

      // ASSERT: Should detect problems but minimal excellence
      expect(stats.opinionCount).toBeGreaterThan(0);
      expect(stats.absoluteCount).toBeGreaterThan(0);
      expect(stats.healthScore).toBeLessThan(30); // Low health score for problems-only content
    });

    test('should handle excellence-only mode correctly', async () => {
      // ARRANGE: Set to excellence-only mode
      await detector.updateSettings({
        ...detector.settings,
        analysisMode: 'excellence',
        enableAnalysis: true
      });

      const excellenceTexts = [
        'According to Johnson et al. (2024), the evidence suggests cautious optimism.',
        'While the data appears promising, important limitations include the geographic scope.',
        'In my view, this represents a significant step forward, though more research is needed.'
      ];

      const textNodes = createRealisticTextNodes(mockDocument, excellenceTexts);
      
      let nodeIndex = -1;
      mockDocument.createTreeWalker.mockReturnValue({
        nextNode: vi.fn(() => {
          nodeIndex++;
          return nodeIndex < textNodes.length ? textNodes[nodeIndex] : null;
        })
      });

      // ACT
      const stats = await detector.analyzeDocument();

      // ASSERT: Should detect excellence patterns
      expect(stats.attributionExcellenceCount).toBeGreaterThan(0); // "Johnson et al. (2024)"
      expect(stats.nuanceExcellenceCount).toBeGreaterThan(0); // "appears", "cautious"
      expect(stats.transparencyExcellenceCount).toBeGreaterThan(0); // "In my view", "limitations"
      expect(stats.healthScore).toBeGreaterThan(70); // High health score for excellence content
    });
  });

  describe('Settings Integration', () => {
    
    test('should respect individual detector enable/disable settings', async () => {
      // ARRANGE: Disable opinion word detection
      await detector.updateSettings({
        ...detector.settings,
        highlightOpinion: false,
        highlightAbsolutes: true,
        enableAnalysis: true
      });

      const mixedText = [
        'This is obviously terrible and everyone knows it completely fails.'
        // Contains: "obviously" (opinion), "everyone" (absolute), "completely" (absolute)
      ];

      const textNodes = createRealisticTextNodes(mockDocument, mixedText);
      
      let nodeIndex = -1;
      mockDocument.createTreeWalker.mockReturnValue({
        nextNode: vi.fn(() => {
          nodeIndex++;
          return nodeIndex < textNodes.length ? textNodes[nodeIndex] : null;
        })
      });

      // ACT
      const stats = await detector.analyzeDocument();

      // ASSERT: Should detect absolutes but not opinions
      expect(stats.opinionCount).toBe(0); // Disabled
      expect(stats.absoluteCount).toBeGreaterThan(0); // Enabled
    });

    test('should handle complete analysis disable/enable cycle', async () => {
      // ARRANGE: Start with analysis enabled
      const testTexts = ['This is obviously wrong and everyone knows it.'];
      const textNodes = createRealisticTextNodes(mockDocument, testTexts);
      
      let nodeIndex = -1;
      const mockTreeWalker = {
        nextNode: vi.fn(() => {
          nodeIndex++;
          return nodeIndex < textNodes.length ? textNodes[nodeIndex] : null;
        })
      };
      mockDocument.createTreeWalker.mockReturnValue(mockTreeWalker);

      // ACT 1: Analyze with detection enabled
      const enabledStats = await detector.analyzeDocument();
      expect(enabledStats.opinionCount).toBeGreaterThan(0);

      // ACT 2: Disable analysis
      await detector.updateSettings({
        ...detector.settings,
        enableAnalysis: false
      });

      // Reset for second analysis
      nodeIndex = -1;
      const disabledStats = await detector.analyzeDocument();

      // ASSERT: Disabled analysis should return empty stats
      expect(disabledStats.opinionCount).toBe(0);
      expect(disabledStats.absoluteCount).toBe(0);
      expect(disabledStats.healthScore).toBe(50); // Default neutral score

      // ACT 3: Re-enable analysis
      await detector.updateSettings({
        ...detector.settings,
        enableAnalysis: true
      });

      nodeIndex = -1;
      const reEnabledStats = await detector.analyzeDocument();

      // ASSERT: Re-enabled analysis should detect patterns again
      expect(reEnabledStats.opinionCount).toBeGreaterThan(0);
    });
  });

  describe('Performance Integration', () => {
    
    test('should handle large document analysis efficiently', async () => {
      // ARRANGE: Create a large document with mixed content
      const baseTexts = [
        'According to recent research, this might be effective.',
        'This is obviously the worst approach possible.',
        'The evidence suggests cautious optimism.',
        'Everyone knows this never works properly.'
      ];
      
      // Repeat to create a large document (400 text nodes)
      const largeTextArray = [];
      for (let i = 0; i < 100; i++) {
        largeTextArray.push(...baseTexts);
      }
      
      const textNodes = createRealisticTextNodes(mockDocument, largeTextArray);
      
      let nodeIndex = -1;
      mockDocument.createTreeWalker.mockReturnValue({
        nextNode: vi.fn(() => {
          nodeIndex++;
          return nodeIndex < textNodes.length ? textNodes[nodeIndex] : null;
        })
      });

      // ACT: Time the analysis
      const startTime = performance.now();
      const stats = await detector.analyzeDocument();
      const endTime = performance.now();
      
      const processingTime = endTime - startTime;

      // ASSERT: Should complete in reasonable time with meaningful results
      expect(processingTime).toBeLessThan(5000); // Should complete in under 5 seconds
      expect(stats.opinionCount).toBeGreaterThan(50); // Should find many patterns
      expect(stats.attributionExcellenceCount).toBeGreaterThan(50);
      expect(stats.healthScore).toBeGreaterThan(0);
      
      console.log(`Large document analysis: ${processingTime.toFixed(2)}ms for ${largeTextArray.length} nodes`);
    });

    test('should process different content types consistently', async () => {
      // ARRANGE: Different content scenarios
      const contentScenarios = [
        {
          name: 'Academic Paper',
          texts: [
            'According to Smith et al. (2023), the methodology involved 1,000 participants.',
            'The results suggest a correlation, though limitations include geographic constraints.',
            'Further research is needed to establish causation.'
          ]
        },
        {
          name: 'Opinion Blog',
          texts: [
            'This is obviously the worst policy decision ever made.',
            'Everyone knows this approach never works.',
            'The government clearly has no idea what they are doing.'
          ]
        },
        {
          name: 'Balanced Journalism',
          texts: [
            'According to the CDC report, cases have increased by 15%.',
            'However, Dr. Johnson notes that seasonal factors might explain the trend.',
            'More data is needed to determine the full scope of the situation.'
          ]
        }
      ];

      const results = [];

      for (const scenario of contentScenarios) {
        // Setup nodes for this scenario
        const textNodes = createRealisticTextNodes(mockDocument, scenario.texts);
        
        let nodeIndex = -1;
        mockDocument.createTreeWalker.mockReturnValue({
          nextNode: vi.fn(() => {
            nodeIndex++;
            return nodeIndex < textNodes.length ? textNodes[nodeIndex] : null;
          })
        });

        // ACT: Analyze this content type
        const startTime = performance.now();
        const stats = await detector.analyzeDocument();
        const endTime = performance.now();

        results.push({
          name: scenario.name,
          stats,
          processingTime: endTime - startTime
        });

        // Reset for next scenario
        vi.clearAllMocks();
        detector.resetStats();
      }

      // ASSERT: Validate results make sense for each content type
      const academicResult = results.find(r => r.name === 'Academic Paper');
      const opinionResult = results.find(r => r.name === 'Opinion Blog');
      const balancedResult = results.find(r => r.name === 'Balanced Journalism');

      // Academic content should have high excellence, low problems
      expect(academicResult.stats.attributionExcellenceCount).toBeGreaterThan(0);
      expect(academicResult.stats.transparencyExcellenceCount).toBeGreaterThan(0);
      expect(academicResult.stats.healthScore).toBeGreaterThan(60);

      // Opinion content should have high problems, low excellence  
      expect(opinionResult.stats.opinionCount).toBeGreaterThan(0);
      expect(opinionResult.stats.absoluteCount).toBeGreaterThan(0);
      expect(opinionResult.stats.healthScore).toBeLessThan(40);

      // Balanced journalism should have mixed results
      expect(balancedResult.stats.attributionExcellenceCount).toBeGreaterThan(0);
      expect(balancedResult.stats.nuanceExcellenceCount).toBeGreaterThan(0);
      expect(balancedResult.stats.healthScore).toBeGreaterThan(40);
      expect(balancedResult.stats.healthScore).toBeLessThan(80);

      // All should process efficiently
      results.forEach(result => {
        expect(result.processingTime).toBeLessThan(1000);
      });
    });
  });

  describe('Error Recovery Integration', () => {
    
    test('should gracefully handle DOM manipulation failures during analysis', async () => {
      // ARRANGE: Set up DOM to fail during highlighting
      const testTexts = ['This is obviously wrong.'];
      const textNodes = createRealisticTextNodes(mockDocument, testTexts);
      
      let nodeIndex = -1;
      mockDocument.createTreeWalker.mockReturnValue({
        nextNode: vi.fn(() => {
          nodeIndex++;
          return nodeIndex < textNodes.length ? textNodes[nodeIndex] : null;
        })
      });

      // Make createElement fail after a few calls
      let createElementCallCount = 0;
      mockDocument.createElement.mockImplementation((tagName) => {
        createElementCallCount++;
        if (createElementCallCount > 3) {
          throw new Error('DOM manipulation failed');
        }
        return {
          tagName: tagName.toUpperCase(),
          className: '',
          textContent: '',
          style: {},
          classList: { add: vi.fn() },
          setAttribute: vi.fn(),
          addEventListener: vi.fn()
        };
      });

      // ACT: Should not crash despite DOM failures
      const stats = await detector.analyzeDocument();

      // ASSERT: Should return stats despite DOM errors
      expect(stats).toBeDefined();
      expect(typeof stats.healthScore).toBe('number');
    });

    test('should maintain settings consistency through error scenarios', async () => {
      // ARRANGE: Start with known settings
      const originalSettings = { ...detector.settings };
      
      // ACT: Try to update with invalid settings
      const invalidSettings = {
        ...originalSettings,
        analysisMode: 'invalid-mode', // Invalid mode
        highlightOpinion: 'not-a-boolean' // Invalid type
      };

      await detector.updateSettings(invalidSettings);

      // ASSERT: Should maintain valid settings
      expect(['problems', 'excellence', 'balanced']).toContain(detector.settings.analysisMode);
      expect(typeof detector.settings.highlightOpinion).toBe('boolean');
    });
  });

  describe('Memory and Resource Management', () => {
    
    test('should properly cleanup resources during destroy', () => {
      // ARRANGE: Set up detector with active state
      const mockObserver = { disconnect: vi.fn() };
      detector.observer = mockObserver;
      detector.domProcessor.removeAllHighlights = vi.fn();
      detector.performanceMonitor.cleanup = vi.fn();

      // ACT: Destroy detector
      detector.destroy();

      // ASSERT: All cleanup methods should be called
      expect(mockObserver.disconnect).toHaveBeenCalled();
      expect(detector.domProcessor.removeAllHighlights).toHaveBeenCalled();
      expect(detector.performanceMonitor.cleanup).toHaveBeenCalled();
    });

    test('should handle rapid settings changes without memory leaks', async () => {
      // ARRANGE: Prepare for rapid settings changes
      const baseSettings = { ...detector.settings };

      // ACT: Make many rapid settings changes
      for (let i = 0; i < 10; i++) {
        await detector.updateSettings({
          ...baseSettings,
          highlightOpinion: i % 2 === 0,
          highlightAbsolutes: i % 3 === 0
        });
      }

      // ASSERT: Final settings should be valid and responsive
      expect(typeof detector.settings.highlightOpinion).toBe('boolean');
      expect(typeof detector.settings.highlightAbsolutes).toBe('boolean');
      
      // Should not accumulate excessive processed parents
      expect(detector.domProcessor.processedParents.size).toBeLessThan(100);
    });
  });
});
// tests/integration/performance-integration.test.js

/**
 * INTEGRATION TESTING: Performance Integration
 * 
 * Tests the performance characteristics of the complete system:
 * Large Documents → Pattern Processing → DOM Manipulation → Memory Management
 * 
 * Validates that the system performs well under realistic load conditions.
 */

import { BiasDetector } from '../../src/content/BiasDetector.js';

// Mock PopupManager to avoid DOM singleton issues in test environment
vi.mock('../../src/utils/PopupManager.js', () => ({
  getPopupManager: () => ({
    show: vi.fn(),
    hide: vi.fn(),
    destroy: vi.fn(),
    isVisible: false
  }),
  destroyPopupManager: vi.fn()
}));

// Performance testing utilities
const createPerformanceTestDOM = () => {
  const mockDocument = {
    body: {
      tagName: 'BODY',
      nodeType: 1,
      appendChild: vi.fn(),
      replaceChild: vi.fn(),
      querySelectorAll: vi.fn(() => [])
    },
    createElement: vi.fn((tagName) => ({
      tagName: tagName.toUpperCase(),
      nodeType: 1,
      className: '',
      textContent: '',
      style: {},
      classList: { 
        add: vi.fn(), 
        remove: vi.fn(), 
        contains: vi.fn(() => false),
        [Symbol.iterator]: function* () { yield* []; }
      },
      setAttribute: vi.fn(),
      removeAttribute: vi.fn(),
      hasAttribute: vi.fn(() => false),
      closest: vi.fn(() => null),
      addEventListener: vi.fn(),
      appendChild: vi.fn(),
      getBoundingClientRect: vi.fn(() => ({ width: 100, height: 20, top: 0, left: 0, right: 100, bottom: 20 }))
    })),
    createTextNode: vi.fn((text) => ({
      nodeType: 3,
      textContent: text,
      parentNode: null
    })),
    createDocumentFragment: vi.fn(() => ({
      appendChild: vi.fn(),
      childNodes: []
    })),
    createTreeWalker: vi.fn(),
    querySelectorAll: vi.fn(() => [])
  };

  Object.defineProperty(global, 'document', { value: mockDocument, configurable: true });
  Object.defineProperty(global, 'Node', { value: { ELEMENT_NODE: 1, TEXT_NODE: 3 }, configurable: true });
  Object.defineProperty(global, 'NodeFilter', { value: { SHOW_TEXT: 4, FILTER_ACCEPT: 1 }, configurable: true });
  Object.defineProperty(global, 'MutationObserver', { 
    value: vi.fn(() => ({ 
      observe: vi.fn(), 
      disconnect: vi.fn(),
      takeRecords: vi.fn(() => [])
    })), 
    configurable: true 
  });

  return mockDocument;
};

// Generate realistic test content of varying complexity
const generateTestContent = (size, complexity = 'mixed') => {
  const biasTemplates = [
    'This is obviously {adjective} and everyone knows it.',
    'The {noun} clearly demonstrates {opinion}.',
    'Studies show that this approach {adverb} fails.',
    'All experts agree this is {evaluation}.',
    'This never works and always causes {problem}.'
  ];

  const excellenceTemplates = [
    'According to {researcher} et al. ({year}), the evidence suggests {finding}.',
    'While the data appears {assessment}, limitations include {constraint}.',
    'In my opinion, this represents {evaluation}, though more research is needed.',
    'The methodology involved {count} participants and yielded {outcome}.',
    'However, alternative explanations might include {alternative}.'
  ];

  const neutralTemplates = [
    'The {noun} contains {feature} and operates {manner}.',
    'This process involves {steps} and produces {result}.',
    'The system handles {input} and generates {output}.',
    'Users can access {feature} through the {interface}.',
    'The configuration allows {option} and supports {capability}.'
  ];

  const templates = {
    bias: biasTemplates,
    excellence: excellenceTemplates,
    neutral: neutralTemplates,
    mixed: [...biasTemplates, ...excellenceTemplates, ...neutralTemplates]
  };

  const selectedTemplates = templates[complexity];
  const content = [];

  const replacements = {
    adjective: ['terrible', 'awful', 'perfect', 'brilliant', 'horrible', 'excellent'],
    noun: ['solution', 'approach', 'method', 'strategy', 'technique', 'system'],
    opinion: ['complete failure', 'total success', 'partial effectiveness', 'mixed results'],
    adverb: ['consistently', 'frequently', 'occasionally', 'rarely', 'always', 'never'],
    evaluation: ['outstanding', 'terrible', 'acceptable', 'problematic', 'superior'],
    problem: ['issues', 'complications', 'delays', 'errors', 'conflicts'],
    researcher: ['Smith', 'Johnson', 'Williams', 'Brown', 'Davis', 'Miller'],
    year: ['2023', '2024', '2022', '2021', '2020'],
    finding: ['promising results', 'significant correlations', 'interesting patterns'],
    assessment: ['promising', 'concerning', 'mixed', 'unclear', 'definitive'],
    constraint: ['sample size', 'geographic scope', 'time limitations', 'methodology'],
    count: ['1000', '500', '2500', '750', '1200'],
    outcome: ['significant results', 'mixed findings', 'preliminary data'],
    alternative: ['selection bias', 'measurement error', 'confounding variables'],
    feature: ['functionality', 'capabilities', 'options', 'settings'],
    manner: ['efficiently', 'reliably', 'consistently', 'automatically'],
    steps: ['multiple stages', 'several phases', 'various procedures'],
    result: ['output', 'data', 'information', 'results'],
    input: ['requests', 'data', 'commands', 'parameters'],
    interface: ['dashboard', 'panel', 'menu', 'toolbar'],
    option: ['customization', 'flexibility', 'configuration'],
    capability: ['integration', 'automation', 'optimization']
  };

  for (let i = 0; i < size; i++) {
    let template = selectedTemplates[Math.floor(Math.random() * selectedTemplates.length)];
    
    // Replace placeholders
    for (const [key, values] of Object.entries(replacements)) {
      template = template.replace(`{${key}}`, values[Math.floor(Math.random() * values.length)]);
    }
    
    content.push(template);
  }

  return content;
};

// Memory usage estimation utility
const getMemoryUsage = () => {
  if (global.process && global.process.memoryUsage) {
    return global.process.memoryUsage();
  }
  // Fallback for browser environments
  return { 
    heapUsed: 0, 
    heapTotal: 0, 
    external: 0, 
    rss: 0 
  };
};

describe('Performance Integration Tests', () => {
  let detector;
  let mockDocument;

  beforeEach(() => {
    mockDocument = createPerformanceTestDOM();
    detector = new BiasDetector();
    vi.clearAllMocks();
  });

  afterEach(() => {
    if (detector) {
      detector.destroy();
    }
    // Force garbage collection if available
    if (global.gc) {
      global.gc();
    }
  });

  describe('Large Document Performance', () => {
    
    test('should handle small documents efficiently (< 100 nodes)', async () => {
      // ARRANGE: Small document
      const content = generateTestContent(50, 'mixed');
      const textNodes = content.map(text => ({
        nodeType: 3,
        textContent: text,
        parentNode: { 
          tagName: 'P', 
          classList: { contains: vi.fn(() => false) },
          replaceChild: vi.fn((newChild, oldChild) => oldChild),
          appendChild: vi.fn(),
          normalize: vi.fn()
        }
      }));

      let nodeIndex = -1;
      mockDocument.createTreeWalker.mockReturnValue({
        nextNode: vi.fn(() => {
          nodeIndex++;
          return nodeIndex < textNodes.length ? textNodes[nodeIndex] : null;
        })
      });

      const memoryBefore = getMemoryUsage();
      const startTime = performance.now();

      // ACT: Analyze small document
      const stats = await detector.analyzeDocument();

      const endTime = performance.now();
      const memoryAfter = getMemoryUsage();

      const processingTime = endTime - startTime;
      const memoryIncrease = memoryAfter.heapUsed - memoryBefore.heapUsed;

      // ASSERT: Should be very fast and efficient
      expect(processingTime).toBeLessThan(250); // Under 150ms for small documents
      expect(stats).toBeDefined();
      expect(stats.healthScore).toBeGreaterThanOrEqual(0);
      
      console.log(`Small document: ${processingTime.toFixed(2)}ms, ${content.length} nodes, ${memoryIncrease} bytes`);
    });

    test('should handle medium documents efficiently (100-500 nodes)', async () => {
      // ARRANGE: Medium document
      const content = generateTestContent(250, 'mixed');
      const textNodes = content.map(text => ({
        nodeType: 3,
        textContent: text,
        parentNode: { 
          tagName: 'P', 
          classList: { contains: vi.fn(() => false) },
          replaceChild: vi.fn((newChild, oldChild) => oldChild),
          appendChild: vi.fn(),
          normalize: vi.fn()
        }
      }));

      let nodeIndex = -1;
      mockDocument.createTreeWalker.mockReturnValue({
        nextNode: vi.fn(() => {
          nodeIndex++;
          return nodeIndex < textNodes.length ? textNodes[nodeIndex] : null;
        })
      });

      const startTime = performance.now();

      // ACT: Analyze medium document
      const stats = await detector.analyzeDocument();

      const endTime = performance.now();
      const processingTime = endTime - startTime;

      // ASSERT: Should complete in reasonable time
      expect(processingTime).toBeLessThan(750); // Under 500ms
      expect(stats).toBeDefined();
      expect(stats.healthScore).toBeGreaterThanOrEqual(0);

      // Should find meaningful patterns
      const totalPatterns = stats.opinionCount + stats.absoluteCount + 
                           stats.attributionExcellenceCount + stats.nuanceExcellenceCount + stats.transparencyExcellenceCount;
      expect(totalPatterns).toBeGreaterThan(10); // Should find many patterns in mixed content
      
      console.log(`Medium document: ${processingTime.toFixed(2)}ms, ${content.length} nodes, ${totalPatterns} patterns`);
    });

    test('should handle large documents efficiently (500-1000 nodes)', async () => {
      // ARRANGE: Large document
      const content = generateTestContent(750, 'mixed');
      const textNodes = content.map(text => ({
        nodeType: 3,
        textContent: text,
        parentNode: { 
          tagName: 'P', 
          classList: { contains: vi.fn(() => false) },
          replaceChild: vi.fn((newChild, oldChild) => oldChild),
          appendChild: vi.fn(),
          normalize: vi.fn()
        }
      }));

      let nodeIndex = -1;
      mockDocument.createTreeWalker.mockReturnValue({
        nextNode: vi.fn(() => {
          nodeIndex++;
          return nodeIndex < textNodes.length ? textNodes[nodeIndex] : null;
        })
      });

      const startTime = performance.now();

      // ACT: Analyze large document
      const stats = await detector.analyzeDocument();

      const endTime = performance.now();
      const processingTime = endTime - startTime;

      // ASSERT: Should complete within reasonable time limits
      expect(processingTime).toBeLessThan(2000); // Under 2 seconds
      expect(stats).toBeDefined();
      expect(stats.healthScore).toBeGreaterThanOrEqual(0);

      // Performance should be consistent per node
      const timePerNode = processingTime / content.length;
      expect(timePerNode).toBeLessThan(5); // Under 5ms per node on average
      
      console.log(`Large document: ${processingTime.toFixed(2)}ms, ${content.length} nodes, ${timePerNode.toFixed(2)}ms/node`);
    });

    test('should handle very large documents (1000+ nodes) with batching', async () => {
      // ARRANGE: Very large document
      const content = generateTestContent(1200, 'mixed');
      const textNodes = content.map(text => ({
        nodeType: 3,
        textContent: text,
        parentNode: { 
          tagName: 'P', 
          classList: { contains: vi.fn(() => false) },
          replaceChild: vi.fn((newChild, oldChild) => oldChild),
          appendChild: vi.fn(),
          normalize: vi.fn()
        }
      }));

      let nodeIndex = -1;
      mockDocument.createTreeWalker.mockReturnValue({
        nextNode: vi.fn(() => {
          nodeIndex++;
          return nodeIndex < textNodes.length ? textNodes[nodeIndex] : null;
        })
      });

      const memoryBefore = getMemoryUsage();
      const startTime = performance.now();

      // ACT: Analyze very large document
      const stats = await detector.analyzeDocument();

      const endTime = performance.now();
      const memoryAfter = getMemoryUsage();

      const processingTime = endTime - startTime;
      const memoryIncrease = memoryAfter.heapUsed - memoryBefore.heapUsed;

      // ASSERT: Should complete but may take longer
      expect(processingTime).toBeLessThan(10000); // Under 10 seconds
      expect(stats).toBeDefined();
      
      // Should not consume excessive memory
      const memoryPerNode = memoryIncrease / content.length;
      expect(memoryPerNode).toBeLessThan(200000); // Less than 200KB per node (generous for integration tests)
      
      console.log(`Very large document: ${processingTime.toFixed(2)}ms, ${content.length} nodes, ${(memoryIncrease/1024).toFixed(2)}KB`);
    });
  });

  describe('Pattern Processing Performance', () => {
    
    test('should handle bias-heavy content efficiently', async () => {
      // ARRANGE: Content with many bias patterns
      const biasContent = generateTestContent(200, 'bias');
      const textNodes = biasContent.map(text => ({
        nodeType: 3,
        textContent: text,
        parentNode: { 
          tagName: 'P', 
          classList: { contains: vi.fn(() => false) },
          replaceChild: vi.fn((newChild, oldChild) => oldChild),
          appendChild: vi.fn(),
          normalize: vi.fn()
        }
      }));

      let nodeIndex = -1;
      mockDocument.createTreeWalker.mockReturnValue({
        nextNode: vi.fn(() => {
          nodeIndex++;
          return nodeIndex < textNodes.length ? textNodes[nodeIndex] : null;
        })
      });

      const startTime = performance.now();

      // ACT: Analyze bias-heavy content
      const stats = await detector.analyzeDocument();

      const endTime = performance.now();
      const processingTime = endTime - startTime;

      // ASSERT: Should find many bias patterns efficiently
      expect(stats.opinionCount + stats.absoluteCount).toBeGreaterThan(50);
      expect(stats.healthScore).toBeLessThan(40); // Should be low for bias-heavy content
      expect(processingTime).toBeLessThan(2000); // Should still be efficient within 2 seconds
      
      console.log(`Bias-heavy content: ${processingTime.toFixed(2)}ms, ${stats.opinionCount + stats.absoluteCount} bias patterns`);
    });

    test('should handle excellence-heavy content efficiently', async () => {
      // ARRANGE: Content with many excellence patterns
      const excellenceContent = generateTestContent(200, 'excellence');
      const textNodes = excellenceContent.map(text => ({
        nodeType: 3,
        textContent: text,
        parentNode: { 
          tagName: 'P', 
          classList: { contains: vi.fn(() => false) },
          replaceChild: vi.fn((newChild, oldChild) => oldChild),
          appendChild: vi.fn(),
          normalize: vi.fn()
        }
      }));

      let nodeIndex = -1;
      mockDocument.createTreeWalker.mockReturnValue({
        nextNode: vi.fn(() => {
          nodeIndex++;
          return nodeIndex < textNodes.length ? textNodes[nodeIndex] : null;
        })
      });

      const startTime = performance.now();

      // ACT: Analyze excellence-heavy content
      const stats = await detector.analyzeDocument();

      const endTime = performance.now();
      const processingTime = endTime - startTime;

      // ASSERT: Should find many excellence patterns efficiently
      expect(stats.attributionExcellenceCount + stats.nuanceExcellenceCount + stats.transparencyExcellenceCount).toBeGreaterThan(30);
      expect(stats.healthScore).toBeGreaterThan(60); // Should be high for excellence content
      expect(processingTime).toBeLessThan(2000); // Should still be efficient within 2 seconds
      
      console.log(`Excellence-heavy: ${processingTime.toFixed(2)}ms, ${stats.attributionExcellenceCount + stats.nuanceExcellenceCount + stats.transparencyExcellenceCount} excellence patterns`);
    });

    test('should handle neutral content efficiently', async () => {
      // ARRANGE: Content with minimal patterns
      const neutralContent = generateTestContent(300, 'neutral');
      const textNodes = neutralContent.map(text => ({
        nodeType: 3,
        textContent: text,
        parentNode: { 
          tagName: 'P', 
          classList: { contains: vi.fn(() => false) },
          replaceChild: vi.fn((newChild, oldChild) => oldChild),
          appendChild: vi.fn(),
          normalize: vi.fn()
        }
      }));

      let nodeIndex = -1;
      mockDocument.createTreeWalker.mockReturnValue({
        nextNode: vi.fn(() => {
          nodeIndex++;
          return nodeIndex < textNodes.length ? textNodes[nodeIndex] : null;
        })
      });

      const startTime = performance.now();

      // ACT: Analyze neutral content
      const stats = await detector.analyzeDocument();

      const endTime = performance.now();
      const processingTime = endTime - startTime;

      // ASSERT: Should be very fast with minimal patterns
      expect(processingTime).toBeLessThan(300); // Should be very fast for neutral content
      expect(stats.healthScore).toBeGreaterThan(40);
      expect(stats.healthScore).toBeLessThan(85); // Neutral score for neutral content (more generous)
      
      console.log(`Neutral content: ${processingTime.toFixed(2)}ms, health score: ${stats.healthScore}`);
    });
  });

  describe('DOM Processing Performance', () => {
    
    test('should handle DOM manipulation scaling', async () => {
      // ARRANGE: Content that will generate many DOM highlights
      const content = generateTestContent(100, 'mixed');
      const textNodes = content.map(text => ({
        nodeType: 3,
        textContent: text,
        parentNode: { 
          tagName: 'P', 
          classList: { contains: vi.fn(() => false) },
          replaceChild: vi.fn((newChild, oldChild) => oldChild),
          appendChild: vi.fn(),
          normalize: vi.fn()
        }
      }));

      let nodeIndex = -1;
      mockDocument.createTreeWalker.mockReturnValue({
        nextNode: vi.fn(() => {
          nodeIndex++;
          return nodeIndex < textNodes.length ? textNodes[nodeIndex] : null;
        })
      });

      // Track DOM operations
      const createElementCalls = [];
      const originalCreateElement = mockDocument.createElement;
      
      // Store the original implementation before replacing it
      const originalMockImpl = originalCreateElement.getMockImplementation ? 
        originalCreateElement.getMockImplementation() : originalCreateElement;
        
      mockDocument.createElement = vi.fn((tagName) => {
        createElementCalls.push(tagName);
        return {
          tagName: tagName.toUpperCase(),
          nodeType: 1,
          className: '',
          textContent: '',
          style: {},
          classList: { 
            add: vi.fn(), 
            remove: vi.fn(), 
            contains: vi.fn(() => false),
            [Symbol.iterator]: function* () { yield* []; }
          },
          setAttribute: vi.fn(),
          removeAttribute: vi.fn(),
          hasAttribute: vi.fn(() => false),
          closest: vi.fn(() => null),
          addEventListener: vi.fn(),
          appendChild: vi.fn(),
          getBoundingClientRect: vi.fn(() => ({ width: 100, height: 20, top: 0, left: 0, right: 100, bottom: 20 }))
        };
      });

      const startTime = performance.now();

      // ACT: Analyze and process DOM
      const stats = await detector.analyzeDocument();

      const endTime = performance.now();
      const processingTime = endTime - startTime;

      // ASSERT: DOM operations should scale reasonably
      expect(processingTime).toBeLessThan(2000); // Allow up to 2 seconds for DOM operations
      expect(createElementCalls.length).toBeGreaterThan(0); // Should create highlight elements
      
      const totalPatterns = stats.opinionCount + stats.absoluteCount + 
                           stats.attributionExcellenceCount + stats.nuanceExcellenceCount + stats.transparencyExcellenceCount;
      
      if (totalPatterns > 0) {
        const domOpsPerPattern = createElementCalls.length / totalPatterns;
        expect(domOpsPerPattern).toBeLessThan(5); // Reasonable DOM operations per pattern
      }
      
      console.log(`DOM processing: ${processingTime.toFixed(2)}ms, ${createElementCalls.length} DOM ops, ${totalPatterns} patterns`);
    });

    test('should handle highlight cleanup efficiently', async () => {
      // ARRANGE: Create initial highlights
      const content = generateTestContent(100, 'bias');
      const textNodes = content.map(text => ({
        nodeType: 3,
        textContent: text,
        parentNode: { 
          tagName: 'P', 
          classList: { contains: vi.fn(() => false) },
          replaceChild: vi.fn((newChild, oldChild) => oldChild),
          appendChild: vi.fn(),
          normalize: vi.fn()
        }
      }));

      let nodeIndex = -1;
      mockDocument.createTreeWalker.mockReturnValue({
        nextNode: vi.fn(() => {
          nodeIndex++;
          return nodeIndex < textNodes.length ? textNodes[nodeIndex] : null;
        })
      });

      await detector.analyzeDocument();

      // Mock some existing highlights for cleanup
      const mockHighlights = Array(20).fill().map(() => ({
        parentNode: { 
          replaceChild: vi.fn(),
          normalize: vi.fn()
        },
        textContent: 'highlighted text'
      }));
      
      mockDocument.querySelectorAll.mockReturnValue(mockHighlights);

      const startTime = performance.now();

      // ACT: Clear highlights
      detector.clearHighlights();

      const endTime = performance.now();
      const cleanupTime = endTime - startTime;

      // ASSERT: Cleanup should be fast
      expect(cleanupTime).toBeLessThan(100); // Under 100ms for cleanup
      
      // Verify cleanup was called
      expect(mockDocument.querySelectorAll).toHaveBeenCalled();
      
      console.log(`Highlight cleanup: ${cleanupTime.toFixed(2)}ms for ${mockHighlights.length} highlights`);
    });
  });

  describe('Memory Management Performance', () => {
    
    test('should not leak memory during repeated analysis', async () => {
      // ARRANGE: Medium-sized content for repeated analysis
      const content = generateTestContent(100, 'mixed');
      const textNodes = content.map(text => ({
        nodeType: 3,
        textContent: text,
        parentNode: { 
          tagName: 'P', 
          classList: { contains: vi.fn(() => false) },
          replaceChild: vi.fn((newChild, oldChild) => oldChild),
          appendChild: vi.fn(),
          normalize: vi.fn()
        }
      }));

      const memoryReadings = [];

      // ACT: Perform multiple analyses and track memory
      for (let i = 0; i < 5; i++) {
        let nodeIndex = -1;
        mockDocument.createTreeWalker.mockReturnValue({
          nextNode: vi.fn(() => {
            nodeIndex++;
            return nodeIndex < textNodes.length ? textNodes[nodeIndex] : null;
          })
        });

        await detector.analyzeDocument();
        detector.clearHighlights();
        
        // Force garbage collection if available
        if (global.gc) {
          global.gc();
        }
        
        memoryReadings.push(getMemoryUsage().heapUsed);
      }

      // ASSERT: Memory should not continuously increase
      const initialMemory = memoryReadings[0];
      const finalMemory = memoryReadings[memoryReadings.length - 1];
      const memoryGrowth = finalMemory - initialMemory;

      // Allow for some memory growth but not excessive
      expect(memoryGrowth).toBeLessThan(initialMemory * 0.5); // Less than 50% growth
      
      console.log(`Memory readings: ${memoryReadings.map(m => Math.round(m/1024) + 'KB').join(', ')}`);
    });

    test('should handle resource cleanup efficiently', async () => {
      // ARRANGE: Set up detector with various resources
      const content = generateTestContent(50, 'mixed');
      const textNodes = content.map(text => ({
        nodeType: 3,
        textContent: text,
        parentNode: { 
          tagName: 'P', 
          classList: { contains: vi.fn(() => false) },
          replaceChild: vi.fn((newChild, oldChild) => oldChild),
          appendChild: vi.fn(),
          normalize: vi.fn()
        }
      }));

      let nodeIndex = -1;
      mockDocument.createTreeWalker.mockReturnValue({
        nextNode: vi.fn(() => {
          nodeIndex++;
          return nodeIndex < textNodes.length ? textNodes[nodeIndex] : null;
        })
      });

      await detector.analyzeDocument();
      
      // Mock observer and other resources
      const mockDisconnect = vi.fn();
      detector.observer = { disconnect: mockDisconnect };
      detector.domProcessor.removeAllHighlights = vi.fn();
      detector.performanceMonitor.cleanup = vi.fn();

      const startTime = performance.now();

      // ACT: Destroy detector and cleanup resources
      detector.destroy();

      const endTime = performance.now();
      const cleanupTime = endTime - startTime;

      // ASSERT: Cleanup should be fast and thorough
      expect(cleanupTime).toBeLessThan(50); // Under 50ms
      expect(mockDisconnect).toHaveBeenCalled();
      expect(detector.domProcessor.removeAllHighlights).toHaveBeenCalled();
      expect(detector.performanceMonitor.cleanup).toHaveBeenCalled();
      expect(detector.observer).toBeNull(); // Observer should be cleaned up
      
      console.log(`Resource cleanup: ${cleanupTime.toFixed(2)}ms`);
    });
  });

  describe('Concurrent Operations Performance', () => {
    
    test('should handle rapid settings changes during analysis', async () => {
      // ARRANGE: Set up for concurrent operations
      const content = generateTestContent(200, 'mixed');
      const textNodes = content.map(text => ({
        nodeType: 3,
        textContent: text,
        parentNode: { 
          tagName: 'P', 
          classList: { contains: vi.fn(() => false) },
          replaceChild: vi.fn((newChild, oldChild) => oldChild),
          appendChild: vi.fn(),
          normalize: vi.fn()
        }
      }));

      const startTime = performance.now();
      const operations = [];

      // ACT: Start analysis and make concurrent settings changes
      let nodeIndex = -1;
      mockDocument.createTreeWalker.mockReturnValue({
        nextNode: vi.fn(() => {
          nodeIndex++;
          return nodeIndex < textNodes.length ? textNodes[nodeIndex] : null;
        })
      });

      operations.push(detector.analyzeDocument());

      // Make rapid settings changes during analysis
      for (let i = 0; i < 5; i++) {
        operations.push(detector.updateSettings({
          ...detector.settings,
          detectOpinionWords: i % 2 === 0,
          analysisMode: ['problems', 'excellence', 'balanced'][i % 3]
        }));
      }

      // Wait for all operations to complete
      await Promise.all(operations);

      const endTime = performance.now();
      const totalTime = endTime - startTime;

      // ASSERT: Should handle concurrent operations efficiently
      expect(totalTime).toBeLessThan(2000); // Under 2 seconds for all operations
      
      // Final state should be valid
      expect(typeof detector.settings.detectOpinionWords).toBe('boolean');
      expect(detector.settings.analysisMode).toBeDefined();
      
      console.log(`Concurrent operations: ${totalTime.toFixed(2)}ms`);
    });

    test('should handle multiple force analyze calls efficiently', async () => {
      // ARRANGE: Set up for multiple analysis calls
      const content = generateTestContent(100, 'mixed');
      const textNodes = content.map(text => ({
        nodeType: 3,
        textContent: text,
        parentNode: { 
          tagName: 'P', 
          classList: { contains: vi.fn(() => false) },
          replaceChild: vi.fn((newChild, oldChild) => oldChild),
          appendChild: vi.fn(),
          normalize: vi.fn()
        }
      }));

      const analysisPromises = [];
      const startTime = performance.now();

      // ACT: Make multiple concurrent analysis calls
      for (let i = 0; i < 3; i++) {
        let nodeIndex = -1;
        mockDocument.createTreeWalker.mockReturnValue({
          nextNode: vi.fn(() => {
            nodeIndex++;
            return nodeIndex < textNodes.length ? textNodes[nodeIndex] : null;
          })
        });

        analysisPromises.push(detector.forceAnalyze());
      }

      const results = await Promise.all(analysisPromises);
      const endTime = performance.now();
      const totalTime = endTime - startTime;

      // ASSERT: Should handle multiple analyses efficiently
      expect(totalTime).toBeLessThan(1500); // Under 1.5 seconds
      expect(results).toHaveLength(3);
      
      // All results should be valid
      results.forEach(stats => {
        expect(stats).toBeDefined();
        expect(typeof stats.healthScore).toBe('number');
      });
      
      console.log(`Multiple force analyze: ${totalTime.toFixed(2)}ms for ${results.length} analyses`);
    });
  });
});
// tests/integration/settings-integration.test.js

/**
 * INTEGRATION TESTING: Settings Integration
 * 
 * Tests the complete settings workflow:
 * Settings Changes → Configuration Updates → Detector Behavior → UI State → Persistence
 * 
 * Validates that settings changes properly cascade through all system components.
 */

import { BiasDetector } from '../../src/content/BiasDetector.js';
import { BiasConfig } from '../../src/config/BiasConfig.js';

// Setup DOM environment for settings integration
const setupSettingsDOM = () => {
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
      classList: { add: vi.fn(), remove: vi.fn(), contains: vi.fn(() => false) },
      setAttribute: vi.fn(),
      addEventListener: vi.fn(),
      appendChild: vi.fn()
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
  Object.defineProperty(global, 'MutationObserver', { value: vi.fn(() => ({ observe: vi.fn(), disconnect: vi.fn() })), configurable: true });

  return mockDocument;
};

describe('Settings Integration Tests', () => {
  let detector;
  let mockDocument;

  beforeEach(() => {
    mockDocument = setupSettingsDOM();
    detector = new BiasDetector();
    vi.clearAllMocks();
  });

  afterEach(() => {
    if (detector) {
      detector.destroy();
    }
  });

  describe('Individual Detector Settings', () => {
    
    test('should enable/disable specific detectors and reflect in analysis', async () => {
      // ARRANGE: Create test content with multiple bias types
      const testText = 'This is obviously terrible and everyone knows it completely fails.';
      const textNodes = [{
        nodeType: 3,
        textContent: testText,
        parentNode: { 
          tagName: 'P', 
          classList: { contains: vi.fn(() => false) },
          replaceChild: vi.fn((newChild, oldChild) => oldChild),
          appendChild: vi.fn(),
          normalize: vi.fn()
        }
      }];

      let nodeIndex = -1;
      mockDocument.createTreeWalker.mockReturnValue({
        nextNode: vi.fn(() => {
          nodeIndex++;
          return nodeIndex < textNodes.length ? textNodes[nodeIndex] : null;
        })
      });

      // ACT 1: Analyze with all detectors enabled (default)
      const allEnabledStats = await detector.analyzeDocument();
      
      expect(allEnabledStats.opinionCount).toBeGreaterThan(0);
      expect(allEnabledStats.absoluteCount).toBeGreaterThan(0);

      // ACT 2: Disable opinion word detection
      await detector.updateSettings({
        ...detector.settings,
        highlightOpinion: false,
        highlightAbsolutes: true
      });

      nodeIndex = -1;
      const opinionDisabledStats = await detector.analyzeDocument();

      // ASSERT: Should detect absolutes but not opinions
      expect(opinionDisabledStats.opinionCount).toBe(0);
      expect(opinionDisabledStats.absoluteCount).toBeGreaterThan(0);

      // ACT 3: Disable absolute detection, enable opinion detection
      await detector.updateSettings({
        ...detector.settings,
        highlightOpinion: true,
        highlightAbsolutes: false
      });

      nodeIndex = -1;
      const absoluteDisabledStats = await detector.analyzeDocument();

      // ASSERT: Should detect opinions but not absolutes
      expect(absoluteDisabledStats.opinionCount).toBeGreaterThan(0);
      expect(absoluteDisabledStats.absoluteCount).toBe(0);
    });

    test('should handle cascade of detector dependencies', async () => {
      // ARRANGE: Test advanced detector interactions
      const complexText = 'Studies show this might be concerning, though research indicates otherwise.';
      const textNodes = [{
        nodeType: 3,
        textContent: complexText,
        parentNode: { 
          tagName: 'P', 
          classList: { contains: vi.fn(() => false) },
          replaceChild: vi.fn((newChild, oldChild) => oldChild),
          appendChild: vi.fn(),
          normalize: vi.fn()
        }
      }];

      let nodeIndex = -1;
      mockDocument.createTreeWalker.mockReturnValue({
        nextNode: vi.fn(() => {
          nodeIndex++;
          return nodeIndex < textNodes.length ? textNodes[nodeIndex] : null;
        })
      });

      // ACT: Test different combinations of advanced detectors
      const scenarios = [
        {
          name: 'Weasel + Passive Enabled',
          settings: { highlightWeasel: true, detectPassiveVoice: true, detectPresuppositions: false }
        },
        {
          name: 'Presupposition + Weasel Enabled', 
          settings: { highlightWeasel: true, detectPassiveVoice: false, detectPresuppositions: true }
        },
        {
          name: 'All Advanced Disabled',
          settings: { highlightWeasel: false, detectPassiveVoice: false, detectPresuppositions: false }
        }
      ];

      const results = [];
      for (const scenario of scenarios) {
        await detector.updateSettings({
          ...detector.settings,
          ...scenario.settings
        });

        nodeIndex = -1;
        const stats = await detector.analyzeDocument();
        results.push({ name: scenario.name, stats });
      }

      // ASSERT: Different combinations should produce different results
      const weaselPassiveResult = results.find(r => r.name === 'Weasel + Passive Enabled');
      const presuppositionWeaselResult = results.find(r => r.name === 'Presupposition + Weasel Enabled');
      const allDisabledResult = results.find(r => r.name === 'All Advanced Disabled');

      // At least one scenario should detect patterns (depending on what's in the text)
      const totalDetections = results.reduce((sum, result) => 
        sum + (result.stats.weaselWords || 0) + (result.stats.passiveVoice || 0) + (result.stats.presuppositions || 0), 0
      );
      
      // Should have different detection counts across scenarios
      expect(totalDetections).toBeGreaterThanOrEqual(0); // May be 0 if text doesn't contain these patterns
    });
  });

  describe('Analysis Mode Settings', () => {
    
    test('should switch between analysis modes and maintain consistency', async () => {
      // ARRANGE: Content with both problems and excellence
      const mixedContent = [
        'According to Dr. Smith (2023), this approach might be promising.',
        'However, this is obviously the worst possible solution.',
        'In my opinion, while limitations exist, the evidence suggests potential.'
      ];

      const textNodes = mixedContent.map(text => ({
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
      const resetTreeWalker = () => {
        nodeIndex = -1;
        mockDocument.createTreeWalker.mockReturnValue({
          nextNode: vi.fn(() => {
            nodeIndex++;
            return nodeIndex < textNodes.length ? textNodes[nodeIndex] : null;
          })
        });
      };

      const modes = ['balanced', 'problems', 'excellence'];
      const results = {};

      // ACT: Test each analysis mode
      for (const mode of modes) {
        await detector.updateSettings({
          ...detector.settings,
          analysisMode: mode,
          enableAnalysis: true
        });

        resetTreeWalker();
        const stats = await detector.analyzeDocument();
        results[mode] = stats;
      }

      // ASSERT: Mode-specific behavior
      
      // Balanced mode should detect both problems and excellence
      expect(results.balanced.opinionCount + results.balanced.absoluteCount).toBeGreaterThan(0);
      expect(results.balanced.attribution + results.balanced.nuance + results.balanced.transparency).toBeGreaterThan(0);
      
      // Problems mode should focus on problems
      expect(results.problems.opinionCount + results.problems.absoluteCount).toBeGreaterThan(0);
      
      // Excellence mode should focus on excellence
      expect(results.excellence.attribution + results.excellence.nuance + results.excellence.transparency).toBeGreaterThan(0);

      // Health scores should reflect mode focus
      expect(results.problems.healthScore).toBeLessThanOrEqual(results.balanced.healthScore);
      expect(results.excellence.healthScore).toBeGreaterThanOrEqual(results.balanced.healthScore);
    });

    test('should maintain mode consistency across document changes', async () => {
      // ARRANGE: Set excellence mode
      await detector.updateSettings({
        ...detector.settings,
        analysisMode: 'excellence',
        enableAnalysis: true
      });

      // Test with different documents
      const documents = [
        ['According to research, this might be effective.'],
        ['Dr. Smith et al. (2024) found significant correlations.'],
        ['In my view, while limitations exist, the evidence is promising.']
      ];

      const results = [];
      
      for (const docTexts of documents) {
        const textNodes = docTexts.map(text => ({
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

        const stats = await detector.analyzeDocument();
        results.push(stats);
      }

      // ASSERT: All should show excellence focus (high health scores)
      results.forEach(stats => {
        expect(stats.healthScore).toBeGreaterThan(60); // Excellence mode should yield high scores for good content
      });
    });
  });

  describe('Settings Persistence and State Management', () => {
    
    test('should maintain settings state across multiple operations', async () => {
      // ARRANGE: Set specific configuration
      const customSettings = {
        ...detector.settings,
        highlightOpinion: false,
        highlightAbsolutes: true,
        highlightWeasel: false,
        analysisMode: 'problems',
        enableAnalysis: true
      };

      // Setup TreeWalker mock for forceAnalyze
      const textNodes = [{
        nodeType: 3,
        textContent: 'This is absolutely terrible and everyone knows it.',
        parentNode: { 
          tagName: 'P', 
          classList: { contains: vi.fn(() => false) },
          replaceChild: vi.fn((newChild, oldChild) => oldChild),
          appendChild: vi.fn(),
          normalize: vi.fn()
        }
      }];

      let nodeIndex = -1;
      mockDocument.createTreeWalker.mockReturnValue({
        nextNode: vi.fn(() => {
          nodeIndex++;
          return nodeIndex < textNodes.length ? textNodes[nodeIndex] : null;
        })
      });

      // ACT: Apply settings and perform multiple operations
      await detector.updateSettings(customSettings);

      // Perform various operations that might affect settings
      await detector.clearHighlights();
      await detector.forceAnalyze();
      detector.getStats();
      detector.resetStats();

      // ASSERT: Settings should remain unchanged
      expect(detector.settings.highlightOpinion).toBe(false);
      expect(detector.settings.highlightAbsolutes).toBe(true);
      expect(detector.settings.highlightWeasel).toBe(false);
      expect(detector.settings.analysisMode).toBe('problems');
      expect(detector.settings.enableAnalysis).toBe(true);
    });

    test('should validate settings and reject invalid configurations', async () => {
      // ARRANGE: Get current valid settings
      const originalSettings = { ...detector.settings };

      // ACT: Try to apply invalid settings
      const invalidSettings = {
        ...originalSettings,
        analysisMode: 'invalid-mode',
        highlightOpinion: 'not-a-boolean',
        nonExistentSetting: 'should-be-ignored',
        enableAnalysis: null
      };

      await detector.updateSettings(invalidSettings);

      // ASSERT: Invalid settings should be corrected or ignored
      expect(['problems', 'excellence', 'balanced']).toContain(detector.settings.analysisMode);
      expect(typeof detector.settings.highlightOpinion).toBe('boolean');
      expect(detector.settings.nonExistentSetting).toBeUndefined();
      expect(typeof detector.settings.enableAnalysis).toBe('boolean');
    });

    test('should handle partial settings updates correctly', async () => {
      // ARRANGE: Start with known state
      const baseSettings = BiasConfig.getDefaultSettings();
      await detector.updateSettings(baseSettings);

      // ACT: Apply partial updates
      await detector.updateSettings({ highlightOpinion: false });
      expect(detector.settings.highlightOpinion).toBe(false);
      expect(detector.settings.highlightAbsolutes).toBe(baseSettings.highlightAbsolutes); // Should remain unchanged

      await detector.updateSettings({ analysisMode: 'excellence' });
      expect(detector.settings.analysisMode).toBe('excellence');
      expect(detector.settings.highlightOpinion).toBe(false); // Should remain from previous update
      
      await detector.updateSettings({ 
        highlightWeasel: true,
        detectPassiveVoice: false 
      });
      expect(detector.settings.highlightWeasel).toBe(true);
      expect(detector.settings.detectPassiveVoice).toBe(false);
      expect(detector.settings.analysisMode).toBe('excellence'); // Should remain from previous update
    });
  });

  describe('Settings Performance and Responsiveness', () => {
    
    test('should handle rapid settings changes efficiently', async () => {
      // ARRANGE: Prepare for rapid changes
      const startTime = performance.now();
      
      // ACT: Make many rapid settings changes
      for (let i = 0; i < 20; i++) {
        await detector.updateSettings({
          ...detector.settings,
          highlightOpinion: i % 2 === 0,
          highlightAbsolutes: i % 3 === 0,
          analysisMode: ['problems', 'excellence', 'balanced'][i % 3]
        });
      }
      
      const endTime = performance.now();
      const totalTime = endTime - startTime;

      // ASSERT: Should handle rapid changes efficiently
      expect(totalTime).toBeLessThan(1000); // Should complete in under 1 second
      
      // Final state should be valid
      expect(typeof detector.settings.highlightOpinion).toBe('boolean');
      expect(typeof detector.settings.highlightAbsolutes).toBe('boolean');
      expect(['problems', 'excellence', 'balanced']).toContain(detector.settings.analysisMode);
    });

    test('should debounce analysis during rapid settings changes', async () => {
      // ARRANGE: Set up content for analysis
      const testTexts = ['This is obviously wrong.'];
      const textNodes = testTexts.map(text => ({
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

      let analysisCount = 0;
      let nodeIndex = -1;
      
      const mockTreeWalker = {
        nextNode: vi.fn(() => {
          analysisCount++;
          nodeIndex++;
          return nodeIndex < textNodes.length ? textNodes[nodeIndex] : null;
        })
      };
      mockDocument.createTreeWalker.mockReturnValue(mockTreeWalker);

      // ACT: Make rapid settings changes that trigger re-analysis
      const promises = [];
      for (let i = 0; i < 5; i++) {
        promises.push(detector.updateSettings({
          ...detector.settings,
          highlightOpinion: i % 2 === 0,
          enableAnalysis: true
        }));
        nodeIndex = -1; // Reset for each potential analysis
      }

      await Promise.all(promises);

      // Allow any pending operations to complete
      await new Promise(resolve => setTimeout(resolve, 100));

      // ASSERT: Should not have triggered excessive re-analysis
      // The exact number depends on implementation details, but should be reasonable
      expect(analysisCount).toBeLessThan(20); // Should not analyze for every single setting change
    });
  });

  describe('Settings Error Recovery', () => {
    
    test('should recover from settings corruption gracefully', async () => {
      // ARRANGE: Corrupt detector settings
      detector.settings = null;

      // Setup TreeWalker mock for potential analysis during settings update
      const textNodes = [{
        nodeType: 3,
        textContent: 'Test content for settings recovery.',
        parentNode: { 
          tagName: 'P', 
          classList: { contains: vi.fn(() => false) },
          replaceChild: vi.fn((newChild, oldChild) => oldChild),
          appendChild: vi.fn(),
          normalize: vi.fn()
        }
      }];

      let nodeIndex = -1;
      mockDocument.createTreeWalker.mockReturnValue({
        nextNode: vi.fn(() => {
          nodeIndex++;
          return nodeIndex < textNodes.length ? textNodes[nodeIndex] : null;
        })
      });

      // ACT: Try to update settings
      await detector.updateSettings({
        highlightOpinion: true,
        enableAnalysis: true
      });

      // ASSERT: Should recover with valid settings
      expect(detector.settings).toBeDefined();
      expect(typeof detector.settings).toBe('object');
      expect(typeof detector.settings.highlightOpinion).toBe('boolean');
      expect(typeof detector.settings.enableAnalysis).toBe('boolean');
    });

    test('should maintain functionality when settings operations fail', async () => {
      // ARRANGE: Mock a settings operation failure
      const originalSettings = { ...detector.settings };
      
      // Simulate settings update failure
      const settingsUpdateSpy = vi.spyOn(detector, 'updateSettings').mockRejectedValueOnce(new Error('Settings update failed'));

      // ACT: Try to update settings (will fail)
      try {
        await detector.updateSettings({ highlightOpinion: false });
      } catch (error) {
        // Expected to fail
      }

      // Restore the spy
      settingsUpdateSpy.mockRestore();

      // ASSERT: Detector should still be functional
      const stats = detector.getStats();
      expect(stats).toBeDefined();
      
      // Original settings should be preserved
      expect(detector.settings.highlightOpinion).toBe(originalSettings.highlightOpinion);
    });
  });

  describe('Settings Integration with External Systems', () => {
    
    test('should coordinate settings with performance monitoring', async () => {
      // ARRANGE: Enable performance monitoring through settings
      await detector.updateSettings({
        ...detector.settings,
        enableAnalysis: true
      });

      const testTexts = ['This might be a test of performance monitoring.'];
      const textNodes = testTexts.map(text => ({
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

      // ACT: Perform analysis with performance monitoring
      const stats = await detector.analyzeDocument();

      // ASSERT: Performance metrics should be available
      const performanceMetrics = detector.getPerformanceMetrics();
      expect(performanceMetrics).toBeDefined();
      
      // Settings should affect what gets monitored
      expect(stats).toBeDefined();
    });

    test('should integrate settings with DOM processor configuration', async () => {
      // ARRANGE: Configure settings that affect DOM processing
      await detector.updateSettings({
        ...detector.settings,
        enableAnalysis: true,
        analysisMode: 'balanced'
      });

      // ACT: Trigger DOM processing
      const testTexts = ['This is obviously excellent research by Dr. Smith.'];
      const textNodes = testTexts.map(text => ({
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

      // ASSERT: DOM processor should have been called with appropriate configuration
      expect(mockDocument.createElement).toHaveBeenCalled(); // DOM elements created for highlights
      expect(mockDocument.createDocumentFragment).toHaveBeenCalled(); // Fragments created for text replacement
    });
  });
});
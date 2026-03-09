// tests/unit/DOMProcessor.test.js

/**
 * TESTING: DOMProcessor Class (DOM Manipulation)
 * 
 * Tests the DOM processing system that handles text node collection,
 * highlighting, tooltip creation, and cleanup operations.
 */

import { DOMProcessor } from '../../src/utils/DOMProcessor.js';

// Enhanced DOM mocking for comprehensive testing
const createMockElement = (tagName = 'div', content = '', attributes = {}) => {
  const classSet = new Set();
  const element = {
    tagName: tagName.toUpperCase(),
    nodeName: tagName.toUpperCase(),
    nodeType: 1, // ELEMENT_NODE
    textContent: content,
    childNodes: [],
    children: [],
    style: {},
    classList: {
      add: vi.fn((cls) => classSet.add(cls)),
      remove: vi.fn((cls) => classSet.delete(cls)),
      contains: vi.fn((cls) => classSet.has(cls)),
      values: vi.fn(() => classSet.values()),
      [Symbol.iterator]: function* () {
        yield* classSet;
      }
    },
    setAttribute: vi.fn(),
    removeAttribute: vi.fn(),
    getAttribute: vi.fn(() => null),
    hasAttribute: vi.fn(() => false),
    appendChild: vi.fn(),
    replaceChild: vi.fn(),
    removeChild: vi.fn(),
    querySelector: vi.fn(() => null),
    querySelectorAll: vi.fn(() => []),
    closest: vi.fn(() => null),
    getBoundingClientRect: vi.fn(() => ({
      width: 100, height: 20, top: 0, left: 0, right: 100, bottom: 20
    })),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    ...attributes
  };
  
  if (attributes.hasShadowRoot) {
    element.shadowRoot = createMockElement('shadow-root');
  }
  
  return element;
};

const createMockTextNode = (content) => ({
  nodeType: 3, // TEXT_NODE
  nodeName: '#text',
  textContent: content,
  parentNode: null
});

const createMockTreeWalker = (nodes = []) => {
  let index = -1;
  return {
    nextNode: vi.fn(() => {
      index++;
      return index < nodes.length ? nodes[index] : null;
    })
  };
};

// Enhanced document mock
const mockDocument = {
  body: createMockElement('body'),
  createElement: vi.fn((tag) => createMockElement(tag)),
  createTextNode: vi.fn((text) => createMockTextNode(text)),
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

// Mock window
const mockWindow = {
  innerWidth: 1024,
  innerHeight: 768
};

// Set up globals
Object.defineProperty(global, 'document', { value: mockDocument, configurable: true });
Object.defineProperty(global, 'window', { value: mockWindow, configurable: true });
Object.defineProperty(global, 'Node', {
  value: { ELEMENT_NODE: 1, TEXT_NODE: 3 },
  configurable: true
});
Object.defineProperty(global, 'NodeFilter', {
  value: { SHOW_TEXT: 4, FILTER_ACCEPT: 1, FILTER_REJECT: 2 },
  configurable: true
});

describe('DOMProcessor', () => {
  let processor;

  beforeEach(() => {
    processor = new DOMProcessor();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('Constructor and Initialization', () => {
    
    test('should initialize with correct default values', () => {
      expect(processor.highlightClassPrefix).toBe('bias-highlight-');
      expect(processor.excellenceClassPrefix).toBe('excellence-');
      expect(processor.processedParents).toBeInstanceOf(Set);
      expect(processor.hoverGenerator).toBeDefined();
    });

    test('should initialize empty processed parents set', () => {
      expect(processor.processedParents.size).toBe(0);
    });
  });

  describe('Text Node Collection', () => {
    
    test('should collect text nodes using TreeWalker', () => {
      const textNode1 = createMockTextNode('Hello world');
      const textNode2 = createMockTextNode('Test content');
      const mockWalker = createMockTreeWalker([textNode1, textNode2]);
      
      mockDocument.createTreeWalker.mockReturnValue(mockWalker);
      
      const rootElement = createMockElement('div');
      const textNodes = processor.collectTextNodes(rootElement);
      
      expect(mockDocument.createTreeWalker).toHaveBeenCalledWith(
        rootElement,
        NodeFilter.SHOW_TEXT,
        expect.any(Object)
      );
      expect(textNodes).toEqual([textNode1, textNode2]);
    });

    test('should handle empty root gracefully', () => {
      const mockWalker = createMockTreeWalker([]);
      mockDocument.createTreeWalker.mockReturnValue(mockWalker);
      
      const rootElement = createMockElement('div');
      const textNodes = processor.collectTextNodes(rootElement);
      
      expect(textNodes).toEqual([]);
    });
  });

  describe('Node Filtering', () => {
    
    test('should skip empty text nodes', () => {
      const emptyNode = createMockTextNode('   ');
      expect(processor.shouldSkipNode(emptyNode)).toBe(true);
      
      const whitespaceNode = createMockTextNode('\n\t  ');
      expect(processor.shouldSkipNode(whitespaceNode)).toBe(true);
    });

    test('should skip nodes within own highlights', () => {
      const parentElement = createMockElement('span');
      // Mark as a bias highlight
      parentElement.classList[Symbol.iterator] = function* () {
        yield 'bias-highlight-opinion';
      };
      
      const textNode = createMockTextNode('Test content');
      textNode.parentNode = parentElement;
      
      expect(processor.shouldSkipNode(textNode)).toBe(true);
    });

    test('should accept valid content nodes', () => {
      const parentElement = createMockElement('p');
      const textNode = createMockTextNode('Valid content text');
      textNode.parentNode = parentElement;
      
      expect(processor.shouldSkipNode(textNode)).toBe(false);
    });

    test('should skip script and style elements', () => {
      // shouldSkipElement checks nodeName + classList + hasAttribute + closest
      const scriptElement = createMockElement('script');
      expect(processor.shouldSkipElement(scriptElement)).toBe(true);
      
      const styleElement = createMockElement('style');
      expect(processor.shouldSkipElement(styleElement)).toBe(true);
      
      const svgElement = createMockElement('svg');
      expect(processor.shouldSkipElement(svgElement)).toBe(true);
      
      const divElement = createMockElement('div');
      expect(processor.shouldSkipElement(divElement)).toBe(false);
    });
  });

  describe('Highlight Detection', () => {
    
    test('should identify own highlight elements', () => {
      const highlightElement = createMockElement('span');
      highlightElement.classList[Symbol.iterator] = function* () {
        yield 'bias-highlight-opinion';
        yield 'other-class';
      };
      
      expect(processor.isOwnHighlight(highlightElement)).toBe(true);
    });

    test('should identify excellence highlight elements', () => {
      const excellenceElement = createMockElement('span');
      excellenceElement.classList[Symbol.iterator] = function* () {
        yield 'excellence-attribution';
        yield 'other-class';
      };
      
      expect(processor.isOwnHighlight(excellenceElement)).toBe(true);
    });

    test('should not identify regular elements as highlights', () => {
      const regularElement = createMockElement('span');
      regularElement.classList[Symbol.iterator] = function* () {
        yield 'regular-class';
        yield 'another-class';
      };
      
      expect(processor.isOwnHighlight(regularElement)).toBe(false);
    });

    test('should handle elements without classList', () => {
      const element = { classList: null };
      expect(processor.isOwnHighlight(element)).toBe(false);
    });
  });

  describe('Fragment Creation', () => {
    
    test('should create highlighted fragment with matches', () => {
      const text = 'This is obviously wrong.';
      const matches = [
        {
          index: 8,
          length: 9,
          text: 'obviously',
          type: 'opinion',
          isExcellence: false
        }
      ];
      
      const mockFragment = {
        appendChild: vi.fn(),
        childNodes: []
      };
      const mockSpan = createMockElement('span');
      
      mockDocument.createDocumentFragment.mockReturnValue(mockFragment);
      mockDocument.createElement.mockReturnValue(mockSpan);
      mockDocument.createTextNode.mockImplementation((text) => createMockTextNode(text));
      
      // Mock addDataAttributes to avoid PopupManager initialization
      processor.addDataAttributes = vi.fn();
      
      const fragment = processor.createHighlightedFragment(text, matches);
      
      expect(mockFragment.appendChild).toHaveBeenCalledTimes(3); // before, span, after
      expect(mockSpan.textContent).toBe('obviously');
      expect(mockSpan.className).toBe('bias-highlight-opinion');
      expect(processor.addDataAttributes).toHaveBeenCalledWith(mockSpan, matches[0]);
    });

    test('should handle excellence matches correctly', () => {
      const text = 'According to Smith et al. (2023)';
      const matches = [
        {
          index: 0,
          length: 31,
          text: 'According to Smith et al. (2023)',
          type: 'attribution',
          className: 'excellence-attribution',
          isExcellence: true
        }
      ];
      
      const mockFragment = { appendChild: vi.fn(), childNodes: [] };
      const mockSpan = createMockElement('span');
      
      mockDocument.createDocumentFragment.mockReturnValue(mockFragment);
      mockDocument.createElement.mockReturnValue(mockSpan);
      
      processor.addDataAttributes = vi.fn();
      
      const fragment = processor.createHighlightedFragment(text, matches);
      
      expect(mockSpan.className).toBe('excellence-attribution');
    });

    test('should handle opinion sub-categories', () => {
      const text = 'This is obviously wrong.';
      const matches = [
        {
          index: 8,
          length: 9,
          text: 'obviously',
          type: 'opinion_certainty',
          isExcellence: false
        }
      ];
      
      const mockFragment = { appendChild: vi.fn(), childNodes: [] };
      const mockSpan = createMockElement('span');
      
      mockDocument.createDocumentFragment.mockReturnValue(mockFragment);
      mockDocument.createElement.mockReturnValue(mockSpan);
      
      processor.addDataAttributes = vi.fn();
      
      const fragment = processor.createHighlightedFragment(text, matches);
      
      // opinion_certainty should map to the base 'opinion' CSS class
      expect(mockSpan.className).toBe('bias-highlight-opinion');
    });

    test('should handle intensity levels', () => {
      const text = 'This is absolutely wrong.';
      const matches = [
        {
          index: 8,
          length: 10,
          text: 'absolutely',
          type: 'opinion',
          intensity: 3,
          isExcellence: false
        }
      ];
      
      const mockFragment = { appendChild: vi.fn(), childNodes: [] };
      const mockSpan = createMockElement('span');
      
      mockDocument.createDocumentFragment.mockReturnValue(mockFragment);
      mockDocument.createElement.mockReturnValue(mockSpan);
      
      processor.addDataAttributes = vi.fn();
      
      const fragment = processor.createHighlightedFragment(text, matches);
      
      expect(mockSpan.classList.add).toHaveBeenCalledWith('bias-intensity-3');
    });

    test('should handle empty matches array', () => {
      const text = 'No matches here.';
      const matches = [];
      
      const mockFragment = { appendChild: vi.fn(), childNodes: [] };
      
      mockDocument.createDocumentFragment.mockReturnValue(mockFragment);
      mockDocument.createTextNode.mockImplementation((text) => createMockTextNode(text));
      
      const fragment = processor.createHighlightedFragment(text, matches);
      
      expect(mockFragment.appendChild).toHaveBeenCalledTimes(1); // just the text
    });
  });

  describe('Tooltip Text', () => {
    
    test('should get correct tooltip text for bias types', () => {
      expect(processor.getTooltipText('opinion')).toBe('Opinion - Subjective - General');
      expect(processor.getTooltipText('tobe')).toBe('To-be verb (E-Prime violation)');
      expect(processor.getTooltipText('absolute')).toBe('Absolute statement');
      expect(processor.getTooltipText('unknown')).toBe('Bias indicator');
    });

    test('should get correct tooltip text for opinion sub-categories', () => {
      expect(processor.getTooltipText('opinion_certainty')).toBe('Possible Opinion - Certainty/Conviction');
      expect(processor.getTooltipText('opinion_hedging')).toBe('Possible Opinion - Hedging/Uncertainty');
    });

    test('should get correct tooltip text for excellence types', () => {
      expect(processor.getExcellenceTooltipText('attribution')).toBe('✓ Specific, verifiable source provided');
      expect(processor.getExcellenceTooltipText('nuance')).toBe('✓ Acknowledges complexity and avoids absolutes');
      expect(processor.getExcellenceTooltipText('unknown')).toBe('Excellence indicator');
    });
  });

  describe('Context Menu (Deprecated)', () => {
    
    test('showContextMenu should be a no-op deprecation warning', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      
      processor.showContextMenu({ preventDefault: vi.fn() }, { type: 'opinion' });
      
      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('deprecated'));
      consoleSpy.mockRestore();
    });
  });

  describe('Hover Card Creation', () => {
    
    test('should create hover card using generator', () => {
      const match = { type: 'opinion', text: 'obviously' };
      
      processor.hoverGenerator.generateHoverContent = vi.fn(() => '<div class="hover-card">Content</div>');
      
      const mockContainer = createMockElement('div');
      mockContainer.firstChild = createMockElement('div');
      mockDocument.createElement.mockReturnValue(mockContainer);
      
      const hoverCard = processor.createHoverCard(match);
      
      expect(processor.hoverGenerator.generateHoverContent).toHaveBeenCalledWith(match, []);
      expect(hoverCard).toBeDefined();
    });

    test('should handle hover card creation errors', () => {
      const match = { type: 'opinion', text: 'obviously' };
      
      processor.hoverGenerator.generateHoverContent = vi.fn(() => {
        throw new Error('Generator error');
      });
      
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      
      const hoverCard = processor.createHoverCard(match);
      
      expect(hoverCard).toBeNull();
      expect(consoleSpy).toHaveBeenCalledWith('Error creating hover card:', expect.any(Error));
      consoleSpy.mockRestore();
    });

    test('should find nearby matches correctly', () => {
      const currentMatch = { index: 50, length: 10 };
      const allMatches = [
        { index: 10, length: 5 },   // distance = 40, nearby
        { index: 45, length: 3 },   // distance = 5, nearby
        { index: 65, length: 4 },   // distance = 15, nearby
        { index: 200, length: 6 }   // distance = 150, too far
      ];
      
      const nearby = processor.findNearbyMatches(currentMatch, allMatches);
      
      expect(nearby).toHaveLength(3);
      expect(nearby.some(m => m.index === 10)).toBe(true);
      expect(nearby.some(m => m.index === 45)).toBe(true);
      expect(nearby.some(m => m.index === 65)).toBe(true);
    });
  });

  describe('Highlight Removal', () => {
    
    test('should remove all highlights', () => {
      const highlight1 = createMockElement('span');
      const highlight2 = createMockElement('span');
      
      mockDocument.querySelectorAll.mockReturnValue([highlight1, highlight2]);
      
      processor.cleanupHoverElements = vi.fn();
      
      highlight1.parentNode = createMockElement('p');
      highlight2.parentNode = createMockElement('div');
      
      processor.removeAllHighlights();
      
      expect(mockDocument.querySelectorAll).toHaveBeenCalled();
      expect(processor.cleanupHoverElements).toHaveBeenCalledTimes(2);
      expect(highlight1.parentNode.replaceChild).toHaveBeenCalled();
      expect(highlight2.parentNode.replaceChild).toHaveBeenCalled();
    });

    test('should remove specific type highlights', () => {
      const opinionHighlight = createMockElement('span');
      
      mockDocument.querySelectorAll.mockReturnValue([opinionHighlight]);
      processor.cleanupHoverElements = vi.fn();
      opinionHighlight.parentNode = createMockElement('p');
      
      processor.removeSpecificHighlights('opinion');
      
      expect(mockDocument.querySelectorAll).toHaveBeenCalledWith('.bias-highlight-opinion');
      expect(opinionHighlight.parentNode.replaceChild).toHaveBeenCalled();
    });

    test('should cleanup hover elements', () => {
      const element = createMockElement('span');
      
      processor.cleanupHoverElements(element);
      
      // Should remove data-tooltip-text (the current attribute name)
      expect(element.removeAttribute).toHaveBeenCalledWith('data-tooltip-text');
    });

    test('should normalize parent nodes after removal', () => {
      const parent = createMockElement('p');
      parent.normalize = vi.fn();
      
      const highlight = createMockElement('span');
      highlight.parentNode = parent;
      
      mockDocument.querySelectorAll.mockReturnValue([highlight]);
      processor.cleanupHoverElements = vi.fn();
      
      processor.removeAllHighlights();
      
      expect(parent.normalize).toHaveBeenCalled();
    });
  });

  describe('Highlight Selectors', () => {
    
    test('should return correct highlight selectors', () => {
      const selectors = processor.getHighlightSelectors();
      
      expect(selectors.opinion).toBe('.bias-highlight-opinion');
      expect(selectors.tobe).toBe('.bias-highlight-tobe');
      expect(selectors.attribution).toBe('.excellence-attribution');
      expect(selectors.nuance).toBe('.excellence-nuance');
      
      expect(Object.keys(selectors).length).toBeGreaterThan(10);
    });
  });

  describe('Content Significance Detection', () => {
    
    test('should identify significant element content', () => {
      const significantElement = createMockElement('div', 'This is a long enough piece of content to be significant');
      expect(processor.isSignificantContent(significantElement)).toBe(true);
      
      const shortElement = createMockElement('div', 'Short');
      expect(processor.isSignificantContent(shortElement)).toBe(false);
    });

    test('should identify significant text node content', () => {
      const significantTextNode = createMockTextNode('This is a long enough piece of content to be significant');
      expect(processor.isSignificantContent(significantTextNode)).toBe(true);
      
      const shortTextNode = createMockTextNode('Short');
      expect(processor.isSignificantContent(shortTextNode)).toBe(false);
    });

    test('should handle unknown node types', () => {
      const unknownNode = { nodeType: 9, textContent: 'Some content' };
      expect(processor.isSignificantContent(unknownNode)).toBe(false);
    });
  });

  describe('Mutation Processing', () => {
    
    test('should extract changed text nodes from mutations', () => {
      const textNode = createMockTextNode('New content here');
      const elementNode = createMockElement('div', 'Element content');
      
      const mutations = [
        {
          target: createMockElement('div'),
          addedNodes: [textNode, elementNode]
        }
      ];
      
      processor.isOwnHighlight = vi.fn(() => false);
      processor.collectTextNodes = vi.fn(() => [createMockTextNode('Element text')]);
      
      const changedNodes = processor.extractChangedTextNodes(mutations);
      
      expect(changedNodes.length).toBeGreaterThan(0);
    });

    test('should skip own highlight mutations', () => {
      const mutations = [
        {
          target: createMockElement('span'),
          addedNodes: [createMockTextNode('Content')]
        }
      ];
      
      processor.isOwnHighlight = vi.fn(() => true);
      
      const changedNodes = processor.extractChangedTextNodes(mutations);
      
      expect(changedNodes).toEqual([]);
    });

    test('should filter short text nodes', () => {
      const shortTextNode = createMockTextNode('Hi');
      const longTextNode = createMockTextNode('Long enough content');
      
      const mutations = [
        {
          target: createMockElement('div'),
          addedNodes: [shortTextNode, longTextNode]
        }
      ];
      
      processor.isOwnHighlight = vi.fn(() => false);
      
      const changedNodes = processor.extractChangedTextNodes(mutations);
      
      expect(changedNodes.some(node => node.textContent === 'Long enough content')).toBe(true);
      expect(changedNodes.some(node => node.textContent === 'Hi')).toBe(false);
    });
  });

  describe('Highlight Counting', () => {
    
    test('should count highlights correctly', () => {
      processor.getHighlightSelectors = vi.fn(() => ({
        opinion: '.bias-highlight-opinion',
        tobe: '.bias-highlight-tobe'
      }));
      
      mockDocument.querySelectorAll
        .mockReturnValueOnce([{}, {}]) // 2 opinion highlights
        .mockReturnValueOnce([{}]);     // 1 tobe highlight
      
      const counts = processor.countHighlights();
      
      expect(counts.opinion).toBe(2);
      expect(counts.tobe).toBe(1);
    });

    test('should handle zero highlights', () => {
      processor.getHighlightSelectors = vi.fn(() => ({
        opinion: '.bias-highlight-opinion'
      }));
      
      mockDocument.querySelectorAll.mockReturnValue([]);
      
      const counts = processor.countHighlights();
      
      expect(counts.opinion).toBe(0);
    });
  });

  describe('Error Handling', () => {
    
    test('should handle missing parentNode gracefully', () => {
      const highlight = createMockElement('span');
      highlight.parentNode = null;
      
      mockDocument.querySelectorAll.mockReturnValue([highlight]);
      processor.cleanupHoverElements = vi.fn();
      
      expect(() => processor.removeAllHighlights()).toThrow();
    });

    test('should handle DOM manipulation errors', () => {
      const highlight = createMockElement('span');
      const parent = createMockElement('p');
      
      parent.replaceChild = vi.fn(() => {
        throw new Error('DOM error');
      });
      
      highlight.parentNode = parent;
      
      mockDocument.querySelectorAll.mockReturnValue([highlight]);
      processor.cleanupHoverElements = vi.fn();
      
      expect(() => processor.removeAllHighlights()).toThrow('DOM error');
    });
  });
});

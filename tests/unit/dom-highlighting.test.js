// tests/unit/dom-highlighting.test.js

/**
 * TESTING TUTORIAL: DOM Testing with JSDOM
 * 
 * JSDOM creates a fake browser environment in Node.js
 * This lets us test DOM manipulation without a real browser
 */

const { JSDOM } = require('jsdom');

// Create a simple DOM highlighting function to test
function highlightBiasInElement(element, biasWords, highlightClass) {
  if (!element || !biasWords || !Array.isArray(biasWords)) {
    return 0; // Return count of highlights added
  }
  
  let highlightCount = 0;
  const textNodes = [];
  
  // Find all text nodes (simplified version)
  function collectTextNodes(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      if (node.textContent.trim().length > 0) {
        textNodes.push(node);
      }
    } else {
      for (let child of node.childNodes) {
        collectTextNodes(child);
      }
    }
  }
  
  collectTextNodes(element);
  
  // Process each text node
  textNodes.forEach(textNode => {
    let content = textNode.textContent;
    let hasMatches = false;
    
    // Check for bias words (case insensitive)
    biasWords.forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      const matches = content.match(regex);
      if (matches) {
        hasMatches = true;
        // Replace ALL matches, not just the first one
        content = content.replace(regex, `<span class="${highlightClass}">$&</span>`);
        highlightCount += matches.length; // Count all matches found
      }
    });
    
    // Replace text node with highlighted HTML if matches found
    if (hasMatches) {
      const wrapper = textNode.ownerDocument.createElement('span');
      wrapper.innerHTML = content;
      textNode.parentNode.replaceChild(wrapper, textNode);
    }
  });
  
  return highlightCount;
}

// CONCEPT: beforeEach() runs before each test
// This sets up a fresh DOM environment for every test
describe('DOM Bias Highlighting', () => {
  let dom, document, container;
  
  beforeEach(() => {
    // CONCEPT: Set up fresh DOM for each test
    dom = new JSDOM(`
      <!DOCTYPE html>
      <html>
        <body>
          <div id="test-container"></div>
        </body>
      </html>
    `);
    
    // Make DOM available globally (like in a browser)
    document = dom.window.document;
    global.document = document;
    global.window = dom.window;
    global.Node = dom.window.Node;
    
    // Get our test container
    container = document.getElementById('test-container');
  });
  
  // CONCEPT: afterEach() runs after each test (cleanup)
  afterEach(() => {
    // Clean up global variables
    delete global.document;
    delete global.window;
    delete global.Node;
  });
  
  test('should highlight bias words in simple text', () => {
    // Set up test content
    container.innerHTML = '<p>This is obviously a terrible idea.</p>';
    const paragraph = container.querySelector('p');
    
    const biasWords = ['obviously', 'terrible'];
    const result = highlightBiasInElement(paragraph, biasWords, 'bias-highlight');
    
    // Check that highlights were added
    expect(result).toBe(2); // Should find 2 bias words
    
    // Check that the DOM was modified
    const highlights = container.querySelectorAll('.bias-highlight');
    expect(highlights.length).toBe(2);
    
    // Check that the right words were highlighted
    const highlightedTexts = Array.from(highlights).map(el => el.textContent);
    expect(highlightedTexts).toContain('obviously');
    expect(highlightedTexts).toContain('terrible');
  });
  
  test('should handle multiple paragraphs', () => {
    container.innerHTML = `
      <div>
        <p>This is obviously wrong.</p>
        <p>That is clearly a problem.</p>
        <p>No bias words here.</p>
      </div>
    `;
    
    const div = container.querySelector('div');
    const biasWords = ['obviously', 'clearly'];
    const result = highlightBiasInElement(div, biasWords, 'bias-highlight');
    
    expect(result).toBe(2);
    
    // Check that highlights are in correct paragraphs
    const paragraphs = container.querySelectorAll('p');
    expect(paragraphs[0].querySelector('.bias-highlight')).toBeTruthy();
    expect(paragraphs[1].querySelector('.bias-highlight')).toBeTruthy();
    expect(paragraphs[2].querySelector('.bias-highlight')).toBeFalsy();
  });
  
  test('should be case insensitive', () => {
    container.innerHTML = '<p>OBVIOUSLY this is Obviously wrong.</p>';
    const paragraph = container.querySelector('p');
    
    const result = highlightBiasInElement(paragraph, ['obviously'], 'bias-highlight');
    
    expect(result).toBe(2); // Should find both "OBVIOUSLY" and "Obviously"
    
    const highlights = container.querySelectorAll('.bias-highlight');
    expect(highlights.length).toBe(2);
  });
  
  test('should only match whole words', () => {
    container.innerHTML = '<p>The probability of this happening is low, but obviously it could.</p>';
    const paragraph = container.querySelector('p');
    
    const result = highlightBiasInElement(paragraph, ['obviously'], 'bias-highlight');
    
    expect(result).toBe(1); // Should only find "obviously", not the "obvious" in "probability"
    
    const highlights = container.querySelectorAll('.bias-highlight');
    expect(highlights.length).toBe(1);
    expect(highlights[0].textContent).toBe('obviously');
  });
  
  test('should handle empty or invalid input gracefully', () => {
    container.innerHTML = '<p>Some text here.</p>';
    const paragraph = container.querySelector('p');
    
    // Test with null/undefined inputs
    expect(highlightBiasInElement(null, ['test'], 'bias-highlight')).toBe(0);
    expect(highlightBiasInElement(paragraph, null, 'bias-highlight')).toBe(0);
    expect(highlightBiasInElement(paragraph, [], 'bias-highlight')).toBe(0);
    
    // Original paragraph should be unchanged
    expect(container.querySelectorAll('.bias-highlight').length).toBe(0);
  });
  
  test('should work with nested HTML elements', () => {
    container.innerHTML = `
      <article>
        <h1>This is obviously a title</h1>
        <p>The content is <strong>clearly</strong> important.</p>
        <blockquote>Someone said it was <em>definitely</em> true.</blockquote>
      </article>
    `;
    
    const article = container.querySelector('article');
    const biasWords = ['obviously', 'clearly', 'definitely'];
    const result = highlightBiasInElement(article, biasWords, 'bias-highlight');
    
    expect(result).toBe(3);
    
    // Check that highlights are in different elements
    expect(container.querySelector('h1 .bias-highlight')).toBeTruthy();
    expect(container.querySelector('p .bias-highlight')).toBeTruthy();
    expect(container.querySelector('blockquote .bias-highlight')).toBeTruthy();
  });
});

// CONCEPT: Integration test combining our pattern matcher with DOM highlighting
describe('Pattern Matching + DOM Integration', () => {
  let dom, document, container;
  
  beforeEach(() => {
    dom = new JSDOM(`<!DOCTYPE html><html><body><div id="container"></div></body></html>`);
    document = dom.window.document;
    global.document = document;
    global.window = dom.window;
    global.Node = dom.window.Node;
    container = document.getElementById('container');
  });
  
  afterEach(() => {
    delete global.document;
    delete global.window;
    delete global.Node;
  });
  
  test('should integrate pattern matching with DOM highlighting', () => {
    // Use our pattern matcher function from previous test
    function createBiasPatternMatcher(words) {
      if (!Array.isArray(words) || words.length === 0) return null;
      const escapedWords = words.map(word => word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
      const pattern = '\\b(' + escapedWords.join('|') + ')\\b';
      return new RegExp(pattern, 'gi');
    }
    
    // Set up test content
    container.innerHTML = `
      <div class="article">
        <h1>Climate Change Analysis</h1>
        <p>This is obviously a serious issue that clearly affects everyone.</p>
        <p>Scientists definitely agree that the evidence is absolutely conclusive.</p>
        <p>Some neutral text without bias words.</p>
      </div>
    `;
    
    // Real bias words from the extension
    const opinionWords = ['obviously', 'clearly', 'definitely', 'absolutely'];
    const regex = createBiasPatternMatcher(opinionWords);
    
    // Test pattern matching works
    const testText = 'This is obviously wrong and clearly bad.';
    expect(regex.test(testText)).toBe(true);
    
    // Test DOM highlighting works
    const article = container.querySelector('.article');
    const highlightCount = highlightBiasInElement(article, opinionWords, 'opinion-bias');
    
    expect(highlightCount).toBe(4); // obviously, clearly, definitely, absolutely
    
    // Verify specific highlights exist
    const highlights = container.querySelectorAll('.opinion-bias');
    expect(highlights.length).toBe(4);
    
    // Verify no highlights in neutral paragraph
    const paragraphs = container.querySelectorAll('p');
    expect(paragraphs[2].querySelectorAll('.opinion-bias').length).toBe(0);
  });
});
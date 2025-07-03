// utils/DOMProcessor.js - DOM manipulation utilities
export class DOMProcessor {
    constructor() {
        this.highlightClassPrefix = 'bias-highlight-';
        this.processedParents = new Set();
    }

    // Collect all text nodes from a root element
    collectTextNodes(rootNode) {
        const textNodes = [];

        const walker = document.createTreeWalker(
            rootNode,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode: node => {
                    if (this.shouldSkipNode(node)) {
                        return NodeFilter.FILTER_REJECT;
                    }
                    return NodeFilter.FILTER_ACCEPT;
                }
            }
        );

        let node;
        while (node = walker.nextNode()) {
            textNodes.push(node);
        }

        // Process Shadow DOM
        this.processShadowDom(rootNode, textNodes);

        return textNodes;
    }

    shouldSkipNode(node) {
        // Skip empty or very short nodes
        if (node.textContent.trim().length <= 0) {
            return true;
        }

        // Skip nodes already within our highlights
        const parent = node.parentNode;
        if (parent && parent.classList && this.isOwnHighlight(parent)) {
            return true;
        }

        // Skip script, style, and other non-content elements
        if (parent && this.shouldSkipElement(parent)) {
            return true;
        }

        return false;
    }

    shouldSkipElement(element) {
        const skipTags = ['SCRIPT', 'STYLE', 'NOSCRIPT', 'SVG', 'HEAD', 'META', 'LINK'];
        return skipTags.includes(element.nodeName);
    }

    isOwnHighlight(element) {
        if (!element.classList) return false;
        
        for (const className of element.classList) {
            if (className.startsWith(this.highlightClassPrefix)) {
                return true;
            }
        }
        return false;
    }

    // Process Shadow DOM elements
    processShadowDom(rootNode, textNodes) {
        if (rootNode.nodeType !== Node.ELEMENT_NODE) return;

        // Check for shadow root
        if (rootNode.shadowRoot) {
            const shadowTextNodes = this.collectTextNodes(rootNode.shadowRoot);
            textNodes.push(...shadowTextNodes);
        }

        // Process children that might have shadow roots
        const elements = rootNode.querySelectorAll('*');
        elements.forEach(element => {
            if (element.shadowRoot) {
                const shadowTextNodes = this.collectTextNodes(element.shadowRoot);
                textNodes.push(...shadowTextNodes);
            }
        });
    }

    // Create a document fragment with highlighted content
    createHighlightedFragment(text, matches) {
        const fragment = document.createDocumentFragment();
        let lastIndex = 0;

        for (const match of matches) {
            // Add text before this match
            if (match.index > lastIndex) {
                fragment.appendChild(
                    document.createTextNode(text.substring(lastIndex, match.index))
                );
            }

            // Add highlighted match
            const span = document.createElement('span');
            span.className = `${this.highlightClassPrefix}${match.type}`;
            span.textContent = match.text;
            span.title = this.getTooltipText(match.type);
            fragment.appendChild(span);

            lastIndex = match.index + match.length;
        }

        // Add remaining text
        if (lastIndex < text.length) {
            fragment.appendChild(
                document.createTextNode(text.substring(lastIndex))
            );
        }

        return fragment;
    }

    getTooltipText(type) {
        const tooltips = {
            opinion: 'Opinion word - subjective language',
            tobe: 'To-be verb (E-Prime violation)',
            absolute: 'Absolute statement',
            passive: 'Passive voice construction',
            weasel: 'Weasel word - vague attribution',
            presupposition: 'Presupposition marker',
            metaphor: 'War metaphor',
            minimizer: 'Minimizing language',
            maximizer: 'Exaggeration/hyperbole',
            falsebalance: 'False balance indicator',
            euphemism: 'Euphemism/dysphemism',
            emotional: 'Emotional manipulation',
            gaslighting: 'Gaslighting phrase',
            falsedilemma: 'False dilemma'
        };
        return tooltips[type] || 'Bias indicator';
    }

    // Remove all bias highlights
    removeAllHighlights() {
        const selector = Object.keys(this.getHighlightSelectors()).join(', ');
        const highlights = document.querySelectorAll(selector);
        
        this.processedParents.clear();

        highlights.forEach(highlight => {
            const parent = highlight.parentNode;
            const textNode = document.createTextNode(highlight.textContent);
            parent.replaceChild(textNode, highlight);
            this.processedParents.add(parent);
        });

        // Normalize all affected parent nodes
        this.processedParents.forEach(parent => {
            if (parent && parent.normalize) {
                parent.normalize();
            }
        });

        this.processedParents.clear();
    }

    // Remove specific type of highlights
    removeSpecificHighlights(type) {
        const selector = `.${this.highlightClassPrefix}${type}`;
        const highlights = document.querySelectorAll(selector);
        
        this.processedParents.clear();

        highlights.forEach(highlight => {
            const parent = highlight.parentNode;
            const textNode = document.createTextNode(highlight.textContent);
            parent.replaceChild(textNode, highlight);
            this.processedParents.add(parent);
        });

        // Normalize affected parent nodes
        this.processedParents.forEach(parent => {
            if (parent && parent.normalize) {
                parent.normalize();
            }
        });

        this.processedParents.clear();
    }

    getHighlightSelectors() {
        return {
            opinion: `.${this.highlightClassPrefix}opinion`,
            tobe: `.${this.highlightClassPrefix}tobe`,
            absolute: `.${this.highlightClassPrefix}absolute`,
            passive: `.${this.highlightClassPrefix}passive`,
            weasel: `.${this.highlightClassPrefix}weasel`,
            presupposition: `.${this.highlightClassPrefix}presupposition`,
            metaphor: `.${this.highlightClassPrefix}metaphor`,
            minimizer: `.${this.highlightClassPrefix}minimizer`,
            maximizer: `.${this.highlightClassPrefix}maximizer`,
            falsebalance: `.${this.highlightClassPrefix}falsebalance`,
            euphemism: `.${this.highlightClassPrefix}euphemism`,
            emotional: `.${this.highlightClassPrefix}emotional`,
            gaslighting: `.${this.highlightClassPrefix}gaslighting`,
            falsedilemma: `.${this.highlightClassPrefix}falsedilemma`
        };
    }

    // Check if content change is significant enough to reprocess
    isSignificantContent(node) {
        if (node.nodeType === Node.ELEMENT_NODE) {
            const text = node.textContent || '';
            return text.trim().length > 20;
        } else if (node.nodeType === Node.TEXT_NODE) {
            const text = node.textContent || '';
            return text.trim().length > 20;
        }
        return false;
    }

    // Extract changed text nodes from mutations
    extractChangedTextNodes(mutations) {
        const changedNodes = [];
        
        mutations.forEach(mutation => {
            if (this.isOwnHighlight(mutation.target)) {
                return; // Skip our own changes
            }

            Array.from(mutation.addedNodes).forEach(node => {
                if (node.nodeType === Node.TEXT_NODE && 
                    node.textContent.trim().length > 5) {
                    changedNodes.push(node);
                } else if (node.nodeType === Node.ELEMENT_NODE) {
                    const textNodes = this.collectTextNodes(node);
                    changedNodes.push(...textNodes);
                }
            });
        });

        return changedNodes;
    }

    // Count current highlights for stats
    countHighlights() {
        const counts = {};
        const selectors = this.getHighlightSelectors();
        
        for (const [type, selector] of Object.entries(selectors)) {
            counts[type] = document.querySelectorAll(selector).length;
        }
        
        return counts;
    }
}

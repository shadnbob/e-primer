// utils/DOMProcessor.js - DOM manipulation utilities
import { HoverContentGenerator } from './HoverContentGenerator.js';
import { getPopupManager } from './PopupManager.js';

export class DOMProcessor {
    constructor() {
        this.highlightClassPrefix = 'bias-highlight-';
        this.excellenceClassPrefix = 'excellence-';
        this.processedParents = new Set();
        this.hoverGenerator = new HoverContentGenerator();
        
        // Initialize popup manager on first use
        this.popupManager = null;
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
        
        // Skip if it's a known tag to skip
        if (skipTags.includes(element.nodeName)) {
            return true;
        }
        
        // Skip our popup elements by class
        if (element.classList) {
            if (element.classList.contains('bias-popup') || 
                element.classList.contains('popup-content') ||
                element.classList.contains('popup-close')) {
                return true;
            }
        }
        
        // Skip elements marked with our data attributes
        if (element.hasAttribute && (
            element.hasAttribute('data-e-prime-popup') ||
            element.hasAttribute('data-skip-analysis')
        )) {
            return true;
        }
        
        // Skip if element is inside a popup
        const popupParent = element.closest('.bias-popup, [data-e-prime-popup]');
        if (popupParent) {
            return true;
        }
        
        return false;
    }

    isOwnHighlight(element) {
        if (!element.classList) return false;
        
        for (const className of element.classList) {
            if (className.startsWith(this.highlightClassPrefix) || 
                className.startsWith(this.excellenceClassPrefix)) {
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
            
            // Use appropriate class prefix based on match type
            if (match.isExcellence) {
                span.className = match.className || `${this.excellenceClassPrefix}${match.type}`;
            } else {
                // For opinion sub-categories, use the base 'opinion' class for styling
                const cssType = match.type.startsWith('opinion_') ? 'opinion' : match.type;
                span.className = `${this.highlightClassPrefix}${cssType}`;
            }
            
            // Add intensity class if applicable
            if (match.intensity) {
                span.classList.add(`bias-intensity-${match.intensity}`);
            }
            
            span.textContent = match.text;
            
            // Add data attributes for popup content instead of event listeners
            this.addDataAttributes(span, match);
            
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
            opinion: 'Opinion - Subjective - General',
            
            // Opinion Sub-Categories
            opinion_certainty: 'Possible Opinion - Certainty/Conviction',
            opinion_hedging: 'Possible Opinion - Hedging/Uncertainty',
            opinion_evaluative_positive: 'Possible Opinion - Positive Evaluation',
            opinion_evaluative_negative: 'Possible Opinion - Negative Evaluation',
            opinion_emotional_charge: 'Possible Opinion - Emotional Charge',
            opinion_comparative: 'Possible Opinion - Comparative/Superlative',
            opinion_political_framing: 'Possible Opinion - Political Framing',
            opinion_intensifiers: 'Possible Opinion - Intensifiers',
            opinion_credibility_undermining: 'Possible Opinion - Credibility Undermining',
            opinion_loaded_political: 'Possible Opinion - Loaded Political Terms',
            opinion_moral_judgments: 'Possible Opinion - Moral/Ethical Judgments',
            opinion_emotional_appeals: 'Possible Opinion - Emotional Appeals',
            
            // Other types
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
            falsedilemma: 'False dilemma',
            probability: 'Probability language'
        };
        return tooltips[type] || 'Bias indicator';
    }
    
    getExcellenceTooltipText(type) {
        const tooltips = {
            attribution: '✓ Specific, verifiable source provided',
            nuance: '✓ Acknowledges complexity and avoids absolutes',
            transparency: '✓ Transparent about limitations and perspective',
            discourse: '✓ Encourages dialogue and acknowledges others',
            evidence: '✓ Claims supported by specific evidence'
        };
        return tooltips[type] || 'Excellence indicator';
    }

    // Create a hover card element for enhanced tooltips
    createHoverCard(match, allMatches = []) {
        try {
            // Find nearby matches for context
            const nearbyMatches = this.findNearbyMatches(match, allMatches);
            
            // Generate the hover content
            const hoverHTML = this.hoverGenerator.generateHoverContent(match, nearbyMatches);
            
            // Create a container div and set its innerHTML
            const container = document.createElement('div');
            container.innerHTML = hoverHTML;
            
            // Return the first child (the hover card)
            return container.firstChild;
        } catch (error) {
            console.warn('Error creating hover card:', error);
            return null;
        }
    }

    // Find matches that are near the current match for context
    findNearbyMatches(currentMatch, allMatches) {
        const NEARBY_DISTANCE = 100; // characters
        const nearby = [];
        
        for (const match of allMatches) {
            if (match === currentMatch) continue;
            
            const distance = Math.abs(match.index - currentMatch.index);
            if (distance <= NEARBY_DISTANCE) {
                nearby.push(match);
            }
        }
        
        return nearby;
    }

    // Add data attributes for popup content (replaces individual event listeners)
    addDataAttributes(spanElement, match) {
        // Ensure popup manager is initialized
        if (!this.popupManager) {
            this.popupManager = getPopupManager();
        }
        
        // Store match data in data attributes for popup manager to use
        // Store contextual data
        if (match.isContextual) {
            spanElement.setAttribute('data-contextual', 'true');
            if (match.contextReasoning) {
                spanElement.setAttribute('data-context-reasoning', match.contextReasoning);
            }
            if (match.confidence) {
                spanElement.setAttribute('data-confidence', match.confidence.toString());
            }
            if (match.context) {
                spanElement.setAttribute('data-context', match.context);
            }
        }
        
        // Store subcategory data
        if (match.subCategory) {
            spanElement.setAttribute('data-sub-category', JSON.stringify(match.subCategory));
        }
        
        // Store portrayal data
        if (match.portrayal) {
            spanElement.setAttribute('data-portrayal', JSON.stringify(match.portrayal));
        }
        
        // Generate basic tooltip for quick reference
        let tooltipText;
        if (match.isContextual && match.contextReasoning) {
            const prefix = match.isExcellence ? '✓' : '⚠️';
            const confidenceText = match.confidence ? ` (${(match.confidence * 100).toFixed(0)}% confidence)` : '';
            tooltipText = `${prefix} ${match.contextReasoning}${confidenceText}`;
        } else if (match.isExcellence) {
            tooltipText = match.tooltip || this.getExcellenceTooltipText(match.type);
        } else {
            if (match.subCategory && match.type.startsWith('opinion_')) {
                tooltipText = this.getTooltipText(match.type);
            } else if (match.type === 'opinion' && match.subCategory) {
                tooltipText = this.getTooltipText(`opinion_${match.subCategory.id}`);
            } else {
                tooltipText = this.getTooltipText(match.type);
            }
        }
        
        // Don't use 'title' attribute as it creates native browser tooltips
        // Store tooltip text as data attribute instead
        spanElement.setAttribute('data-tooltip-text', tooltipText);
    }

    // Legacy method - now handled by PopupManager
    // Keeping for backward compatibility but it's no longer used
    showContextMenu(event, match) {
        console.warn('showContextMenu is deprecated - popup handling now managed by PopupManager');
    }

    // Remove all bias highlights
    removeAllHighlights() {
        const selector = Object.keys(this.getHighlightSelectors()).join(', ');
        const highlights = document.querySelectorAll(selector);
        
        this.processedParents.clear();

        highlights.forEach(highlight => {
            // Clean up hover cards and event listeners
            this.cleanupHoverElements(highlight);
            
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

    // Clean up data attributes (event listeners are handled by PopupManager)
    cleanupHoverElements(element) {
        // Remove data attributes (with defensive check)
        if (element && element.removeAttribute) {
            element.removeAttribute('title');
            element.removeAttribute('data-tooltip');
            element.removeAttribute('data-tooltip-text');
            element.removeAttribute('data-contextual');
            element.removeAttribute('data-context-reasoning');
            element.removeAttribute('data-confidence');
            element.removeAttribute('data-context');
            element.removeAttribute('data-sub-category');
            element.removeAttribute('data-portrayal');
        }
        
        // Event listeners are now handled by PopupManager's delegation system
        // No individual cleanup needed
    }

    // Remove specific excellence type highlights
    removeExcellenceHighlights(type) {
        const selector = `.${this.excellenceClassPrefix}${type}`;
        const highlights = document.querySelectorAll(selector);
        
        this.processedParents.clear();

        highlights.forEach(highlight => {
            this.cleanupHoverElements(highlight);
            
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

    // Remove specific type of highlights
    removeSpecificHighlights(type) {
        const selector = `.${this.highlightClassPrefix}${type}`;
        const highlights = document.querySelectorAll(selector);
        
        this.processedParents.clear();

        highlights.forEach(highlight => {
            // Clean up hover cards and event listeners
            this.cleanupHoverElements(highlight);
            
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
            // Bias selectors
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
            falsedilemma: `.${this.highlightClassPrefix}falsedilemma`,
            // Excellence selectors
            attribution: `.${this.excellenceClassPrefix}attribution`,
            nuance: `.${this.excellenceClassPrefix}nuance`,
            transparency: `.${this.excellenceClassPrefix}transparency`,
            discourse: `.${this.excellenceClassPrefix}discourse`,
            evidence: `.${this.excellenceClassPrefix}evidence`
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

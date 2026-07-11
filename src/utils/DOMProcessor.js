// utils/DOMProcessor.js - DOM manipulation utilities
import { BiasConfig } from '../config/BiasConfig.js';
import { HoverContentGenerator } from './HoverContentGenerator.js';
import { getPopupManager } from './PopupManager.js';

export class DOMProcessor {
    constructor() {
        this.highlightClassPrefix = 'bias-highlight-';
        this.excellenceClassPrefix = 'excellence-';
        this.customClassPrefix = 'bias-highlight-custom-';
        this.processedParents = new Set();
        this.hoverGenerator = new HoverContentGenerator();
        
        // Initialize popup manager on first use
        this.popupManager = null;
    }

    // Collect all text nodes from a root element in a single pass. The walker
    // visits elements too, so skipped subtrees (scripts, popups, our own
    // highlights) are pruned wholesale, and shadow roots are entered as they
    // are encountered — no separate querySelectorAll('*') sweep afterwards.
    collectTextNodes(rootNode) {
        const textNodes = [];
        this._collectTextNodesInto(rootNode, textNodes);
        return textNodes;
    }

    _collectTextNodesInto(rootNode, textNodes) {
        const walker = document.createTreeWalker(
            rootNode,
            NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT,
            {
                acceptNode: node => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        if (this.shouldSkipElement(node) || this.isOwnHighlight(node)) {
                            return NodeFilter.FILTER_REJECT; // prune the whole subtree
                        }
                        if (node.shadowRoot) {
                            this._collectTextNodesInto(node.shadowRoot, textNodes);
                        }
                        return NodeFilter.FILTER_SKIP; // traverse children, don't emit
                    }
                    return this.shouldSkipNode(node)
                        ? NodeFilter.FILTER_REJECT
                        : NodeFilter.FILTER_ACCEPT;
                }
            }
        );

        let node;
        while (node = walker.nextNode()) {
            textNodes.push(node);
        }

        // TreeWalker filters never see the root node itself
        if (rootNode.nodeType === Node.ELEMENT_NODE && rootNode.shadowRoot) {
            this._collectTextNodesInto(rootNode.shadowRoot, textNodes);
        }
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

        // Skip nodes inside elements marked with data-skip-analysis
        if (parent && parent.closest && parent.closest('[data-skip-analysis]')) {
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
                className.startsWith(this.excellenceClassPrefix) ||
                className.startsWith(this.customClassPrefix)) {
                return true;
            }
        }
        return false;
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
            } else if (match.isCustom && match.customGroup) {
                span.className = match.customGroup.className;
            } else {
                const cssType = match.parentType || match.type;
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
        const { parentId, subCategoryId } = BiasConfig.resolveType(type);
        if (subCategoryId) {
            const parentConfig = BiasConfig.getBiasTypeConfig(parentId);
            const subConfig = parentConfig && parentConfig.subCategories ? parentConfig.subCategories[subCategoryId] : null;
            if (subConfig) {
                return `Possible ${parentConfig.name} - ${subConfig.name}`;
            }
        }
        const directConfig = BiasConfig.getBiasTypeConfig(type);
        if (directConfig) return directConfig.tooltip;
        return 'Bias indicator';
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
        } else if (match.isCustom && match.customGroup) {
            tooltipText = `Custom: ${match.customGroup.name}`;
            spanElement.setAttribute('data-custom-group', match.customGroup.id);
            // Persist the group payload so PopupManager can rebuild the custom
            // hover card from the DOM alone (it has no CustomDictionaryManager)
            spanElement.setAttribute('data-custom-group-data', JSON.stringify({
                id: match.customGroup.id,
                name: match.customGroup.name,
                color: match.customGroup.color,
                hoverContent: match.customGroup.hoverContent
            }));
        } else if (match.isExcellence) {
            tooltipText = match.tooltip || this.getExcellenceTooltipText(match.type);
        } else {
            tooltipText = this.getTooltipText(match.type);
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

    // Remove all bias highlights (built-in, excellence, and custom groups)
    removeAllHighlights() {
        const selector = Object.values(this.getHighlightSelectors()).join(', ');
        this.removeHighlightsBySelector(selector);
    }

    // Shared unwrap logic: replace matching highlight spans with plain text
    removeHighlightsBySelector(selector) {
        const highlights = document.querySelectorAll(selector);

        this.processedParents.clear();

        highlights.forEach(highlight => {
            // Clean up hover cards and event listeners
            this.cleanupHoverElements(highlight);

            const parent = highlight.parentNode;
            if (!parent) return;
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
            element.removeAttribute('data-custom-group');
            element.removeAttribute('data-custom-group-data');
        }
        
        // Event listeners are now handled by PopupManager's delegation system
        // No individual cleanup needed
    }

    // Remove specific excellence type highlights
    removeExcellenceHighlights(type) {
        this.removeHighlightsBySelector(`.${this.excellenceClassPrefix}${type}`);
    }

    // Remove specific type of highlights
    removeSpecificHighlights(type) {
        this.removeHighlightsBySelector(`.${this.highlightClassPrefix}${type}`);
    }

    // Remove highlights of one custom group (className comes from the group config)
    removeCustomHighlights(className) {
        this.removeHighlightsBySelector(`.${className}`);
    }

    // Built from BiasConfig so new bias/excellence types are covered automatically.
    // Custom-group spans always have their class attribute starting with the
    // custom prefix (className is assigned before any intensity class is added),
    // so a single attribute selector covers every group.
    getHighlightSelectors() {
        const selectors = {};

        for (const config of Object.values(BiasConfig.BIAS_TYPES)) {
            selectors[config.id] = `.${this.highlightClassPrefix}${config.id}`;
        }

        for (const config of Object.values(BiasConfig.EXCELLENCE_TYPES)) {
            selectors[config.id] = `.${this.excellenceClassPrefix}${config.id}`;
        }

        selectors.custom = `span[class^="${this.customClassPrefix}"]`;

        return selectors;
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

            // In-place text edits (SPAs updating textContent/data bindings)
            if (mutation.type === 'characterData') {
                const node = mutation.target;
                const parent = node.parentNode;
                if (node.nodeType === Node.TEXT_NODE &&
                    parent &&
                    !this.isOwnHighlight(parent) &&
                    !this.shouldSkipElement(parent) &&
                    node.textContent.trim().length > 5) {
                    changedNodes.push(node);
                }
                return;
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

        // A node can appear in several mutation records within one batch
        return Array.from(new Set(changedNodes));
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

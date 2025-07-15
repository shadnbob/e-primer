// utils/DOMProcessor.js - DOM manipulation utilities
import { HoverContentGenerator } from './HoverContentGenerator.js';

export class DOMProcessor {
    constructor() {
        this.highlightClassPrefix = 'bias-highlight-';
        this.excellenceClassPrefix = 'excellence-';
        this.processedParents = new Set();
        this.hoverGenerator = new HoverContentGenerator();
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
                span.className = `${this.highlightClassPrefix}${match.type}`;
            }
            
            // Add intensity class if applicable
            if (match.intensity) {
                span.classList.add(`bias-intensity-${match.intensity}`);
            }
            
            span.textContent = match.text;
            
            // Add simple tooltip and right-click functionality
            this.addSimpleTooltip(span, match);
            
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

    // Add simple tooltip and right-click functionality
    addSimpleTooltip(spanElement, match) {
        // Add tooltip data attribute
        const tooltipText = match.isExcellence ? 
            this.getExcellenceTooltipText(match.type) :
            this.getTooltipText(match.type);
        
        spanElement.setAttribute('data-tooltip', tooltipText);
        
        // Add right-click context menu
        spanElement.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            this.showContextMenu(e, match);
        });
    }

    // Show context menu on right-click
    showContextMenu(event, match) {
        // Remove any existing context menus
        const existingMenus = document.querySelectorAll('.context-menu');
        existingMenus.forEach(menu => menu.remove());
        
        // Create context menu
        const menu = document.createElement('div');
        menu.className = `context-menu ${match.isExcellence ? 'excellence' : 'problem'}`;
        
        // Get detailed content from HoverContentGenerator
        const descriptions = match.isExcellence ? 
            this.hoverGenerator.excellenceDescriptions : 
            this.hoverGenerator.enhancedDescriptions;
        
        const desc = descriptions[match.type];
        const intensity = match.intensity || 2;
        const intensityLabel = ['Mild', 'Moderate', 'Severe'][intensity - 1];
        
        menu.innerHTML = `
            <div class="context-menu-header ${match.isExcellence ? 'excellence' : 'problem'}">
                <span>
                    ${match.isExcellence ? '✓' : '⚠'} ${this.hoverGenerator.getTypeName(match.type, match.isExcellence)}
                    ${!match.isExcellence ? `<span class="intensity-badge intensity-${intensity}">${intensityLabel}</span>` : ''}
                </span>
                <button class="context-menu-close">×</button>
            </div>
            <div class="context-menu-text">"${match.text}"</div>
            <div class="context-menu-description">${desc ? desc.description : 'Language pattern detected.'}</div>
            ${desc && desc.suggestion ? `<div class="context-menu-suggestion">💡 ${desc.suggestion}</div>` : ''}
            ${desc && desc.examples ? `<div class="context-menu-examples"><strong>Examples:</strong> ${desc.examples}</div>` : ''}
        `;
        
        // Position menu (use clientX/clientY for viewport-relative positioning)
        menu.style.left = event.clientX + 'px';
        menu.style.top = event.clientY + 'px';
        menu.style.display = 'block';
        
        // Add to document
        document.body.appendChild(menu);
        
        // Close menu on click outside or close button
        const closeMenu = () => menu.remove();
        
        menu.querySelector('.context-menu-close').addEventListener('click', closeMenu);
        
        // Close on click outside
        setTimeout(() => {
            document.addEventListener('click', function closeOnOutside(e) {
                if (!menu.contains(e.target)) {
                    closeMenu();
                    document.removeEventListener('click', closeOnOutside);
                }
            });
        }, 10);
        
        // Close on escape key
        document.addEventListener('keydown', function closeOnEscape(e) {
            if (e.key === 'Escape') {
                closeMenu();
                document.removeEventListener('keydown', closeOnEscape);
            }
        });
        
        // Adjust position if menu goes off-screen
        setTimeout(() => {
            const rect = menu.getBoundingClientRect();
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            
            if (rect.right > viewportWidth) {
                menu.style.left = (event.clientX - rect.width) + 'px';
            }
            
            if (rect.bottom > viewportHeight) {
                menu.style.top = (event.clientY - rect.height) + 'px';
            }
        }, 10);
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

    // Clean up hover-related elements and event listeners
    cleanupHoverElements(element) {
        // Remove tooltip attribute
        element.removeAttribute('data-tooltip');
        
        // Remove context menu event listeners (they're handled automatically when element is removed)
        // No complex cleanup needed with simple tooltip system
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

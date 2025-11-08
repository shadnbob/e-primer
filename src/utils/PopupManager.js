// utils/PopupManager.js - Singleton popup manager for efficient tooltip/context menu handling
import { HoverContentGenerator } from './HoverContentGenerator.js';

export class PopupManager {
    constructor() {
        this.popup = null;
        this.isVisible = false;
        this.hoverGenerator = new HoverContentGenerator();
        this.currentTarget = null;
        this.hideTimeout = null;
        
        this.init();
    }
    
    init() {
        this.createPopupElement();
        this.setupEventDelegation();
    }
    
    createPopupElement() {
        // Create the singleton popup element
        this.popup = document.createElement('div');
        this.popup.className = 'bias-popup';
        
        // Add data attributes to exclude from analysis
        this.popup.setAttribute('data-e-prime-popup', 'true');
        this.popup.setAttribute('data-skip-analysis', 'true');
        this.popup.style.cssText = `
            position: fixed;
            background: white;
            border-radius: 8px;
            padding: 16px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.25);
            max-width: 400px;
            z-index: 10000;
            font-size: 14px;
            line-height: 1.5;
            display: none;
            pointer-events: auto;
        `;
        
        // Add close button
        const closeBtn = document.createElement('button');
        closeBtn.className = 'popup-close';
        closeBtn.innerHTML = '×';
        closeBtn.style.cssText = `
            position: absolute;
            top: 8px;
            right: 8px;
            background: none;
            border: none;
            font-size: 18px;
            cursor: pointer;
            padding: 0;
            color: #666;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        closeBtn.addEventListener('click', () => this.hide());
        this.popup.appendChild(closeBtn);
        
        // Add content container
        this.contentContainer = document.createElement('div');
        this.contentContainer.className = 'popup-content';
        this.contentContainer.setAttribute('data-e-prime-popup', 'true');
        this.contentContainer.setAttribute('data-skip-analysis', 'true');
        this.popup.appendChild(this.contentContainer);
        
        document.body.appendChild(this.popup);
    }
    
    setupEventDelegation() {
        // Single delegated event listener for all bias highlights
        document.addEventListener('click', (e) => {
            const target = e.target.closest('[class*="bias-highlight-"], [class*="excellence-"]');
            if (target) {
                e.preventDefault();
                e.stopPropagation();
                this.show(target, e);
            } else if (this.isVisible && !this.popup.contains(e.target)) {
                // Click outside popup - hide it
                this.hide();
            }
        }, true); // Use capture phase to ensure we get the event first
        
        // Handle right-click to remove highlights
        document.addEventListener('contextmenu', (e) => {
            const target = e.target.closest('[class*="bias-highlight-"], [class*="excellence-"]');
            if (target) {
                e.preventDefault();
                this.removeHighlight(target);
            }
        });
        
        // Handle escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isVisible) {
                this.hide();
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', () => {
            if (this.isVisible && this.currentTarget) {
                this.updatePosition(this.lastEvent);
            }
        });
    }
    
    show(element, event) {
        this.currentTarget = element;
        this.lastEvent = event;
        
        // Clear any pending hide timeout
        if (this.hideTimeout) {
            clearTimeout(this.hideTimeout);
            this.hideTimeout = null;
        }
        
        // Extract data from element
        const matchData = this.extractMatchData(element);
        if (!matchData) return;
        
        // Update popup styling based on type
        this.updatePopupStyling(matchData);
        
        // Generate and set content
        const content = this.hoverGenerator.generateHoverContent(matchData);
        
        // Extract just the inner content from the hover card
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = content;
        const hoverCard = tempDiv.querySelector('.hover-card');
        
        if (hoverCard) {
            // Copy the hover card's inner content, excluding the wrapper
            this.contentContainer.innerHTML = hoverCard.innerHTML;
        } else {
            // Fallback if structure is different
            this.contentContainer.innerHTML = content;
        }
        
        // Add remove highlight button
        this.addRemoveHighlightButton();
        
        // Position and show immediately
        this.updatePosition(event);
        this.popup.style.display = 'block';
        this.popup.style.opacity = '1';
        this.popup.style.visibility = 'visible';
        this.isVisible = true;
        
        // Ensure popup is above all other elements
        this.popup.style.zIndex = '999999';
        
        // Add small delay to ensure proper positioning
        setTimeout(() => {
            this.adjustPositionIfNeeded();
        }, 10);
    }
    
    hide() {
        this.popup.style.display = 'none';
        this.isVisible = false;
        this.currentTarget = null;
        this.lastEvent = null;
    }
    
    extractMatchData(element) {
        // Extract match data from data attributes and class names
        const classList = Array.from(element.classList);
        
        // Find the bias or excellence type
        let type = null;
        let isExcellence = false;
        
        for (const className of classList) {
            if (className.startsWith('bias-highlight-')) {
                type = className.replace('bias-highlight-', '');
                break;
            } else if (className.startsWith('excellence-')) {
                type = className.replace('excellence-', '');
                isExcellence = true;
                break;
            }
        }
        
        if (!type) return null;
        
        // Extract intensity
        let intensity = 2; // default
        const intensityClass = classList.find(c => c.startsWith('bias-intensity-'));
        if (intensityClass) {
            intensity = parseInt(intensityClass.replace('bias-intensity-', ''));
        }
        
        // Build match object
        const matchData = {
            text: element.textContent,
            type: type,
            isExcellence: isExcellence,
            intensity: intensity,
            // Extract data attributes if they exist
            isContextual: element.dataset.contextual === 'true',
            contextReasoning: element.dataset.contextReasoning,
            confidence: element.dataset.confidence ? parseFloat(element.dataset.confidence) : null,
            context: element.dataset.context,
            subCategory: element.dataset.subCategory ? JSON.parse(element.dataset.subCategory) : null,
            portrayal: element.dataset.portrayal ? JSON.parse(element.dataset.portrayal) : null
        };
        
        return matchData;
    }
    
    updatePopupStyling(matchData) {
        // Reset classes
        this.popup.className = 'bias-popup';
        
        if (matchData.isExcellence) {
            this.popup.classList.add('excellence');
            this.popup.style.borderColor = '#28a745';
            this.popup.style.backgroundColor = 'white';
        } else {
            this.popup.classList.add('problem');
            this.popup.style.borderColor = '#dc3545';
            this.popup.style.backgroundColor = 'white';
        }
        
        // Add intensity styling for problems
        if (!matchData.isExcellence && matchData.intensity) {
            this.popup.classList.add(`intensity-${matchData.intensity}`);
        }
        
        // Ensure popup is visible and has proper styling
        this.popup.style.opacity = '1';
        this.popup.style.visibility = 'visible';
    }
    
    updatePosition(event) {
        const x = event.clientX;
        const y = event.clientY;
        
        // Initial positioning
        this.popup.style.left = x + 'px';
        this.popup.style.top = y + 'px';
    }
    
    adjustPositionIfNeeded() {
        if (!this.isVisible) return;
        
        const rect = this.popup.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        let newX = parseInt(this.popup.style.left);
        let newY = parseInt(this.popup.style.top);
        
        // Adjust horizontal position if popup goes off-screen
        if (rect.right > viewportWidth) {
            newX = viewportWidth - rect.width - 10;
        }
        if (newX < 10) {
            newX = 10;
        }
        
        // Adjust vertical position if popup goes off-screen
        if (rect.bottom > viewportHeight) {
            newY = viewportHeight - rect.height - 10;
        }
        if (newY < 10) {
            newY = 10;
        }
        
        this.popup.style.left = newX + 'px';
        this.popup.style.top = newY + 'px';
    }
    
    addRemoveHighlightButton() {
        // Check if button already exists
        if (this.contentContainer.querySelector('.remove-highlight-btn')) {
            return;
        }
        
        // Create remove highlight button
        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-highlight-btn';
        removeBtn.textContent = 'Remove Highlight';
        removeBtn.style.cssText = `
            display: block;
            width: 100%;
            margin-top: 12px;
            padding: 8px 12px;
            background: #dc3545;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 13px;
            font-weight: 500;
        `;
        
        // Add hover effect
        removeBtn.addEventListener('mouseenter', () => {
            removeBtn.style.backgroundColor = '#c82333';
        });
        removeBtn.addEventListener('mouseleave', () => {
            removeBtn.style.backgroundColor = '#dc3545';
        });
        
        // Add click handler
        removeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.removeCurrentHighlight();
        });
        
        this.contentContainer.appendChild(removeBtn);
    }
    
    removeCurrentHighlight() {
        if (!this.currentTarget) return;
        this.removeHighlight(this.currentTarget);
        this.hide();
    }
    
    removeHighlight(target) {
        if (!target) return;
        
        // Get the parent node before removing
        const parent = target.parentNode;
        
        // Create a text node with the highlighted text
        const textNode = document.createTextNode(target.textContent);
        
        // Replace the highlighted element with plain text
        parent.replaceChild(textNode, target);
        
        // Normalize the parent to merge adjacent text nodes
        if (parent && parent.normalize) {
            parent.normalize();
        }
    }
    
    // Public methods for external control
    isPopupVisible() {
        return this.isVisible;
    }
    
    getCurrentTarget() {
        return this.currentTarget;
    }
    
    // Cleanup method
    destroy() {
        if (this.popup && this.popup.parentNode) {
            this.popup.parentNode.removeChild(this.popup);
        }
        this.popup = null;
        this.isVisible = false;
        this.currentTarget = null;
        
        // Note: We don't remove event listeners since they're on document
        // and will be cleaned up when the page unloads
    }
}

// Export singleton instance
let popupManagerInstance = null;

export function getPopupManager() {
    if (!popupManagerInstance) {
        popupManagerInstance = new PopupManager();
    }
    return popupManagerInstance;
}

export function destroyPopupManager() {
    if (popupManagerInstance) {
        popupManagerInstance.destroy();
        popupManagerInstance = null;
    }
}
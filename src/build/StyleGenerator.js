// build/StyleGenerator.js - Generate CSS from BiasConfig at build time
const { BiasConfig } = require('../config/BiasConfig.js');

class StyleGenerator {
    constructor() {
        this.biasTypes = BiasConfig.getAllBiasTypes();
        this.excellenceTypes = Object.values(BiasConfig.EXCELLENCE_TYPES);
        this.allTypes = [...this.biasTypes, ...this.excellenceTypes];
    }

    /**
     * Generate CSS for a single bias type
     */
    generateBiasTypeCSS(biasType) {
        const { className, color } = biasType;
        const rgbaColor = this.hexToRgba(color, 0.3);
        
        return `
.${className} {
    background-color: ${rgbaColor};
    border-bottom: 1px solid ${color};
    cursor: help;
    position: relative;
}`;
    }

    /**
     * Generate CSS for a single excellence type
     */
    generateExcellenceTypeCSS(excellenceType) {
        const { className } = excellenceType;
        
        // Excellence types use predefined border styles and colors
        const excellenceStyles = {
            'excellence-attribution': {
                borderColor: '#28a745',
                backgroundColor: 'rgba(40, 167, 69, 0.1)',
                borderStyle: 'solid'
            },
            'excellence-nuance': {
                borderColor: '#218838',
                backgroundColor: 'rgba(33, 136, 56, 0.1)',
                borderStyle: 'dotted'
            },
            'excellence-transparency': {
                borderColor: '#28a745', 
                backgroundColor: 'rgba(40, 167, 69, 0.08)',
                borderStyle: 'dashed'
            },
            'excellence-discourse': {
                borderColor: '#20c997',
                backgroundColor: 'rgba(32, 201, 151, 0.1)',
                borderStyle: 'solid'
            },
            'excellence-evidence': {
                borderColor: '#17a2b8',
                backgroundColor: 'rgba(23, 162, 184, 0.1)',
                borderStyle: 'solid'
            }
        };

        const style = excellenceStyles[className] || excellenceStyles['excellence-attribution'];
        
        return `
.${className} {
    border-bottom: 2px ${style.borderStyle} ${style.borderColor};
    background-color: ${style.backgroundColor};
    position: relative;
    cursor: help;
    transition: all 0.2s ease;
}`;
    }

    /**
     * Generate all bias type CSS rules
     */
    generateAllBiasCSS() {
        const biasRules = this.biasTypes
            .map(type => this.generateBiasTypeCSS(type))
            .join('\n');
            
        const excellenceRules = this.excellenceTypes
            .map(type => this.generateExcellenceTypeCSS(type))
            .join('\n');
            
        return biasRules + '\n' + excellenceRules;
    }

    /**
     * Generate tooltip CSS selectors
     */
    generateTooltipCSS() {
        // Generate selectors for tooltip content
        const tooltipContentSelectors = this.allTypes
            .map(type => `.${type.className}::after`)
            .join(',\n');

        // Generate selectors for tooltip hover
        const tooltipHoverSelectors = this.allTypes
            .map(type => `.${type.className}:hover::after`)
            .join(',\n');

        return `
/* CSS Tooltips - Generated from BiasConfig */
${tooltipContentSelectors} {
    content: attr(data-tooltip);
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    background: #333;
    color: white;
    padding: 6px 8px;
    border-radius: 4px;
    font-size: 12px;
    white-space: nowrap;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.2s ease;
    z-index: 1000;
    margin-bottom: 5px;
}

/* Show tooltip on hover - Generated from BiasConfig */
${tooltipHoverSelectors} {
    opacity: 1;
    visibility: visible;
}`;
    }

    /**
     * Generate complete dynamic CSS
     */
    generateCompleteDynamicCSS() {
        const header = `
/* =================================================
   DYNAMIC CSS - Generated from BiasConfig.js
   Do not edit manually - changes will be overwritten
   ================================================= */
`;

        const biasCSS = this.generateAllBiasCSS();
        const tooltipCSS = this.generateTooltipCSS();
        
        return header + biasCSS + '\n' + tooltipCSS;
    }

    /**
     * Generate static CSS that doesn't change
     */
    generateStaticCSS() {
        return `
/* =================================================
   STATIC CSS - Manual styles that don't change
   ================================================= */

/* Intensity Modifiers for Problems */
.bias-intensity-1 {
    opacity: 0.6;
    border-bottom-style: dotted !important;
    border-bottom-width: 1px !important;
}

.bias-intensity-2 {
    opacity: 0.8;
    border-bottom-style: solid !important;
    border-bottom-width: 2px !important;
}

.bias-intensity-3 {
    opacity: 1;
    border-bottom-style: solid !important;
    border-bottom-width: 3px !important;
    position: relative;
}

/* Warning indicator for severe bias */
.bias-intensity-3::before {
    content: "⚠";
    color: #dc3545;
    font-size: 10px;
    position: absolute;
    top: -8px;
    right: -8px;
    background: white;
    border-radius: 50%;
    width: 14px;
    height: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 1px 3px rgba(0,0,0,0.3);
}

/* Subject Portrayal Indicators */
.portrayal-positive {
    box-shadow: 0 -3px 0 rgba(40, 167, 69, 0.4) inset;
}

.portrayal-negative {
    box-shadow: 0 -3px 0 rgba(220, 53, 69, 0.4) inset;
}

/* Context menu styles */
.context-menu {
    position: fixed;
    background: white;
    border: 2px solid #6c757d;
    border-radius: 8px;
    padding: 16px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.25);
    max-width: 400px;
    z-index: 10000;
    font-size: 14px;
    line-height: 1.5;
    display: none;
}

.context-menu.excellence {
    border-color: #28a745;
}

.context-menu.problem {
    border-color: #dc3545;
}

.context-menu-header {
    font-weight: bold;
    margin-bottom: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.context-menu-header.excellence {
    color: #28a745;
}

.context-menu-header.problem {
    color: #dc3545;
}

.hover-card-subheader {
    font-size: 12px;
    color: #666;
    font-weight: normal;
    margin-top: 4px;
}

.context-menu-text {
    font-style: italic;
    color: #666;
    margin: 8px 0;
    padding: 8px;
    background: #f8f9fa;
    border-radius: 4px;
}

.context-menu-description {
    color: #333;
    margin-bottom: 10px;
}

.context-menu-suggestion {
    color: #28a745;
    font-weight: 500;
    margin-bottom: 8px;
}

.context-menu-examples {
    color: #6c757d;
    font-size: 13px;
}

.context-menu-examples strong {
    color: #333;
}

.context-menu-close {
    background: none;
    border: none;
    font-size: 18px;
    cursor: pointer;
    padding: 0;
    color: #666;
}

.context-menu-close:hover {
    color: #333;
}

/* Intensity badges for context menu */
.intensity-badge {
    font-size: 11px;
    padding: 2px 6px;
    border-radius: 3px;
    text-transform: uppercase;
}

.intensity-1 { background: #ffc107; color: #333; }
.intensity-2 { background: #fd7e14; color: white; }
.intensity-3 { background: #dc3545; color: white; }

/* Mode Indicator */
.analysis-mode-indicator {
    position: fixed;
    top: 10px;
    right: 10px;
    background: white;
    padding: 8px 16px;
    border-radius: 20px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    font-size: 12px;
    z-index: 9999;
    display: flex;
    align-items: center;
    gap: 8px;
}

.mode-indicator-excellence {
    color: #28a745;
    border: 2px solid #28a745;
}

.mode-indicator-problems {
    color: #dc3545;
    border: 2px solid #dc3545;
}

.mode-indicator-balanced {
    background: linear-gradient(to right, rgba(40, 167, 69, 0.1), rgba(220, 53, 69, 0.1));
    border: 2px solid #6c757d;
}

/* Document Health Bar */
.document-health-bar {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: white;
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    min-width: 200px;
    z-index: 9999;
}

.health-score-visual {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 8px;
}

.health-score-number {
    font-size: 32px;
    font-weight: bold;
}

.health-score-bar {
    flex: 1;
    height: 8px;
    background: #e9ecef;
    border-radius: 4px;
    overflow: hidden;
}

.health-score-fill {
    height: 100%;
    transition: width 0.5s ease, background-color 0.5s ease;
}

.health-good { background-color: #28a745; }
.health-medium { background-color: #ffc107; }
.health-poor { background-color: #dc3545; }

/* Animation for newly highlighted text */
@keyframes highlightPulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
}

.newly-highlighted {
    animation: highlightPulse 0.5s ease;
}

/* Enhanced Hover Card Styles for Multi-Section Layout */
.hover-card {
    position: absolute;
    background: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    padding: 16px;
    max-width: 400px;
    font-size: 14px;
    line-height: 1.4;
    z-index: 10000;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.hover-card-problem {
    border-left: 4px solid #dc3545;
}

.hover-card-excellence {
    border-left: 4px solid #28a745;
}

.hover-card-header {
    font-weight: 600;
    font-size: 16px;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.hover-card-text {
    font-style: italic;
    color: #666;
    margin-bottom: 12px;
    padding: 8px;
    background: #f8f9fa;
    border-radius: 4px;
    border-left: 3px solid #007bff;
}

.hover-card-reason {
    color: #333;
    margin-bottom: 16px;
    font-weight: 500;
}

.hover-card-expanded {
    border-top: 1px solid #eee;
    padding-top: 12px;
    overflow-y: auto;
    overflow-x: hidden;
    max-height: 280px;
}

.hover-card-section {
    margin-bottom: 16px;
}

.hover-card-section:last-child {
    margin-bottom: 0;
}

.hover-card-section-title {
    font-weight: 600;
    color: #333;
    margin-bottom: 8px;
    font-size: 14px;
}

.hover-card-section-content {
    color: #555;
    line-height: 1.5;
}

.hover-card-checklist {
    margin: 0;
    padding-left: 20px;
    color: #555;
}

.hover-card-checklist li {
    margin-bottom: 6px;
    line-height: 1.4;
}

.hover-card-examples-problematic {
    background: #fff5f5;
    border: 1px solid #fed7d7;
    border-radius: 4px;
    padding: 8px;
    margin-bottom: 8px;
}

.hover-card-examples-problematic strong {
    color: #c53030;
}

.hover-card-examples-acceptable {
    background: #f0fff4;
    border: 1px solid #9ae6b4;
    border-radius: 4px;
    padding: 8px;
}

.hover-card-examples-acceptable strong {
    color: #22543d;
}

.hover-card-suggestion {
    background: #e8f5e8;
    border: 1px solid #9ae6b4;
    border-radius: 4px;
    padding: 12px;
    margin-bottom: 12px;
    color: #22543d;
}

.hover-card-examples {
    background: #f0f8ff;
    border: 1px solid #bee3f8;
    border-radius: 4px;
    padding: 12px;
    color: #2d3748;
    font-size: 13px;
}

.hover-card-implication {
    background: #e8f4f8;
    border: 1px solid #bee3f8;
    border-radius: 4px;
    padding: 8px;
    margin-bottom: 12px;
}

.hover-card-portrayal {
    font-size: 12px;
    color: #666;
    margin-top: 8px;
    padding-top: 8px;
    border-top: 1px solid #eee;
}

.hover-card-context {
    font-size: 12px;
    color: #666;
    margin-top: 8px;
    padding-top: 8px;
    border-top: 1px solid #eee;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .hover-card {
        max-width: 300px;
        font-size: 13px;
    }
    
    .hover-card-header {
        font-size: 15px;
    }
}

/* =================================================
   EDUCATIONAL POPUP STYLES
   ================================================= */

.educational-popup {
    background: white;
    border: 2px solid #2c3e50;
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
    max-width: 550px;
    max-height: 650px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    overflow: hidden;
    z-index: 10000;
}

/* Header Section */
.educational-popup .popup-header {
    background: linear-gradient(135deg, #3498db 0%, #2c3e50 100%);
    color: white;
    padding: 16px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.educational-popup .popup-title {
    display: flex;
    align-items: center;
    gap: 12px;
    font-weight: 600;
    font-size: 16px;
}

.educational-popup .bias-icon {
    font-size: 18px;
}

.educational-popup .bias-word {
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    background: rgba(255, 255, 255, 0.2);
    padding: 4px 8px;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
}

.educational-popup .popup-close {
    background: rgba(255, 255, 255, 0.2);
    border: none;
    color: white;
    font-size: 18px;
    cursor: pointer;
    width: 32px;
    height: 32px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s ease;
}

.educational-popup .popup-close:hover {
    background: rgba(255, 255, 255, 0.3);
}

/* Tab Navigation */
.educational-popup .tab-buttons {
    display: flex;
    background: #f8f9fa;
    border-bottom: 1px solid #dee2e6;
}

.educational-popup .tab-button {
    background: none;
    border: none;
    padding: 14px 20px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    color: #6c757d;
    border-bottom: 3px solid transparent;
    transition: all 0.3s ease;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
}

.educational-popup .tab-button:hover {
    background: #e9ecef;
    color: #495057;
}

.educational-popup .tab-button.active {
    color: #3498db;
    border-bottom-color: #3498db;
    background: white;
    font-weight: 600;
}

/* Tab Content */
.educational-popup .tab-content {
    position: relative;
}

.educational-popup .tab-panel {
    display: none;
    padding: 24px;
    max-height: 500px;
    overflow-y: auto;
    line-height: 1.6;
}

.educational-popup .tab-panel.active {
    display: block;
}

/* Information Tab Styles */
.educational-information .bias-header {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;
    padding-bottom: 16px;
    border-bottom: 2px solid #f1f3f4;
}

.educational-information .bias-header h3 {
    margin: 0;
    color: #2c3e50;
    font-size: 20px;
    font-weight: 700;
}

.subcategory-badge {
    background: #e3f2fd;
    color: #1976d2;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.severity-badge {
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.severity-badge.severity-high {
    background: #ffebee;
    color: #c62828;
    border: 1px solid #ffcdd2;
}

.severity-badge.severity-medium {
    background: #fff3e0;
    color: #ef6c00;
    border: 1px solid #ffcc02;
}

.severity-badge.severity-low {
    background: #e8f5e8;
    color: #2e7d32;
    border: 1px solid #c8e6c9;
}

.educational-information .explanation-section,
.educational-information .why-problematic-section,
.educational-information .examples-section {
    margin-bottom: 20px;
}

.educational-information h4 {
    color: #2c3e50;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 8px;
}

.educational-information h4::before {
    content: "▶";
    color: #3498db;
    font-size: 12px;
}

.educational-information p {
    color: #555;
    margin: 0;
    line-height: 1.6;
}

.alternatives-list {
    margin: 0;
    padding-left: 0;
    list-style: none;
}

.alternatives-list li {
    background: #f8f9fa;
    padding: 10px 16px;
    margin-bottom: 8px;
    border-radius: 8px;
    border-left: 4px solid #28a745;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-size: 13px;
    color: #2c3e50;
}

/* Learning Tab Styles */
.educational-learning .teaching-moment {
    background: linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%);
    border: 1px solid #ffc107;
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 24px;
}

.educational-learning .teaching-moment h4 {
    color: #856404;
    margin: 0 0 8px 0;
    font-size: 16px;
    font-weight: 600;
}

.educational-learning .teaching-moment p {
    color: #856404;
    margin: 0;
    font-weight: 500;
}

.educational-learning .learning-progression {
    margin-bottom: 24px;
}

.educational-learning .learning-progression h4 {
    color: #2c3e50;
    margin: 0 0 16px 0;
    font-size: 16px;
    font-weight: 600;
}

.educational-learning .tip-level {
    background: #f8f9fa;
    border: 1px solid #dee2e6;
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 12px;
}

.educational-learning .tip-level strong {
    color: #3498db;
    display: block;
    margin-bottom: 6px;
    font-size: 14px;
}

.educational-learning .tip-level p {
    margin: 0;
    color: #555;
    line-height: 1.5;
}

.educational-learning .related-concepts {
    background: #e8f4f8;
    border: 1px solid #bee3f8;
    border-radius: 12px;
    padding: 16px;
}

.educational-learning .related-concepts h4 {
    color: #0c5460;
    margin: 0 0 8px 0;
    font-size: 16px;
    font-weight: 600;
}

.educational-learning .related-concepts p {
    color: #0c5460;
    margin: 0 0 12px 0;
}

.educational-learning .related-concepts ul {
    margin: 0;
    padding-left: 20px;
    color: #0c5460;
}

.educational-learning .related-concepts li {
    margin-bottom: 4px;
    text-transform: capitalize;
}

/* Context Tab Styles */
.educational-context .contextual-guidance {
    background: #f0f8ff;
    border: 1px solid #bee3f8;
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 20px;
}

.educational-context .contextual-guidance h4 {
    color: #0969da;
    margin: 0 0 8px 0;
    font-size: 16px;
    font-weight: 600;
}

.educational-context .contextual-guidance p {
    color: #0969da;
    margin: 0;
    font-weight: 500;
}

.educational-context .context-examples {
    margin-bottom: 20px;
}

.educational-context .context-examples h4 {
    color: #2c3e50;
    margin: 0 0 16px 0;
    font-size: 16px;
    font-weight: 600;
}

.educational-context .context-example {
    margin-bottom: 16px;
}

.educational-context .context-example h5 {
    margin: 0 0 8px 0;
    font-size: 14px;
    font-weight: 600;
}

.example-problematic {
    background: #ffebee;
    border: 1px solid #ffcdd2;
    border-left: 4px solid #f44336;
    padding: 12px 16px;
    border-radius: 8px;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-size: 13px;
    color: #c62828;
    margin: 0;
}

.example-better {
    background: #e8f5e8;
    border: 1px solid #c8e6c9;
    border-left: 4px solid #4caf50;
    padding: 12px 16px;
    border-radius: 8px;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-size: 13px;
    color: #2e7d32;
    margin: 0;
}

.educational-context .confidence-info {
    background: #f8f9fa;
    border: 1px solid #dee2e6;
    border-radius: 12px;
    padding: 16px;
}

.educational-context .confidence-info h4 {
    color: #2c3e50;
    margin: 0 0 12px 0;
    font-size: 16px;
    font-weight: 600;
}

.confidence-bar {
    background: #e9ecef;
    height: 8px;
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 8px;
}

.confidence-fill {
    height: 100%;
    background: linear-gradient(90deg, #28a745, #ffc107, #dc3545);
    border-radius: 4px;
    transition: width 0.3s ease;
}

.educational-context .confidence-info p {
    margin: 0;
    color: #6c757d;
    font-size: 14px;
}

/* Educational popup focus styles */
.educational-popup .tab-button:focus,
.educational-popup .popup-close:focus {
    outline: 2px solid #3498db;
    outline-offset: 2px;
}

/* Educational popup animation */
.educational-popup .tab-panel.active {
    animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}`;
    }

    /**
     * Convert hex color to rgba
     */
    hexToRgba(hex, alpha) {
        // Remove # if present
        hex = hex.replace('#', '');
        
        // Parse hex values
        const r = parseInt(hex.slice(0, 2), 16);
        const g = parseInt(hex.slice(2, 4), 16);
        const b = parseInt(hex.slice(4, 6), 16);
        
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    /**
     * Main method to generate complete stylesheet
     */
    generateCompleteStylesheet() {
        const staticCSS = this.generateStaticCSS();
        const dynamicCSS = this.generateCompleteDynamicCSS();
        
        return staticCSS + '\n\n' + dynamicCSS;
    }
}

module.exports = { StyleGenerator };
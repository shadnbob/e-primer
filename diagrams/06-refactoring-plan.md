# Refactoring Plan for E-Prime Bias Detector

## 🎯 Priority 1: Dynamic UI Generation

### **Current State: Static HTML**
```html
<!-- popup.html - Manual for each bias type -->
<div class="toggle-container">
    <div class="toggle-label">
        <div class="color-indicator" style="background-color: #4169e1;"></div>
        <span>Probability Perception</span>
    </div>
    <label class="toggle">
        <input type="checkbox" id="probabilityToggle">
        <span class="slider"></span>
    </label>
</div>
```

### **Proposed: Dynamic Generation**
```javascript
// popup/PopupGenerator.js (new)
class PopupGenerator {
    static generateBiasTypeToggle(biasType) {
        return `
            <div class="toggle-container" data-bias-type="${biasType.id}">
                <div class="toggle-label">
                    <div class="color-indicator" style="background-color: ${biasType.color};"></div>
                    <span>${biasType.name}</span>
                </div>
                <label class="toggle">
                    <input type="checkbox" id="${biasType.id}Toggle">
                    <span class="slider"></span>
                </label>
            </div>
        `;
    }
    
    static generateCategorySection(category, biasTypes) {
        const togglesHTML = biasTypes.map(type => 
            this.generateBiasTypeToggle(type)
        ).join('');
        
        return `
            <div class="category-section ${category.expanded ? '' : 'collapsed'}">
                <div class="category-header">
                    <span>${category.name}</span>
                    <span class="chevron">▼</span>
                </div>
                <div class="category-body">
                    ${togglesHTML}
                </div>
            </div>
        `;
    }
}
```

## 🎯 Priority 2: Remove Settings Duplication

### **Current State: Manual Sync**
```javascript
// popup.js - Hardcoded fallback (82-105 lines)
const defaults = {
    enableAnalysis: true,
    highlightOpinion: true,
    highlightProbability: false, // Must manually add each new type
    // ... 20+ more settings
};
```

### **Proposed: Single Source of Truth**
```javascript
// popup/SettingsManager.js (refactored)
class SettingsManager {
    async loadSettings() {
        try {
            // Always use BiasConfig as single source
            const { BiasConfig } = await import('../src/config/BiasConfig.js');
            const defaults = BiasConfig.getDefaultSettings();
            
            return new Promise((resolve) => {
                chrome.storage.sync.get(defaults, (items) => {
                    this.currentSettings = BiasConfig.validateSettings(items);
                    resolve(this.currentSettings);
                });
            });
        } catch (error) {
            console.error('Failed to load BiasConfig:', error);
            // Graceful degradation with minimal defaults
            return this.getMinimalDefaults();
        }
    }
    
    getMinimalDefaults() {
        return {
            enableAnalysis: true,
            analysisMode: 'balanced'
        };
    }
}
```

## 🎯 Priority 3: CSS Generation System

### **Current State: Manual CSS**
```css
/* styles.css - Manual entry for each type */
.bias-highlight-probability {
    background-color: rgba(65, 105, 225, 0.3);
    border-bottom: 1px solid royalblue;
    cursor: help;
    position: relative;
}
```

### **Proposed: Generated CSS**
```javascript
// utils/StyleGenerator.js (new)
class StyleGenerator {
    static generateBiasTypeCSS(biasType) {
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
    
    static generateAllBiasCSS() {
        const { BiasConfig } = require('../config/BiasConfig.js');
        const cssRules = [];
        
        Object.values(BiasConfig.BIAS_TYPES).forEach(biasType => {
            cssRules.push(this.generateBiasTypeCSS(biasType));
        });
        
        Object.values(BiasConfig.EXCELLENCE_TYPES).forEach(excellenceType => {
            cssRules.push(this.generateExcellenceTypeCSS(excellenceType));
        });
        
        return cssRules.join('\n\n');
    }
    
    static hexToRgba(hex, alpha) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
}
```

## 🎯 Priority 4: Clean Architecture Separation

### **Proposed Structure**
```
src/
├── config/
│   ├── BiasConfig.js              # Single source of truth
│   └── UIConfig.js                # UI-specific configuration
├── popup/
│   ├── PopupController.js         # Main popup logic
│   ├── PopupGenerator.js          # Dynamic HTML generation
│   ├── SettingsManager.js         # Settings persistence
│   └── StatsDisplay.js            # Statistics display
├── utils/
│   ├── StyleGenerator.js          # CSS generation
│   └── EventHandler.js            # Generic event handling
└── build/
    └── StyleBuilder.js            # Build-time CSS generation
```

## 🎯 Priority 5: Remove HoverContentGenerator Duplication

### **Current Issue**
- BiasConfig contains comprehensive hover information
- HoverContentGenerator has duplicate `enhancedDescriptions`
- Fallback logic adds complexity

### **Proposed Solution**
```javascript
// utils/HoverContentGenerator.js (simplified)
class HoverContentGenerator {
    generateHoverContent(match, nearbyMatches = []) {
        const biasConfig = match.isExcellence ? 
            BiasConfig.EXCELLENCE_TYPES[match.type.toUpperCase()] : 
            BiasConfig.getBiasTypeConfig(match.type);
        
        if (!biasConfig) {
            console.warn(`No configuration found for type: ${match.type}`);
            return this.generateFallbackContent(match);
        }
        
        return this.generateFromConfig(match, biasConfig, nearbyMatches);
    }
    
    // Remove entire enhancedDescriptions object
    // Simplify to single code path using BiasConfig
}
```

## 🎯 Priority 6: Event System Refactor

### **Current State: Manual Event Handling**
```javascript
// popup.js - Manual setup for each toggle
function setupToggleListeners() {
    for (const toggleId of Object.keys(toggleMappings)) {
        const toggle = document.getElementById(toggleId);
        if (toggle) {
            toggle.addEventListener('change', handleToggleChange);
        }
    }
}
```

### **Proposed: Generic Event System**
```javascript
// utils/EventHandler.js (new)
class EventHandler {
    static setupDynamicToggles() {
        const container = document.getElementById('bias-toggles-container');
        
        // Single delegated event listener
        container.addEventListener('change', (event) => {
            if (event.target.matches('input[type="checkbox"][data-bias-type]')) {
                const biasType = event.target.dataset.biasType;
                const enabled = event.target.checked;
                this.handleBiasToggle(biasType, enabled);
            }
        });
    }
    
    static handleBiasToggle(biasType, enabled) {
        const settingKey = BiasConfig.getBiasTypeConfig(biasType)?.settingKey;
        if (settingKey) {
            SettingsManager.updateSetting(settingKey, enabled);
        }
    }
}
```

## 🏆 Benefits of This Refactoring

### **Maintainability**
- ✅ Adding new bias types requires only BiasConfig changes
- ✅ No more manual HTML/CSS/JS updates
- ✅ Single source of truth eliminates sync issues

### **Extensibility**
- ✅ Dynamic UI adapts to configuration changes
- ✅ Build-time generation enables optimizations
- ✅ Consistent patterns across all bias types

### **Performance**
- ✅ Reduced bundle size (no duplicate data)
- ✅ Build-time CSS generation
- ✅ Simplified runtime logic

### **Developer Experience**
- ✅ Clear separation of concerns
- ✅ Reduced cognitive load
- ✅ Self-documenting architecture

## 📋 Implementation Order

1. **Create StyleGenerator** - Generate CSS at build time
2. **Create PopupGenerator** - Dynamic HTML generation
3. **Refactor SettingsManager** - Remove hardcoded defaults
4. **Simplify HoverContentGenerator** - Remove duplication
5. **Implement EventHandler** - Generic event system
6. **Update Build Process** - Integrate generators

This refactoring would make adding your probability detection type as simple as updating BiasConfig.js - everything else would generate automatically!
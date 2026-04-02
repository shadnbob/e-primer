// popup/PopupGenerator.js - Dynamic UI generation from BiasConfig
import { BiasConfig } from '../config/BiasConfig.js';

export class PopupGenerator {
    constructor() {
        this.biasTypes = BiasConfig.getAllBiasTypes();
        this.excellenceTypes = BiasConfig.EXCELLENCE_TYPES;
        this.categories = BiasConfig.CATEGORIES;
    }

    /**
     * Generate a single bias type toggle
     */
    generateBiasTypeToggle(biasType) {
        const colorStyle = this.getColorIndicatorStyle(biasType.color);
        const isEnabled = biasType.enabled ? 'checked' : '';
        const hasSubCats = biasType.subCategories && Object.keys(biasType.subCategories).length > 0;
        
        let html = `
            <div class="toggle-container${hasSubCats ? ' has-subcategories' : ''}" data-bias-type="${biasType.id}">
                <div class="toggle-label">
                    <div class="color-indicator" style="${colorStyle}"></div>
                    <span>${biasType.name}</span>
                    ${hasSubCats ? '<span class="subcat-chevron"></span>' : ''}
                </div>
                <label class="toggle">
                    <input type="checkbox" 
                           id="${biasType.id}Toggle" 
                           data-setting-key="${biasType.settingKey}"
                           data-bias-type="${biasType.id}"
                           ${isEnabled}>
                    <span class="slider"></span>
                </label>
            </div>`;
        
        if (hasSubCats) {
            html += `<div class="subcategory-group collapsed" data-parent="${biasType.id}">`;
            for (const [subId, subConfig] of Object.entries(biasType.subCategories)) {
                const subColorStyle = subConfig.color ? this.getColorIndicatorStyle(subConfig.color) : colorStyle;
                html += `
                    <div class="toggle-container subcategory-toggle" data-sub-type="${subId}" data-parent-type="${biasType.id}">
                        <div class="toggle-label">
                            <div class="color-indicator" style="${subColorStyle}"></div>
                            <span>${subConfig.icon || ''} ${subConfig.name}</span>
                        </div>
                        <label class="toggle toggle-small">
                            <input type="checkbox" 
                                   id="${biasType.id}_${subId}Toggle" 
                                   data-setting-key="${subConfig.settingKey}"
                                   data-parent-type="${biasType.id}"
                                   data-sub-type="${subId}"
                                   ${isEnabled}>
                            <span class="slider"></span>
                        </label>
                    </div>`;
            }
            html += `</div>`;
        }
        
        return html;
    }

    /**
     * Generate a single excellence type toggle
     */
    generateExcellenceTypeToggle(excellenceType) {
        const colorClass = this.getExcellenceColorClass(excellenceType.className);
        const isEnabled = excellenceType.enabled ? 'checked' : '';
        
        return `
            <div class="toggle-container" data-excellence-type="${excellenceType.id}">
                <div class="toggle-label">
                    <div class="color-indicator ${colorClass}"></div>
                    <span>${excellenceType.name}</span>
                </div>
                <label class="toggle">
                    <input type="checkbox" 
                           id="${excellenceType.id}ExcellenceToggle" 
                           data-setting-key="${excellenceType.settingKey}"
                           data-excellence-type="${excellenceType.id}"
                           ${isEnabled}>
                    <span class="slider"></span>
                </label>
            </div>`;
    }

    /**
     * Generate a complete category section
     */
    generateCategorySection(categoryKey) {
        const category = this.categories[categoryKey];
        const biasTypesInCategory = this.biasTypes.filter(type => type.category === categoryKey);
        
        if (biasTypesInCategory.length === 0) {
            return ''; // Skip empty categories
        }

        const togglesHTML = biasTypesInCategory
            .map(type => this.generateBiasTypeToggle(type))
            .join('');

        const collapsedClass = category.expanded ? '' : 'collapsed';
        
        return `
            <div class="category-section ${collapsedClass}" data-category="${categoryKey}">
                <div class="category-header">
                    <span>${category.name}</span>
                    <span class="chevron">▼</span>
                </div>
                <div class="category-body">
                    ${togglesHTML}
                </div>
            </div>`;
    }

    /**
     * Generate the excellence detection section
     */
    generateExcellenceSection() {
        const excellenceToggles = Object.values(this.excellenceTypes)
            .map(type => this.generateExcellenceTypeToggle(type))
            .join('');

        return `
            <div class="category-section" data-category="excellence">
                <div class="category-header">
                    <span>Excellence Detection ✨</span>
                    <span class="chevron">▼</span>
                </div>
                <div class="category-body">
                    ${excellenceToggles}
                </div>
            </div>`;
    }

    /**
     * Generate all bias detection sections
     */
    generateAllBiasSections() {
        const categoryOrder = ['basic', 'advanced', 'framing', 'manipulation'];
        
        return categoryOrder
            .map(categoryKey => this.generateCategorySection(categoryKey))
            .filter(html => html) // Remove empty categories
            .join('');
    }

    /**
     * Generate statistics grid for bias types
     */
    generateBiasStatsGrid() {
        return this.biasTypes
            .map(biasType => `
                <div class="stat-item" data-stat-type="${biasType.id}">
                    <span class="stat-label">${this.getShortLabel(biasType.name)}</span>
                    <span class="stat-value" id="${biasType.statKey}">0</span>
                </div>`)
            .join('');
    }

    /**
     * Generate statistics grid for excellence types
     */
    generateExcellenceStatsGrid() {
        return Object.values(this.excellenceTypes)
            .map(excellenceType => `
                <div class="stat-item excellence" data-stat-type="${excellenceType.id}">
                    <span class="stat-label">${excellenceType.name}</span>
                    <span class="stat-value" id="${excellenceType.statKey}">0</span>
                </div>`)
            .join('');
    }

    /**
     * Get color indicator style for bias types
     */
    getColorIndicatorStyle(color) {
        return `background-color: ${color};`;
    }

    /**
     * Get CSS class for excellence color indicators
     */
    getExcellenceColorClass(className) {
        const colorMap = {
            'excellence-attribution': 'green',
            'excellence-nuance': 'lightgreen', 
            'excellence-transparency': 'green',
            'excellence-discourse': 'turquoise',
            'excellence-evidence': 'info'
        };
        return colorMap[className] || 'green';
    }

    /**
     * Generate short labels for statistics
     */
    getShortLabel(name) {
        const shortLabels = {
            'Opinion Words': 'Opinion',
            'To-Be Verbs (E-Prime)': 'To-be',
            'Absolute Statements': 'Absolute', 
            'Passive Voice': 'Passive',
            'Weasel Words': 'Weasel',
            'Presuppositions': 'Presupp.',
            'War Metaphors': 'Metaphor',
            'Minimizers': 'Minimizer',
            'Maximizers': 'Maximizer',
            'False Balance': 'False Bal.',
            'Euphemisms': 'Euphemism',
            'Emotional Manipulation': 'Emotional',
            'Gaslighting': 'Gaslight',
            'False Dilemmas': 'Dilemma',
            'Probability Perception': 'Probability'
        };
        return shortLabels[name] || name.substring(0, 8);
    }

    /**
     * Get all setting keys for event handler setup
     */
    getAllSettingKeys() {
        const biasSettings = [];
        this.biasTypes.forEach(type => {
            biasSettings.push(type.settingKey);
            if (type.subCategories) {
                for (const sub of Object.values(type.subCategories)) {
                    biasSettings.push(sub.settingKey);
                }
            }
        });
        const excellenceSettings = Object.values(this.excellenceTypes).map(type => type.settingKey);
        return [...biasSettings, ...excellenceSettings];
    }

    /**
     * Get setting key from element
     */
    getSettingKeyFromElement(element) {
        return element.dataset.settingKey;
    }

    /**
     * Get bias type configuration by setting key
     */
    getBiasTypeBySettingKey(settingKey) {
        for (const type of this.biasTypes) {
            if (type.settingKey === settingKey) return type;
            if (type.subCategories) {
                for (const sub of Object.values(type.subCategories)) {
                    if (sub.settingKey === settingKey) return sub;
                }
            }
        }
        return Object.values(this.excellenceTypes).find(type => type.settingKey === settingKey);
    }
}
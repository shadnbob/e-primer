// popup/SettingsManager.js - Dynamic settings management from BiasConfig
import { BiasConfig } from '../config/BiasConfig.js';

export class SettingsManager {
    constructor() {
        this.biasTypes = BiasConfig.getAllBiasTypes();
        this.excellenceTypes = BiasConfig.EXCELLENCE_TYPES;
        this.defaultSettings = BiasConfig.getDefaultSettings();
        
        // Generate dynamic mappings
        this.toggleMappings = this.generateToggleMappings();
        this.statMappings = this.generateStatMappings();
    }

    /**
     * Generate toggle element ID to setting key mappings
     */
    generateToggleMappings() {
        const mappings = {
            'enableToggle': 'enableAnalysis'
        };

        // Add bias type toggles
        this.biasTypes.forEach(biasType => {
            const toggleId = this.getToggleId(biasType.id);
            mappings[toggleId] = biasType.settingKey;
        });

        // Add excellence type toggles
        Object.values(this.excellenceTypes).forEach(excellenceType => {
            const toggleId = this.getExcellenceToggleId(excellenceType.id);
            mappings[toggleId] = excellenceType.settingKey;
        });

        return mappings;
    }

    /**
     * Generate stat element ID to stat key mappings
     */
    generateStatMappings() {
        const mappings = {};

        // Add bias type stats
        this.biasTypes.forEach(biasType => {
            mappings[biasType.statKey] = biasType.statKey;
        });

        // Add excellence type stats
        Object.values(this.excellenceTypes).forEach(excellenceType => {
            mappings[excellenceType.statKey] = excellenceType.statKey;
        });

        return mappings;
    }

    /**
     * Get toggle element ID for a bias type
     */
    getToggleId(biasTypeId) {
        // Convert bias type ID to toggle ID (e.g., 'opinion' -> 'opinionToggle')
        const idMappings = {
            'opinion': 'opinionToggle',
            'tobe': 'ePrimeToggle',
            'absolute': 'absoluteToggle',
            'passive': 'passiveToggle',
            'weasel': 'weaselToggle',
            'presupposition': 'presuppositionToggle',
            'metaphor': 'metaphorToggle',
            'minimizer': 'minimizerToggle',
            'maximizer': 'maximizerToggle',
            'falsebalance': 'falseBalanceToggle',
            'euphemism': 'euphemismToggle',
            'emotional': 'emotionalToggle',
            'gaslighting': 'gaslightingToggle',
            'falsedilemma': 'falseDilemmaToggle',
            'probability': 'probabilityToggle'
        };
        
        return idMappings[biasTypeId] || `${biasTypeId}Toggle`;
    }

    /**
     * Get excellence toggle element ID
     */
    getExcellenceToggleId(excellenceTypeId) {
        return `${excellenceTypeId}ExcellenceToggle`;
    }

    /**
     * Get all toggle mappings
     */
    getToggleMappings() {
        return this.toggleMappings;
    }

    /**
     * Get all stat mappings  
     */
    getStatMappings() {
        return this.statMappings;
    }

    /**
     * Get default settings
     */
    getDefaultSettings() {
        return this.defaultSettings;
    }

    /**
     * Get setting key from toggle element
     */
    getSettingKeyFromToggle(toggleId) {
        return this.toggleMappings[toggleId];
    }

    /**
     * Validate settings object against known settings
     */
    validateSettings(settings) {
        const validatedSettings = {};
        const allSettingKeys = Object.values(this.toggleMappings);
        
        // Copy only known settings
        allSettingKeys.forEach(settingKey => {
            if (settings.hasOwnProperty(settingKey)) {
                validatedSettings[settingKey] = settings[settingKey];
            }
        });

        // Add analysis mode if present
        if (settings.hasOwnProperty('analysisMode')) {
            validatedSettings.analysisMode = settings.analysisMode;
        }

        return validatedSettings;
    }

    /**
     * Get all bias types for UI generation
     */
    getAllBiasTypes() {
        return this.biasTypes;
    }

    /**
     * Get all excellence types for UI generation
     */
    getAllExcellenceTypes() {
        return Object.values(this.excellenceTypes);
    }
}
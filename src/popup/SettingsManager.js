// popup/SettingsManager.js - Settings management utility
import { BiasConfig } from '../config/BiasConfig.js';

export class SettingsManager {
    constructor() {
        this.currentSettings = BiasConfig.getDefaultSettings();
        this.listeners = new Set();
    }

    // Load settings from Chrome storage
    async loadSettings() {
        return new Promise((resolve) => {
            const defaults = BiasConfig.getDefaultSettings();
            chrome.storage.sync.get(defaults, (items) => {
                this.currentSettings = BiasConfig.validateSettings(items);
                this.notifyListeners('loaded', this.currentSettings);
                resolve(this.currentSettings);
            });
        });
    }

    // Save settings to Chrome storage
    async saveSettings(newSettings) {
        return new Promise((resolve, reject) => {
            const validatedSettings = BiasConfig.validateSettings(newSettings);
            
            chrome.storage.sync.set(validatedSettings, () => {
                if (chrome.runtime.lastError) {
                    reject(new Error(chrome.runtime.lastError.message));
                    return;
                }
                
                const oldSettings = { ...this.currentSettings };
                this.currentSettings = validatedSettings;
                
                this.notifyListeners('changed', this.currentSettings, oldSettings);
                resolve(this.currentSettings);
            });
        });
    }

    // Update specific setting
    async updateSetting(key, value) {
        const newSettings = { 
            ...this.currentSettings,
            [key]: value 
        };
        return await this.saveSettings(newSettings);
    }

    // Get current settings
    getSettings() {
        return { ...this.currentSettings };
    }

    // Get setting value
    getSetting(key) {
        return this.currentSettings[key];
    }

    // Send settings to content script
    async sendToContentScript(settings = this.currentSettings) {
        return new Promise((resolve, reject) => {
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                if (!tabs[0]) {
                    reject(new Error('No active tab found'));
                    return;
                }

                chrome.tabs.sendMessage(tabs[0].id, {
                    action: "updateSettings",
                    settings: settings
                }, (response) => {
                    if (chrome.runtime.lastError) {
                        reject(new Error(chrome.runtime.lastError.message));
                    } else {
                        resolve(response);
                    }
                });
            });
        });
    }

    // Add settings change listener
    addListener(listener) {
        this.listeners.add(listener);
    }

    // Remove settings change listener
    removeListener(listener) {
        this.listeners.delete(listener);
    }

    // Notify all listeners of changes
    notifyListeners(event, settings, oldSettings = null) {
        for (const listener of this.listeners) {
            try {
                listener(event, settings, oldSettings);
            } catch (error) {
                console.error('Error in settings listener:', error);
            }
        }
    }

    // Reset to default settings
    async resetToDefaults() {
        const defaults = BiasConfig.getDefaultSettings();
        return await this.saveSettings(defaults);
    }

    // Export settings as JSON
    exportSettings() {
        return JSON.stringify(this.currentSettings, null, 2);
    }

    // Import settings from JSON
    async importSettings(jsonString) {
        try {
            const importedSettings = JSON.parse(jsonString);
            return await this.saveSettings(importedSettings);
        } catch (error) {
            throw new Error('Invalid settings JSON: ' + error.message);
        }
    }

    // Get settings organized by category
    getSettingsByCategory() {
        const categorized = BiasConfig.getSettingsByCategory();
        const result = {};

        for (const [category, biasTypes] of Object.entries(categorized)) {
            result[category] = {
                ...BiasConfig.CATEGORIES[category],
                biasTypes: biasTypes.map(config => ({
                    ...config,
                    enabled: this.currentSettings[config.settingKey]
                }))
            };
        }

        return result;
    }

    // Check if any advanced features are enabled
    hasAdvancedFeaturesEnabled() {
        const advancedTypes = Object.values(BiasConfig.BIAS_TYPES)
            .filter(config => config.category !== 'basic');
            
        return advancedTypes.some(config => this.currentSettings[config.settingKey]);
    }

    // Get enabled bias types count
    getEnabledCount() {
        let count = 0;
        for (const config of Object.values(BiasConfig.BIAS_TYPES)) {
            if (this.currentSettings[config.settingKey]) {
                count++;
            }
        }
        return count;
    }
}

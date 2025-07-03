// popup.js - Refactored popup interface
document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================================================
    // CONFIGURATION - Match the content script configuration
    // ============================================================================
    const BiasConfig = {
        BIAS_TYPES: {
            OPINION: {
                id: 'opinion',
                name: 'Opinion Words',
                settingKey: 'highlightOpinion',
                statKey: 'opinionCount',
                enabled: true
            },
            TO_BE: {
                id: 'tobe',
                name: 'To-Be Verbs (E-Prime)',
                settingKey: 'highlightToBe',
                statKey: 'toBeCount',
                enabled: true
            },
            ABSOLUTE: {
                id: 'absolute',
                name: 'Absolute Statements',
                settingKey: 'highlightAbsolutes',
                statKey: 'absoluteCount',
                enabled: true
            },
            PASSIVE: {
                id: 'passive',
                name: 'Passive Voice',
                settingKey: 'highlightPassive',
                statKey: 'passiveCount',
                enabled: false
            },
            WEASEL: {
                id: 'weasel',
                name: 'Weasel Words',
                settingKey: 'highlightWeasel',
                statKey: 'weaselCount',
                enabled: false
            },
            PRESUPPOSITION: {
                id: 'presupposition',
                name: 'Presuppositions',
                settingKey: 'highlightPresupposition',
                statKey: 'presuppositionCount',
                enabled: false
            },
            METAPHOR: {
                id: 'metaphor',
                name: 'War Metaphors',
                settingKey: 'highlightMetaphors',
                statKey: 'metaphorCount',
                enabled: false
            },
            MINIMIZER: {
                id: 'minimizer',
                name: 'Minimizers',
                settingKey: 'highlightMinimizers',
                statKey: 'minimizerCount',
                enabled: false
            },
            MAXIMIZER: {
                id: 'maximizer',
                name: 'Maximizers',
                settingKey: 'highlightMaximizers',
                statKey: 'maximizerCount',
                enabled: false
            },
            FALSE_BALANCE: {
                id: 'falsebalance',
                name: 'False Balance',
                settingKey: 'highlightFalseBalance',
                statKey: 'falseBalanceCount',
                enabled: false
            },
            EUPHEMISM: {
                id: 'euphemism',
                name: 'Euphemisms',
                settingKey: 'highlightEuphemism',
                statKey: 'euphemismCount',
                enabled: false
            },
            EMOTIONAL: {
                id: 'emotional',
                name: 'Emotional Manipulation',
                settingKey: 'highlightEmotional',
                statKey: 'emotionalCount',
                enabled: false
            },
            GASLIGHTING: {
                id: 'gaslighting',
                name: 'Gaslighting',
                settingKey: 'highlightGaslighting',
                statKey: 'gaslightingCount',
                enabled: false
            },
            FALSE_DILEMMA: {
                id: 'falsedilemma',
                name: 'False Dilemmas',
                settingKey: 'highlightFalseDilemma',
                statKey: 'falseDilemmaCount',
                enabled: false
            }
        },

        getDefaultSettings() {
            const settings = { enableAnalysis: true };
            for (const config of Object.values(this.BIAS_TYPES)) {
                settings[config.settingKey] = config.enabled;
            }
            return settings;
        },

        createEmptyStats() {
            const stats = {};
            for (const config of Object.values(this.BIAS_TYPES)) {
                stats[config.statKey] = 0;
            }
            return stats;
        },

        validateSettings(settings) {
            const validated = { ...this.getDefaultSettings() };
            for (const [key, value] of Object.entries(settings)) {
                if (key === 'enableAnalysis' || 
                    Object.values(this.BIAS_TYPES).some(config => config.settingKey === key)) {
                    validated[key] = Boolean(value);
                }
            }
            return validated;
        }
    };

    // ============================================================================
    // SETTINGS MANAGER - Handle settings persistence and validation
    // ============================================================================
    class SettingsManager {
        constructor() {
            this.currentSettings = BiasConfig.getDefaultSettings();
            this.listeners = new Set();
        }

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

        addListener(listener) {
            this.listeners.add(listener);
        }

        removeListener(listener) {
            this.listeners.delete(listener);
        }

        notifyListeners(event, settings, oldSettings = null) {
            for (const listener of this.listeners) {
                try {
                    listener(event, settings, oldSettings);
                } catch (error) {
                    console.error('Error in settings listener:', error);
                }
            }
        }

        getSettings() {
            return { ...this.currentSettings };
        }

        getSetting(key) {
            return this.currentSettings[key];
        }
    }

    // ============================================================================
    // COMMUNICATION MANAGER - Handle communication with content script
    // ============================================================================
    class CommunicationManager {
        constructor() {
            this.retryAttempts = 3;
            this.retryDelay = 500;
        }

        async sendMessage(action, data = {}) {
            return new Promise((resolve, reject) => {
                chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                    if (!tabs[0]) {
                        reject(new Error('No active tab found'));
                        return;
                    }

                    const message = { action, ...data };
                    this.sendMessageWithRetry(tabs[0].id, message, 0, resolve, reject);
                });
            });
        }

        sendMessageWithRetry(tabId, message, attempt, resolve, reject) {
            chrome.tabs.sendMessage(tabId, message, (response) => {
                if (chrome.runtime.lastError) {
                    if (attempt < this.retryAttempts) {
                        console.log(`Retry attempt ${attempt + 1} for message:`, message.action);
                        setTimeout(() => {
                            this.sendMessageWithRetry(tabId, message, attempt + 1, resolve, reject);
                        }, this.retryDelay * (attempt + 1));
                    } else {
                        reject(new Error(chrome.runtime.lastError.message));
                    }
                } else {
                    resolve(response);
                }
            });
        }

        async getStats() {
            try {
                return await this.sendMessage('getStats');
            } catch (error) {
                console.error('Error getting stats:', error);
                return BiasConfig.createEmptyStats();
            }
        }

        async forceAnalyze() {
            return await this.sendMessage('forceAnalyze');
        }

        async clearHighlights() {
            return await this.sendMessage('clearHighlights');
        }
    }

    // ============================================================================
    // UI MANAGER - Handle user interface updates and interactions
    // ============================================================================
    class UIManager {
        constructor(settingsManager, communicationManager) {
            this.settingsManager = settingsManager;
            this.communicationManager = communicationManager;
            this.lastKnownStats = BiasConfig.createEmptyStats();
            this.isUpdating = false;
            
            this.initializeElements();
            this.setupEventListeners();
        }

        initializeElements() {
            // Get all toggle elements
            this.enableToggle = document.getElementById('enableToggle');
            this.toggles = {
                opinion: document.getElementById('opinionToggle'),
                tobe: document.getElementById('ePrimeToggle'),
                absolute: document.getElementById('absoluteToggle'),
                passive: document.getElementById('passiveToggle'),
                weasel: document.getElementById('weaselToggle'),
                presupposition: document.getElementById('presuppositionToggle'),
                metaphor: document.getElementById('metaphorToggle'),
                minimizer: document.getElementById('minimizerToggle'),
                maximizer: document.getElementById('maximizerToggle'),
                falsebalance: document.getElementById('falseBalanceToggle'),
                euphemism: document.getElementById('euphemismToggle'),
                emotional: document.getElementById('emotionalToggle'),
                gaslighting: document.getElementById('gaslightingToggle'),
                falsedilemma: document.getElementById('falseDilemmaToggle')
            };

            // Get stat display elements
            this.statElements = {
                opinionCount: document.getElementById('opinionCount'),
                toBeCount: document.getElementById('toBeCount'),
                absoluteCount: document.getElementById('absoluteCount'),
                passiveCount: document.getElementById('passiveCount'),
                weaselCount: document.getElementById('weaselCount'),
                presuppositionCount: document.getElementById('presuppositionCount'),
                metaphorCount: document.getElementById('metaphorCount'),
                minimizerCount: document.getElementById('minimizerCount'),
                maximizerCount: document.getElementById('maximizerCount'),
                falseBalanceCount: document.getElementById('falseBalanceCount'),
                euphemismCount: document.getElementById('euphemismCount'),
                emotionalCount: document.getElementById('emotionalCount'),
                gaslightingCount: document.getElementById('gaslightingCount'),
                falseDilemmaCount: document.getElementById('falseDilemmaCount')
            };

            // Get action buttons
            this.refreshButton = document.getElementById('refreshButton');
            this.clearButton = document.getElementById('clearButton');

            // Get info link
            this.infoLink = document.getElementById('infoLink');
        }

        setupEventListeners() {
            // Enable toggle
            if (this.enableToggle) {
                this.enableToggle.addEventListener('change', () => this.handleEnableToggle());
            }

            // Individual bias toggles
            for (const [type, toggle] of Object.entries(this.toggles)) {
                if (toggle) {
                    toggle.addEventListener('change', () => this.handleBiasToggle(type));
                }
            }

            // Action buttons
            if (this.refreshButton) {
                this.refreshButton.addEventListener('click', () => this.handleRefresh());
            }

            if (this.clearButton) {
                this.clearButton.addEventListener('click', () => this.handleClear());
            }

            // Info link
            if (this.infoLink) {
                this.infoLink.addEventListener('click', (e) => this.handleInfoLink(e));
            }

            // Category headers for collapsing
            const categoryHeaders = document.querySelectorAll('.category-header');
            categoryHeaders.forEach(header => {
                header.addEventListener('click', () => this.toggleCategorySection(header));
            });

            // Settings change listener
            this.settingsManager.addListener((event, settings) => {
                if (event === 'loaded') {
                    this.updateUIFromSettings(settings);
                }
            });
        }

        async handleEnableToggle() {
            if (this.isUpdating) return;
            
            console.log('Enable toggle changed to:', this.enableToggle.checked);
            
            if (!this.enableToggle.checked) {
                this.lastKnownStats = BiasConfig.createEmptyStats();
            }
            
            await this.saveSettingsAndUpdate();
        }

        async handleBiasToggle(type) {
            if (this.isUpdating) return;
            
            const toggle = this.toggles[type];
            if (!toggle) return;
            
            console.log(`${type} toggle changed to:`, toggle.checked);
            await this.saveSettingsAndUpdate();
        }

        async handleRefresh() {
            console.log('Refresh button clicked');
            
            this.setButtonState(this.refreshButton, 'Refreshing...', true);
            
            try {
                const response = await this.communicationManager.forceAnalyze();
                if (response && response.success) {
                    this.updateStats(response.stats);
                }
            } catch (error) {
                console.error('Error during refresh:', error);
                this.showError('Failed to refresh analysis');
            } finally {
                setTimeout(() => {
                    this.setButtonState(this.refreshButton, 'Refresh Analysis', false);
                }, 1000);
            }
        }

        async handleClear() {
            console.log('Clear button clicked');
            
            this.lastKnownStats = BiasConfig.createEmptyStats();
            
            try {
                const response = await this.communicationManager.clearHighlights();
                if (response && response.success) {
                    this.updateStats(response.stats || this.lastKnownStats);
                }
            } catch (error) {
                console.error('Error during clear:', error);
                this.updateStats(this.lastKnownStats);
            }
        }

        handleInfoLink(e) {
            e.preventDefault();
            console.log('Info link clicked');
            
            const infoUrl = chrome.runtime.getURL('info.html');
            chrome.tabs.create({ url: infoUrl }, (tab) => {
                if (chrome.runtime.lastError) {
                    console.error('Error creating tab:', chrome.runtime.lastError);
                } else {
                    console.log('Info tab created successfully:', tab);
                }
            });
        }

        toggleCategorySection(header) {
            const section = header.parentElement;
            if (section) {
                section.classList.toggle('collapsed');
                console.log('Toggled section:', header.querySelector('span').textContent);
            }
        }

        async saveSettingsAndUpdate() {
            if (this.isUpdating) return;
            this.isUpdating = true;
            
            try {
                const settings = this.collectSettingsFromUI();
                console.log('Saving settings:', settings);

                // Save to storage
                await this.settingsManager.saveSettings(settings);
                
                // Send to content script
                setTimeout(async () => {
                    try {
                        const response = await this.settingsManager.sendToContentScript(settings);
                        if (response && response.success && response.stats) {
                            this.updateStats(response.stats);
                        } else {
                            // Update stats separately if not included in response
                            setTimeout(() => this.updateStats(), 1500);
                        }
                    } catch (error) {
                        console.error('Error sending to content script:', error);
                        setTimeout(() => this.updateStats(), 1000);
                    }
                }, 100);

                this.updateTogglesState();
                
            } catch (error) {
                console.error('Error saving settings:', error);
                this.showError('Failed to save settings');
            } finally {
                this.isUpdating = false;
            }
        }

        collectSettingsFromUI() {
            const settings = {
                enableAnalysis: this.enableToggle ? this.enableToggle.checked : true
            };

            // Map toggles to settings
            const toggleMapping = {
                opinion: 'highlightOpinion',
                tobe: 'highlightToBe',
                absolute: 'highlightAbsolutes',
                passive: 'highlightPassive',
                weasel: 'highlightWeasel',
                presupposition: 'highlightPresupposition',
                metaphor: 'highlightMetaphors',
                minimizer: 'highlightMinimizers',
                maximizer: 'highlightMaximizers',
                falsebalance: 'highlightFalseBalance',
                euphemism: 'highlightEuphemism',
                emotional: 'highlightEmotional',
                gaslighting: 'highlightGaslighting',
                falsedilemma: 'highlightFalseDilemma'
            };

            for (const [toggleKey, settingKey] of Object.entries(toggleMapping)) {
                const toggle = this.toggles[toggleKey];
                if (toggle) {
                    settings[settingKey] = toggle.checked;
                }
            }

            return settings;
        }

        updateUIFromSettings(settings) {
            this.isUpdating = true;
            
            try {
                if (this.enableToggle) {
                    this.enableToggle.checked = settings.enableAnalysis;
                }

                // Update individual toggles
                const toggleMapping = {
                    opinion: 'highlightOpinion',
                    tobe: 'highlightToBe',
                    absolute: 'highlightAbsolutes',
                    passive: 'highlightPassive',
                    weasel: 'highlightWeasel',
                    presupposition: 'highlightPresupposition',
                    metaphor: 'highlightMetaphors',
                    minimizer: 'highlightMinimizers',
                    maximizer: 'highlightMaximizers',
                    falsebalance: 'highlightFalseBalance',
                    euphemism: 'highlightEuphemism',
                    emotional: 'highlightEmotional',
                    gaslighting: 'highlightGaslighting',
                    falsedilemma: 'highlightFalseDilemma'
                };

                for (const [toggleKey, settingKey] of Object.entries(toggleMapping)) {
                    const toggle = this.toggles[toggleKey];
                    if (toggle && settings[settingKey] !== undefined) {
                        toggle.checked = settings[settingKey];
                    }
                }

                this.updateTogglesState();
                this.updateStats();
                
            } catch (error) {
                console.error('Error updating UI from settings:', error);
            } finally {
                this.isUpdating = false;
            }
        }

        updateTogglesState() {
            const isEnabled = this.enableToggle ? this.enableToggle.checked : true;
            
            // Enable/disable individual toggles
            for (const toggle of Object.values(this.toggles)) {
                if (toggle) {
                    toggle.disabled = !isEnabled;
                }
            }

            // Enable/disable buttons
            if (this.refreshButton) {
                this.refreshButton.disabled = !isEnabled;
            }
            if (this.clearButton) {
                this.clearButton.disabled = !isEnabled;
            }
        }

        async updateStats(stats = null) {
            if (this.isUpdating && !stats) return;
            
            try {
                // Get fresh stats if not provided
                if (!stats) {
                    stats = await this.communicationManager.getStats();
                }

                // Update last known stats if provided
                if (stats && typeof stats === 'object') {
                    this.lastKnownStats = { ...this.lastKnownStats, ...stats };
                }

                // Update each stat element
                for (const [statKey, element] of Object.entries(this.statElements)) {
                    if (element) {
                        const value = this.lastKnownStats[statKey];
                        element.textContent = value !== undefined ? value : '-';
                    }
                }

            } catch (error) {
                console.error('Error updating stats:', error);
                // Show last known stats or dashes
                for (const [statKey, element] of Object.entries(this.statElements)) {
                    if (element) {
                        const value = this.lastKnownStats[statKey];
                        element.textContent = value !== undefined ? value : '-';
                    }
                }
            }
        }

        setButtonState(button, text, disabled) {
            if (button) {
                button.textContent = text;
                button.disabled = disabled;
            }
        }

        showError(message) {
            console.error(message);
            // Could add visual error indication here
        }
    }

    // ============================================================================
    // INITIALIZATION
    // ============================================================================
    async function initialize() {
        try {
            const settingsManager = new SettingsManager();
            const communicationManager = new CommunicationManager();
            const uiManager = new UIManager(settingsManager, communicationManager);

            // Load initial settings
            await settingsManager.loadSettings();

            // Update stats periodically
            setInterval(() => {
                if (!uiManager.isUpdating) {
                    uiManager.updateStats();
                }
            }, 5000);

            // Update stats when popup becomes visible
            document.addEventListener('visibilitychange', () => {
                if (!document.hidden && !uiManager.isUpdating) {
                    uiManager.updateStats();
                }
            });

            // Update stats when window gains focus
            window.addEventListener('focus', () => {
                if (!uiManager.isUpdating) {
                    uiManager.updateStats();
                }
            });

            console.log('E-Prime Bias Detector popup initialized successfully');
            
        } catch (error) {
            console.error('Failed to initialize popup:', error);
        }
    }

    // Start initialization
    initialize();
});

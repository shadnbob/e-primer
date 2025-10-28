// popup-dynamic.js - Refactored popup with dynamic UI generation
import { PopupGenerator } from './src/popup/PopupGenerator.js';
import { BiasConfig } from './src/config/BiasConfig.js';

document.addEventListener('DOMContentLoaded', function() {
    let currentSettings = {};
    let isUpdating = false;
    let popupGenerator = null;

    // Initialize the popup
    initialize();

    async function initialize() {
        try {
            // Create popup generator
            popupGenerator = new PopupGenerator();
            
            // Generate dynamic UI
            generateUI();
            
            // Load settings and update UI
            await loadSettings();
            
            // Setup event listeners
            setupEventListeners();
            
            // Request initial stats
            requestStats();
            
            console.log('Dynamic popup initialized successfully');
        } catch (error) {
            console.error('Failed to initialize dynamic popup:', error);
            // Fallback to basic functionality
            handleInitializationError(error);
        }
    }

    function generateUI() {
        // Generate excellence detection section
        const excellenceContainer = document.getElementById('excellence-detection-container');
        if (excellenceContainer) {
            excellenceContainer.innerHTML = popupGenerator.generateExcellenceSection();
        }

        // Generate bias detection sections
        const biasContainer = document.getElementById('bias-detection-container');
        if (biasContainer) {
            biasContainer.innerHTML = popupGenerator.generateAllBiasSections();
        }

        // Generate statistics sections
        const excellenceStatsContainer = document.getElementById('excellence-stats-container');
        if (excellenceStatsContainer) {
            excellenceStatsContainer.innerHTML = popupGenerator.generateExcellenceStatsGrid();
        }

        const biasStatsContainer = document.getElementById('bias-stats-container');
        if (biasStatsContainer) {
            biasStatsContainer.innerHTML = popupGenerator.generateBiasStatsGrid();
        }
    }

    async function loadSettings() {
        try {
            // Always use BiasConfig as the source of truth
            const defaults = BiasConfig.getDefaultSettings();
            
            return new Promise((resolve) => {
                chrome.storage.sync.get(defaults, function(items) {
                    currentSettings = BiasConfig.validateSettings(items);
                    updateUI();
                    updateModeUI();
                    resolve();
                });
            });
        } catch (error) {
            console.error('Failed to load settings:', error);
            // Use minimal defaults if BiasConfig fails
            currentSettings = {
                enableAnalysis: true,
                analysisMode: 'balanced'
            };
            updateUI();
        }
    }

    function updateUI() {
        isUpdating = true;
        
        // Update all toggles using data attributes
        const toggles = document.querySelectorAll('input[data-setting-key]');
        toggles.forEach(toggle => {
            const settingKey = toggle.dataset.settingKey;
            if (settingKey && currentSettings.hasOwnProperty(settingKey)) {
                toggle.checked = currentSettings[settingKey];
            }
        });

        // Update master toggle
        const enableToggle = document.getElementById('enableToggle');
        if (enableToggle) {
            enableToggle.checked = currentSettings.enableAnalysis;
        }
        
        // Update status text
        updateStatusText();
        
        isUpdating = false;
    }

    function updateModeUI() {
        // Update mode selector
        const modeInputs = document.querySelectorAll('input[name="mode"]');
        modeInputs.forEach(input => {
            if (input.value === currentSettings.analysisMode) {
                input.checked = true;
            }
        });
    }
    
    function updateStatusText() {
        const statusText = document.getElementById('statusText');
        if (statusText) {
            const mode = currentSettings.analysisMode || 'balanced';
            let modeText = '';
            switch(mode) {
                case 'problems':
                    modeText = 'Detecting problematic language patterns.';
                    break;
                case 'excellence':
                    modeText = 'Highlighting excellent writing practices.';
                    break;
                case 'balanced':
                    modeText = 'Showing both problems and excellence.';
                    break;
            }
            statusText.innerHTML = `<strong>Active:</strong> ${modeText}`;
        }
    }

    function setupEventListeners() {
        // Generic toggle handler using event delegation
        setupDynamicToggleListeners();
        
        // Other event listeners
        setupButtonListeners();
        setupCategoryCollapse();
        setupModeSelector();
        setupInfoLink();
        setupSectionToggleButtons();
    }

    function setupDynamicToggleListeners() {
        // Use event delegation for all toggle changes
        document.addEventListener('change', (event) => {
            if (isUpdating) return;
            
            const target = event.target;
            
            // Handle bias/excellence type toggles
            if (target.matches('input[data-setting-key]')) {
                const settingKey = target.dataset.settingKey;
                handleSettingChange(settingKey, target.checked);
            }
            
            // Handle master enable toggle
            if (target.id === 'enableToggle') {
                handleSettingChange('enableAnalysis', target.checked);
            }
        });
    }

    function handleSettingChange(settingKey, value) {
        if (!settingKey) return;
        
        currentSettings[settingKey] = value;
        
        // Save to storage
        chrome.storage.sync.set(currentSettings, function() {
            // Send message to content script
            sendSettingsToContentScript();
        });
    }

    function setupButtonListeners() {
        const refreshButton = document.getElementById('refreshButton');
        const clearButton = document.getElementById('clearButton');
        
        if (refreshButton) {
            refreshButton.addEventListener('click', handleRefresh);
        }
        
        if (clearButton) {
            clearButton.addEventListener('click', handleClear);
        }
    }

    function handleRefresh() {
        const refreshButton = document.getElementById('refreshButton');
        refreshButton.disabled = true;
        refreshButton.textContent = 'Analyzing...';
        
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {action: 'forceAnalyze'}, function(response) {
                if (chrome.runtime.lastError) {
                    console.error('Error:', chrome.runtime.lastError);
                    refreshButton.disabled = false;
                    refreshButton.textContent = 'Refresh Analysis';
                    return;
                }
                
                if (response && response.success) {
                    updateStats(response.stats);
                    setTimeout(() => {
                        refreshButton.disabled = false;
                        refreshButton.textContent = 'Refresh Analysis';
                    }, 1000);
                } else {
                    refreshButton.disabled = false;
                    refreshButton.textContent = 'Refresh Analysis';
                }
            });
        });
    }

    function handleClear() {
        const clearButton = document.getElementById('clearButton');
        clearButton.disabled = true;
        
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {action: 'clearHighlights'}, function(response) {
                if (chrome.runtime.lastError) {
                    console.error('Error:', chrome.runtime.lastError);
                    clearButton.disabled = false;
                    return;
                }
                
                if (response && response.success) {
                    updateStats(response.stats);
                    setTimeout(() => {
                        clearButton.disabled = false;
                    }, 500);
                }
            });
        });
    }

    function setupCategoryCollapse() {
        // Use event delegation for dynamically generated headers
        document.addEventListener('click', (event) => {
            if (event.target.matches('.category-header')) {
                const section = event.target.parentElement;
                section.classList.toggle('collapsed');
            }
        });
    }
    
    function setupModeSelector() {
        const modeInputs = document.querySelectorAll('input[name="mode"]');
        modeInputs.forEach(input => {
            input.addEventListener('change', handleModeChange);
        });
    }
    
    function handleModeChange(event) {
        const newMode = event.target.value;
        currentSettings.analysisMode = newMode;
        
        // Save to storage
        chrome.storage.sync.set(currentSettings, function() {
            // Send updated settings to content script
            sendSettingsToContentScript();
            updateStatusText();
        });
    }

    function setupInfoLink() {
        const infoLink = document.getElementById('infoLink');
        if (infoLink) {
            infoLink.addEventListener('click', function(e) {
                e.preventDefault();
                chrome.tabs.create({ url: 'info.html' });
            });
        }
    }

    function setupSectionToggleButtons() {
        // Use event delegation for section toggle buttons
        document.addEventListener('click', (event) => {
            if (event.target.matches('.section-toggle-btn')) {
                event.stopPropagation(); // Prevent header collapse
                
                const section = event.target.dataset.section;
                const action = event.target.dataset.action;
                
                handleSectionToggle(section, action);
            }
        });
    }

    function handleSectionToggle(section, action) {
        const shouldCheck = action === 'all-on';
        
        // Define which toggles belong to each section
        const sectionMappings = {
            excellence: [
                'attributionExcellenceToggle',
                'nuanceExcellenceToggle', 
                'transparencyExcellenceToggle',
                'discourseExcellenceToggle',
                'evidenceExcellenceToggle'
            ],
            basic: [
                'opinionToggle',
                'ePrimeToggle',
                'absoluteToggle'
            ],
            advanced: [
                'passiveToggle',
                'weaselToggle',
                'presuppositionToggle',
                'probabilityToggle'
            ],
            framing: [
                'metaphorToggle',
                'minimizerToggle',
                'maximizerToggle',
                'falseBalanceToggle',
                'euphemismToggle'
            ],
            manipulation: [
                'emotionalToggle',
                'gaslightingToggle',
                'falseDilemmaToggle'
            ]
        };

        const toggleIds = sectionMappings[section];
        if (!toggleIds) return;

        // Update each toggle in the section
        toggleIds.forEach(toggleId => {
            const toggle = document.getElementById(toggleId);
            if (toggle) {
                toggle.checked = shouldCheck;
                
                // Find the corresponding setting key and update
                const settingKey = toggle.dataset.settingKey || getSettingKeyFromToggleId(toggleId);
                if (settingKey) {
                    handleSettingChange(settingKey, shouldCheck);
                }
            }
        });
    }

    function getSettingKeyFromToggleId(toggleId) {
        // Map toggle IDs to setting keys for backwards compatibility
        const mappings = {
            'opinionToggle': 'highlightOpinion',
            'ePrimeToggle': 'highlightToBe',
            'absoluteToggle': 'highlightAbsolutes',
            'passiveToggle': 'highlightPassive',
            'weaselToggle': 'highlightWeasel',
            'presuppositionToggle': 'highlightPresupposition',
            'metaphorToggle': 'highlightMetaphors',
            'minimizerToggle': 'highlightMinimizers',
            'maximizerToggle': 'highlightMaximizers',
            'falseBalanceToggle': 'highlightFalseBalance',
            'euphemismToggle': 'highlightEuphemism',
            'emotionalToggle': 'highlightEmotional',
            'gaslightingToggle': 'highlightGaslighting',
            'falseDilemmaToggle': 'highlightFalseDilemma',
            'probabilityToggle': 'highlightProbability',
            'attributionExcellenceToggle': 'highlightAttributionExcellence',
            'nuanceExcellenceToggle': 'highlightNuanceExcellence',
            'transparencyExcellenceToggle': 'highlightTransparencyExcellence',
            'discourseExcellenceToggle': 'highlightDiscourseExcellence',
            'evidenceExcellenceToggle': 'highlightEvidenceExcellence'
        };
        return mappings[toggleId];
    }

    function sendSettingsToContentScript() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                action: 'updateSettings',
                settings: currentSettings
            }, function(response) {
                if (chrome.runtime.lastError) {
                    console.error('Error:', chrome.runtime.lastError);
                    return;
                }
                
                if (response && response.stats) {
                    updateStats(response.stats);
                }
            });
        });
    }

    function requestStats() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            if (tabs[0]) {
                chrome.tabs.sendMessage(tabs[0].id, {action: 'getStats'}, function(stats) {
                    if (chrome.runtime.lastError) {
                        console.error('Error:', chrome.runtime.lastError);
                        return;
                    }
                    
                    if (stats) {
                        updateStats(stats);
                    }
                });
            }
        });
    }

    function updateStats(stats) {
        if (!stats) return;
        
        // Update all stat values using IDs
        Object.entries(stats).forEach(([statKey, value]) => {
            const element = document.getElementById(statKey);
            if (element && statKey !== 'healthScore') {
                element.textContent = value || 0;
            }
        });
        
        // Health score removed - no longer updating
    }
    

    function handleInitializationError(error) {
        console.error('Popup initialization failed, using fallback mode:', error);
        
        // Show error message to user
        const containers = [
            'excellence-detection-container',
            'bias-detection-container', 
            'excellence-stats-container',
            'bias-stats-container'
        ];
        
        containers.forEach(containerId => {
            const container = document.getElementById(containerId);
            if (container) {
                container.innerHTML = `
                    <div style="padding: 20px; text-align: center; color: #666;">
                        <p>Error loading dynamic interface.</p>
                        <p style="font-size: 12px;">Please refresh the extension.</p>
                    </div>
                `;
            }
        });
    }

    // Listen for stats updates from content script
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        if (request.action === 'updateStats') {
            updateStats(request.stats);
        }
    });

    // Auto-refresh stats every 2 seconds
    setInterval(requestStats, 2000);
});
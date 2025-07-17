// popup.js - Enhanced with Excellence Detection and Mode Switching
document.addEventListener('DOMContentLoaded', function() {
    // Toggle mappings - updated with excellence toggles
    const toggleMappings = {
        'enableToggle': 'enableAnalysis',
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
        // Excellence toggles
        'attributionExcellenceToggle': 'highlightAttributionExcellence',
        'nuanceExcellenceToggle': 'highlightNuanceExcellence',
        'transparencyExcellenceToggle': 'highlightTransparencyExcellence',
        'discourseExcellenceToggle': 'highlightDiscourseExcellence',
        'evidenceExcellenceToggle': 'highlightEvidenceExcellence'
    };

    // Stat element mappings - updated with excellence stats
    const statMappings = {
        'opinionCount': 'opinionCount',
        'toBeCount': 'toBeCount',
        'absoluteCount': 'absoluteCount',
        'passiveCount': 'passiveCount',
        'weaselCount': 'weaselCount',
        'presuppositionCount': 'presuppositionCount',
        'metaphorCount': 'metaphorCount',
        'minimizerCount': 'minimizerCount',
        'maximizerCount': 'maximizerCount',
        'falseBalanceCount': 'falseBalanceCount',
        'euphemismCount': 'euphemismCount',
        'emotionalCount': 'emotionalCount',
        'gaslightingCount': 'gaslightingCount',
        'falseDilemmaCount': 'falseDilemmaCount',
        // Excellence stats
        'attributionExcellenceCount': 'attributionExcellenceCount',
        'nuanceExcellenceCount': 'nuanceExcellenceCount',
        'transparencyExcellenceCount': 'transparencyExcellenceCount',
        'discourseExcellenceCount': 'discourseExcellenceCount',
        'evidenceExcellenceCount': 'evidenceExcellenceCount'
    };

    let currentSettings = {};
    let isUpdating = false;

    // Initialize settings
    loadSettings();

    // Setup event listeners
    setupToggleListeners();
    setupButtonListeners();
    setupCategoryCollapse();
    setupModeSelector();
    setupInfoLink();

    // Request initial stats
    requestStats();

    function loadSettings() {
        // Import BiasConfig to get defaults
        import('./src/config/BiasConfig.js').then(module => {
            const defaults = module.BiasConfig.getDefaultSettings();
            
            chrome.storage.sync.get(defaults, function(items) {
                currentSettings = items;
                updateUI();
                updateModeUI();
            });
        }).catch(error => {
            // Fallback to hardcoded defaults if import fails
            const defaults = {
                enableAnalysis: true,
                analysisMode: 'balanced',
                highlightOpinion: true,
                highlightToBe: true,
                highlightAbsolutes: true,
                highlightPassive: false,
                highlightWeasel: false,
                highlightPresupposition: false,
                highlightMetaphors: false,
                highlightMinimizers: false,
                highlightMaximizers: false,
                highlightFalseBalance: false,
                highlightEuphemism: false,
                highlightEmotional: false,
                highlightGaslighting: false,
                highlightFalseDilemma: false,
                highlightAttributionExcellence: true,
                highlightNuanceExcellence: true,
                highlightTransparencyExcellence: true,
                highlightDiscourseExcellence: true,
                highlightEvidenceExcellence: true
            };
            
            chrome.storage.sync.get(defaults, function(items) {
                currentSettings = items;
                updateUI();
                updateModeUI();
            });
        });
    }

    function updateUI() {
        isUpdating = true;
        
        // Update toggles
        for (const [toggleId, settingKey] of Object.entries(toggleMappings)) {
            const toggle = document.getElementById(toggleId);
            if (toggle) {
                toggle.checked = currentSettings[settingKey];
            }
        }
        
        // Update status text based on mode
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

    function setupToggleListeners() {
        for (const toggleId of Object.keys(toggleMappings)) {
            const toggle = document.getElementById(toggleId);
            if (toggle) {
                toggle.addEventListener('change', handleToggleChange);
            }
        }
    }

    function handleToggleChange(event) {
        if (isUpdating) return;
        
        const toggleId = event.target.id;
        const settingKey = toggleMappings[toggleId];
        
        if (settingKey) {
            currentSettings[settingKey] = event.target.checked;
            
            // Save to storage
            chrome.storage.sync.set(currentSettings, function() {
                // Send message to content script
                sendSettingsToContentScript();
            });
        }
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
        const headers = document.querySelectorAll('.category-header');
        headers.forEach(header => {
            header.addEventListener('click', function() {
                const section = this.parentElement;
                section.classList.toggle('collapsed');
            });
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
        
        // Update stat values
        for (const [elementId, statKey] of Object.entries(statMappings)) {
            const element = document.getElementById(elementId);
            if (element && stats[statKey] !== undefined) {
                element.textContent = stats[statKey] || 0;
            }
        }
        
        // Update health score
        updateHealthScore(stats.healthScore);
    }
    
    function updateHealthScore(score) {
        const healthScore = document.getElementById('healthScore');
        const healthFill = document.getElementById('healthFill');
        
        if (healthScore && healthFill) {
            if (score === undefined || score === null) {
                healthScore.textContent = '--';
                healthScore.className = 'health-score';
                healthFill.style.width = '0%';
                healthFill.className = 'health-fill';
            } else {
                healthScore.textContent = score + '/100';
                
                // Update color based on score
                if (score >= 70) {
                    healthScore.className = 'health-score health-good';
                    healthFill.className = 'health-fill health-good';
                } else if (score >= 40) {
                    healthScore.className = 'health-score health-medium';
                    healthFill.className = 'health-fill health-medium';
                } else {
                    healthScore.className = 'health-score health-poor';
                    healthFill.className = 'health-fill health-poor';
                }
                
                // Update bar width
                healthFill.style.width = score + '%';
            }
        }
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

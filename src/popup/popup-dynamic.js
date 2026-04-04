// popup-dynamic.js - Enhanced with dynamic settings management
document.addEventListener('DOMContentLoaded', function() {
    // Dynamic Settings Manager - Compiled from SettingsManager.js
    class SettingsManager {
        constructor() {
            // Hardcoded BiasConfig data for popup context
            this.biasTypes = [
                { id: 'opinion', settingKey: 'highlightOpinion', statKey: 'opinionCount',
                  subCategories: {
                    certainty: { settingKey: 'highlightOpinionCertainty', statKey: 'opinionCertaintyCount' },
                    hedging: { settingKey: 'highlightOpinionHedging', statKey: 'opinionHedgingCount' },
                    evaluative_positive: { settingKey: 'highlightOpinionEvaluativePositive', statKey: 'opinionEvaluativePositiveCount' },
                    evaluative_negative: { settingKey: 'highlightOpinionEvaluativeNegative', statKey: 'opinionEvaluativeNegativeCount' },
                    emotional_charge: { settingKey: 'highlightOpinionEmotionalCharge', statKey: 'opinionEmotionalChargeCount' },
                    comparative: { settingKey: 'highlightOpinionComparative', statKey: 'opinionComparativeCount' },
                    political_framing: { settingKey: 'highlightOpinionPoliticalFraming', statKey: 'opinionPoliticalFramingCount' },
                    intensifiers: { settingKey: 'highlightOpinionIntensifiers', statKey: 'opinionIntensifiersCount' },
                    credibility_undermining: { settingKey: 'highlightOpinionCredibilityUndermining', statKey: 'opinionCredibilityUnderminingCount' },
                    loaded_political: { settingKey: 'highlightOpinionLoadedPolitical', statKey: 'opinionLoadedPoliticalCount' },
                    moral_judgments: { settingKey: 'highlightOpinionMoralJudgments', statKey: 'opinionMoralJudgmentsCount' },
                    emotional_appeals: { settingKey: 'highlightOpinionEmotionalAppeals', statKey: 'opinionEmotionalAppealsCount' }
                  }
                },
                { id: 'tobe', settingKey: 'highlightToBe', statKey: 'toBeCount' },
                { id: 'absolute', settingKey: 'highlightAbsolutes', statKey: 'absoluteCount' },
                { id: 'passive', settingKey: 'highlightPassive', statKey: 'passiveCount' },
                { id: 'weasel', settingKey: 'highlightWeasel', statKey: 'weaselCount' },
                { id: 'presupposition', settingKey: 'highlightPresupposition', statKey: 'presuppositionCount' },
                { id: 'metaphor', settingKey: 'highlightMetaphors', statKey: 'metaphorCount' },
                { id: 'minimizer', settingKey: 'highlightMinimizers', statKey: 'minimizerCount' },
                { id: 'maximizer', settingKey: 'highlightMaximizers', statKey: 'maximizerCount' },
                { id: 'falsebalance', settingKey: 'highlightFalseBalance', statKey: 'falseBalanceCount' },
                { id: 'euphemism', settingKey: 'highlightEuphemism', statKey: 'euphemismCount',
                  subCategories: {
                    political_euphemism: { settingKey: 'highlightEuphemismPolitical', statKey: 'euphemismPoliticalCount' },
                    corporate_euphemism: { settingKey: 'highlightEuphemismCorporate', statKey: 'euphemismCorporateCount' },
                    social_euphemism: { settingKey: 'highlightEuphemismSocial', statKey: 'euphemismSocialCount' },
                    military_euphemism: { settingKey: 'highlightEuphemismMilitary', statKey: 'euphemismMilitaryCount' },
                    dysphemism: { settingKey: 'highlightEuphemismDysphemism', statKey: 'euphemismDysphemismCount' },
                    medical_euphemism: { settingKey: 'highlightEuphemismMedical', statKey: 'euphemismMedicalCount' },
                    environmental_euphemism: { settingKey: 'highlightEuphemismEnvironmental', statKey: 'euphemismEnvironmentalCount' }
                  }
                },
                { id: 'emotional', settingKey: 'highlightEmotional', statKey: 'emotionalCount' },
                { id: 'gaslighting', settingKey: 'highlightGaslighting', statKey: 'gaslightingCount' },
                { id: 'falsedilemma', settingKey: 'highlightFalseDilemma', statKey: 'falseDilemmaCount' },
                { id: 'probability', settingKey: 'highlightProbability', statKey: 'probabilityCount' }
            ];
            
            this.excellenceTypes = [
                { id: 'attribution', settingKey: 'highlightAttributionExcellence', statKey: 'attributionExcellenceCount' },
                { id: 'nuance', settingKey: 'highlightNuanceExcellence', statKey: 'nuanceExcellenceCount' },
                { id: 'transparency', settingKey: 'highlightTransparencyExcellence', statKey: 'transparencyExcellenceCount' },
                { id: 'discourse', settingKey: 'highlightDiscourseExcellence', statKey: 'discourseExcellenceCount' },
                { id: 'evidence', settingKey: 'highlightEvidenceExcellence', statKey: 'evidenceExcellenceCount' }
            ];
            
            this.defaultSettings = {
                enableAnalysis: true,
                analysisMode: 'balanced',
                highlightOpinion: true,
                highlightToBe: true,
                highlightAbsolutes: true,
                highlightPassive: true,
                highlightWeasel: true,
                highlightPresupposition: true,
                highlightMetaphors: true,
                highlightMinimizers: true,
                highlightMaximizers: true,
                highlightFalseBalance: true,
                highlightEuphemism: true,
                highlightEmotional: true,
                highlightGaslighting: true,
                highlightFalseDilemma: true,
                highlightProbability: true,
                highlightAttributionExcellence: true,
                highlightNuanceExcellence: true,
                highlightTransparencyExcellence: true,
                highlightDiscourseExcellence: true,
                highlightEvidenceExcellence: true
            };
            
            this.biasTypes.forEach(bt => {
                if (bt.subCategories) {
                    for (const sub of Object.values(bt.subCategories)) {
                        this.defaultSettings[sub.settingKey] = true;
                    }
                }
            });
            
            // Generate dynamic mappings
            this.toggleMappings = this.generateToggleMappings();
            this.statMappings = this.generateStatMappings();
        }

        generateToggleMappings() {
            const mappings = {
                'enableToggle': 'enableAnalysis'
            };

            this.biasTypes.forEach(biasType => {
                const toggleId = this.getToggleId(biasType.id);
                mappings[toggleId] = biasType.settingKey;
                
                if (biasType.subCategories) {
                    for (const [subId, sub] of Object.entries(biasType.subCategories)) {
                        mappings[`${biasType.id}_${subId}Toggle`] = sub.settingKey;
                    }
                }
            });

            this.excellenceTypes.forEach(excellenceType => {
                const toggleId = this.getExcellenceToggleId(excellenceType.id);
                mappings[toggleId] = excellenceType.settingKey;
            });

            return mappings;
        }

        generateStatMappings() {
            const mappings = {};

            this.biasTypes.forEach(biasType => {
                mappings[biasType.statKey] = biasType.statKey;
                if (biasType.subCategories) {
                    for (const sub of Object.values(biasType.subCategories)) {
                        mappings[sub.statKey] = sub.statKey;
                    }
                }
            });

            this.excellenceTypes.forEach(excellenceType => {
                mappings[excellenceType.statKey] = excellenceType.statKey;
            });

            return mappings;
        }

        getToggleId(biasTypeId) {
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

        getExcellenceToggleId(excellenceTypeId) {
            return `${excellenceTypeId}ExcellenceToggle`;
        }

        getToggleMappings() {
            return this.toggleMappings;
        }

        getStatMappings() {
            return this.statMappings;
        }

        getDefaultSettings() {
            return this.defaultSettings;
        }
    }

    // Initialize settings manager
    const settingsManager = new SettingsManager();
    const toggleMappings = settingsManager.getToggleMappings();
    const statMappings = settingsManager.getStatMappings();

    let currentSettings = {};
    let isUpdating = false;

    // Section toggle mapping: section toggle ID -> child toggle IDs
    const sectionToggleMap = {
        'excellenceSectionToggle': [
            'attributionExcellenceToggle', 'nuanceExcellenceToggle',
            'transparencyExcellenceToggle', 'discourseExcellenceToggle',
            'evidenceExcellenceToggle'
        ],
        'basicSectionToggle': ['opinionToggle', 'ePrimeToggle', 'absoluteToggle'],
        'advancedSectionToggle': ['passiveToggle', 'weaselToggle', 'presuppositionToggle', 'probabilityToggle'],
        'framingSectionToggle': ['metaphorToggle', 'minimizerToggle', 'maximizerToggle', 'falseBalanceToggle', 'euphemismToggle'],
        'manipulationSectionToggle': ['emotionalToggle', 'gaslightingToggle', 'falseDilemmaToggle']
    };

    let customGroups = [];
    let editingGroupId = null;

    // Initialize settings
    loadSettings();

    // Setup event listeners
    setupToggleListeners();
    setupButtonListeners();
    setupCategoryCollapse();
    setupSectionToggles();
    setupModeSelector();
    setupInfoLink();
    loadCustomGroups();
    setupCustomDictionaryUI();

    // Request initial stats
    requestStats();

    function loadSettings() {
        const defaults = settingsManager.getDefaultSettings();
        
        chrome.storage.sync.get(defaults, function(items) {
            currentSettings = items;
            updateUI();
            updateModeUI();
            updateAllSectionToggleStates();
        });
    }

    function updateUI() {
        isUpdating = true;
        
        for (const [toggleId, settingKey] of Object.entries(toggleMappings)) {
            const toggle = document.getElementById(toggleId);
            if (toggle) {
                toggle.checked = currentSettings[settingKey];
            }
        }
        
        settingsManager.biasTypes.forEach(biasType => {
            if (!biasType.subCategories) return;
            const parentEnabled = currentSettings[biasType.settingKey];
            const group = document.querySelector(`.subcategory-group[data-parent="${biasType.id}"]`);
            if (group) {
                group.classList.toggle('disabled', !parentEnabled);
            }
            for (const [subId] of Object.entries(biasType.subCategories)) {
                const subToggle = document.getElementById(`${biasType.id}_${subId}Toggle`);
                if (subToggle) {
                    subToggle.disabled = !parentEnabled;
                }
            }
        });
        
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
        // Set up listeners for all dynamic toggles
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
                    
                    // Sync the enable toggle - refresh turns analysis back on
                    if (response.analysisEnabled !== undefined) {
                        currentSettings.enableAnalysis = response.analysisEnabled;
                        const enableToggle = document.getElementById('enableToggle');
                        if (enableToggle) {
                            isUpdating = true;
                            enableToggle.checked = response.analysisEnabled;
                            isUpdating = false;
                        }
                    }
                    
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
                    
                    // Sync the enable toggle - clear turns analysis off
                    if (response.analysisEnabled !== undefined) {
                        currentSettings.enableAnalysis = response.analysisEnabled;
                        const enableToggle = document.getElementById('enableToggle');
                        if (enableToggle) {
                            isUpdating = true;
                            enableToggle.checked = response.analysisEnabled;
                            isUpdating = false;
                        }
                    }
                    
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
            header.addEventListener('click', function(e) {
                if (e.target.closest('.section-toggle')) return;
                const section = this.parentElement;
                section.classList.toggle('collapsed');
            });
        });
        
        document.querySelectorAll('.toggle-container.has-subcategories').forEach(container => {
            const label = container.querySelector('.toggle-label');
            if (label) {
                label.style.cursor = 'pointer';
                label.addEventListener('click', function(e) {
                    if (e.target.closest('.toggle')) return;
                    const parentId = container.dataset.biasType;
                    const group = document.querySelector(`.subcategory-group[data-parent="${parentId}"]`);
                    if (group) {
                        group.classList.toggle('collapsed');
                        container.classList.toggle('expanded');
                    }
                });
            }
        });
    }
    
    function setupSectionToggles() {
        for (const [sectionToggleId, childToggleIds] of Object.entries(sectionToggleMap)) {
            const sectionToggle = document.getElementById(sectionToggleId);
            if (!sectionToggle) continue;

            // Handle section toggle change
            sectionToggle.addEventListener('change', function() {
                const checked = this.checked;
                isUpdating = true;
                
                childToggleIds.forEach(childId => {
                    const childToggle = document.getElementById(childId);
                    if (childToggle) {
                        childToggle.checked = checked;
                        const settingKey = toggleMappings[childId];
                        if (settingKey) {
                            currentSettings[settingKey] = checked;
                        }
                    }
                });
                
                isUpdating = false;
                
                // Save and send to content script
                chrome.storage.sync.set(currentSettings, function() {
                    sendSettingsToContentScript();
                });
            });

            // When an individual child toggle changes, update the section toggle state
            childToggleIds.forEach(childId => {
                const childToggle = document.getElementById(childId);
                if (childToggle) {
                    childToggle.addEventListener('change', function() {
                        updateSectionToggleState(sectionToggleId, childToggleIds);
                    });
                }
            });
        }
        
        setupParentSubcategoryToggles();
    }
    
    function setupParentSubcategoryToggles() {
        settingsManager.biasTypes.forEach(biasType => {
            if (!biasType.subCategories) return;
            
            const parentToggle = document.getElementById(settingsManager.getToggleId(biasType.id));
            if (!parentToggle) return;
            
            const subToggleIds = Object.keys(biasType.subCategories).map(subId => `${biasType.id}_${subId}Toggle`);
            
            parentToggle.addEventListener('change', function() {
                const checked = this.checked;
                isUpdating = true;
                
                subToggleIds.forEach(subToggleId => {
                    const subToggle = document.getElementById(subToggleId);
                    if (subToggle) {
                        subToggle.checked = checked;
                        subToggle.disabled = !checked;
                        const settingKey = toggleMappings[subToggleId];
                        if (settingKey) {
                            currentSettings[settingKey] = checked;
                        }
                    }
                });
                
                const group = document.querySelector(`.subcategory-group[data-parent="${biasType.id}"]`);
                if (group) {
                    group.classList.toggle('disabled', !checked);
                }
                
                isUpdating = false;
            });
            
            subToggleIds.forEach(subToggleId => {
                const subToggle = document.getElementById(subToggleId);
                if (subToggle) {
                    subToggle.addEventListener('change', function() {
                        if (isUpdating) return;
                        updateParentToggleState(biasType.id, subToggleIds);
                    });
                }
            });
        });
    }
    
    function updateParentToggleState(parentId, subToggleIds) {
        const parentToggle = document.getElementById(settingsManager.getToggleId(parentId));
        if (!parentToggle) return;
        
        const allChecked = subToggleIds.every(id => {
            const el = document.getElementById(id);
            return el && el.checked;
        });
        const noneChecked = subToggleIds.every(id => {
            const el = document.getElementById(id);
            return el && !el.checked;
        });
        
        isUpdating = true;
        parentToggle.checked = !noneChecked;
        parentToggle.indeterminate = !allChecked && !noneChecked;
        isUpdating = false;
    }

    function updateSectionToggleState(sectionToggleId, childToggleIds) {
        const sectionToggle = document.getElementById(sectionToggleId);
        if (!sectionToggle) return;
        
        const allChecked = childToggleIds.every(id => {
            const el = document.getElementById(id);
            return el && el.checked;
        });
        const noneChecked = childToggleIds.every(id => {
            const el = document.getElementById(id);
            return el && !el.checked;
        });
        
        isUpdating = true;
        sectionToggle.checked = allChecked;
        sectionToggle.indeterminate = !allChecked && !noneChecked;
        isUpdating = false;
    }

    function updateAllSectionToggleStates() {
        for (const [sectionToggleId, childToggleIds] of Object.entries(sectionToggleMap)) {
            updateSectionToggleState(sectionToggleId, childToggleIds);
        }
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
        
        // Update stat values dynamically
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

    function loadCustomGroups() {
        chrome.storage.local.get('customGroups', function(data) {
            const stored = data.customGroups;
            if (stored && stored.version === 1 && stored.groups) {
                customGroups = Object.values(stored.groups);
            } else {
                customGroups = [];
            }
            renderCustomGroupToggles();
        });
    }

    function renderCustomGroupToggles() {
        const container = document.getElementById('customGroupToggles');
        if (!container) return;

        if (customGroups.length === 0) {
            container.innerHTML = '<div style="padding: 8px 15px; font-size: 11px; color: #999; text-align: center;">No custom groups yet</div>';
            return;
        }

        container.innerHTML = customGroups.map(group => `
            <div class="toggle-container" data-custom-group="${group.id}">
                <div class="toggle-label" style="cursor: pointer;" data-edit-group="${group.id}">
                    <div class="color-indicator" style="background-color: ${group.color};"></div>
                    <span>${group.name}</span>
                    <span style="font-size: 10px; color: #999; margin-left: 4px;">(${group.words.length})</span>
                </div>
                <label class="toggle">
                    <input type="checkbox" data-custom-toggle="${group.id}" data-setting-key="${group.settingKey}" ${group.enabled ? 'checked' : ''}>
                    <span class="slider"></span>
                </label>
            </div>
        `).join('');

        container.querySelectorAll('[data-edit-group]').forEach(el => {
            el.addEventListener('click', function() {
                openEditor(this.dataset.editGroup);
            });
        });

        container.querySelectorAll('[data-custom-toggle]').forEach(toggle => {
            toggle.addEventListener('change', function() {
                const groupId = this.dataset.customToggle;
                const settingKey = this.dataset.settingKey;
                const enabled = this.checked;

                const group = customGroups.find(g => g.id === groupId);
                if (group) group.enabled = enabled;

                currentSettings[settingKey] = enabled;
                saveCustomGroups();
                chrome.storage.sync.set(currentSettings, function() {
                    sendSettingsToContentScript();
                });
            });
        });
    }

    function setupCustomDictionaryUI() {
        const addBtn = document.getElementById('addCustomGroupBtn');
        if (addBtn) addBtn.addEventListener('click', () => openEditor(null));

        const saveBtn = document.getElementById('saveCustomGroup');
        if (saveBtn) saveBtn.addEventListener('click', saveEditorGroup);

        const cancelBtn = document.getElementById('cancelCustomGroup');
        if (cancelBtn) cancelBtn.addEventListener('click', closeEditor);

        const deleteBtn = document.getElementById('deleteCustomGroup');
        if (deleteBtn) deleteBtn.addEventListener('click', deleteEditorGroup);

        const exportBtn = document.getElementById('exportCustomGroups');
        if (exportBtn) exportBtn.addEventListener('click', exportAllGroups);

        const importBtn = document.getElementById('importCustomGroups');
        if (importBtn) importBtn.addEventListener('click', () => document.getElementById('importFileInput').click());

        const importInput = document.getElementById('importFileInput');
        if (importInput) importInput.addEventListener('change', importGroups);
    }

    function openEditor(groupId) {
        const editor = document.getElementById('customEditor');
        const deleteBtn = document.getElementById('deleteCustomGroup');
        const title = document.getElementById('editorTitle');
        editingGroupId = groupId;

        if (groupId) {
            const group = customGroups.find(g => g.id === groupId);
            if (!group) return;
            title.textContent = 'Edit: ' + group.name;
            document.getElementById('customGroupName').value = group.name;
            document.getElementById('customGroupDesc').value = group.description || '';
            document.getElementById('customGroupColor').value = group.color;
            document.getElementById('customGroupWords').value = (group.words || []).join('\n');
            deleteBtn.style.display = 'block';
        } else {
            title.textContent = 'New Custom Group';
            document.getElementById('customGroupName').value = '';
            document.getElementById('customGroupDesc').value = '';
            document.getElementById('customGroupColor').value = '#e67e22';
            document.getElementById('customGroupWords').value = '';
            deleteBtn.style.display = 'none';
        }

        editor.style.display = 'block';
    }

    function closeEditor() {
        document.getElementById('customEditor').style.display = 'none';
        editingGroupId = null;
    }

    function saveEditorGroup() {
        const name = document.getElementById('customGroupName').value.trim();
        const description = document.getElementById('customGroupDesc').value.trim();
        const color = document.getElementById('customGroupColor').value;
        const wordsText = document.getElementById('customGroupWords').value;
        const words = wordsText.split('\n').map(w => w.trim()).filter(w => w.length > 0);

        if (!name) { alert('Group name is required'); return; }
        if (words.length === 0) { alert('Add at least one word or phrase'); return; }

        if (editingGroupId) {
            const group = customGroups.find(g => g.id === editingGroupId);
            if (group) {
                group.name = name;
                group.description = description;
                group.color = color;
                group.words = words.slice(0, 1000);
                group.hoverContent = { basicTip: description || 'Custom detection: ' + name };
                group.updatedAt = Date.now();
            }
        } else {
            const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '').substring(0, 30);
            const id = 'custom_' + slug + '_' + Date.now();
            customGroups.push({
                id,
                name,
                color,
                description,
                enabled: true,
                words: words.slice(0, 1000),
                hoverContent: { basicTip: description || 'Custom detection: ' + name },
                settingKey: 'highlight_' + id,
                statKey: id + 'Count',
                className: 'bias-highlight-custom-' + id,
                createdAt: Date.now(),
                updatedAt: Date.now()
            });
        }

        saveCustomGroups();
        renderCustomGroupToggles();
        closeEditor();

        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {action: 'reloadCustomDictionaries'});
        });
    }

    function deleteEditorGroup() {
        if (!editingGroupId) return;
        if (!confirm('Delete this custom group?')) return;

        customGroups = customGroups.filter(g => g.id !== editingGroupId);
        saveCustomGroups();
        renderCustomGroupToggles();
        closeEditor();

        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {action: 'reloadCustomDictionaries'});
        });
    }

    function saveCustomGroups() {
        const groups = {};
        let maxCounter = 0;
        customGroups.forEach(g => {
            groups[g.id] = g;
            const match = g.id.match(/_(\d+)$/);
            if (match) maxCounter = Math.max(maxCounter, parseInt(match[1]));
        });
        chrome.storage.local.set({
            customGroups: { version: 1, idCounter: maxCounter, groups }
        });
    }

    function exportAllGroups() {
        if (customGroups.length === 0) { alert('No custom groups to export'); return; }
        const data = {
            version: 1,
            exportedAt: new Date().toISOString(),
            groups: customGroups.map(g => ({
                name: g.name, color: g.color, description: g.description,
                words: g.words, hoverContent: g.hoverContent
            }))
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'custom-dictionaries.json';
        a.click();
        URL.revokeObjectURL(url);
    }

    function importGroups(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const data = JSON.parse(e.target.result);
                if (!data.groups || !Array.isArray(data.groups)) {
                    alert('Invalid import file format');
                    return;
                }
                let imported = 0;
                for (const g of data.groups) {
                    if (!g.name || customGroups.length >= 50) continue;
                    const slug = g.name.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '').substring(0, 30);
                    const id = 'custom_' + slug + '_' + Date.now() + '_' + imported;
                    customGroups.push({
                        id,
                        name: g.name,
                        color: g.color || '#e67e22',
                        description: g.description || '',
                        enabled: true,
                        words: (g.words || []).slice(0, 1000),
                        hoverContent: g.hoverContent || { basicTip: g.description || 'Custom: ' + g.name },
                        settingKey: 'highlight_' + id,
                        statKey: id + 'Count',
                        className: 'bias-highlight-custom-' + id,
                        createdAt: Date.now(),
                        updatedAt: Date.now()
                    });
                    imported++;
                }
                saveCustomGroups();
                renderCustomGroupToggles();
                alert(`Imported ${imported} group(s)`);

                chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, {action: 'reloadCustomDictionaries'});
                });
            } catch (err) {
                alert('Failed to import: ' + err.message);
            }
        };
        reader.readAsText(file);
        event.target.value = '';
    }
});
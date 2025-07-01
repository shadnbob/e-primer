// popup.js - Extension popup interface
document.addEventListener('DOMContentLoaded', function() {
    // Set up category section toggle functionality
    const categoryHeaders = document.querySelectorAll('.category-header');
    categoryHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const section = this.parentElement;
            section.classList.toggle('collapsed');
            console.log('Toggled section:', this.querySelector('span').textContent);
        });
    });
    console.log('Category headers found:', categoryHeaders.length);
    
    // Get toggle elements
    const enableToggle = document.getElementById('enableToggle');
    const opinionToggle = document.getElementById('opinionToggle');
    const ePrimeToggle = document.getElementById('ePrimeToggle');
    const absoluteToggle = document.getElementById('absoluteToggle');
    const passiveToggle = document.getElementById('passiveToggle');
    const weaselToggle = document.getElementById('weaselToggle');
    const presuppositionToggle = document.getElementById('presuppositionToggle');
    const metaphorToggle = document.getElementById('metaphorToggle');
    const minimizerToggle = document.getElementById('minimizerToggle');
    const maximizerToggle = document.getElementById('maximizerToggle');
    const refreshButton = document.getElementById('refreshButton');
    const clearButton = document.getElementById('clearButton');

    // Get stat display elements
    const opinionCount = document.getElementById('opinionCount');
    const toBeCount = document.getElementById('toBeCount');
    const absoluteCount = document.getElementById('absoluteCount');
    const passiveCount = document.getElementById('passiveCount');
    const weaselCount = document.getElementById('weaselCount');
    const presuppositionCount = document.getElementById('presuppositionCount');
    const metaphorCount = document.getElementById('metaphorCount');
    const minimizerCount = document.getElementById('minimizerCount');
    const maximizerCount = document.getElementById('maximizerCount');
    
    // Store last known stats to prevent disappearing
    let lastKnownStats = {
        opinionCount: 0,
        toBeCount: 0,
        absoluteCount: 0,
        passiveCount: 0,
        weaselCount: 0,
        presuppositionCount: 0,
        metaphorCount: 0,
        minimizerCount: 0,
        maximizerCount: 0
    };

    // Load current settings
    chrome.storage.sync.get({
        enableAnalysis: true,
        highlightOpinion: true,
        highlightToBe: true,
        highlightAbsolutes: true,
        highlightPassive: false,
        highlightWeasel: false,
        highlightPresupposition: false,
        highlightMetaphors: false,
        highlightMinimizers: false,
        highlightMaximizers: false
    }, function(items) {
        enableToggle.checked = items.enableAnalysis;
        opinionToggle.checked = items.highlightOpinion;
        ePrimeToggle.checked = items.highlightToBe;
        absoluteToggle.checked = items.highlightAbsolutes;
        passiveToggle.checked = items.highlightPassive;
        weaselToggle.checked = items.highlightWeasel;
        presuppositionToggle.checked = items.highlightPresupposition;
        metaphorToggle.checked = items.highlightMetaphors;
        minimizerToggle.checked = items.highlightMinimizers;
        maximizerToggle.checked = items.highlightMaximizers;

        // Update other toggles' disabled state
        updateTogglesState();
        
        // Load current stats
        updateStats();
    });

    // Function to update the disabled state of other toggles
    function updateTogglesState() {
        const isEnabled = enableToggle.checked;
        opinionToggle.disabled = !isEnabled;
        ePrimeToggle.disabled = !isEnabled;
        absoluteToggle.disabled = !isEnabled;
        passiveToggle.disabled = !isEnabled;
        weaselToggle.disabled = !isEnabled;
        presuppositionToggle.disabled = !isEnabled;
        metaphorToggle.disabled = !isEnabled;
        minimizerToggle.disabled = !isEnabled;
        maximizerToggle.disabled = !isEnabled;
        refreshButton.disabled = !isEnabled;
        clearButton.disabled = !isEnabled;
    }

    // Function to save settings and update content script
    function saveSettingsAndUpdate() {
        const settings = {
            enableAnalysis: enableToggle.checked,
            highlightOpinion: opinionToggle.checked,
            highlightToBe: ePrimeToggle.checked,
            highlightAbsolutes: absoluteToggle.checked,
            highlightPassive: passiveToggle.checked,
            highlightWeasel: weaselToggle.checked,
            highlightPresupposition: presuppositionToggle.checked,
            highlightMetaphors: metaphorToggle.checked,
            highlightMinimizers: minimizerToggle.checked,
            highlightMaximizers: maximizerToggle.checked
        };

        console.log('Saving settings:', settings);

        // Save to storage
        chrome.storage.sync.set(settings, function() {
            console.log('Settings saved to storage');
            
            // Send to content script with a small delay to ensure storage is updated
            setTimeout(() => {
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                    if (tabs[0]) {
                        chrome.tabs.sendMessage(tabs[0].id, {
                            action: "updateSettings",
                            settings: settings
                        }, function(response) {
                            if (chrome.runtime.lastError) {
                                console.log('Error sending message:', chrome.runtime.lastError);
                            } else {
                                console.log('Settings updated successfully:', response);
                                // Update stats after a longer delay to ensure processing is complete
                                setTimeout(updateStats, 1500);
                            }
                        });
                    }
                });
            }, 100);
        });

        updateTogglesState();
    }

    // Function to update stats display
    function updateStats(retryCount = 0) {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            if (tabs[0]) {
                chrome.tabs.sendMessage(tabs[0].id, {
                    action: "getStats"
                }, function(response) {
                    if (chrome.runtime.lastError) {
                        // Tab might not have the content script loaded
                        console.log('Could not get stats:', chrome.runtime.lastError);
                        
                        // Show last known stats or dashes
                        if (Object.values(lastKnownStats).some(v => v > 0)) {
                            displayStats(lastKnownStats);
                        } else {
                            displayStats({
                                opinionCount: '-',
                                toBeCount: '-',
                                absoluteCount: '-',
                                passiveCount: '-',
                                weaselCount: '-',
                                presuppositionCount: '-',
                                metaphorCount: '-',
                                minimizerCount: '-',
                                maximizerCount: '-'
                            });
                        }
                        
                        // Show a hint to the user
                        const troubleshooting = document.querySelector('.troubleshooting p');
                        if (troubleshooting) {
                            troubleshooting.innerHTML = '<strong>Note:</strong> Please refresh the page if stats are not loading.';
                        }
                    } else if (response) {
                        // Update display and store last known stats
                        lastKnownStats = {
                            opinionCount: response.opinionCount || 0,
                            toBeCount: response.toBeCount || 0,
                            absoluteCount: response.absoluteCount || 0,
                            passiveCount: response.passiveCount || 0,
                            weaselCount: response.weaselCount || 0,
                            presuppositionCount: response.presuppositionCount || 0,
                            metaphorCount: response.metaphorCount || 0,
                            minimizerCount: response.minimizerCount || 0,
                            maximizerCount: response.maximizerCount || 0
                        };
                        
                        displayStats(lastKnownStats);
                        
                        console.log('Stats updated:', response);
                        
                        // Clear any error messages
                        const troubleshooting = document.querySelector('.troubleshooting p');
                        if (troubleshooting) {
                            troubleshooting.innerHTML = '<strong>Active:</strong> Highlighting bias indicators in real-time.';
                        }
                    } else if (retryCount < 3) {
                        // Retry a few times if we get an empty response
                        setTimeout(() => updateStats(retryCount + 1), 500);
                    }
                });
            }
        });
    }

    // Function to display stats
    function displayStats(stats) {
        opinionCount.textContent = stats.opinionCount;
        toBeCount.textContent = stats.toBeCount;
        absoluteCount.textContent = stats.absoluteCount;
        passiveCount.textContent = stats.passiveCount;
        weaselCount.textContent = stats.weaselCount;
        presuppositionCount.textContent = stats.presuppositionCount;
        metaphorCount.textContent = stats.metaphorCount;
        minimizerCount.textContent = stats.minimizerCount;
        maximizerCount.textContent = stats.maximizerCount;
    }

    // Event listeners for toggles
    enableToggle.addEventListener('change', function() {
        console.log('Enable toggle changed to:', enableToggle.checked);
        
        // If disabling, clear the last known stats
        if (!enableToggle.checked) {
            lastKnownStats = {
                opinionCount: 0,
                toBeCount: 0,
                absoluteCount: 0,
                passiveCount: 0,
                weaselCount: 0,
                presuppositionCount: 0,
                metaphorCount: 0,
                minimizerCount: 0,
                maximizerCount: 0
            };
        }
        
        saveSettingsAndUpdate();
    });
    
    // Add event listeners for all toggles
    [opinionToggle, ePrimeToggle, absoluteToggle, passiveToggle, weaselToggle, 
     presuppositionToggle, metaphorToggle, minimizerToggle, maximizerToggle].forEach(toggle => {
        toggle.addEventListener('change', function() {
            console.log(`${toggle.id} changed to:`, toggle.checked);
            saveSettingsAndUpdate();
        });
    });

    // Refresh button event listener
    refreshButton.addEventListener('click', function() {
        console.log('Refresh button clicked');
        
        // Disable button temporarily to prevent rapid clicks
        refreshButton.disabled = true;
        refreshButton.textContent = 'Refreshing...';
        
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            if (tabs[0]) {
                chrome.tabs.sendMessage(tabs[0].id, {
                    action: "forceAnalyze"
                }, function(response) {
                    if (chrome.runtime.lastError) {
                        console.log('Error forcing analysis:', chrome.runtime.lastError);
                        // Try reloading content script if error
                        chrome.tabs.reload(tabs[0].id, function() {
                            setTimeout(() => {
                                refreshButton.disabled = false;
                                refreshButton.textContent = 'Refresh Analysis';
                                updateTogglesState();
                            }, 1000);
                        });
                    } else {
                        console.log('Analysis refreshed successfully');
                        setTimeout(() => {
                            updateStats();
                            refreshButton.disabled = false;
                            refreshButton.textContent = 'Refresh Analysis';
                            updateTogglesState();
                        }, 1000);
                    }
                });
            }
        });
    });

    // Clear button event listener
    clearButton.addEventListener('click', function() {
        console.log('Clear button clicked');
        
        // Reset last known stats when clearing
        lastKnownStats = {
            opinionCount: 0,
            toBeCount: 0,
            absoluteCount: 0,
            passiveCount: 0,
            weaselCount: 0,
            presuppositionCount: 0,
            metaphorCount: 0,
            minimizerCount: 0,
            maximizerCount: 0
        };
        
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            if (tabs[0]) {
                chrome.tabs.sendMessage(tabs[0].id, {
                    action: "clearHighlights"
                }, function(response) {
                    if (chrome.runtime.lastError) {
                        console.log('Error clearing highlights:', chrome.runtime.lastError);
                    } else {
                        console.log('Highlights cleared successfully');
                        // Update display immediately to show zeros
                        displayStats(lastKnownStats);
                        
                        setTimeout(updateStats, 100);
                    }
                });
            }
        });
    });

    // Update stats periodically (but not too frequently)
    setInterval(updateStats, 5000);
    
    // Also update stats when popup becomes visible
    document.addEventListener('visibilitychange', function() {
        if (!document.hidden) {
            updateStats();
        }
    });
    
    // Update stats when window gains focus
    window.addEventListener('focus', function() {
        updateStats();
    });
});

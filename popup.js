// popup.js - Extension popup interface
document.addEventListener('DOMContentLoaded', function() {
    // Get toggle elements
    const enableToggle = document.getElementById('enableToggle');
    const opinionToggle = document.getElementById('opinionToggle');
    const ePrimeToggle = document.getElementById('ePrimeToggle');
    const absoluteToggle = document.getElementById('absoluteToggle');
    const refreshButton = document.getElementById('refreshButton');
    const clearButton = document.getElementById('clearButton');

    // Get stat display elements
    const opinionCount = document.getElementById('opinionCount');
    const toBeCount = document.getElementById('toBeCount');
    const absoluteCount = document.getElementById('absoluteCount');
    
    // Store last known stats to prevent disappearing
    let lastKnownStats = {
        opinionCount: 0,
        toBeCount: 0,
        absoluteCount: 0
    };

    // Load current settings
    chrome.storage.sync.get({
        enableAnalysis: true,
        highlightOpinion: true,
        highlightToBe: true,
        highlightAbsolutes: true
    }, function(items) {
        enableToggle.checked = items.enableAnalysis;
        opinionToggle.checked = items.highlightOpinion;
        ePrimeToggle.checked = items.highlightToBe;
        absoluteToggle.checked = items.highlightAbsolutes;

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
        refreshButton.disabled = !isEnabled;
        clearButton.disabled = !isEnabled;
    }

    // Function to save settings and update content script
    function saveSettingsAndUpdate() {
        const settings = {
            enableAnalysis: enableToggle.checked,
            highlightOpinion: opinionToggle.checked,
            highlightToBe: ePrimeToggle.checked,
            highlightAbsolutes: absoluteToggle.checked
        };

        console.log('Saving settings:', settings);

        // Save to storage
        chrome.storage.sync.set(settings, function() {
            console.log('Settings saved successfully');
        });

        // Send to content script
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
                        setTimeout(updateStats, 1000);
                    }
                });
            }
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
                        if (lastKnownStats.opinionCount > 0 || lastKnownStats.toBeCount > 0 || lastKnownStats.absoluteCount > 0) {
                            opinionCount.textContent = lastKnownStats.opinionCount;
                            toBeCount.textContent = lastKnownStats.toBeCount;
                            absoluteCount.textContent = lastKnownStats.absoluteCount;
                        } else {
                            opinionCount.textContent = '—';
                            toBeCount.textContent = '—';
                            absoluteCount.textContent = '—';
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
                            absoluteCount: response.absoluteCount || 0
                        };
                        
                        opinionCount.textContent = lastKnownStats.opinionCount;
                        toBeCount.textContent = lastKnownStats.toBeCount;
                        absoluteCount.textContent = lastKnownStats.absoluteCount;
                        
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

    // Event listeners for toggles
    enableToggle.addEventListener('change', function() {
        console.log('Enable toggle changed to:', enableToggle.checked);
        
        // If disabling, clear the last known stats
        if (!enableToggle.checked) {
            lastKnownStats = {
                opinionCount: 0,
                toBeCount: 0,
                absoluteCount: 0
            };
        }
        
        saveSettingsAndUpdate();
    });
    
    opinionToggle.addEventListener('change', function() {
        console.log('Opinion toggle changed to:', opinionToggle.checked);
        saveSettingsAndUpdate();
    });
    
    ePrimeToggle.addEventListener('change', function() {
        console.log('E-Prime toggle changed to:', ePrimeToggle.checked);
        saveSettingsAndUpdate();
    });
    
    absoluteToggle.addEventListener('change', function() {
        console.log('Absolute toggle changed to:', absoluteToggle.checked);
        saveSettingsAndUpdate();
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
                                refreshButton.textContent = 'Refresh';
                                updateTogglesState();
                            }, 1000);
                        });
                    } else {
                        console.log('Analysis refreshed successfully');
                        setTimeout(() => {
                            updateStats();
                            refreshButton.disabled = false;
                            refreshButton.textContent = 'Refresh';
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
            absoluteCount: 0
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
                        opinionCount.textContent = '0';
                        toBeCount.textContent = '0';
                        absoluteCount.textContent = '0';
                        
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

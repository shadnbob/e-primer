// content/content-script.js - Main content script using refactored architecture
import { BiasDetector } from './BiasDetector.js';
import { BiasConfig } from '../config/BiasConfig.js';
import { getPopupManager } from '../utils/PopupManager.js';

// Main content script using the refactored BiasDetector
(function() {
    'use strict';

    // Initialize the bias detector
    let biasDetector = null;
    let isInitialized = false;

    // Initialize the detector
    function initialize() {
        if (isInitialized) return;
        
        try {
            biasDetector = new BiasDetector();
            
            // Initialize popup manager for efficient popup handling
            const popupManager = getPopupManager();

            setupMessageListeners();
            loadSettingsAndStart();
            isInitialized = true;
            BiasConfig.debugLog('E-Prime Bias Detector initialized successfully');
        } catch (error) {
            console.error('Failed to initialize Bias Detector:', error);
        }
    }

    function loadSettingsAndStart() {
        const defaultSettings = BiasConfig.getDefaultSettings();

        function applySettingsAndStart(items) {
            const validatedSettings = BiasConfig.validateSettings(items);
            biasDetector.updateSettings(validatedSettings).then(() => {
                if (validatedSettings.enableAnalysis) {
                    setTimeout(() => {
                        biasDetector.analyzeDocument();
                        biasDetector.setupMutationObserver();
                    }, 500);
                }
            }).catch(error => {
                console.error('Error updating settings:', error);
                startWithDefaults();
            });
        }

        function startWithDefaults() {
            BiasConfig.debugLog('Starting with default settings');
            setTimeout(() => {
                biasDetector.analyzeDocument();
                biasDetector.setupMutationObserver();
            }, 500);
        }

        try {
            if (typeof browser !== 'undefined' && browser.storage && browser.storage.sync) {
                browser.storage.sync.get(defaultSettings)
                    .then(applySettingsAndStart)
                    .catch(error => {
                        console.warn('Storage get failed (promise):', error);
                        startWithDefaults();
                    });
            } else {
                chrome.storage.sync.get(defaultSettings, (items) => {
                    if (chrome.runtime.lastError) {
                        console.warn('Storage get failed:', chrome.runtime.lastError);
                        startWithDefaults();
                        return;
                    }
                    applySettingsAndStart(items);
                });
            }
        } catch (error) {
            console.warn('Storage API error:', error);
            startWithDefaults();
        }
    }

    // Set up message listeners for communication with popup
    function setupMessageListeners() {
        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            handleMessage(request, sender, sendResponse);
            return true; // Keep channel open for async response
        });
    }

    // Handle messages from popup and other parts of the extension
    async function handleMessage(request, sender, sendResponse) {
        if (!biasDetector) {
            sendResponse({ success: false, error: 'Detector not initialized' });
            return;
        }

        try {
            switch (request.action) {
                case 'updateSettings':
                    await handleUpdateSettings(request, sendResponse);
                    break;

                case 'getStats':
                    handleGetStats(sendResponse);
                    break;

                case 'forceAnalyze':
                    await handleForceAnalyze(sendResponse);
                    break;

                case 'clearHighlights':
                    handleClearHighlights(sendResponse);
                    break;

                case 'getPerformanceMetrics':
                    handleGetPerformanceMetrics(sendResponse);
                    break;

                case 'getPatternStats':
                    handleGetPatternStats(sendResponse);
                    break;

                case 'reloadCustomDictionaries':
                    await handleReloadCustomDictionaries(sendResponse);
                    break;

                default:
                    sendResponse({ success: false, error: 'Unknown action' });
            }
        } catch (error) {
            console.error('Error handling message:', error);
            sendResponse({ success: false, error: error.message });
        }
    }

    // Handle settings update
    async function handleUpdateSettings(request, sendResponse) {
        if (BiasConfig.DEBUG) console.log('Content script received new settings:', request.settings);

        const validatedSettings = BiasConfig.validateSettings(request.settings);
        await biasDetector.updateSettings(validatedSettings);
        
        // Get stats after settings update is fully complete
        const stats = biasDetector.getStats();
        sendResponse({ 
            success: true, 
            stats: stats,
            message: 'Settings updated successfully' 
        });
    }

    // Handle stats request
    function handleGetStats(sendResponse) {
        const stats = biasDetector.getStats();
        if (BiasConfig.DEBUG) console.log('Sending stats:', stats);
        sendResponse(stats);
    }

    // Handle force analyze request - also re-enables analysis
    async function handleForceAnalyze(sendResponse) {
        BiasConfig.debugLog('Force analyze requested - enabling analysis');
        
        try {
            // Disconnect observer FIRST to prevent race conditions
            // where clearing highlights triggers mutations that re-analyze
            biasDetector.disconnectObserver();
            biasDetector.clearHighlights();
            
            // Re-enable analysis
            biasDetector.settings.enableAnalysis = true;
            
            // Persist enabled state to storage so popup toggle stays in sync
            chrome.storage.sync.set({ enableAnalysis: true });
            
            // Small delay to ensure DOM is settled after highlight removal
            await new Promise(resolve => setTimeout(resolve, 50));
            
            const stats = await biasDetector.forceAnalyze();
            biasDetector.setupMutationObserver();
            
            sendResponse({ 
                success: true, 
                stats: stats,
                analysisEnabled: true,
                message: 'Analysis completed successfully' 
            });
        } catch (error) {
            console.error('Force analyze failed:', error);
            // Try to restore observer even on failure
            try { biasDetector.setupMutationObserver(); } catch(e) {}
            sendResponse({ 
                success: false, 
                error: error.message 
            });
        }
    }

    // Handle clear highlights request - also disables analysis
    function handleClearHighlights(sendResponse) {
        BiasConfig.debugLog('Clear highlights requested - disabling analysis');
        
        // Disconnect observer FIRST to prevent mutation-triggered re-analysis
        biasDetector.disconnectObserver();
        biasDetector.clearHighlights();
        
        // Disable analysis in detector settings
        biasDetector.settings.enableAnalysis = false;
        
        // Persist disabled state to storage so popup toggle stays in sync
        chrome.storage.sync.set({ enableAnalysis: false });
        
        const stats = biasDetector.getStats();
        
        sendResponse({ 
            success: true, 
            stats: stats,
            analysisEnabled: false,
            message: 'Highlights cleared and analysis disabled' 
        });
    }

    // Handle performance metrics request
    function handleGetPerformanceMetrics(sendResponse) {
        const metrics = biasDetector.getPerformanceMetrics();
        sendResponse({ success: true, metrics: metrics });
    }

    async function handleReloadCustomDictionaries(sendResponse) {
        try {
            const manager = biasDetector.getCustomDictionaryManager();
            await manager.load();
            biasDetector._injectCustomCSS();
            await biasDetector.forceAnalyze();
            const stats = biasDetector.getStats();
            sendResponse({ success: true, stats });
        } catch (error) {
            console.error('Failed to reload custom dictionaries:', error);
            sendResponse({ success: false, error: error?.message ?? String(error) });
        }
    }

    // Handle pattern stats request
    function handleGetPatternStats(sendResponse) {
        const stats = biasDetector.getPatternStats();
        sendResponse({ success: true, stats: stats });
    }

    // Handle page unload
    function handleUnload() {
        if (biasDetector) {
            biasDetector.destroy();
            biasDetector = null;
            isInitialized = false;
        }
    }

    // Error handling for the content script.
    // Re-initializing tears down every highlight and re-scans the whole
    // document, so it must only ever run for OUR failures — and only a few
    // times, in case the failure is persistent.
    const MAX_REINIT_ATTEMPTS = 3;
    let reinitAttempts = 0;

    function handleError(error) {
        console.error('E-Prime Bias Detector error:', error);

        if (reinitAttempts >= MAX_REINIT_ATTEMPTS) {
            console.error('E-Prime Bias Detector: giving up after repeated failures');
            return;
        }
        reinitAttempts++;

        // Try to recover by reinitializing
        if (biasDetector) {
            try {
                biasDetector.destroy();
            } catch (e) {
                console.error('Error during cleanup:', e);
            }
        }

        biasDetector = null;
        isInitialized = false;

        // Attempt to reinitialize after a delay
        setTimeout(() => {
            BiasConfig.debugLog('Attempting to reinitialize Bias Detector...');
            initialize();
        }, 1000);
    }

    // window error/unhandledrejection events fire for the PAGE's own script
    // errors too (ads, analytics, the site itself). Reacting to those put the
    // extension in a permanent teardown/re-scan loop on error-heavy sites, so
    // only handle events attributable to this extension's code.
    const extensionOrigin = (() => {
        try {
            return chrome.runtime.getURL('');
        } catch (e) {
            return null;
        }
    })();

    function isOwnError(sourceOrStack) {
        return Boolean(
            extensionOrigin &&
            typeof sourceOrStack === 'string' &&
            sourceOrStack.includes(extensionOrigin)
        );
    }

    window.addEventListener('error', (event) => {
        const stack = event.error && event.error.stack;
        if (!isOwnError(event.filename) && !isOwnError(stack)) return;
        handleError(event.error || event.message);
    });
    window.addEventListener('unhandledrejection', (event) => {
        const stack = event.reason && event.reason.stack;
        if (!isOwnError(stack)) return;
        handleError(event.reason);
    });

    // Set up page unload handling
    window.addEventListener('beforeunload', handleUnload);

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        // DOM already loaded
        initialize();
    }

    // Also initialize after a short delay to handle dynamic content
    setTimeout(initialize, 100);

    // Expose global methods for debugging (only in development)
    if (window.location.hostname === 'localhost' || window.location.hostname.includes('test')) {
        window.ePrimeDebug = {
            getDetector: () => biasDetector,
            getStats: () => biasDetector ? biasDetector.getStats() : null,
            getMetrics: () => biasDetector ? biasDetector.getPerformanceMetrics() : null,
            reinitialize: () => {
                handleUnload();
                setTimeout(initialize, 100);
            }
        };
    }

})();

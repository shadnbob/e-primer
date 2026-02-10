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
            console.log('PopupManager initialized');
            
            setupMessageListeners();
            loadSettingsAndStart();
            isInitialized = true;
            console.log('E-Prime Bias Detector initialized successfully');
        } catch (error) {
            console.error('Failed to initialize Bias Detector:', error);
        }
    }

    // Load settings and start analysis if enabled
    function loadSettingsAndStart() {
        const defaultSettings = BiasConfig.getDefaultSettings();
        
        chrome.storage.sync.get(defaultSettings, (items) => {
            const validatedSettings = BiasConfig.validateSettings(items);
            biasDetector.updateSettings(validatedSettings).then(() => {
                if (validatedSettings.enableAnalysis) {
                    // Small delay to let the page load
                    setTimeout(() => {
                        biasDetector.analyzeDocument();
                        biasDetector.setupMutationObserver();
                    }, 500);
                }
            }).catch(error => {
                console.error('Error updating settings:', error);
            });
        });
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
        console.log('Content script received new settings:', request.settings);

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
        console.log('Sending stats:', stats);
        sendResponse(stats);
    }

    // Handle force analyze request - also re-enables analysis
    async function handleForceAnalyze(sendResponse) {
        console.log('Force analyze requested - enabling analysis');
        
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
        console.log('Clear highlights requested - disabling analysis');
        
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

    // Error handling for the content script
    function handleError(error) {
        console.error('E-Prime Bias Detector error:', error);
        
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
            console.log('Attempting to reinitialize Bias Detector...');
            initialize();
        }, 1000);
    }

    // Set up error handling
    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', (event) => {
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

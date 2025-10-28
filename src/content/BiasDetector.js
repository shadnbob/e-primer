// content/BiasDetector.js - Refactored core detection class
import { BiasConfig } from '../config/BiasConfig.js';
import { BiasPatterns } from '../dictionaries/index.js';
import { DOMProcessor } from '../utils/DOMProcessor.js';
import { PerformanceMonitor } from '../utils/PerformanceMonitor.js';
import { ExcellenceDetector } from '../utils/ExcellenceDetector.js';
import { ContextAwareDetector } from '../utils/ContextAwareDetector.js';

export class BiasDetector {
    constructor() {
        this.settings = BiasConfig.getDefaultSettings();
        this.patterns = new BiasPatterns();
        this.domProcessor = new DOMProcessor();
        this.excellenceDetector = new ExcellenceDetector();
        this.contextAwareDetector = new ContextAwareDetector();
        this.stats = this.createEmptyStats();
        this.observer = null;
        this.performanceMonitor = new PerformanceMonitor();
        this.mode = this.settings.analysisMode || 'balanced'; // 'problems', 'excellence', or 'balanced'

        // Pre-compile all patterns for better performance
        this.compiledDetectors = this.initializeDetectors();
    }

    // Initialize all bias detectors with compiled patterns
    initializeDetectors() {
        const detectors = new Map();
        
        for (const [key, config] of Object.entries(BiasConfig.BIAS_TYPES)) {
            const patterns = this.patterns.getCompiledPatterns(config.id);
            detectors.set(config.id, {
                ...config,
                patterns,
                isEnabled: () => this.settings[config.settingKey],
                detect: (text) => this.detectPatterns(text, patterns, config.id)
            });
        }
        
        return detectors;
    }

    // Generic pattern detection method
    detectPatterns(text, patterns, type) {
        const matches = [];
        
        for (const pattern of patterns) {
            try {
                let match;
                // Reset regex lastIndex to avoid issues with global flag
                pattern.regex.lastIndex = 0;
                
                while ((match = pattern.regex.exec(text)) !== null) {
                    const matchData = {
                        index: match.index,
                        length: match[0].length,
                        text: match[0],
                        type: type,
                        pattern: pattern.source
                    };
                    
                    // For opinion words, enrich with sub-category information
                    if (type === 'opinion') {
                        const subCategory = this.patterns.getOpinionSubCategory(match[0]);
                        if (subCategory) {
                            matchData.type = `opinion_${subCategory.id}`;
                            matchData.subCategory = subCategory;
                        }
                    }
                    
                    matches.push(matchData);
                    
                    // Prevent infinite loops with zero-width matches
                    if (match.index === pattern.regex.lastIndex) {
                        pattern.regex.lastIndex++;
                    }
                }
            } catch (error) {
                // Defensive error handling - avoid potential instanceof issues
                const errorMessage = error && error.message ? error.message : String(error);
                console.warn(`Error with pattern ${pattern.source}:`, errorMessage);
                continue;
            }
        }
        
        return matches;
    }

    // Main analysis method - now more efficient
    async analyzeDocument() {
        if (!this.settings.enableAnalysis) {
            return this.createEmptyStats();
        }

        this.performanceMonitor.start('document-analysis');
        
        try {
            // Clear existing highlights first
            this.domProcessor.removeAllHighlights();
            this.resetStats();

            // Get text nodes efficiently
            const textNodes = this.domProcessor.collectTextNodes(document.body);
            console.log(`Processing ${textNodes.length} text nodes`);

            // Process in batches for better performance
            const batchSize = BiasConfig.PERFORMANCE.BATCH_SIZE;
            for (let i = 0; i < textNodes.length; i += batchSize) {
                const batch = textNodes.slice(i, i + batchSize);
                await this.processBatch(batch);
                
                // Allow UI to update between batches
                if (i % (batchSize * 4) === 0) {
                    await new Promise(resolve => setTimeout(resolve, 0));
                }
            }

            const duration = this.performanceMonitor.end('document-analysis');
            console.log(`Analysis completed in ${duration.toFixed(2)}ms`);
            
            return this.stats;
            
        } catch (error) {
            // Defensive error handling - avoid potential instanceof issues
            const errorMessage = error && error.message ? error.message : String(error);
            console.error('Document analysis failed:', errorMessage);
            return this.createEmptyStats();
        }
    }

    // Process a batch of text nodes
    async processBatch(textNodes) {
        for (const node of textNodes) {
            try {
                await this.processTextNode(node);
            } catch (error) {
                // Defensive error handling - avoid potential instanceof issues
                const errorMessage = error && error.message ? error.message : String(error);
                console.warn('Error processing text node:', errorMessage);
                continue;
            }
        }
    }

    // Process a single text node with all enabled detectors
    async processTextNode(node) {
        const text = node.textContent;
        
        // Skip very short or likely UI text
        if (text.trim().length < BiasConfig.PERFORMANCE.MIN_SIGNIFICANT_TEXT || this.isUIText(text)) {
            return;
        }

        const allMatches = [];
        const mode = this.settings.analysisMode || 'balanced';

        // Detect problems if mode is 'problems' or 'balanced'
        if (mode === 'problems' || mode === 'balanced') {
            // Run all enabled detectors
            for (const [type, detector] of this.compiledDetectors) {
                if (detector.isEnabled()) {
                    const matches = detector.detect(text);
                    // Add intensity for problem patterns
                    const matchesWithIntensity = matches.map(match => ({
                        ...match,
                        type: type,
                        intensity: this.excellenceDetector.calculateIntensity(match.text, type),
                        portrayal: this.excellenceDetector.detectPortrayal(match.text)
                    }));
                    allMatches.push(...matchesWithIntensity);
                }
            }
            
            // Run context-aware detection for overlapping patterns
            const contextualMatches = this.contextAwareDetector.detectAll(text);
            for (const match of contextualMatches) {
                // Convert contextual matches to standard format
                const standardMatch = {
                    index: match.index,
                    length: match.length,
                    text: match.text,
                    type: match.classification === 'weasel' ? 'weasel' : match.classification,
                    isContextual: true,
                    contextReasoning: match.reasoning,
                    confidence: match.confidence
                };
                
                // Only add as problem if classified as weasel or other bias type
                if (match.classification === 'weasel' || match.classification === 'bias') {
                    standardMatch.intensity = 2; // Default to medium intensity
                    allMatches.push(standardMatch);
                }
            }
        }
        
        // Detect excellence if mode is 'excellence' or 'balanced'
        if (mode === 'excellence' || mode === 'balanced') {
            const excellenceMatches = this.excellenceDetector.findExcellence(text);
            // Filter excellence matches based on settings
            const enabledExcellence = excellenceMatches.filter(match => {
                const config = BiasConfig.EXCELLENCE_TYPES[match.type.toUpperCase()];
                return config && this.settings[config.settingKey] !== false;
            });
            allMatches.push(...enabledExcellence);
            
            // Add contextual excellence matches
            const contextualMatches = this.contextAwareDetector.detectAll(text);
            for (const match of contextualMatches) {
                if (match.classification === 'excellence') {
                    const excellenceMatch = {
                        index: match.index,
                        length: match.length,
                        text: match.text,
                        type: 'nuance', // Map to existing excellence type
                        className: 'excellence-nuance',
                        tooltip: `✓ ${match.reasoning}`,
                        isExcellence: true,
                        isContextual: true,
                        confidence: match.confidence
                    };
                    allMatches.push(excellenceMatch);
                }
            }
        }

        if (allMatches.length > 0) {
            this.highlightMatches(node, allMatches);
        }
    }

    // Highlight matches in a text node
    highlightMatches(node, matches) {
        // Sort matches by index and remove overlaps
        const sortedMatches = this.deduplicateMatches(matches);
        
        if (sortedMatches.length === 0) return;

        // Create document fragment with highlighted content
        const fragment = this.domProcessor.createHighlightedFragment(
            node.textContent, 
            sortedMatches
        );

        // Update stats
        for (const match of sortedMatches) {
            this.updateStats(match);
        }

        // Replace the original node
        if (node.parentNode) {
            node.parentNode.replaceChild(fragment, node);
        }
    }

    // Remove overlapping matches, preferring contextual matches and higher confidence
    deduplicateMatches(matches) {
        const sorted = matches.sort((a, b) => {
            if (a.index !== b.index) return a.index - b.index;
            
            // Prefer contextual matches over regular matches
            if (a.isContextual && !b.isContextual) return -1;
            if (!a.isContextual && b.isContextual) return 1;
            
            // If both contextual, prefer higher confidence
            if (a.isContextual && b.isContextual) {
                const aConf = a.confidence || 0.5;
                const bConf = b.confidence || 0.5;
                if (aConf !== bConf) return bConf - aConf;
            }
            
            return b.length - a.length; // Prefer longer matches
        });

        // Resolve conflicts using context-aware detector
        const contextualMatches = matches.filter(m => m.isContextual);
        const regularMatches = matches.filter(m => !m.isContextual);
        
        if (contextualMatches.length > 0) {
            const resolved = this.contextAwareDetector.resolveConflicts([...contextualMatches, ...regularMatches]);
            return resolved.sort((a, b) => a.index - b.index);
        }

        // Fall back to simple deduplication
        const deduplicated = [];
        let lastEnd = -1;

        for (const match of sorted) {
            if (match.index >= lastEnd) {
                deduplicated.push(match);
                lastEnd = match.index + match.length;
            }
        }

        return deduplicated;
    }

    // Update settings with selective highlighting
    async updateSettings(newSettings) {
        const oldSettings = { ...this.settings };
        this.settings = { ...newSettings };
        

        // Handle analysis enable/disable
        if (oldSettings.enableAnalysis !== newSettings.enableAnalysis) {
            if (!newSettings.enableAnalysis) {
                this.domProcessor.removeAllHighlights();
                this.resetStats();
                this.disconnectObserver();
                return;
            } else {
                await this.analyzeDocument();
                this.setupMutationObserver();
                return;
            }
        }

        // Handle individual detector changes
        if (newSettings.enableAnalysis) {
            await this.handleDetectorChanges(oldSettings, newSettings);
        }
    }

    // Handle changes to individual detectors
    async handleDetectorChanges(oldSettings, newSettings) {
        let needsReanalysis = false;

        for (const [key, detector] of this.compiledDetectors) {
            const settingKey = detector.settingKey;
            
            if (oldSettings[settingKey] !== newSettings[settingKey]) {
                if (!newSettings[settingKey]) {
                    // Detector disabled - remove its highlights
                    this.domProcessor.removeSpecificHighlights(detector.id);
                    this.stats[detector.statKey] = 0;
                } else {
                    // Detector enabled - need reanalysis
                    needsReanalysis = true;
                }
            }
        }

        if (needsReanalysis) {
            // Re-analyze but preserve stats for disabled detectors
            await this.analyzeDocumentPreservingDisabled();
        }
    }

    // Analyze document while preserving stats for disabled detectors
    async analyzeDocumentPreservingDisabled() {
        // Store current disabled detector stats
        const preservedStats = {};
        for (const [key, detector] of this.compiledDetectors) {
            if (!detector.isEnabled()) {
                preservedStats[detector.statKey] = this.stats[detector.statKey];
            }
        }

        // Run normal analysis
        await this.analyzeDocument();

        // Restore stats for disabled detectors
        for (const [statKey, value] of Object.entries(preservedStats)) {
            this.stats[statKey] = value;
        }
    }

    // Utility methods
    // Fixed isUIText function - more targeted filtering
    isUIText(text) {
        const trimmed = text.trim();

        // Skip very short text (likely UI elements)
        if (trimmed.length < 3) {
            return true;
        }

        // Skip pure numbers, punctuation, or symbols
        if (/^[\d\s\-\+\(\)]+$/.test(trimmed)) {
            return true; // Phone numbers, math, etc.
        }

        // Skip short ALL CAPS text (likely buttons/labels)
        if (/^[A-Z\s]{2,8}$/.test(trimmed) && trimmed.length <= 8) {
            return true; // "OK", "SUBMIT", "CANCEL", etc.
        }

        // Skip common UI text patterns
        if (/^(ok|yes|no|submit|cancel|close|back|next|prev|home|menu)$/i.test(trimmed)) {
            return true;
        }

        // Allow everything else (including single content words)
        return false;
    }

    updateStats(match) {
        if (match.isExcellence) {
            const config = BiasConfig.EXCELLENCE_TYPES[match.type.toUpperCase()];
            if (config && config.statKey) {
                this.stats[config.statKey] = (this.stats[config.statKey] || 0) + 1;
            }
        } else {
            // For opinion sub-categories, map back to the original 'opinion' type for stats
            const originalType = match.type.startsWith('opinion_') ? 'opinion' : match.type;
            const detector = this.compiledDetectors.get(originalType);
            if (detector && detector.statKey) {
                this.stats[detector.statKey]++;
            }
        }
        
        // Recalculate health score
        const excellenceCount = Object.values(BiasConfig.EXCELLENCE_TYPES)
            .reduce((sum, config) => sum + (this.stats[config.statKey] || 0), 0);
        const problemCount = Object.values(BiasConfig.BIAS_TYPES)
            .reduce((sum, config) => sum + (this.stats[config.statKey] || 0), 0);
        
        this.stats.healthScore = this.excellenceDetector.calculateHealthScore(excellenceCount, problemCount);
    }

    resetStats() {
        this.stats = this.createEmptyStats();
    }

    createEmptyStats() {
        return BiasConfig.createEmptyStats();
    }

    // Mutation observer setup
    setupMutationObserver() {
        if (this.observer) {
            this.observer.disconnect();
        }

        let debounceTimer = null;
        
        this.observer = new MutationObserver((mutations) => {
            if (this.shouldProcessMutations(mutations)) {
                clearTimeout(debounceTimer);
                debounceTimer = setTimeout(() => {
                    this.handleContentChange(mutations);
                }, BiasConfig.PERFORMANCE.MUTATION_DEBOUNCE);
            }
        });

        this.observer.observe(document.body, {
            childList: true,
            subtree: true,
            characterData: true
        });
    }

    shouldProcessMutations(mutations) {
        return mutations.some(mutation => {
            // Skip our own highlights
            if (this.domProcessor.isOwnHighlight(mutation.target)) {
                return false;
            }

            // Check for significant content changes
            return mutation.addedNodes.length > 0 &&
                Array.from(mutation.addedNodes).some(node => 
                    this.domProcessor.isSignificantContent(node)
                );
        });
    }

    async handleContentChange(mutations) {
        console.log('Content changed, processing updates...');
        
        // Extract only the changed nodes for processing
        const changedNodes = this.domProcessor.extractChangedTextNodes(mutations);
        
        if (changedNodes.length > 0) {
            await this.processBatch(changedNodes);
        }
    }

    disconnectObserver() {
        if (this.observer) {
            this.observer.disconnect();
            this.observer = null;
        }
    }

    // Public API methods
    getStats() {
        return { ...this.stats };
    }

    async forceAnalyze() {
        return await this.analyzeDocument();
    }

    clearHighlights() {
        this.domProcessor.removeAllHighlights();
        this.resetStats();
    }

    // Debug methods
    getPerformanceMetrics() {
        return this.performanceMonitor.getMetrics();
    }

    getPatternStats() {
        return this.patterns.getPatternStats();
    }

    // Cleanup
    destroy() {
        this.disconnectObserver();
        this.domProcessor.removeAllHighlights();
        this.performanceMonitor.cleanup();
    }
}

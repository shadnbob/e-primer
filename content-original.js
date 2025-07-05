// content-fixed.js - Fixed version with improved pattern handling and debugging
(function() {
    'use strict';


    // Debug mode - set to true to see detailed logging
    const DEBUG_MODE = true;

    function debugLog(...args) {
        if (DEBUG_MODE) {
            console.log('[E-Prime Debug]', ...args);
        }
    }

    // ============================================================================
    // BIAS CONFIGURATION - Centralized configuration management
    // ============================================================================
    const BiasConfig = {
        BIAS_TYPES: {
            OPINION: {
                id: 'opinion',
                name: 'Opinion Words',
                description: 'Subjective language and evaluative terms',
                category: 'basic',
                color: '#ff8c00',
                className: 'bias-highlight-opinion',
                settingKey: 'highlightOpinion',
                statKey: 'opinionCount',
                enabled: true,
                tooltip: 'Subjective language that reveals the writer\'s stance'
            },

            TO_BE: {
                id: 'tobe',
                name: 'To-Be Verbs (E-Prime)',
                description: 'Forms of "to be" that can create false equivalencies',
                category: 'basic',
                color: '#87ceeb',
                className: 'bias-highlight-tobe',
                settingKey: 'highlightToBe',
                statKey: 'toBeCount',
                enabled: true,
                tooltip: 'E-Prime: Avoiding "to be" verbs for more precise language'
            },

            ABSOLUTE: {
                id: 'absolute',
                name: 'Absolute Statements',
                description: 'Universal quantifiers and categorical claims',
                category: 'basic',
                color: '#ff69b4',
                className: 'bias-highlight-absolute',
                settingKey: 'highlightAbsolutes',
                statKey: 'absoluteCount',
                enabled: true,
                tooltip: 'Absolute terms that rarely reflect reality accurately'
            },

            PASSIVE: {
                id: 'passive',
                name: 'Passive Voice',
                description: 'Constructions that obscure who performs actions',
                category: 'advanced',
                color: '#800080',
                className: 'bias-highlight-passive',
                settingKey: 'highlightPassive',
                statKey: 'passiveCount',
                enabled: false,
                tooltip: 'Passive voice can hide responsibility and agency'
            },

            WEASEL: {
                id: 'weasel',
                name: 'Weasel Words',
                description: 'Vague attributions and unsupported claims',
                category: 'advanced',
                color: '#b8860b',
                className: 'bias-highlight-weasel',
                settingKey: 'highlightWeasel',
                statKey: 'weaselCount',
                enabled: false,
                tooltip: 'Phrases that avoid specificity and concrete sources'
            },

            PRESUPPOSITION: {
                id: 'presupposition',
                name: 'Presuppositions',
                description: 'Words that smuggle in hidden assumptions',
                category: 'advanced',
                color: '#ff1493',
                className: 'bias-highlight-presupposition',
                settingKey: 'highlightPresupposition',
                statKey: 'presuppositionCount',
                enabled: false,
                tooltip: 'Language that makes readers accept premises without realizing it'
            },

            METAPHOR: {
                id: 'metaphor',
                name: 'War Metaphors',
                description: 'Militaristic language for non-military topics',
                category: 'framing',
                color: '#dc143c',
                className: 'bias-highlight-metaphor',
                settingKey: 'highlightMetaphors',
                statKey: 'metaphorCount',
                enabled: false,
                tooltip: 'Military metaphors that frame issues as conflicts'
            },

            MINIMIZER: {
                id: 'minimizer',
                name: 'Minimizers',
                description: 'Language that downplays significance',
                category: 'framing',
                color: '#008080',
                className: 'bias-highlight-minimizer',
                settingKey: 'highlightMinimizers',
                statKey: 'minimizerCount',
                enabled: false,
                tooltip: 'Words that dismiss or trivialize legitimate concerns'
            },

            MAXIMIZER: {
                id: 'maximizer',
                name: 'Maximizers',
                description: 'Exaggeration and hyperbolic language',
                category: 'framing',
                color: '#ff4500',
                className: 'bias-highlight-maximizer',
                settingKey: 'highlightMaximizers',
                statKey: 'maximizerCount',
                enabled: false,
                tooltip: 'Hyperbolic language that creates false urgency'
            },

            FALSE_BALANCE: {
                id: 'falsebalance',
                name: 'False Balance',
                description: 'Artificial balance between unequal positions',
                category: 'manipulation',
                color: '#4b0082',
                className: 'bias-highlight-falsebalance',
                settingKey: 'highlightFalseBalance',
                statKey: 'falseBalanceCount',
                enabled: false,
                tooltip: 'Language that creates false equivalence between positions'
            },

            EUPHEMISM: {
                id: 'euphemism',
                name: 'Euphemisms',
                description: 'Language that obscures harsh realities',
                category: 'manipulation',
                color: '#006400',
                className: 'bias-highlight-euphemism',
                settingKey: 'highlightEuphemism',
                statKey: 'euphemismCount',
                enabled: false,
                tooltip: 'Euphemisms and dysphemisms that manipulate perception'
            },

            EMOTIONAL: {
                id: 'emotional',
                name: 'Emotional Manipulation',
                description: 'Appeals designed to trigger emotional responses',
                category: 'manipulation',
                color: '#ff7f50',
                className: 'bias-highlight-emotional',
                settingKey: 'highlightEmotional',
                statKey: 'emotionalCount',
                enabled: false,
                tooltip: 'Language designed to manipulate through emotion'
            },

            GASLIGHTING: {
                id: 'gaslighting',
                name: 'Gaslighting',
                description: 'Phrases that undermine perception and memory',
                category: 'manipulation',
                color: '#800000',
                className: 'bias-highlight-gaslighting',
                settingKey: 'highlightGaslighting',
                statKey: 'gaslightingCount',
                enabled: false,
                tooltip: 'Language that questions reality and undermines confidence'
            },

            FALSE_DILEMMA: {
                id: 'falsedilemma',
                name: 'False Dilemmas',
                description: 'Language that forces artificial binary choices',
                category: 'manipulation',
                color: '#9400d3',
                className: 'bias-highlight-falsedilemma',
                settingKey: 'highlightFalseDilemma',
                statKey: 'falseDilemmaCount',
                enabled: false,
                tooltip: 'Forcing false either/or choices'
            }
        },

        PERFORMANCE: {
            BATCH_SIZE: 50,
            MUTATION_DEBOUNCE: 1000,
            MIN_SIGNIFICANT_TEXT: 5
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
    // IMPROVED DICTIONARIES - Better pattern handling for plurals and variations
    // ============================================================================
    const Dictionary = {
        opinion: [
            // Certainty/Conviction Adverbs - with variations
            "clearly?", "obviously?", "undoubtedly?", "certainly?", "definitely?", "absolutely?",
            "surely?", "undeniably?", "unquestionably?", "indisputably?", "indubitably?", "unmistakably?",
            "incontrovertibly?", "incontestably?", "irrefutably?", "manifestly?", "patently?",

            // Hedging/Uncertainty Words
            "allegedly?", "supposedly?", "apparently?", "evidently?", "arguably?", "seemingly?",
            "ostensibly?", "reportedly?", "reputedly?", "presumably?", "purportedly?",

            // Evaluative Adjectives (Positive) - with plurals
            "goods?", "greats?", "excellents?", "exceptionals?", "outstandings?", "perfects?", "flawless",
            "fantastics?", "superbs?", "magnificents?", "brilliants?", "spectaculars?", "impressives?",
            "remarkables?", "extraordinar(?:y|ies)", "astonishings?", "wonderfuls?", "marvelous", "phenomenals?",
            "terrifics?", "stunnings?", "amazings?", "incredibles?", "fabulous", "splendids?", "delightfuls?",
            "admirables?", "commendables?", "praiseworthys?", "exemplar(?:y|ies)", "stellars?", "superiors?",

            // Evaluative Adjectives (Negative) - with plurals
            "bads?", "terribles?", "awfuls?", "horribles?", "atrocious", "dreadfuls?", "appallings?",
            "abystemals?", "poors?", "inadequates?", "inferiors?", "substandardd?", "mediocres?", "disappointings?",
            "unsatisfactor(?:y|ies)", "unacceptables?", "deficients?", "faultys?", "flaweds?", "shoddys?",
            "deplorables?", "lamentables?", "pathetics?", "pitifuls?", "regrettables?", "miserables?",

            // Political/Controversial Framing
            "controversials?", "disputeds?", "radicals?", "extremes?", "progressives?", "conservatives?",
            "liberals?", "far-rights?", "far-lefts?", "moderates?", "centrists?", "mainstreams?", "fringes?",

            // Intensifiers
            "very", "extremely?", "incredibly?", "exceptionally?", "extraordinarily?", "remarkably?",
            "notably?", "particularly?", "especially?", "surprisingly?", "unusually?", "strikingly?"
        ],

        tobe: [
            "is", "are", "am", "was", "were", "be", "being", "been",
            "it's", "that's", "he's", "she's", "what's", "who's",
            "you're", "they're", "we're", "i'm", "there's", "here's"
        ],

        absolute: [
            // Universal Quantifiers - improved patterns
            "(?:all|every|each|any|no|none)(?:\\s+\\w+)?",
            "(?:everyone|everybody|no\\s+one|nobody|anyone|anybody|someone|somebody)",
            "(?:always|never|forever|eternal|constantly|perpetually|continually|endlessly|ceaselessly|permanently|invariably)",
            "(?:completely|totally|entirely|absolutely|perfectly|wholly|thoroughly|ultimately|fundamentally|purely|outright|comprehensively|universally)",
            "(?:everything|nothing|anything|something)",
            // Absolute adjectives with variations
            "(?:perfect|complete|total|absolute|entire|full|whole|ultimate|maximum|minimum|supreme|extreme|utmost|final|infallible|unerring|universal|impossible|inevitable|inescapable|undeniable|irrefutable|identical|pure|sheer|mere)s?"
        ],

        passive: [
            "was\\s+\\w+ed", "were\\s+\\w+ed", "has\\s+been\\s+\\w+ed", "have\\s+been\\s+\\w+ed",
            "had\\s+been\\s+\\w+ed", "is\\s+being\\s+\\w+ed", "are\\s+being\\s+\\w+ed",
            "will\\s+be\\s+\\w+ed", "would\\s+be\\s+\\w+ed", "can\\s+be\\s+\\w+ed",
            "mistakes\\s+were\\s+made", "concerns\\s+have\\s+been\\s+raised"
        ],

        weasel: [
            "many people say", "some say", "experts believe", "studies show",
            "it is said", "they say", "people think", "some argue",
            "critics claim", "supporters maintain", "sources indicate",
            "reportedly", "allegedly", "supposedly", "it is believed"
        ],

        presupposition: [
            "even", "still", "another", "finally", "already", "yet", "again",
            "continues\\s+to", "refuses\\s+to", "fails\\s+to", "admits", "denies",
            "so-called", "alleged", "supposed", "pretend"
        ],

        metaphor: [
            "battle", "fight", "combat", "attack", "defend", "offensive",
            "defensive", "strategy", "tactics", "frontline", "battlefield",
            "war\\s+on", "fight\\s+against", "crusade", "enemy", "defeat"
        ],

        minimizer: [
            "just", "only", "merely", "simply", "barely", "hardly",
            "scarcely", "slightly", "somewhat", "minor", "small", "tiny"
        ],

        maximizer: [
            "massive", "huge", "enormous", "gigantic", "colossal", "crisis",
            "disaster", "catastrophe", "epidemic", "plague", "explosion",
            "unprecedented", "extraordinary", "incredible", "amazing", "astonishing"
        ],

        falsebalance: [
            "both sides", "on one hand", "on the other hand", "equally valid",
            "two sides to every story", "balanced perspective", "middle ground",
            "to be fair", "in fairness", "pros and cons"
        ],

        euphemism: [
            "enhanced interrogation", "collateral damage", "friendly fire", "extraordinary rendition",
            "rightsizing", "downsizing", "restructuring", "workforce adjustment",
            "passed away", "departed", "no longer with us"
        ],

        emotional: [
            "dangerous precedent", "slippery slope", "existential threat", "grave danger",
            "think of the children", "vulnerable victims", "innocent lives",
            "act now", "before it's too late", "time is running out"
        ],

        gaslighting: [
            "that never happened", "you're imagining things", "that's not true",
            "you're overreacting", "making a big deal", "being dramatic",
            "you're being paranoid", "too sensitive", "crazy to think"
        ],

        falsedilemma: [
            "either you're with us or against us", "can't have it both ways", "pick a side",
            "black or white", "all or nothing", "win or lose",
            "must choose between", "only two options", "no middle ground"
        ]
    };

    // ============================================================================
    // IMPROVED PATTERN COMPILER - Better handling and debugging
    // ============================================================================
    class PatternCompiler {
        constructor() {
            this.compiledPatterns = new Map();
            this.failedPatterns = [];
            this.compileAllPatterns();
        }

        compileAllPatterns() {
            debugLog('Starting pattern compilation...');

            for (const [type, patterns] of Object.entries(Dictionary)) {
                debugLog(`Compiling ${patterns.length} patterns for type: ${type}`);
                this.compiledPatterns.set(type, this.compilePatterns(patterns, type));
            }

            debugLog('Pattern compilation complete. Summary:', this.getCompilationSummary());
        }

        compilePatterns(patterns, type) {
            const compiled = [];
            let successCount = 0;
            let failureCount = 0;

            for (const pattern of patterns) {
                try {
                    const compiledPattern = this.compilePattern(pattern, type);
                    if (compiledPattern) {
                        compiled.push(compiledPattern);
                        successCount++;
                    } else {
                        failureCount++;
                    }
                } catch (error) {
                    debugLog(`Failed to compile pattern "${pattern}" for type ${type}:`, error);
                    this.failedPatterns.push({ pattern, type, error: error.message });
                    failureCount++;
                }
            }

            debugLog(`Type ${type}: ${successCount} success, ${failureCount} failed`);
            return compiled;
        }

        compilePattern(pattern, type) {
            const cleanPattern = pattern.trim();
            if (!cleanPattern) return null;

            try {
                // Create word boundary pattern for better matching
                // Handle patterns that already contain regex syntax vs simple words
                let regexPattern;

                if (this.containsRegexSyntax(cleanPattern)) {
                    // Pattern already contains regex - use as-is but ensure word boundaries
                    regexPattern = cleanPattern;
                } else {
                    // Simple word or phrase - add word boundaries
                    const escaped = this.escapeRegExp(cleanPattern);
                    if (cleanPattern.includes(' ')) {
                        // Multi-word phrase
                        regexPattern = `\\b${escaped}\\b`;
                    } else {
                        // Single word - handle plurals with optional 's'
                        regexPattern = `\\b${escaped}s?\\b`;
                    }
                }

                const regex = new RegExp(regexPattern, 'gi');

                // Test the regex with sample text
                const testText = 'test sample text for validation';
                regex.test(testText);

                // Reset lastIndex after test
                regex.lastIndex = 0;

                const compiledPattern = {
                    source: cleanPattern,
                    regex: regex,
                    type: type,
                    pattern: regexPattern
                };

                debugLog(`Compiled pattern: "${cleanPattern}" -> /${regexPattern}/gi`);
                return compiledPattern;

            } catch (error) {
                debugLog(`Invalid regex pattern: ${cleanPattern}`, error);
                return null;
            }
        }

        containsRegexSyntax(pattern) {
            // Check if pattern contains regex syntax
            return /[\\()\[\]{}*+?^$|]/.test(pattern);
        }

        escapeRegExp(string) {
            return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        }

        getCompiledPatterns(type) {
            return this.compiledPatterns.get(type) || [];
        }

        getCompilationSummary() {
            const summary = {};
            for (const [type, patterns] of this.compiledPatterns) {
                summary[type] = patterns.length;
            }
            summary.failedPatterns = this.failedPatterns.length;
            return summary;
        }

        // Test specific patterns
        testPattern(type, testText) {
            const patterns = this.getCompiledPatterns(type);
            const results = [];

            for (const pattern of patterns) {
                pattern.regex.lastIndex = 0;
                const matches = [];
                let match;

                while ((match = pattern.regex.exec(testText)) !== null) {
                    matches.push(match[0]);
                    if (match.index === pattern.regex.lastIndex) {
                        break;
                    }
                }

                if (matches.length > 0) {
                    results.push({
                        pattern: pattern.source,
                        regex: pattern.pattern,
                        matches: matches
                    });
                }
            }

            return results;
        }
    }

    // ============================================================================
    // DOM PROCESSOR - Enhanced DOM manipulation
    // ============================================================================
    class DOMProcessor {
        constructor() {
            this.highlightClassPrefix = 'bias-highlight-';
            this.processedParents = new Set();
        }

        collectTextNodes(rootNode) {
            const textNodes = [];
            const walker = document.createTreeWalker(
                rootNode,
                NodeFilter.SHOW_TEXT,
                {
                    acceptNode: node => {
                        if (this.shouldSkipNode(node)) {
                            return NodeFilter.FILTER_REJECT;
                        }
                        return NodeFilter.FILTER_ACCEPT;
                    }
                }
            );

            let node;
            while (node = walker.nextNode()) {
                textNodes.push(node);
            }

            debugLog(`Collected ${textNodes.length} text nodes for processing`);
            return textNodes;
        }

        shouldSkipNode(node) {
            if (node.textContent.trim().length <= 0) return true;

            const parent = node.parentNode;
            if (parent && parent.classList && this.isOwnHighlight(parent)) return true;
            if (parent && this.shouldSkipElement(parent)) return true;

            return false;
        }

        shouldSkipElement(element) {
            const skipTags = ['SCRIPT', 'STYLE', 'NOSCRIPT', 'SVG', 'HEAD', 'META', 'LINK'];
            return skipTags.includes(element.nodeName);
        }

        isOwnHighlight(element) {
            if (!element.classList) return false;
            for (const className of element.classList) {
                if (className.startsWith(this.highlightClassPrefix)) {
                    return true;
                }
            }
            return false;
        }

        createHighlightedFragment(text, matches) {
            const fragment = document.createDocumentFragment();
            let lastIndex = 0;

            for (const match of matches) {
                if (match.index > lastIndex) {
                    fragment.appendChild(
                        document.createTextNode(text.substring(lastIndex, match.index))
                    );
                }

                const span = document.createElement('span');
                span.className = `${this.highlightClassPrefix}${match.type}`;
                span.textContent = match.text;
                span.title = `${match.type}: ${match.text}`;
                fragment.appendChild(span);

                lastIndex = match.index + match.length;
            }

            if (lastIndex < text.length) {
                fragment.appendChild(
                    document.createTextNode(text.substring(lastIndex))
                );
            }

            return fragment;
        }

        removeAllHighlights() {
            const selectors = Object.values(BiasConfig.BIAS_TYPES)
                .map(config => `.${config.className}`)
                .join(', ');

            const highlights = document.querySelectorAll(selectors);
            this.processedParents.clear();

            debugLog(`Removing ${highlights.length} existing highlights`);

            highlights.forEach(highlight => {
                const parent = highlight.parentNode;
                const textNode = document.createTextNode(highlight.textContent);
                parent.replaceChild(textNode, highlight);
                this.processedParents.add(parent);
            });

            this.processedParents.forEach(parent => {
                if (parent && parent.normalize) {
                    parent.normalize();
                }
            });

            this.processedParents.clear();
        }

        removeSpecificHighlights(type) {
            const config = Object.values(BiasConfig.BIAS_TYPES).find(c => c.id === type);
            if (!config) return;

            const highlights = document.querySelectorAll(`.${config.className}`);
            this.processedParents.clear();

            debugLog(`Removing ${highlights.length} highlights of type: ${type}`);

            highlights.forEach(highlight => {
                const parent = highlight.parentNode;
                const textNode = document.createTextNode(highlight.textContent);
                parent.replaceChild(textNode, highlight);
                this.processedParents.add(parent);
            });

            this.processedParents.forEach(parent => {
                if (parent && parent.normalize) {
                    parent.normalize();
                }
            });

            this.processedParents.clear();
        }

        isSignificantContent(node) {
            if (node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.TEXT_NODE) {
                const text = node.textContent || '';
                return text.trim().length > 20;
            }
            return false;
        }

        extractChangedTextNodes(mutations) {
            const changedNodes = [];

            mutations.forEach(mutation => {
                if (this.isOwnHighlight(mutation.target)) return;

                Array.from(mutation.addedNodes).forEach(node => {
                    if (node.nodeType === Node.TEXT_NODE &&
                        node.textContent.trim().length > 5) {
                        changedNodes.push(node);
                    } else if (node.nodeType === Node.ELEMENT_NODE) {
                        const textNodes = this.collectTextNodes(node);
                        changedNodes.push(...textNodes);
                    }
                });
            });

            return changedNodes;
        }
    }

    // ============================================================================
    // ENHANCED BIAS DETECTOR - Main detection class with debugging
    // ============================================================================
    class BiasDetector {
        constructor() {
            this.settings = BiasConfig.getDefaultSettings();
            this.patterns = new PatternCompiler();
            this.domProcessor = new DOMProcessor();
            this.stats = this.createEmptyStats();
            this.observer = null;

            this.compiledDetectors = this.initializeDetectors();

            debugLog('BiasDetector initialized with', Object.keys(this.compiledDetectors).length, 'detectors');
        }

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

                debugLog(`Initialized detector for ${config.id} with ${patterns.length} patterns`);
            }

            return detectors;
        }

        detectPatterns(text, patterns, type) {
            const matches = [];

            for (const pattern of patterns) {
                try {
                    let match;
                    pattern.regex.lastIndex = 0;

                    while ((match = pattern.regex.exec(text)) !== null) {
                        matches.push({
                            index: match.index,
                            length: match[0].length,
                            text: match[0],
                            type: type,
                            pattern: pattern.source
                        });

                        if (match.index === pattern.regex.lastIndex) {
                            pattern.regex.lastIndex++;
                        }
                    }
                } catch (error) {
                    debugLog(`Error with pattern ${pattern.source}:`, error);
                    continue;
                }
            }

            if (matches.length > 0) {
                debugLog(`Found ${matches.length} matches for type ${type}:`, matches.map(m => m.text));
            }

            return matches;
        }

        async analyzeDocument() {
            if (!this.settings.enableAnalysis) {
                return this.createEmptyStats();
            }

            debugLog('Starting document analysis...');

            try {
                this.domProcessor.removeAllHighlights();
                this.resetStats();

                const textNodes = this.domProcessor.collectTextNodes(document.body);
                debugLog(`Processing ${textNodes.length} text nodes`);

                const batchSize = BiasConfig.PERFORMANCE.BATCH_SIZE;
                for (let i = 0; i < textNodes.length; i += batchSize) {
                    const batch = textNodes.slice(i, i + batchSize);
                    await this.processBatch(batch);

                    if (i % (batchSize * 4) === 0) {
                        await new Promise(resolve => setTimeout(resolve, 0));
                    }
                }

                debugLog('Analysis completed. Final stats:', this.stats);
                return this.stats;

            } catch (error) {
                debugLog('Document analysis failed:', error);
                return this.createEmptyStats();
            }
        }

        async processBatch(textNodes) {
            for (const node of textNodes) {
                try {
                    await this.processTextNode(node);
                } catch (error) {
                    debugLog('Error processing text node:', error);
                    continue;
                }
            }
        }

        async processTextNode(node) {
            const text = node.textContent;

            if (text.trim().length < BiasConfig.PERFORMANCE.MIN_SIGNIFICANT_TEXT || this.isUIText(text)) {
                return;
            }

            const allMatches = [];

            for (const [type, detector] of this.compiledDetectors) {
                if (detector.isEnabled()) {
                    const matches = detector.detect(text);
                    allMatches.push(...matches.map(match => ({ ...match, type })));
                }
            }

            if (allMatches.length > 0) {
                debugLog(`Processing node with text: "${text.substring(0, 50)}..." - Found ${allMatches.length} matches`);
                this.highlightMatches(node, allMatches);
            }
        }

        highlightMatches(node, matches) {
            const sortedMatches = this.deduplicateMatches(matches);
            if (sortedMatches.length === 0) return;

            const fragment = this.domProcessor.createHighlightedFragment(
                node.textContent,
                sortedMatches
            );

            for (const match of sortedMatches) {
                this.updateStats(match.type);
            }

            if (node.parentNode) {
                node.parentNode.replaceChild(fragment, node);
            }
        }

        deduplicateMatches(matches) {
            const sorted = matches.sort((a, b) => {
                if (a.index !== b.index) return a.index - b.index;
                return b.length - a.length;
            });

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

        async updateSettings(newSettings) {
            const oldSettings = { ...this.settings };
            this.settings = { ...newSettings };

            debugLog('Settings updated:', newSettings);

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

            if (newSettings.enableAnalysis) {
                await this.handleDetectorChanges(oldSettings, newSettings);
            }
        }

        async handleDetectorChanges(oldSettings, newSettings) {
            let needsReanalysis = false;

            for (const [key, detector] of this.compiledDetectors) {
                const settingKey = detector.settingKey;

                if (oldSettings[settingKey] !== newSettings[settingKey]) {
                    if (!newSettings[settingKey]) {
                        this.domProcessor.removeSpecificHighlights(detector.id);
                        this.stats[detector.statKey] = 0;
                    } else {
                        needsReanalysis = true;
                    }
                }
            }

            if (needsReanalysis) {
                await this.analyzeDocument();
            }
        }

        isUIText(text) {
            const trimmed = text.trim();
            return (
                trimmed.length < 20 &&
                !trimmed.includes(' ') ||
                /^[\d\s\-\+\(\)]+$/.test(trimmed) ||
                /^[A-Z\s]{2,10}$/.test(trimmed)
            );
        }

        updateStats(type) {
            const detector = this.compiledDetectors.get(type);
            if (detector && detector.statKey) {
                this.stats[detector.statKey]++;
            }
        }

        resetStats() {
            this.stats = this.createEmptyStats();
        }

        createEmptyStats() {
            return BiasConfig.createEmptyStats();
        }

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
                if (this.domProcessor.isOwnHighlight(mutation.target)) {
                    return false;
                }

                return mutation.addedNodes.length > 0 &&
                    Array.from(mutation.addedNodes).some(node =>
                        this.domProcessor.isSignificantContent(node)
                    );
            });
        }

        async handleContentChange(mutations) {
            debugLog('Content changed, processing updates...');

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

        destroy() {
            this.disconnectObserver();
            this.domProcessor.removeAllHighlights();
        }

        // Debug methods
        testPatterns(type, text) {
            return this.patterns.testPattern(type, text);
        }

        getPatternStats() {
            return this.patterns.getCompilationSummary();
        }
    }

    const excellenceDetector = new ExcellenceDetector();

    // ============================================================================
    // MAIN CONTENT SCRIPT LOGIC
    // ============================================================================
    let biasDetector = null;
    let isInitialized = false;

    function initialize() {
        if (isInitialized) return;

        try {
            biasDetector = new BiasDetector();
            setupMessageListeners();
            loadSettingsAndStart();
            isInitialized = true;
            debugLog('E-Prime Bias Detector (Fixed) initialized successfully');
        } catch (error) {
            debugLog('Failed to initialize Bias Detector:', error);
        }
    }

    function loadSettingsAndStart() {
        const defaultSettings = BiasConfig.getDefaultSettings();

        chrome.storage.sync.get(defaultSettings, (items) => {
            const validatedSettings = BiasConfig.validateSettings(items);
            biasDetector.updateSettings(validatedSettings).then(() => {
                if (validatedSettings.enableAnalysis) {
                    setTimeout(() => {
                        biasDetector.analyzeDocument();
                        biasDetector.setupMutationObserver();
                    }, 500);
                }
            }).catch(error => {
                debugLog('Error updating settings:', error);
            });
        });
    }

    function setupMessageListeners() {
        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            handleMessage(request, sender, sendResponse);
            return true;
        });
    }

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

                case 'testPatterns':
                    handleTestPatterns(request, sendResponse);
                    break;

                default:
                    sendResponse({ success: false, error: 'Unknown action' });
            }
        } catch (error) {
            debugLog('Error handling message:', error);
            sendResponse({ success: false, error: error.message });
        }
    }

    async function handleUpdateSettings(request, sendResponse) {
        debugLog('Content script received new settings:', request.settings);

        const validatedSettings = BiasConfig.validateSettings(request.settings);
        await biasDetector.updateSettings(validatedSettings);

        setTimeout(() => {
            const stats = biasDetector.getStats();
            sendResponse({
                success: true,
                stats: stats,
                message: 'Settings updated successfully'
            });
        }, 100);
    }

    function handleGetStats(sendResponse) {
        const stats = biasDetector.getStats();
        debugLog('Sending stats:', stats);
        sendResponse(stats);
    }

    async function handleForceAnalyze(sendResponse) {
        debugLog('Force analyze requested');

        try {
            biasDetector.clearHighlights();
            await new Promise(resolve => setTimeout(resolve, 100));

            const stats = await biasDetector.forceAnalyze();
            biasDetector.setupMutationObserver();

            sendResponse({
                success: true,
                stats: stats,
                message: 'Analysis completed successfully'
            });
        } catch (error) {
            sendResponse({
                success: false,
                error: error.message
            });
        }
    }

    function handleClearHighlights(sendResponse) {
        debugLog('Clear highlights requested');

        biasDetector.clearHighlights();
        const stats = biasDetector.getStats();

        sendResponse({
            success: true,
            stats: stats,
            message: 'Highlights cleared successfully'
        });
    }

    function handleTestPatterns(request, sendResponse) {
        const { type, text } = request;
        const results = biasDetector.testPatterns(type, text);
        sendResponse({ success: true, results: results });
    }

    function handleUnload() {
        if (biasDetector) {
            biasDetector.destroy();
            biasDetector = null;
            isInitialized = false;
        }
    }

    function handleError(error) {
        debugLog('E-Prime Bias Detector error:', error);

        if (biasDetector) {
            try {
                biasDetector.destroy();
            } catch (e) {
                debugLog('Error during cleanup:', e);
            }
        }

        biasDetector = null;
        isInitialized = false;

        setTimeout(() => {
            debugLog('Attempting to reinitialize Bias Detector...');
            initialize();
        }, 1000);
    }

    // Set up error handling and initialization
    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', (event) => {
        handleError(event.reason);
    });
    window.addEventListener('beforeunload', handleUnload);

    // Initialize when ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }

    setTimeout(initialize, 100);

    // Expose debug utilities
    if (DEBUG_MODE && (window.location.hostname === 'localhost' || window.location.hostname.includes('test'))) {
        window.ePrimeDebug = {
            getDetector: () => biasDetector,
            getStats: () => biasDetector ? biasDetector.getStats() : null,
            testPatterns: (type, text) => biasDetector ? biasDetector.testPatterns(type, text) : null,
            getPatternStats: () => biasDetector ? biasDetector.getPatternStats() : null,
            reinitialize: () => {
                handleUnload();
                setTimeout(initialize, 100);
            }
        };

        debugLog('Debug utilities available at window.ePrimeDebug');
    }

})();

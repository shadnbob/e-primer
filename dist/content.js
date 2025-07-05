// E-Prime Bias Detector - Refactored Bundle
// This bundles all the modular components into a single content script

(function() {
    'use strict';

    const DEBUG_MODE = true;

    function debugLog(...args) {
        if (DEBUG_MODE) {
            console.log('[E-Prime Debug]', ...args);
        }
    }

    // ============================================================================
    // UTILITIES
    // ============================================================================
    
    // ExcellenceDetector from src/utils/ExcellenceDetector.js
    class ExcellenceDetector {
        constructor() {
            // Excellence patterns - detecting good writing practices
            this.excellencePatterns = {
                attribution: {
                    name: 'Clear Attribution',
                    patterns: [
                        // Academic citations
                        /\b\w+\s+(?:et al\.?\s+)?\(\d{4}\)/gi,
                        /\bAccording to [\w\s\.]+'s \d{4} [\w\s-]* (?:study|research|paper|analysis)/gi,
                        /\b(?:research|study|analysis) published in \w+/gi,
                        /\bbased on [\d,]+ (?:data points|participants|responses|observations)/gi,
                        /\bDr\.? [\w\s]+ (?:at|from) [\w\s]+/gi,
                        /\bThe [\w\s]+ (?:Department|Institute|University|Center|Bureau) (?:reported|found|concluded)/gi,
                        // Specific sourcing
                        /\b(?:per|via|through|from) [\w\s]+ (?:report|statement|announcement)/gi,
                        /\bas (?:reported|documented|noted) (?:by|in) [\w\s]+/gi
                    ],
                    className: 'excellence-attribution',
                    tooltip: '✓ Specific, verifiable source provided',
                    color: '#28a745'
                },
                
                nuance: {
                    name: 'Nuanced Language',
                    patterns: [
                        // Epistemic modality
                        /\b(?:might|could|possibly|potentially|perhaps|maybe)\b/gi,
                        /\b(?:appears to|seems to|tends to|likely to)\b/gi,
                        /\b(?:suggests that|indicates that|implies that|points to)\b/gi,
                        // Acknowledging complexity
                        /\b(?:however|although|while|whereas|nevertheless|nonetheless)\b/gi,
                        /\b(?:on the other hand|alternatively|conversely)\b/gi,
                        /\b(?:multiple factors|various|several|some evidence|mixed results)\b/gi,
                        /\b(?:worth considering|it's possible|may not reflect|could be explained)\b/gi,
                        // Conditional thinking
                        /\b(?:depending on|in certain cases|under specific conditions)\b/gi,
                        /\b(?:context-dependent|situation-specific|case-by-case)\b/gi
                    ],
                    className: 'excellence-nuance',
                    tooltip: '✓ Acknowledges complexity and avoids absolutes',
                    color: '#218838'
                },
                
                transparency: {
                    name: 'Transparent Communication',
                    patterns: [
                        // Opinion acknowledgment
                        /\b(?:in my (?:opinion|view)|I (?:think|believe|feel)|from my perspective)\b/gi,
                        /\b(?:personally|subjectively|as I see it)\b/gi,
                        // Limitation acknowledgment
                        /\b(?:limitations include|should note that|important to mention)\b/gi,
                        /\b(?:caveat|disclaimer|qualification)\b/gi,
                        /\b(?:correlation does not [\w\s]{0,20} causation)\b/gi,
                        /\b(?:preliminary findings|initial results|early data)\b/gi,
                        // Uncertainty acknowledgment
                        /\b(?:uncertain|unclear|unknown|yet to be determined)\b/gi,
                        /\b(?:requires? (?:further|more) (?:research|investigation|study))\b/gi,
                        /\b(?:open to (?:correction|revision|debate|interpretation))\b/gi
                    ],
                    className: 'excellence-transparency',
                    tooltip: '✓ Transparent about limitations and perspective',
                    color: '#28a745'
                },
                
                discourse: {
                    name: 'Constructive Discourse',
                    patterns: [
                        // Inviting engagement
                        /\b(?:what do you think|worth discussing|let's (?:explore|consider|examine))\b/gi,
                        /\b(?:open to feedback|welcoming thoughts|interested in perspectives)\b/gi,
                        // Building on ideas
                        /\b(?:building on|extending|expanding upon|adding to)\b/gi,
                        /\b(?:similar to|comparable|in line with|consistent with)\b/gi,
                        /\b(?:yes,? and|to add|furthermore|additionally)\b/gi,
                        // Acknowledging others
                        /\b(?:valid point|good observation|worth noting|important contribution)\b/gi,
                        /\b(?:as [\w\s]+ (?:mentioned|noted|pointed out|observed))\b/gi,
                        // Balanced perspective
                        /\b(?:balanced|nuanced approach|both [\w\s]+ and [\w\s]+)\b/gi,
                        /\b(?:pros and cons|advantages and disadvantages|benefits and drawbacks)\b/gi
                    ],
                    className: 'excellence-discourse',
                    tooltip: '✓ Encourages dialogue and acknowledges others',
                    color: '#20c997'
                },
                
                evidence: {
                    name: 'Evidence-Based Claims',
                    patterns: [
                        // Quantified claims
                        /\b\d+(?:\.\d+)?%\s+of\s+[\w\s]+/gi,
                        /\b(?:statistically significant|p\s*[<=]\s*0\.\d+)\b/gi,
                        /\b(?:sample size of|n\s*=\s*)\d+/gi,
                        /\b(?:margin of error|confidence interval|standard deviation)\b/gi,
                        // Data transparency
                        /\b(?:data (?:shows?|indicates?|reveals?|demonstrates?))\b/gi,
                        /\b(?:evidence (?:suggests?|supports?|indicates?))\b/gi,
                        /\b(?:findings (?:show|indicate|suggest|reveal))\b/gi,
                        // Methodology mentions
                        /\b(?:methodology|method|approach|technique|procedure)\b/gi,
                        /\b(?:peer-reviewed|replicated|validated|verified)\b/gi
                    ],
                    className: 'excellence-evidence',
                    tooltip: '✓ Claims supported by specific evidence',
                    color: '#17a2b8'
                }
            };
            
            // Intensity levels for problematic patterns
            this.intensityLevels = {
                absolute: {
                    1: ['mostly', 'generally', 'typically', 'usually', 'often', 'frequently'],
                    2: ['always', 'never', 'every', 'none', 'all', 'no one', 'everyone'],
                    3: ['absolutely', 'definitely', 'certainly', 'totally', 'completely', 'utterly', 'entirely']
                },
                opinion: {
                    1: ['seems', 'appears', 'arguably', 'perhaps', 'possibly'],
                    2: ['obviously', 'clearly', 'surely', 'undoubtedly', 'evidently'],
                    3: ['undeniably', 'unquestionably', 'indisputably', 'irrefutably', 'incontrovertibly']
                },
                emotional: {
                    1: ['concerning', 'problematic', 'challenging', 'difficult', 'worrying'],
                    2: ['crisis', 'disaster', 'failure', 'catastrophe', 'emergency'],
                    3: ['evil', 'destroy', 'murder', 'doom', 'apocalypse', 'blood on your hands']
                },
                weasel: {
                    1: ['some', 'many', 'few', 'several'],
                    2: ['people say', 'studies show', 'experts believe', 'sources indicate'],
                    3: ['everyone knows', 'it\'s a fact that', 'proven', 'undisputed']
                },
                gaslighting: {
                    1: ['perhaps you\'re mistaken', 'that\'s unusual', 'are you sure'],
                    2: ['you\'re overreacting', 'being dramatic', 'too sensitive'],
                    3: ['that never happened', 'you\'re imagining things', 'you\'re crazy']
                }
            };
            
            // Subject portrayal patterns
            this.portrayalPatterns = {
                positive: {
                    hero: /\b(?:hero|champion|savior|defender|protector)\b/gi,
                    virtue: /\b(?:noble|righteous|virtuous|honorable|moral)\b/gi,
                    success: /\b(?:brilliant|genius|visionary|revolutionary|groundbreaking)\b/gi
                },
                negative: {
                    villain: /\b(?:evil|villain|monster|demon|tyrant)\b/gi,
                    failure: /\b(?:disaster|catastrophe|failure|debacle|fiasco)\b/gi,
                    moral: /\b(?:corrupt|immoral|unethical|shameful|disgraceful)\b/gi
                }
            };
        }
        
        // Calculate intensity level for a match
        calculateIntensity(text, type) {
            const levels = this.intensityLevels[type];
            if (!levels) return 2; // Default to medium
            
            const lowerText = text.toLowerCase();
            for (let level = 3; level >= 1; level--) {
                if (levels[level] && levels[level].some(word => lowerText.includes(word))) {
                    return level;
                }
            }
            return 2;
        }
        
        // Detect subject portrayal (positive/negative framing)
        detectPortrayal(text) {
            for (const [valence, patterns] of Object.entries(this.portrayalPatterns)) {
                for (const [type, pattern] of Object.entries(patterns)) {
                    if (pattern.test(text)) {
                        pattern.lastIndex = 0; // Reset regex
                        return { valence, type };
                    }
                }
            }
            return null;
        }
        
        // Find all excellence patterns in text
        findExcellence(text) {
            const matches = [];
            
            for (const [type, config] of Object.entries(this.excellencePatterns)) {
                for (const pattern of config.patterns) {
                    let match;
                    const regex = new RegExp(pattern.source, pattern.flags);
                    while ((match = regex.exec(text)) !== null) {
                        matches.push({
                            index: match.index,
                            length: match[0].length,
                            text: match[0],
                            type: type,
                            className: config.className,
                            tooltip: config.tooltip,
                            isExcellence: true
                        });
                    }
                }
            }
            
            return matches;
        }
        
        // Calculate document health score
        calculateHealthScore(excellenceCount, problemCount) {
            if (excellenceCount + problemCount === 0) return 50;
            return Math.round((excellenceCount / (excellenceCount + problemCount)) * 100);
        }
        
        // Get statistics for the document
        getStatistics(text, problems = []) {
            const excellence = this.findExcellence(text);
            const stats = {
                excellence: {
                    total: excellence.length,
                    byType: {}
                },
                problems: {
                    total: problems.length,
                    byIntensity: { 1: 0, 2: 0, 3: 0 },
                    byType: {}
                },
                healthScore: this.calculateHealthScore(excellence.length, problems.length)
            };
            
            // Count excellence by type
            for (const match of excellence) {
                stats.excellence.byType[match.type] = (stats.excellence.byType[match.type] || 0) + 1;
            }
            
            // Count problems by intensity
            for (const problem of problems) {
                if (problem.intensity) {
                    stats.problems.byIntensity[problem.intensity]++;
                }
            }
            
            return stats;
        }
    }

    // PerformanceMonitor from src/utils/PerformanceMonitor.js
    class PerformanceMonitor {
        constructor() {
            this.timers = new Map();
            this.metrics = new Map();
            this.enabled = true;
        }

        start(label) {
            if (!this.enabled) return;
            
            this.timers.set(label, {
                startTime: performance.now(),
                label
            });
        }

        end(label) {
            if (!this.enabled) return 0;
            
            const timer = this.timers.get(label);
            if (!timer) {
                console.warn(`Performance timer '${label}' was not started`);
                return 0;
            }

            const duration = performance.now() - timer.startTime;
            this.timers.delete(label);

            // Store metric
            if (!this.metrics.has(label)) {
                this.metrics.set(label, {
                    count: 0,
                    totalTime: 0,
                    averageTime: 0,
                    minTime: Infinity,
                    maxTime: 0
                });
            }

            const metric = this.metrics.get(label);
            metric.count++;
            metric.totalTime += duration;
            metric.averageTime = metric.totalTime / metric.count;
            metric.minTime = Math.min(metric.minTime, duration);
            metric.maxTime = Math.max(metric.maxTime, duration);

            console.log(`Performance: ${label} completed in ${duration.toFixed(2)}ms`);
            return duration;
        }

        getMetrics() {
            const metrics = {};
            for (const [label, data] of this.metrics) {
                metrics[label] = { ...data };
            }
            return metrics;
        }

        cleanup() {
            this.reset();
            this.enabled = false;
        }

        reset() {
            this.timers.clear();
            this.metrics.clear();
        }
    }

    // DOMProcessor from src/utils/DOMProcessor.js
    class DOMProcessor {
        constructor() {
            this.highlightClassPrefix = 'bias-highlight-';
            this.excellenceClassPrefix = 'excellence-';
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

            // Process Shadow DOM
            this.processShadowDom(rootNode, textNodes);

            return textNodes;
        }

        shouldSkipNode(node) {
            // Skip empty or very short nodes
            if (node.textContent.trim().length <= 0) {
                return true;
            }

            // Skip nodes already within our highlights
            const parent = node.parentNode;
            if (parent && parent.classList && this.isOwnHighlight(parent)) {
                return true;
            }

            // Skip script, style, and other non-content elements
            if (parent && this.shouldSkipElement(parent)) {
                return true;
            }

            return false;
        }

        shouldSkipElement(element) {
            const skipTags = ['SCRIPT', 'STYLE', 'NOSCRIPT', 'SVG', 'HEAD', 'META', 'LINK'];
            return skipTags.includes(element.nodeName);
        }

        isOwnHighlight(element) {
            if (!element.classList) return false;
            
            for (const className of element.classList) {
                if (className.startsWith(this.highlightClassPrefix) || 
                    className.startsWith(this.excellenceClassPrefix)) {
                    return true;
                }
            }
            return false;
        }

        // Process Shadow DOM elements
        processShadowDom(rootNode, textNodes) {
            if (rootNode.nodeType !== Node.ELEMENT_NODE) return;

            // Check for shadow root
            if (rootNode.shadowRoot) {
                const shadowTextNodes = this.collectTextNodes(rootNode.shadowRoot);
                textNodes.push(...shadowTextNodes);
            }

            // Process children that might have shadow roots
            const elements = rootNode.querySelectorAll('*');
            elements.forEach(element => {
                if (element.shadowRoot) {
                    const shadowTextNodes = this.collectTextNodes(element.shadowRoot);
                    textNodes.push(...shadowTextNodes);
                }
            });
        }

        // Create a document fragment with highlighted content
        createHighlightedFragment(text, matches) {
            const fragment = document.createDocumentFragment();
            let lastIndex = 0;

            for (const match of matches) {
                // Add text before this match
                if (match.index > lastIndex) {
                    fragment.appendChild(
                        document.createTextNode(text.substring(lastIndex, match.index))
                    );
                }

                // Add highlighted match
                const span = document.createElement('span');
                
                // Use appropriate class prefix based on match type
                if (match.isExcellence) {
                    span.className = match.className || `${this.excellenceClassPrefix}${match.type}`;
                    span.title = match.tooltip || this.getExcellenceTooltipText(match.type);
                } else {
                    span.className = `${this.highlightClassPrefix}${match.type}`;
                    span.title = this.getTooltipText(match.type);
                }
                
                span.textContent = match.text;
                fragment.appendChild(span);

                lastIndex = match.index + match.length;
            }

            // Add remaining text
            if (lastIndex < text.length) {
                fragment.appendChild(
                    document.createTextNode(text.substring(lastIndex))
                );
            }

            return fragment;
        }

        getTooltipText(type) {
            const tooltips = {
                opinion: 'Opinion word - subjective language',
                tobe: 'To-be verb (E-Prime violation)',
                absolute: 'Absolute statement',
                passive: 'Passive voice construction',
                weasel: 'Weasel word - vague attribution',
                presupposition: 'Presupposition marker',
                metaphor: 'War metaphor',
                minimizer: 'Minimizing language',
                maximizer: 'Exaggeration/hyperbole',
                falsebalance: 'False balance indicator',
                euphemism: 'Euphemism/dysphemism',
                emotional: 'Emotional manipulation',
                gaslighting: 'Gaslighting phrase',
                falsedilemma: 'False dilemma'
            };
            return tooltips[type] || 'Bias indicator';
        }
        
        getExcellenceTooltipText(type) {
            const tooltips = {
                attribution: '✓ Specific, verifiable source provided',
                nuance: '✓ Acknowledges complexity and avoids absolutes',
                transparency: '✓ Transparent about limitations and perspective',
                discourse: '✓ Encourages dialogue and acknowledges others',
                evidence: '✓ Claims supported by specific evidence'
            };
            return tooltips[type] || 'Excellence indicator';
        }

        // Remove all bias highlights
        removeAllHighlights() {
            const selector = Object.keys(this.getHighlightSelectors()).join(', ');
            const highlights = document.querySelectorAll(selector);
            
            this.processedParents.clear();

            highlights.forEach(highlight => {
                const parent = highlight.parentNode;
                const textNode = document.createTextNode(highlight.textContent);
                parent.replaceChild(textNode, highlight);
                this.processedParents.add(parent);
            });

            // Normalize all affected parent nodes
            this.processedParents.forEach(parent => {
                if (parent && parent.normalize) {
                    parent.normalize();
                }
            });

            this.processedParents.clear();
        }

        // Remove specific type of highlights
        removeSpecificHighlights(type) {
            const selector = `.${this.highlightClassPrefix}${type}`;
            const highlights = document.querySelectorAll(selector);
            
            this.processedParents.clear();

            highlights.forEach(highlight => {
                const parent = highlight.parentNode;
                const textNode = document.createTextNode(highlight.textContent);
                parent.replaceChild(textNode, highlight);
                this.processedParents.add(parent);
            });

            // Normalize affected parent nodes
            this.processedParents.forEach(parent => {
                if (parent && parent.normalize) {
                    parent.normalize();
                }
            });

            this.processedParents.clear();
        }

        getHighlightSelectors() {
            return {
                // Bias selectors
                opinion: `.${this.highlightClassPrefix}opinion`,
                tobe: `.${this.highlightClassPrefix}tobe`,
                absolute: `.${this.highlightClassPrefix}absolute`,
                passive: `.${this.highlightClassPrefix}passive`,
                weasel: `.${this.highlightClassPrefix}weasel`,
                presupposition: `.${this.highlightClassPrefix}presupposition`,
                metaphor: `.${this.highlightClassPrefix}metaphor`,
                minimizer: `.${this.highlightClassPrefix}minimizer`,
                maximizer: `.${this.highlightClassPrefix}maximizer`,
                falsebalance: `.${this.highlightClassPrefix}falsebalance`,
                euphemism: `.${this.highlightClassPrefix}euphemism`,
                emotional: `.${this.highlightClassPrefix}emotional`,
                gaslighting: `.${this.highlightClassPrefix}gaslighting`,
                falsedilemma: `.${this.highlightClassPrefix}falsedilemma`,
                // Excellence selectors
                attribution: `.${this.excellenceClassPrefix}attribution`,
                nuance: `.${this.excellenceClassPrefix}nuance`,
                transparency: `.${this.excellenceClassPrefix}transparency`,
                discourse: `.${this.excellenceClassPrefix}discourse`,
                evidence: `.${this.excellenceClassPrefix}evidence`
            };
        }

        // Check if content change is significant enough to reprocess
        isSignificantContent(node) {
            if (node.nodeType === Node.ELEMENT_NODE) {
                const text = node.textContent || '';
                return text.trim().length > 20;
            } else if (node.nodeType === Node.TEXT_NODE) {
                const text = node.textContent || '';
                return text.trim().length > 20;
            }
            return false;
        }

        // Extract changed text nodes from mutations
        extractChangedTextNodes(mutations) {
            const changedNodes = [];
            
            mutations.forEach(mutation => {
                if (this.isOwnHighlight(mutation.target)) {
                    return; // Skip our own changes
                }

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
    // CONFIGURATION
    // ============================================================================
    
    // BiasConfig from src/config/BiasConfig.js
    class BiasConfig {
        static BIAS_TYPES = {
            // Basic Detection (enabled by default)
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
                tooltip: 'Subjective language that reveals the writer\'s stance',
                examples: ['obviously', 'terrible', 'amazing', 'controversial']
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
                tooltip: 'E-Prime: Avoiding "to be" verbs for more precise language',
                examples: ['is', 'are', 'was', 'were', 'being']
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
                tooltip: 'Absolute terms that rarely reflect reality accurately',
                examples: ['all', 'never', 'everyone', 'nobody', 'always']
            },
            
            // Advanced Detection (disabled by default)
            PASSIVE: {
                id: 'passive',
                name: 'Passive Voice',
                description: 'Constructions that obscure who performs actions',
                category: 'advanced',
                color: '#800080',
                className: 'bias-highlight-passive',
                settingKey: 'highlightPassive',
                statKey: 'passiveCount',
                enabled: true,
                tooltip: 'Passive voice can hide responsibility and agency',
                examples: ['was written', 'mistakes were made', 'has been reported']
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
                enabled: true,
                tooltip: 'Phrases that avoid specificity and concrete sources',
                examples: ['many people say', 'studies show', 'experts believe']
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
                enabled: true,
                tooltip: 'Language that makes readers accept premises without realizing it',
                examples: ['even scientists admit', 'still refuses', 'another example']
            },
            
            // Framing & Rhetoric (disabled by default)
            METAPHOR: {
                id: 'metaphor',
                name: 'War Metaphors',
                description: 'Militaristic language for non-military topics',
                category: 'framing',
                color: '#dc143c',
                className: 'bias-highlight-metaphor',
                settingKey: 'highlightMetaphors',
                statKey: 'metaphorCount',
                enabled: true,
                tooltip: 'Military metaphors that frame issues as conflicts',
                examples: ['battle against', 'war on', 'attacking the problem']
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
                enabled: true,
                tooltip: 'Words that dismiss or trivialize legitimate concerns',
                examples: ['just', 'only', 'merely', 'slightly', 'minor']
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
                enabled: true,
                tooltip: 'Hyperbolic language that creates false urgency',
                examples: ['crisis', 'disaster', 'unprecedented', 'massive']
            },
            
            // Manipulation Tactics (disabled by default)
            FALSE_BALANCE: {
                id: 'falsebalance',
                name: 'False Balance',
                description: 'Artificial balance between unequal positions',
                category: 'manipulation',
                color: '#4b0082',
                className: 'bias-highlight-falsebalance',
                settingKey: 'highlightFalseBalance',
                statKey: 'falseBalanceCount',
                enabled: true,
                tooltip: 'Language that creates false equivalence between positions',
                examples: ['both sides', 'balanced perspective', 'two schools of thought']
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
                enabled: true,
                tooltip: 'Euphemisms and dysphemisms that manipulate perception',
                examples: ['enhanced interrogation', 'collateral damage', 'rightsizing']
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
                enabled: true,
                tooltip: 'Language designed to manipulate through emotion',
                examples: ['think of the children', 'devastating impact', 'shocking revelation']
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
                enabled: true,
                tooltip: 'Language that questions reality and undermines confidence',
                examples: ['that never happened', 'you\'re overreacting', 'you\'re imagining things']
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
                enabled: true,
                tooltip: 'Forcing false either/or choices',
                examples: ['either you\'re with us or against us', 'pick a side', 'all or nothing']
            }
        };
        
        // Excellence detection types
        static EXCELLENCE_TYPES = {
            ATTRIBUTION: {
                id: 'attribution',
                name: 'Clear Attribution',
                description: 'Specific, verifiable sources',
                className: 'excellence-attribution',
                settingKey: 'highlightAttributionExcellence',
                statKey: 'attributionExcellenceCount',
                enabled: true
            },
            NUANCE: {
                id: 'nuance',
                name: 'Nuanced Language',
                description: 'Acknowledges complexity',
                className: 'excellence-nuance',
                settingKey: 'highlightNuanceExcellence',
                statKey: 'nuanceExcellenceCount',
                enabled: true
            },
            TRANSPARENCY: {
                id: 'transparency',
                name: 'Transparent Communication',
                description: 'Clear about limitations',
                className: 'excellence-transparency',
                settingKey: 'highlightTransparencyExcellence',
                statKey: 'transparencyExcellenceCount',
                enabled: true
            },
            DISCOURSE: {
                id: 'discourse',
                name: 'Constructive Discourse',
                description: 'Encourages dialogue',
                className: 'excellence-discourse',
                settingKey: 'highlightDiscourseExcellence',
                statKey: 'discourseExcellenceCount',
                enabled: true
            },
            EVIDENCE: {
                id: 'evidence',
                name: 'Evidence-Based',
                description: 'Supported by data',
                className: 'excellence-evidence',
                settingKey: 'highlightEvidenceExcellence',
                statKey: 'evidenceExcellenceCount',
                enabled: true
            }
        };

        static CATEGORIES = {
            basic: {
                name: 'Basic Detection',
                description: 'Fundamental bias indicators',
                icon: '🔍',
                expanded: true
            },
            advanced: {
                name: 'Advanced Detection',
                description: 'Sophisticated linguistic patterns',
                icon: '🧠',
                expanded: false
            },
            framing: {
                name: 'Framing & Rhetoric',
                description: 'How issues are presented',
                icon: '🎭',
                expanded: false
            },
            manipulation: {
                name: 'Manipulation Tactics',
                description: 'Techniques designed to mislead',
                icon: '⚠️',
                expanded: false
            }
        };

        static getDefaultSettings() {
            const settings = {
                enableAnalysis: true,
                analysisMode: 'balanced' // 'problems', 'excellence', or 'balanced'
            };

            // Add all bias type settings with their default enabled state
            for (const [key, config] of Object.entries(this.BIAS_TYPES)) {
                settings[config.settingKey] = config.enabled;
            }
            
            // Add all excellence type settings
            for (const [key, config] of Object.entries(this.EXCELLENCE_TYPES)) {
                settings[config.settingKey] = config.enabled;
            }

            return settings;
        }

        static getSettingsByCategory() {
            const categorized = {};
            
            for (const category of Object.keys(this.CATEGORIES)) {
                categorized[category] = [];
            }

            for (const [key, config] of Object.entries(this.BIAS_TYPES)) {
                if (categorized[config.category]) {
                    categorized[config.category].push(config);
                }
            }

            return categorized;
        }

        static getBiasTypeConfig(id) {
            return Object.values(this.BIAS_TYPES).find(config => config.id === id);
        }

        static getAllBiasTypes() {
            return Object.values(this.BIAS_TYPES);
        }

        static getEnabledBiasTypes(settings) {
            return Object.values(this.BIAS_TYPES).filter(
                config => settings[config.settingKey]
            );
        }

        static createEmptyStats() {
            const stats = { healthScore: 50 };
            // Add bias stats
            for (const config of Object.values(this.BIAS_TYPES)) {
                stats[config.statKey] = 0;
            }
            // Add excellence stats
            for (const config of Object.values(this.EXCELLENCE_TYPES)) {
                stats[config.statKey] = 0;
            }
            return stats;
        }

        static validateSettings(settings) {
            const validated = { ...this.getDefaultSettings() };
            
            // Validate each setting
            for (const [key, value] of Object.entries(settings)) {
                if (key === 'enableAnalysis' || key === 'analysisMode') {
                    validated[key] = key === 'analysisMode' ? value : Boolean(value);
                } else if (Object.values(this.BIAS_TYPES).some(config => config.settingKey === key) ||
                          Object.values(this.EXCELLENCE_TYPES).some(config => config.settingKey === key)) {
                    validated[key] = Boolean(value);
                }
            }
            
            return validated;
        }

        static hexToRgba(hex, alpha) {
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);
            return `rgba(${r}, ${g}, ${b}, ${alpha})`;
        }

        // Performance settings
        static PERFORMANCE = {
            BATCH_SIZE: 50,
            MUTATION_DEBOUNCE: 1000,
            MAX_TEXT_LENGTH: 10000,
            MIN_SIGNIFICANT_TEXT: 5,
            UI_UPDATE_INTERVAL: 200
        };

        // Feature flags for experimental features
        static FEATURES = {
            CONTEXT_AWARENESS: false,
            MACHINE_LEARNING: false,
            EXPORT_REPORTS: false,
            CUSTOM_DICTIONARIES: false,
            PERFORMANCE_MONITORING: true
        };
    }

    // ============================================================================
    // DICTIONARIES
    // ============================================================================
    
    // Dictionary data from src/dictionaries/*.js files
    const opinionWords = [
        // Certainty/Conviction Adverbs
        "clearly", "obviously", "undoubtedly", "certainly", "definitely", "absolutely",
        "surely", "undeniably", "unquestionably", "indisputably", "indubitably", "unmistakably",
        "incontrovertibly", "incontestably", "irrefutably", "manifestly", "patently",
        
        // Hedging/Uncertainty Words
        "allegedly", "supposedly", "evidently", "arguably", "seemingly", "apparently",
        "ostensibly", "reportedly", "reputedly", "presumably", "purportedly",
        
        // Evaluative Adjectives (Positive)
        "good", "great", "excellent", "exceptional", "outstanding", "perfect", "flawless",
        "fantastic", "superb", "magnificent", "brilliant", "spectacular", "impressive",
        "remarkable", "extraordinary", "astonishing", "wonderful", "marvelous", "phenomenal",
        "terrific", "stunning", "amazing", "incredible", "fabulous", "splendid", "delightful",
        "admirable", "commendable", "praiseworthy", "exemplary", "stellar", "superior",
        
        // Evaluative Adjectives (Negative)
        "bad", "terrible", "awful", "horrible", "atrocious", "dreadful", "appalling",
        "abysmal", "poor", "inadequate", "inferior", "substandard", "mediocre", "disappointing",
        "unsatisfactory", "unacceptable", "deficient", "faulty", "flawed", "shoddy",
        "deplorable", "lamentable", "pathetic", "pitiful", "regrettable", "miserable",
        
        // Political/Controversial Framing
        "controversial", "disputed", "radical", "extreme", "progressive", "conservative",
        "liberal", "far-right", "far-left", "moderate", "centrist", "mainstream", "fringe",
        
        // Intensifiers
        "very", "extremely", "incredibly", "exceptionally", "extraordinarily", "remarkably",
        "notably", "particularly", "especially", "surprisingly", "unusually", "strikingly"
    ];

    const toBeVerbs = [
        // Basic forms
        "is", "are", "am", "was", "were", "be", "being", "been",
        
        // Contractions
        "it's", "that's", "he's", "she's", "what's", "who's",
        "you're", "they're", "we're", "i'm", "there's", "here's"
    ];

    const absoluteWords = [
        // Universal Quantifiers
        "all", "every", "each", "any", "no", "none",
        "everyone", "everybody", "no one", "nobody", "anyone", "anybody", "someone", "somebody",
        
        // Temporal Absolutes
        "always", "never", "forever", "eternal", "constantly", "perpetually",
        "continually", "endlessly", "ceaselessly", "permanently", "invariably",
        
        // Degree Absolutes
        "completely", "totally", "entirely", "absolutely", "perfectly", "wholly",
        "thoroughly", "ultimately", "fundamentally", "purely", "outright",
        "comprehensively", "universally",
        
        // Universal Qualifiers
        "everything", "nothing", "anything", "something",
        
        // Absolute Adjectives
        "perfect", "complete", "total", "absolute", "entire", "full", "whole",
        "ultimate", "maximum", "minimum", "supreme", "extreme", "utmost",
        "final", "infallible", "unerring", "universal", "impossible",
        "inevitable", "inescapable", "undeniable", "irrefutable", "identical",
        "pure", "sheer", "mere"
    ];

    const passivePatterns = [
        // Basic passive structures
        "\\bwas\\s+\\w+ed\\b", "\\bwere\\s+\\w+ed\\b", 
        "\\bhas\\s+been\\s+\\w+ed\\b", "\\bhave\\s+been\\s+\\w+ed\\b",
        "\\bhad\\s+been\\s+\\w+ed\\b", "\\bis\\s+being\\s+\\w+ed\\b", 
        "\\bare\\s+being\\s+\\w+ed\\b",
        
        // Future and modal passives
        "\\bwill\\s+be\\s+\\w+ed\\b", "\\bwould\\s+be\\s+\\w+ed\\b", 
        "\\bcan\\s+be\\s+\\w+ed\\b", "\\bcould\\s+be\\s+\\w+ed\\b",
        "\\bshould\\s+be\\s+\\w+ed\\b", "\\bmust\\s+be\\s+\\w+ed\\b",
        "\\bmay\\s+be\\s+\\w+ed\\b", "\\bmight\\s+be\\s+\\w+ed\\b",
        
        // Common passive phrases
        "mistakes\\s+were\\s+made", "concerns\\s+have\\s+been\\s+raised",
        "it\\s+is\\s+believed", "it\\s+was\\s+decided", "it\\s+has\\s+been\\s+shown",
        "results\\s+were\\s+found", "conclusions\\s+were\\s+drawn",
        
        // Other passive indicators
        "\\bby\\s+[A-Z]\\w+\\b", // "by" followed by capitalized word (often indicates agent)
        "\\bgot\\s+\\w+ed\\b", "\\bget\\s+\\w+ed\\b", "\\bgetting\\s+\\w+ed\\b"
    ];

    const weaselPhrases = [
        // Vague attribution
        "many people say", "some say", "experts believe", "studies show",
        "it is said", "they say", "people think", "some argue",
        "critics claim", "supporters maintain", "sources indicate",
        "reportedly", "allegedly", "supposedly", "it is believed",
        
        // Unspecified quantities
        "many", "some", "few", "several", "various", "numerous",
        "a lot of", "lots of", "a number of", "a variety of",
        
        // Uncertain sources
        "research shows", "evidence suggests", "data indicates",
        "experts agree", "scientists claim", "authorities state",
        "observers note", "analysts predict", "insiders reveal",
        
        // Vague time references
        "recently", "lately", "in recent years", "nowadays", "these days",
        "at some point", "in the past", "traditionally", "historically"
    ];

    const presuppositionMarkers = [
        // Temporal presuppositions
        "even", "still", "another", "finally", "already", "yet", "again",
        "continues to", "refuses to", "fails to", "persists in",
        
        // Change-of-state verbs
        "stopped", "started", "began", "ceased", "quit", "resumed",
        "returned to", "went back to", "reverted to",
        
        // Factive verbs (presuppose truth of complement)
        "admits", "realizes", "knows", "discovers", "reveals",
        "acknowledges", "recognizes", "understands",
        
        // Counter-factive verbs (presuppose falsity)
        "pretends", "claims falsely", "incorrectly states",
        
        // Implicative verbs
        "managed to", "succeeded in", "failed to", "forgot to",
        "remembered to", "happened to", "bothered to",
        
        // Iteratives
        "repeated", "reiterated", "restated", "renewed",
        
        // Judgment words with presuppositions
        "even", "too", "also", "another", "additional",
        "further", "more", "other", "else",
        
        // Loaded labels
        "so-called", "alleged", "supposed", "self-proclaimed",
        "self-styled", "would-be", "wannabe", "purported"
    ];

    const warMetaphors = [
        // Military actions
        "battle", "fight", "combat", "attack", "defend", "offensive",
        "defensive", "strategy", "tactics", "campaign", "mission",
        
        // Military positions/locations
        "frontline", "battlefield", "war zone", "trenches", "bunker",
        "stronghold", "fortress", "barricade", "siege", "invasion",
        
        // Military roles
        "soldier", "warrior", "fighter", "combatant", "ally", "enemy",
        "adversary", "opponent", "reinforcements", "troops",
        
        // War-related phrases
        "war on", "battle against", "fight against", "crusade against",
        "under fire", "in the crosshairs", "on the offensive",
        "mounting an attack", "launching an assault", "mobilizing forces",
        
        // Victory/defeat language
        "victory", "defeat", "conquest", "surrender", "retreat",
        "casualties", "collateral damage", "winning", "losing",
        
        // Weapons/ammunition
        "arsenal", "ammunition", "weapons", "bombshell", "explosive",
        "armed with", "bullet points", "targeting", "aimed at"
    ];

    const minimizers = [
        // Basic minimizers
        "just", "only", "merely", "simply", "barely", "hardly",
        "scarcely", "slightly", "somewhat", "rather", "quite",
        
        // Diminutive adjectives
        "little", "small", "tiny", "minor", "slight", "trivial",
        "negligible", "insignificant", "minimal", "marginal",
        
        // Dismissive phrases
        "nothing but", "nothing more than", "no more than",
        "at most", "at best", "so-called", "supposedly",
        
        // Frequency minimizers
        "rarely", "seldom", "occasionally", "infrequently",
        "hardly ever", "almost never", "once in a while",
        
        // Scope minimizers
        "a bit", "a little", "sort of", "kind of", "somewhat",
        "partially", "partly", "to some extent", "moderately"
    ];

    const maximizers = [
        // Size/scale maximizers
        "massive", "huge", "enormous", "gigantic", "colossal",
        "immense", "vast", "tremendous", "monumental", "epic",
        
        // Crisis language
        "crisis", "disaster", "catastrophe", "calamity", "debacle",
        "fiasco", "nightmare", "chaos", "pandemonium", "apocalypse",
        
        // Intensity maximizers
        "extreme", "radical", "dramatic", "drastic", "severe",
        "acute", "dire", "desperate", "critical", "crucial",
        
        // Unprecedented language
        "unprecedented", "unparalleled", "extraordinary", "remarkable",
        "incredible", "unbelievable", "shocking", "stunning", "staggering",
        
        // Explosive language
        "explosion", "eruption", "surge", "skyrocket", "soar",
        "plummet", "plunge", "crash", "collapse", "meltdown",
        
        // Superlatives
        "greatest", "worst", "best", "most", "least",
        "highest", "lowest", "biggest", "smallest", "ultimate"
    ];

    const falseBalancePhrases = [
        // Direct balance phrases
        "both sides", "on one hand", "on the other hand", "equally valid",
        "two sides to every story", "balanced perspective", "middle ground",
        
        // False equivalence markers
        "just as", "equally", "similarly problematic", "comparable",
        "equivalent", "same thing", "no different from", "just like",
        
        // Debate framing
        "controversial issue", "ongoing debate", "disputed topic",
        "contentious matter", "divisive issue", "polarizing topic",
        "hotly debated", "much debated", "controversial subject",
        
        // Neutrality performance
        "to be fair", "in fairness", "playing devil's advocate",
        "for balance", "presenting both viewpoints", "alternative perspective",
        "counterargument", "opposing view", "different angle",
        
        // Academic hedging misused
        "some say", "others argue", "critics contend", "supporters claim",
        "one perspective", "another viewpoint", "competing theories",
        
        // Balance rhetoric
        "pros and cons", "advantages and disadvantages", "benefits and drawbacks",
        "strengths and weaknesses", "opportunities and challenges",
        
        // False compromise
        "meet in the middle", "find common ground", "compromise position",
        "moderate stance", "centrist view", "reasonable middle"
    ];

    const euphemisms = [
        // Military/Political euphemisms
        "enhanced interrogation", "collateral damage", "friendly fire",
        "extraordinary rendition", "kinetic military action", "neutralize",
        "terminate with extreme prejudice", "pacification", "police action",
        "conflict", "intervention", "regime change", "nation building",
        
        // Corporate euphemisms
        "rightsizing", "downsizing", "restructuring", "optimization",
        "synergy", "leverage", "streamlining", "workforce reduction",
        "redundancies", "let go", "pursuing other opportunities",
        "spending more time with family", "transitioning", "offboarding",
        
        // Death euphemisms
        "passed away", "passed on", "departed", "no longer with us",
        "went to a better place", "lost their life", "didn't make it",
        "succumbed", "expired", "deceased", "late",
        
        // Economic euphemisms
        "negative growth", "economic headwinds", "challenging conditions",
        "market correction", "quantitative easing", "austerity measures",
        "revenue enhancement", "tax relief", "entitlement reform",
        
        // Social euphemisms
        "economically disadvantaged", "underprivileged", "at-risk",
        "vulnerable populations", "marginalized communities",
        "developing nations", "emerging markets", "global south",
        
        // Environmental euphemisms
        "climate change" ,"(vs global warming)", "clean coal",
        "managed retreat", "carbon neutral", "sustainable development",
        
        // Medical euphemisms
        "therapeutic misadventure", "negative patient outcome",
        "terminal", "life-limiting condition", "comfort care",
        
        // Political correctness
        "differently abled", "physically challenged", "visually impaired",
        "hearing impaired", "intellectually disabled", "special needs"
    ];

    const emotionalTriggers = [
        // Fear appeals
        "dangerous", "threat", "risk", "peril", "menace", "hazard",
        "alarming", "frightening", "terrifying", "horrifying", "dire",
        
        // Children/innocence appeals
        "children", "kids", "innocent", "vulnerable", "defenseless",
        "protect our children", "think of the children", "our youth",
        "future generations", "innocent victims", "helpless",
        
        // Urgency/scarcity
        "act now", "limited time", "running out", "last chance",
        "before it's too late", "time is running out", "urgent",
        "immediate action required", "crisis", "emergency",
        
        // Moral outrage
        "outrageous", "disgraceful", "shameful", "deplorable",
        "unconscionable", "despicable", "reprehensible", "abhorrent",
        "morally bankrupt", "ethically wrong", "betrayal",
        
        // Patriotic/tribal appeals
        "un-American", "anti-American", "our values", "our way of life",
        "tradition", "heritage", "founding fathers", "real Americans",
        "true patriots", "love of country", "national identity",
        
        // Victim language
        "victims", "suffering", "persecution", "oppression", "injustice",
        "unfair treatment", "discrimination", "marginalized", "silenced"
    ];

    const gaslightingPhrases = [
        // Reality denial
        "that never happened", "you're imagining things", "that's not true",
        "you're making that up", "that's not what happened", "false memory",
        "you're misremembering", "that's not how it was", "you're confused",
        
        // Emotional invalidation
        "you're overreacting", "you're being dramatic", "too sensitive",
        "you're hysterical", "calm down", "you're emotional", "irrational",
        "you're taking it the wrong way", "can't take a joke", "lighten up",
        
        // Mental state attacks
        "you're crazy", "you're paranoid", "you're delusional", "insane",
        "you need help", "something wrong with you", "mental issues",
        "you're unstable", "losing your mind", "psycho",
        
        // Minimization
        "it's not that bad", "you're blowing it out of proportion",
        "making a big deal out of nothing", "mountain out of a molehill",
        "you're exaggerating", "being ridiculous", "overblown",
        
        // Blame shifting
        "you made me do it", "look what you made me do", "your fault",
        "you started it", "you provoked me", "pushed me to it",
        "brought it on yourself", "asking for it", "deserved it"
    ];

    const falseDilemmaPhrases = [
        // Direct either/or
        "either...or", "you're either with us or against us",
        "choose a side", "pick one", "can't have both", "one or the other",
        
        // Binary framing
        "only two options", "two choices", "binary choice", "black or white",
        "all or nothing", "yes or no", "in or out", "win or lose",
        
        // Exclusionary language
        "if you're not", "unless you", "those who don't", "anyone who doesn't",
        "real [group] would", "true [group] believe", "no real [group]",
        
        // Forced categorization
        "you're either a", "there are two types", "two kinds of people",
        "which camp", "what side", "where do you stand",
        
        // Ultimatums
        "it's either this or", "choose between", "decide now",
        "make up your mind", "commit or quit", "in or out",
        
        // No middle ground
        "no compromise", "no middle ground", "can't be neutral",
        "fence-sitting", "have to choose", "pick a lane"
    ];

    // BiasPatterns class from src/dictionaries/index.js
    class BiasPatterns {
        constructor() {
            this.rawPatterns = this.loadRawPatterns();
            this.compiledPatterns = new Map();
            this.compileAllPatterns();
        }

        loadRawPatterns() {
            return {
                opinion: opinionWords,
                tobe: toBeVerbs,
                absolute: absoluteWords,
                passive: passivePatterns,
                weasel: weaselPhrases,
                presupposition: presuppositionMarkers,
                metaphor: warMetaphors,
                minimizer: minimizers,
                maximizer: maximizers,
                falsebalance: falseBalancePhrases,
                euphemism: euphemisms,
                emotional: emotionalTriggers,
                gaslighting: gaslightingPhrases,
                falsedilemma: falseDilemmaPhrases
            };
        }

        compileAllPatterns() {
            for (const [type, patterns] of Object.entries(this.rawPatterns)) {
                this.compiledPatterns.set(type, this.compilePatterns(patterns, type));
            }
        }

        compilePatterns(patterns, type) {
            const compiled = [];
            
            for (const pattern of patterns) {
                try {
                    const compiledPattern = this.compilePattern(pattern, type);
                    if (compiledPattern) {
                        compiled.push(compiledPattern);
                    }
                } catch (error) {
                    console.warn(`Failed to compile pattern "${pattern}" for type ${type}:`, error);
                }
            }
            
            return compiled;
        }

        compilePattern(pattern, type) {
            const cleanPattern = pattern.trim();
            if (!cleanPattern) return null;

            try {
                const isComplexPattern = cleanPattern.includes('\\') || 
                                       cleanPattern.includes('(') || 
                                       cleanPattern.includes('[');

                let regexPattern;
                const flags = 'gi';

                if (isComplexPattern) {
                    regexPattern = cleanPattern;
                } else {
                    const escaped = this.escapeRegExp(cleanPattern);
                    regexPattern = cleanPattern.includes(' ') ? 
                                  escaped : 
                                  `\\b${escaped}\\b`;
                }

                const regex = new RegExp(regexPattern, flags);
                
                // Test the regex to catch obvious errors
                regex.test('test string');
                
                return {
                    source: cleanPattern,
                    regex: regex,
                    type: type,
                    isComplex: isComplexPattern
                };
                
            } catch (error) {
                console.warn(`Invalid regex pattern: ${cleanPattern}`, error);
                return null;
            }
        }

        escapeRegExp(string) {
            return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        }

        getCompiledPatterns(type) {
            return this.compiledPatterns.get(type) || [];
        }

        getAllCompiledPatterns() {
            return this.compiledPatterns;
        }

        // Performance monitoring
        getPatternStats() {
            const stats = {};
            for (const [type, patterns] of this.compiledPatterns) {
                stats[type] = {
                    count: patterns.length,
                    complexPatterns: patterns.filter(p => p.isComplex).length,
                    simplePatterns: patterns.filter(p => !p.isComplex).length
                };
            }
            return stats;
        }
    }

    // ============================================================================
    // BIAS DETECTOR
    // ============================================================================
    
    // BiasDetector from src/content/BiasDetector.js
    class BiasDetector {
        constructor() {
            this.settings = BiasConfig.getDefaultSettings();
            this.patterns = new BiasPatterns();
            this.domProcessor = new DOMProcessor();
            this.excellenceDetector = new ExcellenceDetector();
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
                        matches.push({
                            index: match.index,
                            length: match[0].length,
                            text: match[0],
                            type: type,
                            pattern: pattern.source
                        });
                        
                        // Prevent infinite loops with zero-width matches
                        if (match.index === pattern.regex.lastIndex) {
                            pattern.regex.lastIndex++;
                        }
                    }
                } catch (error) {
                    console.warn(`Error with pattern ${pattern.source}:`, error);
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
                console.error('Document analysis failed:', error);
                return this.createEmptyStats();
            }
        }

        // Process a batch of text nodes
        async processBatch(textNodes) {
            for (const node of textNodes) {
                try {
                    await this.processTextNode(node);
                } catch (error) {
                    console.warn('Error processing text node:', error);
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

        // Remove overlapping matches, preferring longer matches
        deduplicateMatches(matches) {
            const sorted = matches.sort((a, b) => {
                if (a.index !== b.index) return a.index - b.index;
                return b.length - a.length; // Prefer longer matches
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
                await this.analyzeDocument();
            }
        }

        // Utility methods
        isUIText(text) {
            const trimmed = text.trim();
            return (
                trimmed.length < 20 && 
                !trimmed.includes(' ') || 
                /^[\d\s\-\+\(\)]+$/.test(trimmed) || // Numbers/phone
                /^[A-Z\s]{2,10}$/.test(trimmed) // Short caps (likely buttons/labels)
            );
        }

        updateStats(match) {
            if (match.isExcellence) {
                const config = BiasConfig.EXCELLENCE_TYPES[match.type.toUpperCase()];
                if (config && config.statKey) {
                    this.stats[config.statKey] = (this.stats[config.statKey] || 0) + 1;
                }
            } else {
                const detector = this.compiledDetectors.get(match.type);
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

    // ============================================================================
    // MAIN CONTENT SCRIPT
    // ============================================================================
    
    // From src/content/content-script.js
    // Initialize the bias detector
    let biasDetector = null;
    let isInitialized = false;

    // Initialize the detector
    function initialize() {
        if (isInitialized) return;
        
        try {
            biasDetector = new BiasDetector();
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
        
        // Small delay to ensure processing is complete before sending stats
        setTimeout(() => {
            const stats = biasDetector.getStats();
            sendResponse({ 
                success: true, 
                stats: stats,
                message: 'Settings updated successfully' 
            });
        }, 100);
    }

    // Handle stats request
    function handleGetStats(sendResponse) {
        const stats = biasDetector.getStats();
        console.log('Sending stats:', stats);
        sendResponse(stats);
    }

    // Handle force analyze request
    async function handleForceAnalyze(sendResponse) {
        console.log('Force analyze requested');
        
        try {
            biasDetector.clearHighlights();
            
            // Small delay to ensure DOM is updated
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

    // Handle clear highlights request
    function handleClearHighlights(sendResponse) {
        console.log('Clear highlights requested');
        
        biasDetector.clearHighlights();
        const stats = biasDetector.getStats();
        
        sendResponse({ 
            success: true, 
            stats: stats,
            message: 'Highlights cleared successfully' 
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

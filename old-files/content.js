// content.js - Enhanced with Excellence Detection and Intensity Levels
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
    // EXCELLENCE DETECTOR CLASS - Positive pattern detection
    // ============================================================================
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

    // Create global instance
    const excellenceDetector = new ExcellenceDetector();

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
        
        // Add excellence types to configuration
        EXCELLENCE_TYPES: {
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
        },

        PERFORMANCE: {
            BATCH_SIZE: 50,
            MUTATION_DEBOUNCE: 1000,
            MIN_SIGNIFICANT_TEXT: 5
        },

        getDefaultSettings() {
            const settings = { 
                enableAnalysis: true,
                analysisMode: 'balanced' // 'problems', 'excellence', or 'balanced'
            };
            // Add bias settings
            for (const config of Object.values(this.BIAS_TYPES)) {
                settings[config.settingKey] = config.enabled;
            }
            // Add excellence settings
            for (const config of Object.values(this.EXCELLENCE_TYPES)) {
                settings[config.settingKey] = config.enabled;
            }
            return settings;
        },

        createEmptyStats() {
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
        },

        validateSettings(settings) {
            const validated = { ...this.getDefaultSettings() };
            for (const [key, value] of Object.entries(settings)) {
                if (key === 'enableAnalysis' || key === 'analysisMode' ||
                    Object.values(this.BIAS_TYPES).some(config => config.settingKey === key) ||
                    Object.values(this.EXCELLENCE_TYPES).some(config => config.settingKey === key)) {
                    validated[key] = key === 'analysisMode' ? value : Boolean(value);
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

            // Hedging/Uncertainty Words - ADDED "seems" and "appears" here
            "seems", "appears", "seemingly", "apparently",
            "allegedly?", "supposedly?", "evidently?", "arguably?", 
            "ostensibly?", "reportedly?", "reputedly?", "presumably?", "purportedly?",

            // Evaluative Adjectives (Positive) - with plurals
            "goods?", "greats?", "excellents?", "exceptionals?", "outstandings?", "perfects?", "flawless",
            "fantastics?", "superbs?", "magnificents?", "brilliants?", "spectaculars?", "impressives?",
            "remarkables?", "extraordinar(?:y|ies)", "astonishings?", "wonderfuls?", "marvelous", "phenomenals?",
            "terrifics?", "stunnings?", "amazings?", "incredibles?", "fabulous", "splendids?", "delightfuls?",
            "admirables?", "commendables?", "praiseworthys?", "exemplar(?:y|ies)", "stellars?", "superiors?",

            // Evaluative Adjectives (Negative) - with plurals
            "bads?", "terribles?", "awfuls?", "horribles?", "atrocious", "dreadfuls?", "appallings?",
            "abysmals?", "poors?", "inadequates?", "inferiors?", "substandards?", "mediocres?", "disappointings?",
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
            // Universal Quantifiers - FIXED with proper word boundaries
            "\\b(?:all|every|each|any|no|none)\\b(?:\\s+\\w+)?",
            "\\b(?:everyone|everybody|no\\s+one|nobody|anyone|anybody|someone|somebody)\\b",
            "\\b(?:always|never|forever|eternal|constantly|perpetually|continually|endlessly|ceaselessly|permanently|invariably)\\b",
            "\\b(?:completely|totally|entirely|absolutely|perfectly|wholly|thoroughly|ultimately|fundamentally|purely|outright|comprehensively|universally)\\b",
            "\\b(?:everything|nothing|anything|something)\\b",
            // Absolute adjectives with variations
            "\\b(?:perfect|complete|total|absolute|entire|full|whole|ultimate|maximum|minimum|supreme|extreme|utmost|final|infallible|unerring|universal|impossible|inevitable|inescapable|undeniable|irrefutable|identical|pure|sheer|mere)s?\\b"
        ],

        passive: [
            "\\bwas\\s+\\w+ed\\b", "\\bwere\\s+\\w+ed\\b", "\\bhas\\s+been\\s+\\w+ed\\b", "\\bhave\\s+been\\s+\\w+ed\\b",
            "\\bhad\\s+been\\s+\\w+ed\\b", "\\bis\\s+being\\s+\\w+ed\\b", "\\bare\\s+being\\s+\\w+ed\\b",
            "\\bwill\\s+be\\s+\\w+ed\\b", "\\bwould\\s+be\\s+\\w+ed\\b", "\\bcan\\s+be\\s+\\w+ed\\b",
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
            // Direct balance phrases
            "both sides", "on one hand", "on the other hand", "equally valid",
            "two sides to every story", "balanced perspective", "middle ground",
            // False equivalence markers
            "just as", "alternative facts", "different truths", "competing narratives",
            // Debate framing
            "controversial issue", "ongoing debate", "two schools of thought",
            "divisive issue", "contentious matter", "polarizing topic",
            "hotly debated", "much debated", "disputed territory",
            // Neutrality performance
            "to be fair", "in fairness", "playing devil's advocate",
            "alternative viewpoints", "matter of opinion", "different perspectives",
            // Balance rhetoric
            "pros and cons", "strengths and weaknesses", "supporters and critics",
            "advantages and disadvantages", "benefits and drawbacks"
        ],

        euphemism: [
            // Military/Political euphemisms
            "enhanced interrogation", "collateral damage", "friendly fire", "extraordinary rendition",
            "kinetic action", "strategic withdrawal", "enhanced enforcement",
            "regime change", "surgical strike", "soft targets", "neutralize",
            "pacification", "police action", "conflict resolution",
            // Corporate euphemisms
            "rightsizing", "downsizing", "restructuring", "workforce adjustment",
            "negative growth", "challenging market conditions", "synergy realization",
            "offshoring", "outsourcing", "optimization", "streamlining",
            "let go", "between jobs", "transitioning",
            // Social euphemisms
            "passed away", "departed", "no longer with us", "passed on",
            "senior citizens", "golden years", "economically disadvantaged",
            "differently abled", "special needs", "physically challenged",
            "urban", "inner city", "at-risk", "underserved",
            // Medical euphemisms
            "therapeutic misadventure", "terminal illness", "growth", "mass",
            // Environmental euphemisms
            "climate change", "carbon neutral", "sustainable development",
            // Immigration euphemisms/dysphemisms
            "undocumented workers", "illegal aliens", "chain migration",
            // Political dysphemisms
            "death tax", "socialized medicine", "government takeover",
            "nanny state", "job killers", "tax and spend", "welfare state",
            // Additional military/political
            "regime change", "surgical strike", "soft targets", "neutralize",
            "pacification", "police action", "conflict resolution",
            // Additional corporate
            "offshoring", "outsourcing", "optimization", "streamlining",
            "let go", "between jobs", "transitioning",
            // Additional social
            "passed on", "physically challenged", "urban", "inner city", "at-risk", "underserved",
            // Medical euphemisms
            "therapeutic misadventure", "terminal illness", "growth", "mass",
            // Environmental euphemisms
            "climate change", "carbon neutral", "sustainable development"
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
    // ENHANCED DOM PROCESSOR - With excellence highlighting support
    // ============================================================================
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
                if (className.startsWith(this.highlightClassPrefix) || 
                    className.startsWith(this.excellenceClassPrefix)) {
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
                
                // Determine class name based on match type
                if (match.isExcellence) {
                    span.className = match.className;
                } else {
                    span.className = `${this.highlightClassPrefix}${match.type}`;
                    // Add intensity class if present
                    if (match.intensity) {
                        span.className += ` bias-intensity-${match.intensity}`;
                    }
                    // Add portrayal class if present
                    if (match.portrayal) {
                        span.className += ` portrayal-${match.portrayal.valence}`;
                    }
                }
                
                span.textContent = match.text;
                span.title = match.tooltip || `${match.type}: ${match.text}`;
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
            const selectors = [
                ...Object.values(BiasConfig.BIAS_TYPES).map(config => `.${config.className}`),
                ...Object.values(BiasConfig.EXCELLENCE_TYPES).map(config => `.${config.className}`)
            ].join(', ');

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
            const config = Object.values(BiasConfig.BIAS_TYPES).find(c => c.id === type) ||
                          Object.values(BiasConfig.EXCELLENCE_TYPES).find(c => c.id === type);
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
    // ENHANCED BIAS DETECTOR - With excellence detection and mode support
    // ============================================================================
    class BiasDetector {
        constructor() {
            this.settings = BiasConfig.getDefaultSettings();
            this.patterns = new PatternCompiler();
            this.domProcessor = new DOMProcessor();
            this.stats = this.createEmptyStats();
            this.observer = null;
            this.mode = 'balanced'; // 'problems', 'excellence', or 'balanced'

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
                        const matchData = {
                            index: match.index,
                            length: match[0].length,
                            text: match[0],
                            type: type,
                            pattern: pattern.source
                        };
                        
                        // Add intensity for problem patterns
                        matchData.intensity = excellenceDetector.calculateIntensity(match[0], type);
                        
                        // Check for subject portrayal
                        const portrayal = excellenceDetector.detectPortrayal(match[0]);
                        if (portrayal) {
                            matchData.portrayal = portrayal;
                        }
                        
                        matches.push(matchData);

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
                
                // Calculate health score
                const excellenceTotal = Object.values(BiasConfig.EXCELLENCE_TYPES)
                    .reduce((sum, config) => sum + (this.stats[config.statKey] || 0), 0);
                const problemsTotal = Object.values(BiasConfig.BIAS_TYPES)
                    .reduce((sum, config) => sum + (this.stats[config.statKey] || 0), 0);
                
                this.stats.healthScore = excellenceDetector.calculateHealthScore(excellenceTotal, problemsTotal);

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
            const mode = this.settings.analysisMode || 'balanced';

            // Detect problems if mode is 'problems' or 'balanced'
            if (mode === 'problems' || mode === 'balanced') {
                for (const [type, detector] of this.compiledDetectors) {
                    if (detector.isEnabled()) {
                        const matches = detector.detect(text);
                        allMatches.push(...matches.map(match => ({ ...match, type })));
                    }
                }
            }

            // Detect excellence if mode is 'excellence' or 'balanced'
            if (mode === 'excellence' || mode === 'balanced') {
                const excellenceMatches = excellenceDetector.findExcellence(text);
                // Filter excellence matches based on settings
                const enabledExcellence = excellenceMatches.filter(match => {
                    const config = BiasConfig.EXCELLENCE_TYPES[match.type.toUpperCase()];
                    return config && this.settings[config.settingKey] !== false;
                });
                allMatches.push(...enabledExcellence);
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
                this.updateStats(match.type, match.isExcellence);
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
            
            // Handle mode change
            if (oldSettings.analysisMode !== newSettings.analysisMode) {
                await this.analyzeDocument();
                return;
            }

            if (newSettings.enableAnalysis) {
                await this.handleDetectorChanges(oldSettings, newSettings);
            }
        }

        async handleDetectorChanges(oldSettings, newSettings) {
            let needsReanalysis = false;

            // Check bias detectors
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
            
            // Check excellence detectors
            for (const [key, config] of Object.entries(BiasConfig.EXCELLENCE_TYPES)) {
                if (oldSettings[config.settingKey] !== newSettings[config.settingKey]) {
                    if (!newSettings[config.settingKey]) {
                        this.domProcessor.removeSpecificHighlights(config.id);
                        this.stats[config.statKey] = 0;
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

        updateStats(type, isExcellence = false) {
            if (isExcellence) {
                const config = BiasConfig.EXCELLENCE_TYPES[type.toUpperCase()];
                if (config && config.statKey) {
                    this.stats[config.statKey] = (this.stats[config.statKey] || 0) + 1;
                }
            } else {
                const detector = this.compiledDetectors.get(type);
                if (detector && detector.statKey) {
                    this.stats[detector.statKey]++;
                }
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
            debugLog('E-Prime Bias Detector (with Excellence) initialized successfully');
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
                    
                case 'changeMode':
                    await handleChangeMode(request, sendResponse);
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
    
    async function handleChangeMode(request, sendResponse) {
        debugLog('Mode change requested:', request.mode);
        
        const currentSettings = { ...biasDetector.settings };
        currentSettings.analysisMode = request.mode;
        await biasDetector.updateSettings(currentSettings);
        
        const stats = biasDetector.getStats();
        sendResponse({
            success: true,
            stats: stats,
            message: `Mode changed to ${request.mode}`
        });
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
            },
            testExcellence: (text) => excellenceDetector.findExcellence(text),
            testIntensity: (text, type) => excellenceDetector.calculateIntensity(text, type),
            testPortrayal: (text) => excellenceDetector.detectPortrayal(text)
        };

        debugLog('Debug utilities available at window.ePrimeDebug');
    }

})();

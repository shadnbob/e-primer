// config/BiasConfig.js - Centralized configuration management
export class BiasConfig {
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
            enableAnalysis: true
        };

        // Add all bias type settings with their default enabled state
        for (const [key, config] of Object.entries(this.BIAS_TYPES)) {
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
        const stats = {};
        for (const config of Object.values(this.BIAS_TYPES)) {
            stats[config.statKey] = 0;
        }
        return stats;
    }

    static validateSettings(settings) {
        const validated = { ...this.getDefaultSettings() };
        
        // Validate each setting
        for (const [key, value] of Object.entries(settings)) {
            if (key === 'enableAnalysis' || 
                Object.values(this.BIAS_TYPES).some(config => config.settingKey === key)) {
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

// Export specific configurations for easy access
export const BIAS_TYPES = BiasConfig.BIAS_TYPES;
export const CATEGORIES = BiasConfig.CATEGORIES;
export const PERFORMANCE = BiasConfig.PERFORMANCE;
export const FEATURES = BiasConfig.FEATURES;

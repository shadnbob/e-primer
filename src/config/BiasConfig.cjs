// config/BiasConfig.cjs - CommonJS version for testing
// This is a simplified version of BiasConfig.js converted to CommonJS for Jest compatibility

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
            examples: {
                problematic: [
                    'obviously the best solution',
                    'terrible policy (stated as fact)',
                    'clearly demonstrates'
                ],
                acceptable: [
                    'In my opinion, this is effective',
                    'Dr. Johnson considers this promising',
                    'I find this approach compelling'
                ]
            }
        },
        
        TO_BE: {
            id: 'tobe',
            name: 'To-Be Verbs',
            description: 'Forms of "to be" that can create false equivalencies',
            category: 'basic',
            color: '#4285f4',
            className: 'bias-highlight-tobe',
            settingKey: 'highlightToBe',
            statKey: 'toBeCount',
            enabled: true,
            tooltip: 'E-Prime violations that may obscure agency or create false certainty'
        },

        ABSOLUTE: {
            id: 'absolute',
            name: 'Absolute Statements',
            description: 'Universal claims and extreme language',
            category: 'basic',
            color: '#ff69b4',
            className: 'bias-highlight-absolute',
            settingKey: 'highlightAbsolute',
            statKey: 'absoluteCount',
            enabled: true,
            tooltip: 'Extreme language that leaves no room for exceptions'
        }
    };

    static CATEGORIES = {
        basic: {
            name: 'Basic Detection',
            description: 'Fundamental bias patterns everyone should recognize',
            expanded: true,
            order: 1
        },
        advanced: {
            name: 'Advanced Detection',
            description: 'Sophisticated bias patterns requiring more analysis',
            expanded: false,
            order: 2
        }
    };

    // Get all bias types as array
    static getAllBiasTypes() {
        return Object.values(this.BIAS_TYPES);
    }

    // Get bias type by ID
    static getBiasType(id) {
        return Object.values(this.BIAS_TYPES).find(type => type.id === id);
    }

    // Get bias types by category
    static getBiasTypesByCategory(category) {
        return Object.values(this.BIAS_TYPES).filter(type => type.category === category);
    }

    // Check if bias type is enabled by default
    static isEnabledByDefault(id) {
        const biasType = this.getBiasType(id);
        return biasType ? biasType.enabled : false;
    }

    // Validate bias type configuration
    static validateBiasType(biasType) {
        const required = ['id', 'name', 'description', 'category', 'color', 'className'];
        const missing = required.filter(prop => !biasType.hasOwnProperty(prop));
        
        if (missing.length > 0) {
            throw new Error(`Missing required properties: ${missing.join(', ')}`);
        }

        // Validate color is hex
        if (!/^#[0-9A-F]{6}$/i.test(biasType.color)) {
            throw new Error(`Invalid color format: ${biasType.color}`);
        }

        return true;
    }

    // Get CSS class name for bias type
    static getClassName(id) {
        const biasType = this.getBiasType(id);
        return biasType ? biasType.className : null;
    }

    // Get statistics key for bias type
    static getStatKey(id) {
        const biasType = this.getBiasType(id);
        return biasType ? biasType.statKey : null;
    }
}

module.exports = { BiasConfig };
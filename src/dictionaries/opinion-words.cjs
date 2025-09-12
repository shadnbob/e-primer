// dictionaries/opinion-words.cjs - CommonJS version for testing

const opinionWords = {
    certainty: {
        icon: '🎯',
        color: '#ff6b6b',
        name: 'Certainty/Conviction',
        description: 'Words that push readers toward unquestioning acceptance by conveying false certainty about debatable topics.',
        words: [
            "clearly", "obviously", "undoubtedly", "certainly", "definitely", "absolutely",
            "surely", "undeniably", "unquestionably", "indisputably", "indubitably", "unmistakably",
            "incontrovertibly", "incontestably", "irrefutably", "manifestly", "patently"
        ]
    },

    hedging: {
        icon: '❓',
        color: '#ffa726',
        name: 'Hedging/Uncertainty',
        description: 'Words that create unnecessary doubt or vagueness, often to avoid taking responsibility for claims.',
        words: [
            "probably", "maybe", "perhaps", "conceivably", "speculated", "rumored"
        ]
    },

    evaluative: {
        icon: '⚖️',
        color: '#9c27b0',
        name: 'Evaluative/Judgmental',
        description: 'Words that express judgments or evaluations that may not be universally shared.',
        words: [
            "terrible", "awful", "wonderful", "fantastic", "brilliant", "stupid",
            "genius", "idiotic", "perfect", "flawless", "hopeless", "useless"
        ]
    }
};

module.exports = { opinionWords };
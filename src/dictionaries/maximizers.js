// dictionaries/maximizers.js
export const maximizerWords = {
    scale_inflation: {
        icon: '📏',
        color: '#6a1b9a',
        name: 'Scale Inflation',
        description: 'Words that inflate physical or numerical magnitude without comparative context.',
        implication: 'Creates a false sense of scale by using extreme size language for things that may be moderate or normal.',
        suggestion: 'Ask: compared to what baseline? Replace with specific measurements or comparisons.',
        examples: 'Instead of "massive increase" → "a 15% increase" or "an increase three times the annual average"',
        words: [
            "massive", "huge", "enormous", "gigantic", "colossal",
            "vast", "immense", "towering", "overwhelming", "mammoth",
            "gargantuan", "titanic"
        ]
    },

    catastrophizing: {
        icon: '🚨',
        color: '#b71c1c',
        name: 'Catastrophizing',
        description: 'Crisis and disaster language applied to situations that may not warrant emergency framing.',
        implication: 'Triggers fear responses for non-emergency situations, distorting risk perception and urgency.',
        suggestion: 'Ask: is this genuinely a crisis? Replace with proportionate language and specific impact data.',
        examples: 'Instead of "crisis" → "a growing concern" or "a problem affecting 5% of users"',
        words: [
            "crisis", "disaster", "catastrophe", "epidemic", "plague",
            "explosion",
            "apocalyptic", "calamity", "cataclysm", "meltdown",
            "fiasco", "debacle", "train wreck"
        ]
    },

    dramatic_verbs: {
        icon: '💥',
        color: '#e65100',
        name: 'Dramatic Verbs',
        description: 'Verbs that exaggerate the degree of change or destruction beyond what the facts support.',
        implication: 'Replaces measured description with violent or extreme action language, distorting actual impact.',
        suggestion: 'Ask: what are the actual numbers? Replace with precise verbs that describe the real magnitude.',
        examples: 'Instead of "costs skyrocketed" → "costs increased by 40%" or "costs rose sharply over six months"',
        words: [
            "skyrocket", "plummet", "devastate", "destroy",
            "annihilate", "obliterate", "decimate",
            "implode", "explode", "torpedo", "shatter",
            "ravage", "gut", "eviscerate", "cripple"
        ]
    },

    superlative_hype: {
        icon: '✨',
        color: '#1565c0',
        name: 'Superlative Hype',
        description: 'Adjectives of extreme impressiveness that create false uniqueness or exceptionality.',
        implication: 'Makes ordinary things sound extraordinary, inflating expectations and distorting significance.',
        suggestion: 'Ask: unprecedented compared to what? Replace with specific evidence of what makes this notable.',
        examples: 'Instead of "unprecedented" → "the first since 2008" or "exceeds previous records by 12%"',
        words: [
            "revolutionary", "unprecedented", "extraordinary",
            "incredible", "amazing", "astonishing", "staggering",
            "spectacular", "phenomenal",
            "unparalleled", "unrivaled", "unmatched",
            "mind-blowing", "jaw-dropping", "awe-inspiring"
        ]
    },

    paradigm_shift: {
        icon: '🔄',
        color: '#2e7d32',
        name: 'Paradigm Shift',
        description: 'Claims of transformative, game-changing impact that imply everything has fundamentally changed.',
        implication: 'Overstates the significance of changes, implying a complete transformation when the reality may be incremental.',
        suggestion: 'Ask: what specifically changed? Replace with concrete descriptions of what is different and how.',
        examples: 'Instead of "game changing" → "introduces a new approach to X that reduces cost by 30%"',
        words: [
            "monumental", "tremendous", "breakthrough",
            "game\\s+changing", "earth\\s+shattering",
            "paradigm\\s+shifting", "world\\s+changing", "transformative",
            "disruptive", "landmark", "watershed",
            "sea\\s+change", "tipping\\s+point", "turning\\s+point"
        ]
    }
};

// Export a flat array for backward compatibility
export const maximizersFlat = Object.values(maximizerWords).flatMap(category => category.words);

// Legacy export name for backward compatibility
export const maximizers = maximizersFlat;

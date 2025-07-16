// dictionaries/opinion-words.js
export const opinionWords = {
    certainty: {
        icon: '🎯',
        color: '#ff6b6b',
        name: 'Certainty/Conviction',
        description: 'Words that push readers toward unquestioning acceptance by conveying false certainty about debatable topics.',
        implication: 'Creates false authority and discourages critical thinking by presenting opinions as indisputable facts.',
        suggestion: 'Use more tentative language that acknowledges uncertainty and invites evaluation.',
        examples: 'Instead of "obviously wrong" → "appears to contradict" or "I believe this is incorrect"',
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
        implication: 'Undermines confidence and can signal the writer is unsure of their position or trying to avoid accountability.',
        suggestion: 'Be more definitive when you have evidence, or explain the specific reasons for uncertainty.',
        examples: 'Instead of "maybe true" → "requires further investigation" or "preliminary evidence suggests"',
        words: [
            "probably", "maybe", "perhaps", "conceivably", "speculated", "rumored"
        ]
    },

    evaluative_positive: {
        icon: '👍',
        color: '#66bb6a',
        name: 'Positive Evaluation',
        description: 'Subjective positive judgments that reveal the writer\'s approval without objective criteria.',
        implication: 'Biases readers toward positive evaluation without providing evidence or reasoning for the judgment.',
        suggestion: 'Replace with specific, measurable criteria or acknowledge the subjective nature of the evaluation.',
        examples: 'Instead of "excellent performance" → "achieved 95% accuracy" or "I consider this performance strong because..."',
        words: [
            "good", "great", "excellent", "exceptional", "outstanding", "perfect", "flawless",
            "admirable", "commendable", "praiseworthy", "exemplary", "stellar", "superior",
            "first-rate", "top-notch", "premium", "favorable", "positive", "satisfactory",
            "pleasing", "gratifying", "beneficial", "advantageous", "desirable", "worthy"
        ]
    },

    evaluative_negative: {
        icon: '👎',
        color: '#ef5350',
        name: 'Negative Evaluation',
        description: 'Subjective negative judgments that reveal the writer\'s disapproval without objective criteria.',
        implication: 'Biases readers toward negative evaluation without providing evidence or reasoning for the judgment.',
        suggestion: 'Replace with specific, measurable criteria or acknowledge the subjective nature of the evaluation.',
        examples: 'Instead of "poor quality" → "failed to meet safety standards" or "I find this concerning because..."',
        words: [
            "abysmal", "poor", "inadequate", "inferior", "substandard", "mediocre", "disappointing",
            "unsatisfactory", "unacceptable", "deficient", "faulty", "flawed", "shoddy",
            "deplorable", "lamentable", "pathetic", "pitiful", "regrettable", "miserable",
            "wretched", "dismal", "grim", "bleak", "dire", "grave", "severe", "unfortunate",
            "unfavorable", "disagreeable", "unpleasant", "distressing", "troublesome",
            "problematic", "objectionable", "reprehensible", "repugnant", "detestable"
        ]
    },

    emotional_charge: {
        icon: '⚡',
        color: '#ab47bc',
        name: 'Emotional Charge',
        description: 'Words designed to trigger strong emotional responses that bypass logical evaluation.',
        implication: 'Manipulates readers through emotion rather than reason, potentially clouding judgment.',
        suggestion: 'Use neutral language that allows readers to form their own emotional responses based on facts.',
        examples: 'Instead of "heartwarming story" → "story about community support" or "horrifying event" → "traumatic incident"',
        words: [
            "heartwarming", "touching", "moving", "soothing", "comforting", "reassuring",
            "uplifting", "exhilarating", "thrilling", "exciting", "sensational", "delightful",
            "disgusting", "revolting", "sickening", "nauseating", "offensive", "frightening",
            "terrifying", "horrifying", "alarming", "worrying", "concerning", "threatening"
        ]
    },

    comparative: {
        icon: '📊',
        color: '#42a5f5',
        name: 'Comparative/Superlative',
        description: 'Words that create artificial rankings or comparisons without context or criteria.',
        implication: 'Establishes hierarchies without justification, potentially misleading readers about relative importance or quality.',
        suggestion: 'Provide specific criteria for comparison or use measured language that acknowledges context.',
        examples: 'Instead of "the best solution" → "an effective solution" or "the most efficient approach we tested"',
        words: [
            "best", "worst", "better", "worse", "superior", "inferior", "greater", "lesser",
            "bigger", "smaller", "higher", "lower", "finer", "poorer", "strongest", "weakest",
            "finest", "prettiest", "ugliest", "smartest", "dumbest", "brightest", "darkest"
        ]
    },

    political_framing: {
        icon: '🏛️',
        color: '#8d6e63',
        name: 'Political Framing',
        description: 'Words that frame issues in political terms, potentially polarizing neutral topics.',
        implication: 'Activates political identity and tribal thinking, making objective evaluation more difficult.',
        suggestion: 'Use neutral, descriptive language that focuses on specific policies or actions rather than political labels.',
        examples: 'Instead of "radical proposal" → "proposal that differs significantly from current policy" or describe specific elements',
        words: [
            "controversial", "disputed", "radical", "extreme", "progressive", "conservative",
            "liberal", "far-right", "far-left", "moderate", "centrist", "mainstream", "fringe",
            "revolutionary", "traditional", "conventional", "unconventional", "orthodox",
            "unorthodox", "establishment", "anti-establishment", "populist", "elitist",
            "partisan", "bipartisan", "divisive", "polarizing", "contentious", "provocative"
        ]
    },

    intensifiers: {
        icon: '🔥',
        color: '#ff7043',
        name: 'Intensifiers',
        description: 'Words that amplify or exaggerate without adding meaningful information.',
        implication: 'Creates artificial emphasis that can distort the actual significance of events or characteristics.',
        suggestion: 'Use specific, measurable descriptions or remove unnecessary intensification.',
        examples: 'Instead of "extremely important" → "critical for project success" or "increased by 300%"',
        words: [
            "very", "extremely", "incredibly", "exceptionally", "extraordinarily", "remarkably",
            "notably", "particularly", "especially", "surprisingly", "unusually", "strikingly",
            "decidedly", "markedly", "profoundly", "deeply", "vastly", "greatly", "highly",
            "immensely", "tremendously", "enormously", "exceedingly", "excessively", "overly",
            "utterly", "completely", "entirely", "totally", "wholly", "thoroughly", "fully",
            "intensely", "seriously", "substantially", "significantly", "considerably"
        ]
    },

    credibility_undermining: {
        icon: '🗣️',
        color: '#78909c',
        name: 'Credibility Undermining',
        description: 'Words that question or attack credibility without providing evidence or reasoning.',
        implication: 'Weakens trust in sources through insinuation rather than substantive critique.',
        suggestion: 'Address specific claims with evidence rather than attacking the source\'s credibility.',
        examples: 'Instead of "so-called expert" → "Dr. Smith, whose methodology differs from mainstream approaches" or address specific claims',
        words: [
            "claims", "purports", "asserts", "alleges", "contends", "maintains", "insists",
            "so-called", "self-proclaimed", "supposed", "pretend", "dubious", "questionable",
            "unproven", "unverified", "unsubstantiated", "unfounded", "baseless", "groundless"
        ]
    },

    loaded_political: {
        icon: '⚖️',
        color: '#5d4037',
        name: 'Loaded Political Terms',
        description: 'Words that carry heavy political or ideological baggage, triggering partisan responses.',
        implication: 'Activates political identity and bias, making neutral evaluation difficult.',
        suggestion: 'Use specific, descriptive language that focuses on actions or policies rather than loaded terms.',
        examples: 'Instead of "socialist policies" → "government-funded programs" or "authoritarian regime" → "government that restricts civil liberties"',
        words: [
            "freedom", "justice", "equality", "rights", "liberty", "democracy", "patriotic",
            "unpatriotic", "un-American", "socialist", "communist", "fascist", "dictatorial",
            "totalitarian", "authoritarian", "corrupt", "crooked", "dishonest", "shady",
            "illegal", "unlawful", "criminal", "scandal", "conspiracy", "regime", "propaganda"
        ]
    },

    moral_judgments: {
        icon: '⚖️',
        color: '#7e57c2',
        name: 'Moral/Ethical Judgments',
        description: 'Words that impose moral frameworks without acknowledging their subjective nature.',
        implication: 'Presents moral judgments as universal truths rather than perspective-dependent evaluations.',
        suggestion: 'Acknowledge the subjective nature of moral judgments or specify the ethical framework being used.',
        examples: 'Instead of "immoral behavior" → "behavior that violates principle X" or "I consider this unethical because..."',
        words: [
            "moral", "immoral", "ethical", "unethical", "virtuous", "corrupt", "just", "unjust",
            "fair", "unfair", "honorable", "dishonorable", "honest", "dishonest", "decent",
            "indecent", "appropriate", "inappropriate", "acceptable", "unacceptable",
            "legitimate", "illegitimate", "reasonable", "unreasonable"
        ]
    },

    emotional_appeals: {
        icon: '💭',
        color: '#26a69a',
        name: 'Emotional Appeals',
        description: 'Words that bypass logical evaluation by directly targeting emotional responses.',
        implication: 'Manipulates emotional state to influence opinion without providing rational justification.',
        suggestion: 'Focus on factual information that allows readers to form their own emotional responses.',
        examples: 'Instead of "promising developments" → "developments that may lead to improved outcomes" or provide specific evidence',
        words: [
            "promising", "depressing", "gloomy", "optimistic", "pessimistic", "anxious",
            "fearful", "afraid", "confident", "proud", "ashamed", "embarrassed", "guilty"
        ]
    }
};

// Export a flat array for backward compatibility
export const opinionWordsFlat = Object.values(opinionWords).flatMap(category => category.words);

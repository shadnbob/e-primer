// dictionaries/absolute-words.js
// Words grouped by intensity: 1 = mild, 2 = moderate, 3 = strong
export const absoluteWords = {
    1: [
        // Soft universals — often used casually without absolute intent
        "any", "each",
        "anyone", "anybody",
        "someone", "somebody",
        "something", "anything",
        "full", "whole",
        "final", "mere"
    ],
    2: [
        // Standard absolutes — categorical claims that are rarely literally true
        "all", "every", "no", "none",
        "everyone", "everybody", "no one", "nobody",
        "everything", "nothing",
        "always", "never", "forever",
        "constantly", "continually", "invariably", "permanently",
        "perfect", "complete", "total", "absolute", "entire",
        "maximum", "minimum", "supreme", "extreme", "utmost",
        "ultimate", "universal",
        "impossible", "inevitable", "inescapable",
        "identical", "pure", "sheer",
        "ultimately", "fundamentally", "purely", "outright",
        "comprehensively", "universally"
    ],
    3: [
        // Emphatic absolutes — intensified language that brooks no exception
        "absolutely", "definitely", "certainly", "totally",
        "completely", "utterly", "entirely",
        "eternal", "perpetually", "endlessly", "ceaselessly",
        "infallible", "unerring",
        "undeniable", "irrefutable",
        "undoubtedly", "unquestionably", "indisputably",
        "irrefutably", "incontrovertibly", "incontestably", "unequivocally"
    ]
};

// Flat array for pattern compilation
export const absoluteWordsFlat = Object.values(absoluteWords).flat();

// dictionaries/spectrum-labels.js
//
// Explainer dictionary: political spectrum labels. Unlike the bias
// dictionaries, these entries are not flagged as problems — they get neutral
// "Context" framing (see BiasConfig SPECTRUM.isExplainer) and exist to explain
// the history of the label and how its meaning shifts across countries, eras,
// and speakers.
//
// Precision matters more than recall here: bare "left"/"right" are far too
// ambiguous to match, and several entries use regex sense-guards so that
// "the right to remain silent", "a conservative estimate", and "liberal arts"
// never trigger. Regex entries still attribute to their subcategory because
// BiasDetector falls back to the pattern source for the lookup.
//
// Content notes: keep every entry politically even-handed. These cards explain
// what a label is doing — they must never argue for or against the people the
// label describes. Subcategory colors are deliberately neutral (violet, teal,
// brown): no red/blue party coding.

export const spectrumWords = {
    left_right: {
        icon: '🧭',
        color: '#7e57c2',
        name: 'Left / Right',
        description: 'Left and Right as political directions — a metaphor inherited from seating in the French National Assembly of 1789, where supporters of the king sat to the president\'s right and revolutionaries to his left.',
        implication: 'The spectrum compresses many independent questions (economic, cultural, institutional) into a single axis, and its content shifts by country and era — positions called "right" in one nation may be called "left" in another. Prefixes like "far-" and "radical" often work to delegitimize rather than to locate.',
        suggestion: 'Ask which specific positions, parties, or movements are meant. Where possible, name policies and stances instead of directions.',
        examples: '"The left opposes this" — which parties, movements, or thinkers? On what grounds? Would they accept the label?',
        words: [
            "left-wing", "right-wing", "leftist", "leftists", "rightist", "rightists",
            "far-left", "far-right", "alt-right", "ultra-left", "ultra-right",
            "center-left", "center-right", "centre-left", "centre-right",
            "left-leaning", "right-leaning",
            "\\b(far|hard|radical|extreme|political) (left|right)\\b",
            "\\b(left|right) wing\\b",
            "\\bthe (left|right)\\b(?!\\s+(to|of|hand|way|answer|thing|side|turn|track|time|place|direction|choice|call|amount|angle|one|price|moment|decision|lane|foot|arm|eye|ear|button|click|margin|column|edge|bank))"
        ]
    },

    liberal: {
        icon: '📜',
        color: '#26a69a',
        name: 'Liberal',
        description: '"Liberal" (from Latin liber, "free") has carried near-opposite meanings: classical liberalism — individual rights, free markets, limited government (Locke, Smith, Mill) — versus modern American usage, where since the New Deal it has meant social-welfare progressivism. "Neoliberal" confusingly revives the free-market sense, mostly as a critics\' term for deregulation and privatization.',
        implication: 'In much of Europe, Latin America, and Australia, "liberal" still leans market-oriented — Australia\'s Liberal Party sits center-right. A sentence about "liberals" can assert opposite things depending on where the writer and the reader learned the word, and as an epithet it attributes a single belief to a vast, varied group.',
        suggestion: 'Identify which tradition is meant, or name the actual policy, party, or group instead of the label.',
        examples: '"Liberals believe X" — American progressives? Classical liberals? A specific party? "Liberal democracy" uses the classical sense.',
        words: [
            "liberals", "liberalism", "neoliberal", "neoliberals", "neoliberalism",
            "illiberal",
            "\\bclassical liberals?\\b",
            "\\bliberal\\b(?!\\s+(arts|education|studies|application|amounts?|use|helping|dose|doses|sprinkling|seasoning))"
        ]
    },

    conservative: {
        icon: '🏛️',
        color: '#8d6e63',
        name: 'Conservative',
        description: 'Conservatism, articulated by Edmund Burke in reaction to the French Revolution, names a disposition: preserving established institutions, preferring gradual change, and distrusting wholesale redesign of society. Its prefixed forms name specific movements that can cut against that disposition — neoconservatism was an interventionist US foreign-policy tendency, paleoconservatism a traditionalist, non-interventionist one.',
        implication: 'What is being conserved differs completely by time and place — monarchy in one country, free markets in another, a secular constitution in a third — so the label names a posture toward change, not a fixed platform. Used as a monolith ("conservatives want…"), it erases those differences and substitutes identity for argument.',
        suggestion: 'Ask what, specifically, is being conserved, and which policies or groups are actually meant.',
        examples: '"Conservatives oppose this" — which movement, party, or tradition? (Note: "a conservative estimate" is an unrelated sense of the word.)',
        words: [
            "conservatism", "neoconservative", "neoconservatives", "neocon", "neocons",
            "paleoconservative", "ultraconservative", "arch-conservative",
            "\\bconservatives?\\b(?!\\s+(estimate|estimates|assumption|assumptions|approach|guess|figure|figures|number|numbers|investment|investments|treatment|dress|styling|management|projection|projections))"
        ]
    }
};

// Flat list for the pattern compiler (regex matching)
export const spectrumLabels = Object.values(spectrumWords).flatMap(sub => sub.words);

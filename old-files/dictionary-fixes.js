// Pattern fixes for content.js
// This file contains the corrected patterns to fix the issues with:
// 1. "no" matching in the middle of words
// 2. "seems" and "appears" not being highlighted

// To apply these fixes, replace the corresponding sections in content.js

// ============================================================================
// FIXED DICTIONARY - With proper word boundaries and missing words
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

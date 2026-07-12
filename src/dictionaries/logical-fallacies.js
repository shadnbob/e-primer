// dictionaries/logical-fallacies.js
//
// Explainer dictionary: logical fallacies. Eighth explainer type — the named
// fallacy catalog as it appears in discourse. Strawman, ad hominem,
// whataboutism, and slippery slope already live under Discourse Concepts;
// this type covers the rest of the canon, grouped into families so each card
// carries real content.
//
// Framing (shared with Discourse Concepts): a fallacy name both describes a
// real reasoning failure and gets thrown as an argument-ender. Every card
// presents the fallacy AND the label-as-dismissal, and the meta family makes
// it explicit: naming a fallacy does not falsify the conclusion (that is the
// fallacy fallacy).
//
// Precision notes: "post hoc" carries a guard for statistics ("post hoc
// analysis/test" is proper method vocabulary); "sunk cost" matches only with
// "fallacy" attached (finance uses sunk costs legitimately); apostrophe
// patterns accept straight and curly quotes.

export const logicalFallaciesWords = {
    relevance: {
        icon: '🐟',
        color: '#00838f',
        name: 'Red Herring & Non Sequitur',
        description: 'Relevance fallacies: a red herring drags the argument toward something vivid but beside the point; a non sequitur draws a conclusion that does not follow from what preceded it; a Gish gallop buries an opponent under more claims than can be answered in the time available.',
        implication: 'The moves are real — misdirection and overload win debates without winning arguments. But the labels also get used to duck relevant points: calling context a "red herring" or a cumulative case a "Gish gallop" can itself be the evasion.',
        suggestion: 'Ask what the original question was and whether the point at issue actually bears on it — in either direction.',
        examples: '"That\'s a red herring" — is it off the point, or an inconvenient part of it?',
        words: [
            "\\bred herrings?\\b",
            "\\bnon sequiturs?\\b",
            "\\bgish gallop\\b"
        ]
    },

    circular: {
        icon: '🔁',
        color: '#5c6bc0',
        name: 'Begging the Question',
        description: 'Begging the question (petitio principii) means assuming the conclusion inside the premises — circular reasoning: "the report is reliable because it says so." Separately, everyday usage has largely repurposed "begs the question" to mean "raises the question," which usage guides now widely note.',
        implication: 'Two confusions travel with this phrase: circular arguments can sound rigorous while proving nothing, and the fallacy-name itself now means different things to different readers. Someone accused of "begging the question" may just have prompted one.',
        suggestion: 'For the fallacy: ask whether any premise already assumes the conclusion. For the phrase: check which sense the writer means.',
        examples: '"This begs the question" — a circularity charge, or just "this raises the question"? They are different claims.',
        words: [
            "\\bbeg(s|ged|ging)? the question\\b",
            "\\bcircular (reasoning|argument|arguments|logic)\\b"
        ]
    },

    crowd_authority: {
        icon: '📢',
        color: '#8d6e63',
        name: 'Appeals & Bandwagon',
        description: 'Borrowed-force fallacies: appeal to popularity (ad populum / bandwagon), authority, nature (the naturalistic fallacy), emotion, tradition, novelty, and ignorance. Each substitutes something other than evidence — numbers, prestige, origin, feeling, age, newness, or the absence of disproof — for an argument.',
        implication: 'The nuance the labels flatten: deferring to relevant expert consensus is evidence, not fallacy — the fallacy is substituting prestige for argument or citing authority outside its domain. Likewise popularity is weak evidence, not zero. "Appeal to X!" can dismiss legitimate weight along with borrowed force.',
        suggestion: 'Ask what would remain of the claim if the crowd, the authority, or the feeling were removed — and whether the cited authority actually has domain expertise.',
        examples: '"Experts agree" — relevant consensus (evidence) or borrowed prestige (fallacy)? "Everyone\'s switching" — to what, and why?',
        words: [
            "\\bappeal(s|ed|ing)? to (popularity|authority|nature|emotion|emotions|tradition|novelty|ignorance)\\b",
            "\\bad populum\\b",
            "\\bnaturalistic fallacy\\b",
            "\\bbandwagon\\b"
        ]
    },

    evidence_games: {
        icon: '🍒',
        color: '#6d4c41',
        name: 'Cherry-Picking & Selection',
        description: 'Selection fallacies: cherry-picking keeps the favorable data and discards the rest; the Texas sharpshooter draws the target around the bullet holes after firing; hasty generalization scales a small sample into a rule; anecdotal evidence substitutes a story for a distribution; survivorship bias studies only what made it through the filter.',
        implication: 'These are among the most consequential reasoning failures because the presented evidence is genuine — only the selection is dishonest, so each claim survives fact-checking. The accusation cuts both ways too: "cherry-picking!" needs the fuller dataset shown, not just alleged.',
        suggestion: 'Ask what the full base of evidence looks like: what was left out, who did not survive to be counted, and whether the pattern was predicted or drawn afterward.',
        examples: '"Every example they gave is true" — and what about the examples they didn\'t give?',
        words: [
            "\\bcherry[- ]pick(s|ed|ing)?\\b",
            "\\btexas sharpshooter\\b",
            "\\banecdotal evidence\\b",
            "\\bhasty generalizations?\\b",
            "\\bsurvivorship bias\\b"
        ]
    },

    goalposts_burden: {
        icon: '🥅',
        color: '#607d8b',
        name: 'Goalposts, Burden & No True Scotsman',
        description: 'Rule-changing moves: moving the goalposts redefines success after each demand is met; burden-of-proof games assign the proving to the other side ("prove it isn\'t true"); special pleading exempts one\'s own case from one\'s own standard; No True Scotsman rescues a generalization by redefining membership ("no real X would do that").',
        implication: 'Each move makes a position unfalsifiable in practice. The labels need care in return: standards can legitimately tighten as stakes rise (not every raised bar is moved goalposts), the burden genuinely rests with whoever asserts, and some membership definitions are real (a vegetarian who eats steak is not a counterexample to vegetarianism).',
        suggestion: 'Ask what was originally claimed and what would count as meeting or refuting it — fixed in advance, on both sides.',
        examples: '"That wasn\'t real socialism" — a definitional argument that needs making, or a retreat that saves the theory from every failure?',
        words: [
            "\\b(mov(e|es|ed|ing)|shift(s|ed|ing)?) the goalposts\\b",
            "\\bgoalpost[- ]moving\\b",
            "\\bburden of proof\\b",
            "\\bspecial pleading\\b",
            "\\bno true scotsman\\b",
            "\\b(that|it|this)\\s+(was\\s+not|is\\s+not|wasn['’]t|isn['’]t|was\\s+never)\\s+(real|true)\\s+(socialism|communism|capitalism)\\b"
        ]
    },

    causal: {
        icon: '🎲',
        color: '#7e57c2',
        name: 'Post Hoc & Causal Shortcuts',
        description: 'Causal fallacies: post hoc ergo propter hoc ("after it, therefore because of it") reads sequence as causation; the gambler\'s fallacy expects independent events to remember the past; the sunk cost fallacy lets what is already spent dictate what to do next.',
        implication: 'The corrective slogans get weaponized too: "correlation is not causation" is true and yet gets used to wave away strong, well-controlled observational evidence — correlation plus mechanism plus dose-response plus ruled-out confounders is how much of science works. The slogan starts the examination; it does not end it.',
        suggestion: 'For causal claims: ask for the mechanism and the controls. For the slogan: ask whether the evidence is actually just correlation, or more.',
        examples: '"I took it and got better" (post hoc); "correlation isn\'t causation" (about a randomized trial — it was causation).',
        words: [
            "\\bpost hoc\\b(?!\\s+(analysis|analyses|test|tests|comparison|comparisons|power))",
            "\\bcorrelation\\s+(is\\s+not|isn['’]t|does\\s+not\\s+(equal|imply|mean)|doesn['’]t\\s+(equal|imply|mean))\\s+causation\\b",
            "\\bgambler['’]s\\s+fallacy\\b",
            "\\bsunk[- ]cost fallacy\\b"
        ]
    },

    comparison: {
        icon: '🪞',
        color: '#546e7a',
        name: 'False Equivalence & Extreme Comparisons',
        description: 'Comparison fallacies: false equivalence treats unlike things as alike because they share a surface feature; false dichotomies and "false choice" framings force two options where more exist; Godwin\'s law names the drift of every long argument toward a Hitler comparison (reductio ad Hitlerum).',
        implication: 'Comparisons carry arguments — and dismissing them cuts both ways: "false equivalence!" can duck a fair parallel, and invoking Godwin\'s law can dodge a historically apt warning. What matters is whether the compared cases are alike in the respects the argument needs.',
        suggestion: 'Ask in which specific respects the two things are being equated, and whether those respects are the ones that matter for the conclusion.',
        examples: '"You can\'t compare X to Y" — why not, in the respect being argued? "This is just like [atrocity]" — in what specific way?',
        words: [
            "\\bfalse equivalen(ce|cy|cies)\\b",
            "\\bfalse dichotom(y|ies)\\b",
            "\\bfalse choices?\\b",
            "\\bgodwin['’]s\\s+law\\b",
            "\\breductio ad hitlerum\\b"
        ]
    },

    meta: {
        icon: '🪃',
        color: '#a1887f',
        name: 'The Fallacy Fallacy & Question Games',
        description: 'The fallacy fallacy: concluding that a claim is false because an argument for it was fallacious — bad arguments get made for true things. Question-framing does double duty too: "just asking questions" can be a cover for insinuating without asserting (sealioning: relentless polite demands that exhaust rather than inquire), and a loaded question smuggles its premise ("when did you stop…?").',
        implication: 'This family is the type\'s own warning label: spotting a fallacy licenses discounting an argument, never the conclusion — and fallacy-naming can itself become sport that replaces engagement. Meanwhile the question-labels can dismiss sincere inquiry as bad faith; the difference is whether answers are ever accepted.',
        suggestion: 'Separate the argument from the claim: refute the reasoning, then ask what the best remaining case for the conclusion is. For question games: does any answer get engaged?',
        examples: '"Your argument is fallacious, so you\'re wrong" — the first half can be true and the second not follow.',
        words: [
            "\\bfallacy fallacy\\b",
            "\\bargument from fallacy\\b",
            "\\bsealioning\\b",
            "\\bjust asking questions\\b",
            "\\bloaded questions?\\b"
        ]
    }
};

// Flat list for the pattern compiler (regex matching)
export const logicalFallacies = Object.values(logicalFallaciesWords).flatMap(sub => sub.words);

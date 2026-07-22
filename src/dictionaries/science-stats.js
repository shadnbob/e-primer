// dictionaries/science-stats.js
//
// Explainer dictionary: science & statistics phrases as they appear in news
// and marketing. Like the political-spectrum explainer, these entries are not
// flagged as problems — they get neutral "Context" framing (see BiasConfig
// SCISTATS.isExplainer) and exist to surface the gap between a phrase's
// technical meaning and how it reads to a lay audience.
//
// Precision over recall: bare "theory", "significant", "natural", "average"
// are far too common to match. Entries are phrases or regexes with sense
// guards, so "a significant other", "in theory", and "music theory" never
// trigger. Regex entries attribute to their subcategory via the
// pattern-source fallback in BiasDetector.
//
// Content notes: cards must stay factually careful and non-alarmist — the
// point is to hand the reader the technical meaning and the question to ask
// (What's the effect size? What's the baseline? Who looked, and how hard?),
// never to imply the writer is lying.

export const sciStatsWords = {
    theory_proof: {
        icon: '🔬',
        color: '#5c6bc0',
        name: 'Proof & "The Science"',
        description: 'In science, a "theory" is the strongest kind of explanation — a framework repeatedly tested against evidence (germ theory, the theory of gravity) — while in everyday speech it means a hunch. And empirical science does not "prove" claims the way mathematics does; it accumulates evidence and fails to falsify.',
        implication: '"Just a theory" uses the everyday sense to dismiss well-tested science. "Scientifically proven," "settled science," and "the science says" invoke Science as a single settled authority — often claiming more certainty than the underlying studies support, in either direction.',
        suggestion: 'Ask what the actual evidence is: how many studies, of what kind, on whom, and how consistent the results are.',
        examples: '"Evolution is just a theory" (so is gravity); "clinically proven" (in which trial, against what comparison?)',
        words: [
            "\\b(just|only|merely) a theory\\b",
            "\\bunproven theory\\b",
            "\\b(scientifically|clinically) proven\\b",
            "\\bproven (fact|facts|safe|effective)\\b",
            "\\bscience (has )?(proves?|proven|shows|says)\\b",
            "\\bthe science (is settled|is clear|says|shows)\\b",
            "\\bsettled science\\b",
            "\\btrust the science\\b",
            "\\b(studies|research) proves?\\b"
        ]
    },

    significance: {
        icon: '📊',
        color: '#00897b',
        name: 'Statistical Significance',
        description: 'In statistics, "significant" means that if nothing were really going on, a result this large would be unlikely — conventionally under a 5% probability (p < 0.05). It says nothing about size or importance: a tiny, practically meaningless effect can be statistically significant in a large study.',
        implication: 'Reporting routinely lets the statistical meaning borrow the everyday meaning ("large, important"), making trivial effects sound consequential. The reverse also misleads: a "non-significant" result in a small study is not proof of no effect.',
        suggestion: 'Look for the effect size: how big is the difference, in absolute terms, for real people?',
        examples: '"Significantly higher risk" might mean 1.0% → 1.1%. Ask: how much higher, from what baseline?',
        words: [
            "statistically significant",
            "\\bstatistical significance\\b",
            "\\bsignificant(ly)? (increased?|increases|decreased?|decreases|difference|differences|risk|risks|improvement|improvements|effect|effects|reduction|reductions|higher|lower|more|less|greater|association|associations|correlation|change|changes)\\b"
        ]
    },

    causation: {
        icon: '🔗',
        color: '#7e57c2',
        name: 'Linked & Associated',
        description: '"Linked to," "associated with," and "correlated with" report that two things move together — not that one causes the other.',
        implication: 'Association headlines invite causal conclusions the underlying study cannot support: confounding (ice-cream sales and drownings both rise in summer), reverse causation, and selection effects all produce correlations without causation. "May cause" stacks a hedge on top of an association.',
        suggestion: 'Ask what kind of study produced the claim (randomized trial vs. observational) and what else could explain the association.',
        examples: '"Coffee linked to longer life" — or do healthier people happen to drink more coffee?',
        words: [
            "\\blinked (to|with)\\b",
            "\\bassociated with\\b",
            "\\bcorrelat(es?|ed|ion) with\\b",
            "\\ba link between\\b",
            "\\ban association between\\b",
            "\\b(may|might|could) (cause|lead to)\\b",
            "\\bmay increase the risk\\b"
        ]
    },

    risk_scale: {
        icon: '⚖️',
        color: '#6d4c41',
        name: 'Relative vs Absolute Risk',
        description: '"Doubles the risk" and "50% more likely" are relative changes; they say nothing about the starting point. Doubling a one-in-a-million risk is still two in a million.',
        implication: 'Relative risk is the standard way to make a health headline dramatic: it makes small dangers sound alarming and modest benefits sound miraculous. The absolute change — from what, to what — is what actually matters for decisions.',
        suggestion: 'Find the base rate: from what, to what, out of how many people?',
        examples: '"Doubles the risk" — of a 1-in-100 event or a 1-in-a-million event? "From 1.0% to 1.4%" is the honest form.',
        words: [
            "\\b(doubles?|doubled|triples?|tripled|quadruples?|quadrupled) (the |your )?(risk|chance|chances|odds|likelihood)\\b",
            "\\b(twice|three times|four times|five times|ten times|\\d+(\\.\\d+)? times) (as likely|more likely|less likely|the risk)\\b",
            "\\b\\d+% (more|less) likely\\b",
            "\\b(increased|higher|elevated|greater) risk\\b",
            "\\b(raises?|increases?|lowers?|reduces?) (the |your )?risk\\b"
        ]
    },

    evidence_absence: {
        icon: '🔍',
        color: '#546e7a',
        name: 'No Evidence',
        description: '"No evidence that X" can mean anything from "well studied, and X does not happen" to "nobody has looked yet." Absence of evidence is only evidence of absence when someone has actually searched, hard, where the evidence would be.',
        implication: 'The phrase serves both responsible debunking and premature dismissal: early in any question, "no evidence" is trivially true and tells you nothing. It can also launder uncertainty into reassurance — "no evidence of harm" is not "evidence of safety."',
        suggestion: 'Ask whether anyone has looked, how hard, and what they would have found if the claim were true.',
        examples: '"No evidence of side effects" — after how many patients, and how much follow-up?',
        words: [
            "\\bno (scientific |clinical |credible |hard )?(evidence|proof)\\b",
            "\\bno scientific basis\\b",
            "\\bno known (link|links|cases|risk|risks)\\b",
            "\\bno data (to suggest|showing|supporting)\\b"
        ]
    },

    purity: {
        icon: '🌿',
        color: '#689f38',
        name: 'Natural & Chemical-Free',
        description: 'Everything is chemicals — water, air, apples. "Chemical-free," "toxins," "all-natural," and "detox" are marketing categories, not scientific ones; toxicity is a property of dose, not of a substance\'s origin.',
        implication: 'Purity language sells safety by category: natural-therefore-safe and synthetic-therefore-dangerous are both false (arsenic and botulinum toxin are natural; vitamin C is synthesized). Unnamed "toxins" cannot be checked, and healthy livers and kidneys already handle metabolic waste.',
        suggestion: 'Ask which substance, at what dose, compared to what — and what specifically a "toxin" or "detox" refers to.',
        examples: '"Chemical-free cleaning spray" (it is made of chemicals); "flushes out toxins" (which ones, measured how?)',
        words: [
            "\\bchemical[- ]free\\b",
            "\\bfree of chemicals\\b",
            "\\bno (added |harsh )?chemicals\\b",
            "toxins",
            "\\btoxin[- ]free\\b",
            "\\bdetox(es|ing|ify|ifies)?\\b",
            "\\ball[- ]natural\\b",
            "\\b100% natural\\b",
            "\\bnatural remed(y|ies)\\b",
            "\\bsuperfoods?\\b",
            "\\bclean eating\\b"
        ]
    }
};

// Flat list for the pattern compiler (regex matching)
export const sciStatsTerms = Object.values(sciStatsWords).flatMap(sub => sub.words);

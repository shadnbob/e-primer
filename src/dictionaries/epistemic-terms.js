// dictionaries/epistemic-terms.js
//
// Explainer dictionary: media & truth terms. Sixth explainer type — the
// meta-layer: the vocabulary we use to talk about truth and coverage itself
// ("fake news", misinformation/disinformation, "conspiracy theory", "the
// narrative", "do your own research").
//
// Content notes: this is the most reflexively contested territory of all —
// several of these words are used both to describe real phenomena and to
// dismiss opponents, and the power to apply the label is itself part of the
// dispute. Cards must present BOTH the descriptive meaning and the
// dismissive deployment, without deciding particular cases.
//
// Precision notes: bare "conspiracy" (a real criminal-law term), bare
// "the media" (matches "the media player"), and "MSM" (collides with a
// medical-research abbreviation) are skipped. "The narrative" carries a
// guard against literary-criticism usage.

export const epistemicTermsWords = {
    fake_news: {
        icon: '📰',
        color: '#8d6e63',
        name: 'Fake News',
        description: 'Around 2016 the phrase named something specific: fabricated stories manufactured for clicks and ad revenue. Within roughly a year it had been captured as an epithet for unfavorable coverage — one of the fastest semantic captures on record.',
        implication: 'The phrase now points in two directions at once: at genuinely fabricated content, and at accurate-but-unwelcome reporting. Without specification it mostly signals the speaker\'s stance toward the outlet, not the story\'s accuracy — and its overuse makes the original, real phenomenon harder to name.',
        suggestion: 'Ask what exactly is claimed to be false — the facts, the framing, or the outlet — and what the evidence is.',
        examples: '"That story is fake news" — fabricated? mistaken in part? accurately reported but unwelcome? Three different claims.',
        words: [
            "\\bfake news\\b"
        ]
    },

    misinfo_disinfo: {
        icon: '🔀',
        color: '#5c6bc0',
        name: 'Mis- & Disinformation',
        description: 'In the researcher taxonomy: misinformation is false content spread without intent to deceive; disinformation is false content spread deliberately; malinformation is genuine information deployed to harm. The prefixes carry the intent claim.',
        implication: 'In practice the labels get applied beyond clear falsehood — to contested-but-arguable claims, and sometimes to positions that later became mainstream, which is why the labeling power itself is disputed. Calling something "disinformation" asserts intent to deceive; that is a strong claim that needs its own evidence.',
        suggestion: 'Ask two separate questions: is the claim actually false, and who established that? And if intent is asserted, on what basis?',
        examples: '"Flagged as misinformation" — false by what standard, judged by whom, and has that judgment been revisited?',
        words: [
            "misinformation",
            "disinformation",
            "malinformation",
            "\\bfact[- ]check(s|ed|ing|ers?)?\\b"
        ]
    },

    conspiracy: {
        icon: '🧵',
        color: '#00838f',
        name: 'Conspiracy Theory',
        description: 'Descriptively, a claim that events are best explained by a secret plot. Real conspiracies exist and have been documented (Watergate; the tobacco industry\'s coordination to obscure smoking risks) — the label is not automatically wrong.',
        implication: 'The term does double duty: it describes a reasoning style that resists disproof (missing evidence becomes proof of the cover-up; everything connects), and it dismisses unwelcome claims without examination. The useful question is not the label but the structure: could any evidence count against this claim?',
        suggestion: 'Ask whether the claim is falsifiable and what specific evidence supports it — not whether someone has applied the label.',
        examples: '"Just a conspiracy theory" — is the claim unfalsifiable, or merely unwelcome? The label alone cannot say.',
        words: [
            "\\bconspiracy theor(y|ies|ist|ists)\\b",
            "\\bconspiratorial\\b"
        ]
    },

    narrative_media: {
        icon: '📡',
        color: '#7e57c2',
        name: 'Narratives & "The Media"',
        description: '"The mainstream media" bundles thousands of outlets with different owners, incentives, audiences, and politics into a single actor; "the narrative" implies coverage is a coordinated story rather than the noisier reality of herding, incentives, and error. "Do your own research" ranges from good advice to a dismissal of all expertise.',
        implication: 'Monolith-words make coverage claims unfalsifiable: any outlet that contradicts "the narrative" gets excluded from "the media" that supposedly maintains it. Real, studiable phenomena exist underneath — ownership concentration, pack journalism, shared blind spots — but they need naming specifically to be examined at all.',
        suggestion: 'Ask which outlets, which claims, and which incentives are actually meant — and what would count as coverage that breaks the pattern.',
        examples: '"The media won\'t tell you this" — which outlets? (Often the claim itself comes from a large outlet.)',
        words: [
            "\\b(the )?mainstream media\\b",
            "\\blegacy media\\b",
            "\\bcorporate media\\b",
            "\\bthe narrative\\b(?!\\s+(structure|arc|voice|form|style|perspective|frame))",
            "\\bpush(es|ing)? a narrative\\b",
            "\\bdo your own research\\b"
        ]
    }
};

// Flat list for the pattern compiler (regex matching)
export const epistemicTerms = Object.values(epistemicTermsWords).flatMap(sub => sub.words);

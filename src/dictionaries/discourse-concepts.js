// dictionaries/discourse-concepts.js
//
// Explainer dictionary: discourse concepts. Seventh explainer type — named
// paradoxes and debate-moves that get compressed into labels and deployed as
// argument-enders: the paradox of tolerance, slippery slope, whataboutism,
// strawman/ad hominem, the Overton window, motte-and-bailey.
//
// Content notes: each of these names BOTH a real phenomenon and a dismissal.
// The cards must present the concept's actual source and nuance (Popper's
// qualified footnote, not the meme version), then the two failure modes —
// the move itself, and the label used to dodge legitimate argument. Never
// adjudicate particular cases.
//
// Precision notes: bare "tolerance" never matches (machining tolerances,
// "zero tolerance"); tolerance-talk matches only in paradox and
// demand/preach constructions. "Straw man" as a literal scarecrow is rare
// enough to accept.

export const discourseConceptsWords = {
    tolerance_paradox: {
        icon: '🤝',
        color: '#5c6bc0',
        name: 'Paradox of Tolerance',
        description: 'From Karl Popper\'s The Open Society and Its Enemies (1945): "unlimited tolerance must lead to the disappearance of tolerance" — because a movement that rejects tolerance can use its protections (speech, assembly, due process) to grow until it can abolish them for everyone else. The meme version stops at the slogan. Popper\'s footnote continues: intolerant philosophies should be countered by argument and public opinion as long as that works — he reserved suppression for movements that reject rational debate and answer arguments with violence.',
        implication: 'The paradox gets invoked as a finished argument, but it does not answer the hard question — who counts as intolerant, judged by whom, by what standard — which is decided <em>before</em> the paradox applies and is where the actual disagreement lives. Both failure modes are real: unlimited tolerance can shelter movements that would end it, and an elastic definition of "intolerance" can license excluding ordinary disagreement.',
        suggestion: 'Ask what specific conduct is called intolerant, whether argument and public opinion have failed, and who gets to decide — the paradox itself settles none of these.',
        examples: 'The classic case: "we don\'t want that ethnicity here" → "then your movement can\'t organize here" → "you\'re persecuting us for our beliefs." The persecution claim invokes the very tolerance the movement exists to end — the hypocrisy that powers the paradox.',
        words: [
            "\\bparadox of tolerance\\b",
            "\\btolerance paradox\\b",
            "\\bintoleran(ce|t) of (the )?intoleran(ce|t)\\b",
            "\\btolerat(e|ing) (the )?intolerant\\b"
        ]
    },

    tolerance_talk: {
        icon: '🕊️',
        color: '#26a69a',
        name: 'Demanding Tolerance',
        description: '"Tolerance" spans a ladder of very different asks: being left in peace, being accepted, or being endorsed — and demands for it rarely say which rung is meant. Underneath sits a reciprocity question philosophers from Popper to Rawls have worked on: tolerance functions as a mutual arrangement among those who extend it to each other.',
        implication: 'Two opposite distortions ride on the ambiguity. A plea to be left in peace gets recast as "demanding you endorse us" — raising the rung to make the ask sound aggressive. And a movement working to curtail others\' freedom claims the same protection ("you\'re persecuting us for our beliefs") — invoking the reciprocity it refuses to extend, the reversal move at the heart of the paradox of tolerance.',
        suggestion: 'Ask which rung is actually being asked for — peace, acceptance, or endorsement — and whether the one asking extends the same to others.',
        examples: '"They\'re demanding tolerance" — to live unbothered, or to be agreed with? Those are different demands, and the sentence rarely says.',
        words: [
            "\\bdemand(s|ed|ing)? tolerance\\b",
            "\\bpreach(es|ed|ing)? tolerance\\b"
        ]
    },

    slippery_slope: {
        icon: '🛝',
        color: '#6d4c41',
        name: 'Slippery Slope',
        description: 'Named as a fallacy when a chain from step A to feared outcome Z is asserted without any mechanism. But slope arguments are not automatically fallacious: precedent, incentive shifts, and boundary erosion are real, studiable mechanisms, and courts treat precedent-based slope arguments seriously.',
        implication: 'The label cuts both ways: "that\'s a slippery slope fallacy" can dismiss a legitimate argument about how a rule will actually be extended, while a bare slope claim can smuggle in an unargued chain of dominoes. The difference is whether a mechanism is shown and whether anything plausibly stops the slide.',
        suggestion: 'Ask for the mechanism: what specifically carries step one to the feared end, and what would stop it along the way?',
        examples: '"Legalize medical marijuana and soon every drug is legal" — by what mechanism, and what stops it? / "Slippery slope fallacy!" — but is a real mechanism (precedent, incentives) being waved away?',
        words: [
            "\\bslippery[- ]slopes?\\b",
            "\\bthin end of the wedge\\b"
        ]
    },

    whataboutism: {
        icon: '👉',
        color: '#00838f',
        name: 'Whataboutism',
        description: 'A Cold War-era label (Soviet spokesmen answering criticism with "and you are lynching Negroes"-style replies): deflecting a charge by pointing at the accuser\'s conduct instead of answering. The classical name is tu quoque — "you too."',
        implication: 'The move is real: changing the subject is not a defense, and two wrongs remain two wrongs. But the label also gets used to dodge legitimate consistency challenges — when the accuser\'s own standard is part of the argument (selective enforcement, hypocrisy in rule-making), the comparison is evidence, not deflection.',
        suggestion: 'Ask whether the comparison answers the charge or replaces it — and whether the accuser\'s consistency is actually relevant to the claim.',
        examples: '"What about your side\'s scandal?" — deflection from this charge, or a fair test of the standard being applied?',
        words: [
            "whataboutism",
            "whataboutery",
            "\\btu quoque\\b"
        ]
    },

    strawman_adhominem: {
        icon: '🎯',
        color: '#8d6e63',
        name: 'Strawman & Ad Hominem',
        description: 'A strawman attacks a weakened version of an opponent\'s claim; ad hominem attacks the arguer instead of the argument; a steelman argues against the strongest version. All three name the relationship between a response and the actual claim.',
        implication: 'The accusations are moves too: "that\'s a strawman" asserts misrepresentation without showing it, and "ad hominem!" can deflect personal accountability even where character is the question — credibility, conflicts of interest, and track records are legitimately about the person. The labels need the same evidence they demand.',
        suggestion: 'For strawman claims: quote the original and the response — was the stated version actually weaker? For ad hominem: is the personal point relevant to credibility, or substituting for engagement?',
        examples: '"You\'re strawmanning me" — what was the real claim? "That\'s ad hominem" — or is the witness\'s reliability the issue?',
        words: [
            "\\bstraw[- ]?m(a|e)n\\b",
            "\\bstraw[- ]?mann(ed|ing)\\b",
            "\\bsteel[- ]?mann?(ed|ing)?\\b",
            "\\bad hominem\\b"
        ]
    },

    overton_window: {
        icon: '🪟',
        color: '#607d8b',
        name: 'Overton Window',
        description: 'Named for Joseph Overton (Mackinac Center, 1990s): the range of policies politically acceptable to the mainstream at a given moment. Originally a descriptive claim about feasibility — politicians can only move within the window; movements move the window.',
        implication: 'The concept now does three jobs at once: description (what is currently sayable), strategy ("shift the window"), and accusation ("normalizing extremism"). It can also smuggle in inevitability — windows do not move like weather; specific actors move them by choice, and naming the concept does not say whether a given shift is good or bad.',
        suggestion: 'Ask whether the sentence describes what is acceptable, argues what should be, or accuses someone of moving the boundary — three different claims.',
        examples: '"That\'s outside the Overton window" — a prediction about viability, not an argument about merit.',
        words: [
            "\\boverton window\\b"
        ]
    },

    motte_bailey: {
        icon: '🏰',
        color: '#7e57c2',
        name: 'Motte-and-Bailey',
        description: 'Nicholas Shackel\'s term (2005), from the medieval castle: a modest, defensible claim (the motte) and a sweeping, attractive claim (the bailey) share one vocabulary. Challenged on the bailey, the arguer retreats to the motte ("all I\'m saying is…"), then reoccupies the bailey once the challenge passes.',
        implication: 'The pattern is real and explains how many contested terms work — one word doing double duty for a modest and a sweeping claim. But naming it is a structural accusation that needs showing (quote the bailey, quote the motte, same speaker), and it misfires against groups: different people making different claims is not one arguer switching.',
        suggestion: 'Ask which claim — the modest one or the sweeping one — is actually being defended right now, and which one the conclusion needs.',
        examples: '"All I\'m saying is X (modest)" — but was the earlier claim X, or something much bigger using the same words?',
        words: [
            "\\bmotte[- ](and|&)[- ]bailey\\b"
        ]
    }
};

// Flat list for the pattern compiler (regex matching)
export const discourseConcepts = Object.values(discourseConceptsWords).flatMap(sub => sub.words);

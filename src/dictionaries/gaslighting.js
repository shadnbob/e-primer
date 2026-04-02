// dictionaries/gaslighting.js
export const gaslightingWords = {
    reality_denial: {
        icon: '🚫',
        color: '#b71c1c',
        name: 'Reality Denial',
        description: 'Direct denial that events occurred or facts exist, attacking objective reality itself.',
        implication: 'The strongest form of gaslighting — attempts to make the target doubt their own perception of verified events.',
        suggestion: 'Check independent records, documents, or witnesses. Trust verifiable evidence over assertions.',
        examples: 'Instead of "that never happened" → "I have a different recollection — let\'s check the record"',
        words: [
            "that never happened", "you're imagining things", "that's not true",
            "you're making it up", "completely fabricated", "pure fiction",
            "didn't happen that way", "false memory", "revisionist history",
            "twisting the facts", "distorting reality", "alternative facts",
            "total fabrication", "that's a lie", "never said that",
            "you're inventing things", "fantasy", "fiction not fact"
        ]
    },

    emotional_invalidation: {
        icon: '💢',
        color: '#6a1b9a',
        name: 'Emotional Invalidation',
        description: 'Dismissing emotional responses as irrational or disproportionate to undermine confidence in one\'s own feelings.',
        implication: 'Teaches the target to distrust their own emotional responses, making them more dependent on the gaslighter\'s framing.',
        suggestion: 'Your emotional responses are valid data. Evaluate the situation independently of how others characterize your reaction.',
        examples: 'Instead of "you\'re overreacting" → "I see this differently — can we discuss our perspectives?"',
        words: [
            "you're overreacting", "making a big deal",
            "blowing it out of proportion",
            "being dramatic", "overly sensitive", "too emotional",
            "getting worked up over nothing",
            "making mountains out of molehills",
            "need to calm down", "being hysterical", "irrational response",
            "taking it too seriously", "reading too much into it",
            "stop being so sensitive", "you're too thin-skinned",
            "learn to take a joke", "lighten up"
        ]
    },

    memory_manipulation: {
        icon: '🧠',
        color: '#00838f',
        name: 'Memory Manipulation',
        description: 'Undermining confidence in one\'s own memory to replace recollections with a preferred narrative.',
        implication: 'Erodes trust in episodic memory, making the target increasingly reliant on the manipulator\'s version of events.',
        suggestion: 'Keep written records. Check notes, emails, or texts. Verify with other witnesses when possible.',
        examples: 'Instead of "you\'re misremembering" → "my recollection differs — let\'s look at the meeting notes"',
        words: [
            "you're misremembering", "that's not what was said",
            "you're confused",
            "mixing things up", "got it backwards", "faulty recollection",
            "selective memory", "conveniently forgetting",
            "memory is playing tricks",
            "not how I remember it", "you must be mistaken",
            "false impression",
            "your memory is unreliable", "you always get this wrong",
            "that's not what happened at all", "you're rewriting history"
        ]
    },

    credibility_attack: {
        icon: '🎯',
        color: '#e65100',
        name: 'Credibility Attack',
        description: 'Attacking the person\'s mental fitness, judgment, or competence rather than addressing their actual argument.',
        implication: 'Ad hominem disguised as concern — undermines self-confidence to make the target doubt their own perceptions and judgment.',
        suggestion: 'Evaluate the ARGUMENT being made, not the personal attack. Competence attacks do not address the substance of a claim.',
        examples: 'Instead of "you\'re being paranoid" → "I don\'t see the same pattern — here\'s why..."',
        words: [
            "you're being paranoid", "too sensitive", "crazy to think",
            "lost touch with reality", "delusional thinking",
            "conspiracy theorist",
            "seeing things that aren't there", "jumping to conclusions",
            "wild accusations", "baseless claims", "unfounded fears",
            "irrational beliefs", "unstable behavior",
            "not thinking clearly",
            "you need help", "you're losing it", "unhinged",
            "out of your mind", "not in your right mind"
        ]
    },

    deflection: {
        icon: '↩️',
        color: '#546e7a',
        name: 'Deflection',
        description: 'Redirecting attention away from the actual issue to avoid accountability or addressing the concern.',
        implication: 'Prevents resolution by continually shifting focus, leaving the original concern unaddressed while exhausting the target.',
        suggestion: 'Ask: has the original concern been addressed? Return focus to the specific issue at hand.',
        examples: 'Instead of "what about when you..." → "I hear your point about X, and I also want to address Y"',
        words: [
            "the real issue is", "what about", "more importantly",
            "you're missing the point", "that's not the problem",
            "focusing on the wrong thing", "beside the point",
            "irrelevant detail", "distracting from", "changing the subject",
            "let's talk about", "but what about when",
            "conveniently ignoring",
            "you're deflecting", "nice try changing the topic",
            "stop trying to distract", "that's whataboutism"
        ]
    }
};

// Export a flat array for backward compatibility
export const gaslightingPhrasesFlat = Object.values(gaslightingWords).flatMap(category => category.words);

// Legacy export name for backward compatibility
export const gaslightingPhrases = gaslightingPhrasesFlat;

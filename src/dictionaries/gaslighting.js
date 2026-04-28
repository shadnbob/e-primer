// dictionaries/gaslighting.js
// Each sub-category groups words by intensity: 1 = mild, 2 = moderate, 3 = strong
export const gaslightingWords = {
    reality_denial: {
        icon: '🚫',
        color: '#b71c1c',
        name: 'Reality Denial',
        description: 'Direct denial that events occurred or facts exist, attacking objective reality itself.',
        implication: 'The strongest form of gaslighting — attempts to make the target doubt their own perception of verified events.',
        suggestion: 'Check independent records, documents, or witnesses. Trust verifiable evidence over assertions.',
        examples: 'Instead of "that never happened" → "I have a different recollection — let\'s check the record"',
        words: {
            2: [
                "that's not true", "didn't happen that way",
                "twisting the facts", "distorting reality",
                "never said that", "fantasy"
            ],
            3: [
                "that never happened", "you're imagining things",
                "you're making it up", "completely fabricated", "pure fiction",
                "false memory", "revisionist history", "alternative facts",
                "total fabrication", "that's a lie",
                "you're inventing things", "fiction not fact"
            ]
        }
    },

    emotional_invalidation: {
        icon: '💢',
        color: '#6a1b9a',
        name: 'Emotional Invalidation',
        description: 'Dismissing emotional responses as irrational or disproportionate to undermine confidence in one\'s own feelings.',
        implication: 'Teaches the target to distrust their own emotional responses, making them more dependent on the gaslighter\'s framing.',
        suggestion: 'Your emotional responses are valid data. Evaluate the situation independently of how others characterize your reaction.',
        examples: 'Instead of "you\'re overreacting" → "I see this differently — can we discuss our perspectives?"',
        words: {
            1: [
                "lighten up", "learn to take a joke",
                "taking it too seriously", "reading too much into it"
            ],
            2: [
                "you're overreacting", "making a big deal",
                "blowing it out of proportion",
                "being dramatic", "overly sensitive", "too emotional",
                "making mountains out of molehills",
                "need to calm down",
                "stop being so sensitive", "you're too thin-skinned"
            ],
            3: [
                "getting worked up over nothing",
                "being hysterical", "irrational response"
            ]
        }
    },

    memory_manipulation: {
        icon: '🧠',
        color: '#00838f',
        name: 'Memory Manipulation',
        description: 'Undermining confidence in one\'s own memory to replace recollections with a preferred narrative.',
        implication: 'Erodes trust in episodic memory, making the target increasingly reliant on the manipulator\'s version of events.',
        suggestion: 'Keep written records. Check notes, emails, or texts. Verify with other witnesses when possible.',
        examples: 'Instead of "you\'re misremembering" → "my recollection differs — let\'s look at the meeting notes"',
        words: {
            1: [
                "not how I remember it", "you must be mistaken",
                "false impression"
            ],
            2: [
                "you're misremembering", "that's not what was said",
                "you're confused", "mixing things up", "got it backwards",
                "faulty recollection", "selective memory",
                "memory is playing tricks"
            ],
            3: [
                "conveniently forgetting",
                "your memory is unreliable", "you always get this wrong",
                "that's not what happened at all", "you're rewriting history"
            ]
        }
    },

    credibility_attack: {
        icon: '🎯',
        color: '#e65100',
        name: 'Credibility Attack',
        description: 'Attacking the person\'s mental fitness, judgment, or competence rather than addressing their actual argument.',
        implication: 'Ad hominem disguised as concern — undermines self-confidence to make the target doubt their own perceptions and judgment.',
        suggestion: 'Evaluate the ARGUMENT being made, not the personal attack. Competence attacks do not address the substance of a claim.',
        examples: 'Instead of "you\'re being paranoid" → "I don\'t see the same pattern — here\'s why..."',
        words: {
            1: [
                "jumping to conclusions", "unfounded fears"
            ],
            2: [
                "you're being paranoid", "too sensitive", "crazy to think",
                "conspiracy theorist",
                "seeing things that aren't there",
                "wild accusations", "baseless claims",
                "irrational beliefs", "not thinking clearly"
            ],
            3: [
                "lost touch with reality", "delusional thinking",
                "unstable behavior", "you need help",
                "you're losing it", "unhinged",
                "out of your mind", "not in your right mind"
            ]
        }
    },

    deflection: {
        icon: '↩️',
        color: '#546e7a',
        name: 'Deflection',
        description: 'Redirecting attention away from the actual issue to avoid accountability or addressing the concern.',
        implication: 'Prevents resolution by continually shifting focus, leaving the original concern unaddressed while exhausting the target.',
        suggestion: 'Ask: has the original concern been addressed? Return focus to the specific issue at hand.',
        examples: 'Instead of "what about when you..." → "I hear your point about X, and I also want to address Y"',
        words: {
            1: [
                "the real issue is", "more importantly",
                "let's talk about", "beside the point"
            ],
            2: [
                "what about", "you're missing the point",
                "that's not the problem", "focusing on the wrong thing",
                "irrelevant detail", "distracting from", "changing the subject",
                "but what about when", "conveniently ignoring",
                "that's whataboutism"
            ],
            3: [
                "you're deflecting", "nice try changing the topic",
                "stop trying to distract"
            ]
        }
    }
};

// Flatten intensity-grouped words
function flattenWords(categoryWords) {
    if (Array.isArray(categoryWords)) return categoryWords;
    return Object.values(categoryWords).flat();
}

// Export a flat array for backward compatibility
export const gaslightingPhrasesFlat = Object.values(gaslightingWords).flatMap(
    category => flattenWords(category.words)
);

// Legacy export name
export const gaslightingPhrases = gaslightingPhrasesFlat;

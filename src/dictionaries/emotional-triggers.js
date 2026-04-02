// dictionaries/emotional-triggers.js
export const emotionalTriggerWords = {
    fear_appeal: {
        icon: '😨',
        color: '#c62828',
        name: 'Fear Appeal',
        description: 'Language designed to trigger fear and threat perception, bypassing rational risk assessment.',
        implication: 'Activates the brain\'s threat response, making readers more susceptible to persuasion and less able to evaluate claims critically.',
        suggestion: 'Ask what specific evidence supports the claimed danger and evaluate actual risk levels.',
        examples: 'Instead of "existential threat" → "a significant challenge" or provide specific risk data',
        words: [
            "dangerous precedent", "slippery slope", "existential threat",
            "grave danger", "serious threat", "dire consequences",
            "catastrophic results", "devastating impact", "irreversible damage",
            "point of no return", "ticking time bomb", "imminent danger",
            "clear and present danger", "looming crisis", "impending doom",
            "mortal threat", "doomsday scenario", "nightmare scenario",
            "worst case scenario", "on the brink", "spiraling out of control"
        ]
    },

    guilt_induction: {
        icon: '😔',
        color: '#6a1b9a',
        name: 'Guilt Induction',
        description: 'Language designed to trigger guilt and moral responsibility, pressuring agreement through shame.',
        implication: 'Bypasses rational evaluation by making disagreement feel morally wrong, regardless of the actual merits.',
        suggestion: 'Evaluate whether the responsibility claim is supported by evidence, separate from the emotional pressure.',
        examples: 'Instead of "blood on your hands" → "shares responsibility for the outcome" with specific evidence',
        words: [
            "shame on", "how dare", "blood on your hands",
            "morally responsible", "complicit in", "turning a blind eye",
            "failed to act", "stood by while", "allowed to happen",
            "could have prevented", "chose to ignore", "willfully neglected",
            "betrayed the trust", "let down", "abandoned their duty",
            "on your conscience", "history will judge", "answerable for",
            "dereliction of duty", "looked the other way", "washed their hands of"
        ]
    },

    flattery_manipulation: {
        icon: '🎭',
        color: '#f57f17',
        name: 'Flattery Manipulation',
        description: 'Compliments and in-group identity appeals designed to bias the reader toward agreement.',
        implication: 'Creates social pressure to agree by implying that disagreement means you lack intelligence, virtue, or sophistication.',
        suggestion: 'Recognize the appeal to identity and evaluate the argument on its own merits.',
        examples: 'Instead of "smart people like you understand" → present the argument and let readers evaluate it independently',
        words: [
            "smart people like you", "educated readers understand",
            "discerning individuals", "those who truly care",
            "people of conscience", "thoughtful citizens",
            "intelligent observers", "wise enough to see",
            "sophisticated thinkers", "enlightened minds",
            "those with common sense", "reasonable people agree",
            "anyone with half a brain", "thinking people know",
            "informed citizens realize", "astute observers recognize",
            "those who pay attention", "right-thinking people"
        ]
    },

    outrage_fuel: {
        icon: '🤬',
        color: '#d84315',
        name: 'Outrage Fuel',
        description: 'Language designed to trigger moral outrage, bypassing careful analysis with indignation.',
        implication: 'Replaces factual evaluation with emotional reaction, making readers more likely to share and amplify without verification.',
        suggestion: 'Look past the outrage language to identify the actual facts and evaluate them independently.',
        examples: 'Instead of "shocking revelation" → "new information shows..." with specific details',
        words: [
            "shocking revelation", "unbelievable scandal", "absolute outrage",
            "disgusting display", "appalling behavior", "unconscionable act",
            "beyond the pale", "crosses the line", "new low",
            "height of hypocrisy", "blatant corruption", "flagrant violation",
            "egregious abuse", "stunning betrayal", "jaw-dropping",
            "slap in the face", "travesty of justice", "moral bankruptcy",
            "utter contempt", "brazen disregard", "shameless exploitation"
        ]
    },

    sympathy_exploitation: {
        icon: '💔',
        color: '#1565c0',
        name: 'Sympathy Exploitation',
        description: 'Uses vulnerable populations to weaponize compassion and bypass rational evaluation of arguments.',
        implication: 'Makes disagreement feel heartless, even when the emotional appeal has no logical connection to the argument being made.',
        suggestion: 'Ask how the emotional appeal specifically connects to the policy or argument being advanced.',
        examples: 'Instead of "think of the children" → describe specific impacts on children with evidence',
        words: [
            "think of the children", "vulnerable victims", "innocent lives",
            "helpless elderly", "suffering families", "heartbroken parents",
            "orphaned children", "widows and orphans", "defenseless animals",
            "voiceless victims", "forgotten souls", "human tragedy",
            "real people suffering", "faces behind the statistics",
            "their blood cries out", "who will speak for them",
            "left to fend for themselves", "prey upon the weak",
            "the most vulnerable among us", "those who cannot help themselves"
        ]
    },

    false_urgency: {
        icon: '⏰',
        color: '#ef6c00',
        name: 'False Urgency',
        description: 'Creates artificial time pressure to prevent careful deliberation and force hasty decisions.',
        implication: 'Prevents thoughtful evaluation by implying that delay equals failure, even when no real deadline exists.',
        suggestion: 'Ask what evidence exists for the claimed deadline and whether careful consideration would actually cause harm.',
        examples: 'Instead of "act now before it\'s too late" → "this decision would benefit from timely attention because..."',
        words: [
            "act now", "before it's too late", "time is running out",
            "last chance", "final opportunity", "narrow window",
            "critical moment", "now or never", "decisive moment",
            "crucial juncture", "make or break", "do or die",
            "the clock is ticking", "every second counts", "running out of time",
            "at the eleventh hour", "no time to waste", "urgent action needed"
        ]
    }
};

// Export a flat array for backward compatibility
export const emotionalTriggersFlat = Object.values(emotionalTriggerWords).flatMap(category => category.words);

// Legacy export name for backward compatibility
export const emotionalTriggers = emotionalTriggersFlat;

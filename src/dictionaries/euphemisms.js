// dictionaries/euphemisms.js
export const euphemismWords = {
    political_euphemism: {
        icon: '🏛️',
        color: '#5c6bc0',
        name: 'Political Euphemism',
        description: 'Government and policy language that obscures controversial actions behind neutral-sounding terminology.',
        implication: 'Conceals the true nature of government actions, making harmful policies harder to evaluate and oppose.',
        suggestion: 'Replace with direct language that describes what actually happens.',
        examples: 'Instead of "enhanced interrogation" → "torture" or "coercive interrogation techniques"',
        words: [
            "enhanced interrogation", "collateral damage", "friendly fire",
            "extraordinary rendition", "neutralize", "pacification",
            "strategic withdrawal", "tactical redeployment", "kinetic action",
            "regime change", "nation building", "peacekeeping operation",
            "police action", "security operation", "freedom fighters",
            "detainee", "unlawful combatant", "rendition program"
        ]
    },

    corporate_euphemism: {
        icon: '💼',
        color: '#78909c',
        name: 'Corporate Euphemism',
        description: 'Business language that softens negative outcomes like job losses, price increases, and failures.',
        implication: 'Disguises harm to workers, consumers, and communities behind professional-sounding jargon.',
        suggestion: 'Use plain language that makes the impact on people clear.',
        examples: 'Instead of "rightsizing" → "laying off employees" or "cutting 200 jobs"',
        words: [
            "rightsizing", "downsizing", "restructuring", "optimization",
            "streamlining", "synergy realization", "workforce adjustment",
            "negative growth", "deferred success", "challenging market conditions",
            "revenue enhancement", "price adjustment", "value engineering",
            "headcount reduction", "involuntary separation", "career transition",
            "operational efficiency", "resource reallocation", "sunset"
        ]
    },

    social_euphemism: {
        icon: '🤝',
        color: '#66bb6a',
        name: 'Social Euphemism',
        description: 'Socially polite substitutions used out of sensitivity, courtesy, or respect for dignity.',
        implication: 'Often well-intentioned and appropriate, but can sometimes obscure issues that need direct discussion.',
        suggestion: 'Consider whether the euphemism serves genuine respect or avoids a conversation that needs directness.',
        examples: '"Passed away" is appropriate for sensitive contexts; "economically disadvantaged" may obscure systemic poverty',
        words: [
            "passed away", "departed", "no longer with us", "resting in peace",
            "economically disadvantaged", "underprivileged", "underserved",
            "differently abled", "physically challenged", "special needs",
            "senior citizens", "golden years", "twilight years",
            "between jobs", "let go", "expecting",
            "correctional facility", "substance abuse", "unhoused"
        ]
    },

    military_euphemism: {
        icon: '🎖️',
        color: '#b71c1c',
        name: 'Military Euphemism',
        description: 'Military jargon that sanitizes violence, casualties, and the human cost of warfare.',
        implication: 'Makes warfare and its consequences more palatable, reducing public scrutiny of military actions.',
        suggestion: 'Describe the actual human impact rather than using sanitized military terminology.',
        examples: 'Instead of "surgical strike" → "bombing that killed 12 people" or "targeted airstrike on a residential area"',
        words: [
            "surgical strike", "precision bombing", "smart weapons",
            "soft targets", "hard targets", "assets", "resources",
            "theater of operations", "rules of engagement", "force projection",
            "boots on the ground", "area denial", "neutralization",
            "ordnance delivery", "servicing the target", "engage the enemy"
        ]
    },

    dysphemism: {
        icon: '🔥',
        color: '#e65100',
        name: 'Dysphemism',
        description: 'Loaded negative framing that inflames perception — the rhetorical opposite of a euphemism.',
        implication: 'Provokes hostility and negative emotional reactions by replacing neutral terms with inflammatory ones.',
        suggestion: 'Replace with neutral, descriptive language that allows readers to form their own judgments.',
        examples: 'Instead of "death tax" → "estate tax" or "inheritance tax"; instead of "illegal aliens" → "undocumented immigrants"',
        words: [
            "death tax", "government takeover", "job killers",
            "tax and spend", "bleeding heart", "welfare queen",
            "anchor babies", "illegal aliens", "chain migration",
            "socialized medicine", "nanny state", "big government",
            "bureaucrats", "handouts", "entitlements",
            "radical agenda", "open borders", "activist judges"
        ]
    },

    medical_euphemism: {
        icon: '🏥',
        color: '#00897b',
        name: 'Medical Euphemism',
        description: 'Healthcare language that softens or obscures medical errors, patient outcomes, and end-of-life realities.',
        implication: 'Can impair informed consent and obscure accountability for medical errors or treatment risks.',
        suggestion: 'Use clear, direct language — especially when patients need accurate information to make decisions.',
        examples: 'Instead of "negative patient outcome" → "the patient died" or "the surgery caused complications"',
        words: [
            "therapeutic misadventure", "negative patient outcome",
            "terminal illness", "life-limiting condition", "comfort care",
            "pregnancy termination", "medical assistance in dying",
            "adverse event", "treatment failure", "non-responsive",
            "palliative sedation", "failure to thrive", "code blue"
        ]
    },

    environmental_euphemism: {
        icon: '🌿',
        color: '#2e7d32',
        name: 'Environmental Euphemism',
        description: 'Environmental language that minimizes ecological damage or greenwashes harmful practices.',
        implication: 'Makes environmental destruction sound manageable or even positive, reducing urgency for action.',
        suggestion: 'Describe the actual environmental impact directly and specifically.',
        examples: 'Instead of "clean coal" → "coal with reduced but still significant emissions" or describe specific pollution levels',
        words: [
            "climate change", "global warming", "carbon footprint",
            "sustainable development", "clean coal", "energy independence",
            "managed retreat", "controlled burn", "wildlife management",
            "natural gas", "harvest", "emissions trading",
            "carbon neutral", "green growth", "responsible mining"
        ]
    }
};

// Export a flat array for backward compatibility
export const euphemismsFlat = Object.values(euphemismWords).flatMap(category => category.words);

// Legacy export name for backward compatibility
export const euphemisms = euphemismsFlat;

// dictionaries/weasel-phrases.js
export const weaselWords = {
    unnamed_sources: {
        icon: '👤',
        color: '#5d4037',
        name: 'Unnamed Sources',
        description: 'References to anonymous or vague sources that cannot be verified or held accountable.',
        implication: 'Allows claims to appear sourced without any verifiable attribution, making fact-checking impossible.',
        suggestion: 'Ask: WHO specifically said this? Name the person, organization, or publication.',
        examples: 'Instead of "sources indicate" → "a senior official at the EPA told Reuters" or name the specific source',
        words: [
            "many people say", "some say", "they say", "people think",
            "some argue", "critics claim", "supporters maintain",
            "observers note", "sources indicate",
            "unnamed sources", "according to reports",
            "insiders claim", "some experts say", "authorities believe",
            "well-placed sources", "those familiar with the matter",
            "people close to the situation", "those in the know"
        ]
    },

    hedged_evidence: {
        icon: '📋',
        color: '#00838f',
        name: 'Hedged Evidence',
        description: 'References to evidence, research, or data without providing specific citations or details.',
        implication: 'Creates an appearance of evidence-based reasoning while avoiding any verifiable claim.',
        suggestion: 'Ask: WHICH study? Published WHERE? By WHOM? Provide the actual citation.',
        examples: 'Instead of "research suggests" → "a 2024 study by Smith et al. in Nature found..."',
        words: [
            "research suggests", "evidence suggests", "data indicates",
            "experts believe", "it is believed", "it is thought",
            "it is said", "may indicate", "could suggest", "might imply",
            "studies have shown", "science tells us", "the data shows",
            "findings indicate", "analysis reveals", "polls suggest"
        ]
    },

    vague_quantifiers: {
        icon: '📊',
        color: '#7b1fa2',
        name: 'Vague Quantifiers',
        description: 'Imprecise frequency or quantity words that avoid committing to specific numbers or rates.',
        implication: 'Obscures actual rates and magnitudes, allowing the reader to imagine whatever quantity supports the argument.',
        suggestion: 'Ask: HOW MANY exactly? Replace with specific numbers, percentages, or ranges.',
        examples: 'Instead of "in many cases" → "in 73% of cases" or "in 8 out of 12 trials"',
        words: [
            "in some cases", "in many cases", "frequently", "typically",
            "tends to",
            "in most cases", "on occasion", "from time to time",
            "more often than not", "time and again", "as often as not",
            "in certain situations", "under some circumstances"
        ]
    },

    appeal_to_authority: {
        icon: '🎓',
        color: '#1565c0',
        name: 'Appeal to Authority',
        description: 'Invocations of unnamed experts or consensus to lend credibility without verifiable backing.',
        implication: 'Borrows authority from unnamed or unqualified sources rather than presenting evidence directly.',
        suggestion: 'Ask: Which SPECIFIC experts? In what FIELD? Is this their area of expertise?',
        examples: 'Instead of "experts believe" → "Dr. Chen, a climate scientist at MIT, found..."',
        words: [
            "widely known", "widely believed",
            "generally accepted", "commonly believed", "often said",
            "the consensus is", "it is well established",
            "leading experts agree", "top scientists confirm",
            "the scientific community agrees", "scholars maintain",
            "mainstream opinion holds"
        ]
    },

    passive_attribution: {
        icon: '🌫️',
        color: '#546e7a',
        name: 'Passive Attribution',
        description: 'Qualifying words that distance the writer from claims, adding plausible deniability.',
        implication: 'Lets the writer advance claims while retaining the ability to disown them if challenged.',
        suggestion: 'Notice the writer is not committing to the claim — ask what they actually believe and why.',
        examples: 'Instead of "reportedly" → state the claim directly and cite the source, or acknowledge uncertainty explicitly',
        words: [
            "reportedly", "allegedly", "supposedly",
            "arguably", "presumably",
            "ostensibly", "purportedly", "apparently",
            "seemingly", "it would appear", "one might say",
            "it has been suggested", "there are those who say",
            "some would argue", "it could be said"
        ]
    }
};

// Export a flat array for backward compatibility
export const weaselPhrasesFlat = Object.values(weaselWords).flatMap(category => category.words);

// Legacy export name for backward compatibility
export const weaselPhrases = weaselPhrasesFlat;

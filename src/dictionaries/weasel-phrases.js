// dictionaries/weasel-phrases.js
// Each sub-category groups words by intensity: 1 = mild, 2 = moderate, 3 = strong
export const weaselWords = {
    unnamed_sources: {
        icon: '👤',
        color: '#5d4037',
        name: 'Unnamed Sources',
        description: 'References to anonymous or vague sources that cannot be verified or held accountable.',
        implication: 'Allows claims to appear sourced without any verifiable attribution, making fact-checking impossible.',
        suggestion: 'Ask: WHO specifically said this? Name the person, organization, or publication.',
        examples: 'Instead of "sources indicate" → "a senior official at the EPA told Reuters" or name the specific source',
        words: {
            1: [
                "some say", "they say", "people think",
                "some argue", "observers note"
            ],
            2: [
                "many people say", "critics claim", "supporters maintain",
                "sources indicate", "according to reports",
                "some experts say", "authorities believe"
            ],
            3: [
                "unnamed sources", "insiders claim",
                "well-placed sources", "those familiar with the matter",
                "people close to the situation", "those in the know"
            ]
        }
    },

    hedged_evidence: {
        icon: '📋',
        color: '#00838f',
        name: 'Hedged Evidence',
        description: 'References to evidence, research, or data without providing specific citations or details.',
        implication: 'Creates an appearance of evidence-based reasoning while avoiding any verifiable claim.',
        suggestion: 'Ask: WHICH study? Published WHERE? By WHOM? Provide the actual citation.',
        examples: 'Instead of "research suggests" → "a 2024 study by Smith et al. in Nature found..."',
        words: {
            1: [
                "may indicate", "could suggest", "might imply",
                "polls suggest"
            ],
            2: [
                "research suggests", "evidence suggests", "data indicates",
                "experts believe", "it is believed", "it is thought",
                "it is said", "findings indicate", "analysis reveals"
            ],
            3: [
                "studies have shown", "science tells us", "the data shows"
            ]
        }
    },

    vague_quantifiers: {
        icon: '📊',
        color: '#7b1fa2',
        name: 'Vague Quantifiers',
        description: 'Imprecise frequency or quantity words that avoid committing to specific numbers or rates.',
        implication: 'Obscures actual rates and magnitudes, allowing the reader to imagine whatever quantity supports the argument.',
        suggestion: 'Ask: HOW MANY exactly? Replace with specific numbers, percentages, or ranges.',
        examples: 'Instead of "in many cases" → "in 73% of cases" or "in 8 out of 12 trials"',
        words: {
            1: [
                "in some cases", "frequently", "typically", "tends to",
                "on occasion", "from time to time",
                "in certain situations", "under some circumstances"
            ],
            2: [
                "in many cases", "in most cases",
                "more often than not", "time and again", "as often as not"
            ]
        }
    },

    appeal_to_authority: {
        icon: '🎓',
        color: '#1565c0',
        name: 'Appeal to Authority',
        description: 'Invocations of unnamed experts or consensus to lend credibility without verifiable backing.',
        implication: 'Borrows authority from unnamed or unqualified sources rather than presenting evidence directly.',
        suggestion: 'Ask: Which SPECIFIC experts? In what FIELD? Is this their area of expertise?',
        examples: 'Instead of "experts believe" → "Dr. Chen, a climate scientist at MIT, found..."',
        words: {
            1: [
                "widely known", "widely believed",
                "generally accepted", "commonly believed", "often said"
            ],
            2: [
                "the consensus is", "it is well established",
                "leading experts agree", "top scientists confirm",
                "scholars maintain", "mainstream opinion holds"
            ],
            3: [
                "the scientific community agrees"
            ]
        }
    },

    passive_attribution: {
        icon: '🌫️',
        color: '#546e7a',
        name: 'Passive Attribution',
        description: 'Qualifying words that distance the writer from claims, adding plausible deniability.',
        implication: 'Lets the writer advance claims while retaining the ability to disown them if challenged.',
        suggestion: 'Notice the writer is not committing to the claim — ask what they actually believe and why.',
        examples: 'Instead of "reportedly" → state the claim directly and cite the source, or acknowledge uncertainty explicitly',
        words: {
            1: [
                "reportedly", "allegedly", "supposedly",
                "arguably", "presumably",
                "ostensibly", "purportedly", "apparently",
                "seemingly", "it would appear", "one might say"
            ],
            2: [
                "it has been suggested", "there are those who say",
                "some would argue", "it could be said"
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
export const weaselPhrasesFlat = Object.values(weaselWords).flatMap(
    category => flattenWords(category.words)
);

// Legacy export name
export const weaselPhrases = weaselPhrasesFlat;

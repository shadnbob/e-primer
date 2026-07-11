// dictionaries/political-isms.js
//
// Explainer dictionary: political -isms. Third explainer type — annotates
// system-words (socialism, capitalism, fascism, populism, nationalism,
// globalism) whose referents differ so much between speakers that arguments
// about them are often arguments about different things.
//
// Content notes: like the other explainers, every card must stay politically
// even-handed — it explains what the word has meant and how its ambiguity
// gets used, and must never argue for or against the system it names.
// Historical anchors (dates, movements, named scholars) do the heavy lifting.
//
// Precision notes: these words are rarely ambiguous in everyday senses, so
// fewer guards are needed than for spectrum/scistats. The one real trap is
// "venture capitalist" (a job title, not a system claim) — excluded via
// lookbehind. Subcategory colors stay deliberately neutral (no red/black/
// gold movement coding).

export const politicalIsmsWords = {
    socialism: {
        icon: '🏭',
        color: '#607d8b',
        name: 'Socialism',
        description: 'A 19th-century term whose core meaning — social or collective ownership of the means of production — now spans a huge range: Marxist state ownership, democratic socialism (an electoral route, itself contested), and social democracy (a market economy with a large welfare state, technically a different tradition).',
        implication: 'The same word covers the Soviet economy and a public library. In US discourse, Nordic countries are routinely called socialist while their own governments describe them as market economies with strong safety nets. Used as an epithet, "socialism" attaches the record of one variant to proposals from another.',
        suggestion: 'Ask which institutions are actually proposed or described: who would own what, decided by whom?',
        examples: '"That policy is socialism" — state ownership of industry, or a tax-funded service like roads and fire departments?',
        words: [
            "socialism", "socialists", "socialistic",
            "socialist",
            "\\bdemocratic socialis(m|ts?)\\b",
            "\\bsocial democra(cy|ts?|tic)\\b"
        ]
    },

    capitalism: {
        icon: '🏦',
        color: '#6d4c41',
        name: 'Capitalism',
        description: 'Popularized largely by its critics (Marx wrote of the "capitalist mode of production"; the noun spread later through writers like Sombart and Weber), "capitalism" can mean the minimal definition — private ownership and market exchange — or the entire actually-existing economy with its subsidies, monopolies, and regulations.',
        implication: 'Defenders often argue for the textbook model of free exchange while critics attack the existing arrangement (or vice versa), so both sides can be right about different referents. Qualifiers like "crony capitalism" and "late capitalism" (a scholarly term from Sombart and Mandel, now mostly ironic) signal that a specific variant is meant — or just add color.',
        suggestion: 'Ask whether the claim is about markets in principle or about the current economy in practice — they support different conclusions.',
        examples: '"Capitalism causes X" / "capitalism lifted millions from poverty" — the same word, often two different systems.',
        words: [
            "capitalism", "capitalistic",
            "\\blate[- ](stage )?capitalism\\b",
            "\\bcrony capitalism\\b",
            "\\bfree[- ]markets?\\b",
            "(?<!venture )(?<!venture-)\\bcapitalists?\\b"
        ]
    },

    fascism: {
        icon: '📚',
        color: '#455a64',
        name: 'Fascism',
        description: 'Historically, the movement founded by Mussolini in Italy (in power 1922–43) and, by extension, kindred interwar regimes: ultranationalism, a one-party state, a cult of the leader, suppression of opposition, and glorification of violence. Scholars (Paxton, Griffin, Eco) still debate the precise defining features.',
        implication: 'Outside historical and scholarly use, the word drifts toward a generic intensifier for any disliked authority — Orwell observed as early as 1944 that it had become "almost entirely meaningless" in casual use. Calling something fascist ends analysis: it asserts the conclusion instead of showing which specific features apply.',
        suggestion: 'Ask which concrete features are being claimed — and whether the same evidence is offered, or just the label.',
        examples: '"That policy is fascist" — which element: the leader cult? one-party rule? political violence? Or is it simply disliked?',
        words: [
            "fascism", "fascist", "fascists", "fascistic",
            "\\bneo[- ]?fascis(m|ts?)\\b"
        ]
    },

    populism: {
        icon: '📣',
        color: '#7e57c2',
        name: 'Populism',
        description: 'Named for the US People\'s Party of the 1890s. In political science it describes a style, found on both left and right, that frames politics as a virtuous "the people" against a corrupt "elite" (Mudde calls it a "thin" ideology that attaches to others).',
        implication: 'In headlines the word often just means "popular and irresponsible" or "demagogic" — a way to dismiss a movement without engaging its claims. The scholarly sense is descriptive; the journalistic sense is usually pejorative, and readers rarely know which one they are getting.',
        suggestion: 'Ask what the labeled movement actually proposes, and who is being cast as "the people" and "the elite."',
        examples: '"Populist economic policy" — described, or dismissed? The label alone does not say what the policy is.',
        words: [
            "populism", "populist", "populists"
        ]
    },

    nationalism: {
        icon: '🗺️',
        color: '#00838f',
        name: 'Nationalism & Globalism',
        description: 'Nationalism ranges from a founding principle of modern states (self-determination movements) to aggressive supremacy; Orwell distinguished patriotism (devotion to a place and way of life) from nationalism (competitive prestige-seeking). "Globalism" is its shifting antonym.',
        implication: 'Both words work as boundary markers more than descriptions. "Globalist" in particular ranges from a neutral label for supporters of international institutions and trade to conspiracy tropes — the ambiguity itself is why the word inflames. "Nationalist" likewise spans self-determination and chauvinism.',
        suggestion: 'Ask which policies or loyalties are actually meant, and whether the person described would accept the label.',
        examples: '"Globalist agenda" — trade agreements and treaties, or an insinuated hidden cabal? The sentence rarely says.',
        words: [
            "nationalism", "nationalist", "nationalists", "nationalistic",
            "globalism", "globalist", "globalists",
            "\\bultranationalis(m|ts?|tic)\\b"
        ]
    }
};

// Flat list for the pattern compiler (regex matching)
export const politicalIsms = Object.values(politicalIsmsWords).flatMap(sub => sub.words);

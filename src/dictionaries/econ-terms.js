// dictionaries/econ-terms.js
//
// Explainer dictionary: everyday economics. Fifth explainer type — annotates
// the economic vocabulary that news cycles run on, where a technical meaning
// (a rate, a flow, a dated committee judgment) differs from how the phrase
// reads (a level, a stock, a switch that flips).
//
// Content notes: numbers-anchored and non-partisan — inflation confusion,
// deficit-vs-debt, and "the economy" as a monolith mislead readers of every
// persuasion. The cards hand over the distinction and the question to ask.
//
// Precision notes: bare "inflation", "the economy", "the deficit", "record
// high", and "soft landing" are skipped (too common or collide with sports,
// weather, and aviation senses). Matching targets the confusion-bearing
// phrases instead.

export const econTermsWords = {
    inflation: {
        icon: '📈',
        color: '#6d4c41',
        name: 'Inflation Is a Rate',
        description: 'Inflation measures how fast prices are <em>rising</em>. "Inflation is falling" therefore means prices are rising more slowly — not that prices are falling (that would be deflation, which is rare and brings its own problems).',
        implication: 'During 2021–24 this confusion was everywhere: headlines celebrated "falling inflation" while readers wondered why groceries still cost more, because the price <em>level</em> kept the earlier increases. Disinflation (a slowing rate) and deflation (falling prices) are different phenomena with nearly identical-sounding coverage.',
        suggestion: 'Ask whether the sentence is about the rate of change or the level of prices — and over what period.',
        examples: '"Inflation fell to 3%" — prices are still rising 3% a year, on top of every previous increase.',
        words: [
            "\\binflation (is |was )?(falling|dropping|slowing|cooling|easing|down)\\b",
            "\\b(falling|slowing|cooling|easing) inflation\\b",
            "\\binflation (came|come|comes|is coming) down\\b",
            "disinflation",
            "deflation", "deflationary",
            "hyperinflation"
        ]
    },

    deficit_debt: {
        icon: '🏛️',
        color: '#546e7a',
        name: 'Deficit vs Debt',
        description: 'The deficit is a yearly flow — this year\'s gap between spending and revenue. The debt is the accumulated stock of all past deficits. Cutting the deficit still grows the debt, just more slowly.',
        implication: 'The two get conflated daily, which lets rhetoric mislead in both directions: "we cut the deficit in half" can coexist with record debt, and "the debt hit a record" is nearly always true in a growing economy and says little by itself. Scale also vanishes — figures mean little without comparison to GDP.',
        suggestion: 'Ask which one is meant — the yearly gap or the accumulated total — and compared to what (last year, GDP, projections)?',
        examples: '"Cut the deficit" while "the debt grew" — both true at once, and routinely deployed against each other.',
        words: [
            "\\b(budget|federal|fiscal|trade) deficits?\\b",
            "\\b(reduce|reducing|cut|cutting|halve|halving) the deficit\\b",
            "\\bnational debt\\b",
            "\\b(government|public) debt\\b",
            "\\bdebt ceiling\\b"
        ]
    },

    recession_economy: {
        icon: '🌡️',
        color: '#00838f',
        name: 'Recession & "The Economy"',
        description: 'A "recession" has no single agreed definition: the informal rule of thumb (two consecutive quarters of shrinking GDP) differs from the US convention, where the NBER dates recessions after the fact using many indicators. And "the economy" is not one thing — GDP, stock indices, employment, and wages routinely move in different directions.',
        implication: 'Whether "we are in a recession" can be genuinely disputed for months, which makes the word a political football. "Good for the economy" often means good for one measure and one group — the stock market is not household income, and GDP growth says nothing about how gains are distributed.',
        suggestion: 'Ask which measure and whose experience is meant: output, jobs, wages, prices, or portfolios?',
        examples: '"The economy is booming" — GDP? the S&P 500? median wages? All three can point different ways at once.',
        words: [
            "recession", "recessions",
            "\\btechnical recession\\b",
            "\\bthe economy (is|was) (booming|strong|weak|struggling|recovering|roaring|in shambles)\\b",
            "\\b(good|bad|great|terrible) for the economy\\b",
            "\\bgrow(ing)? the economy\\b"
        ]
    },

    class_records: {
        icon: '🏠',
        color: '#7e57c2',
        name: 'Middle Class & Records',
        description: '"Middle class" has no standard definition — income bands, wealth, occupation, and self-image all give different answers, and in surveys large majorities across very different incomes place themselves in it. "Record profits" and similar records are often nominal: in a growing economy with inflation, records are routine.',
        implication: 'Because nearly everyone hears themselves in "the middle class," policies pitched to it can target very different people than the listener imagines. Records reported without inflation adjustment or share-of-revenue context ("record profits") can describe an ordinary year in a bigger economy — or a genuinely extraordinary one; the phrase alone cannot say.',
        suggestion: 'Ask what boundaries are meant by the class label, and whether the record is adjusted for inflation and scale.',
        examples: '"Tax relief for the middle class" — which incomes, exactly? "Record profits" — real, or nominal in a larger economy?',
        words: [
            "\\bmiddle[- ]class\\b",
            "\\bworking[- ]class\\b",
            "\\brecord (profits|revenue|revenues|earnings)\\b"
        ]
    }
};

// Flat list for the pattern compiler (regex matching)
export const econTerms = Object.values(econTermsWords).flatMap(sub => sub.words);

// dictionaries/civic-terms.js
//
// Explainer dictionary: speech & civic terms. Fourth explainer type —
// annotates the vocabulary of the most common online argument-collapse:
// legal standards and civic values whose legal sense and cultural sense get
// swapped mid-argument (free speech the law vs free speech the value,
// censorship by the state vs moderation by a platform, courtroom standards
// imported into social judgment).
//
// Content notes: the cards must name the distinction without settling the
// live normative debates around it (e.g. how much process private judgment
// owes, whether moderation at scale should count as censorship). Legal
// anchors (First Amendment text, Areopagitica, NYT v. Sullivan) do the
// factual work.
//
// Precision notes: bare "banned", "silenced", and "rights" are skipped as
// too broad; rights-talk matches only in its claim-phrases.

export const civicTermsWords = {
    free_speech: {
        icon: '🗣️',
        color: '#5c6bc0',
        name: 'Free Speech',
        description: 'Two related but distinct things share the name: a legal right — in the US, the First Amendment, which restrains <em>government</em> ("Congress shall make no law…") — and a broader cultural value of open discourse (argued by Milton and Mill long before any constitution).',
        implication: 'The most common collapse online: one person argues the law (a platform or employer is not the government, so no right was violated) while the other argues the value (a culture of sanction chills discourse regardless of who applies it). Both senses are legitimate; treating them as one produces arguments where both sides are right about different things.',
        suggestion: 'Ask which sense is in play: a legal claim about state power, or a cultural claim about norms of open discourse?',
        examples: '"They violated my free speech" — did a government act, or did a private party decline to host or associate?',
        words: [
            "\\bfree speech\\b",
            "\\bfreedom of speech\\b",
            "\\bfreedom of expression\\b",
            "\\bfirst amendment\\b"
        ]
    },

    censorship: {
        icon: '✂️',
        color: '#8d6e63',
        name: 'Censorship',
        description: 'Historically, suppression by authority — licensing regimes and prior restraint (Milton\'s Areopagitica argued against them in 1644). The word now stretches across state suppression, platform moderation, editorial judgment, and sometimes mere criticism.',
        implication: 'State censorship, platform moderation, editorial selection, and social pushback differ enormously in power and remedy — a government can imprison, a platform can remove, an editor can decline, a critic can only object. The single word erases those differences. Whether large platforms\' moderation <em>should</em> be treated like public censorship is a genuine, unsettled debate; the word alone does not resolve it.',
        suggestion: 'Ask who exercised what power, with what alternatives left to the speaker — and what remedy is actually being proposed.',
        examples: '"They censored me" — a takedown? a declined submission? a ban? disagreement? Each is a different claim.',
        words: [
            "censorship", "censored", "censoring",
            "\\bself[- ]censorship\\b",
            "\\bshadow[- ]?ban(ned|ning|s)?\\b",
            "\\bdeplatform(ed|ing)?\\b"
        ]
    },

    rights: {
        icon: '📜',
        color: '#00838f',
        name: 'Rights Claims',
        description: 'Rights-talk mixes distinct claims: legal rights (enforceable in some jurisdiction, against some party), moral rights (claims about what ought to be, whatever the law says), and rhetorical entitlement ("I have a right to…" as emphasis).',
        implication: 'A legal right names who must do what — enforceable, specific, jurisdiction-bound. A moral right is an argument, not a fact about the law. Sliding between them lets a contested "ought" borrow the authority of an established "is," and vice versa: "there\'s no right to X" may be legally true and morally beside the point.',
        suggestion: 'Ask: enforceable where, against whom? And if it is a moral claim, what is the argument for it?',
        examples: '"I have a right to say this here" — under law, the host usually decides "here"; the moral claim needs its own defense.',
        words: [
            "\\b(i|we|you|they) have a right to\\b",
            "\\bmy rights\\b",
            "\\b(constitutional|god-given|natural|inalienable|fundamental) rights?\\b",
            "\\bviolat(es?|ed|ing) (my|our|their) rights\\b"
        ]
    },

    legal_standards: {
        icon: '⚖️',
        color: '#6d4c41',
        name: 'Legal Standards',
        description: 'Courtroom standards imported into everyday judgment: "innocent until proven guilty" and "due process" govern what the <em>state</em> must do before punishing. "Defamation" (libel if written, slander if spoken) requires a false statement of fact — and in the US, for public figures, knowing or reckless falsehood (NYT v. Sullivan, 1964).',
        implication: 'A boycott is not a verdict and an employer is not a court, so courtroom standards do not transfer automatically — yet the worry behind invoking them (serious consequences without fair process) is a real normative question, not a confusion. "That\'s slander!" about a true statement or an opinion misuses a term with a precise meaning.',
        suggestion: 'Ask whether the standard invoked binds the actor in question — and if not, what fairness is actually being demanded.',
        examples: '"Innocent until proven guilty" — a rule for the state\'s power to punish; whether private judgment should wait for verdicts is a separate argument.',
        words: [
            "\\bdue process\\b",
            "\\binnocent until proven guilty\\b",
            "\\bpresum(ption of innocence|ed innocent)\\b",
            "defamation", "defamatory",
            "\\blibell?(ous)?\\b",
            "slander", "slanderous"
        ]
    }
};

// Flat list for the pattern compiler (regex matching)
export const civicTerms = Object.values(civicTermsWords).flatMap(sub => sub.words);

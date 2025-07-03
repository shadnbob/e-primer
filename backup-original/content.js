// content.js
(function () {
    // Configuration
    const BiasDetector = {
        settings: {
            enableAnalysis: true,
            highlightOpinion: true,
            highlightToBe: true,
            highlightAbsolutes: true,
            highlightPassive: true,
            highlightWeasel: true,
            highlightPresupposition: true,
            highlightMetaphors: true,
            highlightMinimizers: true,
            highlightMaximizers: true,
            highlightFalseBalance: true,
            highlightEuphemism: true,
            highlightEmotional: true,
            highlightGaslighting: true,
            highlightFalseDilemma: true
        },

        previousSettings: {
            enableAnalysis: true,
            highlightOpinion: true,
            highlightToBe: true,
            highlightAbsolutes: true,
            highlightPassive: true,
            highlightWeasel: true,
            highlightPresupposition: true,
            highlightMetaphors: true,
            highlightMinimizers: true,
            highlightMaximizers: true,
            highlightFalseBalance: true,
            highlightEuphemism: true,
            highlightEmotional: true,
            highlightGaslighting: true,
            highlightFalseDilemma: true
        },

        stats: {
            opinionCount: 0,
            toBeCount: 0,
            absoluteCount: 0,
            passiveCount: 0,
            weaselCount: 0,
            presuppositionCount: 0,
            metaphorCount: 0,
            minimizerCount: 0,
            maximizerCount: 0,
            falseBalanceCount: 0,
            euphemismCount: 0,
            emotionalCount: 0,
            gaslightingCount: 0,
            falseDilemmaCount: 0
        },

        observer: null,

        // Word dictionaries
        dictionaries: {
            opinion: [
                // Certainty/Conviction Adverbs
                "\\bclearly\\b", "\\bobviously\\b", "\\bundoubtedly\\b", "\\bcertainly\\b", "\\bdefinitely\\b", "\\babsolutely\\b",
                "\\bsurely\\b", "\\bundeniably\\b", "\\bunquestionably\\b", "\\bindisputably\\b", "\\bindubitably\\b", "\\bunmistakably\\b",
                "\\bincontrovertibly\\b", "\\bincontestably\\b", "\\birrefutably\\b", "\\bmanifestly\\b", "\\bpatently\\b",

                // Hedging/Uncertainty Words
                "\\ballegedly\\b", "\\bsupposedly\\b", "\\bapparently\\b", "\\bevidently\\b", "\\barguably\\b", "\\bseemingly\\b",
                "\\bostensibly\\b", "\\breportedly\\b", "\\breputedly\\b", "\\bpresumably\\b", "\\bpurportedly\\b", "\\bpossibly\\b",
                "\\bprobably\\b", "\\bmaybe\\b", "\\bperhaps\\b", "\\bconceivably\\b", "\\bspeculated\\b", "\\brumored\\b",

                // Evaluative Adjectives (Positive)
                "\\bgood\\b", "\\bgreat\\b", "\\bexcellent\\b", "\\bexceptional\\b", "\\boutstanding\\b", "\\bperfect\\b", "\\bflawless\\b",
                "\\bfantastic\\b", "\\bsuperb\\b", "\\bmagnificent\\b", "\\bbrilliant\\b", "\\bspectacular\\b", "\\bimpressive\\b",
                "\\bremarkable\\b", "\\bextraordinary\\b", "\\bastonishing\\b", "\\bwonderful\\b", "\\bmarvelous\\b", "\\bphenomenal\\b",
                "\\bterrific\\b", "\\bstunning\\b", "\\bamazing\\b", "\\bincredible\\b", "\\bfabulous\\b", "\\bsplendid\\b", "\\bdelightful\\b",
                "\\badmirable\\b", "\\bcommendable\\b", "\\bpraiseworthy\\b", "\\bexemplary\\b", "\\bstellar\\b", "\\bsuperior\\b",
                "\\bfirst\\b-rate", "\\btop\\b-notch", "\\bpremium\\b", "\\bfavorable\\b", "\\bpositive\\b", "\\bsatisfactory\\b",
                "\\bpleasing\\b", "\\bgratifying\\b", "\\bbeneficial\\b", "\\badvantageous\\b", "\\bdesirable\\b", "\\bworthy\\b",

                // Evaluative Adjectives (Negative)
                "\\bbad\\b", "\\bterrible\\b", "\\bawful\\b", "\\bhorrible\\b", "\\batrocious\\b", "\\bdreadful\\b", "\\bappalling\\b",
                "\\babysmal\\b", "\\bpoor\\b", "\\binadequate\\b", "\\binferior\\b", "\\bsubstandard\\b", "\\bmediocre\\b", "\\bdisappointing\\b",
                "\\bunsatisfactory\\b", "\\bunacceptable\\b", "\\bdeficient\\b", "\\bfaulty\\b", "\\bflawed\\b", "\\bshoddy\\b",
                "\\bdeplorable\\b", "\\blamentable\\b", "\\bpathetic\\b", "\\bpitiful\\b", "\\bregrettable\\b", "\\bmiserable\\b",
                "\\bwretched\\b", "\\bdismal\\b", "\\bgrim\\b", "\\bbleak\\b", "\\bdire\\b", "\\bgrave\\b", "\\bsevere\\b", "\\bunfortunate\\b",
                "\\bunfavorable\\b", "\\bdisagreeable\\b", "\\bunpleasant\\b", "\\bdistressing\\b", "\\btroublesome\\b",
                "\\bproblematic\\b", "\\bobjectionable\\b", "\\breprehensible\\b", "\\brepugnant\\b", "\\bdetestable\\b",

                // Emotionally Charged Words
                "\\bshocking\\b", "\\bdisturbing\\b", "\\btroubling\\b", "\\bencouraging\\b", "\\binspiring\\b", "\\boutrageous\\b",
                "\\bscandalous\\b", "\\binfuriating\\b", "\\bfrustrating\\b", "\\birritating\\b", "\\bexasperating\\b", "\\bvexing\\b",
                "\\bheartwarming\\b", "\\btouching\\b", "\\bmoving\\b", "\\bsoothing\\b", "\\bcomforting\\b", "\\breassuring\\b",
                "\\buplifting\\b", "\\bexhilarating\\b", "\\bthrilling\\b", "\\bexciting\\b", "\\bsensational\\b", "\\bdelightful\\b",
                "\\bdisgusting\\b", "\\brevolting\\b", "\\bsickening\\b", "\\bnauseating\\b", "\\boffensive\\b", "\\bfrightening\\b",
                "\\bterrifying\\b", "\\bhorrifying\\b", "\\balarming\\b", "\\bworrying\\b", "\\bconcerning\\b", "\\bthreatening\\b",

                // Comparative/Superlative Terms
                "\\bbest\\b", "\\bworst\\b", "\\bbetter\\b", "\\bworse\\b", "\\bsuperior\\b", "\\binferior\\b", "\\bgreater\\b", "\\blesser\\b",
                "\\bbigger\\b", "\\bsmaller\\b", "\\bhigher\\b", "\\blower\\b", "\\bfiner\\b", "\\bpoorer\\b", "\\bstrongest\\b", "\\bweakest\\b",
                "\\bfinest\\b", "\\bprettiest\\b", "\\bugliest\\b", "\\bsmartest\\b", "\\bdumbest\\b", "\\bbrightest\\b", "\\bdarkest\\b",

                // Political/Controversial Framing
                "\\bcontroversial\\b", "\\bdisputed\\b", "\\bradical\\b", "\\bextreme\\b", "\\bprogressive\\b", "\\bconservative\\b",
                "\\bliberal\\b", "\\bfar\\b-right", "\\bfar\\b-left", "\\bmoderate\\b", "\\bcentrist\\b", "\\bmainstream\\b", "\\bfringe\\b",
                "\\brevolutionary\\b", "\\btraditional\\b", "\\bconventional\\b", "\\bunconventional\\b", "\\borthodox\\b",
                "\\bunorthodox\\b", "\\bestablishment\\b", "\\banti\\b-establishment", "\\bpopulist\\b", "\\belitist\\b",
                "\\bpartisan\\b", "\\bbipartisan\\b", "\\bdivisive\\b", "\\bpolarizing\\b", "\\bcontentious\\b", "\\bprovocative\\b",

                // Intensifiers
                "\\bvery\\b", "\\bextremely\\b", "\\bincredibly\\b", "\\bexceptionally\\b", "\\bextraordinarily\\b", "\\bremarkably\\b",
                "\\bnotably\\b", "\\bparticularly\\b", "\\bespecially\\b", "\\bsurprisingly\\b", "\\bunusually\\b", "\\bstrikingly\\b",
                "\\bdecidedly\\b", "\\bmarkedly\\b", "\\bprofoundly\\b", "\\bdeeply\\b", "\\bvastly\\b", "\\bgreatly\\b", "\\bhighly\\b",
                "\\bimmensely\\b", "\\btremendously\\b", "\\benormously\\b", "\\bexceedingly\\b", "\\bexcessively\\b", "\\boverly\\b",
                "\\butterly\\b", "\\bcompletely\\b", "\\bentirely\\b", "\\btotally\\b", "\\bwholly\\b", "\\bthoroughly\\b", "\\bfully\\b",
                "\\bintensely\\b", "\\bseriously\\b", "\\bsubstantially\\b", "\\bsignificantly\\b", "\\bconsiderably\\b",

                // Credibility Undermining Words
                "\\bclaims\\b", "\\bpurports\\b", "\\basserts\\b", "\\balleges\\b", "\\bcontends\\b", "\\bmaintains\\b", "\\binsists\\b",
                "\\bso\\b-called", "\\bself\\b-proclaimed", "\\bsupposed\\b", "\\bpretend\\b", "\\bdubious\\b", "\\bquestionable\\b",
                "\\bunproven\\b", "\\bunverified\\b", "\\bunsubstantiated\\b", "\\bunfounded\\b", "\\bbaseless\\b", "\\bgroundless\\b",

                // Loaded Political Terms
                "\\bfreedom\\b", "\\bjustice\\b", "\\bequality\\b", "\\brights\\b", "\\bliberty\\b", "\\bdemocracy\\b", "\\bpatriotic\\b",
                "\\bunpatriotic\\b", "\\bun\\b-American", "\\bsocialist\\b", "\\bcommunist\\b", "\\bfascist\\b", "\\bdictatorial\\b",
                "\\btotalitarian\\b", "\\bauthoritarian\\b", "\\bcorrupt\\b", "\\bcrooked\\b", "\\bdishonest\\b", "\\bshady\\b",
                "\\billegal\\b", "\\bunlawful\\b", "\\bcriminal\\b", "\\bscandal\\b", "\\bconspiracy\\b", "\\bregime\\b", "\\bpropaganda\\b",

                // Moral/Ethical Judgments
                "\\bmoral\\b", "\\bimmoral\\b", "\\bethical\\b", "\\bunethical\\b", "\\bvirtuous\\b", "\\bcorrupt\\b", "\\bjust\\b", "\\bunjust\\b",
                "\\bfair\\b", "\\bunfair\\b", "\\bhonorable\\b", "\\bdishonorable\\b", "\\bhonest\\b", "\\bdishonest\\b", "\\bdecent\\b",
                "\\bindecent\\b", "\\bappropriate\\b", "\\binappropriate\\b", "\\bacceptable\\b", "\\bunacceptable\\b",
                "\\blegitimate\\b", "\\billegitimate\\b", "\\breasonable\\b", "\\bunreasonable\\b",

                // Emotional Appeals
                "\\bheartbreaking\\b", "\\bdevastating\\b", "\\btragic\\b", "\\bsad\\b", "\\bjoyful\\b", "\\bhappy\\b", "\\bhopeful\\b",
                "\\bpromising\\b", "\\bdepressing\\b", "\\bgloomy\\b", "\\boptimistic\\b", "\\bpessimistic\\b", "\\banxious\\b",
                "\\bfearful\\b", "\\bafraid\\b", "\\bconfident\\b", "\\bproud\\b", "\\bashamed\\b", "\\bembarrassed\\b", "\\bguilty\\b"
                ,
                "\\bheartbreaking\\b", "\\bdevastating\\b", "\\btragic\\b", "\\bsad\\b", "\\bjoyful\\b", "\\bhappy\\b", "\\bhopeful\\b",
                "\\bpromising\\b", "\\bdepressing\\b", "\\bgloomy\\b", "\\boptimistic\\b", "\\bpessimistic\\b", "\\banxious\\b",
                "\\bfearful\\b", "\\bafraid\\b", "\\bconfident\\b", "\\bproud\\b", "\\bashamed\\b", "\\bembarrassed\\b", "\\bguilty\\b"
            ],

            toBe: [
                // Present forms
                "\\bis\\b", "\\bare\\b", "\\bam\\b",

                // Past forms
                "\\bwas\\b", "\\bwere\\b",

                // Infinitive and participles
                "\\bbe\\b", "\\bbeing\\b", "\\bbeen\\b",

                // Contractions with word boundaries
                "\\bit's\\b", "\\bthat's\\b", "\\bhe's\\b", "\\bshe's\\b", "\\bwhat's\\b",
                "\\bwho's\\b", "\\byou're\\b", "\\bthey're\\b", "\\bwe're\\b", "\\bi'm\\b",
                "\\bthere's\\b", "\\bhere's\\b", "\\bwasn't\\b", "\\bweren't\\b", "\\bisn't\\b",
                "\\baren't\\b"
            ],

            absolute: [
                // Universal Quantifiers
                "\\ball\\b", "\\bevery\\b", "\\beach\\b", "\\bany\\b", "\\bno\\b", "\\bnone\\b",

                // People Universals
                "\\beveryone\\b", "\\beverybody\\b", "\\bno one\\b", "\\bnobody\\b", "\\banyone\\b",
                "\\banybody\\b", "\\bsomeone\\b", "\\bsomebody\\b",

                // Time Universals
                "\\balways\\b", "\\bnever\\b", "\\bforever\\b", "\\beternal\\b", "\\bconstantly\\b",
                "\\bperpetually\\b", "\\bcontinually\\b", "\\bendlessly\\b", "\\bceaselessly\\b",
                "\\bpermanently\\b", "\\binvariably\\b",

                // Categorical Statements
                "\\bcompletely\\b", "\\btotally\\b", "\\bentirely\\b", "\\babsolutely\\b", "\\bperfectly\\b",
                "\\bwholly\\b", "\\bthoroughly\\b", "\\bultimately\\b", "\\bfundamentally\\b",
                "\\bpurely\\b", "\\boutright\\b", "\\bcomprehensively\\b", "\\buniversally\\b",

                // Thing Universals
                "\\beverything\\b", "\\bnothing\\b", "\\banything\\b", "\\bsomething\\b",

                // Absolute Adjectives
                "\\bperfect\\b", "\\bcomplete\\b", "\\btotal\\b", "\\babsolute\\b", "\\bentire\\b",
                "\\bfull\\b", "\\bwhole\\b", "\\bultimate\\b", "\\bmaximum\\b", "\\bminimum\\b",
                "\\bsupreme\\b", "\\bextreme\\b", "\\butmost\\b", "\\bfinal\\b", "\\binfallible\\b",
                "\\bunerring\\b", "\\buniversal\\b", "\\bimpossible\\b", "\\binevitable\\b",
                "\\binescapable\\b", "\\bundeniable\\b", "\\birrefutable\\b", "\\bidentical\\b",
                "\\bpure\\b", "\\bsheer\\b", "\\bmere\\b",

                // Absolute Certainty
                "\\bcertainly\\b", "\\bdefinitely\\b", "\\bundoubtedly\\b", "\\bunquestionably\\b",
                "\\bindisputably\\b", "\\birrefutably\\b", "\\bincontrovertibly\\b", "\\bincontestably\\b",
                "\\bunequivocally\\b"
            ],

            // Passive voice patterns
            passive: [
                // Basic passive patterns
                "\\bwas\\s+\\w+ed\\b",
                "\\bwere\\s+\\w+ed\\b",
                "\\bhas\\s+been\\s+\\w+ed\\b",
                "\\bhave\\s+been\\s+\\w+ed\\b",
                "\\bhad\\s+been\\s+\\w+ed\\b",
                "\\bis\\s+being\\s+\\w+ed\\b",
                "\\bare\\s+being\\s+\\w+ed\\b",
                "\\bwill\\s+be\\s+\\w+ed\\b",
                "\\bwould\\s+be\\s+\\w+ed\\b",
                "\\bcan\\s+be\\s+\\w+ed\\b",
                "\\bcould\\s+be\\s+\\w+ed\\b",
                "\\bmay\\s+be\\s+\\w+ed\\b",
                "\\bmight\\s+be\\s+\\w+ed\\b",
                "\\bshould\\s+be\\s+\\w+ed\\b",
                "\\bmust\\s+be\\s+\\w+ed\\b",
                // Common irregular past participles
                "\\bwas\\s+(written|taken|given|made|done|seen|known|shown|chosen|broken|spoken|driven|forgotten|eaten|beaten)\\b",
                "\\bwere\\s+(written|taken|given|made|done|seen|known|shown|chosen|broken|spoken|driven|forgotten|eaten|beaten)\\b",
                "\\bhas\\s+been\\s+(written|taken|given|made|done|seen|known|shown|chosen|broken|spoken|driven|forgotten|eaten|beaten)\\b",
                "\\bhave\\s+been\\s+(written|taken|given|made|done|seen|known|shown|chosen|broken|spoken|driven|forgotten|eaten|beaten)\\b",
                // Common passive phrases
                "\\bit\\s+is\\s+believed\\b",
                "\\bit\\s+is\\s+thought\\b",
                "\\bit\\s+is\\s+said\\b",
                "\\bit\\s+has\\s+been\\s+reported\\b",
                "\\bit\\s+was\\s+reported\\b",
                "\\bit\\s+is\\s+considered\\b",
                "\\bit\\s+is\\s+expected\\b",
                "\\bmistakes\\s+were\\s+made\\b",
                "\\bconcerns\\s+have\\s+been\\s+raised\\b",
                "\\bquestions\\s+have\\s+been\\s+asked\\b"
            ],

            // Weasel words and vague attribution
            weasel: [
                "many people say", "some say", "experts believe", "studies show",
                "it is said", "they say", "people think", "some argue",
                "critics claim", "supporters maintain", "observers note",
                "sources indicate", "reportedly", "allegedly", "supposedly",
                "it is believed", "it is thought", "widely known", "widely believed",
                "generally accepted", "commonly believed", "often said",
                "research suggests", "evidence suggests", "data indicates",
                "it appears", "it seems", "arguably", "presumably",
                "in some cases", "in many cases", "frequently", "typically",
                "tends to", "may indicate", "could suggest", "might imply"
            ],

            // Presupposition markers
            presupposition: [
                // Basic presupposition triggers
                "\\beven\\b", "\\bstill\\b", "\\banother\\b", "\\bfinally\\b",
                "\\balready\\b", "\\byet\\b", "\\bagain\\b",
                // Loaded verbs
                "\\bcontinues\\s+to\\b", "\\brefuses\\s+to\\b", "\\bfails\\s+to\\b",
                "\\badmits\\b", "\\bdenies\\b", "\\backnowledges\\b",
                // Loaded phrases
                "\\bdespite\\s+claiming\\b", "\\bwhile\\s+claiming\\b",
                "\\bso-called\\b", "\\balleged\\b", "\\bsupposed\\b", "\\bpretend\\b",
                "\\bthe\\s+fact\\s+that\\b", "\\bof\\s+course\\b",
                // Temporal presuppositions
                "\\bno\\s+longer\\b", "\\bnot\\s+anymore\\b", "\\bused\\s+to\\b"
            ],

            // War and conflict metaphors
            warMetaphors: [
                "\\bbattle\\b", "\\bfight\\b", "\\bcombat\\b", "\\battack\\b",
                "\\bdefend\\b", "\\boffensive\\b", "\\bdefensive\\b", "\\bstrategy\\b",
                "\\btactics\\b", "\\bfrontline\\b", "\\bbattlefield\\b", "\\bwar\\s+on\\b",
                "\\bfight\\s+against\\b", "\\bcrusade\\b", "\\bcampaign\\s+against\\b",
                "\\bunder\\s+fire\\b", "\\bunder\\s+attack\\b", "\\bbombarded\\b",
                "\\barsenal\\b", "\\bammunition\\b", "\\bweapon\\b", "\\btarget\\b",
                "\\benemy\\b", "\\bdefeat\\b", "\\bvictory\\b", "\\bconquer\\b",
                "\\bsiege\\b", "\\bassault\\b", "\\binvade\\b", "\\bretreat\\b"
            ],

            // Minimizers
            minimizers: [
                "\\bjust\\b", "\\bonly\\b", "\\bmerely\\b", "\\bsimply\\b",
                "\\bbarely\\b", "\\bhardly\\b", "\\bscarcely\\b", "\\bslightly\\b",
                "\\bsomewhat\\b", "\\ba\\s+bit\\b", "\\ba\\s+little\\b",
                "\\bminor\\b", "\\bsmall\\b", "\\btiny\\b", "\\btrivial\\b",
                "\\binsignificant\\b", "\\bnegligible\\b", "\\bmarginal\\b"
            ],

            // Maximizers
            maximizers: [
                "\\bmassive\\b", "\\bhuge\\b", "\\benormous\\b", "\\bgigantic\\b",
                "\\bcolossal\\b", "\\bcrisis\\b", "\\bdisaster\\b", "\\bcatastrophe\\b",
                "\\bepidemic\\b", "\\bplague\\b", "\\bexplosion\\b", "\\bskyrocket\\b",
                "\\bplummet\\b", "\\bdevastate\\b", "\\bdestroy\\b", "\\bannihilate\\b",
                "\\bobliterate\\b", "\\bdecimate\\b", "\\brevolutionary\\b",
                "\\bunprecedented\\b", "\\bextraordinary\\b", "\\bincredible\\b",
                "\\bamazing\\b", "\\bastonishing\\b", "\\bstaggering\\b"
            ],

            // False Balance Markers
            falseBalance: [
                // Direct balance phrases
                "both sides", "on one hand", "on the other hand", "equally valid",
                "two sides to every story", "balanced perspective", "middle ground",
                "neutral position", "unbiased view", "fair and balanced",

                // False equivalence markers
                "just as", "equally problematic", "similarly concerning",
                "two schools of thought", "competing theories", "alternative facts",
                "different perspectives", "various viewpoints", "diverse opinions",

                // Debate framing
                "controversial issue", "ongoing debate", "disputed topic",
                "contentious matter", "divisive issue", "polarizing topic",
                "heated discussion", "matter of opinion", "subjective issue",

                // Neutrality performance
                "to be fair", "in fairness", "playing devil's advocate",
                "for the sake of argument", "another way to look at it",
                "from another angle", "alternative viewpoint", "counterargument",

                // Balance rhetoric
                "pros and cons", "advantages and disadvantages", "benefits and drawbacks",
                "strengths and weaknesses", "opportunities and challenges",
                "supporters and critics", "proponents and opponents"
            ],

            // Euphemisms and Dysphemisms
            euphemisms: [
                // Political euphemisms
                "enhanced interrogation", "collateral damage", "friendly fire",
                "extraordinary rendition", "neutralize", "pacification",
                "strategic withdrawal", "tactical redeployment", "kinetic action",
                "regime change", "nation building", "peacekeeping operation",

                // Corporate euphemisms
                "rightsizing", "downsizing", "restructuring", "optimization",
                "streamlining", "synergy realization", "workforce adjustment",
                "negative growth", "deferred success", "challenging market conditions",
                "revenue enhancement", "price adjustment", "value engineering",

                // Social euphemisms
                "passed away", "departed", "no longer with us", "resting in peace",
                "economically disadvantaged", "underprivileged", "underserved",
                "differently abled", "physically challenged", "special needs",
                "senior citizens", "golden years", "twilight years",

                // Military euphemisms
                "surgical strike", "precision bombing", "smart weapons",
                "soft targets", "hard targets", "assets", "resources",
                "theater of operations", "rules of engagement", "force projection",

                // Dysphemisms (loaded negative framing)
                "death tax", "government takeover", "job killers",
                "tax and spend", "bleeding heart", "welfare queen",
                "anchor babies", "illegal aliens", "chain migration",
                "socialized medicine", "nanny state", "big government",

                // Medical/health euphemisms
                "therapeutic misadventure", "negative patient outcome",
                "terminal illness", "life-limiting condition", "comfort care",
                "pregnancy termination", "medical assistance in dying",

                // Environmental euphemisms
                "climate change", "global warming", "carbon footprint",
                "sustainable development", "clean coal", "energy independence",
                "managed retreat", "controlled burn", "wildlife management"
            ],

            // Emotional Manipulation Markers
            emotional: [
                // Fear appeals
                "dangerous precedent", "slippery slope", "existential threat",
                "grave danger", "serious threat", "dire consequences",
                "catastrophic results", "devastating impact", "irreversible damage",
                "point of no return", "ticking time bomb", "imminent danger",
                "clear and present danger", "looming crisis", "impending doom",

                // Guilt triggers
                "shame on", "how dare", "blood on your hands",
                "morally responsible", "complicit in", "turning a blind eye",
                "failed to act", "stood by while", "allowed to happen",
                "could have prevented", "chose to ignore", "willfully neglected",
                "betrayed the trust", "let down", "abandoned their duty",

                // Flattery patterns
                "smart people like you", "educated readers understand",
                "discerning individuals", "those who truly care",
                "people of conscience", "thoughtful citizens",
                "intelligent observers", "wise enough to see",
                "sophisticated thinkers", "enlightened minds",
                "those with common sense", "reasonable people agree",

                // Outrage fuel
                "shocking revelation", "unbelievable scandal", "absolute outrage",
                "disgusting display", "appalling behavior", "unconscionable act",
                "beyond the pale", "crosses the line", "new low",
                "height of hypocrisy", "blatant corruption", "flagrant violation",
                "egregious abuse", "stunning betrayal", "jaw-dropping",

                // Sympathy exploitation
                "think of the children", "vulnerable victims", "innocent lives",
                "helpless elderly", "suffering families", "heartbroken parents",
                "orphaned children", "widows and orphans", "defenseless animals",
                "voiceless victims", "forgotten souls", "human tragedy",
                "real people suffering", "faces behind the statistics",

                // Urgency creation
                "act now", "before it's too late", "time is running out",
                "last chance", "final opportunity", "narrow window",
                "critical moment", "now or never", "decisive moment",
                "crucial juncture", "make or break", "do or die"
            ],

            // Gaslighting Phrases
            gaslighting: [
                // Reality denial
                "that never happened", "you're imagining things", "that's not true",
                "you're making it up", "completely fabricated", "pure fiction",
                "didn't happen that way", "false memory", "revisionist history",
                "twisting the facts", "distorting reality", "alternative facts",

                // Minimizing concerns
                "you're overreacting", "making a big deal", "blowing it out of proportion",
                "being dramatic", "overly sensitive", "too emotional",
                "getting worked up over nothing", "making mountains out of molehills",
                "need to calm down", "being hysterical", "irrational response",
                "taking it too seriously", "reading too much into it",

                // Memory manipulation
                "you're misremembering", "that's not what was said", "you're confused",
                "mixing things up", "got it backwards", "faulty recollection",
                "selective memory", "conveniently forgetting", "memory is playing tricks",
                "not how I remember it", "you must be mistaken", "false impression",

                // Credibility attacks
                "you're being paranoid", "too sensitive", "crazy to think",
                "lost touch with reality", "delusional thinking", "conspiracy theorist",
                "seeing things that aren't there", "jumping to conclusions",
                "wild accusations", "baseless claims", "unfounded fears",
                "irrational beliefs", "unstable behavior", "not thinking clearly",

                // Deflection phrases
                "the real issue is", "what about", "more importantly",
                "you're missing the point", "that's not the problem",
                "focusing on the wrong thing", "beside the point",
                "irrelevant detail", "distracting from", "changing the subject",
                "let's talk about", "but what about when", "conveniently ignoring"
            ],

            // False Dilemma Indicators
            falseDilemma: [
                // Either/or constructions
                "either you're with us or against us", "either...or",
                "can't have it both ways", "pick a side", "choose one",
                "black or white", "all or nothing", "win or lose",
                "success or failure", "friend or foe", "love it or leave it",
                "my way or the highway", "sink or swim", "do or die",

                // Forced choices
                "must choose between", "forced to decide", "have to pick",
                "can't have both", "one or the other", "mutually exclusive",
                "incompatible options", "can't be both", "impossible to reconcile",
                "fundamental choice", "defining decision", "ultimate choice",

                // Binary framing
                "only two options", "just two choices", "two paths",
                "binary choice", "simple choice", "clear choice",
                "obvious choice", "no middle ground", "no compromise",
                "no third option", "no alternative", "no other way",
                "zero sum game", "winner takes all", "us versus them",

                // Ultimatums
                "last chance", "final offer", "take it or leave it",
                "now or never", "speak now or forever", "one time only",
                "limited time", "closing window", "ship is sailing",
                "train is leaving", "door is closing", "bridge is burning",

                // Exclusionary language
                "if you're not", "unless you", "those who don't",
                "anyone who doesn't", "people who refuse", "failure to choose",
                "refusing to take a stand", "sitting on the fence", "can't remain neutral",
                "neutrality is complicity", "silence is consent", "inaction is action"
            ]
        },

        // Initialize the detector
        init() {
            this.loadSettings();
            this.setupMessageListeners();
        },

        // Load user settings from storage
        loadSettings() {
            chrome.storage.sync.get({
                enableAnalysis: true,
                highlightOpinion: true,
                highlightToBe: true,
                highlightAbsolutes: true,
                highlightPassive: true,
                highlightWeasel: true,
                highlightPresupposition: true,
                highlightMetaphors: true,
                highlightMinimizers: true,
                highlightMaximizers: true,
                highlightFalseBalance: true,
                highlightEuphemism: true,
                highlightEmotional: true,
                highlightGaslighting: true,
                highlightFalseDilemma: true
            }, items => {
                this.settings = items;
                this.previousSettings = {...items}; // Keep a copy

                if (this.settings.enableAnalysis) {
                    // Small delay to let the page load
                    setTimeout(() => this.analyzeDocument(), 500);
                    this.setupMutationObserver();
                }
            });
        },

        // Set up listeners for messages from popup
        setupMessageListeners() {
            chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
                switch (request.action) {
                    case "updateSettings":
                        this.updateSettings(request.settings);
                        sendResponse({success: true});
                        break;

                    case "getStats":
                        // Always recalculate stats before sending to ensure accuracy
                        this.recalculateStats();
                        sendResponse(this.stats);
                        break;

                    case "forceAnalyze":
                        // Always remove highlights first, then re-analyze if enabled
                        this.removeHighlights();
                        if (this.settings.enableAnalysis) {
                            // Small delay to ensure DOM is updated
                            setTimeout(() => this.analyzeDocument(), 100);
                        }
                        sendResponse({success: true});
                        break;

                    case "clearHighlights":
                        this.removeHighlights();
                        sendResponse({success: true});
                        break;
                }

                return true; // Keep channel open for async response
            });
        },

        // Update settings with selective highlight removal
        updateSettings(newSettings) {
            console.log('Content script received new settings:', newSettings);

            // Check what changed
            const changedSettings = {};
            for (const key in newSettings) {
                if (this.settings[key] !== newSettings[key]) {
                    changedSettings[key] = {
                        old: this.settings[key],
                        new: newSettings[key]
                    };
                }
            }

            console.log('Settings changed:', changedSettings);

            // Update settings
            this.previousSettings = {...this.settings};
            this.settings = newSettings;

            // Handle analysis enable/disable
            if (changedSettings.enableAnalysis) {
                if (!this.settings.enableAnalysis) {
                    // Analysis disabled - remove all highlights
                    this.removeHighlights();
                    if (this.observer) {
                        this.observer.disconnect();
                        this.observer = null;
                    }
                    return;
                } else {
                    // Analysis enabled - do full analysis
                    this.analyzeDocument();
                    this.setupMutationObserver();
                    return;
                }
            }

            // Handle individual highlight type changes (only if analysis is enabled)
            if (this.settings.enableAnalysis) {
                let needsReanalysis = false;

                // Remove specific highlights that were disabled
                if (changedSettings.highlightOpinion && !this.settings.highlightOpinion) {
                    this.removeSpecificHighlights('opinion');
                }
                if (changedSettings.highlightToBe && !this.settings.highlightToBe) {
                    this.removeSpecificHighlights('tobe');
                }
                if (changedSettings.highlightAbsolutes && !this.settings.highlightAbsolutes) {
                    this.removeSpecificHighlights('absolute');
                }
                if (changedSettings.highlightPassive && !this.settings.highlightPassive) {
                    this.removeSpecificHighlights('passive');
                }
                if (changedSettings.highlightWeasel && !this.settings.highlightWeasel) {
                    this.removeSpecificHighlights('weasel');
                }
                if (changedSettings.highlightPresupposition && !this.settings.highlightPresupposition) {
                    this.removeSpecificHighlights('presupposition');
                }
                if (changedSettings.highlightMetaphors && !this.settings.highlightMetaphors) {
                    this.removeSpecificHighlights('metaphor');
                }
                if (changedSettings.highlightMinimizers && !this.settings.highlightMinimizers) {
                    this.removeSpecificHighlights('minimizer');
                }
                if (changedSettings.highlightMaximizers && !this.settings.highlightMaximizers) {
                    this.removeSpecificHighlights('maximizer');
                }
                if (changedSettings.highlightFalseBalance && !this.settings.highlightFalseBalance) {
                    this.removeSpecificHighlights('falsebalance');
                }
                if (changedSettings.highlightEuphemism && !this.settings.highlightEuphemism) {
                    this.removeSpecificHighlights('euphemism');
                }
                if (changedSettings.highlightEmotional && !this.settings.highlightEmotional) {
                    this.removeSpecificHighlights('emotional');
                }
                if (changedSettings.highlightGaslighting && !this.settings.highlightGaslighting) {
                    this.removeSpecificHighlights('gaslighting');
                }
                if (changedSettings.highlightFalseDilemma && !this.settings.highlightFalseDilemma) {
                    this.removeSpecificHighlights('falsedilemma');
                }

                // If any highlights were enabled, we need to reanalyze to add them
                if ((changedSettings.highlightOpinion && this.settings.highlightOpinion) ||
                    (changedSettings.highlightToBe && this.settings.highlightToBe) ||
                    (changedSettings.highlightAbsolutes && this.settings.highlightAbsolutes) ||
                    (changedSettings.highlightPassive && this.settings.highlightPassive) ||
                    (changedSettings.highlightWeasel && this.settings.highlightWeasel) ||
                    (changedSettings.highlightPresupposition && this.settings.highlightPresupposition) ||
                    (changedSettings.highlightMetaphors && this.settings.highlightMetaphors) ||
                    (changedSettings.highlightMinimizers && this.settings.highlightMinimizers) ||
                    (changedSettings.highlightMaximizers && this.settings.highlightMaximizers) ||
                    (changedSettings.highlightFalseBalance && this.settings.highlightFalseBalance) ||
                    (changedSettings.highlightEuphemism && this.settings.highlightEuphemism) ||
                    (changedSettings.highlightEmotional && this.settings.highlightEmotional) ||
                    (changedSettings.highlightGaslighting && this.settings.highlightGaslighting) ||
                    (changedSettings.highlightFalseDilemma && this.settings.highlightFalseDilemma)) {
                    needsReanalysis = true;
                }

                if (needsReanalysis) {
                    this.analyzeDocument();
                }

                // Recalculate stats after changes
                this.recalculateStats();

                this.setupMutationObserver();
            }
        },

        // Remove specific type of highlights
        removeSpecificHighlights(type) {
            let selector;
            switch (type) {
                case 'opinion':
                    selector = '.bias-highlight-opinion';
                    this.stats.opinionCount = 0;
                    break;
                case 'tobe':
                    selector = '.bias-highlight-tobe';
                    this.stats.toBeCount = 0;
                    break;
                case 'absolute':
                    selector = '.bias-highlight-absolute';
                    this.stats.absoluteCount = 0;
                    break;
                case 'passive':
                    selector = '.bias-highlight-passive';
                    this.stats.passiveCount = 0;
                    break;
                case 'weasel':
                    selector = '.bias-highlight-weasel';
                    this.stats.weaselCount = 0;
                    break;
                case 'presupposition':
                    selector = '.bias-highlight-presupposition';
                    this.stats.presuppositionCount = 0;
                    break;
                case 'metaphor':
                    selector = '.bias-highlight-metaphor';
                    this.stats.metaphorCount = 0;
                    break;
                case 'minimizer':
                    selector = '.bias-highlight-minimizer';
                    this.stats.minimizerCount = 0;
                    break;
                case 'maximizer':
                    selector = '.bias-highlight-maximizer';
                    this.stats.maximizerCount = 0;
                    break;
                case 'falsebalance':
                    selector = '.bias-highlight-falsebalance';
                    this.stats.falseBalanceCount = 0;
                    break;
                case 'euphemism':
                    selector = '.bias-highlight-euphemism';
                    this.stats.euphemismCount = 0;
                    break;
                case 'emotional':
                    selector = '.bias-highlight-emotional';
                    this.stats.emotionalCount = 0;
                    break;
                case 'gaslighting':
                    selector = '.bias-highlight-gaslighting';
                    this.stats.gaslightingCount = 0;
                    break;
                case 'falsedilemma':
                    selector = '.bias-highlight-falsedilemma';
                    this.stats.falseDilemmaCount = 0;
                    break;
                default:
                    return;
            }

            const highlights = document.querySelectorAll(selector);
            console.log(`Removing ${type} highlights: found ${highlights.length} elements with selector ${selector}`);

            highlights.forEach(highlight => {
                const parent = highlight.parentNode;
                const textNode = document.createTextNode(highlight.textContent);
                parent.replaceChild(textNode, highlight);

                // Merge adjacent text nodes to prevent fragmentation
                parent.normalize();
            });

            console.log(`Removed ${highlights.length} ${type} highlights`);

            // Update bias score after removal
            const totalCount = this.stats.opinionCount + this.stats.toBeCount + this.stats.absoluteCount;
            // Removed bias score calculation
        },

        // Recalculate stats based on current highlights
        recalculateStats() {
            this.stats.opinionCount = document.querySelectorAll('.bias-highlight-opinion').length;
            this.stats.toBeCount = document.querySelectorAll('.bias-highlight-tobe').length;
            this.stats.absoluteCount = document.querySelectorAll('.bias-highlight-absolute').length;
            this.stats.passiveCount = document.querySelectorAll('.bias-highlight-passive').length;
            this.stats.weaselCount = document.querySelectorAll('.bias-highlight-weasel').length;
            this.stats.presuppositionCount = document.querySelectorAll('.bias-highlight-presupposition').length;
            this.stats.metaphorCount = document.querySelectorAll('.bias-highlight-metaphor').length;
            this.stats.minimizerCount = document.querySelectorAll('.bias-highlight-minimizer').length;
            this.stats.maximizerCount = document.querySelectorAll('.bias-highlight-maximizer').length;
            this.stats.falseBalanceCount = document.querySelectorAll('.bias-highlight-falsebalance').length;
            this.stats.euphemismCount = document.querySelectorAll('.bias-highlight-euphemism').length;
            this.stats.emotionalCount = document.querySelectorAll('.bias-highlight-emotional').length;
            this.stats.gaslightingCount = document.querySelectorAll('.bias-highlight-gaslighting').length;
            this.stats.falseDilemmaCount = document.querySelectorAll('.bias-highlight-falsedilemma').length;

            console.log(`Recalculated stats: ${this.stats.opinionCount} opinion, ${this.stats.toBeCount} to-be, ${this.stats.absoluteCount} absolute, ` +
                `${this.stats.passiveCount} passive, ${this.stats.weaselCount} weasel, ${this.stats.presuppositionCount} presupposition`);
        },

        // Setup mutation observer to detect content changes
        setupMutationObserver() {
            if (this.observer) {
                this.observer.disconnect();
            }

            // Debounce timer for mutation observer
            let debounceTimer = null;

            this.observer = new MutationObserver(mutations => {
                // Check if any significant content was added
                let hasSignificantChange = mutations.some(mutation => {
                    // Skip if it's our own highlight spans
                    if (mutation.target.classList &&
                        (mutation.target.classList.contains('bias-highlight-opinion') ||
                            mutation.target.classList.contains('bias-highlight-tobe') ||
                            mutation.target.classList.contains('bias-highlight-absolute') ||
                            mutation.target.classList.contains('bias-highlight-passive') ||
                            mutation.target.classList.contains('bias-highlight-weasel') ||
                            mutation.target.classList.contains('bias-highlight-presupposition') ||
                            mutation.target.classList.contains('bias-highlight-metaphor') ||
                            mutation.target.classList.contains('bias-highlight-minimizer') ||
                            mutation.target.classList.contains('bias-highlight-maximizer') ||
                            mutation.target.classList.contains('bias-highlight-falsebalance') ||
                            mutation.target.classList.contains('bias-highlight-euphemism') ||
                            mutation.target.classList.contains('bias-highlight-emotional') ||
                            mutation.target.classList.contains('bias-highlight-gaslighting') ||
                            mutation.target.classList.contains('bias-highlight-falsedilemma'))) {
                        return false;
                    }

                    return mutation.addedNodes.length > 0 &&
                        Array.from(mutation.addedNodes).some(node =>
                            (node.nodeType === Node.ELEMENT_NODE && node.textContent.trim().length > 20) ||
                            (node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 20)
                        );
                });

                if (hasSignificantChange && this.settings.enableAnalysis) {
                    // Debounce the reanalysis to avoid too frequent updates
                    clearTimeout(debounceTimer);
                    debounceTimer = setTimeout(() => {
                        console.log("Bias Detector: Content changed, reanalyzing...");
                        this.analyzeDocument();
                    }, 1000);
                }
            });

            this.observer.observe(document.body, {
                childList: true,
                subtree: true,
                characterData: true
            });

            console.log("Bias Detector: Mutation observer started");
        },

        // Remove all highlights from the document
        removeHighlights() {
            const highlights = document.querySelectorAll('.bias-highlight-opinion, .bias-highlight-tobe, .bias-highlight-absolute, ' +
                '.bias-highlight-passive, .bias-highlight-weasel, .bias-highlight-presupposition, ' +
                '.bias-highlight-metaphor, .bias-highlight-minimizer, .bias-highlight-maximizer, ' +
                '.bias-highlight-falsebalance, .bias-highlight-euphemism, .bias-highlight-emotional, ' +
                '.bias-highlight-gaslighting, .bias-highlight-falsedilemma');
            const processedParents = new Set();

            highlights.forEach(highlight => {
                const parent = highlight.parentNode;
                const textNode = document.createTextNode(highlight.textContent);
                parent.replaceChild(textNode, highlight);
                processedParents.add(parent);
            });

            // Normalize all affected parent nodes to merge adjacent text nodes
            processedParents.forEach(parent => {
                if (parent && parent.normalize) {
                    parent.normalize();
                }
            });

            this.resetStats();
        },

        // Reset the statistics counters
        resetStats() {
            this.stats = {
                opinionCount: 0,
                toBeCount: 0,
                absoluteCount: 0,
                passiveCount: 0,
                weaselCount: 0,
                presuppositionCount: 0,
                metaphorCount: 0,
                minimizerCount: 0,
                maximizerCount: 0,
                falseBalanceCount: 0,
                euphemismCount: 0,
                emotionalCount: 0,
                gaslightingCount: 0,
                falseDilemmaCount: 0
            };
        },

        // Main analysis function
        analyzeDocument() {
            // Only reset stats if we're doing a full re-analysis
            // Don't reset if we're just adding to existing highlights
            const hasExistingHighlights = document.querySelector('.bias-highlight-opinion, .bias-highlight-tobe, .bias-highlight-absolute, ' +
                '.bias-highlight-passive, .bias-highlight-weasel, .bias-highlight-presupposition, ' +
                '.bias-highlight-metaphor, .bias-highlight-minimizer, .bias-highlight-maximizer, ' +
                '.bias-highlight-falsebalance, .bias-highlight-euphemism, .bias-highlight-emotional, ' +
                '.bias-highlight-gaslighting, .bias-highlight-falsedilemma');
            if (!hasExistingHighlights) {
                this.resetStats();
            }

            const textNodes = this.collectTextNodes(document.body);

            if (textNodes.length === 0) {
                console.log("Bias Detector: No text nodes found to analyze.");
                // Try again later if the page might be loading dynamically
                setTimeout(() => this.analyzeDocument(), 2000);
                return;
            }

            this.processTextNodes(textNodes);

            // If no matches were found, it might be due to dynamic content loading
            if (this.stats.opinionCount === 0 && this.stats.toBeCount === 0 && this.stats.absoluteCount === 0) {
                console.log("Bias Detector: No bias detected. Scheduling re-analysis for possible dynamic content...");
                setTimeout(() => this.analyzeDocument(), 2000);
            }
        },

        // Collect all text nodes from the document
        collectTextNodes(rootNode) {
            const textNodes = [];

            const walker = document.createTreeWalker(
                rootNode,
                NodeFilter.SHOW_TEXT,
                {
                    acceptNode: node => {
                        // Skip empty nodes or nodes that are too short
                        if (node.textContent.trim().length <= 0) {
                            return NodeFilter.FILTER_REJECT;
                        }

                        // Skip nodes that are already within our highlights
                        const parent = node.parentNode;
                        if (parent && parent.classList &&
                            (parent.classList.contains('bias-highlight-opinion') ||
                                parent.classList.contains('bias-highlight-tobe') ||
                                parent.classList.contains('bias-highlight-absolute') ||
                                parent.classList.contains('bias-highlight-passive') ||
                                parent.classList.contains('bias-highlight-weasel') ||
                                parent.classList.contains('bias-highlight-presupposition') ||
                                parent.classList.contains('bias-highlight-metaphor') ||
                                parent.classList.contains('bias-highlight-minimizer') ||
                                parent.classList.contains('bias-highlight-maximizer') ||
                                parent.classList.contains('bias-highlight-falsebalance') ||
                                parent.classList.contains('bias-highlight-euphemism') ||
                                parent.classList.contains('bias-highlight-emotional') ||
                                parent.classList.contains('bias-highlight-gaslighting') ||
                                parent.classList.contains('bias-highlight-falsedilemma'))) {
                            return NodeFilter.FILTER_REJECT;
                        }

                        // Skip script and style content
                        if (node.parentNode &&
                            (node.parentNode.nodeName === 'SCRIPT' ||
                                node.parentNode.nodeName === 'STYLE' ||
                                node.parentNode.nodeName === 'NOSCRIPT' ||
                                node.parentNode.nodeName === 'SVG' ||
                                node.parentNode.nodeName === 'HEAD')) {
                            return NodeFilter.FILTER_REJECT;
                        }

                        return NodeFilter.FILTER_ACCEPT;
                    }
                }
            );

            let node;
            while (node = walker.nextNode()) {
                textNodes.push(node);
            }

            // Try to handle shadow DOM elements
            this.processShadowDom(rootNode, textNodes);

            return textNodes;
        },

        // Process Shadow DOM elements to get their text nodes
        processShadowDom(rootNode, textNodes) {
            if (rootNode.nodeType !== Node.ELEMENT_NODE) return;

            // Check for shadow root
            if (rootNode.shadowRoot) {
                const shadowTextNodes = this.collectTextNodes(rootNode.shadowRoot);
                textNodes.push(...shadowTextNodes);
            }

            // Process children that might have shadow roots
            const elements = rootNode.querySelectorAll('*');
            elements.forEach(element => {
                if (element.shadowRoot) {
                    const shadowTextNodes = this.collectTextNodes(element.shadowRoot);
                    textNodes.push(...shadowTextNodes);
                }

                // Handle slots in custom elements
                if (element.nodeName.includes('-')) {
                    const slots = element.querySelectorAll('slot');
                    slots.forEach(slot => {
                        const assignedNodes = slot.assignedNodes();
                        assignedNodes.forEach(assignedNode => {
                            if (assignedNode.nodeType === Node.ELEMENT_NODE) {
                                const slotTextNodes = this.collectTextNodes(assignedNode);
                                textNodes.push(...slotTextNodes);
                            } else if (assignedNode.nodeType === Node.TEXT_NODE) {
                                textNodes.push(assignedNode);
                            }
                        });
                    });
                }
            });
        },

        // Process text nodes to highlight bias words
        processTextNodes(textNodes) {
            // Helper function to escape regex special characters
            const escapeRegExp = string => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

            textNodes.forEach(node => {
                let text = node.textContent;

                // Skip very short texts or texts that appear to be navigation/UI elements
                if (text.trim().length < 5 || (text.trim().length < 20 && !text.includes(' '))) {
                    return;
                }

                // Check if we need to process this node
                let foundOpinion = false;
                let foundToBe = false;
                let foundAbsolute = false;

                // Create document fragment to hold the highlighted content
                const fragment = document.createDocumentFragment();
                let remainingText = text;
                let currentPos = 0;

                // Arrays to store all matches
                const matches = [];

                // Find all matches for opinion words
                if (this.settings.highlightOpinion) {
                    this.dictionaries.opinion.forEach(word => {
                        try {
                            // Only apply word boundary for simple words
                            const escapedWord = escapeRegExp(word);
                            const pattern = word.includes(' ') ? escapedWord : '\\b' + escapedWord + '\\b';
                            const regex = new RegExp(pattern, 'gi');

                            let match;
                            while ((match = regex.exec(text)) !== null) {
                                matches.push({
                                    index: match.index,
                                    length: match[0].length,
                                    text: match[0],
                                    type: 'opinion'
                                });
                                foundOpinion = true;
                            }
                        } catch (e) {
                            console.error('Error with regex for opinion word:', word, e);
                        }
                    });
                }

                // Find all matches for to-be verbs
                if (this.settings.highlightToBe) {
                    this.dictionaries.toBe.forEach(verb => {
                        try {
                            const regex = new RegExp(verb, 'gi');

                            let match;
                            while ((match = regex.exec(text)) !== null) {
                                matches.push({
                                    index: match.index,
                                    length: match[0].length,
                                    text: match[0],
                                    type: 'tobe'
                                });
                                foundToBe = true;
                            }
                        } catch (e) {
                            console.error('Error with regex for to-be verb:', verb, e);
                        }
                    });
                }

                // Find all matches for absolute words
                if (this.settings.highlightAbsolutes) {
                    this.dictionaries.absolute.forEach(word => {
                        try {
                            const regex = new RegExp(word, 'gi');

                            let match;
                            while ((match = regex.exec(text)) !== null) {
                                matches.push({
                                    index: match.index,
                                    length: match[0].length,
                                    text: match[0],
                                    type: 'absolute'
                                });
                                foundAbsolute = true;
                            }
                        } catch (e) {
                            console.error('Error with regex for absolute word:', word, e);
                        }
                    });
                }

                // Find all matches for passive voice
                if (this.settings.highlightPassive) {
                    this.dictionaries.passive.forEach(pattern => {
                        try {
                            const regex = new RegExp(pattern, 'gi');

                            let match;
                            while ((match = regex.exec(text)) !== null) {
                                matches.push({
                                    index: match.index,
                                    length: match[0].length,
                                    text: match[0],
                                    type: 'passive'
                                });
                            }
                        } catch (e) {
                            console.error('Error with regex for passive pattern:', pattern, e);
                        }
                    });
                }

                // Find all matches for weasel words
                if (this.settings.highlightWeasel) {
                    this.dictionaries.weasel.forEach(phrase => {
                        try {
                            const escapedPhrase = escapeRegExp(phrase);
                            const pattern = '\\b' + escapedPhrase + '\\b';
                            const regex = new RegExp(pattern, 'gi');

                            let match;
                            while ((match = regex.exec(text)) !== null) {
                                matches.push({
                                    index: match.index,
                                    length: match[0].length,
                                    text: match[0],
                                    type: 'weasel'
                                });
                            }
                        } catch (e) {
                            console.error('Error with regex for weasel phrase:', phrase, e);
                        }
                    });
                }

                // Find all matches for presupposition markers
                if (this.settings.highlightPresupposition) {
                    this.dictionaries.presupposition.forEach(word => {
                        try {
                            const regex = new RegExp(word, 'gi');

                            let match;
                            while ((match = regex.exec(text)) !== null) {
                                matches.push({
                                    index: match.index,
                                    length: match[0].length,
                                    text: match[0],
                                    type: 'presupposition'
                                });
                            }
                        } catch (e) {
                            console.error('Error with regex for presupposition word:', word, e);
                        }
                    });
                }

                // Find all matches for war metaphors
                if (this.settings.highlightMetaphors) {
                    this.dictionaries.warMetaphors.forEach(word => {
                        try {
                            const regex = new RegExp(word, 'gi');

                            let match;
                            while ((match = regex.exec(text)) !== null) {
                                matches.push({
                                    index: match.index,
                                    length: match[0].length,
                                    text: match[0],
                                    type: 'metaphor'
                                });
                            }
                        } catch (e) {
                            console.error('Error with regex for metaphor word:', word, e);
                        }
                    });
                }

                // Find all matches for minimizers
                if (this.settings.highlightMinimizers) {
                    this.dictionaries.minimizers.forEach(word => {
                        try {
                            const regex = new RegExp(word, 'gi');

                            let match;
                            while ((match = regex.exec(text)) !== null) {
                                matches.push({
                                    index: match.index,
                                    length: match[0].length,
                                    text: match[0],
                                    type: 'minimizer'
                                });
                            }
                        } catch (e) {
                            console.error('Error with regex for minimizer word:', word, e);
                        }
                    });
                }

                // Find all matches for maximizers
                if (this.settings.highlightMaximizers) {
                    this.dictionaries.maximizers.forEach(word => {
                        try {
                            const regex = new RegExp(word, 'gi');

                            let match;
                            while ((match = regex.exec(text)) !== null) {
                                matches.push({
                                    index: match.index,
                                    length: match[0].length,
                                    text: match[0],
                                    type: 'maximizer'
                                });
                            }
                        } catch (e) {
                            console.error('Error with regex for maximizer word:', word, e);
                        }
                    });
                }

                // Find all matches for false balance markers
                if (this.settings.highlightFalseBalance) {
                    this.dictionaries.falseBalance.forEach(phrase => {
                        try {
                            const escapedPhrase = escapeRegExp(phrase);
                            const pattern = '\\b' + escapedPhrase + '\\b';
                            const regex = new RegExp(pattern, 'gi');

                            let match;
                            while ((match = regex.exec(text)) !== null) {
                                matches.push({
                                    index: match.index,
                                    length: match[0].length,
                                    text: match[0],
                                    type: 'falsebalance'
                                });
                            }
                        } catch (e) {
                            console.error('Error with regex for false balance phrase:', phrase, e);
                        }
                    });
                }

                // Find all matches for euphemisms
                if (this.settings.highlightEuphemism) {
                    this.dictionaries.euphemisms.forEach(phrase => {
                        try {
                            const escapedPhrase = escapeRegExp(phrase);
                            const pattern = '\\b' + escapedPhrase + '\\b';
                            const regex = new RegExp(pattern, 'gi');

                            let match;
                            while ((match = regex.exec(text)) !== null) {
                                matches.push({
                                    index: match.index,
                                    length: match[0].length,
                                    text: match[0],
                                    type: 'euphemism'
                                });
                            }
                        } catch (e) {
                            console.error('Error with regex for euphemism phrase:', phrase, e);
                        }
                    });
                }

                // Find all matches for emotional manipulation
                if (this.settings.highlightEmotional) {
                    this.dictionaries.emotional.forEach(phrase => {
                        try {
                            const escapedPhrase = escapeRegExp(phrase);
                            const pattern = '\\b' + escapedPhrase + '\\b';
                            const regex = new RegExp(pattern, 'gi');

                            let match;
                            while ((match = regex.exec(text)) !== null) {
                                matches.push({
                                    index: match.index,
                                    length: match[0].length,
                                    text: match[0],
                                    type: 'emotional'
                                });
                            }
                        } catch (e) {
                            console.error('Error with regex for emotional phrase:', phrase, e);
                        }
                    });
                }

                // Find all matches for gaslighting phrases
                if (this.settings.highlightGaslighting) {
                    this.dictionaries.gaslighting.forEach(phrase => {
                        try {
                            const escapedPhrase = escapeRegExp(phrase);
                            const pattern = '\\b' + escapedPhrase + '\\b';
                            const regex = new RegExp(pattern, 'gi');

                            let match;
                            while ((match = regex.exec(text)) !== null) {
                                matches.push({
                                    index: match.index,
                                    length: match[0].length,
                                    text: match[0],
                                    type: 'gaslighting'
                                });
                            }
                        } catch (e) {
                            console.error('Error with regex for gaslighting phrase:', phrase, e);
                        }
                    });
                }

                // Find all matches for false dilemma indicators
                if (this.settings.highlightFalseDilemma) {
                    this.dictionaries.falseDilemma.forEach(phrase => {
                        try {
                            const escapedPhrase = escapeRegExp(phrase);
                            const pattern = '\\b' + escapedPhrase + '\\b';
                            const regex = new RegExp(pattern, 'gi');

                            let match;
                            while ((match = regex.exec(text)) !== null) {
                                matches.push({
                                    index: match.index,
                                    length: match[0].length,
                                    text: match[0],
                                    type: 'falsedilemma'
                                });
                            }
                        } catch (e) {
                            console.error('Error with regex for false dilemma phrase:', phrase, e);
                        }
                    });
                }

                // If we found matches, replace the node with highlighted content
                if (matches.length > 0) {
                    // Sort matches by index
                    matches.sort((a, b) => a.index - b.index);

                    // Filter out overlapping matches
                    const filteredMatches = [];
                    let lastEnd = -1;

                    for (const match of matches) {
                        if (match.index >= lastEnd) {
                            filteredMatches.push(match);
                            lastEnd = match.index + match.length;

                            // Update stats
                            if (match.type === 'opinion') this.stats.opinionCount++;
                            else if (match.type === 'tobe') this.stats.toBeCount++;
                            else if (match.type === 'absolute') this.stats.absoluteCount++;
                            else if (match.type === 'passive') this.stats.passiveCount++;
                            else if (match.type === 'weasel') this.stats.weaselCount++;
                            else if (match.type === 'presupposition') this.stats.presuppositionCount++;
                            else if (match.type === 'metaphor') this.stats.metaphorCount++;
                            else if (match.type === 'minimizer') this.stats.minimizerCount++;
                            else if (match.type === 'maximizer') this.stats.maximizerCount++;
                            else if (match.type === 'falsebalance') this.stats.falseBalanceCount++;
                            else if (match.type === 'euphemism') this.stats.euphemismCount++;
                            else if (match.type === 'emotional') this.stats.emotionalCount++;
                            else if (match.type === 'gaslighting') this.stats.gaslightingCount++;
                            else if (match.type === 'falsedilemma') this.stats.falseDilemmaCount++;
                        }
                    }

                    // Create highlighted content
                    let lastIndex = 0;

                    for (const match of filteredMatches) {
                        // Add text before this match
                        if (match.index > lastIndex) {
                            fragment.appendChild(
                                document.createTextNode(text.substring(lastIndex, match.index))
                            );
                        }

                        // Add highlighted match
                        const span = document.createElement('span');
                        span.className = `bias-highlight-${match.type}`;
                        span.textContent = match.text;
                        fragment.appendChild(span);

                        lastIndex = match.index + match.length;
                    }

                    // Add remaining text
                    if (lastIndex < text.length) {
                        fragment.appendChild(
                            document.createTextNode(text.substring(lastIndex))
                        );
                    }

                    // Replace the original node with our fragment
                    if (node.parentNode) {
                        node.parentNode.replaceChild(fragment, node);
                    }
                }
            });

            console.log(`Bias Detector found: ${this.stats.opinionCount} opinion, ${this.stats.toBeCount} to-be, ${this.stats.absoluteCount} absolute, ` +
                `${this.stats.passiveCount} passive, ${this.stats.weaselCount} weasel, ${this.stats.presuppositionCount} presupposition, ` +
                `${this.stats.metaphorCount} metaphor, ${this.stats.minimizerCount} minimizer, ${this.stats.maximizerCount} maximizer, ` +
                `${this.stats.falseBalanceCount} false balance, ${this.stats.euphemismCount} euphemism, ${this.stats.emotionalCount} emotional, ` +
                `${this.stats.gaslightingCount} gaslighting, ${this.stats.falseDilemmaCount} false dilemma`);
        }
    };

    // Initialize the extension
    BiasDetector.init();
})();
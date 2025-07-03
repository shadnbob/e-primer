// dictionaries/opinion-words.js
export const opinionWords = [
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
    "\\bfirst-rate\\b", "\\btop-notch\\b", "\\bpremium\\b", "\\bfavorable\\b", "\\bpositive\\b", "\\bsatisfactory\\b",
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
    "\\bshocking\\b", "\\bdisturbing\\b", "\\btroubli ng\\b", "\\bencouraging\\b", "\\binspiring\\b", "\\boutrageous\\b",
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
    "\\bliberal\\b", "\\bfar-right\\b", "\\bfar-left\\b", "\\bmoderate\\b", "\\bcentrist\\b", "\\bmainstream\\b", "\\bfringe\\b",
    "\\brevolutionary\\b", "\\btraditional\\b", "\\bconventional\\b", "\\bunconventional\\b", "\\borthodox\\b",
    "\\bunorthodox\\b", "\\bestablishment\\b", "\\banti-establishment\\b", "\\bpopulist\\b", "\\belitist\\b",
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
    "\\bso-called\\b", "\\bself-proclaimed\\b", "\\bsupposed\\b", "\\bpretend\\b", "\\bdubious\\b", "\\bquestionable\\b",
    "\\bunproven\\b", "\\bunverified\\b", "\\bunsubstantiated\\b", "\\bunfounded\\b", "\\bbaseless\\b", "\\bgroundless\\b",

    // Loaded Political Terms
    "\\bfreedom\\b", "\\bjustice\\b", "\\bequality\\b", "\\brights\\b", "\\bliberty\\b", "\\bdemocracy\\b", "\\bpatriotic\\b",
    "\\bunpatriotic\\b", "\\bun-American\\b", "\\bsocialist\\b", "\\bcommunist\\b", "\\bfascist\\b", "\\bdictatorial\\b",
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
];

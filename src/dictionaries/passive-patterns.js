// dictionaries/passive-patterns.js
export const passivePatterns = [
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
    
    // Common passive phrases that hide agency
    "\\bit\\s+is\\s+believed\\b",
    "\\bit\\s+is\\s+thought\\b",
    "\\bit\\s+is\\s+said\\b",
    "\\bit\\s+has\\s+been\\s+reported\\b",
    "\\bit\\s+was\\s+reported\\b",
    "\\bit\\s+is\\s+considered\\b",
    "\\bit\\s+is\\s+expected\\b",
    "\\bmistakes\\s+were\\s+made\\b",
    "\\bconcerns\\s+have\\s+been\\s+raised\\b",
    "\\bquestions\\s+have\\s+been\\s+asked\\b",
    "\\bdecisions\\s+were\\s+made\\b",
    "\\baction\\s+was\\s+taken\\b",
    "\\bmeasures\\s+were\\s+implemented\\b",
    "\\bsteps\\s+have\\s+been\\s+taken\\b"
];

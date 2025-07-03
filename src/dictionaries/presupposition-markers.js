// dictionaries/presupposition-markers.js
export const presuppositionMarkers = [
    // Basic presupposition triggers
    "\\beven\\b", 
    "\\bstill\\b", 
    "\\banother\\b", 
    "\\bfinally\\b",
    "\\balready\\b", 
    "\\byet\\b", 
    "\\bagain\\b",
    
    // Loaded verbs
    "\\bcontinues\\s+to\\b", 
    "\\brefuses\\s+to\\b", 
    "\\bfails\\s+to\\b",
    "\\badmits\\b", 
    "\\bdenies\\b", 
    "\\backnowledges\\b",
    
    // Loaded phrases
    "\\bdespite\\s+claiming\\b", 
    "\\bwhile\\s+claiming\\b",
    "\\bso-called\\b", 
    "\\balleged\\b", 
    "\\bsupposed\\b", 
    "\\bpretend\\b",
    "\\bthe\\s+fact\\s+that\\b", 
    "\\bof\\s+course\\b",
    
    // Temporal presuppositions
    "\\bno\\s+longer\\b", 
    "\\bnot\\s+anymore\\b", 
    "\\bused\\s+to\\b",
    
    // Additional presupposition markers
    "\\bmanages\\s+to\\b",
    "\\bhappens\\s+to\\b",
    "\\btends\\s+to\\b",
    "\\bkeeps\\s+on\\b",
    "\\bgoes\\s+on\\s+to\\b"
];

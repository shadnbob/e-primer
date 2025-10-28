// utils/ContextAwareDetector.js - Context-aware pattern detection for overlapping bias/excellence patterns
export class ContextAwareDetector {
    constructor() {
        this.windowSize = 100; // characters before/after for context analysis
        
        // Contextual pattern rules - same phrase can be bias or excellence based on context
        this.contextualPatterns = {
            "it seems": {
                excellence: [
                    // Followed by evidence or data
                    { 
                        after: /\s+(?:that\s+)?(?:the\s+)?(?:data|evidence|research|study|findings|analysis)\s+(?:shows?|indicates?|suggests?|supports?|demonstrates?)/i, 
                        confidence: 0.9,
                        reasoning: "Uses 'seems' appropriately with evidence"
                    },
                    // "It seems to me" with reasoning
                    { 
                        after: /\s+to\s+me,?\s+(?:that\s+)?(?:based\s+on|given|considering)/i, 
                        confidence: 0.85,
                        reasoning: "Transparent personal opinion with reasoning"
                    },
                    // Preceded by attribution
                    { 
                        before: /according\s+to\s+[\w\s]+,?\s*$/i, 
                        confidence: 0.8,
                        reasoning: "Appropriately qualified with source"
                    },
                    // Scientific hedging
                    { 
                        after: /\s+(?:likely|probable|possible)\s+(?:that|given)/i, 
                        confidence: 0.75,
                        reasoning: "Appropriate scientific hedging"
                    }
                ],
                weasel: [
                    // Followed by false certainty
                    { 
                        after: /\s+(?:obvious|clear|evident)\s+(?:that|to)/i, 
                        confidence: 0.9,
                        reasoning: "Creates false certainty without evidence"
                    },
                    // Vague crowd attribution
                    { 
                        after: /\s+(?:like\s+)?(?:most\s+people|everyone|everybody)\s+(?:knows?|agrees?|thinks?)/i, 
                        confidence: 0.85,
                        reasoning: "Vague attribution to unspecified groups"
                    },
                    // Standalone assertion without qualification
                    { 
                        before: /^\s*$/i, 
                        after: /\s+that\s+[^.]*?(?:without|no\s+(?:evidence|proof|data))/i, 
                        confidence: 0.7,
                        reasoning: "Makes claims without supporting evidence"
                    }
                ],
                neutral: [
                    // General possibility
                    { 
                        after: /\s+(?:reasonable|likely|possible|plausible)\s+to/i, 
                        confidence: 0.6,
                        reasoning: "Appropriate uncertainty expression"
                    }
                ]
            },
            
            "appears": {
                excellence: [
                    { 
                        after: /\s+(?:based\s+on|according\s+to|in\s+light\s+of)/i, 
                        confidence: 0.8,
                        reasoning: "Qualified observation with basis"
                    }
                ],
                weasel: [
                    { 
                        after: /\s+(?:obvious|clear)\s+that/i, 
                        confidence: 0.8,
                        reasoning: "False certainty language"
                    }
                ]
            },
            
            "studies show": {
                excellence: [
                    // Specific studies mentioned
                    { 
                        before: /(?:recent|multiple|several|peer-reviewed)\s+$/i, 
                        confidence: 0.7,
                        reasoning: "Qualified with study characteristics"
                    },
                    // Followed by citation or specific attribution
                    { 
                        after: /\s+that\s+[\w\s]+\([\w\s\.]+\d{4}\)/i, 
                        confidence: 0.9,
                        reasoning: "Includes specific citation"
                    }
                ],
                weasel: [
                    // No specificity
                    { 
                        before: /^\s*$/i, 
                        after: /\s+that\s+(?![\w\s]*\(\d{4}\))/i, 
                        confidence: 0.8,
                        reasoning: "Vague attribution without specific studies"
                    }
                ]
            }
        };
        
        // Resolution hierarchy - higher scores win in conflicts
        this.resolutionHierarchy = {
            priorities: {
                'specific_attribution': 100,  // Named sources with credentials
                'evidence_based': 90,         // Data/research based claims
                'transparent_opinion': 80,    // Clear personal opinion with reasoning
                'appropriate_hedge': 70,      // Scientific/appropriate uncertainty
                'neutral_hedge': 50,          // General uncertainty
                'vague_attribution': 30,      // "Experts believe" type phrases
                'false_certainty': 10         // Disguised opinion as fact
            }
        };
    }
    
    // Analyze text context around a phrase
    analyzePhrase(text, startIndex, phrase) {
        const before = text.substring(Math.max(0, startIndex - this.windowSize), startIndex);
        const after = text.substring(startIndex + phrase.length, startIndex + phrase.length + this.windowSize);
        
        return {
            phrase,
            before: before.toLowerCase(),
            after: after.toLowerCase(),
            fullContext: before + phrase + after,
            startIndex,
            endIndex: startIndex + phrase.length
        };
    }
    
    // Detect patterns with context awareness
    detectWithContext(text, phrase) {
        const patterns = this.contextualPatterns[phrase.toLowerCase()];
        if (!patterns) return [];
        
        const matches = [];
        let index = 0;
        
        while ((index = text.toLowerCase().indexOf(phrase.toLowerCase(), index)) !== -1) {
            const context = this.analyzePhrase(text, index, phrase);
            const classification = this.classifyByContext(context, patterns);
            
            if (classification) {
                matches.push({
                    index,
                    length: phrase.length,
                    text: phrase,
                    classification: classification.type,
                    confidence: classification.confidence,
                    reasoning: classification.reasoning,
                    context: context.fullContext.trim(),
                    isContextual: true
                });
            }
            index++;
        }
        
        return matches;
    }
    
    // Classify a phrase based on its context
    classifyByContext(context, patternSets) {
        let bestMatch = null;
        let highestConfidence = 0;
        
        for (const [type, patterns] of Object.entries(patternSets)) {
            for (const pattern of patterns) {
                const match = this.testPattern(pattern, context);
                
                if (match && pattern.confidence > highestConfidence) {
                    bestMatch = {
                        type,
                        confidence: pattern.confidence,
                        reasoning: pattern.reasoning
                    };
                    highestConfidence = pattern.confidence;
                }
            }
        }
        
        return bestMatch;
    }
    
    // Test if a pattern matches the context
    testPattern(pattern, context) {
        let beforeMatch = true;
        let afterMatch = true;
        
        if (pattern.before) {
            beforeMatch = pattern.before.test(context.before);
        }
        
        if (pattern.after) {
            afterMatch = pattern.after.test(context.after);
        }
        
        // Both conditions must be met if both are specified
        return beforeMatch && afterMatch;
    }
    
    // Detect all contextual patterns in text
    detectAll(text) {
        const allMatches = [];
        
        for (const phrase of Object.keys(this.contextualPatterns)) {
            const matches = this.detectWithContext(text, phrase);
            allMatches.push(...matches);
        }
        
        // Sort by position in text
        return allMatches.sort((a, b) => a.index - b.index);
    }
    
    // Resolve conflicts between overlapping matches
    resolveConflicts(allMatches) {
        const resolved = [];
        const processed = new Set();
        
        for (let i = 0; i < allMatches.length; i++) {
            if (processed.has(i)) continue;
            
            const match = allMatches[i];
            const overlapping = this.findOverlapping(match, allMatches, i);
            
            if (overlapping.length === 0) {
                resolved.push(match);
                processed.add(i);
            } else {
                // Resolve conflict by choosing highest confidence match
                const best = this.chooseBestMatch([match, ...overlapping.map(idx => allMatches[idx])]);
                resolved.push(best);
                
                // Mark all overlapping as processed
                processed.add(i);
                overlapping.forEach(idx => processed.add(idx));
            }
        }
        
        return resolved;
    }
    
    // Find matches that overlap with the current match
    findOverlapping(match, allMatches, currentIndex) {
        const overlapping = [];
        const matchEnd = match.index + match.length;
        
        for (let i = 0; i < allMatches.length; i++) {
            if (i === currentIndex) continue;
            
            const other = allMatches[i];
            const otherEnd = other.index + other.length;
            
            // Check if they overlap
            if (!(matchEnd <= other.index || otherEnd <= match.index)) {
                overlapping.push(i);
            }
        }
        
        return overlapping;
    }
    
    // Choose the best match from conflicting matches
    chooseBestMatch(matches) {
        return matches.reduce((best, current) => {
            if (current.confidence > best.confidence) {
                return current;
            }
            return best;
        });
    }
    
    // Get explanation for why a phrase was classified as it was
    explainClassification(match) {
        return {
            phrase: match.text,
            classification: match.classification,
            confidence: (match.confidence * 100).toFixed(0) + '%',
            reasoning: match.reasoning,
            context: match.context
        };
    }
}
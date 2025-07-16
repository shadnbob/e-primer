// dictionaries/index.js - Central dictionary export
import { opinionWords, opinionWordsFlat } from './opinion-words.js';
import { toBeVerbs } from './tobe-verbs.js';
import { absoluteWords } from './absolute-words.js';
import { passivePatterns } from './passive-patterns.js';
import { weaselPhrases } from './weasel-phrases.js';
import { presuppositionMarkers } from './presupposition-markers.js';
import { warMetaphors } from './war-metaphors.js';
import { minimizers } from './minimizers.js';
import { maximizers } from './maximizers.js';
import { falseBalancePhrases } from './false-balance.js';
import { euphemisms } from './euphemisms.js';
import { emotionalTriggers } from './emotional-triggers.js';
import { gaslightingPhrases } from './gaslighting.js';
import { falseDilemmaPhrases } from './false-dilemma.js';

export class BiasPatterns {
    constructor() {
        this.rawPatterns = this.loadRawPatterns();
        this.compiledPatterns = new Map();
        this.compileAllPatterns();
    }

    loadRawPatterns() {
        return {
            opinion: opinionWordsFlat, // Use flat array for backward compatibility
            tobe: toBeVerbs,
            absolute: absoluteWords,
            passive: passivePatterns,
            weasel: weaselPhrases,
            presupposition: presuppositionMarkers,
            metaphor: warMetaphors,
            minimizer: minimizers,
            maximizer: maximizers,
            falsebalance: falseBalancePhrases,
            euphemism: euphemisms,
            emotional: emotionalTriggers,
            gaslighting: gaslightingPhrases,
            falsedilemma: falseDilemmaPhrases
        };
    }

    // Get opinion word sub-categories for enhanced detection
    getOpinionSubCategories() {
        return opinionWords;
    }

    // Get sub-category for a specific opinion word
    getOpinionSubCategory(word) {
        for (const [categoryId, category] of Object.entries(opinionWords)) {
            if (category.words.includes(word.toLowerCase())) {
                return {
                    id: categoryId,
                    ...category
                };
            }
        }
        return null;
    }

    compileAllPatterns() {
        for (const [type, patterns] of Object.entries(this.rawPatterns)) {
            this.compiledPatterns.set(type, this.compilePatterns(patterns, type));
        }
    }

    compilePatterns(patterns, type) {
        const compiled = [];
        
        for (const pattern of patterns) {
            try {
                const compiledPattern = this.compilePattern(pattern, type);
                if (compiledPattern) {
                    compiled.push(compiledPattern);
                }
            } catch (error) {
                console.warn(`Failed to compile pattern "${pattern}" for type ${type}:`, error);
            }
        }
        
        return compiled;
    }

    compilePattern(pattern, type) {
        const cleanPattern = pattern.trim();
        if (!cleanPattern) return null;

        try {
            const isComplexPattern = cleanPattern.includes('\\') || 
                                   cleanPattern.includes('(') || 
                                   cleanPattern.includes('[');

            let regexPattern;
            const flags = 'gi';

            if (isComplexPattern) {
                regexPattern = cleanPattern;
            } else {
                const escaped = this.escapeRegExp(cleanPattern);
                regexPattern = cleanPattern.includes(' ') ? 
                              escaped : 
                              `\\b${escaped}\\b`;
            }

            const regex = new RegExp(regexPattern, flags);
            
            // Test the regex to catch obvious errors
            regex.test('test string');
            
            return {
                source: cleanPattern,
                regex: regex,
                type: type,
                isComplex: isComplexPattern
            };
            
        } catch (error) {
            console.warn(`Invalid regex pattern: ${cleanPattern}`, error);
            return null;
        }
    }

    escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    getCompiledPatterns(type) {
        return this.compiledPatterns.get(type) || [];
    }

    getAllCompiledPatterns() {
        return this.compiledPatterns;
    }

    // Performance monitoring
    getPatternStats() {
        const stats = {};
        for (const [type, patterns] of this.compiledPatterns) {
            stats[type] = {
                count: patterns.length,
                complexPatterns: patterns.filter(p => p.isComplex).length,
                simplePatterns: patterns.filter(p => !p.isComplex).length
            };
        }
        return stats;
    }
}

// Export the individual dictionaries for direct access if needed
export {
    opinionWords,
    opinionWordsFlat,
    toBeVerbs,
    absoluteWords,
    passivePatterns,
    weaselPhrases,
    presuppositionMarkers,
    warMetaphors,
    minimizers,
    maximizers,
    falseBalancePhrases,
    euphemisms,
    emotionalTriggers,
    gaslightingPhrases,
    falseDilemmaPhrases
};

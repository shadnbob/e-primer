// dictionaries/index.js - Central dictionary export
import { BiasConfig } from '../config/BiasConfig.js';
import { opinionWords, opinionWordsFlat } from './opinion-words.js';
import { toBeVerbs } from './tobe-verbs.js';
import { absoluteWords, absoluteWordsFlat } from './absolute-words.js';
import { passivePatterns } from './passive-patterns.js';
import { weaselPhrases, weaselWords } from './weasel-phrases.js';
import { presuppositionMarkers } from './presupposition-markers.js';
import { warMetaphors } from './war-metaphors.js';
import { minimizers } from './minimizers.js';
import { maximizers, maximizerWords } from './maximizers.js';
import { falseBalancePhrases } from './false-balance.js';
import { euphemisms, euphemismWords } from './euphemisms.js';
import { emotionalTriggers, emotionalTriggerWords } from './emotional-triggers.js';
import { gaslightingPhrases, gaslightingWords } from './gaslighting.js';
import { falseDilemmaPhrases } from './false-dilemma.js';
import { probabilityLanguage } from './probability-language.js';

// Helper: check if a words entry is intensity-grouped ({ 1: [...], 2: [...] })
// vs a flat array ([...])
function isIntensityGrouped(words) {
    if (Array.isArray(words)) return false;
    return typeof words === 'object' && (words[1] || words[2] || words[3]);
}

// Helper: flatten intensity-grouped words into a flat array
function flattenWords(words) {
    if (Array.isArray(words)) return words;
    return Object.values(words).flat();
}

export class BiasPatterns {
    constructor() {
        this.rawPatterns = this.loadRawPatterns();
        this.subCategoryDictionaries = this.loadSubCategoryDictionaries();
        this.intensityMaps = this.buildIntensityMaps();
        this.subCategoryMaps = this.buildSubCategoryMaps();
        this.compiledPatterns = new Map();
        this.compileAllPatterns();
    }

    loadRawPatterns() {
        return {
            opinion: opinionWordsFlat,
            tobe: toBeVerbs,
            absolute: absoluteWordsFlat,
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
            falsedilemma: falseDilemmaPhrases,
            probability: probabilityLanguage
        };
    }

    loadSubCategoryDictionaries() {
        const dictionaries = new Map();
        dictionaries.set('opinion', opinionWords);
        dictionaries.set('euphemism', euphemismWords);
        dictionaries.set('weasel', weaselWords);
        dictionaries.set('maximizer', maximizerWords);
        dictionaries.set('emotional', emotionalTriggerWords);
        dictionaries.set('gaslighting', gaslightingWords);
        return dictionaries;
    }

    // Build word→intensity lookup maps from all dictionaries
    buildIntensityMaps() {
        const maps = new Map();

        // 1. Flat intensity-grouped dictionaries (e.g. absoluteWords: { 1: [...], 2: [...], 3: [...] })
        const flatIntensityDicts = {
            absolute: absoluteWords
        };

        for (const [type, dict] of Object.entries(flatIntensityDicts)) {
            if (!isIntensityGrouped(dict)) continue;
            const wordMap = new Map();
            for (const [level, words] of Object.entries(dict)) {
                const intensity = parseInt(level, 10);
                for (const word of words) {
                    wordMap.set(word.toLowerCase(), intensity);
                }
            }
            maps.set(type, wordMap);
        }

        // 2. Sub-categorized dictionaries with intensity-grouped words
        for (const [type, dict] of this.subCategoryDictionaries) {
            if (!maps.has(type)) {
                maps.set(type, new Map());
            }
            const wordMap = maps.get(type);

            for (const [subId, entry] of Object.entries(dict)) {
                const words = entry.words || entry;
                if (isIntensityGrouped(words)) {
                    for (const [level, wordList] of Object.entries(words)) {
                        const intensity = parseInt(level, 10);
                        for (const word of wordList) {
                            wordMap.set(word.toLowerCase(), intensity);
                        }
                    }
                }
                // If words is a flat array, no per-word intensity — getIntensity will return default
            }
        }

        return maps;
    }

    // Get intensity for a matched word. Returns 1, 2, or 3.
    getIntensity(biasTypeId, matchedWord) {
        const wordMap = this.intensityMaps.get(biasTypeId);
        if (!wordMap) return 2; // Default for types without intensity data
        return wordMap.get(matchedWord.toLowerCase()) || 2;
    }

    buildSubCategoryMaps() {
        const maps = new Map();
        for (const config of Object.values(BiasConfig.BIAS_TYPES)) {
            if (!config.subCategories) continue;
            const wordMap = new Map();
            const dictionary = this.subCategoryDictionaries.get(config.id);
            if (dictionary) {
                for (const [subId, entry] of Object.entries(dictionary)) {
                    const words = Array.isArray(entry) ? entry : entry.words;
                    if (!words) continue;
                    // Handle both flat arrays and intensity-grouped words
                    const flatWords = flattenWords(words);
                    for (const word of flatWords) {
                        wordMap.set(word.toLowerCase(), {
                            id: subId,
                            ...config.subCategories[subId]
                        });
                    }
                }
            }
            maps.set(config.id, wordMap);
        }
        return maps;
    }

    getSubCategory(biasTypeId, matchedWord) {
        const wordMap = this.subCategoryMaps.get(biasTypeId);
        if (!wordMap) return null;
        return wordMap.get(matchedWord.toLowerCase()) || null;
    }

    getSubCategories(biasTypeId) {
        return BiasConfig.getSubCategories(biasTypeId);
    }

    // @deprecated Use getSubCategories('opinion') instead
    getOpinionSubCategories() {
        return opinionWords;
    }

    // @deprecated Use getSubCategory('opinion', word) instead
    getOpinionSubCategory(word) {
        return this.getSubCategory('opinion', word);
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

// Only export what's actually used
export { opinionWords };

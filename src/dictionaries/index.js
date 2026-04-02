// dictionaries/index.js - Central dictionary export
import { BiasConfig } from '../config/BiasConfig.js';
import { opinionWords, opinionWordsFlat } from './opinion-words.js';
import { toBeVerbs } from './tobe-verbs.js';
import { absoluteWords } from './absolute-words.js';
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

export class BiasPatterns {
    constructor() {
        this.rawPatterns = this.loadRawPatterns();
        this.subCategoryDictionaries = this.loadSubCategoryDictionaries();
        this.subCategoryMaps = this.buildSubCategoryMaps();
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
                    for (const word of words) {
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

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
import { spectrumLabels, spectrumWords } from './spectrum-labels.js';
import { sciStatsTerms, sciStatsWords } from './science-stats.js';
import { politicalIsms, politicalIsmsWords } from './political-isms.js';
import { civicTerms, civicTermsWords } from './civic-terms.js';
import { econTerms, econTermsWords } from './econ-terms.js';
import { epistemicTerms, epistemicTermsWords } from './epistemic-terms.js';
import { discourseConcepts, discourseConceptsWords } from './discourse-concepts.js';
import { logicalFallacies, logicalFallaciesWords } from './logical-fallacies.js';

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

// Helper: regex-escape a literal dictionary string
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// The regex source compilePattern produces for a simple (non-regex) entry:
// single words get word boundaries; phrases instead tolerate any whitespace
// run between words, because text nodes preserve the source's line breaks
function canonicalSimpleSource(entry) {
    const escaped = escapeRegExp(entry);
    return entry.includes(' ')
        ? escaped.replace(/ /g, '\\s+')
        : `\\b${escaped}\\b`;
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
            probability: probabilityLanguage,
            spectrum: spectrumLabels,
            scistats: sciStatsTerms,
            isms: politicalIsms,
            civics: civicTerms,
            econterms: econTerms,
            epistemics: epistemicTerms,
            debate: discourseConcepts,
            fallacy: logicalFallacies
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
        dictionaries.set('spectrum', spectrumWords);
        dictionaries.set('scistats', sciStatsWords);
        dictionaries.set('isms', politicalIsmsWords);
        dictionaries.set('civics', civicTermsWords);
        dictionaries.set('econterms', econTermsWords);
        dictionaries.set('epistemics', epistemicTermsWords);
        dictionaries.set('debate', discourseConceptsWords);
        dictionaries.set('fallacy', logicalFallaciesWords);
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

            // Text nodes preserve the source's line breaks, so a literal space
            // in a phrase must tolerate any whitespace run ("demanding
            // tolerance" wraps across lines in real HTML). For complex
            // patterns, skip ones containing character classes, where a space
            // may be a class member rather than a separator — authors of
            // class-bearing patterns must write \s+ between words themselves.
            if (isComplexPattern) {
                regexPattern = cleanPattern.includes('[')
                    ? cleanPattern
                    : cleanPattern.replace(/ /g, '\\s+');
            } else {
                regexPattern = canonicalSimpleSource(cleanPattern);
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
        return escapeRegExp(string);
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

// ---------------------------------------------------------------------------
// Detection plans
//
// Running ~600 per-entry regexes against every text node costs linearly in
// dictionary size, so BiasDetector scans with a *detection plan* instead: all
// of a type's simple word entries fold into one \b(?:a|b|...)\b alternation,
// all simple phrase entries into one (?:a\s+b|...) alternation, and complex
// regex entries keep their own regexes. The compiledPatterns arrays stay
// one-object-per-entry — they are the type's source of truth (tests inspect
// and even push into them); plans are derived views.
// ---------------------------------------------------------------------------

// Whitespace-insensitive lookup key: phrase matches can span line breaks
// (their regexes join words with \s+), so entries and matched text both
// normalize to single spaces before comparison
function entryKey(text) {
    return text.toLowerCase().replace(/\s+/g, ' ');
}

// A pattern may join an alternation only when its regex provably is the
// canonical compilation of its source string. Anything else — complex
// entries, hand-built objects pushed into the array — runs individually with
// its exact regex, so folding never changes what a pattern matches.
function isCanonicalSimple(pattern) {
    return !!pattern &&
        typeof pattern.source === 'string' &&
        pattern.regex instanceof RegExp &&
        pattern.regex.flags === 'gi' &&
        pattern.regex.source === canonicalSimpleSource(pattern.source);
}

// Compile simple entries into one alternation regex. Longest-first ordering
// makes the alternation prefer the longest entry at a position, mirroring how
// deduplicateMatches resolves same-index overlaps between the per-entry
// regexes this replaces. resolveEntry maps matched text back to the
// dictionary entry, standing in for the per-entry pattern.source that
// subcategory attribution falls back on (e.g. a phrase matched across a
// line break no longer equals its entry verbatim).
function compileAlternationGroup(sources, type, isPhraseGroup) {
    const entryLookup = new Map();
    for (const source of sources) {
        const key = entryKey(source);
        if (!entryLookup.has(key)) {
            entryLookup.set(key, source);
        }
    }

    const ordered = [...entryLookup.values()].sort((a, b) => b.length - a.length);
    const branches = ordered.map(source => isPhraseGroup
        ? escapeRegExp(source).replace(/ /g, '\\s+')
        : escapeRegExp(source));
    // Word entries share the boundary assertions: \b(?:A|B)\b is equivalent
    // to \bA\b|\bB\b for literal branches. Phrases compile without \b, same
    // as their individual regexes did.
    const alternation = isPhraseGroup
        ? `(?:${branches.join('|')})`
        : `\\b(?:${branches.join('|')})\\b`;

    // Engines compile a regex on first execution; a large alternation is
    // worth compiling here rather than mid-scan of the first page
    const regex = new RegExp(alternation, 'gi');
    regex.test('');

    return {
        source: `<${ordered.length} combined ${type} ${isPhraseGroup ? 'phrases' : 'words'}>`,
        regex: regex,
        type: type,
        isComplex: false,
        resolveEntry: (matchText) => entryLookup.get(entryKey(matchText))
    };
}

// Fold a compiled-patterns array into the few regexes worth executing:
// [word alternation?, phrase alternation?, ...individual patterns as-is]
export function buildDetectionPlan(patterns, type) {
    const words = [];
    const phrases = [];
    const individual = [];

    for (const pattern of patterns) {
        if (isCanonicalSimple(pattern)) {
            (pattern.source.includes(' ') ? phrases : words).push(pattern.source);
        } else {
            individual.push(pattern);
        }
    }

    const plan = [];
    if (words.length > 0) {
        plan.push(compileAlternationGroup(words, type, false));
    }
    if (phrases.length > 0) {
        plan.push(compileAlternationGroup(phrases, type, true));
    }
    plan.push(...individual);
    return plan;
}

// Only export what's actually used
export { opinionWords };

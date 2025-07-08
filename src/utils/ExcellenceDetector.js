// utils/ExcellenceDetector.js - Positive pattern detection
export class ExcellenceDetector {
    constructor() {
        // Excellence patterns - detecting good writing practices
        this.excellencePatterns = {
            attribution: {
                name: 'Clear Attribution',
                patterns: [
                    // Academic citations
                    /\b\w+\s+(?:et al\.?\s+)?\(\d{4}\)/gi,
                    /\bAccording to [\w\s\.]+'s \d{4} [\w\s-]* (?:study|research|paper|analysis)/gi,
                    /\b(?:research|study|analysis) published in \w+/gi,
                    /\bbased on [\d,]+ (?:data points|participants|responses|observations)/gi,
                    /\bDr\.? [\w\s]+ (?:at|from) [\w\s]+/gi,
                    /\bThe [\w\s]+ (?:Department|Institute|University|Center|Bureau) (?:reported|found|concluded)/gi,
                    // Specific sourcing
                    /\b(?:per|via|through|from) [\w\s]+ (?:report|statement|announcement)/gi,
                    /\bas (?:reported|documented|noted) (?:by|in) [\w\s]+/gi
                ],
                className: 'excellence-attribution',
                tooltip: '✓ Specific, verifiable source provided',
                color: '#28a745'
            },
            
            nuance: {
                name: 'Nuanced Language',
                patterns: [
                    // Epistemic modality
                    /\b(?:might|could|possibly|potentially|perhaps|maybe|seems|appears)\b/gi,
                    /\b(?:appears to|seems to|tends to|likely to)\b/gi,
                    /\b(?:suggests that|indicates that|implies that|points to)\b/gi,
                    // Acknowledging complexity
                    /\b(?:however|although|while|whereas|nevertheless|nonetheless)\b/gi,
                    /\b(?:on the other hand|alternatively|conversely)\b/gi,
                    /\b(?:multiple factors|various|several|some evidence|mixed results)\b/gi,
                    /\b(?:worth considering|it's possible|may not reflect|could be explained)\b/gi,
                    // Conditional thinking
                    /\b(?:depending on|in certain cases|under specific conditions)\b/gi,
                    /\b(?:context-dependent|situation-specific|case-by-case)\b/gi
                ],
                className: 'excellence-nuance',
                tooltip: '✓ Acknowledges complexity and avoids absolutes',
                color: '#218838'
            },
            
            transparency: {
                name: 'Transparent Communication',
                patterns: [
                    // Opinion acknowledgment
                    /\b(?:in my (?:opinion|view)|I (?:think|believe|feel)|from my perspective)\b/gi,
                    /\b(?:personally|subjectively|as I see it)\b/gi,
                    // Limitation acknowledgment
                    /\b(?:limitations include|should note that|important to mention)\b/gi,
                    /\b(?:caveat|disclaimer|qualification)\b/gi,
                    /\b(?:correlation does not [\w\s]{0,20} causation)\b/gi,
                    /\b(?:preliminary findings|initial results|early data)\b/gi,
                    // Uncertainty acknowledgment
                    /\b(?:uncertain|unclear|unknown|yet to be determined)\b/gi,
                    /\b(?:requires? (?:further|more) (?:research|investigation|study))\b/gi,
                    /\b(?:open to (?:correction|revision|debate|interpretation))\b/gi
                ],
                className: 'excellence-transparency',
                tooltip: '✓ Transparent about limitations and perspective',
                color: '#28a745'
            },
            
            discourse: {
                name: 'Constructive Discourse',
                patterns: [
                    // Inviting engagement
                    /\b(?:what do you think|worth discussing|let's (?:explore|consider|examine))\b/gi,
                    /\b(?:open to feedback|welcoming thoughts|interested in perspectives)\b/gi,
                    // Building on ideas
                    /\b(?:building on|extending|expanding upon|adding to)\b/gi,
                    /\b(?:similar to|comparable|in line with|consistent with)\b/gi,
                    /\b(?:yes,? and|to add|furthermore|additionally)\b/gi,
                    // Acknowledging others
                    /\b(?:valid point|good observation|worth noting|important contribution)\b/gi,
                    /\b(?:as [\w\s]+ (?:mentioned|noted|pointed out|observed))\b/gi,
                    // Balanced perspective
                    /\b(?:balanced|nuanced approach|both [\w\s]+ and [\w\s]+)\b/gi,
                    /\b(?:pros and cons|advantages and disadvantages|benefits and drawbacks)\b/gi
                ],
                className: 'excellence-discourse',
                tooltip: '✓ Encourages dialogue and acknowledges others',
                color: '#20c997'
            },
            
            evidence: {
                name: 'Evidence-Based Claims',
                patterns: [
                    // Quantified claims
                    /\b\d+(?:\.\d+)?%\s+of\s+[\w\s]+/gi,
                    /\b(?:statistically significant|p\s*[<=]\s*0\.\d+)\b/gi,
                    /\b(?:sample size of|n\s*=\s*)\d+/gi,
                    /\b(?:margin of error|confidence interval|standard deviation)\b/gi,
                    // Data transparency
                    /\b(?:data (?:shows?|indicates?|reveals?|demonstrates?))\b/gi,
                    /\b(?:evidence (?:suggests?|supports?|indicates?))\b/gi,
                    /\b(?:findings (?:show|indicate|suggest|reveal))\b/gi,
                    // Methodology mentions
                    /\b(?:methodology|method|approach|technique|procedure)\b/gi,
                    /\b(?:peer-reviewed|replicated|validated|verified)\b/gi
                ],
                className: 'excellence-evidence',
                tooltip: '✓ Claims supported by specific evidence',
                color: '#17a2b8'
            }
        };
        
        // Intensity levels for problematic patterns
        this.intensityLevels = {
            absolute: {
                1: ['mostly', 'generally', 'typically', 'usually', 'often', 'frequently'],
                2: ['always', 'never', 'every', 'none', 'all', 'no one', 'everyone'],
                3: ['absolutely', 'definitely', 'certainly', 'totally', 'completely', 'utterly', 'entirely']
            },
            opinion: {
                1: ['seems', 'appears', 'arguably', 'perhaps', 'possibly'],
                2: ['obviously', 'clearly', 'surely', 'undoubtedly', 'evidently'],
                3: ['undeniably', 'unquestionably', 'indisputably', 'irrefutably', 'incontrovertibly']
            },
            emotional: {
                1: ['concerning', 'problematic', 'challenging', 'difficult', 'worrying'],
                2: ['crisis', 'disaster', 'failure', 'catastrophe', 'emergency'],
                3: ['evil', 'destroy', 'murder', 'doom', 'apocalypse', 'blood on your hands']
            },
            weasel: {
                1: ['some', 'many', 'few', 'several'],
                2: ['people say', 'studies show', 'experts believe', 'sources indicate'],
                3: ['everyone knows', 'it\'s a fact that', 'proven', 'undisputed']
            },
            gaslighting: {
                1: ['perhaps you\'re mistaken', 'that\'s unusual', 'are you sure'],
                2: ['you\'re overreacting', 'being dramatic', 'too sensitive'],
                3: ['that never happened', 'you\'re imagining things', 'you\'re crazy']
            }
        };
        
        // Subject portrayal patterns
        this.portrayalPatterns = {
            positive: {
                hero: /\b(?:hero|champion|savior|defender|protector)\b/gi,
                virtue: /\b(?:noble|righteous|virtuous|honorable|moral)\b/gi,
                success: /\b(?:brilliant|genius|visionary|revolutionary|groundbreaking)\b/gi
            },
            negative: {
                villain: /\b(?:evil|villain|monster|demon|tyrant)\b/gi,
                failure: /\b(?:disaster|catastrophe|failure|debacle|fiasco)\b/gi,
                moral: /\b(?:corrupt|immoral|unethical|shameful|disgraceful)\b/gi
            }
        };
    }
    
    // Calculate intensity level for a match
    calculateIntensity(text, type) {
        const levels = this.intensityLevels[type];
        if (!levels) return 2; // Default to medium
        
        const lowerText = text.toLowerCase();
        for (let level = 3; level >= 1; level--) {
            if (levels[level] && levels[level].some(word => lowerText.includes(word))) {
                return level;
            }
        }
        return 2;
    }
    
    // Detect subject portrayal (positive/negative framing)
    detectPortrayal(text) {
        for (const [valence, patterns] of Object.entries(this.portrayalPatterns)) {
            for (const [type, pattern] of Object.entries(patterns)) {
                if (pattern.test(text)) {
                    pattern.lastIndex = 0; // Reset regex
                    return { valence, type };
                }
            }
        }
        return null;
    }
    
    // Find all excellence patterns in text
    findExcellence(text) {
        const matches = [];
        
        for (const [type, config] of Object.entries(this.excellencePatterns)) {
            for (const pattern of config.patterns) {
                let match;
                const regex = new RegExp(pattern.source, pattern.flags);
                while ((match = regex.exec(text)) !== null) {
                    matches.push({
                        index: match.index,
                        length: match[0].length,
                        text: match[0],
                        type: type,
                        className: config.className,
                        tooltip: config.tooltip,
                        isExcellence: true
                    });
                }
            }
        }
        
        return matches;
    }
    
    // Calculate document health score
    calculateHealthScore(excellenceCount, problemCount) {
        if (excellenceCount + problemCount === 0) return 50;
        return Math.round((excellenceCount / (excellenceCount + problemCount)) * 100);
    }
    
    // Get statistics for the document
    getStatistics(text, problems = []) {
        const excellence = this.findExcellence(text);
        const stats = {
            excellence: {
                total: excellence.length,
                byType: {}
            },
            problems: {
                total: problems.length,
                byIntensity: { 1: 0, 2: 0, 3: 0 },
                byType: {}
            },
            healthScore: this.calculateHealthScore(excellence.length, problems.length)
        };
        
        // Count excellence by type
        for (const match of excellence) {
            stats.excellence.byType[match.type] = (stats.excellence.byType[match.type] || 0) + 1;
        }
        
        // Count problems by intensity
        for (const problem of problems) {
            if (problem.intensity) {
                stats.problems.byIntensity[problem.intensity]++;
            }
        }
        
        return stats;
    }
}

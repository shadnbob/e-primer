// utils/IntensityCalculator.js - Severity grading for bias detections
export class IntensityCalculator {
    constructor() {
        // Intensity levels for problematic patterns
        // Level 1: mild, Level 2: moderate, Level 3: strong
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
                1: ['perhaps you\'re mistaken', 'that\'s unusual', 'are you sure about that'],
                2: ['concerns are overblown', 'being dramatic', 'reading too much into it'],
                3: ['that never happened', 'the public is imagining things', 'a fabricated controversy']
            }
        };
    }

    // Calculate intensity level for a match
    // Returns 1 (mild), 2 (moderate), or 3 (strong)
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

    // Calculate document health score (ratio of excellence to problems)
    calculateHealthScore(excellenceCount, problemCount) {
        if (excellenceCount + problemCount === 0) return 50;
        return Math.round((excellenceCount / (excellenceCount + problemCount)) * 100);
    }
}

// utils/HoverContentGenerator.js - Enhanced hover content generation

export class HoverContentGenerator {
    constructor() {
        this.enhancedDescriptions = {
            // Basic Detection
            opinion: {
                description: "Subjective language that reveals the writer's personal stance or evaluation. These words signal opinion rather than fact.",
                suggestion: "Consider using more objective language or acknowledging the subjective nature of the statement.",
                examples: "Instead of 'This is obviously wrong' → 'This appears to contradict the evidence' or 'I believe this is incorrect'"
            },
            
            // Opinion Sub-Categories
            opinion_certainty: {
                description: "Words that push readers toward unquestioning acceptance by conveying false certainty about debatable topics.",
                suggestion: "Use more tentative language that acknowledges uncertainty and invites evaluation.",
                examples: "Instead of 'obviously wrong' → 'appears to contradict' or 'I believe this is incorrect'"
            },
            opinion_hedging: {
                description: "Words that create unnecessary doubt or vagueness, often to avoid taking responsibility for claims.",
                suggestion: "Be more definitive when you have evidence, or explain the specific reasons for uncertainty.",
                examples: "Instead of 'maybe true' → 'requires further investigation' or 'preliminary evidence suggests'"
            },
            opinion_evaluative_positive: {
                description: "Subjective positive judgments that reveal the writer's approval without objective criteria.",
                suggestion: "Replace with specific, measurable criteria or acknowledge the subjective nature of the evaluation.",
                examples: "Instead of 'excellent performance' → 'achieved 95% accuracy' or 'I consider this performance strong because...'"
            },
            opinion_evaluative_negative: {
                description: "Subjective negative judgments that reveal the writer's disapproval without objective criteria.",
                suggestion: "Replace with specific, measurable criteria or acknowledge the subjective nature of the evaluation.",
                examples: "Instead of 'poor quality' → 'failed to meet safety standards' or 'I find this concerning because...'"
            },
            opinion_emotional_charge: {
                description: "Words designed to trigger strong emotional responses that bypass logical evaluation.",
                suggestion: "Use neutral language that allows readers to form their own emotional responses based on facts.",
                examples: "Instead of 'heartwarming story' → 'story about community support' or 'horrifying event' → 'traumatic incident'"
            },
            opinion_comparative: {
                description: "Words that create artificial rankings or comparisons without context or criteria.",
                suggestion: "Provide specific criteria for comparison or use measured language that acknowledges context.",
                examples: "Instead of 'the best solution' → 'an effective solution' or 'the most efficient approach we tested'"
            },
            opinion_political_framing: {
                description: "Words that frame issues in political terms, potentially polarizing neutral topics.",
                suggestion: "Use neutral, descriptive language that focuses on specific policies or actions rather than political labels.",
                examples: "Instead of 'radical proposal' → 'proposal that differs significantly from current policy' or describe specific elements"
            },
            opinion_intensifiers: {
                description: "Words that amplify or exaggerate without adding meaningful information.",
                suggestion: "Use specific, measurable descriptions or remove unnecessary intensification.",
                examples: "Instead of 'extremely important' → 'critical for project success' or 'increased by 300%'"
            },
            opinion_credibility_undermining: {
                description: "Words that question or attack credibility without providing evidence or reasoning.",
                suggestion: "Address specific claims with evidence rather than attacking the source's credibility.",
                examples: "Instead of 'so-called expert' → 'Dr. Smith, whose methodology differs from mainstream approaches' or address specific claims"
            },
            opinion_loaded_political: {
                description: "Words that carry heavy political or ideological baggage, triggering partisan responses.",
                suggestion: "Use specific, descriptive language that focuses on actions or policies rather than loaded terms.",
                examples: "Instead of 'socialist policies' → 'government-funded programs' or 'authoritarian regime' → 'government that restricts civil liberties'"
            },
            opinion_moral_judgments: {
                description: "Words that impose moral frameworks without acknowledging their subjective nature.",
                suggestion: "Acknowledge the subjective nature of moral judgments or specify the ethical framework being used.",
                examples: "Instead of 'immoral behavior' → 'behavior that violates principle X' or 'I consider this unethical because...'"
            },
            opinion_emotional_appeals: {
                description: "Words that bypass logical evaluation by directly targeting emotional responses.",
                suggestion: "Focus on factual information that allows readers to form their own emotional responses.",
                examples: "Instead of 'promising developments' → 'developments that may lead to improved outcomes' or provide specific evidence"
            },
            tobe: {
                description: "Forms of 'to be' that can create false equivalencies or unclear relationships. E-Prime writing avoids these to encourage precision.",
                suggestion: "Replace with more specific verbs that show relationships, actions, or states more clearly.",
                examples: "Instead of 'The problem is complex' → 'The problem involves multiple factors' or 'This complexity emerges from...'"
            },
            absolute: {
                description: "Universal quantifiers that make categorical claims. Reality rarely fits such absolutes, making these terms often inaccurate.",
                suggestion: "Use more nuanced language that acknowledges exceptions and degrees.",
                examples: "Instead of 'Everyone knows' → 'Most people understand' or 'Research suggests' or 'Many experts agree'"
            },
            
            // Advanced Detection
            passive: {
                description: "Passive voice constructions that obscure who performs actions or makes decisions. This can hide responsibility and agency.",
                suggestion: "Convert to active voice by identifying who performs the action and making them the subject.",
                examples: "Instead of 'Mistakes were made' → 'The team made mistakes' or 'I made an error in judgment'"
            },
            weasel: {
                description: "Vague attributions and unsupported claims that avoid specificity. These phrases make statements without providing verifiable sources.",
                suggestion: "Provide specific sources, studies, or evidence to support claims.",
                examples: "Instead of 'Studies show' → 'A 2023 Harvard study found' or 'According to Dr. Smith's research'"
            },
            presupposition: {
                description: "Language that smuggles in hidden assumptions, making readers accept premises without realizing it. This can bias interpretation.",
                suggestion: "Make assumptions explicit and arguable rather than hidden in language structure.",
                examples: "Instead of 'Even scientists admit' → 'Scientists have found' or 'Research indicates' (removing the 'even' presupposition)"
            },
            
            // Framing & Rhetoric
            metaphor: {
                description: "Militaristic language applied to non-military topics. War metaphors can unnecessarily escalate discourse and frame issues as conflicts.",
                suggestion: "Use neutral language that doesn't imply combat or warfare.",
                examples: "Instead of 'Fight against climate change' → 'Address climate change' or 'The war on drugs' → 'Drug policy reform'"
            },
            minimizer: {
                description: "Language that downplays or reduces the significance of events, problems, or concerns. Can dismiss legitimate issues.",
                suggestion: "Use proportional language that accurately represents the scale and importance of issues.",
                examples: "Instead of 'Just a minor setback' → 'A temporary challenge' or acknowledge the actual impact"
            },
            maximizer: {
                description: "Exaggerated language that inflates the importance or severity of events beyond their actual scale. Creates unnecessary drama.",
                suggestion: "Use measured language that accurately represents the scale of events.",
                examples: "Instead of 'Devastating news' → 'Concerning development' or 'Catastrophic failure' → 'Significant problem'"
            },
            
            // Manipulation Tactics
            falsebalance: {
                description: "Language that creates artificial equivalence between unequal positions or presents false choices as if they're the only options.",
                suggestion: "Acknowledge the actual weight of evidence and avoid false equivalencies.",
                examples: "Instead of 'Both sides have valid points' → Evaluate each position based on evidence and merit"
            },
            euphemism: {
                description: "Mild or indirect terms used to avoid harsh realities (euphemisms) or deliberately harsh terms for emotional effect (dysphemisms).",
                suggestion: "Use direct, clear language that accurately describes the situation without unnecessary softening or harshening.",
                examples: "Instead of 'Collateral damage' → 'Civilian casualties' or 'Enhanced interrogation' → 'Torture'"
            },
            emotional: {
                description: "Language designed to trigger emotional responses rather than logical evaluation. Can bypass rational thinking.",
                suggestion: "Focus on factual information and logical arguments rather than emotional appeals.",
                examples: "Instead of 'Heartless policy' → 'Policy that doesn't address human needs' or provide specific impacts"
            },
            gaslighting: {
                description: "Language that makes people question their own perception, memory, or judgment. Often dismissive of legitimate concerns.",
                suggestion: "Acknowledge others' perspectives and experiences as valid starting points for discussion.",
                examples: "Instead of 'You're being too sensitive' → 'I see this differently' or 'Help me understand your perspective'"
            },
            falsedilemma: {
                description: "Language that presents only two options when more exist. Limits thinking and forces unnecessary choices.",
                suggestion: "Acknowledge the full range of options and alternatives available.",
                examples: "Instead of 'Either we do X or everything fails' → Present multiple approaches and their trade-offs"
            }
        };
        
        this.excellenceDescriptions = {
            attribution: {
                description: "Specific, verifiable sources that allow readers to check claims. This builds trust and accountability.",
                suggestion: "Continue providing specific sources and consider adding page numbers or timestamps for even better attribution.",
                examples: "Examples: 'According to Smith (2023, p. 45)' or 'The CDC reported on March 15, 2024'"
            },
            nuance: {
                description: "Language that acknowledges complexity and avoids oversimplification. Shows intellectual honesty about difficult topics.",
                suggestion: "Keep acknowledging complexity while ensuring your main points remain clear.",
                examples: "Examples: 'While generally true, exceptions include...' or 'This trend shows X, though Y factors also influence...'"
            },
            transparency: {
                description: "Open communication about limitations, biases, and uncertainties. Builds trust through honesty.",
                suggestion: "Continue being transparent about limitations and consider discussing methodology when relevant.",
                examples: "Examples: 'This analysis has limitations...' or 'I should note my background in X might influence...'"
            },
            discourse: {
                description: "Language that encourages dialogue and acknowledges other perspectives. Promotes constructive conversation.",
                suggestion: "Continue fostering dialogue while maintaining your analytical rigor.",
                examples: "Examples: 'Others might argue...' or 'What do you think about...?' or 'I'd be interested in your perspective on...'"
            },
            evidence: {
                description: "Claims supported by specific evidence, data, or research. Strengthens arguments through concrete support.",
                suggestion: "Continue providing evidence and consider adding brief explanations of why the evidence supports your claims.",
                examples: "Examples: 'Data from the 2023 survey shows...' or 'Three studies demonstrate this pattern...'"
            }
        };
    }
    
    generateHoverContent(match, nearbyMatches = []) {
        const isExcellence = match.isExcellence;
        const type = match.type;
        const intensity = match.intensity || 2;
        const intensityLabel = ['Mild', 'Moderate', 'Severe'][intensity - 1];
        
        let content = `<div class="hover-card ${isExcellence ? 'hover-card-excellence' : 'hover-card-problem'}">`;
        
        // Header section with enhanced sub-category styling
        if (isExcellence) {
            content += `<div class="hover-card-header">✓ ${this.getTypeName(type, true)}</div>`;
        } else {
            // For opinion words with sub-categories, show the sub-category name
            let typeName;
            if (match.subCategory && type === 'opinion') {
                const subCategoryType = `opinion_${match.subCategory.id}`;
                typeName = this.getTypeName(subCategoryType, false);
                
                // Add the generic "Opinion Words" on a second line
                content += `
                    <div class="hover-card-header"${this.getSubCategoryStyle(match)}>
                        ⚠ ${typeName}
                        <span class="intensity-badge intensity-${intensity}">${intensityLabel}</span>
<!--                        <div class="hover-card-subheader">Opinion Words</div>-->
                    </div>
                `;
            } else {
                typeName = this.getTypeName(type, false);
                content += `
                    <div class="hover-card-header"${this.getSubCategoryStyle(match)}>
                        ⚠ ${typeName}
                        <span class="intensity-badge intensity-${intensity}">${intensityLabel}</span>
                    </div>
                `;
            }
        }
        
        // Quoted text
        content += `<div class="hover-card-text">"${match.text}"</div>`;
        
        // Sub-category implication (for opinion words)
        if (match.subCategory) {
            content += `<div class="hover-card-implication">
                <strong>Implication:</strong> ${match.subCategory.implication}
            </div>`;
        }
        
        // All content always visible - no progressive disclosure
        const descriptions = isExcellence ? this.excellenceDescriptions : this.enhancedDescriptions;
        
        // For opinion words with sub-categories, use the sub-category description
        let desc;
        if (match.subCategory && type === 'opinion') {
            const subCategoryType = `opinion_${match.subCategory.id}`;
            desc = descriptions[subCategoryType];
        } else {
            desc = descriptions[type];
        }
        
        if (desc) {
            content += `<div class="hover-card-reason">${desc.description}</div>`;
            
            // Always show expanded content for reliable height
            content += `<div class="hover-card-expanded">`;
            
            if (desc.suggestion) {
                content += `<div class="hover-card-suggestion">💡 ${desc.suggestion}</div>`;
            }
            
            if (desc.examples) {
                content += `<div class="hover-card-examples"><strong>Examples:</strong> ${desc.examples}</div>`;
            }
            
            content += `</div>`;
        }
        
        // Portrayal information for problems
        if (!isExcellence && match.portrayal) {
            content += `<div class="hover-card-portrayal">Portrayal: ${match.portrayal.valence} (${match.portrayal.type})</div>`;
        }
        
        // Nearby context
        if (nearbyMatches.length > 0) {
            content += `<div class="hover-card-context">Nearby: ${nearbyMatches.map(m => m.type).join(', ')}</div>`;
        }
        
        content += '</div>';
        return content;
    }
    
    // Get custom styling for sub-categories
    getSubCategoryStyle(match) {
        if (match.subCategory && match.subCategory.color) {
            return ` style="border-left: 4px solid ${match.subCategory.color}; background-color: ${match.subCategory.color}10;"`;
        }
        return '';
    }
    
    
    getTypeName(type, isExcellence) {
        const typeNames = {
            // Problems
            opinion: 'Opinion Words',
            
            // Opinion Sub-Categories
            opinion_certainty: '🎯 Certainty/Conviction',
            opinion_hedging: '❓ Hedging/Uncertainty',
            opinion_evaluative_positive: '👍 Positive Evaluation',
            opinion_evaluative_negative: '👎 Negative Evaluation',
            opinion_emotional_charge: '⚡ Emotional Charge',
            opinion_comparative: '📊 Comparative/Superlative',
            opinion_political_framing: '🏛️ Political Framing',
            opinion_intensifiers: '🔥 Intensifiers',
            opinion_credibility_undermining: '🗣️ Credibility Undermining',
            opinion_loaded_political: '⚖️ Loaded Political Terms',
            opinion_moral_judgments: '⚖️ Moral/Ethical Judgments',
            opinion_emotional_appeals: '💭 Emotional Appeals',
            
            // Other Problems
            tobe: 'To-Be Verbs',
            absolute: 'Absolute Statements',
            passive: 'Passive Voice',
            weasel: 'Weasel Words',
            presupposition: 'Presuppositions',
            metaphor: 'War Metaphors',
            minimizer: 'Minimizers',
            maximizer: 'Maximizers',
            falsebalance: 'False Balance',
            euphemism: 'Euphemisms',
            emotional: 'Emotional Manipulation',
            gaslighting: 'Gaslighting',
            falsedilemma: 'False Dilemmas',
            
            // Excellence
            attribution: 'Clear Attribution',
            nuance: 'Nuanced Language',
            transparency: 'Transparent Communication',
            discourse: 'Constructive Discourse',
            evidence: 'Evidence-Based Claims'
        };
        
        return typeNames[type] || (isExcellence ? 'Excellence' : 'Bias Pattern');
    }
}
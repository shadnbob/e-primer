// utils/HoverContentGenerator.js - Enhanced hover content generation
import { BiasConfig } from '../config/BiasConfig.js';

export class HoverContentGenerator {
    constructor() {
        this.enhancedDescriptions = {
            opinion: {
                description: "Subjective language that reveals the writer's personal stance or evaluation. These words signal opinion rather than fact.",
                suggestion: "Consider using more objective language or acknowledging the subjective nature of the statement.",
                examples: "Instead of 'This is obviously wrong' → 'This appears to contradict the evidence' or 'I believe this is incorrect'"
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
        if (match.isCustom && match.customGroup) {
            return this._generateCustomHoverContent(match, nearbyMatches);
        }
        const isExcellence = match.isExcellence;
        const type = match.type;
        const intensity = match.intensity || 2;
        const intensityLabel = ['Mild', 'Moderate', 'Severe'][intensity - 1];
        
        let content = `<div class="hover-card ${isExcellence ? 'hover-card-excellence' : 'hover-card-problem'}">`;
        
        let biasConfig;
        const subConfig = match.subCategory || null;
        if (isExcellence) {
            biasConfig = BiasConfig.EXCELLENCE_TYPES[type.toUpperCase()];
        } else if (match.parentType) {
            biasConfig = BiasConfig.getBiasTypeConfig(match.parentType);
        } else {
            biasConfig = BiasConfig.getBiasTypeConfig(type);
        }
            
        const isContextual = match.isContextual && match.contextReasoning;
        
        if (isExcellence) {
            content += `<div class="hover-card-header">${this.getTypeName(type, true)}</div>`;
        } else {
            const typeName = subConfig ? subConfig.name : this.getTypeName(type, false);
            content += `
                <div class="hover-card-header"${this.getSubCategoryStyle(match)}>
                    ${typeName}
                    <span class="intensity-badge intensity-${intensity}">${intensityLabel}</span>
                </div>
            `;
        }
        
        // Quoted text
        content += `<div class="hover-card-text">"${match.text}"</div>`;
        
        // Contextual reasoning section (prioritized)
        if (isContextual) {
            const confidencePercentage = match.confidence ? Math.round(match.confidence * 100) : 'Unknown';
            
            // Show the analyzed context if available
            let contextDisplay = '';
            if (match.context && match.context.trim()) {
                // Highlight the matched phrase within the context
                const contextText = match.context.trim();
                const matchedPhrase = match.text;
                const highlightedContext = contextText.replace(
                    new RegExp(`(${matchedPhrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'),
                    '<mark class="context-highlight">$1</mark>'
                );
                
                contextDisplay = `
                    <div class="analyzed-context">
                        <div class="context-label">Analyzed text:</div>
                        <div class="context-text">"${highlightedContext}"</div>
                    </div>
                `;
            }
            
            content += `<div class="hover-card-contextual-reasoning">
                <div class="hover-card-section">
                    <div class="hover-card-section-title">Context Analysis:</div>
                    <div class="hover-card-section-content context-reasoning">
                        ${contextDisplay}
                        <div class="reasoning-explanation">${match.contextReasoning}</div>
                        <div class="confidence-indicator">
                            <span class="confidence-label">Confidence:</span>
                            <span class="confidence-value">${confidencePercentage}%</span>
                        </div>
                    </div>
                </div>
            </div>`;
        }
        
        if (subConfig && subConfig.implication) {
            content += `<div class="hover-card-implication">
                <strong>Implication:</strong> ${subConfig.implication}
            </div>`;
        }
        
        const effectiveConfig = subConfig || biasConfig;
        if (effectiveConfig) {
            const tipText = (subConfig && subConfig.basicTip) || (biasConfig && biasConfig.basicTip);
            if (tipText) {
                content += `<div class="hover-card-reason">${tipText}</div>`;
            }
            
            content += `<div class="hover-card-expanded">`;
            
            if (isExcellence) {
                if (biasConfig && biasConfig.whenExcellent) {
                    content += `<div class="hover-card-section">
                        <div class="hover-card-section-title">Why this is excellent:</div>
                        <div class="hover-card-section-content">${biasConfig.whenExcellent}</div>
                    </div>`;
                }
                
                if (biasConfig && biasConfig.howToEnhance) {
                    content += `<div class="hover-card-section">
                        <div class="hover-card-section-title">How to enhance further:</div>
                        <div class="hover-card-section-content">${biasConfig.howToEnhance}</div>
                    </div>`;
                }
            } else {
                const whenConcerning = (subConfig && subConfig.whenConcerning) || (biasConfig && biasConfig.whenConcerning);
                if (whenConcerning) {
                    content += `<div class="hover-card-section">
                        <div class="hover-card-section-title">When to be concerned:</div>
                        <div class="hover-card-section-content">${whenConcerning}</div>
                    </div>`;
                }
                
                const whenAcceptable = (subConfig && subConfig.whenAcceptable) || (biasConfig && biasConfig.whenAcceptable);
                if (whenAcceptable) {
                    content += `<div class="hover-card-section">
                        <div class="hover-card-section-title">When it's acceptable:</div>
                        <div class="hover-card-section-content">${whenAcceptable}</div>
                    </div>`;
                }
            }
            
            // Look for checklist
            if (biasConfig && biasConfig.lookFor && biasConfig.lookFor.length > 0) {
                content += `<div class="hover-card-section">
                    <div class="hover-card-section-title">Look for:</div>
                    <ul class="hover-card-checklist">`;
                biasConfig.lookFor.forEach(item => {
                    content += `<li>${item}</li>`;
                });
                content += `</ul></div>`;
            }
            
            // Examples section
            if (biasConfig && biasConfig.examples) {
                content += `<div class="hover-card-section">
                    <div class="hover-card-section-title">Examples:</div>`;
                
                if (isExcellence) {
                    // Excellence examples
                    if (biasConfig.examples.excellent) {
                        content += `<div class="hover-card-examples-acceptable">
                            <strong>Excellent examples:</strong> ${biasConfig.examples.excellent.join(', ')}
                        </div>`;
                    }
                    
                    if (biasConfig.examples.enhance) {
                        content += `<div class="hover-card-examples-problematic">
                            <strong>Enhancement ideas:</strong> ${biasConfig.examples.enhance.join(', ')}
                        </div>`;
                    }
                } else {
                    // Problem examples
                    if (biasConfig.examples.problematic) {
                        content += `<div class="hover-card-examples-problematic">
                            <strong>Concerning:</strong> ${biasConfig.examples.problematic.join(', ')}
                        </div>`;
                    }
                    
                    if (biasConfig.examples.acceptable) {
                        content += `<div class="hover-card-examples-acceptable">
                            <strong>Acceptable:</strong> ${biasConfig.examples.acceptable.join(', ')}
                        </div>`;
                    }
                }
                
                content += `</div>`;
            }
            
            content += `</div>`;
        } else {
            const descriptions = isExcellence ? this.excellenceDescriptions : this.enhancedDescriptions;
            const { parentId } = BiasConfig.resolveType(type);
            const desc = descriptions[parentId] || descriptions[type];
            
            if (subConfig && subConfig.description) {
                content += `<div class="hover-card-reason">${subConfig.description}</div>`;
                content += `<div class="hover-card-expanded">`;
                if (subConfig.suggestion) {
                    content += `<div class="hover-card-suggestion">${subConfig.suggestion}</div>`;
                }
                if (subConfig.examples) {
                    content += `<div class="hover-card-examples"><strong>Examples:</strong> ${subConfig.examples}</div>`;
                }
                content += `</div>`;
            } else if (desc) {
                content += `<div class="hover-card-reason">${desc.description}</div>`;
                
                content += `<div class="hover-card-expanded">`;
                
                if (desc.suggestion) {
                    content += `<div class="hover-card-suggestion">${desc.suggestion}</div>`;
                }
                
                if (desc.examples) {
                    content += `<div class="hover-card-examples"><strong>Examples:</strong> ${desc.examples}</div>`;
                }
                
                content += `</div>`;
            }
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
        return '';
    }
    
    
    _generateCustomHoverContent(match, nearbyMatches) {
        const group = match.customGroup;
        const hc = group.hoverContent || {};

        let content = `<div class="hover-card hover-card-problem">`;
        content += `<div class="hover-card-header" style="border-left: 3px solid ${group.color}">`;
        content += `${group.name}`;
        content += `<span class="intensity-badge intensity-2">Custom</span>`;
        content += `</div>`;
        content += `<div class="hover-card-text">"${match.text}"</div>`;

        if (hc.basicTip) {
            content += `<div class="hover-card-reason">${hc.basicTip}</div>`;
        }

        content += `<div class="hover-card-expanded">`;
        if (hc.whenConcerning) {
            content += `<div class="hover-card-section">`;
            content += `<div class="hover-card-section-title">When to be concerned:</div>`;
            content += `<div class="hover-card-section-content">${hc.whenConcerning}</div>`;
            content += `</div>`;
        }
        if (hc.whenAcceptable) {
            content += `<div class="hover-card-section">`;
            content += `<div class="hover-card-section-title">When it's acceptable:</div>`;
            content += `<div class="hover-card-section-content">${hc.whenAcceptable}</div>`;
            content += `</div>`;
        }
        if (hc.suggestion) {
            content += `<div class="hover-card-suggestion">${hc.suggestion}</div>`;
        }
        content += `</div>`;

        if (nearbyMatches.length > 0) {
            content += `<div class="hover-card-context">Nearby: ${nearbyMatches.map(m => m.type).join(', ')}</div>`;
        }

        content += '</div>';
        return content;
    }

    getTypeName(type, isExcellence) {
        const { parentId, subCategoryId } = BiasConfig.resolveType(type);
        if (subCategoryId) {
            const subCfg = BiasConfig.getSubCategory(parentId, subCategoryId);
            if (subCfg) return subCfg.name;
        }
        if (isExcellence) {
            const excConfig = BiasConfig.EXCELLENCE_TYPES[type.toUpperCase()];
            if (excConfig) return excConfig.name;
            return 'Excellence';
        }
        const biasTypeConfig = BiasConfig.getBiasTypeConfig(type);
        if (biasTypeConfig) return biasTypeConfig.name;
        return 'Bias Pattern';
    }
}
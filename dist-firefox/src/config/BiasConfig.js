// config/BiasConfig.js - Centralized configuration management
export class BiasConfig {
    static BIAS_TYPES = {
        // Basic Detection (enabled by default)
        OPINION: {
            id: 'opinion',
            name: 'Opinion Words',
            description: 'Subjective language and evaluative terms',
            category: 'basic',
            color: '#ff8c00',
            className: 'bias-highlight-opinion',
            settingKey: 'highlightOpinion',
            statKey: 'opinionCount',
            enabled: true,
            tooltip: 'Subjective language that reveals the writer\'s stance',
            basicTip: 'Subjective language that reveals the writer\'s stance',
            whenConcerning: 'When presented as fact or without supporting evidence',
            whenAcceptable: 'When clearly marked as opinion or expert assessment in their domain',
            lookFor: [
                'Is this presented as fact?',
                'Is there supporting evidence?',
                'Is this expert opinion in their field?',
                'Is the subjectivity acknowledged?'
            ],
            examples: {
                problematic: [
                    'obviously the best solution',
                    'terrible policy (stated as fact)',
                    'clearly demonstrates',
                    'undeniably effective',
                    'brilliant strategy (without context)'
                ],
                acceptable: [
                    'In my opinion, this is effective',
                    'Dr. Johnson considers this promising',
                    'I find this approach compelling',
                    'Critics argue this is problematic',
                    'The author suggests this is beneficial'
                ]
            },
            contextualGuidance: {
                academic: 'Concerning when evaluative language is used without proper qualification',
                news: 'Red flag when opinion words are used in supposedly objective reporting',
                opinion: 'Expected, but should be clearly distinguished from factual claims',
                instructions: 'Generally inappropriate unless describing user experience or preferences'
            },
            subCategories: {
                certainty: {
                    id: 'certainty',
                    name: 'Certainty/Conviction',
                    icon: '🎯',
                    color: '#ff6b6b',
                    description: 'Words that push readers toward unquestioning acceptance by conveying false certainty about debatable topics.',
                    implication: 'Creates false authority and discourages critical thinking by presenting opinions as indisputable facts.',
                    suggestion: 'Use more tentative language that acknowledges uncertainty and invites evaluation.',
                    examples: 'Instead of "obviously wrong" → "appears to contradict" or "I believe this is incorrect"',
                    settingKey: 'highlightOpinionCertainty',
                    statKey: 'opinionCertaintyCount',
                    basicTip: 'Words that push readers toward unquestioning acceptance by conveying false certainty about debatable topics.',
                    whenConcerning: 'When presenting debatable positions as settled fact',
                    whenAcceptable: 'When stating truly established facts'
                },
                hedging: {
                    id: 'hedging',
                    name: 'Hedging/Uncertainty',
                    icon: '❓',
                    color: '#ffa726',
                    description: 'Words that create unnecessary doubt or vagueness, often to avoid taking responsibility for claims.',
                    implication: 'Undermines confidence and can signal the writer is unsure of their position or trying to avoid accountability.',
                    suggestion: 'Be more definitive when you have evidence, or explain the specific reasons for uncertainty.',
                    examples: 'Instead of "maybe true" → "requires further investigation" or "preliminary evidence suggests"',
                    settingKey: 'highlightOpinionHedging',
                    statKey: 'opinionHedgingCount',
                    basicTip: 'Words that create unnecessary doubt or vagueness, often to avoid taking responsibility for claims.',
                    whenConcerning: 'When avoiding accountability for claims that have evidence',
                    whenAcceptable: 'When genuinely uncertain and expressing honest doubt'
                },
                evaluative_positive: {
                    id: 'evaluative_positive',
                    name: 'Positive Evaluation',
                    icon: '👍',
                    color: '#66bb6a',
                    description: 'Subjective positive judgments that reveal the writer\'s approval without objective criteria.',
                    implication: 'Biases readers toward positive evaluation without providing evidence or reasoning for the judgment.',
                    suggestion: 'Replace with specific, measurable criteria or acknowledge the subjective nature of the evaluation.',
                    examples: 'Instead of "excellent performance" → "achieved 95% accuracy" or "I consider this performance strong because..."',
                    settingKey: 'highlightOpinionEvaluativePositive',
                    statKey: 'opinionEvaluativePositiveCount',
                    basicTip: 'Subjective positive judgments that reveal the writer\'s approval without objective criteria.',
                    whenConcerning: 'When positive evaluation is presented without supporting evidence',
                    whenAcceptable: 'When clearly framed as personal opinion with reasoning'
                },
                evaluative_negative: {
                    id: 'evaluative_negative',
                    name: 'Negative Evaluation',
                    icon: '👎',
                    color: '#ef5350',
                    description: 'Subjective negative judgments that reveal the writer\'s disapproval without objective criteria.',
                    implication: 'Biases readers toward negative evaluation without providing evidence or reasoning for the judgment.',
                    suggestion: 'Replace with specific, measurable criteria or acknowledge the subjective nature of the evaluation.',
                    examples: 'Instead of "poor quality" → "failed to meet safety standards" or "I find this concerning because..."',
                    settingKey: 'highlightOpinionEvaluativeNegative',
                    statKey: 'opinionEvaluativeNegativeCount',
                    basicTip: 'Subjective negative judgments that reveal the writer\'s disapproval without objective criteria.',
                    whenConcerning: 'When negative evaluation is presented without supporting evidence',
                    whenAcceptable: 'When clearly framed as personal opinion with reasoning'
                },
                emotional_charge: {
                    id: 'emotional_charge',
                    name: 'Emotional Charge',
                    icon: '⚡',
                    color: '#ab47bc',
                    description: 'Words designed to trigger strong emotional responses that bypass logical evaluation.',
                    implication: 'Manipulates readers through emotion rather than reason, potentially clouding judgment.',
                    suggestion: 'Use neutral language that allows readers to form their own emotional responses based on facts.',
                    examples: 'Instead of "heartwarming story" → "story about community support" or "horrifying event" → "traumatic incident"',
                    settingKey: 'highlightOpinionEmotionalCharge',
                    statKey: 'opinionEmotionalChargeCount',
                    basicTip: 'Words designed to trigger strong emotional responses that bypass logical evaluation.',
                    whenConcerning: 'When emotional language substitutes for factual reporting',
                    whenAcceptable: 'When describing genuinely emotional situations with appropriate context'
                },
                comparative: {
                    id: 'comparative',
                    name: 'Comparative/Superlative',
                    icon: '📊',
                    color: '#42a5f5',
                    description: 'Words that create artificial rankings or comparisons without context or criteria.',
                    implication: 'Establishes hierarchies without justification, potentially misleading readers about relative importance or quality.',
                    suggestion: 'Provide specific criteria for comparison or use measured language that acknowledges context.',
                    examples: 'Instead of "the best solution" → "an effective solution" or "the most efficient approach we tested"',
                    settingKey: 'highlightOpinionComparative',
                    statKey: 'opinionComparativeCount',
                    basicTip: 'Words that create artificial rankings or comparisons without context or criteria.',
                    whenConcerning: 'When rankings lack criteria or context',
                    whenAcceptable: 'When based on specific, measurable criteria'
                },
                political_framing: {
                    id: 'political_framing',
                    name: 'Political Framing',
                    icon: '🏛️',
                    color: '#8d6e63',
                    description: 'Words that frame issues in political terms, potentially polarizing neutral topics.',
                    implication: 'Activates political identity and tribal thinking, making objective evaluation more difficult.',
                    suggestion: 'Use neutral, descriptive language that focuses on specific policies or actions rather than political labels.',
                    examples: 'Instead of "radical proposal" → "proposal that differs significantly from current policy" or describe specific elements',
                    settingKey: 'highlightOpinionPoliticalFraming',
                    statKey: 'opinionPoliticalFramingCount',
                    basicTip: 'Words that frame issues in political terms, potentially polarizing neutral topics.',
                    whenConcerning: 'When political labels replace substantive analysis',
                    whenAcceptable: 'When discussing actual political positions or platforms'
                },
                intensifiers: {
                    id: 'intensifiers',
                    name: 'Intensifiers',
                    icon: '🔥',
                    color: '#ff7043',
                    description: 'Words that amplify or exaggerate without adding meaningful information.',
                    implication: 'Creates artificial emphasis that can distort the actual significance of events or characteristics.',
                    suggestion: 'Use specific, measurable descriptions or remove unnecessary intensification.',
                    examples: 'Instead of "extremely important" → "critical for project success" or "increased by 300%"',
                    settingKey: 'highlightOpinionIntensifiers',
                    statKey: 'opinionIntensifiersCount',
                    basicTip: 'Words that amplify or exaggerate without adding meaningful information.',
                    whenConcerning: 'When intensifiers substitute for specific evidence',
                    whenAcceptable: 'When emphasis is proportionate and supported by evidence'
                },
                credibility_undermining: {
                    id: 'credibility_undermining',
                    name: 'Credibility Undermining',
                    icon: '🗣️',
                    color: '#78909c',
                    description: 'Words that question or attack credibility without providing evidence or reasoning.',
                    implication: 'Weakens trust in sources through insinuation rather than substantive critique.',
                    suggestion: 'Address specific claims with evidence rather than attacking the source\'s credibility.',
                    examples: 'Instead of "so-called expert" → "Dr. Smith, whose methodology differs from mainstream approaches" or address specific claims',
                    settingKey: 'highlightOpinionCredibilityUndermining',
                    statKey: 'opinionCredibilityUnderminingCount',
                    basicTip: 'Words that question or attack credibility without providing evidence or reasoning.',
                    whenConcerning: 'When attacking credibility without addressing the actual claims',
                    whenAcceptable: 'When raising legitimate questions about methodology or credentials'
                },
                loaded_political: {
                    id: 'loaded_political',
                    name: 'Loaded Political Terms',
                    icon: '⚖️',
                    color: '#5d4037',
                    description: 'Words that carry heavy political or ideological baggage, triggering partisan responses.',
                    implication: 'Activates political identity and bias, making neutral evaluation difficult.',
                    suggestion: 'Use specific, descriptive language that focuses on actions or policies rather than loaded terms.',
                    examples: 'Instead of "socialist policies" → "government-funded programs" or "authoritarian regime" → "government that restricts civil liberties"',
                    settingKey: 'highlightOpinionLoadedPolitical',
                    statKey: 'opinionLoadedPoliticalCount',
                    basicTip: 'Words that carry heavy political or ideological baggage, triggering partisan responses.',
                    whenConcerning: 'When loaded terms replace substantive policy discussion',
                    whenAcceptable: 'When accurately describing self-identified political positions'
                },
                moral_judgments: {
                    id: 'moral_judgments',
                    name: 'Moral/Ethical Judgments',
                    icon: '⚖️',
                    color: '#7e57c2',
                    description: 'Words that impose moral frameworks without acknowledging their subjective nature.',
                    implication: 'Presents moral judgments as universal truths rather than perspective-dependent evaluations.',
                    suggestion: 'Acknowledge the subjective nature of moral judgments or specify the ethical framework being used.',
                    examples: 'Instead of "immoral behavior" → "behavior that violates principle X" or "I consider this unethical because..."',
                    settingKey: 'highlightOpinionMoralJudgments',
                    statKey: 'opinionMoralJudgmentsCount',
                    basicTip: 'Words that impose moral frameworks without acknowledging their subjective nature.',
                    whenConcerning: 'When moral judgments are presented as objective facts',
                    whenAcceptable: 'When the ethical framework is explicitly stated'
                },
                emotional_appeals: {
                    id: 'emotional_appeals',
                    name: 'Emotional Appeals',
                    icon: '💭',
                    color: '#26a69a',
                    description: 'Words that bypass logical evaluation by directly targeting emotional responses.',
                    implication: 'Manipulates emotional state to influence opinion without providing rational justification.',
                    suggestion: 'Focus on factual information that allows readers to form their own emotional responses.',
                    examples: 'Instead of "promising developments" → "developments that may lead to improved outcomes" or provide specific evidence',
                    settingKey: 'highlightOpinionEmotionalAppeals',
                    statKey: 'opinionEmotionalAppealsCount',
                    basicTip: 'Words that bypass logical evaluation by directly targeting emotional responses.',
                    whenConcerning: 'When emotional appeals substitute for evidence-based arguments',
                    whenAcceptable: 'When emotions are relevant and accompanied by factual context'
                }
            }
        },
        
        TO_BE: {
            id: 'tobe',
            name: 'To-Be Verbs (E-Prime)',
            description: 'Forms of "to be" that can create false equivalencies',
            category: 'basic',
            color: '#87ceeb',
            className: 'bias-highlight-tobe',
            settingKey: 'highlightToBe',
            statKey: 'toBeCount',
            enabled: true,
            tooltip: 'E-Prime: Avoiding "to be" verbs for more precise language',
            basicTip: 'E-Prime: Avoiding "to be" verbs for more precise language',
            whenConcerning: 'When creating false equivalence or stating identity inappropriately',
            whenAcceptable: 'In definitions, classifications, essential descriptions',
            lookFor: [
                'Does this create false equivalence?',
                'Is this a definition?',
                'Is this stating identity?',
                'Could this be more precise?'
            ],
            examples: {
                problematic: [
                    'success is hard work',
                    'the problem is immigrants',
                    'happiness is money',
                    'the electron is a particle.',
                    'the government is corrupt'
                ],
                acceptable: [
                    'water is H2O',
                    'this is a butterfly',
                    'the meeting is at 3pm',
                    'the document is 20 pages long',
                    'the chemical formula is C6H12O6'
                ]
            },
            contextualGuidance: {
                academic: 'Concerning when creating false equivalencies in research or analysis',
                news: 'Watch for oversimplified identity statements about complex issues',
                opinion: 'Common but can reveal oversimplified thinking about complex topics',
                instructions: 'Acceptable for clear definitions and factual statements'
            }
        },
        
        ABSOLUTE: {
            id: 'absolute',
            name: 'Absolute Statements',
            description: 'Universal quantifiers and categorical claims',
            category: 'basic',
            color: '#ff69b4',
            className: 'bias-highlight-absolute',
            settingKey: 'highlightAbsolutes',
            statKey: 'absoluteCount',
            enabled: true,
            tooltip: 'Absolute terms that rarely reflect reality accurately',
            basicTip: 'Absolute terms that rarely reflect reality accurately',
            whenConcerning: 'When used for opinions, complex social issues, or persuasion',
            whenAcceptable: 'For mathematical facts, scientific laws, logical definitions',
            lookFor: [
                'Is this factually absolute?',
                'Is this about a complex topic?',
                'Used for emphasis or fact?',
                'Are there any exceptions to this claim?'
            ],
            examples: {
                problematic: [
                    'all politicians are corrupt',
                    'everyone knows this',
                    'nobody cares about the environment',
                    'always leads to disaster',
                    'never works in practice'
                ],
                acceptable: [
                    'all triangles have three sides',
                    'every participant signed consent',
                    'always follow safety protocols',
                    'never mix these chemicals',
                    'all data must be verified'
                ]
            },
            contextualGuidance: {
                academic: 'Acceptable for definitions and established facts; concerning for research claims',
                news: 'Red flag when describing complex social or political issues',
                opinion: 'Common but should be questioned - reality is usually more nuanced',
                instructions: 'Appropriate for safety rules and procedural requirements'
            }
        },
        
        // Advanced Detection
        PASSIVE: {
            id: 'passive',
            name: 'Passive Voice',
            description: 'Constructions that obscure who performs actions',
            category: 'advanced',
            color: '#800080',
            className: 'bias-highlight-passive',
            settingKey: 'highlightPassive',
            statKey: 'passiveCount',
            enabled: true,
            tooltip: 'Passive voice can hide responsibility and agency',
            basicTip: 'Passive voice can hide responsibility and agency',
            whenConcerning: 'When the actor is missing or responsibility is being obscured',
            whenAcceptable: 'In scientific writing, procedures, when actor is obvious from context',
            lookFor: [
                'Is the actor missing?',
                'Is responsibility being avoided?',
                'Look for "by [person/entity]"',
                'Is this appropriate for the context?'
            ],
            examples: {
                problematic: [
                    'mistakes were made',
                    'decisions were taken',
                    'it was decided',
                    'action will be taken'
                ],
                acceptable: [
                    'was fired by the director',
                    'samples were analyzed using standard methods',
                    'the experiment was conducted by Smith et al.',
                    'data was collected from participants'
                ]
            },
            contextualGuidance: {
                academic: 'Passive voice is standard in scientific writing when methodology is more important than who performed it',
                news: 'Be concerned when passive voice obscures accountability in events',
                opinion: 'Watch for passive voice used to avoid taking responsibility for claims',
                instructions: 'Acceptable when focusing on the action rather than the actor'
            }
        },
        
        WEASEL: {
            id: 'weasel',
            name: 'Weasel Words',
            description: 'Vague attributions and unsupported claims',
            category: 'advanced',
            color: '#b8860b',
            className: 'bias-highlight-weasel',
            settingKey: 'highlightWeasel',
            statKey: 'weaselCount',
            enabled: true,
            tooltip: 'Phrases that avoid specificity and concrete sources',
            basicTip: 'Phrases that avoid specificity and concrete sources',
            whenConcerning: 'When used without specific sources, citations, or evidence',
            whenAcceptable: 'When followed by citations, named sources, or quantified data',
            lookFor: [
                'Are specific sources provided?',
                'Are there citations nearby?',
                'Is this quantified with actual data?',
                'Can the claim be verified?'
            ],
            examples: {
                problematic: [
                    'experts believe',
                    'studies show (without citation)' ,
                    'many people say',
                    'it is widely known',
                    'sources indicate'
                ],
                acceptable: [
                    'Johnson et al. (2023) found',
                    'According to Dr. Smith from Harvard',
                    'A 2023 study by the CDC showed',
                    'The WHO reports that...'
                ]
            },
            contextualGuidance: {
                academic: 'Always expect proper citations; weasel words indicate poor scholarship',
                news: 'Acceptable when protecting sources, but should specify their expertise',
                opinion: 'Watch for unsupported generalizations masquerading as fact',
                instructions: 'Generally inappropriate unless referring to established consensus'
            },
            subCategories: {
                unnamed_sources: {
                    id: 'unnamed_sources',
                    name: 'Unnamed Sources',
                    icon: '👤',
                    color: '#5d4037',
                    description: 'References to anonymous or vague sources that cannot be verified or held accountable.',
                    implication: 'Allows claims to appear sourced without any verifiable attribution, making fact-checking impossible.',
                    suggestion: 'Ask: WHO specifically said this? Name the person, organization, or publication.',
                    examples: 'Instead of "sources indicate" → "a senior official at the EPA told Reuters"',
                    settingKey: 'highlightWeaselUnnamed',
                    statKey: 'weaselUnnamedCount',
                    basicTip: 'Vague source references that cannot be verified or held accountable.',
                    whenConcerning: 'When anonymous attribution is used for claims that could be verified',
                    whenAcceptable: 'When protecting whistleblowers or sources at genuine risk'
                },
                hedged_evidence: {
                    id: 'hedged_evidence',
                    name: 'Hedged Evidence',
                    icon: '📋',
                    color: '#00838f',
                    description: 'References to evidence, research, or data without providing specific citations or details.',
                    implication: 'Creates an appearance of evidence-based reasoning while avoiding any verifiable claim.',
                    suggestion: 'Ask: WHICH study? Published WHERE? By WHOM? Provide the actual citation.',
                    examples: 'Instead of "research suggests" → "a 2024 study by Smith et al. in Nature found..."',
                    settingKey: 'highlightWeaselHedged',
                    statKey: 'weaselHedgedCount',
                    basicTip: 'References to evidence without specific citations or details.',
                    whenConcerning: 'When vague evidence claims substitute for actual citations',
                    whenAcceptable: 'When summarizing a well-known body of research in informal contexts'
                },
                vague_quantifiers: {
                    id: 'vague_quantifiers',
                    name: 'Vague Quantifiers',
                    icon: '📊',
                    color: '#7b1fa2',
                    description: 'Imprecise frequency or quantity words that avoid committing to specific numbers or rates.',
                    implication: 'Obscures actual rates and magnitudes, allowing the reader to imagine whatever quantity supports the argument.',
                    suggestion: 'Ask: HOW MANY exactly? Replace with specific numbers, percentages, or ranges.',
                    examples: 'Instead of "in many cases" → "in 73% of cases" or "in 8 out of 12 trials"',
                    settingKey: 'highlightWeaselVague',
                    statKey: 'weaselVagueCount',
                    basicTip: 'Imprecise quantity words that avoid specific numbers.',
                    whenConcerning: 'When vague quantities substitute for available specific data',
                    whenAcceptable: 'When precise data is genuinely unavailable and the imprecision is acknowledged'
                },
                appeal_to_authority: {
                    id: 'appeal_to_authority',
                    name: 'Appeal to Authority',
                    icon: '🎓',
                    color: '#1565c0',
                    description: 'Invocations of unnamed experts or consensus to lend credibility without verifiable backing.',
                    implication: 'Borrows authority from unnamed or unqualified sources rather than presenting evidence directly.',
                    suggestion: 'Ask: Which SPECIFIC experts? In what FIELD? Is this their area of expertise?',
                    examples: 'Instead of "experts believe" → "Dr. Chen, a climate scientist at MIT, found..."',
                    settingKey: 'highlightWeaselAuthority',
                    statKey: 'weaselAuthorityCount',
                    basicTip: 'Unnamed expert or consensus claims used to borrow credibility.',
                    whenConcerning: 'When unnamed authority substitutes for evidence or named experts',
                    whenAcceptable: 'When referring to genuinely established scientific consensus'
                },
                passive_attribution: {
                    id: 'passive_attribution',
                    name: 'Passive Attribution',
                    icon: '🌫️',
                    color: '#546e7a',
                    description: 'Qualifying words that distance the writer from claims, adding plausible deniability.',
                    implication: 'Lets the writer advance claims while retaining the ability to disown them if challenged.',
                    suggestion: 'Notice the writer is not committing to the claim — ask what they actually believe and why.',
                    examples: 'Instead of "reportedly" → state the claim directly and cite the source',
                    settingKey: 'highlightWeaselPassive',
                    statKey: 'weaselPassiveCount',
                    basicTip: 'Qualifying words that add plausible deniability to claims.',
                    whenConcerning: 'When used to advance claims without accountability',
                    whenAcceptable: 'When genuinely reporting unverified information with appropriate caution'
                }
            }
        },
        
        PRESUPPOSITION: {
            id: 'presupposition',
            name: 'Presuppositions',
            description: 'Words that smuggle in hidden assumptions',
            category: 'advanced',
            color: '#ff1493',
            className: 'bias-highlight-presupposition',
            settingKey: 'highlightPresupposition',
            statKey: 'presuppositionCount',
            enabled: true,
            tooltip: 'Possible language that makes readers accept premises without realizing it',
            basicTip: 'Language that makes readers accept premises without realizing it',
            whenConcerning: 'When forcing acceptance of debatable premises',
            whenAcceptable: 'Used for emphasis without hidden assumptions',
            lookFor: [
                'What assumption is being smuggled in?',
                'Is this hiding a premise?',
                'Is the assumption fair and accurate?',
                'Does this force acceptance of a debatable point?'
            ],
            examples: {
                problematic: [
                    'even scientists admit climate change is debatable',
                    'still refuses to apologize',
                    'another failed attempt',
                    'admits that the policy failed',
                    'continues to ignore the evidence'
                ],
                acceptable: [
                    'even beginners can understand',
                    'still working on the project',
                    'another successful implementation',
                    'admits the challenge is complex',
                    'continues to research the topic'
                ]
            },
            contextualGuidance: {
                academic: 'Concerning when smuggling in unproven premises or biased assumptions',
                news: 'Red flag when loaded language assumes guilt, failure, or disputed facts',
                opinion: 'Common rhetorical device, but readers should identify hidden assumptions',
                instructions: 'Generally inappropriate as it can confuse or mislead'
            }
        },
        
        // Framing & Rhetoric
        METAPHOR: {
            id: 'metaphor',
            name: 'War Metaphors',
            description: 'Militaristic language for non-military topics',
            category: 'framing',
            color: '#dc143c',
            className: 'bias-highlight-metaphor',
            settingKey: 'highlightMetaphors',
            statKey: 'metaphorCount',
            enabled: true,
            tooltip: 'Military metaphors that frame issues as conflicts',
            basicTip: 'Military metaphors that frame issues as conflicts',
            whenConcerning: 'When framing complex social issues as battles or wars',
            whenAcceptable: 'In sports, competitive contexts, or when discussing actual conflicts',
            lookFor: [
                'Is this about actual conflict?',
                'Does this create us-vs-them thinking?',
                'Is this oversimplifying a complex issue?',
                'Are there better metaphors available?'
            ],
            examples: {
                problematic: [
                    'war on drugs',
                    'battle against poverty',
                    'attacking the opposition',
                    'defeat climate change',
                    'enemy of the people'
                ],
                acceptable: [
                    'battle for the championship',
                    'war strategy game',
                    'attacking the goal',
                    'defeated the defending champions',
                    'enemy forces in the conflict'
                ]
            },
            contextualGuidance: {
                academic: 'Concerning when used to describe research, policy, or social issues',
                news: 'Red flag when describing politics, social issues, or policy debates',
                opinion: 'Common but can polarize and oversimplify complex topics',
                instructions: 'Generally inappropriate unless describing competitive scenarios'
            }
        },
        
        MINIMIZER: {
            id: 'minimizer',
            name: 'Minimizers',
            description: 'Language that downplays significance',
            category: 'framing',
            color: '#008080',
            className: 'bias-highlight-minimizer',
            settingKey: 'highlightMinimizers',
            statKey: 'minimizerCount',
            enabled: true,
            tooltip: 'Words that dismiss or trivialize legitimate concerns',
            basicTip: 'Words that dismiss or trivialize legitimate concerns',
            whenConcerning: 'When dismissing legitimate problems or complex issues',
            whenAcceptable: 'In instructions, simplification for clarity, or appropriate emphasis',
            lookFor: [
                'Is this dismissing concerns?',
                'Is this clarifying or instructing?',
                'Is the minimization appropriate?',
                'Are serious issues being trivialized?'
            ],
            examples: {
                problematic: [
                    'just ignore the problem',
                    'only a minor issue (about serious matters)',
                    'merely a small concern',
                    'slightly problematic (about major issues)',
                    'trivial complaint'
                ],
                acceptable: [
                    'just click the button',
                    'simply follow these steps',
                    'only takes a minute',
                    'merely requires basic knowledge',
                    'slightly adjust the settings'
                ]
            },
            contextualGuidance: {
                academic: 'Concerning when minimizing research limitations or important findings',
                news: 'Red flag when downplaying serious events or issues',
                opinion: 'Watch for dismissal of legitimate concerns or opposing viewpoints',
                instructions: 'Appropriate for simplifying complex procedures'
            }
        },
        
        MAXIMIZER: {
            id: 'maximizer',
            name: 'Maximizers',
            description: 'Exaggeration and hyperbolic language',
            category: 'framing',
            color: '#ff4500',
            className: 'bias-highlight-maximizer',
            settingKey: 'highlightMaximizers',
            statKey: 'maximizerCount',
            enabled: true,
            tooltip: 'Hyperbolic language that creates false urgency',
            basicTip: 'Hyperbolic language that creates false urgency',
            whenConcerning: 'When creating false urgency or exaggerating normal situations',
            whenAcceptable: 'When describing genuinely extreme situations or for appropriate emphasis',
            lookFor: [
                'Is this genuinely extreme?',
                'Is this creating false urgency?',
                'Is this proportionate to the situation?',
                'Are there more measured terms available?'
            ],
            examples: {
                problematic: [
                    'crisis of confidence (about minor issues)',
                    'disaster of a meeting',
                    'unprecedented challenges (for common problems)',
                    'massive failure (for small mistakes)',
                    'catastrophic consequences (for minor issues)'
                ],
                acceptable: [
                    'natural disaster',
                    'unprecedented pandemic',
                    'massive earthquake',
                    'catastrophic damage from the hurricane',
                    'crisis response team'
                ]
            },
            contextualGuidance: {
                academic: 'Concerning when exaggerating findings or research implications',
                news: 'Red flag when sensationalizing normal events or minor issues',
                opinion: 'Common for emphasis but can mislead about actual severity',
                instructions: 'Generally inappropriate unless describing genuine emergencies'
            },
            subCategories: {
                scale_inflation: {
                    id: 'scale_inflation',
                    name: 'Scale Inflation',
                    icon: '📏',
                    color: '#6a1b9a',
                    description: 'Words that inflate physical or numerical magnitude without comparative context.',
                    implication: 'Creates a false sense of scale by using extreme size language for things that may be moderate or normal.',
                    suggestion: 'Ask: compared to what baseline? Replace with specific measurements or comparisons.',
                    examples: 'Instead of "massive increase" → "a 15% increase" or "an increase three times the annual average"',
                    settingKey: 'highlightMaximizerScale',
                    statKey: 'maximizerScaleCount',
                    basicTip: 'Extreme size language that inflates magnitude without context.',
                    whenConcerning: 'When size language lacks comparative context or specific measurements',
                    whenAcceptable: 'When describing genuinely large things with appropriate context'
                },
                catastrophizing: {
                    id: 'catastrophizing',
                    name: 'Catastrophizing',
                    icon: '🚨',
                    color: '#b71c1c',
                    description: 'Crisis and disaster language applied to situations that may not warrant emergency framing.',
                    implication: 'Triggers fear responses for non-emergency situations, distorting risk perception and urgency.',
                    suggestion: 'Ask: is this genuinely a crisis? Replace with proportionate language and specific impact data.',
                    examples: 'Instead of "crisis" → "a growing concern" or "a problem affecting 5% of users"',
                    settingKey: 'highlightMaximizerCatastrophe',
                    statKey: 'maximizerCatastropheCount',
                    basicTip: 'Crisis and disaster language applied to non-emergency situations.',
                    whenConcerning: 'When crisis framing is applied to non-emergency situations',
                    whenAcceptable: 'When describing genuine crises, disasters, or emergencies'
                },
                dramatic_verbs: {
                    id: 'dramatic_verbs',
                    name: 'Dramatic Verbs',
                    icon: '💥',
                    color: '#e65100',
                    description: 'Verbs that exaggerate the degree of change or destruction beyond what the facts support.',
                    implication: 'Replaces measured description with violent or extreme action language, distorting actual impact.',
                    suggestion: 'Ask: what are the actual numbers? Replace with precise verbs that describe the real magnitude.',
                    examples: 'Instead of "costs skyrocketed" → "costs increased by 40%"',
                    settingKey: 'highlightMaximizerDramatic',
                    statKey: 'maximizerDramaticCount',
                    basicTip: 'Verbs that exaggerate the degree of change beyond what facts support.',
                    whenConcerning: 'When dramatic verbs substitute for specific measurements of change',
                    whenAcceptable: 'When the degree of change is genuinely extreme and supported by data'
                },
                superlative_hype: {
                    id: 'superlative_hype',
                    name: 'Superlative Hype',
                    icon: '✨',
                    color: '#1565c0',
                    description: 'Adjectives of extreme impressiveness that create false uniqueness or exceptionality.',
                    implication: 'Makes ordinary things sound extraordinary, inflating expectations and distorting significance.',
                    suggestion: 'Ask: unprecedented compared to what? Replace with specific evidence of what makes this notable.',
                    examples: 'Instead of "unprecedented" → "the first since 2008" or "exceeds previous records by 12%"',
                    settingKey: 'highlightMaximizerSuperlative',
                    statKey: 'maximizerSuperlativeCount',
                    basicTip: 'Adjectives that create false uniqueness or exceptionality.',
                    whenConcerning: 'When superlatives lack comparative context or evidence',
                    whenAcceptable: 'When something is genuinely unprecedented with supporting evidence'
                },
                paradigm_shift: {
                    id: 'paradigm_shift',
                    name: 'Paradigm Shift',
                    icon: '🔄',
                    color: '#2e7d32',
                    description: 'Claims of transformative, game-changing impact that imply everything has fundamentally changed.',
                    implication: 'Overstates the significance of changes, implying a complete transformation when the reality may be incremental.',
                    suggestion: 'Ask: what specifically changed? Replace with concrete descriptions of what is different and how.',
                    examples: 'Instead of "game changing" → "introduces a new approach to X that reduces cost by 30%"',
                    settingKey: 'highlightMaximizerParadigm',
                    statKey: 'maximizerParadigmCount',
                    basicTip: 'Claims of transformative impact that overstate significance.',
                    whenConcerning: 'When transformation claims lack specific evidence of what changed',
                    whenAcceptable: 'When describing genuinely transformative events with specific evidence'
                }
            }
        },
        
        // Manipulation Tactics
        FALSE_BALANCE: {
            id: 'falsebalance',
            name: 'False Balance',
            description: 'Artificial balance between unequal positions',
            category: 'manipulation',
            color: '#4b0082',
            className: 'bias-highlight-falsebalance',
            settingKey: 'highlightFalseBalance',
            statKey: 'falseBalanceCount',
            enabled: true,
            tooltip: 'Language that creates false equivalence between positions',
            basicTip: 'Language that creates false equivalence between positions',
            whenConcerning: 'When creating false equivalence between unequal positions',
            whenAcceptable: 'When positions are genuinely equivalent or in neutral reporting',
            lookFor: [
                'Are these positions actually equivalent?',
                'Is one position more evidence-based?',
                'Is this creating false equivalence?',
                'Are different standards being applied?'
            ],
            examples: {
                problematic: [
                    'both sides of the climate debate',
                    'balanced view of vaccines',
                    'two schools of thought on evolution',
                    'fair and balanced reporting on science',
                    'equal time for all perspectives'
                ],
                acceptable: [
                    'both political candidates',
                    'balanced approach to budget priorities',
                    'two schools of thought on economic policy',
                    'considering both options',
                    'weighing different strategies'
                ]
            },
            contextualGuidance: {
                academic: 'Concerning when treating well-established science as debatable',
                news: 'Red flag when giving equal weight to fringe and mainstream views',
                opinion: 'Watch for artificial balance on settled questions',
                instructions: 'Generally inappropriate when facts are not in dispute'
            }
        },
        
        EUPHEMISM: {
            id: 'euphemism',
            name: 'Euphemisms',
            description: 'Language that obscures harsh realities',
            category: 'manipulation',
            color: '#006400',
            className: 'bias-highlight-euphemism',
            settingKey: 'highlightEuphemism',
            statKey: 'euphemismCount',
            enabled: true,
            tooltip: 'Euphemisms and dysphemisms that manipulate perception',
            basicTip: 'Euphemisms and dysphemisms that manipulate perception',
            whenConcerning: 'When obscuring harsh realities or manipulating perception',
            whenAcceptable: 'When used for appropriate social courtesy or sensitivity',
            lookFor: [
                'Is this hiding harsh realities?',
                'Is this manipulating perception?',
                'Is this socially appropriate?',
                'What is the real meaning?'
            ],
            examples: {
                problematic: [
                    'enhanced interrogation',
                    'collateral damage',
                    'rightsizing',
                    'ethnic cleansing',
                    'revenue enhancement'
                ],
                acceptable: [
                    'passed away',
                    'restroom',
                    'between jobs',
                    'differently abled',
                    'let go'
                ]
            },
            contextualGuidance: {
                academic: 'Concerning when obscuring the true nature of research findings',
                news: 'Red flag when hiding the severity of events or issues',
                opinion: 'Watch for language that softens or hardens perception unfairly',
                instructions: 'Generally inappropriate unless for social sensitivity'
            },
            subCategories: {
                political_euphemism: {
                    id: 'political_euphemism',
                    name: 'Political Euphemism',
                    icon: '🏛️',
                    color: '#5c6bc0',
                    description: 'Government and policy language that obscures controversial actions behind neutral-sounding terminology.',
                    implication: 'Conceals the true nature of government actions, making harmful policies harder to evaluate and oppose.',
                    suggestion: 'Replace with direct language that describes what actually happens.',
                    examples: 'Instead of "enhanced interrogation" → "torture" or "coercive interrogation techniques"',
                    settingKey: 'highlightEuphemismPolitical',
                    statKey: 'euphemismPoliticalCount',
                    basicTip: 'Government language that obscures controversial actions behind neutral terminology.',
                    whenConcerning: 'When government or policy language hides the true nature of actions',
                    whenAcceptable: 'Rarely — political euphemisms almost always serve to obscure'
                },
                corporate_euphemism: {
                    id: 'corporate_euphemism',
                    name: 'Corporate Euphemism',
                    icon: '💼',
                    color: '#78909c',
                    description: 'Business language that softens negative outcomes like job losses, price increases, and failures.',
                    implication: 'Disguises harm to workers, consumers, and communities behind professional-sounding jargon.',
                    suggestion: 'Use plain language that makes the impact on people clear.',
                    examples: 'Instead of "rightsizing" → "laying off employees" or "cutting 200 jobs"',
                    settingKey: 'highlightEuphemismCorporate',
                    statKey: 'euphemismCorporateCount',
                    basicTip: 'Business language that softens negative outcomes like job losses and failures.',
                    whenConcerning: 'When corporate jargon hides impact on workers or consumers',
                    whenAcceptable: 'When used in appropriate business context without obscuring harm'
                },
                social_euphemism: {
                    id: 'social_euphemism',
                    name: 'Social Euphemism',
                    icon: '🤝',
                    color: '#66bb6a',
                    description: 'Socially polite substitutions used out of sensitivity, courtesy, or respect for dignity.',
                    implication: 'Often well-intentioned and appropriate, but can sometimes obscure issues that need direct discussion.',
                    suggestion: 'Consider whether the euphemism serves genuine respect or avoids a conversation that needs directness.',
                    examples: '"Passed away" is appropriate for sensitive contexts; "economically disadvantaged" may obscure systemic poverty',
                    settingKey: 'highlightEuphemismSocial',
                    statKey: 'euphemismSocialCount',
                    basicTip: 'Socially polite substitutions — often appropriate but can obscure important issues.',
                    whenConcerning: 'When politeness prevents necessary direct discussion of systemic issues',
                    whenAcceptable: 'When showing genuine respect, sensitivity, or social courtesy'
                },
                military_euphemism: {
                    id: 'military_euphemism',
                    name: 'Military Euphemism',
                    icon: '🎖️',
                    color: '#b71c1c',
                    description: 'Military jargon that sanitizes violence, casualties, and the human cost of warfare.',
                    implication: 'Makes warfare and its consequences more palatable, reducing public scrutiny of military actions.',
                    suggestion: 'Describe the actual human impact rather than using sanitized military terminology.',
                    examples: 'Instead of "surgical strike" → "bombing that killed 12 people"',
                    settingKey: 'highlightEuphemismMilitary',
                    statKey: 'euphemismMilitaryCount',
                    basicTip: 'Military jargon that sanitizes violence and the human cost of warfare.',
                    whenConcerning: 'When military language hides civilian casualties or human suffering',
                    whenAcceptable: 'In technical military communication between professionals'
                },
                dysphemism: {
                    id: 'dysphemism',
                    name: 'Dysphemism',
                    icon: '🔥',
                    color: '#e65100',
                    description: 'Loaded negative framing that inflames perception — the rhetorical opposite of a euphemism.',
                    implication: 'Provokes hostility and negative emotional reactions by replacing neutral terms with inflammatory ones.',
                    suggestion: 'Replace with neutral, descriptive language that allows readers to form their own judgments.',
                    examples: 'Instead of "death tax" → "estate tax"; instead of "illegal aliens" → "undocumented immigrants"',
                    settingKey: 'highlightEuphemismDysphemism',
                    statKey: 'euphemismDysphemismCount',
                    basicTip: 'Loaded negative framing — the opposite of a euphemism, designed to inflame.',
                    whenConcerning: 'When inflammatory language replaces neutral terms to provoke reaction',
                    whenAcceptable: 'Rarely — dysphemisms almost always serve to inflame rather than inform'
                },
                medical_euphemism: {
                    id: 'medical_euphemism',
                    name: 'Medical Euphemism',
                    icon: '🏥',
                    color: '#00897b',
                    description: 'Healthcare language that softens or obscures medical errors, patient outcomes, and end-of-life realities.',
                    implication: 'Can impair informed consent and obscure accountability for medical errors or treatment risks.',
                    suggestion: 'Use clear, direct language — especially when patients need accurate information to make decisions.',
                    examples: 'Instead of "negative patient outcome" → "the patient died"',
                    settingKey: 'highlightEuphemismMedical',
                    statKey: 'euphemismMedicalCount',
                    basicTip: 'Healthcare language that obscures medical errors and patient outcomes.',
                    whenConcerning: 'When medical language impairs informed consent or hides errors',
                    whenAcceptable: 'When showing sensitivity to patients and families in acute grief'
                },
                environmental_euphemism: {
                    id: 'environmental_euphemism',
                    name: 'Environmental Euphemism',
                    icon: '🌿',
                    color: '#2e7d32',
                    description: 'Environmental language that minimizes ecological damage or greenwashes harmful practices.',
                    implication: 'Makes environmental destruction sound manageable or even positive, reducing urgency for action.',
                    suggestion: 'Describe the actual environmental impact directly and specifically.',
                    examples: 'Instead of "clean coal" → "coal with reduced but still significant emissions"',
                    settingKey: 'highlightEuphemismEnvironmental',
                    statKey: 'euphemismEnvironmentalCount',
                    basicTip: 'Environmental language that minimizes ecological damage or greenwashes.',
                    whenConcerning: 'When environmental language obscures actual ecological harm',
                    whenAcceptable: 'When describing genuine environmental improvements with specific data'
                }
            }
        },
        
        EMOTIONAL: {
            id: 'emotional',
            name: 'Emotional Manipulation',
            description: 'Appeals designed to trigger emotional responses',
            category: 'manipulation',
            color: '#ff7f50',
            className: 'bias-highlight-emotional',
            settingKey: 'highlightEmotional',
            statKey: 'emotionalCount',
            enabled: true,
            tooltip: 'Language designed to manipulate through emotion',
            basicTip: 'Language designed to manipulate through emotion',
            whenConcerning: 'When bypassing rational thought with emotional appeals',
            whenAcceptable: 'When emotion is genuinely relevant to the issue',
            lookFor: [
                'Is this bypassing logical analysis?',
                'Is the emotion relevant to the issue?',
                'Is this manipulating rather than informing?',
                'Are facts being provided alongside emotion?'
            ],
            examples: {
                problematic: [
                    'think of the children (irrelevant context)',
                    'devastating impact (without evidence)',
                    'shocking revelation (about minor issues)',
                    'heartbreaking story (to support unrelated policy)',
                    'outrageous behavior (opinion presented as fact)'
                ],
                acceptable: [
                    'families affected by the policy',
                    'significant economic impact',
                    'important development',
                    'personal story illustrating the issue',
                    'concerning behavior patterns'
                ]
            },
            contextualGuidance: {
                academic: 'Concerning when emotion substitutes for evidence or analysis',
                news: 'Red flag when emotional language replaces factual reporting',
                opinion: 'Common but should be balanced with rational arguments',
                instructions: 'Generally inappropriate unless describing emotional contexts'
            },
            subCategories: {
                fear_appeal: {
                    id: 'fear_appeal',
                    name: 'Fear Appeal',
                    icon: '😨',
                    color: '#c62828',
                    description: 'Language designed to trigger fear and threat perception, bypassing rational risk assessment.',
                    implication: 'Activates the brain\'s threat response, making readers more susceptible to persuasion and less able to evaluate claims critically.',
                    suggestion: 'Ask what specific evidence supports the claimed danger and evaluate actual risk levels.',
                    examples: 'Instead of "existential threat" → "a significant challenge" or provide specific risk data',
                    settingKey: 'highlightEmotionalFear',
                    statKey: 'emotionalFearCount',
                    basicTip: 'Language that triggers fear to bypass rational risk assessment.',
                    whenConcerning: 'When fear language substitutes for evidence about actual dangers',
                    whenAcceptable: 'When describing genuinely dangerous situations with supporting evidence'
                },
                guilt_induction: {
                    id: 'guilt_induction',
                    name: 'Guilt Induction',
                    icon: '😔',
                    color: '#6a1b9a',
                    description: 'Language designed to trigger guilt and moral responsibility, pressuring agreement through shame.',
                    implication: 'Bypasses rational evaluation by making disagreement feel morally wrong, regardless of the actual merits.',
                    suggestion: 'Evaluate whether the responsibility claim is supported by evidence, separate from the emotional pressure.',
                    examples: 'Instead of "blood on your hands" → "shares responsibility for the outcome" with specific evidence',
                    settingKey: 'highlightEmotionalGuilt',
                    statKey: 'emotionalGuiltCount',
                    basicTip: 'Language that pressures agreement through guilt and shame.',
                    whenConcerning: 'When guilt is used to shut down legitimate debate or analysis',
                    whenAcceptable: 'When genuine accountability is supported by evidence of responsibility'
                },
                flattery_manipulation: {
                    id: 'flattery_manipulation',
                    name: 'Flattery Manipulation',
                    icon: '🎭',
                    color: '#f57f17',
                    description: 'Compliments and in-group identity appeals designed to bias the reader toward agreement.',
                    implication: 'Creates social pressure to agree by implying that disagreement means you lack intelligence, virtue, or sophistication.',
                    suggestion: 'Recognize the appeal to identity and evaluate the argument on its own merits.',
                    examples: 'Instead of "smart people like you understand" → present the argument independently',
                    settingKey: 'highlightEmotionalFlattery',
                    statKey: 'emotionalFlatteryCount',
                    basicTip: 'In-group identity appeals that bias readers toward agreement.',
                    whenConcerning: 'When flattery substitutes for substantive argument',
                    whenAcceptable: 'Rarely — flattery in persuasive writing almost always serves to manipulate'
                },
                outrage_fuel: {
                    id: 'outrage_fuel',
                    name: 'Outrage Fuel',
                    icon: '🤬',
                    color: '#d84315',
                    description: 'Language designed to trigger moral outrage, bypassing careful analysis with indignation.',
                    implication: 'Replaces factual evaluation with emotional reaction, making readers more likely to share and amplify without verification.',
                    suggestion: 'Look past the outrage language to identify the actual facts and evaluate them independently.',
                    examples: 'Instead of "shocking revelation" → "new information shows..." with specific details',
                    settingKey: 'highlightEmotionalOutrage',
                    statKey: 'emotionalOutrageCount',
                    basicTip: 'Language that triggers moral outrage to bypass careful analysis.',
                    whenConcerning: 'When outrage language replaces factual reporting or evidence',
                    whenAcceptable: 'When describing genuinely outrageous situations with full factual context'
                },
                sympathy_exploitation: {
                    id: 'sympathy_exploitation',
                    name: 'Sympathy Exploitation',
                    icon: '💔',
                    color: '#1565c0',
                    description: 'Uses vulnerable populations to weaponize compassion and bypass rational evaluation of arguments.',
                    implication: 'Makes disagreement feel heartless, even when the emotional appeal has no logical connection to the argument.',
                    suggestion: 'Ask how the emotional appeal specifically connects to the policy or argument being advanced.',
                    examples: 'Instead of "think of the children" → describe specific impacts on children with evidence',
                    settingKey: 'highlightEmotionalSympathy',
                    statKey: 'emotionalSympathyCount',
                    basicTip: 'Weaponizes compassion for vulnerable groups to bypass rational evaluation.',
                    whenConcerning: 'When sympathy appeals are disconnected from the actual argument',
                    whenAcceptable: 'When vulnerable populations are genuinely and directly affected'
                },
                false_urgency: {
                    id: 'false_urgency',
                    name: 'False Urgency',
                    icon: '⏰',
                    color: '#ef6c00',
                    description: 'Creates artificial time pressure to prevent careful deliberation and force hasty decisions.',
                    implication: 'Prevents thoughtful evaluation by implying that delay equals failure, even when no real deadline exists.',
                    suggestion: 'Ask what evidence exists for the claimed deadline and whether careful consideration would actually cause harm.',
                    examples: 'Instead of "act now before it\'s too late" → "this decision would benefit from timely attention because..."',
                    settingKey: 'highlightEmotionalUrgency',
                    statKey: 'emotionalUrgencyCount',
                    basicTip: 'Artificial time pressure that prevents careful deliberation.',
                    whenConcerning: 'When urgency is manufactured to prevent careful thought',
                    whenAcceptable: 'When genuine deadlines exist and are supported by evidence'
                }
            }
        },
        
        GASLIGHTING: {
            id: 'gaslighting',
            name: 'Gaslighting',
            description: 'Phrases that undermine perception and memory',
            category: 'manipulation',
            color: '#800000',
            className: 'bias-highlight-gaslighting',
            settingKey: 'highlightGaslighting',
            statKey: 'gaslightingCount',
            enabled: true,
            tooltip: 'Language that questions reality and undermines confidence',
            basicTip: 'Language that questions reality and undermines confidence',
            whenConcerning: 'When systematically undermining perception and memory',
            whenAcceptable: 'When providing genuine corrections with evidence',
            lookFor: [
                'Is this undermining confidence?',
                'Is this questioning reality without evidence?',
                'Is this part of a pattern?',
                'Are corrections supported by evidence?'
            ],
            examples: {
                problematic: [
                    'that never happened',
                    'the public is misremembering the facts',
                    'concerns about this are overblown',
                    'people who believe this are confused',
                    'that\'s not what the record shows'
                ],
                acceptable: [
                    'I have a different recollection',
                    'the evidence shows otherwise',
                    'according to the records',
                    'the response may be disproportionate to the data',
                    'let me clarify what was meant'
                ]
            },
            contextualGuidance: {
                academic: 'Concerning when dismissing research or findings without evidence',
                news: 'Red flag when systematically undermining credible sources',
                opinion: 'Watch for patterns of reality-questioning language',
                instructions: 'Generally inappropriate unless providing evidence-based corrections'
            },
            subCategories: {
                reality_denial: {
                    id: 'reality_denial',
                    name: 'Reality Denial',
                    icon: '🚫',
                    color: '#b71c1c',
                    description: 'Direct denial that events occurred or facts exist, attacking objective reality itself.',
                    implication: 'The strongest form of gaslighting — attempts to make the target doubt their own perception of verified events.',
                    suggestion: 'Check independent records, documents, or witnesses. Trust verifiable evidence over assertions.',
                    examples: 'Instead of "that never happened" → "I have a different recollection — let\'s check the record"',
                    settingKey: 'highlightGaslightingReality',
                    statKey: 'gaslightingRealityCount',
                    basicTip: 'Direct denial of facts or events — the strongest form of gaslighting.',
                    whenConcerning: 'When denying documented or widely witnessed events',
                    whenAcceptable: 'Rarely — reality denial is almost always manipulative'
                },
                emotional_invalidation: {
                    id: 'emotional_invalidation',
                    name: 'Emotional Invalidation',
                    icon: '💢',
                    color: '#6a1b9a',
                    description: 'Dismissing emotional responses as irrational or disproportionate to undermine confidence in one\'s own feelings.',
                    implication: 'Teaches the target to distrust their own emotional responses, making them more dependent on the gaslighter\'s framing.',
                    suggestion: 'Your emotional responses are valid data. Evaluate the situation independently of how others characterize your reaction.',
                    examples: 'Instead of "you\'re overreacting" → "I see this differently — can we discuss our perspectives?"',
                    settingKey: 'highlightGaslightingInvalidation',
                    statKey: 'gaslightingInvalidationCount',
                    basicTip: 'Dismissing emotional responses as irrational or disproportionate.',
                    whenConcerning: 'When used to silence legitimate concerns or feelings',
                    whenAcceptable: 'When genuinely helping someone recognize a cognitive distortion, with care and evidence'
                },
                memory_manipulation: {
                    id: 'memory_manipulation',
                    name: 'Memory Manipulation',
                    icon: '🧠',
                    color: '#00838f',
                    description: 'Undermining confidence in one\'s own memory to replace recollections with a preferred narrative.',
                    implication: 'Erodes trust in episodic memory, making the target increasingly reliant on the manipulator\'s version of events.',
                    suggestion: 'Keep written records. Check notes, emails, or texts. Verify with other witnesses when possible.',
                    examples: 'Instead of "you\'re misremembering" → "my recollection differs — let\'s look at the meeting notes"',
                    settingKey: 'highlightGaslightingMemory',
                    statKey: 'gaslightingMemoryCount',
                    basicTip: 'Language that undermines confidence in one\'s own memory.',
                    whenConcerning: 'When used to replace someone\'s recollection with a preferred narrative',
                    whenAcceptable: 'When providing documented evidence of a genuine misunderstanding'
                },
                credibility_attack: {
                    id: 'credibility_attack',
                    name: 'Credibility Attack',
                    icon: '🎯',
                    color: '#e65100',
                    description: 'Attacking the person\'s mental fitness, judgment, or competence rather than addressing their actual argument.',
                    implication: 'Ad hominem disguised as concern — undermines self-confidence to make the target doubt their own perceptions.',
                    suggestion: 'Evaluate the ARGUMENT being made, not the personal attack. Competence attacks do not address substance.',
                    examples: 'Instead of "you\'re being paranoid" → "I don\'t see the same pattern — here\'s why..."',
                    settingKey: 'highlightGaslightingCredibility',
                    statKey: 'gaslightingCredibilityCount',
                    basicTip: 'Attacking mental fitness or judgment instead of addressing the argument.',
                    whenConcerning: 'When personal attacks substitute for addressing the actual argument',
                    whenAcceptable: 'Rarely — credibility attacks almost always avoid the substantive issue'
                },
                deflection: {
                    id: 'deflection',
                    name: 'Deflection',
                    icon: '↩️',
                    color: '#546e7a',
                    description: 'Redirecting attention away from the actual issue to avoid accountability or addressing the concern.',
                    implication: 'Prevents resolution by continually shifting focus, leaving the original concern unaddressed.',
                    suggestion: 'Ask: has the original concern been addressed? Return focus to the specific issue at hand.',
                    examples: 'Instead of "what about when you..." → "I hear your point about X, and I also want to address Y"',
                    settingKey: 'highlightGaslightingDeflection',
                    statKey: 'gaslightingDeflectionCount',
                    basicTip: 'Redirecting attention to avoid addressing the actual concern.',
                    whenConcerning: 'When topic changes prevent addressing the original issue',
                    whenAcceptable: 'When genuinely raising a relevant related issue while still addressing the original'
                }
            }
        },
        
        FALSE_DILEMMA: {
            id: 'falsedilemma',
            name: 'False Dilemmas',
            description: 'Language that forces artificial binary choices',
            category: 'manipulation',
            color: '#9400d3',
            className: 'bias-highlight-falsedilemma',
            settingKey: 'highlightFalseDilemma',
            statKey: 'falseDilemmaCount',
            enabled: true,
            tooltip: 'Forcing false either/or choices',
            basicTip: 'Forcing false either/or choices',
            whenConcerning: 'When complex issues are reduced to binary choices',
            whenAcceptable: 'When choices are genuinely binary or in decision contexts',
            lookFor: [
                'Are there other options?',
                'Is this oversimplifying a complex issue?',
                'Are middle ground positions ignored?',
                'Is this a genuine binary choice?'
            ],
            examples: {
                problematic: [
                    'either you\'re with us or against us',
                    'pick a side',
                    'all or nothing',
                    'love it or leave it',
                    'you\'re part of the solution or part of the problem'
                ],
                acceptable: [
                    'vote yes or no',
                    'accept or decline the offer',
                    'turn left or right',
                    'on or off',
                    'guilty or not guilty'
                ]
            },
            contextualGuidance: {
                academic: 'Concerning when complex research questions are oversimplified',
                news: 'Red flag when nuanced issues are presented as binary',
                opinion: 'Common rhetorical device but often misleading',
                instructions: 'Appropriate only when choices are genuinely binary'
            }
        },
        
        PROBABILITY: {
            id: 'probability',
            name: 'Probability Perception',
            description: 'Vague probability language that distorts risk perception',
            category: 'advanced',
            color: '#4169e1',
            className: 'bias-highlight-probability',
            settingKey: 'highlightProbability',
            statKey: 'probabilityCount',
            enabled: true,
            tooltip: 'Vague probability language that creates misperception of risk',
            basicTip: 'Vague probability language that creates misperception of risk',
            whenConcerning: 'When vague probability terms substitute for specific data or create false impressions',
            whenAcceptable: 'When uncertainty is genuine and specific data unavailable, with proper caveats',
            lookFor: [
                'Is this hiding actual data?',
                'Could this mislead about real risks?',
                'Is the vagueness appropriate to the context?',
                'Are people equipped to make informed decisions?'
            ],
            examples: {
                problematic: [
                    'highly unlikely side effects (without rates)',
                    'remote possibility of problems',
                    'very safe procedure (no statistics)',
                    'rare complications (undefined)',
                    'minimal risk involved'
                ],
                acceptable: [
                    '5% chance of side effects',
                    'occurs in 1 in 10,000 cases',
                    'uncertain due to limited data',
                    'preliminary results suggest...',
                    'confidence interval: 2-8%'
                ]
            },
            contextualGuidance: {
                academic: 'Concerning when vague terms replace statistical data in research reporting',
                news: 'Red flag when probability language downplays or exaggerates actual risks',
                opinion: 'Watch for vague probability used to support arguments without evidence',
                instructions: 'Generally inappropriate for safety-critical information without specific data'
            }
        }
    };
    
    // Excellence detection types
    static EXCELLENCE_TYPES = {
        ATTRIBUTION: {
            id: 'attribution',
            name: 'Clear Attribution',
            description: 'Specific, verifiable sources',
            className: 'excellence-attribution',
            settingKey: 'highlightAttributionExcellence',
            statKey: 'attributionExcellenceCount',
            enabled: true,
            basicTip: 'Specific, verifiable sources that build trust and accountability',
            whenExcellent: 'When sources are named, dated, and easily verifiable by readers',
            howToEnhance: 'Add page numbers, direct links, or timestamps to make sources even more accessible',
            examples: {
                excellent: ['According to Smith et al. (2023, p. 45)', 'The WHO reported on March 15, 2024', 'Dr. Johnson from Harvard Medical School stated'],
                enhance: ['Add DOI links for academic papers', 'Include specific page numbers', 'Provide direct URLs when possible']
            },
            lookFor: [
                'Named authors and publications',
                'Specific dates and page numbers',
                'Institutional affiliations',
                'Direct quotes with citations'
            ]
        },
        NUANCE: {
            id: 'nuance',
            name: 'Nuanced Language',
            description: 'Acknowledges complexity',
            className: 'excellence-nuance',
            settingKey: 'highlightNuanceExcellence',
            statKey: 'nuanceExcellenceCount',
            enabled: true,
            basicTip: 'Language that acknowledges complexity and avoids oversimplification',
            whenExcellent: 'When acknowledging multiple perspectives, limitations, or contextual factors',
            howToEnhance: 'Continue showing complexity while keeping main arguments clear and accessible',
            examples: {
                excellent: ['While generally true, exceptions include...', 'This trend shows X, though Y factors also influence...', 'The relationship appears complex because...'],
                enhance: ['Explain why something is complex', 'Acknowledge competing theories', 'Show how context matters']
            },
            lookFor: [
                'Conditional language (might, could, seems)',
                'Acknowledgment of exceptions',
                'Recognition of multiple factors',
                'Context-dependent statements'
            ]
        },
        TRANSPARENCY: {
            id: 'transparency',
            name: 'Transparent Communication',
            description: 'Clear about limitations',
            className: 'excellence-transparency',
            settingKey: 'highlightTransparencyExcellence',
            statKey: 'transparencyExcellenceCount',
            enabled: true,
            basicTip: 'Open communication about limitations, biases, and uncertainties',
            whenExcellent: 'When openly discussing methodology, limitations, or potential biases',
            howToEnhance: 'Consider discussing funding sources, methodology details, or personal stakes',
            examples: {
                excellent: ['This analysis has limitations...', 'I should note my background in X might influence...', 'The data is preliminary and requires further research'],
                enhance: ['Explain specific limitations', 'Disclose conflicts of interest', 'Discuss methodology constraints']
            },
            lookFor: [
                'Acknowledgment of limitations',
                'Discussion of uncertainty',
                'Methodological transparency',
                'Bias acknowledgment'
            ]
        },
        DISCOURSE: {
            id: 'discourse',
            name: 'Constructive Discourse',
            description: 'Encourages dialogue',
            className: 'excellence-discourse',
            settingKey: 'highlightDiscourseExcellence',
            statKey: 'discourseExcellenceCount',
            enabled: true,
            basicTip: 'Language that encourages dialogue and acknowledges other perspectives',
            whenExcellent: 'When inviting input, acknowledging others\' views, or building on ideas constructively',
            howToEnhance: 'Ask specific questions or provide clear ways for others to contribute to the discussion',
            examples: {
                excellent: ['What do you think about...?', 'Others might argue...', 'Building on Sarah\'s point...', 'I\'d value your perspective on...'],
                enhance: ['Ask specific follow-up questions', 'Acknowledge opposing viewpoints fairly', 'Invite concrete suggestions']
            },
            lookFor: [
                'Questions inviting input',
                'Acknowledgment of others\' contributions',
                'Building on others\' ideas',
                'Fair representation of different views'
            ]
        },
        EVIDENCE: {
            id: 'evidence',
            name: 'Evidence-Based',
            description: 'Supported by data',
            className: 'excellence-evidence',
            settingKey: 'highlightEvidenceExcellence',
            statKey: 'evidenceExcellenceCount',
            enabled: true,
            basicTip: 'Claims supported by specific evidence, data, or research',
            whenExcellent: 'When providing quantified data, citing specific studies, or linking claims to evidence',
            howToEnhance: 'Explain why the evidence supports your claims and discuss any limitations in the data',
            examples: {
                excellent: ['Data from the 2023 survey shows 67% of respondents...', 'Three peer-reviewed studies demonstrate...', 'The methodology involved 1,200 participants over 6 months'],
                enhance: ['Explain statistical significance', 'Discuss sample representativeness', 'Compare with other studies']
            },
            lookFor: [
                'Specific percentages and numbers',
                'Named studies and datasets',
                'Methodological details',
                'Peer-reviewed sources'
            ]
        }
    };

    static CATEGORIES = {
        basic: {
            name: 'Basic Detection',
            description: 'Fundamental bias indicators',
            icon: '🔍',
            expanded: true
        },
        advanced: {
            name: 'Advanced Detection',
            description: 'Sophisticated linguistic patterns',
            icon: '🧠',
            expanded: false
        },
        framing: {
            name: 'Framing & Rhetoric',
            description: 'How issues are presented',
            icon: '🎭',
            expanded: false
        },
        manipulation: {
            name: 'Manipulation Tactics',
            description: 'Techniques designed to mislead',
            icon: '⚠️',
            expanded: false
        }
    };

    static getDefaultSettings() {
        const settings = {
            enableAnalysis: true,
            analysisMode: 'balanced' // 'problems', 'excellence', or 'balanced'
        };

        for (const [key, config] of Object.entries(this.BIAS_TYPES)) {
            settings[config.settingKey] = config.enabled;
            if (config.subCategories) {
                for (const sub of Object.values(config.subCategories)) {
                    settings[sub.settingKey] = config.enabled;
                }
            }
        }
        
        // Add all excellence type settings
        for (const [key, config] of Object.entries(this.EXCELLENCE_TYPES)) {
            settings[config.settingKey] = config.enabled;
        }

        return settings;
    }

    static getSettingsByCategory() {
        const categorized = {};
        
        for (const category of Object.keys(this.CATEGORIES)) {
            categorized[category] = [];
        }

        for (const [key, config] of Object.entries(this.BIAS_TYPES)) {
            if (categorized[config.category]) {
                categorized[config.category].push(config);
            }
        }

        return categorized;
    }

    static getBiasTypeConfig(id) {
        return Object.values(this.BIAS_TYPES).find(config => config.id === id);
    }

    static getAllBiasTypes() {
        return Object.values(this.BIAS_TYPES);
    }

    static getEnabledBiasTypes(settings) {
        return Object.values(this.BIAS_TYPES).filter(
            config => settings[config.settingKey]
        );
    }

    static hasSubCategories(biasTypeId) {
        const config = this.getBiasTypeConfig(biasTypeId);
        return config && config.subCategories && Object.keys(config.subCategories).length > 0;
    }

    static getSubCategories(biasTypeId) {
        const config = this.getBiasTypeConfig(biasTypeId);
        return (config && config.subCategories) ? config.subCategories : {};
    }

    static getSubCategory(biasTypeId, subCategoryId) {
        return this.getSubCategories(biasTypeId)[subCategoryId] || null;
    }

    static resolveType(compositeType) {
        for (const config of Object.values(this.BIAS_TYPES)) {
            if (config.id === compositeType) return { parentId: config.id, subCategoryId: null };
            if (config.subCategories) {
                for (const subId of Object.keys(config.subCategories)) {
                    if (`${config.id}_${subId}` === compositeType) {
                        return { parentId: config.id, subCategoryId: subId };
                    }
                }
            }
        }
        return { parentId: compositeType, subCategoryId: null };
    }

    static getCompositeType(parentId, subCategoryId) {
        return subCategoryId ? `${parentId}_${subCategoryId}` : parentId;
    }

    static createEmptyStats() {
        const stats = { healthScore: 50 };
        for (const config of Object.values(this.BIAS_TYPES)) {
            stats[config.statKey] = 0;
            if (config.subCategories) {
                for (const sub of Object.values(config.subCategories)) {
                    stats[sub.statKey] = 0;
                }
            }
        }
        for (const config of Object.values(this.EXCELLENCE_TYPES)) {
            stats[config.statKey] = 0;
        }
        return stats;
    }

    static validateSettings(settings) {
        const validated = { ...this.getDefaultSettings() };
        
        // Validate each setting
        for (const [key, value] of Object.entries(settings)) {
            if (key === 'enableAnalysis' || key === 'analysisMode') {
                validated[key] = key === 'analysisMode' ? value : Boolean(value);
            } else if (Object.values(this.BIAS_TYPES).some(config => {
                        if (config.settingKey === key) return true;
                        if (config.subCategories) {
                            return Object.values(config.subCategories).some(sub => sub.settingKey === key);
                        }
                        return false;
                      }) ||
                      Object.values(this.EXCELLENCE_TYPES).some(config => config.settingKey === key)) {
                validated[key] = Boolean(value);
            }
        }
        
        return validated;
    }

    // Performance settings
    static PERFORMANCE = {
        BATCH_SIZE: 50,
        MUTATION_DEBOUNCE: 1000,
        MAX_TEXT_LENGTH: 10000,
        MIN_SIGNIFICANT_TEXT: 5,
        UI_UPDATE_INTERVAL: 200
    };
}

// Export specific configurations for easy access
export const BIAS_TYPES = BiasConfig.BIAS_TYPES;
export const CATEGORIES = BiasConfig.CATEGORIES;
export const PERFORMANCE = BiasConfig.PERFORMANCE;

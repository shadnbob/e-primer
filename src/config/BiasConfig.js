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
                    'violence is never the answer',
                    'government is the enemy'
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
        
        // Advanced Detection (disabled by default)
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
            tooltip: 'Language that makes readers accept premises without realizing it',
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
        
        // Framing & Rhetoric (disabled by default)
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
            }
        },
        
        // Manipulation Tactics (disabled by default)
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
                    'you\'re overreacting',
                    'you\'re imagining things',
                    'you\'re being too sensitive',
                    'that\'s not what I said'
                ],
                acceptable: [
                    'I have a different recollection',
                    'the evidence shows otherwise',
                    'according to the records',
                    'that seems disproportionate',
                    'let me clarify what I meant'
                ]
            },
            contextualGuidance: {
                academic: 'Concerning when dismissing research or findings without evidence',
                news: 'Red flag when systematically undermining credible sources',
                opinion: 'Watch for patterns of reality-questioning language',
                instructions: 'Generally inappropriate unless providing evidence-based corrections'
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

        // Add all bias type settings with their default enabled state
        for (const [key, config] of Object.entries(this.BIAS_TYPES)) {
            settings[config.settingKey] = config.enabled;
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

    static createEmptyStats() {
        const stats = { healthScore: 50 };
        // Add bias stats
        for (const config of Object.values(this.BIAS_TYPES)) {
            stats[config.statKey] = 0;
        }
        // Add excellence stats
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
            } else if (Object.values(this.BIAS_TYPES).some(config => config.settingKey === key) ||
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

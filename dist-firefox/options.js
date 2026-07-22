(() => {
  // src/config/BiasConfig.js
  var BiasConfig = class {
    static BIAS_TYPES = {
      // Basic Detection (enabled by default)
      OPINION: {
        id: "opinion",
        name: "Opinion Words",
        description: "Subjective language and evaluative terms",
        category: "basic",
        color: "#ff8c00",
        className: "bias-highlight-opinion",
        settingKey: "highlightOpinion",
        statKey: "opinionCount",
        enabled: true,
        tooltip: "Subjective language that reveals the writer's stance",
        basicTip: "Subjective language that reveals the writer's stance",
        whenConcerning: "When presented as fact or without supporting evidence",
        whenAcceptable: "When clearly marked as opinion or expert assessment in their domain",
        lookFor: [
          "Is this presented as fact?",
          "Is there supporting evidence?",
          "Is this expert opinion in their field?",
          "Is the subjectivity acknowledged?"
        ],
        examples: {
          problematic: [
            "obviously the best solution",
            "terrible policy (stated as fact)",
            "clearly demonstrates",
            "undeniably effective",
            "brilliant strategy (without context)"
          ],
          acceptable: [
            "In my opinion, this is effective",
            "Dr. Johnson considers this promising",
            "I find this approach compelling",
            "Critics argue this is problematic",
            "The author suggests this is beneficial"
          ]
        },
        contextualGuidance: {
          academic: "Concerning when evaluative language is used without proper qualification",
          news: "Red flag when opinion words are used in supposedly objective reporting",
          opinion: "Expected, but should be clearly distinguished from factual claims",
          instructions: "Generally inappropriate unless describing user experience or preferences"
        },
        subCategories: {
          certainty: {
            id: "certainty",
            name: "Certainty/Conviction",
            icon: "\u{1F3AF}",
            color: "#ff6b6b",
            description: "Words that push readers toward unquestioning acceptance by conveying false certainty about debatable topics.",
            implication: "Creates false authority and discourages critical thinking by presenting opinions as indisputable facts.",
            suggestion: "Use more tentative language that acknowledges uncertainty and invites evaluation.",
            examples: 'Instead of "obviously wrong" \u2192 "appears to contradict" or "I believe this is incorrect"',
            settingKey: "highlightOpinionCertainty",
            statKey: "opinionCertaintyCount",
            basicTip: "Words that push readers toward unquestioning acceptance by conveying false certainty about debatable topics.",
            whenConcerning: "When presenting debatable positions as settled fact",
            whenAcceptable: "When stating truly established facts"
          },
          hedging: {
            id: "hedging",
            name: "Hedging/Uncertainty",
            icon: "\u2753",
            color: "#ffa726",
            description: "Words that create unnecessary doubt or vagueness, often to avoid taking responsibility for claims.",
            implication: "Undermines confidence and can signal the writer is unsure of their position or trying to avoid accountability.",
            suggestion: "Be more definitive when you have evidence, or explain the specific reasons for uncertainty.",
            examples: 'Instead of "maybe true" \u2192 "requires further investigation" or "preliminary evidence suggests"',
            settingKey: "highlightOpinionHedging",
            statKey: "opinionHedgingCount",
            basicTip: "Words that create unnecessary doubt or vagueness, often to avoid taking responsibility for claims.",
            whenConcerning: "When avoiding accountability for claims that have evidence",
            whenAcceptable: "When genuinely uncertain and expressing honest doubt"
          },
          evaluative_positive: {
            id: "evaluative_positive",
            name: "Positive Evaluation",
            icon: "\u{1F44D}",
            color: "#66bb6a",
            description: "Subjective positive judgments that reveal the writer's approval without objective criteria.",
            implication: "Biases readers toward positive evaluation without providing evidence or reasoning for the judgment.",
            suggestion: "Replace with specific, measurable criteria or acknowledge the subjective nature of the evaluation.",
            examples: 'Instead of "excellent performance" \u2192 "achieved 95% accuracy" or "I consider this performance strong because..."',
            settingKey: "highlightOpinionEvaluativePositive",
            statKey: "opinionEvaluativePositiveCount",
            basicTip: "Subjective positive judgments that reveal the writer's approval without objective criteria.",
            whenConcerning: "When positive evaluation is presented without supporting evidence",
            whenAcceptable: "When clearly framed as personal opinion with reasoning"
          },
          evaluative_negative: {
            id: "evaluative_negative",
            name: "Negative Evaluation",
            icon: "\u{1F44E}",
            color: "#ef5350",
            description: "Subjective negative judgments that reveal the writer's disapproval without objective criteria.",
            implication: "Biases readers toward negative evaluation without providing evidence or reasoning for the judgment.",
            suggestion: "Replace with specific, measurable criteria or acknowledge the subjective nature of the evaluation.",
            examples: 'Instead of "poor quality" \u2192 "failed to meet safety standards" or "I find this concerning because..."',
            settingKey: "highlightOpinionEvaluativeNegative",
            statKey: "opinionEvaluativeNegativeCount",
            basicTip: "Subjective negative judgments that reveal the writer's disapproval without objective criteria.",
            whenConcerning: "When negative evaluation is presented without supporting evidence",
            whenAcceptable: "When clearly framed as personal opinion with reasoning"
          },
          emotional_charge: {
            id: "emotional_charge",
            name: "Emotional Charge",
            icon: "\u26A1",
            color: "#ab47bc",
            description: "Words designed to trigger strong emotional responses that bypass logical evaluation.",
            implication: "Manipulates readers through emotion rather than reason, potentially clouding judgment.",
            suggestion: "Use neutral language that allows readers to form their own emotional responses based on facts.",
            examples: 'Instead of "heartwarming story" \u2192 "story about community support" or "horrifying event" \u2192 "traumatic incident"',
            settingKey: "highlightOpinionEmotionalCharge",
            statKey: "opinionEmotionalChargeCount",
            basicTip: "Words designed to trigger strong emotional responses that bypass logical evaluation.",
            whenConcerning: "When emotional language substitutes for factual reporting",
            whenAcceptable: "When describing genuinely emotional situations with appropriate context"
          },
          comparative: {
            id: "comparative",
            name: "Comparative/Superlative",
            icon: "\u{1F4CA}",
            color: "#42a5f5",
            description: "Words that create artificial rankings or comparisons without context or criteria.",
            implication: "Establishes hierarchies without justification, potentially misleading readers about relative importance or quality.",
            suggestion: "Provide specific criteria for comparison or use measured language that acknowledges context.",
            examples: 'Instead of "the best solution" \u2192 "an effective solution" or "the most efficient approach we tested"',
            settingKey: "highlightOpinionComparative",
            statKey: "opinionComparativeCount",
            basicTip: "Words that create artificial rankings or comparisons without context or criteria.",
            whenConcerning: "When rankings lack criteria or context",
            whenAcceptable: "When based on specific, measurable criteria"
          },
          political_framing: {
            id: "political_framing",
            name: "Political Framing",
            icon: "\u{1F3DB}\uFE0F",
            color: "#8d6e63",
            description: "Words that frame issues in political terms, potentially polarizing neutral topics.",
            implication: "Activates political identity and tribal thinking, making objective evaluation more difficult.",
            suggestion: "Use neutral, descriptive language that focuses on specific policies or actions rather than political labels.",
            examples: 'Instead of "radical proposal" \u2192 "proposal that differs significantly from current policy" or describe specific elements',
            settingKey: "highlightOpinionPoliticalFraming",
            statKey: "opinionPoliticalFramingCount",
            basicTip: "Words that frame issues in political terms, potentially polarizing neutral topics.",
            whenConcerning: "When political labels replace substantive analysis",
            whenAcceptable: "When discussing actual political positions or platforms"
          },
          intensifiers: {
            id: "intensifiers",
            name: "Intensifiers",
            icon: "\u{1F525}",
            color: "#ff7043",
            description: "Words that amplify or exaggerate without adding meaningful information.",
            implication: "Creates artificial emphasis that can distort the actual significance of events or characteristics.",
            suggestion: "Use specific, measurable descriptions or remove unnecessary intensification.",
            examples: 'Instead of "extremely important" \u2192 "critical for project success" or "increased by 300%"',
            settingKey: "highlightOpinionIntensifiers",
            statKey: "opinionIntensifiersCount",
            basicTip: "Words that amplify or exaggerate without adding meaningful information.",
            whenConcerning: "When intensifiers substitute for specific evidence",
            whenAcceptable: "When emphasis is proportionate and supported by evidence"
          },
          credibility_undermining: {
            id: "credibility_undermining",
            name: "Credibility Undermining",
            icon: "\u{1F5E3}\uFE0F",
            color: "#78909c",
            description: "Words that question or attack credibility without providing evidence or reasoning.",
            implication: "Weakens trust in sources through insinuation rather than substantive critique.",
            suggestion: "Address specific claims with evidence rather than attacking the source's credibility.",
            examples: 'Instead of "so-called expert" \u2192 "Dr. Smith, whose methodology differs from mainstream approaches" or address specific claims',
            settingKey: "highlightOpinionCredibilityUndermining",
            statKey: "opinionCredibilityUnderminingCount",
            basicTip: "Words that question or attack credibility without providing evidence or reasoning.",
            whenConcerning: "When attacking credibility without addressing the actual claims",
            whenAcceptable: "When raising legitimate questions about methodology or credentials"
          },
          loaded_political: {
            id: "loaded_political",
            name: "Loaded Political Terms",
            icon: "\u2696\uFE0F",
            color: "#5d4037",
            description: "Words that carry heavy political or ideological baggage, triggering partisan responses.",
            implication: "Activates political identity and bias, making neutral evaluation difficult.",
            suggestion: "Use specific, descriptive language that focuses on actions or policies rather than loaded terms.",
            examples: 'Instead of "socialist policies" \u2192 "government-funded programs" or "authoritarian regime" \u2192 "government that restricts civil liberties"',
            settingKey: "highlightOpinionLoadedPolitical",
            statKey: "opinionLoadedPoliticalCount",
            basicTip: "Words that carry heavy political or ideological baggage, triggering partisan responses.",
            whenConcerning: "When loaded terms replace substantive policy discussion",
            whenAcceptable: "When accurately describing self-identified political positions"
          },
          moral_judgments: {
            id: "moral_judgments",
            name: "Moral/Ethical Judgments",
            icon: "\u2696\uFE0F",
            color: "#7e57c2",
            description: "Words that impose moral frameworks without acknowledging their subjective nature.",
            implication: "Presents moral judgments as universal truths rather than perspective-dependent evaluations.",
            suggestion: "Acknowledge the subjective nature of moral judgments or specify the ethical framework being used.",
            examples: 'Instead of "immoral behavior" \u2192 "behavior that violates principle X" or "I consider this unethical because..."',
            settingKey: "highlightOpinionMoralJudgments",
            statKey: "opinionMoralJudgmentsCount",
            basicTip: "Words that impose moral frameworks without acknowledging their subjective nature.",
            whenConcerning: "When moral judgments are presented as objective facts",
            whenAcceptable: "When the ethical framework is explicitly stated"
          },
          emotional_appeals: {
            id: "emotional_appeals",
            name: "Emotional Appeals",
            icon: "\u{1F4AD}",
            color: "#26a69a",
            description: "Words that bypass logical evaluation by directly targeting emotional responses.",
            implication: "Manipulates emotional state to influence opinion without providing rational justification.",
            suggestion: "Focus on factual information that allows readers to form their own emotional responses.",
            examples: 'Instead of "promising developments" \u2192 "developments that may lead to improved outcomes" or provide specific evidence',
            settingKey: "highlightOpinionEmotionalAppeals",
            statKey: "opinionEmotionalAppealsCount",
            basicTip: "Words that bypass logical evaluation by directly targeting emotional responses.",
            whenConcerning: "When emotional appeals substitute for evidence-based arguments",
            whenAcceptable: "When emotions are relevant and accompanied by factual context"
          }
        }
      },
      TO_BE: {
        id: "tobe",
        name: "To-Be Verbs (E-Prime)",
        description: 'Forms of "to be" that can create false equivalencies',
        category: "basic",
        color: "#87ceeb",
        className: "bias-highlight-tobe",
        settingKey: "highlightToBe",
        statKey: "toBeCount",
        enabled: true,
        tooltip: 'E-Prime: Avoiding "to be" verbs for more precise language',
        basicTip: 'E-Prime: Avoiding "to be" verbs for more precise language',
        whenConcerning: "When creating false equivalence or stating identity inappropriately",
        whenAcceptable: "In definitions, classifications, essential descriptions",
        lookFor: [
          "Does this create false equivalence?",
          "Is this a definition?",
          "Is this stating identity?",
          "Could this be more precise?"
        ],
        examples: {
          problematic: [
            "success is hard work",
            "the problem is immigrants",
            "happiness is money",
            "the electron is a particle.",
            "the government is corrupt"
          ],
          acceptable: [
            "water is H2O",
            "this is a butterfly",
            "the meeting is at 3pm",
            "the document is 20 pages long",
            "the chemical formula is C6H12O6"
          ]
        },
        contextualGuidance: {
          academic: "Concerning when creating false equivalencies in research or analysis",
          news: "Watch for oversimplified identity statements about complex issues",
          opinion: "Common but can reveal oversimplified thinking about complex topics",
          instructions: "Acceptable for clear definitions and factual statements"
        }
      },
      ABSOLUTE: {
        id: "absolute",
        name: "Absolute Statements",
        description: "Universal quantifiers and categorical claims",
        category: "basic",
        color: "#ff69b4",
        className: "bias-highlight-absolute",
        settingKey: "highlightAbsolutes",
        statKey: "absoluteCount",
        enabled: true,
        tooltip: "Absolute terms that rarely reflect reality accurately",
        basicTip: "Absolute terms that rarely reflect reality accurately",
        whenConcerning: "When used for opinions, complex social issues, or persuasion",
        whenAcceptable: "For mathematical facts, scientific laws, logical definitions",
        lookFor: [
          "Is this factually absolute?",
          "Is this about a complex topic?",
          "Used for emphasis or fact?",
          "Are there any exceptions to this claim?"
        ],
        examples: {
          problematic: [
            "all politicians are corrupt",
            "everyone knows this",
            "nobody cares about the environment",
            "always leads to disaster",
            "never works in practice"
          ],
          acceptable: [
            "all triangles have three sides",
            "every participant signed consent",
            "always follow safety protocols",
            "never mix these chemicals",
            "all data must be verified"
          ]
        },
        contextualGuidance: {
          academic: "Acceptable for definitions and established facts; concerning for research claims",
          news: "Red flag when describing complex social or political issues",
          opinion: "Common but should be questioned - reality is usually more nuanced",
          instructions: "Appropriate for safety rules and procedural requirements"
        }
      },
      // Advanced Detection
      PASSIVE: {
        id: "passive",
        name: "Passive Voice",
        description: "Constructions that obscure who performs actions",
        category: "advanced",
        color: "#800080",
        className: "bias-highlight-passive",
        settingKey: "highlightPassive",
        statKey: "passiveCount",
        enabled: true,
        tooltip: "Passive voice can hide responsibility and agency",
        basicTip: "Passive voice can hide responsibility and agency",
        whenConcerning: "When the actor is missing or responsibility is being obscured",
        whenAcceptable: "In scientific writing, procedures, when actor is obvious from context",
        lookFor: [
          "Is the actor missing?",
          "Is responsibility being avoided?",
          'Look for "by [person/entity]"',
          "Is this appropriate for the context?"
        ],
        examples: {
          problematic: [
            "mistakes were made",
            "decisions were taken",
            "it was decided",
            "action will be taken"
          ],
          acceptable: [
            "was fired by the director",
            "samples were analyzed using standard methods",
            "the experiment was conducted by Smith et al.",
            "data was collected from participants"
          ]
        },
        contextualGuidance: {
          academic: "Passive voice is standard in scientific writing when methodology is more important than who performed it",
          news: "Be concerned when passive voice obscures accountability in events",
          opinion: "Watch for passive voice used to avoid taking responsibility for claims",
          instructions: "Acceptable when focusing on the action rather than the actor"
        }
      },
      WEASEL: {
        id: "weasel",
        name: "Weasel Words",
        description: "Vague attributions and unsupported claims",
        category: "advanced",
        color: "#b8860b",
        className: "bias-highlight-weasel",
        settingKey: "highlightWeasel",
        statKey: "weaselCount",
        enabled: true,
        tooltip: "Phrases that avoid specificity and concrete sources",
        basicTip: "Phrases that avoid specificity and concrete sources",
        whenConcerning: "When used without specific sources, citations, or evidence",
        whenAcceptable: "When followed by citations, named sources, or quantified data",
        lookFor: [
          "Are specific sources provided?",
          "Are there citations nearby?",
          "Is this quantified with actual data?",
          "Can the claim be verified?"
        ],
        examples: {
          problematic: [
            "experts believe",
            "studies show (without citation)",
            "many people say",
            "it is widely known",
            "sources indicate"
          ],
          acceptable: [
            "Johnson et al. (2023) found",
            "According to Dr. Smith from Harvard",
            "A 2023 study by the CDC showed",
            "The WHO reports that..."
          ]
        },
        contextualGuidance: {
          academic: "Always expect proper citations; weasel words indicate poor scholarship",
          news: "Acceptable when protecting sources, but should specify their expertise",
          opinion: "Watch for unsupported generalizations masquerading as fact",
          instructions: "Generally inappropriate unless referring to established consensus"
        },
        subCategories: {
          unnamed_sources: {
            id: "unnamed_sources",
            name: "Unnamed Sources",
            icon: "\u{1F464}",
            color: "#5d4037",
            description: "References to anonymous or vague sources that cannot be verified or held accountable.",
            implication: "Allows claims to appear sourced without any verifiable attribution, making fact-checking impossible.",
            suggestion: "Ask: WHO specifically said this? Name the person, organization, or publication.",
            examples: 'Instead of "sources indicate" \u2192 "a senior official at the EPA told Reuters"',
            settingKey: "highlightWeaselUnnamed",
            statKey: "weaselUnnamedCount",
            basicTip: "Vague source references that cannot be verified or held accountable.",
            whenConcerning: "When anonymous attribution is used for claims that could be verified",
            whenAcceptable: "When protecting whistleblowers or sources at genuine risk"
          },
          hedged_evidence: {
            id: "hedged_evidence",
            name: "Hedged Evidence",
            icon: "\u{1F4CB}",
            color: "#00838f",
            description: "References to evidence, research, or data without providing specific citations or details.",
            implication: "Creates an appearance of evidence-based reasoning while avoiding any verifiable claim.",
            suggestion: "Ask: WHICH study? Published WHERE? By WHOM? Provide the actual citation.",
            examples: 'Instead of "research suggests" \u2192 "a 2024 study by Smith et al. in Nature found..."',
            settingKey: "highlightWeaselHedged",
            statKey: "weaselHedgedCount",
            basicTip: "References to evidence without specific citations or details.",
            whenConcerning: "When vague evidence claims substitute for actual citations",
            whenAcceptable: "When summarizing a well-known body of research in informal contexts"
          },
          vague_quantifiers: {
            id: "vague_quantifiers",
            name: "Vague Quantifiers",
            icon: "\u{1F4CA}",
            color: "#7b1fa2",
            description: "Imprecise frequency or quantity words that avoid committing to specific numbers or rates.",
            implication: "Obscures actual rates and magnitudes, allowing the reader to imagine whatever quantity supports the argument.",
            suggestion: "Ask: HOW MANY exactly? Replace with specific numbers, percentages, or ranges.",
            examples: 'Instead of "in many cases" \u2192 "in 73% of cases" or "in 8 out of 12 trials"',
            settingKey: "highlightWeaselVague",
            statKey: "weaselVagueCount",
            basicTip: "Imprecise quantity words that avoid specific numbers.",
            whenConcerning: "When vague quantities substitute for available specific data",
            whenAcceptable: "When precise data is genuinely unavailable and the imprecision is acknowledged"
          },
          appeal_to_authority: {
            id: "appeal_to_authority",
            name: "Appeal to Authority",
            icon: "\u{1F393}",
            color: "#1565c0",
            description: "Invocations of unnamed experts or consensus to lend credibility without verifiable backing.",
            implication: "Borrows authority from unnamed or unqualified sources rather than presenting evidence directly.",
            suggestion: "Ask: Which SPECIFIC experts? In what FIELD? Is this their area of expertise?",
            examples: 'Instead of "experts believe" \u2192 "Dr. Chen, a climate scientist at MIT, found..."',
            settingKey: "highlightWeaselAuthority",
            statKey: "weaselAuthorityCount",
            basicTip: "Unnamed expert or consensus claims used to borrow credibility.",
            whenConcerning: "When unnamed authority substitutes for evidence or named experts",
            whenAcceptable: "When referring to genuinely established scientific consensus"
          },
          passive_attribution: {
            id: "passive_attribution",
            name: "Passive Attribution",
            icon: "\u{1F32B}\uFE0F",
            color: "#546e7a",
            description: "Qualifying words that distance the writer from claims, adding plausible deniability.",
            implication: "Lets the writer advance claims while retaining the ability to disown them if challenged.",
            suggestion: "Notice the writer is not committing to the claim \u2014 ask what they actually believe and why.",
            examples: 'Instead of "reportedly" \u2192 state the claim directly and cite the source',
            settingKey: "highlightWeaselPassive",
            statKey: "weaselPassiveCount",
            basicTip: "Qualifying words that add plausible deniability to claims.",
            whenConcerning: "When used to advance claims without accountability",
            whenAcceptable: "When genuinely reporting unverified information with appropriate caution"
          }
        }
      },
      PRESUPPOSITION: {
        id: "presupposition",
        name: "Presuppositions",
        description: "Words that smuggle in hidden assumptions",
        category: "advanced",
        color: "#ff1493",
        className: "bias-highlight-presupposition",
        settingKey: "highlightPresupposition",
        statKey: "presuppositionCount",
        enabled: true,
        tooltip: "Presupposition - Possibly swaying readers to accept premises without realizing it",
        basicTip: "Language that possibly attempts to make readers accept premises without realizing it",
        whenConcerning: "When forcing acceptance of debatable premises",
        whenAcceptable: "Used for emphasis without hidden assumptions",
        lookFor: [
          "What assumption is being smuggled in?",
          "Is this hiding a premise?",
          "Is the assumption fair and accurate?",
          "Does this force acceptance of a debatable point?"
        ],
        examples: {
          problematic: [
            "even scientists admit climate change is debatable",
            "still refuses to apologize",
            "another failed attempt",
            "admits that the policy failed",
            "continues to ignore the evidence"
          ],
          acceptable: [
            "even beginners can understand",
            "still working on the project",
            "another successful implementation",
            "admits the challenge is complex",
            "continues to research the topic"
          ]
        },
        contextualGuidance: {
          academic: "Concerning when smuggling in unproven premises or biased assumptions",
          news: "Red flag when loaded language assumes guilt, failure, or disputed facts",
          opinion: "Common rhetorical device, but readers should identify hidden assumptions",
          instructions: "Generally inappropriate as it can confuse or mislead"
        }
      },
      // Framing & Rhetoric
      METAPHOR: {
        id: "metaphor",
        name: "War Metaphors",
        description: "Militaristic language for non-military topics",
        category: "framing",
        color: "#dc143c",
        className: "bias-highlight-metaphor",
        settingKey: "highlightMetaphors",
        statKey: "metaphorCount",
        enabled: true,
        tooltip: "Military metaphors that frame issues as conflicts",
        basicTip: "Military metaphors that frame issues as conflicts",
        whenConcerning: "When framing complex social issues as battles or wars",
        whenAcceptable: "In sports, competitive contexts, or when discussing actual conflicts",
        lookFor: [
          "Is this about actual conflict?",
          "Does this create us-vs-them thinking?",
          "Is this oversimplifying a complex issue?",
          "Are there better metaphors available?"
        ],
        examples: {
          problematic: [
            "war on drugs",
            "battle against poverty",
            "attacking the opposition",
            "defeat climate change",
            "enemy of the people"
          ],
          acceptable: [
            "battle for the championship",
            "war strategy game",
            "attacking the goal",
            "defeated the defending champions",
            "enemy forces in the conflict"
          ]
        },
        contextualGuidance: {
          academic: "Concerning when used to describe research, policy, or social issues",
          news: "Red flag when describing politics, social issues, or policy debates",
          opinion: "Common but can polarize and oversimplify complex topics",
          instructions: "Generally inappropriate unless describing competitive scenarios"
        }
      },
      MINIMIZER: {
        id: "minimizer",
        name: "Minimizers",
        description: "Language that downplays significance",
        category: "framing",
        color: "#008080",
        className: "bias-highlight-minimizer",
        settingKey: "highlightMinimizers",
        statKey: "minimizerCount",
        enabled: true,
        tooltip: "Words that may dismiss or trivialize legitimate concerns",
        basicTip: "Words that may dismiss or trivialize legitimate concerns",
        whenConcerning: "When dismissing legitimate problems or complex issues",
        whenAcceptable: "In instructions, simplification for clarity, or appropriate emphasis",
        lookFor: [
          "Is this dismissing concerns?",
          "Is this clarifying or instructing?",
          "Is the minimization appropriate?",
          "Are serious issues being trivialized?"
        ],
        examples: {
          problematic: [
            "just ignore the problem",
            "only a minor issue (about serious matters)",
            "merely a small concern",
            "slightly problematic (about major issues)",
            "trivial complaint"
          ],
          acceptable: [
            "just click the button",
            "simply follow these steps",
            "only takes a minute",
            "merely requires basic knowledge",
            "slightly adjust the settings"
          ]
        },
        contextualGuidance: {
          academic: "Concerning when minimizing research limitations or important findings",
          news: "Red flag when downplaying serious events or issues",
          opinion: "Watch for dismissal of legitimate concerns or opposing viewpoints",
          instructions: "Appropriate for simplifying complex procedures"
        }
      },
      MAXIMIZER: {
        id: "maximizer",
        name: "Maximizers",
        description: "Exaggeration and hyperbolic language",
        category: "framing",
        color: "#ff4500",
        className: "bias-highlight-maximizer",
        settingKey: "highlightMaximizers",
        statKey: "maximizerCount",
        enabled: true,
        tooltip: "Hyperbolic language that may create false urgency",
        basicTip: "Hyperbolic language that may create false urgency",
        whenConcerning: "When creating false urgency or exaggerating normal situations",
        whenAcceptable: "When describing genuinely extreme situations or for appropriate emphasis",
        lookFor: [
          "Is this genuinely extreme?",
          "Is this creating false urgency?",
          "Is this proportionate to the situation?",
          "Are there more measured terms available?"
        ],
        examples: {
          problematic: [
            "crisis of confidence (about minor issues)",
            "disaster of a meeting",
            "unprecedented challenges (for common problems)",
            "massive failure (for small mistakes)",
            "catastrophic consequences (for minor issues)"
          ],
          acceptable: [
            "natural disaster",
            "unprecedented pandemic",
            "massive earthquake",
            "catastrophic damage from the hurricane",
            "crisis response team"
          ]
        },
        contextualGuidance: {
          academic: "Concerning when exaggerating findings or research implications",
          news: "Red flag when sensationalizing normal events or minor issues",
          opinion: "Common for emphasis but can mislead about actual severity",
          instructions: "Generally inappropriate unless describing genuine emergencies"
        },
        subCategories: {
          scale_inflation: {
            id: "scale_inflation",
            name: "Scale Inflation",
            icon: "\u{1F4CF}",
            color: "#6a1b9a",
            description: "Words that inflate physical or numerical magnitude without comparative context.",
            implication: "Creates a false sense of scale by using extreme size language for things that may be moderate or normal.",
            suggestion: "Ask: compared to what baseline? Replace with specific measurements or comparisons.",
            examples: 'Instead of "massive increase" \u2192 "a 15% increase" or "an increase three times the annual average"',
            settingKey: "highlightMaximizerScale",
            statKey: "maximizerScaleCount",
            basicTip: "Extreme size language that inflates magnitude without context.",
            whenConcerning: "When size language lacks comparative context or specific measurements",
            whenAcceptable: "When describing genuinely large things with appropriate context"
          },
          catastrophizing: {
            id: "catastrophizing",
            name: "Catastrophizing",
            icon: "\u{1F6A8}",
            color: "#b71c1c",
            description: "Crisis and disaster language applied to situations that may not warrant emergency framing.",
            implication: "Triggers fear responses for non-emergency situations, distorting risk perception and urgency.",
            suggestion: "Ask: is this genuinely a crisis? Replace with proportionate language and specific impact data.",
            examples: 'Instead of "crisis" \u2192 "a growing concern" or "a problem affecting 5% of users"',
            settingKey: "highlightMaximizerCatastrophe",
            statKey: "maximizerCatastropheCount",
            basicTip: "Crisis and disaster language applied to non-emergency situations.",
            whenConcerning: "When crisis framing is applied to non-emergency situations",
            whenAcceptable: "When describing genuine crises, disasters, or emergencies"
          },
          dramatic_verbs: {
            id: "dramatic_verbs",
            name: "Dramatic Verbs",
            icon: "\u{1F4A5}",
            color: "#e65100",
            description: "Verbs that exaggerate the degree of change or destruction beyond what the facts support.",
            implication: "Replaces measured description with violent or extreme action language, distorting actual impact.",
            suggestion: "Ask: what are the actual numbers? Replace with precise verbs that describe the real magnitude.",
            examples: 'Instead of "costs skyrocketed" \u2192 "costs increased by 40%"',
            settingKey: "highlightMaximizerDramatic",
            statKey: "maximizerDramaticCount",
            basicTip: "Verbs that exaggerate the degree of change beyond what facts support.",
            whenConcerning: "When dramatic verbs substitute for specific measurements of change",
            whenAcceptable: "When the degree of change is genuinely extreme and supported by data"
          },
          superlative_hype: {
            id: "superlative_hype",
            name: "Superlative Hype",
            icon: "\u2728",
            color: "#1565c0",
            description: "Adjectives of extreme impressiveness that create false uniqueness or exceptionality.",
            implication: "Makes ordinary things sound extraordinary, inflating expectations and distorting significance.",
            suggestion: "Ask: unprecedented compared to what? Replace with specific evidence of what makes this notable.",
            examples: 'Instead of "unprecedented" \u2192 "the first since 2008" or "exceeds previous records by 12%"',
            settingKey: "highlightMaximizerSuperlative",
            statKey: "maximizerSuperlativeCount",
            basicTip: "Adjectives that create false uniqueness or exceptionality.",
            whenConcerning: "When superlatives lack comparative context or evidence",
            whenAcceptable: "When something is genuinely unprecedented with supporting evidence"
          },
          paradigm_shift: {
            id: "paradigm_shift",
            name: "Paradigm Shift",
            icon: "\u{1F504}",
            color: "#2e7d32",
            description: "Claims of transformative, game-changing impact that imply everything has fundamentally changed.",
            implication: "Overstates the significance of changes, implying a complete transformation when the reality may be incremental.",
            suggestion: "Ask: what specifically changed? Replace with concrete descriptions of what is different and how.",
            examples: 'Instead of "game changing" \u2192 "introduces a new approach to X that reduces cost by 30%"',
            settingKey: "highlightMaximizerParadigm",
            statKey: "maximizerParadigmCount",
            basicTip: "Claims of transformative impact that overstate significance.",
            whenConcerning: "When transformation claims lack specific evidence of what changed",
            whenAcceptable: "When describing genuinely transformative events with specific evidence"
          }
        }
      },
      // Manipulation Tactics
      FALSE_BALANCE: {
        id: "falsebalance",
        name: "False Balance",
        description: "Artificial balance between unequal positions",
        category: "manipulation",
        color: "#4b0082",
        className: "bias-highlight-falsebalance",
        settingKey: "highlightFalseBalance",
        statKey: "falseBalanceCount",
        enabled: true,
        tooltip: "Language that creates false equivalence between positions",
        basicTip: "Language that creates false equivalence between positions",
        whenConcerning: "When creating false equivalence between unequal positions",
        whenAcceptable: "When positions are genuinely equivalent or in neutral reporting",
        lookFor: [
          "Are these positions actually equivalent?",
          "Is one position more evidence-based?",
          "Is this creating false equivalence?",
          "Are different standards being applied?"
        ],
        examples: {
          problematic: [
            "both sides of the climate debate",
            "balanced view of vaccines",
            "two schools of thought on evolution",
            "fair and balanced reporting on science",
            "equal time for all perspectives"
          ],
          acceptable: [
            "both political candidates",
            "balanced approach to budget priorities",
            "two schools of thought on economic policy",
            "considering both options",
            "weighing different strategies"
          ]
        },
        contextualGuidance: {
          academic: "Concerning when treating well-established science as debatable",
          news: "Red flag when giving equal weight to fringe and mainstream views",
          opinion: "Watch for artificial balance on settled questions",
          instructions: "Generally inappropriate when facts are not in dispute"
        }
      },
      EUPHEMISM: {
        id: "euphemism",
        name: "Euphemisms",
        description: "Language that obscures harsh realities",
        category: "manipulation",
        color: "#006400",
        className: "bias-highlight-euphemism",
        settingKey: "highlightEuphemism",
        statKey: "euphemismCount",
        enabled: true,
        tooltip: "Euphemisms and dysphemisms that manipulate perception",
        basicTip: "Euphemisms and dysphemisms that manipulate perception",
        whenConcerning: "When obscuring harsh realities or manipulating perception",
        whenAcceptable: "When used for appropriate social courtesy or sensitivity",
        lookFor: [
          "Is this hiding harsh realities?",
          "Is this manipulating perception?",
          "Is this socially appropriate?",
          "What is the real meaning?"
        ],
        examples: {
          problematic: [
            "enhanced interrogation",
            "collateral damage",
            "rightsizing",
            "ethnic cleansing",
            "revenue enhancement"
          ],
          acceptable: [
            "passed away",
            "restroom",
            "between jobs",
            "differently abled",
            "let go"
          ]
        },
        contextualGuidance: {
          academic: "Concerning when obscuring the true nature of research findings",
          news: "Red flag when hiding the severity of events or issues",
          opinion: "Watch for language that softens or hardens perception unfairly",
          instructions: "Generally inappropriate unless for social sensitivity"
        },
        subCategories: {
          political_euphemism: {
            id: "political_euphemism",
            name: "Political Euphemism",
            icon: "\u{1F3DB}\uFE0F",
            color: "#5c6bc0",
            description: "Government and policy language that obscures controversial actions behind neutral-sounding terminology.",
            implication: "Conceals the true nature of government actions, making harmful policies harder to evaluate and oppose.",
            suggestion: "Replace with direct language that describes what actually happens.",
            examples: 'Instead of "enhanced interrogation" \u2192 "torture" or "coercive interrogation techniques"',
            settingKey: "highlightEuphemismPolitical",
            statKey: "euphemismPoliticalCount",
            basicTip: "Government language that obscures controversial actions behind neutral terminology.",
            whenConcerning: "When government or policy language hides the true nature of actions",
            whenAcceptable: "Rarely \u2014 political euphemisms almost always serve to obscure"
          },
          corporate_euphemism: {
            id: "corporate_euphemism",
            name: "Corporate Euphemism",
            icon: "\u{1F4BC}",
            color: "#78909c",
            description: "Business language that softens negative outcomes like job losses, price increases, and failures.",
            implication: "Disguises harm to workers, consumers, and communities behind professional-sounding jargon.",
            suggestion: "Use plain language that makes the impact on people clear.",
            examples: 'Instead of "rightsizing" \u2192 "laying off employees" or "cutting 200 jobs"',
            settingKey: "highlightEuphemismCorporate",
            statKey: "euphemismCorporateCount",
            basicTip: "Business language that softens negative outcomes like job losses and failures.",
            whenConcerning: "When corporate jargon hides impact on workers or consumers",
            whenAcceptable: "When used in appropriate business context without obscuring harm"
          },
          social_euphemism: {
            id: "social_euphemism",
            name: "Social Euphemism",
            icon: "\u{1F91D}",
            color: "#66bb6a",
            description: "Socially polite substitutions used out of sensitivity, courtesy, or respect for dignity.",
            implication: "Often well-intentioned and appropriate, but can sometimes obscure issues that need direct discussion.",
            suggestion: "Consider whether the euphemism serves genuine respect or avoids a conversation that needs directness.",
            examples: '"Passed away" is appropriate for sensitive contexts; "economically disadvantaged" may obscure systemic poverty',
            settingKey: "highlightEuphemismSocial",
            statKey: "euphemismSocialCount",
            basicTip: "Socially polite substitutions \u2014 often appropriate but can obscure important issues.",
            whenConcerning: "When politeness prevents necessary direct discussion of systemic issues",
            whenAcceptable: "When showing genuine respect, sensitivity, or social courtesy"
          },
          military_euphemism: {
            id: "military_euphemism",
            name: "Military Euphemism",
            icon: "\u{1F396}\uFE0F",
            color: "#b71c1c",
            description: "Military jargon that sanitizes violence, casualties, and the human cost of warfare.",
            implication: "Makes warfare and its consequences more palatable, reducing public scrutiny of military actions.",
            suggestion: "Describe the actual human impact rather than using sanitized military terminology.",
            examples: 'Instead of "surgical strike" \u2192 "bombing that killed 12 people"',
            settingKey: "highlightEuphemismMilitary",
            statKey: "euphemismMilitaryCount",
            basicTip: "Military jargon that sanitizes violence and the human cost of warfare.",
            whenConcerning: "When military language hides civilian casualties or human suffering",
            whenAcceptable: "In technical military communication between professionals"
          },
          dysphemism: {
            id: "dysphemism",
            name: "Dysphemism",
            icon: "\u{1F525}",
            color: "#e65100",
            description: "Loaded negative framing that inflames perception \u2014 the rhetorical opposite of a euphemism.",
            implication: "Provokes hostility and negative emotional reactions by replacing neutral terms with inflammatory ones.",
            suggestion: "Replace with neutral, descriptive language that allows readers to form their own judgments.",
            examples: 'Instead of "death tax" \u2192 "estate tax"; instead of "illegal aliens" \u2192 "undocumented immigrants"',
            settingKey: "highlightEuphemismDysphemism",
            statKey: "euphemismDysphemismCount",
            basicTip: "Loaded negative framing \u2014 the opposite of a euphemism, designed to inflame.",
            whenConcerning: "When inflammatory language replaces neutral terms to provoke reaction",
            whenAcceptable: "Rarely \u2014 dysphemisms almost always serve to inflame rather than inform"
          },
          medical_euphemism: {
            id: "medical_euphemism",
            name: "Medical Euphemism",
            icon: "\u{1F3E5}",
            color: "#00897b",
            description: "Healthcare language that softens or obscures medical errors, patient outcomes, and end-of-life realities.",
            implication: "Can impair informed consent and obscure accountability for medical errors or treatment risks.",
            suggestion: "Use clear, direct language \u2014 especially when patients need accurate information to make decisions.",
            examples: 'Instead of "negative patient outcome" \u2192 "the patient died"',
            settingKey: "highlightEuphemismMedical",
            statKey: "euphemismMedicalCount",
            basicTip: "Healthcare language that obscures medical errors and patient outcomes.",
            whenConcerning: "When medical language impairs informed consent or hides errors",
            whenAcceptable: "When showing sensitivity to patients and families in acute grief"
          },
          environmental_euphemism: {
            id: "environmental_euphemism",
            name: "Environmental Euphemism",
            icon: "\u{1F33F}",
            color: "#2e7d32",
            description: "Environmental language that minimizes ecological damage or greenwashes harmful practices.",
            implication: "Makes environmental destruction sound manageable or even positive, reducing urgency for action.",
            suggestion: "Describe the actual environmental impact directly and specifically.",
            examples: 'Instead of "clean coal" \u2192 "coal with reduced but still significant emissions"',
            settingKey: "highlightEuphemismEnvironmental",
            statKey: "euphemismEnvironmentalCount",
            basicTip: "Environmental language that minimizes ecological damage or greenwashes.",
            whenConcerning: "When environmental language obscures actual ecological harm",
            whenAcceptable: "When describing genuine environmental improvements with specific data"
          }
        }
      },
      EMOTIONAL: {
        id: "emotional",
        name: "Emotional Manipulation",
        description: "Appeals designed to trigger emotional responses",
        category: "manipulation",
        color: "#ff7f50",
        className: "bias-highlight-emotional",
        settingKey: "highlightEmotional",
        statKey: "emotionalCount",
        enabled: true,
        tooltip: "Language designed to manipulate through emotion",
        basicTip: "Language designed to manipulate through emotion",
        whenConcerning: "When bypassing rational thought with emotional appeals",
        whenAcceptable: "When emotion is genuinely relevant to the issue",
        lookFor: [
          "Is this bypassing logical analysis?",
          "Is the emotion relevant to the issue?",
          "Is this manipulating rather than informing?",
          "Are facts being provided alongside emotion?"
        ],
        examples: {
          problematic: [
            "think of the children (irrelevant context)",
            "devastating impact (without evidence)",
            "shocking revelation (about minor issues)",
            "heartbreaking story (to support unrelated policy)",
            "outrageous behavior (opinion presented as fact)"
          ],
          acceptable: [
            "families affected by the policy",
            "significant economic impact",
            "important development",
            "personal story illustrating the issue",
            "concerning behavior patterns"
          ]
        },
        contextualGuidance: {
          academic: "Concerning when emotion substitutes for evidence or analysis",
          news: "Red flag when emotional language replaces factual reporting",
          opinion: "Common but should be balanced with rational arguments",
          instructions: "Generally inappropriate unless describing emotional contexts"
        },
        subCategories: {
          fear_appeal: {
            id: "fear_appeal",
            name: "Fear Appeal",
            icon: "\u{1F628}",
            color: "#c62828",
            description: "Language designed to trigger fear and threat perception, bypassing rational risk assessment.",
            implication: "Activates the brain's threat response, making readers more susceptible to persuasion and less able to evaluate claims critically.",
            suggestion: "Ask what specific evidence supports the claimed danger and evaluate actual risk levels.",
            examples: 'Instead of "existential threat" \u2192 "a significant challenge" or provide specific risk data',
            settingKey: "highlightEmotionalFear",
            statKey: "emotionalFearCount",
            basicTip: "Language that triggers fear to bypass rational risk assessment.",
            whenConcerning: "When fear language substitutes for evidence about actual dangers",
            whenAcceptable: "When describing genuinely dangerous situations with supporting evidence"
          },
          guilt_induction: {
            id: "guilt_induction",
            name: "Guilt Induction",
            icon: "\u{1F614}",
            color: "#6a1b9a",
            description: "Language designed to trigger guilt and moral responsibility, pressuring agreement through shame.",
            implication: "Bypasses rational evaluation by making disagreement feel morally wrong, regardless of the actual merits.",
            suggestion: "Evaluate whether the responsibility claim is supported by evidence, separate from the emotional pressure.",
            examples: 'Instead of "blood on your hands" \u2192 "shares responsibility for the outcome" with specific evidence',
            settingKey: "highlightEmotionalGuilt",
            statKey: "emotionalGuiltCount",
            basicTip: "Language that pressures agreement through guilt and shame.",
            whenConcerning: "When guilt is used to shut down legitimate debate or analysis",
            whenAcceptable: "When genuine accountability is supported by evidence of responsibility"
          },
          flattery_manipulation: {
            id: "flattery_manipulation",
            name: "Flattery Manipulation",
            icon: "\u{1F3AD}",
            color: "#f57f17",
            description: "Compliments and in-group identity appeals designed to bias the reader toward agreement.",
            implication: "Creates social pressure to agree by implying that disagreement means you lack intelligence, virtue, or sophistication.",
            suggestion: "Recognize the appeal to identity and evaluate the argument on its own merits.",
            examples: 'Instead of "smart people like you understand" \u2192 present the argument independently',
            settingKey: "highlightEmotionalFlattery",
            statKey: "emotionalFlatteryCount",
            basicTip: "In-group identity appeals that bias readers toward agreement.",
            whenConcerning: "When flattery substitutes for substantive argument",
            whenAcceptable: "Rarely \u2014 flattery in persuasive writing almost always serves to manipulate"
          },
          outrage_fuel: {
            id: "outrage_fuel",
            name: "Outrage Fuel",
            icon: "\u{1F92C}",
            color: "#d84315",
            description: "Language designed to trigger moral outrage, bypassing careful analysis with indignation.",
            implication: "Replaces factual evaluation with emotional reaction, making readers more likely to share and amplify without verification.",
            suggestion: "Look past the outrage language to identify the actual facts and evaluate them independently.",
            examples: 'Instead of "shocking revelation" \u2192 "new information shows..." with specific details',
            settingKey: "highlightEmotionalOutrage",
            statKey: "emotionalOutrageCount",
            basicTip: "Language that triggers moral outrage to bypass careful analysis.",
            whenConcerning: "When outrage language replaces factual reporting or evidence",
            whenAcceptable: "When describing genuinely outrageous situations with full factual context"
          },
          sympathy_exploitation: {
            id: "sympathy_exploitation",
            name: "Sympathy Exploitation",
            icon: "\u{1F494}",
            color: "#1565c0",
            description: "Uses vulnerable populations to weaponize compassion and bypass rational evaluation of arguments.",
            implication: "Makes disagreement feel heartless, even when the emotional appeal has no logical connection to the argument.",
            suggestion: "Ask how the emotional appeal specifically connects to the policy or argument being advanced.",
            examples: 'Instead of "think of the children" \u2192 describe specific impacts on children with evidence',
            settingKey: "highlightEmotionalSympathy",
            statKey: "emotionalSympathyCount",
            basicTip: "Weaponizes compassion for vulnerable groups to bypass rational evaluation.",
            whenConcerning: "When sympathy appeals are disconnected from the actual argument",
            whenAcceptable: "When vulnerable populations are genuinely and directly affected"
          },
          false_urgency: {
            id: "false_urgency",
            name: "False Urgency",
            icon: "\u23F0",
            color: "#ef6c00",
            description: "Creates artificial time pressure to prevent careful deliberation and force hasty decisions.",
            implication: "Prevents thoughtful evaluation by implying that delay equals failure, even when no real deadline exists.",
            suggestion: "Ask what evidence exists for the claimed deadline and whether careful consideration would actually cause harm.",
            examples: `Instead of "act now before it's too late" \u2192 "this decision would benefit from timely attention because..."`,
            settingKey: "highlightEmotionalUrgency",
            statKey: "emotionalUrgencyCount",
            basicTip: "Artificial time pressure that prevents careful deliberation.",
            whenConcerning: "When urgency is manufactured to prevent careful thought",
            whenAcceptable: "When genuine deadlines exist and are supported by evidence"
          }
        }
      },
      GASLIGHTING: {
        id: "gaslighting",
        name: "Gaslighting",
        description: "Phrases that undermine perception and memory",
        category: "manipulation",
        color: "#800000",
        className: "bias-highlight-gaslighting",
        settingKey: "highlightGaslighting",
        statKey: "gaslightingCount",
        enabled: true,
        tooltip: "Language that questions reality and undermines confidence",
        basicTip: "Language that questions reality and undermines confidence",
        whenConcerning: "When systematically undermining perception and memory",
        whenAcceptable: "When providing genuine corrections with evidence",
        lookFor: [
          "Is this undermining confidence?",
          "Is this questioning reality without evidence?",
          "Is this part of a pattern?",
          "Are corrections supported by evidence?"
        ],
        examples: {
          problematic: [
            "that never happened",
            "the public is misremembering the facts",
            "concerns about this are overblown",
            "people who believe this are confused",
            "that's not what the record shows"
          ],
          acceptable: [
            "I have a different recollection",
            "the evidence shows otherwise",
            "according to the records",
            "the response may be disproportionate to the data",
            "let me clarify what was meant"
          ]
        },
        contextualGuidance: {
          academic: "Concerning when dismissing research or findings without evidence",
          news: "Red flag when systematically undermining credible sources",
          opinion: "Watch for patterns of reality-questioning language",
          instructions: "Generally inappropriate unless providing evidence-based corrections"
        },
        subCategories: {
          reality_denial: {
            id: "reality_denial",
            name: "Reality Denial",
            icon: "\u{1F6AB}",
            color: "#b71c1c",
            description: "Direct denial that events occurred or facts exist, attacking objective reality itself.",
            implication: "The strongest form of gaslighting \u2014 attempts to make the target doubt their own perception of verified events.",
            suggestion: "Check independent records, documents, or witnesses. Trust verifiable evidence over assertions.",
            examples: `Instead of "that never happened" \u2192 "I have a different recollection \u2014 let's check the record"`,
            settingKey: "highlightGaslightingReality",
            statKey: "gaslightingRealityCount",
            basicTip: "Direct denial of facts or events \u2014 the strongest form of gaslighting.",
            whenConcerning: "When denying documented or widely witnessed events",
            whenAcceptable: "Rarely \u2014 reality denial is almost always manipulative"
          },
          emotional_invalidation: {
            id: "emotional_invalidation",
            name: "Emotional Invalidation",
            icon: "\u{1F4A2}",
            color: "#6a1b9a",
            description: "Dismissing emotional responses as irrational or disproportionate to undermine confidence in one's own feelings.",
            implication: "Teaches the target to distrust their own emotional responses, making them more dependent on the gaslighter's framing.",
            suggestion: "Your emotional responses are valid data. Evaluate the situation independently of how others characterize your reaction.",
            examples: `Instead of "you're overreacting" \u2192 "I see this differently \u2014 can we discuss our perspectives?"`,
            settingKey: "highlightGaslightingInvalidation",
            statKey: "gaslightingInvalidationCount",
            basicTip: "Dismissing emotional responses as irrational or disproportionate.",
            whenConcerning: "When used to silence legitimate concerns or feelings",
            whenAcceptable: "When genuinely helping someone recognize a cognitive distortion, with care and evidence"
          },
          memory_manipulation: {
            id: "memory_manipulation",
            name: "Memory Manipulation",
            icon: "\u{1F9E0}",
            color: "#00838f",
            description: "Undermining confidence in one's own memory to replace recollections with a preferred narrative.",
            implication: "Erodes trust in episodic memory, making the target increasingly reliant on the manipulator's version of events.",
            suggestion: "Keep written records. Check notes, emails, or texts. Verify with other witnesses when possible.",
            examples: `Instead of "you're misremembering" \u2192 "my recollection differs \u2014 let's look at the meeting notes"`,
            settingKey: "highlightGaslightingMemory",
            statKey: "gaslightingMemoryCount",
            basicTip: "Language that undermines confidence in one's own memory.",
            whenConcerning: "When used to replace someone's recollection with a preferred narrative",
            whenAcceptable: "When providing documented evidence of a genuine misunderstanding"
          },
          credibility_attack: {
            id: "credibility_attack",
            name: "Credibility Attack",
            icon: "\u{1F3AF}",
            color: "#e65100",
            description: "Attacking the person's mental fitness, judgment, or competence rather than addressing their actual argument.",
            implication: "Ad hominem disguised as concern \u2014 undermines self-confidence to make the target doubt their own perceptions.",
            suggestion: "Evaluate the ARGUMENT being made, not the personal attack. Competence attacks do not address substance.",
            examples: `Instead of "you're being paranoid" \u2192 "I don't see the same pattern \u2014 here's why..."`,
            settingKey: "highlightGaslightingCredibility",
            statKey: "gaslightingCredibilityCount",
            basicTip: "Attacking mental fitness or judgment instead of addressing the argument.",
            whenConcerning: "When personal attacks substitute for addressing the actual argument",
            whenAcceptable: "Rarely \u2014 credibility attacks almost always avoid the substantive issue"
          },
          deflection: {
            id: "deflection",
            name: "Deflection",
            icon: "\u21A9\uFE0F",
            color: "#546e7a",
            description: "Redirecting attention away from the actual issue to avoid accountability or addressing the concern.",
            implication: "Prevents resolution by continually shifting focus, leaving the original concern unaddressed.",
            suggestion: "Ask: has the original concern been addressed? Return focus to the specific issue at hand.",
            examples: 'Instead of "what about when you..." \u2192 "I hear your point about X, and I also want to address Y"',
            settingKey: "highlightGaslightingDeflection",
            statKey: "gaslightingDeflectionCount",
            basicTip: "Redirecting attention to avoid addressing the actual concern.",
            whenConcerning: "When topic changes prevent addressing the original issue",
            whenAcceptable: "When genuinely raising a relevant related issue while still addressing the original"
          }
        }
      },
      FALSE_DILEMMA: {
        id: "falsedilemma",
        name: "False Dilemmas",
        description: "Language that forces artificial binary choices",
        category: "manipulation",
        color: "#9400d3",
        className: "bias-highlight-falsedilemma",
        settingKey: "highlightFalseDilemma",
        statKey: "falseDilemmaCount",
        enabled: true,
        tooltip: "Forcing false either/or choices",
        basicTip: "Forcing false either/or choices",
        whenConcerning: "When complex issues are reduced to binary choices",
        whenAcceptable: "When choices are genuinely binary or in decision contexts",
        lookFor: [
          "Are there other options?",
          "Is this oversimplifying a complex issue?",
          "Are middle ground positions ignored?",
          "Is this a genuine binary choice?"
        ],
        examples: {
          problematic: [
            "either you're with us or against us",
            "pick a side",
            "all or nothing",
            "love it or leave it",
            "you're part of the solution or part of the problem"
          ],
          acceptable: [
            "vote yes or no",
            "accept or decline the offer",
            "turn left or right",
            "on or off",
            "guilty or not guilty"
          ]
        },
        contextualGuidance: {
          academic: "Concerning when complex research questions are oversimplified",
          news: "Red flag when nuanced issues are presented as binary",
          opinion: "Common rhetorical device but often misleading",
          instructions: "Appropriate only when choices are genuinely binary"
        }
      },
      PROBABILITY: {
        id: "probability",
        name: "Probability Perception",
        description: "Vague probability language that distorts risk perception",
        category: "advanced",
        color: "#4169e1",
        className: "bias-highlight-probability",
        settingKey: "highlightProbability",
        statKey: "probabilityCount",
        enabled: true,
        tooltip: "Vague probability language that creates misperception of risk",
        basicTip: "Vague probability language that creates misperception of risk",
        whenConcerning: "When vague probability terms substitute for specific data or create false impressions",
        whenAcceptable: "When uncertainty is genuine and specific data unavailable, with proper caveats",
        lookFor: [
          "Is this hiding actual data?",
          "Could this mislead about real risks?",
          "Is the vagueness appropriate to the context?",
          "Are people equipped to make informed decisions?"
        ],
        examples: {
          problematic: [
            "highly unlikely side effects (without rates)",
            "remote possibility of problems",
            "very safe procedure (no statistics)",
            "rare complications (undefined)",
            "minimal risk involved"
          ],
          acceptable: [
            "5% chance of side effects",
            "occurs in 1 in 10,000 cases",
            "uncertain due to limited data",
            "preliminary results suggest...",
            "confidence interval: 2-8%"
          ]
        },
        contextualGuidance: {
          academic: "Concerning when vague terms replace statistical data in research reporting",
          news: "Red flag when probability language downplays or exaggerates actual risks",
          opinion: "Watch for vague probability used to support arguments without evidence",
          instructions: "Generally inappropriate for safety-critical information without specific data"
        }
      },
      SPECTRUM: {
        id: "spectrum",
        name: "Political Spectrum Labels",
        description: "Left/Right and Liberal/Conservative labels that mean different things to different people",
        category: "explainer",
        // Explainer types get neutral "Context" framing instead of a
        // severity badge — they explain contested terms, they do not
        // accuse the writer of bias
        isExplainer: true,
        color: "#7e57c2",
        className: "bias-highlight-spectrum",
        settingKey: "highlightSpectrum",
        statKey: "spectrumCount",
        enabled: true,
        tooltip: "A political label whose meaning shifts across countries, eras, and speakers",
        basicTip: "A political label whose meaning shifts across countries, eras, and speakers",
        whenConcerning: "When used as an unexplained catch-all, applied to people who would not accept the label, or substituted for naming actual positions",
        whenAcceptable: "When the writer specifies which policies, movements, or self-identified groups they mean, or the label is part of a proper name (a party, a caucus)",
        lookFor: [
          "Which specific positions does the writer mean?",
          "Would the people described accept this label?",
          "Does the label mean the same thing in this country and era as where you learned it?",
          "Is the label doing the arguing instead of evidence?"
        ],
        examples: {
          problematic: [
            "the left wants to destroy the economy",
            "conservatives don't care about the poor",
            "typical liberal thinking",
            "the far-right is behind this (unnamed)"
          ],
          acceptable: [
            "the party's left wing opposed the bill",
            "fiscally conservative voters in exit polls",
            "the Liberal Party of Australia",
            "self-described leftists at the rally"
          ]
        },
        contextualGuidance: {
          academic: "Expect labels to be defined and operationalized; unexplained spectrum terms are a weakness",
          news: "Watch for labels standing in for named actors and specific positions in supposedly neutral reporting",
          opinion: "Labels are expected, but strong claims about a labeled group should name who is meant",
          instructions: "Rarely relevant; treat as informational"
        },
        subCategories: {
          left_right: {
            id: "left_right",
            name: "Left / Right",
            icon: "\u{1F9ED}",
            color: "#7e57c2",
            description: "Left and Right as political directions \u2014 a metaphor inherited from seating in the French National Assembly of 1789, where supporters of the king sat to the president's right and revolutionaries to his left.",
            implication: 'The spectrum compresses many independent questions (economic, cultural, institutional) into a single axis, and its content shifts by country and era \u2014 positions called "right" in one nation may be called "left" in another. Prefixes like "far-" and "radical" often work to delegitimize rather than to locate.',
            suggestion: "Ask which specific positions, parties, or movements are meant. Where possible, name policies and stances instead of directions.",
            examples: '"The left opposes this" \u2014 which parties, movements, or thinkers? On what grounds? Would they accept the label?',
            settingKey: "highlightSpectrumLeftRight",
            statKey: "spectrumLeftRightCount",
            basicTip: "Left/Right labels compress many separate questions into one axis and shift meaning across countries and eras.",
            whenConcerning: 'When "the left/the right" stands in for an unnamed everyone, or "far-/radical" is used to dismiss rather than describe',
            whenAcceptable: "When describing self-identified movements, a party's internal wings, or a defined coalition"
          },
          liberal: {
            id: "liberal",
            name: "Liberal",
            icon: "\u{1F4DC}",
            color: "#26a69a",
            description: `"Liberal" (from Latin liber, "free") has carried near-opposite meanings: classical liberalism \u2014 individual rights, free markets, limited government (Locke, Smith, Mill) \u2014 versus modern American usage, where since the New Deal it has meant social-welfare progressivism. "Neoliberal" confusingly revives the free-market sense, mostly as a critics' term for deregulation and privatization.`,
            implication: `In much of Europe, Latin America, and Australia, "liberal" still leans market-oriented \u2014 Australia's Liberal Party sits center-right. A sentence about "liberals" can assert opposite things depending on where the writer and the reader learned the word, and as an epithet it attributes a single belief to a vast, varied group.`,
            suggestion: "Identify which tradition is meant, or name the actual policy, party, or group instead of the label.",
            examples: '"Liberals believe X" \u2014 American progressives? Classical liberals? A specific party? "Liberal democracy" uses the classical sense.',
            settingKey: "highlightSpectrumLiberal",
            statKey: "spectrumLiberalCount",
            basicTip: '"Liberal" means free markets and limited government in the classical sense, social-welfare progressivism in modern American usage \u2014 near-opposite meanings.',
            whenConcerning: "When used as a catch-all epithet or when the intended tradition is ambiguous",
            whenAcceptable: 'When the tradition or group is specified, or in proper names ("Liberal Democrats")'
          },
          conservative: {
            id: "conservative",
            name: "Conservative",
            icon: "\u{1F3DB}\uFE0F",
            color: "#8d6e63",
            description: "Conservatism, articulated by Edmund Burke in reaction to the French Revolution, names a disposition: preserving established institutions, preferring gradual change, and distrusting wholesale redesign of society. Its prefixed forms name specific movements that can cut against that disposition \u2014 neoconservatism was an interventionist US foreign-policy tendency, paleoconservatism a traditionalist, non-interventionist one.",
            implication: 'What is being conserved differs completely by time and place \u2014 monarchy in one country, free markets in another, a secular constitution in a third \u2014 so the label names a posture toward change, not a fixed platform. Used as a monolith ("conservatives want\u2026"), it erases those differences and substitutes identity for argument.',
            suggestion: "Ask what, specifically, is being conserved, and which policies or groups are actually meant.",
            examples: '"Conservatives oppose this" \u2014 which movement, party, or tradition? (Note: "a conservative estimate" is an unrelated sense of the word.)',
            settingKey: "highlightSpectrumConservative",
            statKey: "spectrumConservativeCount",
            basicTip: 'A "conservative" defends whatever is established where they live \u2014 the content of the label varies by country and era.',
            whenConcerning: "When treating diverse traditions as one bloc, or using the label as an insult or badge instead of an argument",
            whenAcceptable: "When naming self-identified groups, parties, or a specified tradition"
          }
        }
      },
      SCISTATS: {
        id: "scistats",
        name: "Science & Statistics",
        description: "Research and statistics phrases that often mean less (or more) than they seem",
        category: "explainer",
        isExplainer: true,
        color: "#546e7a",
        className: "bias-highlight-scistats",
        settingKey: "highlightSciStats",
        statKey: "sciStatsCount",
        enabled: true,
        tooltip: "A science or statistics phrase whose technical meaning differs from how it reads",
        basicTip: "A science or statistics phrase whose technical meaning differs from how it reads",
        whenConcerning: "When technical-sounding language substitutes for the numbers: effect sizes, base rates, study design, or named substances",
        whenAcceptable: "When the underlying quantities are given nearby (absolute risks, effect sizes, study details)",
        lookFor: [
          "What are the actual numbers behind this phrase?",
          "What kind of study produced this claim?",
          "What is the baseline?",
          "Would the sentence survive replacing the phrase with its technical meaning?"
        ],
        examples: {
          problematic: [
            "significantly higher risk (no effect size given)",
            "linked to cancer (observational study, unmentioned)",
            "doubles the risk (of 1 in a million)",
            "chemical-free formula",
            "it's just a theory"
          ],
          acceptable: [
            "risk rose from 1.0% to 1.4%",
            "a randomized trial of 12,000 patients found\u2026",
            "the germ theory of disease",
            "three large studies searched for and found no effect"
          ]
        },
        contextualGuidance: {
          academic: "Expect effect sizes and study design alongside significance and association language",
          news: "Watch for relative risks without baselines and association framed as cause in health and science reporting",
          opinion: "Technical-sounding phrases lend borrowed authority; check the numbers behind them",
          instructions: 'Purity marketing ("chemical-free", "detox") is common in product copy; ask which substances and doses'
        },
        subCategories: {
          theory_proof: {
            id: "theory_proof",
            name: 'Proof & "The Science"',
            icon: "\u{1F52C}",
            color: "#5c6bc0",
            description: 'In science, a "theory" is the strongest kind of explanation \u2014 a framework repeatedly tested against evidence (germ theory, the theory of gravity) \u2014 while in everyday speech it means a hunch. And empirical science does not "prove" claims the way mathematics does; it accumulates evidence and fails to falsify.',
            implication: '"Just a theory" uses the everyday sense to dismiss well-tested science. "Scientifically proven," "settled science," and "the science says" invoke Science as a single settled authority \u2014 often claiming more certainty than the underlying studies support, in either direction.',
            suggestion: "Ask what the actual evidence is: how many studies, of what kind, on whom, and how consistent the results are.",
            examples: '"Evolution is just a theory" (so is gravity); "clinically proven" (in which trial, against what comparison?)',
            settingKey: "highlightSciStatsProof",
            statKey: "sciStatsProofCount",
            basicTip: '"Theory" means a hunch in conversation but the best-tested kind of explanation in science; "proven" claims more certainty than empirical science delivers.',
            whenConcerning: 'When "theory" dismisses tested science, or "proven"/"the science says" ends scrutiny of a claim or product',
            whenAcceptable: "In casual speech about everyday hunches, or where a claim really is formally provable"
          },
          significance: {
            id: "significance",
            name: "Statistical Significance",
            icon: "\u{1F4CA}",
            color: "#00897b",
            description: 'In statistics, "significant" means that if nothing were really going on, a result this large would be unlikely \u2014 conventionally under a 5% probability (p < 0.05). It says nothing about size or importance: a tiny, practically meaningless effect can be statistically significant in a large study.',
            implication: 'Reporting routinely lets the statistical meaning borrow the everyday meaning ("large, important"), making trivial effects sound consequential. The reverse also misleads: a "non-significant" result in a small study is not proof of no effect.',
            suggestion: "Look for the effect size: how big is the difference, in absolute terms, for real people?",
            examples: '"Significantly higher risk" might mean 1.0% \u2192 1.1%. Ask: how much higher, from what baseline?',
            settingKey: "highlightSciStatsSignificance",
            statKey: "sciStatsSignificanceCount",
            basicTip: 'Statistically "significant" means a result this large would be unlikely if there were no real effect \u2014 not that the effect is big or important.',
            whenConcerning: 'When "significant" implies importance without an effect size',
            whenAcceptable: "In technical writing where the statistical sense is explicit and quantified"
          },
          causation: {
            id: "causation",
            name: "Linked & Associated",
            icon: "\u{1F517}",
            color: "#7e57c2",
            description: '"Linked to," "associated with," and "correlated with" report that two things move together \u2014 not that one causes the other.',
            implication: 'Association headlines invite causal conclusions the underlying study cannot support: confounding (ice-cream sales and drownings both rise in summer), reverse causation, and selection effects all produce correlations without causation. "May cause" stacks a hedge on top of an association.',
            suggestion: "Ask what kind of study produced the claim (randomized trial vs. observational) and what else could explain the association.",
            examples: '"Coffee linked to longer life" \u2014 or do healthier people happen to drink more coffee?',
            settingKey: "highlightSciStatsCausation",
            statKey: "sciStatsCausationCount",
            basicTip: '"Linked to" means two things move together \u2014 not that one causes the other.',
            whenConcerning: "When an association is framed to imply cause, or the study design goes unmentioned",
            whenAcceptable: "When explicitly presented as correlational, with confounders discussed"
          },
          risk_scale: {
            id: "risk_scale",
            name: "Relative vs Absolute Risk",
            icon: "\u2696\uFE0F",
            color: "#6d4c41",
            description: '"Doubles the risk" and "50% more likely" are relative changes; they say nothing about the starting point. Doubling a one-in-a-million risk is still two in a million.',
            implication: "Relative risk is the standard way to make a health headline dramatic: it makes small dangers sound alarming and modest benefits sound miraculous. The absolute change \u2014 from what, to what \u2014 is what actually matters for decisions.",
            suggestion: "Find the base rate: from what, to what, out of how many people?",
            examples: '"Doubles the risk" \u2014 of a 1-in-100 event or a 1-in-a-million event? "From 1.0% to 1.4%" is the honest form.',
            settingKey: "highlightSciStatsRiskScale",
            statKey: "sciStatsRiskScaleCount",
            basicTip: 'Relative risk ("twice as likely") is meaningless without the baseline \u2014 doubling a tiny risk is still tiny.',
            whenConcerning: "When only the relative change is given and the baseline is missing",
            whenAcceptable: 'When absolute numbers accompany it ("from 1.0% to 1.4%")'
          },
          evidence_absence: {
            id: "evidence_absence",
            name: "No Evidence",
            icon: "\u{1F50D}",
            color: "#546e7a",
            description: '"No evidence that X" can mean anything from "well studied, and X does not happen" to "nobody has looked yet." Absence of evidence is only evidence of absence when someone has actually searched, hard, where the evidence would be.',
            implication: 'The phrase serves both responsible debunking and premature dismissal: early in any question, "no evidence" is trivially true and tells you nothing. It can also launder uncertainty into reassurance \u2014 "no evidence of harm" is not "evidence of safety."',
            suggestion: "Ask whether anyone has looked, how hard, and what they would have found if the claim were true.",
            examples: '"No evidence of side effects" \u2014 after how many patients, and how much follow-up?',
            settingKey: "highlightSciStatsNoEvidence",
            statKey: "sciStatsNoEvidenceCount",
            basicTip: '"No evidence" ranges from "thoroughly checked, not true" to "nobody has looked." Ask which.',
            whenConcerning: 'When "no evidence" stands in for "we checked and it is false" without saying who checked, or dismisses a question nobody has studied',
            whenAcceptable: 'When paired with the state of the research ("three large trials found no effect")'
          },
          purity: {
            id: "purity",
            name: "Natural & Chemical-Free",
            icon: "\u{1F33F}",
            color: "#689f38",
            description: `Everything is chemicals \u2014 water, air, apples. "Chemical-free," "toxins," "all-natural," and "detox" are marketing categories, not scientific ones; toxicity is a property of dose, not of a substance's origin.`,
            implication: 'Purity language sells safety by category: natural-therefore-safe and synthetic-therefore-dangerous are both false (arsenic and botulinum toxin are natural; vitamin C is synthesized). Unnamed "toxins" cannot be checked, and healthy livers and kidneys already handle metabolic waste.',
            suggestion: 'Ask which substance, at what dose, compared to what \u2014 and what specifically a "toxin" or "detox" refers to.',
            examples: '"Chemical-free cleaning spray" (it is made of chemicals); "flushes out toxins" (which ones, measured how?)',
            settingKey: "highlightSciStatsPurity",
            statKey: "sciStatsPurityCount",
            basicTip: '"Chemical-free" and "toxins" are marketing words \u2014 toxicity lives in the dose, not the origin.',
            whenConcerning: "When purity words substitute for naming substances and doses, especially in selling",
            whenAcceptable: 'Supervised medical detoxification is a real clinical term, and "natural" has defined regulatory meanings in some labeling contexts'
          }
        }
      },
      ISMS: {
        id: "isms",
        name: "Political -isms",
        description: "System-words (socialism, capitalism, fascism, populism, nationalism) whose referents differ between speakers",
        category: "explainer",
        isExplainer: true,
        color: "#607d8b",
        className: "bias-highlight-isms",
        settingKey: "highlightIsms",
        statKey: "ismsCount",
        enabled: true,
        tooltip: "A political system-word whose meaning varies widely between speakers and eras",
        basicTip: "A political system-word whose meaning varies widely between speakers and eras",
        whenConcerning: "When the -ism does the arguing \u2014 attaching one variant's record to another variant's proposal, or ending analysis with a label",
        whenAcceptable: "When the specific variant, institutions, or historical movement is named, or in scholarly usage with criteria",
        lookFor: [
          "Which variant or tradition of this -ism is meant?",
          "Which concrete institutions or policies are being described?",
          "Would the people described accept the label?",
          "Is evidence offered, or just the word?"
        ],
        examples: {
          problematic: [
            "that's just socialism (about a tax-funded service)",
            "capitalism causes X (textbook model or actual economy?)",
            "their fascist agenda (no features named)",
            "globalist elites (insinuated, unspecified)"
          ],
          acceptable: [
            "the Nordic model combines markets with a large welfare state",
            "Mussolini's Fascist Party took power in 1922",
            "the party ran on a populist platform of X and Y",
            "self-described democratic socialists propose\u2026"
          ]
        },
        contextualGuidance: {
          academic: "Expect the -ism to be defined and operationalized; scholarly usage names criteria",
          news: "Watch for system-words standing in for specific policies and actors",
          opinion: 'Labels are expected, but claims about what an -ism "wants" should name who is meant',
          instructions: "Rarely relevant; treat as informational"
        },
        subCategories: {
          socialism: {
            id: "socialism",
            name: "Socialism",
            icon: "\u{1F3ED}",
            color: "#607d8b",
            description: "A 19th-century term whose core meaning \u2014 social or collective ownership of the means of production \u2014 now spans a huge range: Marxist state ownership, democratic socialism (an electoral route, itself contested), and social democracy (a market economy with a large welfare state, technically a different tradition).",
            implication: 'The same word covers the Soviet economy and a public library. In US discourse, Nordic countries are routinely called socialist while their own governments describe them as market economies with strong safety nets. Used as an epithet, "socialism" attaches the record of one variant to proposals from another.',
            suggestion: "Ask which institutions are actually proposed or described: who would own what, decided by whom?",
            examples: '"That policy is socialism" \u2014 state ownership of industry, or a tax-funded service like roads and fire departments?',
            settingKey: "highlightIsmsSocialism",
            statKey: "ismsSocialismCount",
            basicTip: '"Socialism" spans Marxist state ownership to welfare-state social democracy \u2014 the word alone does not say which.',
            whenConcerning: "When one variant's record is attached to a different variant's proposal, or the word ends the argument",
            whenAcceptable: "When the specific tradition or institutions are named, or groups self-describe"
          },
          capitalism: {
            id: "capitalism",
            name: "Capitalism",
            icon: "\u{1F3E6}",
            color: "#6d4c41",
            description: 'Popularized largely by its critics (Marx wrote of the "capitalist mode of production"; the noun spread later through writers like Sombart and Weber), "capitalism" can mean the minimal definition \u2014 private ownership and market exchange \u2014 or the entire actually-existing economy with its subsidies, monopolies, and regulations.',
            implication: 'Defenders often argue for the textbook model of free exchange while critics attack the existing arrangement (or vice versa), so both sides can be right about different referents. Qualifiers like "crony capitalism" and "late capitalism" (a scholarly term from Sombart and Mandel, now mostly ironic) signal that a specific variant is meant \u2014 or just add color.',
            suggestion: "Ask whether the claim is about markets in principle or about the current economy in practice \u2014 they support different conclusions.",
            examples: '"Capitalism causes X" / "capitalism lifted millions from poverty" \u2014 the same word, often two different systems.',
            settingKey: "highlightIsmsCapitalism",
            statKey: "ismsCapitalismCount",
            basicTip: '"Capitalism" can mean markets in principle or the actual economy in practice \u2014 arguments often mix the two.',
            whenConcerning: "When praise or blame switches between the ideal model and the existing system without saying so",
            whenAcceptable: "When the referent is specified: a policy, an industry structure, a named arrangement"
          },
          fascism: {
            id: "fascism",
            name: "Fascism",
            icon: "\u{1F4DA}",
            color: "#455a64",
            description: "Historically, the movement founded by Mussolini in Italy (in power 1922\u201343) and, by extension, kindred interwar regimes: ultranationalism, a one-party state, a cult of the leader, suppression of opposition, and glorification of violence. Scholars (Paxton, Griffin, Eco) still debate the precise defining features.",
            implication: 'Outside historical and scholarly use, the word drifts toward a generic intensifier for any disliked authority \u2014 Orwell observed as early as 1944 that it had become "almost entirely meaningless" in casual use. Calling something fascist ends analysis: it asserts the conclusion instead of showing which specific features apply.',
            suggestion: "Ask which concrete features are being claimed \u2014 and whether the same evidence is offered, or just the label.",
            examples: '"That policy is fascist" \u2014 which element: the leader cult? one-party rule? political violence? Or is it simply disliked?',
            settingKey: "highlightIsmsFascism",
            statKey: "ismsFascismCount",
            basicTip: `"Fascism" was Mussolini's ultranationalist, one-party, leader-cult movement and its interwar kin; in casual use it now often just intensifies disapproval.`,
            whenConcerning: "When the label substitutes for naming concrete features, ending analysis",
            whenAcceptable: "For the historical movements, self-described groups, or analysis that states its criteria"
          },
          populism: {
            id: "populism",
            name: "Populism",
            icon: "\u{1F4E3}",
            color: "#7e57c2",
            description: `Named for the US People's Party of the 1890s. In political science it describes a style, found on both left and right, that frames politics as a virtuous "the people" against a corrupt "elite" (Mudde calls it a "thin" ideology that attaches to others).`,
            implication: 'In headlines the word often just means "popular and irresponsible" or "demagogic" \u2014 a way to dismiss a movement without engaging its claims. The scholarly sense is descriptive; the journalistic sense is usually pejorative, and readers rarely know which one they are getting.',
            suggestion: 'Ask what the labeled movement actually proposes, and who is being cast as "the people" and "the elite."',
            examples: '"Populist economic policy" \u2014 described, or dismissed? The label alone does not say what the policy is.',
            settingKey: "highlightIsmsPopulism",
            statKey: "ismsPopulismCount",
            basicTip: '"Populism" frames politics as a virtuous "the people" against a corrupt "elite" \u2014 descriptive in scholarship, usually an insult in headlines.',
            whenConcerning: "When the label dismisses a movement without engaging its actual claims",
            whenAcceptable: "In the political-science sense with the people/elite framing made explicit"
          },
          nationalism: {
            id: "nationalism",
            name: "Nationalism & Globalism",
            icon: "\u{1F5FA}\uFE0F",
            color: "#00838f",
            description: 'Nationalism ranges from a founding principle of modern states (self-determination movements) to aggressive supremacy; Orwell distinguished patriotism (devotion to a place and way of life) from nationalism (competitive prestige-seeking). "Globalism" is its shifting antonym.',
            implication: 'Both words work as boundary markers more than descriptions. "Globalist" in particular ranges from a neutral label for supporters of international institutions and trade to conspiracy tropes \u2014 the ambiguity itself is why the word inflames. "Nationalist" likewise spans self-determination and chauvinism.',
            suggestion: "Ask which policies or loyalties are actually meant, and whether the person described would accept the label.",
            examples: '"Globalist agenda" \u2014 trade agreements and treaties, or an insinuated hidden cabal? The sentence rarely says.',
            settingKey: "highlightIsmsNationalism",
            statKey: "ismsNationalismCount",
            basicTip: '"Nationalist" spans self-determination to chauvinism; "globalist" spans trade policy to conspiracy trope.',
            whenConcerning: "When either word insinuates loyalty or conspiracy without naming policies or people",
            whenAcceptable: "For self-described movements, or when the specific policies and institutions are stated"
          }
        }
      },
      CIVICS: {
        id: "civics",
        name: "Speech & Civic Terms",
        description: "Legal standards and civic values whose legal sense and cultural sense get swapped mid-argument",
        category: "explainer",
        isExplainer: true,
        color: "#5c6bc0",
        className: "bias-highlight-civics",
        settingKey: "highlightCivics",
        statKey: "civicsCount",
        enabled: true,
        tooltip: "A civic term whose legal meaning and cultural meaning often get swapped",
        basicTip: "A civic term whose legal meaning and cultural meaning often get swapped",
        whenConcerning: "When a legal claim and a cultural-norm claim trade places mid-argument, or courtroom standards are asserted to bind actors they do not bind",
        whenAcceptable: "When the speaker specifies which sense is meant: the law, or the value",
        lookFor: [
          "Is this a claim about law or about norms?",
          "Who exercised what power, with what remedy available?",
          "Does the standard invoked actually bind this actor?",
          "What fairness is really being demanded?"
        ],
        examples: {
          problematic: [
            "they violated my free speech (a private host declined)",
            "that's censorship (a disagreement)",
            "that's slander (a true statement)",
            "innocent until proven guilty (about a hiring decision)"
          ],
          acceptable: [
            "the ordinance likely violates the First Amendment",
            "the platform's moderation policy removed the post",
            "the court found the statement defamatory",
            "the defendant is presumed innocent at trial"
          ]
        },
        contextualGuidance: {
          academic: "Expect the legal/normative distinction to be explicit",
          news: "Watch for censorship and rights language applied across very different powers and remedies",
          opinion: "Values arguments are legitimate \u2014 but should not borrow the authority of settled law",
          instructions: "Rarely relevant; treat as informational"
        },
        subCategories: {
          free_speech: {
            id: "free_speech",
            name: "Free Speech",
            icon: "\u{1F5E3}\uFE0F",
            color: "#5c6bc0",
            description: 'Two related but distinct things share the name: a legal right \u2014 in the US, the First Amendment, which restrains <em>government</em> ("Congress shall make no law\u2026") \u2014 and a broader cultural value of open discourse defended in its own right, by Milton in 1644 and Mill in 1859, independent of any constitution.',
            implication: "The most common collapse online: one person argues the law (a platform or employer is not the government, so no right was violated) while the other argues the value (a culture of sanction chills discourse regardless of who applies it). Both senses are legitimate; treating them as one produces arguments where both sides are right about different things.",
            suggestion: "Ask which sense is in play: a legal claim about state power, or a cultural claim about norms of open discourse?",
            examples: '"They violated my free speech" \u2014 did a government act, or did a private party decline to host or associate?',
            settingKey: "highlightCivicsFreeSpeech",
            statKey: "civicsFreeSpeechCount",
            basicTip: '"Free speech" names both a legal right against government and a cultural value \u2014 arguments often swap the two.',
            whenConcerning: "When the legal and cultural senses trade places mid-argument",
            whenAcceptable: "When the speaker specifies law or value, or the state really is the actor"
          },
          censorship: {
            id: "censorship",
            name: "Censorship",
            icon: "\u2702\uFE0F",
            color: "#8d6e63",
            description: "Historically, suppression by authority \u2014 licensing regimes and prior restraint (Milton's Areopagitica argued against them in 1644). The word now stretches across state suppression, platform moderation, editorial judgment, and sometimes mere criticism.",
            implication: "State censorship, platform moderation, editorial selection, and social pushback differ enormously in power and remedy \u2014 a government can imprison, a platform can remove, an editor can decline, a critic can only object. The single word erases those differences. Whether large platforms' moderation <em>should</em> be treated like public censorship is a genuine, unsettled debate; the word alone does not resolve it.",
            suggestion: "Ask who exercised what power, with what alternatives left to the speaker \u2014 and what remedy is actually being proposed.",
            examples: '"They censored me" \u2014 a takedown? a declined submission? a ban? disagreement? Each is a different claim.',
            settingKey: "highlightCivicsCensorship",
            statKey: "civicsCensorshipCount",
            basicTip: 'State suppression, platform moderation, editorial choice, and criticism differ in power and remedy \u2014 "censorship" covers them all.',
            whenConcerning: "When the word equates very different powers, or stands in for naming who did what",
            whenAcceptable: "When the actor and the power exercised are specified"
          },
          rights: {
            id: "rights",
            name: "Rights Claims",
            icon: "\u{1F4DC}",
            color: "#00838f",
            description: 'Rights-talk mixes distinct claims: legal rights (enforceable in some jurisdiction, against some party), moral rights (claims about what ought to be, whatever the law says), and rhetorical entitlement ("I have a right to\u2026" as emphasis).',
            implication: `A legal right names who must do what \u2014 enforceable, specific, jurisdiction-bound. A moral right is an argument, not a fact about the law. Sliding between them lets a contested "ought" borrow the authority of an established "is," and vice versa: "there's no right to X" may be legally true and morally beside the point.`,
            suggestion: "Ask: enforceable where, against whom? And if it is a moral claim, what is the argument for it?",
            examples: '"I have a right to say this here" \u2014 under law, the host usually decides "here"; the moral claim needs its own defense.',
            settingKey: "highlightCivicsRights",
            statKey: "civicsRightsCount",
            basicTip: "Legal rights are enforceable and specific; moral rights are arguments \u2014 rights-talk often slides between them.",
            whenConcerning: "When a moral claim borrows legal authority, or a legal fact is used to dismiss a moral argument",
            whenAcceptable: "When the claim specifies its kind: a law, a proposed law, or a moral argument"
          },
          legal_standards: {
            id: "legal_standards",
            name: "Legal Standards",
            icon: "\u2696\uFE0F",
            color: "#6d4c41",
            description: 'Courtroom standards imported into everyday judgment: "innocent until proven guilty" and "due process" govern what the <em>state</em> must do before punishing. "Defamation" (libel if written, slander if spoken) requires a false statement of fact \u2014 and in the US, for public officials (and, since 1967, public figures), knowing or reckless falsehood (NYT v. Sullivan, 1964).',
            implication: `A boycott is not a verdict and an employer is not a court, so courtroom standards do not transfer automatically \u2014 yet the worry behind invoking them (serious consequences without fair process) is a real normative question, not a confusion. "That's slander!" about a true statement or an opinion misuses a term with a precise meaning.`,
            suggestion: "Ask whether the standard invoked binds the actor in question \u2014 and if not, what fairness is actually being demanded.",
            examples: `"Innocent until proven guilty" \u2014 a rule for the state's power to punish; whether private judgment should wait for verdicts is a separate argument.`,
            settingKey: "highlightCivicsLegalStandards",
            statKey: "civicsLegalStandardsCount",
            basicTip: "Courtroom standards bind the state; invoking them elsewhere raises a real fairness question but does not settle it.",
            whenConcerning: `When legal terms assert conclusions ("that's slander") without their elements, or courtroom rules are claimed to bind private actors automatically`,
            whenAcceptable: "In actual legal contexts, or when the fairness argument is made on its own terms"
          }
        }
      },
      ECONTERMS: {
        id: "econterms",
        name: "Economic Terms",
        description: "Everyday economics vocabulary where a technical meaning differs from how the phrase reads",
        category: "explainer",
        isExplainer: true,
        color: "#6d4c41",
        className: "bias-highlight-econterms",
        settingKey: "highlightEconTerms",
        statKey: "econTermsCount",
        enabled: true,
        tooltip: "An economic phrase whose technical meaning differs from how it reads",
        basicTip: "An economic phrase whose technical meaning differs from how it reads",
        whenConcerning: 'When rates pass for levels, flows for stocks, one measure for "the economy", or records go unadjusted',
        whenAcceptable: "When the measure, period, and comparison are stated",
        lookFor: [
          "Rate of change, or level?",
          "Yearly flow, or accumulated stock?",
          'Which measure of "the economy", for whom?',
          "Adjusted for inflation and scale?"
        ],
        examples: {
          problematic: [
            "inflation is falling (so why are prices still high?)",
            "we cut the deficit (while the debt grew \u2014 both true)",
            "good for the economy (which measure, for whom?)",
            "record profits (nominal, in a bigger economy)"
          ],
          acceptable: [
            "prices rose 3% over the year, down from 7%",
            "the deficit fell to 4% of GDP; debt reached 98% of GDP",
            "unemployment fell while median real wages were flat",
            "profits rose 12% after inflation, a 40-year high as a share of revenue"
          ]
        },
        contextualGuidance: {
          academic: "Expect explicit measures, periods, and adjustments",
          news: "Rate/level and deficit/debt confusion is routine in headlines; check the numbers behind the phrase",
          opinion: "Economic claims support opposite conclusions depending on the measure chosen \u2014 check which one is doing the work",
          instructions: "Rarely relevant; treat as informational"
        },
        subCategories: {
          inflation: {
            id: "inflation",
            name: "Inflation Is a Rate",
            icon: "\u{1F4C8}",
            color: "#6d4c41",
            description: 'Inflation measures how fast prices are <em>rising</em>. "Inflation is falling" therefore means prices are rising more slowly \u2014 not that prices are falling (that would be deflation, which is rare and brings its own problems).',
            implication: 'During 2021\u201324 this confusion was everywhere: headlines celebrated "falling inflation" while readers wondered why groceries still cost more, because the price <em>level</em> kept the earlier increases. Disinflation (a slowing rate) and deflation (falling prices) are different phenomena with nearly identical-sounding coverage.',
            suggestion: "Ask whether the sentence is about the rate of change or the level of prices \u2014 and over what period.",
            examples: '"Inflation fell to 3%" \u2014 prices are still rising 3% a year, on top of every previous increase.',
            settingKey: "highlightEconTermsInflation",
            statKey: "econTermsInflationCount",
            basicTip: 'Inflation is a rate: "falling inflation" means prices rising more slowly, not prices falling.',
            whenConcerning: 'When rate language invites level conclusions ("inflation fell, so prices are back to normal")',
            whenAcceptable: "When the rate/level distinction is explicit or the numbers are given"
          },
          deficit_debt: {
            id: "deficit_debt",
            name: "Deficit vs Debt",
            icon: "\u{1F3DB}\uFE0F",
            color: "#546e7a",
            description: "The deficit is a yearly flow \u2014 this year's gap between spending and revenue. The debt is the accumulated stock of all past deficits. Cutting the deficit still grows the debt, just more slowly.",
            implication: 'The two get conflated daily, which lets rhetoric mislead in both directions: "we cut the deficit in half" can coexist with record debt, and "the debt hit a record" is nearly always true in a growing economy and says little by itself. Scale also vanishes \u2014 figures mean little without comparison to GDP.',
            suggestion: "Ask which one is meant \u2014 the yearly gap or the accumulated total \u2014 and compared to what (last year, GDP, projections)?",
            examples: '"We halved the deficit" and "the debt hit a record" can both be true in one year: a deficit of $1T (down from $2T) still adds $1T to the debt.',
            settingKey: "highlightEconTermsDeficitDebt",
            statKey: "econTermsDeficitDebtCount",
            basicTip: "The deficit is this year's gap; the debt is the accumulated total. Cutting one still grows the other.",
            whenConcerning: "When the words trade places, or figures come without a GDP-scale comparison",
            whenAcceptable: "When flow, stock, and scale are distinguished"
          },
          recession_economy: {
            id: "recession_economy",
            name: 'Recession & "The Economy"',
            icon: "\u{1F321}\uFE0F",
            color: "#00838f",
            description: 'A "recession" has no single agreed definition: the informal rule of thumb (two consecutive quarters of shrinking GDP) differs from the US convention, where the NBER dates recessions after the fact using many indicators. And "the economy" is not one thing \u2014 GDP, stock indices, employment, and wages routinely move in different directions.',
            implication: 'Whether "we are in a recession" can be genuinely disputed for months, which makes the word a political football. "Good for the economy" often means good for one measure and one group \u2014 the stock market is not household income, and GDP growth says nothing about how gains are distributed.',
            suggestion: "Ask which measure and whose experience is meant: output, jobs, wages, prices, or portfolios?",
            examples: '"The economy is booming" \u2014 GDP? the S&P 500? median wages? All three can point different ways at once.',
            settingKey: "highlightEconTermsRecession",
            statKey: "econTermsRecessionCount",
            basicTip: '"Recession" has competing definitions, and "the economy" bundles measures that move in different directions.',
            whenConcerning: "When one measure stands in for the whole, or the definitional dispute is presented as settled",
            whenAcceptable: "When the measure and the definition in use are named"
          },
          class_records: {
            id: "class_records",
            name: "Middle Class & Records",
            icon: "\u{1F3E0}",
            color: "#7e57c2",
            description: '"Middle class" has no standard definition \u2014 income bands, wealth, occupation, and self-image all give different answers, and in surveys large majorities across very different incomes place themselves in it. "Working class" is contested the same way \u2014 occupation and education, or income? "Record profits" and similar records are often nominal: in a growing economy with inflation, records are routine.',
            implication: 'Because nearly everyone hears themselves in "the middle class," policies pitched to it can target very different people than the listener imagines. Records reported without inflation adjustment or share-of-revenue context can describe an ordinary year in a bigger economy \u2014 or a genuinely extraordinary one; the phrase alone cannot say.',
            suggestion: "Ask what boundaries are meant by the class label, and whether the record is adjusted for inflation and scale.",
            examples: '"Tax relief for the middle class" \u2014 which incomes, exactly? "Record profits" \u2014 real, or nominal in a larger economy?',
            settingKey: "highlightEconTermsClassRecords",
            statKey: "econTermsClassRecordsCount",
            basicTip: "Nearly everyone self-identifies as middle class, and nominal records are routine \u2014 both phrases need numbers.",
            whenConcerning: "When the class label targets sympathy without boundaries, or records come unadjusted",
            whenAcceptable: "When income ranges or inflation-adjusted comparisons are given"
          }
        }
      },
      EPISTEMICS: {
        id: "epistemics",
        name: "Media & Truth Terms",
        description: "The vocabulary used to talk about truth and coverage itself \u2014 words that both describe real phenomena and dismiss opponents",
        category: "explainer",
        isExplainer: true,
        color: "#7e57c2",
        className: "bias-highlight-epistemics",
        settingKey: "highlightEpistemics",
        statKey: "epistemicsCount",
        enabled: true,
        tooltip: "A media/truth term that both describes a real phenomenon and gets used to dismiss",
        basicTip: "A media/truth term that both describes a real phenomenon and gets used to dismiss",
        whenConcerning: "When the label does the arguing \u2014 dismissing a claim or an outlet without engaging its content",
        whenAcceptable: "When the specific claim, outlet, or evidence is named and the label is defended, not assumed",
        lookFor: [
          "What exactly is claimed to be false, and by what standard?",
          "Who applied this label, and could it be contested?",
          "Is the underlying claim falsifiable?",
          "Which outlets or actors are actually meant?"
        ],
        examples: {
          problematic: [
            "fake news (about accurate but unwelcome reporting)",
            "flagged as misinformation (by whom, on what basis?)",
            "just a conspiracy theory (unexamined)",
            "the media won't tell you this (which outlets?)"
          ],
          acceptable: [
            "the story was fabricated; the outlet retracted it",
            "three independent fact-checks found the claim false because\u2026",
            "the theory is unfalsifiable: contrary evidence is read as cover-up",
            "coverage in outlets A and B omitted the report; outlet C covered it"
          ]
        },
        contextualGuidance: {
          academic: "Expect the taxonomy (mis/dis/mal) and labeling criteria to be explicit",
          news: "Watch for truth-labels applied without stating who judged and how",
          opinion: 'Claims about "the media" or "the narrative" should name outlets and cases',
          instructions: "Rarely relevant; treat as informational"
        },
        subCategories: {
          fake_news: {
            id: "fake_news",
            name: "Fake News",
            icon: "\u{1F4F0}",
            color: "#8d6e63",
            description: "Around 2016 the phrase named something specific: fabricated stories manufactured for clicks and ad revenue. Within roughly a year it had been captured as an epithet for unfavorable coverage \u2014 one of the fastest semantic captures on record.",
            implication: "The phrase now points in two directions at once: at genuinely fabricated content, and at accurate-but-unwelcome reporting. Without specification it mostly signals the speaker's stance toward the outlet, not the story's accuracy \u2014 and its overuse makes the original, real phenomenon harder to name.",
            suggestion: "Ask what exactly is claimed to be false \u2014 the facts, the framing, or the outlet \u2014 and what the evidence is.",
            examples: '"That story is fake news" \u2014 fabricated? mistaken in part? accurately reported but unwelcome? Three different claims.',
            settingKey: "highlightEpistemicsFakeNews",
            statKey: "epistemicsFakeNewsCount",
            basicTip: '"Fake news" named fabricated content, then became an epithet for unwelcome coverage \u2014 ask which is meant.',
            whenConcerning: "When the phrase dismisses reporting without naming what is false",
            whenAcceptable: "For genuinely fabricated content, with the fabrication shown"
          },
          misinfo_disinfo: {
            id: "misinfo_disinfo",
            name: "Mis- & Disinformation",
            icon: "\u{1F500}",
            color: "#5c6bc0",
            description: "In the researcher taxonomy: misinformation is false content spread without intent to deceive; disinformation is false content spread deliberately; malinformation is genuine information deployed to harm. The prefixes carry the intent claim.",
            implication: 'In practice the labels get applied beyond clear falsehood \u2014 to contested-but-arguable claims, and sometimes to positions that later became mainstream, which is why the labeling power itself is disputed. Calling something "disinformation" asserts intent to deceive; that is a strong claim that needs its own evidence.',
            suggestion: "Ask two separate questions: is the claim actually false, and who established that? And if intent is asserted, on what basis?",
            examples: '"Flagged as misinformation" \u2014 false by what standard, judged by whom, and has that judgment been revisited?',
            settingKey: "highlightEpistemicsMisinfo",
            statKey: "epistemicsMisinfoCount",
            basicTip: "Mis- means false; dis- means deliberately false. Both labels carry claims that need their own evidence.",
            whenConcerning: "When the label substitutes for showing falsehood, or intent is asserted without basis",
            whenAcceptable: "When the falsehood is demonstrated and the judging standard is named"
          },
          conspiracy: {
            id: "conspiracy",
            name: "Conspiracy Theory",
            icon: "\u{1F9F5}",
            color: "#00838f",
            description: "Descriptively, a claim that events are best explained by a secret plot. Real conspiracies exist and have been documented (Watergate; the tobacco industry's coordination to obscure smoking risks) \u2014 the label is not automatically wrong.",
            implication: "The term does double duty: it describes a reasoning style that resists disproof (missing evidence becomes proof of the cover-up; everything connects), and it dismisses unwelcome claims without examination. The useful question is not the label but the structure: could any evidence count against this claim?",
            suggestion: "Ask whether the claim is falsifiable and what specific evidence supports it \u2014 not whether someone has applied the label.",
            examples: '"Just a conspiracy theory" \u2014 is the claim unfalsifiable, or merely unwelcome? The label alone cannot say.',
            settingKey: "highlightEpistemicsConspiracy",
            statKey: "epistemicsConspiracyCount",
            basicTip: 'A "conspiracy theory" explains events as a secret plot \u2014 but real plots exist (Watergate), so the test is whether any evidence could disprove the claim, not the label.',
            whenConcerning: "When the label ends inquiry into a claim that could be examined",
            whenAcceptable: "When describing the unfalsifiable reasoning structure, with examples"
          },
          narrative_media: {
            id: "narrative_media",
            name: 'Narratives & "The Media"',
            icon: "\u{1F4E1}",
            color: "#7e57c2",
            description: '"The mainstream media" bundles thousands of outlets with different owners, incentives, audiences, and politics into a single actor; "the narrative" implies coverage is a coordinated story rather than the noisier reality of herding, incentives, and error. "Do your own research" ranges from good advice to a dismissal of all expertise.',
            implication: 'Monolith-words make coverage claims unfalsifiable: any outlet that contradicts "the narrative" gets excluded from "the media" that supposedly maintains it. Real, studiable phenomena exist underneath \u2014 ownership concentration, pack journalism, shared blind spots \u2014 but they need naming specifically to be examined at all.',
            suggestion: "Ask which outlets, which claims, and which incentives are actually meant \u2014 and what would count as coverage that breaks the pattern.",
            examples: `"The media won't tell you this" \u2014 which outlets? (Often the claim itself comes from a large outlet.)`,
            settingKey: "highlightEpistemicsNarrative",
            statKey: "epistemicsNarrativeCount",
            basicTip: '"The media" and "the narrative" bundle many actors into one \u2014 real patterns underneath need specific naming.',
            whenConcerning: "When the monolith framing makes the claim unfalsifiable",
            whenAcceptable: "When specific outlets, cases, and incentives are named"
          }
        }
      },
      DEBATE: {
        id: "debate",
        name: "Discourse Concepts",
        description: "Named paradoxes and debate-moves deployed as labels \u2014 each names a real move and doubles as a dismissal",
        category: "explainer",
        isExplainer: true,
        color: "#78909c",
        className: "bias-highlight-debate",
        settingKey: "highlightDebate",
        statKey: "debateCount",
        enabled: true,
        tooltip: "A named debate concept that both describes a real move and gets used to end arguments",
        basicTip: "A named debate concept that both describes a real move and gets used to end arguments",
        whenConcerning: "When the concept-name substitutes for showing the move it alleges, or ends an argument the concept itself cannot settle",
        whenAcceptable: "When the move is demonstrated (quotes, mechanism, standard) rather than just named",
        lookFor: [
          "Is the move shown, or only named?",
          "Does the concept actually settle the question it is invoked for?",
          "Who decides the judgment the concept depends on?",
          "Would the label survive being applied to the speaker's own side?"
        ],
        examples: {
          problematic: [
            "paradox of tolerance, therefore the ban is justified (who judged?)",
            "slippery slope fallacy! (mechanism ignored)",
            "that's just whataboutism (a fair consistency test dodged)",
            "strawman! (without quoting the original)"
          ],
          acceptable: [
            "Popper's test: they answer arguments with violence, so suppression is on the table",
            "the mechanism is precedent: the rule was extended twice this decade",
            "the comparison doesn't answer the charge \u2014 both can be wrong",
            "here is the original claim, and here is the weaker version attacked"
          ]
        },
        contextualGuidance: {
          academic: "Expect the concept's conditions to be stated and applied, not just invoked",
          news: "Watch for concept-names doing the work of analysis in coverage of debates",
          opinion: "Naming a fallacy is the start of an argument, not the end of one",
          instructions: "Rarely relevant; treat as informational"
        },
        subCategories: {
          tolerance_paradox: {
            id: "tolerance_paradox",
            name: "Paradox of Tolerance",
            icon: "\u{1F91D}",
            color: "#5c6bc0",
            description: `From Karl Popper's The Open Society and Its Enemies (1945): "unlimited tolerance must lead to the disappearance of tolerance" \u2014 because a movement that rejects tolerance can use its protections (speech, assembly, due process) to grow until it can abolish them for everyone else. The meme version stops at the slogan. Popper's footnote continues: intolerant philosophies should be countered by argument and public opinion as long as that works \u2014 he reserved suppression for movements that reject rational debate and answer arguments with violence.`,
            implication: 'The paradox gets invoked as a finished argument, but it does not answer the hard question \u2014 who counts as intolerant, judged by whom, by what standard \u2014 which is decided <em>before</em> the paradox applies and is where the actual disagreement lives. Both failure modes are real: unlimited tolerance can shelter movements that would end it, and an elastic definition of "intolerance" can license excluding ordinary disagreement.',
            suggestion: "Ask what specific conduct is called intolerant, whether argument and public opinion have failed, and who gets to decide \u2014 the paradox itself settles none of these.",
            examples: `The classic case: "we don't want that ethnicity here" \u2192 "then your movement can't organize here" \u2192 "you're persecuting us for our beliefs." The persecution claim invokes the very tolerance the movement exists to end \u2014 the hypocrisy that powers the paradox.`,
            settingKey: "highlightDebateToleranceParadox",
            statKey: "debateToleranceParadoxCount",
            basicTip: "A tolerant society cannot extend unlimited tolerance to movements that would use its protections to destroy tolerance itself \u2014 Popper's idea, and more qualified than the meme version of it.",
            whenConcerning: "When the paradox is deployed as a finished argument, skipping the who-decides question",
            whenAcceptable: "When Popper's actual conditions (rejection of debate, resort to violence) are argued, not assumed"
          },
          tolerance_talk: {
            id: "tolerance_talk",
            name: "Demanding Tolerance",
            icon: "\u{1F54A}\uFE0F",
            color: "#26a69a",
            description: '"Tolerance" spans a ladder of very different asks: being left in peace, being accepted, or being endorsed \u2014 and demands for it rarely say which rung is meant. Underneath sits a reciprocity question philosophers from Popper to Rawls have worked on: tolerance functions as a mutual arrangement among those who extend it to each other.',
            implication: `Two opposite distortions ride on the ambiguity. A plea to be left in peace gets recast as "demanding you endorse us" \u2014 raising the rung to make the ask sound aggressive. And a movement working to curtail others' freedom claims the same protection ("you're persecuting us for our beliefs") \u2014 invoking the reciprocity it refuses to extend, the reversal move at the heart of the paradox of tolerance.`,
            suggestion: "Ask which rung is actually being asked for \u2014 peace, acceptance, or endorsement \u2014 and whether the one asking extends the same to others.",
            examples: `"They're demanding tolerance" \u2014 to live unbothered, or to be agreed with? Those are different demands, and the sentence rarely says.`,
            settingKey: "highlightDebateToleranceTalk",
            statKey: "debateToleranceTalkCount",
            basicTip: 'Demands for "tolerance" can mean leave-in-peace, acceptance, or endorsement \u2014 and the claim turns on reciprocity: who extends it back?',
            whenConcerning: "When the rung is quietly raised to make a plea sound aggressive, or protection is claimed by a project that refuses to extend it",
            whenAcceptable: "When the ask is specific about what is wanted and the reciprocity runs both ways"
          },
          slippery_slope: {
            id: "slippery_slope",
            name: "Slippery Slope",
            icon: "\u{1F6DD}",
            color: "#6d4c41",
            description: "Named as a fallacy when a chain from step A to feared outcome Z is asserted without any mechanism. But slope arguments are not automatically fallacious: precedent, incentive shifts, and boundary erosion are real, studiable mechanisms, and courts treat precedent-based slope arguments seriously.",
            implication: `The label cuts both ways: "that's a slippery slope fallacy" can dismiss a legitimate argument about how a rule will actually be extended, while a bare slope claim can smuggle in an unargued chain of dominoes. The difference is whether a mechanism is shown and whether anything plausibly stops the slide.`,
            suggestion: "Ask for the mechanism: what specifically carries step one to the feared end, and what would stop it along the way?",
            examples: '"Legalize medical marijuana and soon every drug is legal" \u2014 by what mechanism, and what stops it? / "Slippery slope fallacy!" \u2014 but is a real mechanism (precedent, incentives) being waved away?',
            settingKey: "highlightDebateSlipperySlope",
            statKey: "debateSlipperySlopeCount",
            basicTip: "A slippery slope says one step will set off a chain ending in some feared outcome \u2014 a fallacy when the chain is merely asserted, legitimate when a real mechanism drives it.",
            whenConcerning: "When either the slope or the fallacy-label is asserted without examining the mechanism",
            whenAcceptable: "When the mechanism (precedent, incentives) and its limits are actually argued"
          },
          whataboutism: {
            id: "whataboutism",
            name: "Whataboutism",
            icon: "\u{1F449}",
            color: "#00838f",
            description: `A Cold War-era label (Soviet spokesmen answering criticism with "and you are lynching Negroes"-style replies): deflecting a charge by pointing at the accuser's conduct instead of answering. The classical name is tu quoque \u2014 "you too."`,
            implication: "The move is real: changing the subject is not a defense, and two wrongs remain two wrongs. But the label also gets used to dodge legitimate consistency challenges \u2014 when the accuser's own standard is part of the argument (selective enforcement, hypocrisy in rule-making), the comparison is evidence, not deflection.",
            suggestion: "Ask whether the comparison answers the charge or replaces it \u2014 and whether the accuser's consistency is actually relevant to the claim.",
            examples: `"What about your side's scandal?" \u2014 deflection from this charge, or a fair test of the standard being applied?`,
            settingKey: "highlightDebateWhataboutism",
            statKey: "debateWhataboutismCount",
            basicTip: "Pointing at the accuser can be deflection or a fair consistency test \u2014 the label alone does not distinguish them.",
            whenConcerning: "When the label dodges a relevant consistency challenge, or the comparison dodges the charge",
            whenAcceptable: "When the charge is answered first, or the accuser's standard is genuinely at issue"
          },
          strawman_adhominem: {
            id: "strawman_adhominem",
            name: "Strawman & Ad Hominem",
            icon: "\u{1F3AF}",
            color: "#8d6e63",
            description: "A strawman attacks a weakened version of an opponent's claim; ad hominem attacks the arguer instead of the argument; a steelman argues against the strongest version. All three name the relationship between a response and the actual claim.",
            implication: `The accusations are moves too: "that's a strawman" asserts misrepresentation without showing it, and "ad hominem!" can deflect personal accountability even where character is the question \u2014 credibility, conflicts of interest, and track records are legitimately about the person. The labels need the same evidence they demand.`,
            suggestion: "For strawman claims: quote the original and the response \u2014 was the stated version actually weaker? For ad hominem: is the personal point relevant to credibility, or substituting for engagement?",
            examples: `"You're strawmanning me" \u2014 what was the real claim? "That's ad hominem" \u2014 or is the witness's reliability the issue?`,
            settingKey: "highlightDebateStrawman",
            statKey: "debateStrawmanCount",
            basicTip: "A strawman refutes a distorted, weaker version of someone's claim; ad hominem attacks the person instead of the argument \u2014 and each accusation is itself a claim that has to be shown.",
            whenConcerning: "When the accusation substitutes for showing the misrepresentation or irrelevance it alleges",
            whenAcceptable: "When the original claim and the response are both on the table"
          },
          overton_window: {
            id: "overton_window",
            name: "Overton Window",
            icon: "\u{1FA9F}",
            color: "#607d8b",
            description: "Named for Joseph Overton (Mackinac Center, 1990s): the range of policies politically acceptable to the mainstream at a given moment. Originally a descriptive claim about feasibility \u2014 politicians can only move within the window; movements move the window.",
            implication: 'The concept now does three jobs at once: description (what is currently sayable), strategy ("shift the window"), and accusation ("normalizing extremism"). It can also smuggle in inevitability \u2014 windows do not move like weather; specific actors move them by choice, and naming the concept does not say whether a given shift is good or bad.',
            suggestion: "Ask whether the sentence describes what is acceptable, argues what should be, or accuses someone of moving the boundary \u2014 three different claims.",
            examples: `"That's outside the Overton window" \u2014 a prediction about viability, not an argument about merit.`,
            settingKey: "highlightDebateOvertonWindow",
            statKey: "debateOvertonWindowCount",
            basicTip: "The Overton window describes what is currently sayable \u2014 it is not an argument about what is right.",
            whenConcerning: "When description of acceptability stands in for argument about merit, or shifts are framed as weather",
            whenAcceptable: "In the descriptive sense, with the actors doing the moving named"
          },
          motte_bailey: {
            id: "motte_bailey",
            name: "Motte-and-Bailey",
            icon: "\u{1F3F0}",
            color: "#7e57c2",
            description: `Nicholas Shackel's term (2005), from the medieval castle: a modest, defensible claim (the motte) and a sweeping, attractive claim (the bailey) share one vocabulary. Challenged on the bailey, the arguer retreats to the motte ("all I'm saying is\u2026"), then reoccupies the bailey once the challenge passes.`,
            implication: "The pattern is real and explains how many contested terms work \u2014 one word doing double duty for a modest and a sweeping claim. But naming it is a structural accusation that needs showing (quote the bailey, quote the motte, same speaker), and it misfires against groups: different people making different claims is not one arguer switching.",
            suggestion: "Ask which claim \u2014 the modest one or the sweeping one \u2014 is actually being defended right now, and which one the conclusion needs.",
            examples: `"All I'm saying is X (modest)" \u2014 but was the earlier claim X, or something much bigger using the same words?`,
            settingKey: "highlightDebateMotteBailey",
            statKey: "debateMotteBaileyCount",
            basicTip: "A motte-and-bailey charge alleges one speaker switching between a modest and a sweeping claim \u2014 it needs both quotes.",
            whenConcerning: "When the charge is made without both claims shown, or against a group rather than a switching speaker",
            whenAcceptable: "When the modest and sweeping claims are quoted from the same source"
          }
        }
      },
      FALLACY: {
        id: "fallacy",
        name: "Logical Fallacies",
        description: "The named fallacy catalog \u2014 each name describes a real reasoning failure and doubles as an argument-ender (strawman, ad hominem, whataboutism, and slippery slope live under Discourse Concepts)",
        category: "explainer",
        isExplainer: true,
        color: "#a1887f",
        className: "bias-highlight-fallacy",
        settingKey: "highlightFallacy",
        statKey: "fallacyCount",
        enabled: true,
        tooltip: "A named fallacy \u2014 it describes a real reasoning failure and gets thrown as an argument-ender",
        basicTip: "A named fallacy \u2014 it describes a real reasoning failure and gets thrown as an argument-ender",
        whenConcerning: "When the fallacy-name substitutes for showing the failure it alleges, or dismisses the conclusion rather than the argument",
        whenAcceptable: "When the reasoning failure is demonstrated \u2014 premises quoted, selection shown, mechanism examined \u2014 rather than just named",
        lookFor: [
          "Is the fallacy shown, or only named?",
          "Does the accusation meet the standard it demands?",
          "Even if the argument fails, what is the best remaining case for the conclusion?",
          "Would the label survive being applied to the speaker's own side?"
        ],
        examples: {
          problematic: [
            "that's a red herring (an inconvenient point ducked)",
            "cherry-picking! (without showing the fuller data)",
            "correlation isn't causation (about a randomized trial)",
            "your argument is fallacious, so you're wrong (the fallacy fallacy)"
          ],
          acceptable: [
            "the premise assumes the conclusion: here are both, quoted",
            "the full dataset shows the opposite trend; these three points were selected",
            "the standard was met, then redefined \u2014 here is the original claim",
            "the argument fails, but the claim has independent support worth weighing"
          ]
        },
        contextualGuidance: {
          academic: "Expect fallacy claims to be demonstrated with the argument's actual structure",
          news: "Watch for fallacy-names doing the work of analysis in debate coverage",
          opinion: "Naming a fallacy is the start of an argument, not the end of one",
          instructions: "Rarely relevant; treat as informational"
        },
        subCategories: {
          relevance: {
            id: "relevance",
            name: "Red Herring & Non Sequitur",
            icon: "\u{1F41F}",
            color: "#00838f",
            description: "Relevance fallacies: a red herring drags the argument toward something vivid but beside the point; a non sequitur draws a conclusion that does not follow from what preceded it; a Gish gallop (named for creationist Duane Gish, its most avid practitioner) buries an opponent under more claims than can be answered in the time available.",
            implication: 'The moves are real \u2014 misdirection and overload win debates without winning arguments. But the labels also get used to duck relevant points: calling context a "red herring" or a cumulative case a "Gish gallop" can itself be the evasion.',
            suggestion: "Ask what the original question was and whether the point at issue actually bears on it \u2014 in either direction.",
            examples: `"That's a red herring" \u2014 is it off the point, or an inconvenient part of it?`,
            settingKey: "highlightFallacyRelevance",
            statKey: "fallacyRelevanceCount",
            basicTip: "A red herring distracts with something vivid but off-topic; a non sequitur draws a conclusion that does not follow \u2014 though calling a point either can itself duck what is relevant.",
            whenConcerning: "When the label dismisses a point without showing it is off-topic, or misdirection goes unnamed",
            whenAcceptable: "When the original question and the drift away from it are both shown"
          },
          circular: {
            id: "circular",
            name: "Begging the Question",
            icon: "\u{1F501}",
            color: "#5c6bc0",
            description: 'Begging the question (petitio principii) means assuming the conclusion inside the premises \u2014 circular reasoning: "the report is reliable because it says so." Separately, everyday usage has largely repurposed "begs the question" to mean "raises the question," which usage guides now widely note.',
            implication: 'Two confusions travel with this phrase: circular arguments can sound rigorous while proving nothing, and the fallacy-name itself now means different things to different readers. Someone accused of "begging the question" may just have prompted one.',
            suggestion: "For the fallacy: ask whether any premise already assumes the conclusion. For the phrase: check which sense the writer means.",
            examples: '"This begs the question" \u2014 a circularity charge, or just "this raises the question"? They are different claims.',
            settingKey: "highlightFallacyCircular",
            statKey: "fallacyCircularCount",
            basicTip: '"Begs the question" names circular reasoning \u2014 and, in everyday use, just means "raises the question." Check which.',
            whenConcerning: "When circularity is alleged without quoting the premise that assumes the conclusion",
            whenAcceptable: "When both premise and conclusion are shown, or the everyday sense is clearly meant"
          },
          crowd_authority: {
            id: "crowd_authority",
            name: "Appeals & Bandwagon",
            icon: "\u{1F4E2}",
            color: "#8d6e63",
            description: "Borrowed-force fallacies: appeal to popularity (ad populum / bandwagon), authority, nature (the naturalistic fallacy), emotion, tradition, novelty, and ignorance. Each substitutes something other than evidence \u2014 numbers, prestige, origin, feeling, age, newness, or the absence of disproof \u2014 for an argument.",
            implication: 'The nuance the labels flatten: deferring to relevant expert consensus is evidence, not fallacy \u2014 the fallacy is substituting prestige for argument or citing authority outside its domain. Likewise popularity is weak evidence, not zero. "Appeal to X!" can dismiss legitimate weight along with borrowed force.',
            suggestion: "Ask what would remain of the claim if the crowd, the authority, or the feeling were removed \u2014 and whether the cited authority actually has domain expertise.",
            examples: `"Experts agree" \u2014 relevant consensus (evidence) or borrowed prestige (fallacy)? "Everyone's switching" \u2014 to what, and why?`,
            settingKey: "highlightFallacyCrowdAuthority",
            statKey: "fallacyCrowdAuthorityCount",
            basicTip: "Appeals borrow force from crowds, authorities, nature, or feelings \u2014 but relevant expert consensus is evidence, not fallacy.",
            whenConcerning: "When prestige or popularity substitutes for argument, or the label dismisses relevant expertise",
            whenAcceptable: "When the authority has domain expertise and the evidence behind the consensus is available"
          },
          evidence_games: {
            id: "evidence_games",
            name: "Cherry-Picking & Selection",
            icon: "\u{1F352}",
            color: "#6d4c41",
            description: "Selection fallacies: cherry-picking keeps the favorable data and discards the rest; the Texas sharpshooter draws the target around the bullet holes after firing; hasty generalization scales a small sample into a rule; anecdotal evidence substitutes a story for a distribution; survivorship bias studies only what made it through the filter.",
            implication: 'These are among the most consequential reasoning failures because the presented evidence is genuine \u2014 only the selection is dishonest, so each claim survives fact-checking. The accusation cuts both ways too: "cherry-picking!" needs the fuller dataset shown, not just alleged.',
            suggestion: "Ask what the full base of evidence looks like: what was left out, who did not survive to be counted, and whether the pattern was predicted or drawn afterward.",
            examples: `"Every example they gave is true" \u2014 and what about the examples they didn't give?`,
            settingKey: "highlightFallacyEvidenceGames",
            statKey: "fallacyEvidenceGamesCount",
            basicTip: "Selection fallacies present true evidence dishonestly chosen \u2014 the counter is the fuller dataset, shown.",
            whenConcerning: "When selective evidence poses as the whole picture, or the accusation comes without the fuller data",
            whenAcceptable: "When the selection criteria are stated and the full base of evidence is on the table"
          },
          goalposts_burden: {
            id: "goalposts_burden",
            name: "Goalposts, Burden & No True Scotsman",
            icon: "\u{1F945}",
            color: "#607d8b",
            description: `Rule-changing moves: moving the goalposts redefines success after each demand is met; burden-of-proof games assign the proving to the other side ("prove it isn't true"); special pleading exempts one's own case from one's own standard; No True Scotsman rescues a generalization by redefining membership ("no real X would do that").`,
            implication: "Each move makes a position unfalsifiable in practice. The labels need care in return: standards can legitimately tighten as stakes rise (not every raised bar is moved goalposts), the burden genuinely rests with whoever asserts, and some membership definitions are real (a vegetarian who eats steak is not a counterexample to vegetarianism).",
            suggestion: "Ask what was originally claimed and what would count as meeting or refuting it \u2014 fixed in advance, on both sides.",
            examples: `"That wasn't real socialism" \u2014 a definitional argument that needs making, or a retreat that saves the theory from every failure?`,
            settingKey: "highlightFallacyGoalposts",
            statKey: "fallacyGoalpostsCount",
            basicTip: "Goalpost-moving, burden-shifting, and No True Scotsman make positions unfalsifiable \u2014 fix the success criteria in advance.",
            whenConcerning: "When success or membership gets redefined after the fact, or the asserter assigns the proving to others",
            whenAcceptable: "When definitions and standards are argued openly and fixed before the evidence arrives"
          },
          causal: {
            id: "causal",
            name: "Post Hoc & Causal Shortcuts",
            icon: "\u{1F3B2}",
            color: "#7e57c2",
            description: `Causal fallacies: post hoc ergo propter hoc ("after it, therefore because of it") reads sequence as causation; the gambler's fallacy expects independent events to remember the past; the sunk cost fallacy lets what is already spent dictate what to do next.`,
            implication: 'The corrective slogans get weaponized too: "correlation is not causation" is true and yet gets used to wave away strong, well-controlled observational evidence \u2014 correlation plus mechanism plus dose-response plus ruled-out confounders is how much of science works. The slogan starts the examination; it does not end it.',
            suggestion: "For causal claims: ask for the mechanism and the controls. For the slogan: ask whether the evidence is actually just correlation, or more.",
            examples: `"I took it and got better" (post hoc); "correlation isn't causation" (about a randomized trial \u2014 it was causation).`,
            settingKey: "highlightFallacyCausal",
            statKey: "fallacyCausalCount",
            basicTip: `Post hoc reads sequence as cause; "correlation isn't causation" is true \u2014 and gets used to dismiss evidence that is more than correlation.`,
            whenConcerning: "When sequence poses as cause, or the corrective slogan waves away controlled evidence",
            whenAcceptable: "When mechanisms and controls are examined rather than asserted or dismissed"
          },
          comparison: {
            id: "comparison",
            name: "False Equivalence & Extreme Comparisons",
            icon: "\u{1FA9E}",
            color: "#546e7a",
            description: `Comparison fallacies: false equivalence treats unlike things as alike because they share a surface feature; false dichotomies and "false choice" framings force two options where more exist; Godwin's law names the drift of every long argument toward a Hitler comparison (reductio ad Hitlerum).`,
            implication: `Comparisons carry arguments \u2014 and dismissing them cuts both ways: "false equivalence!" can duck a fair parallel, and invoking Godwin's law can dodge a historically apt warning. What matters is whether the compared cases are alike in the respects the argument needs.`,
            suggestion: "Ask in which specific respects the two things are being equated, and whether those respects are the ones that matter for the conclusion.",
            examples: `"You can't compare X to Y" \u2014 why not, in the respect being argued? "Either we do this or we fail" \u2014 is a third option being hidden?`,
            settingKey: "highlightFallacyComparison",
            statKey: "fallacyComparisonCount",
            basicTip: "False equivalence treats unlike things as alike; a false dichotomy pretends only two options exist \u2014 both smuggle a conclusion the real likeness, or the missing option, cannot support.",
            whenConcerning: "When equivalence or its dismissal is asserted without naming the respects compared",
            whenAcceptable: "When the specific points of likeness and difference are argued"
          },
          meta: {
            id: "meta",
            name: "The Fallacy Fallacy & Question Games",
            icon: "\u{1FA83}",
            color: "#a1887f",
            description: 'The fallacy fallacy: concluding that a claim is false because an argument for it was fallacious \u2014 bad arguments get made for true things. Question-framing does double duty too: "just asking questions" can be a cover for insinuating without asserting (sealioning: relentless polite demands that exhaust rather than inquire), and a loaded question smuggles its premise ("when did you stop\u2026?").',
            implication: "This family is the type's own warning label: spotting a fallacy licenses discounting an argument, never the conclusion \u2014 and fallacy-naming can itself become sport that replaces engagement. Meanwhile the question-labels can dismiss sincere inquiry as bad faith; the difference is whether answers are ever accepted.",
            suggestion: "Separate the argument from the claim: refute the reasoning, then ask what the best remaining case for the conclusion is. For question games: does any answer get engaged?",
            examples: `"Your argument is fallacious, so you're wrong" \u2014 the first half can be true and the second not follow. "Just asking questions" \u2014 sincere inquiry, or insinuation that never accepts an answer?`,
            settingKey: "highlightFallacyMeta",
            statKey: "fallacyMetaCount",
            basicTip: 'Spotting a fallacy discredits an argument, never its conclusion (the fallacy fallacy) \u2014 and "just asking questions" can advance a claim while dodging the burden of asserting it.',
            whenConcerning: "When a fallacy verdict stands in for engaging the claim, or question-labels dismiss sincere inquiry",
            whenAcceptable: "When the reasoning is refuted and the conclusion is then weighed on its remaining merits"
          }
        }
      }
    };
    // Excellence detection types
    static EXCELLENCE_TYPES = {
      ATTRIBUTION: {
        id: "attribution",
        name: "Clear Attribution",
        description: "Specific, verifiable sources",
        className: "excellence-attribution",
        settingKey: "highlightAttributionExcellence",
        statKey: "attributionExcellenceCount",
        enabled: true,
        basicTip: "Specific, verifiable sources that build trust and accountability",
        whenExcellent: "When sources are named, dated, and easily verifiable by readers",
        howToEnhance: "Add page numbers, direct links, or timestamps to make sources even more accessible",
        examples: {
          excellent: ["According to Smith et al. (2023, p. 45)", "The WHO reported on March 15, 2024", "Dr. Johnson from Harvard Medical School stated"],
          enhance: ["Add DOI links for academic papers", "Include specific page numbers", "Provide direct URLs when possible"]
        },
        lookFor: [
          "Named authors and publications",
          "Specific dates and page numbers",
          "Institutional affiliations",
          "Direct quotes with citations"
        ]
      },
      NUANCE: {
        id: "nuance",
        name: "Nuanced Language",
        description: "Acknowledges complexity",
        className: "excellence-nuance",
        settingKey: "highlightNuanceExcellence",
        statKey: "nuanceExcellenceCount",
        enabled: true,
        basicTip: "Language that acknowledges complexity and avoids oversimplification",
        whenExcellent: "When acknowledging multiple perspectives, limitations, or contextual factors",
        howToEnhance: "Continue showing complexity while keeping main arguments clear and accessible",
        examples: {
          excellent: ["While generally true, exceptions include...", "This trend shows X, though Y factors also influence...", "The relationship appears complex because..."],
          enhance: ["Explain why something is complex", "Acknowledge competing theories", "Show how context matters"]
        },
        lookFor: [
          "Conditional language (might, could, seems)",
          "Acknowledgment of exceptions",
          "Recognition of multiple factors",
          "Context-dependent statements"
        ]
      },
      TRANSPARENCY: {
        id: "transparency",
        name: "Transparent Communication",
        description: "Clear about limitations",
        className: "excellence-transparency",
        settingKey: "highlightTransparencyExcellence",
        statKey: "transparencyExcellenceCount",
        enabled: true,
        basicTip: "Open communication about limitations, biases, and uncertainties",
        whenExcellent: "When openly discussing methodology, limitations, or potential biases",
        howToEnhance: "Consider discussing funding sources, methodology details, or personal stakes",
        examples: {
          excellent: ["This analysis has limitations...", "I should note my background in X might influence...", "The data is preliminary and requires further research"],
          enhance: ["Explain specific limitations", "Disclose conflicts of interest", "Discuss methodology constraints"]
        },
        lookFor: [
          "Acknowledgment of limitations",
          "Discussion of uncertainty",
          "Methodological transparency",
          "Bias acknowledgment"
        ]
      },
      DISCOURSE: {
        id: "discourse",
        name: "Constructive Discourse",
        description: "Encourages dialogue",
        className: "excellence-discourse",
        settingKey: "highlightDiscourseExcellence",
        statKey: "discourseExcellenceCount",
        enabled: true,
        basicTip: "Language that encourages dialogue and acknowledges other perspectives",
        whenExcellent: "When inviting input, acknowledging others' views, or building on ideas constructively",
        howToEnhance: "Ask specific questions or provide clear ways for others to contribute to the discussion",
        examples: {
          excellent: ["What do you think about...?", "Others might argue...", "Building on Sarah's point...", "I'd value your perspective on..."],
          enhance: ["Ask specific follow-up questions", "Acknowledge opposing viewpoints fairly", "Invite concrete suggestions"]
        },
        lookFor: [
          "Questions inviting input",
          "Acknowledgment of others' contributions",
          "Building on others' ideas",
          "Fair representation of different views"
        ]
      },
      EVIDENCE: {
        id: "evidence",
        name: "Evidence-Based",
        description: "Supported by data",
        className: "excellence-evidence",
        settingKey: "highlightEvidenceExcellence",
        statKey: "evidenceExcellenceCount",
        enabled: true,
        basicTip: "Claims supported by specific evidence, data, or research",
        whenExcellent: "When providing quantified data, citing specific studies, or linking claims to evidence",
        howToEnhance: "Explain why the evidence supports your claims and discuss any limitations in the data",
        examples: {
          excellent: ["Data from the 2023 survey shows 67% of respondents...", "Three peer-reviewed studies demonstrate...", "The methodology involved 1,200 participants over 6 months"],
          enhance: ["Explain statistical significance", "Discuss sample representativeness", "Compare with other studies"]
        },
        lookFor: [
          "Specific percentages and numbers",
          "Named studies and datasets",
          "Methodological details",
          "Peer-reviewed sources"
        ]
      }
    };
    static CATEGORIES = {
      basic: {
        name: "Basic Detection",
        description: "Fundamental bias indicators",
        icon: "\u{1F50D}",
        expanded: true
      },
      advanced: {
        name: "Advanced Detection",
        description: "Sophisticated linguistic patterns",
        icon: "\u{1F9E0}",
        expanded: false
      },
      framing: {
        name: "Framing & Rhetoric",
        description: "How issues are presented",
        icon: "\u{1F3AD}",
        expanded: false
      },
      manipulation: {
        name: "Manipulation Tactics",
        description: "Techniques designed to mislead",
        icon: "\u26A0\uFE0F",
        expanded: false
      },
      explainer: {
        name: "Explainers",
        description: "Contested terms explained, not judged",
        icon: "\u{1F4AC}",
        expanded: false
      }
    };
    static getDefaultSettings() {
      const settings = {
        enableAnalysis: true,
        analysisMode: "balanced",
        // 'problems', 'excellence', or 'balanced'
        siteMode: "auto",
        // 'auto' analyzes on load; 'ondemand' waits for the popup's Analyze
        highlightDensity: "standard",
        // 'focused' | 'standard' | 'everything' — see DENSITY_LIMITS
        disabledSites: [],
        // hostnames where analysis never runs
        ignoredWords: []
        // terms the user never wants highlighted (compared whitespace/case-insensitively)
      };
      for (const [key, config] of Object.entries(this.BIAS_TYPES)) {
        settings[config.settingKey] = config.enabled;
        if (config.subCategories) {
          for (const sub of Object.values(config.subCategories)) {
            settings[sub.settingKey] = config.enabled;
          }
        }
      }
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
      return Object.values(this.BIAS_TYPES).find((config) => config.id === id);
    }
    static getAllBiasTypes() {
      return Object.values(this.BIAS_TYPES);
    }
    static getEnabledBiasTypes(settings) {
      return Object.values(this.BIAS_TYPES).filter(
        (config) => settings[config.settingKey]
      );
    }
    static hasSubCategories(biasTypeId) {
      const config = this.getBiasTypeConfig(biasTypeId);
      return config && config.subCategories && Object.keys(config.subCategories).length > 0;
    }
    static getSubCategories(biasTypeId) {
      const config = this.getBiasTypeConfig(biasTypeId);
      return config && config.subCategories ? config.subCategories : {};
    }
    static getSubCategory(biasTypeId, subCategoryId) {
      return this.getSubCategories(biasTypeId)[subCategoryId] || null;
    }
    static resolveType(compositeType) {
      for (const config of Object.values(this.BIAS_TYPES)) {
        if (config.id === compositeType)
          return { parentId: config.id, subCategoryId: null };
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
      const stats = {};
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
      for (const [key, value] of Object.entries(settings)) {
        if (key === "enableAnalysis" || key === "analysisMode") {
          validated[key] = key === "analysisMode" ? value : Boolean(value);
        } else if (key === "siteMode") {
          validated[key] = value === "ondemand" ? "ondemand" : "auto";
        } else if (key === "highlightDensity") {
          validated[key] = Object.prototype.hasOwnProperty.call(this.DENSITY_LIMITS, value) ? value : "standard";
        } else if (key === "disabledSites" || key === "ignoredWords") {
          validated[key] = Array.isArray(value) ? value.filter((v) => typeof v === "string").map((v) => v.trim().toLowerCase()).filter(Boolean).slice(0, 1e3) : [];
        } else if (key.startsWith("highlight_custom_")) {
          validated[key] = Boolean(value);
        } else if (Object.values(this.BIAS_TYPES).some((config) => {
          if (config.settingKey === key)
            return true;
          if (config.subCategories) {
            return Object.values(config.subCategories).some((sub) => sub.settingKey === key);
          }
          return false;
        }) || Object.values(this.EXCELLENCE_TYPES).some((config) => config.settingKey === key)) {
          validated[key] = Boolean(value);
        }
      }
      return validated;
    }
    // Performance settings
    static PERFORMANCE = {
      BATCH_SIZE: 50,
      MUTATION_DEBOUNCE: 1e3,
      MAX_TEXT_LENGTH: 1e4,
      MIN_SIGNIFICANT_TEXT: 5,
      UI_UPDATE_INTERVAL: 200
    };
    // How many highlights each unique (type, term) pair gets per page.
    // 'standard' keeps pages readable while still showing what fires;
    // 'everything' is the pre-density behavior.
    static DENSITY_LIMITS = {
      focused: 1,
      standard: 3,
      everything: Infinity
    };
    // Development logging. Keep false in production builds: the content script
    // runs on every page, and these logs (and their argument evaluation) are
    // pure overhead for users. Expensive log arguments must be wrapped in
    // `if (BiasConfig.DEBUG)` at the call site, not passed through debugLog.
    static DEBUG = false;
    static debugLog(...args) {
      if (this.DEBUG)
        console.log(...args);
    }
  };
  var BIAS_TYPES = BiasConfig.BIAS_TYPES;
  var CATEGORIES = BiasConfig.CATEGORIES;
  var PERFORMANCE = BiasConfig.PERFORMANCE;

  // src/utils/sanitize.js
  function escapeHtml(value) {
    return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function sanitizeColor(color) {
    return /^#[0-9a-fA-F]{6}$/.test(String(color)) ? color : "#e67e22";
  }

  // src/options/options.js
  document.addEventListener("DOMContentLoaded", function() {
    let currentSettings = {};
    let customGroups = [];
    let editingGroupId = null;
    function loadAll() {
      chrome.storage.local.get("customGroups", function(data) {
        const stored = data.customGroups;
        customGroups = stored && stored.version === 1 && stored.groups ? Object.values(stored.groups) : [];
        const defaults = Object.assign({}, BiasConfig.getDefaultSettings());
        customGroups.forEach((g) => {
          defaults[g.settingKey] = g.enabled !== false;
        });
        chrome.storage.sync.get(defaults, function(items) {
          currentSettings = items;
          renderAll();
        });
      });
    }
    function saveSettings(done) {
      chrome.storage.sync.set(currentSettings, function() {
        broadcast({ action: "updateSettings", settings: currentSettings });
        if (done)
          done();
      });
    }
    function saveCustomGroups(done) {
      const groups = {};
      let maxCounter = 0;
      customGroups.forEach((g) => {
        groups[g.id] = g;
        const m = g.id.match(/_(\d+)$/);
        if (m)
          maxCounter = Math.max(maxCounter, parseInt(m[1], 10));
      });
      chrome.storage.local.set({ customGroups: { version: 1, idCounter: maxCounter, groups } }, function() {
        chrome.storage.sync.set(currentSettings, function() {
          broadcast({ action: "reloadCustomDictionaries" });
          if (done)
            done();
        });
      });
    }
    function broadcast(message) {
      chrome.tabs.query({}, function(tabs) {
        tabs.forEach((tab) => {
          if (tab.id === void 0)
            return;
          chrome.tabs.sendMessage(tab.id, message, function() {
            void chrome.runtime.lastError;
          });
        });
      });
    }
    function flash(id) {
      const el = document.getElementById(id);
      if (!el)
        return;
      el.classList.add("show");
      setTimeout(() => el.classList.remove("show"), 1600);
    }
    function renderAll() {
      document.querySelectorAll('input[name="siteMode"]').forEach((input) => {
        input.checked = input.value === (currentSettings.siteMode || "auto");
      });
      document.querySelectorAll('input[name="density"]').forEach((input) => {
        input.checked = input.value === (currentSettings.highlightDensity || "standard");
      });
      document.getElementById("disabledSites").value = (currentSettings.disabledSites || []).join("\n");
      document.getElementById("ignoredWords").value = (currentSettings.ignoredWords || []).join("\n");
      renderGroupList();
    }
    function renderGroupList() {
      const list = document.getElementById("groupList");
      if (!customGroups.length) {
        list.innerHTML = '<div class="empty">No custom groups yet.</div>';
        return;
      }
      list.innerHTML = customGroups.map((g) => `
            <div class="group-row">
                <span class="group-dot" style="background: ${sanitizeColor(g.color)};"></span>
                <span class="group-name">${escapeHtml(g.name)}</span>
                <span class="group-count">${g.words.length} terms</span>
                <button class="btn secondary" data-edit="${escapeHtml(g.id)}">Edit</button>
            </div>
        `).join("");
      list.querySelectorAll("[data-edit]").forEach((btn) => {
        btn.addEventListener("click", () => openEditor(btn.dataset.edit));
      });
    }
    function parseLines(value) {
      return Array.from(new Set(
        value.split("\n").map((s) => s.trim().toLowerCase()).filter(Boolean)
      ));
    }
    document.querySelectorAll('input[name="siteMode"]').forEach((input) => {
      input.addEventListener("change", (e) => {
        currentSettings.siteMode = e.target.value === "ondemand" ? "ondemand" : "auto";
        saveSettings();
      });
    });
    document.querySelectorAll('input[name="density"]').forEach((input) => {
      input.addEventListener("change", (e) => {
        currentSettings.highlightDensity = e.target.value;
        saveSettings();
      });
    });
    document.getElementById("saveSites").addEventListener("click", () => {
      currentSettings.disabledSites = parseLines(document.getElementById("disabledSites").value);
      document.getElementById("disabledSites").value = currentSettings.disabledSites.join("\n");
      saveSettings(() => flash("sitesSaved"));
    });
    document.getElementById("saveIgnored").addEventListener("click", () => {
      currentSettings.ignoredWords = parseLines(document.getElementById("ignoredWords").value);
      document.getElementById("ignoredWords").value = currentSettings.ignoredWords.join("\n");
      saveSettings(() => flash("ignoredSaved"));
    });
    function openEditor(groupId) {
      editingGroupId = groupId || null;
      const editor = document.getElementById("editor");
      const del = document.getElementById("deleteGroup");
      if (groupId) {
        const g = customGroups.find((x) => x.id === groupId);
        if (!g)
          return;
        document.getElementById("editorTitle").textContent = "Edit: " + g.name;
        document.getElementById("groupName").value = g.name;
        document.getElementById("groupDesc").value = g.description || "";
        document.getElementById("groupColor").value = sanitizeColor(g.color);
        document.getElementById("groupWords").value = (g.words || []).join("\n");
        del.style.display = "inline-block";
      } else {
        document.getElementById("editorTitle").textContent = "New Custom Group";
        document.getElementById("groupName").value = "";
        document.getElementById("groupDesc").value = "";
        document.getElementById("groupColor").value = "#e67e22";
        document.getElementById("groupWords").value = "";
        del.style.display = "none";
      }
      editor.style.display = "block";
      document.getElementById("groupName").focus();
    }
    function closeEditor() {
      document.getElementById("editor").style.display = "none";
      editingGroupId = null;
    }
    document.getElementById("addGroup").addEventListener("click", () => openEditor(null));
    document.getElementById("cancelGroup").addEventListener("click", closeEditor);
    document.getElementById("saveGroup").addEventListener("click", () => {
      const name = document.getElementById("groupName").value.trim();
      const description = document.getElementById("groupDesc").value.trim();
      const color = sanitizeColor(document.getElementById("groupColor").value);
      const words = document.getElementById("groupWords").value.split("\n").map((w) => w.trim()).filter(Boolean);
      if (!name) {
        alert("Group name is required");
        return;
      }
      if (!words.length) {
        alert("Add at least one word or phrase");
        return;
      }
      if (editingGroupId) {
        const g = customGroups.find((x) => x.id === editingGroupId);
        if (g) {
          g.name = name;
          g.description = description;
          g.color = color;
          g.words = words.slice(0, 1e3);
          g.hoverContent = { basicTip: description || "Custom detection: " + name };
          g.updatedAt = Date.now();
        }
      } else {
        const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "").substring(0, 30);
        const id = "custom_" + slug + "_" + Date.now();
        customGroups.push({
          id,
          name,
          color,
          description,
          enabled: true,
          words: words.slice(0, 1e3),
          hoverContent: { basicTip: description || "Custom detection: " + name },
          settingKey: "highlight_" + id,
          statKey: id + "Count",
          className: "bias-highlight-custom-" + id,
          createdAt: Date.now(),
          updatedAt: Date.now()
        });
        currentSettings["highlight_" + id] = true;
      }
      saveCustomGroups(() => {
        renderGroupList();
        closeEditor();
      });
    });
    document.getElementById("deleteGroup").addEventListener("click", () => {
      if (!editingGroupId)
        return;
      if (!confirm("Delete this custom group?"))
        return;
      const removed = customGroups.find((g) => g.id === editingGroupId);
      customGroups = customGroups.filter((g) => g.id !== editingGroupId);
      if (removed)
        delete currentSettings[removed.settingKey];
      saveCustomGroups(() => {
        renderGroupList();
        closeEditor();
      });
    });
    document.getElementById("exportGroups").addEventListener("click", () => {
      if (!customGroups.length) {
        alert("No custom groups to export");
        return;
      }
      const data = {
        version: 1,
        exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
        groups: customGroups.map((g) => ({
          name: g.name,
          color: g.color,
          description: g.description,
          words: g.words,
          hoverContent: g.hoverContent
        }))
      };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "custom-dictionaries.json";
      a.click();
      URL.revokeObjectURL(url);
    });
    document.getElementById("importGroups").addEventListener("click", () => {
      document.getElementById("importFile").click();
    });
    document.getElementById("importFile").addEventListener("change", (event) => {
      const file = event.target.files[0];
      if (!file)
        return;
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          if (!data.groups || !Array.isArray(data.groups)) {
            alert("Invalid import file format");
            return;
          }
          let imported = 0;
          for (const g of data.groups) {
            if (!g.name || customGroups.length >= 50)
              continue;
            const slug = String(g.name).toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "").substring(0, 30);
            const id = "custom_" + slug + "_" + Date.now() + "_" + imported;
            customGroups.push({
              id,
              name: String(g.name),
              color: sanitizeColor(g.color),
              description: g.description || "",
              enabled: true,
              words: (g.words || []).slice(0, 1e3),
              hoverContent: g.hoverContent || { basicTip: g.description || "Custom: " + g.name },
              settingKey: "highlight_" + id,
              statKey: id + "Count",
              className: "bias-highlight-custom-" + id,
              createdAt: Date.now(),
              updatedAt: Date.now()
            });
            currentSettings["highlight_" + id] = true;
            imported++;
          }
          saveCustomGroups(() => {
            renderGroupList();
            alert("Imported " + imported + " group(s)");
          });
        } catch (err) {
          alert("Failed to import: " + err.message);
        }
      };
      reader.readAsText(file);
      event.target.value = "";
    });
    loadAll();
  });
})();
//# sourceMappingURL=options.js.map

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
            description: '"Liberal" (from Latin liber, "free") has carried near-opposite meanings: classical liberalism \u2014 individual rights, free markets, limited government (Locke, Smith, Mill) \u2014 versus modern American usage, where since the New Deal it has meant social-welfare progressivism.',
            implication: `In much of Europe, Latin America, and Australia, "liberal" still leans market-oriented \u2014 Australia's Liberal Party sits center-right. A sentence about "liberals" can assert opposite things depending on where the writer and the reader learned the word, and as an epithet it attributes a single belief to a vast, varied group.`,
            suggestion: "Identify which tradition is meant, or name the actual policy, party, or group instead of the label.",
            examples: '"Liberals believe X" \u2014 American progressives? Classical liberals? A specific party? "Liberal democracy" uses the classical sense.',
            settingKey: "highlightSpectrumLiberal",
            statKey: "spectrumLiberalCount",
            basicTip: '"Liberal" carries near-opposite meanings across countries and traditions.',
            whenConcerning: "When used as a catch-all epithet or when the intended tradition is ambiguous",
            whenAcceptable: 'When the tradition or group is specified, or in proper names ("Liberal Democrats")'
          },
          conservative: {
            id: "conservative",
            name: "Conservative",
            icon: "\u{1F3DB}\uFE0F",
            color: "#8d6e63",
            description: "Conservatism, articulated by Edmund Burke in reaction to the French Revolution, names a disposition: preserving established institutions, preferring gradual change, and distrusting wholesale redesign of society.",
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
            description: 'In statistics, "significant" means the result is unlikely to be chance alone (conventionally p < 0.05). It says nothing about size or importance \u2014 a tiny, practically meaningless effect can be statistically significant in a large study.',
            implication: 'Reporting routinely lets the statistical meaning borrow the everyday meaning ("large, important"), making trivial effects sound consequential. The reverse also misleads: a "non-significant" result in a small study is not proof of no effect.',
            suggestion: "Look for the effect size: how big is the difference, in absolute terms, for real people?",
            examples: '"Significantly higher risk" might mean 1.0% \u2192 1.1%. Ask: how much higher, from what baseline?',
            settingKey: "highlightSciStatsSignificance",
            statKey: "sciStatsSignificanceCount",
            basicTip: 'Statistically "significant" means "probably not chance" \u2014 not big, and not important.',
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
            basicTip: '"Fascism" names specific historical movements; in casual use it often just intensifies disapproval.',
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
            basicTip: '"Populist" is descriptive in scholarship and usually pejorative in headlines \u2014 check which sense is in play.',
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
            description: 'Two related but distinct things share the name: a legal right \u2014 in the US, the First Amendment, which restrains *government* ("Congress shall make no law\u2026") \u2014 and a broader cultural value of open discourse (argued by Milton and Mill long before any constitution).',
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
            implication: "State censorship, platform moderation, editorial selection, and social pushback differ enormously in power and remedy \u2014 a government can imprison, a platform can remove, an editor can decline, a critic can only object. The single word erases those differences. Whether large platforms' moderation *should* be treated like public censorship is a genuine, unsettled debate; the word alone does not resolve it.",
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
            description: 'Courtroom standards imported into everyday judgment: "innocent until proven guilty" and "due process" govern what the *state* must do before punishing. "Defamation" (libel if written, slander if spoken) requires a false statement of fact \u2014 and in the US, for public figures, knowing or reckless falsehood (NYT v. Sullivan, 1964).',
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
            description: 'Inflation measures how fast prices are *rising*. "Inflation is falling" therefore means prices are rising more slowly \u2014 not that prices are falling (that would be deflation, which is rare and brings its own problems).',
            implication: 'During 2021\u201324 this confusion was everywhere: headlines celebrated "falling inflation" while readers wondered why groceries still cost more, because the price *level* kept the earlier increases. Disinflation (a slowing rate) and deflation (falling prices) are different phenomena with nearly identical-sounding coverage.',
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
            examples: '"Cut the deficit" while "the debt grew" \u2014 both true at once, and routinely deployed against each other.',
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
            description: '"Middle class" has no standard definition \u2014 income bands, wealth, occupation, and self-image all give different answers, and in surveys large majorities across very different incomes place themselves in it. "Record profits" and similar records are often nominal: in a growing economy with inflation, records are routine.',
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
            basicTip: "Real conspiracies exist; the useful test is falsifiability, not the label.",
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
            description: `From Karl Popper's The Open Society and Its Enemies (1945): "unlimited tolerance must lead to the disappearance of tolerance." The meme version stops there. Popper's footnote continues: intolerant philosophies should be countered by argument and public opinion as long as that works \u2014 he reserved suppression for movements that reject rational debate and answer arguments with violence.`,
            implication: 'The paradox gets invoked as a finished argument, but it does not answer the hard question \u2014 who counts as intolerant, judged by whom, by what standard \u2014 which is decided *before* the paradox applies and is where the actual disagreement lives. Both failure modes are real: unlimited tolerance can shelter movements that would end it, and an elastic definition of "intolerance" can license excluding ordinary disagreement.',
            suggestion: "Ask what specific conduct is called intolerant, whether argument and public opinion have failed, and who gets to decide \u2014 the paradox itself settles none of these.",
            examples: `"We must be intolerant of intolerance" \u2014 of violent rejection of debate (Popper's case), or of a position the speaker opposes?`,
            settingKey: "highlightDebateToleranceParadox",
            statKey: "debateToleranceParadoxCount",
            basicTip: "Popper's paradox is qualified \u2014 counter by argument while you can \u2014 and it never answers who counts as intolerant.",
            whenConcerning: "When the paradox is deployed as a finished argument, skipping the who-decides question",
            whenAcceptable: "When Popper's actual conditions (rejection of debate, resort to violence) are argued, not assumed"
          },
          slippery_slope: {
            id: "slippery_slope",
            name: "Slippery Slope",
            icon: "\u{1F6DD}",
            color: "#6d4c41",
            description: "Named as a fallacy when a chain from step A to feared outcome Z is asserted without any mechanism. But slope arguments are not automatically fallacious: precedent, incentive shifts, and boundary erosion are real, studiable mechanisms, and courts treat precedent-based slope arguments seriously.",
            implication: `The label cuts both ways: "that's a slippery slope fallacy" can dismiss a legitimate argument about how a rule will actually be extended, while a bare slope claim can smuggle in an unargued chain of dominoes. The difference is whether a mechanism is shown and whether anything plausibly stops the slide.`,
            suggestion: "Ask for the mechanism: what specifically carries step one to the feared end, and what would stop it along the way?",
            examples: '"This leads inevitably to X" \u2014 by what mechanism? / "Slippery slope fallacy!" \u2014 is there a mechanism being ignored?',
            settingKey: "highlightDebateSlipperySlope",
            statKey: "debateSlipperySlopeCount",
            basicTip: "Slope arguments are fallacious without a mechanism and legitimate with one \u2014 the label alone cannot tell you which.",
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
            suggestion: "For strawman claims: quote the original and the response. For ad hominem: is the personal point relevant to credibility, or substituting for engagement?",
            examples: `"You're strawmanning me" \u2014 what was the real claim? "That's ad hominem" \u2014 or is the witness's reliability the issue?`,
            settingKey: "highlightDebateStrawman",
            statKey: "debateStrawmanCount",
            basicTip: "Fallacy accusations are claims too: a strawman charge needs the original quoted; ad hominem is legitimate when credibility is the question.",
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
            description: "Relevance fallacies: a red herring drags the argument toward something vivid but beside the point; a non sequitur draws a conclusion that does not follow from what preceded it; a Gish gallop buries an opponent under more claims than can be answered in the time available.",
            implication: 'The moves are real \u2014 misdirection and overload win debates without winning arguments. But the labels also get used to duck relevant points: calling context a "red herring" or a cumulative case a "Gish gallop" can itself be the evasion.',
            suggestion: "Ask what the original question was and whether the point at issue actually bears on it \u2014 in either direction.",
            examples: `"That's a red herring" \u2014 is it off the point, or an inconvenient part of it?`,
            settingKey: "highlightFallacyRelevance",
            statKey: "fallacyRelevanceCount",
            basicTip: "Red herrings and non sequiturs break relevance \u2014 but the labels can also duck points that are relevant.",
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
            examples: `"You can't compare X to Y" \u2014 why not, in the respect being argued? "This is just like [atrocity]" \u2014 in what specific way?`,
            settingKey: "highlightFallacyComparison",
            statKey: "fallacyComparisonCount",
            basicTip: "Comparisons carry arguments: what matters is whether the cases are alike in the respects the conclusion needs.",
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
            examples: `"Your argument is fallacious, so you're wrong" \u2014 the first half can be true and the second not follow.`,
            settingKey: "highlightFallacyMeta",
            statKey: "fallacyMetaCount",
            basicTip: "Naming a fallacy discounts an argument, never the conclusion \u2014 that mistake is itself the fallacy fallacy.",
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

  // src/dictionaries/opinion-words.js
  var opinionWords = {
    certainty: {
      icon: "\u{1F3AF}",
      color: "#ff6b6b",
      name: "Certainty/Conviction",
      description: "Words that push readers toward unquestioning acceptance by conveying false certainty about debatable topics.",
      implication: "Creates false authority and discourages critical thinking by presenting opinions as indisputable facts.",
      suggestion: "Use more tentative language that acknowledges uncertainty and invites evaluation.",
      examples: 'Instead of "obviously wrong" \u2192 "appears to contradict" or "I believe this is incorrect"',
      words: {
        2: [
          "clearly",
          "obviously",
          "certainly",
          "definitely",
          "absolutely",
          "surely",
          "manifestly",
          "patently"
        ],
        3: [
          "undoubtedly",
          "undeniably",
          "unquestionably",
          "indisputably",
          "indubitably",
          "unmistakably",
          "incontrovertibly",
          "incontestably",
          "irrefutably"
        ]
      }
    },
    hedging: {
      icon: "\u2753",
      color: "#ffa726",
      name: "Hedging/Uncertainty",
      description: "Words that create unnecessary doubt or vagueness, often to avoid taking responsibility for claims.",
      implication: "Undermines confidence and can signal the writer is unsure of their position or trying to avoid accountability.",
      suggestion: "Be more definitive when you have evidence, or explain the specific reasons for uncertainty.",
      examples: 'Instead of "maybe true" \u2192 "requires further investigation" or "preliminary evidence suggests"',
      words: {
        1: [
          "probably",
          "maybe",
          "perhaps",
          "conceivably",
          "speculated",
          "rumored"
        ]
      }
    },
    evaluative_positive: {
      icon: "\u{1F44D}",
      color: "#66bb6a",
      name: "Positive Evaluation",
      description: "Subjective positive judgments that reveal the writer's approval without objective criteria.",
      implication: "Biases readers toward positive evaluation without providing evidence or reasoning for the judgment.",
      suggestion: "Replace with specific, measurable criteria or acknowledge the subjective nature of the evaluation.",
      examples: 'Instead of "excellent performance" \u2192 "achieved 95% accuracy" or "I consider this performance strong because..."',
      words: {
        1: [
          "good",
          "favorable",
          "positive",
          "satisfactory",
          "pleasing",
          "beneficial",
          "advantageous",
          "desirable",
          "worthy",
          "gratifying"
        ],
        2: [
          "great",
          "excellent",
          "exceptional",
          "outstanding",
          "admirable",
          "commendable",
          "praiseworthy",
          "superior",
          "first-rate",
          "top-notch",
          "premium"
        ],
        3: [
          "perfect",
          "flawless",
          "exemplary",
          "stellar"
        ]
      }
    },
    evaluative_negative: {
      icon: "\u{1F44E}",
      color: "#ef5350",
      name: "Negative Evaluation",
      description: "Subjective negative judgments that reveal the writer's disapproval without objective criteria.",
      implication: "Biases readers toward negative evaluation without providing evidence or reasoning for the judgment.",
      suggestion: "Replace with specific, measurable criteria or acknowledge the subjective nature of the evaluation.",
      examples: 'Instead of "poor quality" \u2192 "failed to meet safety standards" or "I find this concerning because..."',
      words: {
        1: [
          "poor",
          "inadequate",
          "mediocre",
          "disappointing",
          "unsatisfactory",
          "deficient",
          "unfortunate",
          "unfavorable",
          "disagreeable",
          "unpleasant",
          "troublesome",
          "problematic",
          "bad"
        ],
        2: [
          "inferior",
          "substandard",
          "faulty",
          "flawed",
          "shoddy",
          "regrettable",
          "miserable",
          "dismal",
          "grim",
          "bleak",
          "dire",
          "grave",
          "severe",
          "distressing",
          "objectionable"
        ],
        3: [
          "abysmal",
          "deplorable",
          "lamentable",
          "pathetic",
          "pitiful",
          "wretched",
          "reprehensible",
          "repugnant",
          "detestable",
          "unacceptable"
        ]
      }
    },
    emotional_charge: {
      icon: "\u26A1",
      color: "#ab47bc",
      name: "Emotional Charge",
      description: "Words designed to trigger strong emotional responses that bypass logical evaluation.",
      implication: "Manipulates readers through emotion rather than reason, potentially clouding judgment.",
      suggestion: "Use neutral language that allows readers to form their own emotional responses based on facts.",
      examples: 'Instead of "heartwarming story" \u2192 "story about community support" or "horrifying event" \u2192 "traumatic incident"',
      words: {
        1: [
          "touching",
          "moving",
          "soothing",
          "comforting",
          "reassuring",
          "uplifting",
          "delightful",
          "worrying",
          "concerning"
        ],
        2: [
          "heartwarming",
          "exhilarating",
          "thrilling",
          "exciting",
          "sensational",
          "disgusting",
          "revolting",
          "sickening",
          "nauseating",
          "offensive",
          "alarming",
          "threatening"
        ],
        3: [
          "frightening",
          "terrifying",
          "horrifying"
        ]
      }
    },
    comparative: {
      icon: "\u{1F4CA}",
      color: "#42a5f5",
      name: "Comparative/Superlative",
      description: "Words that create artificial rankings or comparisons without context or criteria.",
      implication: "Establishes hierarchies without justification, potentially misleading readers about relative importance or quality.",
      suggestion: "Provide specific criteria for comparison or use measured language that acknowledges context.",
      examples: 'Instead of "the best solution" \u2192 "an effective solution" or "the most efficient approach we tested"',
      words: {
        1: [
          "better",
          "worse",
          "greater",
          "lesser",
          "bigger",
          "smaller",
          "higher",
          "lower",
          "finer",
          "poorer"
        ],
        2: [
          "best",
          "worst",
          "superior",
          "inferior",
          "strongest",
          "weakest",
          "finest",
          "smartest",
          "brightest",
          "darkest"
        ],
        3: [
          "prettiest",
          "ugliest",
          "dumbest"
        ]
      }
    },
    political_framing: {
      icon: "\u{1F3DB}\uFE0F",
      color: "#8d6e63",
      name: "Political Framing",
      description: "Words that frame issues in political terms, potentially polarizing neutral topics.",
      implication: "Activates political identity and tribal thinking, making objective evaluation more difficult.",
      suggestion: "Use neutral, descriptive language that focuses on specific policies or actions rather than political labels.",
      examples: 'Instead of "radical proposal" \u2192 "proposal that differs significantly from current policy" or describe specific elements',
      words: {
        1: [
          "controversial",
          "disputed",
          "moderate",
          "centrist",
          "mainstream",
          "traditional",
          "conventional",
          "unconventional",
          "orthodox",
          "unorthodox",
          "bipartisan"
        ],
        2: [
          "progressive",
          "conservative",
          "liberal",
          "fringe",
          "establishment",
          "anti-establishment",
          "populist",
          "elitist",
          "partisan",
          "divisive",
          "polarizing",
          "contentious",
          "provocative"
        ],
        3: [
          "radical",
          "extreme",
          "far-right",
          "far-left",
          "revolutionary"
        ]
      }
    },
    intensifiers: {
      icon: "\u{1F525}",
      color: "#ff7043",
      name: "Intensifiers",
      description: "Words that amplify or exaggerate without adding meaningful information.",
      implication: "Creates artificial emphasis that can distort the actual significance of events or characteristics.",
      suggestion: "Use specific, measurable descriptions or remove unnecessary intensification.",
      examples: 'Instead of "extremely important" \u2192 "critical for project success" or "increased by 300%"',
      words: {
        1: [
          "very",
          "particularly",
          "especially",
          "notably",
          "surprisingly",
          "unusually",
          "seriously",
          "substantially",
          "significantly",
          "considerably"
        ],
        2: [
          "extremely",
          "incredibly",
          "exceptionally",
          "extraordinarily",
          "remarkably",
          "strikingly",
          "decidedly",
          "markedly",
          "profoundly",
          "deeply",
          "vastly",
          "greatly",
          "highly",
          "immensely",
          "tremendously",
          "enormously"
        ],
        3: [
          "exceedingly",
          "excessively",
          "overly",
          "utterly",
          "completely",
          "entirely",
          "totally",
          "wholly",
          "thoroughly",
          "fully",
          "intensely"
        ]
      }
    },
    credibility_undermining: {
      icon: "\u{1F5E3}\uFE0F",
      color: "#78909c",
      name: "Credibility Undermining",
      description: "Words that question or attack credibility without providing evidence or reasoning.",
      implication: "Weakens trust in sources through insinuation rather than substantive critique.",
      suggestion: "Address specific claims with evidence rather than attacking the source's credibility.",
      examples: 'Instead of "so-called expert" \u2192 "Dr. Smith, whose methodology differs from mainstream approaches" or address specific claims',
      words: {
        1: [
          "claims",
          "purports",
          "asserts",
          "alleges",
          "contends",
          "maintains",
          "insists"
        ],
        2: [
          "so-called",
          "self-proclaimed",
          "supposed",
          "pretend",
          "dubious",
          "questionable",
          "unproven",
          "unverified"
        ],
        3: [
          "unsubstantiated",
          "unfounded",
          "baseless",
          "groundless"
        ]
      }
    },
    loaded_political: {
      icon: "\u2696\uFE0F",
      color: "#5d4037",
      name: "Loaded Political Terms",
      description: "Words that carry heavy political or ideological baggage, triggering partisan responses.",
      implication: "Activates political identity and bias, making neutral evaluation difficult.",
      suggestion: "Use specific, descriptive language that focuses on actions or policies rather than loaded terms.",
      examples: 'Instead of "socialist policies" \u2192 "government-funded programs" or "authoritarian regime" \u2192 "government that restricts civil liberties"',
      words: {
        1: [
          "freedom",
          "justice",
          "equality",
          "rights",
          "liberty",
          "democracy",
          "patriotic",
          "fair",
          "unfair"
        ],
        2: [
          "unpatriotic",
          "un-American",
          "socialist",
          "communist",
          "corrupt",
          "crooked",
          "dishonest",
          "shady",
          "illegal",
          "unlawful",
          "criminal",
          "scandal",
          "regime",
          "propaganda"
        ],
        3: [
          "fascist",
          "dictatorial",
          "totalitarian",
          "authoritarian",
          "conspiracy"
        ]
      }
    },
    moral_judgments: {
      icon: "\u2696\uFE0F",
      color: "#7e57c2",
      name: "Moral/Ethical Judgments",
      description: "Words that impose moral frameworks without acknowledging their subjective nature.",
      implication: "Presents moral judgments as universal truths rather than perspective-dependent evaluations.",
      suggestion: "Acknowledge the subjective nature of moral judgments or specify the ethical framework being used.",
      examples: 'Instead of "immoral behavior" \u2192 "behavior that violates principle X" or "I consider this unethical because..."',
      words: {
        1: [
          "moral",
          "ethical",
          "just",
          "unjust",
          "fair",
          "unfair",
          "honest",
          "dishonest",
          "decent",
          "appropriate",
          "inappropriate",
          "acceptable",
          "unacceptable",
          "legitimate",
          "illegitimate",
          "reasonable",
          "unreasonable"
        ],
        2: [
          "immoral",
          "unethical",
          "virtuous",
          "corrupt",
          "honorable",
          "dishonorable",
          "indecent"
        ]
      }
    },
    emotional_appeals: {
      icon: "\u{1F4AD}",
      color: "#26a69a",
      name: "Emotional Appeals",
      description: "Words that bypass logical evaluation by directly targeting emotional responses.",
      implication: "Manipulates emotional state to influence opinion without providing rational justification.",
      suggestion: "Focus on factual information that allows readers to form their own emotional responses.",
      examples: 'Instead of "promising developments" \u2192 "developments that may lead to improved outcomes" or provide specific evidence',
      words: {
        1: [
          "promising",
          "optimistic",
          "pessimistic",
          "confident",
          "proud",
          "embarrassed"
        ],
        2: [
          "depressing",
          "gloomy",
          "anxious",
          "fearful",
          "afraid",
          "ashamed",
          "guilty"
        ]
      }
    }
  };
  function flattenWords(categoryWords) {
    if (Array.isArray(categoryWords))
      return categoryWords;
    return Object.values(categoryWords).flat();
  }
  var opinionWordsFlat = Object.values(opinionWords).flatMap(
    (category) => flattenWords(category.words)
  );

  // src/dictionaries/tobe-verbs.js
  var toBeVerbs = [
    // Present forms
    "is",
    "are",
    "am",
    // Past forms
    "was",
    "were",
    // Infinitive and participles
    "be",
    "being",
    "been",
    // Contractions with word boundaries
    "it's",
    "that's",
    "he's",
    "she's",
    "what's",
    "who's",
    "you're",
    "they're",
    "we're",
    "i'm",
    "there's",
    "here's",
    "wasn't",
    "weren't",
    "isn't",
    "aren't"
  ];

  // src/dictionaries/absolute-words.js
  var absoluteWords = {
    1: [
      // Soft universals — often used casually without absolute intent
      "any",
      "each",
      "anyone",
      "anybody",
      "someone",
      "somebody",
      "something",
      "anything",
      "full",
      "whole",
      "final",
      "mere"
    ],
    2: [
      // Standard absolutes — categorical claims that are rarely literally true
      "all",
      "every",
      "no",
      "none",
      "everyone",
      "everybody",
      "no one",
      "nobody",
      "everything",
      "nothing",
      "always",
      "never",
      "forever",
      "constantly",
      "continually",
      "invariably",
      "permanently",
      "perfect",
      "complete",
      "total",
      "absolute",
      "entire",
      "maximum",
      "minimum",
      "supreme",
      "extreme",
      "utmost",
      "ultimate",
      "universal",
      "impossible",
      "inevitable",
      "inescapable",
      "identical",
      "pure",
      "sheer",
      "ultimately",
      "fundamentally",
      "purely",
      "outright",
      "comprehensively",
      "universally"
    ],
    3: [
      // Emphatic absolutes — intensified language that brooks no exception
      "absolutely",
      "definitely",
      "certainly",
      "totally",
      "completely",
      "utterly",
      "entirely",
      "eternal",
      "perpetually",
      "endlessly",
      "ceaselessly",
      "infallible",
      "unerring",
      "undeniable",
      "irrefutable",
      "undoubtedly",
      "unquestionably",
      "indisputably",
      "irrefutably",
      "incontrovertibly",
      "incontestably",
      "unequivocally"
    ]
  };
  var absoluteWordsFlat = Object.values(absoluteWords).flat();

  // src/dictionaries/passive-patterns.js
  var passivePatterns = [
    // Basic passive patterns
    "was\\s+\\w+ed",
    "were\\s+\\w+ed",
    "has\\s+been\\s+\\w+ed",
    "have\\s+been\\s+\\w+ed",
    "had\\s+been\\s+\\w+ed",
    "is\\s+being\\s+\\w+ed",
    "are\\s+being\\s+\\w+ed",
    "will\\s+be\\s+\\w+ed",
    "would\\s+be\\s+\\w+ed",
    "can\\s+be\\s+\\w+ed",
    "could\\s+be\\s+\\w+ed",
    "may\\s+be\\s+\\w+ed",
    "might\\s+be\\s+\\w+ed",
    "should\\s+be\\s+\\w+ed",
    "must\\s+be\\s+\\w+ed",
    // Common irregular past participles
    "was\\s+(written|taken|given|made|done|seen|known|shown|chosen|broken|spoken|driven|forgotten|eaten|beaten)",
    "were\\s+(written|taken|given|made|done|seen|known|shown|chosen|broken|spoken|driven|forgotten|eaten|beaten)",
    "has\\s+been\\s+(written|taken|given|made|done|seen|known|shown|chosen|broken|spoken|driven|forgotten|eaten|beaten)",
    "have\\s+been\\s+(written|taken|given|made|done|seen|known|shown|chosen|broken|spoken|driven|forgotten|eaten|beaten)",
    // Common passive phrases that hide agency
    "it\\s+is\\s+believed",
    "it\\s+is\\s+thought",
    "it\\s+is\\s+said",
    "it\\s+has\\s+been\\s+reported",
    "it\\s+was\\s+reported",
    "it\\s+is\\s+considered",
    "it\\s+is\\s+expected",
    "mistakes\\s+were\\s+made",
    "concerns\\s+have\\s+been\\s+raised",
    "questions\\s+have\\s+been\\s+asked",
    "decisions\\s+were\\s+made",
    "action\\s+was\\s+taken",
    "measures\\s+were\\s+implemented",
    "steps\\s+have\\s+been\\s+taken"
  ];

  // src/dictionaries/weasel-phrases.js
  var weaselWords = {
    unnamed_sources: {
      icon: "\u{1F464}",
      color: "#5d4037",
      name: "Unnamed Sources",
      description: "References to anonymous or vague sources that cannot be verified or held accountable.",
      implication: "Allows claims to appear sourced without any verifiable attribution, making fact-checking impossible.",
      suggestion: "Ask: WHO specifically said this? Name the person, organization, or publication.",
      examples: 'Instead of "sources indicate" \u2192 "a senior official at the EPA told Reuters" or name the specific source',
      words: {
        1: [
          "some say",
          "they say",
          "people think",
          "some argue",
          "observers note"
        ],
        2: [
          "many people say",
          "critics claim",
          "supporters maintain",
          "sources indicate",
          "according to reports",
          "some experts say",
          "authorities believe"
        ],
        3: [
          "unnamed sources",
          "insiders claim",
          "well-placed sources",
          "those familiar with the matter",
          "people close to the situation",
          "those in the know"
        ]
      }
    },
    hedged_evidence: {
      icon: "\u{1F4CB}",
      color: "#00838f",
      name: "Hedged Evidence",
      description: "References to evidence, research, or data without providing specific citations or details.",
      implication: "Creates an appearance of evidence-based reasoning while avoiding any verifiable claim.",
      suggestion: "Ask: WHICH study? Published WHERE? By WHOM? Provide the actual citation.",
      examples: 'Instead of "research suggests" \u2192 "a 2024 study by Smith et al. in Nature found..."',
      words: {
        1: [
          "may indicate",
          "could suggest",
          "might imply",
          "polls suggest"
        ],
        2: [
          "research suggests",
          "evidence suggests",
          "data indicates",
          "experts believe",
          "it is believed",
          "it is thought",
          "it is said",
          "findings indicate",
          "analysis reveals"
        ],
        3: [
          "studies have shown",
          "science tells us",
          "the data shows"
        ]
      }
    },
    vague_quantifiers: {
      icon: "\u{1F4CA}",
      color: "#7b1fa2",
      name: "Vague Quantifiers",
      description: "Imprecise frequency or quantity words that avoid committing to specific numbers or rates.",
      implication: "Obscures actual rates and magnitudes, allowing the reader to imagine whatever quantity supports the argument.",
      suggestion: "Ask: HOW MANY exactly? Replace with specific numbers, percentages, or ranges.",
      examples: 'Instead of "in many cases" \u2192 "in 73% of cases" or "in 8 out of 12 trials"',
      words: {
        1: [
          "in some cases",
          "frequently",
          "typically",
          "tends to",
          "on occasion",
          "from time to time",
          "in certain situations",
          "under some circumstances"
        ],
        2: [
          "in many cases",
          "in most cases",
          "more often than not",
          "time and again",
          "as often as not"
        ]
      }
    },
    appeal_to_authority: {
      icon: "\u{1F393}",
      color: "#1565c0",
      name: "Appeal to Authority",
      description: "Invocations of unnamed experts or consensus to lend credibility without verifiable backing.",
      implication: "Borrows authority from unnamed or unqualified sources rather than presenting evidence directly.",
      suggestion: "Ask: Which SPECIFIC experts? In what FIELD? Is this their area of expertise?",
      examples: 'Instead of "experts believe" \u2192 "Dr. Chen, a climate scientist at MIT, found..."',
      words: {
        1: [
          "widely known",
          "widely believed",
          "generally accepted",
          "commonly believed",
          "often said"
        ],
        2: [
          "the consensus is",
          "it is well established",
          "leading experts agree",
          "top scientists confirm",
          "scholars maintain",
          "mainstream opinion holds"
        ],
        3: [
          "the scientific community agrees"
        ]
      }
    },
    passive_attribution: {
      icon: "\u{1F32B}\uFE0F",
      color: "#546e7a",
      name: "Passive Attribution",
      description: "Qualifying words that distance the writer from claims, adding plausible deniability.",
      implication: "Lets the writer advance claims while retaining the ability to disown them if challenged.",
      suggestion: "Notice the writer is not committing to the claim \u2014 ask what they actually believe and why.",
      examples: 'Instead of "reportedly" \u2192 state the claim directly and cite the source, or acknowledge uncertainty explicitly',
      words: {
        1: [
          "reportedly",
          "allegedly",
          "supposedly",
          "arguably",
          "presumably",
          "ostensibly",
          "purportedly",
          "apparently",
          "seemingly",
          "it would appear",
          "one might say"
        ],
        2: [
          "it has been suggested",
          "there are those who say",
          "some would argue",
          "it could be said"
        ]
      }
    }
  };
  function flattenWords2(categoryWords) {
    if (Array.isArray(categoryWords))
      return categoryWords;
    return Object.values(categoryWords).flat();
  }
  var weaselPhrasesFlat = Object.values(weaselWords).flatMap(
    (category) => flattenWords2(category.words)
  );
  var weaselPhrases = weaselPhrasesFlat;

  // src/dictionaries/presupposition-markers.js
  var presuppositionMarkers = [
    // Basic presupposition triggers
    "even",
    "still",
    "another",
    "finally",
    "already",
    "yet",
    "again",
    // Loaded verbs
    "continues\\s+to",
    "refuses\\s+to",
    "fails\\s+to",
    "admits",
    "denies",
    "acknowledges",
    // Loaded phrases
    "despite\\s+claiming",
    "while\\s+claiming",
    "so-called",
    "alleged",
    "supposed",
    "pretend",
    "the\\s+fact\\s+that",
    "of\\s+course",
    // Temporal presuppositions
    "no\\s+longer",
    "not\\s+anymore",
    "\\bused\\s+to\\b",
    // Additional presupposition markers
    "manages\\s+to",
    "happens\\s+to",
    "tends\\s+to",
    "keeps\\s+on",
    "goes\\s+on\\s+to"
  ];

  // src/dictionaries/war-metaphors.js
  var warMetaphors = [
    "battle",
    "fight",
    "combat",
    "attack",
    "defend",
    "offensive",
    "defensive",
    "strategy",
    "tactics",
    "frontline",
    "battlefield",
    "war\\s+on",
    "fight\\s+against",
    "crusade",
    "campaign\\s+against",
    "under\\s+fire",
    "under\\s+attack",
    "bombarded",
    "arsenal",
    "ammunition",
    "weapon",
    "target",
    "enemy",
    "defeat",
    "victory",
    "conquer",
    "siege",
    "assault",
    "invade",
    "retreat",
    "bombshell",
    "blitz",
    "skirmish",
    "trench",
    "barrage",
    "striking\\s+back",
    "counter\\s+attack",
    "line\\s+of\\s+defense"
  ];

  // src/dictionaries/minimizers.js
  var minimizers = [
    "just",
    "only",
    "merely",
    "simply",
    "barely",
    "hardly",
    "scarcely",
    "slightly",
    "somewhat",
    "a\\s+bit\\b",
    "a\\s+little",
    "minor",
    "small",
    "tiny",
    "trivial",
    "insignificant",
    "negligible",
    "marginal",
    "relatively",
    "fairly",
    "rather",
    "quite",
    "pretty",
    "kind\\s+of",
    "sort\\s+of"
  ];

  // src/dictionaries/maximizers.js
  var maximizerWords = {
    scale_inflation: {
      icon: "\u{1F4CF}",
      color: "#6a1b9a",
      name: "Scale Inflation",
      description: "Words that inflate physical or numerical magnitude without comparative context.",
      implication: "Creates a false sense of scale by using extreme size language for things that may be moderate or normal.",
      suggestion: "Ask: compared to what baseline? Replace with specific measurements or comparisons.",
      examples: 'Instead of "massive increase" \u2192 "a 15% increase" or "an increase three times the annual average"',
      words: [
        "massive",
        "huge",
        "enormous",
        "gigantic",
        "colossal",
        "vast",
        "immense",
        "towering",
        "overwhelming",
        "mammoth",
        "gargantuan",
        "titanic"
      ]
    },
    catastrophizing: {
      icon: "\u{1F6A8}",
      color: "#b71c1c",
      name: "Catastrophizing",
      description: "Crisis and disaster language applied to situations that may not warrant emergency framing.",
      implication: "Triggers fear responses for non-emergency situations, distorting risk perception and urgency.",
      suggestion: "Ask: is this genuinely a crisis? Replace with proportionate language and specific impact data.",
      examples: 'Instead of "crisis" \u2192 "a growing concern" or "a problem affecting 5% of users"',
      words: [
        "crisis",
        "disaster",
        "catastrophe",
        "epidemic",
        "plague",
        "explosion",
        "apocalyptic",
        "calamity",
        "cataclysm",
        "meltdown",
        "fiasco",
        "debacle",
        "train wreck"
      ]
    },
    dramatic_verbs: {
      icon: "\u{1F4A5}",
      color: "#e65100",
      name: "Dramatic Verbs",
      description: "Verbs that exaggerate the degree of change or destruction beyond what the facts support.",
      implication: "Replaces measured description with violent or extreme action language, distorting actual impact.",
      suggestion: "Ask: what are the actual numbers? Replace with precise verbs that describe the real magnitude.",
      examples: 'Instead of "costs skyrocketed" \u2192 "costs increased by 40%" or "costs rose sharply over six months"',
      words: [
        "skyrocket",
        "plummet",
        "devastate",
        "destroy",
        "annihilate",
        "obliterate",
        "decimate",
        "implode",
        "explode",
        "torpedo",
        "shatter",
        "ravage",
        "gut",
        "eviscerate",
        "cripple"
      ]
    },
    superlative_hype: {
      icon: "\u2728",
      color: "#1565c0",
      name: "Superlative Hype",
      description: "Adjectives of extreme impressiveness that create false uniqueness or exceptionality.",
      implication: "Makes ordinary things sound extraordinary, inflating expectations and distorting significance.",
      suggestion: "Ask: unprecedented compared to what? Replace with specific evidence of what makes this notable.",
      examples: 'Instead of "unprecedented" \u2192 "the first since 2008" or "exceeds previous records by 12%"',
      words: [
        "revolutionary",
        "unprecedented",
        "extraordinary",
        "incredible",
        "amazing",
        "astonishing",
        "staggering",
        "spectacular",
        "phenomenal",
        "unparalleled",
        "unrivaled",
        "unmatched",
        "mind-blowing",
        "jaw-dropping",
        "awe-inspiring"
      ]
    },
    paradigm_shift: {
      icon: "\u{1F504}",
      color: "#2e7d32",
      name: "Paradigm Shift",
      description: "Claims of transformative, game-changing impact that imply everything has fundamentally changed.",
      implication: "Overstates the significance of changes, implying a complete transformation when the reality may be incremental.",
      suggestion: "Ask: what specifically changed? Replace with concrete descriptions of what is different and how.",
      examples: 'Instead of "game changing" \u2192 "introduces a new approach to X that reduces cost by 30%"',
      words: [
        "monumental",
        "tremendous",
        "breakthrough",
        "game\\s+changing",
        "earth\\s+shattering",
        "paradigm\\s+shifting",
        "world\\s+changing",
        "transformative",
        "disruptive",
        "landmark",
        "watershed",
        "sea\\s+change",
        "tipping\\s+point",
        "turning\\s+point"
      ]
    }
  };
  var maximizersFlat = Object.values(maximizerWords).flatMap((category) => category.words);
  var maximizers = maximizersFlat;

  // src/dictionaries/false-balance.js
  var falseBalancePhrases = [
    // Direct balance phrases
    "both sides",
    "on one hand",
    "on the other hand",
    "equally valid",
    "two sides to every story",
    "balanced perspective",
    "middle ground",
    "neutral position",
    "unbiased view",
    "fair and balanced",
    // False equivalence markers
    "just as",
    "equally problematic",
    "similarly concerning",
    "two schools of thought",
    "competing theories",
    "different perspectives",
    "various viewpoints",
    "diverse opinions",
    // Debate framing
    "controversial issue",
    "ongoing debate",
    "disputed topic",
    "contentious matter",
    "divisive issue",
    "polarizing topic",
    "heated discussion",
    "matter of opinion",
    "subjective issue",
    // Neutrality performance
    "to be fair",
    "in fairness",
    "playing devil's advocate",
    "for the sake of argument",
    "another way to look at it",
    "from another angle",
    "alternative viewpoint",
    "counterargument",
    // Balance rhetoric
    "pros and cons",
    "advantages and disadvantages",
    "benefits and drawbacks",
    "strengths and weaknesses",
    "opportunities and challenges",
    "supporters and critics",
    "proponents and opponents"
  ];

  // src/dictionaries/euphemisms.js
  var euphemismWords = {
    political_euphemism: {
      icon: "\u{1F3DB}\uFE0F",
      color: "#5c6bc0",
      name: "Political Euphemism",
      description: "Government and policy language that obscures controversial actions behind neutral-sounding terminology.",
      implication: "Conceals the true nature of government actions, making harmful policies harder to evaluate and oppose.",
      suggestion: "Replace with direct language that describes what actually happens.",
      examples: 'Instead of "enhanced interrogation" \u2192 "torture" or "coercive interrogation techniques"',
      words: [
        "enhanced interrogation",
        "collateral damage",
        "friendly fire",
        "extraordinary rendition",
        "neutralize",
        "pacification",
        "strategic withdrawal",
        "tactical redeployment",
        "kinetic action",
        "regime change",
        "nation building",
        "peacekeeping operation",
        "police action",
        "security operation",
        "freedom fighters",
        "detainee",
        "unlawful combatant",
        "rendition program"
      ]
    },
    corporate_euphemism: {
      icon: "\u{1F4BC}",
      color: "#78909c",
      name: "Corporate Euphemism",
      description: "Business language that softens negative outcomes like job losses, price increases, and failures.",
      implication: "Disguises harm to workers, consumers, and communities behind professional-sounding jargon.",
      suggestion: "Use plain language that makes the impact on people clear.",
      examples: 'Instead of "rightsizing" \u2192 "laying off employees" or "cutting 200 jobs"',
      words: [
        "rightsizing",
        "downsizing",
        "restructuring",
        "optimization",
        "streamlining",
        "synergy realization",
        "workforce adjustment",
        "negative growth",
        "deferred success",
        "challenging market conditions",
        "revenue enhancement",
        "price adjustment",
        "value engineering",
        "headcount reduction",
        "involuntary separation",
        "career transition",
        "operational efficiency",
        "resource reallocation",
        "sunset"
      ]
    },
    social_euphemism: {
      icon: "\u{1F91D}",
      color: "#66bb6a",
      name: "Social Euphemism",
      description: "Socially polite substitutions used out of sensitivity, courtesy, or respect for dignity.",
      implication: "Often well-intentioned and appropriate, but can sometimes obscure issues that need direct discussion.",
      suggestion: "Consider whether the euphemism serves genuine respect or avoids a conversation that needs directness.",
      examples: '"Passed away" is appropriate for sensitive contexts; "economically disadvantaged" may obscure systemic poverty',
      words: [
        "passed away",
        "departed",
        "no longer with us",
        "resting in peace",
        "economically disadvantaged",
        "underprivileged",
        "underserved",
        "differently abled",
        "physically challenged",
        "special needs",
        "senior citizens",
        "golden years",
        "twilight years",
        "between jobs",
        "let go",
        "expecting",
        "correctional facility",
        "substance abuse",
        "unhoused"
      ]
    },
    military_euphemism: {
      icon: "\u{1F396}\uFE0F",
      color: "#b71c1c",
      name: "Military Euphemism",
      description: "Military jargon that sanitizes violence, casualties, and the human cost of warfare.",
      implication: "Makes warfare and its consequences more palatable, reducing public scrutiny of military actions.",
      suggestion: "Describe the actual human impact rather than using sanitized military terminology.",
      examples: 'Instead of "surgical strike" \u2192 "bombing that killed 12 people" or "targeted airstrike on a residential area"',
      words: [
        "surgical strike",
        "precision bombing",
        "smart weapons",
        "soft targets",
        "hard targets",
        "assets",
        "resources",
        "theater of operations",
        "rules of engagement",
        "force projection",
        "boots on the ground",
        "area denial",
        "neutralization",
        "ordnance delivery",
        "servicing the target",
        "engage the enemy"
      ]
    },
    dysphemism: {
      icon: "\u{1F525}",
      color: "#e65100",
      name: "Dysphemism",
      description: "Loaded negative framing that inflames perception \u2014 the rhetorical opposite of a euphemism.",
      implication: "Provokes hostility and negative emotional reactions by replacing neutral terms with inflammatory ones.",
      suggestion: "Replace with neutral, descriptive language that allows readers to form their own judgments.",
      examples: 'Instead of "death tax" \u2192 "estate tax" or "inheritance tax"; instead of "illegal aliens" \u2192 "undocumented immigrants"',
      words: [
        "death tax",
        "government takeover",
        "job killers",
        "tax and spend",
        "bleeding heart",
        "welfare queen",
        "anchor babies",
        "illegal aliens",
        "chain migration",
        "socialized medicine",
        "nanny state",
        "big government",
        "bureaucrats",
        "handouts",
        "entitlements",
        "radical agenda",
        "open borders",
        "activist judges"
      ]
    },
    medical_euphemism: {
      icon: "\u{1F3E5}",
      color: "#00897b",
      name: "Medical Euphemism",
      description: "Healthcare language that softens or obscures medical errors, patient outcomes, and end-of-life realities.",
      implication: "Can impair informed consent and obscure accountability for medical errors or treatment risks.",
      suggestion: "Use clear, direct language \u2014 especially when patients need accurate information to make decisions.",
      examples: 'Instead of "negative patient outcome" \u2192 "the patient died" or "the surgery caused complications"',
      words: [
        "therapeutic misadventure",
        "negative patient outcome",
        "terminal illness",
        "life-limiting condition",
        "comfort care",
        "pregnancy termination",
        "medical assistance in dying",
        "adverse event",
        "treatment failure",
        "non-responsive",
        "palliative sedation",
        "failure to thrive",
        "code blue"
      ]
    },
    environmental_euphemism: {
      icon: "\u{1F33F}",
      color: "#2e7d32",
      name: "Environmental Euphemism",
      description: "Environmental language that minimizes ecological damage or greenwashes harmful practices.",
      implication: "Makes environmental destruction sound manageable or even positive, reducing urgency for action.",
      suggestion: "Describe the actual environmental impact directly and specifically.",
      examples: 'Instead of "clean coal" \u2192 "coal with reduced but still significant emissions" or describe specific pollution levels',
      words: [
        "climate change",
        "global warming",
        "carbon footprint",
        "sustainable development",
        "clean coal",
        "energy independence",
        "managed retreat",
        "controlled burn",
        "wildlife management",
        "natural gas",
        "harvest",
        "emissions trading",
        "carbon neutral",
        "green growth",
        "responsible mining"
      ]
    }
  };
  var euphemismsFlat = Object.values(euphemismWords).flatMap((category) => category.words);
  var euphemisms = euphemismsFlat;

  // src/dictionaries/emotional-triggers.js
  var emotionalTriggerWords = {
    fear_appeal: {
      icon: "\u{1F628}",
      color: "#c62828",
      name: "Fear Appeal",
      description: "Language designed to trigger fear and threat perception, bypassing rational risk assessment.",
      implication: "Activates the brain's threat response, making readers more susceptible to persuasion and less able to evaluate claims critically.",
      suggestion: "Ask what specific evidence supports the claimed danger and evaluate actual risk levels.",
      examples: 'Instead of "existential threat" \u2192 "a significant challenge" or provide specific risk data',
      words: {
        1: [
          "dangerous precedent",
          "serious threat",
          "on the brink"
        ],
        2: [
          "slippery slope",
          "existential threat",
          "grave danger",
          "dire consequences",
          "devastating impact",
          "irreversible damage",
          "imminent danger",
          "looming crisis",
          "worst case scenario",
          "spiraling out of control"
        ],
        3: [
          "catastrophic results",
          "point of no return",
          "ticking time bomb",
          "clear and present danger",
          "impending doom",
          "mortal threat",
          "doomsday scenario",
          "nightmare scenario"
        ]
      }
    },
    guilt_induction: {
      icon: "\u{1F614}",
      color: "#6a1b9a",
      name: "Guilt Induction",
      description: "Language designed to trigger guilt and moral responsibility, pressuring agreement through shame.",
      implication: "Bypasses rational evaluation by making disagreement feel morally wrong, regardless of the actual merits.",
      suggestion: "Evaluate whether the responsibility claim is supported by evidence, separate from the emotional pressure.",
      examples: 'Instead of "blood on your hands" \u2192 "shares responsibility for the outcome" with specific evidence',
      words: {
        2: [
          "morally responsible",
          "complicit in",
          "turning a blind eye",
          "failed to act",
          "stood by while",
          "allowed to happen",
          "could have prevented",
          "chose to ignore",
          "willfully neglected",
          "let down",
          "abandoned their duty",
          "dereliction of duty",
          "looked the other way",
          "washed their hands of"
        ],
        3: [
          "shame on",
          "how dare",
          "blood on your hands",
          "betrayed the trust",
          "on your conscience",
          "history will judge",
          "answerable for"
        ]
      }
    },
    flattery_manipulation: {
      icon: "\u{1F3AD}",
      color: "#f57f17",
      name: "Flattery Manipulation",
      description: "Compliments and in-group identity appeals designed to bias the reader toward agreement.",
      implication: "Creates social pressure to agree by implying that disagreement means you lack intelligence, virtue, or sophistication.",
      suggestion: "Recognize the appeal to identity and evaluate the argument on its own merits.",
      examples: 'Instead of "smart people like you understand" \u2192 present the argument and let readers evaluate it independently',
      words: {
        1: [
          "discerning individuals",
          "those who truly care",
          "people of conscience",
          "thoughtful citizens",
          "those who pay attention"
        ],
        2: [
          "smart people like you",
          "educated readers understand",
          "intelligent observers",
          "wise enough to see",
          "sophisticated thinkers",
          "enlightened minds",
          "those with common sense",
          "reasonable people agree",
          "informed citizens realize",
          "astute observers recognize",
          "right-thinking people"
        ],
        3: [
          "anyone with half a brain",
          "thinking people know"
        ]
      }
    },
    outrage_fuel: {
      icon: "\u{1F92C}",
      color: "#d84315",
      name: "Outrage Fuel",
      description: "Language designed to trigger moral outrage, bypassing careful analysis with indignation.",
      implication: "Replaces factual evaluation with emotional reaction, making readers more likely to share and amplify without verification.",
      suggestion: "Look past the outrage language to identify the actual facts and evaluate them independently.",
      examples: 'Instead of "shocking revelation" \u2192 "new information shows..." with specific details',
      words: {
        2: [
          "shocking revelation",
          "appalling behavior",
          "crosses the line",
          "new low",
          "height of hypocrisy",
          "jaw-dropping",
          "slap in the face"
        ],
        3: [
          "unbelievable scandal",
          "absolute outrage",
          "disgusting display",
          "unconscionable act",
          "beyond the pale",
          "blatant corruption",
          "flagrant violation",
          "egregious abuse",
          "stunning betrayal",
          "travesty of justice",
          "moral bankruptcy",
          "utter contempt",
          "brazen disregard",
          "shameless exploitation"
        ]
      }
    },
    sympathy_exploitation: {
      icon: "\u{1F494}",
      color: "#1565c0",
      name: "Sympathy Exploitation",
      description: "Uses vulnerable populations to weaponize compassion and bypass rational evaluation of arguments.",
      implication: "Makes disagreement feel heartless, even when the emotional appeal has no logical connection to the argument being made.",
      suggestion: "Ask how the emotional appeal specifically connects to the policy or argument being advanced.",
      examples: 'Instead of "think of the children" \u2192 describe specific impacts on children with evidence',
      words: {
        1: [
          "real people suffering",
          "faces behind the statistics",
          "the most vulnerable among us",
          "those who cannot help themselves"
        ],
        2: [
          "think of the children",
          "vulnerable victims",
          "innocent lives",
          "helpless elderly",
          "suffering families",
          "heartbroken parents",
          "orphaned children",
          "defenseless animals",
          "voiceless victims",
          "human tragedy",
          "left to fend for themselves"
        ],
        3: [
          "widows and orphans",
          "forgotten souls",
          "their blood cries out",
          "who will speak for them",
          "prey upon the weak"
        ]
      }
    },
    false_urgency: {
      icon: "\u23F0",
      color: "#ef6c00",
      name: "False Urgency",
      description: "Creates artificial time pressure to prevent careful deliberation and force hasty decisions.",
      implication: "Prevents thoughtful evaluation by implying that delay equals failure, even when no real deadline exists.",
      suggestion: "Ask what evidence exists for the claimed deadline and whether careful consideration would actually cause harm.",
      examples: `Instead of "act now before it's too late" \u2192 "this decision would benefit from timely attention because..."`,
      words: {
        1: [
          "critical moment",
          "crucial juncture",
          "urgent action needed",
          "no time to waste"
        ],
        2: [
          "act now",
          "before it's too late",
          "time is running out",
          "last chance",
          "final opportunity",
          "narrow window",
          "the clock is ticking",
          "every second counts",
          "running out of time",
          "at the eleventh hour"
        ],
        3: [
          "now or never",
          "make or break",
          "do or die",
          "decisive moment"
        ]
      }
    }
  };
  function flattenWords3(categoryWords) {
    if (Array.isArray(categoryWords))
      return categoryWords;
    return Object.values(categoryWords).flat();
  }
  var emotionalTriggersFlat = Object.values(emotionalTriggerWords).flatMap(
    (category) => flattenWords3(category.words)
  );
  var emotionalTriggers = emotionalTriggersFlat;

  // src/dictionaries/gaslighting.js
  var gaslightingWords = {
    reality_denial: {
      icon: "\u{1F6AB}",
      color: "#b71c1c",
      name: "Reality Denial",
      description: "Direct denial that events occurred or facts exist, attacking objective reality itself.",
      implication: "The strongest form of gaslighting \u2014 attempts to make the target doubt their own perception of verified events.",
      suggestion: "Check independent records, documents, or witnesses. Trust verifiable evidence over assertions.",
      examples: `Instead of "that never happened" \u2192 "I have a different recollection \u2014 let's check the record"`,
      words: {
        2: [
          "that's not true",
          "didn't happen that way",
          "twisting the facts",
          "distorting reality",
          "never said that",
          "fantasy"
        ],
        3: [
          "that never happened",
          "you're imagining things",
          "you're making it up",
          "completely fabricated",
          "pure fiction",
          "false memory",
          "revisionist history",
          "alternative facts",
          "total fabrication",
          "that's a lie",
          "you're inventing things",
          "fiction not fact"
        ]
      }
    },
    emotional_invalidation: {
      icon: "\u{1F4A2}",
      color: "#6a1b9a",
      name: "Emotional Invalidation",
      description: "Dismissing emotional responses as irrational or disproportionate to undermine confidence in one's own feelings.",
      implication: "Teaches the target to distrust their own emotional responses, making them more dependent on the gaslighter's framing.",
      suggestion: "Your emotional responses are valid data. Evaluate the situation independently of how others characterize your reaction.",
      examples: `Instead of "you're overreacting" \u2192 "I see this differently \u2014 can we discuss our perspectives?"`,
      words: {
        1: [
          "lighten up",
          "learn to take a joke",
          "taking it too seriously",
          "reading too much into it"
        ],
        2: [
          "you're overreacting",
          "making a big deal",
          "blowing it out of proportion",
          "being dramatic",
          "overly sensitive",
          "too emotional",
          "making mountains out of molehills",
          "need to calm down",
          "stop being so sensitive",
          "you're too thin-skinned"
        ],
        3: [
          "getting worked up over nothing",
          "being hysterical",
          "irrational response"
        ]
      }
    },
    memory_manipulation: {
      icon: "\u{1F9E0}",
      color: "#00838f",
      name: "Memory Manipulation",
      description: "Undermining confidence in one's own memory to replace recollections with a preferred narrative.",
      implication: "Erodes trust in episodic memory, making the target increasingly reliant on the manipulator's version of events.",
      suggestion: "Keep written records. Check notes, emails, or texts. Verify with other witnesses when possible.",
      examples: `Instead of "you're misremembering" \u2192 "my recollection differs \u2014 let's look at the meeting notes"`,
      words: {
        1: [
          "not how I remember it",
          "you must be mistaken",
          "false impression"
        ],
        2: [
          "you're misremembering",
          "that's not what was said",
          "you're confused",
          "mixing things up",
          "got it backwards",
          "faulty recollection",
          "selective memory",
          "memory is playing tricks"
        ],
        3: [
          "conveniently forgetting",
          "your memory is unreliable",
          "you always get this wrong",
          "that's not what happened at all",
          "you're rewriting history"
        ]
      }
    },
    credibility_attack: {
      icon: "\u{1F3AF}",
      color: "#e65100",
      name: "Credibility Attack",
      description: "Attacking the person's mental fitness, judgment, or competence rather than addressing their actual argument.",
      implication: "Ad hominem disguised as concern \u2014 undermines self-confidence to make the target doubt their own perceptions and judgment.",
      suggestion: "Evaluate the ARGUMENT being made, not the personal attack. Competence attacks do not address the substance of a claim.",
      examples: `Instead of "you're being paranoid" \u2192 "I don't see the same pattern \u2014 here's why..."`,
      words: {
        1: [
          "jumping to conclusions",
          "unfounded fears"
        ],
        2: [
          "you're being paranoid",
          "too sensitive",
          "crazy to think",
          "conspiracy theorist",
          "seeing things that aren't there",
          "wild accusations",
          "baseless claims",
          "irrational beliefs",
          "not thinking clearly"
        ],
        3: [
          "lost touch with reality",
          "delusional thinking",
          "unstable behavior",
          "you need help",
          "you're losing it",
          "unhinged",
          "out of your mind",
          "not in your right mind"
        ]
      }
    },
    deflection: {
      icon: "\u21A9\uFE0F",
      color: "#546e7a",
      name: "Deflection",
      description: "Redirecting attention away from the actual issue to avoid accountability or addressing the concern.",
      implication: "Prevents resolution by continually shifting focus, leaving the original concern unaddressed while exhausting the target.",
      suggestion: "Ask: has the original concern been addressed? Return focus to the specific issue at hand.",
      examples: 'Instead of "what about when you..." \u2192 "I hear your point about X, and I also want to address Y"',
      words: {
        1: [
          "the real issue is",
          "more importantly",
          "let's talk about",
          "beside the point"
        ],
        2: [
          "what about",
          "you're missing the point",
          "that's not the problem",
          "focusing on the wrong thing",
          "irrelevant detail",
          "distracting from",
          "changing the subject",
          "but what about when",
          "conveniently ignoring",
          "that's whataboutism"
        ],
        3: [
          "you're deflecting",
          "nice try changing the topic",
          "stop trying to distract"
        ]
      }
    }
  };
  function flattenWords4(categoryWords) {
    if (Array.isArray(categoryWords))
      return categoryWords;
    return Object.values(categoryWords).flat();
  }
  var gaslightingPhrasesFlat = Object.values(gaslightingWords).flatMap(
    (category) => flattenWords4(category.words)
  );
  var gaslightingPhrases = gaslightingPhrasesFlat;

  // src/dictionaries/false-dilemma.js
  var falseDilemmaPhrases = [
    // Either/or constructions
    "either you're with us or against us",
    "either...or",
    "can't have it both ways",
    "pick a side",
    "choose one",
    "black or white",
    "all or nothing",
    "win or lose",
    "success or failure",
    "friend or foe",
    "love it or leave it",
    "my way or the highway",
    "sink or swim",
    // Forced choices
    "must choose between",
    "forced to decide",
    "have to pick",
    "can't have both",
    "one or the other",
    "mutually exclusive",
    "incompatible options",
    "can't be both",
    "impossible to reconcile",
    "fundamental choice",
    "defining decision",
    "ultimate choice",
    // Binary framing
    "only two options",
    "just two choices",
    "two paths",
    "binary choice",
    "simple choice",
    "clear choice",
    "obvious choice",
    "no middle ground",
    "no compromise",
    "no third option",
    "no alternative",
    "no other way",
    "zero sum game",
    "winner takes all",
    "us versus them",
    // Ultimatums
    "last chance",
    "final offer",
    "take it or leave it",
    "now or never",
    "speak now or forever",
    "one time only",
    "limited time",
    "closing window",
    "ship is sailing",
    "train is leaving",
    "door is closing",
    "bridge is burning",
    // Exclusionary language
    "if you're not",
    "unless you",
    "those who don't",
    "anyone who doesn't",
    "people who refuse",
    "failure to choose",
    "refusing to take a stand",
    "sitting on the fence",
    "can't remain neutral",
    "neutrality is complicity",
    "silence is consent",
    "inaction is action"
  ];

  // src/dictionaries/probability-language.js
  var probabilityLanguage = [
    // Vague quantifiers that hide actual probabilities
    "highly unlikely",
    "very unlikely",
    "quite unlikely",
    "extremely unlikely",
    "rather unlikely",
    "somewhat unlikely",
    "likely",
    "quite likely",
    "very likely",
    "highly likely",
    "extremely likely",
    "rather likely",
    "somewhat likely",
    "probably",
    "probably not",
    "quite probably",
    "very probably",
    "most probably",
    "almost certainly",
    // Risk minimization language
    "minimal risk",
    "low risk",
    "small risk",
    "tiny risk",
    "negligible risk",
    "slight risk",
    "minor risk",
    "insignificant risk",
    "virtually no risk",
    "practically no risk",
    // Risk amplification language
    "significant risk",
    "considerable risk",
    "substantial risk",
    "serious risk",
    "major risk",
    "high risk",
    "extreme risk",
    "severe risk",
    "grave risk",
    // Frequency vagueness
    "rarely",
    "seldom",
    "infrequently",
    "occasionally",
    "sometimes",
    "often",
    "frequently",
    "regularly",
    "commonly",
    "typically",
    "usually",
    "generally",
    "mostly",
    "largely",
    "predominantly",
    "mainly",
    // Possibility language
    "possible",
    "quite possible",
    "very possible",
    "entirely possible",
    "highly possible",
    "perfectly possible",
    "impossible",
    "highly impossible",
    "virtually impossible",
    "may occur",
    "might occur",
    "could occur",
    "may happen",
    "might happen",
    "could happen",
    "can happen",
    "will likely happen",
    "may result",
    // Certainty language without evidence
    "almost certain",
    "virtually certain",
    "practically certain",
    "nearly certain",
    "all but certain",
    "essentially certain",
    // Medical/safety vagueness
    "rare side effects",
    "uncommon side effects",
    "possible side effects",
    "potential side effects",
    "occasional complications",
    "infrequent complications",
    "unlikely complications",
    "rare complications",
    "safe procedure",
    "very safe",
    "quite safe",
    "relatively safe",
    "generally safe",
    "considered safe",
    "proven safe",
    "deemed safe",
    "typically safe",
    // Degree modifiers that obscure probability
    "remote possibility",
    "distant possibility",
    "slight possibility",
    "small possibility",
    "good possibility",
    "strong possibility",
    "real possibility",
    "distinct possibility",
    "remote chance",
    "slim chance",
    "small chance",
    "good chance",
    "strong chance",
    "excellent chance",
    "fair chance",
    "reasonable chance",
    "decent chance",
    // Conditional probability vagueness  
    "in most cases",
    "in some cases",
    "in many cases",
    "in certain cases",
    "under normal circumstances",
    "under typical conditions",
    "in general",
    "as a rule",
    // Comparative probability without baselines
    "more likely",
    "less likely",
    "much more likely",
    "much less likely",
    "far more likely",
    "far less likely",
    "significantly more likely",
    "significantly less likely",
    // Time-based probability vagueness
    "eventually",
    "sooner or later",
    "at some point",
    "in time",
    "over time",
    "long term",
    "short term",
    "immediate term",
    "near future"
  ];

  // src/dictionaries/spectrum-labels.js
  var spectrumWords = {
    left_right: {
      icon: "\u{1F9ED}",
      color: "#7e57c2",
      name: "Left / Right",
      description: "Left and Right as political directions \u2014 a metaphor inherited from seating in the French National Assembly of 1789, where supporters of the king sat to the president's right and revolutionaries to his left.",
      implication: 'The spectrum compresses many independent questions (economic, cultural, institutional) into a single axis, and its content shifts by country and era \u2014 positions called "right" in one nation may be called "left" in another. Prefixes like "far-" and "radical" often work to delegitimize rather than to locate.',
      suggestion: "Ask which specific positions, parties, or movements are meant. Where possible, name policies and stances instead of directions.",
      examples: '"The left opposes this" \u2014 which parties, movements, or thinkers? On what grounds? Would they accept the label?',
      words: [
        "left-wing",
        "right-wing",
        "leftist",
        "leftists",
        "rightist",
        "rightists",
        "far-left",
        "far-right",
        "alt-right",
        "ultra-left",
        "ultra-right",
        "center-left",
        "center-right",
        "centre-left",
        "centre-right",
        "left-leaning",
        "right-leaning",
        "\\b(far|hard|radical|extreme|political) (left|right)\\b",
        "\\b(left|right) wing\\b",
        "\\bthe (left|right)\\b(?!\\s+(to|of|hand|way|answer|thing|side|turn|track|time|place|direction|choice|call|amount|angle|one|price|moment|decision|lane|foot|arm|eye|ear|button|click|margin|column|edge|bank))"
      ]
    },
    liberal: {
      icon: "\u{1F4DC}",
      color: "#26a69a",
      name: "Liberal",
      description: '"Liberal" (from Latin liber, "free") has carried near-opposite meanings: classical liberalism \u2014 individual rights, free markets, limited government (Locke, Smith, Mill) \u2014 versus modern American usage, where since the New Deal it has meant social-welfare progressivism.',
      implication: `In much of Europe, Latin America, and Australia, "liberal" still leans market-oriented \u2014 Australia's Liberal Party sits center-right. A sentence about "liberals" can assert opposite things depending on where the writer and the reader learned the word, and as an epithet it attributes a single belief to a vast, varied group.`,
      suggestion: "Identify which tradition is meant, or name the actual policy, party, or group instead of the label.",
      examples: '"Liberals believe X" \u2014 American progressives? Classical liberals? A specific party? "Liberal democracy" uses the classical sense.',
      words: [
        "liberals",
        "liberalism",
        "neoliberal",
        "neoliberals",
        "neoliberalism",
        "illiberal",
        "\\bclassical liberals?\\b",
        "\\bliberal\\b(?!\\s+(arts|education|studies|application|amounts?|use|helping|dose|doses|sprinkling|seasoning))"
      ]
    },
    conservative: {
      icon: "\u{1F3DB}\uFE0F",
      color: "#8d6e63",
      name: "Conservative",
      description: "Conservatism, articulated by Edmund Burke in reaction to the French Revolution, names a disposition: preserving established institutions, preferring gradual change, and distrusting wholesale redesign of society.",
      implication: 'What is being conserved differs completely by time and place \u2014 monarchy in one country, free markets in another, a secular constitution in a third \u2014 so the label names a posture toward change, not a fixed platform. Used as a monolith ("conservatives want\u2026"), it erases those differences and substitutes identity for argument.',
      suggestion: "Ask what, specifically, is being conserved, and which policies or groups are actually meant.",
      examples: '"Conservatives oppose this" \u2014 which movement, party, or tradition? (Note: "a conservative estimate" is an unrelated sense of the word.)',
      words: [
        "conservatism",
        "neoconservative",
        "neoconservatives",
        "neocon",
        "neocons",
        "paleoconservative",
        "ultraconservative",
        "arch-conservative",
        "\\bconservatives?\\b(?!\\s+(estimate|estimates|assumption|assumptions|approach|guess|figure|figures|number|numbers|investment|investments|treatment|dress|styling|management|projection|projections))"
      ]
    }
  };
  var spectrumLabels = Object.values(spectrumWords).flatMap((sub) => sub.words);

  // src/dictionaries/science-stats.js
  var sciStatsWords = {
    theory_proof: {
      icon: "\u{1F52C}",
      color: "#5c6bc0",
      name: 'Proof & "The Science"',
      description: 'In science, a "theory" is the strongest kind of explanation \u2014 a framework repeatedly tested against evidence (germ theory, the theory of gravity) \u2014 while in everyday speech it means a hunch. And empirical science does not "prove" claims the way mathematics does; it accumulates evidence and fails to falsify.',
      implication: '"Just a theory" uses the everyday sense to dismiss well-tested science. "Scientifically proven," "settled science," and "the science says" invoke Science as a single settled authority \u2014 often claiming more certainty than the underlying studies support, in either direction.',
      suggestion: "Ask what the actual evidence is: how many studies, of what kind, on whom, and how consistent the results are.",
      examples: '"Evolution is just a theory" (so is gravity); "clinically proven" (in which trial, against what comparison?)',
      words: [
        "\\b(just|only|merely) a theory\\b",
        "\\bunproven theory\\b",
        "\\b(scientifically|clinically) proven\\b",
        "\\bproven (fact|facts|safe|effective)\\b",
        "\\bscience (has )?(proves?|proven|shows|says)\\b",
        "\\bthe science (is settled|is clear|says|shows)\\b",
        "\\bsettled science\\b",
        "\\btrust the science\\b",
        "\\b(studies|research) proves?\\b"
      ]
    },
    significance: {
      icon: "\u{1F4CA}",
      color: "#00897b",
      name: "Statistical Significance",
      description: 'In statistics, "significant" means the result is unlikely to be chance alone (conventionally p < 0.05). It says nothing about size or importance \u2014 a tiny, practically meaningless effect can be statistically significant in a large study.',
      implication: 'Reporting routinely lets the statistical meaning borrow the everyday meaning ("large, important"), making trivial effects sound consequential. The reverse also misleads: a "non-significant" result in a small study is not proof of no effect.',
      suggestion: "Look for the effect size: how big is the difference, in absolute terms, for real people?",
      examples: '"Significantly higher risk" might mean 1.0% \u2192 1.1%. Ask: how much higher, from what baseline?',
      words: [
        "statistically significant",
        "\\bstatistical significance\\b",
        "\\bsignificant(ly)? (increased?|increases|decreased?|decreases|difference|differences|risk|risks|improvement|improvements|effect|effects|reduction|reductions|higher|lower|more|less|greater|association|associations|correlation|change|changes)\\b"
      ]
    },
    causation: {
      icon: "\u{1F517}",
      color: "#7e57c2",
      name: "Linked & Associated",
      description: '"Linked to," "associated with," and "correlated with" report that two things move together \u2014 not that one causes the other.',
      implication: 'Association headlines invite causal conclusions the underlying study cannot support: confounding (ice-cream sales and drownings both rise in summer), reverse causation, and selection effects all produce correlations without causation. "May cause" stacks a hedge on top of an association.',
      suggestion: "Ask what kind of study produced the claim (randomized trial vs. observational) and what else could explain the association.",
      examples: '"Coffee linked to longer life" \u2014 or do healthier people happen to drink more coffee?',
      words: [
        "\\blinked (to|with)\\b",
        "\\bassociated with\\b",
        "\\bcorrelat(es?|ed|ion) with\\b",
        "\\ba link between\\b",
        "\\ban association between\\b",
        "\\b(may|might|could) (cause|lead to)\\b",
        "\\bmay increase the risk\\b"
      ]
    },
    risk_scale: {
      icon: "\u2696\uFE0F",
      color: "#6d4c41",
      name: "Relative vs Absolute Risk",
      description: '"Doubles the risk" and "50% more likely" are relative changes; they say nothing about the starting point. Doubling a one-in-a-million risk is still two in a million.',
      implication: "Relative risk is the standard way to make a health headline dramatic: it makes small dangers sound alarming and modest benefits sound miraculous. The absolute change \u2014 from what, to what \u2014 is what actually matters for decisions.",
      suggestion: "Find the base rate: from what, to what, out of how many people?",
      examples: '"Doubles the risk" \u2014 of a 1-in-100 event or a 1-in-a-million event? "From 1.0% to 1.4%" is the honest form.',
      words: [
        "\\b(doubles?|doubled|triples?|tripled|quadruples?|quadrupled) (the |your )?(risk|chance|chances|odds|likelihood)\\b",
        "\\b(twice|three times|four times|five times|ten times|\\d+(\\.\\d+)? times) (as likely|more likely|less likely|the risk)\\b",
        "\\b\\d+% (more|less) likely\\b",
        "\\b(increased|higher|elevated|greater) risk\\b",
        "\\b(raises?|increases?|lowers?|reduces?) (the |your )?risk\\b"
      ]
    },
    evidence_absence: {
      icon: "\u{1F50D}",
      color: "#546e7a",
      name: "No Evidence",
      description: '"No evidence that X" can mean anything from "well studied, and X does not happen" to "nobody has looked yet." Absence of evidence is only evidence of absence when someone has actually searched, hard, where the evidence would be.',
      implication: 'The phrase serves both responsible debunking and premature dismissal: early in any question, "no evidence" is trivially true and tells you nothing. It can also launder uncertainty into reassurance \u2014 "no evidence of harm" is not "evidence of safety."',
      suggestion: "Ask whether anyone has looked, how hard, and what they would have found if the claim were true.",
      examples: '"No evidence of side effects" \u2014 after how many patients, and how much follow-up?',
      words: [
        "\\bno (scientific |clinical |credible |hard )?(evidence|proof)\\b",
        "\\bno scientific basis\\b",
        "\\bno known (link|links|cases|risk|risks)\\b",
        "\\bno data (to suggest|showing|supporting)\\b"
      ]
    },
    purity: {
      icon: "\u{1F33F}",
      color: "#689f38",
      name: "Natural & Chemical-Free",
      description: `Everything is chemicals \u2014 water, air, apples. "Chemical-free," "toxins," "all-natural," and "detox" are marketing categories, not scientific ones; toxicity is a property of dose, not of a substance's origin.`,
      implication: 'Purity language sells safety by category: natural-therefore-safe and synthetic-therefore-dangerous are both false (arsenic and botulinum toxin are natural; vitamin C is synthesized). Unnamed "toxins" cannot be checked, and healthy livers and kidneys already handle metabolic waste.',
      suggestion: 'Ask which substance, at what dose, compared to what \u2014 and what specifically a "toxin" or "detox" refers to.',
      examples: '"Chemical-free cleaning spray" (it is made of chemicals); "flushes out toxins" (which ones, measured how?)',
      words: [
        "\\bchemical[- ]free\\b",
        "\\bfree of chemicals\\b",
        "\\bno (added |harsh )?chemicals\\b",
        "toxins",
        "\\btoxin[- ]free\\b",
        "\\bdetox(es|ing|ify|ifies)?\\b",
        "\\ball[- ]natural\\b",
        "\\b100% natural\\b",
        "\\bnatural remed(y|ies)\\b",
        "\\bsuperfoods?\\b",
        "\\bclean eating\\b",
        "\\btoxic chemicals\\b"
      ]
    }
  };
  var sciStatsTerms = Object.values(sciStatsWords).flatMap((sub) => sub.words);

  // src/dictionaries/political-isms.js
  var politicalIsmsWords = {
    socialism: {
      icon: "\u{1F3ED}",
      color: "#607d8b",
      name: "Socialism",
      description: "A 19th-century term whose core meaning \u2014 social or collective ownership of the means of production \u2014 now spans a huge range: Marxist state ownership, democratic socialism (an electoral route, itself contested), and social democracy (a market economy with a large welfare state, technically a different tradition).",
      implication: 'The same word covers the Soviet economy and a public library. In US discourse, Nordic countries are routinely called socialist while their own governments describe them as market economies with strong safety nets. Used as an epithet, "socialism" attaches the record of one variant to proposals from another.',
      suggestion: "Ask which institutions are actually proposed or described: who would own what, decided by whom?",
      examples: '"That policy is socialism" \u2014 state ownership of industry, or a tax-funded service like roads and fire departments?',
      words: [
        "socialism",
        "socialists",
        "socialistic",
        "socialist",
        "\\bdemocratic socialis(m|ts?)\\b",
        "\\bsocial democra(cy|ts?|tic)\\b"
      ]
    },
    capitalism: {
      icon: "\u{1F3E6}",
      color: "#6d4c41",
      name: "Capitalism",
      description: 'Popularized largely by its critics (Marx wrote of the "capitalist mode of production"; the noun spread later through writers like Sombart and Weber), "capitalism" can mean the minimal definition \u2014 private ownership and market exchange \u2014 or the entire actually-existing economy with its subsidies, monopolies, and regulations.',
      implication: 'Defenders often argue for the textbook model of free exchange while critics attack the existing arrangement (or vice versa), so both sides can be right about different referents. Qualifiers like "crony capitalism" and "late capitalism" (a scholarly term from Sombart and Mandel, now mostly ironic) signal that a specific variant is meant \u2014 or just add color.',
      suggestion: "Ask whether the claim is about markets in principle or about the current economy in practice \u2014 they support different conclusions.",
      examples: '"Capitalism causes X" / "capitalism lifted millions from poverty" \u2014 the same word, often two different systems.',
      words: [
        "capitalism",
        "capitalistic",
        "\\blate[- ](stage\\s+)?capitalism\\b",
        "\\bcrony capitalism\\b",
        "\\bfree[- ]markets?\\b",
        "(?<!venture )(?<!venture-)\\bcapitalists?\\b"
      ]
    },
    fascism: {
      icon: "\u{1F4DA}",
      color: "#455a64",
      name: "Fascism",
      description: "Historically, the movement founded by Mussolini in Italy (in power 1922\u201343) and, by extension, kindred interwar regimes: ultranationalism, a one-party state, a cult of the leader, suppression of opposition, and glorification of violence. Scholars (Paxton, Griffin, Eco) still debate the precise defining features.",
      implication: 'Outside historical and scholarly use, the word drifts toward a generic intensifier for any disliked authority \u2014 Orwell observed as early as 1944 that it had become "almost entirely meaningless" in casual use. Calling something fascist ends analysis: it asserts the conclusion instead of showing which specific features apply.',
      suggestion: "Ask which concrete features are being claimed \u2014 and whether the same evidence is offered, or just the label.",
      examples: '"That policy is fascist" \u2014 which element: the leader cult? one-party rule? political violence? Or is it simply disliked?',
      words: [
        "fascism",
        "fascist",
        "fascists",
        "fascistic",
        "\\bneo[- ]?fascis(m|ts?)\\b"
      ]
    },
    populism: {
      icon: "\u{1F4E3}",
      color: "#7e57c2",
      name: "Populism",
      description: `Named for the US People's Party of the 1890s. In political science it describes a style, found on both left and right, that frames politics as a virtuous "the people" against a corrupt "elite" (Mudde calls it a "thin" ideology that attaches to others).`,
      implication: 'In headlines the word often just means "popular and irresponsible" or "demagogic" \u2014 a way to dismiss a movement without engaging its claims. The scholarly sense is descriptive; the journalistic sense is usually pejorative, and readers rarely know which one they are getting.',
      suggestion: 'Ask what the labeled movement actually proposes, and who is being cast as "the people" and "the elite."',
      examples: '"Populist economic policy" \u2014 described, or dismissed? The label alone does not say what the policy is.',
      words: [
        "populism",
        "populist",
        "populists"
      ]
    },
    nationalism: {
      icon: "\u{1F5FA}\uFE0F",
      color: "#00838f",
      name: "Nationalism & Globalism",
      description: 'Nationalism ranges from a founding principle of modern states (self-determination movements) to aggressive supremacy; Orwell distinguished patriotism (devotion to a place and way of life) from nationalism (competitive prestige-seeking). "Globalism" is its shifting antonym.',
      implication: 'Both words work as boundary markers more than descriptions. "Globalist" in particular ranges from a neutral label for supporters of international institutions and trade to conspiracy tropes \u2014 the ambiguity itself is why the word inflames. "Nationalist" likewise spans self-determination and chauvinism.',
      suggestion: "Ask which policies or loyalties are actually meant, and whether the person described would accept the label.",
      examples: '"Globalist agenda" \u2014 trade agreements and treaties, or an insinuated hidden cabal? The sentence rarely says.',
      words: [
        "nationalism",
        "nationalist",
        "nationalists",
        "nationalistic",
        "globalism",
        "globalist",
        "globalists",
        "\\bultranationalis(m|ts?|tic)\\b"
      ]
    }
  };
  var politicalIsms = Object.values(politicalIsmsWords).flatMap((sub) => sub.words);

  // src/dictionaries/civic-terms.js
  var civicTermsWords = {
    free_speech: {
      icon: "\u{1F5E3}\uFE0F",
      color: "#5c6bc0",
      name: "Free Speech",
      description: 'Two related but distinct things share the name: a legal right \u2014 in the US, the First Amendment, which restrains *government* ("Congress shall make no law\u2026") \u2014 and a broader cultural value of open discourse (argued by Milton and Mill long before any constitution).',
      implication: "The most common collapse online: one person argues the law (a platform or employer is not the government, so no right was violated) while the other argues the value (a culture of sanction chills discourse regardless of who applies it). Both senses are legitimate; treating them as one produces arguments where both sides are right about different things.",
      suggestion: "Ask which sense is in play: a legal claim about state power, or a cultural claim about norms of open discourse?",
      examples: '"They violated my free speech" \u2014 did a government act, or did a private party decline to host or associate?',
      words: [
        "\\bfree speech\\b",
        "\\bfreedom of speech\\b",
        "\\bfreedom of expression\\b",
        "\\bfirst amendment\\b"
      ]
    },
    censorship: {
      icon: "\u2702\uFE0F",
      color: "#8d6e63",
      name: "Censorship",
      description: "Historically, suppression by authority \u2014 licensing regimes and prior restraint (Milton's Areopagitica argued against them in 1644). The word now stretches across state suppression, platform moderation, editorial judgment, and sometimes mere criticism.",
      implication: "State censorship, platform moderation, editorial selection, and social pushback differ enormously in power and remedy \u2014 a government can imprison, a platform can remove, an editor can decline, a critic can only object. The single word erases those differences. Whether large platforms' moderation *should* be treated like public censorship is a genuine, unsettled debate; the word alone does not resolve it.",
      suggestion: "Ask who exercised what power, with what alternatives left to the speaker \u2014 and what remedy is actually being proposed.",
      examples: '"They censored me" \u2014 a takedown? a declined submission? a ban? disagreement? Each is a different claim.',
      words: [
        "censorship",
        "censored",
        "censoring",
        "\\bself[- ]censorship\\b",
        "\\bshadow[- ]?ban(ned|ning|s)?\\b",
        "\\bdeplatform(ed|ing)?\\b"
      ]
    },
    rights: {
      icon: "\u{1F4DC}",
      color: "#00838f",
      name: "Rights Claims",
      description: 'Rights-talk mixes distinct claims: legal rights (enforceable in some jurisdiction, against some party), moral rights (claims about what ought to be, whatever the law says), and rhetorical entitlement ("I have a right to\u2026" as emphasis).',
      implication: `A legal right names who must do what \u2014 enforceable, specific, jurisdiction-bound. A moral right is an argument, not a fact about the law. Sliding between them lets a contested "ought" borrow the authority of an established "is," and vice versa: "there's no right to X" may be legally true and morally beside the point.`,
      suggestion: "Ask: enforceable where, against whom? And if it is a moral claim, what is the argument for it?",
      examples: '"I have a right to say this here" \u2014 under law, the host usually decides "here"; the moral claim needs its own defense.',
      words: [
        "\\b(i|we|you|they) have a right to\\b",
        "\\bmy rights\\b",
        "\\b(constitutional|god-given|natural|inalienable|fundamental) rights?\\b",
        "\\bviolat(es?|ed|ing) (my|our|their) rights\\b"
      ]
    },
    legal_standards: {
      icon: "\u2696\uFE0F",
      color: "#6d4c41",
      name: "Legal Standards",
      description: 'Courtroom standards imported into everyday judgment: "innocent until proven guilty" and "due process" govern what the *state* must do before punishing. "Defamation" (libel if written, slander if spoken) requires a false statement of fact \u2014 and in the US, for public figures, knowing or reckless falsehood (NYT v. Sullivan, 1964).',
      implication: `A boycott is not a verdict and an employer is not a court, so courtroom standards do not transfer automatically \u2014 yet the worry behind invoking them (serious consequences without fair process) is a real normative question, not a confusion. "That's slander!" about a true statement or an opinion misuses a term with a precise meaning.`,
      suggestion: "Ask whether the standard invoked binds the actor in question \u2014 and if not, what fairness is actually being demanded.",
      examples: `"Innocent until proven guilty" \u2014 a rule for the state's power to punish; whether private judgment should wait for verdicts is a separate argument.`,
      words: [
        "\\bdue process\\b",
        "\\binnocent until proven guilty\\b",
        "\\bpresum(ption of innocence|ed innocent)\\b",
        "defamation",
        "defamatory",
        "\\blibell?(ous)?\\b",
        "slander",
        "slanderous"
      ]
    }
  };
  var civicTerms = Object.values(civicTermsWords).flatMap((sub) => sub.words);

  // src/dictionaries/econ-terms.js
  var econTermsWords = {
    inflation: {
      icon: "\u{1F4C8}",
      color: "#6d4c41",
      name: "Inflation Is a Rate",
      description: 'Inflation measures how fast prices are *rising*. "Inflation is falling" therefore means prices are rising more slowly \u2014 not that prices are falling (that would be deflation, which is rare and brings its own problems).',
      implication: 'During 2021\u201324 this confusion was everywhere: headlines celebrated "falling inflation" while readers wondered why groceries still cost more, because the price *level* kept the earlier increases. Disinflation (a slowing rate) and deflation (falling prices) are different phenomena with nearly identical-sounding coverage.',
      suggestion: "Ask whether the sentence is about the rate of change or the level of prices \u2014 and over what period.",
      examples: '"Inflation fell to 3%" \u2014 prices are still rising 3% a year, on top of every previous increase.',
      words: [
        "\\binflation (is |was )?(falling|dropping|slowing|cooling|easing|down)\\b",
        "\\b(falling|slowing|cooling|easing) inflation\\b",
        "\\binflation (came|come|comes|is coming) down\\b",
        "disinflation",
        "deflation",
        "deflationary",
        "hyperinflation"
      ]
    },
    deficit_debt: {
      icon: "\u{1F3DB}\uFE0F",
      color: "#546e7a",
      name: "Deficit vs Debt",
      description: "The deficit is a yearly flow \u2014 this year's gap between spending and revenue. The debt is the accumulated stock of all past deficits. Cutting the deficit still grows the debt, just more slowly.",
      implication: 'The two get conflated daily, which lets rhetoric mislead in both directions: "we cut the deficit in half" can coexist with record debt, and "the debt hit a record" is nearly always true in a growing economy and says little by itself. Scale also vanishes \u2014 figures mean little without comparison to GDP.',
      suggestion: "Ask which one is meant \u2014 the yearly gap or the accumulated total \u2014 and compared to what (last year, GDP, projections)?",
      examples: '"Cut the deficit" while "the debt grew" \u2014 both true at once, and routinely deployed against each other.',
      words: [
        "\\b(budget|federal|fiscal|trade) deficits?\\b",
        "\\b(reduce|reducing|cut|cutting|halve|halving) the deficit\\b",
        "\\bnational debt\\b",
        "\\b(government|public) debt\\b",
        "\\bdebt ceiling\\b"
      ]
    },
    recession_economy: {
      icon: "\u{1F321}\uFE0F",
      color: "#00838f",
      name: 'Recession & "The Economy"',
      description: 'A "recession" has no single agreed definition: the informal rule of thumb (two consecutive quarters of shrinking GDP) differs from the US convention, where the NBER dates recessions after the fact using many indicators. And "the economy" is not one thing \u2014 GDP, stock indices, employment, and wages routinely move in different directions.',
      implication: 'Whether "we are in a recession" can be genuinely disputed for months, which makes the word a political football. "Good for the economy" often means good for one measure and one group \u2014 the stock market is not household income, and GDP growth says nothing about how gains are distributed.',
      suggestion: "Ask which measure and whose experience is meant: output, jobs, wages, prices, or portfolios?",
      examples: '"The economy is booming" \u2014 GDP? the S&P 500? median wages? All three can point different ways at once.',
      words: [
        "recession",
        "recessions",
        "\\btechnical recession\\b",
        "\\bthe economy (is|was) (booming|strong|weak|struggling|recovering|roaring|in shambles)\\b",
        "\\b(good|bad|great|terrible) for the economy\\b",
        "\\bgrow(ing)? the economy\\b"
      ]
    },
    class_records: {
      icon: "\u{1F3E0}",
      color: "#7e57c2",
      name: "Middle Class & Records",
      description: '"Middle class" has no standard definition \u2014 income bands, wealth, occupation, and self-image all give different answers, and in surveys large majorities across very different incomes place themselves in it. "Record profits" and similar records are often nominal: in a growing economy with inflation, records are routine.',
      implication: 'Because nearly everyone hears themselves in "the middle class," policies pitched to it can target very different people than the listener imagines. Records reported without inflation adjustment or share-of-revenue context ("record profits") can describe an ordinary year in a bigger economy \u2014 or a genuinely extraordinary one; the phrase alone cannot say.',
      suggestion: "Ask what boundaries are meant by the class label, and whether the record is adjusted for inflation and scale.",
      examples: '"Tax relief for the middle class" \u2014 which incomes, exactly? "Record profits" \u2014 real, or nominal in a larger economy?',
      words: [
        "\\bmiddle[- ]class\\b",
        "\\bworking[- ]class\\b",
        "\\brecord (profits|revenue|revenues|earnings)\\b"
      ]
    }
  };
  var econTerms = Object.values(econTermsWords).flatMap((sub) => sub.words);

  // src/dictionaries/epistemic-terms.js
  var epistemicTermsWords = {
    fake_news: {
      icon: "\u{1F4F0}",
      color: "#8d6e63",
      name: "Fake News",
      description: "Around 2016 the phrase named something specific: fabricated stories manufactured for clicks and ad revenue. Within roughly a year it had been captured as an epithet for unfavorable coverage \u2014 one of the fastest semantic captures on record.",
      implication: "The phrase now points in two directions at once: at genuinely fabricated content, and at accurate-but-unwelcome reporting. Without specification it mostly signals the speaker's stance toward the outlet, not the story's accuracy \u2014 and its overuse makes the original, real phenomenon harder to name.",
      suggestion: "Ask what exactly is claimed to be false \u2014 the facts, the framing, or the outlet \u2014 and what the evidence is.",
      examples: '"That story is fake news" \u2014 fabricated? mistaken in part? accurately reported but unwelcome? Three different claims.',
      words: [
        "\\bfake news\\b"
      ]
    },
    misinfo_disinfo: {
      icon: "\u{1F500}",
      color: "#5c6bc0",
      name: "Mis- & Disinformation",
      description: "In the researcher taxonomy: misinformation is false content spread without intent to deceive; disinformation is false content spread deliberately; malinformation is genuine information deployed to harm. The prefixes carry the intent claim.",
      implication: 'In practice the labels get applied beyond clear falsehood \u2014 to contested-but-arguable claims, and sometimes to positions that later became mainstream, which is why the labeling power itself is disputed. Calling something "disinformation" asserts intent to deceive; that is a strong claim that needs its own evidence.',
      suggestion: "Ask two separate questions: is the claim actually false, and who established that? And if intent is asserted, on what basis?",
      examples: '"Flagged as misinformation" \u2014 false by what standard, judged by whom, and has that judgment been revisited?',
      words: [
        "misinformation",
        "disinformation",
        "malinformation",
        "\\bfact[- ]check(s|ed|ing|ers?)?\\b"
      ]
    },
    conspiracy: {
      icon: "\u{1F9F5}",
      color: "#00838f",
      name: "Conspiracy Theory",
      description: "Descriptively, a claim that events are best explained by a secret plot. Real conspiracies exist and have been documented (Watergate; the tobacco industry's coordination to obscure smoking risks) \u2014 the label is not automatically wrong.",
      implication: "The term does double duty: it describes a reasoning style that resists disproof (missing evidence becomes proof of the cover-up; everything connects), and it dismisses unwelcome claims without examination. The useful question is not the label but the structure: could any evidence count against this claim?",
      suggestion: "Ask whether the claim is falsifiable and what specific evidence supports it \u2014 not whether someone has applied the label.",
      examples: '"Just a conspiracy theory" \u2014 is the claim unfalsifiable, or merely unwelcome? The label alone cannot say.',
      words: [
        "\\bconspiracy theor(y|ies|ist|ists)\\b",
        "\\bconspiratorial\\b"
      ]
    },
    narrative_media: {
      icon: "\u{1F4E1}",
      color: "#7e57c2",
      name: 'Narratives & "The Media"',
      description: '"The mainstream media" bundles thousands of outlets with different owners, incentives, audiences, and politics into a single actor; "the narrative" implies coverage is a coordinated story rather than the noisier reality of herding, incentives, and error. "Do your own research" ranges from good advice to a dismissal of all expertise.',
      implication: 'Monolith-words make coverage claims unfalsifiable: any outlet that contradicts "the narrative" gets excluded from "the media" that supposedly maintains it. Real, studiable phenomena exist underneath \u2014 ownership concentration, pack journalism, shared blind spots \u2014 but they need naming specifically to be examined at all.',
      suggestion: "Ask which outlets, which claims, and which incentives are actually meant \u2014 and what would count as coverage that breaks the pattern.",
      examples: `"The media won't tell you this" \u2014 which outlets? (Often the claim itself comes from a large outlet.)`,
      words: [
        "\\b(the )?mainstream media\\b",
        "\\blegacy media\\b",
        "\\bcorporate media\\b",
        "\\bthe narrative\\b(?!\\s+(structure|arc|voice|form|style|perspective|frame))",
        "\\bpush(es|ing)? a narrative\\b",
        "\\becho chambers?\\b",
        "\\bdo your own research\\b"
      ]
    }
  };
  var epistemicTerms = Object.values(epistemicTermsWords).flatMap((sub) => sub.words);

  // src/dictionaries/discourse-concepts.js
  var discourseConceptsWords = {
    tolerance_paradox: {
      icon: "\u{1F91D}",
      color: "#5c6bc0",
      name: "Paradox of Tolerance",
      description: `From Karl Popper's The Open Society and Its Enemies (1945): "unlimited tolerance must lead to the disappearance of tolerance." The meme version stops there. Popper's footnote continues: intolerant philosophies should be countered by argument and public opinion as long as that works \u2014 he reserved suppression for movements that reject rational debate and answer arguments with violence.`,
      implication: 'The paradox gets invoked as a finished argument, but it does not answer the hard question \u2014 who counts as intolerant, judged by whom, by what standard \u2014 which is decided *before* the paradox applies and is where the actual disagreement lives. Both failure modes are real: unlimited tolerance can shelter movements that would end it, and an elastic definition of "intolerance" can license excluding ordinary disagreement.',
      suggestion: "Ask what specific conduct is called intolerant, whether argument and public opinion have failed, and who gets to decide \u2014 the paradox itself settles none of these.",
      examples: `"We must be intolerant of intolerance" \u2014 of violent rejection of debate (Popper's case), or of a position the speaker opposes?`,
      words: [
        "\\bparadox of tolerance\\b",
        "\\btolerance paradox\\b",
        "\\bintoleran(ce|t) of (the )?intoleran(ce|t)\\b",
        "\\btolerat(e|ing) (the )?intolerant\\b",
        "\\bdemand(s|ed|ing)? tolerance\\b",
        "\\bpreach(es|ed|ing)? tolerance\\b"
      ]
    },
    slippery_slope: {
      icon: "\u{1F6DD}",
      color: "#6d4c41",
      name: "Slippery Slope",
      description: "Named as a fallacy when a chain from step A to feared outcome Z is asserted without any mechanism. But slope arguments are not automatically fallacious: precedent, incentive shifts, and boundary erosion are real, studiable mechanisms, and courts treat precedent-based slope arguments seriously.",
      implication: `The label cuts both ways: "that's a slippery slope fallacy" can dismiss a legitimate argument about how a rule will actually be extended, while a bare slope claim can smuggle in an unargued chain of dominoes. The difference is whether a mechanism is shown and whether anything plausibly stops the slide.`,
      suggestion: "Ask for the mechanism: what specifically carries step one to the feared end, and what would stop it along the way?",
      examples: '"This leads inevitably to X" \u2014 by what mechanism? / "Slippery slope fallacy!" \u2014 is there a mechanism being ignored?',
      words: [
        "\\bslippery[- ]slopes?\\b",
        "\\bthin end of the wedge\\b"
      ]
    },
    whataboutism: {
      icon: "\u{1F449}",
      color: "#00838f",
      name: "Whataboutism",
      description: `A Cold War-era label (Soviet spokesmen answering criticism with "and you are lynching Negroes"-style replies): deflecting a charge by pointing at the accuser's conduct instead of answering. The classical name is tu quoque \u2014 "you too."`,
      implication: "The move is real: changing the subject is not a defense, and two wrongs remain two wrongs. But the label also gets used to dodge legitimate consistency challenges \u2014 when the accuser's own standard is part of the argument (selective enforcement, hypocrisy in rule-making), the comparison is evidence, not deflection.",
      suggestion: "Ask whether the comparison answers the charge or replaces it \u2014 and whether the accuser's consistency is actually relevant to the claim.",
      examples: `"What about your side's scandal?" \u2014 deflection from this charge, or a fair test of the standard being applied?`,
      words: [
        "whataboutism",
        "whataboutery",
        "\\btu quoque\\b"
      ]
    },
    strawman_adhominem: {
      icon: "\u{1F3AF}",
      color: "#8d6e63",
      name: "Strawman & Ad Hominem",
      description: "A strawman attacks a weakened version of an opponent's claim; ad hominem attacks the arguer instead of the argument; a steelman argues against the strongest version. All three name the relationship between a response and the actual claim.",
      implication: `The accusations are moves too: "that's a strawman" asserts misrepresentation without showing it, and "ad hominem!" can deflect personal accountability even where character is the question \u2014 credibility, conflicts of interest, and track records are legitimately about the person. The labels need the same evidence they demand.`,
      suggestion: "For strawman claims: quote the original and the response \u2014 was the stated version actually weaker? For ad hominem: is the personal point relevant to credibility, or substituting for engagement?",
      examples: `"You're strawmanning me" \u2014 what was the real claim? "That's ad hominem" \u2014 or is the witness's reliability the issue?`,
      words: [
        "\\bstraw[- ]?m(a|e)n\\b",
        "\\bstraw[- ]?mann(ed|ing)\\b",
        "\\bsteel[- ]?mann?(ed|ing)?\\b",
        "\\bad hominem\\b"
      ]
    },
    overton_window: {
      icon: "\u{1FA9F}",
      color: "#607d8b",
      name: "Overton Window",
      description: "Named for Joseph Overton (Mackinac Center, 1990s): the range of policies politically acceptable to the mainstream at a given moment. Originally a descriptive claim about feasibility \u2014 politicians can only move within the window; movements move the window.",
      implication: 'The concept now does three jobs at once: description (what is currently sayable), strategy ("shift the window"), and accusation ("normalizing extremism"). It can also smuggle in inevitability \u2014 windows do not move like weather; specific actors move them by choice, and naming the concept does not say whether a given shift is good or bad.',
      suggestion: "Ask whether the sentence describes what is acceptable, argues what should be, or accuses someone of moving the boundary \u2014 three different claims.",
      examples: `"That's outside the Overton window" \u2014 a prediction about viability, not an argument about merit.`,
      words: [
        "\\boverton window\\b"
      ]
    },
    motte_bailey: {
      icon: "\u{1F3F0}",
      color: "#7e57c2",
      name: "Motte-and-Bailey",
      description: `Nicholas Shackel's term (2005), from the medieval castle: a modest, defensible claim (the motte) and a sweeping, attractive claim (the bailey) share one vocabulary. Challenged on the bailey, the arguer retreats to the motte ("all I'm saying is\u2026"), then reoccupies the bailey once the challenge passes.`,
      implication: "The pattern is real and explains how many contested terms work \u2014 one word doing double duty for a modest and a sweeping claim. But naming it is a structural accusation that needs showing (quote the bailey, quote the motte, same speaker), and it misfires against groups: different people making different claims is not one arguer switching.",
      suggestion: "Ask which claim \u2014 the modest one or the sweeping one \u2014 is actually being defended right now, and which one the conclusion needs.",
      examples: `"All I'm saying is X (modest)" \u2014 but was the earlier claim X, or something much bigger using the same words?`,
      words: [
        "\\bmotte[- ](and|&)[- ]bailey\\b"
      ]
    }
  };
  var discourseConcepts = Object.values(discourseConceptsWords).flatMap((sub) => sub.words);

  // src/dictionaries/logical-fallacies.js
  var logicalFallaciesWords = {
    relevance: {
      icon: "\u{1F41F}",
      color: "#00838f",
      name: "Red Herring & Non Sequitur",
      description: "Relevance fallacies: a red herring drags the argument toward something vivid but beside the point; a non sequitur draws a conclusion that does not follow from what preceded it; a Gish gallop buries an opponent under more claims than can be answered in the time available.",
      implication: 'The moves are real \u2014 misdirection and overload win debates without winning arguments. But the labels also get used to duck relevant points: calling context a "red herring" or a cumulative case a "Gish gallop" can itself be the evasion.',
      suggestion: "Ask what the original question was and whether the point at issue actually bears on it \u2014 in either direction.",
      examples: `"That's a red herring" \u2014 is it off the point, or an inconvenient part of it?`,
      words: [
        "\\bred herrings?\\b",
        "\\bnon sequiturs?\\b",
        "\\bgish gallop\\b"
      ]
    },
    circular: {
      icon: "\u{1F501}",
      color: "#5c6bc0",
      name: "Begging the Question",
      description: 'Begging the question (petitio principii) means assuming the conclusion inside the premises \u2014 circular reasoning: "the report is reliable because it says so." Separately, everyday usage has largely repurposed "begs the question" to mean "raises the question," which usage guides now widely note.',
      implication: 'Two confusions travel with this phrase: circular arguments can sound rigorous while proving nothing, and the fallacy-name itself now means different things to different readers. Someone accused of "begging the question" may just have prompted one.',
      suggestion: "For the fallacy: ask whether any premise already assumes the conclusion. For the phrase: check which sense the writer means.",
      examples: '"This begs the question" \u2014 a circularity charge, or just "this raises the question"? They are different claims.',
      words: [
        "\\bbeg(s|ged|ging)? the question\\b",
        "\\bcircular (reasoning|argument|arguments|logic)\\b"
      ]
    },
    crowd_authority: {
      icon: "\u{1F4E2}",
      color: "#8d6e63",
      name: "Appeals & Bandwagon",
      description: "Borrowed-force fallacies: appeal to popularity (ad populum / bandwagon), authority, nature (the naturalistic fallacy), emotion, tradition, novelty, and ignorance. Each substitutes something other than evidence \u2014 numbers, prestige, origin, feeling, age, newness, or the absence of disproof \u2014 for an argument.",
      implication: 'The nuance the labels flatten: deferring to relevant expert consensus is evidence, not fallacy \u2014 the fallacy is substituting prestige for argument or citing authority outside its domain. Likewise popularity is weak evidence, not zero. "Appeal to X!" can dismiss legitimate weight along with borrowed force.',
      suggestion: "Ask what would remain of the claim if the crowd, the authority, or the feeling were removed \u2014 and whether the cited authority actually has domain expertise.",
      examples: `"Experts agree" \u2014 relevant consensus (evidence) or borrowed prestige (fallacy)? "Everyone's switching" \u2014 to what, and why?`,
      words: [
        "\\bappeal(s|ed|ing)? to (popularity|authority|nature|emotion|emotions|tradition|novelty|ignorance)\\b",
        "\\bad populum\\b",
        "\\bnaturalistic fallacy\\b",
        "\\bbandwagon\\b"
      ]
    },
    evidence_games: {
      icon: "\u{1F352}",
      color: "#6d4c41",
      name: "Cherry-Picking & Selection",
      description: "Selection fallacies: cherry-picking keeps the favorable data and discards the rest; the Texas sharpshooter draws the target around the bullet holes after firing; hasty generalization scales a small sample into a rule; anecdotal evidence substitutes a story for a distribution; survivorship bias studies only what made it through the filter.",
      implication: 'These are among the most consequential reasoning failures because the presented evidence is genuine \u2014 only the selection is dishonest, so each claim survives fact-checking. The accusation cuts both ways too: "cherry-picking!" needs the fuller dataset shown, not just alleged.',
      suggestion: "Ask what the full base of evidence looks like: what was left out, who did not survive to be counted, and whether the pattern was predicted or drawn afterward.",
      examples: `"Every example they gave is true" \u2014 and what about the examples they didn't give?`,
      words: [
        "\\bcherry[- ]pick(s|ed|ing)?\\b",
        "\\btexas sharpshooter\\b",
        "\\banecdotal evidence\\b",
        "\\bhasty generalizations?\\b",
        "\\bsurvivorship bias\\b"
      ]
    },
    goalposts_burden: {
      icon: "\u{1F945}",
      color: "#607d8b",
      name: "Goalposts, Burden & No True Scotsman",
      description: `Rule-changing moves: moving the goalposts redefines success after each demand is met; burden-of-proof games assign the proving to the other side ("prove it isn't true"); special pleading exempts one's own case from one's own standard; No True Scotsman rescues a generalization by redefining membership ("no real X would do that").`,
      implication: "Each move makes a position unfalsifiable in practice. The labels need care in return: standards can legitimately tighten as stakes rise (not every raised bar is moved goalposts), the burden genuinely rests with whoever asserts, and some membership definitions are real (a vegetarian who eats steak is not a counterexample to vegetarianism).",
      suggestion: "Ask what was originally claimed and what would count as meeting or refuting it \u2014 fixed in advance, on both sides.",
      examples: `"That wasn't real socialism" \u2014 a definitional argument that needs making, or a retreat that saves the theory from every failure?`,
      words: [
        "\\b(mov(e|es|ed|ing)|shift(s|ed|ing)?) the goalposts\\b",
        "\\bgoalpost[- ]moving\\b",
        "\\bburden of proof\\b",
        "\\bspecial pleading\\b",
        "\\bno true scotsman\\b",
        "\\b(that|it|this)\\s+(was\\s+not|is\\s+not|wasn['\u2019]t|isn['\u2019]t|was\\s+never)\\s+(real|true)\\s+(socialism|communism|capitalism)\\b"
      ]
    },
    causal: {
      icon: "\u{1F3B2}",
      color: "#7e57c2",
      name: "Post Hoc & Causal Shortcuts",
      description: `Causal fallacies: post hoc ergo propter hoc ("after it, therefore because of it") reads sequence as causation; the gambler's fallacy expects independent events to remember the past; the sunk cost fallacy lets what is already spent dictate what to do next.`,
      implication: 'The corrective slogans get weaponized too: "correlation is not causation" is true and yet gets used to wave away strong, well-controlled observational evidence \u2014 correlation plus mechanism plus dose-response plus ruled-out confounders is how much of science works. The slogan starts the examination; it does not end it.',
      suggestion: "For causal claims: ask for the mechanism and the controls. For the slogan: ask whether the evidence is actually just correlation, or more.",
      examples: `"I took it and got better" (post hoc); "correlation isn't causation" (about a randomized trial \u2014 it was causation).`,
      words: [
        "\\bpost hoc\\b(?!\\s+(analysis|analyses|test|tests|comparison|comparisons|power))",
        "\\bcorrelation\\s+(is\\s+not|isn['\u2019]t|does\\s+not\\s+(equal|imply|mean)|doesn['\u2019]t\\s+(equal|imply|mean))\\s+causation\\b",
        "\\bgambler['\u2019]s\\s+fallacy\\b",
        "\\bsunk[- ]cost fallacy\\b"
      ]
    },
    comparison: {
      icon: "\u{1FA9E}",
      color: "#546e7a",
      name: "False Equivalence & Extreme Comparisons",
      description: `Comparison fallacies: false equivalence treats unlike things as alike because they share a surface feature; false dichotomies and "false choice" framings force two options where more exist; Godwin's law names the drift of every long argument toward a Hitler comparison (reductio ad Hitlerum).`,
      implication: `Comparisons carry arguments \u2014 and dismissing them cuts both ways: "false equivalence!" can duck a fair parallel, and invoking Godwin's law can dodge a historically apt warning. What matters is whether the compared cases are alike in the respects the argument needs.`,
      suggestion: "Ask in which specific respects the two things are being equated, and whether those respects are the ones that matter for the conclusion.",
      examples: `"You can't compare X to Y" \u2014 why not, in the respect being argued? "This is just like [atrocity]" \u2014 in what specific way?`,
      words: [
        "\\bfalse equivalen(ce|cy|cies)\\b",
        "\\bfalse dichotom(y|ies)\\b",
        "\\bfalse choices?\\b",
        "\\bgodwin['\u2019]s\\s+law\\b",
        "\\breductio ad hitlerum\\b"
      ]
    },
    meta: {
      icon: "\u{1FA83}",
      color: "#a1887f",
      name: "The Fallacy Fallacy & Question Games",
      description: 'The fallacy fallacy: concluding that a claim is false because an argument for it was fallacious \u2014 bad arguments get made for true things. Question-framing does double duty too: "just asking questions" can be a cover for insinuating without asserting (sealioning: relentless polite demands that exhaust rather than inquire), and a loaded question smuggles its premise ("when did you stop\u2026?").',
      implication: "This family is the type's own warning label: spotting a fallacy licenses discounting an argument, never the conclusion \u2014 and fallacy-naming can itself become sport that replaces engagement. Meanwhile the question-labels can dismiss sincere inquiry as bad faith; the difference is whether answers are ever accepted.",
      suggestion: "Separate the argument from the claim: refute the reasoning, then ask what the best remaining case for the conclusion is. For question games: does any answer get engaged?",
      examples: `"Your argument is fallacious, so you're wrong" \u2014 the first half can be true and the second not follow.`,
      words: [
        "\\bfallacy fallacy\\b",
        "\\bargument from fallacy\\b",
        "\\bsealioning\\b",
        "\\bjust asking questions\\b",
        "\\bloaded questions?\\b"
      ]
    }
  };
  var logicalFallacies = Object.values(logicalFallaciesWords).flatMap((sub) => sub.words);

  // src/dictionaries/index.js
  function isIntensityGrouped(words) {
    if (Array.isArray(words))
      return false;
    return typeof words === "object" && (words[1] || words[2] || words[3]);
  }
  function flattenWords5(words) {
    if (Array.isArray(words))
      return words;
    return Object.values(words).flat();
  }
  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }
  function canonicalSimpleSource(entry) {
    const escaped = escapeRegExp(entry);
    return entry.includes(" ") ? escaped.replace(/ /g, "\\s+") : `\\b${escaped}\\b`;
  }
  var BiasPatterns = class {
    constructor() {
      this.rawPatterns = this.loadRawPatterns();
      this.subCategoryDictionaries = this.loadSubCategoryDictionaries();
      this.intensityMaps = this.buildIntensityMaps();
      this.subCategoryMaps = this.buildSubCategoryMaps();
      this.compiledPatterns = /* @__PURE__ */ new Map();
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
      const dictionaries = /* @__PURE__ */ new Map();
      dictionaries.set("opinion", opinionWords);
      dictionaries.set("euphemism", euphemismWords);
      dictionaries.set("weasel", weaselWords);
      dictionaries.set("maximizer", maximizerWords);
      dictionaries.set("emotional", emotionalTriggerWords);
      dictionaries.set("gaslighting", gaslightingWords);
      dictionaries.set("spectrum", spectrumWords);
      dictionaries.set("scistats", sciStatsWords);
      dictionaries.set("isms", politicalIsmsWords);
      dictionaries.set("civics", civicTermsWords);
      dictionaries.set("econterms", econTermsWords);
      dictionaries.set("epistemics", epistemicTermsWords);
      dictionaries.set("debate", discourseConceptsWords);
      dictionaries.set("fallacy", logicalFallaciesWords);
      return dictionaries;
    }
    // Build word→intensity lookup maps from all dictionaries
    buildIntensityMaps() {
      const maps = /* @__PURE__ */ new Map();
      const flatIntensityDicts = {
        absolute: absoluteWords
      };
      for (const [type, dict] of Object.entries(flatIntensityDicts)) {
        if (!isIntensityGrouped(dict))
          continue;
        const wordMap = /* @__PURE__ */ new Map();
        for (const [level, words] of Object.entries(dict)) {
          const intensity = parseInt(level, 10);
          for (const word of words) {
            wordMap.set(word.toLowerCase(), intensity);
          }
        }
        maps.set(type, wordMap);
      }
      for (const [type, dict] of this.subCategoryDictionaries) {
        if (!maps.has(type)) {
          maps.set(type, /* @__PURE__ */ new Map());
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
        }
      }
      return maps;
    }
    // Get intensity for a matched word. Returns 1, 2, or 3.
    getIntensity(biasTypeId, matchedWord) {
      const wordMap = this.intensityMaps.get(biasTypeId);
      if (!wordMap)
        return 2;
      return wordMap.get(matchedWord.toLowerCase()) || 2;
    }
    buildSubCategoryMaps() {
      const maps = /* @__PURE__ */ new Map();
      for (const config of Object.values(BiasConfig.BIAS_TYPES)) {
        if (!config.subCategories)
          continue;
        const wordMap = /* @__PURE__ */ new Map();
        const dictionary = this.subCategoryDictionaries.get(config.id);
        if (dictionary) {
          for (const [subId, entry] of Object.entries(dictionary)) {
            const words = Array.isArray(entry) ? entry : entry.words;
            if (!words)
              continue;
            const flatWords = flattenWords5(words);
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
      if (!wordMap)
        return null;
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
      return this.getSubCategory("opinion", word);
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
      if (!cleanPattern)
        return null;
      try {
        const isComplexPattern = cleanPattern.includes("\\") || cleanPattern.includes("(") || cleanPattern.includes("[");
        let regexPattern;
        const flags = "gi";
        if (isComplexPattern) {
          regexPattern = cleanPattern.includes("[") ? cleanPattern : cleanPattern.replace(/ /g, "\\s+");
        } else {
          regexPattern = canonicalSimpleSource(cleanPattern);
        }
        const regex = new RegExp(regexPattern, flags);
        regex.test("test string");
        return {
          source: cleanPattern,
          regex,
          type,
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
          complexPatterns: patterns.filter((p) => p.isComplex).length,
          simplePatterns: patterns.filter((p) => !p.isComplex).length
        };
      }
      return stats;
    }
  };
  function entryKey(text) {
    return text.toLowerCase().replace(/\s+/g, " ");
  }
  function isCanonicalSimple(pattern) {
    return !!pattern && typeof pattern.source === "string" && pattern.regex instanceof RegExp && pattern.regex.flags === "gi" && pattern.regex.source === canonicalSimpleSource(pattern.source);
  }
  function compileAlternationGroup(sources, type, isPhraseGroup) {
    const entryLookup = /* @__PURE__ */ new Map();
    for (const source of sources) {
      const key = entryKey(source);
      if (!entryLookup.has(key)) {
        entryLookup.set(key, source);
      }
    }
    const ordered = [...entryLookup.values()].sort((a, b) => b.length - a.length);
    const branches = ordered.map((source) => isPhraseGroup ? escapeRegExp(source).replace(/ /g, "\\s+") : escapeRegExp(source));
    const alternation = isPhraseGroup ? `(?:${branches.join("|")})` : `\\b(?:${branches.join("|")})\\b`;
    const regex = new RegExp(alternation, "gi");
    regex.test("");
    return {
      source: `<${ordered.length} combined ${type} ${isPhraseGroup ? "phrases" : "words"}>`,
      regex,
      type,
      isComplex: false,
      resolveEntry: (matchText) => entryLookup.get(entryKey(matchText))
    };
  }
  function buildDetectionPlan(patterns, type) {
    const words = [];
    const phrases = [];
    const individual = [];
    for (const pattern of patterns) {
      if (isCanonicalSimple(pattern)) {
        (pattern.source.includes(" ") ? phrases : words).push(pattern.source);
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

  // src/utils/HoverContentGenerator.js
  var HoverContentGenerator = class {
    constructor() {
      this.enhancedDescriptions = {
        opinion: {
          description: "Subjective language that reveals the writer's personal stance or evaluation. These words signal opinion rather than fact.",
          suggestion: "Consider using more objective language or acknowledging the subjective nature of the statement.",
          examples: "Instead of 'This is obviously wrong' \u2192 'This appears to contradict the evidence' or 'I believe this is incorrect'"
        },
        tobe: {
          description: "Forms of 'to be' that can create false equivalencies or unclear relationships. E-Prime writing avoids these to encourage precision.",
          suggestion: "Replace with more specific verbs that show relationships, actions, or states more clearly.",
          examples: "Instead of 'The problem is complex' \u2192 'The problem involves multiple factors' or 'This complexity emerges from...'"
        },
        absolute: {
          description: "Universal quantifiers that make categorical claims. Reality rarely fits such absolutes, making these terms often inaccurate.",
          suggestion: "Use more nuanced language that acknowledges exceptions and degrees.",
          examples: "Instead of 'Everyone knows' \u2192 'Most people understand' or 'Research suggests' or 'Many experts agree'"
        },
        // Advanced Detection
        passive: {
          description: "Passive voice constructions that obscure who performs actions or makes decisions. This can hide responsibility and agency.",
          suggestion: "Convert to active voice by identifying who performs the action and making them the subject.",
          examples: "Instead of 'Mistakes were made' \u2192 'The team made mistakes' or 'I made an error in judgment'"
        },
        weasel: {
          description: "Vague attributions and unsupported claims that avoid specificity. These phrases make statements without providing verifiable sources.",
          suggestion: "Provide specific sources, studies, or evidence to support claims.",
          examples: "Instead of 'Studies show' \u2192 'A 2023 Harvard study found' or 'According to Dr. Smith's research'"
        },
        presupposition: {
          description: "Language that smuggles in hidden assumptions, making readers accept premises without realizing it. This can bias interpretation.",
          suggestion: "Make assumptions explicit and arguable rather than hidden in language structure.",
          examples: "Instead of 'Even scientists admit' \u2192 'Scientists have found' or 'Research indicates' (removing the 'even' presupposition)"
        },
        // Framing & Rhetoric
        metaphor: {
          description: "Militaristic language applied to non-military topics. War metaphors can unnecessarily escalate discourse and frame issues as conflicts.",
          suggestion: "Use neutral language that doesn't imply combat or warfare.",
          examples: "Instead of 'Fight against climate change' \u2192 'Address climate change' or 'The war on drugs' \u2192 'Drug policy reform'"
        },
        minimizer: {
          description: "Language that downplays or reduces the significance of events, problems, or concerns. Can dismiss legitimate issues.",
          suggestion: "Use proportional language that accurately represents the scale and importance of issues.",
          examples: "Instead of 'Just a minor setback' \u2192 'A temporary challenge' or acknowledge the actual impact"
        },
        maximizer: {
          description: "Exaggerated language that inflates the importance or severity of events beyond their actual scale. Creates unnecessary drama.",
          suggestion: "Use measured language that accurately represents the scale of events.",
          examples: "Instead of 'Devastating news' \u2192 'Concerning development' or 'Catastrophic failure' \u2192 'Significant problem'"
        },
        // Manipulation Tactics
        falsebalance: {
          description: "Language that creates artificial equivalence between unequal positions or presents false choices as if they're the only options.",
          suggestion: "Acknowledge the actual weight of evidence and avoid false equivalencies.",
          examples: "Instead of 'Both sides have valid points' \u2192 Evaluate each position based on evidence and merit"
        },
        euphemism: {
          description: "Mild or indirect terms used to avoid harsh realities (euphemisms) or deliberately harsh terms for emotional effect (dysphemisms).",
          suggestion: "Use direct, clear language that accurately describes the situation without unnecessary softening or harshening.",
          examples: "Instead of 'Collateral damage' \u2192 'Civilian casualties' or 'Enhanced interrogation' \u2192 'Torture'"
        },
        emotional: {
          description: "Language designed to trigger emotional responses rather than logical evaluation. Can bypass rational thinking.",
          suggestion: "Focus on factual information and logical arguments rather than emotional appeals.",
          examples: "Instead of 'Heartless policy' \u2192 'Policy that doesn't address human needs' or provide specific impacts"
        },
        gaslighting: {
          description: "Language that makes people question their own perception, memory, or judgment. Often dismissive of legitimate concerns.",
          suggestion: "Acknowledge others' perspectives and experiences as valid starting points for discussion.",
          examples: "Instead of 'You're being too sensitive' \u2192 'I see this differently' or 'Help me understand your perspective'"
        },
        falsedilemma: {
          description: "Language that presents only two options when more exist. Limits thinking and forces unnecessary choices.",
          suggestion: "Acknowledge the full range of options and alternatives available.",
          examples: "Instead of 'Either we do X or everything fails' \u2192 Present multiple approaches and their trade-offs"
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
    // The generated HTML is assigned via innerHTML, so anything that comes
    // from the page (matched text, surrounding context) or from the user
    // (custom group fields, imported JSON) must be escaped
    escapeHtml(value) {
      return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
    }
    // Colors land inside style attributes / generated CSS; only accept hex
    sanitizeColor(color) {
      return /^#[0-9a-fA-F]{3,8}$/.test(String(color)) ? color : "#e67e22";
    }
    generateHoverContent(match, nearbyMatches = []) {
      if (match.isCustom && match.customGroup) {
        return this._generateCustomHoverContent(match, nearbyMatches);
      }
      const isExcellence = match.isExcellence;
      const type = match.type;
      const intensity = match.intensity || 2;
      const intensityLabel = ["Mild", "Moderate", "Severe"][intensity - 1];
      let content = `<div class="hover-card ${isExcellence ? "hover-card-excellence" : "hover-card-problem"}">`;
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
        const badge = biasConfig && biasConfig.isExplainer ? `<span class="intensity-badge intensity-context">Context</span>` : `<span class="intensity-badge intensity-${intensity}">${intensityLabel}</span>`;
        content += `
                <div class="hover-card-header"${this.getSubCategoryStyle(match)}>
                    ${typeName}
                    ${badge}
                </div>
            `;
      }
      content += `<div class="hover-card-text">"${this.escapeHtml(match.text)}"</div>`;
      if (biasConfig && biasConfig.isExplainer) {
        content += this._generateExplainerSections(subConfig, biasConfig);
        content += "</div>";
        return content;
      }
      if (isContextual) {
        const confidencePercentage = match.confidence ? Math.round(match.confidence * 100) : "Unknown";
        let contextDisplay = "";
        if (match.context && match.context.trim()) {
          const contextText = this.escapeHtml(match.context.trim());
          const matchedPhrase = this.escapeHtml(match.text);
          const highlightedContext = contextText.replace(
            new RegExp(`(${matchedPhrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi"),
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
                        <div class="reasoning-explanation">${this.escapeHtml(match.contextReasoning)}</div>
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
        const tipText = biasConfig && biasConfig.isExplainer && subConfig && subConfig.description || subConfig && subConfig.basicTip || biasConfig && biasConfig.basicTip;
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
          const whenConcerning = subConfig && subConfig.whenConcerning || biasConfig && biasConfig.whenConcerning;
          if (whenConcerning) {
            content += `<div class="hover-card-section">
                        <div class="hover-card-section-title">When to be concerned:</div>
                        <div class="hover-card-section-content">${whenConcerning}</div>
                    </div>`;
          }
          const whenAcceptable = subConfig && subConfig.whenAcceptable || biasConfig && biasConfig.whenAcceptable;
          if (whenAcceptable) {
            content += `<div class="hover-card-section">
                        <div class="hover-card-section-title">When it's acceptable:</div>
                        <div class="hover-card-section-content">${whenAcceptable}</div>
                    </div>`;
          }
        }
        if (biasConfig && biasConfig.lookFor && biasConfig.lookFor.length > 0) {
          content += `<div class="hover-card-section">
                    <div class="hover-card-section-title">Look for:</div>
                    <ul class="hover-card-checklist">`;
          biasConfig.lookFor.forEach((item) => {
            content += `<li>${item}</li>`;
          });
          content += `</ul></div>`;
        }
        if (biasConfig && biasConfig.examples) {
          content += `<div class="hover-card-section">
                    <div class="hover-card-section-title">Examples:</div>`;
          if (isExcellence) {
            if (biasConfig.examples.excellent) {
              content += `<div class="hover-card-examples-acceptable">
                            <strong>Excellent examples:</strong> ${biasConfig.examples.excellent.join(", ")}
                        </div>`;
            }
            if (biasConfig.examples.enhance) {
              content += `<div class="hover-card-examples-problematic">
                            <strong>Enhancement ideas:</strong> ${biasConfig.examples.enhance.join(", ")}
                        </div>`;
            }
          } else {
            if (biasConfig.examples.problematic) {
              content += `<div class="hover-card-examples-problematic">
                            <strong>Concerning:</strong> ${biasConfig.examples.problematic.join(", ")}
                        </div>`;
            }
            if (biasConfig.examples.acceptable) {
              content += `<div class="hover-card-examples-acceptable">
                            <strong>Acceptable:</strong> ${biasConfig.examples.acceptable.join(", ")}
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
      if (!isExcellence && match.portrayal) {
        content += `<div class="hover-card-portrayal">Portrayal: ${this.escapeHtml(match.portrayal.valence)} (${this.escapeHtml(match.portrayal.type)})</div>`;
      }
      if (nearbyMatches.length > 0) {
        content += `<div class="hover-card-context">Nearby: ${this.escapeHtml(nearbyMatches.map((m) => m.type).join(", "))}</div>`;
      }
      content += "</div>";
      return content;
    }
    // Get custom styling for sub-categories
    getSubCategoryStyle(match) {
      return "";
    }
    // Explainer cards follow a teaching sequence, not the warning layout:
    // a one-line scaffold, then the concept's actual story, then how it gets
    // used (technique education, both directions), then a fair-use-before-
    // stretched contrast, ending on questions. The ordering follows the
    // refutation/prebunking literature: readers who know nothing (or arrive
    // with a charged preconception) need the correct model grounded FIRST —
    // never open on the misuse — and showing the legitimate use before the
    // stretched one signals even-handedness instead of accusation.
    _generateExplainerSections(subConfig, biasConfig) {
      const cfg = subConfig || biasConfig;
      let content = "";
      const oneLiner = cfg.basicTip || biasConfig.basicTip;
      if (oneLiner) {
        content += `<div class="hover-card-reason">${oneLiner}</div>`;
      }
      content += `<div class="hover-card-expanded">`;
      if (cfg.description) {
        content += `<div class="hover-card-section">
                <div class="hover-card-section-title">Where it comes from:</div>
                <div class="hover-card-section-content">${cfg.description}</div>
            </div>`;
      }
      if (cfg.implication) {
        content += `<div class="hover-card-section">
                <div class="hover-card-section-title">How it gets used:</div>
                <div class="hover-card-section-content">${cfg.implication}</div>
            </div>`;
      }
      const solid = cfg.whenAcceptable || biasConfig.whenAcceptable;
      const shaky = cfg.whenConcerning || biasConfig.whenConcerning;
      if (solid) {
        content += `<div class="hover-card-section">
                <div class="hover-card-section-title">On solid ground:</div>
                <div class="hover-card-section-content">${solid}</div>
            </div>`;
      }
      if (shaky) {
        content += `<div class="hover-card-section">
                <div class="hover-card-section-title">On shaky ground:</div>
                <div class="hover-card-section-content">${shaky}</div>
            </div>`;
      }
      if (cfg.examples && typeof cfg.examples === "string") {
        content += `<div class="hover-card-examples"><strong>For instance:</strong> ${cfg.examples}</div>`;
      }
      const ask = cfg.suggestion || biasConfig.suggestion;
      if (ask) {
        content += `<div class="hover-card-suggestion"><strong>Worth asking:</strong> ${ask}</div>`;
      }
      content += `</div>`;
      return content;
    }
    _generateCustomHoverContent(match, nearbyMatches) {
      const group = match.customGroup;
      const hc = group.hoverContent || {};
      let content = `<div class="hover-card hover-card-problem">`;
      content += `<div class="hover-card-header" style="border-left: 3px solid ${this.sanitizeColor(group.color)}">`;
      content += `${this.escapeHtml(group.name)}`;
      content += `<span class="intensity-badge intensity-2">Custom</span>`;
      content += `</div>`;
      content += `<div class="hover-card-text">"${this.escapeHtml(match.text)}"</div>`;
      if (hc.basicTip) {
        content += `<div class="hover-card-reason">${this.escapeHtml(hc.basicTip)}</div>`;
      }
      content += `<div class="hover-card-expanded">`;
      if (hc.whenConcerning) {
        content += `<div class="hover-card-section">`;
        content += `<div class="hover-card-section-title">When to be concerned:</div>`;
        content += `<div class="hover-card-section-content">${this.escapeHtml(hc.whenConcerning)}</div>`;
        content += `</div>`;
      }
      if (hc.whenAcceptable) {
        content += `<div class="hover-card-section">`;
        content += `<div class="hover-card-section-title">When it's acceptable:</div>`;
        content += `<div class="hover-card-section-content">${this.escapeHtml(hc.whenAcceptable)}</div>`;
        content += `</div>`;
      }
      if (hc.suggestion) {
        content += `<div class="hover-card-suggestion">${this.escapeHtml(hc.suggestion)}</div>`;
      }
      content += `</div>`;
      if (nearbyMatches.length > 0) {
        content += `<div class="hover-card-context">Nearby: ${this.escapeHtml(nearbyMatches.map((m) => m.type).join(", "))}</div>`;
      }
      content += "</div>";
      return content;
    }
    getTypeName(type, isExcellence) {
      const { parentId, subCategoryId } = BiasConfig.resolveType(type);
      if (subCategoryId) {
        const subCfg = BiasConfig.getSubCategory(parentId, subCategoryId);
        if (subCfg)
          return subCfg.name;
      }
      if (isExcellence) {
        const excConfig = BiasConfig.EXCELLENCE_TYPES[type.toUpperCase()];
        if (excConfig)
          return excConfig.name;
        return "Excellence";
      }
      const biasTypeConfig = BiasConfig.getBiasTypeConfig(type);
      if (biasTypeConfig)
        return biasTypeConfig.name;
      return "Bias Pattern";
    }
  };

  // src/utils/PopupManager.js
  var PopupManager = class {
    constructor() {
      this.popup = null;
      this.isVisible = false;
      this.hoverGenerator = new HoverContentGenerator();
      this.currentTarget = null;
      this.hideTimeout = null;
      this.onIgnoreWord = null;
      this.onRemoveHighlight = null;
      this.init();
    }
    init() {
      this.createPopupElement();
      this.setupEventDelegation();
    }
    createPopupElement() {
      this.popup = document.createElement("div");
      this.popup.className = "bias-popup";
      this.popup.setAttribute("data-e-prime-popup", "true");
      this.popup.setAttribute("data-skip-analysis", "true");
      this.popup.style.cssText = `
            position: fixed;
            background: #fff;
            border-radius: 10px;
            padding: 0;
            box-shadow: 0 8px 40px rgba(0,0,0,0.18), 0 1px 3px rgba(0,0,0,0.08);
            max-width: 420px;
            z-index: 10000;
            font-size: 14px;
            line-height: 1.6;
            display: none;
            pointer-events: auto;
            overflow: hidden;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
        `;
      const closeBtn = document.createElement("button");
      closeBtn.className = "popup-close";
      closeBtn.innerHTML = "\xD7";
      closeBtn.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            background: transparent;
            border: none;
            font-size: 20px;
            cursor: pointer;
            padding: 0;
            color: #8a8078;
            width: 28px;
            height: 28px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 4px;
            z-index: 1;
            transition: background 0.15s, color 0.15s;
        `;
      closeBtn.addEventListener("click", () => this.hide());
      this.popup.appendChild(closeBtn);
      this.contentContainer = document.createElement("div");
      this.contentContainer.className = "popup-content";
      this.contentContainer.setAttribute("data-e-prime-popup", "true");
      this.contentContainer.setAttribute("data-skip-analysis", "true");
      this.contentContainer.style.cssText = "margin-top: 0;";
      this.popup.appendChild(this.contentContainer);
      document.body.appendChild(this.popup);
    }
    setupEventDelegation() {
      document.addEventListener("click", (e) => {
        const target = e.target.closest('[class*="bias-highlight-"], [class*="excellence-"]');
        if (target) {
          if (target.closest("[data-skip-analysis]"))
            return;
          e.preventDefault();
          e.stopPropagation();
          this.show(target, e);
        } else if (this.isVisible && !this.popup.contains(e.target)) {
          this.hide();
        }
      }, true);
      document.addEventListener("contextmenu", (e) => {
        const target = e.target.closest('[class*="bias-highlight-"], [class*="excellence-"]');
        if (target) {
          if (target.closest("[data-skip-analysis]"))
            return;
          e.preventDefault();
          this.removeHighlight(target);
        }
      });
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && this.isVisible) {
          this.hide();
        }
      });
      window.addEventListener("resize", () => {
        if (this.isVisible && this.currentTarget) {
          this.updatePosition(this.lastEvent);
        }
      });
    }
    show(element, event) {
      this.currentTarget = element;
      this.lastEvent = event;
      if (this.hideTimeout) {
        clearTimeout(this.hideTimeout);
        this.hideTimeout = null;
      }
      const matchData = this.extractMatchData(element);
      if (!matchData)
        return;
      this.updatePopupStyling(matchData);
      const content = this.hoverGenerator.generateHoverContent(matchData);
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = content;
      const hoverCard = tempDiv.querySelector(".hover-card");
      if (hoverCard) {
        this.contentContainer.innerHTML = hoverCard.innerHTML;
      } else {
        this.contentContainer.innerHTML = content;
      }
      this.addRemoveHighlightButton();
      this.updatePosition(event);
      this.popup.style.display = "block";
      this.popup.style.opacity = "1";
      this.popup.style.visibility = "visible";
      this.isVisible = true;
      this.popup.style.zIndex = "999999";
      setTimeout(() => {
        this.adjustPositionIfNeeded();
      }, 10);
    }
    hide() {
      this.popup.style.display = "none";
      this.isVisible = false;
      this.currentTarget = null;
      this.lastEvent = null;
    }
    extractMatchData(element) {
      const classList = Array.from(element.classList);
      let type = null;
      let isExcellence = false;
      for (const className of classList) {
        if (className.startsWith("bias-highlight-")) {
          type = className.replace("bias-highlight-", "");
          break;
        } else if (className.startsWith("excellence-")) {
          type = className.replace("excellence-", "");
          isExcellence = true;
          break;
        }
      }
      if (!type)
        return null;
      let intensity = 2;
      const intensityClass = classList.find((c) => c.startsWith("bias-intensity-"));
      if (intensityClass) {
        intensity = parseInt(intensityClass.replace("bias-intensity-", ""));
      }
      const matchData = {
        text: element.textContent,
        type,
        isExcellence,
        intensity,
        // Extract data attributes if they exist
        isContextual: element.dataset.contextual === "true",
        contextReasoning: element.dataset.contextReasoning,
        confidence: element.dataset.confidence ? parseFloat(element.dataset.confidence) : null,
        context: element.dataset.context,
        subCategory: element.dataset.subCategory ? JSON.parse(element.dataset.subCategory) : null,
        portrayal: element.dataset.portrayal ? JSON.parse(element.dataset.portrayal) : null
      };
      if (element.dataset.customGroupData) {
        try {
          matchData.customGroup = JSON.parse(element.dataset.customGroupData);
          matchData.isCustom = true;
        } catch (e) {
          console.warn("Invalid custom group data on highlight:", (e == null ? void 0 : e.message) ?? String(e));
        }
      }
      return matchData;
    }
    updatePopupStyling(matchData) {
      this.popup.className = "bias-popup";
      if (matchData.isExcellence) {
        this.popup.classList.add("excellence");
        this.popup.style.borderTopColor = "#28a745";
      } else {
        this.popup.classList.add("problem");
        const typeColors = {
          opinion: "#ff8c00",
          tobe: "#87ceeb",
          absolute: "#ff69b4",
          passive: "#800080",
          weasel: "#b8860b",
          presupposition: "#ff1493",
          metaphor: "#dc143c",
          minimizer: "#008080",
          maximizer: "#ff4500",
          falsebalance: "#4b0082",
          euphemism: "#006400",
          emotional: "#ff7f50",
          gaslighting: "#800000",
          falsedilemma: "#9400d3",
          probability: "#4169e1",
          spectrum: "#7e57c2",
          scistats: "#546e7a",
          isms: "#607d8b",
          civics: "#5c6bc0",
          econterms: "#6d4c41",
          epistemics: "#7e57c2",
          debate: "#78909c",
          fallacy: "#a1887f"
        };
        const baseType = matchData.type.startsWith("opinion_") ? "opinion" : matchData.type;
        this.popup.style.borderTopColor = typeColors[baseType] || "#dc3545";
      }
      if (!matchData.isExcellence && matchData.intensity) {
        this.popup.classList.add(`intensity-${matchData.intensity}`);
      }
      this.popup.style.opacity = "1";
      this.popup.style.visibility = "visible";
    }
    updatePosition(event) {
      if (this.currentTarget) {
        const rect = this.currentTarget.getBoundingClientRect();
        this.popup.style.left = rect.left + "px";
        this.popup.style.top = rect.bottom + 8 + "px";
      } else {
        this.popup.style.left = event.clientX + "px";
        this.popup.style.top = event.clientY + "px";
      }
    }
    adjustPositionIfNeeded() {
      if (!this.isVisible)
        return;
      const rect = this.popup.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      let newX = parseInt(this.popup.style.left);
      let newY = parseInt(this.popup.style.top);
      if (rect.right > viewportWidth) {
        newX = viewportWidth - rect.width - 10;
      }
      if (newX < 10) {
        newX = 10;
      }
      if (rect.bottom > viewportHeight) {
        newY = viewportHeight - rect.height - 10;
      }
      if (newY < 10) {
        newY = 10;
      }
      this.popup.style.left = newX + "px";
      this.popup.style.top = newY + "px";
    }
    addRemoveHighlightButton() {
      if (this.contentContainer.querySelector(".remove-highlight-btn")) {
        return;
      }
      const removeBtn = document.createElement("button");
      removeBtn.className = "remove-highlight-btn";
      removeBtn.textContent = "Remove Highlight";
      removeBtn.style.cssText = `
            display: block;
            width: 100%;
            margin-top: 12px;
            padding: 8px 12px;
            background: #f8f7f5;
            color: #8a8078;
            border: 1px solid #d4cfc7;
            border-radius: 6px;
            cursor: pointer;
            font-size: 12px;
            font-weight: 500;
            transition: all 0.15s;
        `;
      removeBtn.addEventListener("mouseenter", () => {
        removeBtn.style.backgroundColor = "#dc3545";
        removeBtn.style.color = "white";
        removeBtn.style.borderColor = "#dc3545";
      });
      removeBtn.addEventListener("mouseleave", () => {
        removeBtn.style.backgroundColor = "#f8f7f5";
        removeBtn.style.color = "#8a8078";
        removeBtn.style.borderColor = "#d4cfc7";
      });
      removeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.removeCurrentHighlight();
      });
      this.contentContainer.appendChild(removeBtn);
      if (this.onIgnoreWord) {
        const ignoreBtn = document.createElement("button");
        ignoreBtn.className = "ignore-word-btn";
        ignoreBtn.textContent = "Ignore this word everywhere";
        ignoreBtn.style.cssText = `
                display: block;
                width: 100%;
                margin-top: 6px;
                padding: 8px 12px;
                background: #f8f7f5;
                color: #8a8078;
                border: 1px solid #d4cfc7;
                border-radius: 6px;
                cursor: pointer;
                font-size: 12px;
                font-weight: 500;
                transition: all 0.15s;
            `;
        ignoreBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          const word = this.currentTarget ? this.currentTarget.textContent : null;
          if (word) {
            this.onIgnoreWord(word);
          }
          this.hide();
        });
        this.contentContainer.appendChild(ignoreBtn);
      }
    }
    removeCurrentHighlight() {
      if (!this.currentTarget)
        return;
      this.removeHighlight(this.currentTarget);
      this.hide();
    }
    removeHighlight(target) {
      if (!target)
        return;
      if (this.onRemoveHighlight) {
        this.onRemoveHighlight(target);
        return;
      }
      const parent = target.parentNode;
      if (!parent)
        return;
      const textNode = document.createTextNode(target.textContent);
      parent.replaceChild(textNode, target);
    }
    // Public methods for external control
    isPopupVisible() {
      return this.isVisible;
    }
    getCurrentTarget() {
      return this.currentTarget;
    }
    // Cleanup method
    destroy() {
      if (this.popup && this.popup.parentNode) {
        this.popup.parentNode.removeChild(this.popup);
      }
      this.popup = null;
      this.isVisible = false;
      this.currentTarget = null;
    }
  };
  var popupManagerInstance = null;
  function getPopupManager() {
    if (!popupManagerInstance) {
      popupManagerInstance = new PopupManager();
    }
    return popupManagerInstance;
  }

  // src/utils/DOMProcessor.js
  var DOMProcessor = class {
    constructor() {
      this.highlightClassPrefix = "bias-highlight-";
      this.excellenceClassPrefix = "excellence-";
      this.customClassPrefix = "bias-highlight-custom-";
      this.processedParents = /* @__PURE__ */ new Set();
      this.hoverGenerator = new HoverContentGenerator();
      this._anchoredFragments = /* @__PURE__ */ new WeakMap();
      this.popupManager = null;
    }
    // Collect all text nodes from a root element in a single pass. The walker
    // visits elements too, so skipped subtrees (scripts, popups, our own
    // highlights) are pruned wholesale, and shadow roots are entered as they
    // are encountered — no separate querySelectorAll('*') sweep afterwards.
    collectTextNodes(rootNode) {
      const textNodes = [];
      this._collectTextNodesInto(rootNode, textNodes);
      return textNodes;
    }
    _collectTextNodesInto(rootNode, textNodes) {
      const walker = document.createTreeWalker(
        rootNode,
        NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT,
        {
          acceptNode: (node2) => {
            if (node2.nodeType === Node.ELEMENT_NODE) {
              if (this.shouldSkipElement(node2) || this.isOwnHighlight(node2)) {
                return NodeFilter.FILTER_REJECT;
              }
              if (node2.shadowRoot) {
                this._collectTextNodesInto(node2.shadowRoot, textNodes);
              }
              return NodeFilter.FILTER_SKIP;
            }
            return this.shouldSkipNode(node2) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
          }
        }
      );
      let node;
      while (node = walker.nextNode()) {
        textNodes.push(node);
      }
      if (rootNode.nodeType === Node.ELEMENT_NODE && rootNode.shadowRoot) {
        this._collectTextNodesInto(rootNode.shadowRoot, textNodes);
      }
    }
    shouldSkipNode(node) {
      if (node.textContent.trim().length <= 0) {
        return true;
      }
      const parent = node.parentNode;
      if (parent && parent.classList && this.isOwnHighlight(parent)) {
        return true;
      }
      if (parent && this.shouldSkipElement(parent)) {
        return true;
      }
      if (parent && parent.closest && parent.closest("[data-skip-analysis]")) {
        return true;
      }
      return false;
    }
    shouldSkipElement(element) {
      const skipTags = ["SCRIPT", "STYLE", "NOSCRIPT", "SVG", "HEAD", "META", "LINK"];
      if (skipTags.includes(element.nodeName)) {
        return true;
      }
      if (element.classList) {
        if (element.classList.contains("bias-popup") || element.classList.contains("popup-content") || element.classList.contains("popup-close")) {
          return true;
        }
      }
      if (element.hasAttribute && (element.hasAttribute("data-e-prime-popup") || element.hasAttribute("data-skip-analysis"))) {
        return true;
      }
      const popupParent = element.closest(".bias-popup, [data-e-prime-popup]");
      if (popupParent) {
        return true;
      }
      return false;
    }
    isOwnHighlight(element) {
      if (!element.classList)
        return false;
      for (const className of element.classList) {
        if (className.startsWith(this.highlightClassPrefix) || className.startsWith(this.excellenceClassPrefix) || className.startsWith(this.customClassPrefix)) {
          return true;
        }
      }
      return false;
    }
    // Create a document fragment with highlighted content
    createHighlightedFragment(text, matches) {
      const fragment = document.createDocumentFragment();
      let lastIndex = 0;
      for (const match of matches) {
        if (match.index > lastIndex) {
          fragment.appendChild(
            document.createTextNode(text.substring(lastIndex, match.index))
          );
        }
        const span = document.createElement("span");
        if (match.isExcellence) {
          span.className = match.className || `${this.excellenceClassPrefix}${match.type}`;
        } else if (match.isCustom && match.customGroup) {
          span.className = match.customGroup.className;
        } else {
          const cssType = match.parentType || match.type;
          span.className = `${this.highlightClassPrefix}${cssType}`;
        }
        if (match.intensity) {
          span.classList.add(`bias-intensity-${match.intensity}`);
        }
        span.textContent = match.text;
        this.addDataAttributes(span, match);
        fragment.appendChild(span);
        lastIndex = match.index + match.length;
      }
      if (lastIndex < text.length) {
        fragment.appendChild(
          document.createTextNode(text.substring(lastIndex))
        );
      }
      return fragment;
    }
    // Framework-safe application of highlights to a text node.
    //
    // Frameworks like React keep references to the DOM nodes they created and
    // later call removeChild on them or update their data in place. Replacing
    // the text node (the old approach) made those calls throw NotFoundError,
    // and React's error handling then blanked the surrounding component —
    // on Facebook this manifested as "See more" never expanding and posts
    // disappearing. Instead: insert the highlight fragment BEFORE the
    // original node and empty the original in place. The framework's node
    // reference stays valid, and purgeStaleFragments removes our fragments
    // the instant the framework reclaims the anchor.
    applyHighlights(node, matches) {
      const parent = node.parentNode;
      if (!parent)
        return false;
      const fragment = this.createHighlightedFragment(node.textContent, matches);
      const inserted = Array.from(fragment.childNodes);
      parent.insertBefore(fragment, node);
      node.textContent = "";
      for (const insertedNode of inserted) {
        if (insertedNode.nodeType === Node.ELEMENT_NODE) {
          insertedNode._eprimerAnchor = node;
        }
      }
      this._anchoredFragments.set(node, inserted);
      return true;
    }
    // Right-click removal of ONE highlight. Two constraints shape this:
    // the replacement must be exempt from re-analysis (data-skip-analysis,
    // otherwise the word re-highlights on the next mutation pass), and
    // parent.normalize() must never run here — normalize deletes empty text
    // nodes, which would destroy the framework anchor and make
    // purgeStaleFragments tear out the block's other fragments. One
    // right-click used to wipe the whole section that way.
    removeSingleHighlight(el) {
      const parent = el && el.parentNode;
      if (!parent)
        return;
      this.cleanupHoverElements(el);
      const neutral = document.createElement("span");
      neutral.setAttribute("data-skip-analysis", "true");
      neutral.textContent = el.textContent;
      const anchor = el._eprimerAnchor;
      if (anchor) {
        const fragments = this._anchoredFragments.get(anchor);
        if (fragments) {
          const index = fragments.indexOf(el);
          if (index !== -1)
            fragments[index] = neutral;
        }
        neutral._eprimerAnchor = anchor;
      }
      parent.replaceChild(neutral, el);
    }
    // Called on every mutation batch, before any debounced re-analysis:
    // if the page removed one of our anchors (framework remove+insert) or
    // wrote new text into one (framework in-place update), our inserted
    // fragments now duplicate content the page has replaced — delete them
    // immediately so nothing ever renders twice.
    purgeStaleFragments(mutations) {
      for (const mutation of mutations) {
        if (mutation.removedNodes) {
          for (const removed of mutation.removedNodes) {
            this._purgeAnchor(removed);
          }
        }
        if (mutation.type === "characterData" && this._anchoredFragments.has(mutation.target) && mutation.target.textContent !== "") {
          this._purgeAnchor(mutation.target);
        }
      }
    }
    _purgeAnchor(node) {
      const fragments = this._anchoredFragments.get(node);
      if (!fragments)
        return;
      this._anchoredFragments.delete(node);
      for (const fragmentNode of fragments) {
        if (fragmentNode.parentNode) {
          fragmentNode.parentNode.removeChild(fragmentNode);
        }
      }
    }
    clearFragmentRegistry() {
      this._anchoredFragments = /* @__PURE__ */ new WeakMap();
    }
    getTooltipText(type) {
      const { parentId, subCategoryId } = BiasConfig.resolveType(type);
      if (subCategoryId) {
        const parentConfig = BiasConfig.getBiasTypeConfig(parentId);
        const subConfig = parentConfig && parentConfig.subCategories ? parentConfig.subCategories[subCategoryId] : null;
        if (subConfig) {
          if (parentConfig.isExplainer) {
            return `${subConfig.name} \u2014 click for context on this term`;
          }
          return `Possible ${parentConfig.name} - ${subConfig.name}`;
        }
      }
      const directConfig = BiasConfig.getBiasTypeConfig(type);
      if (directConfig)
        return directConfig.tooltip;
      return "Bias indicator";
    }
    getExcellenceTooltipText(type) {
      const tooltips = {
        attribution: "\u2713 Specific, verifiable source provided",
        nuance: "\u2713 Acknowledges complexity and avoids absolutes",
        transparency: "\u2713 Transparent about limitations and perspective",
        discourse: "\u2713 Encourages dialogue and acknowledges others",
        evidence: "\u2713 Claims supported by specific evidence"
      };
      return tooltips[type] || "Excellence indicator";
    }
    // Create a hover card element for enhanced tooltips
    createHoverCard(match, allMatches = []) {
      try {
        const nearbyMatches = this.findNearbyMatches(match, allMatches);
        const hoverHTML = this.hoverGenerator.generateHoverContent(match, nearbyMatches);
        const container = document.createElement("div");
        container.innerHTML = hoverHTML;
        return container.firstChild;
      } catch (error) {
        console.warn("Error creating hover card:", error);
        return null;
      }
    }
    // Find matches that are near the current match for context
    findNearbyMatches(currentMatch, allMatches) {
      const NEARBY_DISTANCE = 100;
      const nearby = [];
      for (const match of allMatches) {
        if (match === currentMatch)
          continue;
        const distance = Math.abs(match.index - currentMatch.index);
        if (distance <= NEARBY_DISTANCE) {
          nearby.push(match);
        }
      }
      return nearby;
    }
    // Add data attributes for popup content (replaces individual event listeners)
    addDataAttributes(spanElement, match) {
      if (!this.popupManager) {
        this.popupManager = getPopupManager();
      }
      if (match.isContextual) {
        spanElement.setAttribute("data-contextual", "true");
        if (match.contextReasoning) {
          spanElement.setAttribute("data-context-reasoning", match.contextReasoning);
        }
        if (match.confidence) {
          spanElement.setAttribute("data-confidence", match.confidence.toString());
        }
        if (match.context) {
          spanElement.setAttribute("data-context", match.context);
        }
      }
      if (match.subCategory) {
        spanElement.setAttribute("data-sub-category", JSON.stringify(match.subCategory));
      }
      if (match.portrayal) {
        spanElement.setAttribute("data-portrayal", JSON.stringify(match.portrayal));
      }
      let tooltipText;
      if (match.isContextual && match.contextReasoning) {
        const prefix = match.isExcellence ? "\u2713" : "\u26A0\uFE0F";
        const confidenceText = match.confidence ? ` (${(match.confidence * 100).toFixed(0)}% confidence)` : "";
        tooltipText = `${prefix} ${match.contextReasoning}${confidenceText}`;
      } else if (match.isCustom && match.customGroup) {
        tooltipText = `Custom: ${match.customGroup.name}`;
        spanElement.setAttribute("data-custom-group", match.customGroup.id);
        spanElement.setAttribute("data-custom-group-data", JSON.stringify({
          id: match.customGroup.id,
          name: match.customGroup.name,
          color: match.customGroup.color,
          hoverContent: match.customGroup.hoverContent
        }));
      } else if (match.isExcellence) {
        tooltipText = match.tooltip || this.getExcellenceTooltipText(match.type);
      } else {
        tooltipText = this.getTooltipText(match.type);
      }
      spanElement.setAttribute("data-tooltip-text", tooltipText);
    }
    // Legacy method - now handled by PopupManager
    // Keeping for backward compatibility but it's no longer used
    showContextMenu(event, match) {
      console.warn("showContextMenu is deprecated - popup handling now managed by PopupManager");
    }
    // Remove all bias highlights (built-in, excellence, and custom groups)
    removeAllHighlights() {
      const selector = Object.values(this.getHighlightSelectors()).join(", ");
      this.removeHighlightsBySelector(selector);
      this.clearFragmentRegistry();
    }
    // Shared unwrap logic: replace matching highlight spans with plain text.
    //
    // Deliberately NO parent.normalize() afterwards: normalize() deletes
    // empty text nodes, which would destroy the emptied anchor nodes that
    // keep framework references valid (see applyHighlights) — on React
    // pages that resurfaces the blanked-component crash, and with the
    // purge it turned one removal into losing the block's other fragments.
    // Adjacent unwrapped text nodes are harmless.
    removeHighlightsBySelector(selector) {
      const highlights = document.querySelectorAll(selector);
      highlights.forEach((highlight) => {
        this.cleanupHoverElements(highlight);
        const parent = highlight.parentNode;
        if (!parent)
          return;
        const textNode = document.createTextNode(highlight.textContent);
        parent.replaceChild(textNode, highlight);
      });
    }
    // Clean up data attributes (event listeners are handled by PopupManager)
    cleanupHoverElements(element) {
      if (element && element.removeAttribute) {
        element.removeAttribute("title");
        element.removeAttribute("data-tooltip");
        element.removeAttribute("data-tooltip-text");
        element.removeAttribute("data-contextual");
        element.removeAttribute("data-context-reasoning");
        element.removeAttribute("data-confidence");
        element.removeAttribute("data-context");
        element.removeAttribute("data-sub-category");
        element.removeAttribute("data-portrayal");
        element.removeAttribute("data-custom-group");
        element.removeAttribute("data-custom-group-data");
      }
    }
    // Remove specific excellence type highlights
    removeExcellenceHighlights(type) {
      this.removeHighlightsBySelector(`.${this.excellenceClassPrefix}${type}`);
    }
    // Remove specific type of highlights
    removeSpecificHighlights(type) {
      this.removeHighlightsBySelector(`.${this.highlightClassPrefix}${type}`);
    }
    // Remove highlights of one custom group (className comes from the group config)
    removeCustomHighlights(className) {
      this.removeHighlightsBySelector(`.${className}`);
    }
    // Built from BiasConfig so new bias/excellence types are covered automatically.
    // Custom-group spans always have their class attribute starting with the
    // custom prefix (className is assigned before any intensity class is added),
    // so a single attribute selector covers every group.
    getHighlightSelectors() {
      const selectors = {};
      for (const config of Object.values(BiasConfig.BIAS_TYPES)) {
        selectors[config.id] = `.${this.highlightClassPrefix}${config.id}`;
      }
      for (const config of Object.values(BiasConfig.EXCELLENCE_TYPES)) {
        selectors[config.id] = `.${this.excellenceClassPrefix}${config.id}`;
      }
      selectors.custom = `span[class^="${this.customClassPrefix}"]`;
      return selectors;
    }
    // Check if content change is significant enough to reprocess
    isSignificantContent(node) {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const text = node.textContent || "";
        return text.trim().length > 20;
      } else if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent || "";
        return text.trim().length > 20;
      }
      return false;
    }
    // Extract changed text nodes from mutations
    extractChangedTextNodes(mutations) {
      const changedNodes = [];
      mutations.forEach((mutation) => {
        if (this.isOwnHighlight(mutation.target)) {
          return;
        }
        if (mutation.type === "characterData") {
          const node = mutation.target;
          const parent = node.parentNode;
          if (node.nodeType === Node.TEXT_NODE && parent && !this.isOwnHighlight(parent) && !this.shouldSkipElement(parent) && node.textContent.trim().length > 5) {
            changedNodes.push(node);
          }
          return;
        }
        Array.from(mutation.addedNodes).forEach((node) => {
          if (node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 5) {
            changedNodes.push(node);
          } else if (node.nodeType === Node.ELEMENT_NODE) {
            const textNodes = this.collectTextNodes(node);
            changedNodes.push(...textNodes);
          }
        });
      });
      return Array.from(new Set(changedNodes));
    }
    // Count current highlights for stats
    countHighlights() {
      const counts = {};
      const selectors = this.getHighlightSelectors();
      for (const [type, selector] of Object.entries(selectors)) {
        counts[type] = document.querySelectorAll(selector).length;
      }
      return counts;
    }
  };

  // src/utils/PerformanceMonitor.js
  var PerformanceMonitor = class {
    constructor() {
      this.timers = /* @__PURE__ */ new Map();
      this.metrics = /* @__PURE__ */ new Map();
      this.enabled = true;
    }
    start(label) {
      if (!this.enabled)
        return;
      this.timers.set(label, {
        startTime: performance.now(),
        label
      });
    }
    end(label) {
      if (!this.enabled)
        return 0;
      const timer = this.timers.get(label);
      if (!timer) {
        console.warn(`Performance timer '${label}' was not started`);
        return 0;
      }
      const duration = performance.now() - timer.startTime;
      this.timers.delete(label);
      if (!this.metrics.has(label)) {
        this.metrics.set(label, {
          count: 0,
          totalTime: 0,
          averageTime: 0,
          minTime: Infinity,
          maxTime: 0
        });
      }
      const metric = this.metrics.get(label);
      metric.count++;
      metric.totalTime += duration;
      metric.averageTime = metric.totalTime / metric.count;
      metric.minTime = Math.min(metric.minTime, duration);
      metric.maxTime = Math.max(metric.maxTime, duration);
      BiasConfig.debugLog(`Performance: ${label} completed in ${duration.toFixed(2)}ms`);
      return duration;
    }
    getMetrics() {
      const metrics = {};
      for (const [label, data] of this.metrics) {
        metrics[label] = { ...data };
      }
      return metrics;
    }
    getMetric(label) {
      return this.metrics.get(label);
    }
    reset() {
      this.timers.clear();
      this.metrics.clear();
    }
    enable() {
      this.enabled = true;
    }
    disable() {
      this.enabled = false;
    }
    // Memory usage monitoring
    getMemoryUsage() {
      if (performance.memory) {
        return {
          used: Math.round(performance.memory.usedJSHeapSize / 1024 / 1024),
          total: Math.round(performance.memory.totalJSHeapSize / 1024 / 1024),
          limit: Math.round(performance.memory.jsHeapSizeLimit / 1024 / 1024)
        };
      }
      return null;
    }
    // Log performance summary
    logSummary() {
      if (!this.enabled)
        return;
      console.group("Performance Summary");
      for (const [label, metric] of this.metrics) {
        console.log(`${label}:`, {
          calls: metric.count,
          average: `${metric.averageTime.toFixed(2)}ms`,
          min: `${metric.minTime.toFixed(2)}ms`,
          max: `${metric.maxTime.toFixed(2)}ms`,
          total: `${metric.totalTime.toFixed(2)}ms`
        });
      }
      const memory = this.getMemoryUsage();
      if (memory) {
        console.log("Memory:", `${memory.used}MB / ${memory.total}MB (limit: ${memory.limit}MB)`);
      }
      console.groupEnd();
    }
    cleanup() {
      this.reset();
      this.enabled = false;
    }
  };

  // src/utils/ExcellenceDetector.js
  var ExcellenceDetector = class {
    constructor() {
      this.excellencePatterns = {
        attribution: {
          name: "Clear Attribution",
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
          className: "excellence-attribution",
          tooltip: "Specific, verifiable source provided",
          color: "#28a745"
        },
        nuance: {
          name: "Nuanced Language",
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
          className: "excellence-nuance",
          tooltip: "Acknowledges complexity and avoids absolutes",
          color: "#218838"
        },
        transparency: {
          name: "Transparent Communication",
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
          className: "excellence-transparency",
          tooltip: "Transparent about limitations and perspective",
          color: "#28a745"
        },
        discourse: {
          name: "Constructive Discourse",
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
          className: "excellence-discourse",
          tooltip: "Encourages dialogue and acknowledges others",
          color: "#20c997"
        },
        evidence: {
          name: "Evidence-Based Claims",
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
          className: "excellence-evidence",
          tooltip: "Claims supported by specific evidence",
          color: "#17a2b8"
        }
      };
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
    // Detect subject portrayal (positive/negative framing)
    detectPortrayal(text) {
      for (const [valence, patterns] of Object.entries(this.portrayalPatterns)) {
        for (const [type, pattern] of Object.entries(patterns)) {
          if (pattern.test(text)) {
            pattern.lastIndex = 0;
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
              type,
              className: config.className,
              tooltip: config.tooltip,
              isExcellence: true
            });
          }
        }
      }
      return matches;
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
        }
      };
      for (const match of excellence) {
        stats.excellence.byType[match.type] = (stats.excellence.byType[match.type] || 0) + 1;
      }
      for (const problem of problems) {
        if (problem.intensity) {
          stats.problems.byIntensity[problem.intensity]++;
        }
      }
      return stats;
    }
  };

  // src/utils/ContextAwareDetector.js
  var ContextAwareDetector = class {
    constructor() {
      this.windowSize = 100;
      this.contextualPatterns = {
        "it seems": {
          excellence: [
            // Followed by evidence or data
            {
              after: /\s+(?:that\s+)?(?:the\s+)?(?:data|evidence|research|study|findings|analysis)\s+(?:shows?|indicates?|suggests?|supports?|demonstrates?)/i,
              confidence: 0.9,
              reasoning: "Uses 'seems' appropriately with evidence"
            },
            // "It seems to me" with reasoning
            {
              after: /\s+to\s+me,?\s+(?:that\s+)?(?:based\s+on|given|considering)/i,
              confidence: 0.85,
              reasoning: "Transparent personal opinion with reasoning"
            },
            // Preceded by attribution
            {
              before: /according\s+to\s+[\w\s]+,?\s*$/i,
              confidence: 0.8,
              reasoning: "Appropriately qualified with source"
            },
            // Scientific hedging
            {
              after: /\s+(?:likely|probable|possible)\s+(?:that|given)/i,
              confidence: 0.75,
              reasoning: "Appropriate scientific hedging"
            }
          ],
          weasel: [
            // Followed by false certainty
            {
              after: /\s+(?:obvious|clear|evident)\s+(?:that|to)/i,
              confidence: 0.9,
              reasoning: "Creates false certainty without evidence"
            },
            // Vague crowd attribution
            {
              after: /\s+(?:like\s+)?(?:most\s+people|everyone|everybody)\s+(?:knows?|agrees?|thinks?)/i,
              confidence: 0.85,
              reasoning: "Vague attribution to unspecified groups"
            },
            // Standalone assertion without qualification
            {
              before: /^\s*$/i,
              after: /\s+that\s+[^.]*?(?:without|no\s+(?:evidence|proof|data))/i,
              confidence: 0.7,
              reasoning: "Makes claims without supporting evidence"
            }
          ],
          neutral: [
            // General possibility
            {
              after: /\s+(?:reasonable|likely|possible|plausible)\s+to/i,
              confidence: 0.6,
              reasoning: "Appropriate uncertainty expression"
            }
          ]
        },
        "appears": {
          excellence: [
            {
              after: /\s+(?:based\s+on|according\s+to|in\s+light\s+of)/i,
              confidence: 0.8,
              reasoning: "Qualified observation with basis"
            }
          ],
          weasel: [
            {
              after: /\s+(?:obvious|clear)\s+that/i,
              confidence: 0.8,
              reasoning: "False certainty language"
            }
          ]
        },
        "studies show": {
          excellence: [
            // Specific studies mentioned
            {
              before: /(?:recent|multiple|several|peer-reviewed)\s+$/i,
              confidence: 0.7,
              reasoning: "Qualified with study characteristics"
            },
            // Followed by citation or specific attribution
            {
              after: /\s+that\s+[\w\s]+\([\w\s\.]+\d{4}\)/i,
              confidence: 0.9,
              reasoning: "Includes specific citation"
            }
          ],
          weasel: [
            // No specificity
            {
              before: /^\s*$/i,
              after: /\s+that\s+(?![\w\s]*\(\d{4}\))/i,
              confidence: 0.8,
              reasoning: "Vague attribution without specific studies"
            }
          ]
        }
      };
      this.resolutionHierarchy = {
        priorities: {
          "specific_attribution": 100,
          // Named sources with credentials
          "evidence_based": 90,
          // Data/research based claims
          "transparent_opinion": 80,
          // Clear personal opinion with reasoning
          "appropriate_hedge": 70,
          // Scientific/appropriate uncertainty
          "neutral_hedge": 50,
          // General uncertainty
          "vague_attribution": 30,
          // "Experts believe" type phrases
          "false_certainty": 10
          // Disguised opinion as fact
        }
      };
    }
    // Analyze text context around a phrase
    analyzePhrase(text, startIndex, phrase) {
      const before = text.substring(Math.max(0, startIndex - this.windowSize), startIndex);
      const after = text.substring(startIndex + phrase.length, startIndex + phrase.length + this.windowSize);
      return {
        phrase,
        before: before.toLowerCase(),
        after: after.toLowerCase(),
        fullContext: before + phrase + after,
        startIndex,
        endIndex: startIndex + phrase.length
      };
    }
    // Detect patterns with context awareness
    detectWithContext(text, phrase) {
      const patterns = this.contextualPatterns[phrase.toLowerCase()];
      if (!patterns)
        return [];
      const matches = [];
      let index = 0;
      while ((index = text.toLowerCase().indexOf(phrase.toLowerCase(), index)) !== -1) {
        const context = this.analyzePhrase(text, index, phrase);
        const classification = this.classifyByContext(context, patterns);
        if (classification) {
          matches.push({
            index,
            length: phrase.length,
            // Slice from the document, not the dictionary key: this text
            // replaces the page's text when highlighted, so it must keep
            // the original casing
            text: text.substr(index, phrase.length),
            classification: classification.type,
            confidence: classification.confidence,
            reasoning: classification.reasoning,
            context: context.fullContext.trim(),
            isContextual: true
          });
        }
        index++;
      }
      return matches;
    }
    // Classify a phrase based on its context
    classifyByContext(context, patternSets) {
      let bestMatch = null;
      let highestConfidence = 0;
      for (const [type, patterns] of Object.entries(patternSets)) {
        for (const pattern of patterns) {
          const match = this.testPattern(pattern, context);
          if (match && pattern.confidence > highestConfidence) {
            bestMatch = {
              type,
              confidence: pattern.confidence,
              reasoning: pattern.reasoning
            };
            highestConfidence = pattern.confidence;
          }
        }
      }
      return bestMatch;
    }
    // Test if a pattern matches the context
    testPattern(pattern, context) {
      let beforeMatch = true;
      let afterMatch = true;
      if (pattern.before) {
        beforeMatch = pattern.before.test(context.before);
      }
      if (pattern.after) {
        afterMatch = pattern.after.test(context.after);
      }
      return beforeMatch && afterMatch;
    }
    // Detect all contextual patterns in text
    detectAll(text) {
      const allMatches = [];
      for (const phrase of Object.keys(this.contextualPatterns)) {
        const matches = this.detectWithContext(text, phrase);
        allMatches.push(...matches);
      }
      return allMatches.sort((a, b) => a.index - b.index);
    }
    // Resolve conflicts between overlapping matches
    resolveConflicts(allMatches) {
      const resolved = [];
      const processed = /* @__PURE__ */ new Set();
      for (let i = 0; i < allMatches.length; i++) {
        if (processed.has(i))
          continue;
        const match = allMatches[i];
        const overlapping = this.findOverlapping(match, allMatches, i);
        if (overlapping.length === 0) {
          resolved.push(match);
          processed.add(i);
        } else {
          const best = this.chooseBestMatch([match, ...overlapping.map((idx) => allMatches[idx])]);
          resolved.push(best);
          processed.add(i);
          overlapping.forEach((idx) => processed.add(idx));
        }
      }
      return resolved;
    }
    // Find matches that overlap with the current match
    findOverlapping(match, allMatches, currentIndex) {
      const overlapping = [];
      const matchEnd = match.index + match.length;
      for (let i = 0; i < allMatches.length; i++) {
        if (i === currentIndex)
          continue;
        const other = allMatches[i];
        const otherEnd = other.index + other.length;
        if (!(matchEnd <= other.index || otherEnd <= match.index)) {
          overlapping.push(i);
        }
      }
      return overlapping;
    }
    // Choose the best match from conflicting matches. Regular (non-contextual)
    // matches carry no confidence; treat them as 0.5 so any contextual match
    // above the neutral baseline outranks them regardless of array order.
    chooseBestMatch(matches) {
      return matches.reduce((best, current) => {
        if ((current.confidence ?? 0.5) > (best.confidence ?? 0.5)) {
          return current;
        }
        return best;
      });
    }
    // Get explanation for why a phrase was classified as it was
    explainClassification(match) {
      return {
        phrase: match.text,
        classification: match.classification,
        confidence: (match.confidence * 100).toFixed(0) + "%",
        reasoning: match.reasoning,
        context: match.context
      };
    }
  };

  // src/config/CustomDictionaryManager.js
  var CustomDictionaryManager = class _CustomDictionaryManager {
    static MAX_GROUPS = 50;
    static MAX_WORDS_PER_GROUP = 1e3;
    static STORAGE_KEY = "customGroups";
    static SCHEMA_VERSION = 1;
    static ID_PREFIX = "custom_";
    static CSS_CLASS_PREFIX = "bias-highlight-custom-";
    static DEFAULT_COLOR = "#e67e22";
    // Colors are interpolated into generated CSS (with an alpha suffix) and
    // style attributes; imported JSON is untrusted, so only accept #rrggbb
    static sanitizeColor(color) {
      return /^#[0-9a-fA-F]{6}$/.test(String(color)) ? color : _CustomDictionaryManager.DEFAULT_COLOR;
    }
    constructor() {
      this.groups = /* @__PURE__ */ new Map();
      this.compiledPatterns = /* @__PURE__ */ new Map();
      this.listeners = /* @__PURE__ */ new Map();
      this._idCounter = 0;
      this._loaded = false;
    }
    async load() {
      try {
        const data = await this._storageGet(_CustomDictionaryManager.STORAGE_KEY);
        const stored = data[_CustomDictionaryManager.STORAGE_KEY];
        if (stored && stored.version === _CustomDictionaryManager.SCHEMA_VERSION) {
          for (const [id, group] of Object.entries(stored.groups || {})) {
            this.groups.set(id, group);
          }
          this._idCounter = stored.idCounter || 0;
        }
        this._compileAll();
        this._loaded = true;
      } catch (error) {
        console.warn("CustomDictionaryManager: failed to load", (error == null ? void 0 : error.message) ?? String(error));
        this._loaded = true;
      }
    }
    async save() {
      const payload = {
        version: _CustomDictionaryManager.SCHEMA_VERSION,
        idCounter: this._idCounter,
        groups: Object.fromEntries(this.groups)
      };
      await this._storageSet({ [_CustomDictionaryManager.STORAGE_KEY]: payload });
    }
    _generateId(name) {
      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "").substring(0, 30);
      this._idCounter++;
      return `${_CustomDictionaryManager.ID_PREFIX}${slug}_${this._idCounter}`;
    }
    async createGroup({ name, color = "#e67e22", description = "", words = [], hoverContent = {} }) {
      if (this.groups.size >= _CustomDictionaryManager.MAX_GROUPS) {
        throw new Error(`Maximum of ${_CustomDictionaryManager.MAX_GROUPS} custom groups reached`);
      }
      if (!name || !name.trim()) {
        throw new Error("Group name is required");
      }
      const id = this._generateId(name);
      const group = {
        id,
        name: name.trim(),
        color: _CustomDictionaryManager.sanitizeColor(color),
        description: description.trim(),
        enabled: true,
        words: words.slice(0, _CustomDictionaryManager.MAX_WORDS_PER_GROUP),
        hoverContent: {
          basicTip: hoverContent.basicTip || description.trim() || `Custom detection: ${name.trim()}`,
          whenConcerning: hoverContent.whenConcerning || "",
          whenAcceptable: hoverContent.whenAcceptable || "",
          suggestion: hoverContent.suggestion || ""
        },
        settingKey: `highlight_${id}`,
        statKey: `${id}Count`,
        className: `${_CustomDictionaryManager.CSS_CLASS_PREFIX}${id}`,
        createdAt: Date.now(),
        updatedAt: Date.now()
      };
      this.groups.set(id, group);
      this._compileGroup(id);
      await this.save();
      this._emit("groupCreated", group);
      return group;
    }
    async updateGroup(id, updates) {
      const group = this.groups.get(id);
      if (!group)
        throw new Error(`Group not found: ${id}`);
      if (updates.name !== void 0)
        group.name = updates.name.trim();
      if (updates.color !== void 0)
        group.color = _CustomDictionaryManager.sanitizeColor(updates.color);
      if (updates.description !== void 0)
        group.description = updates.description.trim();
      if (updates.enabled !== void 0)
        group.enabled = updates.enabled;
      if (updates.words !== void 0) {
        group.words = updates.words.slice(0, _CustomDictionaryManager.MAX_WORDS_PER_GROUP);
      }
      if (updates.hoverContent !== void 0) {
        group.hoverContent = { ...group.hoverContent, ...updates.hoverContent };
      }
      group.updatedAt = Date.now();
      this._compileGroup(id);
      await this.save();
      this._emit("groupUpdated", group);
      return group;
    }
    async deleteGroup(id) {
      const group = this.groups.get(id);
      if (!group)
        throw new Error(`Group not found: ${id}`);
      this.groups.delete(id);
      this.compiledPatterns.delete(id);
      await this.save();
      this._emit("groupDeleted", { id });
    }
    getGroup(id) {
      return this.groups.get(id) || null;
    }
    getAllGroups() {
      return Array.from(this.groups.values());
    }
    getEnabledGroups() {
      return this.getAllGroups().filter((g) => g.enabled);
    }
    getCompiledPatterns(groupId) {
      return this.compiledPatterns.get(groupId) || [];
    }
    getAllCompiledPatterns() {
      return this.compiledPatterns;
    }
    _compileAll() {
      this.compiledPatterns.clear();
      for (const id of this.groups.keys()) {
        this._compileGroup(id);
      }
    }
    _compileGroup(id) {
      const group = this.groups.get(id);
      if (!group)
        return;
      const compiled = [];
      for (const word of group.words) {
        const pattern = this._compileWord(word, id);
        if (pattern)
          compiled.push(pattern);
      }
      this.compiledPatterns.set(id, compiled);
    }
    _compileWord(word, groupId) {
      const clean = word.trim();
      if (!clean)
        return null;
      try {
        const isComplex = clean.includes("\\") || clean.includes("(") || clean.includes("[");
        let regexPattern;
        if (isComplex) {
          regexPattern = clean;
        } else {
          const escaped = clean.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
          regexPattern = clean.includes(" ") ? escaped : `\\b${escaped}\\b`;
        }
        const regex = new RegExp(regexPattern, "gi");
        regex.test("test string");
        return {
          source: clean,
          regex,
          type: groupId,
          isComplex
        };
      } catch (error) {
        console.warn(`CustomDictionaryManager: invalid pattern "${clean}"`, (error == null ? void 0 : error.message) ?? String(error));
        return null;
      }
    }
    getSettingsDefaults() {
      const defaults = {};
      for (const group of this.groups.values()) {
        defaults[group.settingKey] = group.enabled;
      }
      return defaults;
    }
    getEmptyStats() {
      const stats = {};
      for (const group of this.groups.values()) {
        stats[group.statKey] = 0;
      }
      return stats;
    }
    getGroupBySettingKey(settingKey) {
      for (const group of this.groups.values()) {
        if (group.settingKey === settingKey)
          return group;
      }
      return null;
    }
    generateCSS() {
      let css = "";
      for (const group of this.groups.values()) {
        const color = _CustomDictionaryManager.sanitizeColor(group.color);
        css += `
.${group.className} {
    background-color: ${color}33;
    border-bottom: 2px solid ${color};
    cursor: pointer;
    transition: background-color 0.2s ease;
}
.${group.className}:hover {
    background-color: ${color}55;
}
`;
      }
      return css;
    }
    async exportGroups(groupIds = null) {
      const groups = groupIds ? groupIds.map((id) => this.groups.get(id)).filter(Boolean) : this.getAllGroups();
      return {
        version: _CustomDictionaryManager.SCHEMA_VERSION,
        exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
        groups: groups.map((g) => ({
          name: g.name,
          color: g.color,
          description: g.description,
          words: g.words,
          hoverContent: g.hoverContent
        }))
      };
    }
    async importGroups(data) {
      if (!data || !data.groups || !Array.isArray(data.groups)) {
        throw new Error("Invalid import data format");
      }
      const imported = [];
      for (const groupData of data.groups) {
        if (!groupData.name)
          continue;
        if (this.groups.size >= _CustomDictionaryManager.MAX_GROUPS)
          break;
        const group = await this.createGroup({
          name: groupData.name,
          color: groupData.color || "#e67e22",
          description: groupData.description || "",
          words: groupData.words || [],
          hoverContent: groupData.hoverContent || {}
        });
        imported.push(group);
      }
      return imported;
    }
    on(event, callback) {
      if (!this.listeners.has(event)) {
        this.listeners.set(event, []);
      }
      this.listeners.get(event).push(callback);
    }
    off(event, callback) {
      const cbs = this.listeners.get(event);
      if (cbs) {
        this.listeners.set(event, cbs.filter((cb) => cb !== callback));
      }
    }
    _emit(event, data) {
      const cbs = this.listeners.get(event) || [];
      for (const cb of cbs) {
        try {
          cb(data);
        } catch (e) {
          console.warn("Event listener error:", e);
        }
      }
    }
    _storageGet(key) {
      return new Promise((resolve, reject) => {
        if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) {
          chrome.storage.local.get(key, (result) => {
            if (chrome.runtime.lastError) {
              reject(new Error(chrome.runtime.lastError.message));
            } else {
              resolve(result);
            }
          });
        } else {
          resolve({});
        }
      });
    }
    _storageSet(data) {
      return new Promise((resolve, reject) => {
        if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) {
          chrome.storage.local.set(data, () => {
            if (chrome.runtime.lastError) {
              reject(new Error(chrome.runtime.lastError.message));
            } else {
              resolve();
            }
          });
        } else {
          resolve();
        }
      });
    }
  };

  // src/content/BiasDetector.js
  var BiasDetector = class {
    constructor() {
      this.settings = BiasConfig.getDefaultSettings();
      this.patterns = new BiasPatterns();
      this.domProcessor = new DOMProcessor();
      this.excellenceDetector = new ExcellenceDetector();
      this.contextAwareDetector = new ContextAwareDetector();
      this.stats = this.createEmptyStats();
      this.observer = null;
      this.performanceMonitor = new PerformanceMonitor();
      this.mode = this.settings.analysisMode || "balanced";
      this._detectionPlans = /* @__PURE__ */ new WeakMap();
      this.compiledDetectors = this.initializeDetectors();
      this.customDictionary = new CustomDictionaryManager();
      this._customReady = false;
      this._customReadyPromise = this._initCustomDictionaries();
      this._analysisQueue = null;
      this._densitySeen = /* @__PURE__ */ new Map();
      this._ignoredCacheSource = null;
      this._ignoredCache = /* @__PURE__ */ new Set();
    }
    async _initCustomDictionaries() {
      try {
        await this.customDictionary.load();
        this._customReady = true;
        this._injectCustomCSS();
      } catch (error) {
        console.warn("Custom dictionaries failed to load:", (error == null ? void 0 : error.message) ?? String(error));
        this._customReady = true;
      }
    }
    _injectCustomCSS() {
      const css = this.customDictionary.generateCSS();
      if (!css)
        return;
      let styleEl = document.getElementById("custom-dictionary-styles");
      if (!styleEl) {
        styleEl = document.createElement("style");
        styleEl.id = "custom-dictionary-styles";
        document.head.appendChild(styleEl);
      }
      styleEl.textContent = css;
    }
    // Initialize all bias detectors with compiled patterns
    initializeDetectors() {
      const detectors = /* @__PURE__ */ new Map();
      for (const [key, config] of Object.entries(BiasConfig.BIAS_TYPES)) {
        const patterns = this.patterns.getCompiledPatterns(config.id);
        this._getDetectionPlan(patterns, config.id);
        detectors.set(config.id, {
          ...config,
          patterns,
          isEnabled: () => this.settings[config.settingKey],
          detect: (text) => this.detectPatterns(text, patterns, config.id)
        });
      }
      return detectors;
    }
    // Detection plan for a patterns array: simple entries folded into per-type
    // alternation regexes, complex and hand-built patterns kept as-is. Cached
    // by array identity so the fold happens once, not per text node; a length
    // change (patterns pushed or removed) rebuilds the plan.
    _getDetectionPlan(patterns, type) {
      let cached = this._detectionPlans.get(patterns);
      if (!cached || cached.builtFrom !== patterns.length) {
        cached = {
          builtFrom: patterns.length,
          plan: buildDetectionPlan(patterns, type)
        };
        this._detectionPlans.set(patterns, cached);
      }
      return cached.plan;
    }
    // Generic pattern detection method
    detectPatterns(text, patterns, type) {
      const matches = [];
      const hasSubCategories = BiasConfig.hasSubCategories(type);
      for (const pattern of this._getDetectionPlan(patterns, type)) {
        try {
          let match;
          pattern.regex.lastIndex = 0;
          while ((match = pattern.regex.exec(text)) !== null) {
            const source = pattern.resolveEntry ? pattern.resolveEntry(match[0]) || pattern.source : pattern.source;
            const matchData = {
              index: match.index,
              length: match[0].length,
              text: match[0],
              type,
              pattern: source
            };
            if (hasSubCategories) {
              const subCategory = this.patterns.getSubCategory(type, match[0]) || this.patterns.getSubCategory(type, source);
              if (subCategory) {
                matchData.type = BiasConfig.getCompositeType(type, subCategory.id);
                matchData.subCategory = subCategory;
                matchData.parentType = type;
              }
            }
            matches.push(matchData);
            if (match.index === pattern.regex.lastIndex) {
              pattern.regex.lastIndex++;
            }
          }
        } catch (error) {
          const errorMessage = error && error.message ? error.message : String(error);
          console.warn(`Error with pattern ${pattern.source}:`, errorMessage);
          continue;
        }
      }
      return matches;
    }
    // Main analysis method. Runs are serialized: concurrent callers queue up
    // instead of interleaving DOM walks (which also broke the performance
    // timer's start/end pairing).
    async analyzeDocument() {
      const run = () => this._runAnalysis();
      this._analysisQueue = this._analysisQueue ? this._analysisQueue.then(run, run) : run();
      return this._analysisQueue;
    }
    async _runAnalysis() {
      if (!this.settings.enableAnalysis) {
        return this.createEmptyStats();
      }
      await this._customReadyPromise;
      this.performanceMonitor.start("document-analysis");
      const hadObserver = !!this.observer;
      this.disconnectObserver();
      try {
        this.domProcessor.removeAllHighlights();
        this.resetStats();
        const textNodes = this.domProcessor.collectTextNodes(document.body);
        BiasConfig.debugLog(`Processing ${textNodes.length} text nodes`);
        const batchSize = BiasConfig.PERFORMANCE.BATCH_SIZE;
        for (let i = 0; i < textNodes.length; i += batchSize) {
          const batch = textNodes.slice(i, i + batchSize);
          await this.processBatch(batch);
          if (i % (batchSize * 4) === 0) {
            await new Promise((resolve) => setTimeout(resolve, 0));
          }
        }
        const duration = this.performanceMonitor.end("document-analysis");
        BiasConfig.debugLog(`Analysis completed in ${duration.toFixed(2)}ms`);
        if (hadObserver) {
          this.setupMutationObserver();
        }
        return this.stats;
      } catch (error) {
        const errorMessage = error && error.message ? error.message : String(error);
        console.error("Document analysis failed:", errorMessage);
        if (hadObserver) {
          this.setupMutationObserver();
        }
        return this.createEmptyStats();
      }
    }
    // Process a batch of text nodes
    async processBatch(textNodes) {
      for (const node of textNodes) {
        try {
          await this.processTextNode(node);
        } catch (error) {
          const errorMessage = error && error.message ? error.message : String(error);
          console.warn("Error processing text node:", errorMessage);
          continue;
        }
      }
    }
    // Process a single text node with all enabled detectors
    async processTextNode(node) {
      const text = node.textContent;
      if (text.trim().length < BiasConfig.PERFORMANCE.MIN_SIGNIFICANT_TEXT || this.isUIText(text)) {
        return;
      }
      const allMatches = [];
      const mode = this.settings.analysisMode || "balanced";
      const contextualMatches = this.contextAwareDetector.detectAll(text);
      if (BiasConfig.DEBUG && contextualMatches.length > 0) {
        console.log("[BiasDetector] Contextual matches found:", contextualMatches.map((m) => ({
          text: m.text,
          classification: m.classification,
          reasoning: m.reasoning
        })));
      }
      if (this._customReady) {
        const customMatches = this._detectCustomPatterns(text);
        allMatches.push(...customMatches);
      }
      if (mode === "problems" || mode === "balanced") {
        for (const [type, detector] of this.compiledDetectors) {
          if (detector.isEnabled()) {
            const matches = detector.detect(text);
            const matchesWithIntensity = matches.map((match) => ({
              ...match,
              type: match.parentType ? match.type : type,
              intensity: this.patterns.getIntensity(type, match.text),
              portrayal: this.excellenceDetector.detectPortrayal(match.text)
            }));
            allMatches.push(...matchesWithIntensity);
          }
        }
        for (const match of contextualMatches) {
          if (match.classification === "weasel" || match.classification === "bias") {
            const standardMatch = {
              index: match.index,
              length: match.length,
              text: match.text,
              type: "weasel",
              isContextual: true,
              contextReasoning: match.reasoning,
              confidence: match.confidence,
              context: match.context,
              intensity: 2
            };
            allMatches.push(standardMatch);
          } else if (match.classification === "neutral") {
            const standardMatch = {
              index: match.index,
              length: match.length,
              text: match.text,
              type: "neutral",
              isContextual: true,
              contextReasoning: match.reasoning,
              confidence: match.confidence,
              context: match.context,
              isNeutralOverride: true
            };
            allMatches.push(standardMatch);
            BiasConfig.debugLog("[BiasDetector] Added neutral override for:", match.text);
          }
        }
      }
      if (mode === "excellence" || mode === "balanced") {
        const excellenceMatches = this.excellenceDetector.findExcellence(text);
        const enabledExcellence = excellenceMatches.filter((match) => {
          const config = BiasConfig.EXCELLENCE_TYPES[match.type.toUpperCase()];
          return config && this.settings[config.settingKey] !== false;
        });
        allMatches.push(...enabledExcellence);
        for (const match of contextualMatches) {
          if (match.classification === "excellence") {
            const excellenceMatch = {
              index: match.index,
              length: match.length,
              text: match.text,
              type: "nuance",
              // Map to existing excellence type
              className: "excellence-nuance",
              tooltip: `\u2713 ${match.reasoning}`,
              isExcellence: true,
              isContextual: true,
              confidence: match.confidence,
              context: match.context
            };
            allMatches.push(excellenceMatch);
          }
        }
      }
      if (allMatches.length > 0) {
        if (BiasConfig.DEBUG) {
          console.log("[BiasDetector] All matches:", allMatches.map((m) => `"${m.text}" -> ${m.type} (contextual: ${m.isContextual})`));
        }
        this.highlightMatches(node, allMatches);
      }
    }
    // Highlight matches in a text node
    highlightMatches(node, matches) {
      const deduplicated = this.deduplicateMatches(matches).filter((match) => match.type !== "neutral");
      const sortedMatches = this._applyDensityAndIgnores(deduplicated);
      if (sortedMatches.length === 0)
        return;
      const applied = this.domProcessor.applyHighlights(node, sortedMatches);
      if (!applied)
        return;
      for (const match of sortedMatches) {
        this.updateStats(match);
      }
    }
    // Remove overlapping matches, preferring contextual matches and higher confidence
    deduplicateMatches(matches) {
      const sorted = matches.sort((a, b) => {
        if (a.index !== b.index)
          return a.index - b.index;
        if (a.isContextual && !b.isContextual)
          return -1;
        if (!a.isContextual && b.isContextual)
          return 1;
        if (a.isContextual && b.isContextual) {
          const aConf = a.confidence || 0.5;
          const bConf = b.confidence || 0.5;
          if (aConf !== bConf)
            return bConf - aConf;
        }
        const aExplainer = this._isExplainerMatch(a);
        const bExplainer = this._isExplainerMatch(b);
        if (aExplainer !== bExplainer)
          return aExplainer ? -1 : 1;
        return b.length - a.length;
      });
      const neutralOverrides = matches.filter((m) => m.isNeutralOverride);
      let filteredMatches = matches;
      for (const neutralMatch of neutralOverrides) {
        filteredMatches = filteredMatches.filter((match) => {
          if (match.isContextual || match === neutralMatch)
            return true;
          const matchEnd = match.index + match.length;
          const neutralEnd = neutralMatch.index + neutralMatch.length;
          const hasOverlap = !(matchEnd <= neutralMatch.index || neutralEnd <= match.index);
          if (hasOverlap) {
            BiasConfig.debugLog("[BiasDetector] Neutral override suppressed:", match.text, match.type);
          }
          return !hasOverlap;
        });
      }
      const contextualMatches = filteredMatches.filter((m) => m.isContextual);
      const regularMatches = filteredMatches.filter((m) => !m.isContextual);
      if (contextualMatches.length > 0) {
        const resolved = this.contextAwareDetector.resolveConflicts([...contextualMatches, ...regularMatches]);
        return resolved.sort((a, b) => a.index - b.index);
      }
      const deduplicated = [];
      let lastEnd = -1;
      for (const match of sorted) {
        if (match.index >= lastEnd) {
          deduplicated.push(match);
          lastEnd = match.index + match.length;
        }
      }
      return deduplicated;
    }
    _isExplainerMatch(match) {
      const { parentId } = BiasConfig.resolveType(match.parentType || match.type);
      const config = BiasConfig.getBiasTypeConfig(parentId);
      return !!(config && config.isExplainer);
    }
    // Enforce the highlight-density quota (per unique type+term, per page) and
    // drop terms on the user's ignore list. Counts persist across incremental
    // mutation batches and reset with each full analysis. Stats count what is
    // actually highlighted, so badges match what the user sees.
    _applyDensityAndIgnores(matches) {
      const density = this.settings.highlightDensity || "standard";
      const limit = BiasConfig.DENSITY_LIMITS[density] !== void 0 ? BiasConfig.DENSITY_LIMITS[density] : BiasConfig.DENSITY_LIMITS.standard;
      const ignored = this._ignoredSet();
      const kept = [];
      for (const match of matches) {
        const termKey = match.text.toLowerCase().replace(/\s+/g, " ");
        if (ignored.has(termKey))
          continue;
        const seenKey = `${match.type}|${termKey}`;
        const count = this._densitySeen.get(seenKey) || 0;
        if (count >= limit)
          continue;
        this._densitySeen.set(seenKey, count + 1);
        kept.push(match);
      }
      return kept;
    }
    _ignoredSet() {
      const source = this.settings.ignoredWords;
      if (source !== this._ignoredCacheSource) {
        this._ignoredCacheSource = source;
        this._ignoredCache = new Set(
          (Array.isArray(source) ? source : []).map((w) => w.toLowerCase().replace(/\s+/g, " "))
        );
      }
      return this._ignoredCache;
    }
    // Update settings with selective highlighting
    async updateSettings(newSettings) {
      const oldSettings = { ...this.settings };
      this.settings = { ...newSettings };
      if (oldSettings.enableAnalysis !== newSettings.enableAnalysis) {
        if (!newSettings.enableAnalysis) {
          this.disconnectObserver();
          this.domProcessor.removeAllHighlights();
          this.resetStats();
          return;
        } else {
          await this.analyzeDocument();
          this.setupMutationObserver();
          return;
        }
      }
      if (newSettings.enableAnalysis) {
        await this.handleDetectorChanges(oldSettings, newSettings);
      }
    }
    // Handle changes to individual detectors
    async handleDetectorChanges(oldSettings, newSettings) {
      let needsReanalysis = false;
      for (const [key, detector] of this.compiledDetectors) {
        const settingKey = detector.settingKey;
        if (oldSettings[settingKey] !== newSettings[settingKey]) {
          if (!newSettings[settingKey]) {
            this.disconnectObserver();
            this.domProcessor.removeSpecificHighlights(detector.id);
            this.stats[detector.statKey] = 0;
            this.setupMutationObserver();
          } else {
            needsReanalysis = true;
          }
        }
      }
      for (const [key, config] of Object.entries(BiasConfig.EXCELLENCE_TYPES)) {
        const settingKey = config.settingKey;
        if (oldSettings[settingKey] !== newSettings[settingKey]) {
          if (!newSettings[settingKey]) {
            this.disconnectObserver();
            this.domProcessor.removeExcellenceHighlights(config.id);
            this.stats[config.statKey] = 0;
            this.setupMutationObserver();
          } else {
            needsReanalysis = true;
          }
        }
      }
      const listKey = (list) => Array.isArray(list) ? list.join("\n") : "";
      if (oldSettings.highlightDensity !== newSettings.highlightDensity || listKey(oldSettings.ignoredWords) !== listKey(newSettings.ignoredWords)) {
        needsReanalysis = true;
      }
      for (const group of this.customDictionary.getAllGroups()) {
        const settingKey = group.settingKey;
        if (oldSettings[settingKey] !== newSettings[settingKey]) {
          if (newSettings[settingKey] === false) {
            this.disconnectObserver();
            this.domProcessor.removeCustomHighlights(group.className);
            this.stats[group.statKey] = 0;
            this.setupMutationObserver();
          } else {
            needsReanalysis = true;
          }
        }
      }
      if (needsReanalysis) {
        this.disconnectObserver();
        await this.analyzeDocumentPreservingDisabled();
        this.setupMutationObserver();
      }
    }
    // Analyze document while preserving stats for disabled detectors
    async analyzeDocumentPreservingDisabled() {
      const preservedStats = {};
      for (const [key, detector] of this.compiledDetectors) {
        if (!detector.isEnabled()) {
          preservedStats[detector.statKey] = this.stats[detector.statKey];
        }
      }
      for (const [key, config] of Object.entries(BiasConfig.EXCELLENCE_TYPES)) {
        if (this.settings[config.settingKey] === false) {
          preservedStats[config.statKey] = this.stats[config.statKey];
        }
      }
      await this.analyzeDocument();
      for (const [statKey, value] of Object.entries(preservedStats)) {
        this.stats[statKey] = value;
      }
    }
    // Utility methods
    // Fixed isUIText function - more targeted filtering
    isUIText(text) {
      const trimmed = text.trim();
      if (trimmed.length < 3) {
        return true;
      }
      if (/^[\d\s\-\+\(\)]+$/.test(trimmed)) {
        return true;
      }
      if (/^[A-Z\s]{2,8}$/.test(trimmed) && trimmed.length <= 8) {
        return true;
      }
      if (/^(ok|yes|no|submit|cancel|close|back|next|prev|home|menu)$/i.test(trimmed)) {
        return true;
      }
      return false;
    }
    _detectCustomPatterns(text) {
      const matches = [];
      for (const group of this.customDictionary.getEnabledGroups()) {
        if (this.settings[group.settingKey] === false)
          continue;
        const patterns = this.customDictionary.getCompiledPatterns(group.id);
        for (const pattern of patterns) {
          try {
            let match;
            pattern.regex.lastIndex = 0;
            while ((match = pattern.regex.exec(text)) !== null) {
              matches.push({
                index: match.index,
                length: match[0].length,
                text: match[0],
                type: group.id,
                isCustom: true,
                customGroup: group,
                intensity: 2
              });
              if (match.index === pattern.regex.lastIndex) {
                pattern.regex.lastIndex++;
              }
            }
          } catch (error) {
            console.warn(`Custom pattern error:`, (error == null ? void 0 : error.message) ?? String(error));
          }
        }
      }
      return matches;
    }
    updateStats(match) {
      if (match.isCustom && match.customGroup) {
        this.stats[match.customGroup.statKey] = (this.stats[match.customGroup.statKey] || 0) + 1;
        return;
      }
      if (match.isExcellence) {
        const config = BiasConfig.EXCELLENCE_TYPES[match.type.toUpperCase()];
        if (config && config.statKey) {
          this.stats[config.statKey] = (this.stats[config.statKey] || 0) + 1;
        }
      } else {
        const { parentId } = BiasConfig.resolveType(match.type);
        const detector = this.compiledDetectors.get(parentId);
        if (detector && detector.statKey) {
          this.stats[detector.statKey]++;
        }
        if (match.subCategory && match.subCategory.statKey) {
          this.stats[match.subCategory.statKey] = (this.stats[match.subCategory.statKey] || 0) + 1;
        }
      }
    }
    resetStats() {
      this.stats = this.createEmptyStats();
      this._densitySeen = /* @__PURE__ */ new Map();
    }
    createEmptyStats() {
      const stats = BiasConfig.createEmptyStats();
      if (this._customReady) {
        Object.assign(stats, this.customDictionary.getEmptyStats());
      }
      return stats;
    }
    // Mutation observer setup
    setupMutationObserver() {
      if (this.observer) {
        this.observer.disconnect();
      }
      let debounceTimer = null;
      this.observer = new MutationObserver((mutations) => {
        this.domProcessor.purgeStaleFragments(mutations);
        if (this.shouldProcessMutations(mutations)) {
          clearTimeout(debounceTimer);
          debounceTimer = setTimeout(() => {
            this.handleContentChange(mutations);
          }, BiasConfig.PERFORMANCE.MUTATION_DEBOUNCE);
        }
      });
      this.observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true
      });
    }
    shouldProcessMutations(mutations) {
      return mutations.some((mutation) => {
        if (this.domProcessor.isOwnHighlight(mutation.target)) {
          return false;
        }
        if (mutation.type === "characterData") {
          const parent = mutation.target.parentNode;
          if (!parent || this.domProcessor.isOwnHighlight(parent)) {
            return false;
          }
          if (parent.closest && parent.closest(".bias-popup, [data-e-prime-popup]")) {
            return false;
          }
          return this.domProcessor.isSignificantContent(mutation.target);
        }
        if (mutation.target.classList) {
          if (mutation.target.classList.contains("bias-popup") || mutation.target.classList.contains("popup-content") || mutation.target.classList.contains("popup-close")) {
            return false;
          }
        }
        if (mutation.target.closest && mutation.target.closest(".bias-popup")) {
          return false;
        }
        return mutation.addedNodes.length > 0 && Array.from(mutation.addedNodes).some((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            if (node.classList && (node.classList.contains("bias-popup") || node.classList.contains("popup-content") || node.classList.contains("popup-close"))) {
              return false;
            }
            if (node.closest && node.closest(".bias-popup")) {
              return false;
            }
          }
          return this.domProcessor.isSignificantContent(node);
        });
      });
    }
    async handleContentChange(mutations) {
      BiasConfig.debugLog("Content changed, processing updates...");
      const changedNodes = this.domProcessor.extractChangedTextNodes(mutations);
      if (changedNodes.length > 0) {
        const hadObserver = !!this.observer;
        this.disconnectObserver();
        try {
          await this.processBatch(changedNodes);
        } finally {
          if (hadObserver) {
            this.setupMutationObserver();
          }
        }
      }
    }
    disconnectObserver() {
      if (this.observer) {
        this.observer.disconnect();
        this.observer = null;
      }
    }
    // Public API methods
    getStats() {
      return { ...this.stats };
    }
    async forceAnalyze() {
      return await this.analyzeDocument();
    }
    clearHighlights() {
      this.disconnectObserver();
      this.domProcessor.removeAllHighlights();
      this.resetStats();
    }
    // Debug methods
    getPerformanceMetrics() {
      return this.performanceMonitor.getMetrics();
    }
    getPatternStats() {
      return this.patterns.getPatternStats();
    }
    getCustomDictionaryManager() {
      return this.customDictionary;
    }
    // Cleanup
    destroy() {
      this.disconnectObserver();
      this.domProcessor.removeAllHighlights();
      this.performanceMonitor.cleanup();
    }
  };

  // src/content/content-script.js
  (function() {
    "use strict";
    let biasDetector = null;
    let isInitialized = false;
    let lastSettings = BiasConfig.getDefaultSettings();
    let manuallyActivated = false;
    function currentHostname() {
      try {
        return (location.hostname || "").toLowerCase();
      } catch (e) {
        return "";
      }
    }
    function isSiteDisabled(settings) {
      return (settings.disabledSites || []).includes(currentHostname());
    }
    function siteAllowed(settings) {
      return Boolean(settings.enableAnalysis) && !isSiteDisabled(settings);
    }
    function effectiveEnable(settings) {
      if (!siteAllowed(settings))
        return false;
      return settings.siteMode !== "ondemand" || manuallyActivated;
    }
    function handleIgnoreWord(word) {
      const term = String(word || "").trim().toLowerCase().replace(/\s+/g, " ");
      if (!term || !biasDetector)
        return;
      const list = Array.isArray(lastSettings.ignoredWords) ? lastSettings.ignoredWords.slice() : [];
      if (list.includes(term))
        return;
      list.push(term);
      lastSettings = { ...lastSettings, ignoredWords: list };
      try {
        chrome.storage.sync.set({ ignoredWords: list });
      } catch (e) {
        console.warn("Could not persist ignored word:", e && e.message);
      }
      const detectorSettings = { ...lastSettings, enableAnalysis: effectiveEnable(lastSettings) };
      biasDetector.updateSettings(detectorSettings);
    }
    function initialize() {
      if (isInitialized)
        return;
      try {
        biasDetector = new BiasDetector();
        const popupManager = getPopupManager();
        popupManager.onIgnoreWord = handleIgnoreWord;
        popupManager.onRemoveHighlight = (el) => biasDetector.domProcessor.removeSingleHighlight(el);
        setupMessageListeners();
        loadSettingsAndStart();
        isInitialized = true;
        BiasConfig.debugLog("E-Prime Bias Detector initialized successfully");
      } catch (error) {
        console.error("Failed to initialize Bias Detector:", error);
      }
    }
    function loadSettingsAndStart() {
      const defaultSettings = BiasConfig.getDefaultSettings();
      function applySettingsAndStart(items) {
        const validatedSettings = BiasConfig.validateSettings(items);
        lastSettings = validatedSettings;
        const detectorSettings = { ...validatedSettings, enableAnalysis: effectiveEnable(validatedSettings) };
        biasDetector.updateSettings(detectorSettings).then(() => {
          if (detectorSettings.enableAnalysis) {
            setTimeout(() => {
              biasDetector.analyzeDocument();
              biasDetector.setupMutationObserver();
            }, 500);
          }
        }).catch((error) => {
          console.error("Error updating settings:", error);
          startWithDefaults();
        });
      }
      function startWithDefaults() {
        BiasConfig.debugLog("Starting with default settings");
        setTimeout(() => {
          biasDetector.analyzeDocument();
          biasDetector.setupMutationObserver();
        }, 500);
      }
      try {
        if (typeof browser !== "undefined" && browser.storage && browser.storage.sync) {
          browser.storage.sync.get(defaultSettings).then(applySettingsAndStart).catch((error) => {
            console.warn("Storage get failed (promise):", error);
            startWithDefaults();
          });
        } else {
          chrome.storage.sync.get(defaultSettings, (items) => {
            if (chrome.runtime.lastError) {
              console.warn("Storage get failed:", chrome.runtime.lastError);
              startWithDefaults();
              return;
            }
            applySettingsAndStart(items);
          });
        }
      } catch (error) {
        console.warn("Storage API error:", error);
        startWithDefaults();
      }
    }
    function setupMessageListeners() {
      chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        handleMessage(request, sender, sendResponse);
        return true;
      });
    }
    async function handleMessage(request, sender, sendResponse) {
      if (!biasDetector) {
        sendResponse({ success: false, error: "Detector not initialized" });
        return;
      }
      try {
        switch (request.action) {
          case "updateSettings":
            await handleUpdateSettings(request, sendResponse);
            break;
          case "getStats":
            handleGetStats(sendResponse);
            break;
          case "forceAnalyze":
            await handleForceAnalyze(sendResponse);
            break;
          case "clearHighlights":
            handleClearHighlights(sendResponse);
            break;
          case "getPerformanceMetrics":
            handleGetPerformanceMetrics(sendResponse);
            break;
          case "getPatternStats":
            handleGetPatternStats(sendResponse);
            break;
          case "reloadCustomDictionaries":
            await handleReloadCustomDictionaries(sendResponse);
            break;
          case "getSiteStatus":
            sendResponse({
              success: true,
              hostname: currentHostname(),
              siteDisabled: isSiteDisabled(lastSettings),
              siteMode: lastSettings.siteMode || "auto"
            });
            break;
          default:
            sendResponse({ success: false, error: "Unknown action" });
        }
      } catch (error) {
        console.error("Error handling message:", error);
        sendResponse({ success: false, error: error.message });
      }
    }
    async function handleUpdateSettings(request, sendResponse) {
      if (BiasConfig.DEBUG)
        console.log("Content script received new settings:", request.settings);
      const validatedSettings = BiasConfig.validateSettings(request.settings);
      lastSettings = validatedSettings;
      if (!siteAllowed(validatedSettings)) {
        manuallyActivated = false;
      }
      const detectorSettings = { ...validatedSettings, enableAnalysis: effectiveEnable(validatedSettings) };
      await biasDetector.updateSettings(detectorSettings);
      const stats = biasDetector.getStats();
      sendResponse({
        success: true,
        stats,
        message: "Settings updated successfully"
      });
    }
    function handleGetStats(sendResponse) {
      const stats = biasDetector.getStats();
      if (BiasConfig.DEBUG)
        console.log("Sending stats:", stats);
      sendResponse(stats);
    }
    async function handleForceAnalyze(sendResponse) {
      BiasConfig.debugLog("Force analyze requested - enabling analysis");
      if (isSiteDisabled(lastSettings)) {
        sendResponse({
          success: false,
          siteDisabled: true,
          error: "Analysis is turned off for this site"
        });
        return;
      }
      manuallyActivated = true;
      try {
        biasDetector.disconnectObserver();
        biasDetector.clearHighlights();
        biasDetector.settings.enableAnalysis = true;
        chrome.storage.sync.set({ enableAnalysis: true });
        await new Promise((resolve) => setTimeout(resolve, 50));
        const stats = await biasDetector.forceAnalyze();
        biasDetector.setupMutationObserver();
        sendResponse({
          success: true,
          stats,
          analysisEnabled: true,
          message: "Analysis completed successfully"
        });
      } catch (error) {
        console.error("Force analyze failed:", error);
        try {
          biasDetector.setupMutationObserver();
        } catch (e) {
        }
        sendResponse({
          success: false,
          error: error.message
        });
      }
    }
    function handleClearHighlights(sendResponse) {
      BiasConfig.debugLog("Clear highlights requested - disabling analysis");
      manuallyActivated = false;
      biasDetector.disconnectObserver();
      biasDetector.clearHighlights();
      biasDetector.settings.enableAnalysis = false;
      chrome.storage.sync.set({ enableAnalysis: false });
      const stats = biasDetector.getStats();
      sendResponse({
        success: true,
        stats,
        analysisEnabled: false,
        message: "Highlights cleared and analysis disabled"
      });
    }
    function handleGetPerformanceMetrics(sendResponse) {
      const metrics = biasDetector.getPerformanceMetrics();
      sendResponse({ success: true, metrics });
    }
    async function handleReloadCustomDictionaries(sendResponse) {
      try {
        const manager = biasDetector.getCustomDictionaryManager();
        await manager.load();
        biasDetector._injectCustomCSS();
        await biasDetector.forceAnalyze();
        const stats = biasDetector.getStats();
        sendResponse({ success: true, stats });
      } catch (error) {
        console.error("Failed to reload custom dictionaries:", error);
        sendResponse({ success: false, error: (error == null ? void 0 : error.message) ?? String(error) });
      }
    }
    function handleGetPatternStats(sendResponse) {
      const stats = biasDetector.getPatternStats();
      sendResponse({ success: true, stats });
    }
    function handleUnload() {
      if (biasDetector) {
        biasDetector.destroy();
        biasDetector = null;
        isInitialized = false;
      }
    }
    const MAX_REINIT_ATTEMPTS = 3;
    let reinitAttempts = 0;
    function handleError(error) {
      console.error("E-Prime Bias Detector error:", error);
      if (reinitAttempts >= MAX_REINIT_ATTEMPTS) {
        console.error("E-Prime Bias Detector: giving up after repeated failures");
        return;
      }
      reinitAttempts++;
      if (biasDetector) {
        try {
          biasDetector.destroy();
        } catch (e) {
          console.error("Error during cleanup:", e);
        }
      }
      biasDetector = null;
      isInitialized = false;
      setTimeout(() => {
        BiasConfig.debugLog("Attempting to reinitialize Bias Detector...");
        initialize();
      }, 1e3);
    }
    const extensionOrigin = (() => {
      try {
        return chrome.runtime.getURL("");
      } catch (e) {
        return null;
      }
    })();
    function isOwnError(sourceOrStack) {
      return Boolean(
        extensionOrigin && typeof sourceOrStack === "string" && sourceOrStack.includes(extensionOrigin)
      );
    }
    window.addEventListener("error", (event) => {
      const stack = event.error && event.error.stack;
      if (!isOwnError(event.filename) && !isOwnError(stack))
        return;
      handleError(event.error || event.message);
    });
    window.addEventListener("unhandledrejection", (event) => {
      const stack = event.reason && event.reason.stack;
      if (!isOwnError(stack))
        return;
      handleError(event.reason);
    });
    window.addEventListener("beforeunload", handleUnload);
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", initialize);
    } else {
      initialize();
    }
    setTimeout(initialize, 100);
    if (window.location.hostname === "localhost" || window.location.hostname.includes("test")) {
      window.ePrimeDebug = {
        getDetector: () => biasDetector,
        getStats: () => biasDetector ? biasDetector.getStats() : null,
        getMetrics: () => biasDetector ? biasDetector.getPerformanceMetrics() : null,
        reinitialize: () => {
          handleUnload();
          setTimeout(initialize, 100);
        }
      };
    }
  })();
})();
//# sourceMappingURL=content.js.map

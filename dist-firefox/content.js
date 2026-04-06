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
        tooltip: "Language that makes readers accept premises without realizing it",
        basicTip: "Language that makes readers accept premises without realizing it",
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
        tooltip: "Words that dismiss or trivialize legitimate concerns",
        basicTip: "Words that dismiss or trivialize legitimate concerns",
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
        tooltip: "Hyperbolic language that creates false urgency",
        basicTip: "Hyperbolic language that creates false urgency",
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
      }
    };
    static getDefaultSettings() {
      const settings = {
        enableAnalysis: true,
        analysisMode: "balanced"
        // 'problems', 'excellence', or 'balanced'
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
      for (const [key, value] of Object.entries(settings)) {
        if (key === "enableAnalysis" || key === "analysisMode") {
          validated[key] = key === "analysisMode" ? value : Boolean(value);
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
      words: [
        "clearly",
        "obviously",
        "undoubtedly",
        "certainly",
        "definitely",
        "absolutely",
        "surely",
        "undeniably",
        "unquestionably",
        "indisputably",
        "indubitably",
        "unmistakably",
        "incontrovertibly",
        "incontestably",
        "irrefutably",
        "manifestly",
        "patently"
      ]
    },
    hedging: {
      icon: "\u2753",
      color: "#ffa726",
      name: "Hedging/Uncertainty",
      description: "Words that create unnecessary doubt or vagueness, often to avoid taking responsibility for claims.",
      implication: "Undermines confidence and can signal the writer is unsure of their position or trying to avoid accountability.",
      suggestion: "Be more definitive when you have evidence, or explain the specific reasons for uncertainty.",
      examples: 'Instead of "maybe true" \u2192 "requires further investigation" or "preliminary evidence suggests"',
      words: [
        "probably",
        "maybe",
        "perhaps",
        "conceivably",
        "speculated",
        "rumored"
      ]
    },
    evaluative_positive: {
      icon: "\u{1F44D}",
      color: "#66bb6a",
      name: "Positive Evaluation",
      description: "Subjective positive judgments that reveal the writer's approval without objective criteria.",
      implication: "Biases readers toward positive evaluation without providing evidence or reasoning for the judgment.",
      suggestion: "Replace with specific, measurable criteria or acknowledge the subjective nature of the evaluation.",
      examples: 'Instead of "excellent performance" \u2192 "achieved 95% accuracy" or "I consider this performance strong because..."',
      words: [
        "good",
        "great",
        "excellent",
        "exceptional",
        "outstanding",
        "perfect",
        "flawless",
        "admirable",
        "commendable",
        "praiseworthy",
        "exemplary",
        "stellar",
        "superior",
        "first-rate",
        "top-notch",
        "premium",
        "favorable",
        "positive",
        "satisfactory",
        "pleasing",
        "gratifying",
        "beneficial",
        "advantageous",
        "desirable",
        "worthy"
      ]
    },
    evaluative_negative: {
      icon: "\u{1F44E}",
      color: "#ef5350",
      name: "Negative Evaluation",
      description: "Subjective negative judgments that reveal the writer's disapproval without objective criteria.",
      implication: "Biases readers toward negative evaluation without providing evidence or reasoning for the judgment.",
      suggestion: "Replace with specific, measurable criteria or acknowledge the subjective nature of the evaluation.",
      examples: 'Instead of "poor quality" \u2192 "failed to meet safety standards" or "I find this concerning because..."',
      words: [
        "abysmal",
        "poor",
        "inadequate",
        "inferior",
        "substandard",
        "mediocre",
        "disappointing",
        "unsatisfactory",
        "unacceptable",
        "deficient",
        "faulty",
        "flawed",
        "shoddy",
        "deplorable",
        "lamentable",
        "pathetic",
        "pitiful",
        "regrettable",
        "miserable",
        "wretched",
        "dismal",
        "grim",
        "bleak",
        "dire",
        "grave",
        "severe",
        "unfortunate",
        "unfavorable",
        "disagreeable",
        "unpleasant",
        "distressing",
        "troublesome",
        "problematic",
        "objectionable",
        "reprehensible",
        "repugnant",
        "detestable",
        "bad"
      ]
    },
    emotional_charge: {
      icon: "\u26A1",
      color: "#ab47bc",
      name: "Emotional Charge",
      description: "Words designed to trigger strong emotional responses that bypass logical evaluation.",
      implication: "Manipulates readers through emotion rather than reason, potentially clouding judgment.",
      suggestion: "Use neutral language that allows readers to form their own emotional responses based on facts.",
      examples: 'Instead of "heartwarming story" \u2192 "story about community support" or "horrifying event" \u2192 "traumatic incident"',
      words: [
        "heartwarming",
        "touching",
        "moving",
        "soothing",
        "comforting",
        "reassuring",
        "uplifting",
        "exhilarating",
        "thrilling",
        "exciting",
        "sensational",
        "delightful",
        "disgusting",
        "revolting",
        "sickening",
        "nauseating",
        "offensive",
        "frightening",
        "terrifying",
        "horrifying",
        "alarming",
        "worrying",
        "concerning",
        "threatening"
      ]
    },
    comparative: {
      icon: "\u{1F4CA}",
      color: "#42a5f5",
      name: "Comparative/Superlative",
      description: "Words that create artificial rankings or comparisons without context or criteria.",
      implication: "Establishes hierarchies without justification, potentially misleading readers about relative importance or quality.",
      suggestion: "Provide specific criteria for comparison or use measured language that acknowledges context.",
      examples: 'Instead of "the best solution" \u2192 "an effective solution" or "the most efficient approach we tested"',
      words: [
        "best",
        "worst",
        "better",
        "worse",
        "superior",
        "inferior",
        "greater",
        "lesser",
        "bigger",
        "smaller",
        "higher",
        "lower",
        "finer",
        "poorer",
        "strongest",
        "weakest",
        "finest",
        "prettiest",
        "ugliest",
        "smartest",
        "dumbest",
        "brightest",
        "darkest"
      ]
    },
    political_framing: {
      icon: "\u{1F3DB}\uFE0F",
      color: "#8d6e63",
      name: "Political Framing",
      description: "Words that frame issues in political terms, potentially polarizing neutral topics.",
      implication: "Activates political identity and tribal thinking, making objective evaluation more difficult.",
      suggestion: "Use neutral, descriptive language that focuses on specific policies or actions rather than political labels.",
      examples: 'Instead of "radical proposal" \u2192 "proposal that differs significantly from current policy" or describe specific elements',
      words: [
        "controversial",
        "disputed",
        "radical",
        "extreme",
        "progressive",
        "conservative",
        "liberal",
        "far-right",
        "far-left",
        "moderate",
        "centrist",
        "mainstream",
        "fringe",
        "revolutionary",
        "traditional",
        "conventional",
        "unconventional",
        "orthodox",
        "unorthodox",
        "establishment",
        "anti-establishment",
        "populist",
        "elitist",
        "partisan",
        "bipartisan",
        "divisive",
        "polarizing",
        "contentious",
        "provocative"
      ]
    },
    intensifiers: {
      icon: "\u{1F525}",
      color: "#ff7043",
      name: "Intensifiers",
      description: "Words that amplify or exaggerate without adding meaningful information.",
      implication: "Creates artificial emphasis that can distort the actual significance of events or characteristics.",
      suggestion: "Use specific, measurable descriptions or remove unnecessary intensification.",
      examples: 'Instead of "extremely important" \u2192 "critical for project success" or "increased by 300%"',
      words: [
        "very",
        "extremely",
        "incredibly",
        "exceptionally",
        "extraordinarily",
        "remarkably",
        "notably",
        "particularly",
        "especially",
        "surprisingly",
        "unusually",
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
        "enormously",
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
        "intensely",
        "seriously",
        "substantially",
        "significantly",
        "considerably"
      ]
    },
    credibility_undermining: {
      icon: "\u{1F5E3}\uFE0F",
      color: "#78909c",
      name: "Credibility Undermining",
      description: "Words that question or attack credibility without providing evidence or reasoning.",
      implication: "Weakens trust in sources through insinuation rather than substantive critique.",
      suggestion: "Address specific claims with evidence rather than attacking the source's credibility.",
      examples: 'Instead of "so-called expert" \u2192 "Dr. Smith, whose methodology differs from mainstream approaches" or address specific claims',
      words: [
        "claims",
        "purports",
        "asserts",
        "alleges",
        "contends",
        "maintains",
        "insists",
        "so-called",
        "self-proclaimed",
        "supposed",
        "pretend",
        "dubious",
        "questionable",
        "unproven",
        "unverified",
        "unsubstantiated",
        "unfounded",
        "baseless",
        "groundless"
      ]
    },
    loaded_political: {
      icon: "\u2696\uFE0F",
      color: "#5d4037",
      name: "Loaded Political Terms",
      description: "Words that carry heavy political or ideological baggage, triggering partisan responses.",
      implication: "Activates political identity and bias, making neutral evaluation difficult.",
      suggestion: "Use specific, descriptive language that focuses on actions or policies rather than loaded terms.",
      examples: 'Instead of "socialist policies" \u2192 "government-funded programs" or "authoritarian regime" \u2192 "government that restricts civil liberties"',
      words: [
        "freedom",
        "justice",
        "equality",
        "rights",
        "liberty",
        "democracy",
        "patriotic",
        "unpatriotic",
        "un-American",
        "socialist",
        "communist",
        "fascist",
        "dictatorial",
        "totalitarian",
        "authoritarian",
        "corrupt",
        "crooked",
        "dishonest",
        "shady",
        "illegal",
        "unlawful",
        "criminal",
        "scandal",
        "conspiracy",
        "regime",
        "propaganda"
      ]
    },
    moral_judgments: {
      icon: "\u2696\uFE0F",
      color: "#7e57c2",
      name: "Moral/Ethical Judgments",
      description: "Words that impose moral frameworks without acknowledging their subjective nature.",
      implication: "Presents moral judgments as universal truths rather than perspective-dependent evaluations.",
      suggestion: "Acknowledge the subjective nature of moral judgments or specify the ethical framework being used.",
      examples: 'Instead of "immoral behavior" \u2192 "behavior that violates principle X" or "I consider this unethical because..."',
      words: [
        "moral",
        "immoral",
        "ethical",
        "unethical",
        "virtuous",
        "corrupt",
        "just",
        "unjust",
        "fair",
        "unfair",
        "honorable",
        "dishonorable",
        "honest",
        "dishonest",
        "decent",
        "indecent",
        "appropriate",
        "inappropriate",
        "acceptable",
        "unacceptable",
        "legitimate",
        "illegitimate",
        "reasonable",
        "unreasonable"
      ]
    },
    emotional_appeals: {
      icon: "\u{1F4AD}",
      color: "#26a69a",
      name: "Emotional Appeals",
      description: "Words that bypass logical evaluation by directly targeting emotional responses.",
      implication: "Manipulates emotional state to influence opinion without providing rational justification.",
      suggestion: "Focus on factual information that allows readers to form their own emotional responses.",
      examples: 'Instead of "promising developments" \u2192 "developments that may lead to improved outcomes" or provide specific evidence',
      words: [
        "promising",
        "depressing",
        "gloomy",
        "optimistic",
        "pessimistic",
        "anxious",
        "fearful",
        "afraid",
        "confident",
        "proud",
        "ashamed",
        "embarrassed",
        "guilty"
      ]
    }
  };
  var opinionWordsFlat = Object.values(opinionWords).flatMap((category) => category.words);

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
  var absoluteWords = [
    // Universal Quantifiers
    "all",
    "every",
    "each",
    "any",
    "no",
    "none",
    // People Universals
    "everyone",
    "everybody",
    "no one",
    "nobody",
    "anyone",
    "anybody",
    "someone",
    "somebody",
    // Time Universals
    "always",
    "never",
    "forever",
    "eternal",
    "constantly",
    "perpetually",
    "continually",
    "endlessly",
    "ceaselessly",
    "permanently",
    "invariably",
    // Categorical Statements
    "ultimately",
    "fundamentally",
    "purely",
    "outright",
    "comprehensively",
    "universally",
    // Thing Universals
    "everything",
    "nothing",
    "anything",
    "something",
    // Absolute Adjectives
    "perfect",
    "complete",
    "total",
    "absolute",
    "entire",
    "full",
    "whole",
    "ultimate",
    "maximum",
    "minimum",
    "supreme",
    "extreme",
    "utmost",
    "final",
    "infallible",
    "unerring",
    "universal",
    "impossible",
    "inevitable",
    "inescapable",
    "undeniable",
    "irrefutable",
    "identical",
    "pure",
    "sheer",
    "mere",
    // Absolute Certainty
    "undoubtedly",
    "unquestionably",
    "indisputably",
    "irrefutably",
    "incontrovertibly",
    "incontestably",
    "unequivocally"
  ];

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
      words: [
        "many people say",
        "some say",
        "they say",
        "people think",
        "some argue",
        "critics claim",
        "supporters maintain",
        "observers note",
        "sources indicate",
        "unnamed sources",
        "according to reports",
        "insiders claim",
        "some experts say",
        "authorities believe",
        "well-placed sources",
        "those familiar with the matter",
        "people close to the situation",
        "those in the know"
      ]
    },
    hedged_evidence: {
      icon: "\u{1F4CB}",
      color: "#00838f",
      name: "Hedged Evidence",
      description: "References to evidence, research, or data without providing specific citations or details.",
      implication: "Creates an appearance of evidence-based reasoning while avoiding any verifiable claim.",
      suggestion: "Ask: WHICH study? Published WHERE? By WHOM? Provide the actual citation.",
      examples: 'Instead of "research suggests" \u2192 "a 2024 study by Smith et al. in Nature found..."',
      words: [
        "research suggests",
        "evidence suggests",
        "data indicates",
        "experts believe",
        "it is believed",
        "it is thought",
        "it is said",
        "may indicate",
        "could suggest",
        "might imply",
        "studies have shown",
        "science tells us",
        "the data shows",
        "findings indicate",
        "analysis reveals",
        "polls suggest"
      ]
    },
    vague_quantifiers: {
      icon: "\u{1F4CA}",
      color: "#7b1fa2",
      name: "Vague Quantifiers",
      description: "Imprecise frequency or quantity words that avoid committing to specific numbers or rates.",
      implication: "Obscures actual rates and magnitudes, allowing the reader to imagine whatever quantity supports the argument.",
      suggestion: "Ask: HOW MANY exactly? Replace with specific numbers, percentages, or ranges.",
      examples: 'Instead of "in many cases" \u2192 "in 73% of cases" or "in 8 out of 12 trials"',
      words: [
        "in some cases",
        "in many cases",
        "frequently",
        "typically",
        "tends to",
        "in most cases",
        "on occasion",
        "from time to time",
        "more often than not",
        "time and again",
        "as often as not",
        "in certain situations",
        "under some circumstances"
      ]
    },
    appeal_to_authority: {
      icon: "\u{1F393}",
      color: "#1565c0",
      name: "Appeal to Authority",
      description: "Invocations of unnamed experts or consensus to lend credibility without verifiable backing.",
      implication: "Borrows authority from unnamed or unqualified sources rather than presenting evidence directly.",
      suggestion: "Ask: Which SPECIFIC experts? In what FIELD? Is this their area of expertise?",
      examples: 'Instead of "experts believe" \u2192 "Dr. Chen, a climate scientist at MIT, found..."',
      words: [
        "widely known",
        "widely believed",
        "generally accepted",
        "commonly believed",
        "often said",
        "the consensus is",
        "it is well established",
        "leading experts agree",
        "top scientists confirm",
        "the scientific community agrees",
        "scholars maintain",
        "mainstream opinion holds"
      ]
    },
    passive_attribution: {
      icon: "\u{1F32B}\uFE0F",
      color: "#546e7a",
      name: "Passive Attribution",
      description: "Qualifying words that distance the writer from claims, adding plausible deniability.",
      implication: "Lets the writer advance claims while retaining the ability to disown them if challenged.",
      suggestion: "Notice the writer is not committing to the claim \u2014 ask what they actually believe and why.",
      examples: 'Instead of "reportedly" \u2192 state the claim directly and cite the source, or acknowledge uncertainty explicitly',
      words: [
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
        "one might say",
        "it has been suggested",
        "there are those who say",
        "some would argue",
        "it could be said"
      ]
    }
  };
  var weaselPhrasesFlat = Object.values(weaselWords).flatMap((category) => category.words);
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
      words: [
        "dangerous precedent",
        "slippery slope",
        "existential threat",
        "grave danger",
        "serious threat",
        "dire consequences",
        "catastrophic results",
        "devastating impact",
        "irreversible damage",
        "point of no return",
        "ticking time bomb",
        "imminent danger",
        "clear and present danger",
        "looming crisis",
        "impending doom",
        "mortal threat",
        "doomsday scenario",
        "nightmare scenario",
        "worst case scenario",
        "on the brink",
        "spiraling out of control"
      ]
    },
    guilt_induction: {
      icon: "\u{1F614}",
      color: "#6a1b9a",
      name: "Guilt Induction",
      description: "Language designed to trigger guilt and moral responsibility, pressuring agreement through shame.",
      implication: "Bypasses rational evaluation by making disagreement feel morally wrong, regardless of the actual merits.",
      suggestion: "Evaluate whether the responsibility claim is supported by evidence, separate from the emotional pressure.",
      examples: 'Instead of "blood on your hands" \u2192 "shares responsibility for the outcome" with specific evidence',
      words: [
        "shame on",
        "how dare",
        "blood on your hands",
        "morally responsible",
        "complicit in",
        "turning a blind eye",
        "failed to act",
        "stood by while",
        "allowed to happen",
        "could have prevented",
        "chose to ignore",
        "willfully neglected",
        "betrayed the trust",
        "let down",
        "abandoned their duty",
        "on your conscience",
        "history will judge",
        "answerable for",
        "dereliction of duty",
        "looked the other way",
        "washed their hands of"
      ]
    },
    flattery_manipulation: {
      icon: "\u{1F3AD}",
      color: "#f57f17",
      name: "Flattery Manipulation",
      description: "Compliments and in-group identity appeals designed to bias the reader toward agreement.",
      implication: "Creates social pressure to agree by implying that disagreement means you lack intelligence, virtue, or sophistication.",
      suggestion: "Recognize the appeal to identity and evaluate the argument on its own merits.",
      examples: 'Instead of "smart people like you understand" \u2192 present the argument and let readers evaluate it independently',
      words: [
        "smart people like you",
        "educated readers understand",
        "discerning individuals",
        "those who truly care",
        "people of conscience",
        "thoughtful citizens",
        "intelligent observers",
        "wise enough to see",
        "sophisticated thinkers",
        "enlightened minds",
        "those with common sense",
        "reasonable people agree",
        "anyone with half a brain",
        "thinking people know",
        "informed citizens realize",
        "astute observers recognize",
        "those who pay attention",
        "right-thinking people"
      ]
    },
    outrage_fuel: {
      icon: "\u{1F92C}",
      color: "#d84315",
      name: "Outrage Fuel",
      description: "Language designed to trigger moral outrage, bypassing careful analysis with indignation.",
      implication: "Replaces factual evaluation with emotional reaction, making readers more likely to share and amplify without verification.",
      suggestion: "Look past the outrage language to identify the actual facts and evaluate them independently.",
      examples: 'Instead of "shocking revelation" \u2192 "new information shows..." with specific details',
      words: [
        "shocking revelation",
        "unbelievable scandal",
        "absolute outrage",
        "disgusting display",
        "appalling behavior",
        "unconscionable act",
        "beyond the pale",
        "crosses the line",
        "new low",
        "height of hypocrisy",
        "blatant corruption",
        "flagrant violation",
        "egregious abuse",
        "stunning betrayal",
        "jaw-dropping",
        "slap in the face",
        "travesty of justice",
        "moral bankruptcy",
        "utter contempt",
        "brazen disregard",
        "shameless exploitation"
      ]
    },
    sympathy_exploitation: {
      icon: "\u{1F494}",
      color: "#1565c0",
      name: "Sympathy Exploitation",
      description: "Uses vulnerable populations to weaponize compassion and bypass rational evaluation of arguments.",
      implication: "Makes disagreement feel heartless, even when the emotional appeal has no logical connection to the argument being made.",
      suggestion: "Ask how the emotional appeal specifically connects to the policy or argument being advanced.",
      examples: 'Instead of "think of the children" \u2192 describe specific impacts on children with evidence',
      words: [
        "think of the children",
        "vulnerable victims",
        "innocent lives",
        "helpless elderly",
        "suffering families",
        "heartbroken parents",
        "orphaned children",
        "widows and orphans",
        "defenseless animals",
        "voiceless victims",
        "forgotten souls",
        "human tragedy",
        "real people suffering",
        "faces behind the statistics",
        "their blood cries out",
        "who will speak for them",
        "left to fend for themselves",
        "prey upon the weak",
        "the most vulnerable among us",
        "those who cannot help themselves"
      ]
    },
    false_urgency: {
      icon: "\u23F0",
      color: "#ef6c00",
      name: "False Urgency",
      description: "Creates artificial time pressure to prevent careful deliberation and force hasty decisions.",
      implication: "Prevents thoughtful evaluation by implying that delay equals failure, even when no real deadline exists.",
      suggestion: "Ask what evidence exists for the claimed deadline and whether careful consideration would actually cause harm.",
      examples: `Instead of "act now before it's too late" \u2192 "this decision would benefit from timely attention because..."`,
      words: [
        "act now",
        "before it's too late",
        "time is running out",
        "last chance",
        "final opportunity",
        "narrow window",
        "critical moment",
        "now or never",
        "decisive moment",
        "crucial juncture",
        "make or break",
        "do or die",
        "the clock is ticking",
        "every second counts",
        "running out of time",
        "at the eleventh hour",
        "no time to waste",
        "urgent action needed"
      ]
    }
  };
  var emotionalTriggersFlat = Object.values(emotionalTriggerWords).flatMap((category) => category.words);
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
      words: [
        "that never happened",
        "you're imagining things",
        "that's not true",
        "you're making it up",
        "completely fabricated",
        "pure fiction",
        "didn't happen that way",
        "false memory",
        "revisionist history",
        "twisting the facts",
        "distorting reality",
        "alternative facts",
        "total fabrication",
        "that's a lie",
        "never said that",
        "you're inventing things",
        "fantasy",
        "fiction not fact"
      ]
    },
    emotional_invalidation: {
      icon: "\u{1F4A2}",
      color: "#6a1b9a",
      name: "Emotional Invalidation",
      description: "Dismissing emotional responses as irrational or disproportionate to undermine confidence in one's own feelings.",
      implication: "Teaches the target to distrust their own emotional responses, making them more dependent on the gaslighter's framing.",
      suggestion: "Your emotional responses are valid data. Evaluate the situation independently of how others characterize your reaction.",
      examples: `Instead of "you're overreacting" \u2192 "I see this differently \u2014 can we discuss our perspectives?"`,
      words: [
        "you're overreacting",
        "making a big deal",
        "blowing it out of proportion",
        "being dramatic",
        "overly sensitive",
        "too emotional",
        "getting worked up over nothing",
        "making mountains out of molehills",
        "need to calm down",
        "being hysterical",
        "irrational response",
        "taking it too seriously",
        "reading too much into it",
        "stop being so sensitive",
        "you're too thin-skinned",
        "learn to take a joke",
        "lighten up"
      ]
    },
    memory_manipulation: {
      icon: "\u{1F9E0}",
      color: "#00838f",
      name: "Memory Manipulation",
      description: "Undermining confidence in one's own memory to replace recollections with a preferred narrative.",
      implication: "Erodes trust in episodic memory, making the target increasingly reliant on the manipulator's version of events.",
      suggestion: "Keep written records. Check notes, emails, or texts. Verify with other witnesses when possible.",
      examples: `Instead of "you're misremembering" \u2192 "my recollection differs \u2014 let's look at the meeting notes"`,
      words: [
        "you're misremembering",
        "that's not what was said",
        "you're confused",
        "mixing things up",
        "got it backwards",
        "faulty recollection",
        "selective memory",
        "conveniently forgetting",
        "memory is playing tricks",
        "not how I remember it",
        "you must be mistaken",
        "false impression",
        "your memory is unreliable",
        "you always get this wrong",
        "that's not what happened at all",
        "you're rewriting history"
      ]
    },
    credibility_attack: {
      icon: "\u{1F3AF}",
      color: "#e65100",
      name: "Credibility Attack",
      description: "Attacking the person's mental fitness, judgment, or competence rather than addressing their actual argument.",
      implication: "Ad hominem disguised as concern \u2014 undermines self-confidence to make the target doubt their own perceptions and judgment.",
      suggestion: "Evaluate the ARGUMENT being made, not the personal attack. Competence attacks do not address the substance of a claim.",
      examples: `Instead of "you're being paranoid" \u2192 "I don't see the same pattern \u2014 here's why..."`,
      words: [
        "you're being paranoid",
        "too sensitive",
        "crazy to think",
        "lost touch with reality",
        "delusional thinking",
        "conspiracy theorist",
        "seeing things that aren't there",
        "jumping to conclusions",
        "wild accusations",
        "baseless claims",
        "unfounded fears",
        "irrational beliefs",
        "unstable behavior",
        "not thinking clearly",
        "you need help",
        "you're losing it",
        "unhinged",
        "out of your mind",
        "not in your right mind"
      ]
    },
    deflection: {
      icon: "\u21A9\uFE0F",
      color: "#546e7a",
      name: "Deflection",
      description: "Redirecting attention away from the actual issue to avoid accountability or addressing the concern.",
      implication: "Prevents resolution by continually shifting focus, leaving the original concern unaddressed while exhausting the target.",
      suggestion: "Ask: has the original concern been addressed? Return focus to the specific issue at hand.",
      examples: 'Instead of "what about when you..." \u2192 "I hear your point about X, and I also want to address Y"',
      words: [
        "the real issue is",
        "what about",
        "more importantly",
        "you're missing the point",
        "that's not the problem",
        "focusing on the wrong thing",
        "beside the point",
        "irrelevant detail",
        "distracting from",
        "changing the subject",
        "let's talk about",
        "but what about when",
        "conveniently ignoring",
        "you're deflecting",
        "nice try changing the topic",
        "stop trying to distract",
        "that's whataboutism"
      ]
    }
  };
  var gaslightingPhrasesFlat = Object.values(gaslightingWords).flatMap((category) => category.words);
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

  // src/dictionaries/index.js
  var BiasPatterns = class {
    constructor() {
      this.rawPatterns = this.loadRawPatterns();
      this.subCategoryDictionaries = this.loadSubCategoryDictionaries();
      this.subCategoryMaps = this.buildSubCategoryMaps();
      this.compiledPatterns = /* @__PURE__ */ new Map();
      this.compileAllPatterns();
    }
    loadRawPatterns() {
      return {
        opinion: opinionWordsFlat,
        // Use flat array for backward compatibility
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
      const dictionaries = /* @__PURE__ */ new Map();
      dictionaries.set("opinion", opinionWords);
      dictionaries.set("euphemism", euphemismWords);
      dictionaries.set("weasel", weaselWords);
      dictionaries.set("maximizer", maximizerWords);
      dictionaries.set("emotional", emotionalTriggerWords);
      dictionaries.set("gaslighting", gaslightingWords);
      return dictionaries;
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
          regexPattern = cleanPattern;
        } else {
          const escaped = this.escapeRegExp(cleanPattern);
          regexPattern = cleanPattern.includes(" ") ? escaped : `\\b${escaped}\\b`;
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
      return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
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
        content += `
                <div class="hover-card-header"${this.getSubCategoryStyle(match)}>
                    ${typeName}
                    <span class="intensity-badge intensity-${intensity}">${intensityLabel}</span>
                </div>
            `;
      }
      content += `<div class="hover-card-text">"${match.text}"</div>`;
      if (isContextual) {
        const confidencePercentage = match.confidence ? Math.round(match.confidence * 100) : "Unknown";
        let contextDisplay = "";
        if (match.context && match.context.trim()) {
          const contextText = match.context.trim();
          const matchedPhrase = match.text;
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
        const tipText = subConfig && subConfig.basicTip || biasConfig && biasConfig.basicTip;
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
        content += `<div class="hover-card-portrayal">Portrayal: ${match.portrayal.valence} (${match.portrayal.type})</div>`;
      }
      if (nearbyMatches.length > 0) {
        content += `<div class="hover-card-context">Nearby: ${nearbyMatches.map((m) => m.type).join(", ")}</div>`;
      }
      content += "</div>";
      return content;
    }
    // Get custom styling for sub-categories
    getSubCategoryStyle(match) {
      return "";
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
        content += `<div class="hover-card-context">Nearby: ${nearbyMatches.map((m) => m.type).join(", ")}</div>`;
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
          probability: "#4169e1"
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
      const parent = target.parentNode;
      const textNode = document.createTextNode(target.textContent);
      parent.replaceChild(textNode, target);
      if (parent && parent.normalize) {
        parent.normalize();
      }
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
      this.popupManager = null;
    }
    // Collect all text nodes from a root element
    collectTextNodes(rootNode) {
      const textNodes = [];
      const walker = document.createTreeWalker(
        rootNode,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode: (node2) => {
            if (this.shouldSkipNode(node2)) {
              return NodeFilter.FILTER_REJECT;
            }
            return NodeFilter.FILTER_ACCEPT;
          }
        }
      );
      let node;
      while (node = walker.nextNode()) {
        textNodes.push(node);
      }
      this.processShadowDom(rootNode, textNodes);
      return textNodes;
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
    // Process Shadow DOM elements
    processShadowDom(rootNode, textNodes) {
      if (rootNode.nodeType !== Node.ELEMENT_NODE)
        return;
      if (rootNode.shadowRoot) {
        const shadowTextNodes = this.collectTextNodes(rootNode.shadowRoot);
        textNodes.push(...shadowTextNodes);
      }
      const elements = rootNode.querySelectorAll("*");
      elements.forEach((element) => {
        if (element.shadowRoot) {
          const shadowTextNodes = this.collectTextNodes(element.shadowRoot);
          textNodes.push(...shadowTextNodes);
        }
      });
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
    getTooltipText(type) {
      const { parentId, subCategoryId } = BiasConfig.resolveType(type);
      if (subCategoryId) {
        const parentConfig = BiasConfig.getBiasTypeConfig(parentId);
        const subConfig = parentConfig && parentConfig.subCategories ? parentConfig.subCategories[subCategoryId] : null;
        if (subConfig) {
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
    // Remove all bias highlights
    removeAllHighlights() {
      const selector = Object.values(this.getHighlightSelectors()).join(", ");
      const highlights = document.querySelectorAll(selector);
      this.processedParents.clear();
      highlights.forEach((highlight) => {
        this.cleanupHoverElements(highlight);
        const parent = highlight.parentNode;
        const textNode = document.createTextNode(highlight.textContent);
        parent.replaceChild(textNode, highlight);
        this.processedParents.add(parent);
      });
      this.processedParents.forEach((parent) => {
        if (parent && parent.normalize) {
          parent.normalize();
        }
      });
      this.processedParents.clear();
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
      }
    }
    // Remove specific excellence type highlights
    removeExcellenceHighlights(type) {
      const selector = `.${this.excellenceClassPrefix}${type}`;
      const highlights = document.querySelectorAll(selector);
      this.processedParents.clear();
      highlights.forEach((highlight) => {
        this.cleanupHoverElements(highlight);
        const parent = highlight.parentNode;
        const textNode = document.createTextNode(highlight.textContent);
        parent.replaceChild(textNode, highlight);
        this.processedParents.add(parent);
      });
      this.processedParents.forEach((parent) => {
        if (parent && parent.normalize) {
          parent.normalize();
        }
      });
      this.processedParents.clear();
    }
    // Remove specific type of highlights
    removeSpecificHighlights(type) {
      const selector = `.${this.highlightClassPrefix}${type}`;
      const highlights = document.querySelectorAll(selector);
      this.processedParents.clear();
      highlights.forEach((highlight) => {
        this.cleanupHoverElements(highlight);
        const parent = highlight.parentNode;
        const textNode = document.createTextNode(highlight.textContent);
        parent.replaceChild(textNode, highlight);
        this.processedParents.add(parent);
      });
      this.processedParents.forEach((parent) => {
        if (parent && parent.normalize) {
          parent.normalize();
        }
      });
      this.processedParents.clear();
    }
    getHighlightSelectors() {
      return {
        // Bias selectors
        opinion: `.${this.highlightClassPrefix}opinion`,
        tobe: `.${this.highlightClassPrefix}tobe`,
        absolute: `.${this.highlightClassPrefix}absolute`,
        passive: `.${this.highlightClassPrefix}passive`,
        weasel: `.${this.highlightClassPrefix}weasel`,
        presupposition: `.${this.highlightClassPrefix}presupposition`,
        metaphor: `.${this.highlightClassPrefix}metaphor`,
        minimizer: `.${this.highlightClassPrefix}minimizer`,
        maximizer: `.${this.highlightClassPrefix}maximizer`,
        falsebalance: `.${this.highlightClassPrefix}falsebalance`,
        euphemism: `.${this.highlightClassPrefix}euphemism`,
        emotional: `.${this.highlightClassPrefix}emotional`,
        gaslighting: `.${this.highlightClassPrefix}gaslighting`,
        falsedilemma: `.${this.highlightClassPrefix}falsedilemma`,
        // Excellence selectors
        attribution: `.${this.excellenceClassPrefix}attribution`,
        nuance: `.${this.excellenceClassPrefix}nuance`,
        transparency: `.${this.excellenceClassPrefix}transparency`,
        discourse: `.${this.excellenceClassPrefix}discourse`,
        evidence: `.${this.excellenceClassPrefix}evidence`
      };
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
        Array.from(mutation.addedNodes).forEach((node) => {
          if (node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 5) {
            changedNodes.push(node);
          } else if (node.nodeType === Node.ELEMENT_NODE) {
            const textNodes = this.collectTextNodes(node);
            changedNodes.push(...textNodes);
          }
        });
      });
      return changedNodes;
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
      console.log(`Performance: ${label} completed in ${duration.toFixed(2)}ms`);
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
          tooltip: "\u2713 Specific, verifiable source provided",
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
          tooltip: "\u2713 Acknowledges complexity and avoids absolutes",
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
          tooltip: "\u2713 Transparent about limitations and perspective",
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
          tooltip: "\u2713 Encourages dialogue and acknowledges others",
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
          tooltip: "\u2713 Claims supported by specific evidence",
          color: "#17a2b8"
        }
      };
      this.intensityLevels = {
        absolute: {
          1: ["mostly", "generally", "typically", "usually", "often", "frequently"],
          2: ["always", "never", "every", "none", "all", "no one", "everyone"],
          3: ["absolutely", "definitely", "certainly", "totally", "completely", "utterly", "entirely"]
        },
        opinion: {
          1: ["seems", "appears", "arguably", "perhaps", "possibly"],
          2: ["obviously", "clearly", "surely", "undoubtedly", "evidently"],
          3: ["undeniably", "unquestionably", "indisputably", "irrefutably", "incontrovertibly"]
        },
        emotional: {
          1: ["concerning", "problematic", "challenging", "difficult", "worrying"],
          2: ["crisis", "disaster", "failure", "catastrophe", "emergency"],
          3: ["evil", "destroy", "murder", "doom", "apocalypse", "blood on your hands"]
        },
        weasel: {
          1: ["some", "many", "few", "several"],
          2: ["people say", "studies show", "experts believe", "sources indicate"],
          3: ["everyone knows", "it's a fact that", "proven", "undisputed"]
        },
        gaslighting: {
          1: ["perhaps you're mistaken", "that's unusual", "are you sure about that"],
          2: ["concerns are overblown", "being dramatic", "reading too much into it"],
          3: ["that never happened", "the public is imagining things", "a fabricated controversy"]
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
    // Calculate intensity level for a match
    calculateIntensity(text, type) {
      const levels = this.intensityLevels[type];
      if (!levels)
        return 2;
      const lowerText = text.toLowerCase();
      for (let level = 3; level >= 1; level--) {
        if (levels[level] && levels[level].some((word) => lowerText.includes(word))) {
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
    // Calculate document health score
    calculateHealthScore(excellenceCount, problemCount) {
      if (excellenceCount + problemCount === 0)
        return 50;
      return Math.round(excellenceCount / (excellenceCount + problemCount) * 100);
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
            text: phrase,
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
    // Choose the best match from conflicting matches
    chooseBestMatch(matches) {
      return matches.reduce((best, current) => {
        if (current.confidence > best.confidence) {
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
        console.warn("CustomDictionaryManager: failed to load", error?.message ?? String(error));
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
        color,
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
        group.color = updates.color;
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
        console.warn(`CustomDictionaryManager: invalid pattern "${clean}"`, error?.message ?? String(error));
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
        css += `
.${group.className} {
    background-color: ${group.color}33;
    border-bottom: 2px solid ${group.color};
    cursor: pointer;
    transition: background-color 0.2s ease;
}
.${group.className}:hover {
    background-color: ${group.color}55;
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
      this.compiledDetectors = this.initializeDetectors();
      this.customDictionary = new CustomDictionaryManager();
      this._customReady = false;
      this._initCustomDictionaries();
    }
    async _initCustomDictionaries() {
      try {
        await this.customDictionary.load();
        this._customReady = true;
        this._injectCustomCSS();
      } catch (error) {
        console.warn("Custom dictionaries failed to load:", error?.message ?? String(error));
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
        detectors.set(config.id, {
          ...config,
          patterns,
          isEnabled: () => this.settings[config.settingKey],
          detect: (text) => this.detectPatterns(text, patterns, config.id)
        });
      }
      return detectors;
    }
    // Generic pattern detection method
    detectPatterns(text, patterns, type) {
      const matches = [];
      const hasSubCategories = BiasConfig.hasSubCategories(type);
      for (const pattern of patterns) {
        try {
          let match;
          pattern.regex.lastIndex = 0;
          while ((match = pattern.regex.exec(text)) !== null) {
            const matchData = {
              index: match.index,
              length: match[0].length,
              text: match[0],
              type,
              pattern: pattern.source
            };
            if (hasSubCategories) {
              const subCategory = this.patterns.getSubCategory(type, match[0]);
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
    // Main analysis method - now more efficient
    async analyzeDocument() {
      if (!this.settings.enableAnalysis) {
        return this.createEmptyStats();
      }
      this.performanceMonitor.start("document-analysis");
      const hadObserver = !!this.observer;
      this.disconnectObserver();
      try {
        this.domProcessor.removeAllHighlights();
        this.resetStats();
        const textNodes = this.domProcessor.collectTextNodes(document.body);
        console.log(`Processing ${textNodes.length} text nodes`);
        const batchSize = BiasConfig.PERFORMANCE.BATCH_SIZE;
        for (let i = 0; i < textNodes.length; i += batchSize) {
          const batch = textNodes.slice(i, i + batchSize);
          await this.processBatch(batch);
          if (i % (batchSize * 4) === 0) {
            await new Promise((resolve) => setTimeout(resolve, 0));
          }
        }
        const duration = this.performanceMonitor.end("document-analysis");
        console.log(`Analysis completed in ${duration.toFixed(2)}ms`);
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
      if (contextualMatches.length > 0) {
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
              intensity: this.excellenceDetector.calculateIntensity(match.text, type),
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
            console.log("[BiasDetector] Added neutral override for:", match.text);
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
        console.log("[BiasDetector] All matches before filtering:", allMatches.map((m) => `"${m.text}" -> ${m.type} (contextual: ${m.isContextual})`));
        const matchesToHighlight = allMatches.filter((match) => match.type !== "neutral");
        console.log("[BiasDetector] Matches to highlight:", matchesToHighlight.length);
        if (matchesToHighlight.length > 0) {
          this.highlightMatches(node, matchesToHighlight);
        }
      }
    }
    // Highlight matches in a text node
    highlightMatches(node, matches) {
      const sortedMatches = this.deduplicateMatches(matches);
      if (sortedMatches.length === 0)
        return;
      const fragment = this.domProcessor.createHighlightedFragment(
        node.textContent,
        sortedMatches
      );
      for (const match of sortedMatches) {
        this.updateStats(match);
      }
      if (node.parentNode) {
        node.parentNode.replaceChild(fragment, node);
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
        return b.length - a.length;
      });
      const neutralOverrides = matches.filter((m) => m.isNeutralOverride);
      console.log("[BiasDetector] Neutral overrides found:", neutralOverrides.length);
      let filteredMatches = matches;
      for (const neutralMatch of neutralOverrides) {
        console.log("[BiasDetector] Processing neutral override for:", neutralMatch.text);
        const beforeCount = filteredMatches.length;
        filteredMatches = filteredMatches.filter((match) => {
          if (match.isContextual || match === neutralMatch)
            return true;
          const matchEnd = match.index + match.length;
          const neutralEnd = neutralMatch.index + neutralMatch.length;
          const hasOverlap = !(matchEnd <= neutralMatch.index || neutralEnd <= match.index);
          if (hasOverlap) {
            console.log("[BiasDetector] Removing overlapping match:", match.text, match.type);
          }
          return !hasOverlap;
        });
        console.log("[BiasDetector] Filtered matches:", beforeCount, "->", filteredMatches.length);
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
            console.warn(`Custom pattern error:`, error?.message ?? String(error));
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
      const excellenceCount = Object.values(BiasConfig.EXCELLENCE_TYPES).reduce((sum, config) => sum + (this.stats[config.statKey] || 0), 0);
      const problemCount = Object.values(BiasConfig.BIAS_TYPES).reduce((sum, config) => sum + (this.stats[config.statKey] || 0), 0);
      this.stats.healthScore = this.excellenceDetector.calculateHealthScore(excellenceCount, problemCount);
    }
    resetStats() {
      this.stats = this.createEmptyStats();
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
      console.log("Content changed, processing updates...");
      const changedNodes = this.domProcessor.extractChangedTextNodes(mutations);
      if (changedNodes.length > 0) {
        await this.processBatch(changedNodes);
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
    function initialize() {
      if (isInitialized)
        return;
      try {
        biasDetector = new BiasDetector();
        const popupManager = getPopupManager();
        console.log("PopupManager initialized");
        setupMessageListeners();
        loadSettingsAndStart();
        isInitialized = true;
        console.log("E-Prime Bias Detector initialized successfully");
      } catch (error) {
        console.error("Failed to initialize Bias Detector:", error);
      }
    }
    function loadSettingsAndStart() {
      const defaultSettings = BiasConfig.getDefaultSettings();
      function applySettingsAndStart(items) {
        const validatedSettings = BiasConfig.validateSettings(items);
        biasDetector.updateSettings(validatedSettings).then(() => {
          if (validatedSettings.enableAnalysis) {
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
        console.log("Starting with default settings");
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
          default:
            sendResponse({ success: false, error: "Unknown action" });
        }
      } catch (error) {
        console.error("Error handling message:", error);
        sendResponse({ success: false, error: error.message });
      }
    }
    async function handleUpdateSettings(request, sendResponse) {
      console.log("Content script received new settings:", request.settings);
      const validatedSettings = BiasConfig.validateSettings(request.settings);
      await biasDetector.updateSettings(validatedSettings);
      const stats = biasDetector.getStats();
      sendResponse({
        success: true,
        stats,
        message: "Settings updated successfully"
      });
    }
    function handleGetStats(sendResponse) {
      const stats = biasDetector.getStats();
      console.log("Sending stats:", stats);
      sendResponse(stats);
    }
    async function handleForceAnalyze(sendResponse) {
      console.log("Force analyze requested - enabling analysis");
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
      console.log("Clear highlights requested - disabling analysis");
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
        sendResponse({ success: false, error: error?.message ?? String(error) });
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
    function handleError(error) {
      console.error("E-Prime Bias Detector error:", error);
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
        console.log("Attempting to reinitialize Bias Detector...");
        initialize();
      }, 1e3);
    }
    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", (event) => {
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

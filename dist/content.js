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
            "violence is never the answer",
            "government is the enemy"
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
      // Advanced Detection (disabled by default)
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
      // Framing & Rhetoric (disabled by default)
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
        }
      },
      // Manipulation Tactics (disabled by default)
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
            "you're overreacting",
            "you're imagining things",
            "you're being too sensitive",
            "that's not what I said"
          ],
          acceptable: [
            "I have a different recollection",
            "the evidence shows otherwise",
            "according to the records",
            "that seems disproportionate",
            "let me clarify what I meant"
          ]
        },
        contextualGuidance: {
          academic: "Concerning when dismissing research or findings without evidence",
          news: "Red flag when systematically undermining credible sources",
          opinion: "Watch for patterns of reality-questioning language",
          instructions: "Generally inappropriate unless providing evidence-based corrections"
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
    static createEmptyStats() {
      const stats = { healthScore: 50 };
      for (const config of Object.values(this.BIAS_TYPES)) {
        stats[config.statKey] = 0;
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
        } else if (Object.values(this.BIAS_TYPES).some((config) => config.settingKey === key) || Object.values(this.EXCELLENCE_TYPES).some((config) => config.settingKey === key)) {
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
  var weaselPhrases = [
    "many people say",
    "some say",
    "experts believe",
    "studies show",
    "it is said",
    "they say",
    "people think",
    "some argue",
    "critics claim",
    "supporters maintain",
    "observers note",
    "sources indicate",
    "reportedly",
    "allegedly",
    "supposedly",
    "it is believed",
    "it is thought",
    "widely known",
    "widely believed",
    "generally accepted",
    "commonly believed",
    "often said",
    "research suggests",
    "evidence suggests",
    "data indicates",
    "it appears",
    "it seems",
    "arguably",
    "presumably",
    "in some cases",
    "in many cases",
    "frequently",
    "typically",
    "tends to",
    "may indicate",
    "could suggest",
    "might imply",
    "some experts say",
    "authorities believe",
    "insiders claim",
    "unnamed sources",
    "according to reports"
  ];

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
  var maximizers = [
    "massive",
    "huge",
    "enormous",
    "gigantic",
    "colossal",
    "crisis",
    "disaster",
    "catastrophe",
    "epidemic",
    "plague",
    "explosion",
    "skyrocket",
    "plummet",
    "devastate",
    "destroy",
    "annihilate",
    "obliterate",
    "decimate",
    "revolutionary",
    "unprecedented",
    "extraordinary",
    "incredible",
    "amazing",
    "astonishing",
    "staggering",
    "monumental",
    "tremendous",
    "spectacular",
    "phenomenal",
    "breakthrough",
    "game\\s+changing",
    "earth\\s+shattering"
  ];

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
  var euphemisms = [
    // Political euphemisms
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
    // Corporate euphemisms
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
    // Social euphemisms
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
    // Military euphemisms
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
    // Dysphemisms (loaded negative framing)
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
    // Medical/health euphemisms
    "therapeutic misadventure",
    "negative patient outcome",
    "terminal illness",
    "life-limiting condition",
    "comfort care",
    "pregnancy termination",
    "medical assistance in dying",
    // Environmental euphemisms
    "climate change",
    "global warming",
    "carbon footprint",
    "sustainable development",
    "clean coal",
    "energy independence",
    "managed retreat",
    "controlled burn",
    "wildlife management"
  ];

  // src/dictionaries/emotional-triggers.js
  var emotionalTriggers = [
    // Fear appeals
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
    // Guilt triggers
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
    // Flattery patterns
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
    // Outrage fuel
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
    // Sympathy exploitation
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
    // Urgency creation
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
    "do or die"
  ];

  // src/dictionaries/gaslighting.js
  var gaslightingPhrases = [
    // Reality denial
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
    // Minimizing concerns
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
    // Memory manipulation
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
    // Credibility attacks
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
    // Deflection phrases
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
    "conveniently ignoring"
  ];

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
    // Get opinion word sub-categories for enhanced detection
    getOpinionSubCategories() {
      return opinionWords;
    }
    // Get sub-category for a specific opinion word
    getOpinionSubCategory(word) {
      for (const [categoryId, category] of Object.entries(opinionWords)) {
        if (category.words.includes(word.toLowerCase())) {
          return {
            id: categoryId,
            ...category
          };
        }
      }
      return null;
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
        // Basic Detection
        opinion: {
          description: "Subjective language that reveals the writer's personal stance or evaluation. These words signal opinion rather than fact.",
          suggestion: "Consider using more objective language or acknowledging the subjective nature of the statement.",
          examples: "Instead of 'This is obviously wrong' \u2192 'This appears to contradict the evidence' or 'I believe this is incorrect'"
        },
        // Opinion Sub-Categories
        opinion_certainty: {
          description: "Words that push readers toward unquestioning acceptance by conveying false certainty about debatable topics.",
          suggestion: "Use more tentative language that acknowledges uncertainty and invites evaluation.",
          examples: "Instead of 'obviously wrong' \u2192 'appears to contradict' or 'I believe this is incorrect'"
        },
        opinion_hedging: {
          description: "Words that create unnecessary doubt or vagueness, often to avoid taking responsibility for claims.",
          suggestion: "Be more definitive when you have evidence, or explain the specific reasons for uncertainty.",
          examples: "Instead of 'maybe true' \u2192 'requires further investigation' or 'preliminary evidence suggests'"
        },
        opinion_evaluative_positive: {
          description: "Subjective positive judgments that reveal the writer's approval without objective criteria.",
          suggestion: "Replace with specific, measurable criteria or acknowledge the subjective nature of the evaluation.",
          examples: "Instead of 'excellent performance' \u2192 'achieved 95% accuracy' or 'I consider this performance strong because...'"
        },
        opinion_evaluative_negative: {
          description: "Subjective negative judgments that reveal the writer's disapproval without objective criteria.",
          suggestion: "Replace with specific, measurable criteria or acknowledge the subjective nature of the evaluation.",
          examples: "Instead of 'poor quality' \u2192 'failed to meet safety standards' or 'I find this concerning because...'"
        },
        opinion_emotional_charge: {
          description: "Words designed to trigger strong emotional responses that bypass logical evaluation.",
          suggestion: "Use neutral language that allows readers to form their own emotional responses based on facts.",
          examples: "Instead of 'heartwarming story' \u2192 'story about community support' or 'horrifying event' \u2192 'traumatic incident'"
        },
        opinion_comparative: {
          description: "Words that create artificial rankings or comparisons without context or criteria.",
          suggestion: "Provide specific criteria for comparison or use measured language that acknowledges context.",
          examples: "Instead of 'the best solution' \u2192 'an effective solution' or 'the most efficient approach we tested'"
        },
        opinion_political_framing: {
          description: "Words that frame issues in political terms, potentially polarizing neutral topics.",
          suggestion: "Use neutral, descriptive language that focuses on specific policies or actions rather than political labels.",
          examples: "Instead of 'radical proposal' \u2192 'proposal that differs significantly from current policy' or describe specific elements"
        },
        opinion_intensifiers: {
          description: "Words that amplify or exaggerate without adding meaningful information.",
          suggestion: "Use specific, measurable descriptions or remove unnecessary intensification.",
          examples: "Instead of 'extremely important' \u2192 'critical for project success' or 'increased by 300%'"
        },
        opinion_credibility_undermining: {
          description: "Words that question or attack credibility without providing evidence or reasoning.",
          suggestion: "Address specific claims with evidence rather than attacking the source's credibility.",
          examples: "Instead of 'so-called expert' \u2192 'Dr. Smith, whose methodology differs from mainstream approaches' or address specific claims"
        },
        opinion_loaded_political: {
          description: "Words that carry heavy political or ideological baggage, triggering partisan responses.",
          suggestion: "Use specific, descriptive language that focuses on actions or policies rather than loaded terms.",
          examples: "Instead of 'socialist policies' \u2192 'government-funded programs' or 'authoritarian regime' \u2192 'government that restricts civil liberties'"
        },
        opinion_moral_judgments: {
          description: "Words that impose moral frameworks without acknowledging their subjective nature.",
          suggestion: "Acknowledge the subjective nature of moral judgments or specify the ethical framework being used.",
          examples: "Instead of 'immoral behavior' \u2192 'behavior that violates principle X' or 'I consider this unethical because...'"
        },
        opinion_emotional_appeals: {
          description: "Words that bypass logical evaluation by directly targeting emotional responses.",
          suggestion: "Focus on factual information that allows readers to form their own emotional responses.",
          examples: "Instead of 'promising developments' \u2192 'developments that may lead to improved outcomes' or provide specific evidence"
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
      const isExcellence = match.isExcellence;
      const type = match.type;
      const intensity = match.intensity || 2;
      const intensityLabel = ["Mild", "Moderate", "Severe"][intensity - 1];
      let content = `<div class="hover-card ${isExcellence ? "hover-card-excellence" : "hover-card-problem"}">`;
      const biasConfig = isExcellence ? BiasConfig.EXCELLENCE_TYPES[type.toUpperCase()] : BiasConfig.getBiasTypeConfig(type);
      const isContextual = match.isContextual && match.contextReasoning;
      if (isExcellence) {
        content += `<div class="hover-card-header">\u2713 ${this.getTypeName(type, true)}</div>`;
      } else {
        let typeName;
        if (match.subCategory && type === "opinion") {
          const subCategoryType = `opinion_${match.subCategory.id}`;
          typeName = this.getTypeName(subCategoryType, false);
          content += `
                    <div class="hover-card-header"${this.getSubCategoryStyle(match)}>
                        \u26A0 ${typeName}
                        <span class="intensity-badge intensity-${intensity}">${intensityLabel}</span>
                    </div>
                `;
        } else {
          typeName = this.getTypeName(type, false);
          content += `
                    <div class="hover-card-header"${this.getSubCategoryStyle(match)}>
                        \u26A0 ${typeName}
                        <span class="intensity-badge intensity-${intensity}">${intensityLabel}</span>
                    </div>
                `;
        }
      }
      content += `<div class="hover-card-text">"${match.text}"</div>`;
      if (isContextual) {
        const confidencePercentage = match.confidence ? Math.round(match.confidence * 100) : "Unknown";
        const reasoningIcon = isExcellence ? "\u2728" : "\u{1F50D}";
        content += `<div class="hover-card-contextual-reasoning">
                <div class="hover-card-section">
                    <div class="hover-card-section-title">${reasoningIcon} Context Analysis:</div>
                    <div class="hover-card-section-content context-reasoning">
                        ${match.contextReasoning}
                        <div class="confidence-indicator">
                            <span class="confidence-label">Confidence:</span>
                            <span class="confidence-value">${confidencePercentage}%</span>
                        </div>
                    </div>
                </div>
            </div>`;
      }
      if (match.subCategory) {
        content += `<div class="hover-card-implication">
                <strong>Implication:</strong> ${match.subCategory.implication}
            </div>`;
      }
      if (biasConfig) {
        if (biasConfig.basicTip) {
          content += `<div class="hover-card-reason">${biasConfig.basicTip}</div>`;
        }
        content += `<div class="hover-card-expanded">`;
        if (isExcellence) {
          if (biasConfig.whenExcellent) {
            content += `<div class="hover-card-section">
                        <div class="hover-card-section-title">\u2728 Why this is excellent:</div>
                        <div class="hover-card-section-content">${biasConfig.whenExcellent}</div>
                    </div>`;
          }
          if (biasConfig.howToEnhance) {
            content += `<div class="hover-card-section">
                        <div class="hover-card-section-title">\u{1F680} How to enhance further:</div>
                        <div class="hover-card-section-content">${biasConfig.howToEnhance}</div>
                    </div>`;
          }
        } else {
          if (biasConfig.whenConcerning) {
            content += `<div class="hover-card-section">
                        <div class="hover-card-section-title">\u26A0\uFE0F When to be concerned:</div>
                        <div class="hover-card-section-content">${biasConfig.whenConcerning}</div>
                    </div>`;
          }
          if (biasConfig.whenAcceptable) {
            content += `<div class="hover-card-section">
                        <div class="hover-card-section-title">\u2705 When it's acceptable:</div>
                        <div class="hover-card-section-content">${biasConfig.whenAcceptable}</div>
                    </div>`;
          }
        }
        if (biasConfig.lookFor && biasConfig.lookFor.length > 0) {
          content += `<div class="hover-card-section">
                    <div class="hover-card-section-title">\u{1F50D} Look for:</div>
                    <ul class="hover-card-checklist">`;
          biasConfig.lookFor.forEach((item) => {
            content += `<li>${item}</li>`;
          });
          content += `</ul></div>`;
        }
        if (biasConfig.examples) {
          content += `<div class="hover-card-section">
                    <div class="hover-card-section-title">\u{1F4DD} Examples:</div>`;
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
        let desc;
        if (match.subCategory && type === "opinion") {
          const subCategoryType = `opinion_${match.subCategory.id}`;
          desc = descriptions[subCategoryType];
        } else {
          desc = descriptions[type];
        }
        if (desc) {
          content += `<div class="hover-card-reason">${desc.description}</div>`;
          content += `<div class="hover-card-expanded">`;
          if (desc.suggestion) {
            content += `<div class="hover-card-suggestion">\u{1F4A1} ${desc.suggestion}</div>`;
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
      if (match.subCategory && match.subCategory.color) {
        return ` style="border-left: 4px solid ${match.subCategory.color}; background-color: ${match.subCategory.color}10;"`;
      }
      return "";
    }
    getTypeName(type, isExcellence) {
      const typeNames = {
        // Problems
        // opinion: 'Opinion Words',
        // Opinion Sub-Categories
        opinion_certainty: "\u{1F3AF} Certainty/Conviction",
        opinion_hedging: "\u2753 Hedging/Uncertainty",
        opinion_evaluative_positive: "\u{1F44D} Positive Evaluation",
        opinion_evaluative_negative: "\u{1F44E} Negative Evaluation",
        opinion_emotional_charge: "\u26A1 Emotional Charge",
        opinion_comparative: "\u{1F4CA} Comparative/Superlative",
        opinion_political_framing: "\u{1F3DB}\uFE0F Political Framing",
        opinion_intensifiers: "\u{1F525} Intensifiers",
        opinion_credibility_undermining: "\u{1F5E3}\uFE0F Credibility Undermining",
        opinion_loaded_political: "\u2696\uFE0F Loaded Political Terms",
        opinion_moral_judgments: "\u2696\uFE0F Moral/Ethical Judgments",
        opinion_emotional_appeals: "\u{1F4AD} Emotional Appeals",
        // Other Problems
        tobe: "To-Be Verbs",
        absolute: "Absolute Statements",
        passive: "Passive Voice",
        weasel: "Weasel Words",
        presupposition: "Presuppositions",
        metaphor: "War Metaphors",
        minimizer: "Minimizers",
        maximizer: "Maximizers",
        falsebalance: "False Balance",
        euphemism: "Euphemisms",
        emotional: "Emotional Manipulation",
        gaslighting: "Gaslighting",
        falsedilemma: "False Dilemmas",
        probability: "Probability Perception",
        // Excellence
        attribution: "Clear Attribution",
        nuance: "Nuanced Language",
        transparency: "Transparent Communication",
        discourse: "Constructive Discourse",
        evidence: "Evidence-Based Claims"
      };
      return typeNames[type] || (isExcellence ? "Excellence" : "Bias Pattern");
    }
  };

  // src/utils/DOMProcessor.js
  var DOMProcessor = class {
    constructor() {
      this.highlightClassPrefix = "bias-highlight-";
      this.excellenceClassPrefix = "excellence-";
      this.processedParents = /* @__PURE__ */ new Set();
      this.hoverGenerator = new HoverContentGenerator();
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
      return false;
    }
    shouldSkipElement(element) {
      const skipTags = ["SCRIPT", "STYLE", "NOSCRIPT", "SVG", "HEAD", "META", "LINK"];
      return skipTags.includes(element.nodeName);
    }
    isOwnHighlight(element) {
      if (!element.classList)
        return false;
      for (const className of element.classList) {
        if (className.startsWith(this.highlightClassPrefix) || className.startsWith(this.excellenceClassPrefix)) {
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
        } else {
          const cssType = match.type.startsWith("opinion_") ? "opinion" : match.type;
          span.className = `${this.highlightClassPrefix}${cssType}`;
        }
        if (match.intensity) {
          span.classList.add(`bias-intensity-${match.intensity}`);
        }
        span.textContent = match.text;
        this.addSimpleTooltip(span, match);
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
      const tooltips = {
        opinion: "Opinion - Subjective - General",
        // Opinion Sub-Categories
        opinion_certainty: "Possible Opinion - Certainty/Conviction",
        opinion_hedging: "Possible Opinion - Hedging/Uncertainty",
        opinion_evaluative_positive: "Possible Opinion - Positive Evaluation",
        opinion_evaluative_negative: "Possible Opinion - Negative Evaluation",
        opinion_emotional_charge: "Possible Opinion - Emotional Charge",
        opinion_comparative: "Possible Opinion - Comparative/Superlative",
        opinion_political_framing: "Possible Opinion - Political Framing",
        opinion_intensifiers: "Possible Opinion - Intensifiers",
        opinion_credibility_undermining: "Possible Opinion - Credibility Undermining",
        opinion_loaded_political: "Possible Opinion - Loaded Political Terms",
        opinion_moral_judgments: "Possible Opinion - Moral/Ethical Judgments",
        opinion_emotional_appeals: "Possible Opinion - Emotional Appeals",
        // Other types
        tobe: "To-be verb (E-Prime violation)",
        absolute: "Absolute statement",
        passive: "Passive voice construction",
        weasel: "Weasel word - vague attribution",
        presupposition: "Presupposition marker",
        metaphor: "War metaphor",
        minimizer: "Minimizing language",
        maximizer: "Exaggeration/hyperbole",
        falsebalance: "False balance indicator",
        euphemism: "Euphemism/dysphemism",
        emotional: "Emotional manipulation",
        gaslighting: "Gaslighting phrase",
        falsedilemma: "False dilemma",
        probability: "Probability language"
      };
      return tooltips[type] || "Bias indicator";
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
    // Add simple tooltip and right-click functionality
    addSimpleTooltip(spanElement, match) {
      let tooltipText;
      if (match.isContextual && match.contextReasoning) {
        const prefix = match.isExcellence ? "\u2713" : "\u26A0\uFE0F";
        const confidenceText = match.confidence ? ` (${(match.confidence * 100).toFixed(0)}% confidence)` : "";
        tooltipText = `${prefix} ${match.contextReasoning}${confidenceText}`;
      } else if (match.isExcellence) {
        tooltipText = match.tooltip || this.getExcellenceTooltipText(match.type);
      } else {
        if (match.subCategory && match.type.startsWith("opinion_")) {
          tooltipText = this.getTooltipText(match.type);
        } else if (match.type === "opinion" && match.subCategory) {
          tooltipText = this.getTooltipText(`opinion_${match.subCategory.id}`);
        } else {
          tooltipText = this.getTooltipText(match.type);
        }
      }
      spanElement.setAttribute("data-tooltip", tooltipText);
      spanElement.addEventListener("click", (e) => {
        e.preventDefault();
        this.showContextMenu(e, match);
      });
      spanElement.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        this.showContextMenu(e, match);
      });
    }
    // Show context menu on right-click
    showContextMenu(event, match) {
      const existingMenus = document.querySelectorAll(".context-menu");
      existingMenus.forEach((menu2) => menu2.remove());
      const hoverCard = this.createHoverCard(match);
      if (!hoverCard)
        return;
      const menu = document.createElement("div");
      menu.className = `context-menu ${match.isExcellence ? "excellence" : "problem"}`;
      menu.innerHTML = hoverCard.innerHTML;
      const header = menu.querySelector(".hover-card-header");
      if (header) {
        const closeBtn = document.createElement("button");
        closeBtn.className = "context-menu-close";
        closeBtn.innerHTML = "\xD7";
        header.appendChild(closeBtn);
      }
      menu.style.left = event.clientX + "px";
      menu.style.top = event.clientY + "px";
      menu.style.display = "block";
      document.body.appendChild(menu);
      const closeMenu = () => menu.remove();
      menu.querySelector(".context-menu-close").addEventListener("click", closeMenu);
      setTimeout(() => {
        document.addEventListener("click", function closeOnOutside(e) {
          if (!menu.contains(e.target)) {
            closeMenu();
            document.removeEventListener("click", closeOnOutside);
          }
        });
      }, 10);
      document.addEventListener("keydown", function closeOnEscape(e) {
        if (e.key === "Escape") {
          closeMenu();
          document.removeEventListener("keydown", closeOnEscape);
        }
      });
      setTimeout(() => {
        const rect = menu.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        if (rect.right > viewportWidth) {
          menu.style.left = event.clientX - rect.width + "px";
        }
        if (rect.bottom > viewportHeight) {
          menu.style.top = event.clientY - rect.height + "px";
        }
      }, 10);
    }
    // Remove all bias highlights
    removeAllHighlights() {
      const selector = Object.keys(this.getHighlightSelectors()).join(", ");
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
    // Clean up hover-related elements and event listeners
    cleanupHoverElements(element) {
      if (element && element.removeAttribute) {
        element.removeAttribute("data-tooltip");
      }
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
          1: ["perhaps you're mistaken", "that's unusual", "are you sure"],
          2: ["you're overreacting", "being dramatic", "too sensitive"],
          3: ["that never happened", "you're imagining things", "you're crazy"]
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
            if (type === "opinion") {
              const subCategory = this.patterns.getOpinionSubCategory(match[0]);
              if (subCategory) {
                matchData.type = `opinion_${subCategory.id}`;
                matchData.subCategory = subCategory;
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
        return this.stats;
      } catch (error) {
        const errorMessage = error && error.message ? error.message : String(error);
        console.error("Document analysis failed:", errorMessage);
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
      if (mode === "problems" || mode === "balanced") {
        for (const [type, detector] of this.compiledDetectors) {
          if (detector.isEnabled()) {
            const matches = detector.detect(text);
            const matchesWithIntensity = matches.map((match) => ({
              ...match,
              type,
              intensity: this.excellenceDetector.calculateIntensity(match.text, type),
              portrayal: this.excellenceDetector.detectPortrayal(match.text)
            }));
            allMatches.push(...matchesWithIntensity);
          }
        }
        const contextualMatches = this.contextAwareDetector.detectAll(text);
        for (const match of contextualMatches) {
          const standardMatch = {
            index: match.index,
            length: match.length,
            text: match.text,
            type: match.classification === "weasel" ? "weasel" : match.classification,
            isContextual: true,
            contextReasoning: match.reasoning,
            confidence: match.confidence
          };
          if (match.classification === "weasel" || match.classification === "bias") {
            standardMatch.intensity = 2;
            allMatches.push(standardMatch);
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
        const contextualMatches = this.contextAwareDetector.detectAll(text);
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
              confidence: match.confidence
            };
            allMatches.push(excellenceMatch);
          }
        }
      }
      if (allMatches.length > 0) {
        this.highlightMatches(node, allMatches);
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
      const contextualMatches = matches.filter((m) => m.isContextual);
      const regularMatches = matches.filter((m) => !m.isContextual);
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
          this.domProcessor.removeAllHighlights();
          this.resetStats();
          this.disconnectObserver();
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
            this.domProcessor.removeSpecificHighlights(detector.id);
            this.stats[detector.statKey] = 0;
          } else {
            needsReanalysis = true;
          }
        }
      }
      if (needsReanalysis) {
        await this.analyzeDocumentPreservingDisabled();
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
    updateStats(match) {
      if (match.isExcellence) {
        const config = BiasConfig.EXCELLENCE_TYPES[match.type.toUpperCase()];
        if (config && config.statKey) {
          this.stats[config.statKey] = (this.stats[config.statKey] || 0) + 1;
        }
      } else {
        const originalType = match.type.startsWith("opinion_") ? "opinion" : match.type;
        const detector = this.compiledDetectors.get(originalType);
        if (detector && detector.statKey) {
          this.stats[detector.statKey]++;
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
      return BiasConfig.createEmptyStats();
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
        return mutation.addedNodes.length > 0 && Array.from(mutation.addedNodes).some(
          (node) => this.domProcessor.isSignificantContent(node)
        );
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
      chrome.storage.sync.get(defaultSettings, (items) => {
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
        });
      });
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
      setTimeout(() => {
        const stats = biasDetector.getStats();
        sendResponse({
          success: true,
          stats,
          message: "Settings updated successfully"
        });
      }, 100);
    }
    function handleGetStats(sendResponse) {
      const stats = biasDetector.getStats();
      console.log("Sending stats:", stats);
      sendResponse(stats);
    }
    async function handleForceAnalyze(sendResponse) {
      console.log("Force analyze requested");
      try {
        biasDetector.clearHighlights();
        await new Promise((resolve) => setTimeout(resolve, 100));
        const stats = await biasDetector.forceAnalyze();
        biasDetector.setupMutationObserver();
        sendResponse({
          success: true,
          stats,
          message: "Analysis completed successfully"
        });
      } catch (error) {
        sendResponse({
          success: false,
          error: error.message
        });
      }
    }
    function handleClearHighlights(sendResponse) {
      console.log("Clear highlights requested");
      biasDetector.clearHighlights();
      const stats = biasDetector.getStats();
      sendResponse({
        success: true,
        stats,
        message: "Highlights cleared successfully"
      });
    }
    function handleGetPerformanceMetrics(sendResponse) {
      const metrics = biasDetector.getPerformanceMetrics();
      sendResponse({ success: true, metrics });
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

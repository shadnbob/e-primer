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
        examples: ["obviously", "terrible", "amazing", "controversial"]
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
        examples: ["is", "are", "was", "were", "being"]
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
        examples: ["all", "never", "everyone", "nobody", "always"]
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
        examples: ["was written", "mistakes were made", "has been reported"]
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
        examples: ["many people say", "studies show", "experts believe"]
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
        examples: ["even scientists admit", "still refuses", "another example"]
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
        examples: ["battle against", "war on", "attacking the problem"]
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
        examples: ["just", "only", "merely", "slightly", "minor"]
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
        examples: ["crisis", "disaster", "unprecedented", "massive"]
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
        examples: ["both sides", "balanced perspective", "two schools of thought"]
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
        examples: ["enhanced interrogation", "collateral damage", "rightsizing"]
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
        examples: ["think of the children", "devastating impact", "shocking revelation"]
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
        examples: ["that never happened", "you're overreacting", "you're imagining things"]
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
        examples: ["either you're with us or against us", "pick a side", "all or nothing"]
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
        enabled: true
      },
      NUANCE: {
        id: "nuance",
        name: "Nuanced Language",
        description: "Acknowledges complexity",
        className: "excellence-nuance",
        settingKey: "highlightNuanceExcellence",
        statKey: "nuanceExcellenceCount",
        enabled: true
      },
      TRANSPARENCY: {
        id: "transparency",
        name: "Transparent Communication",
        description: "Clear about limitations",
        className: "excellence-transparency",
        settingKey: "highlightTransparencyExcellence",
        statKey: "transparencyExcellenceCount",
        enabled: true
      },
      DISCOURSE: {
        id: "discourse",
        name: "Constructive Discourse",
        description: "Encourages dialogue",
        className: "excellence-discourse",
        settingKey: "highlightDiscourseExcellence",
        statKey: "discourseExcellenceCount",
        enabled: true
      },
      EVIDENCE: {
        id: "evidence",
        name: "Evidence-Based",
        description: "Supported by data",
        className: "excellence-evidence",
        settingKey: "highlightEvidenceExcellence",
        statKey: "evidenceExcellenceCount",
        enabled: true
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
    static hexToRgba(hex, alpha) {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    // Performance settings
    static PERFORMANCE = {
      BATCH_SIZE: 50,
      MUTATION_DEBOUNCE: 1e3,
      MAX_TEXT_LENGTH: 1e4,
      MIN_SIGNIFICANT_TEXT: 5,
      UI_UPDATE_INTERVAL: 200
    };
    // Feature flags for experimental features
    static FEATURES = {
      CONTEXT_AWARENESS: false,
      MACHINE_LEARNING: false,
      EXPORT_REPORTS: false,
      CUSTOM_DICTIONARIES: false,
      PERFORMANCE_MONITORING: true
    };
  };
  var BIAS_TYPES = BiasConfig.BIAS_TYPES;
  var CATEGORIES = BiasConfig.CATEGORIES;
  var PERFORMANCE = BiasConfig.PERFORMANCE;
  var FEATURES = BiasConfig.FEATURES;

  // src/dictionaries/opinion-words.js
  var opinionWords = [
    // Certainty/Conviction Adverbs
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
    "patently",
    // Hedging/Uncertainty Words
    "probably",
    "maybe",
    "perhaps",
    "conceivably",
    "speculated",
    "rumored",
    // Evaluative Adjectives (Positive)
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
    "worthy",
    // Evaluative Adjectives (Negative)
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
    // Emotionally Charged Words
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
    "threatening",
    // Comparative/Superlative Terms
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
    "darkest",
    // Political/Controversial Framing
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
    "provocative",
    // Intensifiers
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
    "considerably",
    // Credibility Undermining Words
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
    "groundless",
    // Loaded Political Terms
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
    "propaganda",
    // Moral/Ethical Judgments
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
    "unreasonable",
    // Emotional Appeals
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
  ];

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
    "used\\s+to",
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
    "a\\s+bit",
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

  // src/dictionaries/index.js
  var BiasPatterns = class {
    constructor() {
      this.rawPatterns = this.loadRawPatterns();
      this.compiledPatterns = /* @__PURE__ */ new Map();
      this.compileAllPatterns();
    }
    loadRawPatterns() {
      return {
        opinion: opinionWords,
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
        falsedilemma: falseDilemmaPhrases
      };
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

  // src/utils/DOMProcessor.js
  var DOMProcessor = class {
    constructor() {
      this.highlightClassPrefix = "bias-highlight-";
      this.excellenceClassPrefix = "excellence-";
      this.processedParents = /* @__PURE__ */ new Set();
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
          span.title = match.tooltip || this.getExcellenceTooltipText(match.type);
        } else {
          span.className = `${this.highlightClassPrefix}${match.type}`;
          span.title = this.getTooltipText(match.type);
        }
        span.textContent = match.text;
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
        opinion: "Opinion word - subjective language",
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
        falsedilemma: "False dilemma"
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
    // Remove all bias highlights
    removeAllHighlights() {
      const selector = Object.keys(this.getHighlightSelectors()).join(", ");
      const highlights = document.querySelectorAll(selector);
      this.processedParents.clear();
      highlights.forEach((highlight) => {
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
  var performanceMonitor = new PerformanceMonitor();

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

  // src/content/BiasDetector.js
  var BiasDetector = class {
    constructor() {
      this.settings = BiasConfig.getDefaultSettings();
      this.patterns = new BiasPatterns();
      this.domProcessor = new DOMProcessor();
      this.excellenceDetector = new ExcellenceDetector();
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
            matches.push({
              index: match.index,
              length: match[0].length,
              text: match[0],
              type,
              pattern: pattern.source
            });
            if (match.index === pattern.regex.lastIndex) {
              pattern.regex.lastIndex++;
            }
          }
        } catch (error) {
          console.warn(`Error with pattern ${pattern.source}:`, error);
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
        console.error("Document analysis failed:", error);
        return this.createEmptyStats();
      }
    }
    // Process a batch of text nodes
    async processBatch(textNodes) {
      for (const node of textNodes) {
        try {
          await this.processTextNode(node);
        } catch (error) {
          console.warn("Error processing text node:", error);
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
      }
      if (mode === "excellence" || mode === "balanced") {
        const excellenceMatches = this.excellenceDetector.findExcellence(text);
        const enabledExcellence = excellenceMatches.filter((match) => {
          const config = BiasConfig.EXCELLENCE_TYPES[match.type.toUpperCase()];
          return config && this.settings[config.settingKey] !== false;
        });
        allMatches.push(...enabledExcellence);
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
    // Remove overlapping matches, preferring longer matches
    deduplicateMatches(matches) {
      const sorted = matches.sort((a, b) => {
        if (a.index !== b.index)
          return a.index - b.index;
        return b.length - a.length;
      });
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
        await this.analyzeDocument();
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
        const detector = this.compiledDetectors.get(match.type);
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

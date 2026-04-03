# E-Prime Bias Detector

A browser extension for Chrome and Firefox that detects biased language patterns in web content. It highlights problematic rhetoric — opinion presented as fact, vague sourcing, emotional manipulation, false dilemmas — alongside markers of quality writing like clear attribution, nuance, and transparency. The goal is to build critical reading habits, not to tell you what to think.

## Why This Exists

Most people consume written content passively. News articles, blog posts, social media — the language used to frame information shapes how we interpret it, often without us noticing. A sentence like "everyone knows this policy is a disaster" contains an absolute claim ("everyone knows"), an opinion word presented as fact ("disaster"), and no source attribution. It *feels* authoritative, but says nothing verifiable.

E-Prime Bias Detector makes these patterns visible. It doesn't judge content as "good" or "bad" — it highlights the linguistic structures that either support or undermine clear, honest communication, and lets you decide what to make of them.

## Using the Extension

Once installed, the extension runs automatically on every web page. Highlighted words appear inline — color-coded by category — and clicking any highlighted word opens an informational popup explaining what was detected and why it matters.

For example, clicking a highlighted instance of "everyone" produces a popup like this:

> **Absolute Statements** — Moderate
>
> **"everyone"**
>
> Absolute terms that rarely reflect reality accurately
>
> **When to be concerned:**
> When used for opinions, complex social issues, or persuasion
>
> **When it's acceptable:**
> For mathematical facts, scientific laws, logical definitions
>
> **Look for:**
> Is this factually absolute? Is this about a complex topic? Used for emphasis or fact? Are there any exceptions to this claim?
>
> **Examples:**
> *Concerning:* "all politicians are corrupt," "everyone knows this," "nobody cares about the environment"
> *Acceptable:* "all triangles have three sides," "every participant signed consent," "never mix these chemicals"

Each detection category provides this kind of contextual guidance — not just flagging the word, but helping you evaluate whether the usage is genuinely problematic or perfectly reasonable in context. The extension doesn't tell you something is wrong; it asks you to look more closely.

The popup in the browser toolbar gives you controls for toggling individual detection categories on and off, switching between analysis modes (problems only, excellence only, or balanced), and viewing real-time statistics for the current page. Section toggles let you enable or disable entire categories at once.

## The Theory Behind the Detection

The extension draws on several overlapping traditions in linguistics, rhetoric, and media literacy. Each detection category targets a specific way language can mislead — or demonstrate integrity.

### E-Prime and the Problem with "To Be"

E-Prime is a constrained form of English developed by D. David Bourland Jr. in the 1960s, building on Alfred Korzybski's General Semantics. The core idea: forms of "to be" (is, am, are, was, were, be, being, been) often create false equivalences and hide complexity.

Consider the difference between "This policy is a failure" and "This policy has not achieved its stated goals in three measurable areas." The first uses "is" to collapse a complex evaluation into an identity statement — the policy *equals* failure. The second describes specific, verifiable shortcomings without pretending the judgment is an objective property of the thing itself.

E-Prime doesn't claim all uses of "to be" are harmful. "Water is H₂O" is a definition. "The meeting is at 3pm" is a scheduling fact. The extension highlights them so readers can notice when "to be" constructions are doing persuasive work they shouldn't be.

### Opinion Language and Subjectivity Markers

Words like "obviously," "clearly," "terrible," and "brilliant" embed the writer's evaluation directly into claims that might otherwise pass as factual reporting. The extension detects these across several sub-categories:

- **Certainty markers** ("obviously," "undeniably," "without question") — signal conviction without evidence
- **Hedging language** ("perhaps," "maybe," "arguably") — can indicate intellectual honesty OR evasion, depending on context
- **Evaluative terms** ("brilliant," "disastrous," "groundbreaking") — embed judgment into description
- **Emotional charge** ("shocking," "outrageous," "heartwarming") — trigger feeling rather than analysis
- **Intensifiers** ("absolutely," "utterly," "completely") — amplify claims without adding substance

The extension doesn't assume all opinion language is bad. An editorial *should* contain evaluative language — but it should be clearly framed as opinion. The problem arises when opinion language appears in contexts claiming objectivity.

### Absolute Statements and Universal Claims

"Everyone knows," "this always fails," "no one believes" — absolute language makes sweeping claims that are almost never literally true. These patterns are common in persuasive writing because they feel authoritative, but they're usually unfalsifiable or trivially false.

The extension detects both **maximizers** ("absolutely," "totally," "the greatest") and **minimizers** ("merely," "just," "only") because both distort scale. "The damage was merely cosmetic" minimizes. "This is absolutely the worst outcome possible" maximizes. Both substitute emphasis for evidence.

### Weasel Words and Vague Attribution

"Studies show," "experts believe," "sources indicate," "people are saying" — these phrases create an illusion of authority without providing verifiable sources. They're called "weasel words" because they weasel out of accountability. Who are these experts? Which studies? What sources?

The extension distinguishes between vague attribution (a problem) and specific attribution (an excellence marker). "Studies show this works" gets flagged. "A 2024 meta-analysis in The Lancet covering 15,000 participants found improved outcomes" gets highlighted as excellent attribution.

### Passive Voice and Hidden Agency

Passive constructions aren't inherently biased, but they can obscure who is responsible for actions. "Mistakes were made" is a classic example — it acknowledges mistakes while hiding who made them. "The protesters were dispersed" omits who dispersed them and how.

The extension flags passive constructions so readers can ask: is the agent being hidden deliberately? Sometimes passive voice is the right choice (when the action matters more than the actor). But when it consistently appears around accountability questions, that's worth noticing.

### Presupposition Markers

Presuppositions are assumptions smuggled into statements as if they're already established facts. "When did the administration stop covering this up?" presupposes there was a cover-up. "Why does this approach keep failing?" presupposes repeated failure.

These are powerful because responding to the surface question implicitly accepts the hidden premise. The extension highlights these so readers can identify and evaluate the embedded assumption separately from the stated question.

### Framing Through Metaphor

War metaphors applied to non-military contexts ("battle for market share," "war on drugs," "fighting inflation") frame situations as adversarial conflicts with winners and losers. This framing shapes how people think about problems and solutions — collaborative approaches become harder to imagine when everything is framed as a fight.

### Manipulation Tactics

The extension detects several specific manipulation patterns:

- **False balance** — framing two positions as equally valid when evidence strongly favors one ("some say the earth is round, others disagree")
- **Euphemisms** — softening language that obscures harsh realities ("collateral damage" for civilian deaths, "downsizing" for layoffs)
- **Emotional manipulation** — language designed to bypass rational evaluation and trigger emotional responses
- **Gaslighting phrases** — language patterns that undermine confidence in established facts or documented events ("that never happened," "concerns are overblown")
- **False dilemmas** — presenting complex situations as binary choices ("you're either with us or against us")

### Excellence Detection: What Good Writing Looks Like

Bias detection alone can create cynicism — everything starts looking manipulative. The excellence detection system provides the other side: what does responsible, well-sourced, intellectually honest writing actually look like?

- **Clear attribution** — named sources, dates, publication venues, sample sizes
- **Nuanced language** — "the evidence suggests" rather than "this proves"; acknowledging that situations are complex
- **Transparency** — "in my opinion," "important limitations include," "more research is needed"
- **Constructive discourse** — building on others' ideas, acknowledging valid counterpoints
- **Evidence-based claims** — specific data, methodology references, statistical context

The health score reflects the ratio of excellence markers to problem indicators, giving a quick sense of a document's rhetorical quality.

### Context-Aware Detection

Many phrases are ambiguous. "It seems" can be weaseling ("it seems like this is true") or genuine scientific hedging ("it seems, based on the data from three independent studies, that..."). The extension includes a context-aware detection system that examines surrounding text to classify ambiguous phrases more accurately, reducing false positives.

## Detection Categories

### Basic Detection (enabled by default)
- **Opinion Words** — subjective language and evaluative terms
- **To-Be Verbs** — E-Prime violations that can create false equivalencies
- **Absolute Statements** — universal claims and extremes

### Advanced Detection
- **Passive Voice** — constructions that obscure agency
- **Weasel Words** — vague attributions and unsupported claims (5 subcategories: unnamed sources, hedged evidence, vague quantifiers, appeal to authority, passive attribution)
- **Presuppositions** — hidden assumptions embedded in statements
- **Probability Perception** — vague probability language that distorts risk perception

### Framing & Rhetoric
- **War Metaphors** — militaristic language for non-military topics
- **Minimizers** — language that downplays significance
- **Maximizers** — exaggeration and hyperbolic language (5 subcategories: scale inflation, catastrophizing, dramatic verbs, superlative hype, paradigm shift)

### Manipulation Tactics
- **False Balance** — artificial equivalence between unequal positions
- **Euphemisms** — language that obscures harsh realities (7 subcategories: political, corporate, social, military, dysphemism, medical, environmental)
- **Emotional Manipulation** — appeals designed to trigger emotional responses (6 subcategories: fear, guilt, flattery, outrage, sympathy, false urgency)
- **Gaslighting** — phrases that undermine perception and memory (5 subcategories: reality denial, emotional invalidation, memory manipulation, credibility attack, deflection)
- **False Dilemmas** — language that forces artificial binary choices

### Excellence Detection
- **Clear Attribution** — specific, verifiable sources
- **Nuanced Language** — acknowledges complexity and avoids absolutes
- **Transparent Communication** — clear about limitations and perspective
- **Constructive Discourse** — encourages dialogue and acknowledges others
- **Evidence-Based Claims** — supported by specific data and methodology

## Installation

Pre-built extensions are included in the repository, so you can install directly without building from source.

### Chrome
1. Download or clone the repo: `git clone https://github.com/shadnbob/e-primer.git`
2. Navigate to `chrome://extensions/`
3. Enable "Developer mode"
4. Click "Load unpacked" and select the `dist/` folder

### Firefox
1. Download or clone the repo: `git clone https://github.com/shadnbob/e-primer.git`
2. Navigate to `about:debugging`
3. Click "This Firefox"
4. Click "Load Temporary Add-on"
5. Select `dist-firefox/manifest.json`

If you'd rather build from source (or want to modify the extension), see Development below.

## Development

### Prerequisites
- Node.js (v14+)
- npm

### Setup
```bash
git clone https://github.com/shadnbob/e-primer.git
cd e-primer
npm install
```

### Build
```bash
npm run build            # Chrome (default)
npm run build:firefox    # Firefox
npm run build:all        # Both
npm run dev              # Watch mode (Chrome, auto-rebuilds)
```

### Test
```bash
npm test                 # Run all tests (Vitest)
npm run test:watch       # Watch mode
npm run test:coverage    # With coverage report
```

The test suite covers unit tests for pattern matching, configuration, DOM processing, and excellence detection, plus integration tests for the full analysis pipeline, settings management, and performance benchmarks.

Manual test HTML files are in `tests/manual/` for browser-based testing.

### Project Structure
```
e-primer/
├── src/
│   ├── config/BiasConfig.js          # All bias types, categories, settings
│   ├── content/
│   │   ├── BiasDetector.js           # Main detection engine
│   │   └── content-script.js         # Extension entry point
│   ├── dictionaries/
│   │   ├── index.js                  # Pattern compiler (BiasPatterns class)
│   │   ├── opinion-words.js          # Opinion/subjective terms
│   │   ├── absolute-words.js         # Universal quantifiers
│   │   ├── tobe-verbs.js             # E-Prime verb forms
│   │   └── ...                       # 11 more pattern dictionaries
│   ├── popup/
│   │   ├── popup-dynamic.js          # Popup entry point
│   │   ├── PopupGenerator.js         # Dynamic UI generation
│   │   ├── SettingsManager.js        # Settings persistence
│   │   └── StatsDisplay.js           # Statistics display
│   ├── utils/
│   │   ├── ContextAwareDetector.js   # Ambiguous phrase classification
│   │   ├── DOMProcessor.js           # DOM manipulation and highlighting
│   │   ├── ExcellenceDetector.js     # Positive pattern detection
│   │   ├── HoverContentGenerator.js  # Tooltip content generation
│   │   ├── PopupManager.js           # Click/hover popup handling
│   │   └── PerformanceMonitor.js     # Performance tracking
│   ├── build/
│   │   ├── StyleGenerator.js        # CSS generation from config
│   │   └── ReferencePageGenerator.js # Pattern reference page generation
│   └── highlight-styles.css          # Highlight and popup styles
├── tests/
│   ├── unit/                         # Unit tests
│   ├── integration/                  # Integration tests
│   └── manual/                       # Browser test HTML files
├── docs/                             # GitHub Pages site (generated + static)
├── dist/                             # Chrome build output (generated)
├── dist-firefox/                     # Firefox build output (generated)
├── build.js                          # esbuild bundler script
├── vitest.config.js                  # Test configuration
├── manifest.json                     # Chrome manifest (V3)
├── manifest-firefox.json             # Firefox manifest (V2)
├── EXTENDING.md                      # Guide for adding new bias types
└── CLAUDE.md                         # AI assistant project context
```

### Adding New Bias Types

See [EXTENDING.md](EXTENDING.md) for the full guide. The short version:

1. Add the type configuration to `BiasConfig.BIAS_TYPES`
2. Create a pattern dictionary in `src/dictionaries/`
3. Import and register it in `src/dictionaries/index.js`
4. Run `npm run build` — the popup UI and CSS are generated automatically

## How It Works

The extension runs as a content script on every web page. On load:

1. **Pattern compilation** — all word lists and regex patterns from the 15 dictionaries are pre-compiled into optimized RegExp objects
2. **Text node collection** — a TreeWalker traverses the DOM collecting text nodes, skipping scripts, styles, and the extension's own highlights
3. **Batch processing** — text nodes are analyzed in batches to avoid blocking the UI thread
4. **Pattern matching** — each enabled detector runs its compiled patterns against the text
5. **Context analysis** — ambiguous matches are evaluated by the ContextAwareDetector using surrounding text
6. **Excellence detection** — positive patterns are identified in parallel
7. **Deduplication** — overlapping matches are resolved, preferring contextual matches and longer spans
8. **DOM highlighting** — matched text is wrapped in styled `<span>` elements with tooltip data
9. **Statistics** — match counts and a health score are computed and sent to the popup
10. **Mutation observation** — a MutationObserver watches for DOM changes and re-analyzes affected nodes

## Background Reading

- Bourland, D. David Jr. — "To Be or Not: An E-Prime Anthology" (foundational E-Prime text)
- Korzybski, Alfred — "Science and Sanity" (General Semantics, the theoretical root of E-Prime)
- Lakoff, George — "Metaphors We Live By" (how metaphorical framing shapes thought)
- Herman & Chomsky — "Manufacturing Consent" (media framing and propaganda models)
- Kahneman, Daniel — "Thinking, Fast and Slow" (cognitive biases in information processing)
- The Media Literacy Project — educational resources on recognizing bias in media

## License

This project is licensed under the [GNU General Public License v3.0](LICENSE.md).
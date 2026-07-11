# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the E-Prime Bias Detector, a browser extension that detects biased language patterns in web content using E-Prime principles and advanced linguistic analysis. The extension identifies 22 different types of linguistic patterns — 15 bias types plus seven "explainer" types that annotate contested terms (political spectrum labels, science & statistics phrases, political -isms, speech & civic terms, economic terms, media & truth terms, discourse concepts) with context — and includes an excellence detection system that highlights good writing practices.

## Development Commands

### Build Commands
- **Build Chrome**: `npm run build:chrome` - Builds Chrome extension to `/dist`
- **Build Firefox**: `npm run build:firefox` - Builds Firefox extension to `/dist-firefox`
- **Build All**: `npm run build:all` - Builds both Chrome and Firefox versions
- **Build (Default)**: `npm run build` - Builds Chrome extension for production
- **Watch Chrome**: `npm run watch:chrome` - Builds and watches Chrome version during development
- **Watch (Default)**: `npm run watch` - Alias for Chrome watch mode
- **Development**: `npm run dev` - Alias for watch mode

### Testing Commands
- **Test**: `npm test` - Run comprehensive test suite with Vitest
- **Test Coverage**: `npm run test:coverage` - Generate coverage reports
- **Test Watch**: `npm run test:watch` - Auto-run tests on file changes
- **Manual Testing**: Use test files in `tests/manual/` directory for browser testing
- **No linting/type checking**: This project does not have lint or typecheck commands configured

## Build System

The project uses a modern ES6 module architecture with esbuild for multi-target bundling:

### Multi-Target Support
- **Chrome Extension**: Uses Manifest V3, outputs to `/dist`
- **Firefox Extension**: Uses Manifest V2, outputs to `/dist-firefox`
- **Build Script**: `build.js` handles target selection, bundling, static file copying, and manifest updates
- **Target Selection**: `--target=chrome|firefox|all` parameter controls build output

### Build Configuration
- **Entry Point**: `src/content/content-script.js`
- **Chrome Output**: `dist/content.js` (Manifest V3)
- **Firefox Output**: `dist-firefox/content.js` (Manifest V2)
- **Source Maps**: Generated for debugging during development
- **Popup Bundle**: `src/popup/popup-dynamic.js` is bundled (with its BiasConfig/SettingsManager/PopupGenerator imports) to `{dist}/popup.js`; `popup.html` loads it as a plain script
- **Static Files**: Appropriate manifest, `popup.html`, `highlight-styles.css`, `info.html`, and `images/` copied to target directories
- **CSS Generation**: `styles.css` is dynamically generated from `BiasConfig.js` via `StyleGenerator.js` at build time
- **Reference Page**: `docs/reference.html` is generated from BiasConfig and all dictionaries via `ReferencePageGenerator.js` at build time (once, not per-target)

## Architecture

### Core Components

- **BiasDetector** (`src/content/BiasDetector.js`): Main detection engine that coordinates all bias detection
- **BiasConfig** (`src/config/BiasConfig.js`): Centralized configuration management for all bias types, categories, and settings
- **CustomDictionaryManager** (`src/config/CustomDictionaryManager.js`): User-defined detection groups (stored in `chrome.storage.local`, compiled like built-in dictionaries)
- **BiasPatterns** (`src/dictionaries/index.js`): Pattern compilation and management system
- **DOMProcessor** (`src/utils/DOMProcessor.js`): Handles DOM manipulation and text highlighting
- **ExcellenceDetector** (`src/utils/ExcellenceDetector.js`): Detects positive writing patterns and subject portrayal
- **ContextAwareDetector** (`src/utils/ContextAwareDetector.js`): Context-sensitive classification for ambiguous phrases
- **PopupManager** (`src/utils/PopupManager.js`): Singleton delegated event handler for highlight popups
- **HoverContentGenerator** (`src/utils/HoverContentGenerator.js`): Generates rich hover card HTML content
- **PerformanceMonitor** (`src/utils/PerformanceMonitor.js`): Tracks performance metrics
- **StyleGenerator** (`src/build/StyleGenerator.js`): Generates CSS from BiasConfig at build time
- **ReferencePageGenerator** (`src/build/ReferencePageGenerator.js`): Generates `docs/reference.html` pattern reference page at build time

### Source Structure

- `src/config/`: Configuration management
- `src/content/`: Content script logic and main detector
- `src/dictionaries/`: Pattern definitions for each bias type (22 dictionary files + index)
- `src/popup/`: Popup interface components (popup-dynamic.js entry; SettingsManager.js and PopupGenerator.js derive settings metadata and subcategory toggle markup from BiasConfig; StatsDisplay.js is **unused** — set aside, see its header note)
- `src/utils/`: Shared utilities and processors
- `src/build/`: Build-time utilities (StyleGenerator.js, ReferencePageGenerator.js)
- `docs/`: GitHub Pages site (index.html, reference.html, privacy.html)
- `dist/`: Built Chrome extension files (generated by build process)
- `dist-firefox/`: Built Firefox extension files (generated by build process)

### Detection Categories

The extension detects patterns in 5 main categories (22 types total, all enabled by default):
1. **Basic Detection**: Opinion words, to-be verbs, absolute statements
2. **Advanced Detection**: Passive voice, weasel words, presuppositions, probability perception
3. **Framing & Rhetoric**: War metaphors, minimizers, maximizers
4. **Manipulation Tactics**: False balance, euphemisms, emotional manipulation, gaslighting, false dilemmas
5. **Explainers**: Political spectrum labels, science & statistics phrases, political -isms, speech & civic terms, economic terms, media & truth terms, discourse concepts (contested terms explained, not judged — see "Explainer types" below). A hand-authored demo page for all explainers lives at `docs/explainers.html`

### Subcategory System

Thirteen types have subcategories — structured taxonomies that provide more specific detection and tailored guidance. Each subcategory has its own `icon`, `color`, `name`, `description`, `implication`, `suggestion`, `examples`, and `words` array in its dictionary file, plus `settingKey`, `statKey`, `basicTip`, `whenConcerning`, and `whenAcceptable` metadata in BiasConfig.

**Types with subcategories (72 total subcategories):**
1. **Opinion Words** (12): certainty, hedging, evaluative_positive, evaluative_negative, emotional_charge, comparative, political_framing, intensifiers, credibility_undermining, loaded_political, moral_judgments, emotional_appeals
2. **Euphemisms** (7): political_euphemism, corporate_euphemism, social_euphemism, military_euphemism, dysphemism, medical_euphemism, environmental_euphemism
3. **Emotional Manipulation** (6): fear_appeal, guilt_induction, flattery_manipulation, outrage_fuel, sympathy_exploitation, false_urgency
4. **Weasel Words** (5): unnamed_sources, hedged_evidence, vague_quantifiers, appeal_to_authority, passive_attribution
5. **Maximizers** (5): scale_inflation, catastrophizing, dramatic_verbs, superlative_hype, paradigm_shift
6. **Gaslighting** (5): reality_denial, emotional_invalidation, memory_manipulation, credibility_attack, deflection
7. **Political Spectrum Labels** (3): left_right, liberal, conservative — an *explainer* type (see below)
8. **Science & Statistics** (6): theory_proof, significance, causation, risk_scale, evidence_absence, purity — an *explainer* type (see below)
9. **Political -isms** (5): socialism, capitalism, fascism, populism, nationalism — an *explainer* type (see below)
10. **Speech & Civic Terms** (4): free_speech, censorship, rights, legal_standards — an *explainer* type (see below)
11. **Economic Terms** (4): inflation, deficit_debt, recession_economy, class_records — an *explainer* type (see below)
12. **Media & Truth Terms** (4): fake_news, misinfo_disinfo, conspiracy, narrative_media — an *explainer* type (see below)
13. **Discourse Concepts** (6): tolerance_paradox, slippery_slope, whataboutism, strawman_adhominem, overton_window, motte_bailey — an *explainer* type (see below)

**How subcategories flow through the code:**
- Dictionary files export a structured object (e.g., `euphemismWords`) with subcategory keys, plus a flat array (e.g., `euphemismsFlat`) for backward-compatible regex matching
- `BiasPatterns.getSubCategory(biasTypeId, word)` looks up which subcategory a matched word belongs to (generic — works for any type with subcategories)
- `BiasDetector.detectPatterns()` enriches matches with `matchData.subCategory` and changes `matchData.type` to `{parentId}_{subcategoryId}` (e.g., `euphemism_dysphemism`)
- `DOMProcessor` uses the parent type CSS class for styling but passes subcategory data via `data-sub-category` attribute
- `HoverContentGenerator` shows subcategory-specific names, implications, and suggestions in hover cards
- `BiasConfig.hasSubCategories(id)`, `getSubCategories(id)`, `getSubCategory(id, subId)`, `resolveType(compositeType)`, and `getCompositeType(parentId, subId)` provide generic subcategory metadata lookups
- `PopupGenerator` renders nested subcategory toggles under parent types
- Detection counts (including per-subcategory and custom-group counts) render as inline badges on each popup toggle row; badge element ids equal the stat keys (`updateStats`/`setInlineCount` in popup-dynamic.js)
- Legacy methods `getOpinionSubCategory(word)` and `getOpinionSubCategories()` are retained as deprecated wrappers

### Excellence Detection

The system also identifies positive writing patterns:
- Clear attribution with specific sources
- Nuanced language that acknowledges complexity
- Transparent communication about limitations
- Constructive discourse that encourages dialogue
- Evidence-based claims with data support

## Key Technical Details

- **Explainer types**: Types with `isExplainer: true` (currently `spectrum`, `scistats`, `isms`, `civics`, `econterms`, `epistemics`, and `debate`) annotate contested terms with history/context rather than flagging problems — hover cards show a neutral "Context" badge instead of a severity level, and tooltips avoid "Possible …" phrasing. Content must stay politically even-handed, subcategory colors must avoid partisan coding (no red/blue), and patterns should prefer precision over recall (regex sense-guards keep "the right to remain silent", "conservative estimate", "liberal arts" unmatched). Regex dictionary entries attribute to subcategories via the pattern-source fallback in `BiasDetector.detectPatterns`.
- **Pattern Compilation**: All regex patterns are pre-compiled for performance
- **Modular Design**: ES6 modules with proper imports/exports
- **Performance Optimized**: Batch processing with configurable batch size and mutation debouncing
- **Settings Management**: Centralized configuration with validation; all settings use `highlight*` naming convention
- **Context-Aware Detection**: Ambiguous phrases (e.g., "it seems", "studies show") are classified based on surrounding text context
- **Popup System**: Singleton PopupManager uses event delegation (single listener) instead of per-highlight listeners
- **Chrome Extension**: Manifest V3 with proper permissions and content scripts
- **Firefox Extension**: Manifest V2 with equivalent functionality
- **Analysis Modes**: Three modes - `problems`, `excellence`, or `balanced` (default)

## Development Guidelines

- All source code uses ES6 modules with proper imports/exports
- Configuration is centralized in `BiasConfig.js` to prevent conflicts
- Pattern dictionaries are separate files in `src/dictionaries/`
- Always run `npm run build:all` before testing extension changes
- Use `tests/manual/` directory for browser-based testing scenarios
- Follow the existing modular architecture when adding new features
- Popup UI is dynamically generated by `PopupGenerator.js` from `BiasConfig.js` — do not manually edit popup HTML for detector toggles
- Popup settings metadata (defaults, toggle/stat mappings, subcategory toggles) derives from `BiasConfig.js` via the bundled `SettingsManager`/`PopupGenerator` — there are no popup-side copies to keep in sync

## Extending the Extension

For detailed guidance on adding new bias types, excellence patterns, and categories, see `EXTENDING.md`. Key points:

- **New Bias Types**: Update `BiasConfig.js`, create pattern dictionary in `src/dictionaries/`, update `src/dictionaries/index.js` (popup defaults and toggles follow BiasConfig automatically; add the toggle row to `popup.html` and, for irregular IDs, `SettingsManager.getToggleId`)
- **New Patterns**: Add to appropriate dictionary file in `src/dictionaries/`
- **UI Changes**: Popup toggles are auto-generated from `BiasConfig.js` via `PopupGenerator.js`; modify `popup.html` only for layout changes
- **Categories**: Configure in `BiasConfig.js` with proper organization

## Testing

The project has a comprehensive automated test suite using Vitest. See `tests/README.md` for detailed testing documentation.

**Automated Testing:**
- **Unit tests**: Pattern matching, configuration validation, DOM processing, excellence detection, performance monitoring, context-aware detection
- **Integration tests**: End-to-end workflow testing, settings management, performance benchmarks
- **Test commands**: `npm test` (all tests), `npm run test:coverage` (with coverage)
- **Test framework**: Vitest (modern, fast, better than Jest for ES6 modules)
- **370+ tests** across 13 test files with high coverage (counts drift as tests are added; `npm test` reports the real number)

**Critical Implementation Notes:**
- **Settings property names**: Always use `highlight*` format (e.g., `highlightOpinion`, not `detectOpinionWords`)
- **DOM API safety**: Check method exists before calling (e.g., `element.removeAttribute && element.removeAttribute()`)
- **Error handling**: Use defensive error extraction: `error?.message ?? String(error)`
- **Settings state**: Disabled detectors must preserve zero stats during reanalysis
- **Performance tests**: Large document processing benchmarks
- **Data quality**: Dictionary validation and consistency checks
- **Debug logging**: Content-script logging is gated behind `BiasConfig.DEBUG` (default `false`); never add bare `console.log` to hot paths — wrap expensive log arguments in `if (BiasConfig.DEBUG)`
- **Global error events**: `content-script.js` deliberately ignores `error`/`unhandledrejection` events not attributable to the extension (page errors used to trigger full re-analysis loops); keep it that way

**Manual Testing:**
- HTML test files in `tests/manual/` directory
- Test on real websites by loading the extension in Chrome or Firefox
- Check browser console for errors during development
- Verify all bias types work correctly in popup settings
- Test performance with large documents

**Test Commands:**
- `npm test` - Run all tests
- `npm run test:coverage` - Coverage report  
- `npm run test:watch` - Auto-run on changes

## Browser Extension Loading

### Chrome Extension Loading
After building with `npm run build:chrome`:
1. Navigate to `chrome://extensions/`
2. Enable "Developer mode"
3. Click "Load unpacked" and select the `dist/` directory
4. The extension will be available in the browser toolbar

### Firefox Extension Loading
After building with `npm run build:firefox`:
1. Navigate to `about:debugging`
2. Click "This Firefox"
3. Click "Load Temporary Add-on"
4. Select the `dist-firefox/manifest.json` file
5. The extension will be available in the browser toolbar

## Important File Locations

- **Entry Point**: `src/content/content-script.js` - Main content script entry
- **Configuration**: `src/config/BiasConfig.js` - All bias types, categories, settings
- **Pattern Index**: `src/dictionaries/index.js` - Compiled patterns export
- **Build Output**: `dist/content.js` - Bundled content script
- **Extension Files**: All files in `dist/` after building
- **Extension Guide**: `EXTENDING.md` - Detailed extension procedures
- **Popup Script**: `src/popup/popup-dynamic.js` - Popup entry point (bundled to `popup.js`; settings metadata from BiasConfig)
- **Style Generator**: `src/build/StyleGenerator.js` - Build-time CSS generation
- **Reference Generator**: `src/build/ReferencePageGenerator.js` - Build-time pattern reference page
- **Highlight Styles**: `src/highlight-styles.css` - Static highlight CSS
- **GitHub Pages**: `docs/` - Site with index, reference, and privacy pages
- **Test Files**: `tests/unit/`, `tests/integration/`, `tests/manual/`
# Runtime Behavior Guide

How the E-Prime Bias Detector works at runtime: message flow, toggle behavior, refresh/clear lifecycle, and the mutation observer system.

## Message Flow: Popup ↔ Content Script ↔ BiasDetector

The popup (`popup-dynamic.js`) communicates with the content script (`content-script.js`) via `chrome.runtime.sendMessage` / `chrome.tabs.sendMessage`. The content script delegates to `BiasDetector` and responds with stats.

```
Popup UI
  │
  ├─ Toggle changed ──→ chrome.storage.sync.set() + sendMessage({ action: 'updateSettings', settings })
  │                        │
  │                        └─→ content-script.js handleUpdateSettings()
  │                              │
  │                              └─→ BiasDetector.updateSettings(validated)
  │                                    │
  │                                    ├─ enableAnalysis changed? → full clear or full re-analyze
  │                                    └─ individual toggle changed? → handleDetectorChanges()
  │                                          │
  │                                          ├─ Bias type disabled → removeSpecificHighlights(id)
  │                                          ├─ Bias type enabled → full re-analyze
  │                                          ├─ Excellence type disabled → removeExcellenceHighlights(id)
  │                                          └─ Excellence type enabled → full re-analyze
  │
  ├─ Refresh button ──→ sendMessage({ action: 'forceAnalyze' })
  │                        │
  │                        └─→ handleForceAnalyze()
  │                              ├─ disconnectObserver()
  │                              ├─ clearHighlights()
  │                              ├─ settings.enableAnalysis = true (persisted to storage)
  │                              ├─ forceAnalyze() → full analyzeDocument()
  │                              └─ setupMutationObserver()
  │
  ├─ Clear button ────→ sendMessage({ action: 'clearHighlights' })
  │                        │
  │                        └─→ handleClearHighlights()
  │                              ├─ disconnectObserver()
  │                              ├─ clearHighlights()
  │                              └─ settings.enableAnalysis = false (persisted to storage)
  │
  └─ Stats polling ───→ sendMessage({ action: 'getStats' }) every 2 seconds
                           │
                           └─→ returns biasDetector.getStats() snapshot
```

## Toggle Behavior

### Individual Bias Type Toggles

When a user flips a bias toggle (e.g., "Opinion Words" off):

1. Popup saves to `chrome.storage.sync` and sends `updateSettings`
2. `BiasDetector.updateSettings()` compares old vs new settings
3. `handleDetectorChanges()` detects the change
4. For the disabled type: observer disconnects → `DOMProcessor.removeSpecificHighlights(id)` removes highlights matching `.bias-highlight-{id}` → stat zeroed → observer reconnects
5. For re-enabled types: a full re-analysis runs via `analyzeDocumentPreservingDisabled()`

### Individual Excellence Type Toggles

Same flow, but uses `DOMProcessor.removeExcellenceHighlights(id)` which targets `.excellence-{id}` class selectors instead of `.bias-highlight-{id}`.

### Key Detail: Why Two Remove Methods?

Bias highlights use class `bias-highlight-{type}` (e.g., `bias-highlight-opinion`). Excellence highlights use class `excellence-{type}` (e.g., `excellence-nuance`). The CSS prefix differs, so `removeSpecificHighlights` and `removeExcellenceHighlights` build different selectors.

## Refresh and Clear Lifecycle

### Refresh ("Refresh Analysis" button)

1. Popup disables button, shows "Analyzing..."
2. Content script **disconnects the mutation observer first** to prevent race conditions
3. Clears all existing highlights
4. **Re-enables analysis** (`enableAnalysis = true`) and persists to storage
5. Runs full `analyzeDocument()` on the page
6. Reconnects mutation observer
7. Returns stats; popup syncs the enable toggle to "on"

### Clear ("Clear Highlights" button)

1. Content script **disconnects the mutation observer first**
2. Clears all highlights and resets stats
3. **Disables analysis** (`enableAnalysis = false`) and persists to storage
4. Does NOT reconnect the mutation observer (analysis is off)
5. Returns stats; popup syncs the enable toggle to "off"

This means Clear and Refresh are effectively "disable" and "re-enable" for the entire analysis system.

## Mutation Observer

The mutation observer watches for DOM changes (new content loaded, SPA navigation, etc.) and re-analyzes only the changed nodes.

### Observer Lifecycle

- **Connected** when analysis is enabled and running
- **Disconnected** before any highlight manipulation (clear, remove specific, re-analyze) to prevent the observer from seeing our own DOM changes and triggering recursive analysis
- **Reconnected** after highlight manipulation completes

### Filtering

The observer skips:
- Our own highlight `<span>` elements (class prefix check)
- Popup elements (`.bias-popup`, `[data-e-prime-popup]`)
- Insignificant mutations (nodes with < 20 chars of text content)

### Debouncing

Mutations are debounced by `BiasConfig.PERFORMANCE.MUTATION_DEBOUNCE` (1000ms). Multiple rapid DOM changes are batched into a single re-analysis.

## Analysis Modes

The `analysisMode` setting controls what gets detected:

| Mode | Bias Detection | Excellence Detection |
|------|---------------|---------------------|
| `problems` | ✅ Yes | ❌ No |
| `excellence` | ❌ No | ✅ Yes |
| `balanced` | ✅ Yes | ✅ Yes |

Changing the mode triggers a full re-analysis via `sendSettingsToContentScript()`.

## Stats Flow

Stats are a flat object with keys like `opinionCount`, `toBeCount`, `attributionExcellenceCount`, etc. plus a `healthScore`.

- Updated incrementally as matches are found during `highlightMatches()`
- Reset to zero on full re-analysis (via `resetStats()`)
- Preserved for disabled detectors during `analyzeDocumentPreservingDisabled()` — both bias AND excellence types
- Polled by the popup every 2 seconds for display

## Highlight DOM Structure

Each detected match becomes a `<span>` with:
- **Class**: `bias-highlight-{type}` or `excellence-{type}`
- **Intensity class**: `bias-intensity-{1|2|3}` (optional)
- **Data attributes**: `data-tooltip-text`, `data-contextual`, `data-context-reasoning`, `data-confidence`, `data-sub-category`, `data-portrayal`

The `PopupManager` (singleton, event-delegated) handles hover/click interactions on these spans — no individual event listeners are attached per highlight.

## Initialization Sequence

1. `content-script.js` IIFE runs when DOM is ready
2. Creates `BiasDetector` instance (compiles all patterns)
3. Initializes `PopupManager` singleton
4. Sets up `chrome.runtime.onMessage` listener
5. Loads settings from `chrome.storage.sync`
6. If analysis enabled: waits 500ms, runs `analyzeDocument()`, sets up mutation observer

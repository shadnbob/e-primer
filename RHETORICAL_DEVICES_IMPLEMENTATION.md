# Bias Detector: New Rhetorical Devices Implementation

## Summary
I've successfully implemented two new bias detection categories for your Chrome extension:

1. **False Balance Markers** (Indigo highlights)
2. **Euphemisms/Dysphemisms** (Dark green highlights)

These have been added to a new "Rhetorical Devices" section in the popup UI.

## Changes Made

### 1. Content Script (content.js)
- Added new settings: `highlightFalseBalance` and `highlightEuphemism`
- Added new stats counters: `falseBalanceCount` and `euphemismCount`
- Created comprehensive dictionaries for both categories
- Updated all relevant functions to handle the new detection types

### 2. Dictionary Content

#### False Balance Markers (35+ phrases)
- **Direct balance phrases**: "both sides," "on one hand," "equally valid"
- **False equivalence markers**: "just as," "two schools of thought," "alternative facts"
- **Debate framing**: "controversial issue," "ongoing debate," "divisive issue"
- **Neutrality performance**: "to be fair," "playing devil's advocate"
- **Balance rhetoric**: "pros and cons," "strengths and weaknesses"

#### Euphemisms/Dysphemisms (70+ terms)
- **Political euphemisms**: "enhanced interrogation," "collateral damage," "regime change"
- **Corporate euphemisms**: "rightsizing," "negative growth," "workforce adjustment"
- **Social euphemisms**: "passed away," "economically disadvantaged," "differently abled"
- **Military euphemisms**: "surgical strike," "kinetic action," "soft targets"
- **Dysphemisms**: "death tax," "government takeover," "illegal aliens"
- **Medical euphemisms**: "therapeutic misadventure," "terminal illness"
- **Environmental euphemisms**: "climate change," "sustainable development"

### 3. Popup Interface (popup.html)
- Added new "Rhetorical Devices" collapsible section
- Added toggles for both new categories with color indicators
- Updated stats grid to show counts for new categories
- Added indigo and dark green color classes

### 4. Popup Logic (popup.js)
- Added event handlers for new toggles
- Updated settings management for new options
- Extended stats tracking and display
- Maintained backward compatibility

### 5. Styles (styles.css)
- Added `.bias-highlight-falsebalance` with indigo color scheme
- Added `.bias-highlight-euphemism` with dark green color scheme
- Included hover tooltips for both new highlight types

## Features

### Detection Logic
- **Context-aware**: Uses word boundaries to avoid false positives
- **Case-insensitive**: Detects variations in capitalization
- **Multi-word support**: Handles phrases like "both sides" and "enhanced interrogation"
- **Performance optimized**: Efficient regex patterns with proper escaping

### User Interface
- **Organized sections**: New "Rhetorical Devices" section groups related detections
- **Visual distinction**: Unique colors (indigo and dark green) for easy identification
- **Real-time stats**: Counters update immediately when toggling categories
- **Hover tooltips**: Clear labels when hovering over highlighted text

## Testing

I've created a test file (`test-rhetorical-devices.html`) that demonstrates:
- Various false balance phrases in different contexts
- Multiple types of euphemisms and dysphemisms
- Combined examples showing both categories
- Clear visual examples of the highlighting

## Next Steps

To add more categories from your list:

1. **Loaded Metaphors**: Disease metaphors, natural disasters, sports/competition
2. **Nominalizations**: Abstract nouns that hide actors
3. **Credibility Undermining**: Beyond current weasel words
4. **Emotional Manipulation**: Fear appeals, guilt triggers, flattery
5. **False Dilemma Indicators**: "either...or," "must choose between"
6. **Bandwagon Language**: "everyone is," "join millions who"
7. **Loaded Questions**: Patterns embedding assumptions
8. **Gaslighting Phrases**: "You're overreacting," "That never happened"

Each new category would follow the same pattern:
- Add dictionary in content.js
- Add settings and stats tracking
- Add UI toggle in popup.html
- Add highlight styles in styles.css
- Update all relevant functions

The extension now provides sophisticated detection of rhetorical manipulation techniques that go beyond simple word choice to identify structural bias in argumentation and framing.

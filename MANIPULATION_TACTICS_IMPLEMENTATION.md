# Bias Detector: Manipulation Tactics Implementation

## Summary
I've successfully implemented three new psychological manipulation detection categories for your Chrome extension:

1. **Emotional Manipulation** (Coral highlights)
2. **Gaslighting Phrases** (Maroon highlights)
3. **False Dilemmas** (Dark violet highlights)

These have been added to a new "Manipulation Tactics" section in the popup UI.

## Implementation Details

### 1. Emotional Manipulation (60+ patterns)
Detects phrases that exploit emotions to bypass rational thinking:

- **Fear Appeals**: "dangerous precedent," "slippery slope," "existential threat," "dire consequences"
- **Guilt Triggers**: "shame on," "how dare," "blood on your hands," "morally responsible"
- **Flattery Patterns**: "smart people like you," "educated readers understand," "discerning individuals"
- **Outrage Fuel**: "shocking revelation," "absolute outrage," "beyond the pale," "height of hypocrisy"
- **Sympathy Exploitation**: "think of the children," "vulnerable victims," "innocent lives"
- **Urgency Creation**: "act now," "before it's too late," "last chance," "now or never"

### 2. Gaslighting Phrases (50+ patterns)
Identifies language that undermines perception and creates doubt:

- **Reality Denial**: "that never happened," "you're imagining things," "distorting reality"
- **Minimizing Concerns**: "you're overreacting," "making a big deal," "being dramatic"
- **Memory Manipulation**: "you're misremembering," "that's not what was said," "memory is playing tricks"
- **Credibility Attacks**: "you're being paranoid," "too sensitive," "crazy to think"
- **Deflection Phrases**: "the real issue is," "what about," "you're missing the point"

### 3. False Dilemmas (45+ patterns)
Detects forced binary thinking that eliminates nuance:

- **Either/Or Constructions**: "either...or," "you're either with us or against us," "black or white"
- **Forced Choices**: "must choose between," "can't have both," "mutually exclusive"
- **Binary Framing**: "only two options," "no middle ground," "zero sum game"
- **Ultimatums**: "last chance," "take it or leave it," "now or never"
- **Exclusionary Language**: "if you're not," "anyone who doesn't," "neutrality is complicity"

## Key Features

### Visual Design
- **Coral** (rgba(255, 127, 80, 0.3)) for emotional manipulation
- **Maroon** (rgba(128, 0, 0, 0.3)) for gaslighting
- **Dark Violet** (rgba(148, 0, 211, 0.3)) for false dilemmas
- Clear hover tooltips for each type

### Integration
- Seamlessly integrated with existing 12 detection categories
- New "Manipulation Tactics" collapsible section in popup
- Real-time stats tracking for all three new types
- Maintains performance with efficient regex patterns

## Files Modified

### Core Logic (content.js)
- Added settings: `highlightEmotional`, `highlightGaslighting`, `highlightFalseDilemma`
- Added stats counters for each new type
- Created comprehensive dictionaries with 155+ total patterns
- Updated all detection and highlight management functions

### User Interface (popup.html)
- Added new "Manipulation Tactics" section
- Added toggles with color indicators
- Extended stats grid to show new counts
- Added coral, maroon, and darkviolet color classes

### Popup Logic (popup.js)
- Added event handlers for new toggles
- Extended settings management
- Updated stats tracking and display
- Maintained backward compatibility

### Styles (styles.css)
- Added highlight styles for three new types
- Included appropriate hover tooltips
- Maintained consistent visual design

## Testing Resources

Created `test-manipulation-tactics.html` with:
- Examples of each manipulation type
- Combined examples showing overlapping patterns
- Content warning for sensitive material
- Clear visual demonstration of highlighting

## Psychology Behind the Categories

### Emotional Manipulation
These patterns bypass logical thinking by triggering strong emotional responses. They're particularly effective because they:
- Create urgency that prevents careful consideration
- Exploit natural protective instincts (children, elderly)
- Use flattery to make readers feel special/intelligent
- Generate outrage that overrides critical thinking

### Gaslighting
These phrases systematically undermine confidence in one's own perception, making readers more susceptible to manipulation by:
- Denying documented events or statements
- Making people doubt their emotional responses
- Attacking memory and credibility
- Shifting focus away from valid concerns

### False Dilemmas
These eliminate nuanced thinking by forcing binary choices, which:
- Oversimplify complex issues
- Create artificial urgency
- Make compromise seem impossible
- Force alignment through exclusion

## Performance Considerations

With now 15 total detection categories, the extension maintains good performance through:
- Efficient regex patterns with proper word boundaries
- Single-pass detection for all patterns
- Optimized DOM manipulation
- Debounced mutation observers

## Next Steps

Remaining categories to implement:
1. **Loaded Metaphors** (beyond war): Disease, natural disasters, sports
2. **Nominalizations**: Abstract nouns that hide actors
3. **Credibility Undermining**: Beyond current weasel words
4. **Bandwagon Language**: "everyone is," "join millions who"
5. **Loaded Questions**: Embedding assumptions in questions

The extension now provides sophisticated detection of psychological manipulation tactics that can help users identify when content is trying to manipulate their emotions, perceptions, or decision-making processes.

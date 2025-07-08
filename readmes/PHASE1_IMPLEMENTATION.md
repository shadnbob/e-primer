# Phase 1 Implementation: Intensity Indicators & Hover Cards

## Overview
Phase 1 adds sophisticated visual hierarchy and educational hover cards to make bias detection more nuanced and informative.

## New Features

### 1. **Three-Level Intensity System**
Each bias is now classified by severity:

- **Level 1 (Mild)**: Subtle influence
  - Dotted underline
  - Reduced opacity (0.8)
  - Examples: "possibly," "might be," "seems"

- **Level 2 (Moderate)**: Clear bias
  - Solid underline
  - Medium opacity (0.9)
  - Examples: "clearly," "obviously," "certainly"

- **Level 3 (Severe)**: Strong manipulation
  - Thick solid underline
  - Full opacity
  - ⚠️ warning indicator
  - Examples: "absolutely," "undeniably," "blood on your hands"

### 2. **Rich Hover Cards**
Hovering over any bias for 0.3 seconds reveals:

- **Header**: Bias type + severity badge
- **Detected Phrase**: The exact biased text
- **Likely Intent**: Why writers use this technique
- **Psychological Effect**: How it impacts readers
- **Neutral Alternative**: More objective phrasing
- **Context**: Nearby biases that may work together

### 3. **Intelligent Positioning**
Hover cards automatically:
- Position above or below based on available space
- Adjust horizontally to stay on screen
- Animate smoothly for better UX
- Dismiss cleanly when mouse leaves

## Technical Implementation

### Enhanced Data Structure
```javascript
matches.push({
    index: match.index,
    length: match[0].length,
    text: match[0],
    type: 'emotional',
    intensity: intensity // NEW: 1, 2, or 3
});
```

### Intensity Calculation
```javascript
calculateIntensity(text, type) {
    const levels = this.dictionaries.intensityLevels[type];
    // Check severe → moderate → mild
    for (let level = 3; level >= 1; level--) {
        if (levels[level].some(phrase => text.includes(phrase))) {
            return level;
        }
    }
    return 2; // Default to moderate
}
```

### Visual Hierarchy CSS
```css
.bias-intensity-1 { 
    border-bottom: 2px dotted;
    opacity: 0.8;
}
.bias-intensity-2 { 
    border-bottom: 2px solid;
    opacity: 0.9;
}
.bias-intensity-3 { 
    border-bottom: 3px solid;
    opacity: 1;
}
.bias-intensity-3::before {
    content: "⚠";
    /* Warning indicator styling */
}
```

## Intent Mappings
Added psychological insights for each bias type:

- **Opinion**: "Presenting subjective view as fact"
- **Emotional**: "Bypassing rational thought through emotional triggers"
- **Gaslighting**: "Undermining confidence in perception and memory"
- **False Dilemma**: "Eliminating nuanced options to force agreement"
- **Absolute**: "Creating false certainty to strengthen argument"

## User Benefits

1. **Visual Clarity**: Instantly distinguish between mild stylistic choices and severe manipulation
2. **Educational Value**: Learn why certain language is problematic
3. **Practical Alternatives**: Get suggestions for more neutral phrasing
4. **Context Awareness**: See how multiple biases work together
5. **Non-Intrusive**: Cards appear only on deliberate hover

## Performance Considerations

- Hover cards use event delegation for efficiency
- 300ms delay prevents accidental triggers
- Single card instance to avoid memory leaks
- Smooth animations via CSS transitions

## Testing
Open `test-phase1-intensity.html` to see:
- All three intensity levels for each bias type
- Hover card functionality
- Combined examples showing interaction
- Visual hierarchy demonstration

## Next Phases Preview

**Phase 2**: Pattern Detection & Intent Analysis
- Detect co-occurring bias clusters
- Infer primary manipulation strategy
- Show relationships between biases

**Phase 3**: Document Profile & Visualization
- Overall manipulation score
- Bias heat maps
- Intent fingerprinting

**Phase 4**: Educational Features
- Detailed explanations
- Historical examples
- Resistance strategies

The extension now provides a much more nuanced understanding of bias, helping users not just detect problematic language, but understand its purpose and impact.

# Excellence Detection Integration Guide

## Quick Start

1. **Test the Prototype**
   - Open `test-excellence-prototype.html` in your browser
   - Try switching between modes (Problems Only, Excellence Only, Balanced)
   - Hover over highlighted text to see the detection reasons
   - Check the health score and statistics

2. **Integration Steps**

### Step 1: Add Excellence Styles
Add the contents of `src/excellence-styles.css` to your existing `styles.css`:
```bash
cat src/excellence-styles.css >> styles.css
```

### Step 2: Update Content Script
Add the ExcellenceDetector class to your `content.js`:

```javascript
// Add at the top of content.js after your existing classes
const excellenceDetector = new ExcellenceDetector();

// In your BiasDetector class, add a mode property:
this.mode = 'balanced'; // 'problems', 'excellence', or 'balanced'

// Update your detectBiases method:
detectBiases(text) {
    const biases = [];
    
    // Existing bias detection
    if (this.mode === 'problems' || this.mode === 'balanced') {
        // ... your existing bias detection code
        // Add intensity calculation for each match:
        biases.forEach(bias => {
            bias.intensity = excellenceDetector.calculateIntensity(bias.text, bias.type);
        });
    }
    
    // New excellence detection
    if (this.mode === 'excellence' || this.mode === 'balanced') {
        const excellenceMatches = excellenceDetector.findExcellence(text);
        biases.push(...excellenceMatches);
    }
    
    return biases;
}
```

### Step 3: Update Popup UI
Add mode selector to `popup.html`:

```html
<div class="mode-selector">
    <h4>Analysis Mode</h4>
    <label>
        <input type="radio" name="mode" value="problems" checked>
        <span>Problems Only</span>
    </label>
    <label>
        <input type="radio" name="mode" value="excellence">
        <span>Excellence Only</span>
    </label>
    <label>
        <input type="radio" name="mode" value="balanced">
        <span>Balanced View</span>
    </label>
</div>
```

### Step 4: Add Mode Switching Logic
In `popup.js`:

```javascript
// Add mode change handler
document.querySelectorAll('input[name="mode"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, {
                action: 'changeMode',
                mode: e.target.value
            });
        });
    });
});
```

## Features Implemented

### 1. **Excellence Detection**
- **Attribution**: Detects proper citations and sources
- **Nuance**: Finds language that acknowledges complexity
- **Transparency**: Identifies honest limitations and perspectives
- **Discourse**: Highlights constructive dialogue patterns
- **Evidence**: Recognizes data-backed claims

### 2. **Intensity Levels**
Each problematic pattern now has 3 intensity levels:
- Level 1 (Mild): Dotted underline, 60% opacity
- Level 2 (Moderate): Solid underline, 80% opacity  
- Level 3 (Severe): Thick underline, 100% opacity + warning icon

### 3. **Subject Portrayal**
Detects positive/negative framing:
- Green shadow for positive portrayal
- Red shadow for negative portrayal

### 4. **Document Health Score**
Calculates overall writing quality (0-100) based on:
- Ratio of excellence to problems
- Distribution of intensity levels
- Variety of excellence patterns used

## Customization Options

### Adding New Excellence Patterns
```javascript
excellenceDetector.excellencePatterns.custom = {
    name: 'Your Pattern Name',
    patterns: [
        /your regex patterns here/gi
    ],
    className: 'excellence-custom',
    tooltip: '✓ What this indicates',
    color: '#yourcolor'
};
```

### Adjusting Intensity Thresholds
```javascript
excellenceDetector.intensityLevels.yourType = {
    1: ['mild', 'words'],
    2: ['moderate', 'words'],
    3: ['severe', 'words']
};
```

### Modifying Portrayal Detection
```javascript
excellenceDetector.portrayalPatterns.positive.yourCategory = /pattern/gi;
excellenceDetector.portrayalPatterns.negative.yourCategory = /pattern/gi;
```

## Testing Your Integration

1. **Check Mode Switching**: Verify all three modes work correctly
2. **Test Hover Cards**: Ensure tooltips appear with proper information
3. **Verify Intensity**: Check that different severity levels display correctly
4. **Monitor Performance**: Use Chrome DevTools to ensure smooth operation
5. **Test on Various Sites**: Try news sites, blogs, academic papers

## Next Steps

1. **Fine-tune Patterns**: Adjust regex patterns based on testing
2. **Add User Preferences**: Let users customize which excellence types to detect
3. **Implement Scoring Weights**: Allow different importance for different patterns
4. **Create Tutorial**: Help users understand what makes writing excellent
5. **Export Reports**: Let users save their document analysis

## Troubleshooting

- **Patterns not matching**: Check regex flags (especially `i` for case-insensitive)
- **Performance issues**: Consider debouncing for large documents
- **Overlapping highlights**: Implement priority system for overlapping matches
- **False positives**: Refine patterns and add context checking

Remember to test thoroughly before deploying!

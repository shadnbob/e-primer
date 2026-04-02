# Extending the E-Prime Bias Detector

This guide explains how to extend the E-Prime Bias Detector with new bias detection types, features, and functionality.

## Table of Contents

- [Adding New Bias Types](#adding-new-bias-types)
- [Adding New Excellence Types](#adding-new-excellence-types)
- [Customizing Detection Patterns](#customizing-detection-patterns)
- [Adding New Categories](#adding-new-categories)
- [Modifying the UI](#modifying-the-ui)
- [Adding New Analysis Modes](#adding-new-analysis-modes)
- [Performance Considerations](#performance-considerations)

## Adding New Bias Types

The extension uses a centralized configuration system. To add a new bias type:

### 1. Update BiasConfig.js

Add your new bias type to `src/config/BiasConfig.js`:

```javascript
// In BIAS_TYPES object
NEW_BIAS_TYPE: {
    id: 'newbias',                                    // Unique identifier
    name: 'New Bias Type',                           // Display name
    description: 'Description of what this detects', // Tooltip description
    category: 'advanced',                            // Category: basic, advanced, framing, manipulation
    color: '#ff6b35',                               // Highlight color (hex)
    className: 'bias-highlight-newbias',            // CSS class name
    settingKey: 'highlightNewBias',                 // Settings storage key
    statKey: 'newBiasCount',                        // Statistics key
    enabled: false,                                 // Default enabled state
    tooltip: 'Short tooltip text',                  // Basic tooltip
    basicTip: 'Short tooltip text',                 // Same as tooltip
    whenConcerning: 'When this pattern is problematic',
    whenAcceptable: 'When this pattern is acceptable',
    lookFor: [
        'What to look for indicator 1',
        'What to look for indicator 2',
        'What to look for indicator 3',
        'What to look for indicator 4'
    ],
    examples: {
        problematic: [
            'example of problematic usage',
            'another problematic example'
        ],
        acceptable: [
            'example of acceptable usage',
            'another acceptable example'
        ]
    },
    contextualGuidance: {
        academic: 'Guidance for academic writing',
        news: 'Guidance for news articles',
        opinion: 'Guidance for opinion pieces',
        instructions: 'Guidance for instructional content'
    }
}
```

### 2. Create Pattern Dictionary

Create a new file `src/dictionaries/new-bias-patterns.js`:

```javascript
// Dictionary for new bias type patterns
export const newBiasPatterns = [
    'pattern1',
    'pattern2',
    'pattern3',
    // Add regex patterns as strings
    '\\b(specific|exact)\\s+pattern\\b'
];
```

### 3. Update Pattern Index

Add your dictionary to `src/dictionaries/index.js`:

```javascript
import { newBiasPatterns } from './new-bias-patterns.js';

export const PATTERN_DICTIONARIES = {
    // ... existing patterns
    newbias: newBiasPatterns
};
```

### 4. Build and Test

Run the build process:

```bash
npm run build
```

The system will automatically:
- Generate CSS for your new bias type
- Include patterns in the detection engine
- Generate popup UI toggles and statistics via `PopupGenerator.js`
- Wire up UI controls and event handlers

## Adding New Excellence Types

Excellence types follow a similar pattern but in the `EXCELLENCE_TYPES` section:

```javascript
// In BiasConfig.js EXCELLENCE_TYPES
NEW_EXCELLENCE: {
    id: 'newexcellence',
    name: 'New Excellence Type',
    description: 'What excellent practice this represents',
    className: 'excellence-newexcellence',
    settingKey: 'highlightNewExcellence',
    statKey: 'newExcellenceCount',
    enabled: true,
    color: '#28a745',                               // Green tones for excellence
    tooltip: 'Excellence tooltip',
    // ... similar structure to bias types
}
```

Create patterns in `src/dictionaries/new-excellence-patterns.js` and follow the same integration steps.

## Customizing Detection Patterns

### Pattern Types

The system supports several pattern types:

1. **Simple strings**: `'obviously'` - matches exact word
2. **Regex patterns**: `'\\b(always|never)\\b'` - matches with word boundaries
3. **Complex regex**: `'\\b(seem|appear)s?\\s+to\\s+be\\b'` - matches phrases with variations

### Pattern Best Practices

- Use word boundaries (`\\b`) to avoid partial matches
- Consider plural/singular forms: `'pattern(s)?'`
- Account for optional spacing: `'\\s+'` vs `'\\s*'`
- Test patterns thoroughly before deployment
- Keep patterns focused and specific

### Pattern Testing

Create test files in `tests/manual/` to validate your patterns:

```html
<!DOCTYPE html>
<html>
<head><title>New Bias Type Tests</title></head>
<body>
    <p>This sentence contains newbias pattern examples.</p>
    <p>This should not trigger: acceptable usage.</p>
    <p>This should trigger: problematic usage.</p>
</body>
</html>
```

## Adding New Categories

To add a new category:

### 1. Update BiasConfig Categories

```javascript
// In BiasConfig.js CATEGORIES
newcategory: {
    name: 'New Category',
    description: 'Description of this category',
    expanded: true,                    // Default expansion state
    order: 5                          // Display order
}
```

### 2. Update Popup HTML

Add a new category section:

```html
<div class="category-section" data-category="newcategory">
    <div class="category-header">
        <span>New Category</span>
        <span class="chevron">▼</span>
    </div>
    <div class="category-body">
        <!-- Bias type toggles go here -->
    </div>
</div>
```

### 3. Assign Bias Types

Set `category: 'newcategory'` for bias types that belong to this category.

## Modifying the UI

### Dynamic UI Generation

The UI is now dynamically generated from BiasConfig. The PopupGenerator class handles:

- Toggle creation and positioning
- Statistics display layout
- Color coordination
- Event handler setup

### Customizing Styles

Modify `src/build/StyleGenerator.js` to customize:

- Color schemes
- Hover effects  
- Animation styles
- Responsive behavior

### Adding UI Elements

For new UI components:

1. Add HTML structure to `popup.html`
2. Add event handlers to `src/popup/popup-dynamic.js`
3. Update CSS in static styles section
4. Test across different screen sizes

## Adding New Analysis Modes

The extension supports multiple analysis modes (problems, excellence, balanced):

### 1. Add Mode Configuration

```javascript
// In BiasConfig.js, add to mode definitions
newmode: {
    name: 'New Mode',
    description: 'Description of what this mode does',
    enabledByDefault: ['bias1', 'bias2'],          // Which types are enabled
    disabledByDefault: ['bias3', 'bias4']          // Which types are disabled
}
```

### 2. Update Mode Selector

Add radio button to popup.html:

```html
<div class="mode-option">
    <input type="radio" id="newmode" name="mode" value="newmode">
    <label for="newmode">New Mode</label>
</div>
```

### 3. Update Status Text

Add case to `updateStatusText()` function in popup-dynamic.js:

```javascript
case 'newmode':
    modeText = 'Description of what new mode does.';
    break;
```

## Performance Considerations

### Pattern Optimization

- **Pre-compile patterns**: All regex patterns are compiled at startup
- **Limit pattern complexity**: Avoid catastrophic backtracking
- **Use specific patterns**: Broad patterns slow down detection
- **Test with large documents**: Ensure patterns perform well at scale

### Detection Performance

- **Batch DOM updates**: The system batches DOM modifications
- **Debounce rapid changes**: Mutation observer debounces frequent updates
- **Cache compiled patterns**: Patterns are cached after first compilation
- **Monitor memory usage**: Large documents can consume significant memory

### Best Practices

1. **Profile new features**: Use browser dev tools to measure performance impact
2. **Test on real websites**: Validate performance on complex, real-world content
3. **Limit simultaneous detections**: Don't enable all bias types simultaneously for large documents
4. **Use performance monitoring**: The system includes built-in performance metrics

## Development Workflow

### 1. Development Setup

```bash
# Watch mode for development
npm run dev

# Build for testing
npm run build
```

### 2. Testing Process

1. Create test files in `test-files/`
2. Load extension in Chrome (`chrome://extensions/`)
3. Test on your HTML files and real websites
4. Check browser console for errors
5. Verify statistics update correctly
6. Test popup functionality

### 3. Debugging

- Use `console.log()` in content script for detection debugging
- Check Chrome extension console for popup errors
- Use browser dev tools to inspect highlighting
- Test performance with large documents

## Contributing Guidelines

### Code Style

- Use ES6 modules and modern JavaScript
- Follow existing naming conventions
- Add JSDoc comments for new functions
- Maintain consistent indentation
- Use meaningful variable names

### Documentation

- Update this file when adding new extension points
- Document complex regex patterns
- Include examples for new bias types
- Update CLAUDE.md if architecture changes

### Testing

- Test new features across multiple websites
- Verify backward compatibility
- Check popup UI in different browser zoom levels
- Test with various content types (social media, news, academic)

This architecture makes the E-Prime Bias Detector highly extensible while maintaining performance and code quality. The centralized configuration system ensures consistency and makes adding new detection types straightforward.
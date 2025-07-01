# E-Primer Advanced Features Implementation

## 🚀 New Bias Detection Categories Added

### 1. **Passive Voice Detection** (Purple)
- Detects when agency is obscured ("Mistakes were made")
- Identifies common passive constructions
- Helps readers notice when responsibility is hidden

### 2. **Weasel Words** (Gold/Dark Goldenrod)
- Highlights vague attributions ("Many people say", "Studies show")
- Catches phrases that avoid specificity
- Reveals when claims lack concrete sources

### 3. **Presupposition Markers** (Deep Pink)
- Identifies loaded assumptions ("Even X admits", "Still refuses")
- Shows hidden premises in statements
- Helps readers spot manipulative framing

### 4. **War Metaphors** (Crimson)
- Detects militaristic language in non-military contexts
- Highlights conflict framing ("battle", "attack", "defend")
- Shows when issues are unnecessarily framed as combat

### 5. **Minimizers** (Teal)
- Identifies language that downplays importance
- Words like "just", "only", "merely", "slightly"
- Reveals attempts to diminish significance

### 6. **Maximizers** (Orange-Red)
- Detects exaggeration and hyperbole
- Words like "massive", "crisis", "disaster", "unprecedented"
- Shows when language inflates importance

## 📊 Enhanced UI Features

### Organized Categories
- **Basic Detection**: Opinion, To-Be, Absolutes (enabled by default)
- **Advanced Detection**: Passive, Weasel, Presupposition 
- **Framing & Rhetoric**: Metaphors, Minimizers, Maximizers

### Improved Stats Display
- 3x3 grid showing all 9 detection types
- Real-time count updates
- Persistent stats between popup opens

### Visual Enhancements
- Collapsible sections for better organization
- Color-coded indicators for each bias type
- Smooth animations and transitions
- Professional, modern design

## 🧪 Testing

### Test Files Created
1. **test.html** - Basic functionality test
2. **test-advanced.html** - Comprehensive test of all features

### How to Test
1. Reload the extension in Chrome
2. Open `test-advanced.html`
3. Try each category section:
   - Enable/disable individual detectors
   - Watch stats update in real-time
   - Test the refresh functionality
   - Add dynamic content to test mutation observer

## 🎨 Color Scheme
- **Orange**: Opinion words
- **Blue**: To-be verbs (E-Prime)
- **Pink**: Absolute statements
- **Purple**: Passive voice
- **Gold**: Weasel words
- **Deep Pink**: Presuppositions
- **Crimson**: War metaphors
- **Teal**: Minimizers
- **Orange-Red**: Maximizers

## 🔧 Technical Implementation

### Dictionary Improvements
- Regex patterns for passive voice detection
- Multi-word phrase detection for weasel words
- Context-aware presupposition patterns
- Comprehensive metaphor lists

### Performance Optimizations
- Efficient pattern matching
- Debounced mutation observer
- Selective reanalysis on toggle changes
- Text node normalization to prevent fragmentation

## 💡 Usage Tips

### For Readers
- Start with basic categories to get familiar
- Enable advanced detection for deeper analysis
- Use framing detection for political/news content
- Hover over highlights to see bias type

### For Critical Analysis
- Passive voice often hides responsibility
- Weasel words indicate weak sourcing
- Presuppositions reveal hidden biases
- Metaphors shape how we think about issues
- Min/maximizers manipulate perceived importance

## 🚦 Next Steps

### Potential Enhancements
1. **Export functionality** - Save analysis results
2. **Custom dictionaries** - Let users add their own patterns
3. **Domain-specific modes** - News, academic, political
4. **Detailed explanations** - Click for why something is biased
5. **Bias density meter** - Overall bias score per paragraph
6. **Suggestions** - Rewrite examples without bias

### Educational Features
- Tutorial mode for new users
- Examples of less biased alternatives
- Links to linguistic resources
- Practice exercises for bias detection

The extension now provides comprehensive bias detection across multiple linguistic dimensions, helping users become more critical readers and aware of subtle manipulation techniques in text.

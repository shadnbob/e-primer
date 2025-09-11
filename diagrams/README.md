# E-Prime Bias Detector - Architecture Diagrams

This directory contains comprehensive flow charts and architectural diagrams for the E-Prime Bias Detector Chrome extension. These diagrams visualize the system's structure, data flow, and user interactions.

## 📁 Diagram Files

### [01-system-architecture.md](./01-system-architecture.md)
**System Architecture Overview**
- Complete system component layout
- Module relationships and dependencies
- Chrome extension structure
- Data flow between major components

### [02-bias-detection-flow.md](./02-bias-detection-flow.md)
**Bias Detection Process Flow**
- Document analysis pipeline
- Pattern matching algorithms
- Text processing workflow
- Performance optimizations
- Error handling mechanisms

### [03-settings-management-flow.md](./03-settings-management-flow.md)
**Settings Management System**
- User settings lifecycle
- Chrome storage integration
- Settings validation process
- Real-time updates to content script
- Error recovery mechanisms

### [04-user-interaction-flow.md](./04-user-interaction-flow.md)
**User Experience Flows**
- User journey mapping
- Popup interface interactions
- Hover card system
- Settings change workflows
- Progressive disclosure design

### [05-data-structures.md](./05-data-structures.md)
**Data Structures & Schema**
- BiasConfig schema design
- Pattern matching data models
- Statistics and health scoring
- Settings configuration
- Performance monitoring structures

## 🎯 Key Architectural Insights

### **Modular Design**
The system is built with clear separation of concerns:
- **Configuration Layer**: Centralized settings and pattern management
- **Detection Engine**: Core bias detection and analysis
- **UI Layer**: Popup interface and user interactions
- **Storage Layer**: Chrome extension storage and persistence

### **Performance Architecture**
Optimized for real-time web page analysis:
- Pre-compiled regex patterns for efficiency
- Batch processing of DOM nodes
- Debounced updates to prevent UI lag
- Selective re-analysis based on setting changes

### **Extensible Pattern System**
Easy to add new bias types:
1. Add pattern dictionary in `src/dictionaries/`
2. Configure in `BiasConfig.js`
3. UI automatically updates to include new type
4. Hover system provides contextual information

### **User-Centered Design**
Progressive disclosure of complexity:
- Simple tooltips on hover
- Detailed information on click
- Advanced settings in popup
- Educational content throughout

## 🔄 Data Flow Summary

```
User Input → Settings → Chrome Storage → Content Script → BiasDetector
                ↓
Pattern Dictionaries → Compiled Regex → DOM Analysis → Matches
                ↓
Statistics ← DOM Updates ← Highlights ← Match Processing
                ↓
Popup UI ← Health Score ← Excellence Detection ← Hover Cards
```

## 🛠 Development Guidelines

### **Adding New Bias Types**
1. Create pattern dictionary file
2. Add to `BiasConfig.BIAS_TYPES`
3. Include examples and guidance
4. Update popup UI if needed
5. Add to type name mapping

### **Performance Considerations**
- Keep pattern dictionaries focused
- Test with large documents
- Monitor batch processing limits
- Consider regex complexity

### **Testing Approach**
- Use test files in `test-files/` directory
- Test with real websites
- Verify cross-browser compatibility
- Check performance metrics

## 📊 Metrics & Monitoring

The system includes comprehensive performance monitoring:
- Pattern compilation time
- Document analysis duration
- DOM manipulation performance
- Memory usage tracking
- Error rate monitoring

## 🎨 Visual Design Principles

### **Highlight Colors**
Each bias type has a unique color for easy recognition:
- Basic Detection: Orange, Blue, Pink
- Advanced Detection: Purple, Gold, Deep Pink, Royal Blue
- Framing & Rhetoric: Crimson, Teal, Orange Red, Indigo, Dark Green
- Manipulation: Coral, Maroon, Dark Violet

### **Excellence Colors**
Positive indicators use green-based colors:
- Attribution: Green
- Nuance: Light Green  
- Transparency: Green
- Discourse: Turquoise
- Evidence: Info Blue

## 🔮 Future Enhancements

The architecture supports future extensions:
- Machine learning integration
- Custom user patterns
- Multi-language support
- API integrations
- Advanced analytics

---

*These diagrams serve as both documentation and development reference for understanding and extending the E-Prime Bias Detector system.*
# E-Prime Bias Detector

A powerful browser extension that detects biased language in web content, helping users develop better critical reading skills and awareness of media bias.

## 🎯 Project Overview

The E-Prime Bias Detector analyzes web pages in real-time to identify:
- **Opinion words** (subjective language and loaded terms)
- **To-be verbs** (passive voice and weak writing)  
- **Absolute statements** (universal claims and extremes)

Based on the principles of E-Prime (English-Prime), a form of English that excludes forms of the verb "to be" to encourage more precise, active writing.

## ✨ Current Features

- **Real-time Analysis** - Automatically scans web content as it loads
- **Visual Highlighting** - Color-coded highlighting of different bias types
- **Bias Scoring** - Numerical bias score from 0-10
- **Toggle Controls** - Enable/disable different analysis types
- **Dynamic Content Support** - Works with modern SPAs and dynamically loaded content
- **Shadow DOM Compatibility** - Analyzes content in web components

## 🚀 Development Roadmap

The project is organized into 5 phases. Check the [Issues](https://github.com/shadnbob/e-primer/issues) for detailed tracking:

### 🧪 [Phase 1: Testing & Validation](https://github.com/shadnbob/e-primer/issues/1)
Thorough testing of the recent architecture refactor across different websites and edge cases.

### ✨ [Phase 2: Quick UX Wins](https://github.com/shadnbob/e-primer/issues/2)  
Immediate user experience improvements:
- Clear highlights button
- Word count context and bias density
- Browser badge with bias score
- Better visual feedback

### 🧠 [Phase 3: Advanced Analysis](https://github.com/shadnbob/e-primer/issues/3)
Enhanced bias detection algorithms:
- Context-aware detection (avoid quotes, code blocks)
- Sentiment analysis beyond opinion words
- Weighted bias scoring system
- New detection categories (emotional appeals, false urgency)

### 📊 [Phase 4: Data & Export Features](https://github.com/shadnbob/e-primer/issues/4)
Data management and reporting:
- Export analysis reports (PDF/HTML/JSON)
- Historical tracking and site comparison
- Custom word lists and whitelist/blacklist
- Reading level analysis and personal statistics

### 🚀 [Phase 5: Polish & Distribution](https://github.com/shadnbob/e-primer/issues/5)
Preparation for public release:
- Performance optimization and testing
- Professional UI/UX design
- Chrome Web Store preparation
- Comprehensive documentation

## 🛠️ Technical Architecture

### Core Components
- **`content.js`** - Main analysis engine with BiasDetector class
- **`popup.js`** - Extension popup interface and controls  
- **`popup.html`** - User interface markup and styling
- **`manifest.json`** - Extension configuration and permissions

### Key Technical Features
- Object-oriented architecture for maintainability
- Advanced DOM traversal including Shadow DOM support
- Mutation observer for dynamic content detection
- Chrome storage API for settings persistence
- Regex-based pattern matching with proper word boundaries

## 🎨 Visual Design

The extension uses color-coded highlighting:
- 🟠 **Orange** - Opinion words and subjective language
- 🔵 **Blue** - To-be verbs (E-Prime violations)
- 🟣 **Pink** - Absolute statements and universal claims

## 📦 Installation

### For Development
1. Clone this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode"
4. Click "Load unpacked" and select the project directory

### For Users (Coming Soon)
The extension will be available on the Chrome Web Store once Phase 5 is complete.

## 🤝 Contributing

This is an active development project! Check the [Issues](https://github.com/shadnbob/e-primer/issues) to see current priorities and ways to contribute.

### Development Workflow
1. Pick an issue from the current phase
2. Create a feature branch
3. Implement and test thoroughly
4. Submit a pull request with detailed description

## 📊 Project Status

**Current Phase:** Phase 1 (Testing & Validation)  
**Last Major Update:** Architecture refactor with improved DOM handling  
**Next Milestone:** Complete testing and move to Phase 2 UX improvements

## 🔍 Academic Background

This project is inspired by:
- **E-Prime** methodology developed by D. David Bourland Jr.
- Media literacy and critical thinking research
- Cognitive bias detection in written communication
- General Semantics principles

## 📄 License

[License to be determined in Phase 5]

## 🙏 Acknowledgments

- E-Prime methodology by D. David Bourland Jr.
- Modern web extension development practices
- Open source bias detection research

---

**Latest Update:** Major architecture refactor improving code organization, DOM handling, and Shadow DOM support. See recent commits for detailed changes.

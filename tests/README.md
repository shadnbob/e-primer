# Testing Guide

This directory contains the comprehensive test suite for the E-Prime Bias Detector Chrome extension.

## Quick Start

```bash
# Run all tests
npm test

# Watch mode (auto-run on file changes)
npm run test:watch

# Coverage report
npm run test:coverage

# Interactive UI
npm run test:ui
```

## Testing Framework

**Current:** Vitest with ES6 modules (modern, fast)
**Previous:** Jest with CommonJS (backup available via `npm run test:jest`)

### Why Vitest?

- ✅ **Native ES6 module support** - tests actual source files directly
- ✅ **2-3x faster** than Jest
- ✅ **Modern developer experience** with hot reload and UI
- ✅ **Better performance** with large test suites
- ✅ **Industry standard** for new projects

## Test Structure

```
tests/
├── unit/                    # Unit tests for individual components
│   ├── BiasConfig.test.js   # Configuration validation & data structure
│   ├── opinion-words.test.js # Dictionary quality & pattern matching
│   ├── pattern-matcher.test.js # Regex pattern creation & matching
│   ├── dom-highlighting.test.js # DOM manipulation & highlighting
│   └── pattern-matching.test.js # Basic pattern matching concepts
└── README.md               # This file
```

## Test Categories

### 📋 **Configuration Tests** (`BiasConfig.test.js`)
- **What:** Validates bias type definitions and data consistency
- **Tests:** Structure validation, color codes, required properties
- **Coverage:** 93% of BiasConfig.js

### 📖 **Dictionary Tests** (`opinion-words.test.js`)
- **What:** Quality assurance for word pattern dictionaries
- **Tests:** Duplicates, formatting, pattern effectiveness, real-world scenarios
- **Coverage:** 100% of opinion-words.js
- **Insights:** Documents cross-category word duplicates

### 🎯 **Pattern Matching Tests** (`pattern-matcher.test.js`)
- **What:** Core regex pattern creation and text matching
- **Tests:** Word boundaries, case sensitivity, multiple matches, performance
- **Coverage:** Custom pattern matching functions

### 🌐 **DOM Tests** (`dom-highlighting.test.js`)
- **What:** Browser DOM manipulation and text highlighting
- **Tests:** JSDOM-based DOM tree processing, element highlighting, edge cases
- **Coverage:** DOM manipulation utilities

## Real Source File Testing

**Key Advantage:** Tests import and validate actual source files, not duplicates.

```javascript
// ✅ Modern approach - tests real source
import { BiasConfig } from '../../src/config/BiasConfig.js';
import { opinionWords } from '../../src/dictionaries/opinion-words.js';

// ❌ Old approach - required duplicate .cjs files
const { BiasConfig } = require('../../src/config/BiasConfig.cjs');
```

## Data Quality Insights

Tests automatically validate:

- **Word consistency** (lowercase formatting, no duplicates within categories)
- **Cross-category analysis** (documents intentional word overlaps)
- **Color code validation** (hex format compliance)
- **Pattern effectiveness** (real-world headline testing)
- **Performance benchmarks** (large document processing)

### Current Data Quality Findings

- 5 words appear in multiple categories (documented, may be intentional):
  - `"superior"`: evaluative_positive, comparative
  - `"inferior"`: evaluative_negative, comparative  
  - `"corrupt"`: loaded_political, moral_judgments
  - `"dishonest"`: loaded_political, moral_judgments
  - `"unacceptable"`: evaluative_negative, moral_judgments

## Test-Driven Development

### Adding New Features

1. **Write failing test first** (describes desired behavior)
2. **Run test** - it should fail (RED)
3. **Write minimal code** to make test pass (GREEN)
4. **Refactor** while keeping tests green (REFACTOR)

Example workflow:
```javascript
// 1. Write test for new bias type
test('should detect war metaphors', () => {
  const text = 'We must fight this battle against misinformation';
  const matches = detectBias(text, 'war-metaphors');
  expect(matches).toContain('fight');
  expect(matches).toContain('battle');
});

// 2. Run test (fails)
// 3. Implement war metaphor detection
// 4. Test passes ✅
```

## Performance Testing

Tests include performance benchmarks:
- Large document processing (10k+ words)
- Memory leak detection
- Pattern compilation efficiency

**Current benchmarks:**
- Pattern matching: <100ms for 10k word documents
- DOM processing: <200ms for complex HTML structures

## Configuration

### Vitest Config (`vitest.config.js`)
- **Environment:** JSDOM for DOM testing
- **Coverage:** V8 provider with HTML reports
- **Globals:** Jest-style global functions (describe, test, expect)
- **Timeouts:** 10 second test timeout

### Coverage Targets
- **Aim for:** 80%+ coverage on core functionality
- **Current:** 100% on tested files, 93% on BiasConfig
- **Focus:** Quality over quantity - meaningful tests that catch real issues

## Common Patterns

### Testing Word Dictionaries
```javascript
test('should have valid word structure', () => {
  Object.values(dictionary).forEach(category => {
    category.words.forEach(word => {
      expect(typeof word).toBe('string');
      expect(word.length).toBeGreaterThan(0);
      expect(word).toBe(word.trim());
    });
  });
});
```

### Testing Pattern Matching
```javascript
test('should match whole words only', () => {
  const pattern = createWordPattern(['obviously']);
  
  expect(pattern.test('This is obviously wrong')).toBe(true);
  expect(pattern.test('The probability is low')).toBe(false);
});
```

### Testing DOM Manipulation
```javascript
test('should highlight bias words', () => {
  container.innerHTML = '<p>This is obviously wrong.</p>';
  highlightBias(container, ['obviously'], 'bias-highlight');
  
  const highlights = container.querySelectorAll('.bias-highlight');
  expect(highlights.length).toBe(1);
  expect(highlights[0].textContent).toBe('obviously');
});
```

## Debugging Tests

### Common Issues
- **Import errors:** Ensure file paths are correct and use `.js` extensions
- **JSDOM issues:** DOM tests need proper setup/cleanup in beforeEach/afterEach
- **Regex state:** Global regex patterns need `lastIndex = 0` reset between tests

### Debug Tools
```bash
# Run specific test file
npm test BiasConfig.test.js

# Debug mode with console output
npm run test:watch --reporter=verbose

# Coverage report with uncovered lines
npm run test:coverage
```

## Contributing

When adding new tests:

1. **Follow existing patterns** in similar test files
2. **Test edge cases** (empty inputs, invalid data, boundary conditions)
3. **Include performance tests** for functions processing large datasets
4. **Document any data quality issues** discovered
5. **Maintain test independence** (no shared state between tests)

## Migration History

- **Phase 1:** Manual testing with HTML files
- **Phase 2:** Jest with CommonJS workarounds (.cjs files)
- **Phase 3:** Vitest with native ES6 modules (current)

The Jest setup is preserved (`npm run test:jest`) for backward compatibility during transition period.
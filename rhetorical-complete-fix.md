# Complete Rhetorical Devices Dictionary Update

Replace the `falsebalance` and `euphemism` entries in content.js with these complete versions:

```javascript
        falsebalance: [
            // Direct balance phrases
            "both sides", "on one hand", "on the other hand", "equally valid",
            "two sides to every story", "balanced perspective", "middle ground",
            // False equivalence markers
            "just as", "alternative facts", "different truths", "competing narratives",
            // Debate framing
            "controversial issue", "ongoing debate", "two schools of thought",
            "divisive issue", "contentious matter", "polarizing topic",
            "hotly debated", "much debated", "disputed territory",
            // Neutrality performance
            "to be fair", "in fairness", "playing devil's advocate",
            "alternative viewpoints", "matter of opinion", "different perspectives",
            // Balance rhetoric
            "pros and cons", "strengths and weaknesses", "supporters and critics",
            "advantages and disadvantages", "benefits and drawbacks"
        ],

        euphemism: [
            // Military/Political euphemisms
            "enhanced interrogation", "collateral damage", "friendly fire", "extraordinary rendition",
            "kinetic action", "strategic withdrawal", "enhanced enforcement",
            "regime change", "surgical strike", "soft targets", "neutralize",
            "pacification", "police action", "conflict resolution",
            // Corporate euphemisms
            "rightsizing", "downsizing", "restructuring", "workforce adjustment",
            "negative growth", "challenging market conditions", "synergy realization",
            "offshoring", "outsourcing", "optimization", "streamlining",
            "let go", "between jobs", "transitioning",
            // Social euphemisms
            "passed away", "departed", "no longer with us", "passed on",
            "senior citizens", "golden years", "economically disadvantaged",
            "differently abled", "special needs", "physically challenged",
            "urban", "inner city", "at-risk", "underserved",
            // Medical euphemisms
            "therapeutic misadventure", "terminal illness", "growth", "mass",
            // Environmental euphemisms
            "climate change", "carbon neutral", "sustainable development",
            // Immigration euphemisms/dysphemisms
            "undocumented workers", "illegal aliens", "chain migration",
            // Political dysphemisms
            "death tax", "socialized medicine", "government takeover",
            "nanny state", "job killers", "tax and spend", "welfare state"
        ],
```

## Summary of All Patterns Added

### False Balance (30 patterns total):
- Original: 10 patterns
- Added: 20 patterns
- Now includes false equivalence markers, debate framing, and balance rhetoric

### Euphemisms/Dysphemisms (50+ patterns total):
- Original: 11 patterns  
- Added: 40+ patterns
- Now includes military, corporate, social, medical, and environmental euphemisms

## Testing

After updating content.js with these patterns:
1. Reload the extension
2. Open `test-rhetorical-devices.html`
3. Enable both toggles in the Rhetorical Devices section
4. All bolded phrases should now be highlighted

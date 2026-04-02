# Chrome Web Store Listing

Reference document for submitting E-Prime Bias Detector to the Chrome Web Store.

## Extension Name

E-Prime Bias Detector

## Short Description (132 char max)

Highlights biased language in web content — opinion as fact, vague sourcing, absolutes — and shows what quality writing looks like.

## Detailed Description

Most written content uses language that quietly shapes how you interpret information. A sentence like "everyone knows this policy is a disaster" contains an absolute claim, an opinion word presented as fact, and no source attribution. It feels authoritative but says nothing verifiable.

E-Prime Bias Detector makes these patterns visible. It runs on every web page, highlighting words and phrases that signal potential bias — and also highlighting markers of quality, well-sourced writing. The goal is sharper reading, not prescribed conclusions.

WHAT IT DETECTS

The extension analyzes text across 15 detection categories organized into four groups:

Basic Detection: opinion words and subjective language, to-be verbs (based on E-Prime linguistics), and absolute statements like "everyone," "always," and "never."

Advanced Detection: passive voice that hides responsibility, weasel words and vague attribution ("experts say," "studies show"), presupposition markers that smuggle in hidden assumptions, and probability language that distorts risk perception.

Framing & Rhetoric: war metaphors applied to non-military topics, minimizers that downplay significance, and maximizers that exaggerate beyond evidence.

Manipulation Tactics: false balance between unequal positions, euphemisms that obscure harsh realities, emotional manipulation, gaslighting language, and false dilemmas.

WHAT MAKES IT DIFFERENT

Most bias detection tools just flag problems. This extension also detects quality writing through its Excellence Detection system — clear attribution with named sources and dates, nuanced language that acknowledges complexity, transparency about limitations, constructive discourse, and evidence-based claims with specific data.

Click any highlighted word to see a detailed popup explaining why it was flagged, when the usage is concerning, when it's acceptable, what to look for in context, and examples of both problematic and acceptable usage. The extension doesn't tell you something is wrong — it gives you the information to decide for yourself.

HOW TO USE

The extension runs automatically on every web page. Use the toolbar popup to toggle individual detection categories on and off, switch between analysis modes (problems only, excellence only, or balanced), and view statistics for the current page. Right-click any highlight to remove it.

Built on E-Prime principles from D. David Bourland Jr. and Alfred Korzybski's General Semantics.

PRIVACY

This extension collects no data. All analysis happens locally in your browser. No network requests, no analytics, no tracking. Only your preference settings are stored locally. Full privacy policy: https://shadnbob.github.io/e-primer/privacy.html

Open source: https://github.com/shadnbob/e-primer

## Category

Productivity

## Language

English

## Single Purpose Description

Highlights biased language patterns in web page text and identifies markers of quality writing to help users develop critical reading skills.

## Permission Justifications

### activeTab
Required to read the text content of the currently active web page for real-time language pattern analysis and highlighting.

### scripting
Required to inject the content script that performs text analysis and applies visual highlights to detected patterns on web pages.

### storage
Required to persist user preference settings (which detection categories are enabled, analysis mode selection) locally across browser sessions.

## Privacy Practices

### Data Use Certifications
- Does NOT sell user data to third parties
- Does NOT use or transfer user data for purposes unrelated to the extension's core functionality
- Does NOT use or transfer user data for creditworthiness or lending purposes

### Data Collection
- The extension does NOT collect any personally identifiable information
- The extension does NOT collect browsing history
- The extension does NOT collect website content
- The extension stores only user preference settings locally via chrome.storage.local

## Graphics Needed

### Store Icon
- 128x128 px — use existing images/icon128.png

### Screenshots (1280x800 or 640x400)
Suggested screenshots:
1. Extension highlighting bias patterns on a news article
2. Click-popup showing detailed analysis for a highlighted word
3. The toolbar popup showing toggle controls and statistics
4. Excellence detection highlighting quality writing
5. Multiple bias types visible on a single page

### Small Promo Tile
- 440x280 px — needs to be created

### Marquee Promo Tile (optional)
- 1400x560 px — needs to be created

## Privacy Policy URL

https://shadnbob.github.io/e-primer/privacy.html

## Website URL

https://shadnbob.github.io/e-primer/

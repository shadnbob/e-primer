const { BiasConfig } = require('../config/BiasConfig.js');
const { ExcellenceDetector } = require('../utils/ExcellenceDetector.js');

const dictionaries = {
    opinion: require('../dictionaries/opinion-words.js').opinionWords,
    euphemism: require('../dictionaries/euphemisms.js').euphemismWords,
    emotional: require('../dictionaries/emotional-triggers.js').emotionalTriggerWords,
    weasel: require('../dictionaries/weasel-phrases.js').weaselWords,
    maximizer: require('../dictionaries/maximizers.js').maximizerWords,
    gaslighting: require('../dictionaries/gaslighting.js').gaslightingWords
};

const flatDictionaries = {
    tobe: require('../dictionaries/tobe-verbs.js').toBeVerbs,
    absolute: require('../dictionaries/absolute-words.js').absoluteWords,
    passive: require('../dictionaries/passive-patterns.js').passivePatterns,
    presupposition: require('../dictionaries/presupposition-markers.js').presuppositionMarkers,
    metaphor: require('../dictionaries/war-metaphors.js').warMetaphors,
    minimizer: require('../dictionaries/minimizers.js').minimizers,
    falsebalance: require('../dictionaries/false-balance.js').falseBalancePhrases,
    falsedilemma: require('../dictionaries/false-dilemma.js').falseDilemmaPhrases,
    probability: require('../dictionaries/probability-language.js').probabilityLanguage
};

class ReferencePageGenerator {
    generate() {
        const categories = BiasConfig.CATEGORIES;
        const biasTypes = BiasConfig.BIAS_TYPES;
        const excellenceTypes = BiasConfig.EXCELLENCE_TYPES;

        const categoryOrder = Object.entries(categories)
            .sort((a, b) => a[1].order - b[1].order);

        let categorySections = '';
        let tocItems = '';
        for (const [catId, catConfig] of categoryOrder) {
            const typesInCategory = Object.values(biasTypes)
                .filter(t => t.category === catId);
            if (typesInCategory.length === 0) continue;
            categorySections += this.renderCategory(catId, catConfig, typesInCategory);
            tocItems += this.renderTocCategory(catId, catConfig, typesInCategory);
        }

        tocItems += `<a href="#excellence" class="toc-item toc-cat">Excellence Detection</a>\n`;
        for (const t of Object.values(excellenceTypes)) {
            tocItems += `<a href="#exc-${this.slug(t.name)}" class="toc-item toc-type" style="border-left-color: ${t.color || '#28a745'}">${this.esc(t.name)}</a>\n`;
        }

        const excellenceSection = this.renderExcellenceSection(excellenceTypes);

        let totalWords = 0;
        let totalSubcategories = 0;
        for (const config of Object.values(biasTypes)) {
            if (config.subCategories) {
                const dict = dictionaries[config.id];
                if (dict) {
                    totalSubcategories += Object.keys(config.subCategories).length;
                    for (const sub of Object.values(dict)) {
                        totalWords += sub.words ? sub.words.length : 0;
                    }
                }
            } else {
                const flat = flatDictionaries[config.id];
                if (flat) totalWords += this.expandFlatPatterns(flat).length;
            }
        }

        return this.renderPage(categorySections, excellenceSection, tocItems, Object.values(biasTypes).length, totalSubcategories, totalWords);
    }

    slug(str) {
        return String(str).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }

    renderTocCategory(catId, catConfig, types) {
        let html = `<a href="#cat-${catId}" class="toc-item toc-cat">${this.esc(catConfig.name)}</a>\n`;
        for (const t of types) {
            html += `<a href="#type-${t.id}" class="toc-item toc-type" style="border-left-color: ${t.color}">${this.esc(t.name)}</a>\n`;
        }
        return html;
    }

    renderCategory(catId, catConfig, types) {
        const typeCards = types.map(t => this.renderBiasType(t)).join('\n');
        return `
        <section class="category" id="cat-${catId}">
            <h2>${this.esc(catConfig.name)}</h2>
            <p class="category-desc">${this.esc(catConfig.description)}</p>
            ${typeCards}
        </section>`;
    }

    renderBiasType(config) {
        const hasSubCats = config.subCategories && Object.keys(config.subCategories).length > 0;
        const dict = dictionaries[config.id];
        const flat = flatDictionaries[config.id];

        let wordsHtml = '';
        if (hasSubCats && dict) {
            wordsHtml = this.renderSubcategories(config, dict);
        } else if (flat) {
            const displayWords = this.expandFlatPatterns(flat);
            wordsHtml = `
            <div class="word-list">
                ${displayWords.map(w => `<span class="word">${this.esc(w)}</span>`).join(' ')}
            </div>`;
        }

        const wordCount = hasSubCats && dict
            ? Object.values(dict).reduce((n, s) => n + (s.words ? s.words.length : 0), 0)
            : (flat ? this.expandFlatPatterns(flat).length : 0);
        const subCount = hasSubCats ? Object.keys(config.subCategories).length : 0;

        const meta = subCount > 0
            ? `<span class="meta">${subCount} subcategories &middot; ${wordCount} patterns</span>`
            : `<span class="meta">${wordCount} patterns</span>`;

        return `
        <div class="bias-type" id="type-${config.id}" style="border-left-color: ${config.color}">
            <div class="bias-type-header">
                <h3>${this.esc(config.name)}</h3>
                ${meta}
            </div>
            <p class="description">${this.esc(config.description)}</p>
            ${wordsHtml}
        </div>`;
    }

    renderSubcategories(config, dict) {
        let html = '';
        for (const [subId, subMeta] of Object.entries(config.subCategories)) {
            const dictEntry = dict[subId];
            const words = dictEntry && dictEntry.words ? dictEntry.words : [];
            html += `
            <details class="subcategory" open>
                <summary class="subcategory-header">
                    <span class="sub-icon">${subMeta.icon}</span>
                    <strong style="color: ${subMeta.color}">${this.esc(subMeta.name)}</strong>
                    <span class="word-count">${words.length}</span>
                </summary>
                <p class="sub-description">${this.esc(subMeta.description)}</p>
                <div class="sub-guidance">
                    <span class="guidance-label concerning">When concerning:</span> ${this.esc(subMeta.whenConcerning)}<br>
                    <span class="guidance-label acceptable">When acceptable:</span> ${this.esc(subMeta.whenAcceptable)}
                </div>
                <div class="word-list">
                    ${words.map(w => `<span class="word">${this.esc(w)}</span>`).join(' ')}
                </div>
            </details>`;
        }
        return html;
    }

    renderExcellenceSection(configTypes) {
        const detector = new ExcellenceDetector();
        const detectorPatterns = detector.excellencePatterns;

        const cards = Object.values(configTypes).map(cfg => {
            const detEntry = detectorPatterns[cfg.id];
            const color = (detEntry && detEntry.color) || cfg.color || '#28a745';

            let patternsHtml = '';
            if (detEntry && detEntry.patterns) {
                const phrases = this.extractPhrases(detEntry.patterns);
                if (phrases.length > 0) {
                    patternsHtml = `
            <div class="word-list">
                ${phrases.map(p => `<span class="word">${this.esc(p)}</span>`).join(' ')}
            </div>`;
                }
            }

            let examplesHtml = '';
            if (cfg.examples && cfg.examples.excellent) {
                const items = Array.isArray(cfg.examples.excellent) ? cfg.examples.excellent : [cfg.examples.excellent];
                examplesHtml = `
            <div class="sub-guidance" style="margin: 12px 0 0;">
                <span class="guidance-label acceptable">Examples:</span>
                ${items.map(e => `<em>${this.esc(e)}</em>`).join(' &middot; ')}
            </div>`;
            }

            let lookForHtml = '';
            if (cfg.lookFor && cfg.lookFor.length > 0) {
                lookForHtml = `
            <div class="sub-guidance" style="margin: 8px 0 0;">
                <span class="guidance-label" style="color: var(--blue-gray);">Look for:</span>
                ${cfg.lookFor.map(l => this.esc(l)).join(' &middot; ')}
            </div>`;
            }

            const tip = cfg.basicTip || cfg.description;
            const patternCount = detEntry ? detEntry.patterns.length : 0;

            return `
        <div class="bias-type excellence-type" id="exc-${this.slug(cfg.name)}" style="border-left-color: ${color}">
            <div class="bias-type-header">
                <h3>${this.esc(cfg.name)}</h3>
                <span class="meta">${patternCount} patterns</span>
            </div>
            <p class="description">${this.esc(tip)}</p>
            ${patternsHtml}
            ${lookForHtml}
            ${examplesHtml}
        </div>`;
        }).join('\n');

        return `
        <section class="category excellence" id="excellence">
            <h2>Excellence Detection</h2>
            <p class="category-desc">Positive writing patterns that demonstrate clear, honest, evidence-based communication.</p>
            ${cards}
        </section>`;
    }

    expandFlatPatterns(patterns) {
        const results = [];
        for (const raw of patterns) {
            if (!/[\\([\]]/.test(raw)) {
                results.push(raw);
                continue;
            }

            let s = raw
                .replace(/\\s\+/g, ' ')
                .replace(/\\b/g, '');

            if (/\\w\+ed/.test(s)) {
                s = s.replace(/\\w\+ed/g, '___ed');
                results.push(s);
                continue;
            }

            const altMatch = s.match(/^(.*?)\(([^)]+)\)(.*)$/);
            if (altMatch) {
                const prefix = altMatch[1];
                const alts = altMatch[2].split('|');
                const suffix = altMatch[3];
                for (const alt of alts) {
                    let expanded = (prefix + alt + suffix).replace(/\s+/g, ' ').trim();
                    if (expanded && !results.includes(expanded)) {
                        results.push(expanded);
                    }
                }
                continue;
            }

            s = s.replace(/\s+/g, ' ').trim();
            if (s && !results.includes(s)) {
                results.push(s);
            }
        }
        return results;
    }

    extractPhrases(patterns) {
        const phrases = [];
        for (const regex of patterns) {
            const src = regex.source;
            const extracted = this.extractFromRegexSource(src);
            for (const p of extracted) {
                if (p.length >= 3 && !phrases.includes(p)) {
                    phrases.push(p);
                }
            }
        }
        return phrases;
    }

    extractFromRegexSource(src) {
        let s = src
            .replace(/\\b/g, '')
            .replace(/\\s\+/g, ' ')
            .replace(/\\s/g, ' ')
            .replace(/\\\./g, '.');

        const expanded = this.expandPattern(s);
        return expanded
            .map(p => p
                .replace(/\s+/g, ' ')
                .replace(/([a-z])#/g, '$1 #')
                .replace(/#\{4\}/g, '[year]')
                .replace(/\\[{}#\\]/g, '')
                .replace(/\s+/g, ' ')
                .trim()
            )
            .filter(p => p.length >= 3 && !/^[#.*?\s]+$/.test(p) && !/\\/.test(p));
    }

    expandPattern(s) {
        const groupStart = s.indexOf('(?:');
        if (groupStart === -1) {
            return [this.cleanLiteral(s)];
        }

        let depth = 0;
        let groupEnd = -1;
        for (let i = groupStart; i < s.length; i++) {
            if (s[i] === '(' && s.slice(i, i + 3) === '(?:') { depth++; i += 2; }
            else if (s[i] === '(') { depth++; }
            else if (s[i] === ')') { depth--; if (depth === 0) { groupEnd = i; break; } }
        }

        if (groupEnd === -1) return [this.cleanLiteral(s)];

        const prefix = s.slice(0, groupStart);
        const inner = s.slice(groupStart + 3, groupEnd);
        const suffix = s.slice(groupEnd + 1);

        const alts = this.splitTopLevelAlternations(inner);

        const results = [];
        for (const alt of alts) {
            const combined = prefix + alt + suffix;
            const sub = this.expandPattern(combined);
            results.push(...sub);
        }
        return results;
    }

    splitTopLevelAlternations(s) {
        const results = [];
        let depth = 0;
        let current = '';
        for (let i = 0; i < s.length; i++) {
            const ch = s[i];
            if (ch === '(') depth++;
            else if (ch === ')') depth--;
            if (ch === '|' && depth === 0) {
                results.push(current);
                current = '';
            } else {
                current += ch;
            }
        }
        if (current) results.push(current);
        return results;
    }

    cleanLiteral(s) {
        return s
            .replace(/\[[^\]]*\][*+?](?:\{[^}]*\})?/g, ' ... ')
            .replace(/\[[^\]]*\]\{[^}]*\}/g, ' ... ')
            .replace(/\[\\d,\]\+/g, '#')
            .replace(/\\d\+(?:\([^)]*\))?/g, '#')
            .replace(/\\w\+/g, '...')
            .replace(/\\w/g, '')
            .replace(/\\d/g, '#')
            .replace(/,\?/g, ',')
            .replace(/\+/g, '')
            .replace(/\*\s*/g, ' ')
            .replace(/\?/g, '')
            .replace(/[[\]()]/g, '')
            .replace(/\s+/g, ' ')
            .trim();
    }

    esc(str) {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    renderPage(categorySections, excellenceSection, tocItems, typeCount, subCount, wordCount) {
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pattern Reference &mdash; E-Prime Bias Detector</title>
    <meta name="description" content="Complete reference of all detection patterns, categories, and subcategories in the E-Prime Bias Detector.">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,600&family=DM+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400&display=swap" rel="stylesheet">
    <style>
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

        :root {
            --ink: #1a1a1a;
            --paper: #f6f4f0;
            --paper-warm: #eee9e0;
            --accent: #c44b2b;
            --accent-soft: #e8d5cc;
            --green: #2d7a4f;
            --green-soft: #d4e8dc;
            --blue-gray: #5a6b7a;
            --muted: #8a8078;
            --rule: #d4cfc7;
        }

        html { scroll-behavior: smooth; }

        body {
            font-family: 'DM Sans', sans-serif;
            color: var(--ink);
            background: var(--paper);
            line-height: 1.7;
            font-size: 17px;
            -webkit-font-smoothing: antialiased;
        }

        .page-header {
            background: var(--ink);
            color: var(--paper);
            padding: 60px 40px 48px;
        }

        .page-header-inner {
            max-width: 900px;
            margin: 0 auto;
        }

        .back-link {
            display: inline-block;
            margin-bottom: 32px;
            font-size: 14px;
            color: var(--accent);
            text-decoration: none;
        }

        .back-link:hover { text-decoration: underline; }

        .page-header h1 {
            font-family: 'Newsreader', serif;
            font-size: clamp(32px, 5vw, 48px);
            font-weight: 600;
            line-height: 1.15;
            margin-bottom: 12px;
            letter-spacing: -0.5px;
        }

        .page-header .subtitle {
            font-size: 18px;
            color: #a09a90;
            max-width: 600px;
            margin-bottom: 36px;
        }

        .stats-bar {
            display: flex;
            gap: 40px;
            flex-wrap: wrap;
        }

        .stat { text-align: left; }

        .stat-number {
            font-family: 'Newsreader', serif;
            font-size: 36px;
            font-weight: 600;
            line-height: 1;
        }

        .stat-label {
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 2px;
            color: var(--muted);
            margin-top: 4px;
        }

        .layout {
            display: grid;
            grid-template-columns: 220px 1fr;
            gap: 40px;
            max-width: 1100px;
            margin: 0 auto;
            padding: 40px 40px 80px;
            align-items: start;
        }

        .toc {
            position: sticky;
            top: 24px;
            max-height: calc(100vh - 48px);
            overflow-y: auto;
            padding-right: 12px;
        }

        .toc-label {
            font-size: 11px;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: var(--muted);
            font-weight: 600;
            margin-bottom: 12px;
        }

        .toc-item {
            display: block;
            text-decoration: none;
            font-size: 13px;
            color: var(--blue-gray);
            padding: 4px 0;
            transition: color 0.15s;
        }

        .toc-item:hover { color: var(--ink); }

        .toc-cat {
            font-weight: 600;
            color: var(--ink);
            margin-top: 14px;
            font-size: 14px;
        }

        .toc-cat:first-child { margin-top: 0; }

        .toc-type {
            padding-left: 14px;
            border-left: 2px solid var(--rule);
        }

        .toc-type:hover { border-left-color: var(--ink); }

        .content { min-width: 0; }

        .category {
            margin-bottom: 48px;
        }

        .category > h2 {
            font-family: 'Newsreader', serif;
            font-size: 26px;
            font-weight: 600;
            margin-bottom: 4px;
            padding-bottom: 10px;
            border-bottom: 2px solid var(--rule);
            letter-spacing: -0.3px;
        }

        .category.excellence > h2 { border-bottom-color: var(--green); }

        .category-desc {
            color: var(--blue-gray);
            margin-bottom: 24px;
            font-size: 15px;
        }

        .bias-type {
            background: white;
            border-radius: 10px;
            border-left: 4px solid var(--rule);
            padding: 24px;
            margin-bottom: 20px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03);
        }

        .bias-type-header {
            display: flex;
            align-items: baseline;
            gap: 12px;
            margin-bottom: 6px;
            flex-wrap: wrap;
        }

        .bias-type-header h3 {
            font-size: 18px;
            font-weight: 600;
        }

        .meta {
            font-size: 13px;
            color: var(--muted);
        }

        .description {
            color: var(--blue-gray);
            margin-bottom: 16px;
            font-size: 15px;
        }

        .subcategory {
            background: var(--paper);
            border: 1px solid var(--rule);
            border-radius: 8px;
            margin-bottom: 12px;
            overflow: hidden;
        }

        .subcategory[open] { padding-bottom: 16px; }

        .subcategory-header {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 12px 16px;
            cursor: pointer;
            list-style: none;
            user-select: none;
        }

        .subcategory-header::-webkit-details-marker { display: none; }

        .subcategory-header::before {
            content: '\\25B8';
            font-size: 11px;
            color: var(--muted);
            transition: transform 0.15s;
        }

        .subcategory[open] > .subcategory-header::before {
            transform: rotate(90deg);
        }

        .sub-icon { font-size: 16px; }

        .word-count {
            font-size: 11px;
            background: var(--rule);
            color: var(--blue-gray);
            padding: 2px 8px;
            border-radius: 10px;
            margin-left: auto;
            font-weight: 500;
        }

        .sub-description {
            color: var(--blue-gray);
            font-size: 14px;
            margin: 0 16px 10px;
        }

        .sub-guidance {
            font-size: 13px;
            color: var(--blue-gray);
            margin: 0 16px 12px;
            line-height: 1.8;
        }

        .guidance-label {
            font-weight: 600;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .guidance-label.concerning { color: var(--accent); }
        .guidance-label.acceptable { color: var(--green); }

        .word-list {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            margin: 0 16px;
        }

        .bias-type > .word-list { margin: 0; }

        .word {
            background: var(--paper-warm);
            padding: 3px 10px;
            border-radius: 4px;
            font-size: 13px;
            font-family: 'JetBrains Mono', monospace;
            color: var(--ink);
            white-space: nowrap;
        }

        .excellence-type { border-left-color: var(--green); }

        .excellence-type h3 { color: var(--green); }

        .site-footer {
            padding: 48px 40px;
            background: var(--ink);
            color: #706a60;
            text-align: center;
            font-size: 14px;
        }

        .site-footer a {
            color: var(--accent);
            text-decoration: none;
        }

        .site-footer a:hover { text-decoration: underline; }

        .footer-links {
            display: flex;
            justify-content: center;
            gap: 32px;
            margin-bottom: 16px;
        }

        .footer-note {
            font-size: 12px;
            color: #5a554d;
            margin-top: 8px;
        }

        @media (max-width: 800px) {
            .layout {
                grid-template-columns: 1fr;
                padding: 24px 24px 60px;
            }
            .toc {
                position: static;
                max-height: none;
                display: flex;
                flex-wrap: wrap;
                gap: 4px 16px;
                padding-bottom: 16px;
                border-bottom: 1px solid var(--rule);
                margin-bottom: 8px;
            }
            .toc-label { width: 100%; }
            .toc-cat { margin-top: 4px; }
            .toc-type { padding-left: 8px; border-left-width: 1px; }
            .page-header { padding: 40px 24px 32px; }
            .stats-bar { gap: 24px; }
            .stat-number { font-size: 28px; }
        }

        @media (max-width: 480px) {
            .bias-type { padding: 16px; }
            .subcategory-header { padding: 10px 12px; }
            .sub-description, .sub-guidance, .word-list { margin-left: 12px; margin-right: 12px; }
        }
    </style>
</head>
<body>

<header class="page-header">
    <div class="page-header-inner">
        <a href="./" class="back-link">&larr; Back to E-Prime Bias Detector</a>
        <h1>Pattern Reference</h1>
        <p class="subtitle">Complete reference of every detection pattern, category, and subcategory &mdash; generated from source at build time.</p>
        <div class="stats-bar">
            <div class="stat"><div class="stat-number">${typeCount}</div><div class="stat-label">Bias Types</div></div>
            <div class="stat"><div class="stat-number">${subCount}</div><div class="stat-label">Subcategories</div></div>
            <div class="stat"><div class="stat-number">${wordCount}</div><div class="stat-label">Patterns</div></div>
        </div>
    </div>
</header>

<div class="layout">
    <nav class="toc">
        <div class="toc-label">On This Page</div>
        ${tocItems}
    </nav>
    <main class="content">
        ${categorySections}
        ${excellenceSection}
    </main>
</div>

<footer class="site-footer">
    <div class="footer-links">
        <a href="./">Home</a>
        <a href="https://github.com/shadnbob/e-primer">GitHub</a>
        <a href="https://github.com/shadnbob/e-primer/issues">Issues</a>
        <a href="privacy.html">Privacy</a>
    </div>
    <p>E-Prime Bias Detector &mdash; built to make language visible.</p>
    <p class="footer-note">Generated from BiasConfig.js and pattern dictionaries.</p>
</footer>

</body>
</html>`;
    }
}

module.exports = { ReferencePageGenerator };

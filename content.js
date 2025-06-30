// content.js
(function() {
    // Configuration
    const BiasDetector = {
        settings: {
            enableAnalysis: true,
            highlightOpinion: true,
            highlightToBe: true,
            highlightAbsolutes: true
        },
        
        previousSettings: {
            enableAnalysis: true,
            highlightOpinion: true,
            highlightToBe: true,
            highlightAbsolutes: true
        },
        
        stats: {
            opinionCount: 0,
            toBeCount: 0,
            absoluteCount: 0
        },
        
        observer: null,
        
        // Word dictionaries
        dictionaries: {
            opinion: [
                // Certainty/Conviction Adverbs
                "clearly", "obviously", "undoubtedly", "certainly", "definitely", "absolutely",
                "surely", "undeniably", "unquestionably", "indisputably", "indubitably", "unmistakably",
                "incontrovertibly", "incontestably", "irrefutably", "manifestly", "patently",

                // Hedging/Uncertainty Words
                "allegedly", "supposedly", "apparently", "evidently", "arguably", "seemingly",
                "ostensibly", "reportedly", "reputedly", "presumably", "purportedly", "possibly",
                "probably", "maybe", "perhaps", "conceivably", "speculated", "rumored",

                // Evaluative Adjectives (Positive)
                "good", "great", "excellent", "exceptional", "outstanding", "perfect", "flawless",
                "fantastic", "superb", "magnificent", "brilliant", "spectacular", "impressive",
                "remarkable", "extraordinary", "astonishing", "wonderful", "marvelous", "phenomenal",
                "terrific", "stunning", "amazing", "incredible", "fabulous", "splendid", "delightful",
                "admirable", "commendable", "praiseworthy", "exemplary", "stellar", "superior",
                "first-rate", "top-notch", "premium", "favorable", "positive", "satisfactory",
                "pleasing", "gratifying", "beneficial", "advantageous", "desirable", "worthy",

                // Evaluative Adjectives (Negative)
                "bad", "terrible", "awful", "horrible", "atrocious", "dreadful", "appalling",
                "abysmal", "poor", "inadequate", "inferior", "substandard", "mediocre", "disappointing",
                "unsatisfactory", "unacceptable", "deficient", "faulty", "flawed", "shoddy",
                "deplorable", "lamentable", "pathetic", "pitiful", "regrettable", "miserable",
                "wretched", "dismal", "grim", "bleak", "dire", "grave", "severe", "unfortunate",
                "unfavorable", "disagreeable", "unpleasant", "distressing", "troublesome",
                "problematic", "objectionable", "reprehensible", "repugnant", "detestable",

                // Emotionally Charged Words
                "shocking", "disturbing", "troubling", "encouraging", "inspiring", "outrageous",
                "scandalous", "infuriating", "frustrating", "irritating", "exasperating", "vexing",
                "heartwarming", "touching", "moving", "soothing", "comforting", "reassuring",
                "uplifting", "exhilarating", "thrilling", "exciting", "sensational", "delightful",
                "disgusting", "revolting", "sickening", "nauseating", "offensive", "frightening",
                "terrifying", "horrifying", "alarming", "worrying", "concerning", "threatening",

                // Comparative/Superlative Terms
                "best", "worst", "better", "worse", "superior", "inferior", "greater", "lesser",
                "bigger", "smaller", "higher", "lower", "finer", "poorer", "strongest", "weakest",
                "finest", "prettiest", "ugliest", "smartest", "dumbest", "brightest", "darkest",

                // Political/Controversial Framing
                "controversial", "disputed", "radical", "extreme", "progressive", "conservative",
                "liberal", "far-right", "far-left", "moderate", "centrist", "mainstream", "fringe",
                "revolutionary", "traditional", "conventional", "unconventional", "orthodox",
                "unorthodox", "establishment", "anti-establishment", "populist", "elitist",
                "partisan", "bipartisan", "divisive", "polarizing", "contentious", "provocative",

                // Intensifiers
                "very", "extremely", "incredibly", "exceptionally", "extraordinarily", "remarkably",
                "notably", "particularly", "especially", "surprisingly", "unusually", "strikingly",
                "decidedly", "markedly", "profoundly", "deeply", "vastly", "greatly", "highly",
                "immensely", "tremendously", "enormously", "exceedingly", "excessively", "overly",
                "utterly", "completely", "entirely", "totally", "wholly", "thoroughly", "fully",
                "intensely", "seriously", "substantially", "significantly", "considerably",

                // Credibility Undermining Words
                "claims", "purports", "asserts", "alleges", "contends", "maintains", "insists",
                "so-called", "self-proclaimed", "supposed", "pretend", "dubious", "questionable",
                "unproven", "unverified", "unsubstantiated", "unfounded", "baseless", "groundless",

                // Loaded Political Terms
                "freedom", "justice", "equality", "rights", "liberty", "democracy", "patriotic",
                "unpatriotic", "un-American", "socialist", "communist", "fascist", "dictatorial",
                "totalitarian", "authoritarian", "corrupt", "crooked", "dishonest", "shady",
                "illegal", "unlawful", "criminal", "scandal", "conspiracy", "regime", "propaganda",

                // Moral/Ethical Judgments
                "moral", "immoral", "ethical", "unethical", "virtuous", "corrupt", "just", "unjust",
                "fair", "unfair", "honorable", "dishonorable", "honest", "dishonest", "decent",
                "indecent", "appropriate", "inappropriate", "acceptable", "unacceptable",
                "legitimate", "illegitimate", "reasonable", "unreasonable",

                // Emotional Appeals
                "heartbreaking", "devastating", "tragic", "sad", "joyful", "happy", "hopeful",
                "promising", "depressing", "gloomy", "optimistic", "pessimistic", "anxious",
                "fearful", "afraid", "confident", "proud", "ashamed", "embarrassed", "guilty"
            ],
            
            toBe: [
                // Present forms
                "\\bis\\b", "\\bare\\b", "\\bam\\b",

                // Past forms
                "\\bwas\\b", "\\bwere\\b",

                // Infinitive and participles
                "\\bbe\\b", "\\bbeing\\b", "\\bbeen\\b",

                // Contractions with word boundaries
                "\\bit's\\b", "\\bthat's\\b", "\\bhe's\\b", "\\bshe's\\b", "\\bwhat's\\b",
                "\\bwho's\\b", "\\byou're\\b", "\\bthey're\\b", "\\bwe're\\b", "\\bi'm\\b",
                "\\bthere's\\b", "\\bhere's\\b", "\\bwasn't\\b", "\\bweren't\\b", "\\bisn't\\b",
                "\\baren't\\b"
            ],
            
            absolute: [
                // Universal Quantifiers
                "\\ball\\b", "\\bevery\\b", "\\beach\\b", "\\bany\\b", "\\bno\\b", "\\bnone\\b",

                // People Universals
                "\\beveryone\\b", "\\beverybody\\b", "\\bno one\\b", "\\bnobody\\b", "\\banyone\\b",
                "\\banybody\\b", "\\bsomeone\\b", "\\bsomebody\\b",

                // Time Universals
                "\\balways\\b", "\\bnever\\b", "\\bforever\\b", "\\beternal\\b", "\\bconstantly\\b",
                "\\bperpetually\\b", "\\bcontinually\\b", "\\bendlessly\\b", "\\bceaselessly\\b",
                "\\bpermanently\\b", "\\binvariably\\b",

                // Categorical Statements
                "\\bcompletely\\b", "\\btotally\\b", "\\bentirely\\b", "\\babsolutely\\b", "\\bperfectly\\b",
                "\\bwholly\\b", "\\bthoroughly\\b", "\\bultimately\\b", "\\bfundamentally\\b",
                "\\bpurely\\b", "\\boutright\\b", "\\bcomprehensively\\b", "\\buniversally\\b",

                // Thing Universals
                "\\beverything\\b", "\\bnothing\\b", "\\banything\\b", "\\bsomething\\b",

                // Absolute Adjectives
                "\\bperfect\\b", "\\bcomplete\\b", "\\btotal\\b", "\\babsolute\\b", "\\bentire\\b",
                "\\bfull\\b", "\\bwhole\\b", "\\bultimate\\b", "\\bmaximum\\b", "\\bminimum\\b",
                "\\bsupreme\\b", "\\bextreme\\b", "\\butmost\\b", "\\bfinal\\b", "\\binfallible\\b",
                "\\bunerring\\b", "\\buniversal\\b", "\\bimpossible\\b", "\\binevitable\\b",
                "\\binescapable\\b", "\\bundeniable\\b", "\\birrefutable\\b", "\\bidentical\\b",
                "\\bpure\\b", "\\bsheer\\b", "\\bmere\\b",

                // Absolute Certainty
                "\\bcertainly\\b", "\\bdefinitely\\b", "\\bundoubtedly\\b", "\\bunquestionably\\b",
                "\\bindisputably\\b", "\\birrefutably\\b", "\\bincontrovertibly\\b", "\\bincontestably\\b",
                "\\bunequivocally\\b"
            ]
        },
        
        // Initialize the detector
        init() {
            this.loadSettings();
            this.setupMessageListeners();
        },
        
        // Load user settings from storage
        loadSettings() {
            chrome.storage.sync.get({
                enableAnalysis: true,
                highlightOpinion: true,
                highlightToBe: true,
                highlightAbsolutes: true
            }, items => {
                this.settings = items;
                this.previousSettings = {...items}; // Keep a copy
                
                if (this.settings.enableAnalysis) {
                    // Small delay to let the page load
                    setTimeout(() => this.analyzeDocument(), 500);
                    this.setupMutationObserver();
                }
            });
        },
        
        // Set up listeners for messages from popup
        setupMessageListeners() {
            chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
                switch(request.action) {
                    case "updateSettings":
                        this.updateSettings(request.settings);
                        sendResponse({success: true});
                        break;
                        
                    case "getStats":
                        // Always recalculate stats before sending to ensure accuracy
                        this.recalculateStats();
                        sendResponse(this.stats);
                        break;
                        
                    case "forceAnalyze":
                        // Always remove highlights first, then re-analyze if enabled
                        this.removeHighlights();
                        if (this.settings.enableAnalysis) {
                            // Small delay to ensure DOM is updated
                            setTimeout(() => this.analyzeDocument(), 100);
                        }
                        sendResponse({success: true});
                        break;
                        
                    case "clearHighlights":
                        this.removeHighlights();
                        sendResponse({success: true});
                        break;
                }
                
                return true; // Keep channel open for async response
            });
        },
        
        // Update settings with selective highlight removal
        updateSettings(newSettings) {
            // Check what changed
            const changedSettings = {};
            for (const key in newSettings) {
                if (this.settings[key] !== newSettings[key]) {
                    changedSettings[key] = {
                        old: this.settings[key],
                        new: newSettings[key]
                    };
                }
            }
            
            console.log('Settings changed:', changedSettings);
            
            // Update settings
            this.previousSettings = {...this.settings};
            this.settings = newSettings;
            
            // Handle analysis enable/disable
            if (changedSettings.enableAnalysis) {
                if (!this.settings.enableAnalysis) {
                    // Analysis disabled - remove all highlights
                    this.removeHighlights();
                    if (this.observer) {
                        this.observer.disconnect();
                        this.observer = null;
                    }
                    return;
                } else {
                    // Analysis enabled - do full analysis
                    this.analyzeDocument();
                    this.setupMutationObserver();
                    return;
                }
            }
            
            // Handle individual highlight type changes (only if analysis is enabled)
            if (this.settings.enableAnalysis) {
                let needsReanalysis = false;
                
                // Remove specific highlights that were disabled
                if (changedSettings.highlightOpinion && !this.settings.highlightOpinion) {
                    this.removeSpecificHighlights('opinion');
                }
                if (changedSettings.highlightToBe && !this.settings.highlightToBe) {
                    this.removeSpecificHighlights('tobe');
                }
                if (changedSettings.highlightAbsolutes && !this.settings.highlightAbsolutes) {
                    this.removeSpecificHighlights('absolute');
                }
                
                // If any highlights were enabled, we need to reanalyze to add them
                if ((changedSettings.highlightOpinion && this.settings.highlightOpinion) ||
                    (changedSettings.highlightToBe && this.settings.highlightToBe) ||
                    (changedSettings.highlightAbsolutes && this.settings.highlightAbsolutes)) {
                    needsReanalysis = true;
                }
                
                if (needsReanalysis) {
                    this.analyzeDocument();
                }
                
                // Recalculate stats after changes
                this.recalculateStats();
                
                this.setupMutationObserver();
            }
        },
        
        // Remove specific type of highlights
        removeSpecificHighlights(type) {
            let selector;
            switch (type) {
                case 'opinion':
                    selector = '.bias-highlight-opinion';
                    this.stats.opinionCount = 0;
                    break;
                case 'tobe':
                    selector = '.bias-highlight-tobe';
                    this.stats.toBeCount = 0;
                    break;
                case 'absolute':
                    selector = '.bias-highlight-absolute';
                    this.stats.absoluteCount = 0;
                    break;
                default:
                    return;
            }
            
            const highlights = document.querySelectorAll(selector);
            highlights.forEach(highlight => {
                const parent = highlight.parentNode;
                const textNode = document.createTextNode(highlight.textContent);
                parent.replaceChild(textNode, highlight);
                
                // Merge adjacent text nodes to prevent fragmentation
                parent.normalize();
            });
            
            console.log(`Removed ${highlights.length} ${type} highlights`);
            
            // Update bias score after removal
            const totalCount = this.stats.opinionCount + this.stats.toBeCount + this.stats.absoluteCount;
            // Removed bias score calculation
        },
        
        // Recalculate stats based on current highlights
        recalculateStats() {
            this.stats.opinionCount = document.querySelectorAll('.bias-highlight-opinion').length;
            this.stats.toBeCount = document.querySelectorAll('.bias-highlight-tobe').length;
            this.stats.absoluteCount = document.querySelectorAll('.bias-highlight-absolute').length;
            
            console.log(`Recalculated stats: ${this.stats.opinionCount} opinion, ${this.stats.toBeCount} to-be, ${this.stats.absoluteCount} absolute`);
        },
        
        // Setup mutation observer to detect content changes
        setupMutationObserver() {
            if (this.observer) {
                this.observer.disconnect();
            }
            
            // Debounce timer for mutation observer
            let debounceTimer = null;
            
            this.observer = new MutationObserver(mutations => {
                // Check if any significant content was added
                let hasSignificantChange = mutations.some(mutation => {
                    // Skip if it's our own highlight spans
                    if (mutation.target.classList && 
                        (mutation.target.classList.contains('bias-highlight-opinion') ||
                         mutation.target.classList.contains('bias-highlight-tobe') ||
                         mutation.target.classList.contains('bias-highlight-absolute'))) {
                        return false;
                    }
                    
                    return mutation.addedNodes.length > 0 && 
                        Array.from(mutation.addedNodes).some(node => 
                            (node.nodeType === Node.ELEMENT_NODE && node.textContent.trim().length > 20) ||
                            (node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 20)
                        );
                });
                
                if (hasSignificantChange && this.settings.enableAnalysis) {
                    // Debounce the reanalysis to avoid too frequent updates
                    clearTimeout(debounceTimer);
                    debounceTimer = setTimeout(() => {
                        console.log("Bias Detector: Content changed, reanalyzing...");
                        this.analyzeDocument();
                    }, 1000);
                }
            });
            
            this.observer.observe(document.body, {
                childList: true,
                subtree: true,
                characterData: true
            });
            
            console.log("Bias Detector: Mutation observer started");
        },
        
        // Remove all highlights from the document
        removeHighlights() {
            const highlights = document.querySelectorAll('.bias-highlight-opinion, .bias-highlight-tobe, .bias-highlight-absolute');
            const processedParents = new Set();
            
            highlights.forEach(highlight => {
                const parent = highlight.parentNode;
                const textNode = document.createTextNode(highlight.textContent);
                parent.replaceChild(textNode, highlight);
                processedParents.add(parent);
            });
            
            // Normalize all affected parent nodes to merge adjacent text nodes
            processedParents.forEach(parent => {
                if (parent && parent.normalize) {
                    parent.normalize();
                }
            });
            
            this.resetStats();
        },
        
        // Reset the statistics counters
        resetStats() {
            this.stats = {
                opinionCount: 0,
                toBeCount: 0,
                absoluteCount: 0
            };
        },
        
        // Main analysis function
        analyzeDocument() {
            // Only reset stats if we're doing a full re-analysis
            // Don't reset if we're just adding to existing highlights
            const hasExistingHighlights = document.querySelector('.bias-highlight-opinion, .bias-highlight-tobe, .bias-highlight-absolute');
            if (!hasExistingHighlights) {
                this.resetStats();
            }
            
            const textNodes = this.collectTextNodes(document.body);
            
            if (textNodes.length === 0) {
                console.log("Bias Detector: No text nodes found to analyze.");
                // Try again later if the page might be loading dynamically
                setTimeout(() => this.analyzeDocument(), 2000);
                return;
            }
            
            this.processTextNodes(textNodes);
            
            // If no matches were found, it might be due to dynamic content loading
            if (this.stats.opinionCount === 0 && this.stats.toBeCount === 0 && this.stats.absoluteCount === 0) {
                console.log("Bias Detector: No bias detected. Scheduling re-analysis for possible dynamic content...");
                setTimeout(() => this.analyzeDocument(), 2000);
            }
        },
        
        // Collect all text nodes from the document
        collectTextNodes(rootNode) {
            const textNodes = [];
            
            const walker = document.createTreeWalker(
                rootNode,
                NodeFilter.SHOW_TEXT,
                {
                    acceptNode: node => {
                        // Skip empty nodes or nodes that are too short
                        if (node.textContent.trim().length <= 0) {
                            return NodeFilter.FILTER_REJECT;
                        }
                        
                        // Skip nodes that are already within our highlights
                        const parent = node.parentNode;
                        if (parent && parent.classList && 
                            (parent.classList.contains('bias-highlight-opinion') ||
                             parent.classList.contains('bias-highlight-tobe') ||
                             parent.classList.contains('bias-highlight-absolute'))) {
                            return NodeFilter.FILTER_REJECT;
                        }
                        
                        // Skip script and style content
                        if (node.parentNode && 
                            (node.parentNode.nodeName === 'SCRIPT' ||
                             node.parentNode.nodeName === 'STYLE' ||
                             node.parentNode.nodeName === 'NOSCRIPT' ||
                             node.parentNode.nodeName === 'SVG' ||
                             node.parentNode.nodeName === 'HEAD')) {
                            return NodeFilter.FILTER_REJECT;
                        }
                        
                        return NodeFilter.FILTER_ACCEPT;
                    }
                }
            );
            
            let node;
            while (node = walker.nextNode()) {
                textNodes.push(node);
            }
            
            // Try to handle shadow DOM elements
            this.processShadowDom(rootNode, textNodes);
            
            return textNodes;
        },
        
        // Process Shadow DOM elements to get their text nodes
        processShadowDom(rootNode, textNodes) {
            if (rootNode.nodeType !== Node.ELEMENT_NODE) return;
            
            // Check for shadow root
            if (rootNode.shadowRoot) {
                const shadowTextNodes = this.collectTextNodes(rootNode.shadowRoot);
                textNodes.push(...shadowTextNodes);
            }
            
            // Process children that might have shadow roots
            const elements = rootNode.querySelectorAll('*');
            elements.forEach(element => {
                if (element.shadowRoot) {
                    const shadowTextNodes = this.collectTextNodes(element.shadowRoot);
                    textNodes.push(...shadowTextNodes);
                }
                
                // Handle slots in custom elements
                if (element.nodeName.includes('-')) {
                    const slots = element.querySelectorAll('slot');
                    slots.forEach(slot => {
                        const assignedNodes = slot.assignedNodes();
                        assignedNodes.forEach(assignedNode => {
                            if (assignedNode.nodeType === Node.ELEMENT_NODE) {
                                const slotTextNodes = this.collectTextNodes(assignedNode);
                                textNodes.push(...slotTextNodes);
                            } else if (assignedNode.nodeType === Node.TEXT_NODE) {
                                textNodes.push(assignedNode);
                            }
                        });
                    });
                }
            });
        },
        
        // Process text nodes to highlight bias words
        processTextNodes(textNodes) {
            // Helper function to escape regex special characters
            const escapeRegExp = string => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            
            textNodes.forEach(node => {
                let text = node.textContent;
                
                // Skip very short texts or texts that appear to be navigation/UI elements
                if (text.trim().length < 5 || (text.trim().length < 20 && !text.includes(' '))) {
                    return;
                }
                
                // Check if we need to process this node
                let foundOpinion = false;
                let foundToBe = false;
                let foundAbsolute = false;
                
                // Create document fragment to hold the highlighted content
                const fragment = document.createDocumentFragment();
                let remainingText = text;
                let currentPos = 0;
                
                // Arrays to store all matches
                const matches = [];
                
                // Find all matches for opinion words
                if (this.settings.highlightOpinion) {
                    this.dictionaries.opinion.forEach(word => {
                        try {
                            // Only apply word boundary for simple words
                            const escapedWord = escapeRegExp(word);
                            const pattern = word.includes(' ') ? escapedWord : '\\b' + escapedWord + '\\b';
                            const regex = new RegExp(pattern, 'gi');
                            
                            let match;
                            while ((match = regex.exec(text)) !== null) {
                                matches.push({
                                    index: match.index,
                                    length: match[0].length,
                                    text: match[0],
                                    type: 'opinion'
                                });
                                foundOpinion = true;
                            }
                        } catch (e) {
                            console.error('Error with regex for opinion word:', word, e);
                        }
                    });
                }
                
                // Find all matches for to-be verbs
                if (this.settings.highlightToBe) {
                    this.dictionaries.toBe.forEach(verb => {
                        try {
                            const regex = new RegExp(verb, 'gi');
                            
                            let match;
                            while ((match = regex.exec(text)) !== null) {
                                matches.push({
                                    index: match.index,
                                    length: match[0].length,
                                    text: match[0],
                                    type: 'tobe'
                                });
                                foundToBe = true;
                            }
                        } catch (e) {
                            console.error('Error with regex for to-be verb:', verb, e);
                        }
                    });
                }
                
                // Find all matches for absolute words
                if (this.settings.highlightAbsolutes) {
                    this.dictionaries.absolute.forEach(word => {
                        try {
                            const regex = new RegExp(word, 'gi');
                            
                            let match;
                            while ((match = regex.exec(text)) !== null) {
                                matches.push({
                                    index: match.index,
                                    length: match[0].length,
                                    text: match[0],
                                    type: 'absolute'
                                });
                                foundAbsolute = true;
                            }
                        } catch (e) {
                            console.error('Error with regex for absolute word:', word, e);
                        }
                    });
                }
                
                // If we found matches, replace the node with highlighted content
                if (matches.length > 0) {
                    // Sort matches by index
                    matches.sort((a, b) => a.index - b.index);
                    
                    // Filter out overlapping matches
                    const filteredMatches = [];
                    let lastEnd = -1;
                    
                    for (const match of matches) {
                        if (match.index >= lastEnd) {
                            filteredMatches.push(match);
                            lastEnd = match.index + match.length;
                            
                            // Update stats
                            if (match.type === 'opinion') this.stats.opinionCount++;
                            else if (match.type === 'tobe') this.stats.toBeCount++;
                            else if (match.type === 'absolute') this.stats.absoluteCount++;
                        }
                    }
                    
                    // Create highlighted content
                    let lastIndex = 0;
                    
                    for (const match of filteredMatches) {
                        // Add text before this match
                        if (match.index > lastIndex) {
                            fragment.appendChild(
                                document.createTextNode(text.substring(lastIndex, match.index))
                            );
                        }
                        
                        // Add highlighted match
                        const span = document.createElement('span');
                        span.className = `bias-highlight-${match.type}`;
                        span.textContent = match.text;
                        fragment.appendChild(span);
                        
                        lastIndex = match.index + match.length;
                    }
                    
                    // Add remaining text
                    if (lastIndex < text.length) {
                        fragment.appendChild(
                            document.createTextNode(text.substring(lastIndex))
                        );
                    }
                    
                    // Replace the original node with our fragment
                    if (node.parentNode) {
                        node.parentNode.replaceChild(fragment, node);
                    }
                }
            });
            
            console.log(`Bias Detector found: ${this.stats.opinionCount} opinion words, ${this.stats.toBeCount} to-be verbs, ${this.stats.absoluteCount} absolute statements`);
        }
    };
    
    // Initialize the extension
    BiasDetector.init();
})();
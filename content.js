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
        
        stats: {
            opinionCount: 0,
            toBeCount: 0,
            absoluteCount: 0,
            biasScore: 0
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
                        this.settings = request.settings;
                        this.removeHighlights();
                        
                        if (this.settings.enableAnalysis) {
                            this.analyzeDocument();
                            this.setupMutationObserver();
                        } else if (this.observer) {
                            this.observer.disconnect();
                            this.observer = null;
                        }
                        
                        sendResponse({success: true});
                        break;
                        
                    case "getStats":
                        sendResponse(this.stats);
                        break;
                        
                    case "forceAnalyze":
                        if (this.settings.enableAnalysis) {
                            this.removeHighlights();
                            this.analyzeDocument();
                        }
                        sendResponse({success: true});
                        break;
                }
                
                return true; // Keep channel open for async response
            });
        },
        
        // Setup mutation observer to detect content changes
        setupMutationObserver() {
            if (this.observer) {
                this.observer.disconnect();
            }
            
            this.observer = new MutationObserver(mutations => {
                let shouldReanalyze = mutations.some(mutation => 
                    mutation.addedNodes.length > 0 && 
                    Array.from(mutation.addedNodes).some(node => 
                        (node.nodeType === Node.ELEMENT_NODE && node.textContent.trim().length > 20) ||
                        (node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 20)
                    )
                );
                
                if (shouldReanalyze && this.settings.enableAnalysis) {
                    console.log("Bias Detector: Content changed, reanalyzing...");
                    setTimeout(() => this.analyzeDocument(), 500);
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
            highlights.forEach(highlight => {
                const textNode = document.createTextNode(highlight.textContent);
                highlight.parentNode.replaceChild(textNode, highlight);
            });
            
            this.resetStats();
        },
        
        // Reset the statistics counters
        resetStats() {
            this.stats = {
                opinionCount: 0,
                toBeCount: 0,
                absoluteCount: 0,
                biasScore: 0
            };
        },
        
        // Main analysis function
        analyzeDocument() {
            this.resetStats();
            
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
                        if (node.parentNode && 
                            (node.parentNode.classList.contains('bias-highlight-opinion') ||
                             node.parentNode.classList.contains('bias-highlight-tobe') ||
                             node.parentNode.classList.contains('bias-highlight-absolute'))) {
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
                let html = node.textContent;
                let originalHtml = html;
                
                // Skip very short texts or texts that appear to be navigation/UI elements
                if (html.trim().length < 5 || (html.trim().length < 20 && !html.includes(' '))) {
                    return;
                }
                
                // Process opinion words
                if (this.settings.highlightOpinion) {
                    this.dictionaries.opinion.forEach(word => {
                        try {
                            // Only apply word boundary for simple words
                            const escapedWord = escapeRegExp(word);
                            const pattern = word.includes(' ') ? escapedWord : '\\b' + escapedWord + '\\b';
                            const regex = new RegExp(pattern, 'gi');
                            
                            html = html.replace(regex, match => {
                                this.stats.opinionCount++;
                                return '<span class="bias-highlight-opinion">' + match + '</span>';
                            });
                        } catch (e) {
                            console.error('Error with regex for opinion word:', word, e);
                        }
                    });
                }
                
                // Process to-be verbs
                if (this.settings.highlightToBe) {
                    this.dictionaries.toBe.forEach(verb => {
                        try {
                            const regex = new RegExp(verb, 'gi');
                            html = html.replace(regex, match => {
                                this.stats.toBeCount++;
                                return '<span class="bias-highlight-tobe">' + match + '</span>';
                            });
                        } catch (e) {
                            console.error('Error with regex for to-be verb:', verb, e);
                        }
                    });
                }
                
                // Process absolute words
                if (this.settings.highlightAbsolutes) {
                    this.dictionaries.absolute.forEach(word => {
                        try {
                            const regex = new RegExp(word, 'gi');
                            html = html.replace(regex, match => {
                                this.stats.absoluteCount++;
                                return '<span class="bias-highlight-absolute">' + match + '</span>';
                            });
                        } catch (e) {
                            console.error('Error with regex for absolute word:', word, e);
                        }
                    });
                }
                
                // If the HTML has changed, replace the text node with the highlighted version
                if (html !== originalHtml) {
                    try {
                        const span = document.createElement('span');
                        span.innerHTML = html;
                        if (node.parentNode) {
                            node.parentNode.replaceChild(span, node);
                        }
                    } catch (e) {
                        console.error('Error replacing node:', e);
                    }
                }
            });
            
            // Calculate bias score
            const totalCount = this.stats.opinionCount + this.stats.toBeCount + this.stats.absoluteCount;
            this.stats.biasScore = Math.min(10, Math.round(totalCount / 5));
            
            console.log(`Bias Detector found: ${this.stats.opinionCount} opinion words, ${this.stats.toBeCount} to-be verbs, ${this.stats.absoluteCount} absolute statements`);
        }
    };
    
    // Initialize the extension
    BiasDetector.init();
})();
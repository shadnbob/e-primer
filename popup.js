// content.js
(function() {
    // Default settings
    let settings = {
        enableAnalysis: true,
        highlightOpinion: true,
        highlightToBe: true,
        highlightAbsolutes: true
    };

    // Stats
    let stats = {
        opinionCount: 0,
        toBeCount: 0,
        absoluteCount: 0,
        biasScore: 0
    };

    // Keep track of mutation observer
    let observer = null;

    // Lists of words to detect
    const opinionWords = [
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
    ];

    const toBeVerbs = [
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
    ];

    const absoluteWords = [
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
    ];

    // Load settings from storage
    chrome.storage.sync.get({
        enableAnalysis: true,
        highlightOpinion: true,
        highlightToBe: true,
        highlightAbsolutes: true
    }, function(items) {
        settings = items;
        if (settings.enableAnalysis) {
            // Initial analysis
            setTimeout(analyzeDocument, 500);

            // Set up mutation observer to detect dynamically added content
            setupMutationObserver();
        }
    });

    // Set up mutation observer to detect dynamically added content
    function setupMutationObserver() {
        // Disconnect any existing observer
        if (observer) {
            observer.disconnect();
        }

        // Create a new observer
        observer = new MutationObserver(function(mutations) {
            // Only reanalyze if we see content changes
            let shouldReanalyze = false;

            for (let mutation of mutations) {
                // If nodes were added
                if (mutation.addedNodes.length > 0) {
                    for (let node of mutation.addedNodes) {
                        // If it's an element node with content, or a text node with content
                        if ((node.nodeType === Node.ELEMENT_NODE && node.textContent.trim().length > 20) ||
                            (node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 20)) {
                            shouldReanalyze = true;
                            break;
                        }
                    }
                }

                // If we found significant content changes, no need to check further
                if (shouldReanalyze) break;
            }

            // Reanalyze document if significant content was added
            if (shouldReanalyze && settings.enableAnalysis) {
                console.log("Bias Detector: Content changed, reanalyzing...");
                // Small delay to let DOM stabilize
                setTimeout(analyzeDocument, 500);
            }
        });

        // Start observing
        observer.observe(document.body, {
            childList: true,
            subtree: true,
            characterData: true
        });

        console.log("Bias Detector: Mutation observer started");
    }

    // Listen for messages from popup
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        if (request.action === "updateSettings") {
            settings = request.settings;

            // Remove existing highlights
            removeHighlights();

            // Re-analyze if enabled
            if (settings.enableAnalysis) {
                analyzeDocument();
                setupMutationObserver();
            } else if (observer) {
                // Disconnect observer if analysis is disabled
                observer.disconnect();
                observer = null;
            }

            sendResponse({success: true});
        } else if (request.action === "getStats") {
            sendResponse(stats);
        } else if (request.action === "forceAnalyze") {
            // Allow forcing a reanalysis from the popup
            if (settings.enableAnalysis) {
                removeHighlights();
                analyzeDocument();
            }
            sendResponse({success: true});
        }

        return true;
    });

    // Remove highlights from the document
    function removeHighlights() {
        const highlights = document.querySelectorAll('.bias-highlight-opinion, .bias-highlight-tobe, .bias-highlight-absoluly');
        highlights.forEach(function(highlight) {
            // Replace the highlight with its text content
            const textNode = document.createTextNode(highlight.textContent);
            highlight.parentNode.replaceChild(textNode, highlight);
        });

        // Reset stats
        stats = {
            opinionCount: 0,
            toBeCount: 0,
            absoluteCount: 0,
            biasScore: 0
        };
    }

    // Analyze the document for biased language
    function analyzeDocument() {
        // Reset stats before analysis
        stats = {
            opinionCount: 0,
            toBeCount: 0,
            absoluteCount: 0,
            biasScore: 0
        };

        // Text nodes to process
        let textNodes = [];

        // Get all text nodes in the document, including shadow DOM
        function getTextNodes(node) {
            // Skip nodes that are part of our highlighting
            if (node.nodeType === Node.ELEMENT_NODE &&
                (node.classList.contains('bias-highlight-opinion') ||
                    node.classList.contains('bias-highlight-tobe') ||
                    node.classList.contains('bias-highlight-absoluly'))) {
                return;
            }

            // Handle regular DOM nodes
            if (node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0) {
                textNodes.push(node);
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                // Skip certain elements
                if (
                    node.nodeName === 'SCRIPT' ||
                    node.nodeName === 'STYLE' ||
                    node.nodeName === 'NOSCRIPT' ||
                    node.nodeName === 'SVG' ||
                    node.nodeName === 'HEAD'
                ) {
                    return;
                }

                // Try to access shadow DOM
                if (node.shadowRoot) {
                    // Process shadow DOM children
                    for (let i = 0; i < node.shadowRoot.childNodes.length; i++) {
                        getTextNodes(node.shadowRoot.childNodes[i]);
                    }
                }

                // Process regular children
                for (let i = 0; i < node.childNodes.length; i++) {
                    getTextNodes(node.childNodes[i]);
                }

                // Handle custom elements like cp-article that might contain content
                if (node.nodeName.includes('-')) {
                    // For custom elements, also check slot content
                    const slots = node.querySelectorAll('slot');
                    slots.forEach(slot => {
                        const assignedNodes = slot.assignedNodes();
                        assignedNodes.forEach(assignedNode => {
                            getTextNodes(assignedNode);
                        });
                    });
                }
            }
        }

        // Process each text node
        function processTextNodes() {
            // Skip processing if no text nodes found
            if (textNodes.length === 0) {
                console.log("Bias Detector: No text nodes found to analyze.");
                return;
            }

            // Helper function to escape regex special characters
            function escapeRegExp(string) {
                return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            }

            textNodes.forEach(function(node) {
                let html = node.textContent;
                let originalHtml = html;

                // Skip very short texts or texts that appear to be navigation/UI elements
                if (html.trim().length < 5 || (html.trim().length < 20 && !html.includes(' '))) {
                    return;
                }

                // Process opinion words
                if (settings.highlightOpinion) {
                    opinionWords.forEach(function(word) {
                        try {
                            // Only apply word boundary for simple words
                            const escapedWord = escapeRegExp(word);
                            const pattern = word.includes(' ') ? escapedWord : '\\b' + escapedWord + '\\b';
                            const regex = new RegExp(pattern, 'gi');

                            html = html.replace(regex, function(match) {
                                stats.opinionCount++;
                                return '<span class="bias-highlight-opinion">' + match + '</span>';
                            });
                        } catch (e) {
                            // Skip this word if regex is invalid
                            console.error('Error with regex for word:', word, e);
                        }
                    });
                }

                // Process to-be verbs (E-Prime)
                if (settings.highlightToBe) {
                    toBeVerbs.forEach(function(verb) {
                        try {
                            const regex = new RegExp(verb, 'gi');
                            html = html.replace(regex, function(match) {
                                stats.toBeCount++;
                                return '<span class="bias-highlight-tobe">' + match + '</span>';
                            });
                        } catch (e) {
                            console.error('Error with regex for verb:', verb, e);
                        }
                    });
                }

                // Process absolute words
                if (settings.highlightAbsolutes) {
                    absoluteWords.forEach(function(word) {
                        try {
                            const regex = new RegExp(word, 'gi');
                            html = html.replace(regex, function(match) {
                                stats.absoluteCount++;
                                return '<span class="bias-highlight-absolute">' + match + '</span>';
                            });
                        } catch (e) {
                            console.error('Error with regex for absolute:', word, e);
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

            // Calculate bias score - simple algorithm for demonstration
            const totalCount = stats.opinionCount + stats.toBeCount + stats.absoluteCount;
            stats.biasScore = Math.min(10, Math.round(totalCount / 5));

            // Log results for debugging
            console.log(`Bias Detector found: ${stats.opinionCount} opinion words, ${stats.toBeCount} to-be verbs, ${stats.absoluteCount} absolute statements`);
        }

        // Start the analysis
        try {
            getTextNodes(document.body);
            processTextNodes();

            // If no matches were found, it might be due to dynamic content loading
            if (textNodes.length === 0 || (stats.opinionCount === 0 && stats.toBeCount === 0 && stats.absoluteCount === 0)) {
                console.log("Bias Detector: Scheduling re-analysis due to possible dynamic content...");
                // Try again after a short delay to catch dynamically loaded content
                setTimeout(analyzeDocument, 2000);
            }
        } catch (e) {
            console.error("Bias Detector encountered an error:", e);
        }
    }
})();
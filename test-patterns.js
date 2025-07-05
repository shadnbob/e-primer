// Quick test script for excellence detection patterns
// Run this in the browser console to test pattern matching

const testTexts = {
    attribution: [
        "According to Dr. Sarah Johnson's 2024 peer-reviewed study published in Nature",
        "Research published in Science shows significant results",
        "Smith et al. (2024) found that climate patterns are changing",
        "The CDC reported in their latest bulletin",
        "Based on 50,000 data points collected over 20 years",
        "Dr. Michael Chen from MIT concluded"
    ],
    
    nuance: [
        "This might indicate a larger trend",
        "The data suggests that changes could be occurring",
        "However, alternative explanations exist",
        "While the evidence is compelling, more research is needed",
        "Results vary depending on context",
        "It appears to be a complex issue with multiple factors"
    ],
    
    transparency: [
        "In my opinion, this represents a significant finding",
        "Important limitations include sample size and geographic scope",
        "Correlation does not necessarily imply causation",
        "These are preliminary findings requiring validation",
        "I could be wrong, but the pattern seems clear",
        "This interpretation is open to debate"
    ],
    
    discourse: [
        "What do you think about these findings?",
        "Building on Johnson's work, we can see",
        "This is worth discussing further",
        "Both perspectives have merit",
        "As Dr. Smith mentioned earlier",
        "Let's explore this idea together"
    ],
    
    problems: {
        absolute: [
            "This is always true",
            "Everyone knows this",
            "It's absolutely certain",
            "Never has there been such clear evidence",
            "Completely and utterly wrong"
        ],
        weasel: [
            "Some people say",
            "Studies show",
            "Many experts believe",
            "It is widely known",
            "Research suggests"
        ],
        emotional: [
            "This is a complete disaster",
            "Evil corporations are destroying everything",
            "Blood on their hands",
            "Absolutely shameful behavior",
            "The situation is utterly hopeless"
        ]
    }
};

// Test function
function testPatterns() {
    console.log("=== EXCELLENCE DETECTION PATTERN TEST ===\n");
    
    // Load the excellence detector
    const detector = new ExcellenceDetector();
    
    // Test excellence patterns
    console.log("🟢 TESTING EXCELLENCE PATTERNS:\n");
    
    for (const [category, texts] of Object.entries(testTexts)) {
        if (category === 'problems') continue;
        
        console.log(`\n📋 ${category.toUpperCase()}:`);
        texts.forEach(text => {
            const matches = detector.findExcellence(text);
            const found = matches.filter(m => m.type === category);
            if (found.length > 0) {
                console.log(`✓ "${text}"`);
                console.log(`  Matched: "${found[0].text}"`);
            } else {
                console.log(`✗ NOT DETECTED: "${text}"`);
            }
        });
    }
    
    // Test intensity detection
    console.log("\n\n🔴 TESTING INTENSITY LEVELS:\n");
    
    const testIntensity = (text, type) => {
        const intensity = detector.calculateIntensity(text, type);
        const levels = ['', 'Mild', 'Moderate', 'Severe'];
        return `Level ${intensity} (${levels[intensity]})`;
    };
    
    console.log("Absolute statements:");
    console.log(`  "mostly correct" → ${testIntensity("mostly correct", "absolute")}`);
    console.log(`  "always correct" → ${testIntensity("always correct", "absolute")}`);
    console.log(`  "absolutely correct" → ${testIntensity("absolutely correct", "absolute")}`);
    
    console.log("\nOpinion words:");
    console.log(`  "seems right" → ${testIntensity("seems right", "opinion")}`);
    console.log(`  "obviously right" → ${testIntensity("obviously right", "opinion")}`);
    console.log(`  "undeniably right" → ${testIntensity("undeniably right", "opinion")}`);
    
    // Test portrayal detection
    console.log("\n\n🎭 TESTING PORTRAYAL DETECTION:\n");
    
    const portrayalTests = [
        "The heroic scientist saved the day",
        "The evil corporation destroyed the environment",
        "The brilliant researcher made a groundbreaking discovery",
        "The corrupt politician betrayed the public trust"
    ];
    
    portrayalTests.forEach(text => {
        const portrayal = detector.detectPortrayal(text);
        if (portrayal) {
            console.log(`"${text}"`);
            console.log(`  → ${portrayal.valence} portrayal (${portrayal.type})`);
        }
    });
    
    // Test combined analysis
    console.log("\n\n📊 TESTING COMBINED ANALYSIS:\n");
    
    const sampleText = `
        According to Dr. Smith's 2024 study in Nature, climate change appears to be 
        accelerating. However, some people say it's not real. The evidence clearly 
        shows we're in a crisis. Scientists absolutely agree this is happening.
        
        In my opinion, while the data suggests concerning trends, we should consider 
        multiple factors. What do you think about these findings? The situation might 
        require urgent action, though more research is needed to fully understand 
        all implications.
    `;
    
    const excellence = detector.findExcellence(sampleText);
    const stats = detector.getStatistics(sampleText);
    
    console.log("Sample text analysis:");
    console.log(`  Excellence found: ${excellence.length} instances`);
    console.log(`  Health score: ${stats.healthScore}/100`);
    console.log("\nExcellence breakdown:");
    for (const [type, count] of Object.entries(stats.excellence.byType)) {
        console.log(`  ${type}: ${count}`);
    }
}

// Run the test
testPatterns();

console.log("\n\n✅ Test complete! Check the patterns that were NOT DETECTED and adjust regex as needed.");

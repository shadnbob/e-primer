#!/bin/bash

# Dictionary Pattern Analyzer & Fixer for E-Prime Extension
# This script analyzes pattern duplicates, validates formats, and suggests fixes

set -e

# Configuration
DICT_DIR="src/dictionaries"
OUTPUT_DIR="analysis-output"
BACKUP_DIR="dictionary-backups"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Create output directories
mkdir -p "$OUTPUT_DIR" "$BACKUP_DIR"

echo -e "${BLUE}🔍 E-Prime Dictionary Pattern Analysis${NC}"
echo "================================================"

# Function to extract patterns from a dictionary file
extract_patterns() {
    local file="$1"
    local output_file="$2"
    
    # Extract quoted patterns, remove quotes and escape sequences
    grep -o '"[^"]*"' "$file" | \
    sed 's/^"//; s/"$//' | \
    sed 's/\\\\b//g; s/\\\\//g' | \
    grep -v '^//' | \
    grep -v '^export' | \
    grep -v '^import' | \
    sort -u > "$output_file"
}

# Function to backup original files
backup_files() {
    echo -e "${YELLOW}📦 Creating backups...${NC}"
    cp -r "$DICT_DIR" "$BACKUP_DIR/dictionaries-$(date +%Y%m%d-%H%M%S)"
    echo "✅ Backups created in $BACKUP_DIR"
}

# Extract all patterns from each dictionary
echo -e "${YELLOW}📝 Extracting patterns from dictionaries...${NC}"

declare -A dict_files=(
    ["opinion"]="opinion-words.js"
    ["absolute"]="absolute-words.js"
    ["tobe"]="tobe-verbs.js"
    ["passive"]="passive-patterns.js"
    ["weasel"]="weasel-phrases.js"
    ["presupposition"]="presupposition-markers.js"
    ["war"]="war-metaphors.js"
    ["minimizer"]="minimizers.js"
    ["maximizer"]="maximizers.js"
    ["false-balance"]="false-balance.js"
    ["euphemism"]="euphemisms.js"
    ["emotional"]="emotional-triggers.js"
    ["gaslighting"]="gaslighting.js"
    ["false-dilemma"]="false-dilemma.js"
)

# Extract patterns from each file
for dict_name in "${!dict_files[@]}"; do
    file_path="$DICT_DIR/${dict_files[$dict_name]}"
    if [ -f "$file_path" ]; then
        extract_patterns "$file_path" "$OUTPUT_DIR/${dict_name}_patterns.txt"
        pattern_count=$(wc -l < "$OUTPUT_DIR/${dict_name}_patterns.txt")
        echo "  $dict_name: $pattern_count patterns"
    else
        echo -e "${RED}❌ File not found: $file_path${NC}"
    fi
done

# Find duplicate patterns across dictionaries
echo -e "\n${YELLOW}🔍 Analyzing duplicate patterns...${NC}"

# Combine all patterns with source info
cat /dev/null > "$OUTPUT_DIR/all_patterns_with_source.txt"
for dict_name in "${!dict_files[@]}"; do
    if [ -f "$OUTPUT_DIR/${dict_name}_patterns.txt" ]; then
        while read -r pattern; do
            echo "$pattern|$dict_name" >> "$OUTPUT_DIR/all_patterns_with_source.txt"
        done < "$OUTPUT_DIR/${dict_name}_patterns.txt"
    fi
done

# Find duplicates
echo -e "${BLUE}📊 Duplicate Pattern Report${NC}" > "$OUTPUT_DIR/duplicate_report.txt"
echo "==============================" >> "$OUTPUT_DIR/duplicate_report.txt"

awk -F'|' '{
    patterns[$1] = patterns[$1] $2 ","
    count[$1]++
}
END {
    for (pattern in count) {
        if (count[pattern] > 1) {
            gsub(/,$/, "", patterns[pattern])
            print pattern " -> [" patterns[pattern] "]"
        }
    }
}' "$OUTPUT_DIR/all_patterns_with_source.txt" | sort > "$OUTPUT_DIR/duplicates.txt"

duplicate_count=$(wc -l < "$OUTPUT_DIR/duplicates.txt")
echo -e "${RED}❗ Found $duplicate_count duplicate patterns${NC}"

if [ $duplicate_count -gt 0 ]; then
    echo -e "\n${YELLOW}Top 10 Most Problematic Duplicates:${NC}"
    head -10 "$OUTPUT_DIR/duplicates.txt" | while read -r line; do
        echo "  $line"
    done
    echo -e "\n📄 Full report: $OUTPUT_DIR/duplicates.txt"
fi

# Analyze pattern complexity
echo -e "\n${YELLOW}🧮 Pattern Complexity Analysis...${NC}"

echo -e "${BLUE}Pattern Complexity Report${NC}" > "$OUTPUT_DIR/complexity_report.txt"
echo "=========================" >> "$OUTPUT_DIR/complexity_report.txt"

for dict_name in "${!dict_files[@]}"; do
    if [ -f "$OUTPUT_DIR/${dict_name}_patterns.txt" ]; then
        echo -e "\n$dict_name:" >> "$OUTPUT_DIR/complexity_report.txt"
        
        # Count simple vs complex patterns
        simple_count=$(grep -v '[\[\](){}|*+?^$]' "$OUTPUT_DIR/${dict_name}_patterns.txt" | wc -l)
        complex_count=$(grep '[\[\](){}|*+?^$]' "$OUTPUT_DIR/${dict_name}_patterns.txt" | wc -l)
        total_count=$(wc -l < "$OUTPUT_DIR/${dict_name}_patterns.txt")
        
        echo "  Simple patterns: $simple_count" >> "$OUTPUT_DIR/complexity_report.txt"
        echo "  Complex patterns: $complex_count" >> "$OUTPUT_DIR/complexity_report.txt"
        echo "  Total: $total_count" >> "$OUTPUT_DIR/complexity_report.txt"
        
        # Show complex patterns
        if [ $complex_count -gt 0 ]; then
            echo "  Complex patterns found:" >> "$OUTPUT_DIR/complexity_report.txt"
            grep '[\[\](){}|*+?^$]' "$OUTPUT_DIR/${dict_name}_patterns.txt" | head -5 | sed 's/^/    /' >> "$OUTPUT_DIR/complexity_report.txt"
        fi
        
        echo "  $dict_name: $simple_count simple, $complex_count complex"
    fi
done

# Generate priority suggestions based on semantic analysis
echo -e "\n${YELLOW}🎯 Generating Priority Suggestions...${NC}"

generate_priority_suggestions() {
    cat > "$OUTPUT_DIR/priority_suggestions.txt" << 'EOF'
Priority Assignment Suggestions
===============================

Based on semantic analysis of duplicate patterns:

HIGH PRIORITY (Catch first - most important):
- Emotional manipulation patterns (existential threat, think of the children)
- Gaslighting phrases (you're imagining things, that never happened)
- False dilemma constructions (either...or, pick a side)

MEDIUM PRIORITY (Catch second - clear bias):
- Opinion words with high certainty (absolutely, definitely)
- War metaphors (battle, fight, attack)
- Maximizers/crisis language (catastrophic, devastating)

LOW PRIORITY (Catch last - mild bias):
- Simple absolutes (all, every, never)
- Minimizers (just, only, merely)
- Basic to-be verbs (is, are, was)

RECOMMENDED DEDUPLICATION STRATEGY:
1. Move high-certainty words (absolutely, definitely) to emotional/opinion only
2. Keep war metaphors separate from general opinion words
3. Create shared constants for common absolute terms
4. Establish clear semantic boundaries between categories
EOF
}

generate_priority_suggestions

# Generate shared constants suggestion
echo -e "\n${YELLOW}⚙️ Generating Shared Constants...${NC}"

# Find the most common duplicates that should be shared
echo "// Suggested shared constants for deduplication" > "$OUTPUT_DIR/shared_constants.js"
echo "export const SHARED_PATTERNS = {" >> "$OUTPUT_DIR/shared_constants.js"

# High certainty words
echo "  HIGH_CERTAINTY: [" >> "$OUTPUT_DIR/shared_constants.js"
grep -E "(absolutely|definitely|certainly|undoubtedly|unquestionably|indisputably)" "$OUTPUT_DIR/duplicates.txt" | \
cut -d' ' -f1 | sort -u | sed 's/^/    "/' | sed 's/$/",' >> "$OUTPUT_DIR/shared_constants.js"
echo "  ]," >> "$OUTPUT_DIR/shared_constants.js"

# Universal quantifiers
echo "  UNIVERSAL_QUANTIFIERS: [" >> "$OUTPUT_DIR/shared_constants.js"
grep -E "(all|every|everyone|nobody|nothing|always|never)" "$OUTPUT_DIR/duplicates.txt" | \
cut -d' ' -f1 | sort -u | sed 's/^/    "/' | sed 's/$/",' >> "$OUTPUT_DIR/shared_constants.js"
echo "  ]," >> "$OUTPUT_DIR/shared_constants.js"

echo "};" >> "$OUTPUT_DIR/shared_constants.js"

# Generate automated fix script
echo -e "\n${YELLOW}🔧 Generating Automated Fix Script...${NC}"

cat > "$OUTPUT_DIR/apply_fixes.sh" << 'EOF'
#!/bin/bash

# Automated fixes for dictionary patterns
# Run this after reviewing the analysis reports

echo "🔧 Applying automated dictionary fixes..."

# Fix 1: Remove remaining escape sequences
echo "Cleaning escape sequences..."
find src/dictionaries -name "*.js" -type f -exec sed -i 's/\\\\b//g' {} \;
find src/dictionaries -name "*.js" -type f -exec sed -i 's/\\\\//g' {} \;

# Fix 2: Convert simple patterns to plain words
echo "Converting simple patterns to plain words..."
for file in src/dictionaries/*.js; do
    if [[ $(basename "$file") != "index.js" ]]; then
        # Remove word boundary markers from simple words
        sed -i 's/"\\b\([a-zA-Z ]*\)\\b"/"\1"/g' "$file"
    fi
done

echo "✅ Basic fixes applied. Review duplicates manually using analysis reports."
EOF

chmod +x "$OUTPUT_DIR/apply_fixes.sh"

# Generate summary report
echo -e "\n${GREEN}📋 Analysis Complete!${NC}"
echo "===================="

total_patterns=$(wc -l < "$OUTPUT_DIR/all_patterns_with_source.txt")
unique_patterns=$(cut -d'|' -f1 "$OUTPUT_DIR/all_patterns_with_source.txt" | sort -u | wc -l)

echo "📊 Summary:"
echo "  Total patterns: $total_patterns"
echo "  Unique patterns: $unique_patterns"
echo "  Duplicate patterns: $duplicate_count"
echo "  Dictionaries analyzed: ${#dict_files[@]}"

echo -e "\n📁 Generated Files:"
echo "  📄 $OUTPUT_DIR/duplicates.txt - Full duplicate report"
echo "  📄 $OUTPUT_DIR/complexity_report.txt - Pattern complexity analysis"
echo "  📄 $OUTPUT_DIR/priority_suggestions.txt - Priority assignment guide"
echo "  📄 $OUTPUT_DIR/shared_constants.js - Suggested shared patterns"
echo "  🔧 $OUTPUT_DIR/apply_fixes.sh - Automated fix script"

echo -e "\n${YELLOW}🎯 Recommended Next Steps:${NC}"
echo "1. Review duplicate report: cat $OUTPUT_DIR/duplicates.txt"
echo "2. Check priority suggestions: cat $OUTPUT_DIR/priority_suggestions.txt"
echo "3. Apply basic fixes: ./$OUTPUT_DIR/apply_fixes.sh"
echo "4. Manually deduplicate high-priority conflicts"
echo "5. Test the extension after changes"

echo -e "\n${GREEN}✅ Analysis complete! Check the $OUTPUT_DIR directory for detailed reports.${NC}"

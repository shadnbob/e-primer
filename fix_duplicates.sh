#!/bin/bash

# Fix Dictionary Duplicates - Remove patterns from less appropriate dictionaries
# Based on semantic priority analysis

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🔧 Fixing Dictionary Duplicates${NC}"
echo "=================================="

# Create backup first
BACKUP_DIR="dictionary-backups-$(date +%Y%m%d-%H%M%S)"
echo -e "${YELLOW}📦 Creating backup...${NC}"
cp -r src/dictionaries "$BACKUP_DIR"
echo "✅ Backup created: $BACKUP_DIR"

echo -e "\n${YELLOW}🎯 Applying semantic priority fixes...${NC}"

# Fix 1: Remove high-certainty subjective words from absolute-words.js
# Keep these in opinion-words.js (they're subjective certainty, not universal absolutes)
echo "1. Removing subjective certainty words from absolute-words.js..."
sed -i '/"absolutely"/d' src/dictionaries/absolute-words.js
sed -i '/"certainly"/d' src/dictionaries/absolute-words.js
sed -i '/"definitely"/d' src/dictionaries/absolute-words.js
sed -i '/"completely"/d' src/dictionaries/absolute-words.js
sed -i '/"totally"/d' src/dictionaries/absolute-words.js
sed -i '/"entirely"/d' src/dictionaries/absolute-words.js
sed -i '/"perfectly"/d' src/dictionaries/absolute-words.js
sed -i '/"wholly"/d' src/dictionaries/absolute-words.js
sed -i '/"thoroughly"/d' src/dictionaries/absolute-words.js

echo "   ✅ Removed subjective certainty words from absolute-words.js"

# Fix 2: Remove attribution/hedging words from opinion-words.js
# Keep these in weasel-phrases.js (they're about vague attribution)
echo "2. Removing attribution words from opinion-words.js..."
sed -i '/"allegedly"/d' src/dictionaries/opinion-words.js
sed -i '/"arguably"/d' src/dictionaries/opinion-words.js
sed -i '/"supposedly"/d' src/dictionaries/opinion-words.js
sed -i '/"reportedly"/d' src/dictionaries/opinion-words.js
sed -i '/"purportedly"/d' src/dictionaries/opinion-words.js
sed -i '/"presumably"/d' src/dictionaries/opinion-words.js

echo "   ✅ Removed attribution words from opinion-words.js"

# Fix 3: Remove maximizers/hyperbole from opinion-words.js
# Keep these in maximizers.js (they're about exaggeration, not just opinion)
echo "3. Removing maximizers from opinion-words.js..."
sed -i '/"amazing"/d' src/dictionaries/opinion-words.js
sed -i '/"astonishing"/d' src/dictionaries/opinion-words.js
sed -i '/"incredible"/d' src/dictionaries/opinion-words.js
sed -i '/"extraordinary"/d' src/dictionaries/opinion-words.js
sed -i '/"phenomenal"/d' src/dictionaries/opinion-words.js
sed -i '/"spectacular"/d' src/dictionaries/opinion-words.js
sed -i '/"tremendous"/d' src/dictionaries/opinion-words.js
sed -i '/"enormous"/d' src/dictionaries/opinion-words.js
sed -i '/"massive"/d' src/dictionaries/opinion-words.js
sed -i '/"huge"/d' src/dictionaries/opinion-words.js

echo "   ✅ Removed maximizers from opinion-words.js"

# Fix 4: Remove "alternative facts" from false-balance.js
# Keep in gaslighting.js (it's more about reality denial than false balance)
echo "4. Removing 'alternative facts' from false-balance.js..."
sed -i '/"alternative facts"/d' src/dictionaries/false-balance.js

echo "   ✅ Removed 'alternative facts' from false-balance.js"

# Fix 5: Remove "do or die" from false-dilemma.js
# Keep in emotional-triggers.js (it's more about urgency/pressure than false choice)
echo "5. Removing 'do or die' from false-dilemma.js..."
sed -i '/"do or die"/d' src/dictionaries/false-dilemma.js

echo "   ✅ Removed 'do or die' from false-dilemma.js"

# Fix 6: Remove emotional crisis words from opinion-words.js
# Keep these in emotional-triggers.js or maximizers.js
echo "6. Removing crisis/emotional words from opinion-words.js..."
sed -i '/"devastating"/d' src/dictionaries/opinion-words.js
sed -i '/"catastrophic"/d' src/dictionaries/opinion-words.js
sed -i '/"shocking"/d' src/dictionaries/opinion-words.js
sed -i '/"outrageous"/d' src/dictionaries/opinion-words.js
sed -i '/"scandalous"/d' src/dictionaries/opinion-words.js
sed -i '/"appalling"/d' src/dictionaries/opinion-words.js

echo "   ✅ Removed crisis words from opinion-words.js"

# Fix 7: Remove minimizer overlaps
echo "7. Removing minimizer overlaps from opinion-words.js..."
sed -i '/"merely"/d' src/dictionaries/opinion-words.js
sed -i '/"simply"/d' src/dictionaries/opinion-words.js

echo "   ✅ Removed minimizers from opinion-words.js"

# Verify changes
echo -e "\n${YELLOW}🔍 Verifying fixes...${NC}"

# Count remaining patterns in each file
count_patterns() {
    grep -o '"[^"]*"' "$1" | wc -l
}

echo "Pattern counts after deduplication:"
echo "  absolute-words.js: $(count_patterns src/dictionaries/absolute-words.js) patterns"
echo "  opinion-words.js: $(count_patterns src/dictionaries/opinion-words.js) patterns"
echo "  weasel-phrases.js: $(count_patterns src/dictionaries/weasel-phrases.js) patterns"
echo "  maximizers.js: $(count_patterns src/dictionaries/maximizers.js) patterns"
echo "  emotional-triggers.js: $(count_patterns src/dictionaries/emotional-triggers.js) patterns"

# Check if the main conflicts are resolved
echo -e "\n${YELLOW}🎯 Testing key conflict resolution:${NC}"

check_pattern() {
    local pattern="$1"
    local file="$2"
    if grep -q "\"$pattern\"" "$file"; then
        echo "  ✅ '$pattern' found in $(basename "$file")"
    else
        echo "  ❌ '$pattern' NOT found in $(basename "$file")"
    fi
}

echo "Checking 'absolutely' (should only be in opinion-words.js):"
check_pattern "absolutely" "src/dictionaries/opinion-words.js"
if grep -q '"absolutely"' src/dictionaries/absolute-words.js; then
    echo "  ❌ 'absolutely' still in absolute-words.js"
else
    echo "  ✅ 'absolutely' removed from absolute-words.js"
fi

echo -e "\nChecking 'allegedly' (should only be in weasel-phrases.js):"
check_pattern "allegedly" "src/dictionaries/weasel-phrases.js"
if grep -q '"allegedly"' src/dictionaries/opinion-words.js; then
    echo "  ❌ 'allegedly' still in opinion-words.js"
else
    echo "  ✅ 'allegedly' removed from opinion-words.js"
fi

echo -e "\nChecking 'amazing' (should only be in maximizers.js):"
check_pattern "amazing" "src/dictionaries/maximizers.js"
if grep -q '"amazing"' src/dictionaries/opinion-words.js; then
    echo "  ❌ 'amazing' still in opinion-words.js"
else
    echo "  ✅ 'amazing' removed from opinion-words.js"
fi

# Generate rebuild command
echo -e "\n${GREEN}✅ Dictionary deduplication complete!${NC}"
echo "=================================="
echo -e "${YELLOW}🔄 Next steps:${NC}"
echo "1. Rebuild the extension: npm run build"
echo "2. Test with your test files to verify highlighting works"
echo "3. Check that 'absolutely' now highlights properly"
echo ""
echo -e "${BLUE}📊 Summary of changes:${NC}"
echo "• Moved subjective certainty words to opinion-words.js only"
echo "• Moved attribution words to weasel-phrases.js only" 
echo "• Moved hyperbole/maximizers to maximizers.js only"
echo "• Moved crisis language to emotional-triggers.js only"
echo "• Resolved semantic conflicts between dictionaries"
echo ""
echo -e "${GREEN}🎯 This should fix the 'absolutely' highlighting issue!${NC}"

# Optional: Run a quick duplicate check
echo -e "\n${YELLOW}📋 Quick duplicate recheck (top 5):${NC}"
temp_file=$(mktemp)
for dict in src/dictionaries/*.js; do
    if [[ $(basename "$dict") != "index.js" ]]; then
        dict_name=$(basename "$dict" .js)
        grep -o '"[^"]*"' "$dict" | sed 's/"//g' | while read pattern; do
            echo "$pattern|$dict_name"
        done >> "$temp_file"
    fi
done

echo "Remaining duplicates:"
awk -F'|' '{count[$1]++; files[$1] = files[$1] $2 ","} END {for (pattern in count) if (count[pattern] > 1) print pattern " -> [" substr(files[pattern], 1, length(files[pattern])-1) "]"}' "$temp_file" | head -5

rm -f "$temp_file"

echo -e "\n${GREEN}🎉 Ready to test! Run: npm run build${NC}"


# Rhetorical Devices Pattern Fix

## Issues Fixed

### 1. **False Balance Markers** ✅

**Problem**: Many false balance phrases weren't being detected.

**Missing patterns added**:
- "controversial issue"
- "ongoing debate"
- "two schools of thought"
- "alternative viewpoints"
- "matter of opinion"
- "playing devil's advocate"
- "divisive issue"
- "supporters and critics"
- "different perspectives"
- "contentious matter"
- "strengths and weaknesses"
- "polarizing topic"

### 2. **Euphemisms and Dysphemisms** ✅

**Problem**: Many euphemisms and dysphemisms weren't being detected.

**Missing patterns added**:

**Military/Political**:
- "kinetic action"
- "strategic withdrawal"
- "enhanced enforcement"

**Corporate**:
- "negative growth"
- "challenging market conditions"
- "synergy realization"

**Social**:
- "senior citizens"
- "golden years"
- "economically disadvantaged"
- "differently abled"
- "special needs"

**Immigration**:
- "undocumented workers"
- "illegal aliens"
- "chain migration"

**Political Dysphemisms**:
- "death tax"
- "socialized medicine"
- "government takeover"
- "nanny state"
- "job killers"
- "tax and spend"

## Testing the Fix

1. **Reload the extension** in Chrome
2. **Open** `test-rhetorical-devices.html`
3. **Enable** in the popup:
   - "False Balance Markers" (indigo highlights)
   - "Euphemisms/Dysphemisms" (dark green highlights)
4. **Verify** all the bolded phrases in the test page are now highlighted

## Expected Results

The example paragraph:
> "This **divisive issue** has **supporters and critics** on both sides. From **different perspectives**, the **contentious matter** looks quite different. We must examine the **strengths and weaknesses** of each position to find **middle ground**."

Should now have all phrases highlighted in indigo (false balance color).

Similarly, all the euphemisms and dysphemisms in the test page should now be highlighted in dark green.

## Files Changed

- `content.js` - Updated falsebalance and euphemism dictionaries with missing patterns

# Bias Detection Flow Chart

```mermaid
flowchart TD
    %% Entry Points
    START[Document Load / Settings Change]
    INIT[Initialize BiasDetector]
    
    %% Settings Check
    SETTINGS{Settings<br/>Enabled?}
    WAIT[Wait for Changes]
    
    %% Document Analysis Start
    ANALYZE[analyzeDocument()]
    CLEAR[Clear Existing Highlights]
    COLLECT[Collect Text Nodes]
    BATCH[Process in Batches]
    
    %% Text Node Processing
    TEXTNODE[Process Text Node]
    CHECKUI{Is UI Text?}
    SKIP[Skip Node]
    
    %% Mode Detection
    MODE{Analysis Mode?}
    PROBLEMS[Detect Problems]
    EXCELLENCE[Detect Excellence]
    BALANCED[Detect Both]
    
    %% Problem Detection Flow
    subgraph "Problem Detection"
        PLOOP[For Each Bias Type]
        PENABLED{Type Enabled?}
        PPATTERNS[Get Compiled Patterns]
        PREGEX[Run Regex Matching]
        PMATCHES[Collect Matches]
        PINTENSITY[Calculate Intensity]
        PPORTRAYAL[Detect Portrayal]
    end
    
    %% Excellence Detection Flow
    subgraph "Excellence Detection"
        ELOOP[For Each Excellence Type]
        EENABLED{Type Enabled?}
        EPATTERNS[Get Excellence Patterns]
        EREGEX[Run Excellence Matching]
        EMATCHES[Collect Excellence Matches]
        EFILTER[Filter by Settings]
    end
    
    %% Match Processing
    COMBINE[Combine All Matches]
    DEDUP[Remove Overlaps]
    SORT[Sort by Position]
    
    %% DOM Updates
    HIGHLIGHT{Any Matches?}
    FRAGMENT[Create Highlighted Fragment]
    REPLACE[Replace Text Node]
    STATS[Update Statistics]
    
    %% Hover System
    HOVER[Setup Hover Listeners]
    HOVERCARD[Generate Hover Content]
    
    %% Performance Monitoring
    PERF[Update Performance Metrics]
    HEALTH[Calculate Health Score]
    
    %% Mutation Observer
    OBSERVER[Setup Mutation Observer]
    MUTATION[DOM Change Detected]
    DEBOUNCE[Debounce Changes]
    EXTRACT[Extract Changed Nodes]
    
    %% End States
    COMPLETE[Analysis Complete]
    ERROR[Handle Error]
    
    %% Flow Connections
    START --> INIT
    INIT --> SETTINGS
    SETTINGS -->|No| WAIT
    SETTINGS -->|Yes| ANALYZE
    WAIT --> MUTATION
    
    ANALYZE --> CLEAR
    CLEAR --> COLLECT
    COLLECT --> BATCH
    BATCH --> TEXTNODE
    
    TEXTNODE --> CHECKUI
    CHECKUI -->|Yes| SKIP
    CHECKUI -->|No| MODE
    
    MODE -->|problems| PROBLEMS
    MODE -->|excellence| EXCELLENCE
    MODE -->|balanced| BALANCED
    
    PROBLEMS --> PLOOP
    PLOOP --> PENABLED
    PENABLED -->|No| PLOOP
    PENABLED -->|Yes| PPATTERNS
    PPATTERNS --> PREGEX
    PREGEX --> PMATCHES
    PMATCHES --> PINTENSITY
    PINTENSITY --> PPORTRAYAL
    PPORTRAYAL --> PLOOP
    
    EXCELLENCE --> ELOOP
    ELOOP --> EENABLED
    EENABLED -->|No| ELOOP
    EENABLED -->|Yes| EPATTERNS
    EPATTERNS --> EREGEX
    EREGEX --> EMATCHES
    EMATCHES --> EFILTER
    EFILTER --> ELOOP
    
    BALANCED --> PROBLEMS
    BALANCED --> EXCELLENCE
    
    PLOOP --> COMBINE
    ELOOP --> COMBINE
    COMBINE --> DEDUP
    DEDUP --> SORT
    SORT --> HIGHLIGHT
    
    HIGHLIGHT -->|No| SKIP
    HIGHLIGHT -->|Yes| FRAGMENT
    FRAGMENT --> REPLACE
    REPLACE --> STATS
    STATS --> HOVER
    HOVER --> HOVERCARD
    
    SKIP --> PERF
    HOVERCARD --> PERF
    PERF --> HEALTH
    HEALTH --> COMPLETE
    
    COMPLETE --> OBSERVER
    OBSERVER --> MUTATION
    MUTATION --> DEBOUNCE
    DEBOUNCE --> EXTRACT
    EXTRACT --> BATCH
    
    %% Error Handling
    INIT -.-> ERROR
    ANALYZE -.-> ERROR
    TEXTNODE -.-> ERROR
    ERROR --> WAIT
    
    %% Styling
    classDef start fill:#e8f5e8
    classDef process fill:#e1f5fe
    classDef decision fill:#fff3e0
    classDef detection fill:#f3e5f5
    classDef dom fill:#fce4ec
    classDef error fill:#ffebee
    
    class START,COMPLETE start
    class INIT,ANALYZE,CLEAR,COLLECT,BATCH,TEXTNODE,COMBINE,DEDUP,SORT,FRAGMENT,REPLACE,STATS,HOVER,HOVERCARD,PERF,HEALTH,OBSERVER,DEBOUNCE,EXTRACT process
    class SETTINGS,CHECKUI,MODE,HIGHLIGHT decision
    class PLOOP,PENABLED,PPATTERNS,PREGEX,PMATCHES,PINTENSITY,PPORTRAYAL,ELOOP,EENABLED,EPATTERNS,EREGEX,EMATCHES,EFILTER detection
    class MUTATION,SKIP,WAIT dom
    class ERROR error
```

## Key Phases

### **1. Initialization & Settings**
- Document ready triggers initialization
- Settings loaded from Chrome storage
- Analysis starts only if enabled

### **2. Document Analysis**
- Clear existing highlights
- Collect all text nodes from DOM
- Process in batches for performance

### **3. Text Node Processing**
- Skip UI elements (buttons, labels)
- Apply analysis mode (problems/excellence/balanced)
- Run pattern matching for enabled types

### **4. Pattern Detection**
- **Problems**: Run regex patterns for each enabled bias type
- **Excellence**: Detect positive writing patterns
- Calculate intensity and portrayal for matches

### **5. Match Processing**
- Combine all matches from different detectors
- Remove overlapping matches (prefer longer ones)
- Sort by position in text

### **6. DOM Updates**
- Create highlighted document fragments
- Replace original text nodes
- Update statistics and health score
- Setup hover card listeners

### **7. Continuous Monitoring**
- Mutation observer watches for DOM changes
- Debounced re-analysis of changed content
- Performance metrics tracking

## Performance Optimizations

- **Batch Processing**: Text nodes processed in groups of 50
- **Pre-compiled Patterns**: Regex patterns compiled once at startup
- **Debounced Updates**: DOM changes debounced to 1000ms
- **Selective Processing**: Skip UI text and short content
- **Memory Management**: Cleanup observers on page unload
# User Interaction Flow

```mermaid
journey
    title E-Prime Bias Detector User Journey
    
    section Installation & Setup
        Install Extension: 5: User
        First Page Load: 3: User, System
        Auto-Analysis Starts: 4: System
        See Initial Highlights: 4: User
        
    section Basic Usage
        Open Popup: 5: User
        View Health Score: 4: User
        See Statistics: 4: User
        Toggle Bias Types: 5: User
        See Updated Highlights: 4: User, System
        
    section Hover Interactions
        Hover Over Highlight: 5: User
        Read Tooltip: 4: User
        Click for Details: 5: User
        Read Full Explanation: 5: User
        See Examples: 4: User
        
    section Mode Switching
        Change Analysis Mode: 5: User
        Switch to Excellence Only: 4: User
        Switch to Problems Only: 4: User
        Switch to Balanced View: 5: User
        
    section Advanced Usage
        Refresh Analysis: 4: User
        Clear All Highlights: 3: User
        View Performance Info: 2: User
        Adjust Advanced Settings: 3: User
```

## Detailed User Interaction Flows

### **1. Initial User Experience**
```mermaid
flowchart TD
    START[User Visits Web Page]
    INSTALL{Extension<br/>Installed?}
    GUIDE[Install from Chrome Store]
    
    LOAD[Page Loads]
    AUTO[Auto-Analysis Starts]
    HIGHLIGHTS[Highlights Appear]
    
    DISCOVER[User Discovers Highlights]
    HOVER[User Hovers Over Highlight]
    TOOLTIP[Simple Tooltip Shows]
    CLICK[User Clicks for Details]
    DETAILED[Detailed Hover Card]
    
    POPUP[User Opens Popup]
    EXPLORE[Explore Settings]
    CUSTOMIZE[Customize Detection Types]
    
    START --> INSTALL
    INSTALL -->|No| GUIDE
    INSTALL -->|Yes| LOAD
    GUIDE --> LOAD
    LOAD --> AUTO
    AUTO --> HIGHLIGHTS
    HIGHLIGHTS --> DISCOVER
    DISCOVER --> HOVER
    HOVER --> TOOLTIP
    TOOLTIP --> CLICK
    CLICK --> DETAILED
    DETAILED --> POPUP
    POPUP --> EXPLORE
    EXPLORE --> CUSTOMIZE
    
    classDef userAction fill:#e3f2fd
    classDef systemAction fill:#f3e5f5
    classDef discovery fill:#e8f5e8
    
    class START,GUIDE,DISCOVER,HOVER,CLICK,POPUP,EXPLORE,CUSTOMIZE userAction
    class LOAD,AUTO,HIGHLIGHTS,TOOLTIP,DETAILED systemAction
    class INSTALL discovery
```

### **2. Popup Interface Interactions**
```mermaid
stateDiagram-v2
    [*] --> PopupClosed
    
    PopupClosed --> PopupOpening : User clicks extension icon
    PopupOpening --> PopupLoaded : Settings loaded
    
    state PopupLoaded {
        [*] --> ViewingStats
        ViewingStats --> ChangingMode : Select analysis mode
        ViewingStats --> TogglingBias : Toggle bias type
        ViewingStats --> RefreshingAnalysis : Click refresh
        ViewingStats --> ClearingHighlights : Click clear
        
        ChangingMode --> ViewingStats : Mode applied
        TogglingBias --> ViewingStats : Settings saved
        RefreshingAnalysis --> ViewingStats : Analysis complete
        ClearingHighlights --> ViewingStats : Highlights cleared
        
        state ViewingStats {
            [*] --> HealthScore
            HealthScore --> BiasStats : Scroll down
            BiasStats --> ExcellenceStats : Continue scrolling
            ExcellenceStats --> HealthScore : Scroll up
        }
        
        state ChangingMode {
            [*] --> ProblemsOnly
            ProblemsOnly --> ExcellenceOnly : Select excellence
            ProblemsOnly --> BalancedView : Select balanced
            ExcellenceOnly --> ProblemsOnly : Select problems
            ExcellenceOnly --> BalancedView : Select balanced
            BalancedView --> ProblemsOnly : Select problems
            BalancedView --> ExcellenceOnly : Select excellence
        }
    }
    
    PopupLoaded --> PopupClosed : User closes popup
    PopupClosed --> [*]
```

### **3. Hover Card Interaction System**
```mermaid
flowchart TD
    subgraph "Hover Detection"
        MOUSE[Mouse Enter Highlight]
        DELAY[100ms Delay]
        SHOW[Show Simple Tooltip]
    end
    
    subgraph "Click Interaction"
        CLICK[User Clicks Highlight]
        GENERATE[Generate Detailed Card]
        POSITION[Calculate Position]
        DISPLAY[Display Hover Card]
    end
    
    subgraph "Card Content"
        HEADER[Bias Type Header]
        QUOTE[Quoted Text]
        BASIC[Basic Description]
        EXPANDED[Expanded Information]
        EXAMPLES[Examples Section]
        CHECKLIST[Look-For Checklist]
    end
    
    subgraph "Card Interactions"
        READ[User Reads Content]
        SCROLL[Scroll Through Sections]
        LEARN[Learn About Bias Type]
        CLOSE[Click Away to Close]
    end
    
    MOUSE --> DELAY
    DELAY --> SHOW
    SHOW --> CLICK
    CLICK --> GENERATE
    GENERATE --> POSITION
    POSITION --> DISPLAY
    
    DISPLAY --> HEADER
    HEADER --> QUOTE
    QUOTE --> BASIC
    BASIC --> EXPANDED
    EXPANDED --> EXAMPLES
    EXAMPLES --> CHECKLIST
    
    CHECKLIST --> READ
    READ --> SCROLL
    SCROLL --> LEARN
    LEARN --> CLOSE
    
    %% Styling
    classDef interaction fill:#e1f5fe
    classDef content fill:#f3e5f5
    classDef learning fill:#e8f5e8
    
    class MOUSE,CLICK,READ,SCROLL,CLOSE interaction
    class HEADER,QUOTE,BASIC,EXPANDED,EXAMPLES,CHECKLIST content
    class LEARN learning
```

### **4. Settings Change Flow**
```mermaid
flowchart TD
    USER[User Changes Setting]
    
    %% Different types of changes
    TYPE{Change Type?}
    TOGGLE[Toggle Bias Detection]
    MODE[Change Analysis Mode]
    ENABLE[Enable/Disable Analysis]
    
    %% Immediate UI Updates
    UI_UPDATE[Update UI State]
    SAVE[Save to Chrome Storage]
    
    %% Content Script Communication
    SEND[Send to Content Script]
    RESPONSE{Response OK?}
    ERROR[Show Error Message]
    
    %% Different processing paths
    PROCESS{Processing Type?}
    SELECTIVE[Selective Update]
    FULL[Full Re-analysis]
    DISABLE[Disable Analysis]
    
    %% Results
    STATS[Update Statistics]
    VISUAL[Update Visual Feedback]
    COMPLETE[Change Complete]
    
    USER --> TYPE
    TYPE --> TOGGLE
    TYPE --> MODE
    TYPE --> ENABLE
    
    TOGGLE --> UI_UPDATE
    MODE --> UI_UPDATE
    ENABLE --> UI_UPDATE
    
    UI_UPDATE --> SAVE
    SAVE --> SEND
    SEND --> RESPONSE
    RESPONSE -->|Error| ERROR
    RESPONSE -->|OK| PROCESS
    
    ERROR --> UI_UPDATE
    
    PROCESS --> SELECTIVE
    PROCESS --> FULL
    PROCESS --> DISABLE
    
    SELECTIVE --> STATS
    FULL --> STATS
    DISABLE --> STATS
    
    STATS --> VISUAL
    VISUAL --> COMPLETE
    
    classDef userAction fill:#e3f2fd
    classDef systemProcess fill:#f3e5f5
    classDef decision fill:#fff3e0
    classDef result fill:#e8f5e8
    classDef error fill:#ffebee
    
    class USER userAction
    class UI_UPDATE,SAVE,SEND,SELECTIVE,FULL,DISABLE,STATS,VISUAL systemProcess
    class TYPE,RESPONSE,PROCESS decision
    class COMPLETE result
    class ERROR error
```

## User Experience Principles

### **Progressive Disclosure**
1. **Initial**: Simple tooltips on hover
2. **Detailed**: Rich hover cards on click
3. **Advanced**: Full settings in popup

### **Real-time Feedback**
- Instant UI updates on setting changes
- Visual feedback during processing
- Clear error messages for failures

### **Non-intrusive Design**
- Highlights blend naturally with page content
- Popup interface is compact and focused
- Hover cards appear only on user interaction

### **Educational Focus**
- Explanations help users understand bias types
- Examples show problematic vs. acceptable usage
- Contextual guidance for different content types

### **Performance Awareness**
- Smooth interactions despite heavy processing
- Debounced updates prevent interface lag
- Background processing doesn't block user actions
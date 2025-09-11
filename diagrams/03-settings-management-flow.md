# Settings Management Flow

```mermaid
sequenceDiagram
    participant U as User
    participant P as Popup UI
    participant SM as SettingsManager
    participant CS as Chrome Storage
    participant CT as Content Script
    participant BD as BiasDetector
    participant DOM as Web Page DOM

    %% Initial Load
    Note over P,SM: Popup Opens
    P->>SM: loadSettings()
    SM->>CS: chrome.storage.sync.get(defaults)
    CS->>SM: return stored settings
    SM->>SM: validateSettings()
    SM->>P: updateUI() with validated settings
    P->>P: Update toggles and displays
    
    %% Settings Change
    Note over U,P: User Changes Setting
    U->>P: Toggle bias type on/off
    P->>SM: handleToggleChange(key, value)
    SM->>SM: Update currentSettings
    SM->>CS: chrome.storage.sync.set(newSettings)
    CS->>SM: Confirm save
    SM->>CT: sendToContentScript(settings)
    
    %% Content Script Response
    CT->>BD: updateSettings(newSettings)
    BD->>BD: validateSettings()
    
    alt Analysis Enabled
        BD->>BD: handleDetectorChanges()
        alt Detector Disabled
            BD->>DOM: removeSpecificHighlights()
            BD->>BD: Reset stats for type
        else Detector Enabled
            BD->>BD: analyzeDocument()
            BD->>DOM: Add new highlights
        end
    else Analysis Disabled
        BD->>DOM: removeAllHighlights()
        BD->>BD: disconnectObserver()
    end
    
    BD->>CT: return updated stats
    CT->>P: Send response with stats
    P->>P: updateStats(newStats)
    
    %% Mode Change
    Note over U,P: User Changes Analysis Mode
    U->>P: Select mode (problems/excellence/balanced)
    P->>SM: handleModeChange(newMode)
    SM->>SM: Update analysisMode setting
    SM->>CS: Save to storage
    SM->>CT: Send updated settings
    CT->>BD: updateSettings()
    BD->>BD: Full re-analysis with new mode
    BD->>DOM: Update highlights based on mode
    BD->>CT: Return stats
    CT->>P: Send updated stats
    P->>P: Update status text and displays
    
    %% Refresh Button
    Note over U,P: User Clicks Refresh
    U->>P: Click refresh button
    P->>CT: forceAnalyze()
    CT->>BD: clearHighlights()
    CT->>BD: forceAnalyze()
    BD->>DOM: Remove all highlights
    BD->>DOM: Full re-analysis
    BD->>BD: setupMutationObserver()
    BD->>CT: Return analysis results
    CT->>P: Send success + stats
    P->>P: Update displays and re-enable button
    
    %% Error Handling
    Note over SM,CT: Error Scenarios
    alt Storage Error
        CS-->>SM: Chrome runtime error
        SM->>P: Show error state
    else Content Script Error
        CT-->>P: Error response
        P->>P: Show error message
    else Settings Validation Error
        SM->>SM: Use default settings
        SM->>P: Update UI with defaults
    end
```

## Settings Flow Components

### **1. Settings Manager (popup/SettingsManager.js)**
```mermaid
graph TD
    subgraph "SettingsManager Responsibilities"
        A[Load Settings from Storage]
        B[Validate Settings with BiasConfig]
        C[Save Settings to Chrome Storage]
        D[Send Settings to Content Script]
        E[Handle Setting Changes]
        F[Manage Event Listeners]
    end
    
    A --> B
    B --> C
    C --> D
    E --> B
    F --> E
```

### **2. Settings Validation Process**
```mermaid
flowchart TD
    START[Settings Input]
    VALIDATE[BiasConfig.validateSettings()]
    
    %% Check each setting
    LOOP[For Each Setting Key]
    TYPE{Setting Type?}
    
    %% Different validation paths
    ENABLE[enableAnalysis: Boolean]
    MODE[analysisMode: String Enum]
    BIAS[Bias Type: Boolean]
    EXCEL[Excellence Type: Boolean]
    
    %% Validation results
    VALID{Valid?}
    DEFAULT[Use Default Value]
    KEEP[Keep User Value]
    
    %% Final result
    RESULT[Validated Settings Object]
    
    START --> VALIDATE
    VALIDATE --> LOOP
    LOOP --> TYPE
    
    TYPE -->|enableAnalysis| ENABLE
    TYPE -->|analysisMode| MODE
    TYPE -->|bias setting| BIAS
    TYPE -->|excellence setting| EXCEL
    
    ENABLE --> VALID
    MODE --> VALID
    BIAS --> VALID
    EXCEL --> VALID
    
    VALID -->|No| DEFAULT
    VALID -->|Yes| KEEP
    
    DEFAULT --> LOOP
    KEEP --> LOOP
    LOOP --> RESULT
```

### **3. Chrome Storage Integration**
```mermaid
graph LR
    subgraph "Chrome Storage API"
        direction TB
        GET[chrome.storage.sync.get]
        SET[chrome.storage.sync.set]
        LISTEN[chrome.storage.onChanged]
    end
    
    subgraph "Settings Data"
        direction TB
        DEFAULTS[Default Settings]
        USER[User Settings]
        MERGED[Merged Settings]
    end
    
    subgraph "Error Handling"
        direction TB
        ERRORS[Chrome Runtime Errors]
        FALLBACK[Fallback to Defaults]
        RETRY[Retry Logic]
    end
    
    GET --> USER
    DEFAULTS --> MERGED
    USER --> MERGED
    SET --> USER
    
    ERRORS --> FALLBACK
    ERRORS --> RETRY
```

## Key Features

### **Settings Validation**
- All settings validated against BiasConfig schema
- Invalid values replaced with defaults
- Type checking (boolean, string enums)
- Ensures only valid bias types are enabled

### **Persistent Storage**
- Uses Chrome's sync storage for cross-device settings
- Automatic fallback to defaults on storage errors
- Validation on every load and save operation

### **Real-time Updates**
- Changes immediately sent to content script
- Selective re-analysis based on what changed
- UI updates reflect current state

### **Error Recovery**
- Chrome storage errors handled gracefully
- Content script communication failures retry
- Invalid settings corrected automatically

### **Performance Optimizations**
- Settings cached in memory during popup session
- Debounced updates prevent excessive processing
- Batch setting changes when possible
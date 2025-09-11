# Data Structures & Configuration Schema

## 1. BiasConfig Data Structure

```mermaid
classDiagram
    class BiasConfig {
        +BIAS_TYPES: Object
        +EXCELLENCE_TYPES: Object
        +CATEGORIES: Object
        +PERFORMANCE: Object
        +getDefaultSettings(): Object
        +validateSettings(settings): Object
        +getBiasTypeConfig(id): Object
        +getEnabledBiasTypes(settings): Array
    }
    
    class BiasType {
        +id: string
        +name: string
        +description: string
        +category: string
        +color: string
        +className: string
        +settingKey: string
        +statKey: string
        +enabled: boolean
        +tooltip: string
        +basicTip: string
        +whenConcerning: string
        +whenAcceptable: string
        +lookFor: Array~string~
        +examples: ExampleSet
        +contextualGuidance: ContextualGuidance
    }
    
    class ExcellenceType {
        +id: string
        +name: string
        +description: string
        +className: string
        +settingKey: string
        +statKey: string
        +enabled: boolean
        +basicTip: string
        +whenExcellent: string
        +howToEnhance: string
        +examples: ExcellenceExamples
        +lookFor: Array~string~
    }
    
    class ExampleSet {
        +problematic: Array~string~
        +acceptable: Array~string~
    }
    
    class ExcellenceExamples {
        +excellent: Array~string~
        +enhance: Array~string~
    }
    
    class ContextualGuidance {
        +academic: string
        +news: string
        +opinion: string
        +instructions: string
    }
    
    class Category {
        +name: string
        +description: string
        +icon: string
        +expanded: boolean
    }
    
    BiasConfig --> BiasType : contains 15
    BiasConfig --> ExcellenceType : contains 5
    BiasConfig --> Category : contains 4
    BiasType --> ExampleSet
    BiasType --> ContextualGuidance
    ExcellenceType --> ExcellenceExamples
```

## 2. Pattern Matching System

```mermaid
classDiagram
    class BiasPatterns {
        +rawPatterns: Map
        +compiledPatterns: Map
        +loadRawPatterns(): Object
        +compileAllPatterns(): void
        +compilePattern(pattern, type): CompiledPattern
        +getCompiledPatterns(type): Array
        +getPatternStats(): Object
    }
    
    class CompiledPattern {
        +source: string
        +regex: RegExp
        +type: string
        +isComplex: boolean
    }
    
    class PatternDictionary {
        +name: string
        +patterns: Array~string~
    }
    
    BiasPatterns --> CompiledPattern : creates
    BiasPatterns --> PatternDictionary : imports from
    
    note for BiasPatterns "Compiles 15 pattern dictionaries\ninto optimized regex patterns"
```

## 3. Detection Match Data Structure

```mermaid
classDiagram
    class Match {
        +index: number
        +length: number
        +text: string
        +type: string
        +pattern: string
        +intensity?: number
        +portrayal?: Portrayal
        +subCategory?: SubCategory
        +isExcellence?: boolean
    }
    
    class Portrayal {
        +valence: string
        +type: string
    }
    
    class SubCategory {
        +id: string
        +name: string
        +implication: string
        +color: string
    }
    
    class ExcellenceMatch {
        +index: number
        +length: number
        +text: string
        +type: string
        +isExcellence: boolean = true
        +confidence: number
    }
    
    Match --> Portrayal
    Match --> SubCategory
    
    note for Match "Used for bias detection results"
    note for ExcellenceMatch "Used for excellence detection results"
```

## 4. Statistics & Health Scoring

```mermaid
classDiagram
    class Statistics {
        +healthScore: number
        +opinionCount: number
        +toBeCount: number
        +absoluteCount: number
        +passiveCount: number
        +weaselCount: number
        +presuppositionCount: number
        +metaphorCount: number
        +minimizerCount: number
        +maximizerCount: number
        +falseBalanceCount: number
        +euphemismCount: number
        +emotionalCount: number
        +gaslightingCount: number
        +falseDilemmaCount: number
        +probabilityCount: number
        +attributionExcellenceCount: number
        +nuanceExcellenceCount: number
        +transparencyExcellenceCount: number
        +discourseExcellenceCount: number
        +evidenceExcellenceCount: number
    }
    
    class HealthScoreCalculation {
        +excellencePoints: number
        +problemPoints: number
        +baseScore: number = 50
        +calculateScore(): number
    }
    
    Statistics --> HealthScoreCalculation : calculated by
```

## 5. Settings Schema

```mermaid
classDiagram
    class Settings {
        +enableAnalysis: boolean = true
        +analysisMode: AnalysisMode = "balanced"
        +highlightOpinion: boolean = true
        +highlightToBe: boolean = true
        +highlightAbsolutes: boolean = true
        +highlightPassive: boolean = false
        +highlightWeasel: boolean = false
        +highlightPresupposition: boolean = false
        +highlightMetaphors: boolean = false
        +highlightMinimizers: boolean = false
        +highlightMaximizers: boolean = false
        +highlightFalseBalance: boolean = false
        +highlightEuphemism: boolean = false
        +highlightEmotional: boolean = false
        +highlightGaslighting: boolean = false
        +highlightFalseDilemma: boolean = false
        +highlightProbability: boolean = false
        +highlightAttributionExcellence: boolean = true
        +highlightNuanceExcellence: boolean = true
        +highlightTransparencyExcellence: boolean = true
        +highlightDiscourseExcellence: boolean = true
        +highlightEvidenceExcellence: boolean = true
    }
    
    class AnalysisMode {
        <<enumeration>>
        problems
        excellence
        balanced
    }
    
    Settings --> AnalysisMode
```

## 6. Performance Monitoring

```mermaid
classDiagram
    class PerformanceMonitor {
        +metrics: Map~string, Metric~
        +start(operation): void
        +end(operation): number
        +getMetrics(): Object
        +cleanup(): void
    }
    
    class Metric {
        +name: string
        +startTime: number
        +endTime?: number
        +duration?: number
        +count: number = 1
    }
    
    class PerformanceConfig {
        +BATCH_SIZE: number = 50
        +MUTATION_DEBOUNCE: number = 1000
        +MAX_TEXT_LENGTH: number = 10000
        +MIN_SIGNIFICANT_TEXT: number = 5
        +UI_UPDATE_INTERVAL: number = 200
    }
    
    PerformanceMonitor --> Metric : tracks
    PerformanceMonitor --> PerformanceConfig : uses
```

## 7. Hover Card System

```mermaid
classDiagram
    class HoverContentGenerator {
        +enhancedDescriptions: Object
        +excellenceDescriptions: Object
        +generateHoverContent(match, nearbyMatches): string
        +getTypeName(type, isExcellence): string
        +getSubCategoryStyle(match): string
    }
    
    class HoverCard {
        +header: string
        +text: string
        +reason: string
        +sections: Array~HoverSection~
        +examples: ExampleSection
        +checklist: Array~string~
    }
    
    class HoverSection {
        +title: string
        +content: string
        +type: SectionType
    }
    
    class SectionType {
        <<enumeration>>
        whenConcerning
        whenAcceptable
        whenExcellent
        howToEnhance
        lookFor
        examples
    }
    
    HoverContentGenerator --> HoverCard : generates
    HoverCard --> HoverSection : contains
    HoverSection --> SectionType
```

## Data Flow Summary

```mermaid
flowchart LR
    subgraph "Configuration"
        BC[BiasConfig]
        BP[BiasPatterns]
    end
    
    subgraph "Runtime Data"
        M[Matches]
        S[Statistics]
        HC[Hover Cards]
    end
    
    subgraph "Storage"
        CS[Chrome Storage]
        SET[Settings]
    end
    
    BC --> BP
    BP --> M
    M --> S
    M --> HC
    SET --> CS
    CS --> BC
    
    classDef config fill:#e8f5e8
    classDef runtime fill:#e1f5fe
    classDef storage fill:#f3e5f5
    
    class BC,BP config
    class M,S,HC runtime
    class CS,SET storage
```

## Key Design Principles

### **Centralized Configuration**
- Single source of truth in BiasConfig
- Type-safe structure with validation
- Extensible for new bias types

### **Efficient Pattern Matching**
- Pre-compiled regex patterns
- Optimized for performance
- Supports both simple and complex patterns

### **Rich Match Data**
- Comprehensive match information
- Sub-categorization support
- Intensity and portrayal analysis

### **Flexible Settings**
- Granular control over detection types
- Multiple analysis modes
- Persistent storage with validation

### **Performance Awareness**
- Configurable performance thresholds
- Batch processing parameters
- Monitoring and metrics collection
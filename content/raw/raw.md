---
title: "Raw concept model for inheritance"
layout: "raw"
category: "raw"
summary: "A universal conceptual model for understanding inheritance in object-oriented programming."
---


# Universal Inheritance Conceptual Model

## Core Concept: The "Inheritance Copy" Mental Model

**Inheritance can be understood as a conceptual copying process** where all members (variables and functions) from the base class are logically transferred to the derived class, regardless of their visibility modifiers.

```
Base Class                         Derived Class
┌─────────────────────┐          ┌──────────────────────────────────┐
│ public variables    │ ──────── │ public variables (inherited)     │
│ private variables   │ ──────── │ private variables (inherited)    │
│ protected variables │ ──────── │ protected variables (inherited)  │
│ public functions    │ ──────── │ public functions (inherited)     │
│ private functions   │ ──────── │ private functions (inherited)    │
│ protected functions │ ──────── │ protected functions (inherited)  │
└─────────────────────┘          │ new variables (if any)           │
                                 │ new functions (if any)           │
                                 └──────────────────────────────────┘
```

## Universal Pseudocode Example

```pseudocode
// Base Class Definition
CLASS BaseClass:
    public variable: basePublicVar = 10
    private variable: basePrivateVar = 20
    protected variable: baseProtectedVar = 30
    
    public function: displayBase()
        PRINT "Base display function"
    
    private function: helperBase()
        PRINT "Base helper function"
    
    protected function: utilityBase()
        PRINT "Base utility function"
END CLASS

// Derived Class Definition
CLASS DerivedClass INHERITS BaseClass:
    public variable: derivedVar = 40
    
    public function: displayDerived()
        PRINT "Derived display function"
END CLASS
```

## What Actually Happens (Conceptual View)

After inheritance, the `DerivedClass` conceptually contains:

```pseudocode
// Conceptual contents of DerivedClass after inheritance
CLASS DerivedClass (after inheritance):
    // Inherited from BaseClass
    public variable: basePublicVar = 10        [INHERITED]
    private variable: basePrivateVar = 20      [INHERITED - ACCESS RESTRICTED]
    protected variable: baseProtectedVar = 30  [INHERITED]
    
    public function: displayBase()             [INHERITED]
        PRINT "Base display function"
    
    private function: helperBase()             [INHERITED - ACCESS RESTRICTED]
        PRINT "Base helper function"
    
    protected function: utilityBase()          [INHERITED]
        PRINT "Base utility function"
    
    // New members
    public variable: derivedVar = 40           [NEW]
    
    public function: displayDerived()          [NEW]
        PRINT "Derived display function"
END CLASS
```

## Member Overriding Concept

### Variable Overriding
When a derived class declares a variable with the same name as the base class:

```pseudocode
CLASS BaseClass:
    public variable: value = 100
    
    public function: showValue()
        PRINT value  // Will print the active 'value'
END CLASS

CLASS DerivedClass INHERITS BaseClass:
    public variable: value = 200  // OVERRIDES base class 'value'
    
    // Inherited showValue() will now use derived 'value'
END CLASS

// Usage
object = CREATE DerivedClass()
object.showValue()  // Prints: 200 (derived value is used)
```

### Function Overriding
When a derived class defines a function with the same signature as the base class:

```pseudocode
CLASS BaseClass:
    public function: display()
        PRINT "This is base class display"
END CLASS

CLASS DerivedClass INHERITS BaseClass:
    public function: display()  // OVERRIDES base class display()
        PRINT "This is derived class display"
END CLASS

// Usage
object = CREATE DerivedClass()
object.display()  // Prints: "This is derived class display"
```

## Accessing Base Class Members

To explicitly use base class members when they are overridden:

```pseudocode
CLASS DerivedClass INHERITS BaseClass:
    public function: display()  // Overrides base display()
        PRINT "Derived display"
        
    public function: callBothDisplays()
        display()              // Calls derived version
        CALL BaseClass.display()  // Explicitly calls base version
        
    public function: useBaseVariable()
        PRINT value            // Uses derived 'value' if overridden
        PRINT BaseClass.value  // Explicitly uses base 'value'
END CLASS
```

## Access Control Universal Rules

### Public Members
```pseudocode
object = CREATE DerivedClass()
object.basePublicVar = 50     // ✓ ALLOWED: Direct access
object.displayBase()          // ✓ ALLOWED: Direct call
```

### Protected Members
```pseudocode
// Inside DerivedClass methods only
CLASS DerivedClass INHERITS BaseClass:
    public function: someMethod()
        baseProtectedVar = 60     // ✓ ALLOWED: Access within derived class
        utilityBase()             // ✓ ALLOWED: Call within derived class
END CLASS

// Outside class
object = CREATE DerivedClass()
object.baseProtectedVar = 70     // ❌ NOT ALLOWED: External access denied
```

### Private Members
```pseudocode
// Inside DerivedClass methods
CLASS DerivedClass INHERITS BaseClass:
    public function: someMethod()
        basePrivateVar = 80       // ❌ NOT ALLOWED: Private access denied
        helperBase()              // ❌ NOT ALLOWED: Private function access denied
        
        // Must use public/protected base methods to access private members
        setBasePrivateVar(80)     // ✓ ALLOWED: If such method exists in base
END CLASS
```

## Complete Example

```pseudocode
CLASS Animal:
    protected variable: name = "Unknown"
    private variable: id = 0
    
    public function: setName(newName)
        name = newName
        
    public function: getName()
        RETURN name
        
    public function: speak()
        PRINT name + " makes a sound"
        
    private function: generateId()
        id = RANDOM_NUMBER()
END CLASS

CLASS Dog INHERITS Animal:
    private variable: breed = "Unknown"
    
    public function: setBreed(newBreed)
        breed = newBreed
        
    public function: speak()  // OVERRIDES Animal.speak()
        PRINT name + " barks"  // Uses inherited 'name'
        
    public function: introduce()
        PRINT "I am " + getName() + ", a " + breed
        Animal.speak()  // Explicitly calls base version
        speak()         // Calls overridden version (this dog's speak)
END CLASS

// Usage
myDog = CREATE Dog()
myDog.setName("Buddy")        // Uses inherited method
myDog.setBreed("Golden Retriever")
myDog.introduce()
// Output:
// I am Buddy, a Golden Retriever  
// Buddy makes a sound
// Buddy barks
```

## Key Universal Principles

1. **Complete Inheritance**: All members are conceptually copied, regardless of access level
2. **Override Priority**: Derived class members take precedence over base class members with same name
3. **Explicit Access**: Base class members can be explicitly accessed even when overridden
4. **Access Control**: Visibility rules determine what can be accessed, not what exists
5. **Functional Inheritance**: Both data and behavior are inherited

## Memory and Execution Model

```pseudocode
// Conceptual memory layout
DerivedObject in Memory:
┌─────────────────────────────┐
│ Base Class Section:         │
│  - basePublicVar           │ ← Accessible
│  - basePrivateVar          │ ← Exists but not accessible
│  - baseProtectedVar        │ ← Accessible in derived class
│  - Function pointers/refs  │ ← Method implementations
├─────────────────────────────┤
│ Derived Class Section:      │
│  - derivedVar              │ ← Accessible
│  - Additional function refs │ ← New/overridden methods
└─────────────────────────────┘
```

This mental model helps understand inheritance behavior across different programming languages while maintaining focus on universal concepts rather than language-specific implementation details.
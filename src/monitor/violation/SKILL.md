---
name: violation
description: "Use when asking what ONE violation is — the singular model beside the plural store: the severity order, whether a finding clears a floor, and the identity that makes the same finding twice one row."
atomPath: monitor/violation
---
# monitor/violation — a store needs a type

`models(singular) ⊕ collections(plural)` is a conservation law ([[balance]]). A plural atom with no singular model is a **store with no type**: you can hold the rows and never say what a row IS. `monitor/violations` scans, counts and streams them and was exactly that.

Three questions each caller was answering for itself:

| | |
| --- | --- |
| `SEVERITY_ORDER` · `severityRank` | info < warning < error, declared once |
| `atLeast` | does this finding clear a floor? |
| `violationKey` | source ⊗ atom ⊗ detail — the same finding twice is ONE row |

An unknown severity ranks **lowest**, deliberately. Defaulting it upward would manufacture errors out of typos, and a gate that invents failures is read exactly as long as one that hides them.

**Honest boundary.** This says what a violation IS and when two are the same; it does not decide whether one is TRUE. The scanners in [[monitor]] produce them, each carrying its own evidence.

Composes: [[monitor]] · [[balance]].

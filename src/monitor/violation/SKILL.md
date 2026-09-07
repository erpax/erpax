---
name: violation
description: "Use when asking what ONE violation is — the singular model beside the plural store: the severity order, whether a finding clears a floor, and the identity that makes the same finding twice one row."
atomPath: "monitor/violation"
coordinate: "monitor/violation · 8/crest · 6e0bf52a"
contentUuid: "f549ff67-06b0-5a47-82e5-507ef002bced"
diamondUuid: "cec84a03-7a82-8dc2-b726-420ac182f2cd"
uuid: "6e0bf52a-2f31-8814-adea-d370c7ff97ae"
horo: 8
typography:
  partition: monitor
  bondDegree: 6
standards: []
bindings: []
signatures:
  computationUuid: "d1105c54-a3a5-896f-bdad-64a8dfc18efa"
  stages:
    - stage: path
      stageUuid: "63b81404-75e2-8bd2-b46d-433d4467b969"
    - stage: trinity
      stageUuid: "eb786eb0-0e67-83ea-8e88-8e1bb6764fc2"
    - stage: boundary
      stageUuid: "71731302-ea13-8056-b68e-5294a92ebdff"
    - stage: links
      stageUuid: "56590b03-c9d3-8449-a469-0deebc072b69"
    - stage: horo
      stageUuid: "e93c1600-8367-8501-aea3-741da6a1b3f2"
    - stage: seal
      stageUuid: "1c36c58f-6050-8b25-b30a-d51fe5cba507"
    - stage: uuid
      stageUuid: "246cd6c7-3c28-861f-ac4e-46c11ead4972"
version: 2
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

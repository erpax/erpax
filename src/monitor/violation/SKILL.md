---
name: violation
description: "Use when asking what ONE violation is — the singular model beside the plural store: the severity order, whether a finding clears a floor, and the identity that makes the same finding twice one row."
atomPath: "monitor/violation"
coordinate: "monitor/violation · 4/weave · bef3c427"
contentUuid: "7e758622-f446-58d4-8e7c-791be26fd717"
diamondUuid: "69f2dad2-8a0d-8c94-9034-ff515b6e31eb"
uuid: "bef3c427-31ea-886c-9790-eec6f473796e"
horo: 4
typography:
  partition: monitor
  bondDegree: 6
standards: []
bindings: []
signatures:
  computationUuid: "22a284c0-6e6b-8435-bffa-4169351269bf"
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
      stageUuid: "73038d7e-b2f9-8855-bc46-7ea8519a7c2c"
    - stage: seal
      stageUuid: "1c36c58f-6050-8b25-b30a-d51fe5cba507"
    - stage: uuid
      stageUuid: "a1262d03-6cf8-8c2b-a5fa-2f7f1e3666c0"
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

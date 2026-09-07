---
name: violation
description: "Use when asking what ONE violation is — the singular model beside the plural store: the severity order, whether a finding clears a floor, and the identity that makes the same finding twice one row."
atomPath: "monitor/violation"
coordinate: "monitor/violation · 2/share · 0f97a86b"
contentUuid: "52a67745-af8f-58f9-9ff4-8fbf256dca55"
diamondUuid: "d4375d7b-5191-80db-8e19-05052e586f52"
uuid: "0f97a86b-1923-8768-b22a-6b709ae368dd"
horo: 2
typography:
  partition: monitor
  bondDegree: 6
standards: []
bindings: []
signatures:
  computationUuid: "8875aa8d-93b9-88d7-bfdd-b1cd87806bbf"
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
      stageUuid: "bfb30a3f-3314-8298-9b82-6091c959e250"
    - stage: seal
      stageUuid: "1c36c58f-6050-8b25-b30a-d51fe5cba507"
    - stage: uuid
      stageUuid: "c448b798-fc30-8ce4-a3b0-65f512e68793"
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

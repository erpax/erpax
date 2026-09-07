---
name: reality
description: "Use when reasoning about the live shipped state versus the model — reality is what is actually on main / deployed; the live matrix root is its fingerprint, and a claim is real iff it matches that root."
atomPath: reality
coordinate: "reality · 5/round · c148bfe6"
contentUuid: "2ea8053f-dd20-515d-9afe-d82a1d69ca19"
diamondUuid: "bd576dcb-5965-84f5-aaca-7e31076708c2"
uuid: "c148bfe6-d470-8b70-b1f6-c9a3bdb4bb9b"
horo: 5
typography:
  partition: reality
  bondDegree: 62
standards: []
bindings: []
signatures:
  computationUuid: "cd94740d-e233-8782-86b2-e40d8451e92f"
  stages:
    - stage: path
      stageUuid: "cc5c3991-41ab-84d4-8479-b6c4481d2e1a"
    - stage: trinity
      stageUuid: "ca2a25af-60ba-872c-8c8a-78d006e41429"
    - stage: boundary
      stageUuid: "7e7e4d8b-4387-8328-82cd-c2ee4ceee19f"
    - stage: links
      stageUuid: "c38a8899-1005-8e64-a66a-0b75d3b8560a"
    - stage: horo
      stageUuid: "07643e79-7515-8d55-92b7-d90232010cd6"
    - stage: seal
      stageUuid: "d22eabd0-9d37-8375-8adc-9ad972427dda"
    - stage: uuid
      stageUuid: "1cfc42fd-51df-8829-a51b-a23008da4e73"
version: 2
---
# reality — the live state, content-addressed

Reality is the **live, shipped state**: what is *actually* on main / [[deploy]]ed, as opposed to the model. The live [[matrix]] root is reality's fingerprint; a claim is **real** iff it matches the live root ([[anchor]] · [[verification]] · [[proof]]) — content-addressed truth, not assertion. Merging to main and deploying is the act of making the model real — the model **collapses** into the one true current state ([[quantum]]/reality).

Matter-twin: `src/reality/index.ts` (`realityRoot` · `isReal`). Composes [[deploy]] · [[matrix]] · [[anchor]] · [[verification]] · [[quantum]].

**Law — [[law]]: reality is the live shipped state (what is actually on main / [[deploy]]ed), the live [[matrix]] root its fingerprint — a claim is real iff it matches that root ([[proof]]), content-addressed truth never assertion.**

@audit reality = the live matrix root; computed, never hand-asserted

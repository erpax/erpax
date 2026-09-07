---
name: reality
description: "Use when reasoning about the live shipped state versus the model — reality is what is actually on main / deployed; the live matrix root is its fingerprint, and a claim is real iff it matches that root."
atomPath: reality
coordinate: "reality · 4/weave · dd1e3357"
contentUuid: "29fc68a5-5f0d-58ce-8418-0dfa6c9653ef"
diamondUuid: "22790bc9-d0d2-8bc0-875d-128998f91d3f"
uuid: "dd1e3357-8ff4-8df4-9073-dfbf56d5737c"
horo: 4
typography:
  partition: reality
  bondDegree: 62
standards: []
bindings: []
signatures:
  computationUuid: "50f0d648-858d-82ea-8218-fcbe2f0c5547"
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
      stageUuid: "88240a80-f8f5-8978-9951-cca74964d4be"
    - stage: seal
      stageUuid: "d22eabd0-9d37-8375-8adc-9ad972427dda"
    - stage: uuid
      stageUuid: "13db14ab-672c-8af1-abb1-36d549d68acb"
version: 2
---
# reality — the live state, content-addressed

Reality is the **live, shipped state**: what is *actually* on main / [[deploy]]ed, as opposed to the model. The live [[matrix]] root is reality's fingerprint; a claim is **real** iff it matches the live root ([[anchor]] · [[verification]] · [[proof]]) — content-addressed truth, not assertion. Merging to main and deploying is the act of making the model real — the model **collapses** into the one true current state ([[quantum]]/reality).

Matter-twin: `src/reality/index.ts` (`realityRoot` · `isReal`). Composes [[deploy]] · [[matrix]] · [[anchor]] · [[verification]] · [[quantum]].

**Law — [[law]]: reality is the live shipped state (what is actually on main / [[deploy]]ed), the live [[matrix]] root its fingerprint — a claim is real iff it matches that root ([[proof]]), content-addressed truth never assertion.**

@audit reality = the live matrix root; computed, never hand-asserted

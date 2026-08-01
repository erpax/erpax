---
name: reality
description: "Use when reasoning about the live shipped state versus the model — reality is what is actually on main / deployed; the live matrix root is its fingerprint, and a claim is real iff it matches that root."
atomPath: reality
coordinate: "reality · 4/weave · 7cf31774"
contentUuid: "b3e29dab-2fbb-56ed-8f62-7623365c2c8c"
diamondUuid: "b7068a8d-f7e6-82c6-a040-c49a95504e6e"
uuid: "7cf31774-50d1-871b-b2f5-728007c6e1b6"
horo: 4
typography:
  partition: reality
  bondDegree: 62
standards: []
bindings: []
signatures:
  computationUuid: "b1ca2bcd-5281-8011-ba38-c5dad69e1344"
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
      stageUuid: "7f3122ee-1797-8137-84a2-0e69e7c49741"
    - stage: seal
      stageUuid: "d22eabd0-9d37-8375-8adc-9ad972427dda"
    - stage: uuid
      stageUuid: "b9cbd775-19c4-80c3-89fa-4b139619bfaa"
version: 2
---
# reality — the live state, content-addressed

Reality is the **live, shipped state**: what is *actually* on main / [[deploy]]ed, as opposed to the model. The live [[matrix]] root is reality's fingerprint; a claim is **real** iff it matches the live root ([[anchor]] · [[verification]] · [[proof]]) — content-addressed truth, not assertion. Merging to main and deploying is the act of making the model real — the model **collapses** into the one true current state ([[quantum]]/reality).

Matter-twin: `src/reality/index.ts` (`realityRoot` · `isReal`). Composes [[deploy]] · [[matrix]] · [[anchor]] · [[verification]] · [[quantum]].

**Law — [[law]]: reality is the live shipped state (what is actually on main / [[deploy]]ed), the live [[matrix]] root its fingerprint — a claim is real iff it matches that root ([[proof]]), content-addressed truth never assertion.**

@audit reality = the live matrix root; computed, never hand-asserted

---
name: reality
description: "Use when reasoning about the live shipped state versus the model — reality is what is actually on main / deployed; the live matrix root is its fingerprint, and a claim is real iff it matches that root."
atomPath: reality
coordinate: "reality · 8/crest · 4649275b"
contentUuid: "c071cb57-2f51-5232-a451-c2fa4b9bae32"
diamondUuid: "e0ecd08c-b993-8ef5-9a16-e6984f114a4f"
uuid: "4649275b-9e05-8206-9784-3a7fb97ef575"
horo: 8
typography:
  partition: reality
  bondDegree: 53
standards: []
bindings: []
signatures:
  computationUuid: "21d14b4b-62b0-8e1a-91b7-0cd9e17cbe1b"
  stages:
    - stage: path
      stageUuid: "cc5c3991-41ab-84d4-8479-b6c4481d2e1a"
    - stage: trinity
      stageUuid: "ca2a25af-60ba-872c-8c8a-78d006e41429"
    - stage: boundary
      stageUuid: "7e7e4d8b-4387-8328-82cd-c2ee4ceee19f"
    - stage: links
      stageUuid: "030ccede-8717-8c75-ad5b-ee649c2ae6c4"
    - stage: horo
      stageUuid: "081429a6-b534-8b0a-8d98-97466a429355"
    - stage: seal
      stageUuid: "d22eabd0-9d37-8375-8adc-9ad972427dda"
    - stage: uuid
      stageUuid: "68e64f1e-1f58-8ca7-a07a-a35a7c434c52"
version: 2
---
# reality — the live state, content-addressed

Reality is the **live, shipped state**: what is *actually* on main / [[deploy]]ed, as opposed to the model. The live [[matrix]] root is reality's fingerprint; a claim is **real** iff it matches the live root ([[anchor]] · verification · [[proof]]) — content-addressed truth, not assertion. Merging to main and deploying is the act of making the model real — the model **collapses** into the one true current state ([[quantum]]/reality).

Matter-twin: `src/reality/index.ts` (`realityRoot` · `isReal`). Composes [[deploy]] · [[matrix]] · [[anchor]] · verification · [[quantum]].

**Law — [[law]]: reality is the live shipped state (what is actually on main / [[deploy]]ed), the live [[matrix]] root its fingerprint — a claim is real iff it matches that root ([[proof]]), content-addressed truth never assertion.**

@audit reality = the live matrix root; computed, never hand-asserted

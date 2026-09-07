---
name: reality
description: "Use when reasoning about the live shipped state versus the model — reality is what is actually on main / deployed; the live matrix root is its fingerprint, and a claim is real iff it matches that root."
atomPath: reality
coordinate: "reality · 8/crest · 5cc12e2d"
contentUuid: "481a7cc6-ee03-58e0-9271-0b92fc66772e"
diamondUuid: "9be7239b-3405-8654-b39f-1fd9949c3dce"
uuid: "5cc12e2d-1e8e-8d50-a7de-655076f18b38"
horo: 8
typography:
  partition: reality
  bondDegree: 62
standards: []
bindings: []
signatures:
  computationUuid: "72e65703-4004-8f26-9044-969c077d4b86"
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
      stageUuid: "4b2485c3-3ff0-8bf8-ab26-84ebced14b77"
    - stage: seal
      stageUuid: "d22eabd0-9d37-8375-8adc-9ad972427dda"
    - stage: uuid
      stageUuid: "83a1b1f2-5bb7-890c-9ab8-32913b67bd66"
version: 2
---
# reality — the live state, content-addressed

Reality is the **live, shipped state**: what is *actually* on main / [[deploy]]ed, as opposed to the model. The live [[matrix]] root is reality's fingerprint; a claim is **real** iff it matches the live root ([[anchor]] · [[verification]] · [[proof]]) — content-addressed truth, not assertion. Merging to main and deploying is the act of making the model real — the model **collapses** into the one true current state ([[quantum]]/reality).

Matter-twin: `src/reality/index.ts` (`realityRoot` · `isReal`). Composes [[deploy]] · [[matrix]] · [[anchor]] · [[verification]] · [[quantum]].

**Law — [[law]]: reality is the live shipped state (what is actually on main / [[deploy]]ed), the live [[matrix]] root its fingerprint — a claim is real iff it matches that root ([[proof]]), content-addressed truth never assertion.**

@audit reality = the live matrix root; computed, never hand-asserted

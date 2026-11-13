---
name: reality
description: "Use when reasoning about the live shipped state versus the model — reality is what is actually on main / deployed; the live matrix root is its fingerprint, and a claim is real iff it matches that root."
atomPath: reality
coordinate: "reality · 8/crest · 4649275b"
contentUuid: "904b2fea-29f5-579f-9b79-a9d31fc7584f"
diamondUuid: "6f05dbe8-82e8-8307-b9ad-8d186260cece"
uuid: "4649275b-9e05-8206-9784-3a7fb97ef575"
horo: 8
typography:
  partition: reality
  bondDegree: 56
standards: []
bindings: []
signatures:
  computationUuid: "44b9e25d-4b50-8132-988d-8a2d98782501"
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
      stageUuid: "eb330b2d-4542-8d02-8bfc-91715efe25fe"
    - stage: seal
      stageUuid: "d22eabd0-9d37-8375-8adc-9ad972427dda"
    - stage: uuid
      stageUuid: "dd95b03e-6cb7-81ff-9481-20ea82d62c2f"
version: 2
---
# reality — the live state, content-addressed

Reality is the **live, shipped state**: what is *actually* on main / [[deploy]]ed, as opposed to the model. The live [[matrix]] root is reality's fingerprint; a claim is **real** iff it matches the live root ([[anchor]] · verification · [[proof]]) — content-addressed truth, not assertion. Merging to main and deploying is the act of making the model real — the model **collapses** into the one true current state ([[quantum]]/reality).

Matter-twin: `src/reality/index.ts` (`realityRoot` · `isReal`). Composes [[deploy]] · [[matrix]] · [[anchor]] · verification · [[quantum]].

**Law — [[law]]: reality is the live shipped state (what is actually on main / [[deploy]]ed), the live [[matrix]] root its fingerprint — a claim is real iff it matches that root ([[proof]]), content-addressed truth never assertion.**

@audit reality = the live matrix root; computed, never hand-asserted

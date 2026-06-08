---
name: reality
description: "Use when reasoning about the live shipped state versus the model — reality is what is actually on main / deployed; the live matrix root is its fingerprint, and a claim is real iff it matches that root."
atomPath: reality
coordinate: reality · 2/share · 8c21e68a
contentUuid: "15a6fa0f-b809-58e1-ad37-de688dd57b63"
diamondUuid: "d2c85901-7675-8670-abe8-e69fe610d749"
uuid: "8c21e68a-3d9c-8432-ae65-07fe18e3c20c"
horo: 2
bonds:
  in:
    - anchor
    - deploy
    - device
    - finality
    - fs
    - generator
    - law
    - literature
    - matrix
    - number
    - proof
    - quantum
    - reality
    - snapshot
    - uuid
    - verification
    - void
  out:
    - anchor
    - deploy
    - device
    - finality
    - fs
    - generator
    - law
    - literature
    - matrix
    - number
    - proof
    - quantum
    - reality
    - snapshot
    - uuid
    - verification
    - void
typography:
  partition: reality
  bondDegree: 62
  neighbors: []
standards:
  - "reality = the live matrix root; computed, never hand-asserted"
bindings: []
neighbors:
  wikilink:
    - anchor
    - deploy
    - law
    - matrix
    - proof
    - quantum
    - verification
  matrix:
    - anchor
    - deploy
    - device
    - finality
    - fs
    - generator
    - law
    - literature
    - matrix
    - number
    - proof
    - quantum
    - reality
    - snapshot
    - uuid
    - verification
    - void
  backlinks:
    - anchor
    - deploy
    - device
    - finality
    - fs
    - generator
    - law
    - literature
    - matrix
    - number
    - proof
    - quantum
    - reality
    - snapshot
    - uuid
    - verification
    - void
signatures:
  computationUuid: "b6755ff6-552e-8dbc-961c-334d20c941cf"
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
      stageUuid: "973dde8a-91c5-8f57-97a5-a00e4883651f"
    - stage: seal
      stageUuid: "a08722e5-b8f7-8b3e-86b5-e6a2546bd92c"
    - stage: uuid
      stageUuid: "f0ce6d6c-b9c6-8a73-9292-7e82707d1499"
version: 2
---
# reality — the live state, content-addressed

Reality is the **live, shipped state**: what is *actually* on main / [[deploy]]ed, as opposed to the model. The live [[matrix]] root is reality's fingerprint; a claim is **real** iff it matches the live root ([[anchor]] · [[verification]] · [[proof]]) — content-addressed truth, not assertion. Merging to main and deploying is the act of making the model real — the model **collapses** into the one true current state ([[quantum]]/reality).

Matter-twin: `src/reality/index.ts` (`realityRoot` · `isReal`). Composes [[deploy]] · [[matrix]] · [[anchor]] · [[verification]] · [[quantum]].

**Law — [[law]]: reality is the live shipped state (what is actually on main / [[deploy]]ed), the live [[matrix]] root its fingerprint — a claim is real iff it matches that root ([[proof]]), content-addressed truth never assertion.**

@audit reality = the live matrix root; computed, never hand-asserted

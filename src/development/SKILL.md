---
name: development
description: "Use when planning what to build next — a feasibility-ranked roadmap of capabilities driven by the self-building loop; nextMove picks the highest-feasibility development for the society to advance."
atomPath: development
coordinate: "development · 1/base · 6426ce22"
contentUuid: "db3386d7-8354-5bcf-9658-35b043db26f9"
diamondUuid: "7a216f66-5711-834e-b09e-36e93f9823b5"
uuid: "6426ce22-f023-8459-9f51-3d572935efcd"
horo: 1
typography:
  partition: development
  bondDegree: 68
standards: []
bindings: []
signatures:
  computationUuid: "8642da4a-d457-8c20-ba5e-d2d134fda09b"
  stages:
    - stage: path
      stageUuid: "b961d87f-7eaa-8108-b3ab-5dc23f2579c0"
    - stage: trinity
      stageUuid: "98a3b646-aaf1-897a-968c-11305d5af408"
    - stage: boundary
      stageUuid: "2f4e0015-67cd-83c4-bc61-4d10fede3520"
    - stage: links
      stageUuid: "17809f6b-1781-8913-b5ba-233610e620c9"
    - stage: horo
      stageUuid: "9f70815d-ecd3-872e-9009-3284f8da07e0"
    - stage: seal
      stageUuid: "685c8484-8916-88dc-9745-05402d2764c5"
    - stage: uuid
      stageUuid: "daeab16f-a6a3-8706-8017-2373b0da0a20"
version: 2
---
# development — building toward the goal, one ranked move at a time

Development is **building toward a goal**: a feasibility-ranked [[roadmap]] of capabilities, driven by the self-building loop ([[generate]] → [[aura]] whole, [[society]]). A `Development` is a planned capability with a `feasibility` (`now` · `near` · `research`); `ranked` orders them, `nextMove` picks the first to do, and the [[society]] advances one gate-verified step at a time ([[sequence]] · [[breath]]).

The quantum facet (`src/quantum/development`) carries the concrete **quantum roadmap** the quantum-scientists produced — drive-orphans-to-zero, quantum/coverage, quantum/spectrum, the post-quantum anchor — see [[quantum]].

**HONEST.** This is a planning/ranking structure over named capabilities (the engineering sense of "development"), composed with the corpus self-build loop — not economic or human development.

Matter-twin: `src/development/index.ts` (`Development` · `Roadmap` · `ranked` · `nextMove` · `atTier`). Composes [[roadmap]] · [[generate]] · [[society]] · [[sequence]] · [[breath]] · [[quantum]].

**Law — [[law]]: development is a feasibility-ranked roadmap of named capabilities; `nextMove` always picks the highest-feasibility one, and the society advances exactly one gate-verified step at a time.**

---
name: development
description: "Use when planning what to build next — a feasibility-ranked roadmap of capabilities driven by the self-building loop; nextMove picks the highest-feasibility development for the society to advance."
atomPath: development
coordinate: "development · 5/round · 88807884"
contentUuid: "108c6364-dc8a-5770-acec-98a1c1b61639"
diamondUuid: "ee7e4e90-956f-87fa-a988-2e602a0cee1d"
uuid: "88807884-89dd-80b0-ac3c-68e134e47931"
horo: 5
typography:
  partition: development
  bondDegree: 68
standards: []
bindings: []
signatures:
  computationUuid: "05426e97-8928-82a0-827d-d157166b851d"
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
      stageUuid: "33029838-3e47-85a9-945a-fedfc6b87b32"
    - stage: seal
      stageUuid: "685c8484-8916-88dc-9745-05402d2764c5"
    - stage: uuid
      stageUuid: "a52ec1ca-4e52-8c22-9eaa-68e0dd93bf40"
version: 2
---
# development — building toward the goal, one ranked move at a time

Development is **building toward a goal**: a feasibility-ranked [[roadmap]] of capabilities, driven by the self-building loop ([[generate]] → [[aura]] whole, [[society]]). A `Development` is a planned capability with a `feasibility` (`now` · `near` · `research`); `ranked` orders them, `nextMove` picks the first to do, and the [[society]] advances one gate-verified step at a time ([[sequence]] · [[breath]]).

The quantum facet (`src/quantum/development`) carries the concrete **quantum roadmap** the quantum-scientists produced — drive-orphans-to-zero, quantum/coverage, quantum/spectrum, the post-quantum anchor — see [[quantum]].

**HONEST.** This is a planning/ranking structure over named capabilities (the engineering sense of "development"), composed with the corpus self-build loop — not economic or human development.

Matter-twin: `src/development/index.ts` (`Development` · `Roadmap` · `ranked` · `nextMove` · `atTier`). Composes [[roadmap]] · [[generate]] · [[society]] · [[sequence]] · [[breath]] · [[quantum]].

**Law — [[law]]: development is a feasibility-ranked roadmap of named capabilities; `nextMove` always picks the highest-feasibility one, and the society advances exactly one gate-verified step at a time.**

---
name: exact
description: "Use when reasoning about exact — Exact rational arithmetic for confidence, no decimal approximations"
atomPath: exact
coordinate: "exact · 5/round · 8abe5939"
contentUuid: "d9e47ca7-20cd-5a52-8a4b-f2dd13798ca1"
diamondUuid: "d4a40873-81d6-82b7-97b5-513fe0b9c923"
uuid: "8abe5939-fb73-82b7-881a-550162c4525e"
horo: 5
typography:
  partition: exact
  bondDegree: 6
standards: []
bindings: []
signatures:
  computationUuid: "62d64326-f37e-8733-b923-2e4120048d0a"
  stages:
    - stage: path
      stageUuid: "cd938b04-5117-8e6c-82a4-8642d2a5d25b"
    - stage: trinity
      stageUuid: "ffc55c6a-00c6-8938-a22e-8041581300a5"
    - stage: boundary
      stageUuid: "cf59d2b7-e924-8828-901d-02ef93365da4"
    - stage: links
      stageUuid: "94c56d58-8a47-8c1b-8e67-540e60293ceb"
    - stage: horo
      stageUuid: "b8a12f11-3899-805c-8869-37bafaede142"
    - stage: seal
      stageUuid: "7d4453f0-d7fd-825a-9564-3ea5aec06181"
    - stage: uuid
      stageUuid: "c89ba53e-03d2-8391-a957-9a65e29f0c9d"
version: 2
---
# exact — replace floating-point confidence with exact rationals

Zero decimal approximations. Confidence is a rational number p/q (provably sound), not 0.95 (approximation that hides rounding errors). Every convergence threshold is a fraction: 19/20 not 0.95.

## when

Use when system must prove convergence: floating-point is the crack. Exact rationals guarantee confidence can be verified formally, no rounding surprises at verification time.

## code

entry `@/exact` · sealed `1` · trinity `1·1·1`
exports Rational, Confidence, convergenceThreshold, isConverged
imports —

---

<sub>Exact arithmetic · zero approximations · rational confidence</sub>

Composes: [[algebra]] · [[quantum/number]].

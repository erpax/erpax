---
name: exact
description: "Use when reasoning about exact — Exact rational arithmetic for confidence, no decimal approximations"
atomPath: exact
coordinate: "exact · 4/weave · d2b32acd"
contentUuid: "27bc96af-6ec3-5350-aa6a-372c3c09e5ec"
diamondUuid: "bf4ac6ea-851b-8356-a912-93746424ba6c"
uuid: "d2b32acd-334b-8f8c-8410-e296d91b85fc"
horo: 4
typography:
  partition: exact
  bondDegree: 6
standards: []
bindings: []
signatures:
  computationUuid: "9bd771dc-0545-8b32-a9d1-bb07d72236ec"
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
      stageUuid: "f6289c15-682d-891c-985c-95f3664fe31b"
    - stage: seal
      stageUuid: "7d4453f0-d7fd-825a-9564-3ea5aec06181"
    - stage: uuid
      stageUuid: "8a0d20e4-f39a-89e2-852d-8f71016936ed"
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

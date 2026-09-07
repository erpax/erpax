---
name: exact
description: "Use when reasoning about exact — Exact rational arithmetic for confidence, no decimal approximations"
atomPath: exact
coordinate: "exact · 8/crest · 80119be5"
contentUuid: "9eac7333-91b9-52ba-9450-edd05c4dd4ad"
diamondUuid: "15356fa3-217a-8189-afe9-81c94c7d0a23"
uuid: "80119be5-f956-8860-a8f9-ff96c21c3b2a"
horo: 8
typography:
  partition: exact
  bondDegree: 6
standards: []
bindings: []
signatures:
  computationUuid: "0c1855d7-66fb-88a3-9eba-d27e0fbd3992"
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
      stageUuid: "35764410-0d16-805c-acda-944219b410e7"
    - stage: seal
      stageUuid: "7d4453f0-d7fd-825a-9564-3ea5aec06181"
    - stage: uuid
      stageUuid: "d42b760d-e64e-874b-87af-c7a1f5007fab"
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

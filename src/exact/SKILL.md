---
name: exact
description: "Use when reasoning about exact — Exact rational arithmetic for confidence, no decimal approximations"
atomPath: exact
coordinate: "exact · 4/weave · 5fa6fce3"
contentUuid: "d856fc13-6b51-5cce-80ea-da7b0e3183bc"
diamondUuid: "225f12b6-277c-8075-99f3-04c1128b0274"
uuid: "5fa6fce3-5c9b-87b3-8cb1-fe901d447c33"
horo: 4
typography:
  partition: exact
  bondDegree: 6
standards: []
bindings: []
signatures:
  computationUuid: "6933bfb9-ae21-895c-bf7f-f88223f4d198"
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
      stageUuid: "10f45bf4-694c-8aca-9efb-b5bd95d42c3c"
    - stage: seal
      stageUuid: "7d4453f0-d7fd-825a-9564-3ea5aec06181"
    - stage: uuid
      stageUuid: "10f6734e-9ee2-82aa-96c8-216e124d80a8"
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

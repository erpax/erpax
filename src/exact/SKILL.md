---
name: exact
description: "Use when reasoning about exact — Exact rational arithmetic for confidence, no decimal approximations"
atomPath: exact
coordinate: "exact · 2/share · 0f2d4d90"
contentUuid: "5616c008-99e0-5101-9b77-116a3caa8c45"
diamondUuid: "577a8eb6-a36e-8158-b2be-6b15bcf2a758"
uuid: "0f2d4d90-3efa-8302-a962-ea5990432e06"
horo: 2
typography:
  partition: exact
  bondDegree: 6
standards: []
bindings: []
signatures:
  computationUuid: "bc7afcd0-3624-83ac-8003-e24eb49ca22f"
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
      stageUuid: "56f7dfa8-44c3-89c9-aea7-1aa5d044e7fb"
    - stage: seal
      stageUuid: "7d4453f0-d7fd-825a-9564-3ea5aec06181"
    - stage: uuid
      stageUuid: "6a4a2adb-930b-8575-a913-81c74f8cce20"
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

---
name: automate
description: "Use when reasoning about automate — Quantum automation primitives for iterative problem-solving loops"
atomPath: automate
coordinate: "automate · 7/descent · 908ad12b"
contentUuid: "5c5f8952-cb31-5ee4-91f5-c9ee5dec9e22"
diamondUuid: "aba48772-a73a-8f26-9c44-5fdae5112ecd"
uuid: "908ad12b-70c8-8de0-abbb-18d9ddb005c0"
horo: 7
typography:
  partition: automate
  bondDegree: 10
standards: []
bindings: []
signatures:
  computationUuid: "712a4f83-a5e1-8494-b961-e7d2949ceff5"
  stages:
    - stage: path
      stageUuid: "4c1e4f4d-0309-85e7-a52d-3b19d760faa7"
    - stage: trinity
      stageUuid: "120bb210-9f4e-8ad6-a5a5-03406c5c9c17"
    - stage: boundary
      stageUuid: "d493cef7-b40d-854d-ba2d-fa96faac5fa2"
    - stage: links
      stageUuid: "e56b2c5b-862f-8910-b700-821e8b9cda50"
    - stage: horo
      stageUuid: "cda4a8b3-bea0-8d24-a73f-6ff16ffd8c7e"
    - stage: seal
      stageUuid: "84870e21-6867-809a-8778-5fe668ef3f6c"
    - stage: uuid
      stageUuid: "abf831cd-f951-83a0-80f3-5adc9301e6c8"
version: 2
---
# automate — automate quantum computation with feedback loops and refinement

Automation primitives that enable iterative quantum computation: task spawning, result collection, failure handling, refinement loops, and convergence detection.

## when

Use when running closed-loop quantum computation: spawn tasks, collect results, analyze convergence, refine hypotheses, and repeat until proof or divergence is clear.

## code

entry `@/automate` · sealed `1` · trinity `1·1·1`
exports AutomationLoop, LoopState, runLoop, refineHypothesis, detectDivergence
imports @/orchestrate, @/quantum/computer

---

<sub>Automation · feedback loops · convergence detection</sub>

Composes: [[quantum]] · [[wave]].

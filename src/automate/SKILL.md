---
name: automate
description: "Use when reasoning about automate — Quantum automation primitives for iterative problem-solving loops"
atomPath: automate
coordinate: "automate · 4/weave · 6103594a"
contentUuid: "2a7511b7-1250-5e3c-91e8-16bc617f369b"
diamondUuid: "09826141-371d-872c-9124-b87b1d8b3a1b"
uuid: "6103594a-0c6c-88ae-a232-e36ac7d43a7d"
horo: 4
typography:
  partition: automate
  bondDegree: 10
standards: []
bindings: []
signatures:
  computationUuid: "5472066c-ee56-8036-9040-37b35bb52d52"
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
      stageUuid: "a6a6cd49-dd4e-8cd5-8a59-db58fa33f287"
    - stage: seal
      stageUuid: "84870e21-6867-809a-8778-5fe668ef3f6c"
    - stage: uuid
      stageUuid: "8e6531be-63cb-8bae-95ef-9aee222b98c9"
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

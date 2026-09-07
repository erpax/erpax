---
name: automate
description: "Use when reasoning about automate — Quantum automation primitives for iterative problem-solving loops"
atomPath: automate
coordinate: "automate · 7/descent · 7396c2a1"
contentUuid: "dabe1840-02a5-560d-8fce-2a480d448a6a"
diamondUuid: "074f4ed0-6461-8a58-98c1-1e799df8dafd"
uuid: "7396c2a1-51cc-8a06-b57a-e9062dec8fd1"
horo: 7
typography:
  partition: automate
  bondDegree: 10
standards: []
bindings: []
signatures:
  computationUuid: "a1544e23-3dd0-808b-b0f1-f547f52b752a"
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
      stageUuid: "89e3dcf8-cc76-8a0b-9311-a536cfc6bf40"
    - stage: seal
      stageUuid: "84870e21-6867-809a-8778-5fe668ef3f6c"
    - stage: uuid
      stageUuid: "b078a899-324e-850d-b2b3-1da8651dcf26"
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

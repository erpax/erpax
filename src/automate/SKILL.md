---
name: automate
description: "Use when reasoning about automate — Quantum automation primitives for iterative problem-solving loops"
atomPath: automate
coordinate: "automate · 2/share · 1f42f86d"
contentUuid: "dc02b632-cd7b-55b7-b220-ac7809c8075b"
diamondUuid: "349c0511-4859-8af0-897e-123b2c48554f"
uuid: "1f42f86d-f23e-8204-b250-d266abe44cf2"
horo: 2
typography:
  partition: automate
  bondDegree: 10
standards: []
bindings: []
signatures:
  computationUuid: "2eb180c9-15e4-802b-9af0-dd83cbb5a4aa"
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
      stageUuid: "364cd830-9446-8a5f-a9e7-e928a8b066c5"
    - stage: seal
      stageUuid: "84870e21-6867-809a-8778-5fe668ef3f6c"
    - stage: uuid
      stageUuid: "fa54cc08-7e71-8e97-b5fd-026b9bedf7b6"
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

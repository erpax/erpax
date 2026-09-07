---
name: automate
description: "Use when reasoning about automate — Quantum automation primitives for iterative problem-solving loops"
atomPath: automate
coordinate: "automate · 5/round · 1ab12e3a"
contentUuid: "a1618415-b9e2-5af2-893a-029d394baff6"
diamondUuid: "574dbd00-412a-8195-9080-86794108f99e"
uuid: "1ab12e3a-6887-8764-8f3e-79a6cc6ed9af"
horo: 5
typography:
  partition: automate
  bondDegree: 10
standards: []
bindings: []
signatures:
  computationUuid: "01487962-0c6a-8881-9ad0-54785ba23a40"
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
      stageUuid: "9b679fb5-0a69-8e8d-8835-01f458b64b46"
    - stage: seal
      stageUuid: "84870e21-6867-809a-8778-5fe668ef3f6c"
    - stage: uuid
      stageUuid: "ab10a0ed-74d6-8424-a4e5-304ac6e42eb3"
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

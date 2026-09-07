---
name: orchestrate
description: Use when reasoning about orchestrate — Quantum orchestration engine for parallel Millennium Problem computation
atomPath: orchestrate
coordinate: "orchestrate · 4/weave · 5f82706c"
contentUuid: "840580bf-26e4-5691-8120-abae068c95e5"
diamondUuid: "4446d55f-dd77-8449-9d2e-39b29c9f7996"
uuid: "5f82706c-3ab8-8f1b-91f7-a81be341b92b"
horo: 4
typography:
  partition: orchestrate
  bondDegree: 9
standards: []
bindings: []
signatures:
  computationUuid: "8ef59387-1a56-88d8-a4a9-e13431e877eb"
  stages:
    - stage: path
      stageUuid: "5c9d3c4e-8599-8a22-a7ac-443d871561e2"
    - stage: trinity
      stageUuid: "77e264c2-ea90-8677-b79f-0150c227573d"
    - stage: boundary
      stageUuid: "3fe799b7-c4f9-8406-a6a4-89c8a96ad100"
    - stage: links
      stageUuid: "ef7c527b-17e3-8854-b326-bb8ec907a522"
    - stage: horo
      stageUuid: "64461406-9b62-8ad5-bd85-d1ff7936cd7b"
    - stage: seal
      stageUuid: "53f00c1c-9f50-8ae8-b38c-cd501c1e54d0"
    - stage: uuid
      stageUuid: "f6508927-0a91-82fa-b062-a9f1ae8b4284"
version: 2
---
# orchestrate — orchestrate quantum computation across all problems in all directions

Orchestration engine that decomposes the seven Millennium Prize Problems into quantum-computable subproblems, spawns parallel quantum workers, aggregates results, and publishes findings to Zenodo.

## when

Use when launching the quantum computation wave: each problem is decomposed into independent subproblems, each spawned as a quantum worker task, results fused in a mesh, intermediate findings published, and the loop repeats until convergence or proof emerges.

## architecture

```
Orchestrator (main loop)
  ├─ Problem Loader: read millennium/* definitions
  ├─ Decomposer: break each into quantum-computable units
  ├─ Mesh Spawner: create graph nodes for each subproblem
  ├─ Worker Pool: quantum agents working in parallel
  ├─ Aggregator: fuse results via double-entry ledger
  ├─ Validator: check for convergence/proof
  └─ Publisher: commit to Zenodo + local ledger
```

## code

entry `@/orchestrate` · sealed `1` · trinity `1·1·1`
exports OrchestrateConfig, MillenniumWave, orchestrateWave, forkWorkers, fuseResults
imports @/millennium, @/automate, @/quantum/computer, @/mesh, @/accounting

---

<sub>Orchestration · parallel quantum workers · Millennium Problems decomposition</sub>

Composes: [[quantum]] · [[wave]].

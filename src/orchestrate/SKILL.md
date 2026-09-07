---
name: orchestrate
description: Use when reasoning about orchestrate — Quantum orchestration engine for parallel Millennium Problem computation
atomPath: orchestrate
coordinate: "orchestrate · 5/round · e2a71036"
contentUuid: "77f66f9f-c5d9-50b0-b934-251571fbf37a"
diamondUuid: "c1f4d74e-d51f-872d-8d5d-1577167ffda0"
uuid: "e2a71036-a8bb-8ceb-8529-015962918835"
horo: 5
typography:
  partition: orchestrate
  bondDegree: 9
standards: []
bindings: []
signatures:
  computationUuid: "fe2b9966-b967-839f-83fe-c37537a4ecf1"
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
      stageUuid: "791818c9-e9fe-8e3f-a18d-9b8a192d02a7"
    - stage: seal
      stageUuid: "53f00c1c-9f50-8ae8-b38c-cd501c1e54d0"
    - stage: uuid
      stageUuid: "34b3b64b-309f-8055-8083-b31d6df4970c"
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

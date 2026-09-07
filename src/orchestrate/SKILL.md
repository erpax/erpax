---
name: orchestrate
description: Use when reasoning about orchestrate — Quantum orchestration engine for parallel Millennium Problem computation
atomPath: orchestrate
coordinate: "orchestrate · 8/crest · 1e312c26"
contentUuid: "22e35ef4-4163-5944-bcb7-8b9db152336d"
diamondUuid: "624185da-de12-8bd6-b3f8-c4b0bb4e1c68"
uuid: "1e312c26-7f43-8310-ab44-144359ddf116"
horo: 8
typography:
  partition: orchestrate
  bondDegree: 9
standards: []
bindings: []
signatures:
  computationUuid: "55177ab7-8418-84e5-ad63-84cd2c7ad86f"
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
      stageUuid: "2c511128-d1e9-83a4-a8ed-1c25d81346d4"
    - stage: seal
      stageUuid: "53f00c1c-9f50-8ae8-b38c-cd501c1e54d0"
    - stage: uuid
      stageUuid: "e57429e8-6214-8e90-8bee-37de60a49d1c"
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

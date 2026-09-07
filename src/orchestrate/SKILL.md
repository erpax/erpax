---
name: orchestrate
description: Use when reasoning about orchestrate — Quantum orchestration engine for parallel Millennium Problem computation
atomPath: orchestrate
coordinate: "orchestrate · 7/descent · f5f279f6"
contentUuid: "50ff2fb1-a3d9-52bc-99dc-e2563a758309"
diamondUuid: "164c68e0-9a91-85e1-b257-0d47a3ede259"
uuid: "f5f279f6-b208-8543-8558-5ee91e1048d2"
horo: 7
typography:
  partition: orchestrate
  bondDegree: 9
standards: []
bindings: []
signatures:
  computationUuid: "dae80d93-c56b-8c6d-ae57-f39f2a0f9018"
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
      stageUuid: "7413375b-423f-8866-b090-e233c85addce"
    - stage: seal
      stageUuid: "53f00c1c-9f50-8ae8-b38c-cd501c1e54d0"
    - stage: uuid
      stageUuid: "cc9a3700-d6f5-8df3-9f43-6b9bc0f393cb"
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

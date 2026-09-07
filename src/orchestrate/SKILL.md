---
name: orchestrate
description: Use when reasoning about orchestrate — Quantum orchestration engine for parallel Millennium Problem computation
atomPath: orchestrate
coordinate: "orchestrate · 8/crest · 22118c99"
contentUuid: "614dd079-55aa-58d1-899f-12646ff663c7"
diamondUuid: "6f8d4cb0-c1cb-8bcb-998c-7a87c8331f0e"
uuid: "22118c99-3e40-8d52-baac-42c13bd0f36d"
horo: 8
typography:
  partition: orchestrate
  bondDegree: 9
standards: []
bindings: []
signatures:
  computationUuid: "c0320990-3d88-8fab-8ff7-b6e855063cd8"
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
      stageUuid: "4e855568-2fe9-8e79-ad02-761598065f01"
    - stage: seal
      stageUuid: "53f00c1c-9f50-8ae8-b38c-cd501c1e54d0"
    - stage: uuid
      stageUuid: "34a70324-ffb9-8be5-9ba1-63ac29477430"
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

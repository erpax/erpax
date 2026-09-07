---
name: replication
description: "Use when data must exist in multiple places — read replicas, primary-replica sync, replication lag, replication filtering, point-in-time recovery from replicas, federation/multi-tenant replication semantics."
atomPath: "vocabulary/replication"
coordinate: "vocabulary/replication · 5/round · 12ff6ec7"
contentUuid: "8cbdcee2-da82-5f5f-bc6f-48ed0dfb0547"
diamondUuid: "f43e2439-b88e-8da3-a153-b31e0604f008"
uuid: "12ff6ec7-92a6-80ed-9de7-76233624cf74"
horo: 5
typography:
  partition: vocabulary
  bondDegree: 24
standards: []
bindings: []
signatures:
  computationUuid: "56382ed2-26c4-83da-905e-cb80d43ff5fe"
  stages:
    - stage: path
      stageUuid: "66aeccf9-cfd7-8881-8c87-1c9a7df9ed06"
    - stage: trinity
      stageUuid: "fdc53930-f827-82ce-a411-7973500aa691"
    - stage: boundary
      stageUuid: "281db13c-8d34-8b91-a2a0-77676634350d"
    - stage: links
      stageUuid: "ee6c5ba7-83d1-8a19-a562-2f06cc7d3a01"
    - stage: horo
      stageUuid: "8ac2b415-f107-8af3-b74a-9e701b07f202"
    - stage: seal
      stageUuid: "6f8292a2-b2f9-8bf1-9872-da18f548ad8f"
    - stage: uuid
      stageUuid: "37857e8c-eb4e-8abd-978d-e2614e8c7c74"
version: 2
---
# replication

Use when data must exist in multiple places — read replicas, primary-replica sync, replication lag, replication filtering, point-in-time recovery from replicas, federation/multi-tenant replication semantics.

Composes: [[database]] · [[federation]] · [[consistency]] · [[identity]].

**Law — [[law]]: replication keeps the same content-addressed data in multiple places (primary→replica) so every copy converges on one [[identity]] ([[merge]]), with lag the only divergence to bound.**

## Standards
- Database replication protocols
- WAL (Write-Ahead Logging)

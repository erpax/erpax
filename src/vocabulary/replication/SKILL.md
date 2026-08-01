---
name: replication
description: "Use when data must exist in multiple places — read replicas, primary-replica sync, replication lag, replication filtering, point-in-time recovery from replicas, federation/multi-tenant replication semantics."
atomPath: "vocabulary/replication"
coordinate: "vocabulary/replication · 5/round · 23a4b5a9"
contentUuid: "1b12fa4b-01c2-5fe6-873b-34da5daf6264"
diamondUuid: "4516f1ac-60b5-8be5-83ec-be6b46b4d680"
uuid: "23a4b5a9-2e01-8b85-86df-e83cd2872697"
horo: 5
typography:
  partition: vocabulary
  bondDegree: 22
standards: []
bindings: []
signatures:
  computationUuid: "ab31fed5-ad9d-8339-8976-da2936392ee0"
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
      stageUuid: "ce3d1ebe-cd9e-857c-b1c1-dcab0bedf000"
    - stage: seal
      stageUuid: "9246cbe2-7177-8aaa-982a-06fe83c3f5bc"
    - stage: uuid
      stageUuid: "e749318a-6906-87b9-bee9-6ffc875d86a2"
version: 2
---
# replication

Use when data must exist in multiple places — read replicas, primary-replica sync, replication lag, replication filtering, point-in-time recovery from replicas, federation/multi-tenant replication semantics.

Composes: [[database]] · [[federation]] · [[consistency]] · [[identity]].

**Law — [[law]]: replication keeps the same content-addressed data in multiple places (primary→replica) so every copy converges on one [[identity]] ([[merge]]), with lag the only divergence to bound.**

## Standards
- Database replication protocols
- WAL (Write-Ahead Logging)

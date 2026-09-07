---
name: replication
description: "Use when data must exist in multiple places — read replicas, primary-replica sync, replication lag, replication filtering, point-in-time recovery from replicas, federation/multi-tenant replication semantics."
atomPath: "vocabulary/replication"
coordinate: "vocabulary/replication · 8/crest · 3c39bf35"
contentUuid: "c758400d-3907-5235-8246-4409fecb7c74"
diamondUuid: "dce70a42-2891-89a6-a3ee-8bc88be2ba7c"
uuid: "3c39bf35-0cb8-8238-a7b8-96595f794220"
horo: 8
typography:
  partition: vocabulary
  bondDegree: 20
standards: []
bindings: []
signatures:
  computationUuid: "3ad4c2f1-4809-8542-af0b-d3ac9f9ecadd"
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
      stageUuid: "90448a27-ff59-8ae5-86f8-0d9ff71000d8"
    - stage: seal
      stageUuid: "6f8292a2-b2f9-8bf1-9872-da18f548ad8f"
    - stage: uuid
      stageUuid: "b2bbbdce-350f-86e4-9e01-a03a9d817308"
version: 2
---
# replication

Use when data must exist in multiple places — read replicas, primary-replica sync, replication lag, replication filtering, point-in-time recovery from replicas, federation/multi-tenant replication semantics.

Composes: [[database]] · [[federation]] · [[consistency]] · [[identity]].

**Law — [[law]]: replication keeps the same content-addressed data in multiple places (primary→replica) so every copy converges on one [[identity]] ([[merge]]), with lag the only divergence to bound.**

## Standards
- Database replication protocols
- WAL (Write-Ahead Logging)

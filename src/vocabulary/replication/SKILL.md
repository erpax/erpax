---
name: replication
description: "Use when data must exist in multiple places — read replicas, primary-replica sync, replication lag, replication filtering, point-in-time recovery from replicas, federation/multi-tenant replication semantics."
atomPath: "vocabulary/replication"
coordinate: "vocabulary/replication · 8/crest · 2ffc0011"
contentUuid: "079db997-1136-5aa4-9c9f-8fbf03e56318"
diamondUuid: "6daafef5-b8be-8fc5-8f3a-7e796318f29d"
uuid: "2ffc0011-aefe-8c22-b40e-23e9565eb08b"
horo: 8
typography:
  partition: vocabulary
  bondDegree: 24
standards: []
bindings: []
signatures:
  computationUuid: "a5b8d8fc-d523-8e84-a278-0b1fcf77258d"
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
      stageUuid: "f94886c0-7413-8a23-8c02-a6e68aa5bf7c"
    - stage: seal
      stageUuid: "6f8292a2-b2f9-8bf1-9872-da18f548ad8f"
    - stage: uuid
      stageUuid: "134591ee-b6e5-8f37-9a2f-3ca23da9699b"
version: 2
---
# replication

Use when data must exist in multiple places — read replicas, primary-replica sync, replication lag, replication filtering, point-in-time recovery from replicas, federation/multi-tenant replication semantics.

Composes: [[database]] · [[federation]] · [[consistency]] · [[identity]].

**Law — [[law]]: replication keeps the same content-addressed data in multiple places (primary→replica) so every copy converges on one [[identity]] ([[merge]]), with lag the only divergence to bound.**

## Standards
- Database replication protocols
- WAL (Write-Ahead Logging)

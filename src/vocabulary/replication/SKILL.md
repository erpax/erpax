---
name: replication
description: "Use when data must exist in multiple places — read replicas, primary-replica sync, replication lag, replication filtering, point-in-time recovery from replicas, federation/multi-tenant replication semantics."
atomPath: "vocabulary/replication"
coordinate: "vocabulary/replication · 5/round · 1d96b877"
contentUuid: "34097c37-3477-5623-9990-2492edc05141"
diamondUuid: "bc51debb-41d6-829a-909e-eafca3ea7d29"
uuid: "1d96b877-e160-8558-bba2-967213139aa2"
horo: 5
typography:
  partition: vocabulary
  bondDegree: 20
standards: []
bindings: []
signatures:
  computationUuid: "e8dcff8d-238b-8392-adbb-22e0ae8af553"
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
      stageUuid: "deb21a9a-1215-8fe0-8e73-c610de923133"
    - stage: seal
      stageUuid: "6f8292a2-b2f9-8bf1-9872-da18f548ad8f"
    - stage: uuid
      stageUuid: "9e3734ad-8573-8405-b68a-932b6a2dea8e"
version: 2
---
# replication

Use when data must exist in multiple places — read replicas, primary-replica sync, replication lag, replication filtering, point-in-time recovery from replicas, federation/multi-tenant replication semantics.

Composes: [[database]] · [[federation]] · [[consistency]] · [[identity]].

**Law — [[law]]: replication keeps the same content-addressed data in multiple places (primary→replica) so every copy converges on one [[identity]] ([[merge]]), with lag the only divergence to bound.**

## Standards
- Database replication protocols
- WAL (Write-Ahead Logging)

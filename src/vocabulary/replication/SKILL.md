---
name: replication
description: "Use when data must exist in multiple places — read replicas, primary-replica sync, replication lag, replication filtering, point-in-time recovery from replicas, federation/multi-tenant replication semantics."
atomPath: "vocabulary/replication"
coordinate: "vocabulary/replication · 4/weave · 75bd1c3b"
contentUuid: "dafb82cf-3960-541a-ae4a-732efbb0d704"
diamondUuid: "6d1bda5b-fd9a-8f2b-b87b-7ae70e9c6d76"
uuid: "75bd1c3b-d98a-8bdf-a8dc-9c7f231c6543"
horo: 4
typography:
  partition: vocabulary
  bondDegree: 24
standards: []
bindings: []
signatures:
  computationUuid: "975b5865-a68a-8ab3-b2a7-2371e626b786"
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
      stageUuid: "2ee201b1-bcb4-856e-9aec-4e76e111d897"
    - stage: seal
      stageUuid: "6f8292a2-b2f9-8bf1-9872-da18f548ad8f"
    - stage: uuid
      stageUuid: "fc562732-f4ab-8aee-a384-905440a4795b"
version: 2
---
# replication

Use when data must exist in multiple places — read replicas, primary-replica sync, replication lag, replication filtering, point-in-time recovery from replicas, federation/multi-tenant replication semantics.

Composes: [[database]] · [[federation]] · [[consistency]] · [[identity]].

**Law — [[law]]: replication keeps the same content-addressed data in multiple places (primary→replica) so every copy converges on one [[identity]] ([[merge]]), with lag the only divergence to bound.**

## Standards
- Database replication protocols
- WAL (Write-Ahead Logging)

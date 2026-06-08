---
name: replication
description: "Use when data must exist in multiple places — read replicas, primary-replica sync, replication lag, replication filtering, point-in-time recovery from replicas, federation/multi-tenant replication semantics."
atomPath: replication
coordinate: replication · 5/round · 16220ed9
contentUuid: "35e637bd-8962-54ec-a1e4-80c522400a63"
diamondUuid: "c5bbd5b3-128c-8c7e-98b0-b00fa4343474"
uuid: "16220ed9-df60-82c4-ab75-8f922459f627"
horo: 5
bonds:
  in:
    - cloning
    - consistency
    - cost
    - database
    - federation
    - identity
    - law
    - merge
  out:
    - cloning
    - consistency
    - cost
    - database
    - federation
    - identity
    - law
    - merge
typography:
  partition: replication
  bondDegree: 24
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - consistency
    - database
    - federation
    - identity
    - law
    - merge
  matrix:
    - cloning
    - consistency
    - cost
    - database
    - federation
    - identity
    - law
    - merge
  backlinks:
    - cloning
    - consistency
    - cost
    - database
    - federation
    - identity
    - law
    - merge
signatures:
  computationUuid: "9247df09-97c8-8292-9c29-c418fb603dcb"
  stages:
    - stage: path
      stageUuid: "00db9843-87e4-80c9-a246-711dfe594323"
    - stage: trinity
      stageUuid: "3ee983c8-104f-8444-9881-c3671db43981"
    - stage: boundary
      stageUuid: "8eb12595-b49e-8e0c-826b-dde074bc750e"
    - stage: links
      stageUuid: "9cf49319-645a-8b88-9755-a9284cbab1b7"
    - stage: horo
      stageUuid: "d2e92cfd-2d7e-888a-ae0c-8b587b0b0daa"
    - stage: seal
      stageUuid: "77236f5e-19b2-8182-86f8-15fa803da3a5"
    - stage: uuid
      stageUuid: "0953c701-560c-8a84-86bb-7177d0f8b250"
version: 2
---
# replication

Use when data must exist in multiple places — read replicas, primary-replica sync, replication lag, replication filtering, point-in-time recovery from replicas, federation/multi-tenant replication semantics.

Composes: [[database]] · [[federation]] · [[consistency]] · [[identity]].

**Law — [[law]]: replication keeps the same content-addressed data in multiple places (primary→replica) so every copy converges on one [[identity]] ([[merge]]), with lag the only divergence to bound.**

## Standards
- Database replication protocols
- WAL (Write-Ahead Logging)

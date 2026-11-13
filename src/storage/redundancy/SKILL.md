---
name: redundancy
description: Use when reasoning about redundancy — puts to every backend and prefers a copy whose recomputed uuid matches its content. repairs a stale or tampered store by pulling from a healthy peer.
atomPath: "storage/redundancy"
coordinate: "storage/redundancy · 2/share · ac644642"
contentUuid: "cc70607f-ce2d-593f-a913-4607f1110561"
diamondUuid: "a293abd1-d894-8ace-9cbe-e95cd76d327a"
uuid: "ac644642-e83f-8c21-a2e8-6bf92bee146c"
horo: 2
typography:
  partition: storage
  bondDegree: 6
standards:
  - "ISO/IEC 9075-2:2016 §4.15.10 — when paired with bitemporal history"
bindings: []
signatures:
  computationUuid: "c1c7680c-1566-8a65-bed2-7dfa338b3e30"
  stages:
    - stage: path
      stageUuid: "f9a5474b-3d47-840d-9f67-86ef242b39e9"
    - stage: trinity
      stageUuid: "ee8f9e45-d328-84d4-bdcf-d01ed0f71b57"
    - stage: boundary
      stageUuid: "df44516f-f3a2-83ee-8ef1-52eb8c6058f7"
    - stage: links
      stageUuid: "0ef8ebd5-61ff-8819-ad86-a7469cebcff7"
    - stage: horo
      stageUuid: "b206116f-9241-8a33-a90c-9ba6782ad668"
    - stage: seal
      stageUuid: "481b6c7b-d884-821c-8792-e9734f55a283"
    - stage: uuid
      stageUuid: "2170e6c9-7f4d-835e-b0e1-9755e78a8dd3"
version: 2
---
# storage/redundancy — N stores, one address, and divergence is decided by recomputation

`redundantWrite` puts to every backend and `redundantRead` prefers a copy whose recomputed uuid
matches its content. `reconcileBackends` repairs a stale or tampered store by pulling from a
healthy peer.

The comparison is by content-address rather than by timestamp, so "newest" cannot beat "correct".

Composes: [[uuid]] · [[law]].

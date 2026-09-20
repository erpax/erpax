---
name: redundancy
description: Use when reasoning about redundancy — puts to every backend and prefers a copy whose recomputed uuid matches its content. repairs a stale or tampered store by pulling from a healthy peer.
atomPath: "storage/redundancy"
coordinate: "storage/redundancy · 2/share · ac644642"
contentUuid: "aa23a58c-cb3d-55a7-9ee0-d21939f3b1da"
diamondUuid: "7924664a-b2ba-89c2-9d3b-a086934e6c1f"
uuid: "ac644642-e83f-8c21-a2e8-6bf92bee146c"
horo: 2
typography:
  partition: storage
  bondDegree: 27
standards: []
bindings: []
signatures:
  computationUuid: "6f89b030-e149-85ae-a133-fe36f2451614"
  stages:
    - stage: path
      stageUuid: "f9a5474b-3d47-840d-9f67-86ef242b39e9"
    - stage: trinity
      stageUuid: "ee8f9e45-d328-84d4-bdcf-d01ed0f71b57"
    - stage: boundary
      stageUuid: "d37af9b3-8579-86e9-8e18-8fecd395c0a1"
    - stage: links
      stageUuid: "0ef8ebd5-61ff-8819-ad86-a7469cebcff7"
    - stage: horo
      stageUuid: "4794d602-609e-802a-8689-13e287a8bf58"
    - stage: seal
      stageUuid: "481b6c7b-d884-821c-8792-e9734f55a283"
    - stage: uuid
      stageUuid: "06c88f06-a9d6-8486-a8c8-a5b4afeee7f5"
version: 2
---
# storage/redundancy — N stores, one address, and divergence is decided by recomputation

`redundantWrite` puts to every backend and `redundantRead` prefers a copy whose recomputed uuid
matches its content. `reconcileBackends` repairs a stale or tampered store by pulling from a
healthy peer.

The comparison is by content-address rather than by timestamp, so "newest" cannot beat "correct".

Composes: [[uuid]] · [[law]].

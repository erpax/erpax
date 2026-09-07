---
name: redundancy
description: Use when reasoning about redundancy — puts to every backend and prefers a copy whose recomputed uuid matches its content. repairs a stale or tampered store by pulling from a healthy peer.
atomPath: "storage/redundancy"
coordinate: "storage/redundancy · 5/round · 0535f156"
contentUuid: "aa0a679f-8462-571b-aa57-8ce50e610f63"
diamondUuid: "d351e0b2-630a-8725-b671-795555954deb"
uuid: "0535f156-d5d5-8085-879e-319991ad6c04"
horo: 5
typography:
  partition: storage
  bondDegree: 27
standards:
  - "ISO/IEC 9075-2:2016 §4.15.10 (when paired with Law 14 bitemporal)"
bindings: []
signatures:
  computationUuid: "d6985912-0744-86e0-98ec-a1dfd3d3e125"
  stages:
    - stage: path
      stageUuid: "f9a5474b-3d47-840d-9f67-86ef242b39e9"
    - stage: trinity
      stageUuid: "ee8f9e45-d328-84d4-bdcf-d01ed0f71b57"
    - stage: boundary
      stageUuid: "353a9b72-94c3-833f-a113-3973a3e18667"
    - stage: links
      stageUuid: "0ef8ebd5-61ff-8819-ad86-a7469cebcff7"
    - stage: horo
      stageUuid: "d239ebfd-bd25-89e8-a1af-01f8888f4aa6"
    - stage: seal
      stageUuid: "481b6c7b-d884-821c-8792-e9734f55a283"
    - stage: uuid
      stageUuid: "6818cf2f-204c-82ad-89b2-ec18390b165b"
version: 2
---
# storage/redundancy — N stores, one address, and divergence is decided by recomputation

`redundantWrite` puts to every backend and `redundantRead` prefers a copy whose recomputed uuid
matches its content. `reconcileBackends` repairs a stale or tampered store by pulling from a
healthy peer.

The comparison is by content-address rather than by timestamp, so "newest" cannot beat "correct".

Composes: [[uuid]] · [[law]].

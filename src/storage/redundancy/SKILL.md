---
name: redundancy
description: Use when reasoning about redundancy — puts to every backend and prefers a copy whose recomputed uuid matches its content. repairs a stale or tampered store by pulling from a healthy peer.
atomPath: "storage/redundancy"
coordinate: "storage/redundancy · 8/crest · 1171cd6c"
contentUuid: "aabe21ff-922b-52d7-a4d9-358dff71cd0b"
diamondUuid: "c6a4c022-56dd-88f2-acf0-cf9c823ab65d"
uuid: "1171cd6c-9fb7-856b-8430-851bd03d57d6"
horo: 8
typography:
  partition: storage
  bondDegree: 27
standards:
  - "ISO/IEC 9075-2:2016 §4.15.10 (when paired with Law 14 bitemporal)"
bindings: []
signatures:
  computationUuid: "67d8fe75-9f92-8915-bb17-71b4f4dba390"
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
      stageUuid: "c3d0124a-137a-84fa-80e4-a3f411e5a8e3"
    - stage: seal
      stageUuid: "481b6c7b-d884-821c-8792-e9734f55a283"
    - stage: uuid
      stageUuid: "14a3583e-77b2-87eb-96cf-2db4267a1a95"
version: 2
---
# storage/redundancy — N stores, one address, and divergence is decided by recomputation

`redundantWrite` puts to every backend and `redundantRead` prefers a copy whose recomputed uuid
matches its content. `reconcileBackends` repairs a stale or tampered store by pulling from a
healthy peer.

The comparison is by content-address rather than by timestamp, so "newest" cannot beat "correct".

Composes: [[uuid]] · [[law]].

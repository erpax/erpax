---
name: redundancy
description: Use when reasoning about redundancy — puts to every backend and prefers a copy whose recomputed uuid matches its content. repairs a stale or tampered store by pulling from a healthy peer.
atomPath: "storage/redundancy"
coordinate: "storage/redundancy · 2/share · 10d3a1d6"
contentUuid: "98db3e53-9499-53be-b0ca-1c766737172d"
diamondUuid: "c5571a0c-cf11-8a15-ab87-fe3489c85235"
uuid: "10d3a1d6-549d-8b79-8a96-cb35cf637a50"
horo: 2
typography:
  partition: storage
  bondDegree: 27
standards:
  - "ISO/IEC 9075-2:2016 §4.15.10 (when paired with Law 14 bitemporal)"
bindings: []
signatures:
  computationUuid: "f2370d89-07ce-89f0-aae4-4489a644f1a2"
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
      stageUuid: "6234df79-a4c2-815f-af7a-edd82cb1b081"
    - stage: seal
      stageUuid: "481b6c7b-d884-821c-8792-e9734f55a283"
    - stage: uuid
      stageUuid: "3cc07067-d2f9-8bac-bda1-68c6b00e309b"
version: 2
---
# storage/redundancy — N stores, one address, and divergence is decided by recomputation

`redundantWrite` puts to every backend and `redundantRead` prefers a copy whose recomputed uuid
matches its content. `reconcileBackends` repairs a stale or tampered store by pulling from a
healthy peer.

The comparison is by content-address rather than by timestamp, so "newest" cannot beat "correct".

Composes: [[uuid]] · [[law]].

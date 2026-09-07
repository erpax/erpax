---
name: redundancy
description: Use when reasoning about redundancy — puts to every backend and prefers a copy whose recomputed uuid matches its content. repairs a stale or tampered store by pulling from a healthy peer.
atomPath: "storage/redundancy"
coordinate: "storage/redundancy · 4/weave · 46e981b1"
contentUuid: "1bd622b7-1853-5435-911e-f6c91ce58a0c"
diamondUuid: "ab55533f-c3ef-8345-9a71-336608b18385"
uuid: "46e981b1-af65-87af-846f-1cb95188dfe9"
horo: 4
typography:
  partition: storage
  bondDegree: 27
standards:
  - "ISO/IEC 9075-2:2016 §4.15.10 (when paired with Law 14 bitemporal)"
bindings: []
signatures:
  computationUuid: "05473f37-9ad4-81b1-a04d-af5e28b429e6"
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
      stageUuid: "c00909f7-d332-8050-b903-3e14f8882044"
    - stage: seal
      stageUuid: "481b6c7b-d884-821c-8792-e9734f55a283"
    - stage: uuid
      stageUuid: "f7101b0a-40ff-8c34-bd77-fe1dea7de915"
version: 2
---
# storage/redundancy — N stores, one address, and divergence is decided by recomputation

`redundantWrite` puts to every backend and `redundantRead` prefers a copy whose recomputed uuid
matches its content. `reconcileBackends` repairs a stale or tampered store by pulling from a
healthy peer.

The comparison is by content-address rather than by timestamp, so "newest" cannot beat "correct".

Composes: [[uuid]] · [[law]].

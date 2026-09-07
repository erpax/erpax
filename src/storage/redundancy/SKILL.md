---
name: redundancy
description: Use when reasoning about redundancy — puts to every backend and prefers a copy whose recomputed uuid matches its content. repairs a stale or tampered store by pulling from a healthy peer.
atomPath: "storage/redundancy"
coordinate: "storage/redundancy · 4/weave · 181cd929"
contentUuid: "51310eec-853b-574c-bcd4-40348c84b411"
diamondUuid: "856d7035-2cf9-8f33-a863-d8658b0b2dfc"
uuid: "181cd929-c4c3-816b-ac59-e0f9ae3fc9cb"
horo: 4
typography:
  partition: storage
  bondDegree: 27
standards:
  - "ISO/IEC 9075-2:2016 §4.15.10 (when paired with Law 14 bitemporal)"
bindings: []
signatures:
  computationUuid: "7768a451-a3dc-86fb-87d1-6606fcd79e09"
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
      stageUuid: "d5c5e828-79a4-8ed4-850f-1d56470e3f7b"
    - stage: seal
      stageUuid: "481b6c7b-d884-821c-8792-e9734f55a283"
    - stage: uuid
      stageUuid: "d567b2cf-8b92-822a-ad74-bf5afd7e22c8"
version: 2
---
# storage/redundancy — N stores, one address, and divergence is decided by recomputation

`redundantWrite` puts to every backend and `redundantRead` prefers a copy whose recomputed uuid
matches its content. `reconcileBackends` repairs a stale or tampered store by pulling from a
healthy peer.

The comparison is by content-address rather than by timestamp, so "newest" cannot beat "correct".

Composes: [[uuid]] · [[law]].

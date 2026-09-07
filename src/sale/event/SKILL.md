---
name: event
description: "Use when a sale closes and the rest of the system must learn about it — emits the sale:closed domain event exactly once on the transition, keyed by the content-uuid so a federation peer reconciles by content rather than by local row id."
atomPath: "sale/event"
coordinate: "sale/event · 8/crest · ea6c875c"
contentUuid: "98f159b0-3f83-5907-93c5-dded4eba6779"
diamondUuid: "b7c98640-561f-8626-a9d4-dc4fe1411802"
uuid: "ea6c875c-21aa-8158-a190-a9235ec49831"
horo: 8
typography:
  partition: sale
  bondDegree: 149
standards:
  - "BG Наредба-Н-18 §СУПТО sale-lifecycle"
  - "Naredba-N-18"
bindings: []
signatures:
  computationUuid: "8512e352-be97-8928-aeb5-94cf14f4faf5"
  stages:
    - stage: path
      stageUuid: "feef1816-496f-8421-92b7-e6906737e7fd"
    - stage: trinity
      stageUuid: "0d3ed2eb-06bd-8ad5-aac7-1d807657aca8"
    - stage: boundary
      stageUuid: "e23d36a4-5f17-834f-af46-72b7d93bf82b"
    - stage: links
      stageUuid: "02cf1756-8a20-84e9-bae8-bfbe7485ab32"
    - stage: horo
      stageUuid: "c1f0721f-3cda-852c-9ded-bcf150e70d0e"
    - stage: seal
      stageUuid: "6ca257c6-27bb-8193-9801-9ff953edd0a6"
    - stage: uuid
      stageUuid: "804d2eb1-2129-8e3d-87fa-9dd9ca7e0e9d"
version: 2
---
# event

Emits `sale:closed` on the transition into closed — **once**. Re-emitting on a later update to an already-closed sale would post the same sale to the GL and the audit chain twice, so the hook tests the transition, not the state. The `aggregateId` is the **content-uuid**, never the row id: a peer reconciles by content, and a local id means nothing to it.

Composes: [[sale]] · [[law]].

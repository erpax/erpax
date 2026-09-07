---
name: event
description: "Use when a sale closes and the rest of the system must learn about it — emits the sale:closed domain event exactly once on the transition, keyed by the content-uuid so a federation peer reconciles by content rather than by local row id."
atomPath: "sale/event"
coordinate: "sale/event · 1/base · 6fe78072"
contentUuid: "53f5fd15-a56a-5579-8925-dd9b17beb6a5"
diamondUuid: "e29191d3-12b2-8f71-82d6-9ac7cfb6da4e"
uuid: "6fe78072-43f6-8156-9c25-2ecf76583612"
horo: 1
typography:
  partition: sale
  bondDegree: 159
standards:
  - "BG Наредба-Н-18 §СУПТО sale-lifecycle"
  - "Naredba-N-18"
bindings: []
signatures:
  computationUuid: "74249254-39c7-8304-8a44-c875975e122e"
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
      stageUuid: "efc7f8b6-d8b2-85ab-b1f7-3dcb6d252fb6"
    - stage: seal
      stageUuid: "6ca257c6-27bb-8193-9801-9ff953edd0a6"
    - stage: uuid
      stageUuid: "d3061f01-83d7-8190-b00a-19b3c2e00410"
version: 2
---
# event

Emits `sale:closed` on the transition into closed — **once**. Re-emitting on a later update to an already-closed sale would post the same sale to the GL and the audit chain twice, so the hook tests the transition, not the state. The `aggregateId` is the **content-uuid**, never the row id: a peer reconciles by content, and a local id means nothing to it.

Composes: [[sale]] · [[law]].

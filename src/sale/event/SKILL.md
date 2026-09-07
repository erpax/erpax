---
name: event
description: "Use when a sale closes and the rest of the system must learn about it — emits the sale:closed domain event exactly once on the transition, keyed by the content-uuid so a federation peer reconciles by content rather than by local row id."
atomPath: "sale/event"
coordinate: "sale/event · 4/weave · b54b658a"
contentUuid: "43854a35-4277-5645-a378-fa02a8a75f4d"
diamondUuid: "473942e0-9741-8ab0-8214-8932a2cd804b"
uuid: "b54b658a-7084-8d22-9a7b-75acb08e8731"
horo: 4
typography:
  partition: sale
  bondDegree: 159
standards:
  - "BG Наредба-Н-18 §СУПТО sale-lifecycle"
  - "Naredba-N-18"
bindings: []
signatures:
  computationUuid: "9775e91f-463d-85b4-8fe7-ed95aa739f62"
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
      stageUuid: "b28cb0b4-8e13-80ae-8bf7-e986e0a75254"
    - stage: seal
      stageUuid: "6ca257c6-27bb-8193-9801-9ff953edd0a6"
    - stage: uuid
      stageUuid: "b9621869-00f7-8b43-b443-d7014014acd1"
version: 2
---
# event

Emits `sale:closed` on the transition into closed — **once**. Re-emitting on a later update to an already-closed sale would post the same sale to the GL and the audit chain twice, so the hook tests the transition, not the state. The `aggregateId` is the **content-uuid**, never the row id: a peer reconciles by content, and a local id means nothing to it.

Composes: [[sale]] · [[law]].

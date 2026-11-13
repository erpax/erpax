---
name: event
description: "Use when a sale closes and the rest of the system must learn about it — emits the sale:closed domain event exactly once on the transition, keyed by the content-uuid so a federation peer reconciles by content rather than by local row id."
atomPath: "sale/event"
coordinate: "sale/event · 4/weave · f3b25708"
contentUuid: "2a4c58a9-6c30-5039-ba7e-0aceb07e1ee7"
diamondUuid: "43ff2037-4ee3-846d-8acb-47647343e753"
uuid: "f3b25708-f189-8653-b883-ad4db2b92514"
horo: 4
typography:
  partition: sale
  bondDegree: 57
standards:
  - "BG Наредба-Н-18 §СУПТО sale-lifecycle"
  - "Naredba-N-18"
bindings: []
signatures:
  computationUuid: "d009d0d6-9557-8f48-9144-2d07bd9d22fb"
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
      stageUuid: "a47fa55f-e537-8260-9a7f-3f4486b33b0d"
    - stage: seal
      stageUuid: "6ca257c6-27bb-8193-9801-9ff953edd0a6"
    - stage: uuid
      stageUuid: "cfeecf7b-5795-84e9-803a-a70793efab42"
version: 2
---
# event

Emits `sale:closed` on the transition into closed — **once**. Re-emitting on a later update to an already-closed sale would post the same sale to the GL and the audit chain twice, so the hook tests the transition, not the state. The `aggregateId` is the **content-uuid**, never the row id: a peer reconciles by content, and a local id means nothing to it.

Composes: [[sale]] · [[law]].

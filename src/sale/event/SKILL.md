---
name: event
description: "Use when a sale closes and the rest of the system must learn about it — emits the sale:closed domain event exactly once on the transition, keyed by the content-uuid so a federation peer reconciles by content rather than by local row id."
atomPath: "sale/event"
coordinate: "sale/event · 7/descent · 90017a60"
contentUuid: "e9d84f17-574f-577e-a37b-4a016337f40c"
diamondUuid: "b5eeacf2-ba3e-8a5e-a059-a02738087fa1"
uuid: "90017a60-8fbe-8770-b586-33c2ff0c8c7a"
horo: 7
typography:
  partition: sale
  bondDegree: 159
standards:
  - "BG Наредба-Н-18 §СУПТО sale-lifecycle"
  - "Naredba-N-18"
bindings: []
signatures:
  computationUuid: "78f0767c-c902-8d15-9182-5e7f9bd3a851"
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
      stageUuid: "279ce3ba-edb3-8bef-a65c-9e7a0502c39b"
    - stage: seal
      stageUuid: "6ca257c6-27bb-8193-9801-9ff953edd0a6"
    - stage: uuid
      stageUuid: "23720c85-1cf5-8e3f-8e4b-4d1f177f6ca8"
version: 2
---
# event

Emits `sale:closed` on the transition into closed — **once**. Re-emitting on a later update to an already-closed sale would post the same sale to the GL and the audit chain twice, so the hook tests the transition, not the state. The `aggregateId` is the **content-uuid**, never the row id: a peer reconciles by content, and a local id means nothing to it.

Composes: [[sale]] · [[law]].

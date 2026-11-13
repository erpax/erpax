---
name: events
description: "Use when ingesting or querying carrier shipment-status events — webhook pushes, API polls, or EDI IFTSTA messages — to update a shipment's in-transit state and trigger IFRS-15 §38 point-in-time revenue recognition on the `delivered` event under DDP/DAP/DPU INCOTERMS. The append-only carrier-tracking event log."
atomPath: "customers/sales/orders/shipments/tracking/events"
coordinate: "customers/sales/orders/shipments/tracking/events · 5/round · dbd00d30"
contentUuid: "93a73191-1d98-577c-98bc-e39d4ff6fe95"
diamondUuid: "dfecf7d9-dabb-8bf5-ae6a-6381fbb2beca"
uuid: "dbd00d30-936c-8209-8f38-37808e8f1d71"
horo: 5
typography:
  partition: customers
  bondDegree: 51
standards:
  - "EDIFACT IFTSTA international-multimodal-status-message"
  - "IFRS IFRS-15 §38 point-in-time-revenue-recognition"
  - "INCOTERMS 2020 control-transfer-points"
  - "INCOTERMS-2020"
  - "ISO-8601-1:2019 date-time event-time"
  - "ISO-8601-1:2019 date-time event-time`"
  - "ISO-9735"
  - "SOX §404 internal-controls delivery-evidence TOM-LOG-02"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "0430d400-a070-8ce7-aef0-d6e4f7af871f"
  stages:
    - stage: path
      stageUuid: "e9e73587-5102-8618-835d-55c621eaca3b"
    - stage: trinity
      stageUuid: "60c06d49-2f12-846e-8bcc-f67556f6d56d"
    - stage: boundary
      stageUuid: "298c8c84-59ef-8424-83b3-7c15b9a3f4b3"
    - stage: links
      stageUuid: "98460ea8-61fb-8114-b1ab-a012e7936d9f"
    - stage: horo
      stageUuid: "b5f9609b-67ad-864e-9b59-688e11cd605d"
    - stage: seal
      stageUuid: "3e035edc-35fe-8d38-806a-fa3ee4f9989f"
    - stage: uuid
      stageUuid: "95e0277f-cfbe-8348-8870-9ec0f9a3c3f8"
version: 2
---
# tracking-events

Tracking Events — per-leg shipment status updates from carrier APIs.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-8601-1:2019 date-time event-time`

- ISO-8601-1:2019 date-time event-time
- INCOTERMS 2020 control-transfer-points
- EDIFACT IFTSTA international-multimodal-status-message
- ISO-19011:2018 audit-trail shipment-tracking
- IFRS IFRS-15 §38 point-in-time-revenue-recognition
- SOX §404 internal-controls delivery-evidence TOM-LOG-02
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[Carriers]] · [[Shipments]] · [[accounting]] · [[proof]].

**Law — [[law]]: the event log is append-only, and the `delivered` event is the single point-in-time trigger that transfers control and recognises revenue exactly once.**

---
name: events
description: "Use when ingesting or querying carrier shipment-status events — webhook pushes, API polls, or EDI IFTSTA messages — to update a shipment's in-transit state and trigger IFRS-15 §38 point-in-time revenue recognition on the `delivered` event under DDP/DAP/DPU INCOTERMS. The append-only carrier-tracking event log."
atomPath: "customers/sales/orders/shipments/tracking/events"
coordinate: "customers/sales/orders/shipments/tracking/events · 7/descent · cdbf18cb"
contentUuid: "cd0d5845-350f-55db-a921-c21915e12777"
diamondUuid: "4d86c341-d508-8c4d-8070-b7afa190ba69"
uuid: "cdbf18cb-d0ab-8d49-bcc7-fde3bd8d8bf2"
horo: 7
typography:
  partition: customers
  bondDegree: 54
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
  computationUuid: "56133135-658b-807a-98c7-e0441e7828f9"
  stages:
    - stage: path
      stageUuid: "e9e73587-5102-8618-835d-55c621eaca3b"
    - stage: trinity
      stageUuid: "60c06d49-2f12-846e-8bcc-f67556f6d56d"
    - stage: boundary
      stageUuid: "298c8c84-59ef-8424-83b3-7c15b9a3f4b3"
    - stage: links
      stageUuid: "29d23c49-3ab5-8af2-9131-4e0598799dff"
    - stage: horo
      stageUuid: "d2b19afd-61a1-8a9f-b0ce-18165cd41ef6"
    - stage: seal
      stageUuid: "3e035edc-35fe-8d38-806a-fa3ee4f9989f"
    - stage: uuid
      stageUuid: "36d2a5ca-f326-8684-8ea3-e082e5680736"
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

---
name: events
description: "Use when ingesting or querying carrier shipment-status events — webhook pushes, API polls, or EDI IFTSTA messages — to update a shipment's in-transit state and trigger IFRS-15 §38 point-in-time revenue recognition on the `delivered` event under DDP/DAP/DPU INCOTERMS. The append-only carrier-tracking event log."
atomPath: "customers/sales/orders/shipments/tracking/events"
coordinate: "customers/sales/orders/shipments/tracking/events · 1/base · 82b98589"
contentUuid: "262675e9-dd11-531e-83a7-70d62e32c581"
diamondUuid: "dca06a9b-f9d6-835d-9eb6-4658b312f532"
uuid: "82b98589-b798-81d8-a8ee-1a31fa0eaa8e"
horo: 1
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
  computationUuid: "2f37e1e8-cdcd-8df3-b934-fc4b70234ea8"
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
      stageUuid: "5bcc6b09-98c7-806d-a736-d9cc825d8fa6"
    - stage: seal
      stageUuid: "3e035edc-35fe-8d38-806a-fa3ee4f9989f"
    - stage: uuid
      stageUuid: "4ed5f8d5-91d5-820d-92e9-c9260d4db7dc"
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

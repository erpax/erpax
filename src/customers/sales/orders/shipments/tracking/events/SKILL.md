---
name: events
description: "Use when ingesting or querying carrier shipment-status events — webhook pushes, API polls, or EDI IFTSTA messages — to update a shipment's in-transit state and trigger IFRS-15 §38 point-in-time revenue recognition on the `delivered` event under DDP/DAP/DPU INCOTERMS. The append-only carrier-tracking event log."
atomPath: customers/sales/orders/shipments/tracking/events
coordinate: customers/sales/orders/shipments/tracking/events · 2/share · 70f12b95
contentUuid: "88ffb695-b290-5b69-a4c2-0ec425057305"
diamondUuid: "c3cad3ee-706b-8d0d-944b-61bcf42c18a4"
uuid: "70f12b95-a2cb-8500-b777-b4cd207b52f2"
horo: 2
bonds:
  in:
    - auditright
    - horo
    - identity
    - incident
    - instances
    - lineage
    - materiality
    - observability
    - party
    - proof
    - standard
    - sub
    - tracking
  out:
    - auditright
    - horo
    - identity
    - incident
    - instances
    - lineage
    - materiality
    - observability
    - party
    - proof
    - standard
    - sub
typography:
  partition: customers
  bondDegree: 54
  neighbors: []
standards:
  - "EDIFACT IFTSTA international-multimodal-status-message"
  - "IFRS IFRS-15 §38 point-in-time-revenue-recognition"
  - "INCOTERMS 2020 control-transfer-points"
  - "INCOTERMS-2020"
  - "ISO-19011:2018 audit-trail shipment-tracking"
  - "ISO-8601-1:2019 date-time event-time"
  - "ISO-9735"
  - "SOX §404 internal-controls delivery-evidence TOM-LOG-02"
bindings: []
neighbors:
  wikilink:
    - accounting
    - carriers
    - law
    - proof
    - shipments
  matrix:
    - auditright
    - horo
    - identity
    - incident
    - instances
    - lineage
    - materiality
    - observability
    - party
    - proof
    - standard
    - sub
  backlinks:
    - auditright
    - horo
    - identity
    - incident
    - instances
    - lineage
    - materiality
    - observability
    - party
    - proof
    - standard
    - sub
signatures:
  computationUuid: "e9baf2ff-15fc-8f57-a2a6-eb48da95dc95"
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
      stageUuid: "8736abba-2c10-8944-99a5-e9e4e8a03eaa"
    - stage: seal
      stageUuid: "3e035edc-35fe-8d38-806a-fa3ee4f9989f"
    - stage: uuid
      stageUuid: "59747034-9ac9-84ff-8e5e-81855920b4cc"
version: 2
---
# tracking-events

Tracking Events — per-leg shipment status updates from carrier APIs.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISO-8601-1:2019 date-time event-time
- INCOTERMS 2020 control-transfer-points
- EDIFACT IFTSTA international-multimodal-status-message
- ISO-19011:2018 audit-trail shipment-tracking
- IFRS IFRS-15 §38 point-in-time-revenue-recognition
- SOX §404 internal-controls delivery-evidence TOM-LOG-02
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[Carriers]] · [[Shipments]] · [[accounting]] · [[proof]].

**Law — [[law]]: the event log is append-only, and the `delivered` event is the single point-in-time trigger that transfers control and recognises revenue exactly once.**

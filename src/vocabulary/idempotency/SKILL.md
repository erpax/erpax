---
name: idempotency
description: "Use when operations must be safely replayed — idempotent keys, deduplication within a replay window, exactly-once semantics, retry-safe operations, side-effect tracking, idempotency contracts in APIs."
atomPath: "vocabulary/idempotency"
coordinate: "vocabulary/idempotency · 2/share · f9dbda90"
contentUuid: "c8fe799e-6679-5a1f-bc61-42aad8226403"
diamondUuid: "9964d1c4-0520-81d9-96bc-7df6644d993d"
uuid: "f9dbda90-b237-86a5-a9dc-d88f3509006d"
horo: 2
typography:
  partition: vocabulary
  bondDegree: 16
standards: []
bindings: []
signatures:
  computationUuid: "c8604eb4-bff5-8d66-8aea-c4997857becf"
  stages:
    - stage: path
      stageUuid: "dff8cc28-9ebf-83eb-92e7-c85fa5e8dc4a"
    - stage: trinity
      stageUuid: "7a8a2fd6-43e1-883f-9d34-8c1674195898"
    - stage: boundary
      stageUuid: "f75c529d-e9ce-8cb4-888b-8c18dc4b2d28"
    - stage: links
      stageUuid: "19f3aa75-4b04-8e39-b9fb-18a1589e8251"
    - stage: horo
      stageUuid: "d30d229f-92c3-8d90-bf8b-2592a3327c8f"
    - stage: seal
      stageUuid: "71eecbb6-6320-838c-a764-facafbc00f18"
    - stage: uuid
      stageUuid: "93056e6b-3af7-86aa-9fbb-db1b78b9c2c6"
version: 2
---
# idempotency

Use when operations must be safely replayed — idempotent keys, deduplication within a replay window, exactly-once semantics, retry-safe operations, side-effect tracking, idempotency contracts in APIs.

Composes: [[ingest]] · [[transaction]] · [[reconcile]] · [[deduplication]] · [[jobs]].

## Standards
- Idempotency in HTTP (RFC 9110)
- Message queue idempotency

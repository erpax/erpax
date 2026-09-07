---
name: idempotency
description: "Use when operations must be safely replayed — idempotent keys, deduplication within a replay window, exactly-once semantics, retry-safe operations, side-effect tracking, idempotency contracts in APIs."
atomPath: "vocabulary/idempotency"
coordinate: "vocabulary/idempotency · 1/base · 4941cabc"
contentUuid: "2e602517-1b6f-53f4-b9e7-8431ab52f362"
diamondUuid: "f4b2d2b3-48d6-886f-9da9-c11a4baa55ff"
uuid: "4941cabc-abdd-8fcf-a64a-d27682ad2a79"
horo: 1
typography:
  partition: vocabulary
  bondDegree: 16
standards: []
bindings: []
signatures:
  computationUuid: "21ec9134-731c-8f64-bb55-dea2277bd06c"
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
      stageUuid: "09465c48-202a-8732-86e4-528e5e41b160"
    - stage: seal
      stageUuid: "71eecbb6-6320-838c-a764-facafbc00f18"
    - stage: uuid
      stageUuid: "376ee304-de9f-896f-91ce-bc1e13e4329c"
version: 2
---
# idempotency

Use when operations must be safely replayed — idempotent keys, deduplication within a replay window, exactly-once semantics, retry-safe operations, side-effect tracking, idempotency contracts in APIs.

Composes: [[ingest]] · [[transaction]] · [[reconcile]] · [[deduplication]] · [[jobs]].

## Standards
- Idempotency in HTTP (RFC 9110)
- Message queue idempotency

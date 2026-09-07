---
name: idempotency
description: "Use when operations must be safely replayed — idempotent keys, deduplication within a replay window, exactly-once semantics, retry-safe operations, side-effect tracking, idempotency contracts in APIs."
atomPath: "vocabulary/idempotency"
coordinate: "vocabulary/idempotency · 7/descent · af5573ad"
contentUuid: "15ad94ef-dd71-5a32-b2d2-c9cba8199890"
diamondUuid: "173e7d7f-3327-8518-a92a-6cf69d0f5f23"
uuid: "af5573ad-bb24-84d9-bcc7-b3a4462fa4d5"
horo: 7
typography:
  partition: vocabulary
  bondDegree: 16
standards: []
bindings: []
signatures:
  computationUuid: "7bebedaf-c218-87d4-a1b0-66ae3f608a8a"
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
      stageUuid: "3cb871b0-df58-8252-a5f7-53f00f9145b5"
    - stage: seal
      stageUuid: "71eecbb6-6320-838c-a764-facafbc00f18"
    - stage: uuid
      stageUuid: "ff2b10a6-dfc4-85ff-a909-dd4606a5441d"
version: 2
---
# idempotency

Use when operations must be safely replayed — idempotent keys, deduplication within a replay window, exactly-once semantics, retry-safe operations, side-effect tracking, idempotency contracts in APIs.

Composes: [[ingest]] · [[transaction]] · [[reconcile]] · [[deduplication]] · [[jobs]].

## Standards
- Idempotency in HTTP (RFC 9110)
- Message queue idempotency

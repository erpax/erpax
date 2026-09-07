---
name: idempotency
description: "Use when operations must be safely replayed — idempotent keys, deduplication within a replay window, exactly-once semantics, retry-safe operations, side-effect tracking, idempotency contracts in APIs."
atomPath: "vocabulary/idempotency"
coordinate: "vocabulary/idempotency · 2/share · c52cb214"
contentUuid: "61e91fd9-27f3-52d7-a2ec-3a7fde2fdbba"
diamondUuid: "46ff7269-00a0-850a-bb72-efa682514fc0"
uuid: "c52cb214-122d-8d70-addf-e60e12e772f1"
horo: 2
typography:
  partition: vocabulary
  bondDegree: 16
standards: []
bindings: []
signatures:
  computationUuid: "e11e2816-8ee4-8aee-ae14-b28076fe7bf0"
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
      stageUuid: "de4f54a8-4678-810c-83d8-d448f34d33bf"
    - stage: seal
      stageUuid: "71eecbb6-6320-838c-a764-facafbc00f18"
    - stage: uuid
      stageUuid: "2663111f-19de-8627-8caf-6cb2a8119bc4"
version: 2
---
# idempotency

Use when operations must be safely replayed — idempotent keys, deduplication within a replay window, exactly-once semantics, retry-safe operations, side-effect tracking, idempotency contracts in APIs.

Composes: [[ingest]] · [[transaction]] · [[reconcile]] · [[deduplication]] · [[jobs]].

## Standards
- Idempotency in HTTP (RFC 9110)
- Message queue idempotency

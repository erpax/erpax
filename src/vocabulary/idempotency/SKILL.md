---
name: idempotency
description: "Use when operations must be safely replayed — idempotent keys, deduplication within a replay window, exactly-once semantics, retry-safe operations, side-effect tracking, idempotency contracts in APIs."
atomPath: "vocabulary/idempotency"
coordinate: "vocabulary/idempotency · 5/round · 9cc503ab"
contentUuid: "6879868d-ae20-5b9b-8307-937f109329ee"
diamondUuid: "f6e9749d-1d06-80de-972c-cc300fb4b68f"
uuid: "9cc503ab-f957-878f-9791-46e174dc779e"
horo: 5
typography:
  partition: vocabulary
  bondDegree: 16
standards: []
bindings: []
signatures:
  computationUuid: "2f4b7bfd-2e47-89b7-b446-31242b402048"
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
      stageUuid: "c783dfa4-e6f7-85e2-91fa-eca2f1659c3b"
    - stage: seal
      stageUuid: "a74fe9d4-ec75-8133-b96a-b6572d6a3b2b"
    - stage: uuid
      stageUuid: "13c08940-f893-8d31-8e5b-a124e024c679"
version: 2
---
# idempotency

Use when operations must be safely replayed — idempotent keys, deduplication within a replay window, exactly-once semantics, retry-safe operations, side-effect tracking, idempotency contracts in APIs.

Composes: [[ingest]] · [[transaction]] · [[reconcile]] · [[deduplication]] · [[jobs]].

## Standards
- Idempotency in HTTP (RFC 9110)
- Message queue idempotency

---
name: idempotency
description: "Use when operations must be safely replayed — idempotent keys, deduplication within a replay window, exactly-once semantics, retry-safe operations, side-effect tracking, idempotency contracts in APIs."
atomPath: "vocabulary/idempotency"
coordinate: "vocabulary/idempotency · 4/weave · 93ba70cd"
contentUuid: "21103c7e-15c2-5cbe-8133-5f83338f2b76"
diamondUuid: "c75dabb0-634d-861c-ab6e-dc884d74276a"
uuid: "93ba70cd-a358-8f67-90b0-684911e9aca8"
horo: 4
typography:
  partition: vocabulary
  bondDegree: 16
standards: []
bindings: []
signatures:
  computationUuid: "c25d9711-c6d7-86e7-912d-629521a6a9bd"
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
      stageUuid: "e660508b-5f2c-8f84-8e30-3ff0d069b147"
    - stage: seal
      stageUuid: "71eecbb6-6320-838c-a764-facafbc00f18"
    - stage: uuid
      stageUuid: "6d725466-7fdd-838c-9e00-93374fd838ee"
version: 2
---
# idempotency

Use when operations must be safely replayed — idempotent keys, deduplication within a replay window, exactly-once semantics, retry-safe operations, side-effect tracking, idempotency contracts in APIs.

Composes: [[ingest]] · [[transaction]] · [[reconcile]] · [[deduplication]] · [[jobs]].

## Standards
- Idempotency in HTTP (RFC 9110)
- Message queue idempotency

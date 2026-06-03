---
name: idempotency
description: "Use when operations must be safely replayed — idempotent keys, deduplication within a replay window, exactly-once semantics, retry-safe operations, side-effect tracking, idempotency contracts in APIs."
---

# idempotency

Use when operations must be safely replayed — idempotent keys, deduplication within a replay window, exactly-once semantics, retry-safe operations, side-effect tracking, idempotency contracts in APIs.

Composes: [[ingest]] · [[transaction]] · [[reconcile]] · [[deduplication]] · [[jobs]].

## Standards
- Idempotency in HTTP (RFC 9110)
- Message queue idempotency

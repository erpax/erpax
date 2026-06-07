---
name: op
description: Use when enqueueing or processing a bulk import or export (CSV, Excel, JSON/JSONL, UBL/CII XML, camt.053/054, pain.001/008, EDIFACT, OCR) — the single bulk-operations contract that writes an audit row up front, dispatches to the queue, and lands each failed row in transaction-failures for operator review.
---

# bulk/op — the unified bulk-operations contract

One entry-point for every file-format import / export, replacing the per-format ad-hoc importers (csv-importer, camt-importer, …) each with their own progress + retry UI. `enqueueBulkOperation` mints an idempotency `operationId`, writes a best-effort `audit-events` row so the operation is visible before the queue consumer wakes, and returns `{ operationId, status: 'queued' }`. `processRow` applies the mapped row, inserting into the target collection and routing any failure to a `transaction-failures` row. The kind→audit-operation map collapses `reprocess`/`reverse` onto `update`; `import`/`export` map 1:1.

Matter-twin: `src/bulk/op/index.ts` (`enqueueBulkOperation` · `processRow` · `BULK_KIND_TO_AUDIT_OPERATION`).

**Law — [[law]]: every bulk import/export flows through one contract — audited up front, idempotent by `operationId`, and per-row fail-closed into `transaction-failures` — so the per-format importers collapse to a single [[op]] ([[dry]]).**

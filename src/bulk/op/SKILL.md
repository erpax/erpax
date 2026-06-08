---
name: op
description: "Use when enqueueing or processing a bulk import or export (CSV, Excel, JSON/JSONL, UBL/CII XML, camt.053/054, pain.001/008, EDIFACT, OCR) — the single bulk-operations contract that writes an audit row up front, dispatches to the queue, and lands each failed row in transaction-failures for operator review."
atomPath: bulk/op
coordinate: bulk/op · 8/crest · 6911cde0
contentUuid: "5868ca8c-a6f1-51b6-b65f-c3837199adbb"
diamondUuid: "882ec2bc-dbe5-8ff7-94c7-dff10b806fc2"
uuid: "6911cde0-37d9-8970-8c9c-af48bebc230f"
horo: 8
bonds:
  in:
    - collapse
    - law
    - merge
    - op
    - post
    - pre
    - sti
  out:
    - collapse
    - law
    - merge
    - op
    - post
    - pre
    - sti
typography:
  partition: bulk
  bondDegree: 26
  neighbors: []
standards:
  - "COSO-ERM-2017"
  - "EN-16931"
  - "EN-16931:2017 (UBL / CII import)"
  - "EU-2002/58"
  - "EU-2005/29"
  - "EU-2017/1132"
  - "EU-2017/828"
  - "ILO-C001"
  - ISO 20022 camt.053 pain.001 pain.008
  - "ISO-19011:2018 audit-trail bulk-ops-evidence"
  - "ISO-20022"
  - "ISO/IEC 19503:2005 XMI"
  - "SOX §404 internal-controls bulk-import-completeness"
  - "UBL-2.1"
  - "rfc-4180 csv-format"
bindings: []
neighbors:
  wikilink:
    - dry
    - law
    - op
  matrix:
    - collapse
    - law
    - merge
    - op
    - post
    - pre
    - sti
  backlinks:
    - collapse
    - law
    - merge
    - op
    - post
    - pre
    - sti
signatures:
  computationUuid: "abeb0562-1d82-8a84-b234-be87c6236cf6"
  stages:
    - stage: path
      stageUuid: "7be5c6f2-0510-8e9f-8e99-e6d730ae9a6f"
    - stage: trinity
      stageUuid: "2ffef0fb-fb11-8bb8-8970-eca2b9e2363f"
    - stage: boundary
      stageUuid: "39b34fee-c8d4-8089-a556-6722c383f385"
    - stage: links
      stageUuid: "978f6fe6-2c76-817c-a26c-72a63a6be741"
    - stage: horo
      stageUuid: "dbf4f7e7-994c-8b78-92f3-48ad2cfa1011"
    - stage: seal
      stageUuid: "8a4b978a-d0b0-8acc-87d8-f2aa118dc2a5"
    - stage: uuid
      stageUuid: "bed93c08-98c9-833d-8e1e-1d53a9ba8c59"
version: 2
---
# bulk/op — the unified bulk-operations contract

One entry-point for every file-format import / export, replacing the per-format ad-hoc importers (csv-importer, camt-importer, …) each with their own progress + retry UI. `enqueueBulkOperation` mints an idempotency `operationId`, writes a best-effort `audit-events` row so the operation is visible before the queue consumer wakes, and returns `{ operationId, status: 'queued' }`. `processRow` applies the mapped row, inserting into the target collection and routing any failure to a `transaction-failures` row. The kind→audit-operation map collapses `reprocess`/`reverse` onto `update`; `import`/`export` map 1:1.

Matter-twin: `src/bulk/op/index.ts` (`enqueueBulkOperation` · `processRow` · `BULK_KIND_TO_AUDIT_OPERATION`).

**Law — [[law]]: every bulk import/export flows through one contract — audited up front, idempotent by `operationId`, and per-row fail-closed into `transaction-failures` — so the per-format importers collapse to a single [[op]] ([[dry]]).**

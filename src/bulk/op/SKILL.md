---
name: op
description: "Use when enqueueing or processing a bulk import or export (CSV, Excel, JSON/JSONL, UBL/CII XML, camt.053/054, pain.001/008, EDIFACT, OCR) — the single bulk-operations contract that writes an audit row up front, dispatches to the queue, and lands each failed row in transaction-failures for operator review."
atomPath: "bulk/op"
coordinate: "bulk/op · 7/descent · 1a5847d3"
contentUuid: "5a0f22b1-da41-5265-84e2-5c4c7e916e77"
diamondUuid: "b61fb6a7-488a-81f8-a52b-33372391870e"
uuid: "1a5847d3-e8d9-8155-bd24-b97485166ee6"
horo: 7
bonds:
  in:
    - dry
    - law
    - op
    - post
    - pre
  out:
    - dry
    - law
    - op
    - post
    - pre
typography:
  partition: bulk
  bondDegree: 22
  neighbors: []
standards:
  - "COSO-ERM-2017"
  - "EN-16931"
  - "EN-16931:2017 (UBL / CII import)"
  - "EN-16931:2017 (UBL / CII import)`"
  - "EU-2002/58"
  - "EU-2005/29"
  - "EU-2017/1132"
  - "EU-2017/828"
  - ISO 20022 camt.053 pain.001 pain.008
  - "ISO 20022 camt.053 pain.001 pain.008`"
  - "ISO-20022"
  - "ISO/IEC 19503:2005 XMI"
  - "ISO/IEC 19503:2005 XMI`"
  - "SOX §404 internal-controls bulk-import-completeness"
  - "UBL-2.1"
  - "rfc-4180 csv-format"
  - "rfc-4180 csv-format`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
neighbors:
  wikilink:
    - dry
    - law
    - op
  matrix:
    - dry
    - law
    - op
    - post
    - pre
  backlinks:
    - dry
    - law
    - op
    - post
    - pre
signatures:
  computationUuid: "9ce9ecc3-aba9-8e37-b82f-1ca072bd15f0"
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
      stageUuid: "43fc29ea-7976-8949-b9b0-cb6200127990"
    - stage: seal
      stageUuid: "8a4b978a-d0b0-8acc-87d8-f2aa118dc2a5"
    - stage: uuid
      stageUuid: "773d4955-3ead-8b40-94ad-627ce5bc8c41"
version: 2
---
# bulk/op — the unified bulk-operations contract

One entry-point for every file-format import / export, replacing the per-format ad-hoc importers (csv-importer, camt-importer, …) each with their own progress + retry UI. `enqueueBulkOperation` mints an idempotency `operationId`, writes a best-effort `audit-events` row so the operation is visible before the queue consumer wakes, and returns `{ operationId, status: 'queued' }`. `processRow` applies the mapped row, inserting into the target collection and routing any failure to a `transaction-failures` row. The kind→audit-operation map collapses `reprocess`/`reverse` onto `update`; `import`/`export` map 1:1.

Matter-twin: `src/bulk/op/index.ts` (`enqueueBulkOperation` · `processRow` · `BULK_KIND_TO_AUDIT_OPERATION`).

**Law — [[law]]: every bulk import/export flows through one contract — audited up front, idempotent by `operationId`, and per-row fail-closed into `transaction-failures` — so the per-format importers collapse to a single [[op]] ([[dry]]).**

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO 20022 camt.053 pain.001 pain.008`
- `@standard EN-16931:2017 (UBL / CII import)`
- `@standard rfc-4180 csv-format`
- `@standard ISO/IEC 19503:2005 XMI`

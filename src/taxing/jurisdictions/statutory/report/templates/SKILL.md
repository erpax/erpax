---
name: templates
description: "Use when defining or retrieving jurisdiction-scoped statutory filing templates — annual reports, tax returns, regulatory filings, financial statements, audit reports — with section sequences and effective dates. The per-jurisdiction statutory filing template node."
atomPath: taxing/jurisdictions/statutory/report/templates
coordinate: taxing/jurisdictions/statutory/report/templates · 8/crest · d9612b98
contentUuid: "347b2559-8fb5-5ca3-ad64-901016b581e3"
diamondUuid: "9f38c168-67a4-8f5b-ba51-8bd1f7776b1a"
uuid: "d9612b98-8bac-8259-9705-a10e84d5359b"
horo: 8
bonds:
  in:
    - jurisdictions
    - mappings
    - report
  out:
    - jurisdictions
    - mappings
typography:
  partition: taxing
  bondDegree: 0
  neighbors: []
standards:
  - "IFRS-Taxonomy"
  - "SAF-T OECD audit-file"
  - XBRL
  - "XBRL business-reporting"
bindings: []
neighbors:
  wikilink:
    - mappings
  matrix:
    - jurisdictions
    - mappings
  backlinks:
    - jurisdictions
    - mappings
signatures:
  computationUuid: "58649d91-3864-8959-a847-80584c34fda6"
  stages:
    - stage: path
      stageUuid: "63d18618-877d-822d-bee5-7050900c2937"
    - stage: trinity
      stageUuid: "9dff013e-34c1-82ab-a3f9-cafd23c42cf2"
    - stage: boundary
      stageUuid: "07d5f174-3155-80bb-9120-e5ab5843e3e4"
    - stage: links
      stageUuid: "8a5e2847-77d4-8f40-9866-7ee4b8c808a7"
    - stage: horo
      stageUuid: "73d38183-6369-8985-8182-bb6147a7d08c"
    - stage: seal
      stageUuid: "0963cffa-5350-8c23-bac3-63b4d7b98bcf"
    - stage: uuid
      stageUuid: "cdb5342c-c512-8958-b770-e52e151aefa2"
version: 2
---
# statutory-report-templates

StatutoryReportTemplates.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- SAF-T OECD audit-file
- XBRL business-reporting
- IFRS-Taxonomy
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[taxing/jurisdictions/statutory/report/templates/statutory/field/mappings]].

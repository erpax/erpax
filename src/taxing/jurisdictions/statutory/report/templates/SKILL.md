---
name: templates
description: "Use when defining or retrieving jurisdiction-scoped statutory filing templates — annual reports, tax returns, regulatory filings, financial statements, audit reports — with section sequences and effective dates. The per-jurisdiction statutory filing template node."
atomPath: "taxing/jurisdictions/statutory/report/templates"
coordinate: "taxing/jurisdictions/statutory/report/templates · 7/descent · 2431ea80"
contentUuid: "61c7c03b-54ba-5d1a-8665-1fb228d6f82d"
diamondUuid: "011d4451-42c4-88c7-a0fc-eb246c97aca2"
uuid: "2431ea80-8210-8781-b46a-91d78d08f4ca"
horo: 7
typography:
  partition: taxing
  bondDegree: 5
standards:
  - "IFRS-Taxonomy"
  - "IFRS-Taxonomy`"
  - "SAF-T OECD audit-file"
  - XBRL
  - "XBRL business-reporting"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "323f060e-530a-8f37-9a22-ab7f67142d08"
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
      stageUuid: "55df037f-b690-8285-8322-a3b90a197b01"
    - stage: seal
      stageUuid: "0963cffa-5350-8c23-bac3-63b4d7b98bcf"
    - stage: uuid
      stageUuid: "1af7824c-6ca5-8277-aa36-27d3ca298658"
version: 2
---
# statutory-report-templates

StatutoryReportTemplates.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard IFRS-Taxonomy`

- SAF-T OECD audit-file
- XBRL business-reporting
- IFRS-Taxonomy
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[taxing/jurisdictions/statutory/report/templates/statutory/field/mappings]].

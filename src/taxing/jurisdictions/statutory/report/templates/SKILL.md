---
name: templates
description: "Use when defining or retrieving jurisdiction-scoped statutory filing templates — annual reports, tax returns, regulatory filings, financial statements, audit reports — with section sequences and effective dates. The per-jurisdiction statutory filing template node."
atomPath: "taxing/jurisdictions/statutory/report/templates"
coordinate: "taxing/jurisdictions/statutory/report/templates · 2/share · 3a014080"
contentUuid: "6491d40a-18bc-5b4a-9db2-f3611d264aa0"
diamondUuid: "d0fad907-227e-889d-bf0a-0a7706118653"
uuid: "3a014080-b56f-8157-9bef-91c59cd2bd51"
horo: 2
typography:
  partition: taxing
  bondDegree: 8
standards:
  - "IFRS-Taxonomy"
  - "IFRS-Taxonomy`"
  - "SAF-T OECD audit-file"
  - XBRL
  - "XBRL business-reporting"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "9a5bcb1e-2ac2-8688-bd75-db5308c1e3e4"
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
      stageUuid: "5bb91839-8b48-86ec-9c8e-0f68cac8a55d"
    - stage: seal
      stageUuid: "0963cffa-5350-8c23-bac3-63b4d7b98bcf"
    - stage: uuid
      stageUuid: "3bfbe1f5-c5ad-85e2-aecf-3aa00dba1144"
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

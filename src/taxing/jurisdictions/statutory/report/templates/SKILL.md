---
name: templates
description: "Use when defining or retrieving jurisdiction-scoped statutory filing templates — annual reports, tax returns, regulatory filings, financial statements, audit reports — with section sequences and effective dates. The per-jurisdiction statutory filing template node."
atomPath: "taxing/jurisdictions/statutory/report/templates"
coordinate: "taxing/jurisdictions/statutory/report/templates · 2/share · fb2725e8"
contentUuid: "26084c1a-fe76-519e-8702-265f999916f0"
diamondUuid: "22ebe447-7c9e-8426-9644-ceb8f67917dd"
uuid: "fb2725e8-8cd1-8db4-89a2-27f1fc047918"
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
  computationUuid: "31da668b-353c-87ec-a0d5-4910f029c872"
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
      stageUuid: "730240af-6c81-86a4-8d8c-0a98e8ee1b09"
    - stage: seal
      stageUuid: "0963cffa-5350-8c23-bac3-63b4d7b98bcf"
    - stage: uuid
      stageUuid: "1d47fb98-2a41-8d95-9c46-fde9b78d6a92"
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

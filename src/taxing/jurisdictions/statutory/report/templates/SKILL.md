---
name: templates
description: "Use when defining or retrieving jurisdiction-scoped statutory filing templates — annual reports, tax returns, regulatory filings, financial statements, audit reports — with section sequences and effective dates. The per-jurisdiction statutory filing template node."
atomPath: "taxing/jurisdictions/statutory/report/templates"
coordinate: "taxing/jurisdictions/statutory/report/templates · 4/weave · faa82bb8"
contentUuid: "9c2a2e96-feb2-5ea3-858c-335aa3b7ff7a"
diamondUuid: "9f975879-f591-8658-9896-5e43575465fc"
uuid: "faa82bb8-9e0e-88ba-85c6-cd66e08e869b"
horo: 4
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
  computationUuid: "061daef3-4ec6-8699-8fbd-1baefc04d7ce"
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
      stageUuid: "cc448ea8-201d-8eff-a171-6b14c033322c"
    - stage: seal
      stageUuid: "0963cffa-5350-8c23-bac3-63b4d7b98bcf"
    - stage: uuid
      stageUuid: "0874a970-ca0e-846e-9110-031836e3d7f1"
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

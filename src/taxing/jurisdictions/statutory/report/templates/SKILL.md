---
name: templates
description: "Use when defining or retrieving jurisdiction-scoped statutory filing templates — annual reports, tax returns, regulatory filings, financial statements, audit reports — with section sequences and effective dates. The per-jurisdiction statutory filing template node."
atomPath: "taxing/jurisdictions/statutory/report/templates"
coordinate: "taxing/jurisdictions/statutory/report/templates · 8/crest · bfc90931"
contentUuid: "5add71ac-a679-57c4-ad05-0d1fc0c2e985"
diamondUuid: "7827a009-8388-8053-bd98-c6f74c685a1d"
uuid: "bfc90931-fdf3-8745-85e6-f924a1b54d42"
horo: 8
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
  computationUuid: "83760106-d7a1-86cb-93a2-b9c12e3773c4"
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
      stageUuid: "4b5aa52f-fa42-8a83-b182-7de81a13b62e"
    - stage: seal
      stageUuid: "0963cffa-5350-8c23-bac3-63b4d7b98bcf"
    - stage: uuid
      stageUuid: "8ab9bec8-4cf3-8c6b-a5f7-e697c82a7f78"
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

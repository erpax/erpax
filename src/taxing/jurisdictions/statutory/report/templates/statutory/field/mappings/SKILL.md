---
name: mappings
description: "Use when wiring source collection fields to statutory report template slots — mapping field names, types, transformations, and validation rules for SAF-T/XBRL/EN-16931 filings. The field-level mapping node for statutory report templates."
atomPath: "taxing/jurisdictions/statutory/report/templates/statutory/field/mappings"
coordinate: "taxing/jurisdictions/statutory/report/templates/statutory/field/mappings · 2/share · af359bf8"
contentUuid: "3c941428-673a-5ff5-a4d5-60603728e4de"
diamondUuid: "d6ce85a9-fa4d-8f36-899f-96f5638cfd8b"
uuid: "af359bf8-1d10-83d2-b93e-14971114e0db"
horo: 2
typography:
  partition: taxing
  bondDegree: 10
standards:
  - "EN-16931 e-invoicing-semantic-model"
  - "EN-16931 e-invoicing-semantic-model`"
  - "SAF-T OECD standard-audit-file-tax"
  - XBRL
  - "XBRL taxonomy-mapping"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "cec968d1-3ca3-8116-a74e-94eee72109dc"
  stages:
    - stage: path
      stageUuid: "d0dd9ea1-045b-88bb-b212-3e3934e7047a"
    - stage: trinity
      stageUuid: "dcc8800f-0de6-8115-b22c-f6229a436467"
    - stage: boundary
      stageUuid: "3a2c7849-6c36-8be7-9749-b214d5678fd6"
    - stage: links
      stageUuid: "31e6565d-2928-8f2e-bd96-84885ceb3be9"
    - stage: horo
      stageUuid: "dbafb422-83a4-806e-acdc-cd08f0559e3c"
    - stage: seal
      stageUuid: "c18356bb-d2a1-8fab-b7eb-50adb1e2da4e"
    - stage: uuid
      stageUuid: "60fe9305-16ee-8046-967f-0fda78140d7f"
version: 2
---
# statutory-field-mappings

StatutoryFieldMappings.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard EN-16931 e-invoicing-semantic-model`

- SAF-T OECD standard-audit-file-tax
- XBRL taxonomy-mapping
- EN-16931 e-invoicing-semantic-model
- ISO-27001 A.5.23 cloud-service-tenant-isolation

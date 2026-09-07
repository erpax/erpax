---
name: mappings
description: "Use when wiring source collection fields to statutory report template slots — mapping field names, types, transformations, and validation rules for SAF-T/XBRL/EN-16931 filings. The field-level mapping node for statutory report templates."
atomPath: "taxing/jurisdictions/statutory/report/templates/statutory/field/mappings"
coordinate: "taxing/jurisdictions/statutory/report/templates/statutory/field/mappings · 5/round · 2a3b89bd"
contentUuid: "6016f43b-19b4-509d-9ea4-24e85adbaa7d"
diamondUuid: "af92283b-a91d-825e-9e84-3292e7880b43"
uuid: "2a3b89bd-7da1-8c28-a6cf-619bd09733ab"
horo: 5
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
  computationUuid: "323c5c9e-bc82-8141-baad-ee9c1ab3e25d"
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
      stageUuid: "7963f6b4-104c-8a2c-a7eb-638fa57a1d80"
    - stage: seal
      stageUuid: "c18356bb-d2a1-8fab-b7eb-50adb1e2da4e"
    - stage: uuid
      stageUuid: "19cc4a80-cf69-8f7e-a149-43d9dab83a76"
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

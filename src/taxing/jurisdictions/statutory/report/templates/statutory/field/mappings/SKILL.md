---
name: mappings
description: "Use when wiring source collection fields to statutory report template slots — mapping field names, types, transformations, and validation rules for SAF-T/XBRL/EN-16931 filings. The field-level mapping node for statutory report templates."
atomPath: "taxing/jurisdictions/statutory/report/templates/statutory/field/mappings"
coordinate: "taxing/jurisdictions/statutory/report/templates/statutory/field/mappings · 5/round · 1ea7d8be"
contentUuid: "94c15499-1e36-5ee6-bcb2-1d4fa1a006cd"
diamondUuid: "aad56edf-95b7-88a8-a7d8-25166c2d1eb8"
uuid: "1ea7d8be-4134-8800-8720-38572080fbfc"
horo: 5
typography:
  partition: taxing
  bondDegree: 8
standards:
  - "EN-16931 e-invoicing-semantic-model"
  - "EN-16931 e-invoicing-semantic-model`"
  - "SAF-T OECD standard-audit-file-tax"
  - XBRL
  - "XBRL taxonomy-mapping"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "a48e9b2d-7d4b-8607-84da-62a68c9854a1"
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
      stageUuid: "2559cfac-aa9f-81cf-bafc-563e4bf7ca6e"
    - stage: seal
      stageUuid: "c18356bb-d2a1-8fab-b7eb-50adb1e2da4e"
    - stage: uuid
      stageUuid: "d1e486eb-3460-8f93-be41-c2c9947e09c0"
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

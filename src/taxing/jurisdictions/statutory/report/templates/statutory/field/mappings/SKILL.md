---
name: mappings
description: "Use when wiring source collection fields to statutory report template slots — mapping field names, types, transformations, and validation rules for SAF-T/XBRL/EN-16931 filings. The field-level mapping node for statutory report templates."
atomPath: "taxing/jurisdictions/statutory/report/templates/statutory/field/mappings"
coordinate: "taxing/jurisdictions/statutory/report/templates/statutory/field/mappings · 8/crest · 628fc48e"
contentUuid: "93378c34-2a44-52fe-9674-30691277ae96"
diamondUuid: "8dd8520c-d6eb-8c89-a83c-634792342a5a"
uuid: "628fc48e-e52e-8172-983f-cf05bac3b6d0"
horo: 8
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
  computationUuid: "fa7eaffb-895d-8eed-89f9-f7d5c6f4b9fc"
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
      stageUuid: "54d76ed7-87ee-87d2-a7b1-3d69151aa293"
    - stage: seal
      stageUuid: "c18356bb-d2a1-8fab-b7eb-50adb1e2da4e"
    - stage: uuid
      stageUuid: "18492c7c-5ccc-8790-8849-5da3369993f5"
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

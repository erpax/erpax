---
name: mappings
description: "Use when wiring source collection fields to statutory report template slots — mapping field names, types, transformations, and validation rules for SAF-T/XBRL/EN-16931 filings. The field-level mapping node for statutory report templates."
atomPath: "taxing/jurisdictions/statutory/report/templates/statutory/field/mappings"
coordinate: "taxing/jurisdictions/statutory/report/templates/statutory/field/mappings · 1/base · 22da58e3"
contentUuid: "1bc29d4a-c31d-56aa-b3ea-5ae104c5a316"
diamondUuid: "91f3887b-a45c-8b1b-a43d-f9a2bc4ceb9a"
uuid: "22da58e3-2d91-8bc8-91fa-91cb456dd6d9"
horo: 1
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
  computationUuid: "8515889a-8d46-8d57-bcca-3989645314ab"
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
      stageUuid: "834b5caf-7b8e-8959-84c2-f93948df5440"
    - stage: seal
      stageUuid: "c18356bb-d2a1-8fab-b7eb-50adb1e2da4e"
    - stage: uuid
      stageUuid: "89ed7cb1-36b7-8287-983c-2bca9fd8d58f"
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

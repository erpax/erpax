---
name: mappings
description: "Use when wiring source collection fields to statutory report template slots — mapping field names, types, transformations, and validation rules for SAF-T/XBRL/EN-16931 filings. The field-level mapping node for statutory report templates."
atomPath: taxing/jurisdictions/statutory/report/templates/statutory/field/mappings
coordinate: taxing/jurisdictions/statutory/report/templates/statutory/field/mappings · 7/descent · 4b0f448f
contentUuid: "a4660ec6-a0d5-57d2-ac54-1e7f677dfc66"
diamondUuid: "b0a89a69-02e0-8394-bdbe-0f39207dcd50"
uuid: "4b0f448f-5d6d-85e0-9386-166844f7c747"
horo: 7
bonds:
  in:
    - field
    - law
    - mapping
    - standards
  out:
    - law
    - mapping
    - standards
typography:
  partition: taxing
  bondDegree: 10
  neighbors: []
standards:
  - "EN-16931 e-invoicing-semantic-model"
  - "SAF-T OECD standard-audit-file-tax"
  - XBRL
  - "XBRL taxonomy-mapping"
bindings: []
neighbors:
  wikilink: []
  matrix:
    - law
    - mapping
    - standards
  backlinks:
    - law
    - mapping
    - standards
signatures:
  computationUuid: "e7030b08-e076-8f4b-be9a-9d5a91f51060"
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
      stageUuid: "2f4b7db9-ce84-8666-875e-a4e5a664dfe5"
    - stage: seal
      stageUuid: "c18356bb-d2a1-8fab-b7eb-50adb1e2da4e"
    - stage: uuid
      stageUuid: "b957ff63-5054-82aa-8c85-c821e83ae19b"
version: 2
---
# statutory-field-mappings

StatutoryFieldMappings.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- SAF-T OECD standard-audit-file-tax
- XBRL taxonomy-mapping
- EN-16931 e-invoicing-semantic-model
- ISO-27001 A.5.23 cloud-service-tenant-isolation

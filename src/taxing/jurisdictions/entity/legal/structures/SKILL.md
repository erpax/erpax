---
name: structures
description: "Use when mapping legal entity types to their jurisdiction-specific legal forms — local name, abbreviation, governance structure (single/board/supervisory), tax treatment (corporate/pass-through/exempt), audit requirement and regulatory characteristics per taxing jurisdiction. The reference collection for entity-type-to-legal-form bindings."
atomPath: "taxing/jurisdictions/entity/legal/structures"
coordinate: "taxing/jurisdictions/entity/legal/structures · 1/base · 7e8bec9d"
contentUuid: "a5714585-2232-58a6-b3f0-0c39197b6cea"
diamondUuid: "58f2767c-76c6-824c-ae95-e573627569ec"
uuid: "7e8bec9d-ef7d-8119-b195-751f4eb2126e"
horo: 1
typography:
  partition: taxing
  bondDegree: 4
standards:
  - "IFRS-10 §B86 reporting-entity"
  - "ISO-17442"
  - "ISO-17442-1"
  - "ISO-17442-1:2020 legal-entity-identifier"
  - "ISO-17442-1:2020 legal-entity-identifier`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "be4780d1-b861-8236-aaae-d8bff97d7baf"
  stages:
    - stage: path
      stageUuid: "09e5f36d-9485-8d71-a05d-6a62b594cc0d"
    - stage: trinity
      stageUuid: "57635c23-8487-8343-b654-8062df5453f3"
    - stage: boundary
      stageUuid: "a6d0e23e-ed00-8e19-9e32-066a56035251"
    - stage: links
      stageUuid: "120e887d-dc17-818e-94ee-78e38a1caee3"
    - stage: horo
      stageUuid: "2303fafb-b450-81d8-b40c-97f184d84f02"
    - stage: seal
      stageUuid: "4de7642f-30ca-86a9-b5dd-c33b54aaaf0c"
    - stage: uuid
      stageUuid: "91499980-3709-899a-a65e-7121f2a2c652"
version: 2
---
# entity-legal-structures

EntityLegalStructures.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-17442-1:2020 legal-entity-identifier`

- IFRS-10 §B86 reporting-entity
- ISO-17442-1:2020 legal-entity-identifier
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[taxing/jurisdictions]].

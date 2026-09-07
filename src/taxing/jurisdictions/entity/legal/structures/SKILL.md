---
name: structures
description: "Use when mapping legal entity types to their jurisdiction-specific legal forms — local name, abbreviation, governance structure (single/board/supervisory), tax treatment (corporate/pass-through/exempt), audit requirement and regulatory characteristics per taxing jurisdiction. The reference collection for entity-type-to-legal-form bindings."
atomPath: "taxing/jurisdictions/entity/legal/structures"
coordinate: "taxing/jurisdictions/entity/legal/structures · 5/round · 332481c8"
contentUuid: "8ba65bee-a4e0-5d9c-a088-767df479555d"
diamondUuid: "498a9b01-698f-8f0b-b170-0d55ad73f1a0"
uuid: "332481c8-1b5c-8993-876c-116a4714f910"
horo: 5
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
  computationUuid: "88b34fa9-d50c-82b1-b003-588014c154e2"
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
      stageUuid: "6168fb91-2588-8409-8f22-f89dac6adde3"
    - stage: seal
      stageUuid: "4de7642f-30ca-86a9-b5dd-c33b54aaaf0c"
    - stage: uuid
      stageUuid: "8168d07a-5bd0-8061-9d9a-e6259aebfd50"
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

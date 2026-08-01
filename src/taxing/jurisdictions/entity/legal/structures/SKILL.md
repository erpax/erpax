---
name: structures
description: "Use when mapping legal entity types to their jurisdiction-specific legal forms — local name, abbreviation, governance structure (single/board/supervisory), tax treatment (corporate/pass-through/exempt), audit requirement and regulatory characteristics per taxing jurisdiction. The reference collection for entity-type-to-legal-form bindings."
atomPath: "taxing/jurisdictions/entity/legal/structures"
coordinate: "taxing/jurisdictions/entity/legal/structures · 2/share · ad2c9745"
contentUuid: "a55e0f26-6008-5fd5-bb2b-e8557363e83e"
diamondUuid: "dd2fdde5-9649-80d1-a8c7-c34b6304ee1e"
uuid: "ad2c9745-e8b6-850f-9034-b3d8e268bb6c"
horo: 2
typography:
  partition: taxing
  bondDegree: 4
standards:
  - "IFRS-10 §B86 reporting-entity"
  - "ISO-17442-1"
  - "ISO-17442-1:2020 legal-entity-identifier"
  - "ISO-17442-1:2020 legal-entity-identifier`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "3b24a43e-016e-8d6e-ad02-75530f77d532"
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
      stageUuid: "382fa42f-adae-867a-8ded-80c61b20b7d0"
    - stage: seal
      stageUuid: "4de7642f-30ca-86a9-b5dd-c33b54aaaf0c"
    - stage: uuid
      stageUuid: "9dcd5d95-fd33-8cbf-a28c-26f3fe2a6ddb"
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

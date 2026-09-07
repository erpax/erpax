---
name: structures
description: "Use when mapping legal entity types to their jurisdiction-specific legal forms — local name, abbreviation, governance structure (single/board/supervisory), tax treatment (corporate/pass-through/exempt), audit requirement and regulatory characteristics per taxing jurisdiction. The reference collection for entity-type-to-legal-form bindings."
atomPath: "taxing/jurisdictions/entity/legal/structures"
coordinate: "taxing/jurisdictions/entity/legal/structures · 5/round · df118dea"
contentUuid: "b77e3b30-a676-5872-aab3-2b72268b1687"
diamondUuid: "f468d24c-3d64-83a3-a7c8-0facd85511de"
uuid: "df118dea-0df3-895b-b372-f0b1eaf6ac5e"
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
  computationUuid: "cb1d75ab-0793-8d49-b7b0-035e67060d93"
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
      stageUuid: "e967f971-0b52-8a70-8b59-a205b37a7b67"
    - stage: seal
      stageUuid: "4de7642f-30ca-86a9-b5dd-c33b54aaaf0c"
    - stage: uuid
      stageUuid: "1ec3120f-4453-863c-91dc-8d35fc887199"
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

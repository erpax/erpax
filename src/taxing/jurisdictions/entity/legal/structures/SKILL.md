---
name: structures
description: "Use when mapping legal entity types to their jurisdiction-specific legal forms — local name, abbreviation, governance structure (single/board/supervisory), tax treatment (corporate/pass-through/exempt), audit requirement and regulatory characteristics per taxing jurisdiction. The reference collection for entity-type-to-legal-form bindings."
atomPath: "taxing/jurisdictions/entity/legal/structures"
coordinate: "taxing/jurisdictions/entity/legal/structures · 2/share · fae83aab"
contentUuid: "9ac6c53c-3291-5b55-b64f-2f4d53e0fb25"
diamondUuid: "01c7b224-2dd4-87cf-8c98-7a5b3f3a3ad9"
uuid: "fae83aab-7cab-806a-933a-b2ec715d1662"
horo: 2
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
  computationUuid: "6410e2ee-a4a9-8e0e-9631-9aee321a2c5e"
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
      stageUuid: "1cf442a8-7b8d-8035-be29-25de7d9f3cc3"
    - stage: seal
      stageUuid: "4de7642f-30ca-86a9-b5dd-c33b54aaaf0c"
    - stage: uuid
      stageUuid: "bfccbe7e-7df9-8bbd-824d-b05983e8f532"
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

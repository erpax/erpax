---
name: structures
description: "Use when mapping legal entity types to their jurisdiction-specific legal forms — local name, abbreviation, governance structure (single/board/supervisory), tax treatment (corporate/pass-through/exempt), audit requirement and regulatory characteristics per taxing jurisdiction. The reference collection for entity-type-to-legal-form bindings."
atomPath: taxing/jurisdictions/entity/legal/structures
coordinate: taxing/jurisdictions/entity/legal/structures · 1/base · f975e9f5
contentUuid: "7ab0a235-5505-5915-a9b6-d2b22dc4be1b"
diamondUuid: "65dd90bd-4b1e-8186-9810-b71a5984614d"
uuid: "f975e9f5-425a-88cf-9715-ad1c6f1c3e2d"
horo: 1
bonds:
  in:
    - jurisdictions
    - legal
  out:
    - jurisdictions
typography:
  partition: taxing
  bondDegree: 4
  neighbors: []
standards:
  - "IFRS-10 §B86 reporting-entity"
  - "ISO-17442-1"
  - "ISO-17442-1:2020 legal-entity-identifier"
bindings: []
neighbors:
  wikilink:
    - jurisdictions
  matrix:
    - jurisdictions
  backlinks:
    - jurisdictions
signatures:
  computationUuid: "5a50cbb1-d20e-86f1-af1f-6a38ff05ce50"
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
      stageUuid: "d25e83c2-e295-8be3-a427-49e0c0febb74"
    - stage: seal
      stageUuid: "4de7642f-30ca-86a9-b5dd-c33b54aaaf0c"
    - stage: uuid
      stageUuid: "b322672b-ed54-8bfd-a6fc-74f18acd2816"
version: 2
---
# entity-legal-structures

EntityLegalStructures.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- IFRS-10 §B86 reporting-entity
- ISO-17442-1:2020 legal-entity-identifier
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[taxing/jurisdictions]].

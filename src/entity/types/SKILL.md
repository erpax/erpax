---
name: types
description: "Use when classifying legal entities — Corporation, LLC, Partnership, Nonprofit, Trust, Government, Individual — to determine applicable compliance frameworks, audit scope, and jurisdiction applicability. The read-only entity-type reference table."
atomPath: "entity/types"
coordinate: "entity/types · 8/crest · c2b6c8c8"
contentUuid: "d669bd53-0996-5029-91e2-e46fcfcdd5d2"
diamondUuid: "4bbefe48-0155-81e8-8ded-e69b3bbde86a"
uuid: "c2b6c8c8-ac98-83d6-bbc3-3d8bd3e47ee1"
horo: 8
typography:
  partition: entity
  bondDegree: 85
standards:
  - "COSO-2013"
  - "COSO-2013 entity-classification"
  - "SOX §302 entity-type-determination"
bindings: []
signatures:
  computationUuid: "1371de4e-5f19-8792-a04e-455c30b3f628"
  stages:
    - stage: path
      stageUuid: "7a11717e-e964-89b2-aff5-c8756094efd3"
    - stage: trinity
      stageUuid: "148f40d9-0e8c-8127-9308-bd06397886e8"
    - stage: boundary
      stageUuid: "bf985cbd-5b8b-8cbf-9790-33252c7a51d2"
    - stage: links
      stageUuid: "23591aa7-bf93-8023-b33e-1cf6100bd5ed"
    - stage: horo
      stageUuid: "f18ce458-676f-8ed4-bba0-35039756d0f6"
    - stage: seal
      stageUuid: "968b04b9-545b-8318-8367-798e169819f2"
    - stage: uuid
      stageUuid: "a64be0a7-2812-8363-9d3f-5318b5d633d4"
version: 2
---
# entity-types

Entity Types — classification of legal entity types.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

**Law — [[law]]: entity-types is the read-only reference table classifying a legal entity (Corporation, LLC, Partnership, Nonprofit, Trust, Government, Individual); the type, not the entity, determines which compliance frameworks, audit scope, and jurisdiction rules apply.**

## Standards
- COSO-2013 entity-classification
- SOX §302 entity-type-determination

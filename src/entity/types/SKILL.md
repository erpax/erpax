---
name: types
description: "Use when classifying legal entities — Corporation, LLC, Partnership, Nonprofit, Trust, Government, Individual — to determine applicable compliance frameworks, audit scope, and jurisdiction applicability. The read-only entity-type reference table."
atomPath: "entity/types"
coordinate: "entity/types · 1/base · e6961ccd"
contentUuid: "f7a696b9-569a-506c-9d5b-0dfbc6599837"
diamondUuid: "30a29be0-cf7f-88ec-9c97-6b57e30d4b54"
uuid: "e6961ccd-561e-88aa-8011-9c53a45b24b4"
horo: 1
typography:
  partition: entity
  bondDegree: 85
standards:
  - "COSO-2013"
  - "COSO-2013 entity-classification"
  - "SOX §302 entity-type-determination"
bindings: []
signatures:
  computationUuid: "793e84ff-a107-8826-9177-82c42feb3d98"
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
      stageUuid: "1f8ce0c8-827a-82a2-a833-b3759b2988ae"
    - stage: seal
      stageUuid: "968b04b9-545b-8318-8367-798e169819f2"
    - stage: uuid
      stageUuid: "84bd210e-5ef8-839f-b5eb-fe219e850fcd"
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

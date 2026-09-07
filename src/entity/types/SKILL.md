---
name: types
description: "Use when classifying legal entities — Corporation, LLC, Partnership, Nonprofit, Trust, Government, Individual — to determine applicable compliance frameworks, audit scope, and jurisdiction applicability. The read-only entity-type reference table."
atomPath: "entity/types"
coordinate: "entity/types · 2/share · 8c2b0c07"
contentUuid: "50f441ec-635b-5852-83a4-916db9bdee25"
diamondUuid: "4dee2b07-943d-879a-a04f-ace295aa11b7"
uuid: "8c2b0c07-9f4b-8f0f-8dee-5a8a3c909ddd"
horo: 2
typography:
  partition: entity
  bondDegree: 85
standards:
  - "COSO-2013"
  - "COSO-2013 entity-classification"
  - "SOX §302 entity-type-determination"
bindings: []
signatures:
  computationUuid: "ee750d6b-5fef-8d51-8024-f8263a042397"
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
      stageUuid: "6d7846a4-d97b-87d5-8786-aa41f48ef6aa"
    - stage: seal
      stageUuid: "968b04b9-545b-8318-8367-798e169819f2"
    - stage: uuid
      stageUuid: "ec525646-b8b5-80a2-8e2d-b8581df29f44"
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

---
name: types
description: "Use when classifying legal entities — Corporation, LLC, Partnership, Nonprofit, Trust, Government, Individual — to determine applicable compliance frameworks, audit scope, and jurisdiction applicability. The read-only entity-type reference table."
atomPath: "entity/types"
coordinate: "entity/types · 2/share · 01d6ddb7"
contentUuid: "920926b8-2758-5819-b6bd-f89ae33a9a1d"
diamondUuid: "c671a991-8d0b-82e8-ae33-e0cb8306d1a1"
uuid: "01d6ddb7-c781-86e3-950e-f0d26ce2297b"
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
  computationUuid: "04a3672a-c572-81e5-a374-a7bdf6f50243"
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
      stageUuid: "9c169b5c-44dd-8192-83b2-ef34d837740d"
    - stage: seal
      stageUuid: "968b04b9-545b-8318-8367-798e169819f2"
    - stage: uuid
      stageUuid: "b9e40446-4a99-81ce-8b96-c6158a079020"
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

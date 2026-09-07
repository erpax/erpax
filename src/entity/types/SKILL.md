---
name: types
description: "Use when classifying legal entities — Corporation, LLC, Partnership, Nonprofit, Trust, Government, Individual — to determine applicable compliance frameworks, audit scope, and jurisdiction applicability. The read-only entity-type reference table."
atomPath: "entity/types"
coordinate: "entity/types · 5/round · 83f34da1"
contentUuid: "415bdc11-c41e-5aa4-b8fe-19d1a1e64f77"
diamondUuid: "e3631a48-c089-8b3b-9dde-475711edc535"
uuid: "83f34da1-9931-808d-9f48-756d8717fae5"
horo: 5
typography:
  partition: entity
  bondDegree: 85
standards:
  - "COSO-2013"
  - "COSO-2013 entity-classification"
  - "SOX §302 entity-type-determination"
bindings: []
signatures:
  computationUuid: "95891281-5baa-8549-8ff7-b151e782a908"
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
      stageUuid: "b3674915-6d7c-8389-92bc-113d04244f25"
    - stage: seal
      stageUuid: "968b04b9-545b-8318-8367-798e169819f2"
    - stage: uuid
      stageUuid: "4fef9696-2183-8e2e-865b-ff330ff4dc0a"
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

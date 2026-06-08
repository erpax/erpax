---
name: types
description: "Use when classifying legal entities — Corporation, LLC, Partnership, Nonprofit, Trust, Government, Individual — to determine applicable compliance frameworks, audit scope, and jurisdiction applicability. The read-only entity-type reference table."
atomPath: entity/types
coordinate: entity/types · 8/crest · ebc6eec7
contentUuid: "f6a43a16-0f76-53f7-9efa-7518be6ca2b5"
diamondUuid: "d119adf5-59d7-8276-9793-567e60bab7e8"
uuid: "ebc6eec7-618d-8105-949f-f6a8d421f249"
horo: 8
bonds:
  in:
    - chat
    - collapse
    - config
    - decompression
    - entity
    - examples
    - gate
    - law
    - optimize
    - payload
    - recover
    - schema
    - society
    - sti
    - test
    - torus
    - trinity
    - types
    - vitepress
  out:
    - chat
    - collapse
    - config
    - decompression
    - examples
    - gate
    - law
    - optimize
    - payload
    - recover
    - schema
    - society
    - sti
    - test
    - torus
    - trinity
    - types
    - vitepress
typography:
  partition: entity
  bondDegree: 66
  neighbors:
    - agent
standards:
  - "COSO-2013"
  - "COSO-2013 entity-classification"
  - "SOX §302 entity-type-determination"
bindings: []
neighbors:
  wikilink:
    - law
  matrix:
    - chat
    - collapse
    - config
    - decompression
    - examples
    - gate
    - law
    - optimize
    - payload
    - recover
    - schema
    - society
    - sti
    - test
    - torus
    - trinity
    - types
    - vitepress
  backlinks:
    - chat
    - collapse
    - config
    - decompression
    - examples
    - gate
    - law
    - optimize
    - payload
    - recover
    - schema
    - society
    - sti
    - test
    - torus
    - trinity
    - types
    - vitepress
signatures:
  computationUuid: "57d5c8f8-fde2-8882-b0e6-3224fd5f683c"
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
      stageUuid: "189fbcaa-ab50-8f47-8152-84d304fdfe73"
    - stage: seal
      stageUuid: "e02a2ee4-f4bd-8b4e-b4d4-4db4da2e89de"
    - stage: uuid
      stageUuid: "b1146a80-b484-8f0e-a32f-a5c2c02e7156"
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

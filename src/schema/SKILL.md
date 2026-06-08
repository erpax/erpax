---
name: schema
description: "Use when defining, auditing, or evolving the logical data model — entity relationship diagrams, normalization, column definitions, table structure, field types, cardinality declarations. The canonical blueprint of the data structure."
atomPath: schema
coordinate: schema · 7/descent · 189bf320
contentUuid: "9debebfa-e753-5143-a1d3-0628cfac320a"
diamondUuid: "25a41ea2-3c63-816e-b4ce-f082afb251dd"
uuid: "189bf320-f61c-8968-9144-8da16dda11c0"
horo: 7
bonds:
  in:
    - cardinality
    - collections
    - constraint
    - database
    - field
    - fields
    - law
    - partition
    - payload
    - schema
    - sti
    - test
    - testing
    - type
    - types
  out:
    - cardinality
    - collections
    - constraint
    - database
    - field
    - fields
    - law
    - partition
    - payload
    - schema
    - sti
    - test
    - testing
    - type
    - types
typography:
  partition: schema
  bondDegree: 55
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - cardinality
    - collections
    - database
    - fields
    - types
  matrix:
    - cardinality
    - collections
    - constraint
    - database
    - field
    - fields
    - law
    - partition
    - payload
    - schema
    - sti
    - test
    - testing
    - type
    - types
  backlinks:
    - cardinality
    - collections
    - constraint
    - database
    - field
    - fields
    - law
    - partition
    - payload
    - schema
    - sti
    - test
    - testing
    - type
    - types
signatures:
  computationUuid: "eaccff08-0e6f-8896-a05b-9bd5b49fd943"
  stages:
    - stage: path
      stageUuid: "1929c80a-a247-827b-9af7-c3d1b27e653d"
    - stage: trinity
      stageUuid: "35158872-d2b7-8dc5-939e-08e50d8ae3fb"
    - stage: boundary
      stageUuid: "279732dd-337e-89d8-84fa-7aa2fad73847"
    - stage: links
      stageUuid: "08a69e73-9e1c-81f8-bdd9-c32dc416de3b"
    - stage: horo
      stageUuid: "3260b8c5-1cdf-84ee-9a74-e6deebc3c867"
    - stage: seal
      stageUuid: "987e76ae-7a43-8973-af9a-c13baab7955b"
    - stage: uuid
      stageUuid: "526574b1-e6aa-8694-8a5a-45b97c31b641"
version: 2
---
# schema

Use when defining, auditing, or evolving the logical data model — entity relationship diagrams, normalization, column definitions, table structure, field types, cardinality declarations. The canonical blueprint of the data structure.

Composes: [[database]] · [[fields]] · [[collections]] · [[types]] · [[cardinality]].

## Standards
- ISO/IEC 11179 (metadata)
- E-R model
- SQL DDL

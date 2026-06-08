---
name: constraint
description: "Use when defining data constraints at the schema level — NOT NULL / UNIQUE / FOREIGN KEY / CHECK / DEFAULT constraints, their lifecycle (creation/modification/disable), enforcement semantics, and violation detection in the database layer."
atomPath: constraint
coordinate: constraint · 8/crest · 31f8fe59
contentUuid: "c95e7cfc-360a-57f7-b6d1-94784dee837e"
diamondUuid: "c1e0cbf0-c00f-875a-b6db-5c8f9c84080f"
uuid: "31f8fe59-5f09-8ce9-89c5-c4153ff71e71"
horo: 8
bonds:
  in:
    - cardinality
    - consistency
    - database
    - fields
    - identity
    - market
    - node
    - nullability
    - property
    - schema
    - science
  out:
    - cardinality
    - consistency
    - database
    - fields
    - identity
    - market
    - node
    - nullability
    - property
    - schema
    - science
typography:
  partition: constraint
  bondDegree: 33
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - database
    - fields
    - identity
    - nullability
    - schema
  matrix:
    - cardinality
    - consistency
    - database
    - fields
    - identity
    - market
    - node
    - nullability
    - property
    - schema
    - science
  backlinks:
    - cardinality
    - consistency
    - database
    - fields
    - identity
    - market
    - node
    - nullability
    - property
    - schema
    - science
signatures:
  computationUuid: "0177faf0-f107-8dc6-ad51-ecc1450502b1"
  stages:
    - stage: path
      stageUuid: "9fb7f061-ddcc-8ee8-b09d-e2fc1e7b5c1f"
    - stage: trinity
      stageUuid: "bb65e571-c785-8522-952e-4754e4abc8e9"
    - stage: boundary
      stageUuid: "286c5b8e-ebd5-89d4-820d-74c40e971979"
    - stage: links
      stageUuid: "2a4b4184-a557-8db4-9772-1b3b25cd3eb5"
    - stage: horo
      stageUuid: "176576f4-22ed-8eff-9733-2dc6074c6dde"
    - stage: seal
      stageUuid: "2116531b-44c9-8ab7-835d-cfa4b160b79b"
    - stage: uuid
      stageUuid: "2993decd-45b7-8b64-8356-414d8eb95729"
version: 2
---
# constraint

Use when defining data constraints at the schema level — NOT NULL / UNIQUE / FOREIGN KEY / CHECK / DEFAULT constraints, their lifecycle (creation/modification/disable), enforcement semantics, and violation detection in the database layer.

Composes: [[database]] · [[fields]] · [[identity]] · [[nullability]] · [[schema]].

## Standards
- ISO/IEC 11179-1:2015 (metadata registry)
- SQL:2016

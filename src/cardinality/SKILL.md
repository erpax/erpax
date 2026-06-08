---
name: cardinality
description: "Use when analyzing relationship structure — one-to-one / one-to-many / many-to-many / many-to-one relationships, cardinality constraints, optional vs mandatory participation, relationship counts (query cardinality estimates), foreign-key cardinality."
atomPath: cardinality
coordinate: cardinality · 8/crest · 3eb9a388
contentUuid: "ed058aff-aa8e-59a5-abfd-78d9ac8e80e4"
diamondUuid: "a1a8f3ad-d745-85c4-99df-7fa7073a9a4c"
uuid: "3eb9a388-59f4-84ae-9af5-5b45edaaa11f"
horo: 8
bonds:
  in:
    - constraint
    - database
    - fields
    - law
    - nullability
    - queries
    - schema
  out:
    - constraint
    - database
    - fields
    - law
    - nullability
    - queries
    - schema
typography:
  partition: cardinality
  bondDegree: 22
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - constraint
    - database
    - fields
    - law
    - nullability
    - queries
    - schema
  matrix:
    - constraint
    - database
    - fields
    - law
    - nullability
    - queries
    - schema
  backlinks:
    - constraint
    - database
    - fields
    - law
    - nullability
    - queries
    - schema
signatures:
  computationUuid: "68030433-f4d5-8108-81b0-3c15fb18c20c"
  stages:
    - stage: path
      stageUuid: "5ce45864-7881-8c97-8e6d-3eef96728838"
    - stage: trinity
      stageUuid: "633bcac7-0f12-8605-8498-2d097ab2b7ed"
    - stage: boundary
      stageUuid: "7b1b1858-23ae-87f9-afaf-bb2b57ba3131"
    - stage: links
      stageUuid: "75ccb00e-efae-8af7-91ba-0b0acae4cecb"
    - stage: horo
      stageUuid: "02faacff-8054-81ca-9786-12cba8a80869"
    - stage: seal
      stageUuid: "33c1e7e4-3284-82d1-82dc-468324406a40"
    - stage: uuid
      stageUuid: "db4e6bd6-4f83-8540-b6e2-1f5972fa3862"
version: 2
---
# cardinality

Use when analyzing relationship structure — one-to-one / one-to-many / many-to-many / many-to-one relationships, cardinality constraints, optional vs mandatory participation, relationship counts (query cardinality estimates), foreign-key cardinality.

Composes: [[schema]] · [[fields]] · [[queries]] · [[database]] · [[constraint]] · [[nullability]].

**Law — [[law]]: cardinality is the count-structure of a relationship — one-to-one / one-to-many / many-to-many and its optional-vs-mandatory participation; it constrains how many rows a [[fields|field]] may relate and is the [[constraint]] the [[schema]] enforces.**

## Standards
- E-R model cardinality (Chen)
- SQL cardinality constraints

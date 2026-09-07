---
name: cardinality
description: "Use when analyzing relationship structure — one-to-one / one-to-many / many-to-many / many-to-one relationships, cardinality constraints, optional vs mandatory participation, relationship counts (query cardinality estimates), foreign-key cardinality."
atomPath: "vocabulary/cardinality"
coordinate: "vocabulary/cardinality · 5/round · 85922bb0"
contentUuid: "2265e9d4-5f51-556f-b1b6-d0a4a87ed5ab"
diamondUuid: "1afd8444-8ab0-864f-bbc7-a1de7429e0c5"
uuid: "85922bb0-1ae6-8bad-958f-ba7123214589"
horo: 5
typography:
  partition: vocabulary
  bondDegree: 22
standards: []
bindings: []
signatures:
  computationUuid: "36efc0ac-6d2b-8bda-b506-118309c763d1"
  stages:
    - stage: path
      stageUuid: "d775dd77-4c5d-8905-9471-fa07e0ab4691"
    - stage: trinity
      stageUuid: "7448a82c-4285-8cdb-aa03-ac18ed7a1a4f"
    - stage: boundary
      stageUuid: "96ec41f3-dd61-8b44-8e2d-722713c84eca"
    - stage: links
      stageUuid: "1ff23c39-3e6c-8164-9822-ca6c16f38223"
    - stage: horo
      stageUuid: "e4898070-54d0-8bc3-aba7-050b87e661e9"
    - stage: seal
      stageUuid: "1e13c959-cea5-83c0-9bd5-825e6db4ba73"
    - stage: uuid
      stageUuid: "f65ec8be-ae49-8aaf-ac13-aa150cc47d82"
version: 2
---
# cardinality

Use when analyzing relationship structure — one-to-one / one-to-many / many-to-many / many-to-one relationships, cardinality constraints, optional vs mandatory participation, relationship counts (query cardinality estimates), foreign-key cardinality.

Composes: [[schema]] · [[field]] · [[queries]] · [[database]] · [[constraint]] · [[nullability]].

**Law — [[law]]: cardinality is the count-structure of a relationship — one-to-one / one-to-many / many-to-many and its optional-vs-mandatory participation; it constrains how many rows a [[field|field]] may relate and is the [[constraint]] the [[schema]] enforces.**

## Standards
- E-R model cardinality (Chen)
- SQL cardinality constraints

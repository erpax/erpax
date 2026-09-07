---
name: cardinality
description: "Use when analyzing relationship structure — one-to-one / one-to-many / many-to-many / many-to-one relationships, cardinality constraints, optional vs mandatory participation, relationship counts (query cardinality estimates), foreign-key cardinality."
atomPath: "vocabulary/cardinality"
coordinate: "vocabulary/cardinality · 1/base · 6b4691d8"
contentUuid: "de4c64bd-55cc-58f2-b841-5c30a690f6c1"
diamondUuid: "22ab61bc-4854-8245-be49-65ce965e0d6d"
uuid: "6b4691d8-76f7-8b52-9f5b-5259f297deba"
horo: 1
typography:
  partition: vocabulary
  bondDegree: 22
standards: []
bindings: []
signatures:
  computationUuid: "062fefd6-fee9-8df9-b5ae-8f431a7353e0"
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
      stageUuid: "e8e396dd-ca86-82e5-8a91-6a4ece06727c"
    - stage: seal
      stageUuid: "1e13c959-cea5-83c0-9bd5-825e6db4ba73"
    - stage: uuid
      stageUuid: "e3ccb317-3112-88af-b2e3-eaf1b2ab0fb5"
version: 2
---
# cardinality

Use when analyzing relationship structure — one-to-one / one-to-many / many-to-many / many-to-one relationships, cardinality constraints, optional vs mandatory participation, relationship counts (query cardinality estimates), foreign-key cardinality.

Composes: [[schema]] · [[field]] · [[queries]] · [[database]] · [[constraint]] · [[nullability]].

**Law — [[law]]: cardinality is the count-structure of a relationship — one-to-one / one-to-many / many-to-many and its optional-vs-mandatory participation; it constrains how many rows a [[field|field]] may relate and is the [[constraint]] the [[schema]] enforces.**

## Standards
- E-R model cardinality (Chen)
- SQL cardinality constraints

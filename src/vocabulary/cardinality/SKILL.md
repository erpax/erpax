---
name: cardinality
description: "Use when analyzing relationship structure — one-to-one / one-to-many / many-to-many / many-to-one relationships, cardinality constraints, optional vs mandatory participation, relationship counts (query cardinality estimates), foreign-key cardinality."
atomPath: "vocabulary/cardinality"
coordinate: "vocabulary/cardinality · 1/base · 9a6feb5a"
contentUuid: "5d527d3c-e90d-5ae1-b180-3e0a067840ed"
diamondUuid: "f897fe5d-8a91-80a5-8fcd-788402e520ba"
uuid: "9a6feb5a-a9de-8f51-8c21-442bea39b402"
horo: 1
typography:
  partition: vocabulary
  bondDegree: 22
standards: []
bindings: []
signatures:
  computationUuid: "7a78b3f9-109e-8e10-ae14-b925b284ed22"
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
      stageUuid: "10746ea9-05af-84f3-890a-8b71d1da1966"
    - stage: seal
      stageUuid: "1e13c959-cea5-83c0-9bd5-825e6db4ba73"
    - stage: uuid
      stageUuid: "3813cd3c-7724-87f2-98a5-09007d99df76"
version: 2
---
# cardinality

Use when analyzing relationship structure — one-to-one / one-to-many / many-to-many / many-to-one relationships, cardinality constraints, optional vs mandatory participation, relationship counts (query cardinality estimates), foreign-key cardinality.

Composes: [[schema]] · [[field]] · [[queries]] · [[database]] · [[constraint]] · [[nullability]].

**Law — [[law]]: cardinality is the count-structure of a relationship — one-to-one / one-to-many / many-to-many and its optional-vs-mandatory participation; it constrains how many rows a [[field|field]] may relate and is the [[constraint]] the [[schema]] enforces.**

## Standards
- E-R model cardinality (Chen)
- SQL cardinality constraints

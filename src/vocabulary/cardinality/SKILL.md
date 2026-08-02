---
name: cardinality
description: "Use when analyzing relationship structure — one-to-one / one-to-many / many-to-many / many-to-one relationships, cardinality constraints, optional vs mandatory participation, relationship counts (query cardinality estimates), foreign-key cardinality."
atomPath: "vocabulary/cardinality"
coordinate: "vocabulary/cardinality · 4/weave · 2759da02"
contentUuid: "9cbce3b8-e812-5e38-9d7e-0a8b9df909e6"
diamondUuid: "3911df32-7df0-8b4e-9e1c-ad8e0d6974bd"
uuid: "2759da02-8a28-8330-829a-1c550cda0b09"
horo: 4
typography:
  partition: vocabulary
  bondDegree: 22
standards: []
bindings: []
signatures:
  computationUuid: "0c541505-e428-8d96-9a18-23df8901ffe6"
  stages:
    - stage: path
      stageUuid: "d775dd77-4c5d-8905-9471-fa07e0ab4691"
    - stage: trinity
      stageUuid: "7448a82c-4285-8cdb-aa03-ac18ed7a1a4f"
    - stage: boundary
      stageUuid: "e8c7d497-834f-84d5-a6cf-a340a47f5492"
    - stage: links
      stageUuid: "0e3def50-407e-82ee-8d37-8e8fd33d4351"
    - stage: horo
      stageUuid: "0a55a870-ca6d-8b31-9851-2f19e02e1ec3"
    - stage: seal
      stageUuid: "aebcd336-2499-8570-af22-3308fe903dd1"
    - stage: uuid
      stageUuid: "cce9a97b-eed5-8703-9c15-6527c79a504d"
version: 2
---
# cardinality

Use when analyzing relationship structure — one-to-one / one-to-many / many-to-many / many-to-one relationships, cardinality constraints, optional vs mandatory participation, relationship counts (query cardinality estimates), foreign-key cardinality.

Composes: [[schema]] · [[field]] · [[queries]] · [[database]] · [[constraint]] · [[nullability]].

**Law — [[law]]: cardinality is the count-structure of a relationship — one-to-one / one-to-many / many-to-many and its optional-vs-mandatory participation; it constrains how many rows a [[field|field]] may relate and is the [[constraint]] the [[schema]] enforces.**

## Standards
- E-R model cardinality (Chen)
- SQL cardinality constraints

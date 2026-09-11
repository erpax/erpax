---
name: cardinality
description: "Use when analyzing relationship structure — one-to-one / one-to-many / many-to-many / many-to-one relationships, cardinality constraints, optional vs mandatory participation, relationship counts (query cardinality estimates), foreign-key cardinality."
atomPath: "vocabulary/cardinality"
coordinate: "vocabulary/cardinality · 4/weave · fddce6e6"
contentUuid: "6d420374-7040-5461-a384-44608733a889"
diamondUuid: "1dfe610e-c2f5-8a30-9535-d7bf9242fdc0"
uuid: "fddce6e6-50fe-898b-88ca-288f0b5687c4"
horo: 4
typography:
  partition: vocabulary
  bondDegree: 22
standards: []
bindings: []
signatures:
  computationUuid: "26015a3f-91b4-8058-8e17-18981d8fd6ec"
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
      stageUuid: "0ec1fc6c-f882-8f72-91e9-9ac38c744476"
    - stage: seal
      stageUuid: "1e13c959-cea5-83c0-9bd5-825e6db4ba73"
    - stage: uuid
      stageUuid: "af5424b0-a662-848e-92bf-2de773c44162"
version: 2
---
# cardinality

Use when analyzing relationship structure — one-to-one / one-to-many / many-to-many / many-to-one relationships, cardinality constraints, optional vs mandatory participation, relationship counts (query cardinality estimates), foreign-key cardinality.

Composes: [[schema]] · [[field]] · [[queries]] · [[database]] · [[constraint]] · [[nullability]].

**Law — [[law]]: cardinality is the count-structure of a relationship — one-to-one / one-to-many / many-to-many and its optional-vs-mandatory participation; it constrains how many rows a [[field|field]] may relate and is the [[constraint]] the [[schema]] enforces.**

## Standards
- E-R model cardinality (Chen)
- SQL cardinality constraints

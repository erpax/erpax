---
name: cardinality
description: "Use when analyzing relationship structure — one-to-one / one-to-many / many-to-many / many-to-one relationships, cardinality constraints, optional vs mandatory participation, relationship counts (query cardinality estimates), foreign-key cardinality."
atomPath: "vocabulary/cardinality"
coordinate: "vocabulary/cardinality · 2/share · 9648a6f4"
contentUuid: "3a997f60-1d20-5f68-8e3a-a789bc092b17"
diamondUuid: "ce7cf669-3600-8b3d-8232-20df9f4f1e15"
uuid: "9648a6f4-4845-8db7-9440-0c9db2957202"
horo: 2
typography:
  partition: vocabulary
  bondDegree: 22
standards: []
bindings: []
signatures:
  computationUuid: "4f5b485b-e68a-821e-97cb-fa808b2b1215"
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
      stageUuid: "de07f9eb-e8c2-874c-a0df-de7a47dc80a3"
    - stage: seal
      stageUuid: "1e13c959-cea5-83c0-9bd5-825e6db4ba73"
    - stage: uuid
      stageUuid: "cd4f538b-3bf8-8888-a953-6ed3dfbdcf07"
version: 2
---
# cardinality

Use when analyzing relationship structure — one-to-one / one-to-many / many-to-many / many-to-one relationships, cardinality constraints, optional vs mandatory participation, relationship counts (query cardinality estimates), foreign-key cardinality.

Composes: [[schema]] · [[field]] · [[queries]] · [[database]] · [[constraint]] · [[nullability]].

**Law — [[law]]: cardinality is the count-structure of a relationship — one-to-one / one-to-many / many-to-many and its optional-vs-mandatory participation; it constrains how many rows a [[field|field]] may relate and is the [[constraint]] the [[schema]] enforces.**

## Standards
- E-R model cardinality (Chen)
- SQL cardinality constraints

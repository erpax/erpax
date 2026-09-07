---
name: nullability
description: "Use when deciding NULL semantics — nullable vs NOT NULL fields, NULL handling in queries (IS NULL, COALESCE, NVL), NULL in aggregates (SUM ignores NULL), NULL propagation in calculations, three-valued logic."
atomPath: "vocabulary/nullability"
coordinate: "vocabulary/nullability · 1/base · 42687afb"
contentUuid: "3a4d0a52-4820-5099-886d-4e44afe565bc"
diamondUuid: "ea8d4282-4ddd-8f91-a686-d1137e798c9e"
uuid: "42687afb-21d0-8046-9fe7-84abc609f434"
horo: 1
typography:
  partition: vocabulary
  bondDegree: 21
standards: []
bindings: []
signatures:
  computationUuid: "f11ec6f3-15b2-8eb0-83e5-789cc907eeaf"
  stages:
    - stage: path
      stageUuid: "c35dd35f-167c-8ede-a75d-8865356e7a80"
    - stage: trinity
      stageUuid: "daecab58-0284-844a-bf55-91d505d2a53e"
    - stage: boundary
      stageUuid: "b631c019-dba8-8d80-b1e9-596c9ac81377"
    - stage: links
      stageUuid: "1052ea88-6148-8386-9815-65b7a7f82455"
    - stage: horo
      stageUuid: "ff40b07c-1b7f-8961-b6ea-2a354c612b94"
    - stage: seal
      stageUuid: "9115e620-90d2-87be-bf14-2b2ea6fb8bbd"
    - stage: uuid
      stageUuid: "6f218cf4-ce13-8539-b5c9-3c10b7316dd0"
version: 2
---
# nullability

Use when deciding NULL semantics — nullable vs NOT NULL fields, NULL handling in queries (IS NULL, COALESCE, NVL), NULL in aggregates (SUM ignores NULL), NULL propagation in calculations, three-valued logic.

Composes: [[field]] · [[queries]] · [[calculate]] · [[database]].

**Law — [[law]]: NULL is the absent value under three-valued logic — it propagates through calculations, is ignored by aggregates, and is testable only with IS NULL / COALESCE; a [[field|field]] is nullable or NOT NULL, never silently coerced.**

## Standards
- SQL NULL semantics (ISO/IEC 9075)
- Three-valued logic

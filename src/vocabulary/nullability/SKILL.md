---
name: nullability
description: "Use when deciding NULL semantics — nullable vs NOT NULL fields, NULL handling in queries (IS NULL, COALESCE, NVL), NULL in aggregates (SUM ignores NULL), NULL propagation in calculations, three-valued logic."
atomPath: "vocabulary/nullability"
coordinate: "vocabulary/nullability · 5/round · d93f561e"
contentUuid: "44cf194c-c73e-5160-9eaa-9d68003576d9"
diamondUuid: "77c5cfe0-7566-81a8-b496-079f95cf1a95"
uuid: "d93f561e-ea72-8e5e-ad7c-f4b95e1d1f53"
horo: 5
typography:
  partition: vocabulary
  bondDegree: 21
standards: []
bindings: []
signatures:
  computationUuid: "e6fbb183-fcc0-8f7f-b816-df0968893bb5"
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
      stageUuid: "90601e29-c3af-8b52-9080-1b981411be05"
    - stage: seal
      stageUuid: "9115e620-90d2-87be-bf14-2b2ea6fb8bbd"
    - stage: uuid
      stageUuid: "34a58b67-9cc4-8a23-b8e6-37d1f6fab894"
version: 2
---
# nullability

Use when deciding NULL semantics — nullable vs NOT NULL fields, NULL handling in queries (IS NULL, COALESCE, NVL), NULL in aggregates (SUM ignores NULL), NULL propagation in calculations, three-valued logic.

Composes: [[field]] · [[queries]] · [[calculate]] · [[database]].

**Law — [[law]]: NULL is the absent value under three-valued logic — it propagates through calculations, is ignored by aggregates, and is testable only with IS NULL / COALESCE; a [[field|field]] is nullable or NOT NULL, never silently coerced.**

## Standards
- SQL NULL semantics (ISO/IEC 9075)
- Three-valued logic

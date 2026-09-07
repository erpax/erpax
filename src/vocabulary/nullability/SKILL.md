---
name: nullability
description: "Use when deciding NULL semantics — nullable vs NOT NULL fields, NULL handling in queries (IS NULL, COALESCE, NVL), NULL in aggregates (SUM ignores NULL), NULL propagation in calculations, three-valued logic."
atomPath: "vocabulary/nullability"
coordinate: "vocabulary/nullability · 1/base · c6c71bf1"
contentUuid: "4b8c0f7b-2010-5967-9543-2afdf9c2e90f"
diamondUuid: "33c9830b-e7d9-8b9c-9b3e-9e6241999c25"
uuid: "c6c71bf1-7332-8717-bc83-460d5efda3e6"
horo: 1
typography:
  partition: vocabulary
  bondDegree: 21
standards: []
bindings: []
signatures:
  computationUuid: "be2a9d39-faee-881d-94a2-fee82505467e"
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
      stageUuid: "8b4cebd5-931b-894f-adbc-d9544d47a647"
    - stage: seal
      stageUuid: "9115e620-90d2-87be-bf14-2b2ea6fb8bbd"
    - stage: uuid
      stageUuid: "64134b0b-5fe9-802a-a238-5961a7d0f2dc"
version: 2
---
# nullability

Use when deciding NULL semantics — nullable vs NOT NULL fields, NULL handling in queries (IS NULL, COALESCE, NVL), NULL in aggregates (SUM ignores NULL), NULL propagation in calculations, three-valued logic.

Composes: [[field]] · [[queries]] · [[calculate]] · [[database]].

**Law — [[law]]: NULL is the absent value under three-valued logic — it propagates through calculations, is ignored by aggregates, and is testable only with IS NULL / COALESCE; a [[field|field]] is nullable or NOT NULL, never silently coerced.**

## Standards
- SQL NULL semantics (ISO/IEC 9075)
- Three-valued logic

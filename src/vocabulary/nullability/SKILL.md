---
name: nullability
description: "Use when deciding NULL semantics — nullable vs NOT NULL fields, NULL handling in queries (IS NULL, COALESCE, NVL), NULL in aggregates (SUM ignores NULL), NULL propagation in calculations, three-valued logic."
atomPath: "vocabulary/nullability"
coordinate: "vocabulary/nullability · 5/round · 0b4cd464"
contentUuid: "d8d9a871-869e-5fa6-b3f4-45a9d8046f4f"
diamondUuid: "087d8775-5a07-826d-bdb0-07db6562a5d1"
uuid: "0b4cd464-9ada-8260-bf07-fdc2972406c0"
horo: 5
typography:
  partition: vocabulary
  bondDegree: 21
standards: []
bindings: []
signatures:
  computationUuid: "7f1f1131-1138-89e8-9bcd-e01f4b3fec87"
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
      stageUuid: "9e3d2d80-13d2-88ff-979b-6e8e5993c568"
    - stage: seal
      stageUuid: "9115e620-90d2-87be-bf14-2b2ea6fb8bbd"
    - stage: uuid
      stageUuid: "d62afef1-0f4d-8739-95ca-1a73c0111398"
version: 2
---
# nullability

Use when deciding NULL semantics — nullable vs NOT NULL fields, NULL handling in queries (IS NULL, COALESCE, NVL), NULL in aggregates (SUM ignores NULL), NULL propagation in calculations, three-valued logic.

Composes: [[field]] · [[queries]] · [[calculate]] · [[database]].

**Law — [[law]]: NULL is the absent value under three-valued logic — it propagates through calculations, is ignored by aggregates, and is testable only with IS NULL / COALESCE; a [[field|field]] is nullable or NOT NULL, never silently coerced.**

## Standards
- SQL NULL semantics (ISO/IEC 9075)
- Three-valued logic

---
name: nullability
description: "Use when deciding NULL semantics — nullable vs NOT NULL fields, NULL handling in queries (IS NULL, COALESCE, NVL), NULL in aggregates (SUM ignores NULL), NULL propagation in calculations, three-valued logic."
atomPath: "vocabulary/nullability"
coordinate: "vocabulary/nullability · 2/share · ae012915"
contentUuid: "8c958869-26d0-5d44-9635-750ab8f44073"
diamondUuid: "c296b383-35f6-88ec-8033-d393016bb74f"
uuid: "ae012915-71f3-839d-9a5e-77913e59bfc6"
horo: 2
typography:
  partition: vocabulary
  bondDegree: 21
standards: []
bindings: []
signatures:
  computationUuid: "248cea76-7bd8-8be5-8b45-59c850e0ce34"
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
      stageUuid: "8e75a1c9-7d45-877d-8d71-371ef3b00c23"
    - stage: seal
      stageUuid: "9115e620-90d2-87be-bf14-2b2ea6fb8bbd"
    - stage: uuid
      stageUuid: "f33286bf-5103-8913-a529-dab64e421791"
version: 2
---
# nullability

Use when deciding NULL semantics — nullable vs NOT NULL fields, NULL handling in queries (IS NULL, COALESCE, NVL), NULL in aggregates (SUM ignores NULL), NULL propagation in calculations, three-valued logic.

Composes: [[field]] · [[queries]] · [[calculate]] · [[database]].

**Law — [[law]]: NULL is the absent value under three-valued logic — it propagates through calculations, is ignored by aggregates, and is testable only with IS NULL / COALESCE; a [[field|field]] is nullable or NOT NULL, never silently coerced.**

## Standards
- SQL NULL semantics (ISO/IEC 9075)
- Three-valued logic

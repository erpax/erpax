---
name: nullability
description: "Use when deciding NULL semantics — nullable vs NOT NULL fields, NULL handling in queries (IS NULL, COALESCE, NVL), NULL in aggregates (SUM ignores NULL), NULL propagation in calculations, three-valued logic."
atomPath: "vocabulary/nullability"
coordinate: "vocabulary/nullability · 4/weave · 8ccdc86f"
contentUuid: "7a9d678a-4a27-517c-8c6e-dac48901c760"
diamondUuid: "aa729569-f496-8bb4-a172-8664a016fa00"
uuid: "8ccdc86f-d35f-89e1-8949-950ab1ea39bb"
horo: 4
typography:
  partition: vocabulary
  bondDegree: 21
standards: []
bindings: []
signatures:
  computationUuid: "7c28ee18-d9b7-8272-a271-b9aeff370b32"
  stages:
    - stage: path
      stageUuid: "c35dd35f-167c-8ede-a75d-8865356e7a80"
    - stage: trinity
      stageUuid: "daecab58-0284-844a-bf55-91d505d2a53e"
    - stage: boundary
      stageUuid: "826d4c59-4527-89c5-ab67-e25e01229c2d"
    - stage: links
      stageUuid: "4f5f3a09-d86c-8037-b3aa-15b94b79ff9c"
    - stage: horo
      stageUuid: "2b3d8e07-6230-8ce3-ae4f-38706c2bb6d7"
    - stage: seal
      stageUuid: "0d851fce-096b-8dc3-95be-97ef41396c99"
    - stage: uuid
      stageUuid: "69d2aefc-08a3-81cb-807b-6a19ebf21c1b"
version: 2
---
# nullability

Use when deciding NULL semantics — nullable vs NOT NULL fields, NULL handling in queries (IS NULL, COALESCE, NVL), NULL in aggregates (SUM ignores NULL), NULL propagation in calculations, three-valued logic.

Composes: [[fields]] · [[queries]] · [[calculate]] · [[database]].

**Law — [[law]]: NULL is the absent value under three-valued logic — it propagates through calculations, is ignored by aggregates, and is testable only with IS NULL / COALESCE; a [[fields|field]] is nullable or NOT NULL, never silently coerced.**

## Standards
- SQL NULL semantics (ISO/IEC 9075)
- Three-valued logic

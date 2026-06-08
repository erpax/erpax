---
name: nullability
description: "Use when deciding NULL semantics — nullable vs NOT NULL fields, NULL handling in queries (IS NULL, COALESCE, NVL), NULL in aggregates (SUM ignores NULL), NULL propagation in calculations, three-valued logic."
atomPath: nullability
coordinate: nullability · 4/weave · f364ddd9
contentUuid: "2d4f4c10-5636-5e8d-b1eb-dacecd43fc7e"
diamondUuid: "9ce46e5f-24d5-8137-a2c2-56c1def036f5"
uuid: "f364ddd9-b8c4-8594-861c-90c2c6c0ed61"
horo: 4
bonds:
  in:
    - calculate
    - cardinality
    - constraint
    - database
    - fields
    - law
    - queries
  out:
    - calculate
    - cardinality
    - constraint
    - database
    - fields
    - law
    - queries
typography:
  partition: nullability
  bondDegree: 21
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - calculate
    - database
    - fields
    - law
    - queries
  matrix:
    - calculate
    - cardinality
    - constraint
    - database
    - fields
    - law
    - queries
  backlinks:
    - calculate
    - cardinality
    - constraint
    - database
    - fields
    - law
    - queries
signatures:
  computationUuid: "81ffc42e-4555-8ab9-8820-7f35a3030d45"
  stages:
    - stage: path
      stageUuid: "6a7bea09-ca28-8031-b806-5d1147b71210"
    - stage: trinity
      stageUuid: "29f760f0-346b-8d58-afdf-066ae347cd52"
    - stage: boundary
      stageUuid: "50196211-2b66-8b96-bc49-9ec517fead41"
    - stage: links
      stageUuid: "c8a7e9ba-aa05-8fee-8a87-c77740afa2e5"
    - stage: horo
      stageUuid: "eac2f001-ef0d-89c1-8d40-a754c60ff486"
    - stage: seal
      stageUuid: "374f8b71-150d-8db2-b2e8-8f4b5f266146"
    - stage: uuid
      stageUuid: "32e51611-1467-8c37-95b5-5ad3616d4d09"
version: 2
---
# nullability

Use when deciding NULL semantics — nullable vs NOT NULL fields, NULL handling in queries (IS NULL, COALESCE, NVL), NULL in aggregates (SUM ignores NULL), NULL propagation in calculations, three-valued logic.

Composes: [[fields]] · [[queries]] · [[calculate]] · [[database]].

**Law — [[law]]: NULL is the absent value under three-valued logic — it propagates through calculations, is ignored by aggregates, and is testable only with IS NULL / COALESCE; a [[fields|field]] is nullable or NOT NULL, never silently coerced.**

## Standards
- SQL NULL semantics (ISO/IEC 9075)
- Three-valued logic

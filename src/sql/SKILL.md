---
name: sql
description: "Use when modelling a SQL query as pure data — a SELECT AST with a deterministic canonical stringifier, so equivalent queries normalize identically and the quantum facet hashes them to one content-uuid."
atomPath: sql
coordinate: "sql · 1/base · 1264cd10"
contentUuid: "cfa19f17-3df7-56b4-ae51-919b6a1723d2"
diamondUuid: "98686c25-cbaa-853d-8587-34a2e48bf69f"
uuid: "1264cd10-07f4-8644-a7a1-ee482c156035"
horo: 1
typography:
  partition: sql
  bondDegree: 23
standards:
  - SQL SELECT (a minimal subset); deterministic canonicalisation
bindings: []
signatures:
  computationUuid: "bb0ee206-7b79-8792-8085-750ef3a92cfd"
  stages:
    - stage: path
      stageUuid: "325b429f-b4ab-8912-823a-340384338177"
    - stage: trinity
      stageUuid: "6984af7f-6534-84c6-812b-0b96071a4d51"
    - stage: boundary
      stageUuid: "6dac1e73-efc3-8987-b2ee-7be466d0e011"
    - stage: links
      stageUuid: "efcf01d9-7447-857d-8140-0d2374d6fa9d"
    - stage: horo
      stageUuid: "683a1879-bdd8-829f-9e83-6897bbd9c40d"
    - stage: seal
      stageUuid: "d8262761-27cd-89a8-b20e-f345f60a2222"
    - stage: uuid
      stageUuid: "3e4d4722-b5da-8569-aa0e-bf2d7ad2eb57"
version: 2
---
# sql — a query as canonical data

A tiny **pure** SQL model: a SELECT AST (table, columns, where) with a **deterministic stringifier** and normalizer — no database, just the [[query]] as data. Columns are sorted on render, so two queries that mean the same thing **normalize to the same canonical string**. The [[quantum]]/sql facet hashes that canonical form to one content-[[uuid]] (so equivalent queries dedup / cache by design). Composes [[query]] · table · column.

Matter-twin: `src/sql/index.ts` (`Select` · `toSql` · `normalize`). Composes [[query]] · table · column · [[quantum]].

**Law — [[law]]: a query is pure data — a SELECT AST whose deterministic stringifier normalizes equivalent queries to one identical canonical form, so the [[quantum]] facet hashes them to a single content-[[uuid]] (equal meaning ⇒ equal id ⇒ [[merge]]).**

@standard SQL SELECT (a minimal subset); deterministic canonicalisation

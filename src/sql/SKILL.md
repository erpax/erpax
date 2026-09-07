---
name: sql
description: "Use when modelling a SQL query as pure data — a SELECT AST with a deterministic canonical stringifier, so equivalent queries normalize identically and the quantum facet hashes them to one content-uuid."
atomPath: sql
coordinate: "sql · 5/round · c0f66357"
contentUuid: "5788815b-5571-54a1-b3ff-4f2d7c21c8d5"
diamondUuid: "e91ab962-3be2-8e1a-9244-fd44ea34f4cb"
uuid: "c0f66357-e77b-8aca-a47a-bfe7e152b9b5"
horo: 5
typography:
  partition: sql
  bondDegree: 29
standards:
  - SQL SELECT (a minimal subset); deterministic canonicalisation
bindings: []
signatures:
  computationUuid: "091fcbb5-56b5-80e4-81bc-0254ce58fbe7"
  stages:
    - stage: path
      stageUuid: "325b429f-b4ab-8912-823a-340384338177"
    - stage: trinity
      stageUuid: "6984af7f-6534-84c6-812b-0b96071a4d51"
    - stage: boundary
      stageUuid: "6dac1e73-efc3-8987-b2ee-7be466d0e011"
    - stage: links
      stageUuid: "4f7d7bf1-e823-809c-8339-be43b04eb071"
    - stage: horo
      stageUuid: "3f330830-b37c-8e02-8e8c-e14315de7b49"
    - stage: seal
      stageUuid: "d8262761-27cd-89a8-b20e-f345f60a2222"
    - stage: uuid
      stageUuid: "2a47fe45-ad58-8715-9ac5-52758f4d2333"
version: 2
---
# sql — a query as canonical data

A tiny **pure** SQL model: a SELECT AST (table, columns, where) with a **deterministic stringifier** and normalizer — no database, just the [[query]] as data. Columns are sorted on render, so two queries that mean the same thing **normalize to the same canonical string**. The [[quantum]]/sql facet hashes that canonical form to one content-[[uuid]] (so equivalent queries dedup / cache by design). Composes [[query]] · [[table]] · [[column]].

Matter-twin: `src/sql/index.ts` (`Select` · `toSql` · `normalize`). Composes [[query]] · [[table]] · [[column]] · [[quantum]].

**Law — [[law]]: a query is pure data — a SELECT AST whose deterministic stringifier normalizes equivalent queries to one identical canonical form, so the [[quantum]] facet hashes them to a single content-[[uuid]] (equal meaning ⇒ equal id ⇒ [[merge]]).**

@standard SQL SELECT (a minimal subset); deterministic canonicalisation

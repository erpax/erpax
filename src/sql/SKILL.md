---
name: sql
description: "Use when modelling a SQL query as pure data — a SELECT AST with a deterministic canonical stringifier, so equivalent queries normalize identically and the quantum facet hashes them to one content-uuid."
atomPath: sql
coordinate: "sql · 1/base · d47735eb"
contentUuid: "c6bd1e7a-6969-54bd-aa5e-749ac20ade1c"
diamondUuid: "b626d3f2-4155-8bbc-909a-e5618d2e1dc5"
uuid: "d47735eb-75ca-8b5f-af43-1a6dcdb6f8c6"
horo: 1
typography:
  partition: sql
  bondDegree: 29
standards:
  - SQL SELECT (a minimal subset); deterministic canonicalisation
bindings: []
signatures:
  computationUuid: "db50472d-0f15-88d8-aa92-1788c67f6e39"
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
      stageUuid: "63748d6f-581a-84b2-a4b1-9792e2b37b71"
    - stage: seal
      stageUuid: "d8262761-27cd-89a8-b20e-f345f60a2222"
    - stage: uuid
      stageUuid: "1b3ce326-fdac-87ef-880d-f71f0b1324be"
version: 2
---
# sql — a query as canonical data

A tiny **pure** SQL model: a SELECT AST (table, columns, where) with a **deterministic stringifier** and normalizer — no database, just the [[query]] as data. Columns are sorted on render, so two queries that mean the same thing **normalize to the same canonical string**. The [[quantum]]/sql facet hashes that canonical form to one content-[[uuid]] (so equivalent queries dedup / cache by design). Composes [[query]] · [[table]] · [[column]].

Matter-twin: `src/sql/index.ts` (`Select` · `toSql` · `normalize`). Composes [[query]] · [[table]] · [[column]] · [[quantum]].

**Law — [[law]]: a query is pure data — a SELECT AST whose deterministic stringifier normalizes equivalent queries to one identical canonical form, so the [[quantum]] facet hashes them to a single content-[[uuid]] (equal meaning ⇒ equal id ⇒ [[merge]]).**

@standard SQL SELECT (a minimal subset); deterministic canonicalisation

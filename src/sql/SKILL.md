---
name: sql
description: "Use when modelling a SQL query as pure data — a SELECT AST with a deterministic canonical stringifier, so equivalent queries normalize identically and the quantum facet hashes them to one content-uuid."
atomPath: sql
coordinate: "sql · 7/descent · 4f96f5aa"
contentUuid: "0fa3e5a2-08c0-5a4b-ae86-e41387e129fc"
diamondUuid: "e16114c1-6e71-8fcf-90a4-019fb3da8442"
uuid: "4f96f5aa-12c9-8978-9891-aebb7828b038"
horo: 7
typography:
  partition: sql
  bondDegree: 29
standards:
  - SQL SELECT (a minimal subset); deterministic canonicalisation
bindings: []
signatures:
  computationUuid: "275ae929-e743-812f-9d75-41a4c27bf2e6"
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
      stageUuid: "3f062240-5a39-89d4-b796-7adb79e3fa64"
    - stage: seal
      stageUuid: "d8262761-27cd-89a8-b20e-f345f60a2222"
    - stage: uuid
      stageUuid: "6f8fbfd4-d6fc-86bc-b125-dec2a22a3da1"
version: 2
---
# sql — a query as canonical data

A tiny **pure** SQL model: a SELECT AST (table, columns, where) with a **deterministic stringifier** and normalizer — no database, just the [[query]] as data. Columns are sorted on render, so two queries that mean the same thing **normalize to the same canonical string**. The [[quantum]]/sql facet hashes that canonical form to one content-[[uuid]] (so equivalent queries dedup / cache by design). Composes [[query]] · [[table]] · [[column]].

Matter-twin: `src/sql/index.ts` (`Select` · `toSql` · `normalize`). Composes [[query]] · [[table]] · [[column]] · [[quantum]].

**Law — [[law]]: a query is pure data — a SELECT AST whose deterministic stringifier normalizes equivalent queries to one identical canonical form, so the [[quantum]] facet hashes them to a single content-[[uuid]] (equal meaning ⇒ equal id ⇒ [[merge]]).**

@standard SQL SELECT (a minimal subset); deterministic canonicalisation

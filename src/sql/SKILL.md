---
name: sql
description: "Use when modelling a SQL query as pure data — a SELECT AST with a deterministic canonical stringifier, so equivalent queries normalize identically and the quantum facet hashes them to one content-uuid."
atomPath: sql
coordinate: sql · 8/crest · 629e18de
contentUuid: "48fcd1ed-9709-5226-b7e5-39b92cfee049"
diamondUuid: "854a5be5-d7d5-8310-a6ec-5ddf49d421d5"
uuid: "629e18de-c7c5-8de6-8f5b-894e56de0d52"
horo: 8
bonds:
  in:
    - column
    - law
    - merge
    - quantum
    - query
    - sql
    - table
    - uuid
  out:
    - column
    - law
    - merge
    - quantum
    - query
    - sql
    - table
    - uuid
typography:
  partition: sql
  bondDegree: 29
  neighbors: []
standards:
  - SQL SELECT (a minimal subset); deterministic canonicalisation
bindings: []
neighbors:
  wikilink:
    - column
    - law
    - merge
    - quantum
    - query
    - table
    - uuid
  matrix:
    - column
    - law
    - merge
    - quantum
    - query
    - sql
    - table
    - uuid
  backlinks:
    - column
    - law
    - merge
    - quantum
    - query
    - sql
    - table
    - uuid
signatures:
  computationUuid: "03077dcf-7bef-8a5e-9f2a-be4097c84aa3"
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
      stageUuid: "acc5bb5f-158c-804b-8422-cecc391a5066"
    - stage: seal
      stageUuid: "16e5bdcb-a882-8dac-91e5-6bda3cd72e77"
    - stage: uuid
      stageUuid: "00c5efc5-96d0-8db3-bf12-8e55d42078d8"
version: 2
---
# sql — a query as canonical data

A tiny **pure** SQL model: a SELECT AST (table, columns, where) with a **deterministic stringifier** and normalizer — no database, just the [[query]] as data. Columns are sorted on render, so two queries that mean the same thing **normalize to the same canonical string**. The [[quantum]]/sql facet hashes that canonical form to one content-[[uuid]] (so equivalent queries dedup / cache by design). Composes [[query]] · [[table]] · [[column]].

Matter-twin: `src/sql/index.ts` (`Select` · `toSql` · `normalize`). Composes [[query]] · [[table]] · [[column]] · [[quantum]].

**Law — [[law]]: a query is pure data — a SELECT AST whose deterministic stringifier normalizes equivalent queries to one identical canonical form, so the [[quantum]] facet hashes them to a single content-[[uuid]] (equal meaning ⇒ equal id ⇒ [[merge]]).**

@standard SQL SELECT (a minimal subset); deterministic canonicalisation

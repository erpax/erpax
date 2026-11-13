---
name: sql
description: "Use when modelling a SQL query as pure data — a SELECT AST with a deterministic canonical stringifier, so equivalent queries normalize identically and the quantum facet hashes them to one content-uuid."
atomPath: sql
coordinate: "sql · 5/round · 7567ff6f"
contentUuid: "6fec7023-deeb-566e-9ee2-7dc142ae0550"
diamondUuid: "8bd5d5ce-a1d1-8d81-a26e-f344930538b4"
uuid: "7567ff6f-0b79-8e63-b7b4-5bce35bb90ba"
horo: 5
typography:
  partition: sql
  bondDegree: 26
standards:
  - SQL SELECT (a minimal subset); deterministic canonicalisation
bindings: []
signatures:
  computationUuid: "7165818f-cf38-8a57-b306-ea5d08aece16"
  stages:
    - stage: path
      stageUuid: "325b429f-b4ab-8912-823a-340384338177"
    - stage: trinity
      stageUuid: "6984af7f-6534-84c6-812b-0b96071a4d51"
    - stage: boundary
      stageUuid: "6dac1e73-efc3-8987-b2ee-7be466d0e011"
    - stage: links
      stageUuid: "03ff1b44-0d79-8954-bb1d-967026659ee8"
    - stage: horo
      stageUuid: "4aedc9f5-2f37-861f-93ec-052a3eeb56ad"
    - stage: seal
      stageUuid: "d8262761-27cd-89a8-b20e-f345f60a2222"
    - stage: uuid
      stageUuid: "072dd02f-492d-8a28-9782-e118d790ba39"
version: 2
---
# sql — a query as canonical data

A tiny **pure** SQL model: a SELECT AST (table, columns, where) with a **deterministic stringifier** and normalizer — no database, just the [[query]] as data. Columns are sorted on render, so two queries that mean the same thing **normalize to the same canonical string**. The [[quantum]]/sql facet hashes that canonical form to one content-[[uuid]] (so equivalent queries dedup / cache by design). Composes [[query]] · table · [[column]].

Matter-twin: `src/sql/index.ts` (`Select` · `toSql` · `normalize`). Composes [[query]] · table · [[column]] · [[quantum]].

**Law — [[law]]: a query is pure data — a SELECT AST whose deterministic stringifier normalizes equivalent queries to one identical canonical form, so the [[quantum]] facet hashes them to a single content-[[uuid]] (equal meaning ⇒ equal id ⇒ [[merge]]).**

@standard SQL SELECT (a minimal subset); deterministic canonicalisation

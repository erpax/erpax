---
name: rules
description: "Use when configuring GL account metadata for double-entry validation — account type (asset/liability/equity/revenue/expense), normal polarity (debit/credit), balance-sheet vs P&L category, reconciliation frequency, cash-flow relevance, period-end close flag. The gl-posting-rules validation-metadata collection."
atomPath: gl/posting/rules
coordinate: gl/posting/rules · 2/share · f001701f
contentUuid: "d4575ea6-7e10-561c-a89d-5f9ef1740c97"
diamondUuid: "8fbc4d3a-6278-8aec-a494-645ad7e815ec"
uuid: "f001701f-610d-8b8d-b7bf-bf633a4a9a1d"
horo: 2
bonds:
  in:
    - accounting
    - balance
    - law
    - posting
    - rule
  out:
    - accounting
    - balance
    - law
    - rule
typography:
  partition: gl
  bondDegree: 13
  neighbors: []
standards:
  - "IFRS IAS-1 double-entry"
  - "ISO-8601-1:2019 effective-date"
  - "SOX §404 internal-controls"
bindings: []
neighbors:
  wikilink:
    - accounting
    - balance
    - law
  matrix:
    - accounting
    - balance
    - law
    - rule
  backlinks:
    - accounting
    - balance
    - law
    - rule
signatures:
  computationUuid: "008e2772-fa1e-8baa-905f-b45e613c3540"
  stages:
    - stage: path
      stageUuid: "a9a175d9-9908-8ad6-8b6e-e8c0b672260f"
    - stage: trinity
      stageUuid: "ff59cdb5-796a-84f3-bc7f-545d673d9fdd"
    - stage: boundary
      stageUuid: "b4af66a1-64b2-80b1-b0c7-a5114654e421"
    - stage: links
      stageUuid: "71687a86-0cb9-8785-a609-f4c0fa8e1976"
    - stage: horo
      stageUuid: "629fbc5d-8eb3-880d-b095-dc76df617a1c"
    - stage: seal
      stageUuid: "c3c84f84-f531-8fdb-8d40-19278075ce4a"
    - stage: uuid
      stageUuid: "30ba0e01-a7e6-8cd2-9a92-36b572d1d26a"
version: 2
---
# gl-posting-rules

GLPostingRules Collection.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

**Law — [[law]]: each GL account carries its validation-metadata — type, normal debit/credit polarity, balance-sheet-vs-P&L category, reconciliation frequency, cash-flow relevance, close flag — that drives double-entry validation ([[accounting]], [[balance]]).**

## Standards
- IFRS IAS-1 double-entry
- SOX §404 internal-controls
- ISO-8601-1:2019 effective-date

---
name: rules
description: "Use when configuring GL account metadata for double-entry validation — account type (asset/liability/equity/revenue/expense), normal polarity (debit/credit), balance-sheet vs P&L category, reconciliation frequency, cash-flow relevance, period-end close flag. The gl-posting-rules validation-metadata collection."
atomPath: "gl/posting/rules"
coordinate: "gl/posting/rules · 8/crest · 53fac221"
contentUuid: "6ad639fd-49d3-5f22-9f02-6159f1966837"
diamondUuid: "45462688-3b66-880d-84f0-7a2b5ac4d35a"
uuid: "53fac221-57ba-8e56-9734-ac97a5abde72"
horo: 8
typography:
  partition: gl
  bondDegree: 904
standards:
  - "IFRS IAS-1 double-entry"
  - "ISO-8601-1:2019 effective-date"
  - "ISO-8601-1:2019 effective-date`"
  - "SOX §404 internal-controls"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "5afc95dc-51f0-824d-b152-8e50bf8d553e"
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
      stageUuid: "e3fc2b81-29d7-8117-ac5e-a1d7bee205f3"
    - stage: seal
      stageUuid: "c3c84f84-f531-8fdb-8d40-19278075ce4a"
    - stage: uuid
      stageUuid: "24b60d0c-2f35-86ee-9dfc-94d0affdc8e1"
version: 2
---
# gl-posting-rules

GLPostingRules Collection.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

**Law — [[law]]: each GL account carries its validation-metadata — type, normal debit/credit polarity, balance-sheet-vs-P&L category, reconciliation frequency, cash-flow relevance, close flag — that drives double-entry validation ([[accounting]], [[balance]]).**

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-8601-1:2019 effective-date`

- IFRS IAS-1 double-entry
- SOX §404 internal-controls
- ISO-8601-1:2019 effective-date

---
name: rules
description: "Use when configuring GL account metadata for double-entry validation — account type (asset/liability/equity/revenue/expense), normal polarity (debit/credit), balance-sheet vs P&L category, reconciliation frequency, cash-flow relevance, period-end close flag. The gl-posting-rules validation-metadata collection."
atomPath: "gl/posting/rules"
coordinate: "gl/posting/rules · 8/crest · 53fac221"
contentUuid: "79a45bf8-b2ed-55be-ac04-d47b92892204"
diamondUuid: "63a58a6b-83e8-883e-ae8b-9176483d8cb2"
uuid: "53fac221-57ba-8e56-9734-ac97a5abde72"
horo: 8
typography:
  partition: gl
  bondDegree: 994
standards:
  - "IFRS IAS-1 double-entry"
  - "ISO-8601-1:2019 effective-date"
  - "ISO-8601-1:2019 effective-date`"
  - "SOX §404 internal-controls"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "3f776fa4-4e69-8b7a-a8af-2d7b7a8a02f5"
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
      stageUuid: "0acf6a08-791a-8a10-bb81-a08680193572"
    - stage: seal
      stageUuid: "c3c84f84-f531-8fdb-8d40-19278075ce4a"
    - stage: uuid
      stageUuid: "f250a633-9937-8184-b4ff-fe40a5614161"
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

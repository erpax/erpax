---
name: rules
description: "Use when configuring GL account metadata for double-entry validation — account type (asset/liability/equity/revenue/expense), normal polarity (debit/credit), balance-sheet vs P&L category, reconciliation frequency, cash-flow relevance, period-end close flag. The gl-posting-rules validation-metadata collection."
atomPath: "gl/posting/rules"
coordinate: "gl/posting/rules · 7/descent · 81b38a79"
contentUuid: "b634c2ce-41eb-5713-b56d-0436b777c7e2"
diamondUuid: "6b91c461-8154-844e-82fa-36517615d281"
uuid: "81b38a79-77fe-8c24-ac41-cc5dc8ff2291"
horo: 7
typography:
  partition: gl
  bondDegree: 895
standards:
  - "IFRS IAS-1 double-entry"
  - "ISO-8601-1:2019 effective-date"
  - "ISO-8601-1:2019 effective-date`"
  - "SOX §404 internal-controls"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "8d3437c2-05e4-8cc8-b672-13dc6e80d34e"
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
      stageUuid: "391368ba-c102-8f0a-9265-b361b97d524b"
    - stage: seal
      stageUuid: "c3c84f84-f531-8fdb-8d40-19278075ce4a"
    - stage: uuid
      stageUuid: "3bd4dee3-485b-8a2e-8d11-05cd3d4271ea"
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

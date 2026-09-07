---
name: eliminations
description: "Use when posting or replaying group-level elimination JEs at consolidation close — intercompany balances, IC revenue/expense, unrealised intra-group profit, investment in subsidiary, FC translation reserve — per IFRS-10 §B86 / ASC-810-10-45; distinct from per-tenant journal-entries and the intercompany-transactions source register. The group consolidation elimination cycle register."
atomPath: "consolidation/eliminations"
coordinate: "consolidation/eliminations · 2/share · b255bf0e"
contentUuid: "100fa2e3-aa20-58ef-a9b7-cd025621970f"
diamondUuid: "e70648c4-65fa-8887-b98f-0422fb835b80"
uuid: "b255bf0e-d491-876f-a167-1ace29df576f"
horo: 2
typography:
  partition: consolidation
  bondDegree: 13
standards:
  - "IFRS IAS-21 §39 foreign-currency-translation-on-consolidation"
  - "IFRS IFRS-10 §B86 consolidated-financial-statements"
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 currency-codes`"
  - "ISO-8601-1:2019 date-time consolidation-date"
  - "ISO-8601-1:2019 date-time consolidation-date`"
  - "SOX §404 internal-controls consolidation-control TOM-CON-01"
  - "US-GAAP ASC-810-10-45 consolidation-elimination"
  - "US-GAAP ASC-830-30 foreign-currency-translation"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "ffd60a1d-3486-8690-8e3e-60133b1aea9f"
  stages:
    - stage: path
      stageUuid: "9e055a7a-931a-8925-a579-e0400f142749"
    - stage: trinity
      stageUuid: "974f2fcf-7c4c-81f4-b7c4-72c58e90b402"
    - stage: boundary
      stageUuid: "f556bc01-34c3-8495-9e5e-73fde9076a83"
    - stage: links
      stageUuid: "511f5e11-7f93-8122-94c4-7270bcbf3642"
    - stage: horo
      stageUuid: "68f08de2-707a-8cab-82d4-9a8f8cb2b8e0"
    - stage: seal
      stageUuid: "faa78d31-8f08-8987-aafb-15c904248275"
    - stage: uuid
      stageUuid: "517efaff-13b9-8f91-a43e-8bd40e8ca405"
version: 2
---
# consolidation-eliminations

Consolidation Eliminations — group consolidation elimination entries.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-4217:2015 currency-codes`
- `@standard ISO-8601-1:2019 date-time consolidation-date`

- ISO-4217:2015 currency-codes
- ISO-8601-1:2019 date-time consolidation-date
- IFRS IFRS-10 §B86 consolidated-financial-statements
- IFRS IAS-21 §39 foreign-currency-translation-on-consolidation
- US-GAAP ASC-810-10-45 consolidation-elimination
- US-GAAP ASC-830-30 foreign-currency-translation
- ISO-19011:2018 audit-trail consolidation-evidence
- SOX §404 internal-controls consolidation-control TOM-CON-01
- ISO-27001 A.5.23 cloud-service-tenant-isolation

**Law — [[law]]: the group-level elimination [[journal/entries|journal entries]] posted at consolidation close — intercompany balances, IC revenue/expense, unrealised intra-group profit, and FC translation — distinct from per-tenant journal-entries.**

Composes: [[journal/entries]] · [[legal/entities/intercompany/transactions]].

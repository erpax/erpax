---
name: eliminations
description: "Use when posting or replaying group-level elimination JEs at consolidation close — intercompany balances, IC revenue/expense, unrealised intra-group profit, investment in subsidiary, FC translation reserve — per IFRS-10 §B86 / ASC-810-10-45; distinct from per-tenant journal-entries and the intercompany-transactions source register. The group consolidation elimination cycle register."
atomPath: "consolidation/eliminations"
coordinate: "consolidation/eliminations · 1/base · 05ddd758"
contentUuid: "34d34077-484a-5805-96db-5ffbdf3c09c4"
diamondUuid: "71479ff1-45a4-8225-979c-5c3f59abb006"
uuid: "05ddd758-08ed-8167-9e59-b5763755ef91"
horo: 1
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
  computationUuid: "a44c576b-bb43-81cc-aa6d-0f7b1cf8a7a4"
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
      stageUuid: "a5d57afe-bc69-8ec0-bdce-0b15b048e93d"
    - stage: seal
      stageUuid: "faa78d31-8f08-8987-aafb-15c904248275"
    - stage: uuid
      stageUuid: "6e9fe4a4-59ac-866b-afb8-b16f303da0d7"
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

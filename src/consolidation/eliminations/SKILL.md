---
name: eliminations
description: "Use when posting or replaying group-level elimination JEs at consolidation close — intercompany balances, IC revenue/expense, unrealised intra-group profit, investment in subsidiary, FC translation reserve — per IFRS-10 §B86 / ASC-810-10-45; distinct from per-tenant journal-entries and the intercompany-transactions source register. The group consolidation elimination cycle register."
atomPath: consolidation/eliminations
coordinate: consolidation/eliminations · 4/weave · d1535dd7
contentUuid: "c75097ec-4c32-5e16-8070-6ff280d297df"
diamondUuid: "17528d5a-a1fe-8949-a0d8-c2a2b480c035"
uuid: "d1535dd7-43ef-8943-a9e4-2ceabd89f3d8"
horo: 4
bonds:
  in:
    - consolidation
    - elimination
    - entries
    - law
    - transactions
  out:
    - elimination
    - entries
    - law
    - transactions
typography:
  partition: consolidation
  bondDegree: 13
  neighbors: []
standards:
  - "IFRS IAS-21 §39 foreign-currency-translation-on-consolidation"
  - "IFRS IFRS-10 §B86 consolidated-financial-statements"
  - "ISO-19011:2018 audit-trail consolidation-evidence"
  - "ISO-4217:2015 currency-codes"
  - "ISO-8601-1:2019 date-time consolidation-date"
  - "SOX §404 internal-controls consolidation-control TOM-CON-01"
  - "US-GAAP ASC-810-10-45 consolidation-elimination"
  - "US-GAAP ASC-830-30 foreign-currency-translation"
bindings: []
neighbors:
  wikilink:
    - entries
    - law
    - transactions
  matrix:
    - elimination
    - entries
    - law
    - transactions
  backlinks:
    - elimination
    - entries
    - law
    - transactions
signatures:
  computationUuid: "faf1113d-2a81-8658-90ae-6e7a98e0a3e1"
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
      stageUuid: "0ac788f9-5c54-8f18-b98d-ffeffb2ec751"
    - stage: seal
      stageUuid: "8dd42ffa-cd7e-82ed-b98f-8d2156768681"
    - stage: uuid
      stageUuid: "cd63a814-1b75-8a8a-b531-27162c4c3e41"
version: 2
---
# consolidation-eliminations

Consolidation Eliminations — group consolidation elimination entries.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
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

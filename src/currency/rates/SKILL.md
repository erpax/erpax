---
name: rates
description: "Use when storing or querying FX exchange rates for multi-currency translation — from/to currency pair, rate date, source (ECB/bank API/manual), bid/ask/mid, inverse auto-calc, per IAS-21 and ASC-830. The FX rate master collection."
atomPath: "currency/rates"
coordinate: "currency/rates · 7/descent · c298025d"
contentUuid: "63a84f9f-6691-555b-9813-0b1a1f1e71b2"
diamondUuid: "29ad9d46-5049-8f75-a3d1-1f09d0e23e1b"
uuid: "c298025d-be5b-841b-b248-43864185e971"
horo: 7
bonds:
  in:
    - access
    - accounting
    - collections
    - currency
    - fields
    - hooks
    - rate
    - transactions
  out:
    - access
    - accounting
    - collections
    - currency
    - fields
    - hooks
    - rate
    - transactions
typography:
  partition: currency
  bondDegree: 24
  neighbors: []
standards:
  - "IFRS IAS-21 effects-of-changes-in-foreign-exchange-rates"
  - "ISO-4217:2015 currency-codes from-currency to-currency"
  - "ISO-4217:2015 currency-codes from-currency to-currency`"
  - "ISO-8601-1:2019 date-time rate-date"
  - "ISO-8601-1:2019 date-time rate-date`"
  - "US-GAAP ASC-830 foreign-currency-matters"
  - "— the instrument reads SKILL.md) -->"
bindings: []
neighbors:
  wikilink:
    - access
    - accounting
    - collections
    - currency
    - fields
    - hooks
  matrix:
    - access
    - accounting
    - collections
    - currency
    - fields
    - hooks
    - rate
    - transactions
  backlinks:
    - access
    - accounting
    - collections
    - currency
    - fields
    - hooks
    - rate
    - transactions
signatures:
  computationUuid: "f0c969fe-dcb1-8713-b052-3ab4025ba9d4"
  stages:
    - stage: path
      stageUuid: "f97d9c10-aa76-8e9a-9bce-62c8c2102e5f"
    - stage: trinity
      stageUuid: "f2e23ecb-f9e5-8e41-bf8e-abd9dd7d4dc3"
    - stage: boundary
      stageUuid: "88476d76-ef65-8db1-8361-860bc2b5f269"
    - stage: links
      stageUuid: "8595e6b0-a854-8768-93d9-af803d7607df"
    - stage: horo
      stageUuid: "ef5accb9-a647-80fe-8ebc-273e214cd243"
    - stage: seal
      stageUuid: "376cb7a6-1e50-82a0-9ced-531168a3e0b0"
    - stage: uuid
      stageUuid: "8ae01676-2b29-8be4-ac0d-c320dabd2767"
version: 2
---
# currency-rates

Currency Rates — FX rate master for multi-currency translation.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-4217:2015 currency-codes from-currency to-currency`
- `@standard ISO-8601-1:2019 date-time rate-date`

- ISO-4217:2015 currency-codes from-currency to-currency
- ISO-8601-1:2019 date-time rate-date
- IFRS IAS-21 effects-of-changes-in-foreign-exchange-rates
- US-GAAP ASC-830 foreign-currency-matters
- ISO-19011:2018 audit-trail rate-update
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[collections]] · [[fields]] · [[currency]] · [[hooks]] · [[access]] · [[accounting]].

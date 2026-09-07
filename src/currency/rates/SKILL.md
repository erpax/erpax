---
name: rates
description: "Use when storing or querying FX exchange rates for multi-currency translation — from/to currency pair, rate date, source (ECB/bank API/manual), bid/ask/mid, inverse auto-calc, per IAS-21 and ASC-830. The FX rate master collection."
atomPath: "currency/rates"
coordinate: "currency/rates · 8/crest · e6c221f8"
contentUuid: "d2411f77-c36b-572d-baac-c3ace5ec3dd8"
diamondUuid: "8b400625-1e9d-86d7-9b34-06cba1b9aa9d"
uuid: "e6c221f8-4dfb-8114-9566-54232c37bc12"
horo: 8
typography:
  partition: currency
  bondDegree: 24
standards:
  - "IFRS IAS-21 effects-of-changes-in-foreign-exchange-rates"
  - "ISO-4217:2015 currency-codes from-currency to-currency"
  - "ISO-4217:2015 currency-codes from-currency to-currency`"
  - "ISO-8601-1:2019 date-time rate-date"
  - "ISO-8601-1:2019 date-time rate-date`"
  - "US-GAAP ASC-830 foreign-currency-matters"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "c04a58d3-f7b2-846b-bb96-bd8025bc6332"
  stages:
    - stage: path
      stageUuid: "f97d9c10-aa76-8e9a-9bce-62c8c2102e5f"
    - stage: trinity
      stageUuid: "f2e23ecb-f9e5-8e41-bf8e-abd9dd7d4dc3"
    - stage: boundary
      stageUuid: "88476d76-ef65-8db1-8361-860bc2b5f269"
    - stage: links
      stageUuid: "8b588d80-b1e1-8583-84e9-7dd3a5a3e4cf"
    - stage: horo
      stageUuid: "8d8b45ee-9f6e-84f1-a8a9-2b2c82577fcf"
    - stage: seal
      stageUuid: "376cb7a6-1e50-82a0-9ced-531168a3e0b0"
    - stage: uuid
      stageUuid: "1cacbfed-7647-8da9-af5c-22ba24074681"
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

Composes: [[collections]] · [[field]] · [[currency]] · [[hooks]] · [[access]] · [[accounting]].

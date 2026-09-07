---
name: rates
description: "Use when storing or querying FX exchange rates for multi-currency translation — from/to currency pair, rate date, source (ECB/bank API/manual), bid/ask/mid, inverse auto-calc, per IAS-21 and ASC-830. The FX rate master collection."
atomPath: "currency/rates"
coordinate: "currency/rates · 7/descent · eb5ab52e"
contentUuid: "6018c5a9-3033-5828-84be-0d3a0e71def5"
diamondUuid: "3592ce27-120e-8a39-bcdc-49228cc81bac"
uuid: "eb5ab52e-e682-8274-a65b-ae19a4075938"
horo: 7
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
  computationUuid: "eca417d0-f7a1-88d9-9649-3f56a13ab23d"
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
      stageUuid: "3e01ca30-65bc-8c59-b088-e36e2da38948"
    - stage: seal
      stageUuid: "376cb7a6-1e50-82a0-9ced-531168a3e0b0"
    - stage: uuid
      stageUuid: "175ff751-6084-89db-b6c0-fe16a051b48a"
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

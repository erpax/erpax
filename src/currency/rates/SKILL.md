---
name: rates
description: "Use when storing or querying FX exchange rates for multi-currency translation — from/to currency pair, rate date, source (ECB/bank API/manual), bid/ask/mid, inverse auto-calc, per IAS-21 and ASC-830. The FX rate master collection."
atomPath: "currency/rates"
coordinate: "currency/rates · 7/descent · 6bf53e9e"
contentUuid: "91e0d660-5678-5519-8054-fcfd502e9fdb"
diamondUuid: "d7137b22-cacd-84db-bf6f-a5852f7bd181"
uuid: "6bf53e9e-1c60-82ef-b574-00f5d6185b66"
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
  computationUuid: "de461da6-0375-8f2e-b9b9-247ead43ea75"
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
      stageUuid: "de931d29-be30-8442-835a-c95f514a04aa"
    - stage: seal
      stageUuid: "376cb7a6-1e50-82a0-9ced-531168a3e0b0"
    - stage: uuid
      stageUuid: "0c2a0a9e-bd41-8272-9cdc-1f27e5421df3"
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

---
name: rates
description: "Use when storing or querying FX exchange rates for multi-currency translation — from/to currency pair, rate date, source (ECB/bank API/manual), bid/ask/mid, inverse auto-calc, per IAS-21 and ASC-830. The FX rate master collection."
atomPath: currency/rates
coordinate: currency/rates · 7/descent · f791e26a
contentUuid: "b617a9dc-999a-5a36-a517-f99e22e59b24"
diamondUuid: "cc952657-72cb-8b25-910c-ba3c16a36707"
uuid: "f791e26a-03f6-8d69-bccb-d9504c7c6c99"
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
  - "ISO-19011:2018 audit-trail rate-update"
  - "ISO-4217:2015 currency-codes from-currency to-currency"
  - "ISO-8601-1:2019 date-time rate-date"
  - "US-GAAP ASC-830 foreign-currency-matters"
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
  computationUuid: "d489c2c6-2439-87a9-b4c2-a8cd8f5469f1"
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
      stageUuid: "e4008214-f3ad-86dc-92be-e45aa7203038"
    - stage: seal
      stageUuid: "360c85c2-c9cd-82fb-8406-5f77b1219e37"
    - stage: uuid
      stageUuid: "2810fe8e-d967-8e84-8b8e-2996778247f4"
version: 2
---
# currency-rates

Currency Rates — FX rate master for multi-currency translation.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISO-4217:2015 currency-codes from-currency to-currency
- ISO-8601-1:2019 date-time rate-date
- IFRS IAS-21 effects-of-changes-in-foreign-exchange-rates
- US-GAAP ASC-830 foreign-currency-matters
- ISO-19011:2018 audit-trail rate-update
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[collections]] · [[fields]] · [[currency]] · [[hooks]] · [[access]] · [[accounting]].

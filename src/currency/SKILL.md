---
name: currency
description: "Use when a value carries money — amount + ISO-4217 currency, exchange rates, rounding, multi-currency ledgers/totals. The CurrencyConcern/AmountConcern field-factory; money is amount+currency, never a currency-baked field name."
atomPath: currency
coordinate: currency · 2/share · ce402df1
contentUuid: "c3930399-7360-5ba0-8956-a689e2dbe2f4"
diamondUuid: "344b4e0e-b3f4-8ad8-85e6-42fb95d30f3c"
uuid: "ce402df1-cf04-8421-8ec1-e328d6a0dd50"
horo: 2
bonds:
  in:
    - accounting
    - agriculture
    - amortize
    - amount
    - bindings
    - calculate
    - commerce
    - compensation
    - conversion
    - crop
    - decompression
    - depreciate
    - dimension
    - discount
    - ebitda
    - enterprisebudget
    - events
    - fallback
    - field
    - fields
    - hedge
    - hooks
    - identity
    - items
    - jobs
    - measure
    - payment
    - price
    - rate
    - rates
    - reconcile
    - reconciliation
    - resources
    - revenue
    - salary
    - seed
    - service
    - standard
    - tax
    - total
    - transaction
    - value
    - versions
  out:
    - accounting
    - agriculture
    - amortize
    - amount
    - bindings
    - calculate
    - commerce
    - compensation
    - conversion
    - crop
    - decompression
    - depreciate
    - dimension
    - discount
    - ebitda
    - enterprisebudget
    - events
    - fallback
    - field
    - fields
    - hedge
    - hooks
    - identity
    - items
    - jobs
    - measure
    - payment
    - price
    - rate
    - rates
    - reconcile
    - reconciliation
    - resources
    - revenue
    - salary
    - seed
    - service
    - standard
    - tax
    - total
    - transaction
    - value
    - versions
typography:
  partition: currency
  bondDegree: 136
  neighbors: []
standards:
  - "EN-16931"
  - "EU-2002/58"
  - "IFRS-9"
  - "ISO-20022"
  - "RFC-8785"
  - "SAF-T"
bindings: []
neighbors:
  wikilink:
    - accounting
    - bindings
    - commerce
    - fields
    - hooks
    - identity
    - jobs
    - measure
    - rate
    - standard
    - versions
  matrix:
    - accounting
    - agriculture
    - amortize
    - amount
    - bindings
    - calculate
    - commerce
    - compensation
    - conversion
    - crop
    - decompression
    - depreciate
    - dimension
    - discount
    - ebitda
    - enterprisebudget
    - events
    - fallback
    - field
    - fields
    - hedge
    - hooks
    - identity
    - items
    - jobs
    - measure
    - payment
    - price
    - rate
    - rates
    - reconcile
    - reconciliation
    - resources
    - revenue
    - salary
    - seed
    - service
    - standard
    - tax
    - total
    - transaction
    - value
    - versions
  backlinks:
    - accounting
    - agriculture
    - amortize
    - amount
    - bindings
    - calculate
    - commerce
    - compensation
    - conversion
    - crop
    - decompression
    - depreciate
    - dimension
    - discount
    - ebitda
    - enterprisebudget
    - events
    - fallback
    - field
    - fields
    - hedge
    - hooks
    - identity
    - items
    - jobs
    - measure
    - payment
    - price
    - rate
    - rates
    - reconcile
    - reconciliation
    - resources
    - revenue
    - salary
    - seed
    - service
    - standard
    - tax
    - total
    - transaction
    - value
    - versions
signatures:
  computationUuid: "ef6077a3-3de3-84e5-94ca-22f57bb6e00f"
  stages:
    - stage: path
      stageUuid: "88086f14-e2e7-866a-8bde-e04e3b3e732a"
    - stage: trinity
      stageUuid: "2392e736-398a-8ac9-b0d9-7669673fdf06"
    - stage: boundary
      stageUuid: "4438f7ac-302c-8321-ade3-15388c1aba5f"
    - stage: links
      stageUuid: "1209b5a2-8624-8f15-9ca4-feb601967f49"
    - stage: horo
      stageUuid: "c5402808-fd77-8025-b27b-76280e36e205"
    - stage: seal
      stageUuid: "f18417ad-573d-8090-b6e5-11c973200416"
    - stage: uuid
      stageUuid: "eb296d6b-66a3-89f4-8b32-920d8c62e6d6"
version: 2
---
# currency — money is amount + ISO-4217 code (never baked into the name)

`currency` is the money field-factory atom (Rails `CurrencyConcern`/`AmountConcern`, Money gem `monetize`), sequence position **1** ([[fields]]). Law: a monetary value is a **minor-unit integer `amount` + an ISO-4217 `currency`** — NEVER a currency-baked name (`monthlyUSD` → `price` + `currency`). Multi-currency everywhere: each amount keeps its own currency; an `exchangeRate` (a [[rate]]) converts to the entity's functional currency *at a point in time* ([[versions]]). A blank currency routes to its identity element **`XXX`** ([[identity]] categorical currency — never an ad-hoc `?? 'EUR'` default). Rates fall back along the jurisdiction cascade **БНБ → ECB** (matter = the rate-fetch via [[hooks]]/[[jobs]]; antimatter = the cascade fallback).

Composes: [[accounting]] (multi-currency journals), [[commerce]] (totals), [[identity]] (`XXX` element + rates), [[fields]], [[bindings]] (rate-sync job), [[measure]] (the substance twin — quantity+unit).

## Standards

Applying this skill *is* how these standards are implemented — the field-factory is the answer-path; its [[standard]] banners must be true, not decoration.

- **ISO 4217:2015** (third edition, 2015-08; current — NOT superseded, kept live by Maintenance Agency amendments via SIX Financial Information AG, e.g. Amendment No. 177 effective 2024-06-25 adding ZWG). **Form:** every currency is an uppercase three-letter ALPHABETIC code (`EUR`, `USD`, `BGN`, `ZWG`) from the current published list; where numeric/decimal handling is needed, pair it with the matching three-digit NUMERIC code and the published minor-unit/exponent (`JPY`=0, `USD`=2, `BHD`=3) — never assume two decimals. The code list is controlled and amendable: never a baked literal, and withdrawn codes are never reused. Cite as `ISO 4217:2015` (year is correct, edition not superseded); cite the code as the alphabetic (alpha-3) code without a clause number (avoid the brittle "§5").
- **ISO 13616-1:2020** (Edition 2, 2020-09; current, last confirmed 2026; companion 13616-2:2020 governs the SWIFT Registration Authority). **Form (IBAN):** country code (ISO 3166-1 alpha-2) + 2 check digits validated by the mod-97-10 / ISO 7064 algorithm + the registered-length country-specific BBAN. The `-1` part suffix is load-bearing — Part 2 separately covers the Registration Authority — so cite `ISO 13616-1:2020`, not bare "ISO 13616".
- **ISO 9362:2022** (Edition 5, 2022-04; cancels and replaces ISO 9362:2014; current). **Form (BIC):** an 8- or 11-character Business Identifier Code = 4-char party prefix + 2-char ISO 3166-1 country + 2-char location + optional 3-char branch, where the 8-char / `XXX`-branch form denotes the head office. ISO 9362 has no parts, so `ISO 9362:2022` (no part suffix) is the correct citation.

## Common mistakes
- Currency baked into a field name (`amountUSD`) — split into `amount` + `currency`.
- Float money — store minor-unit integers.
- An ad-hoc default currency (`?? 'EUR'`) — route blanks to `XXX` (the identity element).
- Hardcoding 2 decimals on any money-rounding path — honour each currency's ISO 4217 minor-unit (`JPY`=0, `BHD`=3); this, not the citation year, is the real conformance gap.
- A bare "ISO 13616" / "ISO 9362" citation — the `-1` part suffix on 13616 is load-bearing; pin the year on both.

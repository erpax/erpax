---
name: "4217"
description: Use when implementing or referencing ISO 4217 — Currency codes.
atomPath: iso/4217
coordinate: iso/4217 · 7/descent · f6e6f0f2
contentUuid: "79e844b9-165a-5c56-968b-4def93957926"
diamondUuid: "b2bed090-3fdc-87fe-8352-668a3b88fbad"
uuid: "f6e6f0f2-88d3-842f-a857-c2ac39d7c849"
horo: 7
bonds:
  in:
    - iso
    - law
  out:
    - law
typography:
  partition: iso
  bondDegree: 3
  neighbors: []
standards:
  - "ISO-4217:2015 currency-codes"
bindings: []
neighbors:
  wikilink:
    - law
  matrix:
    - law
  backlinks:
    - law
signatures:
  computationUuid: "e6049d4c-3faa-8ae0-9d45-d01cd8ecdab4"
  stages:
    - stage: path
      stageUuid: "1ded1e96-a440-8951-bc68-f288d1882273"
    - stage: trinity
      stageUuid: "9fcdda83-48ce-8fd1-9273-3847be941a1a"
    - stage: boundary
      stageUuid: "315fbec0-6bac-8529-a2b1-9cfd39db211b"
    - stage: links
      stageUuid: "bd7846c7-6632-806d-a848-5260e90c96aa"
    - stage: horo
      stageUuid: "e7d86654-a80c-889b-91ed-00a57d5020f1"
    - stage: seal
      stageUuid: "ef5499dd-41c5-804c-aa45-3027ed22cb36"
    - stage: uuid
      stageUuid: "4edb9e8e-6ec9-89d3-be4d-6f6f4ecefec3"
version: 2
---
# ISO 4217 — Currency codes

**Edition:** ISO 4217:2015 (active maintenance agency: SIX Interbank Clearing).
**Publisher:** <https://www.iso.org/iso-4217-currency-codes.html>
**Maintenance list:** <https://www.six-group.com/en/products-services/financial-information/data-standards.html>

## What's here

- `validate.ts` — `isIso4217(s)` regex check for 3-letter uppercase alphabetic.

## Out of scope

- The full code table. Use `Intl.supportedValuesOf('currency')` at runtime
  rather than shipping a frozen list.
- Numeric codes (§6.2) — not used in erpax storage today.
- Historic / discontinued codes — runtime data only; not validated here.

## Used by

Every Payload field named `currency` (collections: `CurrencyRates`,
`TaxJurisdictions`, `Tenants`, `Invoices`, `Payments`, `FinancialStatements`,
etc.) and the `_money/Money` value type.

**Law — [[law]]: every `currency` value is a valid ISO-4217:2015 three-letter alphabetic code, validated at the boundary against the runtime table (`Intl.supportedValuesOf`), never a frozen shipped list.**

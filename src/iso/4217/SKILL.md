---
name: "4217"
description: Use when implementing or referencing ISO 4217 — Currency codes.
atomPath: "iso/4217"
coordinate: "iso/4217 · 8/crest · 622fedf6"
contentUuid: "cbc2bd73-47f4-5bb0-bb93-c6ec1ff91322"
diamondUuid: "397f13fa-11aa-8f6e-a134-a6ee96c495c7"
uuid: "622fedf6-90bd-82e8-b3e2-08e4b6524102"
horo: 8
typography:
  partition: iso
  bondDegree: 10
standards:
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 currency-codes`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "b4ea5728-477a-812f-8cdb-89bca86fa8a1"
  stages:
    - stage: path
      stageUuid: "1ded1e96-a440-8951-bc68-f288d1882273"
    - stage: trinity
      stageUuid: "9fcdda83-48ce-8fd1-9273-3847be941a1a"
    - stage: boundary
      stageUuid: "315fbec0-6bac-8529-a2b1-9cfd39db211b"
    - stage: links
      stageUuid: "58828d1c-790f-880e-a0b4-4c8f84fb7384"
    - stage: horo
      stageUuid: "31c51289-ed11-8250-bf02-a045526876ef"
    - stage: seal
      stageUuid: "4eae90c8-c393-8f52-90c8-2d40995217c4"
    - stage: uuid
      stageUuid: "ad00e520-ad57-8e0a-8ae0-3ad529f3f698"
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

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-4217:2015 currency-codes`

Composes: [[standards]] · [[currency]].

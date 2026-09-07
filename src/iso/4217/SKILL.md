---
name: "4217"
description: Use when implementing or referencing ISO 4217 — Currency codes.
atomPath: "iso/4217"
coordinate: "iso/4217 · 4/weave · 51dac0d2"
contentUuid: "6f3c9203-877b-5715-97d7-63b6d815fdfd"
diamondUuid: "f457d004-6396-8858-870f-ff9a7f02ab95"
uuid: "51dac0d2-192c-836a-8503-818675e0ff70"
horo: 4
typography:
  partition: iso
  bondDegree: 12
standards:
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 currency-codes`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "d553d402-d988-85f1-8320-0272a9bab63f"
  stages:
    - stage: path
      stageUuid: "1ded1e96-a440-8951-bc68-f288d1882273"
    - stage: trinity
      stageUuid: "9fcdda83-48ce-8fd1-9273-3847be941a1a"
    - stage: boundary
      stageUuid: "315fbec0-6bac-8529-a2b1-9cfd39db211b"
    - stage: links
      stageUuid: "671df09a-3c14-8ecc-a3fa-39212ddfcb15"
    - stage: horo
      stageUuid: "2e7354f6-cf89-82b9-9e20-bf4abc1948d8"
    - stage: seal
      stageUuid: "4eae90c8-c393-8f52-90c8-2d40995217c4"
    - stage: uuid
      stageUuid: "0fa748f5-9a75-8853-98ef-aeac25fd758a"
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

---
name: "4217"
description: Use when implementing or referencing ISO 4217 — Currency codes.
atomPath: "iso/4217"
coordinate: "iso/4217 · 1/base · 650b3882"
contentUuid: "b06082e0-f07b-5ecc-9b85-2f6cf95e5dfe"
diamondUuid: "182c687b-2c24-8efb-ba75-dc6e0ce4104a"
uuid: "650b3882-c9b3-82f2-9ae5-1b3065742d5a"
horo: 1
typography:
  partition: iso
  bondDegree: 12
standards:
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 currency-codes`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "174462a3-22d6-8205-8a6b-63fbcb909676"
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
      stageUuid: "4db7db58-f74e-8fc8-93b7-115ff13fdced"
    - stage: seal
      stageUuid: "4eae90c8-c393-8f52-90c8-2d40995217c4"
    - stage: uuid
      stageUuid: "857b603a-5e3a-8365-888e-397c7f3787a3"
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

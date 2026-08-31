---
name: "4217"
description: Use when implementing or referencing ISO 4217 — Currency codes.
atomPath: "iso/4217"
coordinate: "iso/4217 · 5/round · d10fc95f"
contentUuid: "e59586df-d77e-5941-8bf0-cef7f1902d84"
diamondUuid: "a1518b7c-61ee-8e1d-9026-689e19ff742a"
uuid: "d10fc95f-6823-8b01-b1de-679eb7e44990"
horo: 5
typography:
  partition: iso
  bondDegree: 1
standards:
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 currency-codes`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "e639c841-cfe2-8ae4-8786-035e70180dc0"
  stages:
    - stage: path
      stageUuid: "1ded1e96-a440-8951-bc68-f288d1882273"
    - stage: trinity
      stageUuid: "9fcdda83-48ce-8fd1-9273-3847be941a1a"
    - stage: boundary
      stageUuid: "315fbec0-6bac-8529-a2b1-9cfd39db211b"
    - stage: links
      stageUuid: "64afdde9-e614-80a8-b11e-14fbdb845b2e"
    - stage: horo
      stageUuid: "15dd647e-7993-8a59-a140-a7078b2ab25c"
    - stage: seal
      stageUuid: "ef5499dd-41c5-804c-aa45-3027ed22cb36"
    - stage: uuid
      stageUuid: "776ba52a-959d-85b6-8afc-a5f90bd55de5"
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

Composes: [[iso]] · [[standards]] · [[currency]].

---
name: "4217"
description: Use when implementing or referencing ISO 4217 — Currency codes.
atomPath: "iso/4217"
coordinate: "iso/4217 · 8/crest · 301a086c"
contentUuid: "0916c480-9cc5-59e6-a00e-8c02afa7817b"
diamondUuid: "4afe14ec-b9b4-847c-a60b-53b7048f667c"
uuid: "301a086c-f900-89e7-9945-8f4a8d7faeb5"
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
  computationUuid: "5ff2afc4-ba5b-8311-8697-e13f44454d69"
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
      stageUuid: "53743d77-d3ee-84f9-8127-d4e1a9c35612"
    - stage: seal
      stageUuid: "4eae90c8-c393-8f52-90c8-2d40995217c4"
    - stage: uuid
      stageUuid: "1f02b4cd-5c77-89f7-bb8b-96f4237e1fe7"
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

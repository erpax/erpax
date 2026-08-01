---
name: items
description: "Use when originating or reversing IAS-12 deferred-tax positions — deductible/taxable temporary differences, tax-loss/credit carry-forwards, realisation probability, expected reversal date, substantively-enacted rate measurement and linking to the journal-entry booking. The IAS-12 deferred-tax register collection."
atomPath: "tax/jurisdictions/deferred/tax/items"
coordinate: "tax/jurisdictions/deferred/tax/items · 7/descent · 1becbdb8"
contentUuid: "5606e7d2-eae9-5059-a14e-7d53cb6472ba"
diamondUuid: "003a6d7b-c43e-8595-85a0-ce36c2a34dc4"
uuid: "1becbdb8-b15e-89dd-a458-ca0389eeb980"
horo: 7
typography:
  partition: tax
  bondDegree: 112
standards:
  - "IAS-12"
  - "IFRS IAS-12 §15-§68 income-taxes"
  - "IFRS IAS-12 §15-§68 income-taxes`"
  - "IFRS IAS-12 §29 deductible-temporary-differences"
  - "IFRS IAS-12 §29 deductible-temporary-differences`"
  - "IFRS IAS-12 §34 deferred-tax-asset-recognition"
  - "IFRS IAS-12 §34 deferred-tax-asset-recognition`"
  - "IFRS IAS-12 §47 measurement-using-substantively-enacted-rate"
  - "IFRS IAS-12 §47 measurement-using-substantively-enacted-rate`"
  - "IFRS IAS-12 §74 offsetting-deferred-tax-assets-and-liabilities"
  - "IFRS IAS-12 §74 offsetting-deferred-tax-assets-and-liabilities`"
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 currency-codes`"
  - "ISO-8601-1:2019 date-time origination-reversal"
  - "ISO-8601-1:2019 date-time origination-reversal`"
  - "SOX §404 internal-controls TOM-TAX-02"
  - "US-GAAP"
  - "US-GAAP ASC-740 income-taxes"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "0e5f11d0-4409-8fa5-b5ff-ac6e5239f5b9"
  stages:
    - stage: path
      stageUuid: "6cd6203d-96b1-8e18-b1fd-220149c4343a"
    - stage: trinity
      stageUuid: "8f0c4b8b-1eea-818a-b830-89dceefcead9"
    - stage: boundary
      stageUuid: "a0607eb2-5e3e-841a-9faf-a4f72927a675"
    - stage: links
      stageUuid: "ff78e8da-ca00-8897-97a4-72a10b82fc98"
    - stage: horo
      stageUuid: "c5e5f113-739c-84a6-853b-0db1453e2642"
    - stage: seal
      stageUuid: "40ea48fa-ea26-8af4-9173-2384ceef4f40"
    - stage: uuid
      stageUuid: "4d4a44ad-6b96-8adc-acfb-fd681ef7e2f8"
version: 2
---
# deferred-tax-items

[[tax]] · [[accounting]] deferred-tax register. One row per origination or reversal of a temporary difference between tax base and carrying amount, per [[standard]] IAS-12.

Slice BBBBB-prep (2026-05-11): the `kind` discriminator carries the IAS-12 classification (deductible vs taxable; current vs non-current). Pairs with [[tax]] jurisdiction (rate source) and [[transaction]] journal-entries (booking).

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard IFRS IAS-12 §15-§68 income-taxes`
- `@standard IFRS IAS-12 §29 deductible-temporary-differences`
- `@standard IFRS IAS-12 §34 deferred-tax-asset-recognition`
- `@standard IFRS IAS-12 §47 measurement-using-substantively-enacted-rate`
- `@standard IFRS IAS-12 §74 offsetting-deferred-tax-assets-and-liabilities`
- `@standard ISO-4217:2015 currency-codes`
- `@standard ISO-8601-1:2019 date-time origination-reversal`

- IFRS IAS-12 §15-§68 income-taxes
- IFRS IAS-12 §29 deductible-temporary-differences
- IFRS IAS-12 §34 deferred-tax-asset-recognition
- IFRS IAS-12 §47 measurement-using-substantively-enacted-rate
- IFRS IAS-12 §74 offsetting-deferred-tax-assets-and-liabilities
- US-GAAP ASC-740 income-taxes
- ISO-4217:2015 currency-codes
- ISO-8601-1:2019 date-time origination-reversal
- ISO 19011:2018 §6.4.6 audit-evidence-deferred-tax
- SOX §404 internal-controls TOM-TAX-02
- ISO 27001 A.5.23 cloud-service-tenant-isolation

Composes: [[identity]] (reference field) · [[accounting]] (access, audit fields) · [[currency]] · [[transaction]] (journal-entry relationship) · [[proof]] (audit trail via auditFields).

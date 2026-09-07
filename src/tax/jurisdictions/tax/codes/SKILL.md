---
name: codes
description: "Use when defining or resolving tax rates — VAT, GST, sales, withholding, income, excise or customs codes with rate percent, UN/CEFACT-5305 category, jurisdiction link, reverse-charge eligibility, recoverability, effective date range and default GL accounts. The per-tenant tax-rate master collection."
atomPath: "tax/jurisdictions/tax/codes"
coordinate: "tax/jurisdictions/tax/codes · 5/round · 43e12899"
contentUuid: "1f27c3cb-fa1b-57ea-976c-eb5856447c5a"
diamondUuid: "c4de5094-6384-83ac-9b11-cd1aba528428"
uuid: "43e12899-94aa-8525-b01f-556a2fc74cb2"
horo: 5
typography:
  partition: tax
  bondDegree: 16
standards:
  - "EN-16931:2017 §BG-23 vat-breakdown"
  - "EN-16931:2017 §BG-23 vat-breakdown`"
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 currency-codes`"
  - "ISO-8601-1:2019 date-time"
  - "ISO-8601-1:2019 date-time`"
  - "OECD SAF-T tax-table"
  - "UN-CEFACT"
  - "UN-CEFACT-5305 tax-category-codes"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "c7b02e35-2667-874b-b9ab-1f510aa7bb67"
  stages:
    - stage: path
      stageUuid: "77df4261-bf80-8a0c-a6ea-96a9be623ee0"
    - stage: trinity
      stageUuid: "bcfb3e19-8f5f-8c86-ab68-083d2fc0a341"
    - stage: boundary
      stageUuid: "aeab3e21-9ed4-8b80-8f5a-0deb9f531af3"
    - stage: links
      stageUuid: "cba12dff-1d6c-8935-9fe1-01a5bcf75a75"
    - stage: horo
      stageUuid: "4ee3e6ab-1829-8a6d-aae8-4f40ab0d6ba3"
    - stage: seal
      stageUuid: "f727f0b0-05b4-8b28-bb6f-d770cb074592"
    - stage: uuid
      stageUuid: "ba25ba80-eb58-80d5-a571-8928264f50be"
version: 2
---
# tax-codes

Tax Codes — tax-rate master.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard EN-16931:2017 §BG-23 vat-breakdown`
- `@standard ISO-4217:2015 currency-codes`
- `@standard ISO-8601-1:2019 date-time`

- EN-16931:2017 §BG-23 vat-breakdown
- UN-CEFACT-5305 tax-category-codes
- ISO-4217:2015 currency-codes
- ISO-8601-1:2019 date-time
- OECD SAF-T tax-table

Composes: [[tax/jurisdictions]] · [[standard]] · [[accounting]] · [[identity]] · [[proof]].

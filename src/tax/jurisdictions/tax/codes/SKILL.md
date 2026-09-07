---
name: codes
description: "Use when defining or resolving tax rates — VAT, GST, sales, withholding, income, excise or customs codes with rate percent, UN/CEFACT-5305 category, jurisdiction link, reverse-charge eligibility, recoverability, effective date range and default GL accounts. The per-tenant tax-rate master collection."
atomPath: "tax/jurisdictions/tax/codes"
coordinate: "tax/jurisdictions/tax/codes · 1/base · 729b2503"
contentUuid: "37ab99dd-706e-5f94-83b2-2f3dbb5eb4de"
diamondUuid: "9db92b39-a413-8511-b587-e30f9358469e"
uuid: "729b2503-3b5d-83ef-8b3e-4df3e42a522a"
horo: 1
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
  computationUuid: "fbb7d177-28e1-89b1-ac31-5328162f3bfe"
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
      stageUuid: "8056246b-72b3-8fa6-bbdf-1ee0a8dc4e50"
    - stage: seal
      stageUuid: "f727f0b0-05b4-8b28-bb6f-d770cb074592"
    - stage: uuid
      stageUuid: "5396751a-1571-8605-ad8e-8f60b8681820"
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

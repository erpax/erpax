---
name: codes
description: "Use when defining or resolving tax rates — VAT, GST, sales, withholding, income, excise or customs codes with rate percent, UN/CEFACT-5305 category, jurisdiction link, reverse-charge eligibility, recoverability, effective date range and default GL accounts. The per-tenant tax-rate master collection."
atomPath: "tax/jurisdictions/tax/codes"
coordinate: "tax/jurisdictions/tax/codes · 1/base · a10a601f"
contentUuid: "d5fc4970-d591-5841-a156-ede4a3cee0a7"
diamondUuid: "03a3e527-a3f3-8f2d-a87c-00b64feee0d6"
uuid: "a10a601f-2817-8ed6-8c72-b1a6d6bee539"
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
  computationUuid: "1f82a044-82bf-838b-b64e-70e075d01e9f"
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
      stageUuid: "8eacabd4-f3e8-8a2b-9d57-eae86f12a72f"
    - stage: seal
      stageUuid: "f727f0b0-05b4-8b28-bb6f-d770cb074592"
    - stage: uuid
      stageUuid: "a735c3a6-aa44-853b-a62b-3a17509187de"
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

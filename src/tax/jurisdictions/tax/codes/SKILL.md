---
name: codes
description: "Use when defining or resolving tax rates — VAT, GST, sales, withholding, income, excise or customs codes with rate percent, UN/CEFACT-5305 category, jurisdiction link, reverse-charge eligibility, recoverability, effective date range and default GL accounts. The per-tenant tax-rate master collection."
atomPath: "tax/jurisdictions/tax/codes"
coordinate: "tax/jurisdictions/tax/codes · 4/weave · c64cb618"
contentUuid: "d63f2bbd-2198-5694-b74d-96e91ab74d7f"
diamondUuid: "19b0b416-2207-8a5d-92d9-d62287bb0731"
uuid: "c64cb618-d6ab-8a2f-aba1-7622969df441"
horo: 4
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
  computationUuid: "a162ac62-f3cc-8836-a982-b0f0193e5dfd"
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
      stageUuid: "67923aa3-5cc2-80d0-971d-95ada6a00acb"
    - stage: seal
      stageUuid: "f727f0b0-05b4-8b28-bb6f-d770cb074592"
    - stage: uuid
      stageUuid: "81bfc238-1c0e-8338-bb62-268fa9d58d31"
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

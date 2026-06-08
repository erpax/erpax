---
name: codes
description: "Use when defining or resolving tax rates — VAT, GST, sales, withholding, income, excise or customs codes with rate percent, UN/CEFACT-5305 category, jurisdiction link, reverse-charge eligibility, recoverability, effective date range and default GL accounts. The per-tenant tax-rate master collection."
atomPath: tax/jurisdictions/tax/codes
coordinate: tax/jurisdictions/tax/codes · 2/share · 43e28114
contentUuid: "16234036-b196-5779-9046-ef01f6a443e1"
diamondUuid: "e12f1f99-1bbe-8732-a1ea-6242ec69303e"
uuid: "43e28114-41f4-81ed-a485-7a55732b565c"
horo: 2
bonds:
  in:
    - accounting
    - identity
    - jurisdictions
    - proof
    - standard
    - tax
  out:
    - accounting
    - identity
    - jurisdictions
    - proof
    - standard
typography:
  partition: tax
  bondDegree: 16
  neighbors: []
standards:
  - "EN-16931:2017 §BG-23 vat-breakdown"
  - "ISO-4217:2015 currency-codes"
  - "ISO-8601-1:2019 date-time"
  - "OECD SAF-T tax-table"
  - "UN-CEFACT"
  - "UN-CEFACT-5305 tax-category-codes"
bindings: []
neighbors:
  wikilink:
    - accounting
    - identity
    - jurisdictions
    - proof
    - standard
  matrix:
    - accounting
    - identity
    - jurisdictions
    - proof
    - standard
  backlinks:
    - accounting
    - identity
    - jurisdictions
    - proof
    - standard
signatures:
  computationUuid: "cc437b6b-6c32-8e5d-9710-5bb146b76edc"
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
      stageUuid: "02656f05-fd2c-8208-a016-997f78972ef0"
    - stage: seal
      stageUuid: "f727f0b0-05b4-8b28-bb6f-d770cb074592"
    - stage: uuid
      stageUuid: "1ae54493-630b-8d25-b1e5-7658953a335d"
version: 2
---
# tax-codes

Tax Codes — tax-rate master.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- EN-16931:2017 §BG-23 vat-breakdown
- UN-CEFACT-5305 tax-category-codes
- ISO-4217:2015 currency-codes
- ISO-8601-1:2019 date-time
- OECD SAF-T tax-table

Composes: [[tax/jurisdictions]] · [[standard]] · [[accounting]] · [[identity]] · [[proof]].

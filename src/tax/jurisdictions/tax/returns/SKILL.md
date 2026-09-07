---
name: returns
description: "Use when filing or tracking tax returns — VAT monthly/quarterly/annual, EC Sales List, Intrastat, SAF-T, US sales tax, GST, corporate income or withholding returns — with period, output/input tax, net liability, authority confirmation reference, filedAt/paidAt timestamps and attachment evidence. The filed-return record collection (distinct from the TaxCalculations snapshot)."
atomPath: "tax/jurisdictions/tax/returns"
coordinate: "tax/jurisdictions/tax/returns · 7/descent · 502bef30"
contentUuid: "dbe07d2f-ab08-526c-bd40-5fa633d7e264"
diamondUuid: "ca25f3e6-a473-8a58-8c5e-45dc41f64d7d"
uuid: "502bef30-9f94-808c-9213-8672478de195"
horo: 7
typography:
  partition: tax
  bondDegree: 36
standards:
  - "EN-16931:2017 §BG-23 vat-breakdown"
  - "EN-16931:2017 §BG-23 vat-breakdown`"
  - "ISO-3166-1:2020 country-codes jurisdiction"
  - "ISO-3166-1:2020 country-codes jurisdiction`"
  - "ISO-8601-1:2019 date-time period filed-at"
  - "ISO-8601-1:2019 date-time period filed-at`"
  - "OECD SAF-T 2.0 standard-audit-file-tax"
  - "SOX §404 internal-controls tax-position"
  - "US-GAAP ASC-740 income-taxes"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "eb50c72b-55d4-8a60-8e12-9ad628af8619"
  stages:
    - stage: path
      stageUuid: "a44202f3-a563-85a8-9f00-119842b45928"
    - stage: trinity
      stageUuid: "b451413d-1782-822c-b15e-0cd771900a05"
    - stage: boundary
      stageUuid: "b4274dd4-ade3-84f4-a6ea-8a4d0209fcff"
    - stage: links
      stageUuid: "70c2284b-bdd1-8d57-8218-2436c570f114"
    - stage: horo
      stageUuid: "f8f19707-5ea8-87c2-a94d-4d1e37937054"
    - stage: seal
      stageUuid: "1198fef1-b364-81d5-a37b-1bfb85b0ed93"
    - stage: uuid
      stageUuid: "98e6c2c9-506f-803f-9a3b-d79edd0f3016"
version: 2
---
# tax-returns

Tax Returns — filed return record (separate from TaxCalculations which is the snapshot).

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-8601-1:2019 date-time period filed-at`
- `@standard ISO-3166-1:2020 country-codes jurisdiction`
- `@standard EN-16931:2017 §BG-23 vat-breakdown`

- ISO-8601-1:2019 date-time period filed-at
- ISO-3166-1:2020 country-codes jurisdiction
- EN-16931:2017 §BG-23 vat-breakdown
- OECD SAF-T 2.0 standard-audit-file-tax
- US-GAAP ASC-740 income-taxes
- ISO-19011:2018 audit-trail tax-filing-evidence
- SOX §404 internal-controls tax-position

Composes: [[gl/accounts/tax/calculations]] · [[standard]] · [[accounting]] · [[proof]] · [[identity]].

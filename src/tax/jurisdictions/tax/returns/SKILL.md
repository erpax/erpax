---
name: returns
description: "Use when filing or tracking tax returns — VAT monthly/quarterly/annual, EC Sales List, Intrastat, SAF-T, US sales tax, GST, corporate income or withholding returns — with period, output/input tax, net liability, authority confirmation reference, filedAt/paidAt timestamps and attachment evidence. The filed-return record collection (distinct from the TaxCalculations snapshot)."
atomPath: "tax/jurisdictions/tax/returns"
coordinate: "tax/jurisdictions/tax/returns · 7/descent · ee06ed8d"
contentUuid: "8ce121c4-c7cd-54c3-ba87-997fbc0dd230"
diamondUuid: "5b153231-0360-822b-8ef4-6c4d33cf42c1"
uuid: "ee06ed8d-8da8-8702-b612-b2458c307ba4"
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
  computationUuid: "969e2d4b-73db-83ae-8290-c8815acb75c2"
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
      stageUuid: "416533d5-20d2-886c-863f-39b00f1aa281"
    - stage: seal
      stageUuid: "1198fef1-b364-81d5-a37b-1bfb85b0ed93"
    - stage: uuid
      stageUuid: "1d486dc7-f64f-8cdb-b861-9a6d89b79afb"
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

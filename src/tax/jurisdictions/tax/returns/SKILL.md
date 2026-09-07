---
name: returns
description: "Use when filing or tracking tax returns — VAT monthly/quarterly/annual, EC Sales List, Intrastat, SAF-T, US sales tax, GST, corporate income or withholding returns — with period, output/input tax, net liability, authority confirmation reference, filedAt/paidAt timestamps and attachment evidence. The filed-return record collection (distinct from the TaxCalculations snapshot)."
atomPath: "tax/jurisdictions/tax/returns"
coordinate: "tax/jurisdictions/tax/returns · 4/weave · 368e5f3d"
contentUuid: "f37c8d13-e916-590e-b669-ea0dce26192d"
diamondUuid: "eb552bb1-a271-8dc1-aba4-7d4e246ecd97"
uuid: "368e5f3d-789f-8659-a527-f608770d7c8a"
horo: 4
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
  computationUuid: "8daf4599-3581-800d-83c4-77416a4e60fa"
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
      stageUuid: "31e1d23e-5e81-8330-8828-ce9b2384a389"
    - stage: seal
      stageUuid: "1198fef1-b364-81d5-a37b-1bfb85b0ed93"
    - stage: uuid
      stageUuid: "181f21ef-acf7-893e-9210-e42851eecdcd"
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

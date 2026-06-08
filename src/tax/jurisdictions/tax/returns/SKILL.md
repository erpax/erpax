---
name: returns
description: "Use when filing or tracking tax returns — VAT monthly/quarterly/annual, EC Sales List, Intrastat, SAF-T, US sales tax, GST, corporate income or withholding returns — with period, output/input tax, net liability, authority confirmation reference, filedAt/paidAt timestamps and attachment evidence. The filed-return record collection (distinct from the TaxCalculations snapshot)."
atomPath: tax/jurisdictions/tax/returns
coordinate: tax/jurisdictions/tax/returns · 2/share · 51c5f62f
contentUuid: "2cdfdc80-3d33-55d6-b3f1-d3b7dd24c707"
diamondUuid: "8b69dcbc-ab9c-8d3f-9d96-a5713925b6bc"
uuid: "51c5f62f-22c8-85bc-ae3a-1d305ed805ab"
horo: 2
bonds:
  in:
    - accounting
    - fields
    - hooks
    - law
    - offered
    - orders
    - proof
    - standard
    - store
    - tax
    - transaction
  out:
    - accounting
    - fields
    - hooks
    - law
    - offered
    - orders
    - proof
    - standard
    - store
    - transaction
typography:
  partition: tax
  bondDegree: 36
  neighbors: []
standards:
  - "EN-16931:2017 §BG-23 vat-breakdown"
  - "ISO-19011:2018 audit-trail tax-filing-evidence"
  - "ISO-3166-1:2020 country-codes jurisdiction"
  - "ISO-8601-1:2019 date-time period filed-at"
  - "OECD SAF-T 2.0 standard-audit-file-tax"
  - "SOX §404 internal-controls tax-position"
  - "US-GAAP ASC-740 income-taxes"
bindings: []
neighbors:
  wikilink:
    - accounting
    - calculations
    - identity
    - proof
    - standard
  matrix:
    - accounting
    - fields
    - hooks
    - law
    - offered
    - orders
    - proof
    - standard
    - store
    - transaction
  backlinks:
    - accounting
    - fields
    - hooks
    - law
    - offered
    - orders
    - proof
    - standard
    - store
    - transaction
signatures:
  computationUuid: "7e58172c-db85-857a-8a1f-f716ca441a39"
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
      stageUuid: "366e7f84-f3b9-8d9e-883f-2d7aaa3dbd26"
    - stage: seal
      stageUuid: "1198fef1-b364-81d5-a37b-1bfb85b0ed93"
    - stage: uuid
      stageUuid: "42930664-0e54-8f49-a8d0-309c3b8d17fd"
version: 2
---
# tax-returns

Tax Returns — filed return record (separate from TaxCalculations which is the snapshot).

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISO-8601-1:2019 date-time period filed-at
- ISO-3166-1:2020 country-codes jurisdiction
- EN-16931:2017 §BG-23 vat-breakdown
- OECD SAF-T 2.0 standard-audit-file-tax
- US-GAAP ASC-740 income-taxes
- ISO-19011:2018 audit-trail tax-filing-evidence
- SOX §404 internal-controls tax-position

Composes: [[gl/accounts/tax/calculations]] · [[standard]] · [[accounting]] · [[proof]] · [[identity]].

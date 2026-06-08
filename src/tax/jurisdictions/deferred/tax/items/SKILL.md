---
name: items
description: "Use when originating or reversing IAS-12 deferred-tax positions — deductible/taxable temporary differences, tax-loss/credit carry-forwards, realisation probability, expected reversal date, substantively-enacted rate measurement and linking to the journal-entry booking. The IAS-12 deferred-tax register collection."
atomPath: tax/jurisdictions/deferred/tax/items
coordinate: tax/jurisdictions/deferred/tax/items · 4/weave · f3b6cef2
contentUuid: "c4c9433f-3e30-59c9-a88d-73b137d37eb7"
diamondUuid: "2efde30c-969b-8262-9599-2328a4a81aea"
uuid: "f3b6cef2-4b08-8ea3-b366-082e9a235d68"
horo: 4
bonds:
  in:
    - agriculture
    - apiculture
    - aquaculture
    - batches
    - biomass
    - bundle
    - crop
    - cropplan
    - currency
    - declarations
    - forestry
    - harvest
    - inspections
    - lactation
    - law
    - lines
    - livestock
    - materials
    - measure
    - merge
    - movements
    - num
    - orders
    - packages
    - packs
    - postharvest
    - quotes
    - seed
    - share
    - tax
    - upsell
    - variant
  out:
    - agriculture
    - apiculture
    - aquaculture
    - batches
    - biomass
    - bundle
    - crop
    - cropplan
    - currency
    - declarations
    - forestry
    - harvest
    - inspections
    - lactation
    - law
    - lines
    - livestock
    - materials
    - measure
    - merge
    - movements
    - num
    - orders
    - packages
    - packs
    - postharvest
    - quotes
    - seed
    - share
    - upsell
    - variant
typography:
  partition: tax
  bondDegree: 116
  neighbors: []
standards:
  - "IAS-12"
  - "IFRS IAS-12 §15-§68 income-taxes"
  - "IFRS IAS-12 §29 deductible-temporary-differences"
  - "IFRS IAS-12 §34 deferred-tax-asset-recognition"
  - "IFRS IAS-12 §47 measurement-using-substantively-enacted-rate"
  - "IFRS IAS-12 §74 offsetting-deferred-tax-assets-and-liabilities"
  - "ISO 19011:2018 §6.4.6 audit-evidence-deferred-tax"
  - "ISO-4217:2015 currency-codes"
  - "ISO-8601-1:2019 date-time origination-reversal"
  - "SOX §404 internal-controls TOM-TAX-02"
  - "US-GAAP"
  - "US-GAAP ASC-740 income-taxes"
bindings: []
neighbors:
  wikilink:
    - accounting
    - currency
    - identity
    - proof
    - standard
    - tax
    - transaction
  matrix:
    - agriculture
    - apiculture
    - aquaculture
    - batches
    - biomass
    - bundle
    - crop
    - cropplan
    - currency
    - declarations
    - forestry
    - harvest
    - inspections
    - lactation
    - law
    - lines
    - livestock
    - materials
    - measure
    - merge
    - movements
    - num
    - orders
    - packages
    - packs
    - postharvest
    - quotes
    - seed
    - share
    - upsell
    - variant
  backlinks:
    - agriculture
    - apiculture
    - aquaculture
    - batches
    - biomass
    - bundle
    - crop
    - cropplan
    - currency
    - declarations
    - forestry
    - harvest
    - inspections
    - lactation
    - law
    - lines
    - livestock
    - materials
    - measure
    - merge
    - movements
    - num
    - orders
    - packages
    - packs
    - postharvest
    - quotes
    - seed
    - share
    - upsell
    - variant
signatures:
  computationUuid: "0ddfb55c-9f37-8f50-a581-222456579157"
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
      stageUuid: "7e22c70a-0c0e-8485-a311-62b833347247"
    - stage: seal
      stageUuid: "40ea48fa-ea26-8af4-9173-2384ceef4f40"
    - stage: uuid
      stageUuid: "2b9d19f3-4510-84d8-9278-bde858c8f77c"
version: 2
---
# deferred-tax-items

[[tax]] · [[accounting]] deferred-tax register. One row per origination or reversal of a temporary difference between tax base and carrying amount, per [[standard]] IAS-12.

Slice BBBBB-prep (2026-05-11): the `kind` discriminator carries the IAS-12 classification (deductible vs taxable; current vs non-current). Pairs with [[tax]] jurisdiction (rate source) and [[transaction]] journal-entries (booking).

## Standards
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

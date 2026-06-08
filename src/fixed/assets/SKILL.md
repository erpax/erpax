---
name: assets
description: "Use when managing capitalized PP&E — registering assets (land, buildings, equipment, vehicles, software, intangibles), configuring depreciation method and useful life, computing depreciable base and book value, tracking disposals and maintenance, mapping GL accounts for asset/accumulated-depreciation/expense lines. The IAS-16 asset-master node."
atomPath: fixed/assets
coordinate: fixed/assets · 4/weave · 6254cd2b
contentUuid: "fbf77a06-5ea3-549d-8053-8885f39e97f0"
diamondUuid: "a5597dc5-80ea-8406-a3c0-e7e817fa5095"
uuid: "6254cd2b-6931-8c58-a5dc-dca9c1acafc0"
horo: 4
bonds:
  in:
    - access
    - accounting
    - agriculture
    - animal
    - apiculture
    - aquaculture
    - asset
    - balance
    - biomass
    - breed
    - collections
    - crop
    - entries
    - fertility
    - fields
    - forestry
    - fractal
    - graft
    - harvest
    - herd
    - hooks
    - identity
    - impairment
    - lactation
    - law
    - livestock
    - measurements
    - merge
    - mortality
    - perennial
    - postharvest
    - rootstock
    - soil
  out:
    - access
    - accounting
    - agriculture
    - animal
    - apiculture
    - aquaculture
    - asset
    - balance
    - biomass
    - breed
    - collections
    - crop
    - entries
    - fertility
    - fields
    - forestry
    - fractal
    - graft
    - harvest
    - herd
    - hooks
    - identity
    - impairment
    - lactation
    - law
    - livestock
    - measurements
    - merge
    - mortality
    - perennial
    - postharvest
    - rootstock
    - soil
typography:
  partition: fixed
  bondDegree: 0
  neighbors: []
standards:
  - "IFRS IAS-16 property-plant-and-equipment"
  - "IFRS IAS-36 impairment-of-assets"
  - "ISO-19011:2018 audit-trail"
  - "ISO-4217:2015 currency-codes"
  - "ISO-8601-1:2019 date-time acquisition-date in-service-date disposal-date"
  - "SOX §404 internal-controls capital-asset-register"
  - "US-GAAP ASC-360 property-plant-and-equipment"
bindings: []
neighbors:
  wikilink:
    - accounting
    - proof
    - schedules
    - standard
  matrix:
    - access
    - accounting
    - agriculture
    - animal
    - apiculture
    - aquaculture
    - asset
    - balance
    - biomass
    - breed
    - collections
    - crop
    - entries
    - fertility
    - fields
    - forestry
    - fractal
    - graft
    - harvest
    - herd
    - hooks
    - identity
    - impairment
    - lactation
    - law
    - livestock
    - measurements
    - merge
    - mortality
    - perennial
    - postharvest
    - rootstock
    - soil
  backlinks:
    - access
    - accounting
    - agriculture
    - animal
    - apiculture
    - aquaculture
    - asset
    - balance
    - biomass
    - breed
    - collections
    - crop
    - entries
    - fertility
    - fields
    - forestry
    - fractal
    - graft
    - harvest
    - herd
    - hooks
    - identity
    - impairment
    - lactation
    - law
    - livestock
    - measurements
    - merge
    - mortality
    - perennial
    - postharvest
    - rootstock
    - soil
signatures:
  computationUuid: "c1a7c931-4ffe-8a8c-adf8-f474f62b77c8"
  stages:
    - stage: path
      stageUuid: "96a851c1-4e41-81ca-8427-849132e6aa4d"
    - stage: trinity
      stageUuid: "173b20fa-b63e-8666-b1e8-3798c8facc9a"
    - stage: boundary
      stageUuid: "04698d39-61c9-8a08-a62a-0112ba26921a"
    - stage: links
      stageUuid: "f65dabcc-3a9f-82ae-8b02-6b8c71f112f9"
    - stage: horo
      stageUuid: "3022005e-7158-87a4-8378-f196aef6fd23"
    - stage: seal
      stageUuid: "27556568-407f-8875-8caf-c1a8e68d41d6"
    - stage: uuid
      stageUuid: "a7f28800-de84-8e6d-8c53-07f129363ced"
version: 2
---
# fixed-assets

Fixed Assets — capitalized PP&E with depreciation and book-value tracking.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISO-4217:2015 currency-codes
- ISO-8601-1:2019 date-time acquisition-date in-service-date disposal-date
- IFRS IAS-16 property-plant-and-equipment
- IFRS IAS-36 impairment-of-assets
- US-GAAP ASC-360 property-plant-and-equipment
- ISO-19011:2018 audit-trail
- SOX §404 internal-controls capital-asset-register
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[fixed/assets/depreciation/schedules]] · [[accounting]] · [[standard]] · [[proof]].

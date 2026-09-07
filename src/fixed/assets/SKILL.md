---
name: assets
description: "Use when managing capitalized PP&E — registering assets (land, buildings, equipment, vehicles, software, intangibles), configuring depreciation method and useful life, computing depreciable base and book value, tracking disposals and maintenance, mapping GL accounts for asset/accumulated-depreciation/expense lines. The IAS-16 asset-master node."
atomPath: "fixed/assets"
coordinate: "fixed/assets · 8/crest · 13a4133d"
contentUuid: "97f1ac59-c91e-5234-ba9c-2c6906dfd27d"
diamondUuid: "9510c1ca-71a5-8c8a-a997-fe86db7bdb35"
uuid: "13a4133d-6a18-8e00-a30d-9e78d4a6051d"
horo: 8
typography:
  partition: fixed
  bondDegree: 120
standards:
  - "IFRS IAS-16 property-plant-and-equipment"
  - "IFRS IAS-36 impairment-of-assets"
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 currency-codes`"
  - "ISO-8601-1:2019 date-time acquisition-date in-service-date disposal-date"
  - "ISO-8601-1:2019 date-time acquisition-date in-service-date disposal-date`"
  - "SOX §404 internal-controls capital-asset-register"
  - "US-GAAP ASC-360 property-plant-and-equipment"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "f5b2ece1-3123-8d89-a249-e976735531f1"
  stages:
    - stage: path
      stageUuid: "96a851c1-4e41-81ca-8427-849132e6aa4d"
    - stage: trinity
      stageUuid: "173b20fa-b63e-8666-b1e8-3798c8facc9a"
    - stage: boundary
      stageUuid: "8be9b542-f13d-8782-bd3b-aa8b122f845c"
    - stage: links
      stageUuid: "f65dabcc-3a9f-82ae-8b02-6b8c71f112f9"
    - stage: horo
      stageUuid: "4a0fc1ed-3b72-8703-b91d-81c4d50225ff"
    - stage: seal
      stageUuid: "27556568-407f-8875-8caf-c1a8e68d41d6"
    - stage: uuid
      stageUuid: "36270c49-066d-85c3-a538-208adf8e97b5"
version: 2
---
# fixed-assets

Fixed Assets — capitalized PP&E with depreciation and book-value tracking.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-4217:2015 currency-codes`
- `@standard ISO-8601-1:2019 date-time acquisition-date in-service-date disposal-date`

- ISO-4217:2015 currency-codes
- ISO-8601-1:2019 date-time acquisition-date in-service-date disposal-date
- IFRS IAS-16 property-plant-and-equipment
- IFRS IAS-36 impairment-of-assets
- US-GAAP ASC-360 property-plant-and-equipment
- ISO-19011:2018 audit-trail
- SOX §404 internal-controls capital-asset-register
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[fixed/assets/depreciation/schedules]] · [[accounting]] · [[standard]] · [[proof]].

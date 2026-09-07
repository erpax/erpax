---
name: assets
description: "Use when managing capitalized PP&E — registering assets (land, buildings, equipment, vehicles, software, intangibles), configuring depreciation method and useful life, computing depreciable base and book value, tracking disposals and maintenance, mapping GL accounts for asset/accumulated-depreciation/expense lines. The IAS-16 asset-master node."
atomPath: "fixed/assets"
coordinate: "fixed/assets · 7/descent · c963f0ce"
contentUuid: "8776b719-a1bc-5cb9-8b27-0a7d5828b75f"
diamondUuid: "9e3e5103-34b1-8e3c-b360-b74ed0e85d33"
uuid: "c963f0ce-c03f-8770-8d28-1a69c89e4731"
horo: 7
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
  computationUuid: "284550fe-a3a8-8354-ae55-c7b18ebca47f"
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
      stageUuid: "9c8cf59d-4c92-80c5-b9f0-0725129bf878"
    - stage: seal
      stageUuid: "27556568-407f-8875-8caf-c1a8e68d41d6"
    - stage: uuid
      stageUuid: "2f9f8de1-fdc6-8849-9709-9b6cdf9f0a8b"
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

---
name: properties
description: "Use when registering or querying the real-estate portfolio — owned, leased (IFRS-16 ROU), managed, or sublet buildings, sites, and land parcels — with area measurements (IPMS), occupancy, EPC energy rating, BIM reference, and links to spaces, fixed-assets, and leases. The IWMS property master collection."
atomPath: properties
coordinate: "properties · 1/base · d915e79b"
contentUuid: "f151f814-379f-5dad-a041-88dd8071ee31"
diamondUuid: "3c7bfa56-7282-85b4-a74f-ff1fafcf88d7"
uuid: "d915e79b-a04a-8af5-b1b4-e5789f6f66d5"
horo: 1
typography:
  partition: properties
  bondDegree: 23
standards:
  - "EN-15978:2011 sustainability-of-construction-works (when ESG-tracked)"
  - "EN-15978:2011 sustainability-of-construction-works (when ESG-tracked)`"
  - "EU-VAT-Implementing-Reg-282/2011"
  - "IAS-40"
  - "IFRS IAS-16 property-plant-and-equipment owned-property"
  - "IFRS IFRS-16 §22 right-of-use-asset leased-property"
  - "IFRS-13"
  - "ISO-19650-1:2018 information-management-using-bim"
  - "ISO-19650-1:2018 information-management-using-bim`"
  - "ISO-3166-1:2020 country-codes property-country"
  - "ISO-3166-1:2020 country-codes property-country`"
  - "ISO-3166-2"
  - "ISO-3166-2:2020 subdivision-codes property-region"
  - "ISO-3166-2:2020 subdivision-codes property-region`"
  - "ISO-41001"
  - "ISO-41001:2018 facility-management-management-systems"
  - "ISO-41001:2018 facility-management-management-systems`"
  - "ISO-41011:2017 facility-management-vocabulary"
  - "ISO-41011:2017 facility-management-vocabulary`"
  - "ISO-41013:2017 facility-management-scope"
  - "ISO-41013:2017 facility-management-scope`"
  - "ISO-55000"
  - "ISO-55000:2014 asset-management property-as-asset"
  - "ISO-55000:2014 asset-management property-as-asset`"
  - NACE
  - "NACE-Rev.2 economic-activity-of-occupants"
  - "SOX §404 internal-controls real-estate-portfolio"
  - "US-GAAP"
  - "US-GAAP ASC-360 property-plant-and-equipment"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "2e3bbf93-4983-8ebe-ac68-2ce88acbd5f9"
  stages:
    - stage: path
      stageUuid: "959553b6-b82e-8464-9560-ca224b7f2bd6"
    - stage: trinity
      stageUuid: "be8a124a-fbad-8c66-a694-5c62657abf3a"
    - stage: boundary
      stageUuid: "507b7c1c-e3e1-8fb7-a820-7370e55f37e0"
    - stage: links
      stageUuid: "07415a13-c137-8f99-b949-64fec1e83a48"
    - stage: horo
      stageUuid: "86c5ad8c-1a75-80a1-97c4-a70b967c358b"
    - stage: seal
      stageUuid: "b295882a-9b3f-89ca-a7e3-198e850270d4"
    - stage: uuid
      stageUuid: "7bfdb905-8f1e-85ce-b8f3-28ebb8908869"
version: 2
---
# properties

Properties — real-estate property master per ISO 41001 / ISO 55000.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-41001:2018 facility-management-management-systems`
- `@standard ISO-41011:2017 facility-management-vocabulary`
- `@standard ISO-41013:2017 facility-management-scope`
- `@standard ISO-55000:2014 asset-management property-as-asset`
- `@standard ISO-19650-1:2018 information-management-using-bim`
- `@standard ISO-3166-1:2020 country-codes property-country`
- `@standard ISO-3166-2:2020 subdivision-codes property-region`
- `@standard EN-15978:2011 sustainability-of-construction-works (when ESG-tracked)`

- ISO-41001:2018 facility-management-management-systems
- ISO-41011:2017 facility-management-vocabulary
- ISO-41013:2017 facility-management-scope
- ISO-55000:2014 asset-management property-as-asset
- ISO-19650-1:2018 information-management-using-bim
- ISO-3166-1:2020 country-codes property-country
- ISO-3166-2:2020 subdivision-codes property-region
- NACE-Rev.2 economic-activity-of-occupants
- EN-15978:2011 sustainability-of-construction-works (when ESG-tracked)
- IFRS IAS-16 property-plant-and-equipment owned-property
- IFRS IFRS-16 §22 right-of-use-asset leased-property
- US-GAAP ASC-360 property-plant-and-equipment
- ISO-19011:2018 audit-trail property-master-changes
- SOX §404 internal-controls real-estate-portfolio
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[properties/investment/properties]] · [[Leases]] · [[Spaces]].

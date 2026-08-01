---
name: properties
description: "Use when registering or querying the real-estate portfolio — owned, leased (IFRS-16 ROU), managed, or sublet buildings, sites, and land parcels — with area measurements (IPMS), occupancy, EPC energy rating, BIM reference, and links to spaces, fixed-assets, and leases. The IWMS property master collection."
atomPath: properties
coordinate: "properties · 5/round · 6ab78b41"
contentUuid: "f0657958-2b24-5655-b27f-f6060ef4332d"
diamondUuid: "5fdc42c4-8388-8eef-b8ec-57523177a3b4"
uuid: "6ab78b41-630b-8175-89e7-e5c5a33649f4"
horo: 5
typography:
  partition: properties
  bondDegree: 0
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
  computationUuid: "2451aaa1-da51-8455-ac74-08bb0ca6ef62"
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
      stageUuid: "0997b273-d1b0-836a-962d-e581a8176e00"
    - stage: seal
      stageUuid: "15bac4fd-a2e1-828a-b64c-6673fcd58c6b"
    - stage: uuid
      stageUuid: "42554d85-4465-8100-ae31-1ddaaa5212db"
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

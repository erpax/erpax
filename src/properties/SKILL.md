---
name: properties
description: "Use when registering or querying the real-estate portfolio — owned, leased (IFRS-16 ROU), managed, or sublet buildings, sites, and land parcels — with area measurements (IPMS), occupancy, EPC energy rating, BIM reference, and links to spaces, fixed-assets, and leases. The IWMS property master collection."
atomPath: properties
coordinate: properties · 7/descent · a442e1cf
contentUuid: "55ae256d-6974-52d0-9732-b47569bebbde"
diamondUuid: "8393597e-0bf9-84ef-8230-ce8c7c30ce54"
uuid: "a442e1cf-062d-85be-9b6b-9767f51fe676"
horo: 7
bonds:
  in:
    - leases
    - orders
    - properties
    - requests
    - spaces
  out:
    - leases
    - orders
    - properties
    - requests
    - spaces
typography:
  partition: properties
  bondDegree: 0
  neighbors: []
standards:
  - "EN-15978:2011 sustainability-of-construction-works (when ESG-tracked)"
  - "EU-2011/83"
  - "EU-2014/55"
  - "EU-537/2014"
  - "EU-910/2014"
  - "EU-VAT-Implementing-Reg-282/2011"
  - "IAS-40"
  - "IFRS IAS-16 property-plant-and-equipment owned-property"
  - "IFRS IFRS-16 §22 right-of-use-asset leased-property"
  - "IFRS-13"
  - "ILO-C100"
  - "ISO-19011:2018 audit-trail property-master-changes"
  - "ISO-19650-1:2018 information-management-using-bim"
  - "ISO-3166-1:2020 country-codes property-country"
  - "ISO-3166-2"
  - "ISO-3166-2:2020 subdivision-codes property-region"
  - "ISO-41001"
  - "ISO-41001:2018 facility-management-management-systems"
  - "ISO-41011:2017 facility-management-vocabulary"
  - "ISO-41013:2017 facility-management-scope"
  - "ISO-55000"
  - "ISO-55000:2014 asset-management property-as-asset"
  - NACE
  - "NACE-Rev.2 economic-activity-of-occupants"
  - "SOX §404 internal-controls real-estate-portfolio"
  - "US-GAAP"
  - "US-GAAP ASC-360 property-plant-and-equipment"
bindings: []
neighbors:
  wikilink:
    - leases
    - properties
    - spaces
  matrix:
    - leases
    - orders
    - properties
    - requests
    - spaces
  backlinks:
    - leases
    - orders
    - properties
    - requests
    - spaces
signatures:
  computationUuid: "cfd390f5-8db7-8b07-b140-ac629d867719"
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
      stageUuid: "6734f6d5-53c9-8a22-82a8-c5d2a7300e87"
    - stage: seal
      stageUuid: "15bac4fd-a2e1-828a-b64c-6673fcd58c6b"
    - stage: uuid
      stageUuid: "6befe8fc-6d4c-801e-93f8-01b068d79e7b"
version: 2
---
# properties

Properties — real-estate property master per ISO 41001 / ISO 55000.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
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

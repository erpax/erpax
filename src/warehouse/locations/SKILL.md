---
name: locations
description: "Use when registering or querying physical or logical inventory locations — warehouses, 3PL, retail, bonded, virtual/drop-ship — with bins, GL account defaults, and IAS 2 / ASC 330 cost-flow segregation. The inventory location master for stock tracking and SOX §404 inventory controls."
atomPath: "warehouse/locations"
coordinate: "warehouse/locations · 2/share · e9069e52"
contentUuid: "3c775987-59eb-59c9-b66f-2bd224cbf778"
diamondUuid: "409ae512-b6a8-8efa-bfa1-0fc3e7a390ae"
uuid: "e9069e52-e4dd-8f92-a21d-bc59881ce961"
horo: 2
typography:
  partition: warehouse
  bondDegree: 16
standards:
  - "EN-16931:2017 §BG-15 deliver-to-information"
  - "EN-16931:2017 §BG-15 deliver-to-information`"
  - "IFRS IAS-2 inventories location-tracked"
  - "INCOTERMS-2020"
  - "ISO-3166-1:2020 country-codes location-country"
  - "ISO-3166-1:2020 country-codes location-country`"
  - "ISO-3166-2"
  - "ISO-3166-2:2020 subdivision-codes location-region"
  - "ISO-3166-2:2020 subdivision-codes location-region`"
  - "ISO-6346:2022 freight-container-coding-and-marking"
  - "ISO-6346:2022 freight-container-coding-and-marking`"
  - "SOX §404 internal-controls inventory-segregation"
  - "US-GAAP ASC-330 inventory location-tracked"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "94566eb4-2888-80b5-b351-3a52b1b46d65"
  stages:
    - stage: path
      stageUuid: "ace619dd-85f6-8bbd-8017-68f7403463dd"
    - stage: trinity
      stageUuid: "b5e8d39c-3789-84ed-9ff4-78810b922e63"
    - stage: boundary
      stageUuid: "c1b56c31-01c9-80b7-9db2-8ef7396436c6"
    - stage: links
      stageUuid: "efdb6f1e-25d5-8687-b250-35e9193bede0"
    - stage: horo
      stageUuid: "f61c4b35-9f70-81b6-8e15-18bedc4d4630"
    - stage: seal
      stageUuid: "e20e76d5-f2e9-879e-b889-ac1b2a49a390"
    - stage: uuid
      stageUuid: "378a587d-ea41-888d-8124-bc7fa32ff938"
version: 2
---
# warehouse-locations

Warehouse Locations — physical / logical stock locations.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-3166-1:2020 country-codes location-country`
- `@standard ISO-3166-2:2020 subdivision-codes location-region`
- `@standard ISO-6346:2022 freight-container-coding-and-marking`
- `@standard EN-16931:2017 §BG-15 deliver-to-information`

- ISO-3166-1:2020 country-codes location-country
- ISO-3166-2:2020 subdivision-codes location-region
- ISO-6346:2022 freight-container-coding-and-marking
- EN-16931:2017 §BG-15 deliver-to-information
- IFRS IAS-2 inventories location-tracked
- US-GAAP ASC-330 inventory location-tracked
- ISO-19011:2018 audit-trail location-master-changes
- SOX §404 internal-controls inventory-segregation
- ISO-27001 A.5.23 cloud-service-tenant-isolation

**Law — [[law]]: the inventory location master — every physical or logical place stock can sit, with GL-account defaults that segregate cost-flow for inventory controls.**

Composes: [[warehouse/locations/consignment/arrangements]] · [[gl/accounts]] · [[items/inventory/movements]] · [[Shipments]].

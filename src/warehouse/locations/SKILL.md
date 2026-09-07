---
name: locations
description: "Use when registering or querying physical or logical inventory locations — warehouses, 3PL, retail, bonded, virtual/drop-ship — with bins, GL account defaults, and IAS 2 / ASC 330 cost-flow segregation. The inventory location master for stock tracking and SOX §404 inventory controls."
atomPath: "warehouse/locations"
coordinate: "warehouse/locations · 7/descent · aff5b424"
contentUuid: "29d985b8-6fa7-519f-9ac1-a27ea7b6c3b3"
diamondUuid: "ea51a4aa-e5ac-891c-bead-b877ad5aeb78"
uuid: "aff5b424-d150-80e8-b974-a3289e352816"
horo: 7
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
  computationUuid: "38030191-c759-8f64-bb25-930aa4387d4b"
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
      stageUuid: "4ea36bdc-5820-8260-b59d-18f9908fceec"
    - stage: seal
      stageUuid: "e20e76d5-f2e9-879e-b889-ac1b2a49a390"
    - stage: uuid
      stageUuid: "252a4723-1319-878a-bacd-873f4ff77cba"
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

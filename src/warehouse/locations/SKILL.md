---
name: locations
description: "Use when registering or querying physical or logical inventory locations — warehouses, 3PL, retail, bonded, virtual/drop-ship — with bins, GL account defaults, and IAS 2 / ASC 330 cost-flow segregation. The inventory location master for stock tracking and SOX §404 inventory controls."
atomPath: "warehouse/locations"
coordinate: "warehouse/locations · 2/share · 55077e29"
contentUuid: "9e0a7903-7ca6-505b-b7b3-0b45ef36b2dc"
diamondUuid: "8d7f0d87-1efb-898c-b4e9-15bf336bf8a8"
uuid: "55077e29-a786-8a24-aca3-d86dfc5ba006"
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
  computationUuid: "81d43ba0-61e1-8e03-9cd7-f5e888b13406"
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
      stageUuid: "ff3ab9a3-ed61-8e7f-ac6b-0ce2c6ea935f"
    - stage: seal
      stageUuid: "e20e76d5-f2e9-879e-b889-ac1b2a49a390"
    - stage: uuid
      stageUuid: "d33ad8a8-f028-8141-91d2-e18c2f000ebc"
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

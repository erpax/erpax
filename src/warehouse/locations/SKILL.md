---
name: locations
description: "Use when registering or querying physical or logical inventory locations — warehouses, 3PL, retail, bonded, virtual/drop-ship — with bins, GL account defaults, and IAS 2 / ASC 330 cost-flow segregation. The inventory location master for stock tracking and SOX §404 inventory controls."
atomPath: "warehouse/locations"
coordinate: "warehouse/locations · 4/weave · 0cf8951d"
contentUuid: "b6e5b2b2-4082-55fb-ae48-77e040acca09"
diamondUuid: "911f66d2-70b1-87e1-93f4-beff1149d149"
uuid: "0cf8951d-10a7-825d-ba5a-4af793e51d46"
horo: 4
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
  computationUuid: "ac667981-3048-8798-b7f5-a17a913ea29f"
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
      stageUuid: "6baf8db5-b827-86e0-8a65-b99073c5a935"
    - stage: seal
      stageUuid: "e20e76d5-f2e9-879e-b889-ac1b2a49a390"
    - stage: uuid
      stageUuid: "560659ec-4d41-8b9b-8d84-8d76b3a2b937"
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

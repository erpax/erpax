---
name: locations
description: "Use when registering or querying physical or logical inventory locations — warehouses, 3PL, retail, bonded, virtual/drop-ship — with bins, GL account defaults, and IAS 2 / ASC 330 cost-flow segregation. The inventory location master for stock tracking and SOX §404 inventory controls."
atomPath: warehouse/locations
coordinate: warehouse/locations · 8/crest · 5dad2082
contentUuid: "947bc8d0-d2c0-569c-9390-1027dc37ef06"
diamondUuid: "14054c88-85df-8959-a6e4-c19effff1807"
uuid: "5dad2082-a812-863e-a610-2455bddfa38b"
horo: 8
bonds:
  in:
    - accounts
    - arrangements
    - law
    - movements
    - shipments
  out:
    - accounts
    - arrangements
    - law
    - movements
    - shipments
typography:
  partition: warehouse
  bondDegree: 0
  neighbors: []
standards:
  - "EN-16931:2017 §BG-15 deliver-to-information"
  - "IFRS IAS-2 inventories location-tracked"
  - "INCOTERMS-2020"
  - "ISO-19011:2018 audit-trail location-master-changes"
  - "ISO-3166-1:2020 country-codes location-country"
  - "ISO-3166-2"
  - "ISO-3166-2:2020 subdivision-codes location-region"
  - "ISO-6346:2022 freight-container-coding-and-marking"
  - "SOX §404 internal-controls inventory-segregation"
  - "US-GAAP ASC-330 inventory location-tracked"
bindings: []
neighbors:
  wikilink:
    - accounts
    - arrangements
    - law
    - movements
    - shipments
  matrix:
    - accounts
    - arrangements
    - law
    - movements
    - shipments
  backlinks:
    - accounts
    - arrangements
    - law
    - movements
    - shipments
signatures:
  computationUuid: "d12ba0d9-2ea0-89a9-8202-0956de5af4f5"
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
      stageUuid: "6022e0ad-1e45-8227-93e3-8df455596de9"
    - stage: seal
      stageUuid: "e20e76d5-f2e9-879e-b889-ac1b2a49a390"
    - stage: uuid
      stageUuid: "776b7824-9df9-869f-9ca4-a30f0eca05a6"
version: 2
---
# warehouse-locations

Warehouse Locations — physical / logical stock locations.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
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

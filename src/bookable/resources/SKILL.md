---
name: resources
description: "Use when cataloguing or querying reservable assets — rooms, vehicles, equipment, beds, machinery, parking, co-working desks, time slots — across hospitality, fleet, facility management or field-service; rate ladders, availability windows, yield management, GL/tax linkage. The agnostic resource-booking master — pairs with bookings."
atomPath: bookable/resources
coordinate: bookable/resources · 8/crest · 9d3ba530
contentUuid: "fa3364e7-e5f4-5124-ab7e-67a097bed7bd"
diamondUuid: "47e5e56f-8e22-849a-91d3-a0c81de0e708"
uuid: "9d3ba530-2c87-852a-8eeb-7ba614ba0604"
horo: 8
bonds:
  in:
    - accounting
    - bookings
    - commerce
    - currency
    - identity
    - law
    - proof
    - requests
    - schedule
  out:
    - accounting
    - bookings
    - commerce
    - currency
    - identity
    - law
    - proof
    - requests
    - schedule
typography:
  partition: bookable
  bondDegree: 29
  neighbors: []
standards:
  - "COSO-ERM-2017"
  - "EU-2014/55"
  - "EU-2015/847"
  - "EU-2015/849"
  - "EU-2017/1132"
  - "EU-2017/828"
  - "EU-2018/1673"
  - "EU-2018/1725"
  - "EU-2018/302"
  - "EU-2018/389-SCA-RTS"
  - "EU-2018/843"
  - "EU-2018/957"
  - "EU-2019/1150"
  - "EU-2019/1152"
  - "EU-2019/1937"
  - "EU-2019/2161"
  - "EU-2019/770"
  - "EU-2019/771"
  - "EU-537/2014"
  - "EU-910/2014"
  - "EU-Intrastat-Reg-2019/2152"
  - "EU-Taxonomy-2020/852"
  - "ILO-C001"
  - "ILO-C100"
  - "ISO-18513:2021 tourism-services-vocabulary (when kind=hotel_room)"
  - "ISO-19011:2018 audit-trail resource-master-changes"
  - "ISO-3166-1"
  - "ISO-3166-1:2020 country-codes resource-country"
  - "ISO-41001"
  - "ISO-41001:2018 facility-management bookable-spaces"
  - "ISO-4217"
  - "ISO-4217:2015 currency-codes pricing"
  - "ISO-55000"
  - "ISO-55000:2014 asset-management resource-as-asset"
  - "ISO-8601-1"
  - "ISO-8601-1:2019 date-time availability-windows"
  - "RFC-5545"
  - "SOX §404 internal-controls revenue-completeness"
  - "US-CTA-2021"
bindings: []
neighbors:
  wikilink:
    - accounting
    - bookings
    - commerce
    - currency
    - identity
    - law
    - proof
  matrix:
    - accounting
    - bookings
    - commerce
    - currency
    - identity
    - law
    - proof
    - requests
    - schedule
  backlinks:
    - accounting
    - bookings
    - commerce
    - currency
    - identity
    - law
    - proof
    - requests
    - schedule
signatures:
  computationUuid: "8418b482-a5e8-87c2-aa7c-68bb324e2ff5"
  stages:
    - stage: path
      stageUuid: "f77a0aee-62e8-8424-bbc2-50584a8581f8"
    - stage: trinity
      stageUuid: "9a22e305-0155-88d4-9ad3-b6d3d3551285"
    - stage: boundary
      stageUuid: "4d152117-928d-81ec-a1e2-f6389d88928a"
    - stage: links
      stageUuid: "653f04e6-f340-8b45-92d9-1d0b91b2231a"
    - stage: horo
      stageUuid: "8575fc00-fc59-8742-96d1-4c8b92d8c7bd"
    - stage: seal
      stageUuid: "6b3a345e-3bb1-8a14-951f-f8e3d62d9855"
    - stage: uuid
      stageUuid: "b3dd9548-9db0-87ea-a72f-def9849bd49f"
version: 2
---
# bookable-resources

Bookable Resources — catalog of anything reservable (rooms, vehicles,.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISO-18513:2021 tourism-services-vocabulary (when kind=hotel_room)
- ISO-3166-1:2020 country-codes resource-country
- ISO-4217:2015 currency-codes pricing
- ISO-8601-1:2019 date-time availability-windows
- ISO-55000:2014 asset-management resource-as-asset
- ISO-41001:2018 facility-management bookable-spaces
- ISO-19011:2018 audit-trail resource-master-changes
- SOX §404 internal-controls revenue-completeness
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[Bookings]] · [[accounting]] · [[commerce]] · [[currency]] · [[identity]] · [[proof]].

**Law — [[law]]: a bookable-resource is the agnostic master of anything reservable — one resource node (room, vehicle, equipment, slot) carrying its rate ladder and availability, paired with its [[bookable/resources/bookings]].**

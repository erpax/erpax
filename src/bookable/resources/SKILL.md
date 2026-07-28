---
name: resources
description: "Use when cataloguing or querying reservable assets — rooms, vehicles, equipment, beds, machinery, parking, co-working desks, time slots — across hospitality, fleet, facility management or field-service; rate ladders, availability windows, yield management, GL/tax linkage. The agnostic resource-booking master — pairs with bookings."
atomPath: "bookable/resources"
coordinate: "bookable/resources · 1/base · ce5385c5"
contentUuid: "e97f2fa5-80f4-55b4-a75a-2b362f9e03f4"
diamondUuid: "58788faa-e42d-87b0-869b-706f31bb3e7c"
uuid: "ce5385c5-344a-8e2b-b215-829c9de369ac"
horo: 1
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
  - "EU-2017/1132"
  - "EU-2017/828"
  - "EU-2018/1673"
  - "EU-2018/1725"
  - "EU-2018/302"
  - "EU-2018/389-SCA-RTS"
  - "EU-2018/843"
  - "EU-2018/957"
  - "EU-537/2014"
  - "EU-910/2014"
  - "EU-Taxonomy-2020/852"
  - "ILO-C100"
  - "ISO-18513:2021 tourism-services-vocabulary (when kind=hotel_room)"
  - "ISO-18513:2021 tourism-services-vocabulary (when kind=hotel_room)`"
  - "ISO-3166-1"
  - "ISO-3166-1:2020 country-codes resource-country"
  - "ISO-3166-1:2020 country-codes resource-country`"
  - "ISO-41001"
  - "ISO-41001:2018 facility-management bookable-spaces"
  - "ISO-41001:2018 facility-management bookable-spaces`"
  - "ISO-4217:2015 currency-codes pricing"
  - "ISO-4217:2015 currency-codes pricing`"
  - "ISO-55000"
  - "ISO-55000:2014 asset-management resource-as-asset"
  - "ISO-55000:2014 asset-management resource-as-asset`"
  - "ISO-8601-1:2019 date-time availability-windows"
  - "ISO-8601-1:2019 date-time availability-windows`"
  - "RFC-5545"
  - "SOX §404 internal-controls revenue-completeness"
  - "US-CTA-2021"
  - "— the instrument reads SKILL.md) -->"
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
  computationUuid: "92fe5f04-9b2d-87cb-80c2-f546441c32a8"
  stages:
    - stage: path
      stageUuid: "f77a0aee-62e8-8424-bbc2-50584a8581f8"
    - stage: trinity
      stageUuid: "9a22e305-0155-88d4-9ad3-b6d3d3551285"
    - stage: boundary
      stageUuid: "3e8c3802-93ec-8382-8cb6-436c30356ceb"
    - stage: links
      stageUuid: "653f04e6-f340-8b45-92d9-1d0b91b2231a"
    - stage: horo
      stageUuid: "1977a811-b9a9-88c9-b7f0-472c6a321867"
    - stage: seal
      stageUuid: "6b3a345e-3bb1-8a14-951f-f8e3d62d9855"
    - stage: uuid
      stageUuid: "328b4534-97d7-88ff-8a9b-182f685a5e41"
version: 2
---
# bookable-resources

Bookable Resources — catalog of anything reservable (rooms, vehicles,.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-18513:2021 tourism-services-vocabulary (when kind=hotel_room)`
- `@standard ISO-3166-1:2020 country-codes resource-country`
- `@standard ISO-4217:2015 currency-codes pricing`
- `@standard ISO-8601-1:2019 date-time availability-windows`
- `@standard ISO-55000:2014 asset-management resource-as-asset`
- `@standard ISO-41001:2018 facility-management bookable-spaces`

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

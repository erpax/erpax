---
name: resources
description: "Use when cataloguing or querying reservable assets — rooms, vehicles, equipment, beds, machinery, parking, co-working desks, time slots — across hospitality, fleet, facility management or field-service; rate ladders, availability windows, yield management, GL/tax linkage. The agnostic resource-booking master — pairs with bookings."
atomPath: "bookable/resources"
coordinate: "bookable/resources · 1/base · 8840a6b5"
contentUuid: "31905359-f31a-5e44-99a3-402a684a72c5"
diamondUuid: "61068116-26df-8503-ad47-15f9c6118554"
uuid: "8840a6b5-04f2-8038-aaef-1cffca785ef9"
horo: 1
typography:
  partition: bookable
  bondDegree: 29
standards:
  - "COSO-ERM-2017"
  - "EU-537/2014"
  - "EU-910/2014"
  - "EU-Taxonomy-2020/852"
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
signatures:
  computationUuid: "9d315b7b-556e-8831-aa2b-e0e4142e761a"
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
      stageUuid: "6e3ff0c2-14ac-830c-a402-5f6d635d8d77"
    - stage: seal
      stageUuid: "6b3a345e-3bb1-8a14-951f-f8e3d62d9855"
    - stage: uuid
      stageUuid: "591480c2-d41c-8aef-8742-9773fe678fac"
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

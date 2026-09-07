---
name: resources
description: "Use when cataloguing or querying reservable assets — rooms, vehicles, equipment, beds, machinery, parking, co-working desks, time slots — across hospitality, fleet, facility management or field-service; rate ladders, availability windows, yield management, GL/tax linkage. The agnostic resource-booking master — pairs with bookings."
atomPath: "bookable/resources"
coordinate: "bookable/resources · 8/crest · bb7839b3"
contentUuid: "34ab0cc3-07ee-5017-8666-033cdf766230"
diamondUuid: "95a317e4-2ef2-8ec5-842c-61850cca8b78"
uuid: "bb7839b3-ee9a-8395-8d20-1623d94aaf90"
horo: 8
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
  computationUuid: "ae02c5e2-41a6-8f2c-81c4-daaa935f043b"
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
      stageUuid: "0644cb05-a42a-840c-aed4-10c7635a8dbe"
    - stage: seal
      stageUuid: "6b3a345e-3bb1-8a14-951f-f8e3d62d9855"
    - stage: uuid
      stageUuid: "684fd206-d412-8625-a387-439fb1d80adf"
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

---
name: packages
description: "Use when modelling the packing hierarchy for a shipment — GS1 SSCC serial shipping container codes, self-referential nesting (pallet → carton → contents), dimensions/weight, item-lot lines, and UN/CEFACT packaging codes. The logistic handling-unit collection that links line items to a shipment."
atomPath: "items/packages"
coordinate: "items/packages · 4/weave · 0265a2a5"
contentUuid: "963b5fb9-021b-53a8-97ac-ddd5f0b44056"
diamondUuid: "7f12c6fb-9ba5-83ca-b4f7-146208f4fbed"
uuid: "0265a2a5-4038-8ac4-b830-1d6c18df0f8f"
horo: 4
bonds:
  in:
    - access
    - accounting
    - collections
    - fields
    - hooks
    - items
    - law
    - shipments
    - standard
  out:
    - access
    - accounting
    - collections
    - fields
    - hooks
    - items
    - law
    - shipments
    - standard
typography:
  partition: items
  bondDegree: 27
  neighbors: []
standards:
  - "GS1 General Specifications AI(00) SSCC serial-shipping-container-code"
  - GS1 Logistic Label
  - "ISO-8601-1:2019 date-time"
  - "ISO-8601-1:2019 date-time`"
  - "ISO/IEC 15459-1:2014 unique-identification transport-units"
  - "ISO/IEC 15459-1:2014 unique-identification transport-units`"
  - "UN-CEFACT"
  - "UN/CEFACT Recommendation 21 packaging-codes"
  - "— the instrument reads SKILL.md) -->"
bindings: []
neighbors:
  wikilink:
    - access
    - accounting
    - collections
    - fields
    - hooks
    - law
    - standard
  matrix:
    - access
    - accounting
    - collections
    - fields
    - hooks
    - items
    - law
    - shipments
    - standard
  backlinks:
    - access
    - accounting
    - collections
    - fields
    - hooks
    - items
    - law
    - shipments
    - standard
signatures:
  computationUuid: "95016987-b27f-840c-aef4-705d7abe8274"
  stages:
    - stage: path
      stageUuid: "8ea3744e-cdbf-8fe2-bf73-27dfdf390c3c"
    - stage: trinity
      stageUuid: "d837c175-52e7-8d24-921e-c09d31abe098"
    - stage: boundary
      stageUuid: "7053e3a2-71a3-8f3e-9a66-64ba44a34654"
    - stage: links
      stageUuid: "f943572b-3056-8ee6-afb4-424b3fa8d926"
    - stage: horo
      stageUuid: "cd44a889-b280-8522-957e-bed3f49a7b7a"
    - stage: seal
      stageUuid: "081d58aa-fd09-87d9-9fb9-eb4d41bb2be6"
    - stage: uuid
      stageUuid: "3215bb3b-9697-88a6-a059-86b20fbf661a"
version: 2
---
# packages

Packages — logistic handling units (pallet / carton / case …) with SSCC.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO/IEC 15459-1:2014 unique-identification transport-units`
- `@standard ISO-8601-1:2019 date-time`

- GS1 General Specifications AI(00) SSCC serial-shipping-container-code
- ISO/IEC 15459-1:2014 unique-identification transport-units
- GS1 Logistic Label
- ISO-8601-1:2019 date-time
- UN/CEFACT Recommendation 21 packaging-codes
- ISO-19011:2018 audit-trail packing-evidence
- ISO-27001 A.5.23 cloud-service-tenant-isolation

**Law — [[law]]: a logistic handling unit identified by a unique SSCC, self-nesting (pallet → carton → contents), binding item-lot lines to one shipment.**

Composes: [[collections]] · [[fields]] · [[access]] · [[hooks]] · [[accounting]] · [[standard]].

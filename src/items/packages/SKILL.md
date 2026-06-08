---
name: packages
description: "Use when modelling the packing hierarchy for a shipment — GS1 SSCC serial shipping container codes, self-referential nesting (pallet → carton → contents), dimensions/weight, item-lot lines, and UN/CEFACT packaging codes. The logistic handling-unit collection that links line items to a shipment."
atomPath: items/packages
coordinate: items/packages · 4/weave · 14aa72e1
contentUuid: "cec27954-cd11-57ec-bc56-fb89d49d86da"
diamondUuid: "cbf40205-2216-877c-97f8-c93b9b47a2a2"
uuid: "14aa72e1-bdee-8667-b964-e8ff3ca37414"
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
  - "EU-2014/55"
  - "EU-537/2014"
  - "EU-910/2014"
  - "GS1 General Specifications AI(00) SSCC serial-shipping-container-code"
  - GS1 Logistic Label
  - "ISO-19011:2018 audit-trail packing-evidence"
  - "ISO-8601-1:2019 date-time"
  - "ISO/IEC 15459-1:2014 unique-identification transport-units"
  - "UN-CEFACT"
  - "UN/CEFACT Recommendation 21 packaging-codes"
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
  computationUuid: "8413312f-3518-8e71-ad5a-50255ae7f9ca"
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
      stageUuid: "6502e723-c9a5-8fb4-82c4-e0072a35e8cf"
    - stage: seal
      stageUuid: "081d58aa-fd09-87d9-9fb9-eb4d41bb2be6"
    - stage: uuid
      stageUuid: "50a5f1aa-d957-855d-b6d1-35001dbea03e"
version: 2
---
# packages

Packages — logistic handling units (pallet / carton / case …) with SSCC.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- GS1 General Specifications AI(00) SSCC serial-shipping-container-code
- ISO/IEC 15459-1:2014 unique-identification transport-units
- GS1 Logistic Label
- ISO-8601-1:2019 date-time
- UN/CEFACT Recommendation 21 packaging-codes
- ISO-19011:2018 audit-trail packing-evidence
- ISO-27001 A.5.23 cloud-service-tenant-isolation

**Law — [[law]]: a logistic handling unit identified by a unique SSCC, self-nesting (pallet → carton → contents), binding item-lot lines to one shipment.**

Composes: [[collections]] · [[fields]] · [[access]] · [[hooks]] · [[accounting]] · [[standard]].

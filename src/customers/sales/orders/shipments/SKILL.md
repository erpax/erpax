---
name: shipments
description: "Use when dispatching goods against a sales order — recording carrier, tracking number and URL, line items shipped, ship-from/to addresses, and progressing through picked → packed → shipped → delivered states. The fulfillment and carrier-tracking collection per EN-16931 §BG-13."
atomPath: customers/sales/orders/shipments
coordinate: customers/sales/orders/shipments · 8/crest · f19a48fb
contentUuid: "9c665640-86a9-50c9-b8b9-eb3fa13d7091"
diamondUuid: "fa5c8556-0530-841e-ac09-2036583b6f78"
uuid: "f19a48fb-fd95-8e92-a3ea-e09d79af0d10"
horo: 8
bonds:
  in:
    - declarations
    - events
    - law
    - locations
    - orders
    - packages
    - shipment
    - standard
  out:
    - declarations
    - events
    - law
    - locations
    - orders
    - packages
    - shipment
    - standard
typography:
  partition: customers
  bondDegree: 0
  neighbors: []
standards:
  - "COSO-ERM-2017"
  - "EN-16931"
  - "EN-16931:2017 §BG-13 delivery-information"
  - "EU-2017/1132"
  - "EU-2017/828"
  - "EU-UCC"
  - "INCOTERMS-2020"
  - "ISO-19011:2018 audit-trail fulfillment-evidence"
  - "ISO-3166-1:2020 country-codes ship-from ship-to"
  - "ISO-8601-1:2019 date-time shipped-at delivered-at"
  - "ISO-9735"
  - "SOX §404 internal-controls dispatch-controls"
  - "WCO-HS"
bindings: []
neighbors:
  wikilink:
    - declarations
    - events
    - law
    - packages
    - standard
  matrix:
    - declarations
    - events
    - law
    - locations
    - orders
    - packages
    - shipment
    - standard
  backlinks:
    - declarations
    - events
    - law
    - locations
    - orders
    - packages
    - shipment
    - standard
signatures:
  computationUuid: "2101db39-100a-8c5e-ae9f-8bac20434a06"
  stages:
    - stage: path
      stageUuid: "ca8e7be6-59bd-8dde-93a8-ace0ba50a476"
    - stage: trinity
      stageUuid: "099d9fa2-4f0b-83d8-928d-92619fa54948"
    - stage: boundary
      stageUuid: "063d7e62-c24b-8245-a5e1-e4b1f0a14235"
    - stage: links
      stageUuid: "09a5c83b-2dd3-81d1-8d4e-ed9edf0d3115"
    - stage: horo
      stageUuid: "6ba6a8cd-3905-86b6-956f-3ba247965a62"
    - stage: seal
      stageUuid: "5511df6e-d635-835e-a514-e8f79c8558c0"
    - stage: uuid
      stageUuid: "2596ef8b-9081-8e77-a389-d636b6ce3a7c"
version: 2
---
# shipments

Shipments — fulfillment + carrier tracking.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISO-8601-1:2019 date-time shipped-at delivered-at
- EN-16931:2017 §BG-13 delivery-information
- ISO-3166-1:2020 country-codes ship-from ship-to
- ISO-19011:2018 audit-trail fulfillment-evidence
- SOX §404 internal-controls dispatch-controls

Composes: [[Packages]] · [[customers/sales/orders/shipments/tracking/events]] · [[standard]] · [[customers/sales/orders/shipments/customs/declarations]].

**Law — [[law]]: a shipment dispatches only goods owed by its sales order, advances state monotonically picked→packed→shipped→delivered, and cannot be delivered before it is shipped.**

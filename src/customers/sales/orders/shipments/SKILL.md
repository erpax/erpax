---
name: shipments
description: "Use when dispatching goods against a sales order — recording carrier, tracking number and URL, line items shipped, ship-from/to addresses, and progressing through picked → packed → shipped → delivered states. The fulfillment and carrier-tracking collection per EN-16931 §BG-13."
atomPath: "customers/sales/orders/shipments"
coordinate: "customers/sales/orders/shipments · 1/base · 170bb8ae"
contentUuid: "be368d4a-421e-5eb6-a037-135859a8b260"
diamondUuid: "dc6a9992-9324-8302-ae4c-579053829746"
uuid: "170bb8ae-b0f1-8b16-8c9a-2368b1a5ec9b"
horo: 1
typography:
  partition: customers
  bondDegree: 26
standards:
  - "COSO-ERM-2017"
  - "EN-16931"
  - "EN-16931:2017 §BG-13 delivery-information"
  - "EN-16931:2017 §BG-13 delivery-information`"
  - "EU-UCC"
  - "INCOTERMS-2020"
  - "ISO-3166-1:2020 country-codes ship-from ship-to"
  - "ISO-3166-1:2020 country-codes ship-from ship-to`"
  - "ISO-8601-1:2019 date-time shipped-at delivered-at"
  - "ISO-8601-1:2019 date-time shipped-at delivered-at`"
  - "ISO-9735"
  - "SOX §404 internal-controls dispatch-controls"
  - "WCO-HS"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "8c116aa4-0740-8494-9b3f-c8ca747339fb"
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
      stageUuid: "743e3ebe-e9f2-8f1d-a34a-a4357e4649aa"
    - stage: seal
      stageUuid: "5511df6e-d635-835e-a514-e8f79c8558c0"
    - stage: uuid
      stageUuid: "26dcac80-04c7-88cd-8a0a-66aa0ff7152c"
version: 2
---
# shipments

Shipments — fulfillment + carrier tracking.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-8601-1:2019 date-time shipped-at delivered-at`
- `@standard EN-16931:2017 §BG-13 delivery-information`
- `@standard ISO-3166-1:2020 country-codes ship-from ship-to`

- ISO-8601-1:2019 date-time shipped-at delivered-at
- EN-16931:2017 §BG-13 delivery-information
- ISO-3166-1:2020 country-codes ship-from ship-to
- ISO-19011:2018 audit-trail fulfillment-evidence
- SOX §404 internal-controls dispatch-controls

Composes: [[Packages]] · [[customers/sales/orders/shipments/tracking/events]] · [[standard]] · [[customers/sales/orders/shipments/customs/declarations]].

**Law — [[law]]: a shipment dispatches only goods owed by its sales order, advances state monotonically picked→packed→shipped→delivered, and cannot be delivered before it is shipped.**

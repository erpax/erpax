---
name: shipments
description: "Use when dispatching goods against a sales order — recording carrier, tracking number and URL, line items shipped, ship-from/to addresses, and progressing through picked → packed → shipped → delivered states. The fulfillment and carrier-tracking collection per EN-16931 §BG-13."
atomPath: "customers/sales/orders/shipments"
coordinate: "customers/sales/orders/shipments · 2/share · d38aa7be"
contentUuid: "02419478-12a8-5ad3-b0fb-34470667332b"
diamondUuid: "d7ae3319-4e8b-8416-80db-2bfd491bf41b"
uuid: "d38aa7be-68fd-86e6-9f38-03617d38a70b"
horo: 2
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
  computationUuid: "13bc3bf7-48d7-80de-a2df-11c22e10be9f"
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
      stageUuid: "8b030861-4149-8107-ac3a-06db04c398de"
    - stage: seal
      stageUuid: "5511df6e-d635-835e-a514-e8f79c8558c0"
    - stage: uuid
      stageUuid: "51c3bf52-da34-8eaf-a5ae-d9f4e63fdf0d"
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

---
name: orders
description: "Use when recording or progressing a customer order — from quote conversion through confirmation, partial fulfillment, invoicing, and closure; track order lines, delivery dates, shipping and billing addresses, and fulfillment progress. The O2C customer-order register (UBL-2.1 / UN-EDIFACT ORDERS / Peppol BIS-3.0), distinct from purchase-orders (P2P)."
atomPath: "customers/sales/orders"
coordinate: "customers/sales/orders · 8/crest · 0555f398"
contentUuid: "74103c64-aec9-5028-8286-e2885a9d241e"
diamondUuid: "44f935c1-1382-85cf-ad8e-ddc540e29481"
uuid: "0555f398-b341-8588-aeed-dda44f5e630d"
horo: 8
typography:
  partition: customers
  bondDegree: 96
standards:
  - "ASC-606"
  - "COSO-ERM-2017"
  - "EN-16931"
  - "EN-16931:2017"
  - "EN-16931:2017 §BG-13 delivery-information (downstream of the order)"
  - "EN-16931:2017 §BG-13 delivery-information (downstream of the order)`"
  - "EU-Directive-2006/112/EC"
  - "EU-UCC"
  - "EU-VAT-Directive 2006/112/EC supply-of-goods-or-services"
  - "IFRS IAS-1 presentation-of-financial-statements"
  - "IFRS IFRS-15 §10 contract-with-customer (order = contract or modification)"
  - "IFRS IFRS-15 §31 transfer-of-control"
  - "IFRS-15"
  - "INCOTERMS-2020"
  - "ISO-9735"
  - "Peppol-BIS-3.0"
  - "Peppol-BIS-3.0 Order ordering-process"
  - "UBL-2.1"
  - "UBL-2.1 Order document-schema"
  - "UN-EDIFACT ORDERS d96a customer-order"
  - "UN-EDIFACT ORDRSP d96a order-response"
  - "UN-EDIFACT-ORDERS-d96a"
  - "US-GAAP ASC-606 revenue-from-contracts"
  - "WCO-HS"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "7c91d51c-545a-8ee3-9a75-5a1d83aad6a8"
  stages:
    - stage: path
      stageUuid: "5c34a03f-a43b-89db-9e2d-711268cc5a2b"
    - stage: trinity
      stageUuid: "3411ea87-c511-8e38-8bd4-43710c6a32d5"
    - stage: boundary
      stageUuid: "0c46e9f3-0e77-8484-80e1-03d7019d3de4"
    - stage: links
      stageUuid: "31265c36-810c-88c8-8c26-becd09f1595f"
    - stage: horo
      stageUuid: "bf3760b1-453b-86e3-b152-ac22af8cba31"
    - stage: seal
      stageUuid: "d26ecb74-da97-8151-b843-1839acad68d9"
    - stage: uuid
      stageUuid: "b3b4dc1d-0e9b-8afa-9d2f-0f73042653e9"
version: 2
---
# sales-orders

Sales Orders — customer-side O2C order register (distinct from purchase-orders).

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard EN-16931:2017 §BG-13 delivery-information (downstream of the order)`

- UBL-2.1 Order document-schema
- UN-EDIFACT ORDERS d96a customer-order
- UN-EDIFACT ORDRSP d96a order-response
- Peppol-BIS-3.0 Order ordering-process
- EN-16931:2017 §BG-13 delivery-information (downstream of the order)
- IFRS IAS-1 presentation-of-financial-statements
- IFRS IFRS-15 §10 contract-with-customer (order = contract or modification)
- IFRS IFRS-15 §31 transfer-of-control
- US-GAAP ASC-606 revenue-from-contracts
- EU-VAT-Directive 2006/112/EC supply-of-goods-or-services
- ISO-19011:2018 audit-trail
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[Contracts]] · [[Quotes]] · [[Returns]] · [[Shipments]].

**Law — [[law]]: a sales order progresses only forward through its O2C lifecycle, and fulfilled and invoiced quantities can never exceed the confirmed order-line quantities.**

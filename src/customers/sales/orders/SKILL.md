---
name: orders
description: "Use when recording or progressing a customer order — from quote conversion through confirmation, partial fulfillment, invoicing, and closure; track order lines, delivery dates, shipping and billing addresses, and fulfillment progress. The O2C customer-order register (UBL-2.1 / UN-EDIFACT ORDERS / Peppol BIS-3.0), distinct from purchase-orders (P2P)."
atomPath: "customers/sales/orders"
coordinate: "customers/sales/orders · 2/share · 9564d826"
contentUuid: "45df57e2-00ff-5597-a82b-5a5ace5390f0"
diamondUuid: "04d69b6b-8f87-89e4-bf5a-7d0f21a3182b"
uuid: "9564d826-f397-88f3-9643-4d42fbec10b2"
horo: 2
typography:
  partition: customers
  bondDegree: 89
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
  computationUuid: "8dc86ebc-a048-8ad6-bc82-aff08710ee56"
  stages:
    - stage: path
      stageUuid: "5c34a03f-a43b-89db-9e2d-711268cc5a2b"
    - stage: trinity
      stageUuid: "3411ea87-c511-8e38-8bd4-43710c6a32d5"
    - stage: boundary
      stageUuid: "b238d4bb-f357-8410-88ce-14b63a844d9d"
    - stage: links
      stageUuid: "31265c36-810c-88c8-8c26-becd09f1595f"
    - stage: horo
      stageUuid: "d372f9d9-feaa-86da-9ff3-b3f8782f247a"
    - stage: seal
      stageUuid: "d26ecb74-da97-8151-b843-1839acad68d9"
    - stage: uuid
      stageUuid: "1305cb81-5a02-89fb-aa0d-cb7642ea080b"
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

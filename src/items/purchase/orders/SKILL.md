---
name: orders
description: "Use when raising or reviewing a vendor purchase commitment — line items, Incoterms 2020 delivery terms and location (FOB/CIF/DDP/EXW), order/due dates, currency, and SOX three-way-match (PO → goods receipt → invoice). The procure-to-pay header that gates GL posting timing by FOB point per IFRS-15 §38-42."
atomPath: items/purchase/orders
coordinate: items/purchase/orders · 2/share · 34b025bb
contentUuid: "0bd31e5b-952f-5ad4-909d-383c94f70579"
diamondUuid: "e89e2a94-712d-843f-adad-9f9368d6753f"
uuid: "34b025bb-5eb3-8a5f-900b-b0e35c3684fd"
horo: 2
bonds:
  in:
    - accounting
    - allocation
    - duality
    - fractal
    - hooks
    - horo
    - law
    - materials
    - orders
    - packs
    - party
    - purchase
    - receipts
    - routings
    - runs
    - shift
    - shifts
    - standard
    - utility
    - variances
  out:
    - accounting
    - allocation
    - duality
    - fractal
    - hooks
    - horo
    - law
    - materials
    - orders
    - packs
    - party
    - receipts
    - routings
    - runs
    - shift
    - shifts
    - standard
    - utility
    - variances
typography:
  partition: items
  bondDegree: 0
  neighbors: []
standards:
  - "EN-16931:2017 §BG-13 buyer-reference"
  - "IFRS IAS-37 provisions-and-contingent-liabilities commitment"
  - "IFRS-15 §38-42 GL-posting-timing FOB-point-substantiation"
  - "IFRS-15 §38-42 revenue-recognition FOB-driven-GL-posting-timing"
  - "INCOTERMS-2020"
  - "INCOTERMS-2020 delivery-responsibility-consistency"
  - "INCOTERMS-2020 delivery-terms-and-risk-transfer"
  - "ISO-19011:2018 audit-trail purchase-commitment"
  - "ISO-4217:2015 currency-codes"
  - "ISO-8601-1:2019 date-time order-date due-date"
  - "ISO-9735"
  - "SOX §404 internal-controls three-way-match"
  - "UN-EDIFACT ORDERS d96a"
  - "US-GAAP ASC 405 liabilities accounts-payable"
bindings: []
neighbors:
  wikilink:
    - accounts
    - commitments
    - invoices
    - items
    - law
    - receipts
  matrix:
    - accounting
    - allocation
    - duality
    - fractal
    - hooks
    - horo
    - law
    - materials
    - orders
    - packs
    - party
    - receipts
    - routings
    - runs
    - shift
    - shifts
    - standard
    - utility
    - variances
  backlinks:
    - accounting
    - allocation
    - duality
    - fractal
    - hooks
    - horo
    - law
    - materials
    - orders
    - packs
    - party
    - receipts
    - routings
    - runs
    - shift
    - shifts
    - standard
    - utility
    - variances
signatures:
  computationUuid: "7082b793-47e9-81fc-be7e-d83c452b60f4"
  stages:
    - stage: path
      stageUuid: "49cf6b73-1636-8513-8828-faf9fe67178e"
    - stage: trinity
      stageUuid: "56a4fc82-772a-84fe-bbb4-15b2b099e186"
    - stage: boundary
      stageUuid: "1a36120e-4279-8a2f-8cda-465eacb68b00"
    - stage: links
      stageUuid: "06733905-1ce6-800c-a7ae-d2cec55bfd2a"
    - stage: horo
      stageUuid: "47b9edda-e85b-8779-853c-1c704761974e"
    - stage: seal
      stageUuid: "f83526b5-a4ba-8a1a-8b15-45767398a915"
    - stage: uuid
      stageUuid: "68ff0fba-c920-8d5b-8753-b6475f05b7c8"
version: 2
---
# purchase-orders

Purchase Orders — first leg of three-way match (PO ↔ receipt ↔ invoice).

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISO-8601-1:2019 date-time order-date due-date
- ISO-4217:2015 currency-codes
- EN-16931:2017 §BG-13 buyer-reference
- UN-EDIFACT ORDERS d96a
- INCOTERMS-2020 delivery-terms-and-risk-transfer
- IFRS IAS-37 provisions-and-contingent-liabilities commitment
- IFRS-15 §38-42 revenue-recognition FOB-driven-GL-posting-timing
- US-GAAP ASC 405 liabilities accounts-payable
- ISO-19011:2018 audit-trail purchase-commitment
- IFRS-15 §38-42 GL-posting-timing FOB-point-substantiation
- SOX §404 internal-controls three-way-match
- INCOTERMS-2020 delivery-responsibility-consistency
- ISO-27002 §5.4 segregation-of-duties requester-vs-approver

Composes: [[commitments]] · [[items/purchase/orders/goods/receipts]] · [[Items]] · [[gl/accounts]] · [[Invoices]].

**Law — [[law]]: a purchase order is the vendor purchase commitment and first leg of the three-way match (PO → [[items/purchase/orders/goods/receipts|receipt]] → invoice), whose Incoterms FOB point gates the timing of GL posting (IFRS-15 §38-42).**

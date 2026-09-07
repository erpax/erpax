---
name: orders
description: "Use when raising or reviewing a vendor purchase commitment — line items, Incoterms 2020 delivery terms and location (FOB/CIF/DDP/EXW), order/due dates, currency, and SOX three-way-match (PO → goods receipt → invoice). The procure-to-pay header that gates GL posting timing by FOB point per IFRS-15 §38-42."
atomPath: "items/purchase/orders"
coordinate: "items/purchase/orders · 2/share · 0dc61a18"
contentUuid: "1ab34717-fcd8-55e9-88df-277e9b7aeabf"
diamondUuid: "5e643339-17a5-8459-884c-4dfd4d82ea2b"
uuid: "0dc61a18-7c6b-8b9e-88bd-6ba100431e3a"
horo: 2
typography:
  partition: items
  bondDegree: 78
standards:
  - "EN-16931:2017 §BG-13 buyer-reference"
  - "EN-16931:2017 §BG-13 buyer-reference`"
  - "IFRS IAS-37 provisions-and-contingent-liabilities commitment"
  - "IFRS-15 §38-42 revenue-recognition FOB-driven-GL-posting-timing"
  - "INCOTERMS-2020"
  - "INCOTERMS-2020 delivery-responsibility-consistency"
  - "INCOTERMS-2020 delivery-terms-and-risk-transfer"
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 currency-codes`"
  - "ISO-8601-1:2019 date-time order-date due-date"
  - "ISO-8601-1:2019 date-time order-date due-date`"
  - "ISO-9735"
  - "SOX §404 internal-controls three-way-match"
  - "UN-EDIFACT ORDERS d96a"
  - "US-GAAP ASC 405 liabilities accounts-payable"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "7ddf9bfa-bef0-80f5-9af0-f6b28e91c6fe"
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
      stageUuid: "4d9bb5bc-d0b9-8975-9fa7-e7007117d167"
    - stage: seal
      stageUuid: "f83526b5-a4ba-8a1a-8b15-45767398a915"
    - stage: uuid
      stageUuid: "fcf7567c-006d-82f6-b76d-838786801bd9"
version: 2
---
# purchase-orders

Purchase Orders — first leg of three-way match (PO ↔ receipt ↔ invoice).

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-8601-1:2019 date-time order-date due-date`
- `@standard ISO-4217:2015 currency-codes`
- `@standard EN-16931:2017 §BG-13 buyer-reference`

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

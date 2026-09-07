---
name: receipts
description: "Use when confirming vendor goods arrival — receipt number, purchase order link, received-at date, line quantities, and GL accrual (debit inventory/credit AP) per IAS-2 §10, with revenue timing deferred to the FOB point per IFRS-15 §38-42. The second leg of the SOX three-way match that separates inventory accrual from revenue recognition."
atomPath: "items/purchase/orders/goods/receipts"
coordinate: "items/purchase/orders/goods/receipts · 4/weave · d023f79e"
contentUuid: "8b62d487-f93a-50f7-b1df-0cc1576ff293"
diamondUuid: "63d49875-b3f8-8685-ad15-54047971f0ef"
uuid: "d023f79e-777b-8c3c-889b-973f190ec62a"
horo: 4
typography:
  partition: items
  bondDegree: 34
standards:
  - "EN-16931:2017 §BG-13 delivery-information"
  - "EN-16931:2017 §BG-13 delivery-information`"
  - "IFRS IAS-2 inventories goods-in-transit"
  - "IFRS-15 §38-42 revenue-recognition FOB-point-timing"
  - "ISO-8601-1:2019 date-time received-at"
  - "ISO-8601-1:2019 date-time received-at`"
  - "SOX §404 internal-controls three-way-match"
  - "US-GAAP ASC-330 inventory at-cost"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "92072c78-fa3f-8582-bbfa-1d0511d58400"
  stages:
    - stage: path
      stageUuid: "0dab4d6c-f8c4-8dd3-873e-4fa630c0ad97"
    - stage: trinity
      stageUuid: "66b35295-8d51-80f6-927c-24993f6a231f"
    - stage: boundary
      stageUuid: "6832edea-b99e-8a49-b877-197a12cc914a"
    - stage: links
      stageUuid: "77d4caf5-883c-891a-abdb-8f533d764c5f"
    - stage: horo
      stageUuid: "ab21e4c2-1d0e-8f53-a604-e18085cf67eb"
    - stage: seal
      stageUuid: "ba660399-fbfd-8d9d-bbe8-2f44cff5e4be"
    - stage: uuid
      stageUuid: "1d1064c3-2ed9-8665-b156-7130a6a88d4d"
version: 2
---
# goods-receipts

Goods Receipts — second leg of three-way match (PO → Receipt → Invoice).

Single-folder collection node with co-located `seed.ts` (opening data) and `index.ts` (schema + invariant checks).

## Architecture

GR receipt confirms goods arrival and triggers GL accrual posting. Revenue recognition timing is determined by shipment FOB point (IFRS-15 §38-42), not GR date. GR is goods-in-transit interim state; final revenue trigger is shipment FOB point via purchase-orders Incoterms.

GL posting (debit inventory, credit accounts-payable) on GR; revenue posting on shipment FOB date. IFRS-15 §31 requires substantiation that GR date ≠ revenue date.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-8601-1:2019 date-time received-at`
- `@standard EN-16931:2017 §BG-13 delivery-information`

- ISO-8601-1:2019 date-time received-at
- EN-16931:2017 §BG-13 delivery-information
- ISO-19011:2018 audit-trail receipt-evidence
- IFRS-15 §31 revenue-substantiation shipment-FOB-date
- SOX §404 internal-controls three-way-match
- ISO-27002 §5.4 segregation-of-duties receiver-vs-requester

**Law — [[law]]: a goods receipt is the second leg of the three-way match — it confirms vendor goods arrival and posts the GL accrual (debit inventory, credit AP), while revenue timing stays deferred to the shipment FOB point, so GR date ≠ revenue date.**

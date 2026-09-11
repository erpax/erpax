---
name: receipts
description: "Use when confirming vendor goods arrival — receipt number, purchase order link, received-at date, line quantities, and GL accrual (debit inventory/credit AP) per IAS-2 §10, with revenue timing deferred to the FOB point per IFRS-15 §38-42. The second leg of the SOX three-way match that separates inventory accrual from revenue recognition."
atomPath: "items/purchase/orders/goods/receipts"
coordinate: "items/purchase/orders/goods/receipts · 5/round · 129e3738"
contentUuid: "0c85308b-f670-50a3-a0fd-6b4fde1eb207"
diamondUuid: "ecfdf611-ff4c-82db-8f50-bd310275e003"
uuid: "129e3738-f646-8f73-9548-d11dc2591987"
horo: 5
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
  computationUuid: "580e3879-57ab-8472-9651-a14a298387c5"
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
      stageUuid: "27284a8b-511d-85ea-b9e6-fe7f24580d05"
    - stage: seal
      stageUuid: "ba660399-fbfd-8d9d-bbe8-2f44cff5e4be"
    - stage: uuid
      stageUuid: "4f1fee51-b312-8366-9c81-11348f0a84ce"
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

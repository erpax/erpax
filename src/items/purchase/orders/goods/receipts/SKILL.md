---
name: receipts
description: "Use when confirming vendor goods arrival — receipt number, purchase order link, received-at date, line quantities, and GL accrual (debit inventory/credit AP) per IAS-2 §10, with revenue timing deferred to the FOB point per IFRS-15 §38-42. The second leg of the SOX three-way match that separates inventory accrual from revenue recognition."
atomPath: "items/purchase/orders/goods/receipts"
coordinate: "items/purchase/orders/goods/receipts · 2/share · c172c1e5"
contentUuid: "f90585f3-f792-54b8-a2ff-3ea1c2c4329a"
diamondUuid: "7bdb1e39-6d40-848f-807b-079abfabf01e"
uuid: "c172c1e5-0a9e-86f5-964b-c7691fedf058"
horo: 2
typography:
  partition: items
  bondDegree: 31
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
  computationUuid: "6d6d4765-32be-85e2-9e96-e54d9c36f039"
  stages:
    - stage: path
      stageUuid: "0dab4d6c-f8c4-8dd3-873e-4fa630c0ad97"
    - stage: trinity
      stageUuid: "66b35295-8d51-80f6-927c-24993f6a231f"
    - stage: boundary
      stageUuid: "d4dc853d-88b9-8842-bdfe-0388f1b7cd39"
    - stage: links
      stageUuid: "77d4caf5-883c-891a-abdb-8f533d764c5f"
    - stage: horo
      stageUuid: "b388267f-352a-80b6-8bc8-5cde0f3dc486"
    - stage: seal
      stageUuid: "ba660399-fbfd-8d9d-bbe8-2f44cff5e4be"
    - stage: uuid
      stageUuid: "3220b99f-b186-8aff-b562-fdbb83e70c17"
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

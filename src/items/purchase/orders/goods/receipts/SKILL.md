---
name: receipts
description: "Use when confirming vendor goods arrival — receipt number, purchase order link, received-at date, line quantities, and GL accrual (debit inventory/credit AP) per IAS-2 §10, with revenue timing deferred to the FOB point per IFRS-15 §38-42. The second leg of the SOX three-way match that separates inventory accrual from revenue recognition."
atomPath: items/purchase/orders/goods/receipts
coordinate: items/purchase/orders/goods/receipts · 5/round · fd43bc25
contentUuid: "16090355-8d3c-5dda-9522-795aa6e15d7a"
diamondUuid: "1c189b56-5dbe-849a-bec0-f2b42925aecc"
uuid: "fd43bc25-e3ce-8854-8069-36fbc5b13b14"
horo: 5
bonds:
  in:
    - accounting
    - collections
    - fields
    - goods
    - law
    - proof
    - sales
    - supto
    - versions
  out:
    - accounting
    - collections
    - fields
    - law
    - proof
    - sales
    - supto
    - versions
typography:
  partition: items
  bondDegree: 34
  neighbors: []
standards:
  - "EN-16931:2017 §BG-13 delivery-information"
  - "IFRS IAS-2 inventories goods-in-transit"
  - "IFRS-15 §31 revenue-substantiation shipment-FOB-date"
  - "IFRS-15 §38-42 revenue-recognition FOB-point-timing"
  - "ISO-19011:2018 audit-trail receipt-evidence"
  - "ISO-8601-1:2019 date-time received-at"
  - "SOX §404 internal-controls three-way-match"
  - "US-GAAP ASC-330 inventory at-cost"
bindings: []
neighbors:
  wikilink:
    - law
  matrix:
    - accounting
    - collections
    - fields
    - law
    - proof
    - sales
    - supto
    - versions
  backlinks:
    - accounting
    - collections
    - fields
    - law
    - proof
    - sales
    - supto
    - versions
signatures:
  computationUuid: "4e65cd95-7beb-8ae3-8288-6a203dc4a837"
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
      stageUuid: "f7dc06ab-30d1-8586-83c1-fe6a4932a21a"
    - stage: seal
      stageUuid: "ba660399-fbfd-8d9d-bbe8-2f44cff5e4be"
    - stage: uuid
      stageUuid: "880ca0d8-9e41-8b52-8977-fbf8a5cd0a4c"
version: 2
---
# goods-receipts

Goods Receipts — second leg of three-way match (PO → Receipt → Invoice).

Single-folder collection node with co-located `seed.ts` (opening data) and `index.ts` (schema + invariant checks).

## Architecture

GR receipt confirms goods arrival and triggers GL accrual posting. Revenue recognition timing is determined by shipment FOB point (IFRS-15 §38-42), not GR date. GR is goods-in-transit interim state; final revenue trigger is shipment FOB point via purchase-orders Incoterms.

GL posting (debit inventory, credit accounts-payable) on GR; revenue posting on shipment FOB date. IFRS-15 §31 requires substantiation that GR date ≠ revenue date.

## Standards
- ISO-8601-1:2019 date-time received-at
- EN-16931:2017 §BG-13 delivery-information
- ISO-19011:2018 audit-trail receipt-evidence
- IFRS-15 §31 revenue-substantiation shipment-FOB-date
- SOX §404 internal-controls three-way-match
- ISO-27002 §5.4 segregation-of-duties receiver-vs-requester

**Law — [[law]]: a goods receipt is the second leg of the three-way match — it confirms vendor goods arrival and posts the GL accrual (debit inventory, credit AP), while revenue timing stays deferred to the shipment FOB point, so GR date ≠ revenue date.**

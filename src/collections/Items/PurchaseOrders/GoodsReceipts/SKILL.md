---
name: goods-receipts
description: The goods-receipts collection — Goods Receipts — second leg of three-way match (PO → Receipt → Invoice)
---

# goods-receipts

Goods Receipts — second leg of three-way match (PO → Receipt → Invoice).

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISO-8601-1:2019 date-time received-at
- EN-16931:2017 §BG-13 delivery-information
- IFRS IAS-2 inventories goods-in-transit
- IFRS-15 §38-42 revenue-recognition FOB-point-timing
- US-GAAP ASC-330 inventory at-cost
- ISO-19011:2018 audit-trail receipt-evidence
- IFRS-15 §31 revenue-substantiation shipment-FOB-date
- SOX §404 internal-controls three-way-match
- ISO-27002 §5.4 segregation-of-duties receiver-vs-requester

Composes: [[flow]].

---
name: purchase-orders
description: The purchase-orders collection — Purchase Orders — first leg of three-way match (PO ↔ receipt ↔ invoice)
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

Composes: [[commitments]] · [[GoodsReceipts]].

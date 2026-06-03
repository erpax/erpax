---
name: goods-receipts
description: The goods-receipts collection — Goods Receipts — second leg of three-way match (PO → Receipt → Invoice)
---

# goods-receipts

Goods Receipts — second leg of three-way match (PO → Receipt → Invoice).

Single-folder collection node with co-located `seed.ts` (opening data) and `index.ts` (schema + invariant checks).

## Architecture

GR receipt confirms goods arrival and triggers GL accrual posting. Revenue recognition timing is determined by shipment FOB point (IFRS-15 §38-42), not GR date. GR is goods-in-transit interim state; final revenue trigger is shipment FOB point via purchase-orders Incoterms.

GL posting (debit inventory, credit accounts-payable) on GR; revenue posting on shipment FOB date. IFRS-15 §31 requires substantiation that GR date ≠ revenue date.

## Composes

[[flow]] — for event emission on GR posting  
[[accounting]] — GL accrual posting per IAS-2 §10, inventory at-cost ASC-330  
[[transaction]] — GL posting lifecycle  
[[proof]] — audit trail per ISO-19011:2018 receipt-evidence  
[[identity]] — role-based access (goods-receiver, quality-inspector, purchasing-accountant) and segregation-of-duties enforcement  
[[standard]] — ISO-8601-1:2019 date-time, EN-16931:2017 delivery-information, SOX §404 internal-controls three-way-match
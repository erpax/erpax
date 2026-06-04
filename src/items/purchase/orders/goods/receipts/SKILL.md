---
name: goods-receipts
description: Use when confirming vendor goods arrival — receipt number, purchase order link, received-at date, line quantities, and GL accrual (debit inventory/credit AP) per IAS-2 §10, with revenue timing deferred to the FOB point per IFRS-15 §38-42. The second leg of the SOX three-way match that separates inventory accrual from revenue recognition.
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
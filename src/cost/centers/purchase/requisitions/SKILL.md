---
name: purchase-requisitions
description: Use when capturing spend requests before a purchase order is issued — SOX §404 four-eyes gate (requisitioner ≠ approver), multi-line item costing, GL account, preferred vendor, and auditor-traceable PO→requisition→approval chain. The pre-PO approval-gate collection.
---

# purchase-requisitions

Purchase Requisitions — pre-PO approval chain (SOX §404 four-eyes).

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISO-8601-1:2019 date-time
- ISO-4217:2015 currency-codes
- SOX §404 internal-controls four-eyes
- ISO-27002 §5.4 segregation-of-duties
- ISO-19011:2018 audit-trail requisition-evidence
- ISO-27001 A.5.23 cloud-service-tenant-isolation

**Law — [[law]]: a requisition is the pre-PO approval gate — requisitioner ≠ approver (SOX §404 four-eyes / segregation-of-duties), and the PO→requisition→approval chain stays auditor-traceable.**

Composes: [[accounting]] · [[transaction]] · [[identity]] · [[standard]] · [[proof]] · [[privilege]].

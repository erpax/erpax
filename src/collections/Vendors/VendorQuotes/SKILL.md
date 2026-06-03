---
name: vendor-quotes
description: The vendor-quotes collection — Vendor Quotes / RFQs — supplier RFQ responses (BEPS Action 13 evidence)
---

# vendor-quotes

Vendor Quotes / RFQs — supplier RFQ responses (BEPS Action 13 evidence).

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISO-8601-1:2019 date-time
- ISO-4217:2015 currency-codes
- OECD BEPS Action 13 transfer-pricing-evidence
- SOX §404 internal-controls vendor-selection
- ISO 9001:2015 §8.4 control-of-externally-provided-processes
- ISO-19011:2018 audit-trail rfq-evidence
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[PurchaseRequisitions]] · [[Vendors]] · [[Items]] · [[PurchaseOrders]].

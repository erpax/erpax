---
name: maintenance-work-orders
description: The maintenance-work-orders collection — Maintenance Work Orders — CMMS execution rows per ISO 41001 §8
---

# maintenance-work-orders

Maintenance Work Orders — CMMS execution rows per ISO 41001 §8.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISO-41001:2018 §8.1 facility-management operational-control
- ISO-55000:2014 asset-management work-management
- ISO-55001:2014 asset-management management-systems
- ISO-14224:2016 reliability-and-maintenance-data
- EN-13306:2017 maintenance-terminology
- ISO-8601-1:2019 date-time scheduled-actual
- IFRS IAS-16 §12 §13 capitalisable-vs-expense routine-maintenance
- IFRS IAS-2 §10 cost-of-purchase materials-issued
- US-GAAP ASC-360 ppe-maintenance
- ISO-19011:2018 audit-trail work-order-evidence
- SOX §404 internal-controls capex-vs-opex-classification
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[MaintenanceRequests]] · [[Properties]].

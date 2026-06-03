---
name: maintenance-requests
description: The maintenance-requests collection — Maintenance Requests — user-raised tickets per ISO 41001 §8
---

# maintenance-requests

Maintenance Requests — user-raised tickets per ISO 41001 §8.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISO-41001:2018 §8.1 facility-management operational-control
- ISO-41011:2017 facility-management vocabulary
- ISO-55000:2014 asset-management corrective-maintenance
- ISO-8601-1:2019 date-time reported-at sla
- ISO-19011:2018 audit-trail maintenance-request-evidence
- SOX §404 internal-controls fm-service-delivery
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[MaintenanceWorkOrders]] · [[Properties]] · [[Spaces]] · [[FixedAssets]] · [[BookableResources]] · [[Users]].

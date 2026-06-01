---
name: gateway-events
description: The gateway-events collection — Gateway Events — idempotent inbound webhook / integration event log
---

# gateway-events

Gateway Events — idempotent inbound webhook / integration event log.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- PCI-DSS v4.0 §3 no-PAN-storage cardholder-data-minimisation
- ISO-8601-1:2019 date-time received-processed-timestamps
- RFC-9110 §9.2.2 idempotency
- ISO-27001 A.8.15 logging A.8.16 monitoring-activities
- ISO-27001 A.5.23 cloud-service-tenant-isolation
- ISO-19011:2018 audit-trail integration-event-evidence

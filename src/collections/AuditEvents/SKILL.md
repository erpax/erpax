---
name: audit-events
description: Use when persisting or querying the durable ISO 19011 / SOX §404 evidence trail — every canonical write (orders, invoices, payments, journal entries, period locks) lands one append-only row queryable by tenant/collection/operation/user/timestamp; Merkle hash chain for tamper-evidence; no log-scraping required for auditors. The canonical audit-evidence collection.
---

# audit-events

Audit Events — persistent ISO 19011 / SOX §404 evidence trail.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

Append-only by design: read is tenant-scoped, create is the canonical hook only, update is forbidden, delete is admin-emergency. The durable, queryable evidence target — every canonical write (orders, invoices, payments, journal entries, subscriptions, fiscal periods, …) lands one row the auditor queries by `(tenant, collection, operation, user, timestamp)` instead of scraping logs.

## Standards
- ISO-19011:2018 §6.4.6 audit-evidence-collection
- ISO-19011:2018 §6.5 audit-conclusions
- ISO/IEC 27037:2012 evidence-preservation
- SOC-2 CC4.1 monitoring-and-evaluation
- SOX §302 disclosure-controls
- SOX §404 internal-controls evidence-preservation
- GDPR Art.30 records-of-processing-activities
- ISO-27001 A.5.23 cloud-service-tenant-isolation
- ISO-27002 §8.15 logging
- ISO-19011:2018 audit-trail
- rfc-9562 uuid event-id
- ISO-19011:2018 §6.4.6 audit-evidence-collection unique-event-identifier
- SOX §404 internal-controls evidence-preservation
- NIST FIPS-180-4 sha-256
- ISO 27037:2012 evidence-preservation
- ISO-19011:2018 §6.4.6 audit-evidence-immutability
- SOX §404 internal-controls audit-tamper-evidence

Composes: [[proof]] · [[identity]] · [[party]] · [[horo]] · [[standard]].

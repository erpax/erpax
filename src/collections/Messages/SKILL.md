---
name: messages
description: The messages collection — Messages — internal user-to-user messaging with threading
---

# messages

Messages — internal user-to-user messaging with threading.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISO-8601-1:2019 date-time sent-read-timestamps
- ISO-27001 A.5.23 cloud-service-tenant-isolation
- ISO-19011:2018 audit-trail message-provenance
- GDPR Art 5(1)(e) storage-limitation retention

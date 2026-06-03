---
name: policy-versions
description: Use when managing the version history of an internal policy — release date, version number, change log, document upload, lifecycle draft→final→superseded; ISO 9001 documented-information control per policy. The policy-versions collection.
---

# policy-versions

PolicyVersions.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISO-27001 A.5.1 policies
- ISO-9001:2015 §7.5 documented-information-control
- ISO-27001 A.5.23 cloud-service-tenant-isolation

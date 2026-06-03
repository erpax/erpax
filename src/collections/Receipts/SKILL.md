---
name: receipts
description: The receipts collection — Receipts (касови бонове / electronic receipts) — the Наредба Н-18 fiscal
---

# receipts

Receipts (касови бонове / electronic receipts) — the Наредба Н-18 fiscal.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- BG Наредба-Н-18 §СУПТО касов-бон · §алтернативен-режим e-receipt
- ISO-19011:2018 audit-trail
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[collections]] · [[supto]] · [[proof]] · [[versions]] · [[fields]] · [[accounting]].

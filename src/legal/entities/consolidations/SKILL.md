---
name: consolidations
description: Use when running or auditing a multi-entity group consolidation — entity closure readiness, intercompany balance reconciliation, elimination entry preparation, and consolidation workflow per IFRS-10 / IAS-27 / ASC-810. The group-consolidation process collection.
---

# consolidations

Consolidations Collection.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- IFRS-10 consolidated-financial-statements
- IAS-27 separate-financial-statements
- US-GAAP ASC-810 consolidation

Composes: [[legal/entities]].

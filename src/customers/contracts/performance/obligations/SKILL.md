---
name: performance-obligations
description: Use when decomposing a contract into its distinct promises for IFRS-15 §22 revenue allocation — kind (distinct or series), recognition timing (point-in-time §38 or over-time §35), progress measurement method, standalone selling price, and allocated amount. The IFRS-15 performance-obligation collection.
---

# performance-obligations

Performance Obligations — IFRS 15 §22 distinct promises within a contract.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISO-4217:2015 currency-codes
- ISO-8601-1:2019 date-time satisfaction-date
- IFRS IFRS-15 §22 distinct-performance-obligation
- IFRS IFRS-15 §31 satisfaction-of-performance-obligation
- IFRS IFRS-15 §35 over-time-recognition
- IFRS IFRS-15 §38 point-in-time-recognition
- IFRS IFRS-15 §41-§43 progress-measurement
- US-GAAP ASC-606-10-25-14 distinct-goods-services
- US-GAAP ASC-606-10-25-31 progress-measurement
- ISO-19011:2018 audit-trail po-satisfaction
- SOX §404 internal-controls revenue-recognition

Composes: [[Contracts]] · [[hooks]] · [[accounting]] · [[auth]] · [[standard]].

---
name: cost-centers
description: Use when tagging JE lines with a secondary analytical dimension for segment/departmental P&L — regions, countries, business units, departments, teams, projects, profit centers, cost pools with allocation rules — hierarchical via parent; IFRS-8 / ASC-280 segment reporting without polluting the chart of accounts. The canonical cost-center dimension master.
---

# cost-centers

Cost Centers — analytical dimension for GL postings.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISO-3166-1:2020 country-codes geographic-segment-tagging
- ISO-4217:2015 currency-codes
- IFRS IAS-1 §99 statement-of-comprehensive-income
- IFRS IFRS-8 operating-segments
- US-GAAP ASC-280 segment-reporting
- ISO-19011:2018 audit-trail
- SOX §302 disclosure-controls segment-disclosure
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[hooks]] · [[access]] · [[fields]] · [[accounting]] · [[identity]] · [[proof]] · [[cost/centers/job/positions]].

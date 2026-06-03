---
name: reporting-mappings
description: Use when translating elements across reporting frameworks — account/line-item/disclosure/metric mappings between a source and target standard (XBRL-GL, IFRS-Taxonomy, SAF-T). The cross-standard element-mapping node.
---

# reporting-mappings

ReportingMappings.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- XBRL-GL global-ledger-taxonomy
- IFRS-Taxonomy reporting-mapping
- SAF-T OECD mapping
- ISO-27001 A.5.23 cloud-service-tenant-isolation

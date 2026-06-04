---
name: statutory-report-templates
description: Use when defining or retrieving jurisdiction-scoped statutory filing templates — annual reports, tax returns, regulatory filings, financial statements, audit reports — with section sequences and effective dates. The per-jurisdiction statutory filing template node.
---

# statutory-report-templates

StatutoryReportTemplates.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- SAF-T OECD audit-file
- XBRL business-reporting
- IFRS-Taxonomy
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[taxing/jurisdictions/statutory/report/templates/statutory/field/mappings]].

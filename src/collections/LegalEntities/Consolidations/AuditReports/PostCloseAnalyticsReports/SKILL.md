---
name: post-close-analytics-reports
description: Use when generating or reviewing immutable post-close analytics — variance analysis (budget vs. actual), financial ratio analysis, segment reporting (IFRS-8 business and geographic), and management KPI scorecards per IFRS IAS-1 / SOX §404. The post-close analytics report collection.
---

# post-close-analytics-reports

PostCloseAnalyticsReports Collection.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- IFRS IAS-1 financial-statement-analysis
- SOX §404 close-monitoring

Composes: [[AuditReports]].

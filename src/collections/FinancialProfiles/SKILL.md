---
name: financial-profiles
description: The financial-profiles collection — Financial Profiles — an individual's / party's personal balance sheet
---

# financial-profiles

Financial Profiles — an individual's / party's personal balance sheet.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISO-4217:2015 currency-codes
- ISO-8601-1:2019 date-time as-of-date
- FATF Recommendation 10 customer-due-diligence
- EU AMLD5 (Directive 2018/843) beneficial-owner-financials
- GDPR Art 5(1)(c) data-minimisation Art 5(1)(e) storage-limitation
- ISO-27001 A.5.23 cloud-service-tenant-isolation A.8.12 data-leakage-prevention
- ISO-19011:2018 audit-trail kyc-evidence

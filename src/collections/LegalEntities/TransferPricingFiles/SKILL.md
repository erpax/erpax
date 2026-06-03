---
name: transfer-pricing-files
description: The transfer-pricing-files collection — Transfer Pricing Files — OECD BEPS Action 13 Master File + Local File
---

# transfer-pricing-files

Transfer Pricing Files — OECD BEPS Action 13 Master File + Local File.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

Composes [[accounting]] (ledger patterns, currency fields, audit trails), [[transaction]] (relates to intercompany-transactions), [[identity]] (legal entities), [[proof]] (evidence attestations), and [[standard]] (OECD/EU compliance frameworks).

## Standards
- ISO-8601-1:2019 date-time
- ISO-4217:2015 currency-codes
- OECD BEPS Action 13 transfer-pricing-documentation
- OECD TPG 2022 transfer-pricing-guidelines
- EU DAC-4 country-by-country-reporting
- EU 2016/881 administrative-cooperation-tax
- OECD Pillar Two GloBE (15% global minimum tax)
- ISO-19011:2018 audit-trail tp-evidence
- ISO-27001 A.5.23 cloud-service-tenant-isolation

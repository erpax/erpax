---
name: insurance-contracts
description: The insurance-contracts collection — Insurance Contracts — IFRS 17 GMM / PAA / VFA register
---

# insurance-contracts

Insurance Contracts — IFRS 17 GMM / PAA / VFA register.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- IFRS IFRS-17 §3 scope
- IFRS IFRS-17 §32 general-measurement-model-building-blocks
- IFRS IFRS-17 §38 contractual-service-margin
- IFRS IFRS-17 §53 premium-allocation-approach-simplified
- IFRS IFRS-17 §B100 variable-fee-approach
- IFRS IFRS-17 §93 disclosure-requirements
- IFRS IFRS-13 fair-value-input-hierarchy
- ISO-4217:2015 currency-codes
- ISO-8601-1:2019 date-time
- ISO 19011:2018 §6.4.6 audit-evidence-insurance-contracts
- Solvency II / IAIS ICS — actuarial reserving link
- SOX §404 internal-controls TOM-INS-01
- ISO 27001 A.5.23 cloud-service-tenant-isolation

Composes: [[FairValueMeasurements]].

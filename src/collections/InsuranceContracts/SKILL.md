---
name: insurance-contracts
description: The insurance-contracts collection — Insurance Contracts — IFRS 17 GMM / PAA / VFA register
---

# insurance-contracts

Insurance Contracts — IFRS 17 GMM / PAA / VFA register.

Composes [[accounting]] · [[FairValueMeasurements]] for insurance contract groups measured under IFRS 17 §32–§52 (General Measurement Model), §53–§59 (Premium Allocation Approach), or §B100–§B118 (Variable Fee Approach). Captures the §32 building blocks: future cash-flow estimate, [[entry]]-based risk adjustment, contractual service margin (CSM), discount rate. Reinsurance held links via `reinsuranceContract`; fair-value measurement via `fairValueMeasurement`. Status lifecycle: Recognised → In Coverage → Run-off → Derecognised. [[transaction]]-dual journalling via `journalEntry` (read-only, auto-linked by hook). Three profitability groups per cohort: Profitable, No Significant Possibility of Loss, Onerous (loss-recognition required per §16). See [[proof]] for audit-evidence chain (§6.4.6).

## Standards

- @standard IFRS IFRS-17 §3 scope
- @standard IFRS IFRS-17 §32 general-measurement-model-building-blocks
- @standard IFRS IFRS-17 §38 contractual-service-margin
- @standard IFRS IFRS-17 §53 premium-allocation-approach-simplified
- @standard IFRS IFRS-17 §B100 variable-fee-approach
- @standard IFRS IFRS-17 §93 disclosure-requirements
- @standard IFRS IFRS-13 fair-value-input-hierarchy
- @standard ISO-4217:2015 currency-codes
- @standard ISO-8601-1:2019 date-time
- @audit ISO 19011:2018 §6.4.6 audit-evidence-insurance-contracts
- @compliance Solvency II / IAIS ICS — actuarial reserving link
- @compliance SOX §404 internal-controls TOM-INS-01
- @security ISO 27001 A.5.23 cloud-service-tenant-isolation

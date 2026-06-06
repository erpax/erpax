---
name: sepa-mandates
description: Use when managing SEPA Direct Debit mandates (pain.008) — mandate id, debtor IBAN/BIC, creditor identifier, signature date, CORE/B2B instrument, sequence-state (FRST→RCUR), 36-month expiry rule, revocation, and linkage to PaymentRuns. The EPC130-08 SDD mandate register.
---

# sepa-mandates

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISO-20022 pain.008 customer-direct-debit-initiation
- ISO-13616-1:2020 iban
- ISO-9362:2022 bic
- ISO-8601-1:2019 date-time signature-date expiry-date
- IFRS IFRS-9 financial-instruments
- US-GAAP ASC-310 receivables
- ISO-19011:2018 audit-trail mandate-evidence
- SOX §404 internal-controls
- GDPR Art.6(1)(b) lawful-basis-contract
- EPC130-08 sepa-direct-debit-rulebook
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[accounting]] · [[proof]] · [[identity]] · [[horo]] · [[transaction]] · [[standard]].

**Law — [[law]]: a SEPA mandate is the debtor's standing authorization (pain.008) — its sequence-state walks FRST → RCUR on the [[horo]] ring, it expires 36 months after the last collection, and a revoked or expired mandate can authorize no PaymentRun.**

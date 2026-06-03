---
name: payroll-runs
description: "The payroll-runs collection — Payroll Runs — periodic batch payroll: gross-to-net, accruals, disbursement"
---

# payroll-runs

Payroll Runs — periodic batch payroll: gross-to-net, accruals, disbursement.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

One run per (tenant, period × paySchedule): the close-job aggregates approved
[[TimeEntries]] + [[Employees]] compensation, computes per-line gross → deductions →
employer accruals → net, then posts the IAS-19 / ASC-710 wages [[transaction]] (a
[[JournalEntries]] back-link) and emits the pain.001 [[PaymentRuns]] sibling on the
`paymentDate`. Posted runs [[close|period-lock]]; reversals are a separate run.

## Standards
- ISO-20022 pain.001 customer-credit-transfer-initiation
- ISO-13616-1:2020 iban
- ISO-9362:2022 bic
- ISO-4217:2015 currency-codes
- ISO-8601-1:2019 date-time period payment-date
- IFRS IAS-19 employee-benefits short-term
- IFRS IAS-19 §51 defined-contribution-plans
- IFRS IAS-26 §13 §14 §17 retirement-benefit-plan-reporting (employer-side contributions feed the §17 plan-asset disclosures)
- US-GAAP ASC-710 compensation-general
- US-GAAP ASC-715 compensation-retirement-benefits
- ISO-19011:2018 audit-trail payroll-evidence
- SOX §302 disclosure-controls
- SOX §404 internal-controls four-eyes
- GDPR Art.6(1)(b) lawful-basis-contract
- GDPR Art.30 records-of-processing-activities
- ISO-27001 A.5.23 cloud-service-tenant-isolation
- ISO-27002 §5.4 segregation-of-duties
- ISO-27002 §5.34 privacy-and-protection-of-pii
- ISO-27002 §8.11 data-masking

GDPR-classified personal data ⇒ access tighter than the accounting default
(read: admin · payroll-officer · hr; write: admin · payroll-officer): the
[[privilege]] / segregation-of-duties posture, with SOX §404 four-eyes (preparer ≠
authoriser) enforced via the same `enforceSegregationOfDuties` hook as
[[PeriodEndAdjustments]].

Composes: [[accounting]] · [[transaction]] · [[entry]] · [[balance]] · [[party]] · [[give]] · [[horo]] · [[close]] · [[identity]] · [[proof]] · [[privilege]] · [[JournalEntries]] · [[PaymentRuns]] · [[Employees]] · [[TimeEntries]] · [[CostCenters]].

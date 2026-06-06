---
name: expense-reports
description: Use when submitting, approving or auditing employee expense claims — per-diem, mileage, airfare, hotel, receipts, multi-step approval chain, reimbursement via payroll or AP — with GL coding, FX conversion, policy-compliance flags and SOX §404 four-eyes enforcement. The employee expense-claim collection.
---

# expense-reports

Expense Reports — employee expense claims with approval + reimbursement.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISO-8601-1:2019 date-time
- ISO-4217:2015 currency-codes
- IFRS IAS-19 employee-benefits
- IFRS IAS-21 §28 fx-on-reimbursement
- GDPR Art.5 PII receipt-images
- SOX §404 internal-controls four-eyes
- ISO-19011:2018 audit-trail expense-evidence
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[Projects]] · [[accounting]] · [[transaction]] · [[identity]] · [[proof]] · [[standard]].

**Law — [[law]]: no expense claim reimburses without passing the SOX §404 four-eyes approval chain (claimant ≠ approver), GL-coded and FX-converted before it posts.**

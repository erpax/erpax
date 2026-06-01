---
name: payment-requests
description: The payment-requests collection — Payment Requests — internal request-to-disburse with approval workflow
---

# payment-requests

Payment Requests — internal request-to-disburse with approval workflow.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISO-20022 pain.001 payment-initiation
- ISO-4217:2015 currency-codes
- ISO-8601-1:2019 date-time request-due-dates
- SOX §404 internal-controls disbursement-approval TOM-PAY-01
- ISO-27002 §5.4 segregation-of-duties requester-vs-approver
- ISO-19011:2018 audit-trail approval-evidence
- ISO-27001 A.5.23 cloud-service-tenant-isolation

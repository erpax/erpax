---
name: credit-memos
description: The credit-memos collection — Credit Memos — IFRS 15 §B22 contract-liability adjustments
---

# credit-memos

Credit Memos — IFRS 15 §B22 contract-liability adjustments.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISO-4217:2015 currency-codes
- ISO-8601-1:2019 date-time issued-at applied-at settled-at
- EN-16931:2017 credit-note-semantic-model
- IFRS IFRS-15 §B22 refund-liability
- IFRS IFRS-15 §B47 contract-cancellation
- US-GAAP ASC-606-10-32-10 variable-consideration
- ISO-19011:2018 audit-trail
- SOX §404 internal-controls credit-memo-approval
- ISO-27002 §5.4 segregation-of-duties issuer-vs-approver

Composes: [[Refunds]] · [[accounting]] · [[transaction]] · [[proof]] · [[Tenants]] · [[Customers]].

---
name: gl-postings
description: Use when writing or querying individual debit/credit lines against a journal entry — source type (invoice/bill/payment/adjustment/revaluation), source date, GL account, amount, currency, and ISO-8601 posted-date auto-set on status → posted. The atomic GL line-item that enforces balanced-entry and SOX posting-timestamp requirements.
---

# gl-postings

GL Postings — atomic debit/credit lines linked to a journal entry.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISO-8601-1:2019 date-time posted-date
- IFRS IAS-1 presentation-of-financial-statements
- OECD SAF-T §3 transactions
- ISO-19011:2018 audit-trail
- SOX §404 internal-controls
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[accounting]] · [[transaction]] · [[standard]] · [[proof]] · [[identity]] · [[horo]].

**Law — [[law]]: each posting is exactly one debit-or-credit line bound to a single GL account and parent entry, and its posted-date is auto-set the moment status becomes posted.**

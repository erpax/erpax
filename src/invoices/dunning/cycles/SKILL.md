---
name: dunning-cycles
description: Use when tracking or auditing the collections process for an overdue invoice — reminder→demand→legal-handover→write-off stages, ECL allowance evidence (IFRS 9 §5.5 / ASC 326-20 CECL), manual overrides and SOX §404 bad-debt evidence. The dunning-cycles collection.
---

# dunning-cycles

Dunning Cycles — collection-process record per overdue invoice.

Composes: [[accounting]] · [[invoices]] · [[journal-entries]] · [[standard]].

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISO-8601-1:2019 date-time stage-due-date
- ISO-4217:2015 currency-codes
- IFRS IFRS-9 §5.5 expected-credit-loss simplified-approach
- US-GAAP ASC-326-20 cecl-credit-losses
- US-GAAP ASC-310 receivables
- ISO-19011:2018 audit-trail collections-evidence
- SOX §404 internal-controls bad-debt-evidence
- GDPR Art.6(1)(f) lawful-basis-legitimate-interest collections
- ISO-27002 §5.4 segregation-of-duties write-off-approval

---
name: invoices
description: The invoices collection — Invoices — header for AR/AP billing with GL posting + period locking
---

# invoices

Invoices — header for AR/AP billing with GL posting + period locking.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- EN-16931:2017 semantic-data-model-electronic-invoice
- EN-16931:2017 §BG-22 document-totals
- EN-16931:2017 §BG-23 vat-breakdown
- EN-16931:2017 BT-3 invoice-type-code
- EN-16931:2017 BT-5 invoice-currency-code
- Peppol-BIS-3.0 billing electronic-invoicing
- UN-EDIFACT INVOIC d96a
- UN-CEFACT 1001 document-name-code
- UN-CEFACT 5305 duty-tax-fee-category-code
- UBL-2.1 universal-business-language
- ISO-4217:2015 currency-codes
- ISO-8601-1:2019 date-time invoice-date due-date
- IFRS IFRS-15 revenue-from-contracts-with-customers
- US-GAAP ASC-606 revenue-from-contracts-with-customers
- SOX §404 internal-controls
- ISO-19011:2018 audit-trail
- ISO-19011:2018 audit-trail`.

Composes: [[DunningCycles]] · [[Subscriptions]] · [[accounting]] · [[transaction]] · [[party]] · [[identity]].

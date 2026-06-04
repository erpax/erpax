---
name: invoice-lines
description: Use when adding, pricing or auditing individual line items on an invoice — EN-16931 BG-25 quantity/net-amount, BG-29 price details, BG-30 VAT category/rate, allowances, inventory recompute and GL posting. The invoice-lines collection.
---

# invoice-lines

Invoice Lines — line items (BG-25) for an invoice header.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- EN-16931:2017 §BG-25 invoice-line
- EN-16931:2017 §BG-29 price-details
- EN-16931:2017 §BG-30 line-vat-information
- EN-16931:2017 §BG-27 invoice-line-allowances
- EN-16931:2017 §BG-28 invoice-line-charges
- EN-16931:2017 BT-126 invoice-line-identifier
- EN-16931:2017 BT-131 invoice-line-net-amount
- EN-16931:2017 BT-151 vat-category-code
- Peppol-BIS-3.0 billing line-detail
- UN-EDIFACT INVOIC §LIN line-segment
- ISO-4217:2015 currency-codes
- UN-CEFACT-5305 tax-category-codes
- IFRS IFRS-15 revenue-from-contracts-with-customers
- US-GAAP ASC-606 revenue-from-contracts-with-customers

Composes: [[Invoices]] (the BG-25 header it lines) · [[Items]] (buyer/seller/source refs + inventory recompute) · [[gl/accounts]] (debit/credit + tax debit/credit posting) · [[horo]] (the draft·active·delivered·returned·cancelled status ring) · [[tax]] (BG-30 line VAT: BT-151 category, BT-152 rate, exemption reasons) · [[accounting]] (the double-entry the net/tax/total feed) · [[standard]] (the EN-16931 / Peppol-BIS / UN-EDIFACT form projected).

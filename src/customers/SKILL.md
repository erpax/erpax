---
name: customers
description: Use when creating or querying the sale-side party master — customer identity, LEI, IBAN, VAT classification, credit limit, payment terms, accounts-receivable exposure, and GDPR consent. The EN-16931 buyer party collection.
---

# customers

Customers — sale-side party master.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISO-4217:2015 currency-codes default-currency
- ISO-3166-1:2020 country-codes via-addresses
- ISO-17442-1:2020 lei
- ISO-13616-1:2020 iban
- EN-16931:2017 §BG-7 buyer
- IFRS IFRS-9 financial-instruments accounts-receivable
- US-GAAP ASC-310 receivables
- GDPR Art.6(1)(b) lawful-basis-contract
- GDPR Art.5 data-minimization

Composes: [[customers/sales/orders]] · [[identity]] · [[accounting]] · [[tax]] · [[horo]] · [[standard]].

**Law — [[law]]: a customer is the buyer-side party of record whose receivable exposure may never exceed its credit limit, and whose personal data is held only on a lawful basis and minimized.**

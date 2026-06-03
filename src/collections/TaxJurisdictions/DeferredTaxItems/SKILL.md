---
name: deferred-tax-items
description: The deferred-tax-items collection — Deferred Tax Items — IAS 12 income-taxes timing differences
---

# deferred-tax-items

[[tax]] · [[accounting]] deferred-tax register. One row per origination or reversal of a temporary difference between tax base and carrying amount, per [[standard]] IAS-12.

Slice BBBBB-prep (2026-05-11): the `kind` discriminator carries the IAS-12 classification (deductible vs taxable; current vs non-current). Pairs with [[tax]] jurisdiction (rate source) and [[transaction]] journal-entries (booking).

## Standards
- IFRS IAS-12 §15-§68 income-taxes
- IFRS IAS-12 §29 deductible-temporary-differences
- IFRS IAS-12 §34 deferred-tax-asset-recognition
- IFRS IAS-12 §47 measurement-using-substantively-enacted-rate
- IFRS IAS-12 §74 offsetting-deferred-tax-assets-and-liabilities
- US-GAAP ASC-740 income-taxes
- ISO-4217:2015 currency-codes
- ISO-8601-1:2019 date-time origination-reversal
- @audit ISO 19011:2018 §6.4.6 audit-evidence-deferred-tax
- @compliance SOX §404 internal-controls TOM-TAX-02
- @security ISO 27001 A.5.23 cloud-service-tenant-isolation

Composes: [[identity]] (reference field) · [[accounting]] (access, audit fields) · [[currency]] · [[transaction]] (journal-entry relationship) · [[proof]] (audit trail via auditFields).
---
name: invoices
description: "Use when issuing, receiving or auditing AR/AP invoices — EN-16931 BG-1 header, BG-22 document totals, BG-23 VAT breakdown, fiscal device fields, period-lock guard, GL posting and audit trail. The invoices collection."
atomPath: invoices
coordinate: "invoices · 4/weave · 6e1b9286"
contentUuid: "019f2593-9521-50be-9bc8-e17ef5623da5"
diamondUuid: "75430bf1-7e38-80b5-b8c7-204593b471cc"
uuid: "6e1b9286-a8ed-8715-95f4-950684358e8d"
horo: 4
bonds:
  in:
    - accounting
    - bookings
    - cycles
    - deferredrevenue
    - dunning
    - identity
    - law
    - lines
    - milestones
    - orders
    - party
    - performances
    - reference
    - refunds
    - revenue
    - sales
    - subscriptions
    - transaction
  out:
    - accounting
    - bookings
    - cycles
    - deferredrevenue
    - dunning
    - identity
    - law
    - lines
    - milestones
    - orders
    - party
    - performances
    - reference
    - refunds
    - revenue
    - sales
    - subscriptions
    - transaction
typography:
  partition: invoices
  bondDegree: 0
  neighbors: []
standards:
  - "EN-16931:2017 BT-3 invoice-type-code"
  - "EN-16931:2017 BT-3 invoice-type-code`"
  - "EN-16931:2017 BT-5 invoice-currency-code"
  - "EN-16931:2017 BT-5 invoice-currency-code`"
  - "EN-16931:2017 semantic-data-model-electronic-invoice"
  - "EN-16931:2017 semantic-data-model-electronic-invoice`"
  - "EN-16931:2017 §BG-22 document-totals"
  - "EN-16931:2017 §BG-22 document-totals`"
  - "EN-16931:2017 §BG-23 vat-breakdown"
  - "EN-16931:2017 §BG-23 vat-breakdown`"
  - "IFRS IFRS-15 revenue-from-contracts-with-customers"
  - "ILO-C100"
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 currency-codes`"
  - "ISO-8601-1:2019 date-time invoice-date due-date"
  - "ISO-8601-1:2019 date-time invoice-date due-date`"
  - "ISO-9362"
  - "ISO-9735"
  - "NIST-SP-800-38D"
  - "Peppol-BIS-3.0"
  - "Peppol-BIS-3.0 billing electronic-invoicing"
  - "SOX §404 internal-controls"
  - "UBL-2.1"
  - "UBL-2.1 universal-business-language"
  - "UN-CEFACT"
  - "UN-CEFACT 1001 document-name-code"
  - "UN-CEFACT 5305 duty-tax-fee-category-code"
  - "UN-EDIFACT INVOIC d96a"
  - "US-GAAP"
  - "US-GAAP ASC-606 revenue-from-contracts-with-customers"
  - "— the instrument reads SKILL.md) -->"
bindings: []
neighbors:
  wikilink:
    - accounting
    - cycles
    - identity
    - law
    - party
    - subscriptions
    - transaction
  matrix:
    - accounting
    - bookings
    - cycles
    - deferredrevenue
    - dunning
    - identity
    - law
    - lines
    - milestones
    - orders
    - party
    - performances
    - reference
    - refunds
    - revenue
    - sales
    - subscriptions
    - transaction
  backlinks:
    - accounting
    - bookings
    - cycles
    - deferredrevenue
    - dunning
    - identity
    - law
    - lines
    - milestones
    - orders
    - party
    - performances
    - reference
    - refunds
    - revenue
    - sales
    - subscriptions
    - transaction
signatures:
  computationUuid: "1d4a5ec7-7a9a-8a58-bb0f-21e504ba2288"
  stages:
    - stage: path
      stageUuid: "343d953a-b200-88f2-9d81-ba44e9b2c0ea"
    - stage: trinity
      stageUuid: "25e1f2a9-361f-8cdd-a82c-4c3f7dbcadc9"
    - stage: boundary
      stageUuid: "e151bd5f-9a3a-8229-a7bf-3b941304e926"
    - stage: links
      stageUuid: "0d1a4cd3-01dc-82ba-a9f1-7d5140a02884"
    - stage: horo
      stageUuid: "ee6fa9b8-080a-82d4-a63b-5735d4cb05ea"
    - stage: seal
      stageUuid: "962fd028-1986-8e58-9ce7-557199c5ca50"
    - stage: uuid
      stageUuid: "bf63f3d0-8cdb-8432-98e6-6cb8d13c5023"
version: 2
---
# invoices

Invoices — header for AR/AP billing with GL posting + period locking.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard EN-16931:2017 semantic-data-model-electronic-invoice`
- `@standard EN-16931:2017 §BG-22 document-totals`
- `@standard EN-16931:2017 §BG-23 vat-breakdown`
- `@standard EN-16931:2017 BT-3 invoice-type-code`
- `@standard EN-16931:2017 BT-5 invoice-currency-code`
- `@standard ISO-4217:2015 currency-codes`
- `@standard ISO-8601-1:2019 date-time invoice-date due-date`

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

Composes: [[invoices/dunning/cycles]] · [[Subscriptions]] · [[accounting]] · [[transaction]] · [[party]] · [[identity]].

**Law — [[law]]: an EN-16931 invoice header posts its totals as a GL double-entry behind a period-lock guard, content-addressed by [[identity]]; once the fiscal period locks, the posting is corrected by reversal, never edited in place.**

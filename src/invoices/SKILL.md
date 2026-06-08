---
name: invoices
description: "Use when issuing, receiving or auditing AR/AP invoices — EN-16931 BG-1 header, BG-22 document totals, BG-23 VAT breakdown, fiscal device fields, period-lock guard, GL posting and audit trail. The invoices collection."
atomPath: invoices
coordinate: invoices · 2/share · 0007ff58
contentUuid: "09cc6eb5-cb6f-56f3-8a20-e96a08163fe9"
diamondUuid: "fada537d-7baa-8e6c-8b89-64d16456f40f"
uuid: "0007ff58-e8fc-84ca-b6cb-136ba1ac021b"
horo: 2
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
  - "COSO-ERM-2017"
  - "EN-16931"
  - "EN-16931:2017 BT-3 invoice-type-code"
  - "EN-16931:2017 BT-5 invoice-currency-code"
  - "EN-16931:2017 semantic-data-model-electronic-invoice"
  - "EN-16931:2017 §BG-22 document-totals"
  - "EN-16931:2017 §BG-23 vat-breakdown"
  - "EU-2017/1132"
  - "EU-2017/828"
  - "IFRS IFRS-15 revenue-from-contracts-with-customers"
  - "ILO-C100"
  - "ISO-13616-1"
  - "ISO-19011:2018 audit-trail"
  - "ISO-19011:2018 audit-trail`."
  - "ISO-4217:2015 currency-codes"
  - "ISO-8601-1:2019 date-time invoice-date due-date"
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
    - refunds
    - revenue
    - sales
    - subscriptions
    - transaction
signatures:
  computationUuid: "08b200fd-5656-82bc-8905-9c0931df5092"
  stages:
    - stage: path
      stageUuid: "343d953a-b200-88f2-9d81-ba44e9b2c0ea"
    - stage: trinity
      stageUuid: "25e1f2a9-361f-8cdd-a82c-4c3f7dbcadc9"
    - stage: boundary
      stageUuid: "7b5f95d5-60b5-8e00-b878-8d8758bdfffc"
    - stage: links
      stageUuid: "0d1a4cd3-01dc-82ba-a9f1-7d5140a02884"
    - stage: horo
      stageUuid: "8800890e-9fdf-8cd0-9366-668e34409d48"
    - stage: seal
      stageUuid: "962fd028-1986-8e58-9ce7-557199c5ca50"
    - stage: uuid
      stageUuid: "5701a631-cb58-87e4-8ec2-0d686ba661e1"
version: 2
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

Composes: [[invoices/dunning/cycles]] · [[Subscriptions]] · [[accounting]] · [[transaction]] · [[party]] · [[identity]].

**Law — [[law]]: an EN-16931 invoice header posts its totals as a GL double-entry behind a period-lock guard, content-addressed by [[identity]]; once the fiscal period locks, the posting is corrected by reversal, never edited in place.**

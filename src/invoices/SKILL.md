---
name: invoices
description: "Use when issuing, receiving or auditing AR/AP invoices — EN-16931 BG-1 header, BG-22 document totals, BG-23 VAT breakdown, fiscal device fields, period-lock guard, GL posting and audit trail. The invoices collection."
atomPath: invoices
coordinate: "invoices · 1/base · 3683f4fe"
contentUuid: "f02b6280-7d1f-5a47-b107-861c370155b4"
diamondUuid: "b50f2abb-d9be-8e43-a583-9b08cf002941"
uuid: "3683f4fe-2eb7-8aab-a0f0-c56e075ff4fc"
horo: 1
typography:
  partition: invoices
  bondDegree: 72
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
  - "IAS-1"
  - "IFRS IFRS-15 revenue-from-contracts-with-customers"
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
signatures:
  computationUuid: "3f3f760a-f928-8f50-b67e-9f726b5d0aa3"
  stages:
    - stage: path
      stageUuid: "343d953a-b200-88f2-9d81-ba44e9b2c0ea"
    - stage: trinity
      stageUuid: "25e1f2a9-361f-8cdd-a82c-4c3f7dbcadc9"
    - stage: boundary
      stageUuid: "296681bf-8140-86ab-8ce7-b24435549795"
    - stage: links
      stageUuid: "0d1a4cd3-01dc-82ba-a9f1-7d5140a02884"
    - stage: horo
      stageUuid: "262ae410-45b0-8f2f-b6b6-9401f2189c7f"
    - stage: seal
      stageUuid: "f8aa3d49-1329-819d-bf1d-17fc61614637"
    - stage: uuid
      stageUuid: "faed8928-2bdf-83c7-a996-f565727c34b8"
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

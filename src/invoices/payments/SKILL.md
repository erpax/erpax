---
name: payments
description: "Use when recording or auditing cash received or sent against an invoice — AR/AP GL posting, ISO-20022 pain/pacs message types, IBAN/BIC, period-lock guard, cash-flow classification (IAS-7 / ASC-230). The payments collection."
atomPath: invoices/payments
coordinate: invoices/payments · 4/weave · addb42cb
contentUuid: "15f5e2a9-6e19-565a-80d8-2b57428ae4c6"
diamondUuid: "d1809864-e861-89db-af79-5d8f9abf7fcd"
uuid: "addb42cb-029b-8bc6-8629-3fcf1c023d33"
horo: 4
bonds:
  in:
    - accounting
    - allocations
    - dunning
    - escrow
    - identity
    - invoices
    - law
    - loan
    - proof
    - standard
    - transaction
  out:
    - accounting
    - allocations
    - dunning
    - escrow
    - identity
    - law
    - loan
    - proof
    - standard
    - transaction
typography:
  partition: invoices
  bondDegree: 0
  neighbors: []
standards:
  - "IFRS IAS-7 statement-of-cash-flows"
  - "ISO-13616-1"
  - "ISO-13616-1:2020 iban"
  - "ISO-19011:2018 audit-trail"
  - "ISO-20022 pacs.008 fi-to-fi-customer-credit-transfer"
  - "ISO-20022 pain.001 customer-credit-transfer-initiation"
  - "ISO-20022 pain.008 customer-direct-debit-initiation"
  - "ISO-4217:2015 currency-codes"
  - "ISO-8601-1:2019 date-time payment-date value-date"
  - "ISO-9362"
  - "ISO-9362:2022 bic"
  - "SOX §404 internal-controls"
  - "US-GAAP ASC-230 statement-of-cash-flows"
bindings: []
neighbors:
  wikilink:
    - accounting
    - allocations
    - identity
    - law
    - proof
    - standard
    - transaction
  matrix:
    - accounting
    - allocations
    - dunning
    - escrow
    - identity
    - law
    - loan
    - proof
    - standard
    - transaction
  backlinks:
    - accounting
    - allocations
    - dunning
    - escrow
    - identity
    - law
    - loan
    - proof
    - standard
    - transaction
signatures:
  computationUuid: "6cbed06d-2299-8baf-a3c9-c76ae5a7a178"
  stages:
    - stage: path
      stageUuid: "88ef4de9-3e18-8ada-8375-bab76c5205dc"
    - stage: trinity
      stageUuid: "a55e5b19-0315-8c88-96f1-4c0b23553bb1"
    - stage: boundary
      stageUuid: "7731a4aa-bb7b-8622-8bc1-a93a29ec23f0"
    - stage: links
      stageUuid: "7eed6bf4-5b4b-84d1-b951-0d8bb04a0472"
    - stage: horo
      stageUuid: "e95a0ef0-7737-8bac-bd0d-cd7f92873984"
    - stage: seal
      stageUuid: "f9e293b2-0402-89a3-a40c-4501558054fd"
    - stage: uuid
      stageUuid: "d72fedb0-26b5-8a96-9a4d-dec984a2e349"
version: 2
---
# payments

Payments — money-movement records with GL posting + period-lock guard.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISO-20022 pain.001 customer-credit-transfer-initiation
- ISO-20022 pain.008 customer-direct-debit-initiation
- ISO-20022 pacs.008 fi-to-fi-customer-credit-transfer
- ISO-4217:2015 currency-codes
- ISO-8601-1:2019 date-time payment-date value-date
- ISO-13616-1:2020 iban
- ISO-9362:2022 bic
- IFRS IAS-7 statement-of-cash-flows
- US-GAAP ASC-230 statement-of-cash-flows
- SOX §404 internal-controls
- ISO-19011:2018 audit-trail

Composes: [[invoices/payments/payment/allocations]] · [[accounting]] · [[transaction]] · [[proof]] · [[identity]] · [[standard]].

**Law — [[law]]: every payment is double-entry money-movement posted to the GL and guarded by the period lock — cash recorded against an invoice can never land in a closed period, and its content-uuid hash makes the posting tamper-evident.**

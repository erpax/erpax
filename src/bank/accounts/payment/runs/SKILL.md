---
name: runs
description: "Use when assembling, authorising, exporting, or reconciling an ISO 20022 batch payment — pain.001 AP credit-transfer or pain.008 AR direct-debit; draft → pending-review → approved → exported → submitted → settled lifecycle; SOX §404 preparer-authoriser segregation of duties. The treasury batch-payment initiation collection."
atomPath: bank/accounts/payment/runs
coordinate: bank/accounts/payment/runs · 7/descent · 3dca3059
contentUuid: "cce61338-3940-5da4-afa9-13c06a693e76"
diamondUuid: "c5ded831-b82b-8a4e-95d2-ad2787e222e0"
uuid: "3dca3059-ace3-85bd-95ab-68056176f2e5"
horo: 7
bonds:
  in:
    - accounting
    - accounts
    - mandates
    - payment
    - proof
    - runs
    - standard
    - transaction
  out:
    - accounting
    - accounts
    - mandates
    - proof
    - runs
    - standard
    - transaction
typography:
  partition: bank
  bondDegree: 41
  neighbors: []
standards:
  - "EU-2002/58"
  - "EU-2015/847"
  - "EU-2015/849"
  - "EU-2019/1150"
  - "EU-2019/1152"
  - "EU-2019/1937"
  - "EU-2019/2161"
  - "EU-2019/770"
  - "EU-2019/771"
  - "EU-2022/1925"
  - "EU-2022/2065"
  - "EU-2022/2554"
  - "EU-2022/2555"
  - "EU-2022/868"
  - "EU-Intrastat-Reg-2019/2152"
  - "EU-Taxonomy-2020/852"
  - "IFRS IAS-7 statement-of-cash-flows"
  - "ILO-C001"
  - "ISO-13616-1"
  - "ISO-13616-1:2020 iban"
  - "ISO-19011:2018 audit-trail"
  - "ISO-20022"
  - "ISO-20022 pain.001 customer-credit-transfer-initiation"
  - "ISO-20022 pain.008 customer-direct-debit-initiation"
  - "ISO-20022:2022 universal-financial-industry-message-scheme"
  - "ISO-4217"
  - "ISO-4217:2015 currency-codes"
  - "ISO-8601-1"
  - "ISO-8601-1:2019 date-time creation-execution"
  - "ISO-9362"
  - "ISO-9362:2022 bic"
  - "SOX §404 internal-controls preparer-authoriser-segregation"
  - "US-GAAP ASC-230 statement-of-cash-flows"
bindings: []
neighbors:
  wikilink:
    - accounting
    - mandates
    - proof
    - standard
    - transaction
  matrix:
    - accounting
    - accounts
    - mandates
    - proof
    - runs
    - standard
    - transaction
  backlinks:
    - accounting
    - accounts
    - mandates
    - proof
    - runs
    - standard
    - transaction
signatures:
  computationUuid: "e1646883-95bc-89dc-8377-84bdd88d1fa8"
  stages:
    - stage: path
      stageUuid: "61fb3b69-10fa-8f19-8272-3f03121383be"
    - stage: trinity
      stageUuid: "655376a1-d69b-8f3a-bce6-bea203c23e87"
    - stage: boundary
      stageUuid: "7454830a-6ee8-8730-b1e2-4bd7ff25de51"
    - stage: links
      stageUuid: "06a6e5fe-326f-80bf-bfa1-e8dde2650b9d"
    - stage: horo
      stageUuid: "1e89c195-9818-8d31-b5ae-f71e6c09a02e"
    - stage: seal
      stageUuid: "a7251701-d320-8c67-b56c-ccce48265fe2"
    - stage: uuid
      stageUuid: "4a1918f5-d489-83b0-b3fb-3058bf03e303"
version: 2
---
# payment-runs

Payment Runs — ISO 20022 batch payment initiation.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISO-20022:2022 universal-financial-industry-message-scheme
- ISO-20022 pain.001 customer-credit-transfer-initiation
- ISO-20022 pain.008 customer-direct-debit-initiation
- ISO-13616-1:2020 iban
- ISO-9362:2022 bic
- ISO-4217:2015 currency-codes
- ISO-8601-1:2019 date-time creation-execution
- IFRS IAS-7 statement-of-cash-flows
- US-GAAP ASC-230 statement-of-cash-flows
- ISO-19011:2018 audit-trail
- SOX §404 internal-controls preparer-authoriser-segregation
- ISO-27002 §5.4 segregation-of-duties

Composes: [[media/sepa/mandates]] · [[standard]] · [[transaction]] · [[proof]] · [[accounting]].

---
name: runs
description: "Use when assembling, authorising, exporting, or reconciling an ISO 20022 batch payment — pain.001 AP credit-transfer or pain.008 AR direct-debit; draft → pending-review → approved → exported → submitted → settled lifecycle; SOX §404 preparer-authoriser segregation of duties. The treasury batch-payment initiation collection."
atomPath: "bank/accounts/payment/runs"
coordinate: "bank/accounts/payment/runs · 5/round · 28afe7c7"
contentUuid: "cbb36777-808a-5467-9688-d86cd204e778"
diamondUuid: "9958a581-d422-8b2f-bf96-87b1e4219165"
uuid: "28afe7c7-54a4-8843-93bd-d69028cf50b4"
horo: 5
typography:
  partition: bank
  bondDegree: 42
standards:
  - "EU-Intrastat-Reg-2019/2152"
  - "EU-Taxonomy-2020/852"
  - "IFRS IAS-7 statement-of-cash-flows"
  - "ISO-13616-1"
  - "ISO-13616-1:2020 iban"
  - "ISO-13616-1:2020 iban`"
  - "ISO-20022"
  - "ISO-20022 pain.001 customer-credit-transfer-initiation"
  - "ISO-20022 pain.001 customer-credit-transfer-initiation`"
  - "ISO-20022 pain.008 customer-direct-debit-initiation"
  - "ISO-20022 pain.008 customer-direct-debit-initiation`"
  - "ISO-20022:2022 universal-financial-industry-message-scheme"
  - "ISO-20022:2022 universal-financial-industry-message-scheme`"
  - "ISO-4217"
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 currency-codes`"
  - "ISO-8601-1"
  - "ISO-8601-1:2019 date-time creation-execution"
  - "ISO-8601-1:2019 date-time creation-execution`"
  - "ISO-9362"
  - "ISO-9362:2022 bic"
  - "ISO-9362:2022 bic`"
  - "SOX §404 internal-controls preparer-authoriser-segregation"
  - "US-GAAP ASC-230 statement-of-cash-flows"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "8dc65482-d942-8422-93d3-a0a5d50f917d"
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
      stageUuid: "a1866c0b-5e95-8ccb-b4f2-b7b22f1f3836"
    - stage: seal
      stageUuid: "a7251701-d320-8c67-b56c-ccce48265fe2"
    - stage: uuid
      stageUuid: "98a91161-f2c1-8379-927b-d7b246800f2f"
version: 2
---
# payment-runs

Payment Runs — ISO 20022 batch payment initiation.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-20022:2022 universal-financial-industry-message-scheme`
- `@standard ISO-20022 pain.001 customer-credit-transfer-initiation`
- `@standard ISO-20022 pain.008 customer-direct-debit-initiation`
- `@standard ISO-13616-1:2020 iban`
- `@standard ISO-9362:2022 bic`
- `@standard ISO-4217:2015 currency-codes`
- `@standard ISO-8601-1:2019 date-time creation-execution`

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

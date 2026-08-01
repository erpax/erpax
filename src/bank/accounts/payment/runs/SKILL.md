---
name: runs
description: "Use when assembling, authorising, exporting, or reconciling an ISO 20022 batch payment — pain.001 AP credit-transfer or pain.008 AR direct-debit; draft → pending-review → approved → exported → submitted → settled lifecycle; SOX §404 preparer-authoriser segregation of duties. The treasury batch-payment initiation collection."
atomPath: "bank/accounts/payment/runs"
coordinate: "bank/accounts/payment/runs · 2/share · b0248851"
contentUuid: "a99a24ff-4be5-5fdc-949e-9a89d375629e"
diamondUuid: "21ecd63a-8844-8a6b-a364-dd0ff3c49af4"
uuid: "b0248851-dc86-8e0d-b1da-811b4d0dad43"
horo: 2
typography:
  partition: bank
  bondDegree: 41
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
  computationUuid: "a435c26f-436f-8137-a23a-0fcef2ca5e67"
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
      stageUuid: "25b04ea2-2253-87b0-89a8-1b4e83364018"
    - stage: seal
      stageUuid: "a7251701-d320-8c67-b56c-ccce48265fe2"
    - stage: uuid
      stageUuid: "0e0658d8-4b73-84f5-9e7a-f3e37440cf96"
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

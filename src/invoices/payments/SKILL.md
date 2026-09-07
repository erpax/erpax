---
name: payments
description: "Use when recording or auditing cash received or sent against an invoice — AR/AP GL posting, ISO-20022 pain/pacs message types, IBAN/BIC, period-lock guard, cash-flow classification (IAS-7 / ASC-230). The payments collection."
atomPath: "invoices/payments"
coordinate: "invoices/payments · 4/weave · 3820b449"
contentUuid: "77469e55-f46f-5a98-9305-aa85246599f4"
diamondUuid: "2df43c3a-9ebd-8483-821f-61407a5ffc4b"
uuid: "3820b449-6b49-8676-bb16-e81eddb06a8b"
horo: 4
typography:
  partition: invoices
  bondDegree: 40
standards:
  - "IFRS IAS-7 statement-of-cash-flows"
  - "ISO-13616-1:2020 iban"
  - "ISO-13616-1:2020 iban`"
  - "ISO-20022 pacs.008 fi-to-fi-customer-credit-transfer"
  - "ISO-20022 pacs.008 fi-to-fi-customer-credit-transfer`"
  - "ISO-20022 pain.001 customer-credit-transfer-initiation"
  - "ISO-20022 pain.001 customer-credit-transfer-initiation`"
  - "ISO-20022 pain.008 customer-direct-debit-initiation"
  - "ISO-20022 pain.008 customer-direct-debit-initiation`"
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 currency-codes`"
  - "ISO-8601-1:2019 date-time payment-date value-date"
  - "ISO-8601-1:2019 date-time payment-date value-date`"
  - "ISO-9362"
  - "ISO-9362:2022 bic"
  - "ISO-9362:2022 bic`"
  - "SOX §404 internal-controls"
  - "US-GAAP ASC-230 statement-of-cash-flows"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "f9e4007e-9afa-8281-87cc-0e9fbc4d4ab9"
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
      stageUuid: "a398332e-c996-8616-8510-e477f550991d"
    - stage: seal
      stageUuid: "8dca2122-7371-8050-8241-4c1292634a63"
    - stage: uuid
      stageUuid: "3bb14202-897b-801c-b2c8-7f45de19993a"
version: 2
---
# payments

Payments — money-movement records with GL posting + period-lock guard.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-20022 pain.001 customer-credit-transfer-initiation`
- `@standard ISO-20022 pain.008 customer-direct-debit-initiation`
- `@standard ISO-20022 pacs.008 fi-to-fi-customer-credit-transfer`
- `@standard ISO-4217:2015 currency-codes`
- `@standard ISO-8601-1:2019 date-time payment-date value-date`
- `@standard ISO-13616-1:2020 iban`
- `@standard ISO-9362:2022 bic`

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

---
name: payments
description: "Use when recording or auditing cash received or sent against an invoice — AR/AP GL posting, ISO-20022 pain/pacs message types, IBAN/BIC, period-lock guard, cash-flow classification (IAS-7 / ASC-230). The payments collection."
atomPath: "invoices/payments"
coordinate: "invoices/payments · 2/share · 45aa8fb6"
contentUuid: "b7db235c-81af-5e80-acd9-1763361e0f06"
diamondUuid: "54484862-7630-8c08-b9e5-dbb4564c974f"
uuid: "45aa8fb6-b1a1-8af4-a551-109dd9a03a1d"
horo: 2
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
  computationUuid: "0e3211af-798a-877d-bbc6-e25cb702c4c6"
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
      stageUuid: "3770fbae-36ec-82eb-a944-8ffa9f3dc687"
    - stage: seal
      stageUuid: "8dca2122-7371-8050-8241-4c1292634a63"
    - stage: uuid
      stageUuid: "a9d4e110-eb3e-89d2-af1e-d4d3724c8526"
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

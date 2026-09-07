---
name: payments
description: "Use when recording or auditing cash received or sent against an invoice — AR/AP GL posting, ISO-20022 pain/pacs message types, IBAN/BIC, period-lock guard, cash-flow classification (IAS-7 / ASC-230). The payments collection."
atomPath: "invoices/payments"
coordinate: "invoices/payments · 2/share · 4e787c5e"
contentUuid: "4608b4b0-033b-5b87-b37f-9e7ccecbde7e"
diamondUuid: "d3301d85-2790-8cbc-96b6-bc6c2504955a"
uuid: "4e787c5e-8792-8d6d-b0ef-cdd9723fc13d"
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
  computationUuid: "19e49b64-f6e5-8be9-b982-da2e4daab45e"
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
      stageUuid: "1818d59e-da99-83a1-a48b-69a7bc7cb41e"
    - stage: seal
      stageUuid: "8dca2122-7371-8050-8241-4c1292634a63"
    - stage: uuid
      stageUuid: "d6d2ab4e-7e00-82b4-bf0e-910074e2ebb2"
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

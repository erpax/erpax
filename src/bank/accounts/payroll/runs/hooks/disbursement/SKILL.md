---
name: disbursement
description: "Use when reasoning about disbursement — Payroll Disbursement Hook — fires on `PayrollRuns.status → 'disbursed'` and creates a `payment-runs` row (messageType = pain_001) drawing against the Net Payroll Payable."
atomPath: "bank/accounts/payroll/runs/hooks/disbursement"
coordinate: "bank/accounts/payroll/runs/hooks/disbursement · 1/base · 829085f5"
contentUuid: "b0286ee1-1dc7-528d-80b4-d544e9df2f18"
diamondUuid: "615fb493-2e15-8594-9476-6a388960efc4"
uuid: "829085f5-ae32-838c-863a-f369caec6f62"
horo: 1
typography:
  partition: bank
  bondDegree: 6
standards:
  - "EU-Intrastat-Reg-2019/2152"
  - "EU-Taxonomy-2020/852"
  - "IFRS IAS-7 statement-of-cash-flows payroll-disbursement"
  - "ISO-13616-1"
  - "ISO-13616-1:2020 iban"
  - "ISO-20022"
  - "ISO-20022 pain.001 customer-credit-transfer-initiation"
  - "ISO-4217"
  - "ISO-4217:2015 currency-codes"
  - "ISO-8601-1"
  - "ISO-8601-1:2019 date-time payment-date"
  - "ISO-9362"
  - "ISO-9362:2022 bic"
  - "ISO/IEC-29119"
  - "SOX §404 internal-controls"
bindings: []
signatures:
  computationUuid: "2247317f-42eb-80b8-9710-278c3f51c988"
  stages:
    - stage: path
      stageUuid: "1cb20a66-71bb-89e1-846f-808027a81294"
    - stage: trinity
      stageUuid: "01e4a250-d0d3-8a7b-b8dc-4af70ed6b9b1"
    - stage: boundary
      stageUuid: "62d2d7ec-1f43-8234-bffb-6c15655f9f80"
    - stage: links
      stageUuid: "56be71ec-5b3e-86b6-b111-da7a66a529cb"
    - stage: horo
      stageUuid: "0ebc5195-8a68-858d-91a8-7a5d3117b2c4"
    - stage: seal
      stageUuid: "812a4a91-14a9-8752-afc7-2f7be3dc100e"
    - stage: uuid
      stageUuid: "6eebab18-d734-86a6-a031-bd5f59687c8f"
version: 2
---
# bank/accounts/payroll/runs/hooks/disbursement

Payroll Disbursement Hook — fires on `PayrollRuns.status → 'disbursed'` and creates a `payment-runs` row (messageType = pain_001) drawing against the Net Payroll Payable.

Extracted from `bank/accounts/payroll/runs/hooks/disbursement.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[bank/accounts/payroll/runs]].

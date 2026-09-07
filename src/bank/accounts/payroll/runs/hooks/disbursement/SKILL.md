---
name: disbursement
description: "Use when reasoning about disbursement — Payroll Disbursement Hook — fires on `PayrollRuns.status → 'disbursed'` and creates a `payment-runs` row (messageType = pain_001) drawing against the Net Payroll Payable."
atomPath: "bank/accounts/payroll/runs/hooks/disbursement"
coordinate: "bank/accounts/payroll/runs/hooks/disbursement · 7/descent · 3ecb607f"
contentUuid: "48266631-450a-5ce9-9916-5bb2dd06d9f7"
diamondUuid: "c268db4f-4cd9-82a8-b200-30c2457d0e07"
uuid: "3ecb607f-a9d7-8254-8927-5fbb5ba1f7f1"
horo: 7
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
  computationUuid: "aebbb28c-19b5-891f-afc0-2803cc511669"
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
      stageUuid: "64e6182a-eda8-8ca8-90f8-44ab8d8d81bf"
    - stage: seal
      stageUuid: "812a4a91-14a9-8752-afc7-2f7be3dc100e"
    - stage: uuid
      stageUuid: "83cda7d6-a955-8a21-b858-9f7a3be5536c"
version: 2
---
# bank/accounts/payroll/runs/hooks/disbursement

Payroll Disbursement Hook — fires on `PayrollRuns.status → 'disbursed'` and creates a `payment-runs` row (messageType = pain_001) drawing against the Net Payroll Payable.

Extracted from `bank/accounts/payroll/runs/hooks/disbursement.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[bank/accounts/payroll/runs]].

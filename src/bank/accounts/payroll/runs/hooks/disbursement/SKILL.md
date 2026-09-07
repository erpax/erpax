---
name: disbursement
description: "Use when reasoning about disbursement — Payroll Disbursement Hook — fires on `PayrollRuns.status → 'disbursed'` and creates a `payment-runs` row (messageType = pain_001) drawing against the Net Payroll Payable."
atomPath: "bank/accounts/payroll/runs/hooks/disbursement"
coordinate: "bank/accounts/payroll/runs/hooks/disbursement · 7/descent · 2b410575"
contentUuid: "dfca6970-6e25-52af-b9b6-72427dad2365"
diamondUuid: "ccac929d-6ac2-870c-868a-618951150548"
uuid: "2b410575-50b2-8ac6-8753-45a35ef427f9"
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
  computationUuid: "48914d33-08f9-858b-9e0c-8ef627a4edec"
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
      stageUuid: "82108de1-5f7e-8bbb-8b9c-2ce8654a5552"
    - stage: seal
      stageUuid: "812a4a91-14a9-8752-afc7-2f7be3dc100e"
    - stage: uuid
      stageUuid: "988dbcf5-1f41-86eb-a7c9-bfd7e7140c75"
version: 2
---
# bank/accounts/payroll/runs/hooks/disbursement

Payroll Disbursement Hook — fires on `PayrollRuns.status → 'disbursed'` and creates a `payment-runs` row (messageType = pain_001) drawing against the Net Payroll Payable.

Extracted from `bank/accounts/payroll/runs/hooks/disbursement.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[bank/accounts/payroll/runs]].

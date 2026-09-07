---
name: types
description: "Use when reasoning about types — Canonical ISO 20022 types — semantic shapes for the message families this codebase touches: camt.052/053/054 (cash mgmt), pain.001/002/008 (customer initiation + status), pacs.008 (FI credit transfer), pacs.004 (payment return)."
atomPath: "iso/20022/types"
coordinate: "iso/20022/types · 1/base · 10a5789e"
contentUuid: "30949705-7e3c-5663-a8ca-bc9a0d115f99"
diamondUuid: "c598d06d-f736-8792-81cc-0d415ef2b5f1"
uuid: "10a5789e-0b82-80d3-b439-c3bfe6982cfa"
horo: 1
typography:
  partition: iso
  bondDegree: 85
standards:
  - "IFRS IAS-7 statement-of-cash-flows"
  - "ISO-11649:2009 financial-services-creditor-reference"
  - "ISO-13616-1:2020 iban"
  - "ISO-17442"
  - "ISO-17442-1"
  - "ISO-17442-1:2020 lei"
  - "ISO-20022 BankToCustomerAccountReportV08"
  - "ISO-20022 BankToCustomerDebitCreditNotificationV08"
  - "ISO-20022 BankToCustomerStatementV08"
  - "ISO-20022 ChargeBearerType1Code"
  - "ISO-20022 CreditDebitCode"
  - "ISO-20022 CreditTransferTransaction34"
  - "ISO-20022 CreditTransferTransaction39"
  - "ISO-20022 CustomerCreditTransferInitiationV09"
  - "ISO-20022 CustomerDirectDebitInitiationV08"
  - "ISO-20022 CustomerPaymentStatusReportV10"
  - "ISO-20022 DirectDebitTransactionInformation23"
  - "ISO-20022 EntryStatus2Code"
  - "ISO-20022 EntryTransaction10"
  - "ISO-20022 ExternalBankTransactionDomain1Code"
  - "ISO-20022 ExternalBankTransactionFamily1Code"
  - "ISO-20022 ExternalBankTransactionSubFamily1Code"
  - "ISO-20022 ExternalPaymentTransactionStatus1Code"
  - "ISO-20022 FIToFICustomerCreditTransferV08"
  - "ISO-20022 PartyIdentification135"
  - "ISO-20022 PaymentInstruction23"
  - "ISO-20022 PaymentInstruction30"
  - "ISO-20022 PaymentReturnV09"
  - "ISO-20022 PaymentTransaction109"
  - "ISO-20022 PaymentTransaction110"
  - "ISO-20022 PostalAddress24"
  - "ISO-20022 RemittanceInformation16"
  - "ISO-20022 ReportEntry10"
  - "ISO-20022:2022 universal-financial-industry-message-scheme"
  - "ISO-4217:2015 currency-codes"
  - "ISO-8601-1:2019 date-time"
  - "ISO-9362"
  - "ISO-9362:2022 bic"
  - "ISO/IEC-29119"
bindings: []
signatures:
  computationUuid: "af679cb5-217b-8d1f-9644-594735886afd"
  stages:
    - stage: path
      stageUuid: "83bc0ccc-26bf-8082-8660-0171d0f2bc4f"
    - stage: trinity
      stageUuid: "b2c79d62-23a4-8974-8632-dfae70af0d93"
    - stage: boundary
      stageUuid: "bf64aa17-13be-8cad-8be6-4ad4a33094fb"
    - stage: links
      stageUuid: "c0c1c1b9-f48a-8dbb-9efc-7eec068669bf"
    - stage: horo
      stageUuid: "746b2dec-8237-8736-a91f-f39117344d0c"
    - stage: seal
      stageUuid: "38850b44-06ba-88a2-8bc9-3b722539b229"
    - stage: uuid
      stageUuid: "f08fa52a-501a-803c-8a15-11cbd60e26fd"
version: 2
---
# iso/20022/types

Canonical ISO 20022 types — semantic shapes for the message families this codebase touches: camt.052/053/054 (cash mgmt), pain.001/002/008 (customer initiation + status), pacs.008 (FI credit transfer), pacs.004 (payment return).

Extracted from `iso/20022/types.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[iso/20022]].

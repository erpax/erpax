---
name: types
description: "Use when reasoning about types — Canonical ISO 20022 types — semantic shapes for the message families this codebase touches: camt.052/053/054 (cash mgmt), pain.001/002/008 (customer initiation + status), pacs.008 (FI credit transfer), pacs.004 (payment return)."
atomPath: "iso/20022/types"
coordinate: "iso/20022/types · 5/round · 445411ca"
contentUuid: "34ffce42-f1cc-5ae4-a3f9-b0208e39d25e"
diamondUuid: "61ca6ba4-752f-8a1f-9559-8bdec378ebb3"
uuid: "445411ca-b378-84a2-a5d3-5bf72794acce"
horo: 5
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
  computationUuid: "4914d2a0-b463-8583-a78d-5b7ecc0a60f5"
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
      stageUuid: "0636f0d8-ec49-83cb-8fa7-6e448709d4c7"
    - stage: seal
      stageUuid: "38850b44-06ba-88a2-8bc9-3b722539b229"
    - stage: uuid
      stageUuid: "539971ea-2569-89c2-99b0-42e563141404"
version: 2
---
# iso/20022/types

Canonical ISO 20022 types — semantic shapes for the message families this codebase touches: camt.052/053/054 (cash mgmt), pain.001/002/008 (customer initiation + status), pacs.008 (FI credit transfer), pacs.004 (payment return).

Extracted from `iso/20022/types.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[iso/20022]].

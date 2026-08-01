---
name: transactions
description: "Use when matching, querying, or auditing individual ISO 20022 camt.053 bank-statement lines — each line is a first-class row with externalId, bookingDate, valueDate, amount, creditDebitIndicator, currency, booking status, bank transaction code, counterparty IBAN/BIC, remittance info, and matchStatus against journal entries. The per-line reconciliation-evidence collection."
atomPath: "bank/accounts/bank/transactions"
coordinate: "bank/accounts/bank/transactions · 4/weave · 026541a4"
contentUuid: "7f19290b-bb76-58ad-9f33-c550fdeb95ee"
diamondUuid: "a9faa906-4fe3-8c92-a3c9-72c45067817f"
uuid: "026541a4-84ef-86e5-88ed-fe1e1d756c71"
horo: 4
typography:
  partition: bank
  bondDegree: 54
standards:
  - "EU-Intrastat-Reg-2019/2152"
  - "EU-Taxonomy-2020/852"
  - "IFRS IAS-7 statement-of-cash-flows"
  - "ISO-11649:2009 financial-services-creditor-reference"
  - "ISO-11649:2009 financial-services-creditor-reference`"
  - "ISO-13616-1"
  - "ISO-13616-1:2020 iban"
  - "ISO-13616-1:2020 iban`"
  - "ISO-20022"
  - "ISO-20022 ChargeBearerType1Code"
  - "ISO-20022 ChargeBearerType1Code`"
  - "ISO-20022 CreditDebitCode"
  - "ISO-20022 CreditDebitCode`"
  - "ISO-20022 EntryStatus2Code"
  - "ISO-20022 EntryStatus2Code`"
  - "ISO-20022 ExternalBankTransactionDomain1Code"
  - "ISO-20022 ExternalBankTransactionDomain1Code`"
  - "ISO-20022 ExternalBankTransactionFamily1Code"
  - "ISO-20022 ExternalBankTransactionFamily1Code`"
  - "ISO-20022 ExternalBankTransactionSubFamily1Code"
  - "ISO-20022 ExternalBankTransactionSubFamily1Code`"
  - "ISO-20022 camt.053 bank-to-customer-statement"
  - "ISO-20022 camt.053 bank-to-customer-statement`"
  - "ISO-4217"
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 currency-codes`"
  - "ISO-8601-1"
  - "ISO-8601-1:2019 date-time value-date booking-date matched-at"
  - "ISO-8601-1:2019 date-time value-date booking-date matched-at`"
  - "ISO-9362"
  - "ISO-9362:2022 bic"
  - "ISO-9362:2022 bic`"
  - "SOX §404 internal-controls bank-reconciliation"
  - "US-GAAP ASC-230 cash-flows"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "76bb300e-8747-8db0-b5ac-d1b8ee115341"
  stages:
    - stage: path
      stageUuid: "9bc72c7d-c011-87de-9ab1-8199c303678f"
    - stage: trinity
      stageUuid: "4b0fb033-83d8-81a1-8cad-738ed8cbe918"
    - stage: boundary
      stageUuid: "a87ac440-bc09-8c49-b589-43c5173e4315"
    - stage: links
      stageUuid: "3aec9d04-56f1-8b47-95dd-dd1dcc4349b6"
    - stage: horo
      stageUuid: "eebcd013-db21-8916-8bd2-e86b87325b71"
    - stage: seal
      stageUuid: "b723adb2-6ded-8e95-aef0-6ca2dfe75fed"
    - stage: uuid
      stageUuid: "13d33eb6-85f8-81a6-9c0f-24d03190f689"
version: 2
---
# bank-transactions

Individual ISO 20022 camt.053 [[standard|bank-statement lines]] extracted into first-class rows for [[accounting|reconciliation]] matching. Decomposes the canonical `Camt053Transaction` (see `@/standards/iso-20022` for field mapping) into a queryable, [[proof|auditable]] projection: `accountServicerReference`, `endToEndId`, `valueDate`, `bookingDate`, `amount` (signed), `creditDebitIndicator` (CRDT|DBIT), `currency`, `bookingStatus` (BOOK|PDNG|INFO|FUTR), bank transaction code (domain/family/subfamily), [[party|counterparty]] name/IBAN/BIC, `chargeBearer` (DEBT|CRED|SHAR|SLEV), and remittance info (description + structured reference).

Promotes each camt.053 line into a [[transaction]] row so it can be matched ↔ [[accounting|journal entries]] and [[identity|audited]] per line (SOX §404 reconciliation evidence). Relationship: `bankAccount` (rel), `statement` (parent camt.053, if batch-imported), `matchedJournalEntries[]` (with matchScore for fuzzy matching).

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-20022 camt.053 bank-to-customer-statement`
- `@standard ISO-20022 ExternalBankTransactionDomain1Code`
- `@standard ISO-20022 ExternalBankTransactionFamily1Code`
- `@standard ISO-20022 ExternalBankTransactionSubFamily1Code`
- `@standard ISO-20022 EntryStatus2Code`
- `@standard ISO-20022 CreditDebitCode`
- `@standard ISO-20022 ChargeBearerType1Code`
- `@standard ISO-11649:2009 financial-services-creditor-reference`
- `@standard ISO-13616-1:2020 iban`
- `@standard ISO-9362:2022 bic`
- `@standard ISO-4217:2015 currency-codes`
- `@standard ISO-8601-1:2019 date-time value-date booking-date matched-at`

- ISO-20022 camt.053 bank-to-customer-statement
- ISO-20022 ExternalBankTransactionDomain1Code
- ISO-20022 ExternalBankTransactionFamily1Code
- ISO-20022 ExternalBankTransactionSubFamily1Code
- ISO-20022 EntryStatus2Code
- ISO-20022 CreditDebitCode
- ISO-20022 ChargeBearerType1Code
- ISO-11649:2009 financial-services-creditor-reference
- ISO-13616-1:2020 iban
- ISO-9362:2022 bic
- ISO-4217:2015 currency-codes
- ISO-8601-1:2019 date-time value-date booking-date matched-at
- IFRS IAS-7 statement-of-cash-flows
- US-GAAP ASC-230 cash-flows
- ISO-19011:2018 audit-trail reconciliation-line-evidence
- SOX §404 internal-controls bank-reconciliation
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[accounting]] · [[transaction]] · [[party]] · [[standard]] · [[proof]].

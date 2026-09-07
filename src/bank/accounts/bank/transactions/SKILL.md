---
name: transactions
description: "Use when matching, querying, or auditing individual ISO 20022 camt.053 bank-statement lines — each line is a first-class row with externalId, bookingDate, valueDate, amount, creditDebitIndicator, currency, booking status, bank transaction code, counterparty IBAN/BIC, remittance info, and matchStatus against journal entries. The per-line reconciliation-evidence collection."
atomPath: "bank/accounts/bank/transactions"
coordinate: "bank/accounts/bank/transactions · 2/share · c2d27cf9"
contentUuid: "6e52d152-0795-5390-a829-0ac967762313"
diamondUuid: "64ece0dc-8dfb-89a2-b7f1-4df6ceb5bcfc"
uuid: "c2d27cf9-cfd1-8fb5-b48e-a5a0f8e8ac23"
horo: 2
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
  computationUuid: "171313c4-9ed2-82be-95db-6da22ec53846"
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
      stageUuid: "25e352ad-0685-88f5-be29-d9090d34237e"
    - stage: seal
      stageUuid: "b723adb2-6ded-8e95-aef0-6ca2dfe75fed"
    - stage: uuid
      stageUuid: "fe902261-0b7e-82ad-8ed2-32f02370e82b"
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

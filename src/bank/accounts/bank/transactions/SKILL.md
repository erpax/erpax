---
name: bank-transactions
description: Use when matching, querying, or auditing individual ISO 20022 camt.053 bank-statement lines — each line is a first-class row with externalId, bookingDate, valueDate, amount, creditDebitIndicator, currency, booking status, bank transaction code, counterparty IBAN/BIC, remittance info, and matchStatus against journal entries. The per-line reconciliation-evidence collection.
---

# bank-transactions

Individual ISO 20022 camt.053 [[standard|bank-statement lines]] extracted into first-class rows for [[accounting|reconciliation]] matching. Decomposes the canonical `Camt053Transaction` (see `@/standards/iso-20022` for field mapping) into a queryable, [[proof|auditable]] projection: `accountServicerReference`, `endToEndId`, `valueDate`, `bookingDate`, `amount` (signed), `creditDebitIndicator` (CRDT|DBIT), `currency`, `bookingStatus` (BOOK|PDNG|INFO|FUTR), bank transaction code (domain/family/subfamily), [[party|counterparty]] name/IBAN/BIC, `chargeBearer` (DEBT|CRED|SHAR|SLEV), and remittance info (description + structured reference).

Promotes each camt.053 line into a [[transaction]] row so it can be matched ↔ [[accounting|journal entries]] and [[identity|audited]] per line (SOX §404 reconciliation evidence). Relationship: `bankAccount` (rel), `statement` (parent camt.053, if batch-imported), `matchedJournalEntries[]` (with matchScore for fuzzy matching).

## Standards
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

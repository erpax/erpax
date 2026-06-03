---
name: bank-transactions
description: The bank-transactions collection — Bank Transactions — individual bank-statement lines normalised out of
---

# bank-transactions

Bank Transactions — individual bank-statement lines normalised out of.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

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

Composes: [[accounting]].

---
name: statements
description: "Use when importing or matching bank statements (CSV, OFX, API) against journal entries for reconciliation — opening/closing balance, transaction lines, match type, variance; feeds account-reconciliations and IAS-7 cash-flow GL. The bank-statements import collection."
atomPath: "gl/accounts/bank/statements"
coordinate: "gl/accounts/bank/statements · 2/share · ec9dda0d"
contentUuid: "6afc6b78-ad26-5a5c-bb75-9603820eac51"
diamondUuid: "323feb25-79e0-87be-9598-f6f98f9d677f"
uuid: "ec9dda0d-4e2d-8e9d-9915-1b48d2633fec"
horo: 2
typography:
  partition: gl
  bondDegree: 53
standards:
  - "IFRS IAS-7 statement-of-cash-flows"
  - "ISO-13616-1:2020 iban"
  - "ISO-13616-1:2020 iban`"
  - "ISO-20022 camt.053 bank-to-customer-statement"
  - "ISO-20022 camt.053 bank-to-customer-statement`"
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 currency-codes`"
  - "ISO-8601-1:2019 date-time statement-date period-start reconciled-at"
  - "ISO-8601-1:2019 date-time statement-date period-start reconciled-at`"
  - "ISO-9362"
  - "ISO-9362:2022 bic"
  - "ISO-9362:2022 bic`"
  - "SOX §404 internal-controls reconciliation-evidence"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "1f385c34-07e2-8194-a9d1-00c0a7df6640"
  stages:
    - stage: path
      stageUuid: "6d118f30-67d4-8f95-a572-fe9bfdd7ab3e"
    - stage: trinity
      stageUuid: "0672f912-c9cd-84cb-a25e-8057536dc9d4"
    - stage: boundary
      stageUuid: "bbd0e3c9-f226-85e7-af28-bb9412f52c8f"
    - stage: links
      stageUuid: "00b34f27-e857-898d-afb5-f65130d311d9"
    - stage: horo
      stageUuid: "0a6457b2-8496-8e5c-8052-d87b4d540394"
    - stage: seal
      stageUuid: "7519ed5d-8015-8786-8592-2a84e63cca62"
    - stage: uuid
      stageUuid: "4594c791-dc57-842f-8366-f6010de5c804"
version: 2
---
# bank-statements

Bank Statements — imported / matched bank statements feeding reconciliation.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-20022 camt.053 bank-to-customer-statement`
- `@standard ISO-13616-1:2020 iban`
- `@standard ISO-9362:2022 bic`
- `@standard ISO-4217:2015 currency-codes`
- `@standard ISO-8601-1:2019 date-time statement-date period-start reconciled-at`

- ISO-20022 camt.053 bank-to-customer-statement
- ISO-13616-1:2020 iban
- ISO-9362:2022 bic
- ISO-4217:2015 currency-codes
- ISO-8601-1:2019 date-time statement-date period-start reconciled-at
- IFRS IAS-7 statement-of-cash-flows
- ISO-19011:2018 audit-trail
- SOX §404 internal-controls reconciliation-evidence
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[accounting]], [[transaction]], [[horo]], [[identity]], [[proof]], [[standard]].

**Law — [[law]]: a bank statement is the external [[proof]] of cash — imported lines (CSV/OFX/API) matched against journal entries with a typed match and variance, feeding reconciliation; the bank is the [[anchor]] the ledger reconciles to.**

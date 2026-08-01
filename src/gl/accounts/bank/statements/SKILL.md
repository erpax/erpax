---
name: statements
description: "Use when importing or matching bank statements (CSV, OFX, API) against journal entries for reconciliation — opening/closing balance, transaction lines, match type, variance; feeds account-reconciliations and IAS-7 cash-flow GL. The bank-statements import collection."
atomPath: "gl/accounts/bank/statements"
coordinate: "gl/accounts/bank/statements · 8/crest · ff66ebbb"
contentUuid: "d43a1439-4d51-5372-875e-e6d0e49956da"
diamondUuid: "e453175d-b957-8106-bdcc-4ac956f780d6"
uuid: "ff66ebbb-a5dc-8146-a5c6-5f9e0efa29e9"
horo: 8
typography:
  partition: gl
  bondDegree: 0
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
  computationUuid: "512ce538-6903-86a3-bd13-5cc7ae6ead51"
  stages:
    - stage: path
      stageUuid: "6d118f30-67d4-8f95-a572-fe9bfdd7ab3e"
    - stage: trinity
      stageUuid: "0672f912-c9cd-84cb-a25e-8057536dc9d4"
    - stage: boundary
      stageUuid: "39a8043a-0fcb-8cfa-ae38-0bf00cde7161"
    - stage: links
      stageUuid: "00b34f27-e857-898d-afb5-f65130d311d9"
    - stage: horo
      stageUuid: "7c2a2c12-15b9-821a-9be9-14a123d64a38"
    - stage: seal
      stageUuid: "7519ed5d-8015-8786-8592-2a84e63cca62"
    - stage: uuid
      stageUuid: "39c6db08-c09e-8ce4-b8c6-e4a2baab1295"
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

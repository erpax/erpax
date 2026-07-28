---
name: statements
description: "Use when importing or matching bank statements (CSV, OFX, API) against journal entries for reconciliation — opening/closing balance, transaction lines, match type, variance; feeds account-reconciliations and IAS-7 cash-flow GL. The bank-statements import collection."
atomPath: "gl/accounts/bank/statements"
coordinate: "gl/accounts/bank/statements · 1/base · 050440ca"
contentUuid: "558436b8-215d-5044-88e6-df4e69cdbc1c"
diamondUuid: "04377bb6-1840-8d44-9a08-f73f6af78325"
uuid: "050440ca-5f0d-8660-a4f5-edb8779ebd47"
horo: 1
bonds:
  in:
    - accounting
    - balance
    - bank
    - budgetvariance
    - disclosure
    - hedge
    - horo
    - identity
    - law
    - materiality
    - proof
    - segment
    - standard
    - transaction
    - variance
  out:
    - accounting
    - balance
    - budgetvariance
    - disclosure
    - hedge
    - horo
    - identity
    - law
    - materiality
    - proof
    - segment
    - standard
    - transaction
    - variance
typography:
  partition: gl
  bondDegree: 0
  neighbors: []
standards:
  - "IFRS IAS-7 statement-of-cash-flows"
  - "ISO-13616-1"
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
neighbors:
  wikilink:
    - accounting
    - anchor
    - horo
    - identity
    - law
    - proof
    - standard
    - transaction
  matrix:
    - accounting
    - balance
    - budgetvariance
    - disclosure
    - hedge
    - horo
    - identity
    - law
    - materiality
    - proof
    - segment
    - standard
    - transaction
    - variance
  backlinks:
    - accounting
    - balance
    - budgetvariance
    - disclosure
    - hedge
    - horo
    - identity
    - law
    - materiality
    - proof
    - segment
    - standard
    - transaction
    - variance
signatures:
  computationUuid: "97f52fe0-503e-8590-b96c-38844c311681"
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
      stageUuid: "318c4b6c-530c-899b-9021-fa8559f7b73e"
    - stage: seal
      stageUuid: "7519ed5d-8015-8786-8592-2a84e63cca62"
    - stage: uuid
      stageUuid: "8357bf1e-b1b4-8375-9851-24eb926864d6"
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

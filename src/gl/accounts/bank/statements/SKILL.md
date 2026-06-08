---
name: statements
description: "Use when importing or matching bank statements (CSV, OFX, API) against journal entries for reconciliation — opening/closing balance, transaction lines, match type, variance; feeds account-reconciliations and IAS-7 cash-flow GL. The bank-statements import collection."
atomPath: gl/accounts/bank/statements
coordinate: gl/accounts/bank/statements · 1/base · 32cb5a4c
contentUuid: "b6fe1776-aa4d-5133-8659-7c7a785dd816"
diamondUuid: "e9754da0-680d-868d-9d1b-6a9136b6c427"
uuid: "32cb5a4c-6508-8272-b929-0f31b912452e"
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
  - "ISO-19011:2018 audit-trail"
  - "ISO-20022"
  - "ISO-20022 camt.053 bank-to-customer-statement"
  - "ISO-4217:2015 currency-codes"
  - "ISO-8601-1:2019 date-time statement-date period-start reconciled-at"
  - "ISO-9362"
  - "ISO-9362:2022 bic"
  - "SOX §404 internal-controls reconciliation-evidence"
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
  computationUuid: "f662e406-f60d-8e15-92b3-a6c4a42f3dc6"
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
      stageUuid: "7cf6f104-e6b6-8f81-afd1-76671d1e9f3d"
    - stage: seal
      stageUuid: "7519ed5d-8015-8786-8592-2a84e63cca62"
    - stage: uuid
      stageUuid: "b6879f85-cf34-8987-a2cd-d455541d4ee4"
version: 2
---
# bank-statements

Bank Statements — imported / matched bank statements feeding reconciliation.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
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

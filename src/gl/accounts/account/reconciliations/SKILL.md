---
name: reconciliations
description: "Use when capturing or reviewing period-end reconciliation sign-off evidence — bank, GL-to-subledger, or intercompany — with preparer/reviewer segregation, adjustment aging, and closure check (difference = 0); SOX §404 + ISO-19011 controls testing. The account-reconciliations evidence-pack collection."
atomPath: "gl/accounts/account/reconciliations"
coordinate: "gl/accounts/account/reconciliations · 1/base · b1ecc095"
contentUuid: "821b0f3b-a3ef-5718-96d7-5b8e8db011f8"
diamondUuid: "f30b99a8-cff4-8d33-9fc3-131cebd89024"
uuid: "b1ecc095-51f1-8c26-94a4-75af589d6e67"
horo: 1
typography:
  partition: gl
  bondDegree: 22
standards:
  - "IFRS IAS-7 statement-of-cash-flows bank-reconciliation"
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 currency-codes`"
  - "ISO-8601-1:2019 date-time as-of-date approved-at"
  - "ISO-8601-1:2019 date-time as-of-date approved-at`"
  - "SOX §404 internal-controls reconciliation-sign-off"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "3a787347-c8e7-8d25-85d9-9f3a141c7216"
  stages:
    - stage: path
      stageUuid: "d03a1711-d99b-8264-a540-d84d7daf5b1e"
    - stage: trinity
      stageUuid: "cc6514cf-2402-8d4e-876e-c6e9baf2f57a"
    - stage: boundary
      stageUuid: "7bbfcc5f-ce68-83cd-ad56-3b5a1917b4f4"
    - stage: links
      stageUuid: "0b45f078-3814-8355-b2de-1a386849c20a"
    - stage: horo
      stageUuid: "03b75756-7ee1-8291-95fe-a9a7186ca068"
    - stage: seal
      stageUuid: "e3ce2be4-a131-8db4-a85a-8bc5d8ecbef8"
    - stage: uuid
      stageUuid: "e6656c4e-fd9f-86e0-a891-e7bf2c3fea60"
version: 2
---
# account-reconciliations

Account Reconciliations — period-end sign-off evidence pack.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-8601-1:2019 date-time as-of-date approved-at`
- `@standard ISO-4217:2015 currency-codes`

- ISO-8601-1:2019 date-time as-of-date approved-at
- ISO-4217:2015 currency-codes
- IFRS IAS-7 statement-of-cash-flows bank-reconciliation
- ISO-19011:2018 audit-trail period-end-evidence
- ISO-19011:2018 audit-evidence preparer-reviewer-segregation
- SOX §404 internal-controls reconciliation-sign-off
- ISO-27002 §5.4 segregation-of-duties preparer-vs-reviewer

Composes: [[bank/accounts/bank/transactions]] · [[accounting]] · [[journal/entries]] · [[gl/accounts]] · [[bank/accounts]] · [[gl/accounts/bank/statements]].

**Law — [[law]]: a reconciliation is signed-off evidence that the difference is zero — GL against subledger/bank/intercompany — with preparer/reviewer segregation; an unclosed reconciliation is an unbalanced book.**

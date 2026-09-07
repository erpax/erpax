---
name: reconciliations
description: "Use when capturing or reviewing period-end reconciliation sign-off evidence — bank, GL-to-subledger, or intercompany — with preparer/reviewer segregation, adjustment aging, and closure check (difference = 0); SOX §404 + ISO-19011 controls testing. The account-reconciliations evidence-pack collection."
atomPath: "gl/accounts/account/reconciliations"
coordinate: "gl/accounts/account/reconciliations · 1/base · b630f1fd"
contentUuid: "dee74490-7663-5477-9a32-7046a2a35cf2"
diamondUuid: "1c2ed765-7ab1-8c12-9cf7-ae5c571047c7"
uuid: "b630f1fd-58a8-840f-a0bb-0a193287b062"
horo: 1
typography:
  partition: gl
  bondDegree: 25
standards:
  - "IFRS IAS-7 statement-of-cash-flows bank-reconciliation"
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 currency-codes`"
  - "ISO-8601-1:2019 date-time as-of-date approved-at"
  - "ISO-8601-1:2019 date-time as-of-date approved-at`"
  - "SOX §404 internal-controls reconciliation-sign-off"
  - "W3C-PROV-O"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "b6c97252-b7d6-81d7-ba50-7d74a65f9e56"
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
      stageUuid: "6373958b-131f-80f4-a56c-5845e17ca19b"
    - stage: seal
      stageUuid: "e3ce2be4-a131-8db4-a85a-8bc5d8ecbef8"
    - stage: uuid
      stageUuid: "10a55384-8423-83ea-b1b1-bebce8ef9558"
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

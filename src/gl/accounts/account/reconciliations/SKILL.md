---
name: reconciliations
description: "Use when capturing or reviewing period-end reconciliation sign-off evidence — bank, GL-to-subledger, or intercompany — with preparer/reviewer segregation, adjustment aging, and closure check (difference = 0); SOX §404 + ISO-19011 controls testing. The account-reconciliations evidence-pack collection."
atomPath: gl/accounts/account/reconciliations
coordinate: gl/accounts/account/reconciliations · 1/base · 69021456
contentUuid: "8eb631bb-6951-5845-a61a-df3207a750c4"
diamondUuid: "a0031f89-b96b-866d-979e-f4b81170b690"
uuid: "69021456-278c-8441-9caa-563546e981fe"
horo: 1
bonds:
  in:
    - account
    - accounting
    - accounts
    - proof
    - reconciliation
    - statements
    - transaction
  out:
    - accounting
    - accounts
    - proof
    - reconciliation
    - statements
    - transaction
typography:
  partition: gl
  bondDegree: 25
  neighbors: []
standards:
  - "IFRS IAS-7 statement-of-cash-flows bank-reconciliation"
  - "ISO-19011:2018 audit-evidence preparer-reviewer-segregation"
  - "ISO-19011:2018 audit-trail period-end-evidence"
  - "ISO-4217:2015 currency-codes"
  - "ISO-8601-1:2019 date-time as-of-date approved-at"
  - "SOX §404 internal-controls reconciliation-sign-off"
  - "W3C-PROV-O"
bindings: []
neighbors:
  wikilink:
    - accounting
    - accounts
    - entries
    - law
    - statements
    - transactions
  matrix:
    - accounting
    - accounts
    - proof
    - reconciliation
    - statements
    - transaction
  backlinks:
    - accounting
    - accounts
    - proof
    - reconciliation
    - statements
    - transaction
signatures:
  computationUuid: "0dde1ed6-8c74-84b0-942d-1e6a56ff7950"
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
      stageUuid: "5176a9a2-0c1c-83ce-81a5-62531fb3dd6d"
    - stage: seal
      stageUuid: "e3ce2be4-a131-8db4-a85a-8bc5d8ecbef8"
    - stage: uuid
      stageUuid: "188b4453-81cf-8234-bcdc-f2e038dac6cc"
version: 2
---
# account-reconciliations

Account Reconciliations — period-end sign-off evidence pack.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISO-8601-1:2019 date-time as-of-date approved-at
- ISO-4217:2015 currency-codes
- IFRS IAS-7 statement-of-cash-flows bank-reconciliation
- ISO-19011:2018 audit-trail period-end-evidence
- ISO-19011:2018 audit-evidence preparer-reviewer-segregation
- SOX §404 internal-controls reconciliation-sign-off
- ISO-27002 §5.4 segregation-of-duties preparer-vs-reviewer

Composes: [[bank/accounts/bank/transactions]] · [[accounting]] · [[journal/entries]] · [[gl/accounts]] · [[bank/accounts]] · [[gl/accounts/bank/statements]].

**Law — [[law]]: a reconciliation is signed-off evidence that the difference is zero — GL against subledger/bank/intercompany — with preparer/reviewer segregation; an unclosed reconciliation is an unbalanced book.**

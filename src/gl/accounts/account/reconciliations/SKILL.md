---
name: reconciliations
description: "Use when capturing or reviewing period-end reconciliation sign-off evidence — bank, GL-to-subledger, or intercompany — with preparer/reviewer segregation, adjustment aging, and closure check (difference = 0); SOX §404 + ISO-19011 controls testing. The account-reconciliations evidence-pack collection."
atomPath: "gl/accounts/account/reconciliations"
coordinate: "gl/accounts/account/reconciliations · 4/weave · 118e93b5"
contentUuid: "f758af12-bbb3-5110-9e26-526e5419c573"
diamondUuid: "c2c8c4a7-4f5d-89b1-804d-9802eb43909b"
uuid: "118e93b5-a62f-83f2-80f9-d0f792f0cbf4"
horo: 4
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
  computationUuid: "ad9161de-e52d-8e54-aa24-3e0cb55f1528"
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
      stageUuid: "575c65c8-fe32-85f1-8c62-d20720f8fb8f"
    - stage: seal
      stageUuid: "e3ce2be4-a131-8db4-a85a-8bc5d8ecbef8"
    - stage: uuid
      stageUuid: "f851bc80-d2fb-8c49-a2b2-a88370fec957"
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

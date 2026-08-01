---
name: reconcile
description: "Use when matching two records of the same flow — bank-statement line ↔ payment, GL ↔ subledger, intercompany pairs. The BankStatementLineReconciliation concern; reconciled state is DERIVED from the match link, not stored."
atomPath: "vocabulary/reconcile"
coordinate: "vocabulary/reconcile · 8/crest · c5f9a905"
contentUuid: "1ef41dfa-7870-5e52-83d9-bfef352ffbd6"
diamondUuid: "53c4b1c0-529b-81b7-bd3c-202a73ad4c21"
uuid: "c5f9a905-587c-81c3-860a-68c7f626bba1"
horo: 8
typography:
  partition: vocabulary
  bondDegree: 54
standards: []
bindings: []
signatures:
  computationUuid: "f0e9a4e8-0a51-8697-85cf-d106a76e99f1"
  stages:
    - stage: path
      stageUuid: "1856a94d-af25-8a08-9197-e6eb4ee7d752"
    - stage: trinity
      stageUuid: "06713404-3ddb-8321-b691-d75e0dd6c21c"
    - stage: boundary
      stageUuid: "8eaa5a87-684d-86e5-93d4-0d7bf42b52f2"
    - stage: links
      stageUuid: "2252ed7c-8de5-8a02-b49e-d204b4738d18"
    - stage: horo
      stageUuid: "3aebd1c1-c614-8f04-836d-81977fdae219"
    - stage: seal
      stageUuid: "37bab503-92b0-8902-b18b-5122dc637f12"
    - stage: uuid
      stageUuid: "2a2f72e4-16b7-8c07-8195-1eb7dc9e13bd"
version: 2
---
# reconcile — match two sides of one flow

`reconcile` is the matching atom (Rails `BankStatementLineReconciliationConcern`: `reconcile_with!`/`unreconcile!`/`reconciled?`). Law: a reconciliation is a **link** between two records of the same value-flow (bank-statement line ↔ payment; GL ↔ subledger; intercompany debit ↔ credit). `reconciled?` is **DERIVED** from whether the link exists (and amounts agree) — never a stored boolean (the [[manufacturing]]/[[commerce]] derived-status lesson). Matching runs in a [[hooks]] / [[jobs]] task (fuzzy by amount+date+ref); unmatched both-sides are `where`-filter scopes ([[queries]]). Sits under [[accounting]] (sequence **6**).

Composes: [[accounting]] (the ledger sides), [[hooks]]/[[jobs]] (match run), [[queries]] (unreconciled scopes), [[currency]] (amounts agree per currency).

## Common mistakes
- Storing a `reconciled` boolean instead of deriving it from the match link.
- Matching across different currencies without converting ([[currency]] exchangeRate).

**Law — [[law]]: a reconciliation is a link between two records of the same value-flow (bank line ↔ payment, GL ↔ subledger, intercompany debit ↔ credit); `reconciled?` is DERIVED from whether the link exists and amounts agree — never a stored boolean.**

---
name: reconcile
description: "Use when matching two records of the same flow — bank-statement line ↔ payment, GL ↔ subledger, intercompany pairs. The BankStatementLineReconciliation concern; reconciled state is DERIVED from the match link, not stored."
atomPath: "vocabulary/reconcile"
coordinate: "vocabulary/reconcile · 5/round · 258f7f91"
contentUuid: "869cd6e7-07d0-536a-a43e-93f2992f4ea9"
diamondUuid: "82e5a856-d0f4-8006-b60d-546f347319a2"
uuid: "258f7f91-86a9-8844-8a61-d191554b2449"
horo: 5
typography:
  partition: vocabulary
  bondDegree: 54
standards: []
bindings: []
signatures:
  computationUuid: "f7ba5d42-a158-86f9-973a-3964b694a088"
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
      stageUuid: "b6c01ba7-6830-860d-87c6-ea4d61884c42"
    - stage: seal
      stageUuid: "b82882ac-ec8d-84eb-8e9f-39ca08f65c07"
    - stage: uuid
      stageUuid: "6a0010e6-5724-886d-bd5f-042c3f729550"
version: 2
---
# reconcile — match two sides of one flow

`reconcile` is the matching atom (Rails `BankStatementLineReconciliationConcern`: `reconcile_with!`/`unreconcile!`/`reconciled?`). Law: a reconciliation is a **link** between two records of the same value-flow (bank-statement line ↔ payment; GL ↔ subledger; intercompany debit ↔ credit). `reconciled?` is **DERIVED** from whether the link exists (and amounts agree) — never a stored boolean (the [[manufacturing]]/[[commerce]] derived-status lesson). Matching runs in a [[hooks]] / [[jobs]] task (fuzzy by amount+date+ref); unmatched both-sides are `where`-filter scopes ([[queries]]). Sits under [[accounting]] (sequence **6**).

Composes: [[accounting]] (the ledger sides), [[hooks]]/[[jobs]] (match run), [[queries]] (unreconciled scopes), [[currency]] (amounts agree per currency).

## Common mistakes
- Storing a `reconciled` boolean instead of deriving it from the match link.
- Matching across different currencies without converting ([[currency]] exchangeRate).

**Law — [[law]]: a reconciliation is a link between two records of the same value-flow (bank line ↔ payment, GL ↔ subledger, intercompany debit ↔ credit); `reconciled?` is DERIVED from whether the link exists and amounts agree — never a stored boolean.**

---
name: reconcile
description: "Use when matching two records of the same flow — bank-statement line ↔ payment, GL ↔ subledger, intercompany pairs. The BankStatementLineReconciliation concern; reconciled state is DERIVED from the match link, not stored."
atomPath: "vocabulary/reconcile"
coordinate: "vocabulary/reconcile · 5/round · 680159a9"
contentUuid: "d08402ac-76f7-55f5-bd21-07760d4e841a"
diamondUuid: "fc993fee-7fd5-8ffe-b296-66018283d4c1"
uuid: "680159a9-a240-838e-ad4e-4b24b855c8dc"
horo: 5
typography:
  partition: vocabulary
  bondDegree: 54
standards: []
bindings: []
signatures:
  computationUuid: "b38bb5ec-77c4-8871-a67d-53282f39f066"
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
      stageUuid: "357a087d-b0c4-87ff-ba5c-bad46bc3ffbc"
    - stage: seal
      stageUuid: "b82882ac-ec8d-84eb-8e9f-39ca08f65c07"
    - stage: uuid
      stageUuid: "8e02e652-edcc-8fd3-8585-a070eec3bacc"
version: 2
---
# reconcile — match two sides of one flow

`reconcile` is the matching atom (Rails `BankStatementLineReconciliationConcern`: `reconcile_with!`/`unreconcile!`/`reconciled?`). Law: a reconciliation is a **link** between two records of the same value-flow (bank-statement line ↔ payment; GL ↔ subledger; intercompany debit ↔ credit). `reconciled?` is **DERIVED** from whether the link exists (and amounts agree) — never a stored boolean (the [[manufacturing]]/[[commerce]] derived-status lesson). Matching runs in a [[hooks]] / [[jobs]] task (fuzzy by amount+date+ref); unmatched both-sides are `where`-filter scopes ([[queries]]). Sits under [[accounting]] (sequence **6**).

Composes: [[accounting]] (the ledger sides), [[hooks]]/[[jobs]] (match run), [[queries]] (unreconciled scopes), [[currency]] (amounts agree per currency).

## Common mistakes
- Storing a `reconciled` boolean instead of deriving it from the match link.
- Matching across different currencies without converting ([[currency]] exchangeRate).

**Law — [[law]]: a reconciliation is a link between two records of the same value-flow (bank line ↔ payment, GL ↔ subledger, intercompany debit ↔ credit); `reconciled?` is DERIVED from whether the link exists and amounts agree — never a stored boolean.**

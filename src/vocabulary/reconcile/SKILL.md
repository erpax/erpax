---
name: reconcile
description: "Use when matching two records of the same flow — bank-statement line ↔ payment, GL ↔ subledger, intercompany pairs. The BankStatementLineReconciliation concern; reconciled state is DERIVED from the match link, not stored."
atomPath: "vocabulary/reconcile"
coordinate: "vocabulary/reconcile · 5/round · 8e2c1601"
contentUuid: "39a35708-722d-5be3-8629-a52dd792c1a2"
diamondUuid: "1ef00ef3-13b8-8937-aa2a-e00c9284107b"
uuid: "8e2c1601-d041-8e40-854c-7a48267b0cf7"
horo: 5
typography:
  partition: vocabulary
  bondDegree: 54
standards: []
bindings: []
signatures:
  computationUuid: "b3e0b8e5-43c1-8bd4-a86c-24d89b1e2d2f"
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
      stageUuid: "7dfe0e73-591f-8dfa-a075-7ada7d8d9e9f"
    - stage: seal
      stageUuid: "b82882ac-ec8d-84eb-8e9f-39ca08f65c07"
    - stage: uuid
      stageUuid: "fdd82fd1-6dff-8ebe-91fa-e70f42d07d93"
version: 2
---
# reconcile — match two sides of one flow

`reconcile` is the matching atom (Rails `BankStatementLineReconciliationConcern`: `reconcile_with!`/`unreconcile!`/`reconciled?`). Law: a reconciliation is a **link** between two records of the same value-flow (bank-statement line ↔ payment; GL ↔ subledger; intercompany debit ↔ credit). `reconciled?` is **DERIVED** from whether the link exists (and amounts agree) — never a stored boolean (the [[manufacturing]]/[[commerce]] derived-status lesson). Matching runs in a [[hooks]] / [[jobs]] task (fuzzy by amount+date+ref); unmatched both-sides are `where`-filter scopes ([[queries]]). Sits under [[accounting]] (sequence **6**).

Composes: [[accounting]] (the ledger sides), [[hooks]]/[[jobs]] (match run), [[queries]] (unreconciled scopes), [[currency]] (amounts agree per currency).

## Common mistakes
- Storing a `reconciled` boolean instead of deriving it from the match link.
- Matching across different currencies without converting ([[currency]] exchangeRate).

**Law — [[law]]: a reconciliation is a link between two records of the same value-flow (bank line ↔ payment, GL ↔ subledger, intercompany debit ↔ credit); `reconciled?` is DERIVED from whether the link exists and amounts agree — never a stored boolean.**

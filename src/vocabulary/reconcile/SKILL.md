---
name: reconcile
description: "Use when matching two records of the same flow — bank-statement line ↔ payment, GL ↔ subledger, intercompany pairs. The BankStatementLineReconciliation concern; reconciled state is DERIVED from the match link, not stored."
atomPath: "vocabulary/reconcile"
coordinate: "vocabulary/reconcile · 4/weave · e0702d3a"
contentUuid: "6e1f1072-2aaa-51d9-bc66-aa95b18f7477"
diamondUuid: "a5ccbc06-9235-8a8a-9a32-1ae3483267e1"
uuid: "e0702d3a-dd11-88ab-b46f-bd9d1eebb844"
horo: 4
typography:
  partition: vocabulary
  bondDegree: 54
standards: []
bindings: []
signatures:
  computationUuid: "2df98cdb-99ca-8187-8544-754f0860c6b8"
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
      stageUuid: "51aace2a-a8ed-8c0e-80e6-6b3050322c6f"
    - stage: seal
      stageUuid: "b82882ac-ec8d-84eb-8e9f-39ca08f65c07"
    - stage: uuid
      stageUuid: "f20bc271-b8f2-840a-bd02-8ffe5f67b7f9"
version: 2
---
# reconcile — match two sides of one flow

`reconcile` is the matching atom (Rails `BankStatementLineReconciliationConcern`: `reconcile_with!`/`unreconcile!`/`reconciled?`). Law: a reconciliation is a **link** between two records of the same value-flow (bank-statement line ↔ payment; GL ↔ subledger; intercompany debit ↔ credit). `reconciled?` is **DERIVED** from whether the link exists (and amounts agree) — never a stored boolean (the [[manufacturing]]/[[commerce]] derived-status lesson). Matching runs in a [[hooks]] / [[jobs]] task (fuzzy by amount+date+ref); unmatched both-sides are `where`-filter scopes ([[queries]]). Sits under [[accounting]] (sequence **6**).

Composes: [[accounting]] (the ledger sides), [[hooks]]/[[jobs]] (match run), [[queries]] (unreconciled scopes), [[currency]] (amounts agree per currency).

## Common mistakes
- Storing a `reconciled` boolean instead of deriving it from the match link.
- Matching across different currencies without converting ([[currency]] exchangeRate).

**Law — [[law]]: a reconciliation is a link between two records of the same value-flow (bank line ↔ payment, GL ↔ subledger, intercompany debit ↔ credit); `reconciled?` is DERIVED from whether the link exists and amounts agree — never a stored boolean.**

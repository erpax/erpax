---
name: reconcile
description: "Use when matching two records of the same flow — bank-statement line ↔ payment, GL ↔ subledger, intercompany pairs. The BankStatementLineReconciliation concern; reconciled state is DERIVED from the match link, not stored."
atomPath: reconcile
coordinate: reconcile · 7/descent · 164dcaea
contentUuid: "aceb2c15-48a4-5a71-a8c3-5120c0eca7db"
diamondUuid: "d8f832d4-81c3-8a4b-a7f6-36dcb882abc1"
uuid: "164dcaea-2b19-83a5-9f07-f0caf396c8c4"
horo: 7
bonds:
  in:
    - accounting
    - balance
    - bank
    - batch
    - commerce
    - conservation
    - consistency
    - currency
    - deduplication
    - flow
    - hooks
    - idempotency
    - jobs
    - law
    - manufacturing
    - queries
    - round
  out:
    - accounting
    - balance
    - bank
    - batch
    - commerce
    - conservation
    - consistency
    - currency
    - deduplication
    - flow
    - hooks
    - idempotency
    - jobs
    - law
    - manufacturing
    - queries
    - round
typography:
  partition: reconcile
  bondDegree: 54
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - accounting
    - commerce
    - currency
    - hooks
    - jobs
    - law
    - manufacturing
    - queries
  matrix:
    - accounting
    - balance
    - bank
    - batch
    - commerce
    - conservation
    - consistency
    - currency
    - deduplication
    - flow
    - hooks
    - idempotency
    - jobs
    - law
    - manufacturing
    - queries
    - round
  backlinks:
    - accounting
    - balance
    - bank
    - batch
    - commerce
    - conservation
    - consistency
    - currency
    - deduplication
    - flow
    - hooks
    - idempotency
    - jobs
    - law
    - manufacturing
    - queries
    - round
signatures:
  computationUuid: "278bd2cb-9de1-8634-9e46-22c86bc39463"
  stages:
    - stage: path
      stageUuid: "b890d10b-6c98-86a7-bd38-46d1adb77971"
    - stage: trinity
      stageUuid: "2a13b33d-3be6-84e3-a84f-5c018a0322f4"
    - stage: boundary
      stageUuid: "73a5e622-a52e-82e9-8290-fedc8f032b41"
    - stage: links
      stageUuid: "48acc29d-1a1f-886b-a0b1-028c3f1359d7"
    - stage: horo
      stageUuid: "700bc343-e245-8275-a295-0e7691116d09"
    - stage: seal
      stageUuid: "6ad03ed1-55cd-80ac-902d-088b462c3881"
    - stage: uuid
      stageUuid: "2930e856-1fe1-83b5-b71d-ef3d5cd8bb6b"
version: 2
---
# reconcile — match two sides of one flow

`reconcile` is the matching atom (Rails `BankStatementLineReconciliationConcern`: `reconcile_with!`/`unreconcile!`/`reconciled?`). Law: a reconciliation is a **link** between two records of the same value-flow (bank-statement line ↔ payment; GL ↔ subledger; intercompany debit ↔ credit). `reconciled?` is **DERIVED** from whether the link exists (and amounts agree) — never a stored boolean (the [[manufacturing]]/[[commerce]] derived-status lesson). Matching runs in a [[hooks]] / [[jobs]] task (fuzzy by amount+date+ref); unmatched both-sides are `where`-filter scopes ([[queries]]). Sits under [[accounting]] (sequence **6**).

Composes: [[accounting]] (the ledger sides), [[hooks]]/[[jobs]] (match run), [[queries]] (unreconciled scopes), [[currency]] (amounts agree per currency).

## Common mistakes
- Storing a `reconciled` boolean instead of deriving it from the match link.
- Matching across different currencies without converting ([[currency]] exchangeRate).

**Law — [[law]]: a reconciliation is a link between two records of the same value-flow (bank line ↔ payment, GL ↔ subledger, intercompany debit ↔ credit); `reconciled?` is DERIVED from whether the link exists and amounts agree — never a stored boolean.**

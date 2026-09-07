---
name: account
description: "Use when a transaction or GL entry references a chart-of-accounts item — bank account, GL account, cost-center account, liability account. Payload relationTo: 'gl-accounts' or 'bank-accounts'; denormalized fields (accountNumber, accountName) wire via account atom."
atomPath: "vocabulary/account"
coordinate: "vocabulary/account · 1/base · 2095a95c"
contentUuid: "0ba87e3f-6570-5fcd-a537-2f339e7168cd"
diamondUuid: "2d68db23-2c4b-8ae6-8056-38e7cf3cf895"
uuid: "2095a95c-8522-8eb8-b760-0e6da03c47b8"
horo: 1
typography:
  partition: vocabulary
  bondDegree: 46
standards: []
bindings: []
signatures:
  computationUuid: "2710ad8c-d88f-81fe-9178-97703034c571"
  stages:
    - stage: path
      stageUuid: "26a014d3-93c7-8a7f-b892-6b93abb4d3b4"
    - stage: trinity
      stageUuid: "8c66c57f-8a2e-8f56-b26b-98c85604f8f3"
    - stage: boundary
      stageUuid: "1bcb732b-f579-81cb-9d68-00003bd25d49"
    - stage: links
      stageUuid: "36e7b178-662a-8927-8c12-fef8a338c3f3"
    - stage: horo
      stageUuid: "c46dc691-3634-8c86-a5bc-ed39dcfa8329"
    - stage: seal
      stageUuid: "35c846d2-7d52-8141-aeb4-aa3d34ee7b08"
    - stage: uuid
      stageUuid: "e8bc8675-329c-800c-869a-d7b5401421c5"
version: 2
---
# account

Use when a transaction or GL entry references a chart-of-accounts item — bank account, GL account, cost-center account, liability account. Payload relationTo: 'gl-accounts' or 'bank-accounts'; denormalized fields (accountNumber, accountName) wire via account atom.

Composes: [[accounting]] · [[field]] · [[identity]] · [[code]] · [[bank]] · [[amount]].

**Law — [[law]]: an account is the chart-of-accounts item a transaction or GL entry references (bank/GL/cost-center/liability) — the relation through which denormalized accountNumber/accountName wire, never the [[amount]] itself.**

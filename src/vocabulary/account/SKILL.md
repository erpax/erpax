---
name: account
description: "Use when a transaction or GL entry references a chart-of-accounts item — bank account, GL account, cost-center account, liability account. Payload relationTo: 'gl-accounts' or 'bank-accounts'; denormalized fields (accountNumber, accountName) wire via account atom."
atomPath: "vocabulary/account"
coordinate: "vocabulary/account · 8/crest · bdea22bb"
contentUuid: "e55a2c84-6e04-5bb7-8fa3-b98e9904461c"
diamondUuid: "a348841d-0573-85b8-abf2-cbcdd085eca2"
uuid: "bdea22bb-1d86-8119-bcf1-dc41f7c0ab22"
horo: 8
typography:
  partition: vocabulary
  bondDegree: 46
standards: []
bindings: []
signatures:
  computationUuid: "0657bf5d-c5ef-8880-b7c9-df9186d9919b"
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
      stageUuid: "ae89a4dc-6d2d-8bce-b925-c4306bcd9944"
    - stage: seal
      stageUuid: "35c846d2-7d52-8141-aeb4-aa3d34ee7b08"
    - stage: uuid
      stageUuid: "64f356e7-34ba-8443-8302-1d2f9ed0fcd7"
version: 2
---
# account

Use when a transaction or GL entry references a chart-of-accounts item — bank account, GL account, cost-center account, liability account. Payload relationTo: 'gl-accounts' or 'bank-accounts'; denormalized fields (accountNumber, accountName) wire via account atom.

Composes: [[accounting]] · [[field]] · [[identity]] · [[code]] · [[bank]] · [[amount]].

**Law — [[law]]: an account is the chart-of-accounts item a transaction or GL entry references (bank/GL/cost-center/liability) — the relation through which denormalized accountNumber/accountName wire, never the [[amount]] itself.**

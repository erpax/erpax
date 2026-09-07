---
name: account
description: "Use when a transaction or GL entry references a chart-of-accounts item — bank account, GL account, cost-center account, liability account. Payload relationTo: 'gl-accounts' or 'bank-accounts'; denormalized fields (accountNumber, accountName) wire via account atom."
atomPath: "vocabulary/account"
coordinate: "vocabulary/account · 8/crest · a1b42bad"
contentUuid: "75709033-3437-5ad8-8e82-c20d390c7c9b"
diamondUuid: "b63661ba-edd0-85d3-9283-f844b46d63b4"
uuid: "a1b42bad-352e-8c85-9b22-9cf70cabaa1f"
horo: 8
typography:
  partition: vocabulary
  bondDegree: 46
standards: []
bindings: []
signatures:
  computationUuid: "d90c59c2-ba76-8f81-b7d2-8259d38a367c"
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
      stageUuid: "ec3f135a-3bee-854b-9556-f8dfe77e9965"
    - stage: seal
      stageUuid: "35c846d2-7d52-8141-aeb4-aa3d34ee7b08"
    - stage: uuid
      stageUuid: "32dcacd8-11fe-8c94-8fc9-e23299261b60"
version: 2
---
# account

Use when a transaction or GL entry references a chart-of-accounts item — bank account, GL account, cost-center account, liability account. Payload relationTo: 'gl-accounts' or 'bank-accounts'; denormalized fields (accountNumber, accountName) wire via account atom.

Composes: [[accounting]] · [[field]] · [[identity]] · [[code]] · [[bank]] · [[amount]].

**Law — [[law]]: an account is the chart-of-accounts item a transaction or GL entry references (bank/GL/cost-center/liability) — the relation through which denormalized accountNumber/accountName wire, never the [[amount]] itself.**

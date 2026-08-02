---
name: account
description: "Use when a transaction or GL entry references a chart-of-accounts item — bank account, GL account, cost-center account, liability account. Payload relationTo: 'gl-accounts' or 'bank-accounts'; denormalized fields (accountNumber, accountName) wire via account atom."
atomPath: "vocabulary/account"
coordinate: "vocabulary/account · 7/descent · 6c8d99a7"
contentUuid: "cd156f90-a1c2-52c8-9a74-cd8ea6276d94"
diamondUuid: "9b6e904f-83fe-8f1f-a6c8-4c0607ca0d03"
uuid: "6c8d99a7-df9d-8f68-ac4f-bbacc64f5cc7"
horo: 7
typography:
  partition: vocabulary
  bondDegree: 46
standards: []
bindings: []
signatures:
  computationUuid: "0267e3ff-c24f-858e-8597-24a19037e18a"
  stages:
    - stage: path
      stageUuid: "26a014d3-93c7-8a7f-b892-6b93abb4d3b4"
    - stage: trinity
      stageUuid: "8c66c57f-8a2e-8f56-b26b-98c85604f8f3"
    - stage: boundary
      stageUuid: "b735212b-550f-8d4b-bcdc-39f8ea6eb167"
    - stage: links
      stageUuid: "0c80c4d8-d3b8-8cae-8880-50f18dc9a4d6"
    - stage: horo
      stageUuid: "a44709ce-f778-8d77-bc1b-b07b0fe2b289"
    - stage: seal
      stageUuid: "b822ae3f-c10c-8e16-843d-9871b3b0723a"
    - stage: uuid
      stageUuid: "6d891b62-c842-8da2-a43a-cc168e304e20"
version: 2
---
# account

Use when a transaction or GL entry references a chart-of-accounts item — bank account, GL account, cost-center account, liability account. Payload relationTo: 'gl-accounts' or 'bank-accounts'; denormalized fields (accountNumber, accountName) wire via account atom.

Composes: [[accounting]] · [[field]] · [[identity]] · [[code]] · [[bank]] · [[amount]].

**Law — [[law]]: an account is the chart-of-accounts item a transaction or GL entry references (bank/GL/cost-center/liability) — the relation through which denormalized accountNumber/accountName wire, never the [[amount]] itself.**

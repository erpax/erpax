---
name: account
description: "Use when a transaction or GL entry references a chart-of-accounts item — bank account, GL account, cost-center account, liability account. Payload relationTo: 'gl-accounts' or 'bank-accounts'; denormalized fields (accountNumber, accountName) wire via account atom."
atomPath: "vocabulary/account"
coordinate: "vocabulary/account · 5/round · 20928478"
contentUuid: "9c9aeee6-1f98-5ccd-b55d-094466085254"
diamondUuid: "ea759e34-5eca-8178-a040-227baa8e8898"
uuid: "20928478-0e34-8105-ab28-cca59c6ab8a1"
horo: 5
typography:
  partition: vocabulary
  bondDegree: 46
standards: []
bindings: []
signatures:
  computationUuid: "4a05e79f-ebdb-8f42-8e69-0c0bac72c7e7"
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
      stageUuid: "61ca6d7f-a40f-8ae0-b621-6f48be65b636"
    - stage: seal
      stageUuid: "35c846d2-7d52-8141-aeb4-aa3d34ee7b08"
    - stage: uuid
      stageUuid: "4e630edc-718b-8a86-a330-08ee70fbd841"
version: 2
---
# account

Use when a transaction or GL entry references a chart-of-accounts item — bank account, GL account, cost-center account, liability account. Payload relationTo: 'gl-accounts' or 'bank-accounts'; denormalized fields (accountNumber, accountName) wire via account atom.

Composes: [[accounting]] · [[field]] · [[identity]] · [[code]] · [[bank]] · [[amount]].

**Law — [[law]]: an account is the chart-of-accounts item a transaction or GL entry references (bank/GL/cost-center/liability) — the relation through which denormalized accountNumber/accountName wire, never the [[amount]] itself.**

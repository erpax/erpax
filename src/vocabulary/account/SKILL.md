---
name: account
description: "Use when a transaction or GL entry references a chart-of-accounts item — bank account, GL account, cost-center account, liability account. Payload relationTo: 'gl-accounts' or 'bank-accounts'; denormalized fields (accountNumber, accountName) wire via account atom."
atomPath: "vocabulary/account"
coordinate: "vocabulary/account · 8/crest · e7395661"
contentUuid: "f09d1d2b-f672-5377-ad99-f0ac53192afc"
diamondUuid: "33fc9a93-dddd-894d-8f51-cb71162cc31f"
uuid: "e7395661-3469-8dac-ac77-2b768f9b7951"
horo: 8
typography:
  partition: vocabulary
  bondDegree: 46
standards: []
bindings: []
signatures:
  computationUuid: "5e1d7c62-8a8c-8ae3-a7fc-bd5eca6ff184"
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
      stageUuid: "32b271a5-34bb-850e-b86c-99c119f285e5"
    - stage: seal
      stageUuid: "35c846d2-7d52-8141-aeb4-aa3d34ee7b08"
    - stage: uuid
      stageUuid: "0b95786d-8f89-8fa1-a53b-120ff01579f3"
version: 2
---
# account

Use when a transaction or GL entry references a chart-of-accounts item — bank account, GL account, cost-center account, liability account. Payload relationTo: 'gl-accounts' or 'bank-accounts'; denormalized fields (accountNumber, accountName) wire via account atom.

Composes: [[accounting]] · [[field]] · [[identity]] · [[code]] · [[bank]] · [[amount]].

**Law — [[law]]: an account is the chart-of-accounts item a transaction or GL entry references (bank/GL/cost-center/liability) — the relation through which denormalized accountNumber/accountName wire, never the [[amount]] itself.**

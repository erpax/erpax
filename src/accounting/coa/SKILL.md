---
name: coa
description: "Use when reasoning about accounting/coa — chart of accounts — path IS the account code; accountCodeOf folds atom paths to GL codes."
atomPath: "accounting/coa"
coordinate: "accounting/coa · 2/share · 73d66534"
contentUuid: "c6ad5a62-a0c4-5107-92d0-f7938f8661cf"
diamondUuid: "c659694c-91b5-816b-8ce1-56af4bf1a441"
uuid: "73d66534-f3c2-8515-9f36-bd63be3157ff"
horo: 2
typography:
  partition: accounting
  bondDegree: 15
standards: []
bindings: []
signatures:
  computationUuid: "81f7c4d3-8ea0-8f36-a580-4e967f8929e9"
  stages:
    - stage: path
      stageUuid: "22979483-1855-8add-a7e4-09cabb74cf08"
    - stage: trinity
      stageUuid: "f990809d-f707-8f41-b79e-e325ef8ef4e1"
    - stage: boundary
      stageUuid: "6a509f18-5dfc-8e4c-82b3-232f94ae0ba8"
    - stage: links
      stageUuid: "8ab360ef-8457-88ee-b0bc-301d07724cd1"
    - stage: horo
      stageUuid: "b37f9b22-a6c4-8f75-ab40-ab46b54ecd37"
    - stage: seal
      stageUuid: "4dfd667b-cc8a-8066-91a4-5729749c508a"
    - stage: uuid
      stageUuid: "8891c1fc-dd2c-8473-bfe6-0e44f69a98c6"
version: 2
---
# accounting/coa

Chart of accounts — path IS the account code; accountCodeOf folds atom paths to GL codes.

**Law — [[law]]: accounting/coa composes under [[accounting]] — path-keyed, content-addressed, no hand-maintained GL catalogue.**

Matter-twin: `src/accounting/coa/index.ts`

Composes [[accounting]] · [[path]] · [[debit]] · [[balance]]

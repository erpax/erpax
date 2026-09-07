---
name: coa
description: "Use when reasoning about accounting/coa — chart of accounts — path IS the account code; accountCodeOf folds atom paths to GL codes."
atomPath: "accounting/coa"
coordinate: "accounting/coa · 4/weave · 700ba3bb"
contentUuid: "677bbcd7-6b82-57d7-9529-de08dbe1378a"
diamondUuid: "1c7b48e8-b99d-80d5-b555-7c2515924db0"
uuid: "700ba3bb-4d4b-894c-b7c8-fe9572c45aae"
horo: 4
typography:
  partition: accounting
  bondDegree: 15
standards: []
bindings: []
signatures:
  computationUuid: "1a274471-9d4d-8165-b023-982b101cd8e3"
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
      stageUuid: "2d8f7316-0e9b-80eb-81e9-abb6a62f6d94"
    - stage: seal
      stageUuid: "4dfd667b-cc8a-8066-91a4-5729749c508a"
    - stage: uuid
      stageUuid: "24404a96-bb7a-8437-9700-2bb1652e63b6"
version: 2
---
# accounting/coa

Chart of accounts — path IS the account code; accountCodeOf folds atom paths to GL codes.

**Law — [[law]]: accounting/coa composes under [[accounting]] — path-keyed, content-addressed, no hand-maintained GL catalogue.**

Matter-twin: `src/accounting/coa/index.ts`

Composes [[accounting]] · [[path]] · [[debit]] · [[balance]]

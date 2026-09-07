---
name: coa
description: "Use when reasoning about accounting/coa — chart of accounts — path IS the account code; accountCodeOf folds atom paths to GL codes."
atomPath: "accounting/coa"
coordinate: "accounting/coa · 8/crest · 98fe8a56"
contentUuid: "995d2116-d114-500d-b661-542aafaa65f4"
diamondUuid: "04902909-3d75-8783-a738-36c584b1f013"
uuid: "98fe8a56-9191-851f-8e6c-097e267f655c"
horo: 8
typography:
  partition: accounting
  bondDegree: 15
standards: []
bindings: []
signatures:
  computationUuid: "66a429ac-327d-8f77-b4b3-8c23fd7377d6"
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
      stageUuid: "308fb3b2-f267-817e-906d-5ead5a14350c"
    - stage: seal
      stageUuid: "4dfd667b-cc8a-8066-91a4-5729749c508a"
    - stage: uuid
      stageUuid: "da123a90-3f8e-8581-8e70-631deb702d82"
version: 2
---
# accounting/coa

Chart of accounts — path IS the account code; accountCodeOf folds atom paths to GL codes.

**Law — [[law]]: accounting/coa composes under [[accounting]] — path-keyed, content-addressed, no hand-maintained GL catalogue.**

Matter-twin: `src/accounting/coa/index.ts`

Composes [[accounting]] · [[path]] · [[debit]] · [[balance]]

---
name: coa
description: "Use when reasoning about accounting/coa — chart of accounts — path IS the account code; accountCodeOf folds atom paths to GL codes."
atomPath: "accounting/coa"
coordinate: "accounting/coa · 8/crest · dc9db38b"
contentUuid: "545cd0e9-02dd-50f4-9f30-64f905a27e76"
diamondUuid: "c4dafc6f-dbd2-8334-ba0b-b50955824b82"
uuid: "dc9db38b-c3c0-8ec3-ab40-63650e8303dd"
horo: 8
typography:
  partition: accounting
  bondDegree: 15
standards: []
bindings: []
signatures:
  computationUuid: "f2a050a4-c6bc-8ac4-9322-a21b5c98270d"
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
      stageUuid: "0f080d16-647b-88df-b908-d3211bb32bcc"
    - stage: seal
      stageUuid: "4dfd667b-cc8a-8066-91a4-5729749c508a"
    - stage: uuid
      stageUuid: "ce71c298-5a3f-8027-8e78-2e3da8eb700c"
version: 2
---
# accounting/coa

Chart of accounts — path IS the account code; accountCodeOf folds atom paths to GL codes.

**Law — [[law]]: accounting/coa composes under [[accounting]] — path-keyed, content-addressed, no hand-maintained GL catalogue.**

Matter-twin: `src/accounting/coa/index.ts`

Composes [[accounting]] · [[path]] · [[debit]] · [[balance]]

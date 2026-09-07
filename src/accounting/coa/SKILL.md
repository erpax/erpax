---
name: coa
description: "Use when reasoning about accounting/coa — chart of accounts — path IS the account code; accountCodeOf folds atom paths to GL codes."
atomPath: "accounting/coa"
coordinate: "accounting/coa · 8/crest · dc1b0894"
contentUuid: "51fe9397-b842-5caf-95be-f719c8a44115"
diamondUuid: "885b42d8-9509-89cc-982a-f9f223a59bb8"
uuid: "dc1b0894-584a-8d88-933b-f3e8e308bfb8"
horo: 8
typography:
  partition: accounting
  bondDegree: 15
standards: []
bindings: []
signatures:
  computationUuid: "4c60de69-af57-8374-866f-17bc285fb9d5"
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
      stageUuid: "2b7f6b83-ac91-80e5-8bff-ea0a3fe7538f"
    - stage: seal
      stageUuid: "4dfd667b-cc8a-8066-91a4-5729749c508a"
    - stage: uuid
      stageUuid: "ef592a65-13f5-8701-aba8-abdef021650f"
version: 2
---
# accounting/coa

Chart of accounts — path IS the account code; accountCodeOf folds atom paths to GL codes.

**Law — [[law]]: accounting/coa composes under [[accounting]] — path-keyed, content-addressed, no hand-maintained GL catalogue.**

Matter-twin: `src/accounting/coa/index.ts`

Composes [[accounting]] · [[path]] · [[debit]] · [[balance]]

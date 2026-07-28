---
name: coa
description: "Use when reasoning about accounting/coa — chart of accounts — path IS the account code; accountCodeOf folds atom paths to GL codes."
atomPath: "accounting/coa"
coordinate: "accounting/coa · 8/crest · 97103b5e"
contentUuid: "a13ca410-504d-5ba3-bf18-e384abce956b"
diamondUuid: "5de1d2aa-570d-8f90-b5a6-76cee05e4646"
uuid: "97103b5e-757d-8649-8f81-04a89da24489"
horo: 8
bonds:
  in:
    - accounting
    - balance
    - debit
    - law
    - path
  out:
    - accounting
    - balance
    - debit
    - law
    - path
typography:
  partition: accounting
  bondDegree: 15
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - accounting
    - balance
    - debit
    - law
    - path
  matrix:
    - accounting
    - balance
    - debit
    - law
    - path
  backlinks:
    - accounting
    - balance
    - debit
    - law
    - path
signatures:
  computationUuid: "b22bedc3-6273-8113-98bf-9289fc0b2fe3"
  stages:
    - stage: path
      stageUuid: "22979483-1855-8add-a7e4-09cabb74cf08"
    - stage: trinity
      stageUuid: "f990809d-f707-8f41-b79e-e325ef8ef4e1"
    - stage: boundary
      stageUuid: "c6ec9f14-7599-820d-a10c-af81dd4b38c3"
    - stage: links
      stageUuid: "8ab360ef-8457-88ee-b0bc-301d07724cd1"
    - stage: horo
      stageUuid: "81edd3e3-fe44-8834-b677-0eed5ed92d83"
    - stage: seal
      stageUuid: "4dfd667b-cc8a-8066-91a4-5729749c508a"
    - stage: uuid
      stageUuid: "462a0c19-9057-83b9-bd34-a214482c765c"
version: 2
---
# accounting/coa

Chart of accounts — path IS the account code; accountCodeOf folds atom paths to GL codes.

**Law — [[law]]: accounting/coa composes under [[accounting]] — path-keyed, content-addressed, no hand-maintained GL catalogue.**

Matter-twin: `src/accounting/coa/index.ts`

Composes [[accounting]] · [[path]] · [[debit]] · [[balance]]

---
name: coa
description: "Use when reasoning about accounting/coa — chart of accounts — path IS the account code; accountCodeOf folds atom paths to GL codes."
atomPath: "accounting/coa"
coordinate: "accounting/coa · 1/base · dc158eef"
contentUuid: "dc33cf5a-8744-513b-b2ae-49c66570026c"
diamondUuid: "ba650bd8-ed5c-846d-a3bf-10bc7af9fbe7"
uuid: "dc158eef-ea68-8b32-bc14-70bc999b6e79"
horo: 1
typography:
  partition: accounting
  bondDegree: 15
standards: []
bindings: []
signatures:
  computationUuid: "ded5e66b-343d-86bf-a0c9-f64b7b9309af"
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
      stageUuid: "05d195a5-198e-8f32-8014-1a42116f0870"
    - stage: seal
      stageUuid: "4dfd667b-cc8a-8066-91a4-5729749c508a"
    - stage: uuid
      stageUuid: "8f54c6e0-afae-8d5f-890e-7c5a202d3a1c"
version: 2
---
# accounting/coa

Chart of accounts — path IS the account code; accountCodeOf folds atom paths to GL codes.

**Law — [[law]]: accounting/coa composes under [[accounting]] — path-keyed, content-addressed, no hand-maintained GL catalogue.**

Matter-twin: `src/accounting/coa/index.ts`

Composes [[accounting]] · [[path]] · [[debit]] · [[balance]]

---
name: compensation
description: "Use when defining or analyzing an employee's total pay structure — base salary, bonus, incentives, benefits value, equity, deductions. The compensation-concern collecting all economic value flows from employer to worker."
atomPath: compensation
coordinate: compensation · 7/descent · d23e6a75
contentUuid: "140606bd-2cd6-572a-a244-6fff67e46dd4"
diamondUuid: "a43dba1b-3511-8f95-9be9-680196cb9e9e"
uuid: "d23e6a75-6b34-81e4-bb37-808bf9855890"
horo: 7
bonds:
  in:
    - allocation
    - currency
    - employees
    - incentive
    - positions
    - rate
    - runs
    - tenure
  out:
    - allocation
    - currency
    - employees
    - incentive
    - positions
    - rate
    - runs
    - tenure
typography:
  partition: compensation
  bondDegree: 24
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - allocation
    - currency
    - employees
    - positions
    - rate
    - runs
    - tenure
  matrix:
    - allocation
    - currency
    - employees
    - incentive
    - positions
    - rate
    - runs
    - tenure
  backlinks:
    - allocation
    - currency
    - employees
    - incentive
    - positions
    - rate
    - runs
    - tenure
signatures:
  computationUuid: "31d492da-846c-811c-b235-06684215f54b"
  stages:
    - stage: path
      stageUuid: "d788589c-21a5-8964-81dd-fbaa2941c19a"
    - stage: trinity
      stageUuid: "2e2c0bb3-7916-85de-b39a-54bd6446bb96"
    - stage: boundary
      stageUuid: "2d7d4841-70b1-8375-bea0-5522394c9534"
    - stage: links
      stageUuid: "902baaac-962c-8a61-9b10-26b746e128fc"
    - stage: horo
      stageUuid: "8bad055d-4949-8930-b1e5-bac1ccf6ca84"
    - stage: seal
      stageUuid: "52c9102e-0c4c-87da-af36-aa7c4b5cd429"
    - stage: uuid
      stageUuid: "06f7f031-6b39-8e73-a4cd-2ca4189ef955"
version: 2
---
# compensation

Use when defining or analyzing an employee's total pay structure — base salary, bonus, incentives, benefits value, equity, deductions. The compensation-concern collecting all economic value flows from employer to worker.

Composes: [[Employees]] · [[positions]] · [[currency]] · [[rate]] · [[allocation]] · [[bank/accounts/payroll/runs]] · [[tenure]].

## Standards
- ISO-20022 for disbursement
- IFRS-2 for share-based
- IFRS-9 for valuation

---
name: budgetvariance
description: "Use when reasoning about budgetvariance — Use for analyzing variance between budgeted and actual amounts in a period — favorable/unfavorable cost variance, quantity/price splits, drivers of performance against plan"
atomPath: budgetvariance
coordinate: budgetvariance · 8/crest · 2622eb1a
contentUuid: "a3e561af-3ff1-5468-81d5-13e4ac154966"
diamondUuid: "c3a486dd-0fdf-8e86-9f81-4992337851d8"
uuid: "2622eb1a-aba5-806a-9a34-787823c6a6e5"
horo: 8
bonds:
  in:
    - accounting
    - centers
    - decide
    - forecast
    - law
    - plannings
    - statements
    - transaction
    - variance
  out:
    - accounting
    - centers
    - decide
    - forecast
    - law
    - plannings
    - statements
    - transaction
    - variance
typography:
  partition: budgetvariance
  bondDegree: 28
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - accounting
    - centers
    - decide
    - forecast
    - law
    - plannings
    - statements
    - transaction
    - variance
  matrix:
    - accounting
    - centers
    - decide
    - forecast
    - law
    - plannings
    - statements
    - transaction
    - variance
  backlinks:
    - accounting
    - centers
    - decide
    - forecast
    - law
    - plannings
    - statements
    - transaction
    - variance
signatures:
  computationUuid: "f1a88d07-64d0-81d7-b1fb-d4395e8260c6"
  stages:
    - stage: path
      stageUuid: "40d100bb-99a7-83fe-940e-c411716947af"
    - stage: trinity
      stageUuid: "a001f0e8-3c25-86e3-afbd-797fc1b5a4b2"
    - stage: boundary
      stageUuid: "91eeeec9-07fe-8274-8177-36c055b7386b"
    - stage: links
      stageUuid: "64818de6-2b42-8ebe-bbbd-2d43610c92ae"
    - stage: horo
      stageUuid: "d27e3aee-6a3b-81b4-9df2-66fe025f9b68"
    - stage: seal
      stageUuid: "e270a545-0c54-8067-a990-da833e28fa47"
    - stage: uuid
      stageUuid: "e88114f6-b0cd-8264-b41b-64afac0adfb2"
version: 2
---
# budgetvariance

Use for analyzing variance between budgeted and actual amounts in a period — favorable/unfavorable cost variance, quantity/price splits, drivers of performance against plan

Composes: [[variance]] · [[budget/plannings]] · [[cost/centers]] · [[financial/statements]] · [[decide]] · [[forecast]] · [[accounting]] · [[transaction]].

**Law — [[law]]: variance is actual minus budget decomposed into its drivers — favorable/unfavorable, price split from quantity — so performance against plan is explained, never just a single delta.**

## Standards
- Not IFRS-specific; management reporting under IAS-1 §27 (accrual basis emphasis)

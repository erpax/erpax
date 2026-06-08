---
name: prepaid
description: "Use when reasoning about prepaid — Use for advance payments for future services or goods (insurance premiums, rent, subscriptions) — an asset that is drawn down to expense over the benefit period"
atomPath: prepaid
coordinate: prepaid · 8/crest · 361ebda9
contentUuid: "91ab0dbe-9c1f-5c3e-a155-b6a9de2dac7c"
diamondUuid: "4c1b4fb9-842b-83d2-825c-e61a25c7722b"
uuid: "361ebda9-11b7-8f4d-a97b-0d3f719fbda6"
horo: 8
bonds:
  in:
    - accrual
    - assets
    - deferral
    - deferredrevenue
    - entries
    - journals
    - law
    - recognition
    - share
  out:
    - accrual
    - assets
    - deferral
    - deferredrevenue
    - entries
    - journals
    - law
    - recognition
    - share
typography:
  partition: prepaid
  bondDegree: 28
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - accrual
    - assets
    - deferral
    - deferredrevenue
    - entries
    - journals
    - law
    - recognition
  matrix:
    - accrual
    - assets
    - deferral
    - deferredrevenue
    - entries
    - journals
    - law
    - recognition
    - share
  backlinks:
    - accrual
    - assets
    - deferral
    - deferredrevenue
    - entries
    - journals
    - law
    - recognition
    - share
signatures:
  computationUuid: "569b305b-a6c8-8bc3-80f1-559a2fec95d5"
  stages:
    - stage: path
      stageUuid: "afafb7b3-7ece-8988-9a8e-5d219f41c36c"
    - stage: trinity
      stageUuid: "4fc8a0e4-26ff-87b5-9b4a-75c7289bed65"
    - stage: boundary
      stageUuid: "ddb51d1f-0f2e-8a85-934f-9f79f99bdd38"
    - stage: links
      stageUuid: "9dc8ed41-6217-833a-b544-54dcede4076f"
    - stage: horo
      stageUuid: "73e94346-ffdd-8371-97e8-35238fdb02d4"
    - stage: seal
      stageUuid: "6ab0ddd7-44d6-82d5-af23-dbda35df8507"
    - stage: uuid
      stageUuid: "20b009ca-c15d-86c5-aa0b-e7783c0c5552"
version: 2
---
# prepaid

Use for advance payments for future services or goods (insurance premiums, rent, subscriptions) — an asset that is drawn down to expense over the benefit period

Composes: [[journal/entries]] · [[deferral]] · [[fixed/assets]] · [[gl/accounts/recurring/journals]] · [[accrual]] · [[deferredrevenue]] · [[recognition]].

## Standards
- IAS-1 §27 (accrual basis reporting)
- Not IFRS-specific; implicit in expense recognition

**Law — [[law]]: a prepaid is an asset only until its benefit is consumed — it must be drawn down to expense across the period it serves, never recognized all at once or left to overstate assets.**

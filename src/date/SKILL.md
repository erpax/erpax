---
name: date
description: "Use when a document carries a temporal point — invoice date, transaction date, period-end date, expiry date, created-at, effective-at. An ISO-8601 datetime pinned at a point in time (the UTC timestamp + timezone context via versions). The temporal positioning twin of period."
atomPath: date
coordinate: date · 2/share · 90611e12
contentUuid: "7244fe3f-f175-5413-af03-84103f260fbd"
diamondUuid: "691a87f4-1f67-81e4-a7e3-9051da278d02"
uuid: "90611e12-ec2d-82c8-8e4f-19fc5eaf62a2"
horo: 2
bonds:
  in:
    - applicability
    - application
    - birth
    - collection
    - created
    - cvd
    - death
    - deleted
    - dissolution
    - due
    - except
    - fields
    - first
    - founding
    - guideline
    - identity
    - issued
    - job
    - law
    - model
    - modified
    - observation
    - order
    - payment
    - period
    - posted
    - previous
    - production
    - published
    - purchase
    - read
    - received
    - registered
    - release
    - scheduled
    - sd
    - sent
    - start
    - vehicle
    - versions
  out:
    - applicability
    - application
    - birth
    - collection
    - created
    - cvd
    - death
    - deleted
    - dissolution
    - due
    - except
    - fields
    - first
    - founding
    - guideline
    - identity
    - issued
    - job
    - law
    - model
    - modified
    - observation
    - order
    - payment
    - period
    - posted
    - previous
    - production
    - published
    - purchase
    - read
    - received
    - registered
    - release
    - scheduled
    - sd
    - sent
    - start
    - vehicle
    - versions
typography:
  partition: date
  bondDegree: 121
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - fields
    - identity
    - law
    - period
    - versions
  matrix:
    - applicability
    - application
    - birth
    - collection
    - created
    - cvd
    - death
    - deleted
    - dissolution
    - due
    - except
    - fields
    - first
    - founding
    - guideline
    - identity
    - issued
    - job
    - law
    - model
    - modified
    - observation
    - order
    - payment
    - period
    - posted
    - previous
    - production
    - published
    - purchase
    - read
    - received
    - registered
    - release
    - scheduled
    - sd
    - sent
    - start
    - vehicle
    - versions
  backlinks:
    - applicability
    - application
    - birth
    - collection
    - created
    - cvd
    - death
    - deleted
    - dissolution
    - due
    - except
    - fields
    - first
    - founding
    - guideline
    - identity
    - issued
    - job
    - law
    - model
    - modified
    - observation
    - order
    - payment
    - period
    - posted
    - previous
    - production
    - published
    - purchase
    - read
    - received
    - registered
    - release
    - scheduled
    - sd
    - sent
    - start
    - vehicle
    - versions
signatures:
  computationUuid: "d670c673-5c10-8750-aa2d-dc1ea2cec55e"
  stages:
    - stage: path
      stageUuid: "c160fee8-c0ef-8b4e-89cc-f5864e1c9566"
    - stage: trinity
      stageUuid: "bd4dbadb-78bb-82f5-9eb7-e9b333d658b7"
    - stage: boundary
      stageUuid: "bd3093f3-5783-8aab-b11d-25e69282971e"
    - stage: links
      stageUuid: "093aad00-f678-849b-b31a-505c2d80772c"
    - stage: horo
      stageUuid: "abf19b5c-9dc3-8aa2-95a2-0afa0ce4652e"
    - stage: seal
      stageUuid: "1aef21d1-ed56-8ec8-8fd0-ec77af20b9ca"
    - stage: uuid
      stageUuid: "f61c8bc1-6a86-85eb-a7a5-5559b0accf25"
version: 2
---
# date

Use when a document carries a temporal point — invoice date, transaction date, period-end date, expiry date, created-at, effective-at. An ISO-8601 datetime pinned at a point in time (the UTC timestamp + timezone context via versions). The temporal positioning twin of period.

Composes: [[identity]] · [[versions]] · [[fields]].

## Standards
- ISO-8601-1:2019

**Law — [[law]]: a date is an ISO-8601 datetime pinned at one point in time (UTC timestamp + timezone context via [[versions]]) — the temporal-positioning twin of [[period]].**

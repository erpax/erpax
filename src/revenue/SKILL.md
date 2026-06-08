---
name: revenue
description: "Use when applying IFRS-15 / ASC-606 revenue recognition logic — performance obligations, contract modification, timing (at-a-point vs. over-time), deferral."
atomPath: revenue
coordinate: revenue · 2/share · d65d24b7
contentUuid: "3571a2ad-4e74-55f9-8f98-b4c9997a2a89"
diamondUuid: "7592c9e5-e081-83be-b15b-6f1a98a435c2"
uuid: "d65d24b7-c72f-8b50-9729-7bfe288dedc3"
horo: 2
bonds:
  in:
    - accounting
    - churn
    - contracts
    - currency
    - deferredrevenue
    - enterprisebudget
    - forecast
    - invoices
    - law
    - obligations
    - yearly
    - yield
  out:
    - accounting
    - churn
    - contracts
    - currency
    - deferredrevenue
    - enterprisebudget
    - forecast
    - invoices
    - law
    - obligations
    - yearly
    - yield
typography:
  partition: revenue
  bondDegree: 39
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - accounting
    - contracts
    - currency
    - deferredrevenue
    - invoices
    - law
    - obligations
  matrix:
    - accounting
    - churn
    - contracts
    - currency
    - deferredrevenue
    - enterprisebudget
    - forecast
    - invoices
    - law
    - obligations
    - yearly
    - yield
  backlinks:
    - accounting
    - churn
    - contracts
    - currency
    - deferredrevenue
    - enterprisebudget
    - forecast
    - invoices
    - law
    - obligations
    - yearly
    - yield
signatures:
  computationUuid: "5700245e-4529-8b8c-abba-6c786ada1637"
  stages:
    - stage: path
      stageUuid: "6fc3d9cd-9700-88df-9b46-eb6b01fe0ac5"
    - stage: trinity
      stageUuid: "b8e3a18b-7e64-86fa-9ca2-22b04f77c5f8"
    - stage: boundary
      stageUuid: "eacc76c1-f759-8556-ae54-630bb81664bb"
    - stage: links
      stageUuid: "3e1d22bb-fa55-8f4d-abd2-def12cd89aef"
    - stage: horo
      stageUuid: "b4e015ec-1e3b-84c3-9a4e-3f76720be657"
    - stage: seal
      stageUuid: "6f7e910c-3f3d-88d8-bf4e-39b9b619e79b"
    - stage: uuid
      stageUuid: "ff1b8426-e983-88e3-a40e-346e4f4f247f"
version: 2
---
# revenue

Use when applying IFRS-15 / ASC-606 revenue recognition logic — performance obligations, contract modification, timing (at-a-point vs. over-time), deferral.

Composes: [[customers/contracts/performance/obligations]] · [[Invoices]] · [[Contracts]] · [[accounting]] · [[currency]] · [[deferredrevenue]].

**Law — [[law]]: revenue recognises only as performance obligations are satisfied — at a point in time or over time — with the remainder deferred (IFRS-15 / ASC-606).**

## Standards
- IFRS-15
- ASC-606

---
name: territory
description: "Use when organizing sales coverage — geographic or account-based territory, assignment to rep, quota per territory, coverage/overlap rules."
atomPath: territory
coordinate: territory · 7/descent · 8d8ab51e
contentUuid: "d4c35952-48ba-5e1b-b17b-de290b571806"
diamondUuid: "cabbfe7a-488a-890b-b1db-c7fa159dcc7e"
uuid: "8d8ab51e-1c9e-8532-9c52-6404859602de"
horo: 7
bonds:
  in:
    - customers
    - employees
    - forecast
    - orders
    - quota
    - terroir
  out:
    - customers
    - employees
    - forecast
    - orders
    - quota
    - terroir
typography:
  partition: territory
  bondDegree: 20
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - customers
    - employees
    - forecast
    - orders
    - quota
  matrix:
    - customers
    - employees
    - forecast
    - orders
    - quota
    - terroir
  backlinks:
    - customers
    - employees
    - forecast
    - orders
    - quota
    - terroir
signatures:
  computationUuid: "1e3ddc4b-55ff-8c11-9edc-addd0441cd7d"
  stages:
    - stage: path
      stageUuid: "64dc0f99-0971-8715-8112-321aa1007132"
    - stage: trinity
      stageUuid: "3c17f910-1b0a-8ce3-9744-b38b110505e7"
    - stage: boundary
      stageUuid: "d742fe96-92e0-82c6-92ad-558ef8d41668"
    - stage: links
      stageUuid: "faf54579-7448-8c3b-9057-596a05f6febd"
    - stage: horo
      stageUuid: "0434be3e-7d8f-8df6-9831-9780a502fb19"
    - stage: seal
      stageUuid: "3c7e36aa-1a40-813c-aeeb-c30ee024b914"
    - stage: uuid
      stageUuid: "ecff5bf3-2e88-878e-ae46-11b76c5d7713"
version: 2
---
# territory

Use when organizing sales coverage — geographic or account-based territory, assignment to rep, quota per territory, coverage/overlap rules.

Composes: [[Employees]] · [[Customers]] · [[quota]] · [[customers/sales/orders]] · [[forecast]].

## Standards
- CRM-generic

---
name: resolution
description: "Use when closing or resolving a ticket, issue, or complaint — root-cause analysis, solution implementation, confirmation, closure. The endpoint of a support lifecycle."
atomPath: resolution
coordinate: resolution · 5/round · 3259dcef
contentUuid: "4cd6bbb2-7d6a-5f1d-81da-dffd4818c885"
diamondUuid: "be7b919a-c16f-8813-be2e-6fd3c99885ce"
uuid: "3259dcef-5409-8d98-a2ea-784fc6510235"
horo: 5
bonds:
  in:
    - comment
    - escalation
    - incident
    - instances
    - sla
    - status
    - ticket
  out:
    - comment
    - escalation
    - incident
    - instances
    - sla
    - status
    - ticket
typography:
  partition: resolution
  bondDegree: 22
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - comment
    - escalation
    - instances
    - status
    - ticket
  matrix:
    - comment
    - escalation
    - incident
    - instances
    - sla
    - status
    - ticket
  backlinks:
    - comment
    - escalation
    - incident
    - instances
    - sla
    - status
    - ticket
signatures:
  computationUuid: "e2cf4c36-22df-8698-b64f-919397479329"
  stages:
    - stage: path
      stageUuid: "a02c98ef-dd68-86d9-8f00-fdfc91d09f7b"
    - stage: trinity
      stageUuid: "c024a4e8-5cae-8c95-8b7e-1e7022e1d7db"
    - stage: boundary
      stageUuid: "4305bb55-5fdf-86df-843e-e0d60197018e"
    - stage: links
      stageUuid: "2ce3b04a-9653-88bf-9d6f-f92b9747dc87"
    - stage: horo
      stageUuid: "78613c00-57b7-8336-8f3b-bf9d5013a094"
    - stage: seal
      stageUuid: "a9331a22-dd3e-8843-85c3-d9a155864f19"
    - stage: uuid
      stageUuid: "1d331d79-e16a-8837-8975-ff0f306d7e9a"
version: 2
---
# resolution

Use when closing or resolving a ticket, issue, or complaint — root-cause analysis, solution implementation, confirmation, closure. The endpoint of a support lifecycle.

Composes: [[ticket]] · [[comment]] · [[status]] · [[workflow/definitions/workflow/instances]] · [[escalation]].

## Standards
- ITIL problem management
- ISO-20000 resolution process

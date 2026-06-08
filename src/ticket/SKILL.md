---
name: ticket
description: "Use when a customer/employee request, complaint, or issue becomes a tracked work item with queue, priority, assignment, and SLA. The polymorphic support-case container."
atomPath: ticket
coordinate: ticket · 4/weave · 61ec08ec
contentUuid: "d6dd164a-692d-5774-a2ee-f31880793732"
diamondUuid: "f72c43b3-9ec2-8b62-b0ec-b5dcd836ce09"
uuid: "61ec08ec-c409-84d7-b150-58f812510f8c"
horo: 4
bonds:
  in:
    - activities
    - backlog
    - comment
    - escalation
    - instances
    - law
    - queue
    - reserved
    - resolution
    - status
    - users
  out:
    - activities
    - backlog
    - comment
    - escalation
    - instances
    - law
    - queue
    - reserved
    - resolution
    - status
    - users
typography:
  partition: ticket
  bondDegree: 35
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - activities
    - comment
    - escalation
    - instances
    - law
    - queue
    - resolution
    - status
    - users
  matrix:
    - activities
    - backlog
    - comment
    - escalation
    - instances
    - law
    - queue
    - reserved
    - resolution
    - status
    - users
  backlinks:
    - activities
    - backlog
    - comment
    - escalation
    - instances
    - law
    - queue
    - reserved
    - resolution
    - status
    - users
signatures:
  computationUuid: "9a020077-b10b-8d2a-b676-e72c6b7f0065"
  stages:
    - stage: path
      stageUuid: "a02176d5-17c3-830d-beb2-24e2e4f99db1"
    - stage: trinity
      stageUuid: "b37c4bf9-1751-8463-8e49-c89262768609"
    - stage: boundary
      stageUuid: "e41d41a5-aa12-8999-b504-3976a1437526"
    - stage: links
      stageUuid: "c884e9a4-0774-8b45-ab96-09605fd6c031"
    - stage: horo
      stageUuid: "4519ed46-76bf-8d20-bfaf-68a4de115625"
    - stage: seal
      stageUuid: "84ca16c5-402e-81d0-9ab6-d36fe19d1dbd"
    - stage: uuid
      stageUuid: "8f453111-0ae8-8ddc-af71-0e3a674eee2a"
version: 2
---
# ticket

Use when a customer/employee request, complaint, or issue becomes a tracked work item with queue, priority, assignment, and SLA. The polymorphic support-case container.

Composes: [[comment]] · [[Activities]] · [[workflow/definitions/workflow/instances]] · [[Users]] · [[escalation]] · [[status]] · [[queue]] · [[resolution]].

**Law — [[law]]: a ticket is the polymorphic support-case container — any request, complaint, or issue becomes one tracked work item carrying its [[queue]], priority, assignment, and SLA.**

## Standards
- ITIL for incident/request model
- ISO-20000 for service management

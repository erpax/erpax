---
name: ticket
description: "Use when a customer/employee request, complaint, or issue becomes a tracked work item with queue, priority, assignment, and SLA. The polymorphic support-case container."
atomPath: ticket
coordinate: "ticket · 1/base · 8f99c9b0"
contentUuid: "5638e17e-6174-5de0-a77c-d5f9bef37779"
diamondUuid: "25fe4241-2549-8c97-86d5-f939fea0a25d"
uuid: "8f99c9b0-e7d6-8133-9f4b-83e7ceac25fd"
horo: 1
typography:
  partition: ticket
  bondDegree: 37
standards: []
bindings: []
signatures:
  computationUuid: "fd729a8c-0bc5-8437-ab28-b7167cb478c7"
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
      stageUuid: "6c1224af-a415-81fa-9b5d-692ad7a9c3de"
    - stage: seal
      stageUuid: "042f70c8-ed21-8e65-9b1c-d2f3d40c77c5"
    - stage: uuid
      stageUuid: "46d9070d-1752-8dd1-a0a8-3dc87dc42c2f"
version: 2
---
# ticket

Use when a customer/employee request, complaint, or issue becomes a tracked work item with queue, priority, assignment, and SLA. The polymorphic support-case container.

Composes: [[comment]] · [[Activities]] · [[workflow/definitions/workflow/instances]] · [[Users]] · [[escalation]] · [[status]] · [[queue]] · [[resolution]].

**Law — [[law]]: a ticket is the polymorphic support-case container — any request, complaint, or issue becomes one tracked work item carrying its [[queue]], priority, assignment, and SLA.**

## Standards
- ITIL for incident/request model
- ISO-20000 for service management

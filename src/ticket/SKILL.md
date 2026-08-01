---
name: ticket
description: "Use when a customer/employee request, complaint, or issue becomes a tracked work item with queue, priority, assignment, and SLA. The polymorphic support-case container."
atomPath: ticket
coordinate: "ticket · 2/share · 0b64f906"
contentUuid: "90d3ad34-faf5-528c-935e-75f626543e7f"
diamondUuid: "e50c50b9-9a59-8723-9ba9-4db2e222e978"
uuid: "0b64f906-819e-8ff5-946f-9fa720eb0ff7"
horo: 2
typography:
  partition: ticket
  bondDegree: 37
standards: []
bindings: []
signatures:
  computationUuid: "e880fd28-69c7-8654-b683-4863fae70243"
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
      stageUuid: "a06e5b6e-dc6a-875f-8b84-0958b99669ba"
    - stage: seal
      stageUuid: "042f70c8-ed21-8e65-9b1c-d2f3d40c77c5"
    - stage: uuid
      stageUuid: "0da2f5df-9060-80ba-9283-0f682b37f5fc"
version: 2
---
# ticket

Use when a customer/employee request, complaint, or issue becomes a tracked work item with queue, priority, assignment, and SLA. The polymorphic support-case container.

Composes: [[comment]] · [[Activities]] · [[workflow/definitions/workflow/instances]] · [[Users]] · [[escalation]] · [[status]] · [[queue]] · [[resolution]].

**Law — [[law]]: a ticket is the polymorphic support-case container — any request, complaint, or issue becomes one tracked work item carrying its [[queue]], priority, assignment, and SLA.**

## Standards
- ITIL for incident/request model
- ISO-20000 for service management

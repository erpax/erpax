---
name: ticket
description: "Use when a customer/employee request, complaint, or issue becomes a tracked work item with queue, priority, assignment, and SLA. The polymorphic support-case container."
atomPath: ticket
coordinate: "ticket · 4/weave · 7a2e154b"
contentUuid: "07d331dd-5b95-59d7-abc8-6633427bd609"
diamondUuid: "4640e75c-e408-8dc4-b750-faef9d3c6da2"
uuid: "7a2e154b-f447-8c69-b561-5e9427c82baa"
horo: 4
typography:
  partition: ticket
  bondDegree: 37
standards: []
bindings: []
signatures:
  computationUuid: "0dfee814-f792-8072-8ee3-8ba22c3317b4"
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
      stageUuid: "62a234c5-8f33-8838-b635-b9f73951df9d"
    - stage: seal
      stageUuid: "042f70c8-ed21-8e65-9b1c-d2f3d40c77c5"
    - stage: uuid
      stageUuid: "2a4ad723-44ef-85f9-8a92-43c19eaf4a9f"
version: 2
---
# ticket

Use when a customer/employee request, complaint, or issue becomes a tracked work item with queue, priority, assignment, and SLA. The polymorphic support-case container.

Composes: [[comment]] · [[Activities]] · [[workflow/definitions/workflow/instances]] · [[Users]] · [[escalation]] · [[status]] · [[queue]] · [[resolution]].

**Law — [[law]]: a ticket is the polymorphic support-case container — any request, complaint, or issue becomes one tracked work item carrying its [[queue]], priority, assignment, and SLA.**

## Standards
- ITIL for incident/request model
- ISO-20000 for service management

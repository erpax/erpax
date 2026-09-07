---
name: ticket
description: "Use when a customer/employee request, complaint, or issue becomes a tracked work item with queue, priority, assignment, and SLA. The polymorphic support-case container."
atomPath: ticket
coordinate: "ticket · 2/share · 54c6e1b7"
contentUuid: "76171edf-0800-56a7-9f54-c2d76e2ae77b"
diamondUuid: "2cbc66f6-d7ef-82e7-abe4-7d44d91858cb"
uuid: "54c6e1b7-697a-8984-8cf9-a8a16105b8e5"
horo: 2
typography:
  partition: ticket
  bondDegree: 37
standards: []
bindings: []
signatures:
  computationUuid: "4d991116-8944-8dd8-b248-84ff0374006c"
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
      stageUuid: "f28164ad-b081-85a4-9e08-e5a828bed87c"
    - stage: seal
      stageUuid: "042f70c8-ed21-8e65-9b1c-d2f3d40c77c5"
    - stage: uuid
      stageUuid: "4f044e71-5dcd-89f0-bd63-3ff87a397903"
version: 2
---
# ticket

Use when a customer/employee request, complaint, or issue becomes a tracked work item with queue, priority, assignment, and SLA. The polymorphic support-case container.

Composes: [[comment]] · [[Activities]] · [[workflow/definitions/workflow/instances]] · [[Users]] · [[escalation]] · [[status]] · [[queue]] · [[resolution]].

**Law — [[law]]: a ticket is the polymorphic support-case container — any request, complaint, or issue becomes one tracked work item carrying its [[queue]], priority, assignment, and SLA.**

## Standards
- ITIL for incident/request model
- ISO-20000 for service management

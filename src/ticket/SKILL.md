---
name: ticket
description: "Use when a customer/employee request, complaint, or issue becomes a tracked work item with queue, priority, assignment, and SLA. The polymorphic support-case container."
atomPath: ticket
coordinate: "ticket · 2/share · bed11871"
contentUuid: "24f71bb9-60ca-595d-a9e0-5e90502ace4f"
diamondUuid: "745cb4f2-5e4c-81dc-b675-7baaf7b710aa"
uuid: "bed11871-5311-8ae9-be50-a48455c26849"
horo: 2
typography:
  partition: ticket
  bondDegree: 37
standards: []
bindings: []
signatures:
  computationUuid: "a03b627a-619d-8169-a97d-a1d2cc461431"
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
      stageUuid: "1cd96720-efae-83dd-82c9-02d426467b99"
    - stage: seal
      stageUuid: "042f70c8-ed21-8e65-9b1c-d2f3d40c77c5"
    - stage: uuid
      stageUuid: "d195a4d5-a71f-87e5-b4d2-458dcbd0dcd7"
version: 2
---
# ticket

Use when a customer/employee request, complaint, or issue becomes a tracked work item with queue, priority, assignment, and SLA. The polymorphic support-case container.

Composes: [[comment]] · [[Activities]] · [[workflow/definitions/workflow/instances]] · [[Users]] · [[escalation]] · [[status]] · [[queue]] · [[resolution]].

**Law — [[law]]: a ticket is the polymorphic support-case container — any request, complaint, or issue becomes one tracked work item carrying its [[queue]], priority, assignment, and SLA.**

## Standards
- ITIL for incident/request model
- ISO-20000 for service management

---
name: escalation
description: "Use when a ticket, issue, or complaint requires urgency upgrade — SLA breach, priority elevation, management review, or handoff to higher authority. The action of moving a matter up the hierarchy by severity/urgency."
atomPath: "vocabulary/escalation"
coordinate: "vocabulary/escalation · 1/base · 57aa011d"
contentUuid: "2eb8d3c7-5e38-557f-b18a-970fa8ca1b38"
diamondUuid: "d1e36cb1-7969-8bbd-80fb-a244d08b363e"
uuid: "57aa011d-05f5-8850-b0f8-a71430ca1d7f"
horo: 1
typography:
  partition: vocabulary
  bondDegree: 28
standards: []
bindings: []
signatures:
  computationUuid: "0bfbf29d-e1dd-8bfe-95ab-501473ad33e4"
  stages:
    - stage: path
      stageUuid: "0924fbc0-50c1-8724-a514-734dcd63d71e"
    - stage: trinity
      stageUuid: "c57e096f-39e1-880a-9a18-70f43d20d0d0"
    - stage: boundary
      stageUuid: "ded359bf-6534-89d3-ad19-23c73a6fd66c"
    - stage: links
      stageUuid: "6b48f50e-5e17-8d09-bf97-2143095cab55"
    - stage: horo
      stageUuid: "7c7c525f-4ccd-8fe3-9a73-31f790a06940"
    - stage: seal
      stageUuid: "ad27a179-e4e5-88e4-a588-061f4c6f8906"
    - stage: uuid
      stageUuid: "5b1d6ad4-80ef-8c6e-bb1a-4d738a1c953b"
version: 2
---
# escalation

Use when a ticket, issue, or complaint requires urgency upgrade — SLA breach, priority elevation, management review, or handoff to higher authority. The action of moving a matter up the hierarchy by severity/urgency.

Composes: [[workflow/definitions/workflow/instances]] · [[comment]] · [[Activities]] · [[status]] · [[time]].

**Law — [[law]]: escalation moves a matter up the hierarchy by severity/urgency — the [[status]] transition triggered by an [[sla]] breach or priority elevation that hands it to higher authority.**

## Standards
- ITIL for incident escalation
- ISO-20000 for SLA
- BPMN 2.0 for workflow states

---
name: escalation
description: "Use when a ticket, issue, or complaint requires urgency upgrade — SLA breach, priority elevation, management review, or handoff to higher authority. The action of moving a matter up the hierarchy by severity/urgency."
atomPath: "vocabulary/escalation"
coordinate: "vocabulary/escalation · 5/round · 8a8d613e"
contentUuid: "14a8b7b5-9cc4-56f6-835e-a82d15f4a589"
diamondUuid: "0332c860-9cfc-84a4-997e-8ad31468c9e5"
uuid: "8a8d613e-d8f0-8c30-a8bd-cc5746d7bf1f"
horo: 5
typography:
  partition: vocabulary
  bondDegree: 28
standards: []
bindings: []
signatures:
  computationUuid: "b4133240-e1a7-8c66-ba62-0109d86f9b73"
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
      stageUuid: "45293e02-a7cb-81a3-818d-31b0140a71cd"
    - stage: seal
      stageUuid: "ad27a179-e4e5-88e4-a588-061f4c6f8906"
    - stage: uuid
      stageUuid: "885b51c3-8b45-8036-8ae9-f84bc7fe6076"
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

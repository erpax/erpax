---
name: escalation
description: "Use when a ticket, issue, or complaint requires urgency upgrade — SLA breach, priority elevation, management review, or handoff to higher authority. The action of moving a matter up the hierarchy by severity/urgency."
atomPath: "vocabulary/escalation"
coordinate: "vocabulary/escalation · 1/base · 402eca7c"
contentUuid: "e6a71e15-c4c7-5d3b-a008-5f876ef86670"
diamondUuid: "3630c08a-8db4-8485-aff1-7c309a997d65"
uuid: "402eca7c-94b9-8c90-8490-cb899ee32632"
horo: 1
typography:
  partition: vocabulary
  bondDegree: 28
standards: []
bindings: []
signatures:
  computationUuid: "cf7bf38d-ec8d-8607-8053-d39794973c89"
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
      stageUuid: "cde32e73-b5c6-8adf-bd90-e18ae8a3bfa1"
    - stage: seal
      stageUuid: "ad27a179-e4e5-88e4-a588-061f4c6f8906"
    - stage: uuid
      stageUuid: "01e2d7a7-cb3d-8f4c-adf2-6bf23313bc0a"
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

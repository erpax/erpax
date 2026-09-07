---
name: escalation
description: "Use when a ticket, issue, or complaint requires urgency upgrade — SLA breach, priority elevation, management review, or handoff to higher authority. The action of moving a matter up the hierarchy by severity/urgency."
atomPath: "vocabulary/escalation"
coordinate: "vocabulary/escalation · 5/round · 5a3db3a3"
contentUuid: "e20f4711-97ce-5b6d-8ca5-babd8ec65fab"
diamondUuid: "7bc9deba-2d52-8a5f-9aae-91858520101b"
uuid: "5a3db3a3-3733-89d3-a982-6dea32983062"
horo: 5
typography:
  partition: vocabulary
  bondDegree: 28
standards: []
bindings: []
signatures:
  computationUuid: "7e3e7e5f-5084-81cf-8d9b-ebf1265f7d28"
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
      stageUuid: "6aaa50a6-8715-8360-bdfe-a5a3d75bd228"
    - stage: seal
      stageUuid: "ad27a179-e4e5-88e4-a588-061f4c6f8906"
    - stage: uuid
      stageUuid: "145560da-01c4-8102-8db9-e4e818096c6c"
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

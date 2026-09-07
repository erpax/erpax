---
name: escalation
description: "Use when a ticket, issue, or complaint requires urgency upgrade — SLA breach, priority elevation, management review, or handoff to higher authority. The action of moving a matter up the hierarchy by severity/urgency."
atomPath: "vocabulary/escalation"
coordinate: "vocabulary/escalation · 5/round · d2eb85f2"
contentUuid: "e3020f66-d94f-50f5-b792-ede26f3a5f76"
diamondUuid: "76f0ecfc-adf8-810c-aaab-5c3213d8cda3"
uuid: "d2eb85f2-75ba-8614-a1d4-e54a90cf99aa"
horo: 5
typography:
  partition: vocabulary
  bondDegree: 28
standards: []
bindings: []
signatures:
  computationUuid: "901e1854-596c-8148-a26d-e14688da8706"
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
      stageUuid: "438d0766-d6e5-8326-b8fe-be4dfd919948"
    - stage: seal
      stageUuid: "ad27a179-e4e5-88e4-a588-061f4c6f8906"
    - stage: uuid
      stageUuid: "02e2c904-fc1c-8e55-9b7d-cb2335e2f738"
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

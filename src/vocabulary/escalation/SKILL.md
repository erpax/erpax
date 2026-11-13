---
name: escalation
description: "Use when a ticket, issue, or complaint requires urgency upgrade — SLA breach, priority elevation, management review, or handoff to higher authority. The action of moving a matter up the hierarchy by severity/urgency."
atomPath: "vocabulary/escalation"
coordinate: "vocabulary/escalation · 5/round · 2317835d"
contentUuid: "dff339e0-2949-5c8e-9fd1-cd0c9096f21a"
diamondUuid: "64f63582-b450-8585-8e5b-0ea7aaba2d75"
uuid: "2317835d-d181-8db9-b2de-1b71173c2b3d"
horo: 5
typography:
  partition: vocabulary
  bondDegree: 18
standards: []
bindings: []
signatures:
  computationUuid: "837433a3-d258-8cbe-9017-6dfdc70b206f"
  stages:
    - stage: path
      stageUuid: "0924fbc0-50c1-8724-a514-734dcd63d71e"
    - stage: trinity
      stageUuid: "c57e096f-39e1-880a-9a18-70f43d20d0d0"
    - stage: boundary
      stageUuid: "8688edea-fb2c-8e59-baab-885772567fcf"
    - stage: links
      stageUuid: "cdde48f5-1170-85a2-85af-aa0218ad4437"
    - stage: horo
      stageUuid: "8449a4db-be1d-8a15-a6de-f575c0824086"
    - stage: seal
      stageUuid: "ad27a179-e4e5-88e4-a588-061f4c6f8906"
    - stage: uuid
      stageUuid: "4e9b49be-f7bc-80b5-bf6f-c1ad72cc5167"
version: 2
---
# escalation

Use when a ticket, issue, or complaint requires urgency upgrade — SLA breach, priority elevation, management review, or handoff to higher authority. The action of moving a matter up the hierarchy by severity/urgency.

Composes: [[workflow/definitions/workflow/instances]] · [[comment]] · [[Activities]] · [[status]] · time.

**Law — [[law]]: escalation moves a matter up the hierarchy by severity/urgency — the [[status]] transition triggered by an sla breach or priority elevation that hands it to higher authority.**

## Standards
- ITIL for incident escalation
- ISO-20000 for SLA
- BPMN 2.0 for workflow states

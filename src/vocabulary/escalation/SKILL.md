---
name: escalation
description: "Use when a ticket, issue, or complaint requires urgency upgrade — SLA breach, priority elevation, management review, or handoff to higher authority. The action of moving a matter up the hierarchy by severity/urgency."
atomPath: "vocabulary/escalation"
coordinate: "vocabulary/escalation · 4/weave · 65537797"
contentUuid: "d4603858-e4ac-5946-b643-e6eeb8c1d0e6"
diamondUuid: "52f1eac5-3db9-85f2-9ac9-40badf3b5880"
uuid: "65537797-ab0e-8538-a846-983914204405"
horo: 4
typography:
  partition: vocabulary
  bondDegree: 28
standards: []
bindings: []
signatures:
  computationUuid: "553163d3-cb1d-8e74-8c6e-3b05d07e964b"
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
      stageUuid: "458d7dc4-766d-8acb-9886-1f6113c4837a"
    - stage: seal
      stageUuid: "e2f305c4-02c3-87fa-bdfa-266d4fa5f5f5"
    - stage: uuid
      stageUuid: "b472b04f-1ec2-870b-9113-3c6f53be4122"
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

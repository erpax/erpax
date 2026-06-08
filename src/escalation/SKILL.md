---
name: escalation
description: "Use when a ticket, issue, or complaint requires urgency upgrade — SLA breach, priority elevation, management review, or handoff to higher authority. The action of moving a matter up the hierarchy by severity/urgency."
atomPath: escalation
coordinate: escalation · 7/descent · 0589f49b
contentUuid: "032ac6d3-c349-5a12-8eca-3ab0be3063c5"
diamondUuid: "706cce63-0831-8211-b7b9-b7dff65c41e7"
uuid: "0589f49b-2230-84cc-97e2-90aa251d4c96"
horo: 7
bonds:
  in:
    - activities
    - comment
    - instances
    - law
    - resolution
    - sla
    - status
    - ticket
    - time
  out:
    - activities
    - comment
    - instances
    - law
    - resolution
    - sla
    - status
    - ticket
    - time
typography:
  partition: escalation
  bondDegree: 28
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - activities
    - comment
    - instances
    - law
    - sla
    - status
    - time
  matrix:
    - activities
    - comment
    - instances
    - law
    - resolution
    - sla
    - status
    - ticket
    - time
  backlinks:
    - activities
    - comment
    - instances
    - law
    - resolution
    - sla
    - status
    - ticket
    - time
signatures:
  computationUuid: "4e40b94f-a310-87cc-b55d-71a7cd6443ed"
  stages:
    - stage: path
      stageUuid: "952e142b-de6a-893e-998d-640e757b2e31"
    - stage: trinity
      stageUuid: "392c59ea-9e3d-8ee8-9bc8-8539aa4d5cd4"
    - stage: boundary
      stageUuid: "04ec3f31-9f82-8445-8949-68519d5393c9"
    - stage: links
      stageUuid: "6cd0ab7a-7287-810c-a8c5-a3ccfef0e850"
    - stage: horo
      stageUuid: "38f726ef-22a1-87d9-8766-1f09b2286dbd"
    - stage: seal
      stageUuid: "9c1c3600-d2ce-8e0e-8439-f48ce480c733"
    - stage: uuid
      stageUuid: "49d9ff37-3b56-8f97-99ae-2a92272ee6bd"
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

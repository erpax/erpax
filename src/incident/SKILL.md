---
name: incident
description: "Use when logging unplanned downtime, service interruptions, production stops, or safety events — the adverse event log with root-cause, impact, resolution, and prevention tracking."
atomPath: incident
coordinate: incident · 2/share · 3ea14e40
contentUuid: "ce9c6738-9184-57dd-b6ed-983def473387"
diamondUuid: "717a5107-a555-894f-8ab8-303c902f539c"
uuid: "3ea14e40-3ed4-8f89-900c-591ebddeec92"
horo: 2
bonds:
  in:
    - defect
    - events
    - law
    - resolution
    - risk
    - runbook
    - schedule
    - workflow
  out:
    - defect
    - events
    - law
    - resolution
    - risk
    - runbook
    - schedule
    - workflow
typography:
  partition: incident
  bondDegree: 25
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - events
    - law
    - resolution
    - risk
    - runbook
    - schedule
    - workflow
  matrix:
    - defect
    - events
    - law
    - resolution
    - risk
    - runbook
    - schedule
    - workflow
  backlinks:
    - defect
    - events
    - law
    - resolution
    - risk
    - runbook
    - schedule
    - workflow
signatures:
  computationUuid: "fe27804a-bb9e-8467-bb84-a4f3387472bf"
  stages:
    - stage: path
      stageUuid: "8c682e32-3835-8109-93a6-b95f0032e5fd"
    - stage: trinity
      stageUuid: "0c3226cb-1374-8e5e-bb9a-314b6b636973"
    - stage: boundary
      stageUuid: "d6d9f6c3-e57a-8b21-acd0-3dcce730bbed"
    - stage: links
      stageUuid: "2eda9a4a-7c01-878d-b8fa-0d2f28354779"
    - stage: horo
      stageUuid: "1123edd8-a9ed-8ed7-b0fc-3425caa063e5"
    - stage: seal
      stageUuid: "974eed45-d7e3-8581-a002-ad2559f1d0bb"
    - stage: uuid
      stageUuid: "004598be-5b95-88f9-855d-89881083d982"
version: 2
---
# incident

Use when logging unplanned downtime, service interruptions, production stops, or safety events — the adverse event log with root-cause, impact, resolution, and prevention tracking.

Composes: [[workflow]] · [[audit/events]] · [[risk]] · [[schedule]] · [[resolution]] · [[runbook]].

**Law — [[law]]: an incident is the log of an unplanned adverse event (downtime, stoppage, safety) tracking root-cause, impact, [[resolution]], and prevention — the record from which a [[runbook]] is followed and recurrence prevented.**

## Standards
- ITIL (incident mgmt)
- ISO-45001 (occupational health/safety incidents)

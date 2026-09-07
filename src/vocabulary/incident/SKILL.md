---
name: incident
description: "Use when logging unplanned downtime, service interruptions, production stops, or safety events — the adverse event log with root-cause, impact, resolution, and prevention tracking."
atomPath: "vocabulary/incident"
coordinate: "vocabulary/incident · 7/descent · d9adff8b"
contentUuid: "b05f68eb-52e3-5dd0-9d2c-c0c5fbedad42"
diamondUuid: "3e2ce962-3025-81a5-89b3-57ccf6e55afe"
uuid: "d9adff8b-acb2-84fa-b62d-8c405cbb09e5"
horo: 7
typography:
  partition: vocabulary
  bondDegree: 25
standards: []
bindings: []
signatures:
  computationUuid: "7cc77965-20f0-89ce-9cea-972b8dceb03e"
  stages:
    - stage: path
      stageUuid: "9b49effa-95cb-88a5-a43c-2078e39b7fd8"
    - stage: trinity
      stageUuid: "ef47cbba-47b7-866e-919e-ceac3d6d7662"
    - stage: boundary
      stageUuid: "1c64a48b-6f2b-84f2-8fe6-471340e7e980"
    - stage: links
      stageUuid: "2df2ae2f-7fe4-883c-88dd-cc23e14cc660"
    - stage: horo
      stageUuid: "e537158e-fcee-8dea-8e78-b81dc733fdb9"
    - stage: seal
      stageUuid: "c5e939c4-8f2a-835d-8424-a8f0e4430b06"
    - stage: uuid
      stageUuid: "2d122d47-8485-8d65-b0f3-dda718167b3f"
version: 2
---
# incident

Use when logging unplanned downtime, service interruptions, production stops, or safety events — the adverse event log with root-cause, impact, resolution, and prevention tracking.

Composes: [[workflow]] · [[audit/events]] · [[risk]] · [[schedule]] · [[resolution]] · [[runbook]].

**Law — [[law]]: an incident is the log of an unplanned adverse event (downtime, stoppage, safety) tracking root-cause, impact, [[resolution]], and prevention — the record from which a [[runbook]] is followed and recurrence prevented.**

## Standards
- ITIL (incident mgmt)
- ISO-45001 (occupational health/safety incidents)

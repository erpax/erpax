---
name: incident
description: "Use when logging unplanned downtime, service interruptions, production stops, or safety events — the adverse event log with root-cause, impact, resolution, and prevention tracking."
atomPath: "vocabulary/incident"
coordinate: "vocabulary/incident · 2/share · 800abb1b"
contentUuid: "3fbf3ed2-4eb6-51b1-9ea8-a022c85be751"
diamondUuid: "3ccf0b51-69b7-86f0-b1ab-b77edff59860"
uuid: "800abb1b-b264-850c-b014-84b9b14dae5b"
horo: 2
typography:
  partition: vocabulary
  bondDegree: 25
standards: []
bindings: []
signatures:
  computationUuid: "c15fd4ac-fc4e-8a06-bfcd-0b4fa3f5001d"
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
      stageUuid: "890be6ba-292e-87ba-9337-c3f5b618b18e"
    - stage: seal
      stageUuid: "c5e939c4-8f2a-835d-8424-a8f0e4430b06"
    - stage: uuid
      stageUuid: "e3d2f891-bf7e-8ffd-b328-aa239e3710bf"
version: 2
---
# incident

Use when logging unplanned downtime, service interruptions, production stops, or safety events — the adverse event log with root-cause, impact, resolution, and prevention tracking.

Composes: [[workflow]] · [[audit/events]] · [[risk]] · [[schedule]] · [[resolution]] · [[runbook]].

**Law — [[law]]: an incident is the log of an unplanned adverse event (downtime, stoppage, safety) tracking root-cause, impact, [[resolution]], and prevention — the record from which a [[runbook]] is followed and recurrence prevented.**

## Standards
- ITIL (incident mgmt)
- ISO-45001 (occupational health/safety incidents)

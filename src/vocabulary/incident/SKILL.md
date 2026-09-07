---
name: incident
description: "Use when logging unplanned downtime, service interruptions, production stops, or safety events — the adverse event log with root-cause, impact, resolution, and prevention tracking."
atomPath: "vocabulary/incident"
coordinate: "vocabulary/incident · 5/round · 1ca75f92"
contentUuid: "030dc6f2-8319-57f0-b31b-d7bd4add19fd"
diamondUuid: "3d13f019-0812-8d58-b9c3-72357501500a"
uuid: "1ca75f92-6afa-871b-8769-71aadf15e5a7"
horo: 5
typography:
  partition: vocabulary
  bondDegree: 25
standards: []
bindings: []
signatures:
  computationUuid: "33f4776b-a5fb-8905-ab71-8326bf627a36"
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
      stageUuid: "0fdf79fc-59c3-8c6e-bde6-1c1bcf879127"
    - stage: seal
      stageUuid: "c5e939c4-8f2a-835d-8424-a8f0e4430b06"
    - stage: uuid
      stageUuid: "daa47122-e593-85a1-85b1-d5dcc9aaf952"
version: 2
---
# incident

Use when logging unplanned downtime, service interruptions, production stops, or safety events — the adverse event log with root-cause, impact, resolution, and prevention tracking.

Composes: [[workflow]] · [[audit/events]] · [[risk]] · [[schedule]] · [[resolution]] · [[runbook]].

**Law — [[law]]: an incident is the log of an unplanned adverse event (downtime, stoppage, safety) tracking root-cause, impact, [[resolution]], and prevention — the record from which a [[runbook]] is followed and recurrence prevented.**

## Standards
- ITIL (incident mgmt)
- ISO-45001 (occupational health/safety incidents)

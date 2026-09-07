---
name: incident
description: "Use when logging unplanned downtime, service interruptions, production stops, or safety events — the adverse event log with root-cause, impact, resolution, and prevention tracking."
atomPath: "vocabulary/incident"
coordinate: "vocabulary/incident · 8/crest · 449e091a"
contentUuid: "3cacc8f6-3a32-5bb3-a170-4b78fd9f0ac3"
diamondUuid: "fe41e428-62ee-8816-8a88-6d94ebf758d6"
uuid: "449e091a-1960-8e94-97af-7d1484e0b1af"
horo: 8
typography:
  partition: vocabulary
  bondDegree: 25
standards: []
bindings: []
signatures:
  computationUuid: "79d8440a-4fdd-8fd1-9bcc-89e6c0864047"
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
      stageUuid: "4ec55b0c-088b-88e9-899c-ed5d48642276"
    - stage: seal
      stageUuid: "c5e939c4-8f2a-835d-8424-a8f0e4430b06"
    - stage: uuid
      stageUuid: "e648a4b7-80a0-8d90-a87e-3d786e6378df"
version: 2
---
# incident

Use when logging unplanned downtime, service interruptions, production stops, or safety events — the adverse event log with root-cause, impact, resolution, and prevention tracking.

Composes: [[workflow]] · [[audit/events]] · [[risk]] · [[schedule]] · [[resolution]] · [[runbook]].

**Law — [[law]]: an incident is the log of an unplanned adverse event (downtime, stoppage, safety) tracking root-cause, impact, [[resolution]], and prevention — the record from which a [[runbook]] is followed and recurrence prevented.**

## Standards
- ITIL (incident mgmt)
- ISO-45001 (occupational health/safety incidents)

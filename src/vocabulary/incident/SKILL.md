---
name: incident
description: "Use when logging unplanned downtime, service interruptions, production stops, or safety events — the adverse event log with root-cause, impact, resolution, and prevention tracking."
atomPath: "vocabulary/incident"
coordinate: "vocabulary/incident · 1/base · 0641a65a"
contentUuid: "5838c3fb-9eb0-58ff-9d23-d390f4c1bc00"
diamondUuid: "a849d32e-2ddb-82e6-917d-30344fea15a8"
uuid: "0641a65a-9318-8441-b4e5-0d1bf291db3e"
horo: 1
typography:
  partition: vocabulary
  bondDegree: 25
standards: []
bindings: []
signatures:
  computationUuid: "614bd3e0-e5c6-82c2-a558-4e8edba4e3e4"
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
      stageUuid: "ae4a0399-b3bf-8497-87d5-f0032197c008"
    - stage: seal
      stageUuid: "0bba810a-5294-807c-ac64-db014e0b9513"
    - stage: uuid
      stageUuid: "6fe04a3e-e461-8bcb-9dd0-d54534b83c5d"
version: 2
---
# incident

Use when logging unplanned downtime, service interruptions, production stops, or safety events — the adverse event log with root-cause, impact, resolution, and prevention tracking.

Composes: [[workflow]] · [[audit/events]] · [[risk]] · [[schedule]] · [[resolution]] · [[runbook]].

**Law — [[law]]: an incident is the log of an unplanned adverse event (downtime, stoppage, safety) tracking root-cause, impact, [[resolution]], and prevention — the record from which a [[runbook]] is followed and recurrence prevented.**

## Standards
- ITIL (incident mgmt)
- ISO-45001 (occupational health/safety incidents)

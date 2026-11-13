---
name: incident
description: "Use when logging unplanned downtime, service interruptions, production stops, or safety events — the adverse event log with root-cause, impact, resolution, and prevention tracking."
atomPath: "vocabulary/incident"
coordinate: "vocabulary/incident · 4/weave · dc8b6517"
contentUuid: "8891f1df-3e8c-5bd4-8ef9-f6735543b0d6"
diamondUuid: "4c339712-cf22-8b7a-af19-a898374d9a7a"
uuid: "dc8b6517-a75e-8d46-b0a7-45ba12a2aa19"
horo: 4
typography:
  partition: vocabulary
  bondDegree: 18
standards: []
bindings: []
signatures:
  computationUuid: "bd72e8f9-1779-8852-8d98-420fab796e8f"
  stages:
    - stage: path
      stageUuid: "9b49effa-95cb-88a5-a43c-2078e39b7fd8"
    - stage: trinity
      stageUuid: "ef47cbba-47b7-866e-919e-ceac3d6d7662"
    - stage: boundary
      stageUuid: "e0418167-cdb3-8ceb-96b2-cb5467150e7a"
    - stage: links
      stageUuid: "80328ec2-ce7f-8e06-97e2-f7f34df00faf"
    - stage: horo
      stageUuid: "f801ad4d-d54c-839b-a8bb-1bdeb40ee5e8"
    - stage: seal
      stageUuid: "c5e939c4-8f2a-835d-8424-a8f0e4430b06"
    - stage: uuid
      stageUuid: "acaa5526-4d79-8823-b44b-30aea72777ff"
version: 2
---
# incident

Use when logging unplanned downtime, service interruptions, production stops, or safety events — the adverse event log with root-cause, impact, resolution, and prevention tracking.

Composes: [[workflow]] · [[audit/events]] · [[risk]] · schedule · [[resolution]] · runbook.

**Law — [[law]]: an incident is the log of an unplanned adverse event (downtime, stoppage, safety) tracking root-cause, impact, [[resolution]], and prevention — the record from which a runbook is followed and recurrence prevented.**

## Standards
- ITIL (incident mgmt)
- ISO-45001 (occupational health/safety incidents)

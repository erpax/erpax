---
name: schedule
description: "Use when assigning work to calendar slots — resource schedules, shift rosters, project timelines, appointment booking. The time-coordinate commitment."
atomPath: schedule
coordinate: "schedule · 4/weave · 52796818"
contentUuid: "3b6fd14d-8029-534f-82dc-87aca212d1f8"
diamondUuid: "3a368ead-6cca-80ce-92f3-6688ceab4921"
uuid: "52796818-4fb3-8c8e-8cd8-cbae6d982a39"
horo: 4
typography:
  partition: schedule
  bondDegree: 81
standards: []
bindings: []
signatures:
  computationUuid: "8ee2431c-dc1a-8afb-9710-0e479cc68b86"
  stages:
    - stage: path
      stageUuid: "259af7f0-2e78-856a-89aa-7896763108ce"
    - stage: trinity
      stageUuid: "975c12cb-53aa-8685-9f30-1f0eae2f3ef1"
    - stage: boundary
      stageUuid: "365be3c3-d1f4-8ff5-b4c9-8557c1f6ef40"
    - stage: links
      stageUuid: "413a0365-ee02-8e3d-b919-72b871054848"
    - stage: horo
      stageUuid: "ea9febff-3259-8801-af4a-ef8d9c69a9c0"
    - stage: seal
      stageUuid: "1bb48b25-5485-8342-8157-3ee8c8db0514"
    - stage: uuid
      stageUuid: "9ed706cc-e8c0-883f-bf15-cb33b78c0f28"
version: 2
---
# schedule

Use when assigning work to calendar slots — resource schedules, shift rosters, project timelines, appointment booking. The time-coordinate commitment.

Composes: [[bookable/resources]] · [[Bookings]] · [[work/shifts|WorkShifts]] · [[horo]] · [[begin]].

## Standards
- iCalendar (RFC 5545)
- BPMN timing

**Law — [[law]]: a schedule is the commitment of work to a time-coordinate — a resource, shift, project task or appointment bound to a calendar slot on the [[horo]] time ring.**

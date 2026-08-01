---
name: schedule
description: "Use when assigning work to calendar slots — resource schedules, shift rosters, project timelines, appointment booking. The time-coordinate commitment."
atomPath: schedule
coordinate: "schedule · 5/round · 7b95a050"
contentUuid: "81025497-83d6-5890-95b7-8fb974f5828f"
diamondUuid: "1e201c04-0197-80c4-905e-942aaf8477b3"
uuid: "7b95a050-0862-8234-82c1-1da07126cf1b"
horo: 5
typography:
  partition: schedule
  bondDegree: 81
standards: []
bindings: []
signatures:
  computationUuid: "d4ea902e-7221-8215-8882-9e6608654014"
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
      stageUuid: "1a7667eb-f1a9-82a3-9ad9-419356270f47"
    - stage: seal
      stageUuid: "1bb48b25-5485-8342-8157-3ee8c8db0514"
    - stage: uuid
      stageUuid: "4a5516be-f235-8043-808c-d3ac2ebedc90"
version: 2
---
# schedule

Use when assigning work to calendar slots — resource schedules, shift rosters, project timelines, appointment booking. The time-coordinate commitment.

Composes: [[bookable/resources]] · [[Bookings]] · [[work/shifts|WorkShifts]] · [[horo]] · [[begin]].

## Standards
- iCalendar (RFC 5545)
- BPMN timing

**Law — [[law]]: a schedule is the commitment of work to a time-coordinate — a resource, shift, project task or appointment bound to a calendar slot on the [[horo]] time ring.**

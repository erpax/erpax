---
name: schedule
description: "Use when assigning work to calendar slots — resource schedules, shift rosters, project timelines, appointment booking. The time-coordinate commitment."
atomPath: schedule
coordinate: "schedule · 8/crest · 3faf267d"
contentUuid: "5d2417a8-a630-55c8-90a0-8dcea0538527"
diamondUuid: "4f7d7597-8317-83cd-a7a8-99e0925cc24d"
uuid: "3faf267d-b5b6-83cc-a9ea-fcee38135070"
horo: 8
typography:
  partition: schedule
  bondDegree: 79
standards: []
bindings: []
signatures:
  computationUuid: "fff5439b-3088-8976-a0e9-94e428954686"
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
      stageUuid: "c52ee13c-9c40-8336-9bf6-0e134999e687"
    - stage: seal
      stageUuid: "1bb48b25-5485-8342-8157-3ee8c8db0514"
    - stage: uuid
      stageUuid: "1609a35a-9bab-8662-be9d-4a72e7ab2141"
version: 2
---
# schedule

Use when assigning work to calendar slots — resource schedules, shift rosters, project timelines, appointment booking. The time-coordinate commitment.

Composes: [[bookable/resources]] · [[Bookings]] · [[work/shifts|WorkShifts]] · [[horo]] · [[begin]].

## Standards
- iCalendar (RFC 5545)
- BPMN timing

**Law — [[law]]: a schedule is the commitment of work to a time-coordinate — a resource, shift, project task or appointment bound to a calendar slot on the [[horo]] time ring.**

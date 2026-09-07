---
name: schedule
description: "Use when assigning work to calendar slots — resource schedules, shift rosters, project timelines, appointment booking. The time-coordinate commitment."
atomPath: schedule
coordinate: "schedule · 4/weave · 351130a7"
contentUuid: "87f5019d-ebd8-5e9f-af41-26bc1d030983"
diamondUuid: "8ef5ed31-c55a-8d03-9d49-435372f51cd2"
uuid: "351130a7-793f-8235-bed2-d47237d2032a"
horo: 4
typography:
  partition: schedule
  bondDegree: 81
standards: []
bindings: []
signatures:
  computationUuid: "bfb9b7b2-1d56-8026-a349-c83aa29427f2"
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
      stageUuid: "2ff251a1-062f-8661-a59f-64a81691a466"
    - stage: seal
      stageUuid: "1bb48b25-5485-8342-8157-3ee8c8db0514"
    - stage: uuid
      stageUuid: "7c07cf6a-24e3-86fc-930d-1ecee0ec504d"
version: 2
---
# schedule

Use when assigning work to calendar slots — resource schedules, shift rosters, project timelines, appointment booking. The time-coordinate commitment.

Composes: [[bookable/resources]] · [[Bookings]] · [[work/shifts|WorkShifts]] · [[horo]] · [[begin]].

## Standards
- iCalendar (RFC 5545)
- BPMN timing

**Law — [[law]]: a schedule is the commitment of work to a time-coordinate — a resource, shift, project task or appointment bound to a calendar slot on the [[horo]] time ring.**

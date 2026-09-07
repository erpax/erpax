---
name: schedule
description: "Use when assigning work to calendar slots — resource schedules, shift rosters, project timelines, appointment booking. The time-coordinate commitment."
atomPath: schedule
coordinate: "schedule · 5/round · 345a593c"
contentUuid: "7201a713-d71c-5c3a-9e13-ebd2e4897b3d"
diamondUuid: "20092723-5bd6-8b26-8519-ab452b6d917d"
uuid: "345a593c-66b8-88ed-a3f1-bbee76e7d25b"
horo: 5
typography:
  partition: schedule
  bondDegree: 81
standards: []
bindings: []
signatures:
  computationUuid: "3421b5e5-ea90-8f77-9f5b-064263e2dbf0"
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
      stageUuid: "e1a2abf9-e8ec-8749-9a15-14788f97c9d1"
    - stage: seal
      stageUuid: "1bb48b25-5485-8342-8157-3ee8c8db0514"
    - stage: uuid
      stageUuid: "a7680a89-a128-8a8f-8cf1-17c8727d1649"
version: 2
---
# schedule

Use when assigning work to calendar slots — resource schedules, shift rosters, project timelines, appointment booking. The time-coordinate commitment.

Composes: [[bookable/resources]] · [[Bookings]] · [[work/shifts|WorkShifts]] · [[horo]] · [[begin]].

## Standards
- iCalendar (RFC 5545)
- BPMN timing

**Law — [[law]]: a schedule is the commitment of work to a time-coordinate — a resource, shift, project task or appointment bound to a calendar slot on the [[horo]] time ring.**

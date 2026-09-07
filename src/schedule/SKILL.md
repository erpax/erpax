---
name: schedule
description: "Use when assigning work to calendar slots — resource schedules, shift rosters, project timelines, appointment booking. The time-coordinate commitment."
atomPath: schedule
coordinate: "schedule · 5/round · dd74d4e5"
contentUuid: "3cafbda9-f36e-59c1-8755-2789e365b518"
diamondUuid: "eb04b427-c790-8571-9097-da0fd7f895b6"
uuid: "dd74d4e5-350c-8780-81be-631d63f88146"
horo: 5
typography:
  partition: schedule
  bondDegree: 79
standards: []
bindings: []
signatures:
  computationUuid: "36a1f0fa-5b09-8e5e-9d28-d5306af04c25"
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
      stageUuid: "7567110f-83a0-8efd-bc4c-509d654ed6f3"
    - stage: seal
      stageUuid: "1bb48b25-5485-8342-8157-3ee8c8db0514"
    - stage: uuid
      stageUuid: "5c92a41d-2f29-81c9-9398-bad0636557c1"
version: 2
---
# schedule

Use when assigning work to calendar slots — resource schedules, shift rosters, project timelines, appointment booking. The time-coordinate commitment.

Composes: [[bookable/resources]] · [[Bookings]] · [[work/shifts|WorkShifts]] · [[horo]] · [[begin]].

## Standards
- iCalendar (RFC 5545)
- BPMN timing

**Law — [[law]]: a schedule is the commitment of work to a time-coordinate — a resource, shift, project task or appointment bound to a calendar slot on the [[horo]] time ring.**

---
name: schedule
description: "Use when assigning work to calendar slots — resource schedules, shift rosters, project timelines, appointment booking. The time-coordinate commitment."
atomPath: schedule
coordinate: schedule · 1/base · f259804d
contentUuid: "85623ceb-8a59-5c7e-b2ad-b344428750ff"
diamondUuid: "a07fbbc7-5e73-8d26-9d39-04c16af9b7b7"
uuid: "f259804d-d866-8b75-8bf6-e7422d5a67a6"
horo: 1
bonds:
  in:
    - backlog
    - begin
    - bookings
    - cohort
    - course
    - cropplan
    - dose
    - horo
    - incident
    - irrigation
    - kpi
    - law
    - maximum
    - metric
    - moisture
    - planting
    - propagation
    - recommended
    - reported
    - resources
    - roadmap
    - run
    - runbook
    - season
    - shifts
    - timezone
    - trend
  out:
    - backlog
    - begin
    - bookings
    - cohort
    - course
    - cropplan
    - dose
    - horo
    - incident
    - irrigation
    - kpi
    - law
    - maximum
    - metric
    - moisture
    - planting
    - propagation
    - recommended
    - reported
    - resources
    - roadmap
    - run
    - runbook
    - season
    - shifts
    - timezone
    - trend
typography:
  partition: schedule
  bondDegree: 81
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - begin
    - bookings
    - horo
    - law
    - resources
    - shifts
  matrix:
    - backlog
    - begin
    - bookings
    - cohort
    - course
    - cropplan
    - dose
    - horo
    - incident
    - irrigation
    - kpi
    - law
    - maximum
    - metric
    - moisture
    - planting
    - propagation
    - recommended
    - reported
    - resources
    - roadmap
    - run
    - runbook
    - season
    - shifts
    - timezone
    - trend
  backlinks:
    - backlog
    - begin
    - bookings
    - cohort
    - course
    - cropplan
    - dose
    - horo
    - incident
    - irrigation
    - kpi
    - law
    - maximum
    - metric
    - moisture
    - planting
    - propagation
    - recommended
    - reported
    - resources
    - roadmap
    - run
    - runbook
    - season
    - shifts
    - timezone
    - trend
signatures:
  computationUuid: "ae55bb48-3d64-82ff-bb33-5dd932f1c3f4"
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
      stageUuid: "1f4dd7b9-1c69-8e41-b7be-1d7d9c0846d1"
    - stage: seal
      stageUuid: "362ab0f2-ddb9-80d5-88fe-cf7f64b0dfd2"
    - stage: uuid
      stageUuid: "0ffd5ee1-b939-8a6a-8908-91b95646afbc"
version: 2
---
# schedule

Use when assigning work to calendar slots — resource schedules, shift rosters, project timelines, appointment booking. The time-coordinate commitment.

Composes: [[bookable/resources]] · [[Bookings]] · [[work/shifts|WorkShifts]] · [[horo]] · [[begin]].

## Standards
- iCalendar (RFC 5545)
- BPMN timing

**Law — [[law]]: a schedule is the commitment of work to a time-coordinate — a resource, shift, project task or appointment bound to a calendar slot on the [[horo]] time ring.**

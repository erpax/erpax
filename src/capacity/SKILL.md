---
name: capacity
description: "Use when planning, tracking, or optimizing resource capacity — workforce availability, machine utilization, warehouse/facility space, or bottleneck detection per work-center/shift/period. The binding constraint in operations."
atomPath: capacity
coordinate: capacity · 8/crest · 243947bb
contentUuid: "594b346c-9d1a-5c31-b356-45c1be03da81"
diamondUuid: "1f998b7b-950c-8c04-b1fe-4624e06f9741"
uuid: "243947bb-d86c-8717-a619-a0c3e5e956ce"
horo: 8
bonds:
  in:
    - agriculture
    - aquaculture
    - attendee
    - biomass
    - bottleneck
    - centers
    - compost
    - covercrop
    - fertility
    - fuel
    - grazing
    - herd
    - irrigation
    - maximum
    - measure
    - moisture
    - pasture
    - physical
    - propagation
    - rate
    - remaining
    - rotation
    - season
    - seating
    - shifts
    - soil
    - sustainability
    - tunnel
    - vehicle
    - virtual
    - yield
  out:
    - agriculture
    - aquaculture
    - attendee
    - biomass
    - bottleneck
    - centers
    - compost
    - covercrop
    - fertility
    - fuel
    - grazing
    - herd
    - irrigation
    - maximum
    - measure
    - moisture
    - pasture
    - physical
    - propagation
    - rate
    - remaining
    - rotation
    - season
    - seating
    - shifts
    - soil
    - sustainability
    - tunnel
    - vehicle
    - virtual
    - yield
typography:
  partition: capacity
  bondDegree: 94
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - bottleneck
    - centers
    - measure
    - rate
    - shifts
  matrix:
    - agriculture
    - aquaculture
    - attendee
    - biomass
    - bottleneck
    - centers
    - compost
    - covercrop
    - fertility
    - fuel
    - grazing
    - herd
    - irrigation
    - maximum
    - measure
    - moisture
    - pasture
    - physical
    - propagation
    - rate
    - remaining
    - rotation
    - season
    - seating
    - shifts
    - soil
    - sustainability
    - tunnel
    - vehicle
    - virtual
    - yield
  backlinks:
    - agriculture
    - aquaculture
    - attendee
    - biomass
    - bottleneck
    - centers
    - compost
    - covercrop
    - fertility
    - fuel
    - grazing
    - herd
    - irrigation
    - maximum
    - measure
    - moisture
    - pasture
    - physical
    - propagation
    - rate
    - remaining
    - rotation
    - season
    - seating
    - shifts
    - soil
    - sustainability
    - tunnel
    - vehicle
    - virtual
    - yield
signatures:
  computationUuid: "e4b6f6ed-e9ca-8351-b3cd-776c0ba57df3"
  stages:
    - stage: path
      stageUuid: "47c5639b-c9d3-800a-a61b-212ce5c3879a"
    - stage: trinity
      stageUuid: "3f5e460e-1cdb-880d-b39d-128c7d5cda03"
    - stage: boundary
      stageUuid: "fda3dcc8-9aee-8a4c-a585-0995c00b7389"
    - stage: links
      stageUuid: "aab23a89-6f2d-82cc-9656-2cbfef9ea118"
    - stage: horo
      stageUuid: "d02e2c8a-a439-84b4-a8a3-80b046d14f09"
    - stage: seal
      stageUuid: "5d025985-953c-8f2c-bdc3-2a76ee181d15"
    - stage: uuid
      stageUuid: "1ab7ae7c-3e81-8ee0-93c9-04455cfb0936"
version: 2
---
# capacity

Use when planning, tracking, or optimizing resource capacity — workforce availability, machine utilization, warehouse/facility space, or bottleneck detection per work-center/shift/period. The binding constraint in operations.

Composes: [[work/centers]] · [[work/shifts|WorkShifts]] · [[rate]] · [[measure]] · [[bottleneck]].

## Standards
- ISO-8402 (quality mgmt capacity)

---
name: readings
description: "Use when reasoning about clinical and biometric readings — a device-collapsed, content-addressed snapshot that feeds the analog result stream; the wire between quantum/device capture and quantum/emr replay."
atomPath: readings
coordinate: "readings · 7/descent · dd8a756f"
contentUuid: "df9843d7-11ca-544c-9d18-dc2a3ebefc93"
diamondUuid: "3758ccbe-90a0-8af8-bf08-4e12f44b2b5b"
uuid: "dd8a756f-1915-8297-a2ef-3e9269e21cfc"
horo: 7
typography:
  partition: readings
  bondDegree: 30
standards: []
bindings: []
signatures:
  computationUuid: "ecdfd224-6ce7-86f7-8953-84d1d69178a4"
  stages:
    - stage: path
      stageUuid: "9a914982-6326-8f21-b523-ef1bec138526"
    - stage: trinity
      stageUuid: "950cee6b-4299-8466-9625-5469937502f7"
    - stage: boundary
      stageUuid: "beb4ab8f-43a4-80a5-8c86-527664a6abc4"
    - stage: links
      stageUuid: "d242d98a-e8e7-89f4-8073-82c2504a00e5"
    - stage: horo
      stageUuid: "d539730f-1566-8657-a724-a08d82e879f8"
    - stage: seal
      stageUuid: "04550259-ea24-8e42-8d2f-05867c4dbf39"
    - stage: uuid
      stageUuid: "eca32880-1507-84dc-ba0e-b3f0efcff96a"
version: 2
---
# readings — device-collapsed snapshots feeding the analog stream

A **reading** is the moment [[quantum/device]] collapses continuous physiology into discrete numbers — capture on the edge, raw stream stays local, only scalars cross. Each reading is a content-addressed [[snapshot]] (`readingUuid`) that appends to the chain and folds into [[quantum/emr]] as an `EmrObservation` (`observationFromDeviceReading`). The EMR chain replays those observations as **[[analog]] results** — a continuous measured timeline ([[vital]] signs, labs, [[biometric]] captures) with supersede semantics, never binary on/off flags.

**Pipeline.** Continuous field → device collapse → reading snapshot → EMR observation → analog result stream (`analogResults` · `reconstructAt`). Matter-twin: `src/readings/index.ts` — `DeviceReading` · `readingBoundaryHolds` · `readingUuid`; `src/quantum/emr/index.ts` — `observationFromDeviceReading`.

**Law — [[law]]: a reading is a device-collapsed snapshot feeding the analog stream — content-addressed at the edge, append-only in the chain, replayed as continuous measured quantities with supersede semantics, never in-place mutation.**

@see [[quantum/device]] · [[quantum/emr]] · [[analog]] · [[vital]] · [[biometric]] · [[snapshot]] · [[observation]]

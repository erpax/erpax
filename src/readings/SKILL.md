---
name: readings
description: "Use when reasoning about clinical and biometric readings — a device-collapsed, content-addressed snapshot that feeds the analog result stream; the wire between quantum/device capture and quantum/emr replay."
atomPath: readings
coordinate: "readings · 5/round · 5e1cac74"
contentUuid: "e7951a98-0b64-5e83-96dd-6b7e45b6be74"
diamondUuid: "7b9f80d2-6321-8568-a3af-e1ab24b027ba"
uuid: "5e1cac74-8a8b-8155-a749-9183b8e773e0"
horo: 5
typography:
  partition: readings
  bondDegree: 30
standards: []
bindings: []
signatures:
  computationUuid: "f8aa3757-b91e-85d1-b5ab-66ba793ce763"
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
      stageUuid: "f7f45202-af67-87c4-97f6-99f7a18e2913"
    - stage: seal
      stageUuid: "04550259-ea24-8e42-8d2f-05867c4dbf39"
    - stage: uuid
      stageUuid: "25920e1f-6ee1-88e9-82bd-60e85fde6288"
version: 2
---
# readings — device-collapsed snapshots feeding the analog stream

A **reading** is the moment [[quantum/device]] collapses continuous physiology into discrete numbers — capture on the edge, raw stream stays local, only scalars cross. Each reading is a content-addressed [[snapshot]] (`readingUuid`) that appends to the chain and folds into [[quantum/emr]] as an `EmrObservation` (`observationFromDeviceReading`). The EMR chain replays those observations as **[[analog]] results** — a continuous measured timeline ([[vital]] signs, labs, [[biometric]] captures) with supersede semantics, never binary on/off flags.

**Pipeline.** Continuous field → device collapse → reading snapshot → EMR observation → analog result stream (`analogResults` · `reconstructAt`). Matter-twin: `src/readings/index.ts` — `DeviceReading` · `readingBoundaryHolds` · `readingUuid`; `src/quantum/emr/index.ts` — `observationFromDeviceReading`.

**Law — [[law]]: a reading is a device-collapsed snapshot feeding the analog stream — content-addressed at the edge, append-only in the chain, replayed as continuous measured quantities with supersede semantics, never in-place mutation.**

@see [[quantum/device]] · [[quantum/emr]] · [[analog]] · [[vital]] · [[biometric]] · [[snapshot]] · [[observation]]

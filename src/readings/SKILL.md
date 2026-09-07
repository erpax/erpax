---
name: readings
description: "Use when reasoning about clinical and biometric readings — a device-collapsed, content-addressed snapshot that feeds the analog result stream; the wire between quantum/device capture and quantum/emr replay."
atomPath: readings
coordinate: "readings · 2/share · 0bda69d0"
contentUuid: "e200dafa-47b9-52c1-8352-514f9dccd123"
diamondUuid: "273d5261-0df1-8bb7-8fba-98b553474501"
uuid: "0bda69d0-129a-8b49-953a-4e4a71c0a6c3"
horo: 2
typography:
  partition: readings
  bondDegree: 30
standards: []
bindings: []
signatures:
  computationUuid: "a29138ec-99af-8f17-a9ec-23e6fba83b29"
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
      stageUuid: "91f876f7-0c9e-8021-9adf-2b6cc11c9ef2"
    - stage: seal
      stageUuid: "04550259-ea24-8e42-8d2f-05867c4dbf39"
    - stage: uuid
      stageUuid: "1308b7e0-496e-84c2-a3ea-c95ca3e563dd"
version: 2
---
# readings — device-collapsed snapshots feeding the analog stream

A **reading** is the moment [[quantum/device]] collapses continuous physiology into discrete numbers — capture on the edge, raw stream stays local, only scalars cross. Each reading is a content-addressed [[snapshot]] (`readingUuid`) that appends to the chain and folds into [[quantum/emr]] as an `EmrObservation` (`observationFromDeviceReading`). The EMR chain replays those observations as **[[analog]] results** — a continuous measured timeline ([[vital]] signs, labs, [[biometric]] captures) with supersede semantics, never binary on/off flags.

**Pipeline.** Continuous field → device collapse → reading snapshot → EMR observation → analog result stream (`analogResults` · `reconstructAt`). Matter-twin: `src/readings/index.ts` — `DeviceReading` · `readingBoundaryHolds` · `readingUuid`; `src/quantum/emr/index.ts` — `observationFromDeviceReading`.

**Law — [[law]]: a reading is a device-collapsed snapshot feeding the analog stream — content-addressed at the edge, append-only in the chain, replayed as continuous measured quantities with supersede semantics, never in-place mutation.**

@see [[quantum/device]] · [[quantum/emr]] · [[analog]] · [[vital]] · [[biometric]] · [[snapshot]] · [[observation]]

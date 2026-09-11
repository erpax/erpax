---
name: readings
description: "Use when reasoning about clinical and biometric readings — a device-collapsed, content-addressed snapshot that feeds the analog result stream; the wire between quantum/device capture and quantum/emr replay."
atomPath: readings
coordinate: "readings · 4/weave · 9f79a1e3"
contentUuid: "5d47a0ee-7ca2-5f7d-9229-f3b2df654bc5"
diamondUuid: "5729a7bf-2744-8b63-8792-6376b27b1bc9"
uuid: "9f79a1e3-e84b-86de-a84a-ab1ba7747614"
horo: 4
typography:
  partition: readings
  bondDegree: 30
standards: []
bindings: []
signatures:
  computationUuid: "1cd3bc6a-8bbc-8b52-aac2-623de400224c"
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
      stageUuid: "71f77d6a-d730-8850-bd4d-577a0aedd17b"
    - stage: seal
      stageUuid: "04550259-ea24-8e42-8d2f-05867c4dbf39"
    - stage: uuid
      stageUuid: "faef6e91-175f-89cc-9368-f801a2757205"
version: 2
---
# readings — device-collapsed snapshots feeding the analog stream

A **reading** is the moment [[quantum/device]] collapses continuous physiology into discrete numbers — capture on the edge, raw stream stays local, only scalars cross. Each reading is a content-addressed [[snapshot]] (`readingUuid`) that appends to the chain and folds into [[quantum/emr]] as an `EmrObservation` (`observationFromDeviceReading`). The EMR chain replays those observations as **[[analog]] results** — a continuous measured timeline ([[vital]] signs, labs, [[biometric]] captures) with supersede semantics, never binary on/off flags.

**Pipeline.** Continuous field → device collapse → reading snapshot → EMR observation → analog result stream (`analogResults` · `reconstructAt`). Matter-twin: `src/readings/index.ts` — `DeviceReading` · `readingBoundaryHolds` · `readingUuid`; `src/quantum/emr/index.ts` — `observationFromDeviceReading`.

**Law — [[law]]: a reading is a device-collapsed snapshot feeding the analog stream — content-addressed at the edge, append-only in the chain, replayed as continuous measured quantities with supersede semantics, never in-place mutation.**

@see [[quantum/device]] · [[quantum/emr]] · [[analog]] · [[vital]] · [[biometric]] · [[snapshot]] · [[observation]]

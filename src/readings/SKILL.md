---
name: readings
description: "Use when reasoning about clinical and biometric readings — a device-collapsed, content-addressed snapshot that feeds the analog result stream; the wire between quantum/device capture and quantum/emr replay."
atomPath: readings
coordinate: "readings · 4/weave · 7306fc09"
contentUuid: "3fb578b6-161a-5d38-b6af-b698b09ef951"
diamondUuid: "be03a704-77dd-8d48-98d9-63845fbc2f19"
uuid: "7306fc09-4377-8ae2-85d0-f3ba941ef771"
horo: 4
typography:
  partition: readings
  bondDegree: 30
standards: []
bindings: []
signatures:
  computationUuid: "ef700a67-15a8-8159-8ddb-0e402ec5958f"
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
      stageUuid: "28474a7d-38b3-8e09-8af0-e4662670420e"
    - stage: seal
      stageUuid: "04550259-ea24-8e42-8d2f-05867c4dbf39"
    - stage: uuid
      stageUuid: "6f6e7efb-2d85-83d6-ae44-035891cd8514"
version: 2
---
# readings — device-collapsed snapshots feeding the analog stream

A **reading** is the moment [[quantum/device]] collapses continuous physiology into discrete numbers — capture on the edge, raw stream stays local, only scalars cross. Each reading is a content-addressed [[snapshot]] (`readingUuid`) that appends to the chain and folds into [[quantum/emr]] as an `EmrObservation` (`observationFromDeviceReading`). The EMR chain replays those observations as **[[analog]] results** — a continuous measured timeline ([[vital]] signs, labs, [[biometric]] captures) with supersede semantics, never binary on/off flags.

**Pipeline.** Continuous field → device collapse → reading snapshot → EMR observation → analog result stream (`analogResults` · `reconstructAt`). Matter-twin: `src/readings/index.ts` — `DeviceReading` · `readingBoundaryHolds` · `readingUuid`; `src/quantum/emr/index.ts` — `observationFromDeviceReading`.

**Law — [[law]]: a reading is a device-collapsed snapshot feeding the analog stream — content-addressed at the edge, append-only in the chain, replayed as continuous measured quantities with supersede semantics, never in-place mutation.**

@see [[quantum/device]] · [[quantum/emr]] · [[analog]] · [[vital]] · [[biometric]] · [[snapshot]] · [[observation]]

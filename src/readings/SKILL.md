---
name: readings
description: "Use when reasoning about clinical and biometric readings — a device-collapsed, content-addressed snapshot that feeds the analog result stream; the wire between quantum/device capture and quantum/emr replay."
atomPath: readings
coordinate: "readings · 8/crest · f5db33b3"
contentUuid: "8d0dabea-ffd6-5469-87e9-b52e939c113e"
diamondUuid: "33cbc886-42ac-81f2-bb56-1c6aabfce0f3"
uuid: "f5db33b3-6fe9-865a-a69c-7433abd9128a"
horo: 8
typography:
  partition: readings
  bondDegree: 21
standards: []
bindings: []
signatures:
  computationUuid: "186e4729-963c-89c1-8f0f-4f4a7ac16b02"
  stages:
    - stage: path
      stageUuid: "9a914982-6326-8f21-b523-ef1bec138526"
    - stage: trinity
      stageUuid: "950cee6b-4299-8466-9625-5469937502f7"
    - stage: boundary
      stageUuid: "0be8d7a8-7e9b-8d38-8507-76c4c3beb1e2"
    - stage: links
      stageUuid: "818b6a31-6dde-8dc9-aab5-db076de5e93a"
    - stage: horo
      stageUuid: "d240651a-021e-8771-9933-79578c95001f"
    - stage: seal
      stageUuid: "04550259-ea24-8e42-8d2f-05867c4dbf39"
    - stage: uuid
      stageUuid: "d3af074c-1b2a-8d64-b45c-6bae07b88588"
version: 2
---
# readings — device-collapsed snapshots feeding the analog stream

A **reading** is the moment [[quantum/device]] collapses continuous physiology into discrete numbers — capture on the edge, raw stream stays local, only scalars cross. Each reading is a content-addressed snapshot (`readingUuid`) that appends to the chain and folds into [[quantum/emr]] as an `EmrObservation` (`observationFromDeviceReading`). The EMR chain replays those observations as **[[analog]] results** — a continuous measured timeline (vital signs, labs, biometric captures) with supersede semantics, never binary on/off flags.

**Pipeline.** Continuous field → device collapse → reading snapshot → EMR observation → analog result stream (`analogResults` · `reconstructAt`). Matter-twin: `src/readings/index.ts` — `DeviceReading` · `readingBoundaryHolds` · `readingUuid`; `src/quantum/emr/index.ts` — `observationFromDeviceReading`.

**Law — [[law]]: a reading is a device-collapsed snapshot feeding the analog stream — content-addressed at the edge, append-only in the chain, replayed as continuous measured quantities with supersede semantics, never in-place mutation.**

@see [[quantum/device]] · [[quantum/emr]] · [[analog]] · vital · biometric · snapshot · [[observation]]

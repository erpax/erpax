---
name: readings
description: "Use when reasoning about clinical and biometric readings — a device-collapsed, content-addressed snapshot that feeds the analog result stream; the wire between quantum/device capture and quantum/emr replay."
atomPath: readings
coordinate: "readings · 7/descent · 62c0a39f"
contentUuid: "1b70d0bc-d0a6-5c1e-abbd-92e535d73751"
diamondUuid: "2bf16f2b-dc6e-8f8a-8bd8-0bcff8e1de7b"
uuid: "62c0a39f-bbcb-82a9-96ad-66e7176598cf"
horo: 7
typography:
  partition: readings
  bondDegree: 15
standards: []
bindings: []
signatures:
  computationUuid: "fd76ca39-7488-89a8-8a57-00900fa54026"
  stages:
    - stage: path
      stageUuid: "9a914982-6326-8f21-b523-ef1bec138526"
    - stage: trinity
      stageUuid: "950cee6b-4299-8466-9625-5469937502f7"
    - stage: boundary
      stageUuid: "0be8d7a8-7e9b-8d38-8507-76c4c3beb1e2"
    - stage: links
      stageUuid: "0dea1b66-2c2e-8932-848f-a01e33815bd0"
    - stage: horo
      stageUuid: "330e151b-e582-8d9a-b727-6e54c14c0e29"
    - stage: seal
      stageUuid: "04550259-ea24-8e42-8d2f-05867c4dbf39"
    - stage: uuid
      stageUuid: "bdf6a981-8a6e-8d31-ab3b-b819aea4d0f8"
version: 2
---
# readings — device-collapsed snapshots feeding the analog stream

A **reading** is the moment [[quantum/device]] collapses continuous physiology into discrete numbers — capture on the edge, raw stream stays local, only scalars cross. Each reading is a content-addressed snapshot (`readingUuid`) that appends to the chain and folds into [[quantum/emr]] as an `EmrObservation` (`observationFromDeviceReading`). The EMR chain replays those observations as **analog results** — a continuous measured timeline (vital signs, labs, biometric captures) with supersede semantics, never binary on/off flags.

**Pipeline.** Continuous field → device collapse → reading snapshot → EMR observation → analog result stream (`analogResults` · `reconstructAt`). Matter-twin: `src/readings/index.ts` — `DeviceReading` · `readingBoundaryHolds` · `readingUuid`; `src/quantum/emr/index.ts` — `observationFromDeviceReading`.

**Law — [[law]]: a reading is a device-collapsed snapshot feeding the analog stream — content-addressed at the edge, append-only in the chain, replayed as continuous measured quantities with supersede semantics, never in-place mutation.**

@see [[quantum/device]] · [[quantum/emr]] · analog · vital · biometric · snapshot · observation

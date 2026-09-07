---
name: device
description: "Use when reasoning about a device as a measurement instrument — the boundary where the continuous analog world collapses into discrete digital snapshots; capture on the edge, compute pure, every reading a content-addressed measurement in the snapshot chain."
atomPath: "quantum/device"
coordinate: "quantum/device · 1/base · c0fc63fe"
contentUuid: "6feafb01-5ef0-58e0-8005-b3b558a6d85c"
diamondUuid: "2751a732-a1e9-87d2-a4b5-2e79a29d411d"
uuid: "c0fc63fe-567c-8a38-8280-f40404fdc3f1"
horo: 1
typography:
  partition: quantum
  bondDegree: 97
standards: []
bindings: []
signatures:
  computationUuid: "e8718b0c-b12d-8d44-a236-b19f250653bf"
  stages:
    - stage: path
      stageUuid: "225454fc-327d-859d-bf56-45cec052be2b"
    - stage: trinity
      stageUuid: "35163ab6-e6e8-8a91-909b-ecdea549a591"
    - stage: boundary
      stageUuid: "2fbe82b3-9c40-8b5c-a38a-6372d928e6a8"
    - stage: links
      stageUuid: "9c5dce20-b961-8d72-a15b-82c1649fb8df"
    - stage: horo
      stageUuid: "4494b3ed-1323-8785-a962-424f6c7eb9c3"
    - stage: seal
      stageUuid: "cbd3726a-b32c-851f-9de4-8b730f12369a"
    - stage: uuid
      stageUuid: "1d41dbec-e288-838a-8c77-938c6162fa40"
quantum:
  superposition:
    - analog
    - anesthesia
    - available
    - bed
    - biometric
    - cassette
    - device
    - emr
    - superposition
  collapse:
    - "Use when reasoning about a device as a measurement instrument — the boundary where the continuous analog world collapses into discrete digital snapshots; capture on the edge, compute pure, every reading a content-addressed measurement in the snapshot chain."
    - "[[analog]]"
    - "[[biometric]]"
    - "[[coherence]]"
    - "[[device]]"
    - "[[finality]]"
    - "[[measurement]]"
    - "[[reality]]"
    - "[[sensory]]"
    - "[[snapshot]]"
    - "a device may only collapse what is physically real — the continuous [[analog]] field is measurable (rPPG/HRV), the [[biofield]] is not, so a device must never report a reading it cannot sense. Capture stays on the edge and only numbers cross the boundary (the raw stream never leaves the device); each reading is an append-only content-addressed [[snapshot]], final the moment it is taken."
  seal:
    sandbox: false
    receipt: false
    pathFollow: true
    canonicalRecord: true
    analogResults: true
    speechResults: false
    computationUuid: "e8718b0c-b12d-8d44-a236-b19f250653bf"
    contentUuid: "6feafb01-5ef0-58e0-8005-b3b558a6d85c"
version: 2
---
# quantum/device — the measurement instrument

The quantum twin of [[device]]: a device is where the **continuous [[analog]] world collapses into discrete digital snapshots** — the [[measurement]] boundary ([[reality]]). A sensor reading is a collapse; an actuator is the reverse, a digital state pushed back into the world.

Each reading is a content-addressed [[snapshot]] in the [[quantum/snapshot]] chain — append-only, deduped, [[finality]] one way (a measured moment is final). The [[sensory]] field (camera, mic, accelerometer, the [[biometric]] sensors) is the inlet; [[coherence]] (rPPG/HRV) is one worked example.

Edge law: **capture on the device, compute pure on the Worker** — `getUserMedia` → numbers → analysis + bindings, no raw stream leaving the edge. The device has the camera; the Worker has none. Measure what is real — the [[analog]] field is continuous; the [[biofield]] is not detectable.

**Law — [[law]]: a device may only collapse what is physically real — the continuous [[analog]] field is measurable (rPPG/HRV), the [[biofield]] is not, so a device must never report a reading it cannot sense. Capture stays on the edge and only numbers cross the boundary (the raw stream never leaves the device); each reading is an append-only content-addressed [[snapshot]], final the moment it is taken.**

@see [[device]] · [[measurement]] · [[reality]] · [[analog]] · [[sensory]] · [[snapshot]] · [[biometric]] · [[coherence]] · [[finality]]

<sub>content-uuid `6feafb01-5ef0-58e0-8005-b3b558a6d85c` · account `quantum/device` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>

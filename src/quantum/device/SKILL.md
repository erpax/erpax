---
name: device
description: "Use when reasoning about a device as a measurement instrument — the boundary where the continuous analog world collapses into discrete digital snapshots; capture on the edge, compute pure, every reading a content-addressed measurement in the snapshot chain."
atomPath: quantum/device
coordinate: quantum/device · 4/weave · c336d3c4
contentUuid: "3b4d6a02-251d-53a8-aab3-4b96a17b0db6"
diamondUuid: "c0e409f1-184f-8e99-b42c-baa27d434b7b"
uuid: "c336d3c4-8f6c-86f7-8ccc-88d327b0e206"
horo: 4
bonds:
  in:
    - available
    - biometric
    - device
    - law
    - medical
    - purpose
    - quantum
    - stack
    - uses
  out:
    - available
    - biometric
    - device
    - law
    - medical
    - purpose
    - stack
    - uses
typography:
  partition: quantum
  bondDegree: 65
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - analog
    - biofield
    - biometric
    - coherence
    - device
    - finality
    - law
    - measurement
    - reality
    - sensory
    - snapshot
  matrix:
    - available
    - biometric
    - device
    - law
    - medical
    - purpose
    - stack
    - uses
  backlinks:
    - available
    - biometric
    - device
    - law
    - medical
    - purpose
    - stack
    - uses
signatures:
  computationUuid: "72210b94-8fe9-8b13-84a6-3c53d798cc58"
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
      stageUuid: "0597e2a9-cc6f-8e68-8305-ddf3dd02b4b6"
    - stage: seal
      stageUuid: "cbd3726a-b32c-851f-9de4-8b730f12369a"
    - stage: uuid
      stageUuid: "5fccb924-d4fa-8e36-b334-09a7076603f6"
quantum:
  superposition:
    - available
    - biometric
    - device
    - law
    - medical
    - purpose
    - quantum
    - stack
    - uses
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
    computationUuid: "72210b94-8fe9-8b13-84a6-3c53d798cc58"
    contentUuid: "3b4d6a02-251d-53a8-aab3-4b96a17b0db6"
version: 2
---
# quantum/device — the measurement instrument

The quantum twin of [[device]]: a device is where the **continuous [[analog]] world collapses into discrete digital snapshots** — the [[measurement]] boundary ([[reality]]). A sensor reading is a collapse; an actuator is the reverse, a digital state pushed back into the world.

Each reading is a content-addressed [[snapshot]] in the [[quantum/snapshot]] chain — append-only, deduped, [[finality]] one way (a measured moment is final). The [[sensory]] field (camera, mic, accelerometer, the [[biometric]] sensors) is the inlet; [[coherence]] (rPPG/HRV) is one worked example.

Edge law: **capture on the device, compute pure on the Worker** — `getUserMedia` → numbers → analysis + bindings, no raw stream leaving the edge. The device has the camera; the Worker has none. Measure what is real — the [[analog]] field is continuous; the [[biofield]] is not detectable.

**Law — [[law]]: a device may only collapse what is physically real — the continuous [[analog]] field is measurable (rPPG/HRV), the [[biofield]] is not, so a device must never report a reading it cannot sense. Capture stays on the edge and only numbers cross the boundary (the raw stream never leaves the device); each reading is an append-only content-addressed [[snapshot]], final the moment it is taken.**

@see [[device]] · [[measurement]] · [[reality]] · [[analog]] · [[sensory]] · [[snapshot]] · [[biometric]] · [[coherence]] · [[finality]]

<sub>content-uuid `3b4d6a02-251d-53a8-aab3-4b96a17b0db6` · account `quantum/device` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>

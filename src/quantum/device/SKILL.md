---
name: device
description: "Use when reasoning about a device as a measurement instrument — the boundary where the continuous analog world collapses into discrete digital snapshots; capture on the edge, compute pure, every reading a content-addressed measurement in the snapshot chain."
atomPath: "quantum/device"
coordinate: "quantum/device · 8/crest · ff13b868"
contentUuid: "c832e65c-a333-5a2f-93b8-6edbeabf7b4b"
diamondUuid: "91c812d8-99cd-8cac-9557-fd464e14dfe9"
uuid: "ff13b868-1381-8874-955d-1335bebf7e44"
horo: 8
typography:
  partition: quantum
  bondDegree: 97
standards: []
bindings: []
signatures:
  computationUuid: "b3bda51b-f2a4-8d77-ae0c-2a87d886c5e6"
  stages:
    - stage: path
      stageUuid: "225454fc-327d-859d-bf56-45cec052be2b"
    - stage: trinity
      stageUuid: "35163ab6-e6e8-8a91-909b-ecdea549a591"
    - stage: boundary
      stageUuid: "2fbe82b3-9c40-8b5c-a38a-6372d928e6a8"
    - stage: links
      stageUuid: "c75add25-7639-8fd0-945e-284d26f9babd"
    - stage: horo
      stageUuid: "100b8d69-6fad-8a3c-a568-830c4636af6b"
    - stage: seal
      stageUuid: "cbd3726a-b32c-851f-9de4-8b730f12369a"
    - stage: uuid
      stageUuid: "3e470aeb-f0b2-8c7b-b666-3794545ffd32"
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
    computationUuid: "b3bda51b-f2a4-8d77-ae0c-2a87d886c5e6"
    contentUuid: "c832e65c-a333-5a2f-93b8-6edbeabf7b4b"
version: 2
---
# quantum/device — the measurement instrument

The quantum twin of [[device]]: a device is where the **continuous [[analog]] world collapses into discrete digital snapshots** — the [[measurement]] boundary ([[reality]]). A sensor reading is a collapse; an actuator is the reverse, a digital state pushed back into the world.

Each reading is a content-addressed [[snapshot]] in the [[quantum/snapshot]] chain — append-only, deduped, [[finality]] one way (a measured moment is final). The [[sensory]] field (camera, mic, accelerometer, the [[biometric]] sensors) is the inlet; [[coherence]] (rPPG/HRV) is one worked example.

Edge law: **capture on the device, compute pure on the Worker** — `getUserMedia` → numbers → analysis + bindings, no raw stream leaving the edge. The device has the camera; the Worker has none. Measure what is real — the [[analog]] field is continuous; the [[biofield]] is not detectable.

**Law — [[law]]: a device may only collapse what is physically real — the continuous [[analog]] field is measurable (rPPG/HRV), the [[biofield]] is not, so a device must never report a reading it cannot sense. Capture stays on the edge and only numbers cross the boundary (the raw stream never leaves the device); each reading is an append-only content-addressed [[snapshot]], final the moment it is taken.**

@see [[device]] · [[measurement]] · [[reality]] · [[analog]] · [[sensory]] · [[snapshot]] · [[biometric]] · [[coherence]] · [[finality]]

<sub>content-uuid `c832e65c-a333-5a2f-93b8-6edbeabf7b4b` · account `quantum/device` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>

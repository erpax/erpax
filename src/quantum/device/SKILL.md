---
name: device
description: "Use when reasoning about a device as a measurement instrument — the boundary where the continuous analog world collapses into discrete digital snapshots; capture on the edge, compute pure, every reading a content-addressed measurement in the snapshot chain."
atomPath: "quantum/device"
coordinate: "quantum/device · 5/round · 87672004"
contentUuid: "30e699fe-1984-5caa-bd96-4f3703d8d760"
diamondUuid: "53b020eb-656e-8ede-84f9-5ae0706c3b7a"
uuid: "87672004-d65a-8347-81cc-bd6365cc9069"
horo: 5
typography:
  partition: quantum
  bondDegree: 38
standards: []
bindings: []
signatures:
  computationUuid: "e791b2f5-5487-8d5d-88f8-6d08bf35bb26"
  stages:
    - stage: path
      stageUuid: "225454fc-327d-859d-bf56-45cec052be2b"
    - stage: trinity
      stageUuid: "35163ab6-e6e8-8a91-909b-ecdea549a591"
    - stage: boundary
      stageUuid: "51f197ec-9c25-86c4-99da-472d54556b5d"
    - stage: links
      stageUuid: "758fd95e-6a22-8489-b607-3b6845631288"
    - stage: horo
      stageUuid: "59538821-a54b-8678-8856-9464757e262d"
    - stage: seal
      stageUuid: "cbd3726a-b32c-851f-9de4-8b730f12369a"
    - stage: uuid
      stageUuid: "32f2c15e-2eee-8788-b2a7-b4b948fc72c5"
quantum:
  superposition:
    - device
    - emr
    - law
    - medical
    - merge
    - monitor
    - quantum
    - readings
    - stack
    - superposition
  collapse:
    - "Use when reasoning about a device as a measurement instrument — the boundary where the continuous analog world collapses into discrete digital snapshots; capture on the edge, compute pure, every reading a content-addressed measurement in the snapshot chain."
    - "[[coherence]]"
    - "[[device]]"
    - "[[measurement]]"
    - "[[reality]]"
    - "a device may only collapse what is physically real — the continuous analog field is measurable (rPPG/HRV), the biofield is not, so a device must never report a reading it cannot sense. Capture stays on the edge and only numbers cross the boundary (the raw stream never leaves the device); each reading is an append-only content-addressed snapshot, final the moment it is taken."
    - analog
    - biometric
    - finality
    - sensory
    - snapshot
  seal:
    sandbox: false
    receipt: false
    pathFollow: true
    canonicalRecord: true
    analogResults: true
    speechResults: false
    computationUuid: "e791b2f5-5487-8d5d-88f8-6d08bf35bb26"
    contentUuid: "30e699fe-1984-5caa-bd96-4f3703d8d760"
version: 2
---
# quantum/device — the measurement instrument

The quantum twin of [[device]]: a device is where the **continuous analog world collapses into discrete digital snapshots** — the [[measurement]] boundary ([[reality]]). A sensor reading is a collapse; an actuator is the reverse, a digital state pushed back into the world.

Each reading is a content-addressed snapshot in the [[quantum/snapshot]] chain — append-only, deduped, finality one way (a measured moment is final). The sensory field (camera, mic, accelerometer, the biometric sensors) is the inlet; [[coherence]] (rPPG/HRV) is one worked example.

Edge law: **capture on the device, compute pure on the Worker** — `getUserMedia` → numbers → analysis + bindings, no raw stream leaving the edge. The device has the camera; the Worker has none. Measure what is real — the analog field is continuous; the biofield is not detectable.

**Law — [[law]]: a device may only collapse what is physically real — the continuous analog field is measurable (rPPG/HRV), the biofield is not, so a device must never report a reading it cannot sense. Capture stays on the edge and only numbers cross the boundary (the raw stream never leaves the device); each reading is an append-only content-addressed snapshot, final the moment it is taken.**

@see [[device]] · [[measurement]] · [[reality]] · analog · sensory · snapshot · biometric · [[coherence]] · finality

<sub>content-uuid `30e699fe-1984-5caa-bd96-4f3703d8d760` · account `quantum/device` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>

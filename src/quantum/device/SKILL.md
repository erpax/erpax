---
name: device
description: "Use when reasoning about a device as a measurement instrument — the boundary where the continuous analog world collapses into discrete digital snapshots; capture on the edge, compute pure, every reading a content-addressed measurement in the snapshot chain."
atomPath: "quantum/device"
coordinate: "quantum/device · 1/base · d1be12fd"
contentUuid: "91b64ff7-a4fe-5900-9751-bd4cdd383622"
diamondUuid: "8618adae-283b-82e0-a969-fadb5a957015"
uuid: "d1be12fd-000e-8e5a-94a4-de2d6984514d"
horo: 1
typography:
  partition: quantum
  bondDegree: 57
standards: []
bindings: []
signatures:
  computationUuid: "271dfb8e-e593-8441-b88c-f15202992ca8"
  stages:
    - stage: path
      stageUuid: "225454fc-327d-859d-bf56-45cec052be2b"
    - stage: trinity
      stageUuid: "35163ab6-e6e8-8a91-909b-ecdea549a591"
    - stage: boundary
      stageUuid: "51f197ec-9c25-86c4-99da-472d54556b5d"
    - stage: links
      stageUuid: "f4836196-a4ed-85e9-875d-6824f46fc80d"
    - stage: horo
      stageUuid: "8b6432f2-46c2-86a6-a9d0-9d67c181293f"
    - stage: seal
      stageUuid: "cbd3726a-b32c-851f-9de4-8b730f12369a"
    - stage: uuid
      stageUuid: "f4966140-5c82-8090-b290-3ec851b8e310"
quantum:
  superposition:
    - analog
    - available
    - device
    - emr
    - law
    - medical
    - merge
    - monitor
    - superposition
  collapse:
    - "Use when reasoning about a device as a measurement instrument — the boundary where the continuous analog world collapses into discrete digital snapshots; capture on the edge, compute pure, every reading a content-addressed measurement in the snapshot chain."
    - "[[analog]]"
    - "[[coherence]]"
    - "[[device]]"
    - "[[finality]]"
    - "[[measurement]]"
    - "[[reality]]"
    - "a device may only collapse what is physically real — the continuous [[analog]] field is measurable (rPPG/HRV), the [[biofield]] is not, so a device must never report a reading it cannot sense. Capture stays on the edge and only numbers cross the boundary (the raw stream never leaves the device); each reading is an append-only content-addressed snapshot, final the moment it is taken."
    - biometric
    - sensory
    - snapshot
  seal:
    sandbox: false
    receipt: false
    pathFollow: true
    canonicalRecord: true
    analogResults: true
    speechResults: false
    computationUuid: "271dfb8e-e593-8441-b88c-f15202992ca8"
    contentUuid: "91b64ff7-a4fe-5900-9751-bd4cdd383622"
version: 2
---
# quantum/device — the measurement instrument

The quantum twin of [[device]]: a device is where the **continuous [[analog]] world collapses into discrete digital snapshots** — the [[measurement]] boundary ([[reality]]). A sensor reading is a collapse; an actuator is the reverse, a digital state pushed back into the world.

Each reading is a content-addressed snapshot in the [[quantum/snapshot]] chain — append-only, deduped, [[finality]] one way (a measured moment is final). The sensory field (camera, mic, accelerometer, the biometric sensors) is the inlet; [[coherence]] (rPPG/HRV) is one worked example.

Edge law: **capture on the device, compute pure on the Worker** — `getUserMedia` → numbers → analysis + bindings, no raw stream leaving the edge. The device has the camera; the Worker has none. Measure what is real — the [[analog]] field is continuous; the [[biofield]] is not detectable.

**Law — [[law]]: a device may only collapse what is physically real — the continuous [[analog]] field is measurable (rPPG/HRV), the [[biofield]] is not, so a device must never report a reading it cannot sense. Capture stays on the edge and only numbers cross the boundary (the raw stream never leaves the device); each reading is an append-only content-addressed snapshot, final the moment it is taken.**

@see [[device]] · [[measurement]] · [[reality]] · [[analog]] · sensory · snapshot · biometric · [[coherence]] · [[finality]]

<sub>content-uuid `91b64ff7-a4fe-5900-9751-bd4cdd383622` · account `quantum/device` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>

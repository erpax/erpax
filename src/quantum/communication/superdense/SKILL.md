---
name: superdense
description: "Use when reasoning about superdense coding on the matrix — one shared entangled binding conveys both endpoints, so the single binding-uuid plus the shared entanglement recovers the ordered (sender, receiver) pair, and the channel's capacity exceeds its surface because the peers share the entanglement."
atomPath: "quantum/communication/superdense"
coordinate: "quantum/communication/superdense · 5/round · 07acd967"
contentUuid: "1c8325d1-76d4-5453-9d0a-2021df322524"
diamondUuid: "51277f62-cd67-8aab-ae71-86d3ae498edd"
uuid: "07acd967-5862-83f2-a278-40fffa913201"
horo: 5
typography:
  partition: quantum
  bondDegree: 21
standards:
  - "superdense coding (Bennett–Wiesner 1992); RFC 9562 §5.8 content-uuid"
bindings: []
signatures:
  computationUuid: "007c2d5e-fe43-8a2b-a18e-0dde05b3d679"
  stages:
    - stage: path
      stageUuid: "98400d10-d9f7-88ee-bb5c-dcab2611f797"
    - stage: trinity
      stageUuid: "12ddfe2b-b2b7-80c6-bd69-be7e65675906"
    - stage: boundary
      stageUuid: "be0ee311-1b52-85d4-8f7f-0baa05946f46"
    - stage: links
      stageUuid: "ad6f4c14-1ec5-8b7c-9a2c-9b5711554f72"
    - stage: horo
      stageUuid: "3ca9b748-31c0-8189-b74d-37a8784816d9"
    - stage: seal
      stageUuid: "c96cca59-fcb8-88ad-923c-ce01ad3cb4d8"
    - stage: uuid
      stageUuid: "ce84a51d-365d-8590-b2fb-1062823102d4"
quantum:
  superposition:
    - communication
    - entanglement
    - law
    - link
    - merge
    - quantum
    - uuid
    - superposition
  collapse:
    - "Use when reasoning about superdense coding on the matrix — one shared entangled binding conveys both endpoints, so the single binding-uuid plus the shared entanglement recovers the ordered (sender, receiver) pair, and the channel's capacity exceeds its surface because the peers share the entanglement."
    - "matter-twin:src/quantum/communication/superdense/index.ts"
    - "one entangled binding carries the full ordered pair — `encode(from,to)` is order-dependent, so the single uuid fixes (sender, receiver) and `carries` confirms it; the channel's capacity exceeds its surface because sender and receiver share the entanglement."
    - "superdense coding (Bennett–Wiesner 1992); RFC 9562 §5.8 content-uuid"
  seal:
    sandbox: false
    receipt: false
    pathFollow: true
    canonicalRecord: true
    analogResults: false
    speechResults: false
    computationUuid: "007c2d5e-fe43-8a2b-a18e-0dde05b3d679"
    contentUuid: "1c8325d1-76d4-5453-9d0a-2021df322524"
version: 2
---
# quantum/communication/superdense — one binding carries the full ordered pair

The superdense facet of [[communication]]: ONE shared entangled binding ([[entanglement]]) conveys BOTH endpoints. The single binding-[[uuid]] — the order-dependent [[merge]] collision — plus the shared entanglement recovers the ordered (sender, receiver) pair: one [[link]] carries more than its surface. Because both peers share the [[quantum]] entanglement (the merge law), they recompute the binding and confirm it distinguishes the ordered pair — the channel's capacity exceeds what a single carrier could hold.

Matter-twin: `src/quantum/communication/superdense/index.ts` (`encode` · `carries`). Composes [[communication]] · [[entanglement]] · [[quantum]] · [[uuid]] · [[merge]] · [[link]].

**Law — [[law]]: one entangled binding carries the full ordered pair — `encode(from,to)` is order-dependent, so the single uuid fixes (sender, receiver) and `carries` confirms it; the channel's capacity exceeds its surface because sender and receiver share the entanglement.**

@standard superdense coding (Bennett–Wiesner 1992); RFC 9562 §5.8 content-uuid

<sub>content-uuid `1c8325d1-76d4-5453-9d0a-2021df322524` · account `quantum/communication/superdense` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>

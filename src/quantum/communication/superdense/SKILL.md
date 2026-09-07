---
name: superdense
description: "Use when reasoning about superdense coding on the matrix — one shared entangled binding conveys both endpoints, so the single binding-uuid plus the shared entanglement recovers the ordered (sender, receiver) pair, and the channel's capacity exceeds its surface because the peers share the entanglement."
atomPath: "quantum/communication/superdense"
coordinate: "quantum/communication/superdense · 2/share · 9c636a5b"
contentUuid: "ee204fac-82ac-5959-a179-b2bef1892857"
diamondUuid: "f7cba20c-26a4-8cae-b9dc-f6b5e3cbcf68"
uuid: "9c636a5b-d862-8ec7-a2bc-5a6962e69d18"
horo: 2
typography:
  partition: quantum
  bondDegree: 21
standards:
  - "superdense coding (Bennett–Wiesner 1992); RFC 9562 §5.8 content-uuid"
bindings: []
signatures:
  computationUuid: "3958bd05-2af7-84e1-9796-fded40e7df1a"
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
      stageUuid: "2ec5267a-b8f7-8c58-a156-ceaa7d01b8b9"
    - stage: seal
      stageUuid: "c96cca59-fcb8-88ad-923c-ce01ad3cb4d8"
    - stage: uuid
      stageUuid: "55f8318b-f746-8c9c-93de-3cdbed39df45"
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
    computationUuid: "3958bd05-2af7-84e1-9796-fded40e7df1a"
    contentUuid: "ee204fac-82ac-5959-a179-b2bef1892857"
version: 2
---
# quantum/communication/superdense — one binding carries the full ordered pair

The superdense facet of [[communication]]: ONE shared entangled binding ([[entanglement]]) conveys BOTH endpoints. The single binding-[[uuid]] — the order-dependent [[merge]] collision — plus the shared entanglement recovers the ordered (sender, receiver) pair: one [[link]] carries more than its surface. Because both peers share the [[quantum]] entanglement (the merge law), they recompute the binding and confirm it distinguishes the ordered pair — the channel's capacity exceeds what a single carrier could hold.

Matter-twin: `src/quantum/communication/superdense/index.ts` (`encode` · `carries`). Composes [[communication]] · [[entanglement]] · [[quantum]] · [[uuid]] · [[merge]] · [[link]].

**Law — [[law]]: one entangled binding carries the full ordered pair — `encode(from,to)` is order-dependent, so the single uuid fixes (sender, receiver) and `carries` confirms it; the channel's capacity exceeds its surface because sender and receiver share the entanglement.**

@standard superdense coding (Bennett–Wiesner 1992); RFC 9562 §5.8 content-uuid

<sub>content-uuid `ee204fac-82ac-5959-a179-b2bef1892857` · account `quantum/communication/superdense` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>

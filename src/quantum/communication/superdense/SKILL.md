---
name: superdense
description: "Use when reasoning about superdense coding on the matrix — one shared entangled binding conveys both endpoints, so the single binding-uuid plus the shared entanglement recovers the ordered (sender, receiver) pair, and the channel's capacity exceeds its surface because the peers share the entanglement."
atomPath: "quantum/communication/superdense"
coordinate: "quantum/communication/superdense · 5/round · a41a6891"
contentUuid: "0c4f8d7c-f772-5d12-a6c3-fe5e89705c60"
diamondUuid: "f635c045-9562-8e4a-97a7-0d8afe99388f"
uuid: "a41a6891-e043-8a43-95d3-2fb2b53bb952"
horo: 5
typography:
  partition: quantum
  bondDegree: 21
standards:
  - "superdense coding (Bennett–Wiesner 1992); RFC 9562 §5.8 content-uuid"
bindings: []
signatures:
  computationUuid: "1b637e69-72a5-8c3e-b32e-288ff8e4e004"
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
      stageUuid: "5935d0bb-6084-8cf7-8011-cb095ba1b262"
    - stage: seal
      stageUuid: "c96cca59-fcb8-88ad-923c-ce01ad3cb4d8"
    - stage: uuid
      stageUuid: "350cc6d4-6f9f-8540-84df-34c30ed81f9a"
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
    computationUuid: "1b637e69-72a5-8c3e-b32e-288ff8e4e004"
    contentUuid: "0c4f8d7c-f772-5d12-a6c3-fe5e89705c60"
version: 2
---
# quantum/communication/superdense — one binding carries the full ordered pair

The superdense facet of [[communication]]: ONE shared entangled binding ([[entanglement]]) conveys BOTH endpoints. The single binding-[[uuid]] — the order-dependent [[merge]] collision — plus the shared entanglement recovers the ordered (sender, receiver) pair: one [[link]] carries more than its surface. Because both peers share the [[quantum]] entanglement (the merge law), they recompute the binding and confirm it distinguishes the ordered pair — the channel's capacity exceeds what a single carrier could hold.

Matter-twin: `src/quantum/communication/superdense/index.ts` (`encode` · `carries`). Composes [[communication]] · [[entanglement]] · [[quantum]] · [[uuid]] · [[merge]] · [[link]].

**Law — [[law]]: one entangled binding carries the full ordered pair — `encode(from,to)` is order-dependent, so the single uuid fixes (sender, receiver) and `carries` confirms it; the channel's capacity exceeds its surface because sender and receiver share the entanglement.**

@standard superdense coding (Bennett–Wiesner 1992); RFC 9562 §5.8 content-uuid

<sub>content-uuid `0c4f8d7c-f772-5d12-a6c3-fe5e89705c60` · account `quantum/communication/superdense` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>

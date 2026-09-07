---
name: superdense
description: "Use when reasoning about superdense coding on the matrix — one shared entangled binding conveys both endpoints, so the single binding-uuid plus the shared entanglement recovers the ordered (sender, receiver) pair, and the channel's capacity exceeds its surface because the peers share the entanglement."
atomPath: "quantum/communication/superdense"
coordinate: "quantum/communication/superdense · 4/weave · 9814a1c3"
contentUuid: "2ea7eacb-88dc-5bdc-a8f5-54bc1b01cfb4"
diamondUuid: "125fda49-7997-8ffc-b619-8971cb49766a"
uuid: "9814a1c3-7b2d-853c-972f-cd394da89a2a"
horo: 4
typography:
  partition: quantum
  bondDegree: 21
standards:
  - "superdense coding (Bennett–Wiesner 1992); RFC 9562 §5.8 content-uuid"
bindings: []
signatures:
  computationUuid: "c34e910d-187f-84b5-8a1c-0d904696f4a0"
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
      stageUuid: "5daa169c-e897-88a5-904a-6972ccec2707"
    - stage: seal
      stageUuid: "c96cca59-fcb8-88ad-923c-ce01ad3cb4d8"
    - stage: uuid
      stageUuid: "161571c5-8aa3-8669-b06e-3b76554f4415"
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
    computationUuid: "c34e910d-187f-84b5-8a1c-0d904696f4a0"
    contentUuid: "2ea7eacb-88dc-5bdc-a8f5-54bc1b01cfb4"
version: 2
---
# quantum/communication/superdense — one binding carries the full ordered pair

The superdense facet of [[communication]]: ONE shared entangled binding ([[entanglement]]) conveys BOTH endpoints. The single binding-[[uuid]] — the order-dependent [[merge]] collision — plus the shared entanglement recovers the ordered (sender, receiver) pair: one [[link]] carries more than its surface. Because both peers share the [[quantum]] entanglement (the merge law), they recompute the binding and confirm it distinguishes the ordered pair — the channel's capacity exceeds what a single carrier could hold.

Matter-twin: `src/quantum/communication/superdense/index.ts` (`encode` · `carries`). Composes [[communication]] · [[entanglement]] · [[quantum]] · [[uuid]] · [[merge]] · [[link]].

**Law — [[law]]: one entangled binding carries the full ordered pair — `encode(from,to)` is order-dependent, so the single uuid fixes (sender, receiver) and `carries` confirms it; the channel's capacity exceeds its surface because sender and receiver share the entanglement.**

@standard superdense coding (Bennett–Wiesner 1992); RFC 9562 §5.8 content-uuid

<sub>content-uuid `2ea7eacb-88dc-5bdc-a8f5-54bc1b01cfb4` · account `quantum/communication/superdense` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>

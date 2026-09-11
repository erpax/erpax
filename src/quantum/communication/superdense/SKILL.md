---
name: superdense
description: "Use when reasoning about superdense coding on the matrix — one shared entangled binding conveys both endpoints, so the single binding-uuid plus the shared entanglement recovers the ordered (sender, receiver) pair, and the channel's capacity exceeds its surface because the peers share the entanglement."
atomPath: "quantum/communication/superdense"
coordinate: "quantum/communication/superdense · 7/descent · eb6467f2"
contentUuid: "b61444b1-3f2e-5308-ad12-b0d13b9ca27f"
diamondUuid: "d12c0e8e-5b2e-8c15-8627-a511d0ef7347"
uuid: "eb6467f2-c204-8847-b9f6-ec4f764e8aa1"
horo: 7
typography:
  partition: quantum
  bondDegree: 21
standards:
  - "superdense coding (Bennett–Wiesner 1992); RFC 9562 §5.8 content-uuid"
bindings: []
signatures:
  computationUuid: "5adb7b00-5bea-8d2c-bcff-7fb49fe7b48b"
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
      stageUuid: "f4aeec95-034d-8516-a8d4-3e8a857e9e83"
    - stage: seal
      stageUuid: "c96cca59-fcb8-88ad-923c-ce01ad3cb4d8"
    - stage: uuid
      stageUuid: "156580d1-3055-8f12-b99e-afadee9aa194"
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
    computationUuid: "5adb7b00-5bea-8d2c-bcff-7fb49fe7b48b"
    contentUuid: "b61444b1-3f2e-5308-ad12-b0d13b9ca27f"
version: 2
---
# quantum/communication/superdense — one binding carries the full ordered pair

The superdense facet of [[communication]]: ONE shared entangled binding ([[entanglement]]) conveys BOTH endpoints. The single binding-[[uuid]] — the order-dependent [[merge]] collision — plus the shared entanglement recovers the ordered (sender, receiver) pair: one [[link]] carries more than its surface. Because both peers share the [[quantum]] entanglement (the merge law), they recompute the binding and confirm it distinguishes the ordered pair — the channel's capacity exceeds what a single carrier could hold.

Matter-twin: `src/quantum/communication/superdense/index.ts` (`encode` · `carries`). Composes [[communication]] · [[entanglement]] · [[quantum]] · [[uuid]] · [[merge]] · [[link]].

**Law — [[law]]: one entangled binding carries the full ordered pair — `encode(from,to)` is order-dependent, so the single uuid fixes (sender, receiver) and `carries` confirms it; the channel's capacity exceeds its surface because sender and receiver share the entanglement.**

@standard superdense coding (Bennett–Wiesner 1992); RFC 9562 §5.8 content-uuid

<sub>content-uuid `b61444b1-3f2e-5308-ad12-b0d13b9ca27f` · account `quantum/communication/superdense` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>

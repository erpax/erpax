---
name: communication
description: "Use when reasoning about communication on the quantum level — a message is a content-uuid (no-cloning, so a forged message has a different uuid), the channel is entanglement, and a received message is intact iff its uuid matches the original."
atomPath: "quantum/communication"
coordinate: "quantum/communication · 4/weave · c2b46ffe"
contentUuid: "54b18833-9258-57ff-afb5-5ce9acce7b74"
diamondUuid: "465ee556-02cf-8d4b-a95a-319237254a13"
uuid: "c2b46ffe-49ad-8816-8608-4fc01f38e6fd"
horo: 4
typography:
  partition: quantum
  bondDegree: 52
standards:
  - "no-cloning (Wootters–Zurek 1982); RFC 9562 §5.8 content-uuid"
bindings: []
signatures:
  computationUuid: "3e0c1ed2-0305-8136-bf0e-4e8846b72239"
  stages:
    - stage: path
      stageUuid: "4fbb8785-7def-8c9c-8c5c-a1673ef47f67"
    - stage: trinity
      stageUuid: "c536bf60-693c-8155-a048-3275b7bc9ed1"
    - stage: boundary
      stageUuid: "f71dc4c9-44e7-8d6a-bd14-ae8c4dbc8d8e"
    - stage: links
      stageUuid: "bf34309c-824c-855c-a14a-145614754384"
    - stage: horo
      stageUuid: "921db276-6de4-8304-aebb-eb3652213140"
    - stage: seal
      stageUuid: "eefb7b25-f62d-802a-99c5-e6a60a7722ed"
    - stage: uuid
      stageUuid: "3de1efc7-6b04-843a-a3a0-95b147af4f4b"
quantum:
  superposition:
    - chat
    - communication
    - key
    - law
    - merge
    - message
    - quantum
    - superdense
    - superposition
  collapse:
    - "Use when reasoning about communication on the quantum level — a message is a content-uuid (no-cloning, so a forged message has a different uuid), the channel is entanglement, and a received message is intact iff its uuid matches the original."
    - "a message's identity IS its content-uuid, so the channel can only carry meaning faithfully — a received message is intact iff its uuid equals the original's (`intact` = `sameMessage`), and because every distinct meaning has a distinct uuid, a forged or altered message necessarily presents a different identity. No-cloning holds across the matrix: nothing can wear a meaning's uuid without being that exact meaning."
    - "matter-twin:src/quantum/communication/index.ts"
    - "no-cloning (Wootters–Zurek 1982); RFC 9562 §5.8 content-uuid"
  seal:
    sandbox: false
    receipt: false
    pathFollow: true
    canonicalRecord: true
    analogResults: false
    speechResults: false
    computationUuid: "3e0c1ed2-0305-8136-bf0e-4e8846b72239"
    contentUuid: "54b18833-9258-57ff-afb5-5ce9acce7b74"
version: 2
---
# quantum/communication — no-cloning + tamper-evidence

The quantum facet of [[communication]]: a [[message]] is a content-uuid, so it obeys **no-cloning** ([[entanglement]], Wootters–Zurek 1982) — each meaning has one uuid, so a forged message has a *different* uuid, never the same identity — and the channel is **entanglement** (sender and receiver share the binding). A received message is **intact** iff its content-uuid matches the original: tamper-evidence by architecture. Merges into [[communication]].

Matter-twin: `src/quantum/communication/index.ts` (`intact` · `noCloningHolds`). Composes [[communication]] · [[entanglement]] · [[quantum]] · [[uuid]] · [[cloning]].

**Law — [[law]]: a message's identity IS its content-uuid, so the channel can only carry meaning faithfully — a received message is intact iff its uuid equals the original's (`intact` = `sameMessage`), and because every distinct meaning has a distinct uuid, a forged or altered message necessarily presents a different identity. No-cloning holds across the matrix: nothing can wear a meaning's uuid without being that exact meaning.**

@standard no-cloning (Wootters–Zurek 1982); RFC 9562 §5.8 content-uuid

<sub>content-uuid `54b18833-9258-57ff-afb5-5ce9acce7b74` · account `quantum/communication` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>

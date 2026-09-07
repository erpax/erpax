---
name: communication
description: "Use when reasoning about communication on the quantum level — a message is a content-uuid (no-cloning, so a forged message has a different uuid), the channel is entanglement, and a received message is intact iff its uuid matches the original."
atomPath: "quantum/communication"
coordinate: "quantum/communication · 2/share · 73efae6c"
contentUuid: "2c4f5ec3-d82d-5a64-88c5-562d7d851d31"
diamondUuid: "f0881ccb-b094-87f7-be45-a37257c74aa0"
uuid: "73efae6c-f285-88cb-82cc-924c50ebab81"
horo: 2
typography:
  partition: quantum
  bondDegree: 58
standards:
  - "no-cloning (Wootters–Zurek 1982); RFC 9562 §5.8 content-uuid"
bindings: []
signatures:
  computationUuid: "3ee9b6ed-2bad-8908-968c-ebad1d47fd01"
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
      stageUuid: "f991874a-fded-88c7-8710-a9c9d23851c3"
    - stage: seal
      stageUuid: "eefb7b25-f62d-802a-99c5-e6a60a7722ed"
    - stage: uuid
      stageUuid: "0c55ab26-886a-86b4-b1f6-3ff2cb0728eb"
quantum:
  superposition:
    - channel
    - chat
    - communication
    - key
    - law
    - merge
    - message
    - quantum
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
    computationUuid: "3ee9b6ed-2bad-8908-968c-ebad1d47fd01"
    contentUuid: "2c4f5ec3-d82d-5a64-88c5-562d7d851d31"
version: 2
---
# quantum/communication — no-cloning + tamper-evidence

The quantum facet of [[communication]]: a [[message]] is a content-uuid, so it obeys **no-cloning** ([[entanglement]], Wootters–Zurek 1982) — each meaning has one uuid, so a forged message has a *different* uuid, never the same identity — and the channel is **entanglement** (sender and receiver share the binding). A received message is **intact** iff its content-uuid matches the original: tamper-evidence by architecture. Merges into [[communication]].

Matter-twin: `src/quantum/communication/index.ts` (`intact` · `noCloningHolds`). Composes [[communication]] · [[entanglement]] · [[quantum]] · [[uuid]] · [[cloning]].

**Law — [[law]]: a message's identity IS its content-uuid, so the channel can only carry meaning faithfully — a received message is intact iff its uuid equals the original's (`intact` = `sameMessage`), and because every distinct meaning has a distinct uuid, a forged or altered message necessarily presents a different identity. No-cloning holds across the matrix: nothing can wear a meaning's uuid without being that exact meaning.**

@standard no-cloning (Wootters–Zurek 1982); RFC 9562 §5.8 content-uuid

<sub>content-uuid `2c4f5ec3-d82d-5a64-88c5-562d7d851d31` · account `quantum/communication` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>

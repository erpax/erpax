---
name: communication
description: "Use when reasoning about communication on the quantum level — a message is a content-uuid (no-cloning, so a forged message has a different uuid), the channel is entanglement, and a received message is intact iff its uuid matches the original."
atomPath: quantum/communication
coordinate: quantum/communication · 1/base · a949f245
contentUuid: "802adcba-8a9c-59cb-a8c0-a6eb447c1b83"
diamondUuid: "ae707f01-9970-8eec-9aa2-2f366710b116"
uuid: "a949f245-7d72-8d8d-b2f8-86571eb17735"
horo: 1
bonds:
  in:
    - channel
    - chat
    - communication
    - key
    - law
    - merge
    - message
    - quantum
    - send
    - superdense
    - teleportation
    - uuid
  out:
    - channel
    - chat
    - communication
    - key
    - law
    - merge
    - message
    - quantum
    - send
    - superdense
    - teleportation
    - uuid
typography:
  partition: quantum
  bondDegree: 60
  neighbors:
    - agent
standards:
  - "no-cloning (Wootters–Zurek 1982); RFC 9562 §5.8 content-uuid"
bindings: []
neighbors:
  wikilink:
    - cloning
    - communication
    - entanglement
    - law
    - message
    - quantum
    - uuid
  matrix:
    - channel
    - chat
    - communication
    - key
    - law
    - merge
    - message
    - quantum
    - send
    - superdense
    - teleportation
    - uuid
  backlinks:
    - channel
    - chat
    - communication
    - key
    - law
    - merge
    - message
    - quantum
    - send
    - superdense
    - teleportation
    - uuid
signatures:
  computationUuid: "606393da-c894-8ebb-91c3-f6bfd5e0fc1c"
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
      stageUuid: "00e86191-a8f2-88e2-85f3-1ab4cabd5ba3"
    - stage: seal
      stageUuid: "eefb7b25-f62d-802a-99c5-e6a60a7722ed"
    - stage: uuid
      stageUuid: "e6e6bd4e-78ad-85b3-a882-b906e2a8b6d2"
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
    computationUuid: "606393da-c894-8ebb-91c3-f6bfd5e0fc1c"
    contentUuid: "802adcba-8a9c-59cb-a8c0-a6eb447c1b83"
version: 2
---
# quantum/communication — no-cloning + tamper-evidence

The quantum facet of [[communication]]: a [[message]] is a content-uuid, so it obeys **no-cloning** ([[entanglement]], Wootters–Zurek 1982) — each meaning has one uuid, so a forged message has a *different* uuid, never the same identity — and the channel is **entanglement** (sender and receiver share the binding). A received message is **intact** iff its content-uuid matches the original: tamper-evidence by architecture. Merges into [[communication]].

Matter-twin: `src/quantum/communication/index.ts` (`intact` · `noCloningHolds`). Composes [[communication]] · [[entanglement]] · [[quantum]] · [[uuid]] · [[cloning]].

**Law — [[law]]: a message's identity IS its content-uuid, so the channel can only carry meaning faithfully — a received message is intact iff its uuid equals the original's (`intact` = `sameMessage`), and because every distinct meaning has a distinct uuid, a forged or altered message necessarily presents a different identity. No-cloning holds across the matrix: nothing can wear a meaning's uuid without being that exact meaning.**

@standard no-cloning (Wootters–Zurek 1982); RFC 9562 §5.8 content-uuid

<sub>content-uuid `802adcba-8a9c-59cb-a8c0-a6eb447c1b83` · account `quantum/communication` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>

---
name: teleportation
description: "Use when reasoning about quantum teleportation on the matrix — a meaning is reconstructed at the receiver from its content-uuid plus the shared entangled binding, the carrier never travels (only the classical content-address does), and the received message carries the same identity (uuid) it was addressed by."
atomPath: quantum/communication/teleportation
coordinate: quantum/communication/teleportation · 1/base · a7093029
contentUuid: "e9e73c5c-f3a0-5083-ac4f-3b47baa73cd6"
diamondUuid: "c737ab6d-5098-8bf4-8671-6c1b348f0c92"
uuid: "a7093029-0a1d-8bf5-8102-bdacbae163c8"
horo: 1
bonds:
  in:
    - communication
    - entanglement
    - law
    - merge
    - message
    - quantum
    - uuid
  out:
    - communication
    - entanglement
    - law
    - merge
    - message
    - quantum
    - uuid
typography:
  partition: quantum
  bondDegree: 21
  neighbors: []
standards:
  - "quantum teleportation (Bennett et al. 1993); RFC 9562 §5.8 content-uuid"
bindings: []
neighbors:
  wikilink:
    - communication
    - entanglement
    - law
    - merge
    - message
    - quantum
    - uuid
  matrix:
    - communication
    - entanglement
    - law
    - merge
    - message
    - quantum
    - uuid
  backlinks:
    - communication
    - entanglement
    - law
    - merge
    - message
    - quantum
    - uuid
signatures:
  computationUuid: "6b74b8d1-3713-8569-9212-fdc6ff46a1cb"
  stages:
    - stage: path
      stageUuid: "c0e88b14-de81-82a8-9e02-8d9ba57198e5"
    - stage: trinity
      stageUuid: "f8aa616b-684a-81a1-ad83-b9ea5a31c8b3"
    - stage: boundary
      stageUuid: "7cb8aa73-e301-8e43-b809-7b9357ad6141"
    - stage: links
      stageUuid: "1148f649-e63b-84f6-bd6c-946f99029fe1"
    - stage: horo
      stageUuid: "86bfe694-30c7-88c3-96fa-22b9973e0c2f"
    - stage: seal
      stageUuid: "57c731cd-a039-89d8-ae21-81e22e3a45b6"
    - stage: uuid
      stageUuid: "87b19fd5-7598-8d28-81ce-05a5ab9c8969"
quantum:
  superposition:
    - communication
    - entanglement
    - law
    - merge
    - message
    - quantum
    - uuid
    - superposition
  collapse:
    - "Use when reasoning about quantum teleportation on the matrix — a meaning is reconstructed at the receiver from its content-uuid plus the shared entangled binding, the carrier never travels (only the classical content-address does), and the received message carries the same identity (uuid) it was addressed by."
    - "matter-twin:src/quantum/communication/teleportation/index.ts"
    - "quantum teleportation (Bennett et al. 1993); RFC 9562 §5.8 content-uuid"
    - "teleportation is the content-uuid reconstructed over the entangled channel — no matter is sent, only the address, yet the meaning arrives whole because `reconstructed` holds iff the received uuid equals the original's; the carrier never travels, only the identity regenerates."
  seal:
    sandbox: false
    receipt: false
    pathFollow: true
    canonicalRecord: true
    analogResults: false
    speechResults: false
    computationUuid: "6b74b8d1-3713-8569-9212-fdc6ff46a1cb"
    contentUuid: "e9e73c5c-f3a0-5083-ac4f-3b47baa73cd6"
version: 2
---
# quantum/communication/teleportation — identity reconstructed over the entangled channel

The teleportation facet of [[communication]]: a [[message]]'s meaning is **reconstructed** at the receiver from its content-[[uuid]] plus the shared entangled binding ([[entanglement]]). No matter is sent — only the classical content-address travels — yet the meaning REGENERATES whole because both endpoints already hold the [[quantum]] channel. The original is destroyed-on-send (true teleportation), and the received message carries the SAME identity it was addressed by: teleportation = identity reconstructed, not matter moved.

Matter-twin: `src/quantum/communication/teleportation/index.ts` (`teleport` · `channel` · `reconstructed`). Composes [[communication]] · [[entanglement]] · [[quantum]] · [[uuid]] · [[merge]].

**Law — [[law]]: teleportation is the content-uuid reconstructed over the entangled channel — no matter is sent, only the address, yet the meaning arrives whole because `reconstructed` holds iff the received uuid equals the original's; the carrier never travels, only the identity regenerates.**

@standard quantum teleportation (Bennett et al. 1993); RFC 9562 §5.8 content-uuid

<sub>content-uuid `e9e73c5c-f3a0-5083-ac4f-3b47baa73cd6` · account `quantum/communication/teleportation` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>

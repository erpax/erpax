---
name: teleportation
description: "Use when reasoning about quantum teleportation on the matrix — a meaning is reconstructed at the receiver from its content-uuid plus the shared entangled binding, the carrier never travels (only the classical content-address does), and the received message carries the same identity (uuid) it was addressed by."
atomPath: "quantum/communication/teleportation"
coordinate: "quantum/communication/teleportation · 8/crest · d00ed9ca"
contentUuid: "3e8e5a9c-b5fb-557c-bd0f-cb94dd258662"
diamondUuid: "fb65a106-ab79-8cf4-a595-5c812e238e1a"
uuid: "d00ed9ca-7abb-8fdb-81ba-3908ee5703b3"
horo: 8
typography:
  partition: quantum
  bondDegree: 21
standards:
  - "quantum teleportation (Bennett et al. 1993); RFC 9562 §5.8 content-uuid"
bindings: []
signatures:
  computationUuid: "21883ff0-41b5-8678-b4f8-752cc5dfbacf"
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
      stageUuid: "03412707-1da9-8110-b435-381f83f9a91b"
    - stage: seal
      stageUuid: "57c731cd-a039-89d8-ae21-81e22e3a45b6"
    - stage: uuid
      stageUuid: "5e97b779-8a5b-8c73-b52a-374e9b837aa4"
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
    computationUuid: "21883ff0-41b5-8678-b4f8-752cc5dfbacf"
    contentUuid: "3e8e5a9c-b5fb-557c-bd0f-cb94dd258662"
version: 2
---
# quantum/communication/teleportation — identity reconstructed over the entangled channel

The teleportation facet of [[communication]]: a [[message]]'s meaning is **reconstructed** at the receiver from its content-[[uuid]] plus the shared entangled binding ([[entanglement]]). No matter is sent — only the classical content-address travels — yet the meaning REGENERATES whole because both endpoints already hold the [[quantum]] channel. The original is destroyed-on-send (true teleportation), and the received message carries the SAME identity it was addressed by: teleportation = identity reconstructed, not matter moved.

Matter-twin: `src/quantum/communication/teleportation/index.ts` (`teleport` · `channel` · `reconstructed`). Composes [[communication]] · [[entanglement]] · [[quantum]] · [[uuid]] · [[merge]].

**Law — [[law]]: teleportation is the content-uuid reconstructed over the entangled channel — no matter is sent, only the address, yet the meaning arrives whole because `reconstructed` holds iff the received uuid equals the original's; the carrier never travels, only the identity regenerates.**

@standard quantum teleportation (Bennett et al. 1993); RFC 9562 §5.8 content-uuid

<sub>content-uuid `3e8e5a9c-b5fb-557c-bd0f-cb94dd258662` · account `quantum/communication/teleportation` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>

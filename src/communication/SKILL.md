---
name: communication
description: "Use when conveying a message from a sender to a receiver — the message is its content-uuid (self-decoding, no payload), so transfer is uuid-transfer; same content is the same message and a tampered message has a different uuid."
atomPath: communication
coordinate: "communication · 7/descent · 5d40fef1"
contentUuid: "0af56723-db22-5b2d-ade7-c663353ab0ff"
diamondUuid: "8c42189e-0dd0-8215-bac9-0f2c5e4ec4ab"
uuid: "5d40fef1-6a83-87a0-b87c-f3b80ea3f923"
horo: 7
typography:
  partition: communication
  bondDegree: 55
standards:
  - "the message-uuid (self-decoding); RFC 9562 §5.8 content-uuid"
bindings: []
signatures:
  computationUuid: "b509897c-a7bc-824f-b2da-728c17bfa05b"
  stages:
    - stage: path
      stageUuid: "a2134ab2-6571-8247-890f-371071a50d3d"
    - stage: trinity
      stageUuid: "f663b819-1ff3-8897-8c90-01ed0aeb139d"
    - stage: boundary
      stageUuid: "b827d9ff-0eda-8fc1-90ee-03b3f1968289"
    - stage: links
      stageUuid: "5f0fba6a-7a0c-8e05-ac4c-ad6100268220"
    - stage: horo
      stageUuid: "d4a60f93-5324-8e86-afce-af861d8e59dc"
    - stage: seal
      stageUuid: "f67d187d-7c31-83bd-a35b-4062090b58d5"
    - stage: uuid
      stageUuid: "f3c2d89f-6e68-8532-be05-bc6613b744b6"
version: 2
---
# communication — transfer of a message-uuid

Conveying a [[message]] from a sender to a receiver over a channel. In erpax the message **is its content-[[uuid]]** (self-decoding, no payload), so a communication is the **transfer of a uuid**: same content ⇒ same message ([[merge]]), and a tampered message has a *different* uuid — tamper-evident by architecture. The [[quantum]] facet (`src/quantum/communication`) adds no-cloning (a message can't be forged into the same identity) and the [[chat]] thread is its merkle history.

Matter-twin: `src/communication/index.ts` (`Communication` · `communicate` · `sameMessage`). Composes [[message]] · send · channel · [[uuid]] · [[merge]] · [[chat]].

**Law — [[law]]: the [[message]] IS its content-[[uuid]] (self-decoding, no payload), so a communication is the transfer of a uuid — same content ⇒ same message ([[merge]]), and a tampered message has a different uuid (tamper-evident by architecture).**

@standard the message-uuid (self-decoding); RFC 9562 §5.8 content-uuid

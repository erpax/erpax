---
name: communication
description: "Use when conveying a message from a sender to a receiver — the message is its content-uuid (self-decoding, no payload), so transfer is uuid-transfer; same content is the same message and a tampered message has a different uuid."
atomPath: communication
coordinate: "communication · 5/round · a7f827fa"
contentUuid: "6140760f-48bd-549e-998e-1c068664cff8"
diamondUuid: "0a5d39c7-555c-8f1a-8562-e432895c2541"
uuid: "a7f827fa-91bd-883d-b62c-17a1ffdc399c"
horo: 5
typography:
  partition: communication
  bondDegree: 52
standards:
  - "the message-uuid (self-decoding); RFC 9562 §5.8 content-uuid"
bindings: []
signatures:
  computationUuid: "e574e1ab-8f81-82d6-8c41-1bd91dd8c00a"
  stages:
    - stage: path
      stageUuid: "a2134ab2-6571-8247-890f-371071a50d3d"
    - stage: trinity
      stageUuid: "f663b819-1ff3-8897-8c90-01ed0aeb139d"
    - stage: boundary
      stageUuid: "b827d9ff-0eda-8fc1-90ee-03b3f1968289"
    - stage: links
      stageUuid: "d2cbc09f-59c5-831d-9638-a2ac83cae9ff"
    - stage: horo
      stageUuid: "3a438369-ad42-886b-bd30-03ec9cd1a5a3"
    - stage: seal
      stageUuid: "f67d187d-7c31-83bd-a35b-4062090b58d5"
    - stage: uuid
      stageUuid: "d238fe26-b221-8c58-8994-e275c63d332a"
version: 2
---
# communication — transfer of a message-uuid

Conveying a [[message]] from a sender to a receiver over a channel. In erpax the message **is its content-[[uuid]]** (self-decoding, no payload), so a communication is the **transfer of a uuid**: same content ⇒ same message ([[merge]]), and a tampered message has a *different* uuid — tamper-evident by architecture. The [[quantum]] facet (`src/quantum/communication`) adds no-cloning (a message can't be forged into the same identity) and the [[chat]] thread is its merkle history.

Matter-twin: `src/communication/index.ts` (`Communication` · `communicate` · `sameMessage`). Composes [[message]] · send · channel · [[uuid]] · [[merge]] · [[chat]].

**Law — [[law]]: the [[message]] IS its content-[[uuid]] (self-decoding, no payload), so a communication is the transfer of a uuid — same content ⇒ same message ([[merge]]), and a tampered message has a different uuid (tamper-evident by architecture).**

@standard the message-uuid (self-decoding); RFC 9562 §5.8 content-uuid

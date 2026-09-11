---
name: communication
description: "Use when conveying a message from a sender to a receiver — the message is its content-uuid (self-decoding, no payload), so transfer is uuid-transfer; same content is the same message and a tampered message has a different uuid."
atomPath: communication
coordinate: "communication · 1/base · b2aa45a1"
contentUuid: "8d4bdccb-f6db-5dc2-8b13-494fe63baac9"
diamondUuid: "51a28438-f176-8b24-919a-702fc83654cb"
uuid: "b2aa45a1-a835-87f6-a5ff-b4d3f9ee6a92"
horo: 1
typography:
  partition: communication
  bondDegree: 58
standards:
  - "the message-uuid (self-decoding); RFC 9562 §5.8 content-uuid"
bindings: []
signatures:
  computationUuid: "fd62a6c8-8a09-8fb5-9eb5-dcc01111cd4e"
  stages:
    - stage: path
      stageUuid: "a2134ab2-6571-8247-890f-371071a50d3d"
    - stage: trinity
      stageUuid: "f663b819-1ff3-8897-8c90-01ed0aeb139d"
    - stage: boundary
      stageUuid: "b827d9ff-0eda-8fc1-90ee-03b3f1968289"
    - stage: links
      stageUuid: "d88a99f0-0128-8904-b730-b9c0df0df0e7"
    - stage: horo
      stageUuid: "f74d0194-f807-8168-8e57-b45ab1ddc6c5"
    - stage: seal
      stageUuid: "f67d187d-7c31-83bd-a35b-4062090b58d5"
    - stage: uuid
      stageUuid: "ba839288-572e-825c-8622-f7517c57840b"
version: 2
---
# communication — transfer of a message-uuid

Conveying a [[message]] from a sender to a receiver over a [[channel]]. In erpax the message **is its content-[[uuid]]** (self-decoding, no payload), so a communication is the **transfer of a uuid**: same content ⇒ same message ([[merge]]), and a tampered message has a *different* uuid — tamper-evident by architecture. The [[quantum]] facet (`src/quantum/communication`) adds no-cloning (a message can't be forged into the same identity) and the [[chat]] thread is its merkle history.

Matter-twin: `src/communication/index.ts` (`Communication` · `communicate` · `sameMessage`). Composes [[message]] · [[send]] · [[channel]] · [[uuid]] · [[merge]] · [[chat]].

**Law — [[law]]: the [[message]] IS its content-[[uuid]] (self-decoding, no payload), so a communication is the transfer of a uuid — same content ⇒ same message ([[merge]]), and a tampered message has a different uuid (tamper-evident by architecture).**

@standard the message-uuid (self-decoding); RFC 9562 §5.8 content-uuid

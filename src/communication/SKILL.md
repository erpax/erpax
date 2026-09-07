---
name: communication
description: "Use when conveying a message from a sender to a receiver — the message is its content-uuid (self-decoding, no payload), so transfer is uuid-transfer; same content is the same message and a tampered message has a different uuid."
atomPath: communication
coordinate: "communication · 5/round · 4faa40b7"
contentUuid: "859e7651-5bb3-54f3-89b8-9493ea1986c5"
diamondUuid: "7a4c09d6-5b64-8db8-be4f-2c4d20f1c01c"
uuid: "4faa40b7-3d2b-8016-967c-72b44bab591a"
horo: 5
typography:
  partition: communication
  bondDegree: 58
standards:
  - "the message-uuid (self-decoding); RFC 9562 §5.8 content-uuid"
bindings: []
signatures:
  computationUuid: "7c4fe00b-3691-8b6a-96bf-2b58f6eed170"
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
      stageUuid: "9854d0a1-132b-87b3-8508-b1560cd7cc46"
    - stage: seal
      stageUuid: "f67d187d-7c31-83bd-a35b-4062090b58d5"
    - stage: uuid
      stageUuid: "d065021b-12d8-8852-b7d2-20fbed03fb7f"
version: 2
---
# communication — transfer of a message-uuid

Conveying a [[message]] from a sender to a receiver over a [[channel]]. In erpax the message **is its content-[[uuid]]** (self-decoding, no payload), so a communication is the **transfer of a uuid**: same content ⇒ same message ([[merge]]), and a tampered message has a *different* uuid — tamper-evident by architecture. The [[quantum]] facet (`src/quantum/communication`) adds no-cloning (a message can't be forged into the same identity) and the [[chat]] thread is its merkle history.

Matter-twin: `src/communication/index.ts` (`Communication` · `communicate` · `sameMessage`). Composes [[message]] · [[send]] · [[channel]] · [[uuid]] · [[merge]] · [[chat]].

**Law — [[law]]: the [[message]] IS its content-[[uuid]] (self-decoding, no payload), so a communication is the transfer of a uuid — same content ⇒ same message ([[merge]]), and a tampered message has a different uuid (tamper-evident by architecture).**

@standard the message-uuid (self-decoding); RFC 9562 §5.8 content-uuid

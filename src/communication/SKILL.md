---
name: communication
description: "Use when conveying a message from a sender to a receiver — the message is its content-uuid (self-decoding, no payload), so transfer is uuid-transfer; same content is the same message and a tampered message has a different uuid."
atomPath: communication
coordinate: "communication · 1/base · f39732be"
contentUuid: "d323e4d0-7cfa-580b-9f48-db8dfb25543a"
diamondUuid: "0270612c-a862-8891-a6c5-7703da460c5c"
uuid: "f39732be-2e57-8046-91a4-d51a44008e4d"
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
  partition: communication
  bondDegree: 58
  neighbors:
    - agent
standards:
  - "the message-uuid (self-decoding); RFC 9562 §5.8 content-uuid"
bindings: []
neighbors:
  wikilink:
    - channel
    - chat
    - law
    - merge
    - message
    - quantum
    - send
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
  computationUuid: "4a10211e-77cc-8a14-9322-6f588836e554"
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
      stageUuid: "584e64e2-a880-8ad8-9073-f0ca2b556a1f"
    - stage: seal
      stageUuid: "f67d187d-7c31-83bd-a35b-4062090b58d5"
    - stage: uuid
      stageUuid: "1997356c-95f5-89ed-81c2-e59c37b22117"
version: 2
---
# communication — transfer of a message-uuid

Conveying a [[message]] from a sender to a receiver over a [[channel]]. In erpax the message **is its content-[[uuid]]** (self-decoding, no payload), so a communication is the **transfer of a uuid**: same content ⇒ same message ([[merge]]), and a tampered message has a *different* uuid — tamper-evident by architecture. The [[quantum]] facet (`src/quantum/communication`) adds no-cloning (a message can't be forged into the same identity) and the [[chat]] thread is its merkle history.

Matter-twin: `src/communication/index.ts` (`Communication` · `communicate` · `sameMessage`). Composes [[message]] · [[send]] · [[channel]] · [[uuid]] · [[merge]] · [[chat]].

**Law — [[law]]: the [[message]] IS its content-[[uuid]] (self-decoding, no payload), so a communication is the transfer of a uuid — same content ⇒ same message ([[merge]]), and a tampered message has a different uuid (tamper-evident by architecture).**

@standard the message-uuid (self-decoding); RFC 9562 §5.8 content-uuid

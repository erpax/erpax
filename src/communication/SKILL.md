---
name: communication
description: "Use when conveying a message from a sender to a receiver — the message is its content-uuid (self-decoding, no payload), so transfer is uuid-transfer; same content is the same message and a tampered message has a different uuid."
atomPath: communication
coordinate: communication · 1/base · bf773ac8
contentUuid: "4907811a-5f13-5d3b-9dca-793f206e919d"
diamondUuid: "0f23ce65-966c-8c4e-a85d-b710342e349c"
uuid: "bf773ac8-c02a-8ebd-aea5-fcff19e04a68"
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
  bondDegree: 60
  neighbors:
    - agent
standards:
  - "RFC-9562"
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
  computationUuid: "4bf09999-3639-8233-b1a8-0bbd52a205fa"
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
      stageUuid: "179e179b-df3b-8b1b-9aaf-69da45dbe5a8"
    - stage: seal
      stageUuid: "fa0851c2-d8ed-8176-8a24-20743bc22d58"
    - stage: uuid
      stageUuid: "64596dbc-33cc-8632-885b-f42a327d90e0"
version: 2
---
# communication — transfer of a message-uuid

Conveying a [[message]] from a sender to a receiver over a [[channel]]. In erpax the message **is its content-[[uuid]]** (self-decoding, no payload), so a communication is the **transfer of a uuid**: same content ⇒ same message ([[merge]]), and a tampered message has a *different* uuid — tamper-evident by architecture. The [[quantum]] facet (`src/quantum/communication`) adds no-cloning (a message can't be forged into the same identity) and the [[chat]] thread is its merkle history.

Matter-twin: `src/communication/index.ts` (`Communication` · `communicate` · `sameMessage`). Composes [[message]] · [[send]] · [[channel]] · [[uuid]] · [[merge]] · [[chat]].

**Law — [[law]]: the [[message]] IS its content-[[uuid]] (self-decoding, no payload), so a communication is the transfer of a uuid — same content ⇒ same message ([[merge]]), and a tampered message has a different uuid (tamper-evident by architecture).**

@standard the message-uuid (self-decoding); RFC 9562 §5.8 content-uuid

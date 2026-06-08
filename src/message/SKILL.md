---
name: message
description: "Use when reasoning about the uuid AS the message — decode identity · OID · colour · sound out of the 128 bits alone, no payload. Completes localize.decodeIdentity (colour) with the missing sound channel (the note the uuid sounds, A432). To send is to send the uuid; to receive is to decode it. Matter-twin message/index.ts."
atomPath: message
coordinate: message · 4/weave · e229e341
contentUuid: "83fc043e-993e-5fc6-908c-a06bfcd1f1a5"
diamondUuid: "a83e662e-95bd-8db2-9a23-3bb532d5545e"
uuid: "e229e341-ec85-8b4b-ab97-fdec852d04c9"
horo: 4
bonds:
  in:
    - attachment
    - chat
    - collect
    - communication
    - cost
    - email
    - harmony
    - holographic
    - identity
    - llm
    - localize
    - memo
    - merge
    - oid
    - one
    - signal
    - standard
    - teleportation
    - topography
    - translate
    - translation
    - uuid
  out:
    - attachment
    - chat
    - collect
    - communication
    - cost
    - email
    - harmony
    - holographic
    - identity
    - llm
    - localize
    - memo
    - merge
    - oid
    - one
    - signal
    - standard
    - teleportation
    - topography
    - translate
    - translation
    - uuid
typography:
  partition: message
  bondDegree: 82
  neighbors: []
standards:
  - RFC 9562 §5.8 (the structured uuid carries the message)
  - "the uuid is self-decoding — every channel is an independent verify level"
bindings: []
neighbors:
  wikilink:
    - chat
    - cost
    - harmony
    - holographic
    - identity
    - localize
    - merge
    - oid
    - one
    - signal
    - standard
    - uuid
  matrix:
    - attachment
    - chat
    - collect
    - communication
    - cost
    - email
    - harmony
    - holographic
    - identity
    - llm
    - localize
    - memo
    - merge
    - oid
    - one
    - signal
    - standard
    - teleportation
    - topography
    - translate
    - translation
    - uuid
  backlinks:
    - attachment
    - chat
    - collect
    - communication
    - cost
    - email
    - harmony
    - holographic
    - identity
    - llm
    - localize
    - memo
    - merge
    - oid
    - one
    - signal
    - standard
    - teleportation
    - topography
    - translate
    - translation
    - uuid
signatures:
  computationUuid: "d08d2a36-bb10-89e9-baca-f6709115b0ee"
  stages:
    - stage: path
      stageUuid: "c14742f0-dca2-8497-aa08-328b9fc736b3"
    - stage: trinity
      stageUuid: "f159a73b-0b57-82c1-9b9b-975a4aa4f61c"
    - stage: boundary
      stageUuid: "3424d48e-6631-8b8a-8768-a113c12fbaff"
    - stage: links
      stageUuid: "db66be01-8376-851a-98e3-07ab0eaf029e"
    - stage: horo
      stageUuid: "e1f2596b-7868-8906-8f62-da60865cffbb"
    - stage: seal
      stageUuid: "90b21f70-a405-85c8-845d-18fee16e948e"
    - stage: uuid
      stageUuid: "5f24f894-26f9-8b31-93c7-441c7698705c"
version: 2
---
# message — the uuid is the message itself

The [[uuid]] is not a handle to a message — it **is** the message: self-decoding, **no payload**. `decodeMessage(uuid)` takes only the 128 bits and returns the whole meaning:

- **identity · OID · colour** — from [[localize]] (`decodeIdentity`: digest, slot, capability, schema, the `2.25` [[oid]] dotted form, the cmyk channel).
- **sound** — the missing modal channel this node adds: the uuid deterministically sounds on one of the seven horo positions ([[signal]]/NOTES, just intonation over A432), so every uuid carries its own note — colour *and* sound, the full render ([[harmony]] judges a chord of them).

Because it self-decodes there is **no side-table and no payload**: same content ⇒ same uuid ⇒ same message ([[merge]]/[[one]], [[holographic]] — the whole recovered from the part). So comms collapse to the uuid alone — an agent is reached by its **query-uuid** ([[chat]]), any device, any connectivity. And the channels are not decoration: each is an independent decode the [[tamper/cost]] sum counts, so the message and its integrity are the same 128 bits.

Matter-twin: `message/index.ts` (`decodeMessage`/`horoStepOf`) + `index.test.ts` (the proof). Composes: [[uuid]] · [[identity]] · [[localize]] · [[oid]] · [[signal]] · [[harmony]] · [[chat]] · [[merge]] · [[one]] · [[holographic]] · [[tamper/cost]] · [[standard]].

## Standards

- RFC 9562 §5.8 (the structured uuid carries the message)
- the uuid is self-decoding — every channel is an independent verify level

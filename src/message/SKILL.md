---
name: message
description: "Use when reasoning about the uuid AS the message — decode identity · OID · colour · sound out of the 128 bits alone, no payload. Completes localize.decodeIdentity (colour) with the missing sound channel (the note the uuid sounds, A432). To send is to send the uuid; to receive is to decode it. Matter-twin message/index.ts."
atomPath: message
coordinate: "message · 2/share · d58f6914"
contentUuid: "68799108-55a4-51c1-9e76-0b864889d3a7"
diamondUuid: "aae0c605-a921-8126-8391-20868790f8b2"
uuid: "d58f6914-85ef-8669-999a-0db2bc9c452c"
horo: 2
typography:
  partition: message
  bondDegree: 85
standards:
  - RFC 9562 §5.8 (the structured uuid carries the message)
  - "RFC 9562 §5.8 (the structured uuid carries the message)`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "2a8bd6f1-f6dc-8ed5-8d6c-cfc0c7576b2e"
  stages:
    - stage: path
      stageUuid: "c14742f0-dca2-8497-aa08-328b9fc736b3"
    - stage: trinity
      stageUuid: "f159a73b-0b57-82c1-9b9b-975a4aa4f61c"
    - stage: boundary
      stageUuid: "4e6d9bcc-3b2e-8b47-8096-f6b36b659da1"
    - stage: links
      stageUuid: "db66be01-8376-851a-98e3-07ab0eaf029e"
    - stage: horo
      stageUuid: "67620c75-14c2-84df-9574-3ad091e2a899"
    - stage: seal
      stageUuid: "b12cc4a5-c4fc-8fb1-af5f-d761b6a563cc"
    - stage: uuid
      stageUuid: "b9ee66fd-c5d5-85e7-a74d-71f687a31e9f"
version: 2
---
# message — the uuid is the message itself

The [[uuid]] is not a handle to a message — it **is** the message: self-decoding, **no payload**. `decodeMessage(uuid)` takes only the 128 bits and returns the whole meaning:

- **identity · OID · colour** — from [[localize]] (`decodeIdentity`: digest, slot, capability, schema, the `2.25` [[oid]] dotted form, the cmyk channel).
- **sound** — the missing modal channel this node adds: the uuid deterministically sounds on one of the seven horo positions ([[signal]]/NOTES, just intonation over A432), so every uuid carries its own note — colour *and* sound, the full render ([[harmony]] judges a chord of them).

Because it self-decodes there is **no side-table and no payload**: same content ⇒ same uuid ⇒ same message ([[merge]]/[[one]], [[holographic]] — the whole recovered from the part). So comms collapse to the uuid alone — an agent is reached by its **query-uuid** ([[chat]]), any device, any connectivity. And the channels are not decoration: each is an independent decode the [[tamper/cost]] sum counts, so the message and its integrity are the same 128 bits.

Matter-twin: `message/index.ts` (`decodeMessage`/`horoStepOf`) + `index.test.ts` (the proof). Composes: [[uuid]] · [[identity]] · [[localize]] · [[oid]] · [[signal]] · [[harmony]] · [[chat]] · [[merge]] · [[one]] · [[holographic]] · [[tamper/cost]] · [[standard]].

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard RFC 9562 §5.8 (the structured uuid carries the message)`


- RFC 9562 §5.8 (the structured uuid carries the message)
- the uuid is self-decoding — every channel is an independent verify level

---
name: message
description: "Use when reasoning about the uuid AS the message — decode identity · OID · colour · sound out of the 128 bits alone, no payload. Completes localize.decodeIdentity (colour) with the missing sound channel (the note the uuid sounds, A432). To send is to send the uuid; to receive is to decode it. Matter-twin message/index.ts."
atomPath: message
coordinate: "message · 1/base · 4aa6ce21"
contentUuid: "e8265ee8-94d9-595c-93fe-bafdb34ade1f"
diamondUuid: "78c99b95-3a3d-83c8-8c09-62666efd80fb"
uuid: "4aa6ce21-b529-86c7-b0bc-8a573d549983"
horo: 1
typography:
  partition: message
  bondDegree: 85
standards:
  - RFC 9562 §5.8 (the structured uuid carries the message)
  - "RFC 9562 §5.8 (the structured uuid carries the message)`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "85affcaf-339a-80d9-a6f4-28979d4819f7"
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
      stageUuid: "8ed036b5-574f-8d20-be22-d0f199a2f3b1"
    - stage: seal
      stageUuid: "b12cc4a5-c4fc-8fb1-af5f-d761b6a563cc"
    - stage: uuid
      stageUuid: "d46aba35-fcec-88a4-b551-8e8fcdf3cef1"
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

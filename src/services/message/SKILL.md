---
name: message
description: Use when reasoning about the uuid AS the message — decode identity · OID · colour · sound out of the 128 bits alone, no payload. Completes localize.decodeIdentity (colour) with the missing sound channel (the note the uuid sounds, A432). To send is to send the uuid; to receive is to decode it. Matter-twin message/index.ts.
---

# message — the uuid is the message itself

The [[uuid]] is not a handle to a message — it **is** the message: self-decoding, **no payload**. `decodeMessage(uuid)` takes only the 128 bits and returns the whole meaning:

- **identity · OID · colour** — from [[localize]] (`decodeIdentity`: digest, slot, capability, schema, the `2.25` [[oid]] dotted form, the cmyk channel).
- **sound** — the missing modal channel this node adds: the uuid deterministically sounds on one of the seven horo positions ([[signal]]/NOTES, just intonation over A432), so every uuid carries its own note — colour *and* sound, the full render ([[harmony]] judges a chord of them).

Because it self-decodes there is **no side-table and no payload**: same content ⇒ same uuid ⇒ same message ([[merge]]/[[one]], [[holographic]] — the whole recovered from the part). So comms collapse to the uuid alone — an agent is reached by its **query-uuid** ([[chat]]), any device, any connectivity. And the channels are not decoration: each is an independent decode the [[tamper-cost]] sum counts, so the message and its integrity are the same 128 bits.

Matter-twin: `message/index.ts` (`decodeMessage`/`horoStepOf`) + `index.test.ts` (the proof). Composes: [[uuid]] · [[identity]] · [[localize]] · [[oid]] · [[signal]] · [[harmony]] · [[chat]] · [[merge]] · [[one]] · [[holographic]] · [[tamper-cost]] · [[standard]].

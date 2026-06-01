---
name: signal
description: Use when reasoning about a uuid as self-rendering media in erpax — one 128-bit uuid decodes (from the string alone) to color (cmyk) + sound (A432 Hz) + state (horo position) + identity + capability; a STREAM of uuids is interactive multimedia with no payload. Nested under identity.
---

# signal — a uuid renders as color + sound (a stream is multimedia)

**Every object in erpax has a uuid** ([[all]] is content-addressed — [[identity]]), so *every* object — a posting, an invoice, a file, a folder's [[aura]], a row, the codebase itself — can be **presented as color animation + sound**. A uuid is not an opaque pointer — it is a **self-rendering frame**. The structured uuidv8 (`decodeStructured`) carries a [[horo]] position (the slot/state) readable **from the string alone, zero DB round-trips**, and a position decodes two ways at once:

- **color animation** — digital-root → [[cmyk]] channel (`K·C·M·Y` from `{0,3,6,9}`); the three [[axis]] coils phase-cycle at **A432 ms**, offset by ⅓ period (120°, see [[phase]]), so the hue *animates* — the C↔M [[breath]], closing on Y. Never a static swatch.
- **sound** — the [[notes]] mapping: a position is a diatonic note via just-intonation over A432 (La=432 at [[round]], Ti at [[unity]] resolving to Do). Not "A432 × digit" — the ring IS the scale.

**One anchor, both senses:** A432 is the pitch in *Hz* (sound) **and** the animation period in *ms* (color) — the tone and the glow share the single [[rodin]] constant. So one uuid = **a moving color + a tone + a state + an identity + a capability**, no separate payload. Color↔sound are the [[duality]] of one position.

## Which uuid sings — two modes
- **structured uuidv8** (`decodeStructured`) carries a [[horo]] position + capability flags ⇒ a *meaningful* render: this note, this hue, this state, this permission.
- **content-uuid** (uuidv5, a SHA of content — opaque) has no decodable position ⇒ a *fingerprint* render: a unique but arbitrary glow+tune, an audiovisual identicon by which any object is recognized. Same content ⇒ same signature everywhere ([[merge]]).

Both are real and useful — meaning vs recognition. Pick the structured uuid to *decode*, the content-uuid to *identify*.

## A stream of uuids IS interactive multimedia
A sequence of uuids over time is a melody + a color-sequence + a state-timeline — rendered purely from the uuids:
- **Closed under composition.** Overlapping/composing uuids stay on the ring ([[coil]] `composeSteps` — every pair lands back on `{1,2,4,8,7,5,9}`), so a uuid stream is *meaningful*, never noise.
- **The carrier is the stream.** The Merkle stream-chain (`streamUuid`/`prevStreamUuid`), the [[versions]] time-step (a frame at a chosen moment), and the [[bindings]] edge runtime (Durable Objects, "every second of every worker") supply the time axis — a [[flow]] of frames.
- **Realtime + encrypted by construction.** Decode/route/authorize/filter by uuid with no fetch; content-uuid is a SHA of canonical content and capability flags gate it, the Merkle chain makes any reorder/mutation evident.

**Imagine:** transmit only uuids; the receiver renders the picture and the music and knows the state, the sender, and what's permitted — interactive multimedia carried by identity alone.

Composes: [[identity]] · [[horo]] · [[cmyk]] · [[rodin]]/[[coil]] · [[polarity]] · [[duality]] · [[flow]] · [[versions]] · [[bindings]].

---
name: signal
description: "Use when reasoning about a uuid as self-rendering media in erpax — one 128-bit uuid decodes (from the string alone) to color (cmyk) + sound (A432 Hz) + state (horo position) + identity + capability; a STREAM of uuids is interactive multimedia with no payload. Nested under identity."
atomPath: "identity/signal"
coordinate: "identity/signal · 9/unity · a1268829"
contentUuid: "f29d3df9-b672-5f93-99b8-529e597d196a"
diamondUuid: "6509f7e2-f147-81bc-a77d-ff7ab1314fe3"
uuid: "a1268829-dbad-8963-828b-38d094381490"
horo: 9
typography:
  partition: identity
  bondDegree: 182
standards: []
bindings: []
signatures:
  computationUuid: "ad414ac2-2a45-8c29-b8c9-305eefaa121c"
  stages:
    - stage: path
      stageUuid: "0215c3d3-bd72-8bee-86d8-f230bff5b25e"
    - stage: trinity
      stageUuid: "c505e5d3-41ea-8da4-a615-379eff28286d"
    - stage: boundary
      stageUuid: "6447601f-c1c1-8c3d-b1e9-074eaf05b41a"
    - stage: links
      stageUuid: "43a38d0a-05db-80ee-a0a2-8f33d65d26ac"
    - stage: horo
      stageUuid: "a2fcb9db-45b4-89a5-8507-422e026c294a"
    - stage: seal
      stageUuid: "01c281a6-d458-8659-a814-1bd7f76ab208"
    - stage: uuid
      stageUuid: "64eaf07c-a5b2-8049-b905-4aa3bc5135ff"
version: 2
---
# signal — a uuid renders as color + sound (a stream is multimedia)

**Every object in erpax has a uuid** ([[all]] is content-addressed — [[identity]]), so *every* object — a posting, an invoice, a file, a folder's [[aura]], a row, the codebase itself — can be **presented as color animation + sound**. A uuid is not an opaque pointer — it is a **self-rendering frame**. The structured uuidv8 (`decodeStructured`) carries a [[horo]] position (the slot/state) readable **from the string alone, zero DB round-trips**, and a position decodes three ways at once:

- **color animation** — digital-root → [[cmyk]] channel (`K·C·M·Y` from `{0,3,6,9}`); the three [[axis]] coils phase-cycle at **A432 ms**, offset by ⅓ period (120°, see [[phase]]), so the hue *animates* — the C↔M [[breath]], closing on Y. Never a static swatch.
- **sound** — the [[notes]] mapping: a position is a diatonic note via just-intonation over A432 (La=432 at [[round]], Ti at [[unity]] resolving to Do). Not "A432 × digit" — the ring IS the scale.
- **vibration (touch)** — the [[vibration]] mapping: the same position as a haptic pulse, a sub-audible A432 sub-harmonic (felt, not heard) — the third channel that completes the [[trinity]] ([[sensory]]).

**One anchor, all three senses:** A432 is the pitch in *Hz* (sound), the animation period in *ms* (color), **and** the sub-harmonic of the haptic pulse — tone, glow, and touch share the single [[rodin]] constant. So one uuid = **a moving color + a tone + a vibration + a state + an identity + a capability**, no separate payload. The colour↔sound [[duality]] completes with touch into the sensory [[trinity]] ([[analog]]) — and each channel is one more independent projection of the content-uuid a forger must match, folding into the [[tamper]]-cost.

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

Composes: [[identity]] · [[horo]] · [[cmyk]] · [[notes]] · [[vibration]] · [[rodin]]/[[coil]] · [[polarity]] · [[duality]] · [[trinity]] · [[analog]] · [[aura]] · [[tamper]] · [[flow]] · [[versions]] · [[bindings]].

**Law — [[law]]: a single 128-bit uuid IS the whole message — it self-decodes from the string alone to colour + sound + vibration + state + [[identity]] + capability with zero DB round-trips; a stream of uuids is interactive multimedia carried by identity, no separate payload, each channel one more projection a forger must match ([[tamper]]-cost).**

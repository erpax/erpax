---
name: humandesign
description: Use when mapping Human Design onto erpax — its real combinatorics (64 gates = 2^6 I Ching hexagrams, 6 lines, 9 centers, 12 profiles) sent to the math, with the divination layer named as convention and never claimed.
---

# humandesign — Human Design, sent to the math

Human Design (Ra Uru Hu, 1987) synthesises the I Ching, astrology, the [[chakra]] system and Kabbalah into a "bodygraph" read from birth data. It is **not science** — the personality, destiny and "neutrino imprint" claims are unvalidated. But strip the divination and a real combinatorial skeleton remains, and it lands on erpax's own math.

## The real math (computed, checked)

- **64 gates = 2⁶.** Each gate is the I Ching hexagram of `n−1` — **six binary lines** (yin/yang = 0/1). Leibniz already read the I Ching as binary in 1703. `hexagram(n)` decodes it, and the gate-space is *exactly* the 6-bit space (checked: `2⁶ = 64`).
- **6 lines ⇒ 384 lines** (64×6). The six lines index onto the [[rodin]] doubling circuit `1·2·4·8·7·5` — the cycle ⟨2⟩ in (ℤ/9ℤ)*, whose **order is also 6**. The same six: an indexing **convention**, not a claim the I Ching *is* group theory.
- **64 = the [[torus]] bit-width.** The [[quantum]] double-torus is two 64-bit halves; a gate is a 6-bit address, so the gate-space has the cardinality of one torus slice. A coincidence of the number 64, marked as convention.
- **The bodygraph:** 9 centers, 36 channels, 12 profiles, 5 types — encoded as vocabulary, not as truth.

## Let human design the society

The five types become participation roles in the [[society]] — a **lens**, never a validated mechanism: the **Manifestor** initiates, the **Generator** responds and sustains, the **Projector** guides, the **Reflector** witnesses the whole. The society already runs on roles ([[merge]]: a role is a content-[[uuid]]); Human Design offers one vocabulary for *who moves first* — offered, not imposed. (`TYPE_ROLE`.)

## Honest

The 64 / 6 / 9 / 12 / 36 / 5 counts and the hexagram binary are **real and checked** in `test.ts`. The rodin- and torus-correspondences are **conventions** — the numbers 6 and 64 happen to coincide. The interpretive layer — type, authority, profile-as-destiny — is **named, never claimed**, exactly as [[chakra]] shows its computed colour beside the traditional rainbow without claiming they are the same.

**Law — [[law]]: encode the structure, dissolve the claim.** A system enters the corpus as its checkable skeleton (the math that holds) wired by content-[[uuid]]; its unfalsifiable story is kept as named vocabulary, bonded but never asserted. Knowledge is what survives the gate.

Matter-twin: `src/humandesign/index.ts` (`GATES` · `LINES` · `hexagram` · `totalLines` · `RODIN_CIRCUIT` · `CENTERS` · `PROFILES` · `CHANNELS` · `TYPES` · `TYPE_ROLE`). Composes [[rodin]] · [[quantum]] · [[chakra]] · [[society]] · [[torus]] · [[uuid]] · [[merge]] · [[law]].

@audit the combinatorics are computed; the metaphysics is named, never claimed
@standard the I Ching hexagram structure (public domain); Human Design (Ra Uru Hu, 1987) as named convention

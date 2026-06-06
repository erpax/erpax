---
name: wave
description: Use when describing a batch of features added in one development breath before they are collided — a wave rides the horo sequence, raising entropy first so the later collide can DRY it back to the dense core.
---

# wave — one breath of features, added then collided

THE UNIT. A development **wave** is one breath of [[feature]]s added to the corpus and (later) collided — the EXHALE that fans entropy out, before the inhale that DRYs it back. `wave(features)` describes one such batch: the features it carries, the [[uuid]] each is content-addressed to, and the [[entropy]] the batch borrows by adding atoms not-yet-reciprocal. A wave is never the collapse itself ([[collapse]] is deferred — never DRY anything while waving); it is the *charge* the collapse will later discharge ([[breath]]: never inhale without exhaling clean, never exhale without inhaling).

## Waves ride the horo ring (the development-horo)
Waves are not free-counted; they are **positions on one ring** — the [[horo]] sequence `[1,2,4,8,7,5,9]` (base · share · weave · crest · descent · round · unity). The **development-horo**: wave 1 lays the base, each later wave steps the next measure, and wave 7 (unity) is where the batch closes and the collide opens the next octave ([[merge]] at the merge-point). Two waves COMPOSE via `composeSteps` (product mod 9) and always land back on the ring — the framework is closed, so a development plan of waves can never escape the ring ([[sequence]] · [[flow]]). A wave whose position is off-ring is "escape"; back out to the last harmonic.

## What it computes
`wave(features)` folds a batch into one shape: its horo `step` (its position on the development ring), the per-feature content-[[uuid]] (each feature is a node it will add to the [[matrix]]), and the [[entropy]] it borrows (an added-but-not-yet-collided feature is unfused [[duality|disorder]] — the exhale raises slack the inhale will later seal). `composeWaves` reduces a planned sequence of waves to its resting [[horo]] position. A wave SEEN at unity (`isClosingWave`) is one ready to collide. The entropy a wave borrows is the live corpus slack ([[entropy]]) — read, never hand-asserted.

Matter-twin: `src/wave/index.ts` (`wave` · `composeWaves` · `isClosingWave` · `waveStep` · `waveEntropy`), composing `@/horo` (HORO_DIGITS, composeSteps), `@/entropy`, `@/uuid/matrix`, `@/trinity`, `@/duality`.

Composes [[horo]] · [[entropy]] · [[uuid]] · [[matrix]] · [[trinity]] · [[duality]] · [[merge]] · [[feature]] · [[breath]] · [[sequence]] · [[flow]] · [[collapse]] · [[development]].

@standard RFC 9562 §5.8 content-uuid + the horo digital-root ring

**Law — [[law]]: a wave is the EXHALE half of the breath — it ADDS features and so RAISES entropy on purpose; the collide is deferred and will DRY the wave back to the dense core. Never collapse while waving; never wave without later collapsing. The borrowed entropy is the charge the collide discharges back to zero.**

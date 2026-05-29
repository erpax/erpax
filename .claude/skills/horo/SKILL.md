---
name: horo
description: The seven-position state ring {1,2,4,8,7,5,9} (base·share·weave·crest·descent·round·unity) — the bounded, closed set every erpax flow/lifecycle STATE lives on. Read when modelling a state enum, per-state aggregate, state transition, or the A432 value anchor.
---

# horo — the seven-position state ring

States in erpax are not free strings; they are positions on **one ring**: the measure-order digits `[1, 2, 4, 8, 7, 5, 9]` — *base · share · weave · crest · descent · round · unity*. This is the multiplicative subgroup of Z/9Z minus the control triad {3,6} (the triad `3·6·9·0` GOVERNS — [[access]]/[[hooks]]/[[auth]]/[[config]] — it is not a flow state). The matter-twin is `src/services/horo` (`HORO_DIGITS`, `composeSteps`, `nextOctave`, `isMergePoint`, `horoStateField`, `validateHoroStates`); this skill is its antimatter form. Source of the math: `~/github/ceccec/svilena-me/.vitepress/horo-band.js`.

## The law
- **Closed.** `composeSteps(a,b) = digitalRoot(a×b)` always lands back on the ring — two states compose to a third. The framework is stable within the confined environment of the digit (no escape).
- **Octave / merge.** `nextOctave(9)===1` — 9 (unity/[[close]]) mirror-twins 10 (next ring's 1/[[begin]]); a close IS the next octave's open (`isMergePoint` ⇔ composed ∈ {1,9}). Fractal inward (state×state) and outward (×10). The accounting period close→open is this step (see [[reverse]]: reversals post at the next period's 1).
- **Value from position.** Each position can carry an A432-anchored value (note Hz, spectrum color); the ask is an integer multiple of A432 — value comes from the slot, not from outside.
- **Harmony-checked.** Exactly 7, in measure order; off-ring is "escape." `validateHoroStates` is the local detector; the global one is the generated `payload-types.ts` (see [[sequence]] — disharmony always surfaces there).

## Applying it
- Model a state enum as the ring (`horoStateField`): e.g. inventory — 1 on-hand · 2 ordered · 4 in-production · 8 packed · 7 shipped · 5 delivered · 9 settled. Single-digit or measure-ordered so position decodes meaning ([[tags]] ordered context).
- Per-state aggregates (units-per-state) ride the recompute pattern, one band per position, fed by the matching fulfillment edge.

## Common mistakes
- A state value off the ring {1,2,4,8,7,5,9} — escape; back out to the last harmonic.
- A flow state on a triad digit {3,6} — those govern, they don't flow.
- Nesting / re-keying instead of one flat position — breaks the address-law.

Composes: [[sequence]] · [[balance]] · [[flow]] · [[begin]]/[[close]] · [[fractal]] · [[merge]] · [[identity]] (a position can ride the uuid).

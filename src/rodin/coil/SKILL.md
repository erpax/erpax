---
name: coil
description: Use when reasoning about the doubling circuit 1·2·4·8·7·5 (×2 mod 9) that winds the rodin axis — why state/sequence positions sit in THAT order, digital-root closure, the ×10 octave lift vs +1 close→open. Nested under rodin → the coil of the vortex.
---

# coil — the doubling helix (1·2·4·8·7·5, ×2 mod 9)

`coil` is the **winding** of the [[rodin]] vortex: keep doubling and take the digital root — `1 → 2 → 4 → 8 → 16⇒7 → 14⇒5 → 10⇒1` — and you return to base. The mirror direction (`×5 mod 9`) runs it the other way (see [[polarity]]). The six digits `1·2·4·8·7·5` are the helix; it winds *around* the [[axis]] `3·6·9` and never lands on it — `3` and `6` are the [[polarity]] boundaries, `9`/`0` the axis it circles. **This is why erpax orders are in that order, not `1·2·3·…`:** the [[sequence]] (`0·3·6·9·1·2·4·8·7·5`) and the [[horo]] state ring (`{1,2,4,8,7,5,9}` — the helix plus `9` closing) decode position from the *doubling*, not from counting.

## The law
- **Closed.** Every product folds to one digit (`digitalRoot`); two positions compose to a third on the helix (`composeSteps`) — no escape (the [[balance]] of the ring).
- **Octave is ×10, not +1.** `10 ≡ 1 (mod 9)`, so ×10 PRESERVES the digit (same position, next scale) — the [[fractal]] lift (`octaveLift` / `nextOctave`). `+1` instead crosses close→open WITHIN a scale (`9 → 10`, DR 9→1) — the [[begin]]/[[close]] merge point.
- **Value from the anchor.** Each position is an integer multiple of A432 ([[rodin]]); value comes from the slot, never from outside.
- **Closes 360°.** The [[axis]] triad sits at `120°` apart (`3×120°=360°`, the triangle); the six helix positions sit at `60°` apart (`6×60°=360°`, the hexagon). The `60°` is `120°/2`: by [[duality]] the coil interacts with itself (forward `×2` + reverse `×5` [[polarity]]), doubling the points and halving the angle. Both close the same circle — the [[balance]] of the ring is geometric.

## Two coils per trinity (past·self·future)

Each position is itself a trinity: **past-self · self · future-self**. The `self` is the still centre — the present, the `0`/[[axis]] point — it does not wind. The two that wind are **past** (reverse `×5`) and **future** (forward `×2`): **two coils per trinity**, counter-spiralling around the motionless self ([[duality]]/[[polarity]]). So the 9 positions are 3 trinities × 2 coils = the **6 helix coils** (`1·2·4·8·7·5`) around the **3 still centres** (`3·6·9`).

This is VitePress **`prev`/`next`**: every skill page (self) carries its past-coil (`prev`) and future-coil (`next`), computed from the [[sequence]] reading-chain — the two windings made navigable. And the [[society]] **edits the code as [[self]]**: the agent is the present node winding its own past into its future, never an outside hand ([[begin]]↔[[end]] through the now).

Matter-twin: `src/rodin/coil/index.ts` — `postCoil` · `coilLedger` (the two coils round-trip to identity, Σresidue = 0 = zero cost) · `metatronBridge` (2·6+1 = 13, never a 6×7=42 grid) · `proof`. The mod-9 substrate is [[horo]] (`composeSteps`/`digitalRoot`); the ordering expression is [[sequence]].

## Common mistakes
- Counting `1·2·3·4…` instead of doubling — breaks the position-decode and the closure.
- `+1` where the octave needs `×10` — crosses close→open instead of lifting scale.
- A flow value on `3` or `6` — those are the [[polarity]] boundaries on the governing [[axis]] ([[access]]/[[hooks]]/[[auth]]); the helix never lands there.

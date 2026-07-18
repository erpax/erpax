---
name: coincidence
description: "Use when a research program claims its numbers match physical constants (Haramein's holographic work, the 3·6·9 / vortex literature) and asks whether that confirms it. The tool separates a THEOREM (an exact identity in a closed algebraic system) from a COINCIDENCE (a within-tolerance match, possibly fitted) — and refuses the leap from either to 'recompute all science', because a match is necessary but never sufficient."
---

# coincidence — the testing ground: theorem, or coincidence?

A research program built on matching numbers to physical constants is the **perfect testing ground**, because the corpus already knows the answer's shape: [[rodin]] holds it — *"the arithmetic is exact, the metaphysics is not adopted."* This atom makes that a measurement.

## Two things a claim can be — only one is a proof

- **A THEOREM** — an EXACT identity inside a closed algebraic system: `|AGL(1,ℤ/9)| = 54`, the doubling orbit IS the six units, `2·5 ≡ 1`. Nothing measured, nothing fitted; it holds by the algebra or it is false ([[algebra]] proves these).
- **A COINCIDENCE** — a claimed value that MATCHES a measured constant within a tolerance. A match, however striking, is **necessary but never sufficient**: a free parameter tunes to any target, and a number landing near a nice value says nothing about *why*. This is the frozen-rosetta / regex-resembling-a-language trap the corpus paid for sixteen times — *a thing that resembles a theorem is a heuristic wearing a theorem's clothes.*

`classify` returns `theorem` only for an exact closed-form identity with **zero free parameters**; a tunable value, even an exact hit, is a coincidence.

## Inverted coincidence is not coincidence anymore if it computes

A coincidence is **fragile** — it holds in one representation and breaks under transformation. An **invariant** holds under *every* inversion — that is what makes it a law ([[conformal]]: the angle survives rotate·scale·invert; a length does not). So test a relationship by inverting it and asking whether it still computes.

Under the **coincidence null**, surviving one independent inversion by luck has probability `p` (≈ the match tolerance). Surviving `k` inversions has probability `p^k` — the *possibility it is still just a coincidence* — and it decays geometrically:

```
Tesla-pair inversions (alternation · rotation · polyphase), p = 0.1:
  after  3 inversions:  p^k = 1e-3
  after  6 inversions:  p^k = 1e-6
  after  9 inversions:  p^k = 1e-9
```

`invarianceVerdict(survived, tried, p)`: break under any ⇒ **fragile** (a coincidence, representation-dependent); survive all with `p^survived ≤ threshold` ⇒ **invariant** (inverted and still computes — not a coincidence). The **Tesla** connection is his *real* principles turned into transformations — **AC alternation** (the current inverts each half-cycle), the **rotating field** (a rotation), **polyphase** (the conjugate pairs, ⟨2⟩/⟨5⟩, [[conversion]]). The 3·6·9 / quantum-invention mysticism is **not** adopted — the arithmetic of rotation and alternation is real, the metaphysics is not ([[rodin]]).

**Honest boundary.** `p^k → 0` **lowers** the probability of chance; it never reaches 0 (finite inversions) and it does not supply a **derivation** — surviving inversions makes a coincidence look invariant, but a physical law still needs a derivation from principles and an experiment. It distinguishes *fragile* from *invariant*; it does not turn either into truth. **HARMONY ≠ TRUTH.**

## The answer to "if confirmed, recompute all science"

It has a precise, disciplined answer, and the tool computes it: **`warrantsRecompute` returns NO for every verdict.**

- A **theorem** confirms the **algebra** — which was always true; ℤ/9 owes nothing to any physicist. It does not confirm a physics built on top of a numeric match.
- A **coincidence** is a match, not a proof.

Neither, alone, recomputes science. That takes a **derivation from accepted principles** + **independent experiment** + **greater explanatory power** — three things a numeric classifier supplies none of. By [[theorem]], the step *"it matches ⇒ the science is wrong"* rests on **authority, not a base theorem**, and is refused.

The wave, run:

```
THEOREM      AGL(1,ℤ/9) order           recompute? NO — confirms the algebra, not a physics
THEOREM      doubling orbit size        recompute? NO — same
COINCIDENCE  proton-radius (claimed)    recompute? NO — necessary but not sufficient; needs experiment
```

## It refuses the leap, not the inquiry

**Honest boundary.** This classifies the **epistemic status** of a claim (exact identity vs fitted match), never the **truth of the physics**. A coincidence CAN turn out to be a deep law — that is exactly why it is worth an experiment, and the tool **names** it rather than dismissing it. What it refuses is the shortcut from a number to a revolution. And the base is assumed ([[theorem]]: `s > 0`) — the tolerance and the closed-system flag are inputs a human sets in the open, arguable.

**Law — [[law]]: a claim is a theorem only as an exact identity in a closed algebraic system; a match to a measured constant is a coincidence — necessary, never sufficient. An algebraic theorem confirms the algebra, not a physics built on a number-match, and no numeric verdict warrants recomputing accepted science — that takes derivation, independent experiment, and explanatory power. The tool refuses the leap, not the inquiry.**

## Standards

- **Popper — falsifiability** — a coincidence with a free parameter forbids little; a theorem is exact.
- **Sagan standard** — an extraordinary claim (recompute all science) needs extraordinary evidence, not a match.

Composes: [[algebra]] · [[theorem]] · [[rules]]/refutable · [[rodin]] · [[law]].

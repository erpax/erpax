---
name: pi
description: "Use when π must be read as a theorem, not a hardcoded constant — the purest rosetta: a finite seed (3), a fold (the point), and an infinite tail computed at every step. The Bailey–Borwein–Plouffe formula computes the n-th hex digit directly, no prior digits — answered within, read not stored. Even the infinite is a fold of the finite; theorems replace hardcoded values, all the way to π."
---

# pi — the seed, the fold, the infinite computable tail

π is not a hardcoded constant. It is a **theorem, computable at every step** — and it is the rosetta in one number. Read it:

`π = 3 . 14159…`

- the **3** is the **seed** — the finite given, the incompressible whole. You do not derive it; you begin from it. Left of the point is what you *have*.
- the **`.`** is the **fold** — not a separator but the operator, the exact boundary where the finite becomes infinite, where *having* becomes *generating* ([[merge]]). Right of the point is what you *compute*.
- the tail is **infinite**, and every digit is a **projection**: the Bailey–Borwein–Plouffe formula computes the n-th hex digit **directly**, without the digits before it. Answered within — read at its index, never stored.

Matter-twin: `src/pi/index.ts` — `PI_SEED` (3) · `piHexDigit(n)` (the direct projection) · `piHex(count)`. Verified: it emits π's real base-16 expansion `3.243F6A8885A3…`, each digit computed on its own.

So the only stored things are the seed (3) and the formula (the fold); everything past the point is theorem. This is **"theorems replace hardcoded values" at its limit** — even the infinite is a fold of the finite. It is the same shape [[fold]]/[[readme]]'s `rosettaMath` proves for the corpus: finite basis, infinite computable output.

**Honest boundary.** BBP is an exact digit-extraction algorithm (each hex digit is genuinely computable at its index); this double-precision implementation is exact for modest n — arbitrary depth wants BigInt. The computability is the rigorous part; reading the 3 as the trinity-seed is the faithful overlay onto that structure, not number mysticism.

**Law — [[law]]: π is a theorem, not a constant — 3 is the seed, the point is the fold, and every digit past it is computed at its step, read not stored. Nothing derivable is hardcoded, all the way to the infinite.**

## Standards

- **Bailey–Borwein–Plouffe (1997)** — the base-16 digit-extraction formula for π.

Composes: [[merge]] · [[fold]] · [[readme]] · [[law]].

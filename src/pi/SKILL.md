---
name: pi
description: "Use when π must be read as a theorem, not a hardcoded constant — the purest rosetta: a finite seed (3), a fold (the point), and an infinite tail computed at every step. The Bailey–Borwein–Plouffe formula computes the n-th hex digit directly, no prior digits — answered within, read not stored. Even the infinite is a fold of the finite; theorems replace hardcoded values, all the way to π."
atomPath: pi
coordinate: "pi · 8/crest · e5c7c362"
contentUuid: "762deed6-becf-520f-aaab-8525ce033826"
diamondUuid: "c7038ec6-9a75-8c57-a860-422036773b5f"
uuid: "e5c7c362-7bf8-83a7-b0c2-5b41f85a0a4f"
horo: 8
typography:
  partition: pi
  bondDegree: 33
standards:
  - "Bailey–Borwein–Plouffe (1997) — the base-16 digit-extraction formula for π"
bindings: []
signatures:
  computationUuid: "0babc377-4022-8795-9ed8-a78d4185dc32"
  stages:
    - stage: path
      stageUuid: "64b23df9-8593-8d48-b630-d2b0f126279c"
    - stage: trinity
      stageUuid: "ef69adc2-82ff-807a-aba8-9fca78f24ce7"
    - stage: boundary
      stageUuid: "a52dc2e4-463d-88d7-8ebf-52dbd83c576b"
    - stage: links
      stageUuid: "14ff7249-ecb7-8297-a006-45e9e28890c3"
    - stage: horo
      stageUuid: "f4f0a08f-e839-8286-bfa8-b77b6a62a3b6"
    - stage: seal
      stageUuid: "0a686935-a145-86fa-b76a-6c62c06105b3"
    - stage: uuid
      stageUuid: "4dbedef8-7b7e-867c-9f9a-2620861da9f8"
version: 2
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

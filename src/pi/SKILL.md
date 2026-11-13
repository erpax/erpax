---
name: pi
description: "Use when π must be read as a theorem, not a hardcoded constant — the purest rosetta: a finite seed (3), a fold (the point), and an infinite tail computed at every step. The Bailey–Borwein–Plouffe formula computes the n-th hex digit directly, no prior digits — answered within, read not stored. Even the infinite is a fold of the finite; theorems replace hardcoded values, all the way to π."
atomPath: pi
coordinate: "pi · 2/share · 1a748579"
contentUuid: "73a8ac15-5b6b-52c8-9c66-15b4b03cfe12"
diamondUuid: "6e06ffbc-d2e3-8831-b3fa-d7d8b8086340"
uuid: "1a748579-834e-8fb6-8f5a-f745af336c36"
horo: 2
typography:
  partition: pi
  bondDegree: 26
standards:
  - "Bailey–Borwein–Plouffe (1997) — the base-16 digit-extraction formula for π"
bindings: []
signatures:
  computationUuid: "37fb1ee2-fe83-85f0-9f74-d6ce6bc965b9"
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
      stageUuid: "fd07758d-7eae-8967-a766-49cafdf8fa1e"
    - stage: seal
      stageUuid: "0a686935-a145-86fa-b76a-6c62c06105b3"
    - stage: uuid
      stageUuid: "dbfa08f6-707f-8a77-9bd9-e8e5b83fa9cb"
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

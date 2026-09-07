---
name: phase
description: "Use when reasoning about WHERE on the cycle something sits in erpax — the 120° offset of the three axis coils (0°/120°/240°), the ⅓-period animation tick at A432 ms, the moment a version captures. The time-position of a state. Nested under rodin."
atomPath: "rodin/phase"
coordinate: "rodin/phase · 4/weave · 9e0f9c90"
contentUuid: "52348e0d-5eb2-5845-a8e8-6603503b3932"
diamondUuid: "c83aff02-d730-8388-a3d8-6f71955f5fce"
uuid: "9e0f9c90-f1dd-8421-8635-56e912e6f1af"
horo: 4
typography:
  partition: rodin
  bondDegree: 48
standards:
  - "ISO 80000-2 — mathematical signs and symbols"
bindings: []
signatures:
  computationUuid: "0581816c-c251-89f9-90c3-e8b461d124c6"
  stages:
    - stage: path
      stageUuid: "896bbf00-4089-8161-91ce-b6648e3f8ca2"
    - stage: trinity
      stageUuid: "a1ee7077-a1a7-8931-bc1c-130946ff4337"
    - stage: boundary
      stageUuid: "d44eded4-4b33-8f66-bf50-9c03a4c4cfae"
    - stage: links
      stageUuid: "8f346ffd-c3dc-8885-8a91-2007e27e7433"
    - stage: horo
      stageUuid: "c6682566-7237-83fa-b28c-69c43d54796a"
    - stage: seal
      stageUuid: "da335eb5-a601-845f-8e52-1b94f852b47b"
    - stage: uuid
      stageUuid: "fdf15eb1-ee48-8abe-9bf5-08727dbd8c3f"
version: 2
---
# phase — position-in-the-cycle (the 120° offset, the A432-ms tick)

`phase` is **where on the cycle** a thing currently sits. The three [[axis]] coils run the same triad `120°` out of phase (`0° · 120° · 240°`) — together they cover every (cell, phase) pair once; that coexistence IS the interaction. Phase is the time-coordinate of the ring:

- **animation tick** — the [[cmyk]] coils advance one phase every **A432 ms**, offset by ⅓ period, so color *breathes* in time ([[breath]], [[signal]]); A432 is the period in ms exactly as it is the pitch in Hz ([[notes]]).
- **the moment** — a [[versions]] snapshot grasps a partner's state *at a chosen phase* (point-in-time); the audit chain is a phase-stamped [[flow]].
- under [[duality]] the coil's self-interaction halves `120°→60°` (the [[coil]] hexagon).

A [[horo]] position says *which* state; phase says *how far through the turn* it is. Source: `~/github/ceccec/svilena-me/.vitepress/rodin.js` (`COIL_A/B/C`, `TIMING.slow = a432 ms`).

## The 60° turn, as a theorem rather than a metaphor

This atom was **prose** — a SKILL with no index and no test, asserting the `120° → 60°` halving. A sentence is decoration ([[rules]]); here is the arithmetic.

ω = e^{iπ/3} is a primitive **6th** root of unity, so `ω² = ω − 1` and `ω⁶ = 1`. ℤ[ω] is the ring of **Eisenstein integers** — the hexagonal lattice A₂ — and the turn closes in it with no remainder:

```
(a + bω)(c + dω) = (ac − bd) + (ad + bc + bd)ω     integers in, integers out
(a + bω)·ω       = −b + (a + b)ω                    one 60° rotation
N(a + bω)        = a² + ab + b²                     a non-negative INTEGER, always
```

The six points of norm 1 are the unit group, and that count **is** the hexagonal kissing number — `units()` computes it rather than quoting it; the densest circle packing in the plane is hexagonal (Thue 1910, Fejes Tóth 1940).

## What the turn does not do — and the exact statement hiding inside each claim

| claim | what is actually true |
| --- | --- |
| *60° eliminates decimals* | **basis-dependent.** Exact in the ω-basis; the same turn sends (1,0) to (1/2, √3/2) in the Cartesian basis, and √3 is irrational. A claim of exactness that does not name its basis is not a theorem |
| *π becomes exactly 3* | π is transcendental (Lindemann 1882). The exact **3** is the inscribed **hexagon**'s perimeter-to-diameter ratio, `6r / 2r` — no limit, no decimal. Three is the hexagon's circle-constant, not the circle's |
| *mₚ/mₑ = 1836 exactly* | CODATA 2022 measures 1836.152673426(32). Rounding is not deriving |
| *entropy reaches zero* | a reversible change of basis is an isomorphism — it moves no information and destroys no entropy (Landauer 1961) |

`assertPhaseClaim` refuses each, naming the theorem that refutes it. The triggers are **declared** — `all` names the subject, `any` names the assertion — because extracting keywords from a sentence with a pattern is a guess about a language, and the first draft of that matcher proved it by refusing nothing.

**Honest boundary.** This proves the 60° turn is **exact arithmetic in ℤ[ω]** and that four attached claims are false. It proves nothing about physics, consciousness, or energy, and the seed's larger claims are not made smaller by being adjacent to a real theorem — they are simply not this one. `−0` is normalised at the boundary: `−0` is `Object.is`-distinct from `0`, so an unnormalised lattice point would key a Map twice.

**Law — [[law]]: the 60° turn closes over the Eisenstein integers and nowhere else. In the ω-basis it is exact; in the Cartesian basis it produces √3, and a claim of exactness that does not name its basis is not a theorem.**

Composes: [[rodin]] · [[axis]] · [[coil]] · [[cmyk]] · [[breath]] · [[signal]] · [[versions]] · [[flow]] · [[rules]]/refutable.

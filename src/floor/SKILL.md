---
name: floor
description: "Use when reasoning about floor — The corpus's security claims rested on the word **infeasible**, and infeasible is an opinion about hardware."
atomPath: floor
coordinate: "floor · 8/crest · ca455df8"
contentUuid: "39ae9faf-517a-5eef-b000-2f623291e844"
diamondUuid: "36965455-fd55-8c95-8b3a-c5e0fffb5835"
uuid: "ca455df8-e6ee-8eee-9563-07b7e1bef1d7"
horo: 8
typography:
  partition: floor
  bondDegree: 33
standards:
  - "Bekenstein (1981) · 't Hooft (1993) · Susskind (1995) — the holographic bound"
  - "CODATA 2022 — Boltzmann constant, Planck length"
  - "Landauer (1961) · Bérut et al., Nature 483:187 (2012)"
bindings: []
signatures:
  computationUuid: "692d127d-c7d7-84df-a8be-6b8f9d266261"
  stages:
    - stage: path
      stageUuid: "76aaa1bc-81d9-808f-ac29-a42d897b4563"
    - stage: trinity
      stageUuid: "91d25432-e7a1-8f8b-8d71-2486efdf16ca"
    - stage: boundary
      stageUuid: "b27ac005-99bd-89a5-9f14-b4a7bc1ec34b"
    - stage: links
      stageUuid: "a644e74f-b22f-8c4f-9ad6-494c249f413e"
    - stage: horo
      stageUuid: "29ac0049-9b8e-8438-a9ba-ae5a2dfada9c"
    - stage: seal
      stageUuid: "66cb0627-47fb-819a-bec6-6523abadf3fd"
    - stage: uuid
      stageUuid: "62e8579c-14e8-808e-a95d-06661e99f5f2"
version: 2
---
# floor — what the universe charges, at minimum, to search a space

The corpus's security claims rested on the word **infeasible**, and infeasible is an opinion about
hardware. Landauer's principle turns it into a number: erasing one bit costs at least `kT ln2`,
measured experimentally (Bérut et al., *Nature* 483:187, 2012). Exhausting an n-bit space therefore
has a floor no engineering goes under.

## The ladder, computed at 300 K

| space | floor | reach |
| --- | ---: | --- |
| **2⁶¹** — this corpus's own uuid collision | **6.6 mJ** | **trivial** |
| 2¹²⁸ — a symmetric key search | 9.8 × 10¹⁷ J | industrial |
| 2¹⁹² | 1.8 × 10³⁷ J | stellar |
| 2²⁵⁶ | 3.3 × 10⁵⁶ J | beyond physics |

**A 122-bit address collides at 2⁶¹, and 2⁶¹ costs six millijoules.** Whatever is protecting that
address, it is not thermodynamics. That is the honest form of the break [[verify]]/lean's `Cost.lean`
answers by chaining seams rather than trusting one address.

## The middle rung is the one people get wrong

2¹²⁸ lands at **industrial** reach — below a large nation's annual energy. A 128-bit key is safe
because real hardware sits some **nine orders of magnitude above** the Landauer floor, *not* because
physics forbids the search. Only 2²⁵⁶ is forbidden outright, at ~10¹² times the Sun's entire output.

I wrote the test expecting `civilisational` and the measurement said `industrial`. The measurement
won, and the comment recording that is still in the test.

## Where Planck actually enters — and it is not the search

The Planck length does not bound computation. It bounds **storage**: the holographic bound
(Bekenstein · 't Hooft · Susskind) limits information in a region to its boundary **area** over four
Planck areas — about 1.7 × 10⁷⁰ bits for a one-metre sphere, and scaling with **area**, not volume.

That is the only rigorous relation between a length scale and a bit count, and it says something
counter-intuitive here: the whole 2²⁵⁶ space needs a sphere **2.6 km across**, while 2¹²⁸ fits in
**1.4 × 10⁻¹⁶ m** — smaller than a proton. *Storage is not what separates them; energy is.* A second
test was written claiming 2²⁵⁶ "fits inside an atom" and was refuted by the same arithmetic.

**Honest boundary.** Landauer is a floor on **irreversible** computation, and reversible computing
evades it in principle (Bennett, 1973) — so a large floor is evidence and a **small floor proves
nothing is there**, which is exactly the finding for 2⁶¹. The one-erasure-per-candidate model
under-states a real search, which is the right direction for a floor: the claim is *not less than*,
never *about*. The holographic bound is theoretical physics, not engineering; nothing is built
within thirty orders of magnitude of it. And the energy scales in `reach` are **declared**,
order-of-magnitude, arguable in the open.

**Law — [[law]]: say what the universe charges, not whether you think it is hard. A floor of six
millijoules is a fact about the address; a floor beyond the Sun's output is a fact about the
universe — and the word "infeasible" hides which one you have.**

## Standards

- **Landauer (1961)**; **Bérut et al., Nature 483:187 (2012)** — `kT ln2` measured.
- **Bekenstein (1981) · 't Hooft (1993) · Susskind (1995)** — the holographic bound.
- **CODATA 2022** — Boltzmann constant, Planck length.

Composes: [[entropy]] · [[verify]] · [[rules]]/refutable · [[law]].

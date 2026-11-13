---
name: energy
description: "Use when reasoning about energy — Two things live here, and the second is the reason the atom exists."
atomPath: energy
coordinate: "energy · 7/descent · 04feb59c"
contentUuid: "ace15c92-9ca1-5630-8df9-58d5b0dcd47f"
diamondUuid: "7ec556d1-2026-8bc0-a8e6-bbd8c44fb95c"
uuid: "04feb59c-68f5-8504-b330-857fe9718ce6"
horo: 7
typography:
  partition: energy
  bondDegree: 12
standards:
  - "IEC 60050-482 — primary and secondary cells"
  - "ISO 80000-5 — thermodynamics quantities"
bindings: []
signatures:
  computationUuid: "57724e8c-c600-804e-8f35-36c4a582810e"
  stages:
    - stage: path
      stageUuid: "0ce98992-3572-8ba8-b572-63bc01ddd69d"
    - stage: trinity
      stageUuid: "b934842f-a1a1-8a7d-805c-fe96cb090c25"
    - stage: boundary
      stageUuid: "fa2bf25a-9e5b-8e9f-a725-19cb24830325"
    - stage: links
      stageUuid: "3b860b8c-0e6b-8a41-b062-e377d616f26e"
    - stage: horo
      stageUuid: "33f8f798-fb02-8d3e-9016-f4531d14fc79"
    - stage: seal
      stageUuid: "e1b14f1b-f0a5-88b3-a221-68915859f827"
    - stage: uuid
      stageUuid: "1613fe7b-4320-8df2-bd8a-95c8c241b7ca"
version: 2
---
# energy — allocating across sources, and why a closed loop cannot feed itself

Two things live here, and the second is the reason the atom exists.

## Allocation is the motor mixer in different units

A hexacopter has six actuators and four axes. A hybrid bus has N sources and one demand. Both are
the same fold: take a command, distribute it by declared coefficients, respect each actuator's
limit, and **conserve**. In the mixer conservation appears as a column summing to zero
([[rotation]]); here as `Σ drawn = delivered + losses`.

A source that cannot deliver is **not silently skipped** — it contributes what it can and the
`shortfall` is reported. An allocator that reports a demand met when it was not is the typed
closing total one atom over ([[float]]): a number asserted instead of counted.

## The loop law

A chain's gain is the **product** of its stage efficiencies. Every real stage is below 1, so a
closed loop — output fed back as its own input — has gain below 1 and decays. No arrangement
escapes this, because the bound is multiplicative and every factor is at most 1.

`loopGain` **refuses** a stage claiming more than 100% rather than computing with it, returning
`NaN`. Multiplying an over-unity claim through a chain produces a number that looks like an answer,
and a number that looks like an answer is how this fails.

## The water cycle, with the arithmetic shown

| stage | efficiency |
| --- | ---: |
| PEM electrolysis — water to hydrogen | 0.70 |
| compression and storage | 0.90 |
| PEM fuel cell — hydrogen back to water | 0.55 |
| **loop gain** | **0.347** |

And the ideal case matters more than the real one. Splitting water costs **ΔH = +285.8 kJ/mol**
(the higher heating value of hydrogen) and burning that hydrogen back returns **the same
285.8 kJ/mol**. With thermodynamically perfect hardware the loop gain is **exactly 1.0** — it
breaks even, and there is **nothing left over to do work with**. A pinned test adds a single load
stage at 99% efficiency to the ideal loop and asserts it stops: *any* useful output ends it.

That is the whole answer. Water is not a fuel; it is the **ash** of hydrogen. Hydrogen is a
**carrier** — a way to move energy that came from somewhere else — and a cycle that burns water,
powered by water, exhausting water is a closed loop being asked to be a source.

**Honest boundary.** Efficiencies here are **declared**, not derived, and real hardware varies with
load, temperature and age — these are representative figures, not a specification of any product.
`allocate` is a greedy priority walk, which is optimal for a single demand and is **not** an optimal
dispatch across multiple demands with ramp limits, degradation cost, or a price signal; that is a
scheduling problem this atom does not solve. And conservation here is bookkeeping: it proves the
allocation adds up, never that a source really holds what it declares.

**Law — [[law]]: gain is a product, and a product of factors at most one is at most one. A source
is a thing energy comes FROM; a loop is a thing energy goes AROUND — and the moment a design asks a
loop to be a source, the arithmetic has already refused it.**

## Standards

- **ISO 80000-5** — thermodynamic quantities.
- **IEC 60050-482** — primary and secondary cells.

Composes: [[float]] · [[rotation]] · [[rules]]/refutable · [[law]].

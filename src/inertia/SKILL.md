---
name: inertia
description: "Use when a manoeuvre is claimed that a body cannot perform — the corner bound applied to mass. horo/cornerLimit gives the kinematics; this adds the body: F = m·v²/r, which has candidates. Every route around the bound must change one factor — inertial mass, proper acceleration, the body, or the observation — and each is a named claim with a refuting test. Computes what each hypothesis COSTS: the factor by which it must exceed its own measured bound. Identifies no object and proposes no mechanism."
atomPath: inertia
coordinate: inertia
contentUuid: "35c5ec55-f492-5be4-be0a-c2c244242d7a"
diamondUuid: "c3a1c918-423c-8311-861b-ba4155342bfc"
typography:
  partition: inertia
  bondDegree: 8
standards:
  - "ISO 80000-4:2019 — quantities and units, mechanics: force, acceleration, mass"
  - "NIST SP 811 §B.8 — standard acceleration of free fall, 9.80665 m/s² exactly"
bindings: []
signatures:
  computationUuid: "1a644d52-b19d-8e89-b2d3-110b284b8332"
  stages:
    - stage: path
      stageUuid: "d516b62f-2411-8338-a893-913d7929043a"
    - stage: trinity
      stageUuid: "6a4ed10f-a555-81c2-9ebb-67c483f1ea95"
    - stage: boundary
      stageUuid: "5dc8a2ce-5f54-8b2d-9435-2ca274fd268a"
    - stage: links
      stageUuid: "9efd12c2-ec7a-80b6-bfcc-691a5607e63f"
    - stage: horo
      stageUuid: "8258b1a7-7855-82ab-826d-2df301b9544e"
    - stage: seal
      stageUuid: "8e7c2cdd-2a36-8c44-824c-5e83441cb196"
    - stage: uuid
      stageUuid: "1303b1c5-74da-8834-9742-2df2e01d4834"
version: 2
---
# inertia — name which factor you are changing, or you have not made a claim

[[horo]]'s `cornerLimit` is geometry: `v ≤ √(a·r)`, unbounded curvature at a true vertex. This atom adds the **body**, and a body has a mass, so the bound acquires candidates:

```
turn — 1000 kg at 300 m/s through r = 1 m
  lateral acceleration  9.00e+4 m/s²  =  9.18e+3 g
  lateral force         9.00e+7 N
  radius for 9 g        1.02e+3 m
```

**A "corner" at 300 m/s is a kilometre wide** for anything a crew survives. At one metre of radius it is 9,177 g and 90 meganewtons.

## Refusing to guess was half right, and the wrong half stopped the work

*Invent me a propulsion system* deserves a refusal — there is no computation under it. ***What would have to be true*** is a different question, and it is **computable**, because `F = m·v²/r` has exactly four factors a hypothesis can attack. Each attack is a named physical claim with a refuting test already performed.

| evasion | changes | refuted by | verdict |
| --- | --- | --- | --- |
| reduced inertial mass | `m` | MICROSCOPE (2022), Eötvös \|η\| ≲ 1e-15 | **needs 9.99e+14× its measured bound** |
| no proper acceleration | the felt force | energy conditions on the required stress-energy | **lensless** |
| not a rigid body | the body | simultaneous range measurement | **lensless** |
| not a corner | the observation | any independent range measurement | **lensless** |

**That factor — ~10¹⁵ — is the answer that was computable all along.** To bring 9,177 g down to 9 g, ~99.9% of inertial mass must stop responding to force; the tightest measurement of any such decoupling bounds it at one part in 10¹⁵.

Three of the four are **lensless**, and that word is doing real work: no experiment this corpus can reach decides them. Calling them refuted would be judgment without measurement — Rule 2. Calling them supported would be expectation without computation — Rule 1. They are undecided, and `cheapest()` ranks them first **only because they assume least**, which the test pins so the ranking cannot be misread as evidence.

## What it does not do

It identifies no object, cites no sighting, and proposes no mechanism. The report is asserted to contain none of those words. It computes what a hypothesis **costs**; which hypothesis is true is not decided by arithmetic.

## The same law, where it is already engineered

Nothing here is exotic — it is the constraint every airframe is designed around, read from the other end. A sustained-9-g limit *is* `r = v²/(9·g₀)`: at 300 m/s that is a 1,020 m radius, which is why a fighter's hardest turn is a wide arc and not a corner. Structural limits work identically with the airframe's own tolerance in place of the crew's. `radiusForTolerance` and `speedForTolerance` are the two readings of the single law, and the atom is as useful for a flight envelope as for a claim about one.

## Honest boundary

The bounds are **declared, with citations** — MICROSCOPE is apparatus this corpus does not own, and a future experiment can move that number, which would move the verdict with it. The four evasions are an enumeration over the factors of one Newtonian expression: **relativistic regimes are outside it**, and a mechanism nobody has named is not in the table. `EQUIVALENCE_BOUND` and the crew tolerance are declared in the open so they can be argued with rather than inferred.

**Law — [[law]]: a corner at speed is a force claim about a body — name which factor of `F = m·v²/r` you are changing and how far that is from its measured bound, or you have not made a claim at all.**

## Standards

- **ISO 80000-4:2019** — quantities and units, mechanics: force, acceleration, mass.
- **NIST SP 811 §B.8** — standard acceleration of free fall, 9.80665 m/s² exactly.

Composes: [[horo]] · [[duel]] · [[constitution]] · [[rules]] · [[law]].

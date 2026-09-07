---
name: planting
description: "Use when output is spread across the season by staggered sequential sowings — succession planting: number of plantings (sowings) and number of harvests (pickings) are the two scheduling levers that replace one glut with a continuous supply. The interval between sowings ≈ one planting's picking window; total seasonal row-length divides evenly across the plantings to size each sowing and its seed order."
atomPath: "vocabulary/planting"
coordinate: "vocabulary/planting · 2/share · a7279332"
contentUuid: "4509c64b-ed6c-59aa-a011-f44cce5e0869"
diamondUuid: "04b7ebd6-0f5d-894f-9c58-2dc1f4a39f24"
uuid: "a7279332-5a49-8f66-8207-bea0ea5a9b60"
horo: 2
typography:
  partition: vocabulary
  bondDegree: 89
standards: []
bindings: []
signatures:
  computationUuid: "ffd1f5aa-d060-8312-87e2-ff4e2db5c6da"
  stages:
    - stage: path
      stageUuid: "a120ede5-9667-811c-ba9c-85e71b53b495"
    - stage: trinity
      stageUuid: "6b47dd77-7b76-80ae-9c57-d00d912734ce"
    - stage: boundary
      stageUuid: "1bd779fd-a6a1-8421-9bc2-168c90dbd50f"
    - stage: links
      stageUuid: "e4fb5a9b-a1b9-8e7f-a1c8-d6deab4258d3"
    - stage: horo
      stageUuid: "1771d49d-7487-8ad8-a3c2-99ab9e85cfb5"
    - stage: seal
      stageUuid: "a6e8bb5f-bf87-8f26-9888-ff52c82def6c"
    - stage: uuid
      stageUuid: "e3c95c43-9685-85ba-b49d-406bf5c457ac"
version: 2
---
# planting — a sowing instance; successions that spread the harvest

A **planting** is one sowing/transplant instance of a [[crop]]. **Succession planting** — staggered sequential plantings — is the technique that turns a single glut into a **continuous [[harvest]]** across the [[season]]. The two levers, both columns of the planning sheet:

- **number of plantings (P)** — how many successions you sow;
- **number of harvests (H)** — how many times you pick across the season.

**The interval law:** sow again about every *picking window* — `interval ≈ (days-to-maturity + harvest-window) ÷ 2`, in practice ≈ the weeks one planting yields. Fast crops (lettuce, radish, salad) want many short-interval successions (7–14 days, 3–5+ per season); slow crops (tomato, winter squash) get 1–2. Total seasonal row-length divides evenly across the successions — `row-length per planting = total row-length ÷ P` — which sizes each individual sowing, its seed quantity, and its transplant flats.

Planting is the **input side** of [[agriculture]]'s [[sequence]]: it stages resources over time so [[harvest]] (the output side) can flow continuously — a [[breath]] of sow → pick repeated, the [[give]]/[[take]] cycle phased across the [[season]]. Each planting is either **direct-seeded** or **[[transplant|transplanted]]** (raised first in [[propagation]]), set at the [[spacing]] geometry and recorded in the [[cropplan]]. Buffer is built in here too: the standard **+10–20 % overplant** on seed and area absorbs germination loss and crop failure — the slack a demand-exact plan lacks.

## Standards
- Johnny's Selected Seeds — Succession-Planting Interval Charts; Seed Quantity Calculator
- Fortier, *The Market Gardener*; Coleman, *The New Organic Grower* (succession & bed turnover)
- CEFS — *Crop Scheduling for Continuous Harvest* (plantings × harvests scheduling)
- Brookfield Farm — seed order with +20 % surplus, +10 % yield fudge factor

## Common mistakes
- One big planting instead of successions — yields a glut then a gap; stagger to match the [[share]]/[[market]] demand week by week.
- Planting to exact demand with no buffer — add the +10–20 % overplant for germination loss and crop failure.
- Holding the interval fixed regardless of crop — interval tracks the picking window, which differs by crop and season.

Composes [[agriculture]] · [[crop]] · [[harvest]] · [[season]] · [[yield]] · [[transplant]] · [[propagation]] · [[spacing]] · [[cropplan]] · [[rotation]] · [[sequence]] · [[schedule]] · [[breath]] · [[give]] · [[take]].

**Law — [[law]]: succession turns one glut into a continuous [[harvest]] — sow again every picking window (interval ≈ (days-to-maturity + harvest-window)÷2) and divide total row-length across the plantings, plus a +10–20% overplant buffer for germination loss.**

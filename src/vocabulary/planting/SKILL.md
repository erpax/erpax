---
name: planting
description: "Use when output is spread across the season by staggered sequential sowings — succession planting: number of plantings (sowings) and number of harvests (pickings) are the two scheduling levers that replace one glut with a continuous supply. The interval between sowings ≈ one planting's picking window; total seasonal row-length divides evenly across the plantings to size each sowing and its seed order."
atomPath: "vocabulary/planting"
coordinate: "vocabulary/planting · 8/crest · c51c35b8"
contentUuid: "b171404a-5066-5928-bed0-6ecafcf1cdbb"
diamondUuid: "be339daf-2195-80b6-ba61-6c948b822f86"
uuid: "c51c35b8-89c0-8e26-bae4-3421278cc32b"
horo: 8
typography:
  partition: vocabulary
  bondDegree: 89
standards: []
bindings: []
signatures:
  computationUuid: "4ea2c8e1-6675-865e-8ff1-c9b2b48b4146"
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
      stageUuid: "0aa8eb2d-c967-8732-bd96-47ce5ae9219a"
    - stage: seal
      stageUuid: "a6e8bb5f-bf87-8f26-9888-ff52c82def6c"
    - stage: uuid
      stageUuid: "e7002c59-f10d-87e3-8455-36e3dcb84339"
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

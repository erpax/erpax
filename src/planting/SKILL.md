---
name: planting
description: "Use when output is spread across the season by staggered sequential sowings — succession planting: number of plantings (sowings) and number of harvests (pickings) are the two scheduling levers that replace one glut with a continuous supply. The interval between sowings ≈ one planting's picking window; total seasonal row-length divides evenly across the plantings to size each sowing and its seed order."
atomPath: planting
coordinate: planting · 2/share · d69dc6b0
contentUuid: "44586dd2-383a-5536-b23c-10328ad1d54d"
diamondUuid: "777b31ec-a41a-859f-a95d-e7d2bc75935f"
uuid: "d69dc6b0-2a95-8670-a17d-96a53f8e8f6c"
horo: 2
bonds:
  in:
    - agriculture
    - breath
    - crop
    - cropplan
    - degreeday
    - fertility
    - frost
    - give
    - hardiness
    - harvest
    - law
    - market
    - maturity
    - pollination
    - propagation
    - rotation
    - schedule
    - season
    - seed
    - sequence
    - share
    - spacing
    - take
    - tillage
    - transplant
    - yield
  out:
    - agriculture
    - breath
    - crop
    - cropplan
    - degreeday
    - fertility
    - frost
    - give
    - hardiness
    - harvest
    - law
    - market
    - maturity
    - pollination
    - propagation
    - rotation
    - schedule
    - season
    - seed
    - sequence
    - share
    - spacing
    - take
    - tillage
    - transplant
    - yield
typography:
  partition: planting
  bondDegree: 87
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - agriculture
    - breath
    - crop
    - cropplan
    - give
    - harvest
    - law
    - market
    - propagation
    - rotation
    - schedule
    - season
    - sequence
    - share
    - spacing
    - take
    - transplant
    - yield
  matrix:
    - agriculture
    - breath
    - crop
    - cropplan
    - degreeday
    - fertility
    - frost
    - give
    - hardiness
    - harvest
    - law
    - market
    - maturity
    - pollination
    - propagation
    - rotation
    - schedule
    - season
    - seed
    - sequence
    - share
    - spacing
    - take
    - tillage
    - transplant
    - yield
  backlinks:
    - agriculture
    - breath
    - crop
    - cropplan
    - degreeday
    - fertility
    - frost
    - give
    - hardiness
    - harvest
    - law
    - market
    - maturity
    - pollination
    - propagation
    - rotation
    - schedule
    - season
    - seed
    - sequence
    - share
    - spacing
    - take
    - tillage
    - transplant
    - yield
signatures:
  computationUuid: "060ce794-6b23-8771-a161-976803379081"
  stages:
    - stage: path
      stageUuid: "b2696ba8-4b60-85e8-b4d9-6731f023b378"
    - stage: trinity
      stageUuid: "ff991df2-0b81-839b-8d13-a84638eeeb72"
    - stage: boundary
      stageUuid: "7b7a7bd8-3759-8ebb-ae0d-ad0308f2c0ae"
    - stage: links
      stageUuid: "268013d5-ddeb-89ab-ad82-a703c4bc6d4b"
    - stage: horo
      stageUuid: "0216cfb9-7fef-89b8-99a5-d5505cb2ecfb"
    - stage: seal
      stageUuid: "e398420b-1a64-8749-be5e-f14120ff68e8"
    - stage: uuid
      stageUuid: "a65f0033-f18d-8d06-a888-9503dbff961d"
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

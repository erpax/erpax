---
name: crop
description: "Use when modelling a cultivated plant type as the agricultural SKU — the produce-catalogue row carrying its sale unit (1 bunch, 100 g, 1 head), unit price, and the agronomic constants (yield per area, plant spacing, N·K₂O need, plantings & harvests per season) that explode a demand quantity into land, seed, and fertility. The crop is the bill-of-materials line of a farm; its heterogeneous sale unit is why automatic unit conversion is non-negotiable."
atomPath: crop
coordinate: crop · 4/weave · d11685d7
contentUuid: "88d29fe0-9f04-5a07-a248-c6ceedd876ad"
diamondUuid: "5f19bb38-c5c8-8bca-ac9c-6be3281ef23e"
uuid: "d11685d7-264b-8a5e-aa87-06b891955c39"
horo: 4
bonds:
  in:
    - agriculture
    - amount
    - assets
    - balance
    - bottleneck
    - commerce
    - conversion
    - covercrop
    - cropplan
    - cultivation
    - currency
    - dimension
    - dormancy
    - enterprisebudget
    - family
    - fertility
    - frost
    - hardiness
    - harvest
    - irrigation
    - items
    - law
    - livestock
    - maturity
    - measure
    - organic
    - pasture
    - perennial
    - permaculture
    - planting
    - pollination
    - pruning
    - rate
    - rotation
    - scouting
    - season
    - seed
    - share
    - soil
    - spacing
    - taxonomy
    - terroir
    - transplant
    - trellis
    - variant
    - yield
  out:
    - agriculture
    - amount
    - assets
    - balance
    - bottleneck
    - commerce
    - conversion
    - covercrop
    - cropplan
    - cultivation
    - currency
    - dimension
    - dormancy
    - enterprisebudget
    - family
    - fertility
    - frost
    - hardiness
    - harvest
    - irrigation
    - items
    - law
    - livestock
    - maturity
    - measure
    - organic
    - pasture
    - perennial
    - permaculture
    - planting
    - pollination
    - pruning
    - rate
    - rotation
    - scouting
    - season
    - seed
    - share
    - soil
    - spacing
    - taxonomy
    - terroir
    - transplant
    - trellis
    - variant
    - yield
typography:
  partition: crop
  bondDegree: 148
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - agriculture
    - amount
    - assets
    - balance
    - bottleneck
    - commerce
    - conversion
    - currency
    - dimension
    - enterprisebudget
    - fertility
    - harvest
    - items
    - law
    - measure
    - planting
    - pollination
    - rate
    - season
    - share
    - yield
  matrix:
    - agriculture
    - amount
    - assets
    - balance
    - bottleneck
    - commerce
    - conversion
    - covercrop
    - cropplan
    - cultivation
    - currency
    - dimension
    - dormancy
    - enterprisebudget
    - family
    - fertility
    - frost
    - hardiness
    - harvest
    - irrigation
    - items
    - law
    - livestock
    - maturity
    - measure
    - organic
    - pasture
    - perennial
    - permaculture
    - planting
    - pollination
    - pruning
    - rate
    - rotation
    - scouting
    - season
    - seed
    - share
    - soil
    - spacing
    - taxonomy
    - terroir
    - transplant
    - trellis
    - variant
    - yield
  backlinks:
    - agriculture
    - amount
    - assets
    - balance
    - bottleneck
    - commerce
    - conversion
    - covercrop
    - cropplan
    - cultivation
    - currency
    - dimension
    - dormancy
    - enterprisebudget
    - family
    - fertility
    - frost
    - hardiness
    - harvest
    - irrigation
    - items
    - law
    - livestock
    - maturity
    - measure
    - organic
    - pasture
    - perennial
    - permaculture
    - planting
    - pollination
    - pruning
    - rate
    - rotation
    - scouting
    - season
    - seed
    - share
    - soil
    - spacing
    - taxonomy
    - terroir
    - transplant
    - trellis
    - variant
    - yield
signatures:
  computationUuid: "1a15e870-b589-8222-af28-61de3868badb"
  stages:
    - stage: path
      stageUuid: "7d883e69-0d5f-822d-ad5e-48823f970b30"
    - stage: trinity
      stageUuid: "cf44469f-03e1-8e46-ba46-6492b25203b9"
    - stage: boundary
      stageUuid: "8eb316f0-3592-869c-ab93-baeb20702e89"
    - stage: links
      stageUuid: "c3b66ff9-c13e-876e-b7dc-1e0eb0b8343f"
    - stage: horo
      stageUuid: "11de23a8-8078-8db1-9ebc-01cd72df875a"
    - stage: seal
      stageUuid: "281ce3cd-b96a-805e-a3c9-585b98150e3a"
    - stage: uuid
      stageUuid: "66a132b0-ed4b-84c6-a824-19cd8973e94d"
version: 2
---
# crop — the cultivated plant as the agricultural SKU

A **crop** is one cultivated plant type treated as a sellable line — the agricultural [[items|item]]/SKU. It is where the living [[biological/assets|biological asset]] meets [[commerce]]: each crop carries a **sale unit** (the [[measure]]: *1 bunch · 100 g · 1 head · 1 quart · 2 lbs*) and a **unit price** (the [[currency]] [[amount]]), plus the agronomic constants that make it plannable — **[[yield]] per area**, **plant spacing** (within-row, between-row, rows-per-bed), **seed rate** (per 100 ft / per area), **nitrogen & potassium need** ([[fertility]]), and the scheduling pair **number of [[planting]]s** (successions) × **number of [[harvest]]s** (pickings).

These constants are exactly the bill-of-materials line of [[agriculture]]'s backward plan: a demanded quantity of crop units explodes — via unit weight, yield, spacing, and fertility rate — into row-length, land, seed, and fertilizer. The crop's **heterogeneous sale unit** is the reason **automatic [[conversion]] is non-negotiable**: a [[share]] box mixes *grams of arugula, bunches of beets, heads of lettuce, pounds of potato*, and the only way to total or cost them is to carry each as a [[measure]] (value + UN/CEFACT unit) and a [[currency]] amount and let them **[[rate|convert]] and [[balance|sum within their dimension]]** — never as the text `"2.00 лв"` that breaks the arithmetic.

A crop is **cool-season or warm-season** (its [[season]] band), a **heavy or light feeder** (its [[fertility]] class), and **legume or not** (nitrogen-fixing ⇒ N ≈ 0); a **fruiting** crop sets its harvest only with [[pollination]]. Ranked by **net return per bed-foot** (the [[enterprisebudget|crop enterprise budget]]: `units × price − seed − inputs − labor`), it is also the unit of the drop-the-unprofitable decision.

## Standards
- Johnny's Selected Seeds — Grower's Library crop charts (yield/100 ft, seeds/ft, spacing)
- Southeastern U.S. Vegetable Crop Handbook (per-crop planting & fertility recommendations)
- Wiswall — crop enterprise budgets (net return per crop)
- UN/CEFACT Rec 20 (sale-unit codes); ISO 4217:2015 (unit-price currency)

## Common mistakes
- A unit-baked field (`weightKg`, a price typed `2.00 лв`) — split into [[measure]] (value + unit) and [[currency]] (amount + code) so totals and conversions are automatic.
- Treating all units as countable pieces — a box mixes weight, count, and volume units; sum only within a [[dimension]].
- Ranking crops by gross revenue, not net return per bed-foot — the latter is what frees the binding land × season [[bottleneck]].

**Law — [[law]]: a crop is the agricultural SKU carrying agronomic constants ([[yield]]/area, spacing, N·K need, plantings × harvests) that explode a demand quantity into land·seed·[[fertility]]; its heterogeneous sale unit makes automatic [[conversion]] non-negotiable — sum only within a [[dimension]].**

Composes [[agriculture]] · [[items]] · [[biological/assets]] · [[measure]] · [[currency]] · [[yield]] · [[fertility]] · [[planting]] · [[harvest]] · [[season]] · [[conversion]] · [[commerce]].

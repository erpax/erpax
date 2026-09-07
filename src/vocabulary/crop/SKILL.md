---
name: crop
description: "Use when modelling a cultivated plant type as the agricultural SKU — the produce-catalogue row carrying its sale unit (1 bunch, 100 g, 1 head), unit price, and the agronomic constants (yield per area, plant spacing, N·K₂O need, plantings & harvests per season) that explode a demand quantity into land, seed, and fertility. The crop is the bill-of-materials line of a farm; its heterogeneous sale unit is why automatic unit conversion is non-negotiable."
atomPath: "vocabulary/crop"
coordinate: "vocabulary/crop · 2/share · f0902473"
contentUuid: "006df1b7-5867-54c9-afae-c6fa95438af8"
diamondUuid: "8cdd2f56-6204-8577-b6a9-96c07404da75"
uuid: "f0902473-10fb-8c14-b879-2fbb9007cf80"
horo: 2
typography:
  partition: vocabulary
  bondDegree: 150
standards: []
bindings: []
signatures:
  computationUuid: "394cf8e8-c398-83a2-bd2a-d747122936ff"
  stages:
    - stage: path
      stageUuid: "7fe674bd-5b67-816b-9451-b967b0971bea"
    - stage: trinity
      stageUuid: "0e14683b-bee4-848a-92b5-43a068a1a5d1"
    - stage: boundary
      stageUuid: "ca9dda40-d3aa-8217-a004-d29cb58d2494"
    - stage: links
      stageUuid: "60eb8dbb-bb44-851a-b8d3-00d36b59c91d"
    - stage: horo
      stageUuid: "a504f923-f154-851c-9b54-38b643fac585"
    - stage: seal
      stageUuid: "9f4d70d7-1022-84d0-a6f1-abdb4e54a4f4"
    - stage: uuid
      stageUuid: "9f5c852e-cbf4-8e4f-9df8-b3886077ab0c"
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

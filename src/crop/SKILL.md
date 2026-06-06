---
name: crop
description: "Use when modelling a cultivated plant type as the agricultural SKU — the produce-catalogue row carrying its sale unit (1 bunch, 100 g, 1 head), unit price, and the agronomic constants (yield per area, plant spacing, N·K₂O need, plantings & harvests per season) that explode a demand quantity into land, seed, and fertility. The crop is the bill-of-materials line of a farm; its heterogeneous sale unit is why automatic unit conversion is non-negotiable."
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

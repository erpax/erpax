---
name: yield
description: "Use when a bound resource is converted to output at a realized rate — crop yield (output per unit land: lbs/acre, kg/decare) and its inverse, the land a demanded quantity requires. Yield is the bidirectional conversion factor between a resource and its product (area × yield = output; output ÷ yield = area); inverted through unit weight it gives row-length per saleable unit — the number that turns a demand plan into a planting plan."
---

# yield — realized output per unit of a bound resource (and its inverse)

**yield** is output per unit of a bound resource — crop yield is harvested weight per unit **land** (*lbs/acre · kg/ha · kg/decare*), the central agronomic [[measure]] of productivity. Its power is that it runs **both ways**, a [[rate]] and its reciprocal:

```
area × yield  = output        (forward: land → produce)
output ÷ yield = area         (inverse: demand → land)
```

[[agriculture]]'s whole backward plan hangs off the inverse: a demanded quantity of [[crop]] units, divided by yield, *is* the land to plant. It is carried at three resolutions because decisions happen at different scales — **per area** (the field benchmark, comparable to extension tables), **per row-length**, and **per bed-length** (`= per-row × rows-per-bed`). The bed/row **geometry** sets it: `row-length per area = area ÷ (bed-plus-path centre spacing)` (e.g. 43 560 ft² ÷ a 5-ft bed footprint = 8 712 bed-ft/acre), and `plant density = rows-per-bed ÷ within-row-[[spacing]]` — so ignoring the **path** overstates capacity ~40 %, and tighter [[spacing]] does **not** scale yield linearly (plants compete; total plateaus, then falls).

**The yield ratio** is yield inverted through the [[crop]]'s **unit weight**: `row-length per unit = unit-weight ÷ yield-per-length` — how much bed must be planted to make one saleable unit. This single number converts a [[share]]/[[market]] demand plan into a planting plan (then into seed via the seed-rate, transplants via density). Its economic twin is **revenue per bed-foot** ([[revenue]] ÷ length) — the basis for ranking [[crop]]s.

Yield generalizes beyond the field — output per unit of any bound resource is the same atom ([[throughput]] is yield per time; [[capacity]] its ceiling) — which is why it sits beside [[bottleneck]]: the resource with the worst yield-to-demand ratio caps the [[whole]].

## Standards
- Land-grant extension yield tables (MSU E1565; Penn State; UVM; LSU AgCenter); USDA NASS Vegetables Summary
- UGA Extension C1313 — *Common Agricultural Calculations* (plants-per-area, row-length geometry)
- Coleman — standardized bed/path geometry; Brisebois — linear-bed-foot planning
- UN/CEFACT Rec 20 (yield-rate units); decare = 1000 m² (Bulgarian land unit), lbs/acre → kg/ha ×1.12085

## Common mistakes
- Benchmarking a per-bed-foot figure against a per-acre extension table — convert through `row-length per acre` first.
- Dividing area by the bare bed width, ignoring the path — overstates row-length and plant counts ~30–40 %.
- Planning on gross field yield, not **marketable** yield — culls and grade-outs can be ~50 %; under-plants the demand.

Composes [[agriculture]] · [[crop]] · [[measure]] · [[rate]] · [[conversion]] · [[spacing]] · [[grade]] · [[soil]] · [[capacity]] · [[throughput]] · [[bottleneck]] · [[revenue]] · [[harvest]] · [[fertility]].

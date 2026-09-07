---
name: yield
description: "Use when a bound resource is converted to output at a realized rate — crop yield (output per unit land: lbs/acre, kg/decare) and its inverse, the land a demanded quantity requires. Yield is the bidirectional conversion factor between a resource and its product (area × yield = output; output ÷ yield = area); inverted through unit weight it gives row-length per saleable unit — the number that turns a demand plan into a planting plan."
atomPath: yield
coordinate: "yield · 7/descent · bc9c9d13"
contentUuid: "c8c7e95d-617d-5470-8be8-e9feaebb91a7"
diamondUuid: "1505ba74-efa0-8eaa-8bc6-cb8dd53fd178"
uuid: "bc9c9d13-5db7-8e7b-985c-6102e3a56fd7"
horo: 7
typography:
  partition: yield
  bondDegree: 116
standards: []
bindings: []
signatures:
  computationUuid: "9dfd2680-01dd-81f2-b1fc-64a75bb13946"
  stages:
    - stage: path
      stageUuid: "6eea17f6-493e-8479-8f2c-ea370adbe871"
    - stage: trinity
      stageUuid: "755d195c-7375-84c8-96e9-8425157477db"
    - stage: boundary
      stageUuid: "86882033-5fce-8cf8-b1dd-4a5f31a39a3a"
    - stage: links
      stageUuid: "0f0156f8-fab1-8360-b007-25180f4fa037"
    - stage: horo
      stageUuid: "f8ae9b54-6a03-8552-82cd-b5476c78e66c"
    - stage: seal
      stageUuid: "18cf0977-7d84-88a6-8422-8689a6e45420"
    - stage: uuid
      stageUuid: "43dbf9d5-9fa9-8cd8-b2f7-723c5d34fa26"
version: 2
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

**Law — [[law]]: yield is output per unit of a bound resource, a bidirectional [[rate]] (area × yield = output; output ÷ yield = area) — so its inverse, through unit weight, turns a demand plan into a planting plan.**

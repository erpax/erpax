---
name: fertility
description: "Use when budgeting the soil's nutrient capacity against crop demand — the N-P-K balance where a crop's nitrogen and potassium need (lbs/acre, as N and K₂O oxide forms) scales with its yield; heavy vs light feeders; legumes fixing their own nitrogen (N ≈ 0); the 4R stewardship and soil-test basis. Fertility is a double-entry budget: crop removal debits the soil, application credits it; it must balance like any ledger."
atomPath: fertility
coordinate: fertility · 7/descent · 5d5cf92f
contentUuid: "47c6aa90-32f9-502d-9b4d-e0ea87ff9013"
diamondUuid: "303f2827-dd39-86a0-9023-fa8c8910d78f"
uuid: "5d5cf92f-a33a-82fb-86e5-069a52eeea94"
horo: 7
bonds:
  in:
    - agriculture
    - assets
    - balance
    - capacity
    - compost
    - conversion
    - covercrop
    - crop
    - entry
    - family
    - forestry
    - grazing
    - irrigation
    - law
    - livestock
    - manure
    - measure
    - moisture
    - mycorrhizae
    - pasture
    - permaculture
    - planting
    - rate
    - rotation
    - salinity
    - soil
    - taxonomy
    - yield
  out:
    - agriculture
    - assets
    - balance
    - capacity
    - compost
    - conversion
    - covercrop
    - crop
    - entry
    - family
    - forestry
    - grazing
    - irrigation
    - law
    - livestock
    - manure
    - measure
    - moisture
    - mycorrhizae
    - pasture
    - permaculture
    - planting
    - rate
    - rotation
    - salinity
    - soil
    - taxonomy
    - yield
typography:
  partition: fertility
  bondDegree: 93
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - agriculture
    - assets
    - balance
    - capacity
    - compost
    - conversion
    - covercrop
    - crop
    - entry
    - irrigation
    - law
    - measure
    - mycorrhizae
    - planting
    - rate
    - salinity
    - soil
    - yield
  matrix:
    - agriculture
    - assets
    - balance
    - capacity
    - compost
    - conversion
    - covercrop
    - crop
    - entry
    - family
    - forestry
    - grazing
    - irrigation
    - law
    - livestock
    - manure
    - measure
    - moisture
    - mycorrhizae
    - pasture
    - permaculture
    - planting
    - rate
    - rotation
    - salinity
    - soil
    - taxonomy
    - yield
  backlinks:
    - agriculture
    - assets
    - balance
    - capacity
    - compost
    - conversion
    - covercrop
    - crop
    - entry
    - family
    - forestry
    - grazing
    - irrigation
    - law
    - livestock
    - manure
    - measure
    - moisture
    - mycorrhizae
    - pasture
    - permaculture
    - planting
    - rate
    - rotation
    - salinity
    - soil
    - taxonomy
    - yield
signatures:
  computationUuid: "a4a0d710-0cf8-882f-84cc-7bc96a043c60"
  stages:
    - stage: path
      stageUuid: "1aafa7a5-b1ee-856f-abc4-8b72c7e1e5fc"
    - stage: trinity
      stageUuid: "4a8a5545-7130-851b-a471-60a699c80a1c"
    - stage: boundary
      stageUuid: "3764f3ca-77b7-8828-b80f-43c92258e33e"
    - stage: links
      stageUuid: "cb9146b9-d91f-88d7-a8f1-e86b4e2be7d7"
    - stage: horo
      stageUuid: "6b826def-4793-87e5-a6cd-e88e6b6d1c99"
    - stage: seal
      stageUuid: "44600b5f-3c1e-8ab1-8368-24128401a45f"
    - stage: uuid
      stageUuid: "2a4f6617-6cad-81e5-a296-d9a7751b89bf"
version: 2
---
# fertility — the soil's nutrient budget, balanced against crop demand

**fertility** is the capacity of [[soil]] to supply nutrients, **budgeted against what the [[crop]] removes** — a [[balance]] in the literal accounting sense: **crop removal debits the soil, fertilizer / legume / residue credits it**, and a fertility plan is the [[entry]] that keeps the budget from drifting into depletion or excess. The macronutrients are **N-P-K** (nitrogen, phosphorus, potassium); by fertilizer-trade convention nutrients are rated **N elemental, P as P₂O₅, K as K₂O** (the oxide forms) — so a `10-10-10` grade is %N–%P₂O₅–%K₂O, and a soil test (elemental P, K) must **[[conversion|convert]]** (×0.44 for P₂O₅→P, ×0.83 for K₂O→K) before it reconciles. Rates are a [[measure]] per area (lbs/acre, kg/ha) — a [[rate]] that **scales with [[yield]]**: the more a crop produces, the more it removes.

This sets each [[crop]]'s feeder class: **heavy feeders** (sweet corn N≈180, tomato N≈120 lbs/acre, brassicas) vs **light feeders** (carrot, onion, garlic). The exception is structural: **legumes** (peas, beans, edamame, southern peas) host *Rhizobium* in root nodules and **fix atmospheric nitrogen** — their fertilizer-N need is ≈ 0, and over-applying N suppresses the fixation. The governing best practice is **4R stewardship** — Right Source, Right Rate, Right Time, Right Place — anchored to a **soil test**, not book rates; on low-CEC sandy soils (which leach K⁺ and NO₃⁻) applications split and sidedress.

Fertility is one input line in [[agriculture]]'s backward plan: `N per planting = area × N-rate ÷ plantings`. As a conserved, balanced budget — depleted by output, restored by input — it is the soil twin of [[capacity]]: borrow from it without crediting back and the [[balance]] eventually fails. It is where [[planting]] and [[yield]] meet the ledger.

## Standards
- 4R Nutrient Stewardship — TFI / IPNI (Right Source/Rate/Time/Place); USDA-NRCS Nutrient Management (Code 590)
- Southeastern U.S. Vegetable Crop Handbook; Ohio State — Tri-State Fertilizer Recommendations (soil-test calibration, crop removal)
- NMSU A-129 — Nitrogen Fixation by Legumes (*Rhizobium* symbiosis)
- Oxide-form convention P₂O₅/K₂O; CEC (Cornell Agronomy Fact Sheet 22)

## Common mistakes
- Fertilizing legumes with N — wasted, and it suppresses fixation; their need is ≈ 0.
- Confusing oxide and elemental forms — treating a soil-test P/K (elemental) as the fertilizer P₂O₅/K₂O (oxide) mis-applies by the 0.44 / 0.83 factors.
- Over-applying nitrogen — leaching on low-CEC sands, lodging in grains, foliage over fruit set; violates 4R Right Rate.

Composes [[agriculture]] · [[crop]] · [[yield]] · [[balance]] · [[entry]] · [[measure]] · [[rate]] · [[conversion]] · [[soil]] · [[compost]] · [[covercrop]] · [[mycorrhizae]] · [[salinity]] · [[irrigation]] · [[capacity]] · [[planting]] · [[biological/assets]].

**Law — [[law]]: fertility is a double-entry budget — [[crop]] removal debits the [[soil]], application credits it, and it must [[balance]] like any ledger; the N-P-K need scales with [[yield]] and a soil test, not book rates.**

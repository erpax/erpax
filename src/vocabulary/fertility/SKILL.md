---
name: fertility
description: "Use when budgeting the soil's nutrient capacity against crop demand — the N-P-K balance where a crop's nitrogen and potassium need (lbs/acre, as N and K₂O oxide forms) scales with its yield; heavy vs light feeders; legumes fixing their own nitrogen (N ≈ 0); the 4R stewardship and soil-test basis. Fertility is a double-entry budget: crop removal debits the soil, application credits it; it must balance like any ledger."
atomPath: "vocabulary/fertility"
coordinate: "vocabulary/fertility · 4/weave · 50f3899b"
contentUuid: "1e04ec8d-67b4-5e1a-8c4b-70f1447c98ea"
diamondUuid: "eda76d9c-b11d-819c-89a2-1e715046b715"
uuid: "50f3899b-526c-8f81-b18a-d7daf6b4cfe2"
horo: 4
typography:
  partition: vocabulary
  bondDegree: 93
standards: []
bindings: []
signatures:
  computationUuid: "547f4110-0bb1-8737-b658-5da3b7088d4c"
  stages:
    - stage: path
      stageUuid: "1e1d332f-0c31-87a3-85ce-c60054d0bc4a"
    - stage: trinity
      stageUuid: "672e89fa-11d1-842c-9241-2c803e3bf11a"
    - stage: boundary
      stageUuid: "8717a789-2423-8b13-98a8-f944dc211ff0"
    - stage: links
      stageUuid: "b8827f5d-8861-897d-aa93-a75b109cb8cb"
    - stage: horo
      stageUuid: "7206ca8a-bc02-88b6-8986-9f5b73ea7ff8"
    - stage: seal
      stageUuid: "574d352f-7179-8f90-86af-d75ec2e5124e"
    - stage: uuid
      stageUuid: "248e1c33-2d5b-8c1e-a550-6bb61f3a9778"
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

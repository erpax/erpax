---
name: compost
description: "Use when organic residues are decomposed into a soil amendment — compost and manure as the organic-matter/microbial input that rebuilds soil rather than just feeding the crop. The literal entropy→soil recycling node: spent residue, decomposed, credited back to the soil's capacity (the regenerative balance)."
atomPath: compost
coordinate: "compost · 1/base · b275353e"
contentUuid: "920d4b77-04cb-56a2-a725-3b903e94fab5"
diamondUuid: "6e091575-2423-8cb7-85c2-c4071bf0ffc7"
uuid: "b275353e-09f6-8866-932e-34fb13e99ba2"
horo: 1
typography:
  partition: compost
  bondDegree: 30
standards:
  - "SARE, Building Soils for Better Crops — organic-matter management"
  - "US Composting Council — compost maturity/stability (C:N criteria)"
  - "USDA NOP 7 CFR §205.203 — compost and raw-manure rules"
  - "USDA-NOP"
bindings: []
signatures:
  computationUuid: "786d5b37-9d1a-8996-b476-a747d37dae24"
  stages:
    - stage: path
      stageUuid: "f6bf7fde-93ab-8a11-b344-939400cb706f"
    - stage: trinity
      stageUuid: "ab93b691-fea4-8d22-bdf8-846762f8038d"
    - stage: boundary
      stageUuid: "02507683-56f9-8f4a-a555-06b11c0d0cf0"
    - stage: links
      stageUuid: "b7f4b0a5-fda9-82a6-9162-4a0df5f0f49f"
    - stage: horo
      stageUuid: "f48c8c6d-f460-8dbd-85cd-741083dd00da"
    - stage: seal
      stageUuid: "b8b04192-5a91-85d4-a84c-128a5bb227df"
    - stage: uuid
      stageUuid: "4ef2672a-ea6e-8360-b5f3-e645423df799"
version: 2
---
# compost — decomposed residue returned to the soil

**compost** is decomposed organic residue added to soil — an **organic-matter and microbial** amendment more than an N-P-K source (that distinction matters: it rebuilds soil structure, CEC, water-holding, and biology rather than simply feeding the crop). **Manure** (animal excreta, raw or composted) is the kin input — under organic rules raw manure carries a 90/120-day pre-harvest interval. **Biochar** (pyrolyzed biomass) is the long-lived carbon variant that raises CEC and locks carbon in the soil.

Compost is the literal **entropy → soil recycling** node: spent residue (the farm's waste) decomposed and **credited back** into soil [[capacity]] — the regenerative [[balance]] that offsets the removal a [[harvest]] debits. The cycle closes (breath: residue out, fertility in).

## Standards
- SARE *Building Soils for Better Crops* (organic-matter management); USDA NOP 7 CFR §205.203 (compost & raw-manure rules)
- US Composting Council — compost maturity/quality (the C:N and stability criteria)

Composes [[agriculture]] · soil · fertility · [[balance]] · [[capacity]] · [[harvest]] · breath · covercrop · [[conservation]] · [[sustainability]] · [[ecosystem]] · [[emission]].

## Matter-twin

Implemented in `index.ts` and verified in `test.ts`. Exported surface:

- `CN_IDEAL` — empirical feedstock C:N sweet-spot constant (~30)
- `CN_MATURE` — finished/stable compost C:N ceiling constant (~20)
- `cnRatio(carbon, nitrogen)` — C/N mass ratio
- `isMature(cn)` — true when cn ≤ `CN_MATURE`
- `humificationRatio(initialC, humifiedC)` — humified fraction of initial carbon ∈ [0,1]
- `respiredCarbon(initialC, humifiedC)` — carbon lost as CO₂ (= initialC − humifiedC)
- `Decompose` — type `{ residue, toSoil, respired }`
- `loopBalances(d, tol?)` — proves the partial closed loop by delegating to `conservation.boundaryConserves`; residue in = toSoil + respired out

**Law — [[law]]: the literal entropy→soil recycling node — spent residue decomposed and credited back into soil [[capacity]], offsetting the removal a [[harvest]] debits; the loop balances (residue in = toSoil + respired out, [[balance]]).**

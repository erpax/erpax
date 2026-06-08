---
name: compost
description: "Use when organic residues are decomposed into a soil amendment — compost and manure as the organic-matter/microbial input that rebuilds soil rather than just feeding the crop. The literal entropy→soil recycling node: spent residue, decomposed, credited back to the soil's capacity (the regenerative balance)."
atomPath: compost
coordinate: compost · 4/weave · d39344c4
contentUuid: "b923fb5e-35ba-55a3-9965-62c064c9c313"
diamondUuid: "ed054997-0048-83d4-84e1-b6ad7022c435"
uuid: "d39344c4-cd27-8c54-a1db-4331691987b9"
horo: 4
bonds:
  in:
    - agriculture
    - balance
    - breath
    - capacity
    - conservation
    - covercrop
    - ecosystem
    - emission
    - fertility
    - harvest
    - law
    - manure
    - mycelium
    - organic
    - soil
    - sustainability
    - tillage
  out:
    - agriculture
    - balance
    - breath
    - capacity
    - conservation
    - covercrop
    - ecosystem
    - emission
    - fertility
    - harvest
    - law
    - manure
    - mycelium
    - organic
    - soil
    - sustainability
    - tillage
typography:
  partition: compost
  bondDegree: 56
  neighbors: []
standards:
  - "SARE, Building Soils for Better Crops — organic-matter management"
  - "US Composting Council — compost maturity/stability (C:N criteria)"
  - "USDA NOP 7 CFR §205.203 — compost and raw-manure rules"
  - "USDA-NOP"
  - "computed, never hand-asserted"
bindings: []
neighbors:
  wikilink:
    - agriculture
    - balance
    - breath
    - capacity
    - conservation
    - covercrop
    - ecosystem
    - emission
    - fertility
    - harvest
    - law
    - soil
    - sustainability
  matrix:
    - agriculture
    - balance
    - breath
    - capacity
    - conservation
    - covercrop
    - ecosystem
    - emission
    - fertility
    - harvest
    - law
    - manure
    - mycelium
    - organic
    - soil
    - sustainability
    - tillage
  backlinks:
    - agriculture
    - balance
    - breath
    - capacity
    - conservation
    - covercrop
    - ecosystem
    - emission
    - fertility
    - harvest
    - law
    - manure
    - mycelium
    - organic
    - soil
    - sustainability
    - tillage
signatures:
  computationUuid: "f5c45106-0403-8a54-a5d4-d2239806261c"
  stages:
    - stage: path
      stageUuid: "f6bf7fde-93ab-8a11-b344-939400cb706f"
    - stage: trinity
      stageUuid: "ab93b691-fea4-8d22-bdf8-846762f8038d"
    - stage: boundary
      stageUuid: "02507683-56f9-8f4a-a555-06b11c0d0cf0"
    - stage: links
      stageUuid: "2b5de81a-742f-81e0-87b9-d91cbcfaeab8"
    - stage: horo
      stageUuid: "f567fb83-fa46-8d66-96c3-a061444bf9ae"
    - stage: seal
      stageUuid: "3bbe59a6-be5d-8455-916f-b96c6a0515fb"
    - stage: uuid
      stageUuid: "59645e7f-7921-865d-9862-45a3d2dc9c1d"
version: 2
---
# compost — decomposed residue returned to the soil

**compost** is decomposed organic residue added to [[soil]] — an **organic-matter and microbial** amendment more than an N-P-K source (that distinction matters: it rebuilds [[soil]] structure, [[fertility|CEC]], water-holding, and biology rather than simply feeding the crop). **Manure** (animal excreta, raw or composted) is the kin input — under organic rules raw manure carries a 90/120-day pre-harvest interval. **Biochar** (pyrolyzed biomass) is the long-lived carbon variant that raises CEC and locks carbon in the soil.

Compost is the literal **entropy → [[soil]] recycling** node: spent residue (the farm's waste) decomposed and **credited back** into [[soil]] [[capacity]] — the regenerative [[balance]] that offsets the removal a [[harvest]] debits. The cycle closes ([[breath]]: residue out, [[fertility]] in).

## Standards
- SARE *Building Soils for Better Crops* (organic-matter management); USDA NOP 7 CFR §205.203 (compost & raw-manure rules)
- US Composting Council — compost maturity/quality (the C:N and stability criteria)

Composes [[agriculture]] · [[soil]] · [[fertility]] · [[balance]] · [[capacity]] · [[harvest]] · [[breath]] · [[covercrop]] · [[conservation]] · [[sustainability]] · [[ecosystem]] · [[emission]].

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

**Law — [[law]]: the literal entropy→[[soil]] recycling node — spent residue decomposed and credited back into soil [[capacity]], offsetting the removal a [[harvest]] debits; the loop balances (residue in = toSoil + respired out, [[balance]]).**

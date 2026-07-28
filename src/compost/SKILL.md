---
name: compost
description: "Use when organic residues are decomposed into a soil amendment — compost and manure as the organic-matter/microbial input that rebuilds soil rather than just feeding the crop. The literal entropy→soil recycling node: spent residue, decomposed, credited back to the soil's capacity (the regenerative balance)."
atomPath: compost
coordinate: "compost · 8/crest · 4b1367cc"
contentUuid: "9e70b7c8-4fca-50ea-9035-2bd3558a579b"
diamondUuid: "5ba6ce52-73f2-8dd6-924a-d1f9742f0613"
uuid: "4b1367cc-7612-8a46-8b25-91cb396b17d1"
horo: 8
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
  computationUuid: "8595a725-f888-8158-91dc-30aca175856e"
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
      stageUuid: "5a378798-686d-85bf-8285-f766e41a9d1e"
    - stage: seal
      stageUuid: "b8b04192-5a91-85d4-a84c-128a5bb227df"
    - stage: uuid
      stageUuid: "62ac6142-1a87-86ff-b729-957ed5595f10"
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

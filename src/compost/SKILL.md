---
name: compost
description: "Use when organic residues are decomposed into a soil amendment — compost and manure as the organic-matter/microbial input that rebuilds soil rather than just feeding the crop. The literal entropy→soil recycling node: spent residue, decomposed, credited back to the soil's capacity (the regenerative balance)."
atomPath: compost
coordinate: "compost · 5/round · d0db3253"
contentUuid: "0ab6d46a-4628-5ef2-b551-6b545361fe70"
diamondUuid: "7706605c-a3f5-85e0-9a0b-1d3a08a4598c"
uuid: "d0db3253-0556-872b-8b98-12f51fe83cc3"
horo: 5
typography:
  partition: compost
  bondDegree: 33
standards:
  - "SARE, Building Soils for Better Crops — organic-matter management"
  - "US Composting Council — compost maturity/stability (C:N criteria)"
  - "USDA NOP 7 CFR §205.203 — compost and raw-manure rules"
  - "USDA-NOP"
bindings: []
signatures:
  computationUuid: "673ff7ff-f7c7-87ac-a5ad-cb7ab4563be8"
  stages:
    - stage: path
      stageUuid: "f6bf7fde-93ab-8a11-b344-939400cb706f"
    - stage: trinity
      stageUuid: "ab93b691-fea4-8d22-bdf8-846762f8038d"
    - stage: boundary
      stageUuid: "02507683-56f9-8f4a-a555-06b11c0d0cf0"
    - stage: links
      stageUuid: "ec3f0608-3a91-8f97-a689-1e99310934f0"
    - stage: horo
      stageUuid: "d8087a65-e723-8012-a330-78e3e5f59b40"
    - stage: seal
      stageUuid: "b8b04192-5a91-85d4-a84c-128a5bb227df"
    - stage: uuid
      stageUuid: "49e277fb-c9bc-8ce7-a087-9e1245bbd3c0"
version: 2
---
# compost — decomposed residue returned to the soil

**compost** is decomposed organic residue added to soil — an **organic-matter and microbial** amendment more than an N-P-K source (that distinction matters: it rebuilds soil structure, CEC, water-holding, and biology rather than simply feeding the crop). **Manure** (animal excreta, raw or composted) is the kin input — under organic rules raw manure carries a 90/120-day pre-harvest interval. **Biochar** (pyrolyzed biomass) is the long-lived carbon variant that raises CEC and locks carbon in the soil.

Compost is the literal **entropy → soil recycling** node: spent residue (the farm's waste) decomposed and **credited back** into soil [[capacity]] — the regenerative [[balance]] that offsets the removal a [[harvest]] debits. The cycle closes ([[breath]]: residue out, fertility in).

## Standards
- SARE *Building Soils for Better Crops* (organic-matter management); USDA NOP 7 CFR §205.203 (compost & raw-manure rules)
- US Composting Council — compost maturity/quality (the C:N and stability criteria)

Composes [[agriculture]] · soil · fertility · [[balance]] · [[capacity]] · [[harvest]] · [[breath]] · covercrop · [[conservation]] · [[sustainability]] · [[ecosystem]] · [[emission]].

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

---
name: emission
description: "Use when quantifying the greenhouse-gas mass a cycle releases — converting each gas to CO₂-equivalent via its Global Warming Potential, summing a multi-gas inventory, computing activity-based emissions (GHG Protocol), or measuring carbon intensity (CO₂e per unit output). The DEBIT/EXPORT side of [[sustainability]]."
atomPath: emission
coordinate: emission · 2/share · d3203283
contentUuid: "ead610c7-3a0c-5faa-9e0f-093d6095b1a2"
diamondUuid: "f47bc537-353a-87f7-8280-f1629f93535f"
uuid: "d3203283-3152-8b3a-9c9e-82538f80cf14"
horo: 2
bonds:
  in:
    - biophoton
    - compost
    - conservation
    - ecosystem
    - law
    - meets
    - merge
    - standard
    - sustainability
  out:
    - biophoton
    - compost
    - conservation
    - ecosystem
    - law
    - meets
    - merge
    - standard
    - sustainability
typography:
  partition: emission
  bondDegree: 28
  neighbors: []
standards:
  - "EU-2014/55"
  - "EU-537/2014"
  - "EU-910/2014"
  - GHG Protocol Corporate Standard (Scope 1 / 2 / 3)
  - "GHG-Protocol"
  - "ILO-C100"
  - "IPCC AR5 (2014) — 100-yr Global Warming Potentials (Table 8.A.1)"
  - ISO 14064 — Greenhouse gas quantification and reporting
  - "ISO-14064-1"
  - "computed, never hand-asserted"
bindings: []
neighbors:
  wikilink:
    - compost
    - conservation
    - ecosystem
    - law
    - merge
    - standard
    - sustainability
  matrix:
    - biophoton
    - compost
    - conservation
    - ecosystem
    - law
    - meets
    - merge
    - standard
    - sustainability
  backlinks:
    - biophoton
    - compost
    - conservation
    - ecosystem
    - law
    - meets
    - merge
    - standard
    - sustainability
signatures:
  computationUuid: "b1f05c8e-b21b-8933-bfe9-3411b30a358a"
  stages:
    - stage: path
      stageUuid: "6b83bd2a-a9d8-8e5b-bc63-da90403e5090"
    - stage: trinity
      stageUuid: "1063d5bf-121f-8d80-83b5-3e885788344b"
    - stage: boundary
      stageUuid: "5deff58a-e09c-8eb5-bd44-b7fcff219653"
    - stage: links
      stageUuid: "b7e6154c-650f-84af-8dd0-ad32d25bd942"
    - stage: horo
      stageUuid: "90e6ab0c-d35c-858c-a751-fab42cb41c51"
    - stage: seal
      stageUuid: "d6046083-ab33-8b05-b7e1-866c1c9d78f1"
    - stage: uuid
      stageUuid: "febde8e3-0d5b-8857-9d0c-43822db3db95"
version: 2
---
# emission — the greenhouse-gas DEBIT a cycle releases (CO₂-equivalent)

**Emission** is the measurable export the sustainability cycle must keep within its sink capacity — the greenhouse-gas mass a process, boundary, or organisation releases into the atmosphere, expressed as a single **CO₂-equivalent (CO₂e)** figure by multiplying each gas's mass by its **100-year Global Warming Potential (GWP)** from IPCC AR5 (2014). CO₂ is the numéraire (GWP = 1 by definition); CH₄ carries a GWP of 28 (28× more warming per kilogram over 100 years than CO₂); N₂O carries 265. An unknown gas contributes 0 CO₂e — not silently inflated — so callers must audit their gas keys.

This is the **DEBIT** side of double-entry carbon accounting: every unit of emission debits the atmosphere's carrying capacity and must be matched by a credit (sequestration, avoided emission, [[conservation]] across a boundary) for the books to close. The compost exhale enters here — the carbon that soil respiration releases is an emission event, recorded and summed before the net-sink comparison is made. Carbon intensity — total CO₂e divided by a unit of economic or physical output — is the derived signal [[sustainability]] watches over time.

**Law — [[law]]: emission is the greenhouse-gas DEBIT of [[sustainability]] — every gas reduced to one CO₂e figure by its IPCC GWP, summed, and matched by a credit ([[conservation]]) for the carbon books to close; an unknown gas contributes 0, never silently inflated.**

## The math (matter-twin)

`index.ts` exports:

- `GWP` — frozen `Record<string, number>` of IPCC AR5 100-yr potentials; mandatory anchors: `co2=1`, `ch4=28`, `n2o=265`.
- `co2e(gas, mass)` — mass × `GWP[gas]` (unknown gas → 0).
- `totalCo2e(emissions)` — Σ `co2e(gas, mass)` over an inventory array.
- `emissionFromActivity(activity, factor)` — activity × emission factor (GHG Protocol Corporate Standard).
- `carbonIntensity(total, output)` — total CO₂e per unit output; `output ≤ 0` → 0.

All functions are pure, edge-safe, and perform no I/O.

## Standards

- **IPCC AR5 (2014)** — Fifth Assessment Report, Table 8.A.1; 100-year GWP values used verbatim.
- **GHG Protocol Corporate Standard** (World Resources Institute / WBCSD) — Scope 1 / 2 / 3 activity-based emission method; `emissionFromActivity` implements the core formula.
- **ISO 14064** — International standard for greenhouse-gas quantification, monitoring, reporting, and verification at organisation and project level.

Attested in schema.org — meetsEmissionStandard

Composes [[sustainability]] · [[conservation]] · [[ecosystem]] · [[compost]] · [[standard]] · [[merge]]

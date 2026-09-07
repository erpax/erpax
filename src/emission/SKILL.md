---
name: emission
description: "Use when quantifying the greenhouse-gas mass a cycle releases — converting each gas to CO₂-equivalent via its Global Warming Potential, summing a multi-gas inventory, computing activity-based emissions (GHG Protocol), or measuring carbon intensity (CO₂e per unit output). The DEBIT/EXPORT side of sustainability."
atomPath: emission
coordinate: "emission · 4/weave · f083ba93"
contentUuid: "3c2ddb79-7213-590d-8ded-e2fa5e2886b3"
diamondUuid: "3b37f616-c1cb-8355-be7f-02be2f35cc12"
uuid: "f083ba93-6fb5-8dbf-beec-0a23c3d0972b"
horo: 4
typography:
  partition: emission
  bondDegree: 28
standards:
  - "EU-537/2014"
  - "EU-910/2014"
  - "GHG Protocol Corporate Standard (Scope 1 / 2 / 3)"
  - "GHG-Protocol"
  - "IPCC AR5 (2014) — 100-yr Global Warming Potentials (Table 8.A.1)"
  - ISO 14064 — Greenhouse gas quantification and reporting
  - "ISO 14064 — Greenhouse gas quantification and reporting`"
  - "ISO-14064-1"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "e13c7315-883b-8452-8da4-5db3f46e5d5e"
  stages:
    - stage: path
      stageUuid: "6b83bd2a-a9d8-8e5b-bc63-da90403e5090"
    - stage: trinity
      stageUuid: "1063d5bf-121f-8d80-83b5-3e885788344b"
    - stage: boundary
      stageUuid: "5deff58a-e09c-8eb5-bd44-b7fcff219653"
    - stage: links
      stageUuid: "b8d63bd9-9b84-88d9-af0e-1e655b0dd2ec"
    - stage: horo
      stageUuid: "e95bbd9b-2966-82d3-a168-11b5f411cdd8"
    - stage: seal
      stageUuid: "d564da16-4ca8-8846-8076-c7070c3271a0"
    - stage: uuid
      stageUuid: "ea902b08-0d4e-8912-9256-edad40a3e96b"
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

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO 14064 — Greenhouse gas quantification and reporting`


- **IPCC AR5 (2014)** — Fifth Assessment Report, Table 8.A.1; 100-year GWP values used verbatim.
- **GHG Protocol Corporate Standard** (World Resources Institute / WBCSD) — Scope 1 / 2 / 3 activity-based emission method; `emissionFromActivity` implements the core formula.
- **ISO 14064** — International standard for greenhouse-gas quantification, monitoring, reporting, and verification at organisation and project level.

Attested in schema.org — meetsEmissionStandard

Composes [[sustainability]] · [[conservation]] · [[ecosystem]] · [[compost]] · [[standard]] · [[merge]]

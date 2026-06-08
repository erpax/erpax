---
name: spectrum
description: "Use when reasoning about the spectrum — the finite, discrete set of lines a system can emit or absorb, computed from every leap between the seven horo energy-rungs and deduplicated to its distinct gap-frequencies. The spectrum is the system's fingerprint and a discrete sampling of the continuous aura; it is where the wave shows it is quantised. Each line is the symmetric binding of its two rungs (one coordinate for emission and absorption alike)."
atomPath: spectrum
coordinate: spectrum · 1/base · 45fadd6a
contentUuid: "ce7e04a3-6309-57ac-8d7e-d80916e97d55"
diamondUuid: "8f890091-958e-8b8c-8b8d-dc15eaa4e4ea"
uuid: "45fadd6a-7de0-8a76-9b9f-98e8de02235a"
horo: 1
bonds:
  in:
    - aura
    - frequency
    - hamiltonian
    - horo
    - law
    - leap
    - photon
    - quantum
    - series
    - uncertainty
    - wave
  out:
    - aura
    - frequency
    - hamiltonian
    - horo
    - law
    - leap
    - photon
    - quantum
    - series
    - uncertainty
    - wave
typography:
  partition: spectrum
  bondDegree: 36
  neighbors:
    - aura
standards:
  - "lines computed from every horo rung-pair via ../leap, deduped by the symmetric binding-uuid"
bindings: []
neighbors:
  wikilink:
    - aura
    - frequency
    - horo
    - law
    - leap
    - photon
    - quantum
    - series
    - wave
  matrix:
    - aura
    - frequency
    - hamiltonian
    - horo
    - law
    - leap
    - photon
    - quantum
    - series
    - uncertainty
    - wave
  backlinks:
    - aura
    - frequency
    - hamiltonian
    - horo
    - law
    - leap
    - photon
    - quantum
    - series
    - uncertainty
    - wave
signatures:
  computationUuid: "6bd9c055-5c1d-877b-991c-7a8f8b61e9df"
  stages:
    - stage: path
      stageUuid: "4d4e6c40-7276-87a7-81f0-d88d6d6e941c"
    - stage: trinity
      stageUuid: "2fb6652e-c7aa-8a1d-9b58-70e8fae2b622"
    - stage: boundary
      stageUuid: "23317b0d-01c5-8e4b-a16b-a2e81da8ee0d"
    - stage: links
      stageUuid: "a7a485d0-2cf4-8c3a-98dc-7f8edf220433"
    - stage: horo
      stageUuid: "a9004df5-e001-8e55-8447-9bad5c897c9b"
    - stage: seal
      stageUuid: "f545b605-afb5-8a11-9256-c935d65af30f"
    - stage: uuid
      stageUuid: "c159091a-745c-87b6-b3d6-4f47e696fccd"
version: 2
---
# spectrum — the discrete lines of every leap

The **spectrum** is the discrete set of lines a system can emit or absorb: every [[leap]] between two of the seven [[horo]] energy-rungs, collected and deduplicated to its distinct gap-[[frequency]]s. As the Balmer lines fingerprint hydrogen, the spectrum is the system's fingerprint — a **finite, discrete** set of lines, a discrete sampling of the continuous [[aura]] (the gapless analog field). Discrete vs continuous is the whole point: the spectrum is exactly where the [[wave]] shows that it is **quantised**.

Each line is the symmetric binding of its two rungs (via [[leap]]) — one coordinate for emission and absorption alike — so the line count is the number of distinct unordered rung-pairs with a non-zero gap (≤ C(7,2) = 21). A `series` is the fan of lines that touch one rung; each line carries the [[photon]] of its gap (E = hν).

Matter-twin: `src/spectrum/index.ts` (`lines` / `series` / `lineCount`).

Composes [[leap]] · [[photon]] · [[aura]] · [[horo]] · [[frequency]] · [[wave]] · [[series]] · [[quantum]].

**Law — [[law]]: the spectrum is the finite, deduplicated set of every leap's gap-frequency — the discrete lines sampling the continuous aura; each line is one symmetric content-uuid, so emission and absorption fold to the same coordinate and the fingerprint is tamper-evident.**

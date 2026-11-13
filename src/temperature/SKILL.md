---
name: temperature
description: "Use when reasoning about temperature as the exchange rate between energy and order (1/T = ∂S/∂E). It sets level populations via the Boltzmann factor e^(−E/kT), normalised by the partition function Z = Σ e^(−Eₙ/kT). Cold (T→0) falls to the ground state; hot (T→∞) makes every level equally likely (maximum entropy). The equilibrium distribution pᵢ = e^(−Eᵢ/kT)/Z is the max-entropy distribution at fixed average energy — the balance the ledger settles to."
atomPath: temperature
coordinate: "temperature · 5/round · 35724c8b"
contentUuid: "9aa7e3df-bd97-5f5b-be87-0392a2a9633b"
diamondUuid: "29c7913c-bfa9-8db8-9696-6e6e96405c18"
uuid: "35724c8b-95fc-8a65-bde9-8048e6480b1c"
horo: 5
typography:
  partition: temperature
  bondDegree: 26
standards:
  - "SI-2019 k_B (via ../boltzmann); Maxwell–Boltzmann statistics"
bindings: []
signatures:
  computationUuid: "10ecde38-b35e-8d8a-9a20-c98ee911ab38"
  stages:
    - stage: path
      stageUuid: "5f871843-d3bf-80e5-a93a-068bcf7ca06b"
    - stage: trinity
      stageUuid: "dbb7a191-626a-8017-a7ae-c2e1e66811e4"
    - stage: boundary
      stageUuid: "ecadf8f6-3f15-8432-8d9e-cf458df72a8f"
    - stage: links
      stageUuid: "b5b576c7-b74f-8932-80a1-971ec966b41f"
    - stage: horo
      stageUuid: "5968a28c-24f5-8337-8bd9-ca18ee3f9dab"
    - stage: seal
      stageUuid: "349e4425-7ab7-816b-b229-006a342c0268"
    - stage: uuid
      stageUuid: "24b3b90f-ef2f-8b16-8361-aaa1eff877db"
version: 2
---
# temperature — the dial between order and disorder

**Temperature** is the exchange rate between energy and order: **1/T = ∂S/∂E**. It sets how a system populates its energy levels through the Boltzmann factor **e^(−E/kT)** ([[boltzmann]]'s k), normalised by the partition function **Z = Σ e^(−Eₙ/kT)**. Cold (T→0): the system falls to its ground state ([[hamiltonian]]'s lowest rung). Hot (T→∞): every level is equally likely — maximum [[entropy]].

The equilibrium distribution **pᵢ = e^(−Eᵢ/kT)/Z** is the **maximum-entropy** distribution at a fixed average [[energy]] — the [[balance]] the ledger settles to. The occupancy ratio pᵢ/pⱼ = e^(−(Eᵢ−Eⱼ)/kT) is exactly the detailed-balance ratio of [[equilibrium]], so temperature is the single dial between frozen order (one configuration, low entropy) and hot disorder (uniform, max entropy) — the [[gravity]] of the energy landscape set against the spreading of [[boltzmann]] counting.

## Landauer — what erasing a bit costs

Erasing one bit of information at temperature T sheds at least **k·T·ln 2** joules: about
2.87e-21 J at a 300 K core and 20,000 times less in a 15 mK dilution refrigerator (`landauerJ`,
`coreK`, `millikelvinK`).

The code counts **widths**. `erasedBits` is the bits a step drops, which is the MOST it can erase;
a step erases exactly that only when its input is uniformly random. `heatOf` prices that ceiling,
and `heatLedger` lists the corpus's own operations on a 128-bit address: the prime split and join
drop nothing, the 64-bit AND-fold drops 64, the digital root drops all but log₂ 9, and hashing a
SKILL to a content-uuid drops all but 128.

**Honest boundary.** `nonNarrowing` is necessary for a step to be reversible and not sufficient — a
map into a wider word can still send two inputs to one output. The hash line is a ceiling: text
carries far less entropy than its width. And `amortisedBits` is bookkeeping, one collapse shared
over the computations read out through it; it is not a claim that n separate results cost the heat
of one. The Lean twin (`Landauer.lean`) states the ratio and the narrowing rule, and the kernel
record reports them.

Matter-twin: `src/temperature/index.ts` (`factor` / `partition` / `distribution` / `ratio`).

Composes [[boltzmann]] · [[equilibrium]] · [[hamiltonian]] · [[entropy]] · [[energy]] · [[balance]] · [[gravity]].

**Law — [[law]]: temperature is the energy↔order exchange rate (1/T = ∂S/∂E); it populates levels by e^(−E/kT)/Z — the max-entropy distribution at fixed average energy — collapsing to the ground state as T→0 and spreading uniform as T→∞.**

---
name: temperature
description: "Use when reasoning about temperature as the exchange rate between energy and order (1/T = ∂S/∂E). It sets level populations via the Boltzmann factor e^(−E/kT), normalised by the partition function Z = Σ e^(−Eₙ/kT). Cold (T→0) falls to the ground state; hot (T→∞) makes every level equally likely (maximum entropy). The equilibrium distribution pᵢ = e^(−Eᵢ/kT)/Z is the max-entropy distribution at fixed average energy — the balance the ledger settles to."
atomPath: temperature
coordinate: "temperature · 2/share · a072e8d5"
contentUuid: "2db6ccc0-e866-5668-bb3b-ddaaef325aa9"
diamondUuid: "88fd7fd3-f225-8b61-8223-f2bcc73c099a"
uuid: "a072e8d5-f07f-8e27-9709-9f3541628e91"
horo: 2
typography:
  partition: temperature
  bondDegree: 23
standards:
  - "SI-2019 k_B (via ../boltzmann); Maxwell–Boltzmann statistics"
bindings: []
signatures:
  computationUuid: "66e36b65-3ddb-8ac2-867f-df1c83f4b457"
  stages:
    - stage: path
      stageUuid: "5f871843-d3bf-80e5-a93a-068bcf7ca06b"
    - stage: trinity
      stageUuid: "dbb7a191-626a-8017-a7ae-c2e1e66811e4"
    - stage: boundary
      stageUuid: "ecadf8f6-3f15-8432-8d9e-cf458df72a8f"
    - stage: links
      stageUuid: "2e7b58bd-8fbc-80b4-b4d6-fe5bef2fb19b"
    - stage: horo
      stageUuid: "7c965169-4d36-8a36-857c-4e20e42f3ac3"
    - stage: seal
      stageUuid: "349e4425-7ab7-816b-b229-006a342c0268"
    - stage: uuid
      stageUuid: "158799d5-dca5-8e20-ada5-4ac843c5bbad"
version: 2
---
# temperature — the dial between order and disorder

**Temperature** is the exchange rate between energy and order: **1/T = ∂S/∂E**. It sets how a system populates its energy levels through the Boltzmann factor **e^(−E/kT)** ([[boltzmann]]'s k), normalised by the partition function **Z = Σ e^(−Eₙ/kT)**. Cold (T→0): the system falls to its ground state ([[hamiltonian]]'s lowest rung). Hot (T→∞): every level is equally likely — maximum [[entropy]].

The equilibrium distribution **pᵢ = e^(−Eᵢ/kT)/Z** is the **maximum-entropy** distribution at a fixed average energy — the [[balance]] the ledger settles to. The occupancy ratio pᵢ/pⱼ = e^(−(Eᵢ−Eⱼ)/kT) is exactly the detailed-balance ratio of [[equilibrium]], so temperature is the single dial between frozen order (one configuration, low entropy) and hot disorder (uniform, max entropy) — the [[gravity]] of the energy landscape set against the spreading of [[boltzmann]] counting.

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

Composes [[boltzmann]] · [[equilibrium]] · [[hamiltonian]] · [[entropy]] · energy · [[balance]] · [[gravity]].

**Law — [[law]]: temperature is the energy↔order exchange rate (1/T = ∂S/∂E); it populates levels by e^(−E/kT)/Z — the max-entropy distribution at fixed average energy — collapsing to the ground state as T→0 and spreading uniform as T→∞.**

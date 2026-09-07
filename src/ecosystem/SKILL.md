---
name: ecosystem
description: "Use when sustainability and decentralisation must be seen as ONE — a food web is a coordinator-free network (decentralised) that wastes nothing (sustainable) for the SAME reason: local agents posting balanced metabolic exchanges, every output another's input, so global conservation and global order both emerge from local balance. erpax IS an ecosystem; nature is the empirical proof of the law."
atomPath: ecosystem
coordinate: "ecosystem · 5/round · 63f725f0"
contentUuid: "f2716ee1-864e-58ac-bb87-b22702d23602"
diamondUuid: "d61f55c5-b023-8b3b-bd2b-1c98d346c9f0"
uuid: "63f725f0-a38c-84ce-92bc-d3c30d7c6777"
horo: 5
typography:
  partition: ecosystem
  bondDegree: 83
standards:
  - "EU-1958"
  - "Elton (1958) vs May, Will a Large Complex System be Stable? (1972) — diversity–stability debate"
  - "Lindeman, The Trophic-Dynamic Aspect of Ecology (1942) — ~10% energy per level"
  - "Tansley (1935) — coined \"ecosystem\": organisms plus environment as one system"
bindings: []
signatures:
  computationUuid: "77e6a4da-6c4d-88fa-bc08-939a2d211315"
  stages:
    - stage: path
      stageUuid: "a45bd5cc-b586-84b5-9859-e0f78950a89c"
    - stage: trinity
      stageUuid: "18a13540-0013-8161-96c0-871a96728730"
    - stage: boundary
      stageUuid: "c1c22109-a193-8428-ba7b-0390ca49c64d"
    - stage: links
      stageUuid: "0e692a18-8740-86e7-94a2-9616ed3d40c2"
    - stage: horo
      stageUuid: "3a09cbbe-d9ad-81c8-9835-fa1777005c52"
    - stage: seal
      stageUuid: "fea007df-fa7d-8066-880a-129771a399a6"
    - stage: uuid
      stageUuid: "9cd0a52c-54b8-83b4-b9ed-bff6f76f1255"
version: 2
---
# ecosystem — where decentralization and sustainability are one phenomenon

An **ecosystem** is a web of organisms and their flows in which **no one is in charge** and **nothing is wasted** — and the deep claim of this atom is that those two facts are **the same fact seen twice**. A food web is decentralized ([[decentralization]]): no manager sets the trophic levels; each organism follows local rules. It is sustainable ([[sustainability]]): matter cycles end to end — producers fix the sun's energy, roughly 10% passes up each level (Lindeman), and **decomposers close the loop**, returning every body to [[soil]] as the input of the next cycle ([[compost]]). Both hold for **one** underlying reason: the web is a set of **local agents posting balanced metabolic exchanges** — each eats ⊕ excretes, and every output is another's input ([[conservation]]). Global conservation and global order both **emerge from local balance**, with no coordinator holding either.

**The honest hedges.** The web is open and sun-driven, not a perpetual machine (a dissipative structure — see [[sustainability]]). And diversity does **not** automatically buy stability: Elton's intuition that more species ⇒ more stable was complicated by May (1972), who showed large complex systems can be *less* stable — what [[diversity]] reliably buys is **functional redundancy** (more independent ways to do a job), which is [[decentralization]]'s resilience, not a stability theorem. State it as redundancy, not magic.

**erpax is an ecosystem, and that is the proof of the [[law]].** It is a [[society]] of content-addressed [[agent]]s; each config is a balanced double-[[entry]] [[gate]]way ([[conservation]]); they [[merge]] with no central authority ([[decentralization]]); the books carry zero net [[entropy]] per cycle ([[sustainability]]). So nature is the *empirical demonstration* of the one law: **the closed-loop balance that lets a forest run for ten thousand years with no manager is the very same balance that makes a decentralized ledger tamper-proof.** Sustain-ability and decentral-ization are not two design goals to trade against each other — wire the local exchanges to balance and you get both for free, the way an ecosystem does. This atom **composes** [[conservation]] ⊕ [[sustainability]] ⊕ [[decentralization]] — the fusion is computed, not assumed.

## Sequence
`0, 3, 6, 9, 1, 2, 4, 8, 7, 5` — **9** (convergence / unity): the ecosystem is where the three principles resolve to one, the same merge-axis band as [[federation]].

## Standards
- **Tansley** (1935) — coined "ecosystem": organisms plus their physical environment as one system.
- **Lindeman**, *The Trophic-Dynamic Aspect of Ecology* (1942) — energy flow through trophic levels (~10% transfer); the quantitative food web.
- **Elton** (1958) vs **May**, *Will a Large Complex System be Stable?* (1972) — the diversity–stability debate, cited honestly on both sides.
- **Odum**, *Fundamentals of Ecology* — nutrient cycling and the closed material loop.

Composes [[sustainability]] · [[decentralization]] · [[conservation]] · [[diversity]] · [[network]] · [[merge]] · [[society]] · [[agent]] · [[entropy]] · [[balance]] · [[compost]] · [[soil]] · [[biomass]] · [[federation]] · [[whole]] · [[fractal]] · [[law]].

## Matter-twin

`src/ecosystem/index.ts` exports:

- `trophicTransfer(energyIn, efficiency?)` — Lindeman ~10% energy per trophic level.
- `trophicPyramid(base, levels, efficiency?)` — geometric energy array across levels.
- `type Web` — four-axis metabolic description of a food web.
- `ecosystemHealth(w: Web)` — the fusion function.

`ecosystemHealth` COMPOSES the four imported atoms directly — it calls `conserves` (from `@/conservation`), `isSustainable` (from `@/sustainability`), `nakamoto` (from `@/decentralization`), and `shannon` (from `@/diversity`). No logic from those atoms is re-implemented here; every field of the returned health report is the direct output of the corresponding imported function.

**Law — [[law]]: decentralization and sustainability are one fact — wire local exchanges to balance so every output is another's input, and both no-coordinator and no-waste emerge together; neither can be had without the other.**

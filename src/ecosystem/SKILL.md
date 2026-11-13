---
name: ecosystem
description: "Use when sustainability and decentralisation must be seen as ONE — a food web is a coordinator-free network (decentralised) that wastes nothing (sustainable) for the SAME reason: local agents posting balanced metabolic exchanges, every output another's input, so global conservation and global order both emerge from local balance. erpax IS an ecosystem; nature is the empirical proof of the law."
atomPath: ecosystem
coordinate: "ecosystem · 1/base · 18d962d0"
contentUuid: "c1b2aab8-0059-5b23-b2b1-f72a4a25e580"
diamondUuid: "2be51851-43ef-8035-8ac0-bbab663bf112"
uuid: "18d962d0-870f-8b65-b3d0-0cd20598d1e6"
horo: 1
typography:
  partition: ecosystem
  bondDegree: 76
standards:
  - "EU-1958"
  - "Elton (1958) vs May, Will a Large Complex System be Stable? (1972) — diversity–stability debate"
  - "Lindeman, The Trophic-Dynamic Aspect of Ecology (1942) — ~10% energy per level"
  - "Tansley (1935) — coined \"ecosystem\": organisms plus environment as one system"
bindings: []
signatures:
  computationUuid: "8715cd1a-1f19-8c7a-9461-9231dc5310e5"
  stages:
    - stage: path
      stageUuid: "a45bd5cc-b586-84b5-9859-e0f78950a89c"
    - stage: trinity
      stageUuid: "18a13540-0013-8161-96c0-871a96728730"
    - stage: boundary
      stageUuid: "c1c22109-a193-8428-ba7b-0390ca49c64d"
    - stage: links
      stageUuid: "98ecb32e-3d92-8d71-9dd1-aa01bf283214"
    - stage: horo
      stageUuid: "16413b1a-edcc-813c-83aa-e8d7fb75a39b"
    - stage: seal
      stageUuid: "fea007df-fa7d-8066-880a-129771a399a6"
    - stage: uuid
      stageUuid: "ba83c097-7506-854a-9421-32b2863d3f90"
version: 2
---
# ecosystem — where decentralization and sustainability are one phenomenon

An **ecosystem** is a web of organisms and their flows in which **no one is in charge** and **nothing is wasted** — and the deep claim of this atom is that those two facts are **the same fact seen twice**. A food web is decentralized ([[decentralization]]): no manager sets the trophic levels; each organism follows local rules. It is sustainable ([[sustainability]]): matter cycles end to end — producers fix the sun's energy, roughly 10% passes up each level (Lindeman), and **decomposers close the loop**, returning every body to soil as the input of the next cycle ([[compost]]). Both hold for **one** underlying reason: the web is a set of **local agents posting balanced metabolic exchanges** — each eats ⊕ excretes, and every output is another's input ([[conservation]]). Global conservation and global order both **emerge from local balance**, with no coordinator holding either.

**The honest hedges.** The web is open and sun-driven, not a perpetual machine (a dissipative structure — see [[sustainability]]). And diversity does **not** automatically buy stability: Elton's intuition that more species ⇒ more stable was complicated by May (1972), who showed large complex systems can be *less* stable — what [[diversity]] reliably buys is **functional redundancy** (more independent ways to do a job), which is [[decentralization]]'s resilience, not a stability theorem. State it as redundancy, not magic.

**erpax is an ecosystem, and that is the proof of the [[law]].** It is a [[society]] of content-addressed [[agent]]s; each config is a balanced double-[[entry]] [[gate]]way ([[conservation]]); they [[merge]] with no central authority ([[decentralization]]); the books carry zero net [[entropy]] per cycle ([[sustainability]]). So nature is the *empirical demonstration* of the one law: **the closed-loop balance that lets a forest run for ten thousand years with no manager is the very same balance that makes a decentralized ledger tamper-proof.** Sustain-ability and decentral-ization are not two design goals to trade against each other — wire the local exchanges to balance and you get both for free, the way an ecosystem does. This atom **composes** [[conservation]] ⊕ [[sustainability]] ⊕ [[decentralization]] — the fusion is computed, not assumed.

## Sequence
`0, 3, 6, 9, 1, 2, 4, 8, 7, 5` — **9** (convergence / unity): the ecosystem is where the three principles resolve to one, the same merge-axis band as [[federation]].

## Standards
- **Tansley** (1935) — coined "ecosystem": organisms plus their physical environment as one system.
- **Lindeman**, *The Trophic-Dynamic Aspect of Ecology* (1942) — energy flow through trophic levels (~10% transfer); the quantitative food web.
- **Elton** (1958) vs **May**, *Will a Large Complex System be Stable?* (1972) — the diversity–stability debate, cited honestly on both sides.
- **Odum**, *Fundamentals of Ecology* — nutrient cycling and the closed material loop.

Composes [[sustainability]] · [[decentralization]] · [[conservation]] · [[diversity]] · [[network]] · [[merge]] · [[society]] · [[agent]] · [[entropy]] · [[balance]] · [[compost]] · soil · [[biomass]] · [[federation]] · [[whole]] · fractal · [[law]].

## Matter-twin

`src/ecosystem/index.ts` exports:

- `trophicTransfer(energyIn, efficiency?)` — Lindeman ~10% energy per trophic level.
- `trophicPyramid(base, levels, efficiency?)` — geometric energy array across levels.
- `type Web` — four-axis metabolic description of a food web.
- `ecosystemHealth(w: Web)` — the fusion function.

`ecosystemHealth` COMPOSES the four imported atoms directly — it calls `conserves` (from `@/conservation`), `isSustainable` (from `@/sustainability`), `nakamoto` (from `@/decentralization`), and `shannon` (from `@/diversity`). No logic from those atoms is re-implemented here; every field of the returned health report is the direct output of the corresponding imported function.

**Law — [[law]]: decentralization and sustainability are one fact — wire local exchanges to balance so every output is another's input, and both no-coordinator and no-waste emerge together; neither can be had without the other.**

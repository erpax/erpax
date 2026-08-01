---
name: wave
description: "Use when describing a batch of features added in one development breath before they are collided — a wave rides the horo sequence, raising entropy first so the later collide can DRY it back to the dense core."
atomPath: wave
coordinate: "wave · 4/weave · 65c5ae1a"
contentUuid: "51ebbc60-a886-5076-98b9-bcc03c01cc4d"
diamondUuid: "6808fbf3-f268-8268-9ad8-9e7e70f3f937"
uuid: "65c5ae1a-a14c-82d4-b738-8c53a6c6d138"
horo: 4
typography:
  partition: wave
  bondDegree: 130
standards:
  - "RFC 9562 §5.8 content-uuid + the horo digital-root ring"
bindings: []
signatures:
  computationUuid: "c8e8735e-d233-8b0e-a9d4-46a097e7bee0"
  stages:
    - stage: path
      stageUuid: "5844e4f3-8340-8b53-9573-4376c6b7f565"
    - stage: trinity
      stageUuid: "40a1a820-4723-8f6f-857b-0c6446ac3ac1"
    - stage: boundary
      stageUuid: "afb2f160-11d5-804b-9d50-4c9f373057b2"
    - stage: links
      stageUuid: "a7c8e844-549e-8876-bf35-f6f5168f5a1e"
    - stage: horo
      stageUuid: "2149f5e5-9c25-81fd-8f40-0b6d9a3db02c"
    - stage: seal
      stageUuid: "41997baf-90c7-8aee-b981-1bd22340a1dd"
    - stage: uuid
      stageUuid: "105ba0db-d7d7-8e64-b12a-8855403476eb"
version: 2
---
# wave — one breath of features, added then collided

THE UNIT. A development **wave** is one breath of [[feature]]s added to the corpus and (later) collided — the EXHALE that fans entropy out, before the inhale that DRYs it back. `wave(features)` describes one such batch: the features it carries, the [[uuid]] each is content-addressed to, and the [[entropy]] the batch borrows by adding atoms not-yet-reciprocal. A wave is never the collapse itself ([[collapse]] is deferred — never DRY anything while waving); it is the *charge* the collapse will later discharge ([[breath]]: never inhale without exhaling clean, never exhale without inhaling).

## Waves ride the horo ring (the development-horo)
Waves are not free-counted; they are **positions on one ring** — the [[horo]] sequence `[1,2,4,8,7,5,9]` (base · share · weave · crest · descent · round · unity). The **development-horo**: wave 1 lays the base, each later wave steps the next measure, and wave 7 (unity) is where the batch closes and the collide opens the next octave ([[merge]] at the merge-point). Two waves COMPOSE via `composeSteps` (product mod 9) and always land back on the ring — the framework is closed, so a development plan of waves can never escape the ring ([[sequence]] · [[flow]]). A wave whose position is off-ring is "escape"; back out to the last harmonic.

## What it computes
`wave(features)` folds a batch into one shape: its horo `step` (its position on the development ring), the per-feature content-[[uuid]] (each feature is a node it will add to the [[matrix]]), and the [[entropy]] it borrows (an added-but-not-yet-collided feature is unfused [[duality|disorder]] — the exhale raises slack the inhale will later seal). `composeWaves` reduces a planned sequence of waves to its resting [[horo]] position. A wave SEEN at unity (`isClosingWave`) is one ready to collide. The entropy a wave borrows is the live corpus slack ([[entropy]]) — read, never hand-asserted.

Matter-twin: `src/wave/index.ts` (`wave` · `composeWaves` · `isClosingWave` · `waveStep` · `waveEntropy`), composing `@/horo` (HORO_DIGITS, composeSteps), `@/entropy`, `@/uuid/matrix`, `@/trinity`, `@/duality`.

Composes [[horo]] · [[entropy]] · [[uuid]] · [[matrix]] · [[trinity]] · [[duality]] · [[merge]] · [[feature]] · [[breath]] · [[sequence]] · [[flow]] · [[collapse]] · [[development]].

@standard RFC 9562 §5.8 content-uuid + the horo digital-root ring

**Coordinated secure comms.** Development waves are one face; **coordination waves** (society [[breath]], [[confirm]] seal-and-push, [[chat]] cascade hops, [[team]] horo steps) ride inside [[team/comms]] — numbered hop (`waveId` = `depth`), `correlationUuid`, tenant+team scoped, receipted via `waveInSecureComms`. Never side-channel.

**Law — [[law]]: a wave is the EXHALE half of the breath — it ADDS features and so RAISES entropy on purpose; the collide is deferred and will DRY the wave back to the dense core. Never collapse while waving; never wave without later collapsing. The borrowed entropy is the charge the collide discharges back to zero. Coordination waves are in coordinated secure communications ([[team]] · [[realtime]] · [[receipt]] · [[chat]]).**

**Law — load all in self-balancing waves (min agent cost · max tampering cost).** `selfBalancingWaveLoad(items, opts)` partitions corpus/agent work into horo-phase waves `[1,2,4,8,7,5,9]` balanced by **comparable units (eb)** — entropy-bit mass at the horo imperial-ratio floor ([[readme]]/entropy · `pathComparableUnits`). Greedy LPT assigns heaviest items to the lightest wave so no single agent/node bears all cost. `waveDispatchCost` prices each wave via `manualDevelopmentPrice` (derive-record verify ≪ manual forge). `tamperCostForWave` compounds `doubleTorusCostLog2` + `coverageCostLog2` on the append-only receipt chain — → ∞ as waves complete. **Persist only after wave completes:** [[agent]]/[[agent]] gates `create`/`update` on `waveSessionVerdict` (every horo wave receipted, load balanced within 2×). `scheduleCorpusPathsInWaves` / `corpusPathWaveBatches` batch `followEveryPath` in waves (avoid OOM readme). Matter-twin: `src/wave/load.ts` · `session.ts` · `scheduler.ts`.

**Law — max work × max tampering cost.** `maxWorkTamperPolicy()` tunes batch concurrency, wave depth (7), receipt chain depth (`7 × CONFIRM_GATE_CHECKS`), and horo resting step (unity). `workTamperProduct(workUnits)` scores **work sealed × tamperCostLog2(coverage)** — agents maximise lawful throughput (`improve:watch` · `readme:waves`) while each sealed unit raises the tamper floor via prev-chained path ledger + wave receipts (`tamperCostForImproveReceipt`). Dual objective: more sealed work per session; each unit compounds attacker cost toward ∞ at full wave completion. Matter-twin: `src/wave/policy.ts`.

**Law — pass efficiency (a18ebd36):** with every pass skills and code become more efficient — `readme:waves` and `improve:watch` emit `efficiencySnapshot` + `efficiencyRatchet` via [[apply]]/efficiency (coordinate 4dbb5344); LOC/atom ↓ · context bytes ↓ · scan time ↓ · concentration ↓ · workTamperProduct ↑ or fail closed.

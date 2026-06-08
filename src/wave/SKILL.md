---
name: wave
description: "Use when describing a batch of features added in one development breath before they are collided — a wave rides the horo sequence, raising entropy first so the later collide can DRY it back to the dense core."
atomPath: wave
coordinate: wave · 2/share · 70f75fbd
contentUuid: "afbdb043-b5b7-5345-84c5-9efdc7f5dc71"
diamondUuid: "e1aa8123-d05d-8447-8eeb-9f4ea6068c1a"
uuid: "70f75fbd-5a00-8346-aab2-81bc09fecdb2"
horo: 2
bonds:
  in:
    - barrier
    - body
    - breath
    - chat
    - collapse
    - comms
    - confirm
    - decoherence
    - development
    - duality
    - entropy
    - feature
    - flow
    - horo
    - interference
    - law
    - leap
    - lung
    - matrix
    - merge
    - photon
    - quantum
    - realtime
    - receipt
    - sequence
    - spectrum
    - superposition
    - team
    - trinity
    - uncertainty
    - uuid
  out:
    - barrier
    - body
    - breath
    - chat
    - collapse
    - comms
    - confirm
    - decoherence
    - development
    - duality
    - entropy
    - feature
    - flow
    - horo
    - interference
    - law
    - leap
    - lung
    - matrix
    - merge
    - photon
    - quantum
    - realtime
    - receipt
    - sequence
    - spectrum
    - superposition
    - team
    - trinity
    - uncertainty
    - uuid
typography:
  partition: wave
  bondDegree: 95
  neighbors: []
standards:
  - "RFC 9562 §5.8 content-uuid + the horo digital-root ring"
  - "the entropy a wave borrows is read from the live matrix, never hand-asserted"
bindings: []
neighbors:
  wikilink:
    - agent
    - breath
    - chat
    - collapse
    - comms
    - confirm
    - development
    - duality
    - entropy
    - feature
    - flow
    - horo
    - law
    - matrix
    - merge
    - realtime
    - receipt
    - sequence
    - agent
    - team
    - trinity
    - uuid
  matrix:
    - barrier
    - body
    - breath
    - chat
    - collapse
    - comms
    - confirm
    - decoherence
    - development
    - duality
    - entropy
    - feature
    - flow
    - horo
    - interference
    - law
    - leap
    - lung
    - matrix
    - merge
    - photon
    - quantum
    - realtime
    - receipt
    - sequence
    - spectrum
    - superposition
    - team
    - trinity
    - uncertainty
    - uuid
  backlinks:
    - barrier
    - body
    - breath
    - chat
    - collapse
    - comms
    - confirm
    - decoherence
    - development
    - duality
    - entropy
    - feature
    - flow
    - horo
    - interference
    - law
    - leap
    - lung
    - matrix
    - merge
    - photon
    - quantum
    - realtime
    - receipt
    - sequence
    - spectrum
    - superposition
    - team
    - trinity
    - uncertainty
    - uuid
signatures:
  computationUuid: "2c4b24c0-56e0-819b-853e-0e642e70e37c"
  stages:
    - stage: path
      stageUuid: "5844e4f3-8340-8b53-9573-4376c6b7f565"
    - stage: trinity
      stageUuid: "40a1a820-4723-8f6f-857b-0c6446ac3ac1"
    - stage: boundary
      stageUuid: "0673d965-8486-8db0-9a92-8f07a445ff4f"
    - stage: links
      stageUuid: "0295c4d1-be23-833a-8f3d-385e45794ea3"
    - stage: horo
      stageUuid: "b4d73658-1f08-844d-9bdb-5a1c6946ba9f"
    - stage: seal
      stageUuid: "b1e46350-f963-824b-8151-7d4f7d5ded8c"
    - stage: uuid
      stageUuid: "46ff8532-6e98-8e8b-afdb-423428c2574a"
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

**Law — load all in self-balancing waves (min agent cost · max tampering cost).** `selfBalancingWaveLoad(items, opts)` partitions corpus/agent work into horo-phase waves `[1,2,4,8,7,5,9]` balanced by **comparable units (eb)** — entropy-bit mass at the horo imperial-ratio floor ([[readme/entropy]] · `pathComparableUnits`). Greedy LPT assigns heaviest items to the lightest wave so no single agent/node bears all cost. `waveDispatchCost` prices each wave via `manualDevelopmentPrice` (derive-record verify ≪ manual forge). `tamperCostForWave` compounds `doubleTorusCostLog2` + `coverageCostLog2` on the append-only receipt chain — → ∞ as waves complete. **Persist only after wave completes:** [[agent]]/[[agent]] gates `create`/`update` on `waveSessionVerdict` (every horo wave receipted, load balanced within 2×). `scheduleCorpusPathsInWaves` / `corpusPathWaveBatches` batch `followEveryPath` in waves (avoid OOM readme). Matter-twin: `src/wave/load.ts` · `session.ts` · `scheduler.ts`.

**Law — max work × max tampering cost.** `maxWorkTamperPolicy()` tunes batch concurrency, wave depth (7), receipt chain depth (`7 × CONFIRM_GATE_CHECKS`), and horo resting step (unity). `workTamperProduct(workUnits)` scores **work sealed × tamperCostLog2(coverage)** — agents maximise lawful throughput (`improve:watch` · `readme:waves`) while each sealed unit raises the tamper floor via prev-chained path ledger + wave receipts (`tamperCostForImproveReceipt`). Dual objective: more sealed work per session; each unit compounds attacker cost toward ∞ at full wave completion. Matter-twin: `src/wave/policy.ts`.

**Law — pass efficiency (a18ebd36):** with every pass skills and code become more efficient — `readme:waves` and `improve:watch` emit `efficiencySnapshot` + `efficiencyRatchet` via [[apply]]/efficiency (coordinate 4dbb5344); LOC/atom ↓ · context bytes ↓ · scan time ↓ · concentration ↓ · workTamperProduct ↑ or fail closed.

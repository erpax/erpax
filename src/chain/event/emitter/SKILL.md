---
name: emitter
description: "Use when an afterChange transition must fire a business-chain domain event — the wiring layer that maps a status change (or row-create) to one emitDomainEvent call so the chain registry's declared emits matches what actually fires."
atomPath: "chain/event/emitter"
coordinate: "chain/event/emitter · 7/descent · 2f5c8da7"
contentUuid: "1d1e4d09-63f7-5edd-bb4b-d55ecbacc172"
diamondUuid: "94673ffb-f878-8df7-a6b6-1cda5e2d147f"
uuid: "2f5c8da7-ea20-8616-9c80-e37c65717cca"
horo: 7
bonds:
  in:
    - audit
    - chain
    - event
    - law
  out:
    - audit
    - chain
    - event
    - law
typography:
  partition: chain
  bondDegree: 12
  neighbors: []
standards:
  - "SOX §404 internal-controls process-evidence"
bindings: []
neighbors:
  wikilink:
    - audit
    - chain
    - event
    - law
  matrix:
    - audit
    - chain
    - event
    - law
  backlinks:
    - audit
    - chain
    - event
    - law
signatures:
  computationUuid: "3d76e349-4e3e-8f16-90d4-ab563f2e0252"
  stages:
    - stage: path
      stageUuid: "91fff2a3-0d2a-8036-83a7-8126d5e36879"
    - stage: trinity
      stageUuid: "c285f85f-5be7-897e-84fa-4ec5504764f5"
    - stage: boundary
      stageUuid: "6907f9a3-a23b-8d32-bbe3-e70033b42bd7"
    - stage: links
      stageUuid: "2c23b722-a4e2-8e75-86ed-e04b129dccc4"
    - stage: horo
      stageUuid: "e2dc5d52-8453-8378-8a77-6cba6c8d9b1b"
    - stage: seal
      stageUuid: "3e9010de-8f57-8c20-9e0a-308f7cfab3a5"
    - stage: uuid
      stageUuid: "b6d7625f-a36a-81dd-8136-1aa4c2a6e6a1"
version: 2
---
# chain/event/emitter — declared emits become fired events

The wiring layer (Slice KKKK) that closes the gap between what a business [[chain]] *declares* it emits and what actually fires at runtime. `emitOnStatusTransition` builds an `afterChange` hook that fires exactly once on the entry edge of a target status (`prev.status !== toStatus === next.status`); `emitOnCreate` fires once on row-create. Both guard on tenant — no tenant, no [[event]] — then stamp a uuid envelope and hand it to the canonical emitter channel. The concrete `emitPrSubmitted` / `emitRfqAwarded` / `emitMilestoneAchieved` … exports are the declared chain wirings; the factory feeds the accounting collection factory's structured `emits:` declarations.

Matter-twin: `src/chain/event/emitter/index.ts` (`emitOnStatusTransition` ⊕ `emitOnCreate` ⊕ the per-chain concrete hooks, over `eventEmitter`). Composes [[event]] · [[chain]] · [[audit]].

**Law — [[law]]: a status-transition emit fires once and only on the entry edge (prev ≠ toStatus = next) and only with a tenant — so the chain registry's declared emits is exactly what fires, leaving one [[audit]] event per real transition.**

---
name: emitter
description: Use when an afterChange transition must fire a business-chain domain event — the wiring layer that maps a status change (or row-create) to one emitDomainEvent call so the chain registry's declared emits matches what actually fires.
---

# chain/event/emitter — declared emits become fired events

The wiring layer (Slice KKKK) that closes the gap between what a business [[chain]] *declares* it emits and what actually fires at runtime. `emitOnStatusTransition` builds an `afterChange` hook that fires exactly once on the entry edge of a target status (`prev.status !== toStatus === next.status`); `emitOnCreate` fires once on row-create. Both guard on tenant — no tenant, no [[event]] — then stamp a uuid envelope and hand it to the canonical emitter channel. The concrete `emitPrSubmitted` / `emitRfqAwarded` / `emitMilestoneAchieved` … exports are the declared chain wirings; the factory feeds the accounting collection factory's structured `emits:` declarations.

Matter-twin: `src/chain/event/emitter/index.ts` (`emitOnStatusTransition` ⊕ `emitOnCreate` ⊕ the per-chain concrete hooks, over `eventEmitter`). Composes [[event]] · [[chain]] · [[audit]].

**Law — [[law]]: a status-transition emit fires once and only on the entry edge (prev ≠ toStatus = next) and only with a tenant — so the chain registry's declared emits is exactly what fires, leaving one [[audit]] event per real transition.**

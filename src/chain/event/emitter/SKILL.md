---
name: emitter
description: "Use when an afterChange transition must fire a business-chain domain event — the wiring layer that maps a status change (or row-create) to one emitDomainEvent call so the chain registry's declared emits matches what actually fires."
atomPath: chain/event/emitter
coordinate: chain/event/emitter · 8/crest · 8bb68427
contentUuid: "22bfa44c-18ac-570a-bd65-51b957e29125"
diamondUuid: "3e1893a7-e773-8881-85a0-f2f0c2198e2b"
uuid: "8bb68427-89cb-87bf-80ec-b581bd95d5bc"
horo: 8
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
  - "ISO-19011:2018 audit-trail event-emit"
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
  computationUuid: "b5be3162-82a2-8341-9237-6f55c33117cf"
  stages:
    - stage: path
      stageUuid: "91fff2a3-0d2a-8036-83a7-8126d5e36879"
    - stage: trinity
      stageUuid: "c285f85f-5be7-897e-84fa-4ec5504764f5"
    - stage: boundary
      stageUuid: "d967355e-c9a6-8bbf-9ab2-d7c8c71abcd3"
    - stage: links
      stageUuid: "2c23b722-a4e2-8e75-86ed-e04b129dccc4"
    - stage: horo
      stageUuid: "452d7a47-e737-8b24-909c-5303b6178a84"
    - stage: seal
      stageUuid: "3e9010de-8f57-8c20-9e0a-308f7cfab3a5"
    - stage: uuid
      stageUuid: "6cb01620-f10d-81b7-938c-b0faecf5ab8e"
version: 2
---
# chain/event/emitter — declared emits become fired events

The wiring layer (Slice KKKK) that closes the gap between what a business [[chain]] *declares* it emits and what actually fires at runtime. `emitOnStatusTransition` builds an `afterChange` hook that fires exactly once on the entry edge of a target status (`prev.status !== toStatus === next.status`); `emitOnCreate` fires once on row-create. Both guard on tenant — no tenant, no [[event]] — then stamp a uuid envelope and hand it to the canonical emitter channel. The concrete `emitPrSubmitted` / `emitRfqAwarded` / `emitMilestoneAchieved` … exports are the declared chain wirings; the factory feeds the accounting collection factory's structured `emits:` declarations.

Matter-twin: `src/chain/event/emitter/index.ts` (`emitOnStatusTransition` ⊕ `emitOnCreate` ⊕ the per-chain concrete hooks, over `eventEmitter`). Composes [[event]] · [[chain]] · [[audit]].

**Law — [[law]]: a status-transition emit fires once and only on the entry edge (prev ≠ toStatus = next) and only with a tenant — so the chain registry's declared emits is exactly what fires, leaving one [[audit]] event per real transition.**

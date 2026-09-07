---
name: emitter
description: "Use when an afterChange transition must fire a business-chain domain event — the wiring layer that maps a status change (or row-create) to one emitDomainEvent call so the chain registry's declared emits matches what actually fires."
atomPath: "chain/event/emitter"
coordinate: "chain/event/emitter · 2/share · 9aef1026"
contentUuid: "d0b0e975-e236-51bd-8605-7c3253fd8bbe"
diamondUuid: "c9cde1bc-eb43-8a57-9cab-c45f813f2189"
uuid: "9aef1026-34c5-8ca2-b391-a53731bd2e89"
horo: 2
typography:
  partition: chain
  bondDegree: 12
standards:
  - "SOX §404 internal-controls process-evidence"
bindings: []
signatures:
  computationUuid: "0dc9651a-4410-8c55-95ac-8274ff6f7482"
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
      stageUuid: "bec66a3d-9097-8d9c-b193-9d4b52f1ec6c"
    - stage: seal
      stageUuid: "3e9010de-8f57-8c20-9e0a-308f7cfab3a5"
    - stage: uuid
      stageUuid: "ee825f07-7d07-853a-91b8-2b533e511b68"
version: 2
---
# chain/event/emitter — declared emits become fired events

The wiring layer (Slice KKKK) that closes the gap between what a business [[chain]] *declares* it emits and what actually fires at runtime. `emitOnStatusTransition` builds an `afterChange` hook that fires exactly once on the entry edge of a target status (`prev.status !== toStatus === next.status`); `emitOnCreate` fires once on row-create. Both guard on tenant — no tenant, no [[event]] — then stamp a uuid envelope and hand it to the canonical emitter channel. The concrete `emitPrSubmitted` / `emitRfqAwarded` / `emitMilestoneAchieved` … exports are the declared chain wirings; the factory feeds the accounting collection factory's structured `emits:` declarations.

Matter-twin: `src/chain/event/emitter/index.ts` (`emitOnStatusTransition` ⊕ `emitOnCreate` ⊕ the per-chain concrete hooks, over `eventEmitter`). Composes [[event]] · [[chain]] · [[audit]].

**Law — [[law]]: a status-transition emit fires once and only on the entry edge (prev ≠ toStatus = next) and only with a tenant — so the chain registry's declared emits is exactly what fires, leaving one [[audit]] event per real transition.**

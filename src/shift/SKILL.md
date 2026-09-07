---
name: shift
description: "Use when modeling a span of worked time — the per-actor-day labour unit a work order's produced minutes roll up into, and the authority it reads efficiency and wage back down from. The singular of the work-shifts aggregate."
atomPath: shift
coordinate: "shift · 2/share · 5a245907"
contentUuid: "23585381-4723-51dc-81ac-a8d06e8c1373"
diamondUuid: "2c63da30-8d68-8967-9f10-1e03ebc60ab5"
uuid: "5a245907-c945-8da6-898a-82b506bf1ac7"
horo: 2
typography:
  partition: shift
  bondDegree: 11
standards:
  - "ISO-22400-2"
  - "ISO-22400-2`"
bindings: []
signatures:
  computationUuid: "d474dd78-2cb6-8161-9315-8edf3ad535f3"
  stages:
    - stage: path
      stageUuid: "46782318-acdc-83f6-99bb-f59e51d66ef5"
    - stage: trinity
      stageUuid: "eb1baac6-7eb9-8fde-95c2-d3fa5bd0b02d"
    - stage: boundary
      stageUuid: "240d21e2-2fd0-8235-b826-880918d85851"
    - stage: links
      stageUuid: "2b0b106d-12c8-8f6c-a15a-fd1b382f9a58"
    - stage: horo
      stageUuid: "066ee2ff-308c-89e2-a2b6-672acbc1e239"
    - stage: seal
      stageUuid: "03d0e843-1973-8528-bfd3-afdbcf0fccaf"
    - stage: uuid
      stageUuid: "e63c83dd-68eb-8574-b2e8-fb0e2581ca96"
version: 2
---
# shift

Use when modeling a span of worked time — the per-actor-day labour unit a work order's produced minutes roll up into, and the authority it reads efficiency and wage back down from. The singular of the work-shifts aggregate.

**A shift is one `(actor, day)` of presence, the model the [[shifts]] collection stores.** It is the [[accounting]] authority for labour: a [[work/orders|work order]] does not compute its own efficiency — it contributes produced minutes UP into the shift and reads `efficiencyPercent` back DOWN, the same direction a ledger account is the authority its postings sum into. The shift carries presence vs produced minutes and the `⌊produced·100/presence⌋` [[efficiency]], keyed by the [[employee]] (the actor) and run by a [[work/centers|work-centre]]. Grounded in 20 years of etrima production (`work_shifts`, 376k rows).

Composes: [[shifts]] · [[work/shifts]] · [[employee]] · [[accounting]] · [[efficiency]] · [[time]] · [[attendance]] · [[pay]] · [[horo]].

**Law — [[law]]: a shift is one `(actor, day)` of presence and the [[accounting]] authority for labour — produced minutes roll UP into it, [[efficiency]] (`⌊produced·100/presence⌋`) and wage read back DOWN, the same direction a ledger account is the authority its postings sum into.**

## Standards

<!-- standards banners (the 7-dim instrument reads SKILL.md; these atoms declare these standards in this section) -->
- `@standard ISO-22400-2`

- ISO-22400-2 (manufacturing operations KPIs — efficiency, presence/produced time)


---
name: shift
description: "Use when modeling a span of worked time — the per-actor-day labour unit a work order's produced minutes roll up into, and the authority it reads efficiency and wage back down from. The singular of the work-shifts aggregate."
atomPath: shift
coordinate: "shift · 1/base · 3d125853"
contentUuid: "67bf7eee-1334-5895-9449-dac6c14c2679"
diamondUuid: "708df799-8e33-82b7-af89-976b4a4e74a2"
uuid: "3d125853-5c18-8da9-90f1-0bdba9885739"
horo: 1
typography:
  partition: shift
  bondDegree: 11
standards:
  - "ISO-22400-2"
  - "ISO-22400-2`"
bindings: []
signatures:
  computationUuid: "7dd0298b-5b37-83ca-892a-b31b7e1643cb"
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
      stageUuid: "af169809-1032-827c-a301-7dcf8149d0ea"
    - stage: seal
      stageUuid: "03d0e843-1973-8528-bfd3-afdbcf0fccaf"
    - stage: uuid
      stageUuid: "e74b4d08-941d-81a2-bfe4-c47e8744455c"
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


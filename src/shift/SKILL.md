---
name: shift
description: "Use when modeling a span of worked time — the per-actor-day labour unit a work order's produced minutes roll up into, and the authority it reads efficiency and wage back down from. The singular of the work-shifts aggregate."
atomPath: shift
coordinate: "shift · 8/crest · 6b60d6da"
contentUuid: "fc4b78d1-6e77-505d-bd48-cb369aa50104"
diamondUuid: "5350ca42-87ba-83ad-a1d5-2c791be79344"
uuid: "6b60d6da-6ce3-866a-a0b4-1df2410a934e"
horo: 8
typography:
  partition: shift
  bondDegree: 11
standards:
  - "ISO-22400-2"
  - "ISO-22400-2`"
bindings: []
signatures:
  computationUuid: "e0811427-3b72-806d-9b43-97293067e1fc"
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
      stageUuid: "c6449cf5-76d9-8f2b-911d-d7d6e6c89bf6"
    - stage: seal
      stageUuid: "03d0e843-1973-8528-bfd3-afdbcf0fccaf"
    - stage: uuid
      stageUuid: "4ec732ce-7422-88c5-9fc0-c0847cd8016e"
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


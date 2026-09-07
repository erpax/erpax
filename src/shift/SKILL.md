---
name: shift
description: "Use when modeling a span of worked time — the per-actor-day labour unit a work order's produced minutes roll up into, and the authority it reads efficiency and wage back down from. The singular of the work-shifts aggregate."
atomPath: shift
coordinate: "shift · 5/round · c32234f7"
contentUuid: "cb3070d4-ff43-556b-8813-d930a39b5751"
diamondUuid: "379b1bba-3a26-8786-9a8b-a63dcea9b25e"
uuid: "c32234f7-1e2a-8924-8a13-358a243b695e"
horo: 5
typography:
  partition: shift
  bondDegree: 34
standards:
  - "ISO-22400-2"
  - "ISO-22400-2`"
bindings: []
signatures:
  computationUuid: "835ea57b-4829-89b0-9066-53a8df9ebcb8"
  stages:
    - stage: path
      stageUuid: "46782318-acdc-83f6-99bb-f59e51d66ef5"
    - stage: trinity
      stageUuid: "eb1baac6-7eb9-8fde-95c2-d3fa5bd0b02d"
    - stage: boundary
      stageUuid: "ff57c9dd-83d6-8d24-b007-c0344c421fbd"
    - stage: links
      stageUuid: "e1e50b69-04cd-844d-bdcd-96424ab9a27d"
    - stage: horo
      stageUuid: "8e2fa48b-2589-8dab-bddb-aabe53929b7d"
    - stage: seal
      stageUuid: "03d0e843-1973-8528-bfd3-afdbcf0fccaf"
    - stage: uuid
      stageUuid: "4910dcba-b924-8093-adf7-69044e0ca158"
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


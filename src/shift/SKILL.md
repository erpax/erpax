---
name: shift
description: "Use when modeling a span of worked time — the per-actor-day labour unit a work order's produced minutes roll up into, and the authority it reads efficiency and wage back down from. The singular of the work-shifts aggregate."
atomPath: shift
coordinate: "shift · 1/base · 539b3f1d"
contentUuid: "f1686b68-0ac9-594d-b778-29e7e415defd"
diamondUuid: "575df8e8-ad1f-81a6-9d24-298f947c02f3"
uuid: "539b3f1d-5d92-8899-9114-fc78cd4cb488"
horo: 1
typography:
  partition: shift
  bondDegree: 34
standards:
  - "ISO-22400-2"
  - "ISO-22400-2`"
bindings: []
signatures:
  computationUuid: "1ff021d5-d717-85a1-a93e-54cabc2a1f7a"
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
      stageUuid: "aede931b-11e4-8d65-80c2-ebb59e54c559"
    - stage: seal
      stageUuid: "03d0e843-1973-8528-bfd3-afdbcf0fccaf"
    - stage: uuid
      stageUuid: "b4e70940-5b27-84c3-ab93-8081646694c8"
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


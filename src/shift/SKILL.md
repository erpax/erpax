---
name: shift
description: "Use when modeling a span of worked time — the per-actor-day labour unit a work order's produced minutes roll up into, and the authority it reads efficiency and wage back down from. The singular of the work-shifts aggregate."
atomPath: shift
coordinate: shift · 2/share · 2ea0a3ad
contentUuid: "2214ae4a-a7fb-56e4-a136-544321209ddf"
diamondUuid: "af6813cb-2b81-86b3-8850-fa0481b4bd17"
uuid: "2ea0a3ad-97ee-802a-867a-42ed9bac7224"
horo: 2
bonds:
  in:
    - accounting
    - attendance
    - centers
    - efficiency
    - employee
    - horo
    - law
    - orders
    - pay
    - shifts
    - time
  out:
    - accounting
    - attendance
    - centers
    - efficiency
    - employee
    - horo
    - law
    - orders
    - pay
    - shifts
    - time
typography:
  partition: shift
  bondDegree: 34
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - accounting
    - attendance
    - centers
    - efficiency
    - employee
    - horo
    - law
    - orders
    - pay
    - shifts
    - time
  matrix:
    - accounting
    - attendance
    - centers
    - efficiency
    - employee
    - horo
    - law
    - orders
    - pay
    - shifts
    - time
  backlinks:
    - accounting
    - attendance
    - centers
    - efficiency
    - employee
    - horo
    - law
    - orders
    - pay
    - shifts
    - time
signatures:
  computationUuid: "4e9d26eb-748c-80cb-bc21-f76f2dffc524"
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
      stageUuid: "4503e1c2-830a-8303-8886-678b0569fb6a"
    - stage: seal
      stageUuid: "05da6bc4-4829-87c9-ba44-2b819b4aa13a"
    - stage: uuid
      stageUuid: "4637e9ea-c1a4-80d9-b103-aa1de276ebcc"
version: 2
---
# shift

Use when modeling a span of worked time — the per-actor-day labour unit a work order's produced minutes roll up into, and the authority it reads efficiency and wage back down from. The singular of the work-shifts aggregate.

**A shift is one `(actor, day)` of presence, the model the [[shifts]] collection stores.** It is the [[accounting]] authority for labour: a [[work/orders|work order]] does not compute its own efficiency — it contributes produced minutes UP into the shift and reads `efficiencyPercent` back DOWN, the same direction a ledger account is the authority its postings sum into. The shift carries presence vs produced minutes and the `⌊produced·100/presence⌋` [[efficiency]], keyed by the [[employee]] (the actor) and run by a [[work/centers|work-centre]]. Grounded in 20 years of etrima production (`work_shifts`, 376k rows).

Composes: [[shifts]] · [[work/shifts]] · [[employee]] · [[accounting]] · [[efficiency]] · [[time]] · [[attendance]] · [[pay]] · [[horo]].

**Law — [[law]]: a shift is one `(actor, day)` of presence and the [[accounting]] authority for labour — produced minutes roll UP into it, [[efficiency]] (`⌊produced·100/presence⌋`) and wage read back DOWN, the same direction a ledger account is the authority its postings sum into.**

## Standards
- ISO-22400-2 (manufacturing operations KPIs — efficiency, presence/produced time)

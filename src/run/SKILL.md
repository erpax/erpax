---
name: run
description: "Use when modeling one execution of a batch process — a payment run, payroll run, or scheduled job run — the singular of the runs collection; one bounded pass that gathers a set, authorises it, executes, and reconciles on a lifecycle."
atomPath: run
coordinate: "run · 7/descent · a35cefb6"
contentUuid: "b89d60c4-e96e-52fb-aa0e-a68edb2d99e6"
diamondUuid: "a191cead-fc6f-8da2-b916-6181844cf08c"
uuid: "a35cefb6-7089-8d8f-90ad-d461f5796374"
horo: 7
typography:
  partition: run
  bondDegree: 33
standards:
  - "ISO-20022`"
  - "RFC-6750"
bindings: []
signatures:
  computationUuid: "cc04c52b-b301-8be4-8ac8-e929b5d2265c"
  stages:
    - stage: path
      stageUuid: "8e364e5e-81f5-8938-96d6-4f9e482cd0bd"
    - stage: trinity
      stageUuid: "fc7a640d-d21f-8f6e-a0b7-a82c969314ad"
    - stage: boundary
      stageUuid: "a9a419ef-41ee-8b78-97f6-862fe956cf08"
    - stage: links
      stageUuid: "c89bfab6-3b63-8c7c-88d5-6aea42f05d96"
    - stage: horo
      stageUuid: "44066fa5-7a9e-8b37-9574-27652fa9b9e7"
    - stage: seal
      stageUuid: "9935d688-d989-80db-83ca-4db6555c1032"
    - stage: uuid
      stageUuid: "69affe51-f533-838f-a5ef-cceb9748bd41"
version: 2
---
# run

A **run** is one bounded execution of a batch process — the singular model of the `runs` collection. A [[payment]] run (ISO 20022 pain.001/pain.008), a payroll run, a [[schedule|scheduled]] [[jobs|job]] run: each gathers a set, authorises it, executes once, and reconciles, moving along a draft → approved → executed → settled lifecycle ([[horo]]). One run is the unit a [[batch]] is initiated and accounted as ([[entry]] · [[balance]]).

The run is also the verb the corpus turns on itself — [[dev|run/dev]] launches the app to see a change work; a job run advances the [[society]] one gate-verified step. Same shape: a bounded pass with a precondition, an effect, and a reconciled result.

Composes: [[batch]] · [[payment]] · [[schedule]] · [[jobs]] · [[entry]] · [[balance]] · [[horo]].

## Standards

<!-- standards banners (the 7-dim instrument reads SKILL.md; these atoms declare these standards in this section) -->
- `@standard ISO-20022`

- ISO 20022 (pain.001 credit-transfer / pain.008 direct-debit batch initiation)

**Law — [[law]]: one run is one bounded pass of a batch process — gather a set, authorise, execute once, reconcile — moving along a draft → approved → executed → settled lifecycle ([[horo]]).**

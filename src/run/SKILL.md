---
name: run
description: "Use when modeling one execution of a batch process — a payment run, payroll run, or scheduled job run — the singular of the runs collection; one bounded pass that gathers a set, authorises it, executes, and reconciles on a lifecycle."
atomPath: run
coordinate: "run · 7/descent · 5350035b"
contentUuid: "3cca4ca3-ac68-5d9f-b9a8-c64eed58dfb6"
diamondUuid: "c985b616-9f47-8d18-8bbd-3d7c2c6c93ba"
uuid: "5350035b-024b-8661-9a83-43704bbddd26"
horo: 7
typography:
  partition: run
  bondDegree: 42
standards:
  - "ISO-20022`"
bindings: []
signatures:
  computationUuid: "f3cc6109-3804-8b9b-9b03-ea58f1611209"
  stages:
    - stage: path
      stageUuid: "8e364e5e-81f5-8938-96d6-4f9e482cd0bd"
    - stage: trinity
      stageUuid: "165e7ba0-506c-8532-8cfa-c1f6a63ab018"
    - stage: boundary
      stageUuid: "b7900c4a-bb38-84e3-9ba5-d4672863c401"
    - stage: links
      stageUuid: "a737cef1-4dc8-8163-a11f-afed648a0881"
    - stage: horo
      stageUuid: "3b6190f4-5f62-8309-9ddb-40b011f25724"
    - stage: seal
      stageUuid: "9935d688-d989-80db-83ca-4db6555c1032"
    - stage: uuid
      stageUuid: "b187c6ff-e867-83e7-8885-6d55c0611afc"
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

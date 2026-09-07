---
name: run
description: "Use when modeling one execution of a batch process — a payment run, payroll run, or scheduled job run — the singular of the runs collection; one bounded pass that gathers a set, authorises it, executes, and reconciles on a lifecycle."
atomPath: run
coordinate: "run · 2/share · 867ae304"
contentUuid: "439bebba-957b-5468-b419-e0d1fe24e666"
diamondUuid: "863221b0-8a45-86b2-8147-170cd62736ba"
uuid: "867ae304-c358-8b55-a633-e9c44080c914"
horo: 2
typography:
  partition: run
  bondDegree: 33
standards:
  - "ISO-20022`"
  - "RFC-6750"
bindings: []
signatures:
  computationUuid: "80fd4e39-7782-8eff-a4f3-4c0e356e4634"
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
      stageUuid: "291338b2-0489-88d6-bf23-5236e9fb7f76"
    - stage: seal
      stageUuid: "9935d688-d989-80db-83ca-4db6555c1032"
    - stage: uuid
      stageUuid: "3fc7b302-76b2-8b29-90d0-6c8c6d4e1afb"
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

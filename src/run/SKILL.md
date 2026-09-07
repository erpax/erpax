---
name: run
description: "Use when modeling one execution of a batch process — a payment run, payroll run, or scheduled job run — the singular of the runs collection; one bounded pass that gathers a set, authorises it, executes, and reconciles on a lifecycle."
atomPath: run
coordinate: "run · 1/base · 56dee1d8"
contentUuid: "16a59db7-226a-5dff-8d4c-0bbec145278d"
diamondUuid: "83aa7541-42ca-83a6-94bc-64e625a14568"
uuid: "56dee1d8-fc13-89aa-9f6e-ee59dc4d6846"
horo: 1
typography:
  partition: run
  bondDegree: 51
standards:
  - "ISO-20022`"
  - "RFC-6750"
bindings: []
signatures:
  computationUuid: "d0807675-6257-835a-b02b-283c7c30dbe6"
  stages:
    - stage: path
      stageUuid: "8e364e5e-81f5-8938-96d6-4f9e482cd0bd"
    - stage: trinity
      stageUuid: "fc7a640d-d21f-8f6e-a0b7-a82c969314ad"
    - stage: boundary
      stageUuid: "a9a419ef-41ee-8b78-97f6-862fe956cf08"
    - stage: links
      stageUuid: "a737cef1-4dc8-8163-a11f-afed648a0881"
    - stage: horo
      stageUuid: "f23bce2f-74ac-8d2b-8f51-d019fdf1dc10"
    - stage: seal
      stageUuid: "9935d688-d989-80db-83ca-4db6555c1032"
    - stage: uuid
      stageUuid: "f9692d79-c174-83ac-be55-251831aa2bb1"
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

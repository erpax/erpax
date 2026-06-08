---
name: run
description: "Use when modeling one execution of a batch process — a payment run, payroll run, or scheduled job run — the singular of the runs collection; one bounded pass that gathers a set, authorises it, executes, and reconciles on a lifecycle."
atomPath: run
coordinate: run · 7/descent · 7fd24f31
contentUuid: "b8d40f69-aab4-5b88-8758-ece1aea8eff5"
diamondUuid: "8a205e81-3c62-8d40-b59c-285f08df0145"
uuid: "7fd24f31-9d73-85ce-80bd-a135c9c4f70f"
horo: 7
bonds:
  in:
    - balance
    - batch
    - dev
    - entry
    - horo
    - jobs
    - law
    - payment
    - schedule
    - society
  out:
    - balance
    - batch
    - dev
    - entry
    - horo
    - jobs
    - law
    - payment
    - schedule
    - society
typography:
  partition: run
  bondDegree: 30
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - balance
    - batch
    - dev
    - entry
    - horo
    - jobs
    - law
    - payment
    - schedule
    - society
  matrix:
    - balance
    - batch
    - dev
    - entry
    - horo
    - jobs
    - law
    - payment
    - schedule
    - society
  backlinks:
    - balance
    - batch
    - dev
    - entry
    - horo
    - jobs
    - law
    - payment
    - schedule
    - society
signatures:
  computationUuid: "7e817a1c-f934-8edd-9a68-cdd12e6ef44a"
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
      stageUuid: "6d0e947b-12e7-8d4a-bef1-3e90beb9a61f"
    - stage: seal
      stageUuid: "815b2716-b399-8dbb-afc5-d20649749ce4"
    - stage: uuid
      stageUuid: "2b2019e6-dc09-88bf-875a-ad4d2bd92429"
version: 2
---
# run

A **run** is one bounded execution of a batch process — the singular model of the `runs` collection. A [[payment]] run (ISO 20022 pain.001/pain.008), a payroll run, a [[schedule|scheduled]] [[jobs|job]] run: each gathers a set, authorises it, executes once, and reconciles, moving along a draft → approved → executed → settled lifecycle ([[horo]]). One run is the unit a [[batch]] is initiated and accounted as ([[entry]] · [[balance]]).

The run is also the verb the corpus turns on itself — [[dev|run/dev]] launches the app to see a change work; a job run advances the [[society]] one gate-verified step. Same shape: a bounded pass with a precondition, an effect, and a reconciled result.

Composes: [[batch]] · [[payment]] · [[schedule]] · [[jobs]] · [[entry]] · [[balance]] · [[horo]].

## Standards
- ISO 20022 (pain.001 credit-transfer / pain.008 direct-debit batch initiation)

**Law — [[law]]: one run is one bounded pass of a batch process — gather a set, authorise, execute once, reconcile — moving along a draft → approved → executed → settled lifecycle ([[horo]]).**

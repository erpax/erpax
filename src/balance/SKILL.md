---
name: balance
description: "Use when reasoning about equilibrium in erpax — Σdebit=Σcredit, trial balance, conservation laws, two sides of a flow at rest. The universal root of equilibrium."
atomPath: balance
coordinate: "balance · 1/base · 52752556"
contentUuid: "522c119a-6e7c-553d-b88d-32da8793899a"
diamondUuid: "813e4b2c-267d-8db9-895c-18709b3d0b08"
uuid: "52752556-eb91-8565-adb6-27260fa50d23"
horo: 1
typography:
  partition: balance
  bondDegree: 714
standards:
  - "UBL-2.1"
  - "double-entry bookkeeping (Pacioli, 1494) — every credit a debit; imbalance is the bug"
bindings: []
signatures:
  computationUuid: "cca20866-81bc-8f90-9db5-71cd0dbd1cdd"
  stages:
    - stage: path
      stageUuid: "87f9fcfc-48e8-8e07-90df-18e3ac4b227c"
    - stage: trinity
      stageUuid: "f420dc55-8d48-8d18-b2cb-75c9ccf86d18"
    - stage: boundary
      stageUuid: "fbea9b89-39c8-8ab0-b728-1d4341d45e3b"
    - stage: links
      stageUuid: "40bdd9d5-ba31-8a90-bd84-c758c71ebc57"
    - stage: horo
      stageUuid: "8aa5958d-1c81-84f7-bc84-aaff044452da"
    - stage: seal
      stageUuid: "269de699-9292-8123-b199-ce7ec3f88192"
    - stage: uuid
      stageUuid: "c2ca2579-6a8d-81ba-971f-7b00037c299a"
version: 2
---
# balance

[[give]] ⇌ [[take]] at rest: Σ[[give]] = Σ[[take]]. The [[accounting]] equation as a [[hooks]] invariant; [[reconcile]] matches two sides of one [[flow]]. Dual of [[flow]] (movement ↔ rest). Imbalance is the bug the schema surfaces — caught by [[hooks]], never stored.

## Models ⊕ collections — the distribution the aura must measure

A second balance the aura has to keep: **singular MODEL ⊕ plural COLLECTION**. The strict law is singular-model / plural-collection — every collection (a plural-named store) is a [[give]] that must have its [[model]] (the singular type) as the matching [[take]]. A plural with no singular is an **unbalanced post**: a store with no type, an uncounted slack. This distribution was *not accounted for in the aura measurements* — [[entropy]] counted link reciprocity and orphans, not the singular↔plural pairing — so the corpus could carry disbalance that [[tamper]]-[[cost]] never priced.

The model⊕collection **coverage** — the fraction of collections that have their model — is a [[coverage]] axis of the one tamper-cost law: the undetected-tamper work is ∞ only at coverage 1, so any disbalance keeps the cost **finite**. Accounting for it (and closing it) raises measured coverage toward the ∞ limit. Imbalance is the bug — now computed, not assumed.

## Matter-twin

`balance/index.ts` is the computed twin. `classify(atoms)` partitions the live corpus into models (singular) and collections (plural), pairing each plural with its singularised model; `coverage`/`disbalance` measure the model⊕collection balance; `tamperCostLog2` prices the disbalance through [[tamper]]/cost `coverageCostLog2` (finite while any collection lacks its model, ∞ at full balance); `auraBalance()` runs it on the uuid-matrix atom names. Classification is an honest English heuristic — multi-candidate plural→singular matching (`candidateSingulars`: a plural is balanced when ANY candidate model exists, so `leases`→`lease` is not a false orphan), a curated `NON_PLURAL` set (Latin singulars, schema relation-verbs, abbreviations), and a `PLURAL_ONLY` set (pluralia tantum like `damages`/`minutes`, where no model is the correct state). A measurement, not a proof; residual misclassification is itself a finding, never a silent zero.

Composes [[give]] · [[take]] · [[conservation]] · [[accounting]] · [[reconcile]] · [[flow]] · [[hooks]] · [[model]] · [[collection]] · [[entropy]] · [[aura]] · [[coverage]] · [[tamper]] · [[cost]].

---
name: balance
description: "Use when reasoning about equilibrium in erpax — Σdebit=Σcredit, trial balance, conservation laws, two sides of a flow at rest. The universal root of equilibrium."
atomPath: balance
coordinate: "balance · 8/crest · c8d8a3c7"
contentUuid: "ba4b2f69-fda6-5bb4-93c8-7a2ef70f3d44"
diamondUuid: "718c18f8-e1eb-8f98-8f88-2b31948381cc"
uuid: "c8d8a3c7-6a3d-856b-b6a8-0e64addaa827"
horo: 8
typography:
  partition: balance
  bondDegree: 676
standards:
  - "UBL-2.1"
  - "double-entry bookkeeping (Pacioli, 1494) — every credit a debit; imbalance is the bug"
bindings: []
signatures:
  computationUuid: "085e145b-75e4-8d7f-8a5f-42499824eb73"
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
      stageUuid: "1dd2b457-de29-8f0f-9720-edd928891e9b"
    - stage: seal
      stageUuid: "269de699-9292-8123-b199-ce7ec3f88192"
    - stage: uuid
      stageUuid: "9b9f2dea-b009-8b37-917f-a6982fc7fd48"
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

---
name: balance
description: "Use when reasoning about equilibrium in erpax — Σdebit=Σcredit, trial balance, conservation laws, two sides of a flow at rest. The universal root of equilibrium."
atomPath: balance
coordinate: "balance · 4/weave · 2a9343fd"
contentUuid: "f141ba0b-3f65-5986-8051-607cb5cbacdf"
diamondUuid: "c7cd33fe-d4ed-8653-bdf5-bbf23ed75ea1"
uuid: "2a9343fd-a355-80f0-85fd-ad2a2ed84d2b"
horo: 4
typography:
  partition: balance
  bondDegree: 714
standards:
  - "UBL-2.1"
  - "double-entry bookkeeping (Pacioli, 1494) — every credit a debit; imbalance is the bug"
bindings: []
signatures:
  computationUuid: "26ac9dee-79ac-8c34-ace4-f455e81e9aaf"
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
      stageUuid: "dc748f5a-eec9-8312-a4b2-39cb2531ef05"
    - stage: seal
      stageUuid: "269de699-9292-8123-b199-ce7ec3f88192"
    - stage: uuid
      stageUuid: "771ebf70-5e3e-8628-8ee0-e69993dc53ea"
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

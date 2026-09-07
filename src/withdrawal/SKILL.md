---
name: withdrawal
description: "Use when a treated animal's produce cannot yet be sold — the withdrawal period: the mandatory days after a drug/vaccine/treatment before milk/meat/eggs are residue-safe to market. A food-safety embargo that gates saleability (the accountable cannot-sell-yet state); the livestock twin of a quarantine or lock-up period."
atomPath: withdrawal
coordinate: "withdrawal · 1/base · 99d24595"
contentUuid: "0fc615e6-f6b8-5ad1-86fe-d28ac51d8f0d"
diamondUuid: "4da8ea7b-9f9a-8303-9e3a-8fb65f81b508"
uuid: "99d24595-4b60-80f1-8381-1d46c6ad6b3a"
horo: 1
typography:
  partition: withdrawal
  bondDegree: 33
standards: []
bindings: []
signatures:
  computationUuid: "908a2b5a-68aa-8d42-a2a9-23eef0ac6ccd"
  stages:
    - stage: path
      stageUuid: "fb378487-c542-8a29-b37a-d50dd851d558"
    - stage: trinity
      stageUuid: "8e6904c5-de77-8ad0-961a-fb06cfef28f7"
    - stage: boundary
      stageUuid: "c5d8be87-1167-8ad6-8ecd-f11a4da81490"
    - stage: links
      stageUuid: "c95d2c75-7825-8739-8ec6-facceb96ccb6"
    - stage: horo
      stageUuid: "52e3d0b0-e2ed-815f-9a40-6afb3c932655"
    - stage: seal
      stageUuid: "17bca5ce-ffb8-8b6d-937d-fda76d431839"
    - stage: uuid
      stageUuid: "279ecf87-8410-8ff5-989f-b03eda5effbd"
version: 2
---
# withdrawal — the residue-safety embargo that gates saleability

A **withdrawal period** is the mandatory interval after an [[animal]] receives a drug, vaccine, or treatment before its **milk, meat, or eggs are residue-safe to sell**. Until it clears, the produce is embargoed — a food-safety gate on saleability (the cannot-sell-yet state), recorded against the animal's [[health]] event. Selling inside the window is a residue violation (a [[risk]] and a [[certification|compliance]] breach).

Withdrawal is the livestock twin of a **quarantine / lock-up [[period]]**: an enforced delay between an event and the moment value may flow ([[lactation]] milk held, a finished animal not yet shippable). It composes [[health]] (the treatment) with [[period]] (the embargo) and the [[grade]]/saleable status — the produce is accountable only once the clock clears.

## Standards
- USDA FSIS / FDA (drug withdrawal times, residue avoidance); Beef Quality Assurance (BQA)
- WOAH (veterinary drug residues); EU MRL (maximum residue limits)

Composes [[animal]] · [[livestock]] · [[health]] · [[period]] · [[risk]] · [[grade]] · [[lactation]] · [[harvest]] · [[certification]].

**Law — [[law]]: a withdrawal period is the residue-safety embargo that gates saleability — the mandatory days after a treatment before an [[animal]]'s produce is residue-safe to sell; produce is accountable only once the clock clears.**

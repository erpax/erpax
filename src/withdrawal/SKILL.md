---
name: withdrawal
description: "Use when a treated animal's produce cannot yet be sold — the withdrawal period: the mandatory days after a drug/vaccine/treatment before milk/meat/eggs are residue-safe to market. A food-safety embargo that gates saleability (the accountable cannot-sell-yet state); the livestock twin of a quarantine or lock-up period."
atomPath: withdrawal
coordinate: "withdrawal · 5/round · f47f3bf2"
contentUuid: "455d6ea8-5a9a-55ea-8e44-4a252e390776"
diamondUuid: "5457447b-867b-893f-aac1-38f493eddd00"
uuid: "f47f3bf2-40c2-82db-b90a-f3ac1d4930c6"
horo: 5
typography:
  partition: withdrawal
  bondDegree: 33
standards: []
bindings: []
signatures:
  computationUuid: "c94d351a-ffc3-8f77-bb1c-01bf584f76d0"
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
      stageUuid: "64bfe8c7-984c-8b9a-87a8-588da8cc716d"
    - stage: seal
      stageUuid: "17bca5ce-ffb8-8b6d-937d-fda76d431839"
    - stage: uuid
      stageUuid: "bfe5f2fb-33a5-8b05-88ce-8c8315703d1c"
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

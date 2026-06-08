---
name: withdrawal
description: "Use when a treated animal's produce cannot yet be sold — the withdrawal period: the mandatory days after a drug/vaccine/treatment before milk/meat/eggs are residue-safe to market. A food-safety embargo that gates saleability (the accountable cannot-sell-yet state); the livestock twin of a quarantine or lock-up period."
atomPath: withdrawal
coordinate: withdrawal · 8/crest · f3ebd9fa
contentUuid: "fa0224bc-61f8-5315-a54f-48fee0561090"
diamondUuid: "7bbca916-c2d0-8804-965d-11c3a02759be"
uuid: "f3ebd9fa-8805-8879-909b-33b8d2fd1e57"
horo: 8
bonds:
  in:
    - animal
    - certification
    - grade
    - harvest
    - health
    - lactation
    - law
    - livestock
    - period
    - risk
  out:
    - animal
    - certification
    - grade
    - harvest
    - health
    - lactation
    - law
    - livestock
    - period
    - risk
typography:
  partition: withdrawal
  bondDegree: 33
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - animal
    - certification
    - grade
    - harvest
    - health
    - lactation
    - law
    - livestock
    - period
    - risk
  matrix:
    - animal
    - certification
    - grade
    - harvest
    - health
    - lactation
    - law
    - livestock
    - period
    - risk
  backlinks:
    - animal
    - certification
    - grade
    - harvest
    - health
    - lactation
    - law
    - livestock
    - period
    - risk
signatures:
  computationUuid: "b7aa94c2-5b16-886c-ab63-7d1802758846"
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
      stageUuid: "6f63dc54-5d1a-858b-8d48-8547b69b9cb9"
    - stage: seal
      stageUuid: "a8babbcc-8166-8578-8f27-6929cdc79061"
    - stage: uuid
      stageUuid: "5860d3e6-fce1-89a9-ae84-56b0f49b1a5b"
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

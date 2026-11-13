---
name: enterprisebudget
description: "Use when projecting the profit of one crop/product/activity as a standalone line — the crop enterprise budget: revenue (units × price) minus its direct costs (seed, inputs, labor) per crop or per bed-foot, so crops can be ranked by net return and the unprofitable dropped. The per-line P&L projection; the production-economics twin of the cost center."
atomPath: "vocabulary/enterprisebudget"
coordinate: "vocabulary/enterprisebudget · 5/round · e1abec55"
contentUuid: "a0994a67-a060-59e9-95af-cb586044a9d2"
diamondUuid: "041fd6dd-3026-8a2f-a0a8-3ce89da4fd6c"
uuid: "e1abec55-d257-848c-865d-7e591740acb2"
horo: 5
typography:
  partition: vocabulary
  bondDegree: 29
standards: []
bindings: []
signatures:
  computationUuid: "feec9793-25d2-8e7a-b95a-b7879d5fbea5"
  stages:
    - stage: path
      stageUuid: "c9d4e529-8ac3-8163-95bf-4ca070742d9a"
    - stage: trinity
      stageUuid: "59598cf3-ff07-836c-a17c-63bd51b7a6c5"
    - stage: boundary
      stageUuid: "2da35b56-7070-8bc3-8f17-30311b393b65"
    - stage: links
      stageUuid: "1f3bfeb9-7ef2-825c-9d47-bc2720860333"
    - stage: horo
      stageUuid: "a9b55536-d955-8826-b001-c715d529638a"
    - stage: seal
      stageUuid: "7addff6c-8047-8b9e-9274-1c587360aff3"
    - stage: uuid
      stageUuid: "256345aa-2a2c-8785-86fb-61b76d43ed20"
version: 2
---
# enterprisebudget — the per-line profit projection that ranks what to grow

An **enterprise budget** projects the profit of **one [[crop]] / product / activity as a standalone line** — revenue (units × price, in [[currency]]) minus its **direct costs** (seed, inputs, labor) — computed per crop or **per bed-foot** so crops can be **ranked by net return** and the unprofitable dropped. It is the production-economics twin of the [[cost]] center: where the cost center collects actuals, the enterprise budget *projects* a line's contribution before the season ([[forecast]]).

This closes [[agriculture]]'s loop: the backward demand→land plan ([[cropplan]]) decides *how much* to grow; the enterprise budget decides *what's worth* growing — rank by net return per bed-foot (the binding land × season [[bottleneck]]), then grow the winners. It generalizes to any per-SKU / per-job margin projection ([[manufacturing]] product costing), composing revenue, [[cost]], and yield into a per-line value.

## Standards
- Wiswall *The Organic Farmer's Business Handbook* (crop enterprise budgets, profit centers); land-grant extension enterprise-budget templates
- USDA / university farm management — enterprise budgeting & cost-of-production

Composes [[agriculture]] · [[crop]] · revenue · [[cost]] · yield · [[currency]] · [[forecast]] · [[cropplan]] · [[bottleneck]] · [[manufacturing]] · value.

**Law — [[law]]: an enterprise budget is the per-line profit projection that ranks what to grow — one [[crop]]/product's revenue minus its direct [[cost]] per bed-foot, so the unprofitable line is dropped; the projection twin of the cost center.**

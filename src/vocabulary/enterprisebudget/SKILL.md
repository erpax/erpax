---
name: enterprisebudget
description: "Use when projecting the profit of one crop/product/activity as a standalone line — the crop enterprise budget: revenue (units × price) minus its direct costs (seed, inputs, labor) per crop or per bed-foot, so crops can be ranked by net return and the unprofitable dropped. The per-line P&L projection; the production-economics twin of the cost center."
atomPath: "vocabulary/enterprisebudget"
coordinate: "vocabulary/enterprisebudget · 1/base · 3ba82c2d"
contentUuid: "cf8fb397-0207-577a-9acf-033a52cd3391"
diamondUuid: "48d19fec-9407-8550-9fca-eb71e9db2f36"
uuid: "3ba82c2d-f00c-8c08-9dee-137c17762f5e"
horo: 1
typography:
  partition: vocabulary
  bondDegree: 38
standards: []
bindings: []
signatures:
  computationUuid: "a555afd5-f3b4-8c9b-8940-334ece632656"
  stages:
    - stage: path
      stageUuid: "c9d4e529-8ac3-8163-95bf-4ca070742d9a"
    - stage: trinity
      stageUuid: "59598cf3-ff07-836c-a17c-63bd51b7a6c5"
    - stage: boundary
      stageUuid: "11ca491d-a88e-8bc3-9e17-3b8c5dadd27a"
    - stage: links
      stageUuid: "1c33df34-f86f-8d41-ad50-e4522441e700"
    - stage: horo
      stageUuid: "6bd7c4e2-5cf9-80db-8a1e-15d11da65ce0"
    - stage: seal
      stageUuid: "7addff6c-8047-8b9e-9274-1c587360aff3"
    - stage: uuid
      stageUuid: "180d7fa7-1ba0-85bd-bece-e5093d498dba"
version: 2
---
# enterprisebudget — the per-line profit projection that ranks what to grow

An **enterprise budget** projects the profit of **one [[crop]] / product / activity as a standalone line** — revenue (units × price, in [[currency]]) minus its **direct costs** (seed, inputs, labor) — computed per crop or **per bed-foot** so crops can be **ranked by net return** and the unprofitable dropped. It is the production-economics twin of the [[cost]] center: where the cost center collects actuals, the enterprise budget *projects* a line's contribution before the season ([[forecast]]).

This closes [[agriculture]]'s loop: the backward demand→land plan ([[cropplan]]) decides *how much* to grow; the enterprise budget decides *what's worth* growing — rank by net return per bed-foot (the binding land × season [[bottleneck]]), then grow the winners. It generalizes to any per-SKU / per-job margin projection ([[manufacturing]] product costing), composing [[revenue]], [[cost]], and [[yield]] into a per-line [[value]].

## Standards
- Wiswall *The Organic Farmer's Business Handbook* (crop enterprise budgets, profit centers); land-grant extension enterprise-budget templates
- USDA / university farm management — enterprise budgeting & cost-of-production

Composes [[agriculture]] · [[crop]] · [[revenue]] · [[cost]] · [[yield]] · [[currency]] · [[forecast]] · [[cropplan]] · [[bottleneck]] · [[manufacturing]] · [[value]].

**Law — [[law]]: an enterprise budget is the per-line profit projection that ranks what to grow — one [[crop]]/product's revenue minus its direct [[cost]] per bed-foot, so the unprofitable line is dropped; the projection twin of the cost center.**

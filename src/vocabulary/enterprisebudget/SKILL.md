---
name: enterprisebudget
description: "Use when projecting the profit of one crop/product/activity as a standalone line — the crop enterprise budget: revenue (units × price) minus its direct costs (seed, inputs, labor) per crop or per bed-foot, so crops can be ranked by net return and the unprofitable dropped. The per-line P&L projection; the production-economics twin of the cost center."
atomPath: "vocabulary/enterprisebudget"
coordinate: "vocabulary/enterprisebudget · 5/round · 2358e308"
contentUuid: "e4c7115c-c04d-5401-83c2-c1ea84ae0a3d"
diamondUuid: "d679b812-77c4-82bf-b3f7-09e4e60e8ce8"
uuid: "2358e308-f12b-85b1-8278-f8b9abfd430f"
horo: 5
typography:
  partition: vocabulary
  bondDegree: 38
standards: []
bindings: []
signatures:
  computationUuid: "ae07cec6-9bac-899c-94dc-84ea203ba0d5"
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
      stageUuid: "660d0838-feff-8ad1-97da-d80b3d1b227e"
    - stage: seal
      stageUuid: "7addff6c-8047-8b9e-9274-1c587360aff3"
    - stage: uuid
      stageUuid: "6d28858f-e1a4-8fe4-9195-a2a04bee3a77"
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

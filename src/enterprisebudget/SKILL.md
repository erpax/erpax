---
name: enterprisebudget
description: "Use when projecting the profit of one crop/product/activity as a standalone line — the crop enterprise budget: revenue (units × price) minus its direct costs (seed, inputs, labor) per crop or per bed-foot, so crops can be ranked by net return and the unprofitable dropped. The per-line P&L projection; the production-economics twin of the cost center."
atomPath: enterprisebudget
coordinate: enterprisebudget · 4/weave · 314c87c4
contentUuid: "c2b446a4-4e32-5f8c-8d19-b5f1f5c1deaa"
diamondUuid: "54b54258-37e7-88ec-bfec-90818601b83e"
uuid: "314c87c4-0554-8e79-a0d2-64838a07d373"
horo: 4
bonds:
  in:
    - agriculture
    - bottleneck
    - cost
    - crop
    - cropplan
    - currency
    - forecast
    - law
    - manufacturing
    - revenue
    - value
    - yield
  out:
    - agriculture
    - bottleneck
    - cost
    - crop
    - cropplan
    - currency
    - forecast
    - law
    - manufacturing
    - revenue
    - value
    - yield
typography:
  partition: enterprisebudget
  bondDegree: 38
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - agriculture
    - bottleneck
    - cost
    - crop
    - cropplan
    - currency
    - forecast
    - law
    - manufacturing
    - revenue
    - value
    - yield
  matrix:
    - agriculture
    - bottleneck
    - cost
    - crop
    - cropplan
    - currency
    - forecast
    - law
    - manufacturing
    - revenue
    - value
    - yield
  backlinks:
    - agriculture
    - bottleneck
    - cost
    - crop
    - cropplan
    - currency
    - forecast
    - law
    - manufacturing
    - revenue
    - value
    - yield
signatures:
  computationUuid: "cba84e53-c317-874e-95d0-60557a020587"
  stages:
    - stage: path
      stageUuid: "ab26f0d4-3104-8828-9adf-aa69fddd9540"
    - stage: trinity
      stageUuid: "45977fa2-be15-83d5-9d21-81178300192a"
    - stage: boundary
      stageUuid: "9f9228f9-7e69-8973-8c74-a103b440402b"
    - stage: links
      stageUuid: "91643fdc-9a24-81b2-99ff-dc1a1b307fa0"
    - stage: horo
      stageUuid: "68604954-25ec-8762-9490-5ed445e32614"
    - stage: seal
      stageUuid: "2dc241c9-1bfc-8621-b72c-b4239706a030"
    - stage: uuid
      stageUuid: "de770c46-0c37-87f6-a16f-4d3f51dc018d"
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

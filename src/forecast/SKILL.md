---
name: forecast
description: "Use when projecting revenue from pipeline/opportunities — weighted by probability, stage, and close date; aggregated by rep/territory/product/period."
atomPath: forecast
coordinate: forecast · 5/round · 03d3417d
contentUuid: "2061a37c-c66c-50f7-9840-54b19172e095"
diamondUuid: "fdd37b3c-2130-8c14-94ef-e68d95d7ad48"
uuid: "03d3417d-f19e-82c8-ae9f-b57f9d2b0683"
horo: 5
bonds:
  in:
    - aggregation
    - agriculture
    - biomass
    - breed
    - budgetvariance
    - churn
    - cropplan
    - degreeday
    - enterprisebudget
    - estimate
    - forestry
    - funnel
    - law
    - opportunities
    - orders
    - pipeline
    - quota
    - revenue
    - territory
    - upsell
  out:
    - aggregation
    - agriculture
    - biomass
    - breed
    - budgetvariance
    - churn
    - cropplan
    - degreeday
    - enterprisebudget
    - estimate
    - forestry
    - funnel
    - law
    - opportunities
    - orders
    - pipeline
    - quota
    - revenue
    - territory
    - upsell
typography:
  partition: forecast
  bondDegree: 62
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - aggregation
    - law
    - opportunities
    - orders
    - pipeline
    - revenue
    - territory
  matrix:
    - aggregation
    - agriculture
    - biomass
    - breed
    - budgetvariance
    - churn
    - cropplan
    - degreeday
    - enterprisebudget
    - estimate
    - forestry
    - funnel
    - law
    - opportunities
    - orders
    - pipeline
    - quota
    - revenue
    - territory
    - upsell
  backlinks:
    - aggregation
    - agriculture
    - biomass
    - breed
    - budgetvariance
    - churn
    - cropplan
    - degreeday
    - enterprisebudget
    - estimate
    - forestry
    - funnel
    - law
    - opportunities
    - orders
    - pipeline
    - quota
    - revenue
    - territory
    - upsell
signatures:
  computationUuid: "da677e6f-b903-8f60-bf64-7a0ae333e0f2"
  stages:
    - stage: path
      stageUuid: "e101a1bb-d2d6-83f0-bbb8-fb29523d14ca"
    - stage: trinity
      stageUuid: "cacf6524-2cd3-8784-90e0-30d4030f2010"
    - stage: boundary
      stageUuid: "49d7b285-6aff-80aa-8afe-573253bc6032"
    - stage: links
      stageUuid: "d2db4f61-29a7-8326-bf54-64ab7bc71a13"
    - stage: horo
      stageUuid: "a42d3918-5536-8a18-ac66-37cd99472522"
    - stage: seal
      stageUuid: "1c649605-03cd-8063-8783-7fd3ad0f442e"
    - stage: uuid
      stageUuid: "26937fd6-5cd3-8dab-930c-fec59eee3987"
version: 2
---
# forecast

Use when projecting revenue from pipeline/opportunities — weighted by probability, stage, and close date; aggregated by rep/territory/product/period.

Composes: [[Opportunities]] · [[pipeline]] · [[customers/sales/orders]] · [[revenue]] · [[aggregation]] · [[territory]].

## Standards
- CRM-generic

**Law — [[law]]: a forecast is a projection, never a commitment — each amount is the deal value weighted by its probability and stage, so the total is provisional until the close date resolves it to won or lost.**

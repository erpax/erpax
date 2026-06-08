---
name: churn
description: "Use when measuring customer retention/attrition — monthly/annual churn %, cohort analysis, at-risk indicators, retention drivers."
atomPath: churn
coordinate: churn · 8/crest · 0ab90dca
contentUuid: "0c5e2fdb-0c61-5930-b7c7-ed81c89fc574"
diamondUuid: "40e12eb3-7a01-8cc1-9c48-4f69363dae2b"
uuid: "0ab90dca-1515-8519-beff-c4f662e26048"
horo: 8
bonds:
  in:
    - cohort
    - customers
    - forecast
    - habit
    - law
    - retention
    - revenue
    - subscriptions
  out:
    - cohort
    - customers
    - forecast
    - habit
    - law
    - retention
    - revenue
    - subscriptions
typography:
  partition: churn
  bondDegree: 24
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - cohort
    - customers
    - forecast
    - law
    - revenue
    - subscriptions
  matrix:
    - cohort
    - customers
    - forecast
    - habit
    - law
    - retention
    - revenue
    - subscriptions
  backlinks:
    - cohort
    - customers
    - forecast
    - habit
    - law
    - retention
    - revenue
    - subscriptions
signatures:
  computationUuid: "72e7d1ca-aa84-8760-9311-ed06da61597d"
  stages:
    - stage: path
      stageUuid: "e1efda69-f8d5-87de-98b9-4b4dd3e54877"
    - stage: trinity
      stageUuid: "2a234f21-0eb1-830f-be21-f8311b89d401"
    - stage: boundary
      stageUuid: "8df1e610-c6e9-8eee-bda1-94d3cdffeede"
    - stage: links
      stageUuid: "e2281e65-fc94-8ee5-a06c-025b6c39f05a"
    - stage: horo
      stageUuid: "ff22ed67-f883-8665-b19e-c05d2bc221fa"
    - stage: seal
      stageUuid: "b86231ad-ab0b-80ae-8706-0a7f8eca6a09"
    - stage: uuid
      stageUuid: "d1f62ae3-18e3-83d6-af59-45cfaa8d0027"
version: 2
---
# churn

Use when measuring customer retention/attrition — monthly/annual churn %, cohort analysis, at-risk indicators, retention drivers.

Composes: [[Customers]] · [[Subscriptions]] · [[revenue]] · [[forecast]] · [[cohort]].

**Law — [[law]]: churn measures customer attrition — the rate (monthly/annual %), the cohort it is read over, the at-risk indicators, and the retention drivers — the inverse face of retention.**

## Standards
- CRM-generic

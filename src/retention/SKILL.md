---
name: retention
description: "Use when designing/measuring strategies to keep existing customers — loyalty programs, engagement triggers, win-back campaigns, at-risk indicators."
atomPath: retention
coordinate: retention · 8/crest · 1c5747cb
contentUuid: "1e889c4e-2589-52b7-bc09-d4e0923215fc"
diamondUuid: "81e08d36-b1b6-80f5-bf26-f20ad037334d"
uuid: "1c5747cb-30b6-8af8-baa6-89e2c0146c33"
horo: 8
bonds:
  in:
    - activities
    - archival
    - campaign
    - choice
    - churn
    - customers
    - habit
    - law
    - pickup
    - segment
  out:
    - activities
    - archival
    - campaign
    - choice
    - churn
    - customers
    - habit
    - law
    - pickup
    - segment
typography:
  partition: retention
  bondDegree: 30
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - activities
    - campaign
    - churn
    - customers
    - law
    - segment
  matrix:
    - activities
    - archival
    - campaign
    - choice
    - churn
    - customers
    - habit
    - law
    - pickup
    - segment
  backlinks:
    - activities
    - archival
    - campaign
    - choice
    - churn
    - customers
    - habit
    - law
    - pickup
    - segment
signatures:
  computationUuid: "f4779ff5-666b-85e8-b9d6-48b82cad3a3b"
  stages:
    - stage: path
      stageUuid: "735ecd01-3a4a-827d-8726-3eb5230697dc"
    - stage: trinity
      stageUuid: "59d03722-c7ce-8682-b33b-5871f52fcec1"
    - stage: boundary
      stageUuid: "2776849c-0c99-84e8-adbc-26674c578e92"
    - stage: links
      stageUuid: "21c70e30-86c9-8fe3-9c22-05afec785d93"
    - stage: horo
      stageUuid: "7e1ee5ce-5964-8e9e-ad12-03cfb0607ccf"
    - stage: seal
      stageUuid: "557445e5-8df2-8e8a-8352-8ebd440d7af0"
    - stage: uuid
      stageUuid: "aeb75193-5e82-82f5-8410-d7f8c4548d36"
version: 2
---
# retention

Use when designing/measuring strategies to keep existing customers — loyalty programs, engagement triggers, win-back campaigns, at-risk indicators.

Composes: [[Customers]] · [[segment]] · [[campaign]] · [[churn]] · [[Activities]].

## Standards
- CRM-generic

**Law — [[law]]: retention is the discipline of keeping an existing customer — measured by at-risk indicators and acted on before churn, it is cheaper than acquisition and is the inverse of the [[churn]] it works to prevent.**

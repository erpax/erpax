---
name: start
description: "Use when a date-range or period begins — contract start date, employment start date, fiscal period start, promotion period start. Pairs with end (or duration, or another date atom) to define a temporal span. ISO-8601 datetime."
atomPath: start
coordinate: "start · 8/crest · 34c81107"
contentUuid: "43cf6336-5075-5524-b8ab-4afca269c550"
diamondUuid: "5225041a-9ce3-80c9-afd4-359fb2c3b07e"
uuid: "34c81107-ff98-82c2-a99b-78d30d8ea2a0"
horo: 8
typography:
  partition: start
  bondDegree: 36
standards:
  - "ISO-8601-1`"
bindings: []
signatures:
  computationUuid: "2eee134d-23d6-80b1-a2a4-24c23d46e92a"
  stages:
    - stage: path
      stageUuid: "68b66661-edd0-83c8-9523-b49631e7506a"
    - stage: trinity
      stageUuid: "4a4caad8-a5ee-8f93-a10c-58a72c11c636"
    - stage: boundary
      stageUuid: "3ac1a373-0186-8217-bfb3-84641f8457d9"
    - stage: links
      stageUuid: "8a0f81a6-53cd-8cc2-88bd-7e8dfc14e9e4"
    - stage: horo
      stageUuid: "14284160-bc23-8aae-9fa2-54079c207d20"
    - stage: seal
      stageUuid: "02408270-e6e8-8615-94e6-aa4f3b220f2d"
    - stage: uuid
      stageUuid: "6ac5fc85-65a5-8d96-9f08-96a3e7a944e4"
version: 2
---
# start

Use when a date-range or period begins — contract start date, employment start date, fiscal period start, promotion period start. Pairs with end (or duration, or another date atom) to define a temporal span. ISO-8601 datetime.

Composes: [[date]] · [[period]] · [[field]] · [[end]].

## Standards

<!-- standards banners (the 7-dim instrument reads SKILL.md; these atoms declare these standards in this section) -->
- `@standard ISO-8601-1`

- ISO-8601-1:2019

**Law — [[law]]: start is the ISO-8601 instant a span begins; paired with [[end]] (or a duration) it defines a temporal [[period]].**

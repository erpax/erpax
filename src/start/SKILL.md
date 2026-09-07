---
name: start
description: "Use when a date-range or period begins — contract start date, employment start date, fiscal period start, promotion period start. Pairs with end (or duration, or another date atom) to define a temporal span. ISO-8601 datetime."
atomPath: start
coordinate: "start · 1/base · 3039faa4"
contentUuid: "04d3350d-010b-5cb3-9b4a-5eb8601e2b29"
diamondUuid: "83220132-931d-8118-b33e-b15f8d4b3955"
uuid: "3039faa4-f67d-877a-9364-26d006c5bf0c"
horo: 1
typography:
  partition: start
  bondDegree: 40
standards:
  - "ISO-8601-1`"
bindings: []
signatures:
  computationUuid: "cf2fff8f-63f4-8e5c-bb15-909480d0de89"
  stages:
    - stage: path
      stageUuid: "68b66661-edd0-83c8-9523-b49631e7506a"
    - stage: trinity
      stageUuid: "4a4caad8-a5ee-8f93-a10c-58a72c11c636"
    - stage: boundary
      stageUuid: "780b1521-9126-8349-8491-c4d0f4b0a860"
    - stage: links
      stageUuid: "e7551df0-8329-82bb-9669-4e124821e329"
    - stage: horo
      stageUuid: "d7af69ef-5d6d-8831-9ea4-0f998eaccf38"
    - stage: seal
      stageUuid: "02408270-e6e8-8615-94e6-aa4f3b220f2d"
    - stage: uuid
      stageUuid: "c7a54a72-d0ba-8616-bdf9-36788be992eb"
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

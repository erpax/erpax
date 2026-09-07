---
name: start
description: "Use when a date-range or period begins — contract start date, employment start date, fiscal period start, promotion period start. Pairs with end (or duration, or another date atom) to define a temporal span. ISO-8601 datetime."
atomPath: start
coordinate: "start · 5/round · bc2f63fa"
contentUuid: "80c346ef-3291-597e-800e-a7b92af8e955"
diamondUuid: "b9a03b3e-bc4c-85d7-8bd1-1ab47d9a2d1f"
uuid: "bc2f63fa-b69f-822f-9bf6-4e4e144ac8e0"
horo: 5
typography:
  partition: start
  bondDegree: 40
standards:
  - "ISO-8601-1`"
bindings: []
signatures:
  computationUuid: "2a73c135-9a7c-8cb2-9a65-6c6229a425df"
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
      stageUuid: "aa3afa43-e12e-87d7-9f62-d1a7b9119642"
    - stage: seal
      stageUuid: "02408270-e6e8-8615-94e6-aa4f3b220f2d"
    - stage: uuid
      stageUuid: "901a9035-3cdd-8039-95b8-ddf2ed6bef84"
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

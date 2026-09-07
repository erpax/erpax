---
name: start
description: "Use when a date-range or period begins — contract start date, employment start date, fiscal period start, promotion period start. Pairs with end (or duration, or another date atom) to define a temporal span. ISO-8601 datetime."
atomPath: start
coordinate: "start · 5/round · c67b86de"
contentUuid: "9f86b33b-e2e0-59bc-8964-33a157742025"
diamondUuid: "3972321a-c2a9-829e-ae77-97772a26d668"
uuid: "c67b86de-f879-8dbb-8571-66117bb195af"
horo: 5
typography:
  partition: start
  bondDegree: 40
standards:
  - "ISO-8601-1`"
bindings: []
signatures:
  computationUuid: "a4756f01-aa42-8176-9f55-d1ca9d7abf30"
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
      stageUuid: "14669a97-d55b-8d16-8e10-6a1507c85bc3"
    - stage: seal
      stageUuid: "02408270-e6e8-8615-94e6-aa4f3b220f2d"
    - stage: uuid
      stageUuid: "257b3b15-14db-873e-8d9d-9ecaf85055de"
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

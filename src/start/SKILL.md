---
name: start
description: "Use when a date-range or period begins — contract start date, employment start date, fiscal period start, promotion period start. Pairs with end (or duration, or another date atom) to define a temporal span. ISO-8601 datetime."
atomPath: start
coordinate: "start · 8/crest · 3ea92c01"
contentUuid: "a8d45602-2b97-5275-9aad-9cac4cf2376e"
diamondUuid: "e2e408a4-e4c3-8076-9f75-2a12184c1a2d"
uuid: "3ea92c01-81e7-819e-a340-12a268ba9fe4"
horo: 8
typography:
  partition: start
  bondDegree: 40
standards:
  - "ISO-8601-1`"
bindings: []
signatures:
  computationUuid: "b9298060-c8c3-8600-8c6e-f4bd48b5c5ef"
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
      stageUuid: "2f25c472-1858-8166-867f-67bdd27ff9ec"
    - stage: seal
      stageUuid: "02408270-e6e8-8615-94e6-aa4f3b220f2d"
    - stage: uuid
      stageUuid: "5820bf65-8e6e-8823-9ca9-6b233d7791ac"
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

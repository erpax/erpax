---
name: start
description: "Use when a date-range or period begins — contract start date, employment start date, fiscal period start, promotion period start. Pairs with end (or duration, or another date atom) to define a temporal span. ISO-8601 datetime."
atomPath: start
coordinate: "start · 5/round · 556b9ab7"
contentUuid: "871abd36-8f21-5d64-bbba-bb7c2f3abfbe"
diamondUuid: "a200ec54-603f-819b-b557-8688a24db48c"
uuid: "556b9ab7-1a61-8381-9580-7f7bb813711a"
horo: 5
typography:
  partition: start
  bondDegree: 36
standards:
  - "ISO-8601-1`"
bindings: []
signatures:
  computationUuid: "24e697f5-17be-8f32-9d45-5d55a60aa4cd"
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
      stageUuid: "9dec8b7a-f714-8544-9131-c801a32a1c79"
    - stage: seal
      stageUuid: "02408270-e6e8-8615-94e6-aa4f3b220f2d"
    - stage: uuid
      stageUuid: "1c34c7fd-fa44-8d05-aa5a-ab4801b92c2f"
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

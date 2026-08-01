---
name: start
description: "Use when a date-range or period begins — contract start date, employment start date, fiscal period start, promotion period start. Pairs with end (or duration, or another date atom) to define a temporal span. ISO-8601 datetime."
atomPath: start
coordinate: "start · 8/crest · 4b3dac51"
contentUuid: "cdcd70da-f442-5ff1-979f-d1a1c626b9ce"
diamondUuid: "e91b97e7-fd17-8e58-a240-f3f052de21d4"
uuid: "4b3dac51-5774-8b4d-97be-ee0004d19320"
horo: 8
typography:
  partition: start
  bondDegree: 40
standards:
  - "ISO-8601-1`"
bindings: []
signatures:
  computationUuid: "6a6c2189-0a29-8733-a507-eb20abe0a37f"
  stages:
    - stage: path
      stageUuid: "68b66661-edd0-83c8-9523-b49631e7506a"
    - stage: trinity
      stageUuid: "4a4caad8-a5ee-8f93-a10c-58a72c11c636"
    - stage: boundary
      stageUuid: "308423f5-a5f4-8b89-9a33-f7777aa54d68"
    - stage: links
      stageUuid: "885d4b81-d687-8fea-9da8-f36443b086bf"
    - stage: horo
      stageUuid: "718a5d6c-68c2-86bf-b40f-f313ee639d45"
    - stage: seal
      stageUuid: "02408270-e6e8-8615-94e6-aa4f3b220f2d"
    - stage: uuid
      stageUuid: "66431092-5a18-84ae-b32e-34f61f9bdb7e"
version: 2
---
# start

Use when a date-range or period begins — contract start date, employment start date, fiscal period start, promotion period start. Pairs with end (or duration, or another date atom) to define a temporal span. ISO-8601 datetime.

Composes: [[date]] · [[period]] · [[fields]] · [[end]].

## Standards

<!-- standards banners (the 7-dim instrument reads SKILL.md; these atoms declare these standards in this section) -->
- `@standard ISO-8601-1`

- ISO-8601-1:2019

**Law — [[law]]: start is the ISO-8601 instant a span begins; paired with [[end]] (or a duration) it defines a temporal [[period]].**

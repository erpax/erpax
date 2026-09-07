---
name: start
description: "Use when a date-range or period begins — contract start date, employment start date, fiscal period start, promotion period start. Pairs with end (or duration, or another date atom) to define a temporal span. ISO-8601 datetime."
atomPath: start
coordinate: "start · 4/weave · 5c8a354d"
contentUuid: "ceae5321-f2c0-51d0-b666-8767e828bbf4"
diamondUuid: "93250912-d408-8076-becc-a734d810dcbe"
uuid: "5c8a354d-dc9c-8bcf-9eec-22d641ed24f4"
horo: 4
typography:
  partition: start
  bondDegree: 36
standards:
  - "ISO-8601-1`"
bindings: []
signatures:
  computationUuid: "af516c53-dd44-8ca3-beee-5c7d84361ff0"
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
      stageUuid: "0b181dbd-9444-83f5-a62c-cc763428c600"
    - stage: seal
      stageUuid: "02408270-e6e8-8615-94e6-aa4f3b220f2d"
    - stage: uuid
      stageUuid: "09101d88-f5b4-82ed-bada-2091e178964e"
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

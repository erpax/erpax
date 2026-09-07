---
name: start
description: "Use when a date-range or period begins — contract start date, employment start date, fiscal period start, promotion period start. Pairs with end (or duration, or another date atom) to define a temporal span. ISO-8601 datetime."
atomPath: start
coordinate: "start · 2/share · 7ade2b8b"
contentUuid: "b8c05a11-6a42-5994-8968-0393dcc09a90"
diamondUuid: "f0036c63-6b61-8cf9-883c-b030913b6c87"
uuid: "7ade2b8b-c852-814f-9c6d-bb35dc5182bf"
horo: 2
typography:
  partition: start
  bondDegree: 40
standards:
  - "ISO-8601-1`"
bindings: []
signatures:
  computationUuid: "12bd6336-bb7b-8d34-b8fa-2bea9eb08a48"
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
      stageUuid: "11bd8d57-9565-8553-b643-b2996f818e83"
    - stage: seal
      stageUuid: "02408270-e6e8-8615-94e6-aa4f3b220f2d"
    - stage: uuid
      stageUuid: "df2ecf73-8e96-8406-aa21-0dd3e216c72c"
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

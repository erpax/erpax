---
name: start
description: "Use when a date-range or period begins — contract start date, employment start date, fiscal period start, promotion period start. Pairs with end (or duration, or another date atom) to define a temporal span. ISO-8601 datetime."
atomPath: start
coordinate: "start · 8/crest · ef21c21d"
contentUuid: "3786c700-f772-57f5-b709-2f06550daf75"
diamondUuid: "99b4b246-c4fe-843e-95b8-d797e26fc1b6"
uuid: "ef21c21d-2dba-8ce5-9206-1f5f72f997cc"
horo: 8
typography:
  partition: start
  bondDegree: 40
standards:
  - "ISO-8601-1`"
bindings: []
signatures:
  computationUuid: "9bb8022f-ee45-88fe-9d4d-b661ae5f44f5"
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
      stageUuid: "abda181a-8c16-823f-9770-ec7643b34115"
    - stage: seal
      stageUuid: "02408270-e6e8-8615-94e6-aa4f3b220f2d"
    - stage: uuid
      stageUuid: "2c5ff913-9da7-8a93-a817-8a1bd821e583"
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

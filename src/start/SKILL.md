---
name: start
description: "Use when a date-range or period begins — contract start date, employment start date, fiscal period start, promotion period start. Pairs with end (or duration, or another date atom) to define a temporal span. ISO-8601 datetime."
atomPath: start
coordinate: "start · 8/crest · 2896c239"
contentUuid: "690e9af3-6f98-597c-a8c0-e4ce906f1e61"
diamondUuid: "e582af94-eace-8a65-8dc3-b220b4f60d4b"
uuid: "2896c239-1644-8c10-8225-49d592a3e937"
horo: 8
typography:
  partition: start
  bondDegree: 40
standards:
  - "ISO-8601-1`"
bindings: []
signatures:
  computationUuid: "26c5bb3a-2b48-82d5-9fc4-b4e13136cf52"
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
      stageUuid: "98cc0463-c468-8fd7-b72c-b47a971f1c80"
    - stage: seal
      stageUuid: "02408270-e6e8-8615-94e6-aa4f3b220f2d"
    - stage: uuid
      stageUuid: "9786e41e-3691-8dd3-acc5-bb79af1aef4a"
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

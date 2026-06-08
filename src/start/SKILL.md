---
name: start
description: "Use when a date-range or period begins — contract start date, employment start date, fiscal period start, promotion period start. Pairs with end (or duration, or another date atom) to define a temporal span. ISO-8601 datetime."
atomPath: start
coordinate: start · 4/weave · 2cfa2818
contentUuid: "759eae71-7351-599c-82a8-5e48e7c367f7"
diamondUuid: "5933222c-dc61-8b85-a2c2-696fadc6e680"
uuid: "2cfa2818-478c-8abc-9ab9-2d8aa7c3548f"
horo: 4
bonds:
  in:
    - application
    - billing
    - coverage
    - date
    - end
    - fields
    - immediate
    - job
    - law
    - offset
    - page
    - period
    - previous
  out:
    - application
    - billing
    - coverage
    - date
    - end
    - fields
    - immediate
    - job
    - law
    - offset
    - page
    - period
    - previous
typography:
  partition: start
  bondDegree: 40
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - date
    - end
    - fields
    - law
    - period
  matrix:
    - application
    - billing
    - coverage
    - date
    - end
    - fields
    - immediate
    - job
    - law
    - offset
    - page
    - period
    - previous
  backlinks:
    - application
    - billing
    - coverage
    - date
    - end
    - fields
    - immediate
    - job
    - law
    - offset
    - page
    - period
    - previous
signatures:
  computationUuid: "3aaa54af-de6f-8316-87ff-e3bad6148a77"
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
      stageUuid: "e75b2c0c-52ac-8068-8d95-46045907d1dc"
    - stage: seal
      stageUuid: "c7478008-66ca-8f1e-b8a3-e9fb02eb991a"
    - stage: uuid
      stageUuid: "4ff0a52d-1ba9-8c85-9526-338e91b62fd2"
version: 2
---
# start

Use when a date-range or period begins — contract start date, employment start date, fiscal period start, promotion period start. Pairs with end (or duration, or another date atom) to define a temporal span. ISO-8601 datetime.

Composes: [[date]] · [[period]] · [[fields]] · [[end]].

## Standards
- ISO-8601-1:2019

**Law — [[law]]: start is the ISO-8601 instant a span begins; paired with [[end]] (or a duration) it defines a temporal [[period]].**

---
name: anyone
description: "Use when granting deliberate public/unauthenticated read on a Payload collection or field — the access predicate that always grants, documenting the intentional public-read decision as part of the access-control regime."
atomPath: anyone
coordinate: "anyone · 2/share · 9bb339e4"
contentUuid: "64c0fb94-82c8-5063-a5a1-9c0424a525bd"
diamondUuid: "221fd5d0-4c7a-8a2b-8117-4edaafa7e242"
uuid: "9bb339e4-54ed-8e78-b4cb-300598977492"
horo: 2
bonds:
  in:
    - access
    - law
  out:
    - access
    - law
typography:
  partition: anyone
  bondDegree: 6
  neighbors: []
standards:
  - "EU-2022/1925"
  - "EU-2022/2065"
  - "EU-2022/2554"
  - "EU-2022/2555"
  - "EU-2022/868"
  - "ISO/IEC-29119"
bindings: []
neighbors:
  wikilink:
    - access
    - law
  matrix:
    - access
    - law
  backlinks:
    - access
    - law
signatures:
  computationUuid: "80577378-af53-896d-a37e-7984442831e7"
  stages:
    - stage: path
      stageUuid: "a25a040e-d3de-8b90-9744-85c571fc800c"
    - stage: trinity
      stageUuid: "aee59546-fb59-850b-8422-d42f2534d8e3"
    - stage: boundary
      stageUuid: "a4532ed0-a978-8b26-a371-85848da189ab"
    - stage: links
      stageUuid: "5f6bd8f9-01f1-8638-9873-4b6e8a0e71a2"
    - stage: horo
      stageUuid: "30162b3e-7eb0-801b-a575-302d0a08623e"
    - stage: seal
      stageUuid: "146d84af-4019-844d-8ba6-e6b78c300957"
    - stage: uuid
      stageUuid: "874e220e-29c3-8b7a-acf4-7a1ab08f10e3"
version: 2
---
# anyone — public read predicate (always grant)

The simplest [[access]] predicate: `() => true`. It grants every caller, authenticated or not, so a collection or field can expose itself to anonymous read. ISO 27002 §5.15 is still cited even though it GRANTS — the deliberate public-read is itself an access-control decision on the record.

Matter-twin: `src/anyone/index.ts` (`anyone: Access = () => true`). Composes [[access]].

**Law — [[law]]: a deliberate public grant is still an [[access]] decision — `anyone` returns `true` for every caller, anonymous or authenticated alike.**

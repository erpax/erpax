---
name: anyone
description: "Use when granting deliberate public/unauthenticated read on a Payload collection or field — the access predicate that always grants, documenting the intentional public-read decision as part of the access-control regime."
atomPath: anyone
coordinate: "anyone · 7/descent · b06d63d6"
contentUuid: "4df742f3-598b-5518-9019-d89ab2d0d27f"
diamondUuid: "c61aaec7-eaf1-8575-9397-7712f1bbb544"
uuid: "b06d63d6-7299-8275-9b49-b36ad50c08c0"
horo: 7
typography:
  partition: anyone
  bondDegree: 6
standards:
  - "ISO/IEC-29119"
bindings: []
signatures:
  computationUuid: "b967697e-b9b3-83a0-9bc8-a610c3ba15e9"
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
      stageUuid: "149bb963-53d9-8dbb-a124-d4dae769023e"
    - stage: seal
      stageUuid: "146d84af-4019-844d-8ba6-e6b78c300957"
    - stage: uuid
      stageUuid: "d69a339c-8410-810f-ac13-426379a08452"
version: 2
---
# anyone — public read predicate (always grant)

The simplest [[access]] predicate: `() => true`. It grants every caller, authenticated or not, so a collection or field can expose itself to anonymous read. ISO 27002 §5.15 is still cited even though it GRANTS — the deliberate public-read is itself an access-control decision on the record.

Matter-twin: `src/anyone/index.ts` (`anyone: Access = () => true`). Composes [[access]].

**Law — [[law]]: a deliberate public grant is still an [[access]] decision — `anyone` returns `true` for every caller, anonymous or authenticated alike.**

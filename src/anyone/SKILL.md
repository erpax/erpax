---
name: anyone
description: "Use when granting deliberate public/unauthenticated read on a Payload collection or field — the access predicate that always grants, documenting the intentional public-read decision as part of the access-control regime."
atomPath: anyone
coordinate: "anyone · 7/descent · 2c9549ee"
contentUuid: "14da050a-35de-5db1-9f8a-bfbd90fd4903"
diamondUuid: "a6821457-7c58-8997-a906-c1ae0278ac09"
uuid: "2c9549ee-c760-8700-a536-8e5a5e62cafd"
horo: 7
typography:
  partition: anyone
  bondDegree: 6
standards:
  - "ISO/IEC-29119"
bindings: []
signatures:
  computationUuid: "9959c128-8240-84d7-8190-1a427fe28d84"
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
      stageUuid: "e0ba0ffc-1445-80f6-ba0e-b8ba43f002e3"
    - stage: seal
      stageUuid: "146d84af-4019-844d-8ba6-e6b78c300957"
    - stage: uuid
      stageUuid: "0f04afce-8f63-84ed-b431-fb10f97a8165"
version: 2
---
# anyone — public read predicate (always grant)

The simplest [[access]] predicate: `() => true`. It grants every caller, authenticated or not, so a collection or field can expose itself to anonymous read. ISO 27002 §5.15 is still cited even though it GRANTS — the deliberate public-read is itself an access-control decision on the record.

Matter-twin: `src/anyone/index.ts` (`anyone: Access = () => true`). Composes [[access]].

**Law — [[law]]: a deliberate public grant is still an [[access]] decision — `anyone` returns `true` for every caller, anonymous or authenticated alike.**

---
name: anyone
description: "Use when granting deliberate public/unauthenticated read on a Payload collection or field — the access predicate that always grants, documenting the intentional public-read decision as part of the access-control regime."
atomPath: anyone
coordinate: "anyone · 4/weave · 948740a9"
contentUuid: "17430ceb-f0ff-5001-a3f2-4841f98ab4a5"
diamondUuid: "4261b0f4-4271-8c88-9483-7bc86b0ab2d6"
uuid: "948740a9-c51d-8c74-905a-abb1613646c1"
horo: 4
typography:
  partition: anyone
  bondDegree: 6
standards:
  - "ISO/IEC-29119"
bindings: []
signatures:
  computationUuid: "71ff323d-02b3-89df-8a7e-d9f9de39c844"
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
      stageUuid: "f6b07360-974a-80e7-b63d-f350b8225f4e"
    - stage: seal
      stageUuid: "146d84af-4019-844d-8ba6-e6b78c300957"
    - stage: uuid
      stageUuid: "70673dcc-4138-8cbc-a416-0b7b1d42b072"
version: 2
---
# anyone — public read predicate (always grant)

The simplest [[access]] predicate: `() => true`. It grants every caller, authenticated or not, so a collection or field can expose itself to anonymous read. ISO 27002 §5.15 is still cited even though it GRANTS — the deliberate public-read is itself an access-control decision on the record.

Matter-twin: `src/anyone/index.ts` (`anyone: Access = () => true`). Composes [[access]].

**Law — [[law]]: a deliberate public grant is still an [[access]] decision — `anyone` returns `true` for every caller, anonymous or authenticated alike.**

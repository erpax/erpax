---
name: anyone
description: "Use when granting deliberate public/unauthenticated read on a Payload collection or field — the access predicate that always grants, documenting the intentional public-read decision as part of the access-control regime."
atomPath: anyone
coordinate: "anyone · 4/weave · b7234fcf"
contentUuid: "b135d1fe-effd-5c1a-bbd7-9f4f121ed448"
diamondUuid: "e4e5db3e-58b7-858a-8509-a4b9678ebbb7"
uuid: "b7234fcf-1927-89e5-a8ca-aaf1821236f5"
horo: 4
typography:
  partition: anyone
  bondDegree: 9
standards:
  - "ISO/IEC-29119"
bindings: []
signatures:
  computationUuid: "d0e370a6-22db-81c9-a9f6-0be8ccbe8aef"
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
      stageUuid: "fdf0362a-73f9-83d2-a5f8-4ba2cfe9da2d"
    - stage: seal
      stageUuid: "146d84af-4019-844d-8ba6-e6b78c300957"
    - stage: uuid
      stageUuid: "fc013282-2d2b-8669-b6d5-75c446906ded"
version: 2
---
# anyone — public read predicate (always grant)

The simplest [[access]] predicate: `() => true`. It grants every caller, authenticated or not, so a collection or field can expose itself to anonymous read. ISO 27002 §5.15 is still cited even though it GRANTS — the deliberate public-read is itself an access-control decision on the record.

Matter-twin: `src/anyone/index.ts` (`anyone: Access = () => true`). Composes [[access]].

**Law — [[law]]: a deliberate public grant is still an [[access]] decision — `anyone` returns `true` for every caller, anonymous or authenticated alike.**

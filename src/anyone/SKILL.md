---
name: anyone
description: "Use when granting deliberate public/unauthenticated read on a Payload collection or field — the access predicate that always grants, documenting the intentional public-read decision as part of the access-control regime."
atomPath: anyone
coordinate: "anyone · 4/weave · b030ad60"
contentUuid: "fdc9eeaf-b048-5a90-9a98-6e7ece6e9b61"
diamondUuid: "15c1c246-6215-8836-a249-e691157784e8"
uuid: "b030ad60-3bfe-83f7-b1a3-c27e272228c1"
horo: 4
typography:
  partition: anyone
  bondDegree: 6
standards:
  - "ISO/IEC-29119"
bindings: []
signatures:
  computationUuid: "a05ec760-672d-8a11-8f90-6c11ad522f68"
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
      stageUuid: "cd243854-4b42-8359-a81c-ae6897af2e57"
    - stage: seal
      stageUuid: "146d84af-4019-844d-8ba6-e6b78c300957"
    - stage: uuid
      stageUuid: "9d9ce2ed-516d-87d7-a4d7-9746d9f1e2d3"
version: 2
---
# anyone — public read predicate (always grant)

The simplest [[access]] predicate: `() => true`. It grants every caller, authenticated or not, so a collection or field can expose itself to anonymous read. ISO 27002 §5.15 is still cited even though it GRANTS — the deliberate public-read is itself an access-control decision on the record.

Matter-twin: `src/anyone/index.ts` (`anyone: Access = () => true`). Composes [[access]].

**Law — [[law]]: a deliberate public grant is still an [[access]] decision — `anyone` returns `true` for every caller, anonymous or authenticated alike.**

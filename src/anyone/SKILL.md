---
name: anyone
description: "Use when granting deliberate public/unauthenticated read on a Payload collection or field — the access predicate that always grants, documenting the intentional public-read decision as part of the access-control regime."
atomPath: anyone
coordinate: "anyone · 5/round · 909055ec"
contentUuid: "9777390f-9e7e-5dbe-a3d6-1ebcccad1ee3"
diamondUuid: "fc1080d8-d1d3-8a3f-8a12-6fe4bae4f2b4"
uuid: "909055ec-bd7f-8ad0-85f5-5b87c2ccf963"
horo: 5
typography:
  partition: anyone
  bondDegree: 6
standards:
  - "ISO/IEC-29119"
bindings: []
signatures:
  computationUuid: "2c59a338-cf15-8a8b-8426-41bc03fec104"
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
      stageUuid: "1f21d266-5642-89e8-abfe-ee1a5f7608a1"
    - stage: seal
      stageUuid: "146d84af-4019-844d-8ba6-e6b78c300957"
    - stage: uuid
      stageUuid: "b1d97bae-9958-8f92-88ab-16847adafb3f"
version: 2
---
# anyone — public read predicate (always grant)

The simplest [[access]] predicate: `() => true`. It grants every caller, authenticated or not, so a collection or field can expose itself to anonymous read. ISO 27002 §5.15 is still cited even though it GRANTS — the deliberate public-read is itself an access-control decision on the record.

Matter-twin: `src/anyone/index.ts` (`anyone: Access = () => true`). Composes [[access]].

**Law — [[law]]: a deliberate public grant is still an [[access]] decision — `anyone` returns `true` for every caller, anonymous or authenticated alike.**

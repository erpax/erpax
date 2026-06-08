---
name: samples
description: "Use when recording or reviewing individual sample items drawn for a control test — pass/fail results, exception categories, tested-by, amount; ISA-530 statistical-sampling evidence per control test execution. The audit-samples collection."
atomPath: internal/controls/control/tests/audit/samples
coordinate: internal/controls/control/tests/audit/samples · 8/crest · 4f2d8b10
contentUuid: "9ec0ca98-603a-5d67-b493-9d8ead4b4e4e"
diamondUuid: "42981931-0e44-8fc5-9b24-caeb65cadc48"
uuid: "4f2d8b10-5b01-8f4d-ade6-6f021de339e3"
horo: 8
bonds:
  in:
    - audit
    - evidences
    - law
  out:
    - evidences
    - law
typography:
  partition: internal
  bondDegree: 6
  neighbors: []
standards:
  - "ISA-530"
  - "ISA-530 audit-sampling"
  - "ISO-19011:2018 sampling-methodology"
bindings: []
neighbors:
  wikilink:
    - law
  matrix:
    - evidences
    - law
  backlinks:
    - evidences
    - law
signatures:
  computationUuid: "e3cfd2b9-c40a-8dc9-b939-f3d9f423e653"
  stages:
    - stage: path
      stageUuid: "7fe16e09-6749-898c-9f28-36d98497c640"
    - stage: trinity
      stageUuid: "6ab0600c-1324-83c4-84ec-fdb8c76ec91e"
    - stage: boundary
      stageUuid: "7fa0ce1d-5128-8ca4-8c2f-01216982e5e5"
    - stage: links
      stageUuid: "9a9bfa8d-19f0-83f2-844a-e2c433f26a39"
    - stage: horo
      stageUuid: "f26da78f-c67e-87ea-83ec-039ae9e18a02"
    - stage: seal
      stageUuid: "53659ce3-9718-8019-a8fc-9686be6ff4b6"
    - stage: uuid
      stageUuid: "7a37868a-1c72-8897-8cc0-44074f6590fd"
version: 2
---
# audit-samples

AuditSamples.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISA-530 audit-sampling
- ISO-19011:2018 sampling-methodology
- ISO-27001 A.5.23 cloud-service-tenant-isolation

**Law — [[law]]: an audit sample is one item drawn for a control test, carrying its pass/fail result, exception category, tester and amount — the ISA-530 per-item evidence that rolls up into the test's deviation rate.**

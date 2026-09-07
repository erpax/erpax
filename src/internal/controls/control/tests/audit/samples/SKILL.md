---
name: samples
description: "Use when recording or reviewing individual sample items drawn for a control test — pass/fail results, exception categories, tested-by, amount; ISA-530 statistical-sampling evidence per control test execution. The audit-samples collection."
atomPath: "internal/controls/control/tests/audit/samples"
coordinate: "internal/controls/control/tests/audit/samples · 2/share · 2b6391f0"
contentUuid: "7ae1611d-1c6f-54a6-b119-be457b8f67ad"
diamondUuid: "068faef1-d3ca-85d0-97c9-d6de76e845a4"
uuid: "2b6391f0-e8fd-8e13-8019-46dbc71a9f66"
horo: 2
typography:
  partition: internal
  bondDegree: 6
standards:
  - "ISA-530"
  - "ISA-530 audit-sampling"
bindings: []
signatures:
  computationUuid: "c6556bb7-5ff3-839f-922e-8426fd48a051"
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
      stageUuid: "4deff0f1-2f1c-8794-a006-1ea92bbb139b"
    - stage: seal
      stageUuid: "53659ce3-9718-8019-a8fc-9686be6ff4b6"
    - stage: uuid
      stageUuid: "cc1e4771-a395-8434-82b8-93e9400b68b4"
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

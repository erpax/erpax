---
name: samples
description: "Use when recording or reviewing individual sample items drawn for a control test — pass/fail results, exception categories, tested-by, amount; ISA-530 statistical-sampling evidence per control test execution. The audit-samples collection."
atomPath: "internal/controls/control/tests/audit/samples"
coordinate: "internal/controls/control/tests/audit/samples · 5/round · 91d29ec4"
contentUuid: "7d5a9a9c-0443-5a1d-b24e-ebd76ebc42d2"
diamondUuid: "2301193c-3ad3-891e-8f80-5f8fa6fe03e6"
uuid: "91d29ec4-3789-8fef-b912-9e85778883aa"
horo: 5
typography:
  partition: internal
  bondDegree: 6
standards:
  - "ISA-530"
  - "ISA-530 audit-sampling"
bindings: []
signatures:
  computationUuid: "8ffa7677-1703-8387-9754-5edd52eac822"
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
      stageUuid: "5191cae6-ad55-8658-9939-741a6378f043"
    - stage: seal
      stageUuid: "53659ce3-9718-8019-a8fc-9686be6ff4b6"
    - stage: uuid
      stageUuid: "2fdf3517-f284-8a6d-a511-bbcacde501ca"
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

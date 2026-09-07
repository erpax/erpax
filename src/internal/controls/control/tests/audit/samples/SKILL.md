---
name: samples
description: "Use when recording or reviewing individual sample items drawn for a control test — pass/fail results, exception categories, tested-by, amount; ISA-530 statistical-sampling evidence per control test execution. The audit-samples collection."
atomPath: "internal/controls/control/tests/audit/samples"
coordinate: "internal/controls/control/tests/audit/samples · 5/round · 07e417e6"
contentUuid: "610e721b-f5f3-54ea-8eeb-e2da78da801e"
diamondUuid: "9fee400b-4775-8e35-9088-3ab3f5388b42"
uuid: "07e417e6-d211-8673-9e2b-b662c6d94b86"
horo: 5
typography:
  partition: internal
  bondDegree: 6
standards:
  - "ISA-530"
  - "ISA-530 audit-sampling"
bindings: []
signatures:
  computationUuid: "745cf828-c971-837b-9b8d-0d96715adca5"
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
      stageUuid: "269c2125-8232-8560-a92a-9a5ba7fdd7a0"
    - stage: seal
      stageUuid: "53659ce3-9718-8019-a8fc-9686be6ff4b6"
    - stage: uuid
      stageUuid: "e51dbc74-d11b-8cb5-85f5-4c10c8298667"
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
